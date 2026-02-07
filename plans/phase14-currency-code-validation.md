# Phase 14: Money Currency — Model-First Fix

## Context

The `*erp.Money` protobuf type stores `currencyCode` as a free-text `string`. The system hardcodes `"USD"` everywhere — forms have no currency selector, mock data always uses `"USD"`, and there is no validation. Invalid currency codes can be submitted via the API.

**The proper fix starts in the model.** The existing `Currency` service (`go/erp/fin/currencies/`) already manages currency records with `{currencyId, code, name, symbol, decimalPlaces, isActive}`. The `Money.currency_code` field should become `currency_id` — a foreign key to the `Currency` service. The UI should use a reference picker (the same picker used for Employee, Department, etc.) when entering money values.

**Scale**:
- `Money.currency_code` in `erp-common.proto` — used by 862 `*erp.Money` fields across 46 `.pb.go` files
- 17 standalone `currency_code` fields across 11 proto files (HCM, Sales, SCM, MFG, PRJ, ECOM)
- 20 `f.text('currencyCode', ...)` calls across 14 JS form files (desktop + mobile)

---

## Step 1: Change the protobuf model

**File**: `proto/erp-common.proto`

```protobuf
// Before:
message Money {
  int64 amount = 1;
  string currency_code = 2;  // ISO 4217 currency code (e.g., "USD", "EUR")
}

// After:
message Money {
  int64 amount = 1;
  string currency_id = 2;  // Foreign key to Currency service
}
```

**Then**: Change all standalone `currency_code` fields to `currency_id` in these proto files:

| Proto File | Models Affected |
|------------|----------------|
| `hcm-compensation.proto` | SalaryGrade, SalaryStructure, EmployeeCompensation |
| `hcm-payroll.proto` | PayStructure |
| `sales-orders.proto` | SalesQuotation, SalesOrder |
| `sales-pricing.proto` | SalesPriceList, SalesCustomerPrice |
| `mfg-shopfloor.proto` | MfgWorkCenter |
| `mfg-costing.proto` | MfgStandardCost, MfgOverhead |
| `prj-timeexpense.proto` | PrjExpenseEntry |
| `prj-billing.proto` | PrjBillingRate, PrjProjectInvoice |
| `ecom-customers.proto` | EcomCustomer, EcomCart |

**Important**: Keep the same field number (e.g., `string currency_id = 2` in Money, same field numbers in all other protos). This preserves wire compatibility — only the field name changes, the type (`string`) and number stay the same.

**Run**: `cd proto && ./make-bindings.sh` to regenerate all `.pb.go` files.

**Verify**: `go build ./...` — all Go code using `.CurrencyCode` will fail. This is expected and fixed in Step 3.

---

## Step 2: Update form framework for money fields (JS)

### 2a: Update money field rendering

**File**: `l8ui/shared/layer8d-forms-fields.js` — replace `case 'money':` (lines 90-95)

The money input becomes a two-part group: a Currency reference picker + the existing amount input. The reference picker uses `lookupModel: 'Currency'` (already registered in `reference-registry-fin.js`).

```javascript
case 'money': {
    const moneyObj = (typeof value === 'object' && value !== null) ? value : {};
    const amountValue = moneyObj.amount !== undefined ? moneyObj.amount : value;
    const currencyId = moneyObj.currencyId || '';

    // Currency reference picker
    const currencyField = {
        key: field.key + '.__currencyId',
        label: 'Currency',
        type: 'reference',
        lookupModel: 'Currency'
    };
    const currencyHtml = generateReferenceInput(currencyField, currencyId);

    // Amount formatted input
    const amountField = { ...field, key: field.key + '.__amount', type: 'currency' };
    const amountHtml = generateFormattedInput(amountField, amountValue);

    inputHtml = `<div class="money-input-group">${currencyHtml}${amountHtml}</div>`;
    break;
}
```

### 2b: Update form data collection

**File**: `l8ui/shared/layer8d-forms-data.js` — replace `case 'money':` (lines 109-119)

Instead of hardcoding `currencyCode: 'USD'`, read the Currency ID from the reference picker:

