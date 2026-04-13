# Plan: Employee Detail Popup Mobile/Desktop Parity

## Context

After implementing the tabbed form system in mobile `renderForm` (PLAN-MOBILE-DETAIL-POPUP-TABBED-PARITY), the Employee detail popup on mobile still does not match desktop. The standard form system was fixed correctly, but the Employee row click on mobile never reaches it.

## Root Cause

The mobile Employee nav config has a custom `onRowClick` override that routes to `MobileEmployeeDetail.open()` — a completely separate renderer that bypasses the standard form system.

### Desktop Employee Row Click Path
1. Row click → `_showDetailsModal(service, item, itemId)`
2. `generateFormHtml(CoreHR.forms.Employee, data, {readOnly: true})`
3. Renders **3 tabs**: Personal Information, Employment Information, Organizational Placement
4. Uses standard form system with `formatFieldDisplayValue` for field display

### Mobile Employee Row Click Path (CURRENT — WRONG)
1. Card click → custom `onRowClick` in nav config (line 88 in `layer8m-nav-config-fin-hcm.js`)
2. `MobileEmployeeDetail.open(item)` in `m/js/hcm/employee-detail-m.js`
3. Uses `Layer8EmployeeDetail` shared module from `hcm/core-hr/employee-detail-shared.js`
4. Renders **4 tabs**: Overview, Employment, Documents, Compliance
5. Never touches `Layer8MForms.renderForm` or the standard form system

### Expected Mobile Employee Row Click Path (AFTER FIX)
1. Card click → standard `showRecordDetails(serviceConfig, formDef, item)`
2. `Layer8MForms.renderForm(CoreHR.forms.Employee, data, true)`
3. Renders **3 tabs**: Personal Information, Employment Information, Organizational Placement
4. Matches desktop exactly

## Platform Conversion Data Flow Trace

| Step | Desktop | Mobile (Current) | Mobile (After Fix) |
|------|---------|-------------------|-------------------|
| Row click handler | Standard `_showDetailsModal` | Custom `MobileEmployeeDetail.open` | Standard `showRecordDetails` |
| Form definition | `CoreHR.forms.Employee` (3 sections) | Custom hardcoded tabs | `CoreHR.forms.Employee` (3 sections) |
| Tab count | 3 | 4 | 3 |
| Tab titles | Personal Info, Employment Info, Org Placement | Overview, Employment, Docs, Compliance | Personal Info, Employment Info, Org Placement |
| Field rendering | `generateFormHtml` → disabled inputs | Custom HTML builders | `renderForm` → formatted spans |
| Field formatting | `formatFieldDisplayValue` via shared `Layer8FormatDisplay` | Custom per-field rendering | `formatFieldDisplayValue` via shared `Layer8FormatDisplay` |

## Files to Modify

1. **`erp-ui/m/nav-configs/layer8m-nav-config-fin-hcm.js`** — Remove `onRowClick` override from Employee service entry (line 88)

## Files NOT Modified (remain for potential future use)

- `m/js/hcm/employee-detail-m.js` — Custom mobile Employee detail renderer. Could be removed as dead code, but leaving it does no harm. If a name-link click feature is added to mobile cards later (matching desktop's `emp-name-link` in columns), this file could be wired back in.
- `hcm/core-hr/employee-detail-shared.js` — Shared rendering module used by both desktop and mobile custom detail views. Still used by desktop's `EmployeeDetail.open()` (triggered via name link click in table).
- `hcm/core-hr/employee-detail.js` — Desktop custom Employee detail. Still wired via `emp-name-link` onclick in `core-hr-columns.js`.

## Phase 1: Remove Custom onRowClick Override

In `erp-ui/m/nav-configs/layer8m-nav-config-fin-hcm.js` line 88, change:

```js
{ key: 'employees', label: 'Employees', icon: 'employees', endpoint: '/30/Employee', model: 'Employee', idField: 'employeeId',
  onRowClick: function(item) { MobileEmployeeDetail.open(item); } },
```

To:

```js
{ key: 'employees', label: 'Employees', icon: 'employees', endpoint: '/30/Employee', model: 'Employee', idField: 'employeeId' },
```

This makes Employee use the standard mobile detail path: `showRecordDetails` → `renderForm` → 3 tabbed sections → matching desktop.

## Phase 2: End-to-End Verification

1. Click Employee row on **desktop** — verify 3 tabs: Personal Information, Employment Information, Organizational Placement
2. Click Employee row on **mobile** — verify same 3 tabs with same titles
3. Compare field count in each tab between desktop and mobile — must match
4. Verify field formatting: dates, enums, references, SSN, money all display correctly on both
5. Verify single-section models (Department, Position) still render correctly on mobile (no tabs, stacked fields)
6. Verify editable forms (Add/Edit Employee) still use stacked layout on mobile

## Traceability Matrix

| # | Gap | Phase |
|---|-----|-------|
| 1 | Mobile Employee row click bypasses standard form system | Phase 1 |
| 2 | Mobile shows 4 tabs vs desktop 3 tabs | Phase 1 (consequence of #1) |
| 3 | Mobile shows different fields than desktop | Phase 1 (consequence of #1) |
| 4 | End-to-end parity verification | Phase 2 |
