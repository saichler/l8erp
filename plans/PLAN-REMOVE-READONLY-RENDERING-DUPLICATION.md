# Plan: Remove Read-Only Rendering Duplication

## Context

`generateFieldHtml()` in `layer8d-forms-fields.js` has TWO rendering paths:

1. **isReadOnly block** (lines 111-137): A flat if/else chain that handles only ~7 field types (`select`, `checkbox`, `toggle`, `money`, `date`, `datetime`, `time`). Everything else falls through to `String(value)` — displaying raw values instead of formatted output.

2. **Editable switch block** (lines 142-344): A full switch with ~25+ field types.

This duplication is the **root cause of 4 rounds of bugs**: every new field type added to the editable switch must ALSO be added to the isReadOnly block, and this keeps being missed. Types like `ssn`, `phone`, `currency`, `percentage`, `period`, `tags`, `multiselect`, `slider`, `richtext`, `rating`, `hours`, `routingNumber`, `ein`, `email`, `url`, `colorCode` all display as raw `String(value)` in read-only mode.

The same problem exists in `formatInlineTableCell()` in `layer8d-forms-fields-ext.js` (handles only `money`, `date`, `datetime`, `select`, `checkbox`).

## Root Cause

There is no single function that converts a field value to its display string. The isReadOnly block duplicates format logic inline instead of delegating to a shared formatter. When a new type is added to the switch, there's no mechanism to ensure the read-only path also handles it.

## Design

Create a single `formatFieldDisplayValue(field, value)` function that returns the human-readable display string for ANY field type. Both the isReadOnly block and `formatInlineTableCell` delegate to this function. Adding a new field type means adding ONE case to ONE function.

## Phase 1: Create `formatFieldDisplayValue`

**File:** `l8ui/shared/layer8d-forms-fields.js`

Add a new function (after `getDateZeroLabel`, before `generateFormHtml`):

```javascript
/**
 * Format a field value for read-only display.
 * This is the SINGLE source of truth for value→display conversion.
 * Every field type handled in the editable switch MUST have a case here.
 */
function formatFieldDisplayValue(field, value) {
    if (value === null || value === undefined || value === '') return '-';

    // Zero-value handling for temporal types
    if (value === 0) {
        if (field.type === 'date' || field.type === 'datetime') {
            return getDateZeroLabel(field.key);
        }
        return '-';
    }

    switch (field.type) {
        case 'select':
            return (field.options && field.options[value] !== undefined)
                ? String(field.options[value]) : String(value);

        case 'checkbox':
        case 'toggle':
            return value ? 'Yes' : 'No';

        case 'money':
            return formatMoney(value);

        case 'date':
            return formatDate(value);

        case 'datetime':
            return Layer8DUtils.formatDateTime(value);

        case 'time':
            return String(value);

        case 'percentage':
            return Layer8DUtils.formatPercentage(value);

        case 'currency':
            return formatMoney(value);

        case 'ssn':
            // Masked display: show last 4 only
            return typeof value === 'string' && value.length >= 4
                ? '***-**-' + value.slice(-4) : String(value);

        case 'phone':
        case 'email':
        case 'url':
        case 'routingNumber':
        case 'ein':
        case 'colorCode':
            return String(value);

        case 'number':
        case 'rating':
        case 'hours':
            return String(value);

        case 'slider':
            return String(value);

        case 'tags':
            return Array.isArray(value) ? value.join(', ') : String(value);

        case 'multiselect': {
            if (!Array.isArray(value)) return String(value);
            const opts = field.options || {};
            return value.map(v => opts[v] || String(v)).join(', ');
        }

        case 'period': {
            if (typeof value !== 'object' || value === null) return String(value);
            const PERIOD_LABELS = {0: '', 1: 'Yearly', 2: 'Quarterly', 3: 'Monthly'};
            const PERIOD_MONTHS = {1:'Jan',2:'Feb',3:'Mar',4:'Apr',5:'May',6:'Jun',
                                   7:'Jul',8:'Aug',9:'Sep',10:'Oct',11:'Nov',12:'Dec'};
            const PERIOD_QUARTERS = {13:'Q1',14:'Q2',15:'Q3',16:'Q4'};
            const pType = value.periodType || 0;
            const pYear = value.periodYear || '';
            const pVal = value.periodValue || 0;
            const pLabel = PERIOD_LABELS[pType] || '';
            const vLabel = PERIOD_MONTHS[pVal] || PERIOD_QUARTERS[pVal] || '';
            return [pLabel, vLabel, pYear].filter(Boolean).join(' ');
        }

        case 'richtext':
            // Strip HTML tags for plain-text display
            if (typeof value === 'string') {
                const div = document.createElement('div');
                div.innerHTML = value;
                return div.textContent || div.innerText || '';
            }
            return String(value);

        case 'lookup':
        case 'text':
        case 'textarea':
        default:
            return String(value);
    }
}
```

