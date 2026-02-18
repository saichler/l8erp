# Plan: Calculated Fields (Section 1.3)

## Problem Statement

All protobuf types already have fields for computed values (totals, balances, variances, etc.) but no service callback computes them. These fields are either empty or filled with whatever the client sends. The server should auto-compute derived fields on save to ensure data integrity.

## Approach

### Framework Enhancement

Add a `.Compute()` method to `VB[T]` (validation_builder.go) as a semantic wrapper around `Custom()`. This signals "this modifies entity fields" vs `Custom()` which means "this validates entity fields." Compute functions run **in Before()**, before validation, so computed fields can be validated after computation.

```go
// Compute adds a function that derives/computes entity fields before validation.
func (b *VB[T]) Compute(fn func(*T) error) *VB[T] {
    return b.Custom(func(e *T, _ ifs.IVNic) error {
        return fn(e)
    })
}
```

### Shared Helpers

Add `SumLineMoney[L]` and `ComputeLineTotals[L]` generic helpers to `go/erp/common/compute.go`:

```go
// SumLineMoney sums a Money field across a slice of line items.
func SumLineMoney[L any](lines []*L, getter func(*L) *erp.Money) *erp.Money {
    total := int64(0)
    currencyId := ""
    for _, line := range lines {
        if m := getter(line); m != nil {
            total += m.Amount
            if currencyId == "" { currencyId = m.CurrencyId }
        }
    }
    if currencyId == "" { return nil }
    return &erp.Money{Amount: total, CurrencyId: currencyId}
}

// MoneySubtract returns a - b (same currency).
func MoneySubtract(a, b *erp.Money) *erp.Money { ... }

// MoneyAdd returns a + b (same currency).
func MoneyAdd(a, b *erp.Money) *erp.Money { ... }
```

### No Proto Changes Needed

All computed fields already exist in the protobuf types. No `make-bindings.sh` run required.

---

## Tier 1: Line-to-Header Totals (7 entities)

The most common pattern: parent entity has `repeated` child lines with amounts, parent has aggregate total fields.

### 1A. SalesOrder (Sales)

**File**: `go/erp/sales/salesorders/SalesOrderServiceCallback.go`

Compute on each line:
- `lineTotal` = `quantity * unitPrice.Amount - discountAmount.Amount + taxAmount.Amount`
- If `discountPercent > 0` and `discountAmount == nil`: `discountAmount = quantity * unitPrice.Amount * discountPercent / 100`

Compute on header:
- `subtotal` = sum of (`quantity * unitPrice.Amount`) across lines
- `discountTotal` = sum of `discountAmount` across lines
- `taxTotal` = sum of `taxAmount` across lines
- `totalAmount` = `subtotal.Amount - discountTotal.Amount + taxTotal.Amount`

### 1B. SalesQuotation (Sales)

**File**: `go/erp/sales/salesquotations/SalesQuotationServiceCallback.go`

Same pattern as 1A (SalesQuotation has identical line structure).

### 1C. SalesReturnOrder (Sales)

**File**: `go/erp/sales/returnorders/SalesReturnOrderServiceCallback.go`

- `refundAmount` = sum of line `lineTotal` values

### 1D. SalesInvoice (FIN)

**File**: `go/erp/fin/salesinvoices/SalesInvoiceServiceCallback.go`

- `subtotal` = sum of `lineAmount` from lines
- `taxAmount` = sum of line-level `taxAmount` from lines
- `totalAmount` = `subtotal + taxAmount`
- `balanceDue` = `totalAmount - amountPaid`

### 1E. PurchaseInvoice (FIN)

**File**: `go/erp/fin/purchaseinvoices/PurchaseInvoiceServiceCallback.go`

Same pattern as 1D.

### 1F. ScmPurchaseOrder (SCM)

**File**: `go/erp/scm/purchaseorders/ScmPurchaseOrderServiceCallback.go`

Compute on each line:
- `totalPrice` = `quantity * unitPrice.Amount`

Compute on header:
- `totalAmount` = sum of `totalPrice` across lines

### 1G. JournalEntry (FIN)

**File**: `go/erp/fin/journalentries/JournalEntryServiceCallback.go`

- `totalAmount` = sum of all debit amounts from lines (debits should equal credits)

---

## Tier 2: Derived Fields (8 entities)

Fields computed from other fields on the same entity (not from child lines with amounts, but from numeric fields, hour categories, balance components, etc.).

