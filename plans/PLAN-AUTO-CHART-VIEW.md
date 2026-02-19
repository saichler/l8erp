# Plan: Auto-Enable Chart View for Date+Money Models

## Goal

Any table view whose columns include both a date column (`type: 'date'`) and a money column (`type: 'money'`) should automatically get chart view support. The chart groups data by **year/quarter** on the X axis and sums money values on the Y axis.

## Why Automatic Detection

Instead of manually adding `supportedViews: ['table', 'chart']` to dozens of config entries (and remembering to do it for every future module), detect date+money column pairs at runtime and inject chart support automatically. Two files change; zero config files change.

## Affected Models (auto-detected at runtime)

All models with both `col.date()` and `col.money()` columns across all modules:

| Module | Model | Date Column(s) | Money Column(s) |
|--------|-------|----------------|-----------------|
| FIN | PurchaseInvoice | invoiceDate, dueDate | totalAmount |
| FIN | PaymentSchedule | scheduledDate | amount |
| FIN | VendorPayment | paymentDate | amount |
| FIN | VendorStatement | statementDate | closingBalance |
| FIN | SalesInvoice | invoiceDate, dueDate | totalAmount |
| FIN | CustomerPayment | paymentDate | amount |
| FIN | CreditMemo | memoDate | amount |
| FIN | DunningLetter | letterDate | totalOverdue |
| FIN | Forecast | periodStart, periodEnd | projectedAmount, actualAmount |
| FIN | CashForecast | forecastDate | projectedInflows, projectedOutflows, netCashFlow |
| FIN | FundTransfer | transferDate | amount |
| FIN | Asset | acquisitionDate | acquisitionCost, netBookValue |
| Sales | SalesQuotation | quotationDate, validUntil | totalAmount |
| Sales | SalesOrder | orderDate | totalAmount |
| Sales | SalesCustomerContract | startDate, endDate | contractValue |
| Sales | SalesBillingSchedule | nextBillingDate | totalAmount |
| Sales | SalesPromotionalPrice | startDate, endDate | promotionalPrice |
| PRJ | PrjBillingRate | effectiveFrom, effectiveUntil | rate |
| PRJ | PrjProjectInvoice | invoiceDate, dueDate | totalAmount, paidAmount |
| PRJ | PrjRevenueRecognition | periodEnd | recognizedAmount, deferredAmount |
| PRJ | PrjProjectBudget | approvedDate | budgetedAmount, actualAmount, remainingAmount |
| PRJ | PrjExpenseReport | submitDate, approvedDate | totalAmount |
| CRM | CrmCampaign | startDate, endDate | budgetedCost |
| ECOM | EcomOrder | orderDate | totalAmount |
| ECOM | EcomReturn | requestedDate | refundAmount |
| ECOM | EcomCart | createdDate | subtotal, total |

Models with `col.period()` (SalesTarget, SalesForecast) are unaffected - they already use L8Period normalization.

## Changes

### File 1: `go/erp/ui/web/l8ui/shared/layer8d-service-registry.js`

**What**: Auto-add `'chart'` to `supportedViews` when columns contain both `type: 'date'` and `type: 'money'`.

**Where**: `initializeServiceTable()`, between getting `columns` (line 83) and building `allViewTypes` (line 103).

**Logic**:
```javascript
// After line 83: const columns = getColumns(parentModule, service.model);
// Before line 103: const allViewTypes = ...

let allViewTypes = service.supportedViews ? service.supportedViews.slice() : ['table'];
const hasDate = columns.some(c => c.type === 'date');
const hasMoney = columns.some(c => c.type === 'money');
if (hasDate && hasMoney && allViewTypes.indexOf('chart') === -1) {
    allViewTypes.push('chart');
}
```

This handles all cases:
- No `supportedViews` declared → `['table']` → becomes `['table', 'chart']`
- `['table', 'kanban']` → becomes `['table', 'kanban', 'chart']`
- `['table', 'chart']` already → unchanged (indexOf check)
- No date or no money → unchanged

### File 2: `go/erp/ui/web/l8ui/chart/layer8d-chart-core.js`

Three changes in this file:

#### Change 2a: `_autoDetectFields()` — add date column detection

Add date column detection between existing period detection and status/type pattern detection. When money columns are also present, prefer date as the category field (the whole point is money-over-time charts).