## Phase 2: Replace isReadOnly block

**File:** `l8ui/shared/layer8d-forms-fields.js` lines 111-137

Replace the entire isReadOnly if/else chain with a single call:

```javascript
if (isReadOnly) {
    const displayValue = formatFieldDisplayValue(field, value);
    return `
        <div class="form-group">
            <label for="field-${field.key}">${escapeHtml(field.label)}</label>
            <span class="form-display-value">${escapeHtml(displayValue)}</span>
        </div>
    `;
}
```

This reduces 27 lines to 7, and ensures ALL field types are handled.

## Phase 3: Replace `formatInlineTableCell`

**File:** `l8ui/shared/layer8d-forms-fields-ext.js` lines 21-39

Replace the inline if/else chain with a delegation to `formatFieldDisplayValue`:

```javascript
function formatInlineTableCell(col, value) {
    // col has { key, label, type, options, ... } — same shape as a field
    return escapeHtml(Layer8DFormsFields.formatFieldDisplayValue(col, value));
}
```

The `col` object from inline table column definitions has the same `type` and `options` shape as a field definition, so `formatFieldDisplayValue` works directly.

## Phase 4: Export and wire up

**File:** `l8ui/shared/layer8d-forms-fields.js`

Add to the exports at the bottom:

```javascript
F.formatFieldDisplayValue = formatFieldDisplayValue;
```

## Phase 5: Verification

1. `node -c layer8d-forms-fields.js` — syntax check
2. `node -c layer8d-forms-fields-ext.js` — syntax check
3. Verify Employee `dateOfBirth` shows formatted date in view detail (not raw number)
4. Verify Employee `nationalId` (type: ssn) shows masked value in view detail (not raw string)
5. Verify `period` fields show "Monthly Jan 2025" (not `[object Object]`)
6. Verify `tags` fields show comma-separated values (not `[object Object]`)
7. Verify `multiselect` fields show labels (not raw array)
8. Verify `money` fields show "$1,234.56" (not `{amount: 123456, currencyId: ...}`)
9. Verify inline table cells render dates, money, and all types correctly

## Files Modified

```
l8ui/shared/layer8d-forms-fields.js      (add formatFieldDisplayValue, replace isReadOnly block)
l8ui/shared/layer8d-forms-fields-ext.js  (replace formatInlineTableCell with delegation)
```

Total: 2 files in l8ui shared library.

## Traceability

| # | Gap | Fix | Phase |
|---|-----|-----|-------|
| 1 | isReadOnly block duplicates editable switch | Replace with `formatFieldDisplayValue` call | Phase 2 |
| 2 | isReadOnly missing ssn, phone, currency, percentage, routingNumber, ein, email, url, colorCode, rating, hours | All handled by `formatFieldDisplayValue` switch | Phase 1 |
| 3 | isReadOnly missing slider, tags, multiselect, lookup, richtext, period | All handled by `formatFieldDisplayValue` switch | Phase 1 |
| 4 | formatInlineTableCell duplicates read-only logic | Delegates to `formatFieldDisplayValue` | Phase 3 |
| 5 | formatInlineTableCell missing ssn, phone, percentage, period, tags, multiselect, slider, richtext, etc. | All handled by delegation | Phase 3 |
| 6 | Adding a new field type requires updating 3 places (switch + isReadOnly + formatInlineTableCell) | Now requires ONE place: `formatFieldDisplayValue` | Phase 1 |

## Impact

- **Before**: 3 places to update per new field type (editable switch, isReadOnly block, formatInlineTableCell)
- **After**: 2 places to update per new field type (editable switch, formatFieldDisplayValue) — and they are adjacent in the same file, so they are impossible to miss
- **Net effect**: Eliminates the class of bugs that caused 4 rounds of fixes
