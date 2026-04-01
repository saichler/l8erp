# Plan: Fix Date Fields Showing as Raw Numbers

## Context

Multiple date/time fields across the ERP UI display raw int64 Unix timestamps (e.g., `1704067200`) instead of formatted dates or date/time strings. The root cause: these protobuf int64 date fields use `f.text()` or `f.number()` in form definitions and plain `col()` / `col.basic()` in column definitions, instead of the correct `f.date()` / `f.datetime()` / `f.time()` and `col.date()` / `col.datetime()` methods.

## Methodology

1. Scanned ALL `.pb.go` files under `go/types/` for `int64` fields
2. Filtered to date-semantic fields only (excluded counts, sizes, shares)
3. Confirmed `EquityGrant.boardApprovalDate` is `string` in protobuf — `f.text()` is correct there
4. Cross-referenced every date field against its form (`*-forms.js`) and column (`*-columns.js`) definitions
5. Identified 15 bugs total (12 in forms, 3 in columns)

## Available Factory Methods

| Purpose | Column Factory | Form Factory | When to Use |
|---------|---------------|-------------|-------------|
| Date only | `col.date(key, label)` | `f.date(key, label)` | Fields like `hireDate`, `dueDate` |
| Date + Time | `col.datetime(key, label)` | `f.datetime(key, label)` | Fields like `startTime`, `endTime` on events with timestamps |
| Time of day | — | `f.time(key, label)` | Fields like shift `startTime`/`endTime` (time-of-day, not full timestamp) |

## Bugs Found

### Form Bugs (12 fixes across 7 files)

| # | File | Model | Field | Current | Fix |
|---|------|-------|-------|---------|-----|
| 1 | `mfg/shopfloor/shopfloor-forms.js:54` | MfgDowntimeEvent | startTime | `f.text()` | `f.datetime()` |
| 2 | `mfg/shopfloor/shopfloor-forms.js:55` | MfgDowntimeEvent | endTime | `f.text()` | `f.datetime()` |
| 3 | `mfg/shopfloor/shopfloor-forms.js:69` | MfgLaborEntry | startTime | `f.text()` | `f.datetime()` |
| 4 | `mfg/shopfloor/shopfloor-forms.js:70` | MfgLaborEntry | endTime | `f.text()` | `f.datetime()` |
| 5 | `hcm/time/time-forms.js:145` | Shift | startTime | `f.text()` | `f.time()` |
| 6 | `hcm/time/time-forms.js:146` | Shift | endTime | `f.text()` | `f.time()` |
| 7 | `crm/fieldservice/fieldservice-forms.js:128` | CrmServiceSchedule | startTime | `f.text()` | `f.datetime()` |
| 8 | `crm/fieldservice/fieldservice-forms.js:129` | CrmServiceSchedule | endTime | `f.text()` | `f.datetime()` |
| 9 | `bi/dashboards/dashboards-forms.js:72` | BiKPI | lastUpdated | `f.number()` | `f.date()` |
| 10 | `m/js/mfg/shopfloor-forms.js:62` | MfgDowntimeEvent | startTime | `f.text()` | `f.datetime()` |
| 11 | `m/js/mfg/shopfloor-forms.js:63` | MfgDowntimeEvent | endTime | `f.text()` | `f.datetime()` |
| 12 | `m/js/bi/dashboards-forms.js:89` | BiKPI | lastUpdated | `f.number()` | `f.date()` |

### Column Bugs (3 fixes across 3 files)

| # | File | Model | Field(s) | Current | Fix |
|---|------|-------|----------|---------|-----|
| 13 | `crm/fieldservice/fieldservice-columns.js:120-121` | CrmServiceSchedule | startTime, endTime | plain `{ key: }` | `col.datetime()` |
| 14 | `mfg/shopfloor/shopfloor-columns.js:45` | MfgShiftSchedule | startTime, endTime | `col.basic()` | `col.datetime()` |
| 15 | `m/js/mfg/shopfloor-columns.js:47-48` | MfgShiftSchedule | startTime, endTime | `col.col()` | `col.datetime()` |

### Date vs DateTime vs Time Decision

- **`f.datetime()` / `col.datetime()`**: MfgDowntimeEvent, MfgLaborEntry, MfgMachineEntry, CrmServiceSchedule — these are event timestamps where both date AND time matter (e.g., "downtime started at 2024-03-15 14:30")
- **`f.time()`**: Shift.startTime/endTime — these are time-of-day values for shift definitions (e.g., "shift starts at 08:00"), not full timestamps. The desktop form should match mobile which already correctly uses `f.time()`
- **`f.date()`**: BiKPI.lastUpdated — date-only, time precision not needed

