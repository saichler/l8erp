# Plan: Fix Desktop/Mobile Detail Popup Rendering Parity

## Problem Statement

Users report that desktop and mobile detail popups do NOT show the same information across all modules. After investigation, the root cause is twofold:

### Root Cause 1: Nested Value Access (CRITICAL - Missing Data)

Desktop `generateFormHtml()` uses `getNestedValue(data, field.key)` which supports dot-notation keys like `auditInfo.createdBy`. Mobile `renderForm()` uses `data[field.key]` which does **flat property lookup only** -- any field with a dotted key returns `undefined` on mobile, causing the field to appear empty.

**Fields affected**: ALL audit fields (`auditInfo.createdBy`, `auditInfo.createdDate`, `auditInfo.modifiedBy`, `auditInfo.modifiedDate`), all address sub-fields (`address.line1`, `address.city`, etc.), contact sub-fields (`contactInfo.value`, `contactInfo.contactType`), and any other nested fields across all modules.

### Root Cause 2: Different Rendering Approaches (Visual Differences)

Desktop renders read-only fields as formatted text spans via `formatFieldDisplayValue()`:
```html
<span class="form-display-value">03/15/2025</span>
<span class="form-display-value">Active</span>
<span class="form-display-value">$1,500.00</span>
```

Mobile renders read-only fields as disabled native HTML inputs:
```html
<input type="text" value="2025-03-15" readonly disabled>  <!-- date: YYYY-MM-DD vs MM/DD/YYYY -->
<select disabled><option selected>Active</option></select> <!-- select: dropdown vs text -->
<input type="number" value="1500.00" readonly>             <!-- money: number vs formatted -->
```

Key visual differences per field type:

| Field Type | Desktop Display | Mobile Display | Difference |
|------------|----------------|----------------|------------|
| date | `03/15/2025` (MM/DD/YYYY span) | `2025-03-15` (YYYY-MM-DD input) | Format mismatch |
| date (zero) | `Current` or `N/A` | `Current` or `N/A` | OK |
| select/enum | `Active` (text span) | `<select disabled>` dropdown | Visual mismatch |
| checkbox | `Yes` / `No` (text) | Disabled checkbox widget | Visual mismatch |
| money | `$1,500.00` (formatted span) | Currency dropdown + number input | Layout mismatch |
| currency | `$1,500.00` | `$ [1500.00]` (prefix + number) | Format mismatch |
| percentage | `75.00%` | `[75.00] %` (number + suffix) | Format mismatch |
| period | `Monthly Jan 2025` | 3 disabled selects | Layout mismatch |
| ssn | `***-**-6789` | `***-**-6789` (input) | OK |
| reference | ID then resolved name | ID then resolved name | OK |
| text/textarea | Text span | Readonly input | Visual only |

## Solution: Unified Read-Only Rendering

Make mobile use `formatFieldDisplayValue()` (from the desktop shared library, already loaded on mobile) for ALL read-only field display. This means:

1. When `readonly=true`, mobile renders a **display span** with the formatted value -- identical to desktop
2. When `readonly=false` (edit mode), mobile keeps its current native input rendering -- no change

