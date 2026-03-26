# Plan: Detail View Display Parity with Edit Popup

## Problem
The desktop detail view popup (`_showDetailsModal`) passes `{ readOnly: true }` to `generateFormHtml`. The readOnly branch in `generateFieldHtml` (line 111-128 of `layer8d-forms-fields.js`) renders all non-special fields as:
```javascript
displayValue = String(value);
```
This produces `[object Object]` for compound types and raw numbers for timestamps.

## Scope — Only 1 File Needs Changes
**File**: `go/erp/ui/web/l8ui/shared/layer8d-forms-fields.js`
**Function**: `generateFieldHtml`, the `isReadOnly` block (lines 111-128)

## Field Type Analysis

Only 7 field types are used across all 1,398 form fields in the ERP:

| Type | Count | Current readOnly output | Expected output | Fix needed? |
|------|-------|------------------------|-----------------|-------------|
| `text` | 548 | `String(value)` → correct | — | No |
| `number` | 254 | `String(value)` → correct | — | No |
| `money` | 158 | `String({amount,currencyId})` → **`[object Object]`** | `$1,234.56` | **YES** |
| `date` | 144 | `String(1710000000)` → **`1710000000`** | `03/09/2024` | **YES** |
| `reference` | 111 | Already fixed (renders as input) | — | No (done) |
| `checkbox` | 95 | `value ? 'Yes' : 'No'` → correct | — | No |
| `select` | 88 | `field.options[value]` → correct | — | No |

## Fixes Required

### Fix 1: Money fields — `[object Object]`
**Root cause**: Value is `{amount: 123456, currencyId: "CUR-001"}`. `String()` produces `[object Object]`.
**Fix**: Add `money` case before the generic `else`:
```javascript
} else if (field.type === 'money') {
    displayValue = Layer8DUtils.formatMoney(value);
```
`Layer8DUtils.formatMoney` already exists and handles `{amount, currencyId}` objects, returning formatted strings like `$1,234.56`. This is the same function used by columns/renderers.

### Fix 2: Date fields — raw timestamp
**Root cause**: Value is a Unix timestamp (e.g., `1710000000`). `String()` produces `"1710000000"`.
**Fix**: Add `date` case before the generic `else`:
```javascript
} else if (field.type === 'date' && typeof value === 'number') {
    displayValue = Layer8DUtils.formatDate(value);
```
`Layer8DUtils.formatDate` already exists, returns formatted date strings. Also handle zero-value dates using the existing `getDateZeroLabel` helper (already in the same file).

## Implementation

Single edit to the `isReadOnly` block in `generateFieldHtml`:

```javascript
if (isReadOnly) {
    let displayValue = '-';
    if (value !== null && value !== undefined && value !== '' && value !== 0) {
        if (field.type === 'select' && field.options && field.options[value] !== undefined) {
            displayValue = field.options[value];
        } else if (field.type === 'checkbox' || field.type === 'toggle') {
            displayValue = value ? 'Yes' : 'No';
        } else if (field.type === 'money') {
            displayValue = formatMoney(value);
        } else if (field.type === 'date' && typeof value === 'number') {
            displayValue = formatDate(value);
        } else {
            displayValue = String(value);
        }
    } else if (value === 0 && field.type === 'date') {
        displayValue = getDateZeroLabel(field.key);
    }
    return `
        <div class="form-group">
            <label for="field-${field.key}">${escapeHtml(field.label)}</label>
            <span class="form-display-value">${escapeHtml(displayValue)}</span>
        </div>
    `;
}
```

Note: `formatDate` and `formatMoney` are already destructured at the top of the file (line 13):
```javascript
const { escapeHtml, escapeAttr, formatDateForInput } = Layer8DUtils;
```
`formatDate` and `formatMoney` need to be added to this destructuring.

## Traceability Matrix

| # | Issue | Field Type | Count | Fix |
|---|-------|-----------|-------|-----|
| 1 | `[object Object]` | money | 158 | Add `formatMoney` case |
| 2 | Raw timestamp number | date | 144 | Add `formatDate` case |
| 3 | Raw IDs instead of names | reference | 111 | Already fixed (render as input) |

## Verification

After the fix:
1. `node -c layer8d-forms-fields.js` — syntax check
2. Open any HCM employee detail popup → money fields show `$X,XXX.XX`, date fields show `MM/DD/YYYY`, reference fields show resolved names
3. Open any FIN record detail popup → verify money and date fields
4. Verify edit popup still works identically (no regression — edit path is untouched)
