# Plan: Phase 1.5 — Cascading Status Operations — COMPLETE ✓

## Context

MISSING-FEATURES.md section 1.5 identifies that "Closing a parent doesn't close/cancel children (for remaining independent related entities)" and "Status changes don't propagate." When a parent entity reaches a terminal status (CANCELLED, VOID, EXPIRED), related child Prime Objects should be automatically moved to their own terminal status.

Phase 1.4 (status transition enforcement) is already complete — each entity has a state machine preventing invalid transitions. This plan adds **cascading**: when a parent entity's status changes to a terminal state, related entities that reference it are automatically updated.

---

## Architectural Approach

### Mechanism: After() Hook

The `IServiceCallback` interface has an `After()` hook that runs after successful persistence. Currently `genericCallback[T].After()` returns `nil, true, nil` (empty). We'll add `afterActions` to the VB and genericCallback, running them in After() on PUT/PATCH operations.

### Framework Helpers

- **`GetEntities[T]`**: Fetch multiple entities matching a non-PK filter. Uses `resp.Elements()` (returns `[]interface{}`) from `IElements` interface — already available but unused.
- **`PutEntity[T]`**: Update an entity via its service handler. Uses existing `handler.Put()`.

### Error Handling

Cascades run in After() — the parent is already persisted. Cascade failures are **logged but don't fail** the parent operation. This is a pragmatic choice: the alternative (rolling back the parent) isn't supported by the framework's single-service transaction model.

### Idempotency

Each cascade checks the child's current status before updating. Children already in terminal states are skipped. This prevents double-cascading if the parent is updated while already in a terminal state.

---

## Step 1: Framework Changes (3 files in `go/erp/common/`)

### 1a. Modify: `service_callback.go` (+25 lines)

Add `afterActions` field and implement After():

```go
type genericCallback[T any] struct {
    typeName         string
    setID            SetIDFunc[T]
    validate         ValidateFunc[T]
    actionValidators []ActionValidateFunc[T]
    afterActions     []ActionValidateFunc[T]  // NEW
}
```

**Backward-compatible approach**: Keep existing `NewServiceCallback` unchanged. Add `NewServiceCallbackWithAfter` for callbacks that need After() actions. VB.Build() uses the new constructor only when afterActions exist.

After() implementation:
```go
func (cb *genericCallback[T]) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
    if action != ifs.PUT && action != ifs.PATCH {
        return nil, true, nil
    }
    if len(cb.afterActions) == 0 {
        return nil, true, nil
    }
    entity, ok := any.(*T)
    if !ok {
        return nil, true, nil
    }
    for _, aa := range cb.afterActions {
        if err := aa(entity, action, vnic); err != nil {
            // Log warning but don't fail parent — it's already persisted
        }
    }
    return nil, true, nil
}
```

### 1b. Modify: `service_factory.go` (+35 lines)

Add two new helpers:

```go
// GetEntities retrieves all entities matching a filter.
func GetEntities[T any](serviceName string, serviceArea byte, filter *T, vnic ifs.IVNic) ([]*T, error)

// PutEntity updates an entity via its service handler.
func PutEntity[T any](serviceName string, serviceArea byte, entity *T, vnic ifs.IVNic) error
```

### 1c. Modify: `validation_builder.go` (+10 lines)

Add `After()` method and wire through Build():

```go
func (b *VB[T]) After(fn ActionValidateFunc[T]) *VB[T] {
    b.afterActions = append(b.afterActions, fn)
    return b
}
```

---

## Step 2: Cascade Implementations (4 callback files)

### Cascade Rules

Based on protobuf foreign key analysis, these are the viable cascades (FK exists between parent and child Prime Objects):

| # | Parent | Trigger Status(es) | Child | FK Field | Target Status | Skip If Child Is |
|---|--------|-------------------|-------|----------|---------------|------------------|
| 1 | SalesOrder | CANCELLED (7) | DeliveryOrder | salesOrderId | FAILED (6) | DELIVERED(5), FAILED(6) |
| 2 | SalesInvoice | VOID (8) | CreditMemo | originalInvoiceId | VOID (4) | APPLIED(3), VOID(4) |
| 3 | CrmServiceContract | CANCELLED(4), EXPIRED(3) | CrmServiceOrder | contractId | CANCELLED (5) | COMPLETED(4), CANCELLED(5) |
| 4 | ScmPurchaseRequisition | CANCELLED (6) | PurchaseOrder | requisitionId | CANCELLED (7) | non-DRAFT only (skip 2-7) |

**Not cascaded** (by design):
- SalesOrder → ReturnOrder: Returns may be for already-delivered goods; cancelling the order shouldn't cancel a legitimate return.
- MfgBom OBSOLETE → MfgWorkOrder: In-progress work orders should complete with the BOM revision they started with.
- MfgProductionOrder → MfgWorkOrder: No FK link exists (WorkOrder has no productionOrderId field).
- PurchaseOrder → Shipment: No FK link exists (Shipment has no purchaseOrderId field).

### Cascade 1: SalesOrder → DeliveryOrder

**File**: `go/erp/sales/salesorders/SalesOrderServiceCallback.go`

When SalesOrder reaches CANCELLED(7), all non-terminal DeliveryOrders referencing it via `salesOrderId` are set to FAILED(6).

### Cascade 2: SalesInvoice → CreditMemo

**File**: `go/erp/fin/salesinvoices/SalesInvoiceServiceCallback.go`

When SalesInvoice reaches VOID(8), all non-terminal CreditMemos referencing it via `originalInvoiceId` are set to VOID(4).

### Cascade 3: CrmServiceContract → CrmServiceOrder

**File**: `go/erp/crm/servicecontracts/CrmServiceContractServiceCallback.go`

When CrmServiceContract reaches CANCELLED(4) or EXPIRED(3), all non-terminal CrmServiceOrders referencing it via `contractId` are set to CANCELLED(5).

### Cascade 4: ScmPurchaseRequisition → PurchaseOrder

**File**: `go/erp/scm/purchasereqs/PurchaseRequisitionServiceCallback.go`

When ScmPurchaseRequisition reaches CANCELLED(6), only DRAFT(1) PurchaseOrders referencing it via `requisitionId` are set to CANCELLED(7). POs already in APPROVED/SENT/RECEIVED status are left untouched.

---

## Step 3: Verify

1. `go build ./erp/common/` — framework compiles
2. `go build` individual module packages — each modified module compiles
3. `go vet ./erp/...` — no issues
4. `go test ./tests/` — all existing tests pass (mock data uses POST, cascades only trigger on PUT/PATCH)

---

## Files Summary

| File | Action | Lines |
|------|--------|-------|
| `go/erp/common/service_callback.go` | Modify | +25 |
| `go/erp/common/service_factory.go` | Modify | +35 |
| `go/erp/common/validation_builder.go` | Modify | +10 |
| `go/erp/sales/salesorders/SalesOrderServiceCallback.go` | Modify | +20 |
| `go/erp/fin/salesinvoices/SalesInvoiceServiceCallback.go` | Modify | +20 |
| `go/erp/crm/servicecontracts/CrmServiceContractServiceCallback.go` | Modify | +20 |
| `go/erp/scm/purchasereqs/PurchaseRequisitionServiceCallback.go` | Modify | +20 |
| **Total** | 7 files | ~150 lines |
