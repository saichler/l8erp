# Plan: ESS Portal Employee Detail Mobile/Desktop Parity

## Context

The ESS (Employee Self-Service) portal displays Employee data in two contexts:
1. **My Profile** — inline single record view (`singleRecord: true`)
2. **Detail popup** — when clicking a row in other service tables (e.g., Documents, Pay Stubs)

On desktop, both paths use `Layer8DFormsModal` / `Layer8DFormsInline`, which call `renderFormIntoBody` → `generateFormHtml`. This produces 3 horizontal tabs with 2-column field layout and wired tab switching. Desktop works correctly.

On mobile, both paths in `Layer8MPortal` call `Layer8MForms.renderForm(formDef, item, true)`, which now correctly generates 3 tabs. However, **neither path wires up the tab click event delegation**, so tabs render but clicking them does nothing — the user is stuck on the first tab.

## Root Cause

`Layer8MPortal` (in `l8ui/portal/layer8m-portal.js`) has two rendering paths that are missing tab switching event delegation:

### Path 1: `_renderSingleRecord` (My Profile)
- Line 316: `container.innerHTML = '<div style="padding:8px 0;">' + html + '</div>';`
- Lines 318-320: Only calls `initFormFields` and disables inputs
- **Missing**: Tab click event listener on the container

### Path 2: `_showDetail` (read-only detail popup)
- Line 344: `Layer8MForms.renderForm(formDef, item, true)` generates tabs correctly
- Lines 350-356: `onShow` only calls `initFormFields` and disables inputs
- **Missing**: Tab click event listener on `popup.body`

### Existing Duplication

The same 8-line tab switching event delegation block already exists in `layer8m-nav-crud.js` lines 60-69 (`showRecordDetails`). Adding it to two more locations in `layer8m-portal.js` would create 3 copies of identical behavioral logic. Per the Second Instance Rule, this must be extracted before creating the second copy.

### Why This Doesn't Affect Desktop

The desktop portal uses `Layer8DFormsInline.renderViewForm` → `openViewForm` → `renderFormIntoBody`, which wires tab switching at line 28-38 of `layer8d-forms-modal.js`. The mobile portal never adds this equivalent listener.

## Platform Conversion Data Flow Trace

### Desktop ESS — My Profile (singleRecord)
| Step | Code | What Happens |
|------|------|-------------|
| 1 | `layer8d-portal.js:146` | `_renderSingleRecord(svc, container)` |
| 2 | `layer8d-portal.js:202` | `formDef = ns._getFormDef('Employee')` → `Layer8DServiceRegistry.getFormDef('HCM', 'Employee')` → `CoreHR.forms.Employee` (3 sections) |
| 3 | `layer8d-portal.js:208` | `Layer8DFormsInline.renderViewForm(container, serviceConfig, formDef, item)` |
| 4 | `layer8d-forms-modal.js:249-251` | Calls `openViewForm(serviceConfig, formDef, data, container)` |
| 5 | `layer8d-forms-modal.js:131` | `renderFormIntoBody(bodyEl, formDef, data, ...)` → `generateFormHtml` → 3 tabs with `.probler-popup-tab` classes |
| 6 | `layer8d-forms-modal.js:28-38` | Tab click event delegation wired on `bodyEl` |
| 7 | `layer8d-forms-modal.js:145` | `activateForm(bodyEl, {disableInputs: true})` → pickers attached, inputs disabled |
| **Result** | | 3 clickable tabs: Personal Information, Employment Information, Organizational Placement |

### Desktop ESS — Detail Popup (row click on read-only service)
| Step | Code | What Happens |
|------|------|-------------|
| 1 | `layer8d-portal.js:228` | `Layer8DFormsModal.openViewForm(serviceConfig, formDef, item)` |
| 2 | `layer8d-forms-modal.js:128-146` | Same `renderFormIntoBody` + popup + `activateForm` path |
| **Result** | | 3 clickable tabs in popup |

### Mobile ESS — My Profile (singleRecord) — CURRENT (BROKEN)
| Step | Code | What Happens |
|------|------|-------------|
| 1 | `layer8m-portal.js:260-263` | `_renderSingleRecord(svc, container)` |
| 2 | `layer8m-portal.js:311` | `formDef = mobile._getFormDef('Employee')` → `Layer8DServiceRegistry.getFormDef('HCM', 'Employee')` → `CoreHR.forms.Employee` (3 sections) |
| 3 | `layer8m-portal.js:316` | `Layer8MForms.renderForm(formDef, item, true)` → 3 tabs with `.mobile-form-tab` classes |
| 4 | `layer8m-portal.js:318-320` | `initFormFields` + disable inputs — **NO tab event delegation** |
| **Result** | | 3 tabs render visually but clicking them does nothing — stuck on first tab |

### Mobile ESS — Detail Popup (row click on read-only service) — CURRENT (BROKEN)
| Step | Code | What Happens |
|------|------|-------------|
| 1 | `layer8m-portal.js:327-329` | `_showDetail(svc, item)` → `formDef = _getFormDef(svc.model)` |
| 2 | `layer8m-portal.js:344` | `Layer8MForms.renderForm(formDef, item, true)` → tabs generated |
| 3 | `layer8m-portal.js:350-356` | `onShow`: `initFormFields` + disable inputs — **NO tab event delegation** |
| **Result** | | Same: tabs render but not clickable |

