# Plan: Extract Project-Agnostic Utilities to l8common

## Goal

Extract reusable, project-agnostic Go utilities from `l8erp/go/erp/common/` into a new shared library at `../l8common/go/common/`, along with the shared protobuf types (Money, AuditInfo, Address, ContactInfo, DateRange) and mock data utilities. After extraction, l8erp imports l8common instead of owning these abstractions.

## What Moves vs What Stays

### Moves to l8common

| File | Lines | Reason |
|------|-------|--------|
| `service_callback.go` | 98 | Pure generic CRUD callback — no domain types |
| `service_factory.go` | 226 | Generic data access (ActivateService, GetEntity, etc.) — no domain types |
| `status_machine.go` | 83 | Generic state machine — no domain types |
| `type_registry.go` | 25 | Generic one-liner type registration — no domain types |
| `validation_static.go` | 167 | Standalone validators — Money/DateRange refs move with proto |
| `validation_builder.go` | 205 | Fluent validation API — Money/DateRange/L8Period refs move with proto |
| `compute.go` | 96 | Generic aggregations — Money refs move with proto |
| `validation.go` | 73 | ValidateReference — no domain types |
| `defaults.go` | 110 | CreateResources, WaitForSignal, OpenDBConection — constants stay in l8erp |
| `erp-common.proto` | 85 | Money, AuditInfo, Address, ContactInfo, DateRange — universal types |

Mock data utilities:

| File | Lines | Reason |
|------|-------|--------|
| `tests/mocks/utils.go` | ~180 | Generic helpers: pickRef, genID, genCode, genLines, randomPastDate, etc. |
| `tests/mocks/client.go` | ~70 | Generic HTTP client with token auth — zero domain dependencies |
| `tests/mocks/data_common.go` | ~50 | Name/city/state lookup tables |

### Stays in l8erp (ERP-specific)

| File | Reason |
|------|--------|
| `pricing.go` | Depends on `sales.SalesPriceList`, `sales.SalesDiscountRule` — Sales module specific |
| ERP constants in `defaults.go` | `ERP_VNET`, `ERP_LOGS_VNET`, `PREFIX` are project-specific |
| Mock `store.go` | Contains ERP module-specific ID stores (HCMStore, FINStore, etc.) |
| Mock generator files | All `gen_*.go` files are ERP-domain-specific |

### Split between l8common and l8erp

| File | What moves to l8common | What stays in l8erp |
|------|----------------------|---------------------|
| `currency.go` | `ConvertMoney(amount *Money, rate float64, toCurrency string) *Money` — pure math, no service deps | `ResolveCurrencyRate(from, to, date, vnic)` — depends on `fin.ExchangeRate` service lookup. The existing `ConvertAmount` becomes a thin wrapper that resolves the rate then calls `common.ConvertMoney`. |

## Dependency Analysis

### l8common will depend on

- `github.com/saichler/l8types` — core interfaces (IVNic, IServiceCallback, IResources, Action)
- `github.com/saichler/l8orm` — ORM persistence (ActivateService uses persist.OrmService)
- `github.com/saichler/l8srlz` — serialization (service_factory uses object package)
- `github.com/saichler/l8utils` — utilities (logger, registry, resources, web)
- `github.com/saichler/l8services` — service manager (CreateResources)
- `github.com/saichler/l8reflect` — introspection (CreateResources)
- `github.com/saichler/l8secure` — security (CreateResources via l8types/sec)
- `google.golang.org/protobuf` — protobuf runtime
- `github.com/lib/pq` — PostgreSQL driver (blank import in service_factory)

### l8erp will depend on

- `github.com/saichler/l8common` (new dependency — replaces its own common package)

### Type migration path

The proto package name changes from `erp` to `l8common`:
- `erp.Money` → `l8common.Money`
- `erp.AuditInfo` → `l8common.AuditInfo`
- `erp.Address` → `l8common.Address`
- `erp.ContactInfo` → `l8common.ContactInfo`
- `erp.DateRange` → `l8common.DateRange`
- `erp.AddressType_*` → `l8common.AddressType_*`
- `erp.ContactType_*` → `l8common.ContactType_*`