```javascript
case 'money': {
    const amountEl = form.elements[field.key + '.__amount'];
    const currencyEl = form.elements[field.key + '.__currencyId'];
    let cents = null;
    if (amountEl) {
        if (typeof Layer8DInputFormatter !== 'undefined') {
            const raw = Layer8DInputFormatter.getValue(amountEl);
            cents = raw !== null && raw !== '' ? parseInt(raw, 10) : null;
        } else if (amountEl.dataset.rawValue) {
            cents = parseInt(amountEl.dataset.rawValue, 10);
            if (isNaN(cents)) cents = null;
        }
    }
    const currId = currencyEl ? (currencyEl.dataset.refId || '') : '';
    value = cents != null ? { amount: cents, currencyId: currId } : null;
    break;
}
```

### 2c: Add CSS for money input group

**File**: `l8ui/popup/layer8d-popup-forms.css` (add ~10 lines)

```css
.money-input-group { display: flex; gap: 8px; align-items: stretch; }
.money-input-group .reference-input { width: 120px; min-width: 120px; flex-shrink: 0; }
.money-input-group .formatted-input-wrapper { flex: 1; }
```

---

## Step 3: Update all Go code referencing `.CurrencyCode`

After regenerating protobuf bindings, every Go reference to `.CurrencyCode` must change to `.CurrencyId`. The compiler will catch all of them.

### 3a: Mock data helpers

**File**: `go/tests/mocks/utils.go`

```go
// Before:
func randomMoney(min, rangeSize int) *erp.Money {
    return &erp.Money{Amount: int64(rand.Intn(rangeSize) + min), CurrencyCode: "USD"}
}
func money(amount int64) *erp.Money {
    return &erp.Money{Amount: amount, CurrencyCode: "USD"}
}

// After:
func randomMoney(store *MockDataStore, min, rangeSize int) *erp.Money {
    return &erp.Money{Amount: int64(rand.Intn(rangeSize) + min), CurrencyId: pickRef(store.CurrencyIDs, rand.Intn(100))}
}
func money(store *MockDataStore, amount int64) *erp.Money {
    return &erp.Money{Amount: amount, CurrencyId: pickRef(store.CurrencyIDs, 0)}
}
```

**Note**: `randomMoney` and `money` now require `store` parameter. All callers (~86 mock files) must be updated. A search-and-replace handles this:
- `randomMoney(` → `randomMoney(store, `
- `money(` → `money(store, ` (careful: only match standalone `money(` calls)

### 3b: Standalone `currencyCode` fields in mock generators

All mock generators that set `CurrencyCode: "USD"` on standalone fields must change to `CurrencyId: pickRef(store.CurrencyIDs, i)`. These are in:

| Generator File | Models |
|---------------|--------|
| `gen_hcm_compensation.go` | SalaryGrade, SalaryStructure, EmployeeCompensation |
| `gen_hcm_payroll.go` | PayStructure |
| `gen_sales_foundation.go` | SalesPriceList |
| `gen_sales_orders.go` | SalesQuotation, SalesOrder |
| `gen_sales_pricing.go` | SalesCustomerPrice |
| `gen_mfg_shopfloor.go` | MfgWorkCenter |
| `gen_mfg_costing.go` | MfgStandardCost, MfgOverhead |
| `gen_prj_timeexpense.go` | PrjExpenseEntry |
| `gen_prj_billing.go` | PrjBillingRate, PrjProjectInvoice |
| `gen_ecom_customers.go` | EcomCustomer, EcomCart |

### 3c: Service callback validators — add `CurrencyId` validation

No service callbacks currently validate `currencyCode` (it was free text with no validation). After the rename, add `common.ValidateRequired(entity.CurrencyId, "CurrencyId")` to the `validate()` function in each service callback that has a standalone `currencyId` field.

**HCM** (4 service callbacks):

| Service Callback File | Model |
|-----------------------|-------|
| `go/erp/hcm/salarygrades/SalaryGradeServiceCallback.go` | SalaryGrade |
| `go/erp/hcm/salarystructures/SalaryStructureServiceCallback.go` | SalaryStructure |
| `go/erp/hcm/employeecompensations/EmployeeCompensationServiceCallback.go` | EmployeeCompensation |
| `go/erp/hcm/paystructures/PayStructureServiceCallback.go` | PayStructure |

**Sales** (4 service callbacks):