## Implementation

### Phase 1: Fix Form Definitions (7 files)

**Desktop forms (5 files):**

1. `go/erp/ui/web/mfg/shopfloor/shopfloor-forms.js`
   - Line 54: `f.text('startTime',` → `f.datetime('startTime',`
   - Line 55: `f.text('endTime',` → `f.datetime('endTime',`
   - Line 69: `f.text('startTime',` → `f.datetime('startTime',`
   - Line 70: `f.text('endTime',` → `f.datetime('endTime',`

2. `go/erp/ui/web/hcm/time/time-forms.js`
   - Line 145: `f.text('startTime',` → `f.time('startTime',`
   - Line 146: `f.text('endTime',` → `f.time('endTime',`

3. `go/erp/ui/web/crm/fieldservice/fieldservice-forms.js`
   - Line 128: `f.text('startTime',` → `f.datetime('startTime',`
   - Line 129: `f.text('endTime',` → `f.datetime('endTime',`

4. `go/erp/ui/web/bi/dashboards/dashboards-forms.js`
   - Line 72: `f.number('lastUpdated',` → `f.date('lastUpdated',`

**Mobile forms (2 files):**

5. `go/erp/ui/web/m/js/mfg/shopfloor-forms.js`
   - Line 62: `f.text('startTime',` → `f.datetime('startTime',`
   - Line 63: `f.text('endTime',` → `f.datetime('endTime',`

6. `go/erp/ui/web/m/js/bi/dashboards-forms.js`
   - Line 89: `f.number('lastUpdated',` → `f.date('lastUpdated',`

### Phase 2: Fix Column Definitions (3 files)

1. `go/erp/ui/web/crm/fieldservice/fieldservice-columns.js`
   - Lines 120-121: Replace plain `{ key: 'startTime' }` and `{ key: 'endTime' }` with `...col.datetime('startTime', 'Start Time')` and `...col.datetime('endTime', 'End Time')`

2. `go/erp/ui/web/mfg/shopfloor/shopfloor-columns.js`
   - Line 45: Replace `col.basic(['startTime', 'endTime'])` entries for MfgShiftSchedule with `col.datetime('startTime', 'Start Time')` and `col.datetime('endTime', 'End Time')`

3. `go/erp/ui/web/m/js/mfg/shopfloor-columns.js`
   - Lines 47-48: Replace `col.col('startTime', 'Start Time')` and `col.col('endTime', 'End Time')` with `col.datetime('startTime', 'Start Time')` and `col.datetime('endTime', 'End Time')`

### Phase 3: Verification

For each fixed model, verify in the UI:

- [ ] **MfgDowntimeEvent** (MFG > Shop Floor > Downtime Events): startTime/endTime show formatted datetime in table AND form popup
- [ ] **MfgLaborEntry** (MFG > Shop Floor > Labor Entries): startTime/endTime show formatted datetime in form popup
- [ ] **MfgShiftSchedule** (MFG > Shop Floor > Shift Schedules): startTime/endTime show formatted datetime in table columns
- [ ] **Shift** (HCM > Time > Shifts): startTime/endTime show time-of-day picker in form popup
- [ ] **CrmServiceSchedule** (CRM > Field Service > Service Schedules): startTime/endTime show formatted datetime in table AND form popup
- [ ] **BiKPI** (BI > Dashboards > KPIs): lastUpdated shows formatted date in form popup
- [ ] **Desktop/Mobile parity**: All fixes render identically on both platforms

### Files Modified

```
go/erp/ui/web/mfg/shopfloor/shopfloor-forms.js        (4 field fixes)
go/erp/ui/web/hcm/time/time-forms.js                   (2 field fixes)
go/erp/ui/web/crm/fieldservice/fieldservice-forms.js    (2 field fixes)
go/erp/ui/web/bi/dashboards/dashboards-forms.js         (1 field fix)
go/erp/ui/web/m/js/mfg/shopfloor-forms.js              (2 field fixes)
go/erp/ui/web/m/js/bi/dashboards-forms.js              (1 field fix)
go/erp/ui/web/crm/fieldservice/fieldservice-columns.js  (2 column fixes)
go/erp/ui/web/mfg/shopfloor/shopfloor-columns.js       (2 column fixes)
go/erp/ui/web/m/js/mfg/shopfloor-columns.js            (2 column fixes)
```

Total: 9 files, 18 field-level changes.
