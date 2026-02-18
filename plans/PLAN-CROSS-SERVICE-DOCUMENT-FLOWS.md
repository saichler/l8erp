# Plan: Cross-Service Document Flow Auto-Creation (1.2)

## Overview

Implement auto-creation of downstream documents when a parent entity transitions to a trigger status. This builds on the existing `After()` hook framework (used today for cascading status *changes*) to also cascade document *creation*.

**Existing infrastructure:**
- `After()` hooks on `ValidationBuilder` — run after PUT/PATCH persistence
- `GetEntities[T]` / `PutEntity[T]` helpers in `service_factory.go`
- 4 working cascade examples (SalesOrder→DeliveryOrder, SalesInvoice→CreditMemo, etc.)

**New infrastructure needed:**
- `PostEntity[T]` helper (create documents via service handler)

---

## Scope

Six end-to-end flows, broken into **3 tiers** by complexity and cross-module dependency:

| Tier | Flow | Cascades | Complexity |
|------|------|----------|------------|
| 1 | Order-to-Cash | 3 cascades | Medium (cross-module Sales→FIN) |
| 1 | Procure-to-Pay | 3 cascades | Medium (cross-module SCM→FIN) |
| 2 | Plan-to-Produce | 2 cascades | Medium (MFG internal) |
| 2 | Issue-to-Resolution | 1 cascade | Low (CRM internal) |
| 2 | Hire-to-Retire | 1 cascade + special | Medium (HCM uses manual callbacks) |
| 3 | Record-to-Report | Deferred to 1.3 | N/A — aggregation, not document creation |

**Record-to-Report rationale:** Trial Balance and Financial Statements are computed aggregation views (summing GL account balances), not documents created from a parent. JournalEntry POSTED should update running account balances — that's a calculated field (section 1.3), not a document flow.

---

## Prerequisites

### P1. Add `PostEntity[T]` helper

**File:** `go/erp/common/service_factory.go`

Add a generic helper following the `PutEntity` pattern but calling `handler.Post()` / `ifs.POST`:

```go
func PostEntity[T any](serviceName string, serviceArea byte, entity *T, vnic ifs.IVNic) (*T, error) {
    handler, ok := ServiceHandler(serviceName, serviceArea, vnic)
    if ok {
        resp := handler.Post(object.New(nil, entity), vnic)
        if resp.Error() != nil {
            return nil, resp.Error()
        }
        if resp.Element() != nil {
            return resp.Element().(*T), nil
        }
        return entity, nil
    }
    resp := vnic.Request("", serviceName, serviceArea, ifs.POST, entity, 30)
    if resp.Error() != nil {
        return nil, resp.Error()
    }
    if resp.Element() != nil {
        return resp.Element().(*T), nil
    }
    return entity, nil
}
```

Returns `(*T, error)` (not just `error`) so the caller can read the auto-generated ID from the created entity.

### P2. Proto field additions (linking fields)

Two entities use weak text references (`salesOrderNumber`, `purchaseOrderNumber`) instead of proper ID fields. Add proper ID fields for reliable cascade querying:

**`proto/fin-accounts_receivable.proto` — SalesInvoice:**
- Add `string sales_order_id = <next>` — direct link to SalesOrder
- Add `string delivery_order_id = <next>` — direct link to DeliveryOrder

**`proto/fin-accounts_payable.proto` — PurchaseInvoice:**
- Add `string purchase_order_id = <next>` — direct link to PurchaseOrder
- Add `string receiving_order_id = <next>` — direct link to ReceivingOrder

Then regenerate bindings: `cd proto && sed 's/-it /-i /g' make-bindings.sh | bash`

Update mock generators to populate the new ID fields.

### P3. Idempotency guard helper

Document creation cascades must be idempotent — if the parent is saved twice while in the trigger status, we must not create duplicate children. Add a helper:

```go
func EntityExists[T any](serviceName string, serviceArea byte, filter *T, vnic ifs.IVNic) (bool, error) {
    existing, err := GetEntities[T](serviceName, serviceArea, filter, vnic)
    if err != nil {
        return false, err
    }
    return len(existing) > 0, nil
}
```

Each cascade function checks existence before creating.

---

## Tier 1: Order-to-Cash + Procure-to-Pay

### 1A. SalesOrder CONFIRMED → auto-create SalesDeliveryOrder