```javascript
_autoDetectFields() {
    const cols = this.columns || [];
    const pk = cols.length > 0 ? cols[0].key : '';
    const candidates = cols.filter(c => c.key !== pk);

    // 1. Priority: period columns (existing — L8Period)
    const periodCol = candidates.find(c => c.type === 'period');
    if (periodCol) {
        this.categoryField = periodCol.key;
    }

    // 2. NEW: Date columns when money columns also exist → money-over-time chart
    if (!this.categoryField) {
        const hasMoney = candidates.some(c => c.type === 'money');
        if (hasMoney) {
            const dateCol = candidates.find(c => c.type === 'date');
            if (dateCol) {
                this.categoryField = dateCol.key;
            }
        }
    }

    // 3. Existing: status/type/category/health exact + suffix patterns
    // (unchanged)

    // 4. Existing: valueField detection (Amount, Value, Price, Cost, Total, ...)
    // (unchanged)
}
```

**Priority order**: period > date+money > status/type/category > fallback. This ensures:
- L8Period models (SalesTarget, SalesForecast) keep existing behavior
- Date+money models get date as category (not status, even if they have a status column)
- Status-only models (no money) keep existing behavior

#### Change 2b: `_aggregateData()` — detect timestamps and normalize

After the existing L8Period detection block (lines 139-144), add timestamp detection:

```javascript
// Existing L8Period check (unchanged)
if (firstVal && typeof firstVal === 'object' && firstVal.periodType !== undefined) {
    return this._normalizePeriodData(items);
}

// NEW: Detect Unix timestamps (date columns) and normalize to year/quarter
if (typeof firstVal === 'number' && firstVal > 946684800) {  // > Jan 1 2000
    return this._normalizeDateData(items);
}
```

The threshold `946684800` (Unix timestamp for 2000-01-01) distinguishes timestamps from small integers (enum values, counts). All ERP dates are well above this.

#### Change 2c: New `_normalizeDateData()` method

Add after `_normalizePeriodData()` (after line 208):

```javascript
_normalizeDateData(items) {
    const groups = {};
    items.forEach(item => {
        const ts = this._getNestedValue(item, this.categoryField);
        if (!ts || typeof ts !== 'number') return;
        const d = new Date(ts * 1000);  // Unix seconds → JS milliseconds
        const year = d.getFullYear();
        const q = Math.ceil((d.getMonth() + 1) / 3);
        const key = year + '-Q' + q;
        const label = year + ' / Q' + q;
        if (!groups[key]) {
            groups[key] = { key, label, values: [], items: [] };
        }
        groups[key].values.push(this._getValue(item));
        groups[key].items.push(item);
    });

    return Object.values(groups)
        .sort((a, b) => a.key.localeCompare(b.key))
        .map(g => ({
            label: g.label,
            value: this._aggregate(g.values),
            count: g.items.length,
            items: g.items
        }));
}
```

Labels format: `"2025 / Q1"`, `"2025 / Q2"`, etc. — consistent with existing L8Period labels (`"2025 / Q1"`).

Sort key format: `"2025-Q1"` — lexicographic sort = chronological order.

### File 3: `go/erp/ui/web/l8ui/GUIDE.md`

Update the Chart component documentation to describe:
- Auto-detection of date+money columns → chart view enabled automatically
- Date normalization to year/quarter
- Priority order: period > date+money > status/type

## What Does NOT Change

- **Zero config files** — no manual `supportedViews` additions
- **L8Period models** — SalesTarget and SalesForecast keep existing behavior (period detected first)
- **Non-date-money models** — no chart view added
- **Existing chart behavior** — status/type/category auto-detection unchanged for models without money columns
- **Mobile parity** — mobile does not currently have chart views; this is desktop-only (same as existing chart support)

## Verification

1. `node -c layer8d-service-registry.js` — syntax check
2. `node -c layer8d-chart-core.js` — syntax check
3. Navigate to FIN > Accounts Payable > Purchase Invoices → view switcher dropdown should appear with Chart option
4. Switch to Chart view → bars should show `"YYYY / Qn"` labels with totalAmount values
5. Navigate to Sales > Orders > Sales Orders → chart should also be available (even though it also has kanban)
6. Navigate to Sales > Analytics > Sales Targets → chart should still work with L8Period (existing behavior preserved)
7. Navigate to HCM > Core HR > Employees → no chart view (has date but no money columns)

## Line Count Impact

- `layer8d-service-registry.js`: +4 lines (132 → ~136, well under 500)
- `layer8d-chart-core.js`: +30 lines (441 → ~471, under 500)
- Net: ~34 lines added across 2 files