---

## Phase 1: Set Up l8common Project Structure

**Goal:** Initialize the Go module and directory layout.

### Steps

1. Create directory structure:
   ```
   l8common/
   ├── go/
   │   ├── go.mod                    (module github.com/saichler/l8common)
   │   ├── common/                   (extracted Go utilities)
   │   ├── types/
   │   │   └── l8common/             (generated .pb.go from proto)
   │   └── mocks/                    (extracted mock utilities)
   └── proto/
       ├── l8common.proto            (shared types: Money, AuditInfo, etc.)
       └── make-bindings.sh          (proto compilation script)
   ```

2. Initialize `go/go.mod`:
   ```
   module github.com/saichler/l8common
   go 1.24
   ```

3. Copy the license header pattern from l8erp for all new files.

---

## Phase 2: Extract Shared Protobuf Types

**Goal:** Move universal types (Money, AuditInfo, Address, ContactInfo, DateRange) to l8common.

### Steps

1. Create `l8common/proto/l8common.proto`:
   - Copy content from `l8erp/proto/erp-common.proto`
   - Change `package erp` → `package l8common`
   - Change `option go_package = "./types/erp"` → `option go_package = "./types/l8common"`
   - Remove the `import "api.proto"` line (erp-common.proto does not import it)
   - Keep all messages: Money, AuditInfo, Address, ContactInfo, DateRange
   - Keep all enums: AddressType, ContactType

2. Create `l8common/proto/make-bindings.sh`:
   - Single proto compilation for `l8common.proto`
   - Generate to `../go/types/l8common/`
   - Follow the same pattern as l8erp's `make-bindings.sh` (docker-based, `-i` not `-it`)

3. Run `make-bindings.sh` to generate `go/types/l8common/l8common.pb.go`.

4. Update `l8erp/proto/erp-common.proto`:
   - Remove Money, AuditInfo, Address, ContactInfo, DateRange messages
   - Remove AddressType, ContactType enums
   - Add `import "l8common.proto"` (or handle at the proto import level)
   - **Alternative (simpler):** Keep erp-common.proto as-is for now. The l8erp modules will import from l8common's Go types via type aliases. This avoids cascading proto changes across all 40+ l8erp proto files that reference `erp.Money` etc.

**Decision: Use Go type aliases in l8erp** to avoid rewriting all proto files in Phase 1. A future phase can migrate the proto imports.

### Go Type Aliases (in l8erp)

Create `l8erp/go/types/erp/common_aliases.go`:
```go
package erp

import l8c "github.com/saichler/l8common/go/types/l8common"

// Type aliases — all existing l8erp code continues to compile.
// The generated erp-common.pb.go types will be removed once all proto
// files are migrated to import l8common.proto directly.
type Money = l8c.Money
type AuditInfo = l8c.AuditInfo
type Address = l8c.Address
type ContactInfo = l8c.ContactInfo
type DateRange = l8c.DateRange

// Enum aliases
const (
    AddressType_ADDRESS_TYPE_UNSPECIFIED = l8c.AddressType_ADDRESS_TYPE_UNSPECIFIED
    AddressType_ADDRESS_TYPE_HOME        = l8c.AddressType_ADDRESS_TYPE_HOME
    AddressType_ADDRESS_TYPE_WORK        = l8c.AddressType_ADDRESS_TYPE_WORK
    AddressType_ADDRESS_TYPE_MAILING     = l8c.AddressType_ADDRESS_TYPE_MAILING
    AddressType_ADDRESS_TYPE_BILLING     = l8c.AddressType_ADDRESS_TYPE_BILLING

    ContactType_CONTACT_TYPE_UNSPECIFIED    = l8c.ContactType_CONTACT_TYPE_UNSPECIFIED
    ContactType_CONTACT_TYPE_PHONE_MOBILE   = l8c.ContactType_CONTACT_TYPE_PHONE_MOBILE
    ContactType_CONTACT_TYPE_PHONE_HOME     = l8c.ContactType_CONTACT_TYPE_PHONE_HOME
    ContactType_CONTACT_TYPE_PHONE_WORK     = l8c.ContactType_CONTACT_TYPE_PHONE_WORK
    ContactType_CONTACT_TYPE_EMAIL_PERSONAL = l8c.ContactType_CONTACT_TYPE_EMAIL_PERSONAL
    ContactType_CONTACT_TYPE_EMAIL_WORK     = l8c.ContactType_CONTACT_TYPE_EMAIL_WORK
    ContactType_CONTACT_TYPE_FAX            = l8c.ContactType_CONTACT_TYPE_FAX
)
```