### 2A. Payslip (HCM)

**File**: `go/erp/hcm/payslips/PayslipServiceCallback.go`

- `totalHours` = `regularHours + overtimeHours + ptoHours + holidayHours + otherHours`
- `grossPay` = sum of `earnings[].amount`
- `totalDeductions` = sum of `deductions[].amount`
- `totalTaxes` = sum of `taxes[].amount`
- `netPay` = `grossPay - totalDeductions - totalTaxes`

### 2B. HCM Timesheet (HCM)

**File**: `go/erp/hcm/timesheets/TimesheetServiceCallback.go`

- `totalHours` = `totalRegularHours + totalOvertimeHours + totalDoubleTimeHours + totalPtoHours + totalSickHours + totalHolidayHours`

### 2C. LeaveBalance (HCM)

**File**: `go/erp/hcm/leavebalances/LeaveBalanceServiceCallback.go`

- `available` = `beginningBalance + accrued + carryover - used - pending - forfeited + adjusted`

### 2D. Asset (FIN)

**File**: `go/erp/fin/assets/AssetServiceCallback.go`

- `accumulatedDepreciation` = sum of `depreciationSchedules[].depreciationAmount`
- `netBookValue` = `acquisitionCost - accumulatedDepreciation`

### 2E. Budget (FIN)

**File**: `go/erp/fin/budgets/BudgetServiceCallback.go`

- `totalAmount` = sum of `lines[].budgetedAmount`
- For each line: `variance` = `budgetedAmount - actualAmount`, `variancePercent` = `(variance / budgetedAmount) * 100`

### 2F. PrjProjectBudget (PRJ)

**File**: `go/erp/prj/projectbudgets/PrjProjectBudgetServiceCallback.go`

- `remainingAmount` = `budgetedAmount - actualAmount`
- `remainingHours` = `budgetedHours - actualHours`

### 2G. MfgProductionOrder (MFG)

**File**: `go/erp/mfg/productionorders/MfgProductionOrderServiceCallback.go`

- `totalEstimatedCost` = sum of line estimated costs (already has After() hook, add Compute)
- `totalActualCost` = sum of line actual costs

### 2H. PrjTimesheet (PRJ)

**File**: `go/erp/prj/timesheets/PrjTimesheetServiceCallback.go`

- `totalHours` = sum of `entries[].hours`
- `billableHours` = sum of `entries[].hours` where `isBillable == true`
- `nonBillableHours` = `totalHours - billableHours`

---

## Implementation Order

### Step 1: Framework (1 file)
- Add `Compute()` to `validation_builder.go`
- Create `compute.go` with `SumLineMoney`, `MoneyAdd`, `MoneySubtract` helpers

### Step 2: Tier 1 — Line-to-Header Totals (7 files)
- 1A-1C: Sales module (3 callbacks)
- 1D-1E: FIN module invoices (2 callbacks)
- 1F: SCM purchase order (1 callback)
- 1G: FIN journal entry (1 callback)

### Step 3: Tier 2 — Derived Fields (8 files)
- 2A-2C: HCM module (3 callbacks)
- 2D-2E: FIN module (2 callbacks)
- 2F: PRJ budget (1 callback)
- 2G: MFG production order (1 callback)
- 2H: PRJ timesheet (1 callback)

### Step 4: Build Verification
- `go build ./erp/...`
- `go vet ./erp/...`
- `go build ./tests/mocks/`

## File Change Summary

| Category | Files | Description |
|----------|-------|-------------|
| Framework | 2 | `validation_builder.go` (+Compute), `compute.go` (new helpers) |
| Tier 1 callbacks | 7 | Add `.Compute(computeXxxTotals)` + compute functions |
| Tier 2 callbacks | 8 | Add `.Compute(computeXxxDerived)` + compute functions |
| **Total** | **17** | |

## What's NOT in Scope

These are better suited for reporting/analytics layers, not compute-on-save:

- **Period-based aggregations** (VendorStatement totals, aged receivables) — require querying all invoices/payments in a date range
- **Cross-entity metrics** (customer lifetime value, employee utilization rate) — require querying multiple unrelated entities
- **Time-based calculations** (days overdue, schedule variance) — depend on "now" and change without saves
- **Complex engines** (MRP, pricing, depreciation schedule generation) — separate Phase F features in MISSING-FEATURES.md