### Mobile ESS — Expected (AFTER FIX)
| Step | Code | What Happens |
|------|------|-------------|
| 1-3 | Same as current | `renderForm` generates 3 tabs |
| 4 | NEW | `Layer8MForms.wireTabSwitching(container)` called |
| **Result** | | 3 clickable tabs matching desktop: Personal Information, Employment Information, Organizational Placement |

## Field Rendering Parity

Both platforms use the same `CoreHR.forms.Employee` form definition (3 sections, 29 fields). The field rendering is already at parity because:

- Desktop uses `generateFormHtml` → `generateFieldHtml` → `formatFieldDisplayValue` (from `Layer8FormatDisplay`)
- Mobile uses `renderForm` → `_renderFieldHtml` → `Layer8FormatDisplay.format()`
- Both call the same shared `Layer8FormatDisplay.format()` for read-only field values
- Both pair fields in 2-column rows (desktop: `.form-row`, mobile: `.mobile-form-field-row`)

The only difference is that mobile tabs are non-functional due to missing event delegation. No field rendering changes are needed.

## Files to Modify

1. **`l8ui/m/js/layer8m-forms.js`** — Add `wireTabSwitching(container)` shared helper method (Phase 1)
2. **`l8ui/m/js/layer8m-nav-crud.js`** — Replace inline tab delegation with `Layer8MForms.wireTabSwitching()` call (Phase 1)
3. **`l8ui/portal/layer8m-portal.js`** — Add `Layer8MForms.wireTabSwitching()` calls to both rendering paths (Phase 2)

## Phase 1: Extract Shared Tab Switching Helper

### Change 1a: Add `wireTabSwitching` to `Layer8MForms`

In `l8ui/m/js/layer8m-forms.js`, add a new method on the `Layer8MForms` object (line 459, before the closing `};`):

```js
wireTabSwitching: function(container) {
    if (!container) return;
    container.addEventListener('click', function(e) {
        var tab = e.target.closest('.mobile-form-tab');
        if (!tab) return;
        var tabId = tab.dataset.tab;
        container.querySelectorAll('.mobile-form-tab').forEach(function(t) { t.classList.remove('active'); });
        container.querySelectorAll('.mobile-form-tab-pane').forEach(function(p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var pane = container.querySelector('.mobile-form-tab-pane[data-pane="' + tabId + '"]');
        if (pane) pane.classList.add('active');
    });
}
```

### Change 1b: Refactor `layer8m-nav-crud.js` to use the helper

In `l8ui/m/js/layer8m-nav-crud.js` `showRecordDetails`, replace lines 59-69 (the inline tab switching block):

```js
// Tab switching for multi-section read-only forms
popup.body.addEventListener('click', function(e) {
    var tab = e.target.closest('.mobile-form-tab');
    if (!tab) return;
    var tabId = tab.dataset.tab;
    popup.body.querySelectorAll('.mobile-form-tab').forEach(function(t) { t.classList.remove('active'); });
    popup.body.querySelectorAll('.mobile-form-tab-pane').forEach(function(p) { p.classList.remove('active'); });
    tab.classList.add('active');
    var pane = popup.body.querySelector('.mobile-form-tab-pane[data-pane="' + tabId + '"]');
    if (pane) pane.classList.add('active');
});
```

With a single call:

```js
Layer8MForms.wireTabSwitching(popup.body);
```

## Phase 2: Wire Tab Switching in Portal

### Change 2a: `_renderSingleRecord` (inline single record)

In `l8ui/portal/layer8m-portal.js`, after line 320 (after `initFormFields` and disable inputs), add:

```js
Layer8MForms.wireTabSwitching(container);
```

### Change 2b: `_showDetail` read-only popup path

In `l8ui/portal/layer8m-portal.js`, after line 353 (after `initFormFields` and disable inputs in the `onShow` callback), add:

```js
Layer8MForms.wireTabSwitching(popup.body);
```

## Phase 3: End-to-End Verification

1. Open ESS portal on **desktop** → My Profile → verify 3 tabs: Personal Information, Employment Information, Organizational Placement
2. Open ESS portal on **mobile** → My Profile → verify same 3 tabs with same titles
3. Click each tab on mobile → verify it switches to show the correct fields
4. Compare field count per tab between desktop and mobile — must match
5. Verify field formatting: dates, enums, references, SSN all display correctly on both
6. Click a row in a read-only service (e.g., Documents) on mobile → verify detail popup has tabs and tab switching works
7. Open main mobile app → click Employee row → verify 3 tabs still work (regression check for Phase 1b refactor)
8. Verify other portals (Manager, Vendor, Customer, Partner, Project Client) are not affected

## Traceability Matrix

| # | Gap | Phase |
|---|-----|-------|
| 1 | Tab switching logic duplicated across 3 call sites | Phase 1 (extract to `Layer8MForms.wireTabSwitching`) |
| 2 | `layer8m-nav-crud.js` uses inline tab delegation | Phase 1b (refactor to use shared helper) |
| 3 | Mobile ESS My Profile tabs render but are not clickable | Phase 2a |
| 4 | Mobile ESS detail popup tabs render but are not clickable | Phase 2b |
| 5 | End-to-end parity verification + regression check | Phase 3 |

## Scope

This plan affects **all mobile portals** that use `Layer8MPortal`, not just ESS. The fix is in the shared `layer8m-portal.js` framework, so it benefits ESS, Manager, Vendor, Customer, Partner, and Project Client portals equally.