This approach means **zero changes** to the 40+ proto files and 300+ Go files that reference `erp.Money`, `erp.AuditInfo`, etc. They all continue to compile identically. The erp-common.pb.go generated types for Money/AuditInfo/Address/ContactInfo/DateRange will be removed and replaced by the aliases.

---

## Phase 3: Extract Go Common Utilities

**Goal:** Move the 9 generic files from `l8erp/go/erp/common/` to `l8common/go/common/`.

### Files to Copy and Adapt

For each file: copy to `l8common/go/common/`, update imports from `github.com/saichler/l8erp/go/types/erp` to `github.com/saichler/l8common/go/types/l8common`.

#### 3a. Files with NO erp type imports (copy verbatim, just change package path)

| File | Import changes |
|------|---------------|
| `service_callback.go` | None — only uses `l8types/go/ifs` |
| `service_factory.go` | None — only uses l8orm, l8srlz, l8types, l8utils |
| `status_machine.go` | None — only uses `l8types/go/ifs` |
| `type_registry.go` | None — only uses `l8types/go/ifs` |
| `validation.go` | None — only uses `l8types/go/ifs` |

#### 3b. Files that import `erp` types (update to `l8common` types)

| File | Import change |
|------|--------------|
| `validation_static.go` | `l8erp/go/types/erp` → `l8common/go/types/l8common`; `erp.Money` → `l8common.Money`; `erp.DateRange` → `l8common.DateRange` |
| `validation_builder.go` | Same as above |
| `compute.go` | Same as above |

#### 3c. currency.go — split into generic math and ERP-specific lookup

**Moves to l8common (`go/common/currency.go`):**
```go
// ConvertMoney applies a pre-resolved exchange rate to a Money value.
func ConvertMoney(amount *l8common.Money, rate float64, toCurrency string) *l8common.Money {
    if amount == nil || amount.Amount == 0 {
        return &l8common.Money{CurrencyId: toCurrency}
    }
    return &l8common.Money{
        Amount:     int64(float64(amount.Amount) * rate),
        CurrencyId: toCurrency,
    }
}
```

**Stays in l8erp (`go/erp/common/currency.go`):**
- `ResolveCurrencyRate(from, to, date, vnic)` — unchanged, still fetches `fin.ExchangeRate` via `GetEntities`
- `ConvertAmount` rewritten as thin wrapper:
```go
func ConvertAmount(amount *erp.Money, toCurrency string, effectiveDate int64, vnic ifs.IVNic) (*erp.Money, error) {
    if amount == nil || amount.Amount == 0 {
        return &erp.Money{CurrencyId: toCurrency}, nil
    }
    rate, err := ResolveCurrencyRate(amount.CurrencyId, toCurrency, effectiveDate, vnic)
    if err != nil {
        return nil, err
    }
    return l8common.ConvertMoney(amount, rate, toCurrency), nil
}
```

#### 3d. defaults.go — split into generic and ERP-specific

**Moves to l8common (`go/common/defaults.go`):**
- `CreateResources(alias string) ifs.IResources` — generic resource initialization
- `WaitForSignal(resources ifs.IResources)` — generic graceful shutdown
- `OpenDBConection(dbname, user, pass string) *sql.DB` — generic DB setup

