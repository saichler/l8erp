# Phase 9: Go Service Layer Deduplication

## Overview

Analysis of the Go service layer reveals **~48,000 lines of duplicate boilerplate** across 750 service files (375 `*Service.go` + 375 `*ServiceCallback.go`), 8 type registration files, and 11 module activation files. This plan eliminates the duplication using Go generics and factory patterns.

## Summary of Findings

| Area | Files | Total Lines | Duplicate % | Savings |
|------|-------|-------------|-------------|---------|
| *Service.go (Activate + helpers) | 375 | 33,000 | 98% | ~25,500 |
| *ServiceCallback.go (boilerplate) | 375 | 46,852 | 25-94% | ~11,250 |
| Type Registration (shared_*.go) | 8 | 972 | 95% | ~820 |
| Module Activation (erp_*.go) | 11 | 1,150 | 98% | ~1,050 |
| **Total** | **769** | **81,974** | — | **~38,620** |

---

## Tier 1: Generic Service Factory (25,500 lines saved)

### Problem

Every `*Service.go` file contains 85-88 lines, of which ~48 lines are identical boilerplate. The only differences are: entity type, list type, primary key field name, ServiceName, and ServiceArea.

**Duplicated blocks in every Service.go:**
1. DB Connection Setup (7 lines × 375 = 2,625 lines)
2. SLA Configuration (6 lines × 375 = 2,250 lines)
3. Endpoint Registration (6 lines × 375 = 2,250 lines)
4. `Entities()` helper (2 lines × 375 = 750 lines)
5. `Entity()` lookup (17 lines × 375 = 6,375 lines)

### Solution

Create `go/erp/common/service_factory.go`:

```go
package common

// ServiceConfig holds the configuration for activating a service
type ServiceConfig struct {
    ServiceName string
    ServiceArea byte
    PrimaryKey  string
    Callback    ifs.IServiceCallback
}

// ActivateService handles all boilerplate for service activation
func ActivateService[T any, TList any](
    cfg ServiceConfig,
    creds, dbname string,
    vnic ifs.IVNic,
) {
    _, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
    if err != nil {
        panic(err)
    }
    db := OpenDBConection(dbname, user, pass)
    p := postgres.NewPostgres(db, vnic.Resources())

    var entity T
    var entityList TList

    sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, cfg.ServiceName, cfg.ServiceArea, true, cfg.Callback)
    sla.SetServiceItem(&entity)
    sla.SetServiceItemList(&entityList)
    sla.SetPrimaryKeys(cfg.PrimaryKey)
    sla.SetArgs(p)
    sla.SetTransactional(true)
    sla.SetReplication(true)
    sla.SetReplicationCount(3)

    ws := web.New(cfg.ServiceName, cfg.ServiceArea, 0)
    ws.AddEndpoint(&entity, ifs.POST, &l8web.L8Empty{})
    ws.AddEndpoint(&entityList, ifs.POST, &l8web.L8Empty{})
    ws.AddEndpoint(&entity, ifs.PUT, &l8web.L8Empty{})
    ws.AddEndpoint(&entity, ifs.PATCH, &l8web.L8Empty{})
    ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
    ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &entityList)
    sla.SetWebService(ws)

    vnic.Resources().Services().Activate(sla, vnic)
}

// GetServiceHandler returns the service handler for a given service
func GetServiceHandler(serviceName string, serviceArea byte, vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
    return vnic.Resources().Services().ServiceHandler(serviceName, serviceArea)
}

// GetEntity retrieves a single entity by ID using a filter
func GetEntity[T any](serviceName string, serviceArea byte, filter *T, vnic ifs.IVNic) (*T, error) {
    handler, ok := GetServiceHandler(serviceName, serviceArea, vnic)
    if ok {
        resp := handler.Get(object.New(nil, filter), vnic)
        if resp.Error() != nil {
            return nil, resp.Error()
        }
        if resp.Element() != nil {
            return resp.Element().(*T), nil
        }
        return nil, nil
    }
    resp := vnic.Request("", serviceName, serviceArea, ifs.GET, filter, 30)
    if resp.Error() != nil {
        return nil, resp.Error()
    }
    if resp.Element() != nil {
        return resp.Element().(*T), nil
    }
    return nil, nil
}
```

