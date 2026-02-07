# Phase 13: Complex Type Form Display Fixes

## Problem

Nested protobuf object types display as "[Object]" in edit forms. The table columns render correctly using custom renderers, but the form framework has no handlers for nested object field types.

## Shared Complex Types in `erp-common.pb.go`

| Type | Fields | Usage Count | Form Impact |
|------|--------|-------------|-------------|
| `*erp.Money` | `{amount, currencyCode}` | 862 across 46 files | **FIXED** — Bug 1 |
| `*erp.Address` | `{line1, line2, city, stateProvince, postalCode, countryCode, ...}` | 59 across 15 files | **FIXED** — Bug 2 |
| `*erp.ContactInfo` | `{contactType, value, isPrimary, isVerified}` | 14 across 4 files | **FIXED** — Bug 3 |
| `*erp.DateRange` | `{startDate, endDate}` | 24 across 6 files | **FIXED** — Bug 4 |
| `*erp.AuditInfo` | `{createdAt, createdBy, modifiedAt, modifiedBy}` | N/A | OK — not editable, handled by `f.audit()` preset |

---

## Bug 1: Money — Missing 'money' type handler (DONE - Steps 1-2)

**Status: COMPLETE (all 5 steps)**

### Root Cause
`generateFieldHtml()` switch has no `case 'money':` — falls to default, `escapeAttr()` converts object to "[object Object]".
`collectFormData()` switch has no `case 'money':` — falls to default, sends raw string.

### Step 1: Add 'money' handler to generateFieldHtml() — DONE

### Step 2: Add 'money' handler to collectFormData() — DONE

### Step 3: Fix f.number() → f.money() in desktop form files

Verified against protobuf — these fields are confirmed `*erp.Money`:

| File | Field |
|------|-------|
| `fin/cash/cash-forms.js` | BankAccount.currentBalance |
| `fin/cash/cash-forms.js` | BankTransaction.amount |
| `fin/cash/cash-forms.js` | BankReconciliation.statementBalance |
| `fin/cash/cash-forms.js` | BankReconciliation.bookBalance |
| `fin/cash/cash-forms.js` | CashForecast.projectedInflows |
| `fin/cash/cash-forms.js` | CashForecast.projectedOutflows |
| `fin/cash/cash-forms.js` | CashForecast.netCashFlow |
| `fin/cash/cash-forms.js` | FundTransfer.amount |
| `fin/cash/cash-forms.js` | PettyCash.currentBalance |
| `fin/accounts-receivable/accounts-receivable-forms.js` | Customer.creditLimit |
| `fin/accounts-receivable/accounts-receivable-forms.js` | SalesInvoice.totalAmount |
| `fin/accounts-receivable/accounts-receivable-forms.js` | SalesInvoiceLine.unitPrice |
| `fin/accounts-receivable/accounts-receivable-forms.js` | SalesInvoiceLine.lineAmount |
| `fin/accounts-receivable/accounts-receivable-forms.js` | CustomerPayment.amount |
| `fin/accounts-receivable/accounts-receivable-forms.js` | PaymentApplication.appliedAmount |
| `fin/accounts-receivable/accounts-receivable-forms.js` | CreditMemo.amount |
| `fin/accounts-receivable/accounts-receivable-forms.js` | DunningLetter.totalOverdue |

**NOT a Money field** (verified `float64`):
- `mfg/costing/costing-forms.js` MfgOverhead.rate — stays as `f.number()`

### Step 4: Mirror Step 3 fixes in mobile form files

| File | Fields to fix |
|------|--------------|
| `m/js/fin/cash-management-forms.js` | Same 9 fields as desktop |
| `m/js/fin/accounts-receivable-forms.js` | Same 8 fields as desktop |

### Step 5: Systematic cross-check — DONE
Cross-referenced all `f.number()` field keys against protobuf `*erp.Money` fields. Only `rate` and `variance` overlapped — all verified as `float64`, correctly using `f.number()`. No remaining mismatches.

---

## Bug 2: Address — Nested object displayed as text/textarea

**Status: COMPLETE**

### Root Cause
`*erp.Address` is a nested object with 8 fields. Form definitions use `f.textarea()` or `f.text()` on the parent key, which calls `escapeHtml(value)` or `escapeAttr(value)` on the object, producing "[object Object]".

### Affected Form Fields (6 instances)

| File | Field | Protobuf Type | Current Form Type |
|------|-------|---------------|-------------------|
| `scm/warehouse/warehouse-forms.js:23` | address | `*erp.Address` | `f.textarea()` |
| `m/js/scm/warehouse-forms.js:30` | address | `*erp.Address` | `f.textarea()` |
| `scm/logistics/logistics-forms.js:45` | destinationAddress | `*erp.Address` | `f.text()` |
| `m/js/scm/logistics-forms.js:52` | destinationAddress | `*erp.Address` | `f.text()` |
| `crm/fieldservice/fieldservice-forms.js:36` | serviceAddress | `*erp.Address` | `f.textarea()` |
| `crm/fieldservice/fieldservice-forms.js:61` | homeLocation | `*erp.Address` | `f.text()` |

### Fix Approach
Replace single `f.textarea('address', ...)` with the existing `f.address()` preset which expands to 6 individual text fields (addressLine1, addressLine2, city, state, postalCode, country). This uses dot-notation keys like `address.line1`, `address.city`, etc.

**Requires**: Adding dot-notation support to `collectFormData()` and form population (see Bug 4).

### Other Address fields NOT in forms (no fix needed)
Many protobuf `*erp.Address` fields (Employee.addresses, Vendor.addresses, CrmAccount.billingAddress, etc.) are simply not included in form definitions. These are handled correctly — they just aren't editable in forms.