**Stays in l8erp (`go/erp/common/defaults.go`):**
- Constants: `ERP_VNET`, `ERP_LOGS_VNET`, `PREFIX`
- Any ERP-specific initialization that wraps the generic functions

### After Copying

Update `l8erp/go/erp/common/` to become a thin wrapper:

1. Delete the 9 extracted files from `l8erp/go/erp/common/`.
2. Create `l8erp/go/erp/common/reexport.go` that re-exports l8common symbols so existing l8erp code compiles without changes:

```go
package common

import "github.com/saichler/l8common/go/common"

// Re-export all public symbols from l8common for backwards compatibility.
// Existing l8erp code uses `common.ActivateService`, `common.NewValidation`, etc.
// These re-exports mean zero changes needed in ~300+ service files.

type VB[T any] = common.VB[T]
type ValidateFunc[T any] = common.ValidateFunc[T]
type ActionValidateFunc[T any] = common.ActionValidateFunc[T]
type SetIDFunc[T any] = common.SetIDFunc[T]
type StatusTransitionConfig[T any] = common.StatusTransitionConfig[T]
type ServiceConfig = common.ServiceConfig
type LocalServiceChecker = common.LocalServiceChecker
type LocalEntityLookup = common.LocalEntityLookup
type ProtoMessage[T any] = common.ProtoMessage[T]

var (
    NewServiceCallback          = common.NewServiceCallback
    NewServiceCallbackWithAfter = common.NewServiceCallbackWithAfter
    ActivateService             = common.ActivateService
    ServiceHandler              = common.ServiceHandler
    GetEntity                   = common.GetEntity
    GetEntities                 = common.GetEntities
    PutEntity                   = common.PutEntity
    PostEntity                  = common.PostEntity
    EntityExists                = common.EntityExists
    NewValidation               = common.NewValidation
    SafeCast                    = common.SafeCast
    ValidateRequired            = common.ValidateRequired
    ValidateRequiredInt64       = common.ValidateRequiredInt64
    ValidateEnum                = common.ValidateEnum
    ValidateDateInPast          = common.ValidateDateInPast
    ValidateDateNotZero         = common.ValidateDateNotZero
    ValidateDateAfter           = common.ValidateDateAfter
    ValidateMinimumAge          = common.ValidateMinimumAge
    ValidateConditionalRequired = common.ValidateConditionalRequired
    ValidateConditionalRequiredInt64 = common.ValidateConditionalRequiredInt64
    ValidateMoney               = common.ValidateMoney
    ValidateMoneyPositive       = common.ValidateMoneyPositive
    ValidateDateRange           = common.ValidateDateRange
    ValidatePeriod              = common.ValidatePeriod
    ValidateReference           = common.ValidateReference
    GenerateID                  = common.GenerateID
    RegisterType                = common.RegisterType
    SumLineMoney                = common.SumLineMoney
    MoneyAdd                    = common.MoneyAdd
    MoneySubtract               = common.MoneySubtract
    SumLineFloat64              = common.SumLineFloat64
    SumLineInt64                = common.SumLineInt64
    MoneyAmount                 = common.MoneyAmount
    MoneyIsZero                 = common.MoneyIsZero
    ConvertMoney                = common.ConvertMoney
    CreateResources             = common.CreateResources
    WaitForSignal               = common.WaitForSignal
    OpenDBConection             = common.OpenDBConection
)
```

**Note on generic functions:** Go type aliases work for generic functions assigned to `var`, but generic function re-export via `var` requires Go 1.21+. If the Go version doesn't support this, the re-export file will instead be thin wrapper functions that call through to l8common. Example:
```go
func ActivateService[T any, TList any, PT common.ProtoMessage[T], PTL common.ProtoMessage[TList]](cfg common.ServiceConfig, creds, dbname string, vnic ifs.IVNic) {
    common.ActivateService[T, TList, PT, PTL](cfg, creds, dbname, vnic)
}
```