| Service Callback File | Model |
|-----------------------|-------|
| `go/erp/sales/pricelists/PriceListServiceCallback.go` | SalesPriceList |
| `go/erp/sales/customerprices/CustomerPriceServiceCallback.go` | SalesCustomerPrice |
| `go/erp/sales/salesquotations/SalesQuotationServiceCallback.go` | SalesQuotation |
| `go/erp/sales/salesorders/SalesOrderServiceCallback.go` | SalesOrder |

**MFG** (3 service callbacks):

| Service Callback File | Model |
|-----------------------|-------|
| `go/erp/mfg/workcenters/MfgWorkCenterServiceCallback.go` | MfgWorkCenter |
| `go/erp/mfg/standardcosts/MfgStandardCostServiceCallback.go` | MfgStandardCost |
| `go/erp/mfg/overheads/MfgOverheadServiceCallback.go` | MfgOverhead |

**PRJ** (2 service callbacks):

| Service Callback File | Model |
|-----------------------|-------|
| `go/erp/prj/billingrates/PrjBillingRateServiceCallback.go` | PrjBillingRate |
| `go/erp/prj/expenseentries/PrjExpenseEntryServiceCallback.go` | PrjExpenseEntry |

**ECOM** (2 service callbacks):

| Service Callback File | Model |
|-----------------------|-------|
| `go/erp/ecom/customers/EcomCustomerServiceCallback.go` | EcomCustomer |
| `go/erp/ecom/carts/EcomCartServiceCallback.go` | EcomCart |

**Total: 15 service callback files** need `CurrencyId` validation added.

**Note**: `PrjProjectInvoice` also has a standalone `currencyId` field — add validation to `go/erp/prj/projectinvoices/PrjProjectInvoiceServiceCallback.go` as well (16 total).

---

## Step 4: Convert standalone `currencyCode` form fields to Currency reference pickers

Replace `f.text('currencyCode', ...)` with `f.reference('currencyId', 'Currency', 'Currency')` in all form files.

**Desktop** (9 files, ~14 occurrences):

| File | Occurrences |
|------|-------------|
| `hcm/compensation/compensation-forms.js` | 3 |
| `hcm/payroll/payroll-forms.js` | 1 |
| `sales/orders/orders-forms.js` | 2 |
| `sales/pricing/pricing-forms.js` | 1 |
| `prj/timeexpense/timeexpense-forms.js` | 1 |
| `ecom/customers/customers-forms.js` | 2 |
| `mfg/shopfloor/shopfloor-forms.js` | 1 |
| `mfg/costing/costing-forms.js` | 1 |

**Note**: `prj/billing/billing-forms.js` has `currencyCode` in PrjBillingRate and PrjProjectInvoice — also needs updating (2 more).

**Mobile** (5+ files, ~8 occurrences):

| File | Occurrences |
|------|-------------|
| `m/js/hcm/compensation-forms.js` | 3 |
| `m/js/hcm/payroll-forms.js` | 1 |
| `m/js/sales/orders-forms.js` | 2 |
| `m/js/sales/pricing-forms.js` | 1 |
| `m/js/mfg/costing-forms.js` | 1 |

---

## Step 5: Update `formatMoney` renderers to resolve Currency symbol

### 5a: Desktop `formatMoney`

**File**: `l8ui/shared/layer8d-utils.js` — update `formatMoney()` (lines 252-271)

Currently reads `value.currencyCode` and passes to `Intl.NumberFormat`. After the change, `value.currencyId` is a UUID. The renderer needs to look up the Currency record to get the `code` (ISO 4217) for `Intl.NumberFormat`.

```javascript
function formatMoney(value, currency = 'USD') {
    if (value === null || value === undefined) return '-';

    let amount;
    let currencyCode = currency;

    if (typeof value === 'object') {
        amount = value.amount !== undefined ? value.amount / 100 : 0;
        // Look up currency code from registry if currencyId is present
        if (value.currencyId && typeof Layer8DReferenceRegistry !== 'undefined') {
            const cached = Layer8DReferenceRegistry._currencyCache;
            if (cached && cached[value.currencyId]) {
                currencyCode = cached[value.currencyId];
            }
        } else if (value.currencyCode) {
            currencyCode = value.currencyCode;  // backward compat
        }
    } else {
        amount = value / 100;
    }

    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency', currency: currencyCode
        }).format(amount);
    } catch (e) {
        return '$' + amount.toFixed(2);  // fallback
    }
}
```