---

## Bug 3: ContactInfo — Nested object displayed as text

**Status: COMPLETE**

### Root Cause
Same pattern as Address. `*erp.ContactInfo` is `{contactType, value, isPrimary, isVerified}`.

### Affected Form Fields (2 instances)

| File | Field | Protobuf Type | Current Form Type |
|------|-------|---------------|-------------------|
| `scm/logistics/logistics-forms.js:23` | contactInfo | `*erp.ContactInfo` | `f.text()` |
| `m/js/scm/logistics-forms.js:30` | contactInfo | `*erp.ContactInfo` | `f.text()` |

### Fix Approach
Replace with the existing `f.contact()` preset which expands to email + phone fields, or create dot-notation fields like `contactInfo.value`, `contactInfo.contactType`.

**Requires**: Dot-notation support (see Bug 4).

---

## Bug 4: DateRange — Dot-notation keys don't work

**Status: COMPLETE**

### Root Cause
Forms use dot-notation keys like `f.date('reviewPeriod.startDate', ...)`. But:
- **Form population**: `data[field.key]` does `data['reviewPeriod.startDate']` which is `undefined` — the actual path is `data.reviewPeriod.startDate`
- **Form collection**: `collectFormData()` stores `data['reviewPeriod.startDate']` as a flat key, not a nested object

### Affected Form Fields (12 instances across 6 files)

| File | Fields |
|------|--------|
| `hcm/talent/talent-forms.js:24-25` | `reviewPeriod.startDate`, `reviewPeriod.endDate` |
| `m/js/hcm/talent-forms.js:37-38` | same |
| `scm/demand-planning/demand-planning-forms.js:43-44` | `planPeriod.startDate`, `planPeriod.endDate` |
| `m/js/scm/demand-planning-forms.js:50-51` | same |
| `scm/supply-planning/supply-planning-forms.js:44-45` | `planPeriod.startDate`, `planPeriod.endDate` |
| `m/js/scm/supply-planning-forms.js:52-53` | same |

### Fix Approach
Add dot-notation support to both `generateFormHtml()` (for reading nested values) and `collectFormData()` (for writing nested objects). This is a framework-level fix that enables Bug 2 and Bug 3 fixes as well.

```javascript
// Helper to get nested value: getNestedValue(data, 'reviewPeriod.startDate')
function getNestedValue(obj, key) {
    if (!key.includes('.')) return obj[key];
    return key.split('.').reduce((o, k) => o && o[k], obj);
}

// Helper to set nested value: setNestedValue(data, 'reviewPeriod.startDate', 123)
function setNestedValue(obj, key, value) {
    if (!key.includes('.')) { obj[key] = value; return; }
    const parts = key.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
}
```

---

## Bug 5: Array fields displayed as text (LOW PRIORITY)

### Root Cause
`[]string` fields like `skills` or `actionItems` are arrays. Using `f.text()` would call `escapeAttr(value)` on the array, producing text like "skill1,skill2,skill3" which is ugly but technically functional for display. Save would send a comma-separated string instead of an array.

### Affected Form Fields (2 instances)

| File | Field | Protobuf Type | Current Form Type |
|------|-------|---------------|-------------------|
| `crm/fieldservice/fieldservice-forms.js:59` | skills | `[]string` | `f.text()` |
| `crm/accounts/accounts-forms.js:113` | actionItems | `[]string` | `f.textarea()` |

### Fix Approach (future)
Create `f.tags()` or `f.stringList()` field type that renders a tag input and collects as array. Lower priority since the current behavior is functional (not "[Object]").

---

## Implementation Priority

1. **Bug 1 (Money)**: COMPLETE — all 5 steps done (862 usages fixed)
2. **Bug 4 (Dot-notation)**: COMPLETE — framework fix (getNestedValue/setNestedValue)
3. **Bug 2 (Address)**: COMPLETE — updated f.address() preset + 6 form fields fixed
4. **Bug 3 (ContactInfo)**: COMPLETE — updated f.contact() preset + 2 form fields fixed
5. **Bug 5 (Arrays)**: Low priority — functional but ugly (2 fields)

## Files Modified

| File | Action |
|------|--------|
| `l8ui/shared/layer8d-forms-fields.js` | Add 'money' case (DONE), add dot-notation reading |
| `l8ui/shared/layer8d-forms-data.js` | Add 'money' case (DONE), add dot-notation writing |
| `fin/cash/cash-forms.js` | f.number() → f.money() (9 fields) — DONE |
| `fin/accounts-receivable/accounts-receivable-forms.js` | f.number() → f.money() (8 fields) — DONE |
| `m/js/fin/cash-management-forms.js` | f.number() → f.money() (9 fields) |
| `m/js/fin/accounts-receivable-forms.js` | f.number() → f.money() (8 fields) |
| `scm/warehouse/warehouse-forms.js` | f.textarea('address') → f.address() preset |
| `m/js/scm/warehouse-forms.js` | same |
| `scm/logistics/logistics-forms.js` | Fix destinationAddress + contactInfo |
| `m/js/scm/logistics-forms.js` | same |
| `crm/fieldservice/fieldservice-forms.js` | Fix serviceAddress + homeLocation |
| `hcm/talent/talent-forms.js` | Fix reviewPeriod dot-notation |
| `m/js/hcm/talent-forms.js` | same |
| `scm/demand-planning/demand-planning-forms.js` | Fix planPeriod dot-notation |
| `m/js/scm/demand-planning-forms.js` | same |
| `scm/supply-planning/supply-planning-forms.js` | Fix planPeriod dot-notation |
| `m/js/scm/supply-planning-forms.js` | same |
