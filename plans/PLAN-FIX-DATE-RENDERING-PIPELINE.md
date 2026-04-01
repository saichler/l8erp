# Plan: Fix Date/DateTime/Time Rendering Pipeline

## Context

Date fields across the ERP show raw numbers (Unix timestamps) instead of formatted dates in view/detail forms. The root cause is in the l8ui shared rendering code — not in individual form definitions. The `isReadOnly` block in `layer8d-forms-fields.js` only handles `type: 'date'` with a `typeof value === 'number'` guard. This breaks when:

1. The server sends int64 timestamps as JSON strings (protobuf serialization behavior)
2. The field type is `'datetime'` — no read-only case exists at all
3. The field type is `'time'` — no read-only case exists at all

The same gaps exist in `formatInlineTableCell` (inline table cell rendering in `layer8d-forms-fields-ext.js`).

## Root Cause Analysis

### Gap 1: `formatDate` / `formatDateTime` reject string-typed numeric values
**File:** `l8ui/shared/layer8d-utils.js` lines 77-127
```javascript
formatDate(timestamp) {
    const date = new Date(timestamp * 1000); // If timestamp is "1704067200" (string), this produces NaN
}
```
Fix: coerce to number at the top of each function.

### Gap 2: Read-only block missing `datetime` and `time`, and guards `date` with `typeof === 'number'`
**File:** `l8ui/shared/layer8d-forms-fields.js` lines 111-134
```javascript
} else if (field.type === 'date' && typeof value === 'number') {  // misses string values
    displayValue = formatDate(value);
} else {
    displayValue = String(value);  // datetime, time, and string-typed dates all land here
}
```

### Gap 3: Inline table cell rendering missing `datetime` and `time`
**File:** `l8ui/shared/layer8d-forms-fields-ext.js` lines 21-36
Same pattern as Gap 2 — only handles `date` with `typeof value === 'number'`.

## Plan

### Phase 1: Fix `formatDate` and `formatDateTime` to accept string input

**File:** `l8ui/shared/layer8d-utils.js`

Add numeric coercion at the top of `formatDate` (line ~78) and `formatDateTime` (line ~112):
```javascript
function formatDate(timestamp, options = {}) {
    if (timestamp === null || timestamp === undefined) return '-';
    if (typeof timestamp === 'string') timestamp = Number(timestamp);
    if (isNaN(timestamp)) return '-';
    if (timestamp === 0) { return options.zeroLabel || 'Current'; }
    // ... rest unchanged
}
```

Same pattern for `formatDateTime`.

This is the **single most impactful fix** — it makes ALL downstream consumers (renderers, forms, inline tables) work with string-typed values automatically.

### Phase 2: Fix read-only block in `generateFieldHtml`

**File:** `l8ui/shared/layer8d-forms-fields.js` lines 111-134

Add `datetime` and `time` cases, and remove the `typeof value === 'number'` guard on `date` (since `formatDate` now handles strings after Phase 1):

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
        } else if (field.type === 'date') {
            displayValue = formatDate(value);
        } else if (field.type === 'datetime') {
            displayValue = Layer8DUtils.formatDateTime(value);
        } else if (field.type === 'time') {
            displayValue = String(value);
        } else {
            displayValue = String(value);
        }
    } else if (value === 0 && (field.type === 'date' || field.type === 'datetime')) {
        displayValue = getDateZeroLabel(field.key);
    }
    // ... return HTML unchanged
}
```

Changes:
- `date`: Remove `typeof value === 'number'` guard (formatDate now handles strings)
- `datetime`: Add new case calling `formatDateTime`
- `time`: Add new case (time values are already formatted strings like "08:00")
- Zero-value guard: extend to cover `datetime`

### Phase 3: Fix inline table cell rendering

**File:** `l8ui/shared/layer8d-forms-fields-ext.js` lines 21-36

Same pattern — add `datetime` and `time` cases, remove `typeof value === 'number'` guard on `date`:

```javascript
function formatInlineTableCell(col, value) {
    if (value === null || value === undefined || value === '') return '-';
    if (col.type === 'money' && typeof value === 'object') {
        return Layer8DUtils.formatMoney(value);
    }
    if (col.type === 'date') {
        return Layer8DUtils.formatDate(value);
    }
    if (col.type === 'datetime') {
        return Layer8DUtils.formatDateTime(value);
    }
    if (col.type === 'select' && col.options) {
        return col.options[value] || String(value);
    }
    if (col.type === 'checkbox') {
        return value ? 'Yes' : 'No';
    }
    return escapeHtml(String(value));
}
```

### Phase 4: Verification

- [ ] Employee dateOfBirth shows formatted date in view detail (not raw number)
- [ ] MfgDowntimeEvent startTime/endTime show formatted datetime in view detail
- [ ] Shift startTime/endTime show formatted time in view detail
- [ ] BiKPI lastUpdated shows formatted date in view detail
- [ ] CrmServiceSchedule startTime/endTime show formatted datetime in table AND view detail
- [ ] Inline table date/datetime cells show formatted values

## Files Modified

```
l8ui/shared/layer8d-utils.js              (formatDate + formatDateTime: add string coercion)
l8ui/shared/layer8d-forms-fields.js       (isReadOnly block: add datetime/time, remove typeof guard)
l8ui/shared/layer8d-forms-fields-ext.js   (formatInlineTableCell: add datetime/time, remove typeof guard)
```

Total: 3 files in l8ui shared library.

## Traceability

| # | Gap | Fix Location | Phase |
|---|-----|-------------|-------|
| 1 | formatDate rejects string input | layer8d-utils.js formatDate | Phase 1 |
| 2 | formatDateTime rejects string input | layer8d-utils.js formatDateTime | Phase 1 |
| 3 | isReadOnly missing datetime case | layer8d-forms-fields.js line 120 | Phase 2 |
| 4 | isReadOnly missing time case | layer8d-forms-fields.js line 120 | Phase 2 |
| 5 | isReadOnly date guard too strict | layer8d-forms-fields.js line 120 | Phase 2 |
| 6 | formatInlineTableCell missing datetime | layer8d-forms-fields-ext.js line 26 | Phase 3 |
| 7 | formatInlineTableCell missing time | layer8d-forms-fields-ext.js line 26 | Phase 3 |
| 8 | formatInlineTableCell date guard too strict | layer8d-forms-fields-ext.js line 26 | Phase 3 |