**Trigger:** SalesOrder status changes to CONFIRMED (2)
**File:** `go/erp/sales/salesorders/SalesOrderServiceCallback.go`
**Action:** Create a SalesDeliveryOrder in PLANNED status, copying:
- `SalesOrderId` ← parent's ID
- `CustomerId` ← parent's CustomerId
- `WarehouseId` ← parent's WarehouseId
- `Lines` ← map each SalesOrderLine to a SalesDeliveryLine (itemId, quantity, unitOfMeasure)
- `PlannedDeliveryDate` ← parent's RequestedDeliveryDate
- `Status` ← PLANNED (1)

**Guard:** Check `EntityExists` for DeliveryOrder with matching SalesOrderId before creating.

**Note:** This callback already has an After() hook for `cascadeCancelDeliveryOrders`. The new cascade adds a second `.After()` call — the builder supports multiple.

### 1B. SalesDeliveryOrder DELIVERED → auto-create SalesInvoice

**Trigger:** SalesDeliveryOrder status changes to DELIVERED (5)
**File:** `go/erp/sales/deliveryorders/DeliveryOrderServiceCallback.go`
**Action:** Create a SalesInvoice (in FIN, area 40) in DRAFT status, copying:
- `SalesOrderId` ← parent's SalesOrderId (new proto field from P2)
- `DeliveryOrderId` ← parent's DeliveryOrderId (new proto field from P2)
- `CustomerId` ← parent's CustomerId
- `InvoiceDate` ← now
- `Lines` ← map delivery lines to invoice lines (itemId, quantity, derive amounts from order)
- `Status` ← DRAFT (1)

**Guard:** Check `EntityExists` for SalesInvoice with matching DeliveryOrderId.

**Cross-module:** This cascade creates a FIN entity from a Sales service. Uses `PostEntity[fin.SalesInvoice]("SalesInv", 40, ...)`.

### 1C. CustomerPayment COMPLETED → auto-update SalesInvoice status

**Trigger:** CustomerPayment status changes to COMPLETED (3)
**File:** `go/erp/fin/customerpayments/CustomerPaymentServiceCallback.go`
**Action:** For each PaymentApplication in the payment:
- Look up the SalesInvoice by `application.InvoiceId`
- Add `application.AppliedAmount` to invoice's `AmountPaid`
- Recalculate `BalanceDue = TotalAmount - AmountPaid`
- If `BalanceDue <= 0` → set status PAID (5)
- Else if `AmountPaid > 0` → set status PARTIALLY_PAID (4)
- `PutEntity` the updated invoice

**Note:** This is a status + field update cascade, not a document creation. No idempotency guard needed (recalculation is naturally idempotent).

### 1D. ScmPurchaseRequisition APPROVED → auto-create ScmPurchaseOrder

**Trigger:** ScmPurchaseRequisition status changes to APPROVED (3)
**File:** `go/erp/scm/purchasereqs/PurchaseRequisitionServiceCallback.go`
**Action:** Create a ScmPurchaseOrder in DRAFT status, copying:
- `RequisitionId` ← parent's RequisitionId
- `VendorId` ← parent's preferred vendor (if available, else leave blank)
- `RequesterId` ← parent's RequesterId
- `Lines` ← map requisition lines to PO lines
- `Status` ← DRAFT (1)

**Guard:** Check `EntityExists` for PurchaseOrder with matching RequisitionId.

**Note:** This callback already has an After() for `cascadeCancelPurchaseOrders`. Adds a second `.After()`.

### 1E. ScmReceivingOrder COMPLETED → auto-create PurchaseInvoice

**Trigger:** ScmReceivingOrder status changes to COMPLETED (3, via ScmTaskStatus)
**File:** `go/erp/scm/receivingorders/ReceivingOrderServiceCallback.go`
**Action:** Create a PurchaseInvoice (in FIN, area 40) in DRAFT status:
- `PurchaseOrderId` ← parent's PurchaseOrderId (new proto field from P2)
- `ReceivingOrderId` ← parent's ReceivingOrderId (new proto field from P2)
- Look up the PurchaseOrder to get VendorId, lines, amounts
- `VendorId` ← PO's VendorId
- `Lines` ← derive from PO lines + received quantities
- `Status` ← DRAFT (1)

**Guard:** Check `EntityExists` for PurchaseInvoice with matching ReceivingOrderId.

### 1F. VendorPayment COMPLETED → auto-update PurchaseInvoice status