This approach:
- Fixes nested value access (we add `getNestedValue` to mobile's `renderForm`)
- Eliminates ALL visual formatting differences in read-only mode
- Requires changes in only 2 files (mobile rendering code)
- Zero risk to edit mode (no changes to edit rendering)
- Zero risk to desktop (no changes at all)

---

## Phase 1: Add Nested Value Access to Mobile renderForm

**File**: `l8ui/m/js/layer8m-forms.js`

In `renderForm()`, change `data[field.key]` to use `getNestedValue`:

```js
// BEFORE (line 113):
const value = data[field.key];

// AFTER:
const value = Layer8MForms._getNestedValue(data, field.key);
```

Add `_getNestedValue` helper to `Layer8MForms`:

```js
_getNestedValue(obj, key) {
    if (!obj || !key) return undefined;
    if (!key.includes('.')) return obj[key];
    return key.split('.').reduce((o, k) => o && o[k], obj);
}
```

This alone fixes ALL missing data from nested fields.

---

## Phase 2: Unified Read-Only Field Rendering

**File**: `l8ui/m/js/layer8m-forms.js`

When `readonly=true`, instead of dispatching to type-specific renderers that produce native inputs, render a display span using the desktop's `formatFieldDisplayValue`:

```js
renderField(fieldConfig, value, readonly = false) {
    const type = fieldConfig.type || 'text';
    const F = Layer8MFormFields;

    // Read-only mode: use unified display formatting (matches desktop exactly)
    if (readonly) {
        return F.renderReadOnlyField(fieldConfig, value);
    }

    // Edit mode: use type-specific input renderers (unchanged)
    switch (type) {
        // ... existing switch cases unchanged ...
    }
}
```

**File**: `l8ui/m/js/layer8m-forms-fields.js`

Add `renderReadOnlyField` that delegates to desktop's `formatFieldDisplayValue` for most types, with special handling for reference, file, money, and inlineTable:

```js
F.renderReadOnlyField = function(config, value) {
    const type = config.type || 'text';
    const esc = Layer8MUtils.escapeHtml;

    // Special types that need their own read-only rendering:

    // Reference fields: need disabled input with data-ref-config for picker resolution
    if (type === 'reference') {
        return F.renderReferenceField(config, value, true);
    }

    // File fields: need download button
    if (type === 'file') {
        return F.renderFileField(config, value, true);
    }

    // Inline tables: need card-based display
    if (type === 'inlineTable') {
        return F.renderInlineTableField(config, value, true);
    }

    // Money fields: use desktop formatMoney for display
    if (type === 'money') {
        let displayValue = '-';
        if (value && typeof value === 'object' && value.amount) {
            displayValue = Layer8DUtils.formatMoney(value);
        } else if (value) {
            displayValue = Layer8DUtils.formatMoney(value);
        }
        return `<div class="mobile-form-field">
            <label class="mobile-form-label">${esc(config.label)}</label>
            <span class="mobile-form-display-value">${esc(displayValue)}</span>
        </div>`;
    }

    // All other types: use desktop formatFieldDisplayValue
    const displayValue = Layer8DFormsFields.formatFieldDisplayValue(config, value);

    return `<div class="mobile-form-field">
        <label class="mobile-form-label">${esc(config.label)}</label>
        <span class="mobile-form-display-value">${esc(displayValue)}</span>
    </div>`;
};
```

**Prerequisite**: `formatFieldDisplayValue` must be exposed on `Layer8DFormsFields` (currently it's a local function inside the IIFE). We need to export it.

**File**: `l8ui/shared/layer8d-forms-fields.js`

Export `formatFieldDisplayValue` on the global object:

```js
// At the bottom of the IIFE, add to the window.Layer8DFormsFields assignment:
window.Layer8DFormsFields = {
    generateFormHtml,
    generateInlineTableHtml,
    formatFieldDisplayValue,   // <-- ADD THIS
    // ... existing exports ...
};
```

---

## Phase 3: CSS for Mobile Display Value Spans

**File**: `l8ui/m/css/layer8m-forms.css`

Add a `.mobile-form-display-value` class that matches the desktop `.form-display-value` styling but adapted for mobile layout:

```css
.mobile-form-display-value {
    display: block;
    padding: 10px 12px;
    font-size: 14px;
    color: var(--text-primary, #1a202c);
    background: var(--layer8d-bg-light, #f7fafc);
    border: 1px solid var(--layer8d-border, #e2e8f0);
    border-radius: 8px;
    min-height: 20px;
    word-break: break-word;
}
```

---

## Phase 4: End-to-End Verification

For every module, verify detail popup parity:

1. Open a record detail on desktop -- note all fields and their displayed values
2. Open the same record detail on mobile -- verify identical field list and identical values
3. Pay special attention to:
   - [ ] Audit fields (createdBy, createdDate, modifiedBy, modifiedDate) -- were previously broken by nested access
   - [ ] Date fields -- should now show MM/DD/YYYY on both platforms
   - [ ] Select/enum fields -- should now show label text (not dropdown)
   - [ ] Money fields -- should now show formatted amount (not separate currency+number)
   - [ ] Checkbox fields -- should now show "Yes"/"No" text
   - [ ] Period fields -- should now show formatted string
   - [ ] Reference fields -- should still resolve display names on both

Modules to verify:
- [ ] HCM (Employee, Department, Position, etc.)
- [ ] FIN (Account, Vendor, Customer, etc.)
- [ ] SCM (Item, Warehouse, PurchaseOrder, etc.)
- [ ] Sales (SalesOrder, Customer, Territory, etc.)
- [ ] MFG (WorkOrder, BOM, Routing, etc.)
- [ ] CRM (Lead, Opportunity, Case, etc.)
- [ ] PRJ (Project, Task, etc.)
- [ ] BI (Report, Dashboard, etc.)
- [ ] DOC (Document, etc.)
- [ ] COMP (ComplianceRequirement, etc.)
- [ ] ECOM (Product, Order, etc.)
- [ ] Lending (LoanApplication, etc.)
- [ ] SYS (Security users/roles)

---

## Traceability Matrix

| # | Gap | Phase |
|---|-----|-------|
| 1 | Nested value access: `data[field.key]` misses dot-notation keys → empty audit/address/contact fields | Phase 1 |
| 2 | Date format: YYYY-MM-DD (mobile) vs MM/DD/YYYY (desktop) | Phase 2 |
| 3 | Select display: disabled dropdown (mobile) vs text label (desktop) | Phase 2 |
| 4 | Checkbox display: disabled widget (mobile) vs "Yes"/"No" text (desktop) | Phase 2 |
| 5 | Money display: currency dropdown + number input (mobile) vs "$1,500.00" (desktop) | Phase 2 |
| 6 | Currency display: `$[1500.00]` (mobile) vs `$1,500.00` (desktop) | Phase 2 |
| 7 | Percentage display: `[75.00]%` (mobile) vs `75.00%` (desktop) | Phase 2 |
| 8 | Period display: 3 disabled selects (mobile) vs "Monthly Jan 2025" (desktop) | Phase 2 |
| 9 | SSN display: both masked -- OK | N/A |
| 10 | Reference display: both resolve via picker -- OK (keep existing mobile reference rendering) | N/A |
| 11 | Missing CSS for display-value spans on mobile | Phase 3 |
| 12 | `formatFieldDisplayValue` not exported from desktop IIFE | Phase 2 |
| 13 | End-to-end verification across all 13 modules | Phase 4 |

---

## Files Changed

| File | Change |
|------|--------|
| `l8ui/m/js/layer8m-forms.js` | Add `_getNestedValue`, use it in `renderForm()`, add readonly guard in `renderField()` |
| `l8ui/m/js/layer8m-forms-fields.js` | Add `renderReadOnlyField()` method |
| `l8ui/shared/layer8d-forms-fields.js` | Export `formatFieldDisplayValue` on `Layer8DFormsFields` |
| `l8ui/m/css/layer8m-forms.css` | Add `.mobile-form-display-value` style |

## Risk Assessment

- **Zero risk to desktop**: No desktop files are functionally changed (only an export addition)
- **Zero risk to mobile edit mode**: The readonly guard only applies when `readonly=true`; edit mode rendering is completely unchanged
- **Reference fields**: Keep existing mobile reference rendering (disabled input with data-ref-config) since it needs picker resolution -- same as desktop
- **File fields**: Keep existing mobile file rendering (download button) -- same as desktop
- **Inline tables**: Keep existing mobile card-based rendering -- mobile-appropriate layout