**Each Service.go becomes (~25 lines instead of ~88):**
```go
package employees

import (
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/hcm"
    "github.com/saichler/l8types/go/ifs"
)

const (
    ServiceName = "Employee"
    ServiceArea = byte(10)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
    common.ActivateService[hcm.Employee, hcm.EmployeeList](
        common.ServiceConfig{
            ServiceName: ServiceName,
            ServiceArea: ServiceArea,
            PrimaryKey:  "EmployeeId",
            Callback:    newEmployeeServiceCallback(),
        }, creds, dbname, vnic)
}

func Employee(employeeId string, vnic ifs.IVNic) (*hcm.Employee, error) {
    return common.GetEntity(ServiceName, ServiceArea, &hcm.Employee{EmployeeId: employeeId}, vnic)
}
```

**Savings per file:** ~63 lines → **~25,500 lines total across 375 files**

---

## Tier 2: Generic ServiceCallback Base (11,250 lines saved)

### Problem

Every `*ServiceCallback.go` contains identical:
1. Struct definition + constructor (8 lines × 375 = 3,000 lines)
2. Type assertion in `Before()` (4 lines × 375 = 1,500 lines)
3. ID generation in `Before()` (3 lines × 375 = 1,125 lines)
4. `After()` stub (3 lines × 375 = 1,125 lines)
5. License header (14 lines × 375 = 5,250 lines)

### Solution

Create `go/erp/common/service_callback.go`:

```go
package common

// ValidateFunc is the signature for entity validation functions
type ValidateFunc[T any] func(entity *T, vnic ifs.IVNic) error

// IDSetter is the signature for setting the primary key on an entity
type IDSetter[T any] func(entity *T)

// NewServiceCallback creates a standard service callback with
// type assertion, ID generation, and validation
func NewServiceCallback[T any](
    typeName string,
    setID IDSetter[T],
    validate ValidateFunc[T],
) ifs.IServiceCallback {
    return &genericCallback[T]{
        typeName: typeName,
        setID:    setID,
        validate: validate,
    }
}

type genericCallback[T any] struct {
    typeName string
    setID    IDSetter[T]
    validate ValidateFunc[T]
}

func (cb *genericCallback[T]) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
    entity, ok := any.(*T)
    if !ok {
        return nil, false, errors.New("invalid " + cb.typeName + " type")
    }
    if action == ifs.POST {
        cb.setID(entity)
    }
    if cb.validate != nil {
        if err := cb.validate(entity, vnic); err != nil {
            return nil, false, err
        }
    }
    return nil, true, nil
}

func (cb *genericCallback[T]) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
    return nil, true, nil
}
```

**Each ServiceCallback.go becomes (validation-only):**
```go
package employees

import (
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/hcm"
    "github.com/saichler/l8types/go/ifs"
)

func newEmployeeServiceCallback() ifs.IServiceCallback {
    return common.NewServiceCallback[hcm.Employee](
        "Employee",
        func(e *hcm.Employee) { common.GenerateID(&e.EmployeeId) },
        validateEmployee,
    )
}

func validateEmployee(entity *hcm.Employee, vnic ifs.IVNic) error {
    // Entity-specific validation only
    if err := common.ValidateRequired(entity.FirstName, "firstName"); err != nil {
        return err
    }
    // ... more validation
    return nil
}
```

**Savings:**
- Minimal callbacks (291 files, 50-60 lines): 50 → ~15 lines = **~10,185 lines saved**
- Simple callbacks (38 files, 61-80 lines): 70 → ~30 lines = **~1,520 lines saved**
- Complex callbacks (46 files, 81-245 lines): variable savings

**Total: ~11,250 lines saved**

---

## Tier 3: Type Registration Helper (820 lines saved)

### Problem