**Trigger:** VendorPayment status changes to COMPLETED (3)
**File:** `go/erp/fin/vendorpayments/VendorPaymentServiceCallback.go`
**Action:** Same pattern as 1C but for PurchaseInvoice:
- For each allocation, look up PurchaseInvoice
- Update AmountPaid, recalculate BalanceDue
- Set status PAID or PARTIALLY_PAID

---

## Tier 2: Plan-to-Produce + Issue-to-Resolution + Hire-to-Retire

### 2A. MfgProductionOrder CONFIRMED → auto-create MfgWorkOrder(s)

**Trigger:** MfgProductionOrder status changes to CONFIRMED (2)
**File:** `go/erp/mfg/productionorders/MfgProductionOrderServiceCallback.go`
**Action:** For each line in the production order:
- Look up the item's BOM (`MfgBom` by itemId) to get components
- Look up the item's Routing (`MfgRouting` by routingId from BOM) to get operations
- Create a MfgWorkOrder with:
  - `ItemId` ← line's ItemId
  - `BomId` ← BOM's BomId
  - `RoutingId` ← BOM's RoutingId or Routing's RoutingId
  - `QuantityOrdered` ← line's quantity
  - `Operations` ← copy from Routing operations
  - `Status` ← PLANNED (1)

**Guard:** Check `EntityExists` for WorkOrder with matching production order reference.