**Currency cache**: On app load, fetch the Currency list once and build `{ currencyId: code }` map. Add a small helper to `layer8d-utils.js`:

```javascript
async function loadCurrencyCache() {
    // Fetch all currencies and cache id→code mapping
    // Called once during app initialization
}
```

### 5b: Mobile `formatMoney`

**File**: `l8ui/m/js/layer8m-utils.js` — update `formatMoney` (lines 86-93)

Currently only accepts raw cents. Update to handle Money objects with `currencyId`, same pattern as desktop.

---

## Step 6: Fix mobile money form handling

### 6a: Add money field rendering to mobile forms

**File**: `l8ui/m/js/layer8m-forms-fields.js` — add `renderMoneyField` method

Same two-part input group (Currency reference picker + amount input) adapted for mobile styling.

**Note**: This file is currently 495 lines. Adding code exceeds 500. **Split first**: extract `renderReferenceField` (~70 lines) into `layer8m-forms-fields-reference.js`, update `m/app.html`.

### 6b: Route `'money'` type in mobile form handler

**File**: `l8ui/m/js/layer8m-forms.js` — add case in `renderField` switch + data collection

### 6c: Add mobile CSS

**File**: `l8ui/m/css/layer8m-forms.css` (add ~10 lines for `.mobile-money-input-group`)

---

## Implementation Order

| Phase | Steps | What |
|-------|-------|------|
| 1 | Step 1 | Proto change + regenerate bindings |
| 2 | Step 3 | Fix all Go compilation errors (mock data, service callbacks) |
| 3 | Step 2 | Desktop form framework (rendering + data collection + CSS) |
| 4 | Step 4 | Convert standalone currencyCode fields to reference pickers |
| 5 | Step 5 | Update formatMoney renderers (desktop + mobile) |
| 6 | Step 6 | Mobile money form handling |

**Build gates**: `go build ./...` must pass after Phase 2. Full app functionality after all phases.

---

## Verification

1. `go build ./...` and `go vet ./...`
2. Desktop: open a money form field — verify Currency reference picker + amount input appear side by side
3. Desktop: click the Currency picker — verify it shows currency records (USD, EUR, GBP, etc.)
4. Desktop: edit a record — verify saved `currencyId` references a valid Currency record
5. Desktop: verify table columns display correct currency symbol for non-USD records
6. Mobile: same tests as desktop
7. Standalone `currencyId` fields: verify reference picker (not free text) in compensation, pricing, orders forms
8. Mock data: verify Money objects use `CurrencyId` references, not hardcoded "USD"

---

## Files Summary

| Action | File |
|--------|------|
| **EDIT** | `proto/erp-common.proto` — `currency_code` → `currency_id` |
| **EDIT** | 11 proto files — standalone `currency_code` → `currency_id` |
| **REGENERATE** | All `.pb.go` files via `make-bindings.sh` |
| **EDIT** | `go/tests/mocks/utils.go` — `randomMoney`/`money` use `CurrencyId` + `store` |
| **EDIT** | ~86 mock generator files — update `randomMoney`/`money` callers + standalone fields |
| **EDIT** | ~14 service callback files — `CurrencyCode` → `CurrencyId` |
| **EDIT** | `l8ui/shared/layer8d-forms-fields.js` — money field with Currency reference picker |
| **EDIT** | `l8ui/shared/layer8d-forms-data.js` — read Currency ID from reference picker |
| **EDIT** | `l8ui/popup/layer8d-popup-forms.css` — money input group styles |
| **EDIT** | `l8ui/shared/layer8d-utils.js` — `formatMoney` resolves `currencyId` → code |
| **EDIT** | `l8ui/m/js/layer8m-utils.js` — mobile `formatMoney` update |
| **EDIT** | `l8ui/m/js/layer8m-forms-fields.js` — add `renderMoneyField` |
| **EDIT** | `l8ui/m/js/layer8m-forms.js` — route money type |
| **EDIT** | `l8ui/m/css/layer8m-forms.css` — mobile money styles |
| **CREATE** | `l8ui/m/js/layer8m-forms-fields-reference.js` (split from existing) |
| **EDIT** | 9 desktop form files — `f.text('currencyCode')` → `f.reference('currencyId', 'Currency', 'Currency')` |
| **EDIT** | 5+ mobile form files — same conversion |