---

## Phase 4: Extract Mock Data Utilities

**Goal:** Move generic mock helpers to `l8common/go/mocks/`.

### Steps

1. Create `l8common/go/mocks/` directory.

2. Copy and adapt these files:

| Source | Destination | Changes |
|--------|-------------|---------|
| `l8erp/go/tests/mocks/client.go` | `l8common/go/mocks/client.go` | Change package to `mocks`. Rename `HCMClient` → `MockClient` (it's generic). No import changes needed (zero L8 deps). |
| `l8erp/go/tests/mocks/data_common.go` | `l8common/go/mocks/data_common.go` | Change package to `mocks`. No import changes (pure data arrays). |
| `l8erp/go/tests/mocks/utils.go` | `l8common/go/mocks/utils.go` | Change package to `mocks`. Update `erp.Money` → `l8common.Money`, `erp.AuditInfo` → `l8common.AuditInfo`, etc. Remove `MockDataStore` parameter from `randomMoney()` and `money()` — make currency a direct parameter instead of reading from store. Export all functions (capitalize first letter). |

3. The exported function signatures in l8common:
```go
func PickRef(ids []string, index int) string
func RandomMoney(currencyID string, min, rangeSize int) *l8common.Money
func Money(currencyID string, amount int64) *l8common.Money
func RandomPastDate(maxMonths, maxDays int) int64
func RandomFutureDate(maxMonths, maxDays int) int64
func GenID(prefix string, index int) string
func GenCode(prefix string, index int) string
func CreateAuditInfo() *l8common.AuditInfo
func CreateAddress() *l8common.Address
func CreateContact() *l8common.ContactInfo
func RandomName() string
func RandomPhone() string
func RandomSSN() string
func RandomBirthDate() int64
func RandomHireDate() int64
func GenLines[L any](parentIDs []string, n int, create func(idx, pIdx, j int, parentID string) *L) []*L
```

4. Update `l8erp/go/tests/mocks/utils.go` to import from l8common and delegate:
```go
import l8m "github.com/saichler/l8common/go/mocks"

func pickRef(ids []string, index int) string { return l8m.PickRef(ids, index) }
func randomMoney(store *MockDataStore, min, rangeSize int) *erp.Money {
    return l8m.RandomMoney(store.CurrencyIDs[rand.Intn(len(store.CurrencyIDs))], min, rangeSize)
}
// ... etc
```

---

## Phase 5: Vendor and Build Verification

**Goal:** Ensure both l8common and l8erp compile cleanly.

### Steps

1. **l8common:** Initialize Go module, vendor dependencies, build:
   ```bash
   cd ../l8common/go
   go mod init github.com/saichler/l8common
   GOPROXY=direct GOPRIVATE=github.com go mod tidy
   go mod vendor
   go build ./...
   go vet ./...
   ```

2. **l8erp:** Add l8common dependency, re-vendor, build:
   ```bash
   cd go
   rm -rf go.sum go.mod vendor
   go mod init
   GOPROXY=direct GOPRIVATE=github.com go mod tidy
   go mod vendor
   go build ./...
   go vet ./...
   ```

3. Verify all existing l8erp tests still pass:
   ```bash
   cd go/tests && go test ./...
   ```

---

## Phase 6: End-to-End Verification

For every component affected by this extraction:

1. **l8common builds cleanly:**
   - [ ] `go build ./...` — zero errors
   - [ ] `go vet ./...` — zero warnings
   - [ ] `l8common.pb.go` exists in `go/types/l8common/` with all 5 messages and 2 enums

2. **l8erp builds cleanly with l8common dependency:**
   - [ ] `go build ./...` — zero errors (confirms re-exports and type aliases work)
   - [ ] `go vet ./...` — zero warnings

3. **l8erp existing tests pass:**
   - [ ] `cd go/tests && go test ./...` — all tests pass unchanged

4. **Spot-check re-export correctness:**
   - [ ] Grep l8erp service files for `common.ActivateService` — confirm they still compile
   - [ ] Grep l8erp service files for `common.NewValidation` — confirm they still compile
   - [ ] Grep l8erp mock generators for `pickRef`, `randomMoney` — confirm they still compile

5. **Proto verification:**
   - [ ] l8common enums have UNSPECIFIED = 0 zero values
   - [ ] l8erp proto files unchanged (type aliases handle the bridge)
   - [ ] l8erp `make-bindings.sh` still works (erp-common.proto untouched)

---

## Phase 7: Eliminate Temporary Duplication Shims

Phases 2-3 introduce two temporary shims to avoid a blast radius of 300+ file changes. This phase removes them. It can be done incrementally (one module at a time) but MUST be completed — the shims are not permanent.

### 7a. Remove `reexport.go` facade

The `reexport.go` file is a pure facade that delegates 100% to l8common with zero added logic. Per the "Facades Are a Code Smell" rule, it must be deleted.

**Steps:**
1. Find all l8erp Go files that import `github.com/saichler/l8erp/go/erp/common`:
   ```bash
   grep -rn '"github.com/saichler/l8erp/go/erp/common"' go/erp/ go/tests/
   ```
2. Replace the import path with `github.com/saichler/l8common/go/common` in each file.
   - Files that also use ERP-specific functions (`ResolveCurrencyRate`, `ConvertAmount`, `FindActivePriceListForItem`, `ApplyDiscountRules`) need BOTH imports: `l8common/go/common` for generic symbols and `l8erp/go/erp/common` for ERP-specific ones.
3. Delete `reexport.go`.
4. `go build ./...` to verify.

**Scope:** ~300+ service files, mechanical find-and-replace. Can be done module by module (HCM, FIN, SCM, etc.) to keep PRs reviewable.

### 7b. Remove proto type aliases and deduplicate proto definitions

The `common_aliases.go` file and the duplicated message definitions in `erp-common.proto` must be eliminated.

**Steps:**
1. Remove Money, AuditInfo, Address, ContactInfo, DateRange messages and AddressType, ContactType enums from `l8erp/proto/erp-common.proto`.
2. In every l8erp proto file that references `erp.Money`, `erp.AuditInfo`, etc.:
   - Add `import "l8common.proto";`
   - Replace `erp.Money` → `l8common.Money`, `erp.AuditInfo` → `l8common.AuditInfo`, etc.
3. Update `l8erp/proto/make-bindings.sh` to download/copy `l8common.proto` as a dependency before compilation.
4. Run `make-bindings.sh` to regenerate all `.pb.go` files.
5. Delete `l8erp/go/types/erp/common_aliases.go`.
6. `go build ./...` to verify.

**Scope:** ~40+ proto files, mechanical find-and-replace. Run `make-bindings.sh` once after all changes.

### After Phase 7

```
l8erp/go/erp/common/
├── defaults.go       # ERP constants only (ERP_VNET, ERP_LOGS_VNET, PREFIX)
├── currency.go       # ResolveCurrencyRate + ConvertAmount wrapper
└── pricing.go        # ERP-specific pricing logic
```

No more reexport.go, no more common_aliases.go, no more duplicated proto definitions.

---

## Phase 8: Update Other Layer 8 Projects (Future)

This phase is out of scope for the initial extraction but documents the path forward.

Once l8common is published:
1. Other projects (l8bugs, l8id, l8alarms, etc.) can import `github.com/saichler/l8common/go/common` directly instead of copying the pattern from l8erp.
2. New projects get the validation builder, service factory, mock client, and shared types out of the box.
3. New projects import `l8common.proto` in their proto files directly — no aliases needed.

---

## Traceability Matrix

| # | Item | Source File | Destination | Phase |
|---|------|------------|-------------|-------|
| 1 | Money, AuditInfo, Address, ContactInfo, DateRange protos | `proto/erp-common.proto` | `l8common/proto/l8common.proto` | Phase 2 |
| 2 | Go type aliases for backwards compat | — | `l8erp/go/types/erp/common_aliases.go` | Phase 2 |
| 3 | service_callback.go | `go/erp/common/` | `l8common/go/common/` | Phase 3 |
| 4 | service_factory.go | `go/erp/common/` | `l8common/go/common/` | Phase 3 |
| 5 | status_machine.go | `go/erp/common/` | `l8common/go/common/` | Phase 3 |
| 6 | type_registry.go | `go/erp/common/` | `l8common/go/common/` | Phase 3 |
| 7 | validation.go | `go/erp/common/` | `l8common/go/common/` | Phase 3 |
| 8 | validation_static.go | `go/erp/common/` | `l8common/go/common/` | Phase 3 |
| 9 | validation_builder.go | `go/erp/common/` | `l8common/go/common/` | Phase 3 |
| 10 | compute.go | `go/erp/common/` | `l8common/go/common/` | Phase 3 |
| 11 | defaults.go (generic parts) | `go/erp/common/` | `l8common/go/common/` | Phase 3 |
| 12 | Re-export wrapper in l8erp | — | `l8erp/go/erp/common/reexport.go` | Phase 3 |
| 13 | l8erp defaults.go (constants only) | `go/erp/common/defaults.go` | stays, trimmed | Phase 3 |
| 14 | currency.go (ConvertMoney math) | `go/erp/common/` | `l8common/go/common/` | Phase 3 |
| 14b | currency.go (ResolveCurrencyRate) | `go/erp/common/` | stays (uses fin.ExchangeRate) | N/A |
| 15 | pricing.go | `go/erp/common/` | stays (ERP-specific) | N/A |
| 16 | Mock client.go | `go/tests/mocks/` | `l8common/go/mocks/` | Phase 4 |
| 17 | Mock data_common.go | `go/tests/mocks/` | `l8common/go/mocks/` | Phase 4 |
| 18 | Mock utils.go | `go/tests/mocks/` | `l8common/go/mocks/` | Phase 4 |
| 19 | l8erp mock utils.go delegates to l8common | `go/tests/mocks/utils.go` | updated in place | Phase 4 |
| 20 | Build verification (both projects) | — | — | Phase 5 |
| 21 | End-to-end verification (build, test, spot-check) | — | — | Phase 6 |
| 22 | Delete reexport.go facade (update ~300 import paths) | `l8erp/go/erp/common/reexport.go` | deleted | Phase 7a |
| 23 | Delete common_aliases.go (update ~40 proto imports) | `l8erp/go/types/erp/common_aliases.go` | deleted | Phase 7b |
| 24 | Remove duplicated types from erp-common.proto | `l8erp/proto/erp-common.proto` | trimmed | Phase 7b |

---

## Final l8common Directory Structure

```
l8common/
├── proto/
│   ├── l8common.proto              # Money, AuditInfo, Address, ContactInfo, DateRange
│   └── make-bindings.sh
├── go/
│   ├── go.mod
│   ├── go.sum
│   ├── vendor/
│   ├── types/
│   │   └── l8common/
│   │       └── l8common.pb.go      # Generated from proto
│   ├── common/
│   │   ├── service_callback.go     # Generic CRUD callback (98 lines)
│   │   ├── service_factory.go      # Generic data access (226 lines)
│   │   ├── validation_static.go    # Standalone validators (167 lines)
│   │   ├── validation_builder.go   # Fluent validation API (205 lines)
│   │   ├── validation.go           # Reference validation (73 lines)
│   │   ├── status_machine.go       # State machine (83 lines)
│   │   ├── compute.go              # Aggregation helpers (96 lines)
│   │   ├── currency.go             # ConvertMoney — pure rate math (~15 lines)
│   │   ├── type_registry.go        # Type registration (25 lines)
│   │   └── defaults.go             # CreateResources, WaitForSignal, OpenDBConection (~80 lines)
│   └── mocks/
│       ├── client.go               # Generic HTTP client with auth (~70 lines)
│       ├── data_common.go          # Name/address lookup tables (~50 lines)
│       └── utils.go                # pickRef, genID, genLines, etc. (~180 lines)
```

**Total extracted: ~1,353 lines of Go + 85 lines of proto**

---

## Final l8erp/go/erp/common/ After Extraction

After Phases 1-5 (temporary shims in place):
```
l8erp/go/erp/common/
├── reexport.go                     # TEMPORARY: Re-exports l8common symbols (~80 lines)
├── defaults.go                     # ERP constants only: ERP_VNET, ERP_LOGS_VNET, PREFIX (~20 lines)
├── currency.go                     # ERP-specific currency conversion (66 lines)
└── pricing.go                      # ERP-specific pricing logic (160 lines)
```

After Phase 7 (shims removed):
```
l8erp/go/erp/common/
├── defaults.go                     # ERP constants only (~20 lines)
├── currency.go                     # ResolveCurrencyRate + ConvertAmount wrapper (50 lines)
└── pricing.go                      # ERP-specific pricing logic (160 lines)
```

---

## Compliance Checklist (per prd-compliance.md)

### Project Structure & Architecture
- [x] l8common follows Layer 8 sibling project layout (`../l8common/` relative to l8erp)
- [x] Go module root at `go/` with `go.mod`
- [x] Proto files at `proto/` with `make-bindings.sh`
- [x] Generated types at `go/types/l8common/`
- [x] Library project — no deployable services, so no build.sh/Dockerfile/K8s YAML needed

### Protobuf Design (proto-enum-zero-value.md, proto-list-convention.md)
- [x] `AddressType` enum has `ADDRESS_TYPE_UNSPECIFIED = 0` — compliant
- [x] `ContactType` enum has `CONTACT_TYPE_UNSPECIFIED = 0` — compliant
- [x] No list types in l8common.proto — proto-list-convention does not apply
- [x] No `import "api.proto"` needed — l8common.proto is self-contained (no L8MetaData references)

### Protobuf Generation (protobuf-generation.md)
- [x] `make-bindings.sh` is the ONLY way to generate bindings — no manual protoc/docker commands
- [x] Script must use `-i` (not `-it`) for non-interactive environments
- [x] Script runs from `proto/` directory
- [x] After generation, verify `.pb.go` exists and `go build ./...` passes

### Vendoring (vendor-third-party-code.md)
- [x] All dependencies vendored under `go/vendor/`
- [x] Full vendor refresh sequence in Phase 5: `rm -rf go.sum go.mod vendor && go mod init && go mod tidy && go mod vendor`
- [x] Never search sibling project directories for deps — always use vendored copy

### Testing (test-location-and-approach.md)
- [x] l8common tests (if added) MUST live in `go/tests/`, not alongside source files
- [x] Tests must use system API (IVNic, service endpoints), not direct calls to unexported functions
- [x] Initial extraction has no tests — l8common's utilities are validated indirectly through l8erp's existing test suite (Phase 5, Step 3)
- [x] Future: when l8common gets its own tests, create `go/tests/` directory following l8erp pattern

### File Size (maintainability.md)
- [x] All extracted files are under 500 lines (largest is service_factory.go at 226 lines)
- [x] reexport.go is ~80 lines

### No Duplicate Code (maintainability.md)
- [x] After extraction, l8erp delegates to l8common via re-exports — no behavioral duplication
- [x] Mock utils in l8erp delegate to l8common — no logic duplication

---

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Generic function re-export via `var` may not work for all Go versions | Use thin wrapper functions as fallback (Phase 3 note) |
| Proto package rename breaks existing l8erp code | Go type aliases eliminate this — zero l8erp code changes needed |
| Other L8 projects currently copy patterns from l8erp | Phase 6 (future) addresses migration; no breaking change now |
| l8common vendoring pulls in many L8 framework deps | Acceptable — these are the same deps l8erp already uses |
