# Plan: Port l8ui Updates from l8alarms to l8erp

## Context
The l8alarms project has received three l8ui library enhancements that need to be ported to l8erp so both projects stay in sync.

## Changes (3 features, 7 files)

### Feature 1: `datetime` field/column type (6 files)
A display-only datetime type that renders date+time values using `Layer8DUtils.formatDateTime()`.

### Feature 2: Field-level `readOnly` support (3 files)
Any form field can be marked `readOnly: true` to render as a non-editable display span and be excluded from data collection.

### Feature 3: Service-level `readOnly` support (1 file)
A service config can set `readOnly: true` to disable Add/Edit/Delete buttons.

## File-by-File Changes

All files are under `go/erp/ui/web/l8ui/shared/`:

| # | File | Change |
|---|------|--------|
| 1 | `layer8d-renderers.js` | Add `formatDateTime` import, `renderDateTime()` function, export it |
| 2 | `layer8-column-factory.js` | Add `renderDateTime` import, `datetime()` factory method |
| 3 | `layer8-form-factory.js` | Change `datetime()` type from `'text'` to `'datetime'`, update JSDoc |
| 4 | `layer8d-forms-fields.js` | Add `readOnly` field rendering block + `case 'datetime'` handler |
| 5 | `layer8d-forms-data.js` | Add early-return guard skipping `datetime` and `readOnly` fields |
| 6 | `layer8d-service-registry.js` | Add `isReadOnly` check, null out onAdd/onEdit/onDelete when true |
| 7 | `GUIDE.md` | Add `datetime` to types list, add "Field-Level Read-Only" section |

## Verification
- `node -c` on all 6 modified JS files to check syntax
- Visual diff: `diff -rq` between l8alarms and l8erp l8ui directories should show no differences
