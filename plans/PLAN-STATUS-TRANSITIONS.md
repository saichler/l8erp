# Plan: Phase 1.2 + 1.4 — Status Transition Enforcement (All 6 Flows)

## Context

MISSING-FEATURES.md Phase 1.2 identifies 6 cross-service business flows with no enforcement. Phase 1.4 identifies that no service enforces valid status transitions. The user chose **status transitions only** (no auto-creation of downstream documents) across **all 6 flows**.

Currently any status value can be set at any time via PUT/PATCH. This plan adds a state-machine validator to the existing `ValidationBuilder` framework that prevents invalid transitions (e.g., jumping from DRAFT directly to DELIVERED).

## Architectural Approach

### Key Constraint
Current `ValidateFunc[T]` is `func(*T, ifs.IVNic) error` — it doesn't receive the CRUD action. Status validation needs to distinguish POST (allow any/set initial) from PUT/PATCH (enforce transitions by fetching old entity).

### Solution
Add a parallel `ActionValidateFunc[T]` = `func(*T, ifs.Action, ifs.IVNic) error` type. Extend `genericCallback[T]` to run these alongside existing validators. Add `.StatusTransition(cfg)` to VB. **Fully backward-compatible** — existing callers unchanged.

### Mock Data Compatibility
Use `InitialStatus: 0` (skip POST enforcement) so mock generators that POST entities with various statuses continue to work. Only PUT/PATCH transitions are enforced. POST enforcement can be tightened later.

---

## Step 1: Framework (3 files in `go/erp/common/`)

### 1a. New file: `status_machine.go` (~80 lines)

```go
type StatusTransitionConfig[T any] struct {
    StatusGetter  func(*T) int32
    StatusSetter  func(*T, int32)
    FilterBuilder func(*T) *T          // primary key filter for old entity lookup
    ServiceName   string
    ServiceArea   byte
    InitialStatus int32                // forced on POST (0 = skip)
    Transitions   map[int32][]int32    // from -> []valid_to
    StatusNames   map[int32]string     // protobuf _name map for errors
}

func (cfg *StatusTransitionConfig[T]) BuildValidator() ActionValidateFunc[T]
```

Logic:
- **POST**: If `InitialStatus > 0`, force status. If 0, skip.
- **PUT/PATCH**: `GetEntity` to fetch old, compare old→new against `Transitions` map. Same status = OK. Missing from-key = terminal state error. No match = invalid transition error.
- **GET/DELETE**: Skip.

### 1b. Modify: `service_callback.go` (+15 lines)

```go
type ActionValidateFunc[T any] func(*T, ifs.Action, ifs.IVNic) error

type genericCallback[T any] struct {
    typeName         string
    setID            SetIDFunc[T]
    validate         ValidateFunc[T]
    actionValidators []ActionValidateFunc[T]  // NEW
}

// Variadic 4th param — backward-compatible
func NewServiceCallback[T any](typeName string, setID SetIDFunc[T],
    validate ValidateFunc[T], actionValidators ...ActionValidateFunc[T]) ifs.IServiceCallback
```

In `Before()`: run action validators **before** regular validators (so POST status is set before `Enum()` validator checks it).

### 1c. Modify: `validation_builder.go` (+15 lines)

```go
// New field on VB[T]
actionValidators []ActionValidateFunc[T]

// New method
func (b *VB[T]) StatusTransition(cfg *StatusTransitionConfig[T]) *VB[T]

// Build() passes action validators via variadic param
func (b *VB[T]) Build() ifs.IServiceCallback {
    return NewServiceCallback(b.typeName, b.setID, validatorChain, b.actionValidators...)
}
```

---

## Step 2: Entity Callbacks (~27 files, VB-based)

Each callback gets `.StatusTransition(cfg)` added plus a helper function returning the config. Pattern:

```go
func newSalesOrderServiceCallback() ifs.IServiceCallback {
    return common.NewValidation[sales.SalesOrder]("SalesOrder",
        func(e *sales.SalesOrder) { common.GenerateID(&e.SalesOrderId) }).
        StatusTransition(salesOrderTransitions()).  // NEW
        Require(...).Enum(...).Build()
}

func salesOrderTransitions() *common.StatusTransitionConfig[sales.SalesOrder] {
    return &common.StatusTransitionConfig[sales.SalesOrder]{
        StatusGetter:  func(e *sales.SalesOrder) int32 { return int32(e.Status) },
        StatusSetter:  func(e *sales.SalesOrder, s int32) { e.Status = sales.SalesOrderStatus(s) },
        FilterBuilder: func(e *sales.SalesOrder) *sales.SalesOrder {
            return &sales.SalesOrder{SalesOrderId: e.SalesOrderId}
        },
        ServiceName:   ServiceName,
        ServiceArea:   ServiceArea,
        InitialStatus: 0,  // skip POST enforcement (mock compat)
        Transitions:   map[int32][]int32{ ... },
        StatusNames:   sales.SalesOrderStatus_name,
    }
}
```

### Flow 1: Order-to-Cash (Sales + FIN AR) — 7 entities

| Entity | File | Transitions |
|--------|------|-------------|
| SalesQuotation | `sales/salesquotations/` | DRAFT→{SENT,CANCELLED}, SENT→{ACCEPTED,REJECTED,EXPIRED,CANCELLED} |
| SalesOrder | `sales/salesorders/` | DRAFT→{CONFIRMED,CANCELLED}, CONFIRMED→{IN_PROGRESS,CANCELLED}, IN_PROGRESS→{PARTIALLY_SHIPPED,SHIPPED,CANCELLED}, PARTIALLY_SHIPPED→{SHIPPED,CANCELLED}, SHIPPED→{DELIVERED} |
| DeliveryOrder | `sales/deliveryorders/` | PLANNED→{PICKING,FAILED}, PICKING→{PACKED,FAILED}, PACKED→{SHIPPED,FAILED}, SHIPPED→{DELIVERED,FAILED} |
| ReturnOrder | `sales/returnorders/` | per enum values |
| SalesInvoice | `fin/salesinvoices/` | DRAFT→{SUBMITTED,CANCELLED,VOID}, SUBMITTED→{APPROVED,CANCELLED,VOID}, APPROVED→{PARTIALLY_PAID,PAID,OVERDUE,CANCELLED,VOID}, PARTIALLY_PAID→{PAID}, OVERDUE→{PAID,CANCELLED} |
| CustomerPayment | `fin/customerpayments/` | PENDING→{PROCESSING,CANCELLED}, PROCESSING→{COMPLETED,FAILED}, COMPLETED→{REVERSED}, FAILED→{PENDING} |
| CreditMemo | `fin/creditmemos/` | DRAFT→{SUBMITTED,CANCELLED}, SUBMITTED→{APPROVED,CANCELLED} |

### Flow 2: Procure-to-Pay (SCM + FIN AP) — 5 entities

| Entity | File | Transitions |
|--------|------|-------------|
| PurchaseRequisition | `scm/purchasereqs/` | DRAFT→{SUBMITTED,CANCELLED}, SUBMITTED→{APPROVED,REJECTED,CANCELLED} |
| PurchaseOrder | `scm/purchaseorders/` | DRAFT→{APPROVED,CANCELLED}, APPROVED→{SENT,CANCELLED}, SENT→{PARTIALLY_RECEIVED,RECEIVED,CANCELLED}, PARTIALLY_RECEIVED→{RECEIVED,CANCELLED}, RECEIVED→{CLOSED} |
| Shipment | `scm/shipments/` | per enum values |
| PurchaseInvoice | `fin/purchaseinvoices/` | Same as SalesInvoice (shared InvoiceStatus) |
| VendorPayment | `fin/vendorpayments/` | Same as CustomerPayment (shared PaymentStatus) |

### Flow 3: Record-to-Report (FIN) — 5 entities

| Entity | File | Transitions |
|--------|------|-------------|
| JournalEntry | `fin/journalentries/` | DRAFT→{SUBMITTED}, SUBMITTED→{POSTED,REJECTED} |
| Budget | `fin/budgets/` | DRAFT→{SUBMITTED}, SUBMITTED→{APPROVED}, APPROVED→{ACTIVE}, ACTIVE→{FROZEN,CLOSED} |
| Asset | `fin/assets/` | ACTIVE→{FULLY_DEPRECIATED,DISPOSED,IMPAIRED,TRANSFERRED,RETIRED}, IMPAIRED→{ACTIVE} |
| CapitalExpenditure | `fin/capitalexpenditures/` | per enum values |
| CashForecast | `fin/cashforecasts/` | per enum values (if status exists) |