**Note:** This is the most complex cascade — requires looking up BOM and Routing to populate the work order. If BOM/Routing lookup fails, log warning and skip (don't block the production order).

### 2B. MfgWorkOrder COMPLETED → auto-update MfgProductionOrder status

**Trigger:** MfgWorkOrder status changes to COMPLETED
**File:** `go/erp/mfg/workorders/MfgWorkOrderServiceCallback.go`
**Action:**
- Find the parent MfgProductionOrder
- Query all WorkOrders for that production order
- If ALL are COMPLETED → set production order to COMPLETED
- If SOME are COMPLETED → set production order to IN_PROGRESS (if not already)

**Note:** This is a "roll-up" cascade — child completion drives parent status.

### 2C. CrmCase RESOLVED → auto-create CrmSurvey

**Trigger:** CrmCase status changes to RESOLVED (4)
**File:** `go/erp/crm/cases/CrmCaseServiceCallback.go`
**Action:** Create a CrmSurvey in DRAFT status:
- `CaseId` ← parent's CaseId
- `AccountId` ← parent's AccountId
- `ContactId` ← parent's ContactId
- `Status` ← DRAFT (1)

**Guard:** Check `EntityExists` for CrmSurvey with matching CaseId.

### 2D. Application HIRED → auto-create Employee + OnboardingTasks

**Trigger:** Application status changes to HIRED (5)
**File:** `go/erp/hcm/applications/ApplicationServiceCallback.go`

**Special consideration:** HCM uses manual `NewServiceCallback` pattern (not ValidationBuilder). This cascade must be added to the existing manual callback rather than via `.After()`.

**Action:**
1. Look up the Applicant by `application.ApplicantId` to get name, contact info
2. Look up the JobRequisition by `application.RequisitionId` to get departmentId, jobId, positionId
3. Create an Employee:
   - `FirstName`, `LastName` ← from Applicant
   - `DepartmentId` ← from JobRequisition
   - `JobId` ← from JobRequisition
   - `HireDate` ← now
   - `EmploymentStatus` ← ACTIVE (1)
4. Create standard OnboardingTasks (DOCUMENTS, TRAINING, EQUIPMENT, etc.):
   - `EmployeeId` ← new employee's ID
   - `Status` ← PENDING (1)
   - Use a predefined list of default onboarding task templates

**Guard:** Check `EntityExists` for Employee linked to this Application (need a linking field — see note below).

**Note:** There is no `applicationId` field on Employee currently. Options:
- Add `applicationId` to Employee proto (preferred — enables traceability)
- Or use Applicant name matching (fragile, not recommended)

---

## File Change Summary

### New/Modified Framework Files
| File | Change |
|------|--------|
| `go/erp/common/service_factory.go` | Add `PostEntity[T]`, `EntityExists[T]` |

### Proto Changes (P2)
| File | Change |
|------|--------|
| `proto/fin-accounts_receivable.proto` | Add `sales_order_id`, `delivery_order_id` to SalesInvoice |
| `proto/fin-accounts_payable.proto` | Add `purchase_order_id`, `receiving_order_id` to PurchaseInvoice |
| `proto/hcm-recruitment.proto` | Add `application_id` to Employee (for Hire-to-Retire traceability) |

### Tier 1 Callback Changes (6 files)
| File | Cascade |
|------|---------|
| `go/erp/sales/salesorders/SalesOrderServiceCallback.go` | +`createDeliveryOrder` After() |
| `go/erp/sales/deliveryorders/DeliveryOrderServiceCallback.go` | +`createSalesInvoice` After() |
| `go/erp/fin/customerpayments/CustomerPaymentServiceCallback.go` | +`updateInvoicePaymentStatus` After() |
| `go/erp/scm/purchasereqs/PurchaseRequisitionServiceCallback.go` | +`createPurchaseOrder` After() |
| `go/erp/scm/receivingorders/ReceivingOrderServiceCallback.go` | +`createPurchaseInvoice` After() |
| `go/erp/fin/vendorpayments/VendorPaymentServiceCallback.go` | +`updatePurchaseInvoicePaymentStatus` After() |

### Tier 2 Callback Changes (4 files)
| File | Cascade |
|------|---------|
| `go/erp/mfg/productionorders/MfgProductionOrderServiceCallback.go` | +`createWorkOrders` After() |
| `go/erp/mfg/workorders/MfgWorkOrderServiceCallback.go` | +`rollUpProductionOrderStatus` After() |
| `go/erp/crm/cases/CrmCaseServiceCallback.go` | +`createSurvey` After() |
| `go/erp/hcm/applications/ApplicationServiceCallback.go` | +`createEmployeeAndOnboarding` (manual callback) |

### Mock Generator Updates
| File | Change |
|------|---------|
| `go/tests/mocks/gen_fin_ar.go` | Populate `SalesOrderId`, `DeliveryOrderId` on SalesInvoice |
| `go/tests/mocks/gen_fin_ap.go` | Populate `PurchaseOrderId`, `ReceivingOrderId` on PurchaseInvoice |
| `go/tests/mocks/gen_employees.go` (or similar) | Populate `ApplicationId` on Employee |

### JS Form Updates (new fields)
| File | Change |
|------|--------|
| Sales invoice forms | Add salesOrderId, deliveryOrderId reference fields |
| Purchase invoice forms | Add purchaseOrderId, receivingOrderId reference fields |
| Employee forms | Add applicationId reference field |

---

## Implementation Order

```
P1. PostEntity + EntityExists helpers
P2. Proto field additions + regenerate bindings
P3. Update mock generators for new fields
 │
 ├── Tier 1A: SalesOrder → DeliveryOrder
 ├── Tier 1B: DeliveryOrder → SalesInvoice
 ├── Tier 1C: CustomerPayment → update SalesInvoice
 ├── Tier 1D: PurchaseRequisition → PurchaseOrder
 ├── Tier 1E: ReceivingOrder → PurchaseInvoice
 ├── Tier 1F: VendorPayment → update PurchaseInvoice
 │
 ├── Tier 2A: ProductionOrder → WorkOrder(s)
 ├── Tier 2B: WorkOrder → roll up ProductionOrder
 ├── Tier 2C: CrmCase → CrmSurvey
 └── Tier 2D: Application → Employee + OnboardingTasks
```

Tiers 1 and 2 can be implemented in parallel after prerequisites are done. Within each tier, cascades are independent (no ordering dependency between 1A-1F or 2A-2D).

---

## Verification

After each cascade is implemented:
1. `go build ./erp/...` — compiles
2. `go vet ./erp/...` — no issues
3. `go build ./tests/mocks/` — mock generators compile with new fields

After all cascades:
- Run mock data generation to verify no regressions
- Manual test: change a SalesOrder to CONFIRMED → verify DeliveryOrder appears
- Manual test: change a DeliveryOrder to DELIVERED → verify SalesInvoice appears
- Repeat for each flow

---

## Out of Scope

- **Record-to-Report (Flow 3):** Deferred to section 1.3 (Calculated Fields) — Trial Balance and Financial Statements are aggregation views, not downstream documents
- **Pricing engine / tax calculations:** Line amounts on auto-created documents will be copied from the parent; no pricing recalculation
- **Approval workflows:** Auto-created documents start in DRAFT/PLANNED status; human approval advances them
- **Email notifications:** No notification when documents are auto-created (future integration work)