8 `shared_*.go` files contain 972 lines of repetitive two-line registration patterns:
```go
resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.Account{}, "AccountId")
resources.Registry().Register(&fin.AccountList{})
```

### Solution

Create `go/erp/common/type_registry.go`:

```go
package common

// RegisterType registers an entity and its list type with primary key decorator
func RegisterType[T any, TList any](resources ifs.IResources, pkField string) {
    var entity T
    var list TList
    resources.Introspector().Decorators().AddPrimaryKeyDecorator(&entity, pkField)
    resources.Registry().Register(&list)
}
```

**Each registration function becomes:**
```go
func registerFinTypes(resources ifs.IResources) {
    common.RegisterType[fin.Account, fin.AccountList](resources, "AccountId")
    common.RegisterType[fin.JournalEntry, fin.JournalEntryList](resources, "JournalEntryId")
    // ... one line per type instead of two
}
```

**Savings:** 972 lines → ~486 lines = **~486 lines saved** (plus cleaner code)

---

## Tier 4: Module Activation Simplification (1,050 lines saved)

### Problem

11 `erp_*.go` files repeat `package.Activate(common.DB_CREDS, common.DB_NAME, nic)` for every service.

### Solution

Create a service registry in `go/erp/common/service_registry.go`:

```go
package common

type ActivateFunc func(creds, dbname string, vnic ifs.IVNic)

var moduleServices = map[string][]ActivateFunc{}

func RegisterModuleService(module string, activate ActivateFunc) {
    moduleServices[module] = append(moduleServices[module], activate)
}

func ActivateModule(module string, vnic ifs.IVNic) {
    for _, activate := range moduleServices[module] {
        activate(DB_CREDS, DB_NAME, vnic)
    }
}
```

**Each service uses `init()` to self-register:**
```go
package employees

func init() {
    common.RegisterModuleService("HCM", Activate)
}
```

**Each erp_*.go becomes:**
```go
func activateHCMServices(nic ifs.IVNic) {
    common.ActivateModule("HCM", nic)
}
```

**Savings:** 1,150 lines → ~100 lines = **~1,050 lines saved**

---

## Implementation Order

### Step 1: Create common helpers (no breaking changes)
1. `go/erp/common/service_factory.go` - Generic ActivateService, GetEntity
2. `go/erp/common/service_callback.go` - Generic NewServiceCallback
3. `go/erp/common/type_registry.go` - Generic RegisterType
4. Build and verify: `go build ./erp/common/`

### Step 2: Migrate one module as proof of concept (HCM recommended)
1. Convert all HCM `*Service.go` files to use `ActivateService`
2. Convert all HCM `*ServiceCallback.go` files to use `NewServiceCallback`
3. Convert `shared.go` HCM registrations to use `RegisterType`
4. Build and test the full system

### Step 3: Migrate remaining modules (parallelizable)
- FIN, SCM, Sales, CRM, MFG, PRJ (high service count)
- BI, Documents, ECOM, Compliance (lower service count)
- Each module migration is independent

### Step 4: Add service registry (optional, lower priority)
1. Create `service_registry.go`
2. Add `init()` functions to each service package
3. Simplify `erp_*.go` files

---

## Risk Assessment

**Risk Level: LOW-MEDIUM**

- Go generics are stable (Go 1.18+)
- Each tier is independent — can stop at any tier
- Changes are mechanical (pattern replacement, not logic changes)
- Full test suite validates after each module migration
- Rollback is straightforward (git revert per module)

**Key risk:** The `ActivateService` generic requires that `T` and `TList` are struct types with pointer receivers. Need to verify the framework accepts `*T` created via `var entity T; &entity` vs direct struct literal.

**Mitigation:** Step 2 (proof of concept with HCM) validates this before bulk migration.

---

## Success Metrics

- Reduce service layer from ~82,000 lines to ~44,000 lines (46% reduction)
- New service creation requires ~40 lines total (Service.go + ServiceCallback.go) instead of ~140 lines
- Single point of change for service activation boilerplate
- Single point of change for type registration pattern