### Flow 4: Plan-to-Produce (MFG) — 6 entities

| Entity | File | Transitions |
|--------|------|-------------|
| MfgBom | `mfg/boms/` | DRAFT→{ACTIVE,ON_HOLD}, ACTIVE→{REVISION}, ON_HOLD→{ACTIVE} |
| MfgProductionOrder | `mfg/productionorders/` | PLANNED→{RELEASED,CANCELLED}, RELEASED→{IN_PROGRESS,CANCELLED}, IN_PROGRESS→{COMPLETED,CANCELLED} |
| MfgWorkOrder | `mfg/workorders/` | PLANNED→{RELEASED,CANCELLED}, RELEASED→{IN_PROGRESS,ON_HOLD,CANCELLED}, IN_PROGRESS→{COMPLETED,ON_HOLD,CANCELLED}, ON_HOLD→{RELEASED,IN_PROGRESS}, COMPLETED→{CLOSED} |
| MfgNCR | `mfg/ncrs/` | OPEN→{INVESTIGATING}, INVESTIGATING→{CONTAINED}, CONTAINED→{CORRECTIVE_ACTION} |
| MfgEngChangeOrder | `mfg/engchangeorders/` | DRAFT→{SUBMITTED}, SUBMITTED→{APPROVED,REJECTED}, APPROVED→{IN_PROGRESS}, IN_PROGRESS→{COMPLETED} |
| MfgRouting | `mfg/routings/` | Same as MfgBom (shared MfgBomStatus) |

### Flow 6: Issue-to-Resolution (CRM) — 5 entities

| Entity | File | Transitions |
|--------|------|-------------|
| CrmLead | `crm/leads/` | NEW→{CONTACTED,DISQUALIFIED}, CONTACTED→{QUALIFIED,DISQUALIFIED}, QUALIFIED→{CONVERTED,LOST} |
| CrmOpportunity | `crm/opportunities/` | OPEN→{WON,LOST,ON_HOLD,CANCELLED} |
| CrmServiceOrder | `crm/serviceorders/` | NEW→{SCHEDULED,CANCELLED}, SCHEDULED→{IN_PROGRESS,CANCELLED}, IN_PROGRESS→{COMPLETED,CANCELLED} |
| CrmCampaign | `crm/campaigns/` | PLANNED→{ACTIVE}, ACTIVE→{COMPLETED,PAUSED} |
| CrmServiceContract | `crm/servicecontracts/` | DRAFT→{ACTIVE,CANCELLED}, ACTIVE→{EXPIRED,CANCELLED} |

---

## Step 3: HCM Custom Callbacks (Flow 5: Hire-to-Retire) — DEFERRED

HCM's 57 callbacks use `NewServiceCallback` directly (not VB). Adding transitions uses the variadic param:

```go
common.NewServiceCallback("Application", setID, validateFn,
    applicationTransitions().BuildValidator())
```

**Deferred to separate follow-up** to keep this PR focused. HCM callbacks are complex with reference validation and the risk of unintended side effects is higher.

---

## Step 4: Verify

1. `go build ./erp/common/` — framework compiles
2. `go build` individual module packages — each module compiles
3. `go vet` — no issues
4. Run mock data generator — POSTs still succeed (InitialStatus=0 skips POST enforcement)
5. Verify transition tables: each enum value must exist in the .pb.go `_name` map

---

## Files Summary

| File | Action | Lines |
|------|--------|-------|
| `go/erp/common/status_machine.go` | **New** | ~80 |
| `go/erp/common/service_callback.go` | Modify | +15 |
| `go/erp/common/validation_builder.go` | Modify | +15 |
| 7 Sales/FIN callback files | Modify | +25 each |
| 5 SCM/FIN callback files | Modify | +25 each |
| 5 FIN callback files | Modify | +25 each |
| 6 MFG callback files | Modify | +25 each |
| 5 CRM callback files | Modify | +25 each |
| **Total** | ~31 files | ~800 lines |

## Note on Exact Enum Values

Transition maps use integer constants that must be verified against each entity's `.pb.go` file during implementation. The tables above show logical flow; exact integer values will be read from:
```bash
grep -A 20 "StatusName_name" go/types/<module>/*.pb.go
```
