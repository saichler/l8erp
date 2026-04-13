# Plan: Mobile Detail Popup Tabbed Parity with Desktop

## Context

When clicking an Employee row on desktop, the detail popup shows 3 horizontal tabs (Personal Information, Employment Information, Organizational Placement) with fields rendered inside each tab. On mobile, the same Employee detail popup shows the same 3 sections stacked vertically with `<h3>` headers — no tabs, all fields visible at once in a long scroll.

The user requires:
1. Mobile detail popups must render multi-section forms with **horizontal tabs** matching desktop
2. The **field content** inside each tab must be rendered the same way on both platforms
3. The **number of fields** (attributes) must match between desktop and mobile

This applies to ALL detail popups, not just Employee — it's a fix in the mobile form rendering system.

## Root Cause

`Layer8MForms.renderForm()` in `l8ui/m/js/layer8m-forms.js` (line 119-143) renders all sections as stacked `<div class="mobile-form-section">` with `<h3>` titles. Desktop's `Layer8DFormsFields.generateFormHtml()` in `l8ui/shared/layer8d-forms-fields.js` (line 134-181) renders sections as `probler-popup-tab` horizontal tabs with `probler-popup-tab-pane` content panels.

## Additional Finding: Broken Desktop Dependency

Mobile `renderReadOnlyField()` (line 359 in `l8ui/m/js/layer8m-forms-fields.js`) calls `Layer8DFormsFields.formatFieldDisplayValue(config, value)`, but `layer8d-forms-fields.js` is **NOT loaded** in mobile `m/app.html`. This call would fail at runtime with `ReferenceError`. The mobile field formatting needs to be self-contained.

---

## Compliance: Platform Conversion Feature Inventory (Step 0)

### Desktop Detail Popup Feature Inventory

Source: `Layer8DFormsModal.openViewForm` → `renderFormIntoBody` → `generateFormHtml` → `activateForm`

| # | Feature | Desktop Location | Mobile Status | Action |
|---|---------|-----------------|---------------|--------|
| 1 | Horizontal tab bar for multi-section forms | `generateFormHtml` lines 140-152 | MISSING — stacked `<h3>` sections | Implement in Phase 2 |
| 2 | Tab panes with show/hide | `generateFormHtml` lines 153-175 + event delegation in `renderFormIntoBody` line 38-48 | MISSING | Implement in Phase 2 + Phase 4 |
| 3 | 2-column field grid (`form-row`) | `generateFormHtml` lines 164-173 | MISSING — single column stacked | Implement in Phase 2 + Phase 3 |
| 4 | Inline tables full-width | `generateFormHtml` line 162 | Already full-width on mobile | No change needed |
| 5 | `formatFieldDisplayValue` for read-only display | `layer8d-forms-fields.js` lines 31-124 | BROKEN — calls desktop function that isn't loaded | Fix in Phase 1 |
| 6 | Reference field display name resolution | `activateForm` → `attachReferencePickers` | Already works via `Layer8MForms.initFormFields` | No change needed |
| 7 | Date field formatting (zero → "Current"/"N/A") | `formatFieldDisplayValue` date case | BROKEN — same dependency as #5 | Fix in Phase 1 |
| 8 | Select/enum display labels | `formatFieldDisplayValue` select case | BROKEN — same dependency as #5 | Fix in Phase 1 |
| 9 | SSN masking | `formatFieldDisplayValue` ssn case | BROKEN — same dependency as #5 | Fix in Phase 1 |
| 10 | Money formatting | `renderReadOnlyField` has special money handling | Works (dedicated code path) | No change needed |
| 11 | Checkbox display | `formatFieldDisplayValue` checkbox case | BROKEN — same dependency as #5 | Fix in Phase 1 |
| 12 | Input disabling in read-only mode | `activateForm({disableInputs: true})` | Already done in `showRecordDetails` onShow callback | No change needed |
| 13 | Form context for reference resolution | `setFormContext(formDef, serviceConfig)` | Not needed — mobile uses `initFormFields` directly | No change needed |
| 14 | Field count per section | Determined by `formDef.sections[].fields` | Same formDef used | Verify in Phase 5 |

### Data Flow Trace (Step 1)

**Desktop read-only detail flow:**
1. Row click → `onRowClick(item)` → `_showDetailsModal(service, item)` → `openViewForm(serviceConfig, formDef, data)`
2. `renderFormIntoBody(body, formDef, data)` → `generateFormHtml(formDef, data)` — generates editable inputs (NOT read-only spans)
3. Tab HTML: `probler-popup-tab` divs + `probler-popup-tab-pane` divs with `data-tab`/`data-pane` attributes
4. Fields: paired in `form-row` divs (2 per row), `form-group` wrappers, actual `<input>`/`<select>` elements
5. `activateForm({disableInputs: true})` → disables all inputs → result looks read-only but uses actual form elements
6. Tab switching: event delegation on `.probler-popup-tab` click

**Mobile read-only detail flow:**
1. Card click → `onRowClick(item)` → `showRecordDetails(serviceConfig, formDef, item)`
2. Fetches fresh record from server via `Layer8MAuth.get()`
3. `Layer8MForms.renderForm(formDef, freshRecord, true)` — `readonly=true` flag
4. Each field → `renderField(field, value, readonly=true)` → `renderReadOnlyField(field, value)` → `<span>` with formatted text
5. Sections: `<div class="mobile-form-section">` + `<h3>` title — **NO tabs**
6. `initFormFields(popup.body, formDef)` → resolves reference display values
7. Disables all remaining inputs in `onShow` callback

### Field-by-Field Value Type Parity (Step 2)

| # | Field Type | Desktop Rendering | Mobile Rendering | Value Type Match? | Notes |
|---|-----------|------------------|-----------------|-------------------|-------|
| 1 | text | `<input type="text" disabled>` with raw value | `<span>` with `String(value)` | YES — both show raw string | |
| 2 | date | `<input type="text" disabled>` showing formatted date via datepicker | `<span>` via `formatFieldDisplayValue` (BROKEN) | NO if dependency broken | Phase 1 fixes |
| 3 | select | `<select disabled>` showing selected option label | `<span>` via `formatFieldDisplayValue` (BROKEN) | NO if dependency broken | Phase 1 fixes |
| 4 | checkbox | `<input type="checkbox" disabled>` checked/unchecked | `<span>` via `formatFieldDisplayValue` (BROKEN) | DIFFERENT — checkbox vs text | Acceptable difference |
| 5 | money | `<input disabled>` with formatted currency | `<span>` with formatted currency (dedicated code) | YES — both show formatted | |
| 6 | ssn | `<input disabled>` with masked value | `<span>` via `formatFieldDisplayValue` (BROKEN) | NO if dependency broken | Phase 1 fixes |
| 7 | reference | `<input disabled>` with resolved display name | `<input disabled>` with resolved display name | YES — both resolve via pickers | |
| 8 | percentage | `<input disabled>` with formatted % | `<span>` via `formatFieldDisplayValue` (BROKEN) | NO if dependency broken | Phase 1 fixes |
| 9 | phone | `<input disabled>` with formatted phone | `<span>` via `formatFieldDisplayValue` (BROKEN) | NO if dependency broken | Phase 1 fixes |
| 10 | inlineTable | Full inline table (read-only) | Full inline table (read-only) | YES — both render tables | |

---

## Compliance: Duplication Audit

### Behavioral vs Configuration Analysis

**`formatFieldDisplayValue` (94 lines, pure function):**
- 100% behavioral — value formatting logic with no DOM dependencies
- Currently lives only in `layer8d-forms-fields.js` (desktop)
- Mobile tries to call it but the file isn't loaded
- **Extraction required** — must be shared between desktop and mobile

**Tab rendering logic:**
- Desktop: `generateFormHtml` in `layer8d-forms-fields.js` (lines 134-181) — generates tab HTML
- Mobile: `renderForm` in `layer8m-forms.js` (lines 119-143) — generates stacked sections
- The tab HTML generation is ~30 lines of behavioral code. Desktop and mobile use different CSS class names (`probler-popup-tab*` vs `mobile-form-tab*`) and different field rendering (disabled inputs vs formatted spans). **Not duplicated** — each platform generates its own HTML appropriate to its rendering model.

**Tab switching JS:**
- Desktop: event delegation in `renderFormIntoBody` (line 38-48)
- Mobile: will be new code in `layer8m-nav-crud.js` onShow callback
- ~10 lines each, class name differences. **Acceptable platform-specific code** — too small to abstract.

**Conclusion:** Only `formatFieldDisplayValue` needs extraction. The rest is platform-specific with different class names and rendering models — not duplication.

---

## Compliance: File Size Verification

| File | Current Lines | Phase Changes | Projected Lines | Status |
|------|-------------|---------------|-----------------|--------|
| `l8ui/shared/layer8d-forms-fields.js` | 587 | -94 (extract formatFieldDisplayValue) | ~493 | FIXES existing over-500 violation |
| `l8ui/m/js/layer8m-forms.js` | 416 | +40 (tab rendering in renderForm) | ~456 | OK (under 500) |
| `l8ui/m/js/layer8m-forms-fields.js` | 368 | -3 (change call target) | ~365 | OK |
| `l8ui/m/js/layer8m-nav-crud.js` | 191 | +10 (tab switching in onShow) | ~201 | OK |
| `l8ui/m/css/layer8m-forms.css` | 452 | +45 (tab CSS) | ~497 | BORDERLINE — monitor |
| `l8ui/shared/layer8-format-display.js` | NEW | +100 (extracted function + wrapper) | ~100 | OK |

**Risk:** `layer8m-forms.css` at projected ~497 lines is close to the 500-line limit. If the tab CSS exceeds estimate, may need to split into `layer8m-forms-tabs.css`.

---

## Approach

Make mobile `renderForm` generate the same tabbed HTML structure as desktop when the form has multiple sections, and add the necessary CSS and tab-switching JS. Use the desktop's `formatFieldDisplayValue` logic but make it available to mobile.

### Files to Modify

1. **`l8ui/shared/layer8-format-display.js`** (NEW) — Extract `formatFieldDisplayValue` from desktop so both platforms can use it
2. **`l8ui/shared/layer8d-forms-fields.js`** — Delegate to `Layer8FormatDisplay.format()` instead of local copy
3. **`l8ui/m/js/layer8m-forms-fields.js`** — Call `Layer8FormatDisplay.format()` instead of `Layer8DFormsFields.formatFieldDisplayValue()`
4. **`l8ui/m/js/layer8m-forms.js`** — Change `renderForm` to generate tabbed HTML for multi-section forms in read-only mode
5. **`l8ui/m/css/layer8m-forms.css`** — Add CSS for the tabbed form layout matching desktop's `probler-popup-tab*` styling
6. **`l8ui/m/js/layer8m-nav-crud.js`** — Add tab-switching event delegation in `showRecordDetails` (in the `onShow` callback)
7. **`m/app.html`** — Add `<script>` tag for `layer8-format-display.js`
8. **`app.html`** — Add `<script>` tag for `layer8-format-display.js` (before `layer8d-forms-fields.js`)

### Files to Reference (read-only)

- `l8ui/shared/layer8d-forms-fields.js` — `generateFormHtml` (tab structure, 2-column layout), `formatFieldDisplayValue` (display formatting)
- `l8ui/popup/layer8d-popup-content.css` — Tab CSS (`.probler-popup-tab*` classes, lines 62-125)
- `l8ui/popup/layer8d-popup-forms.css` — Form field CSS (`.form-row` 2-column grid, `.form-group`)

---

## Phase 1: Extract `formatFieldDisplayValue` for Mobile

The desktop `formatFieldDisplayValue` (lines 31-124 in `layer8d-forms-fields.js`) handles 15+ field types. Mobile already calls it but the file isn't loaded. Two options:

**Option A**: Load `layer8d-forms-fields.js` on mobile — brings in ALL desktop form rendering code (400+ lines), most unused on mobile. Heavy.

**Option B** (preferred): Extract `formatFieldDisplayValue` into a new shared file `l8ui/shared/layer8-format-display.js` that both desktop and mobile load. This is a pure function with no DOM dependencies — just value formatting.

Steps:
1. Create `l8ui/shared/layer8-format-display.js` containing `formatFieldDisplayValue` as `window.Layer8FormatDisplay.format(field, value)`
2. Update `layer8d-forms-fields.js` to delegate to `Layer8FormatDisplay.format()` instead of its local copy
3. Update `layer8m-forms-fields.js` to call `Layer8FormatDisplay.format()` instead of `Layer8DFormsFields.formatFieldDisplayValue()`
4. Add `<script>` tag to both `app.html` and `m/app.html` (before forms scripts)

## Phase 2: Tabbed Layout in Mobile `renderForm`

Modify `Layer8MForms.renderForm()` to generate horizontal tabs when:
- The form has multiple sections (`formDef.sections.length > 1`)
- The form is in read-only mode (`readonly === true`)

The generated HTML structure must match desktop:
```html
<form class="mobile-form mobile-form-tabbed">
    <div class="mobile-form-tabs">
        <div class="mobile-form-tab active" data-tab="tab-0">Personal Information</div>
        <div class="mobile-form-tab" data-tab="tab-1">Employment Information</div>
        <div class="mobile-form-tab" data-tab="tab-2">Organizational Placement</div>
    </div>
    <div class="mobile-form-tab-content">
        <div class="mobile-form-tab-pane active" data-pane="tab-0">
            <!-- fields rendered in 2-column grid like desktop -->
        </div>
        <div class="mobile-form-tab-pane" data-pane="tab-1">...</div>
        <div class="mobile-form-tab-pane" data-pane="tab-2">...</div>
    </div>
</form>
```

Field layout inside each pane: pair fields into 2-column rows (matching desktop's `form-row` pattern from `generateFormHtml` lines 164-173), except inline tables which span full width.

For editable forms and single-section forms, keep the existing stacked rendering unchanged.

## Phase 3: Tab CSS for Mobile

Add CSS to `l8ui/m/css/layer8m-forms.css` for the new tab classes. Style to match desktop's `probler-popup-tab*` CSS from `layer8d-popup-content.css` (lines 62-125), adapted for mobile:

- `.mobile-form-tabs` — flex row, border-bottom, scrollable overflow-x for narrow screens
- `.mobile-form-tab` — padding, font styling, bottom border on active, cursor pointer
- `.mobile-form-tab.active` — primary color border-bottom, highlighted text
- `.mobile-form-tab-content` — padding
- `.mobile-form-tab-pane` — display:none by default
- `.mobile-form-tab-pane.active` — display:block
- `.mobile-form-field-row` — 2-column grid matching desktop `.form-row` (with responsive 1-column at narrow widths)

**File size check:** If `layer8m-forms.css` exceeds 497 lines after adding tab CSS, split the tab CSS into a new file `l8ui/m/css/layer8m-forms-tabs.css` and add a `<link>` in `m/app.html`.

## Phase 4: Tab Switching in Mobile Nav CRUD

In `layer8m-nav-crud.js` `showRecordDetails`, add tab-switching event delegation in the `onShow` callback (after existing input disabling code at line 56-58):

```js
// Tab switching for multi-section forms
popup.body.addEventListener('click', function(e) {
    var tab = e.target.closest('.mobile-form-tab');
    if (!tab) return;
    var tabId = tab.dataset.tab;
    popup.body.querySelectorAll('.mobile-form-tab').forEach(t => t.classList.remove('active'));
    popup.body.querySelectorAll('.mobile-form-tab-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    var pane = popup.body.querySelector('.mobile-form-tab-pane[data-pane="' + tabId + '"]');
    if (pane) pane.classList.add('active');
});
```

## Phase 5: End-to-End Verification

For each of these models, compare desktop and mobile detail popups:

1. **Employee** (3 sections) — verify 3 horizontal tabs, same fields in each tab, same formatted values
2. **Any single-section model** (e.g., Department, Position) — verify single-section forms still render correctly (no tabs, stacked fields)
3. **A model with inline tables** (if any in read-only detail) — verify inline tables still render correctly within tabs
4. **Field count check** — for Employee, count fields in each tab on desktop vs mobile and confirm they match

Specific fields to verify render identically:
- Date fields (formatted date, "Current"/"N/A" for zero values)
- Select/enum fields (display label, not raw number)
- Reference fields (display name resolved, not raw ID)
- SSN (masked)
- Checkbox (consistent display)
- Money (formatted with currency symbol)

Sections to verify:
- [ ] Employee (3-section tabbed form)
- [ ] Department (single-section form — no tabs)
- [ ] Any model with inline table fields
- [ ] Editable form (add/edit) — must still use stacked layout, NOT tabs
- [ ] All field types listed above render correctly in both platforms
- [ ] File size of all modified files is under 500 lines

---

## Traceability Matrix

| # | Gap / Action Item | Source | Phase |
|---|-------------------|--------|-------|
| 1 | `formatFieldDisplayValue` not available on mobile (ReferenceError) | Feature Inventory #5 | Phase 1 |
| 2 | Date fields broken on mobile (dependency on #1) | Feature Inventory #7 | Phase 1 |
| 3 | Select/enum fields broken on mobile (dependency on #1) | Feature Inventory #8 | Phase 1 |
| 4 | SSN masking broken on mobile (dependency on #1) | Feature Inventory #9 | Phase 1 |
| 5 | Checkbox display broken on mobile (dependency on #1) | Feature Inventory #11 | Phase 1 |
| 6 | No horizontal tabs on mobile for multi-section forms | Feature Inventory #1 | Phase 2 |
| 7 | No tab panes with show/hide on mobile | Feature Inventory #2 | Phase 2 + Phase 4 |
| 8 | No 2-column field grid on mobile | Feature Inventory #3 | Phase 2 + Phase 3 |
| 9 | Tab CSS missing on mobile | Root Cause | Phase 3 |
| 10 | Tab switching JS missing on mobile | Feature Inventory #2 | Phase 4 |
| 11 | Field count parity not verified | User Requirement #3 | Phase 5 |
| 12 | `layer8d-forms-fields.js` over 500 lines (587) | File Size Verification | Phase 1 (extraction reduces to ~493) |
| 13 | `layer8m-forms.css` near limit (452 + ~45 = ~497) | File Size Verification | Phase 3 (monitor, split if needed) |
| 14 | `<script>` tag for new shared file in both app.html files | Phase 1 dependency | Phase 1 |

---

## Platform Conversion Checklists

### Before Writing Code
- [x] Feature inventory of every interactive element on desktop detail popup (14 items)
- [x] Every item marked as "implement" or "no change needed"
- [x] Traced every data flow path in desktop (editable inputs → disabled) and mobile (read-only spans)
- [x] Verified mobile framework provides equivalent data access (same formDef, same data)
- [x] NOT introducing server calls that desktop doesn't make (mobile already fetches fresh record — existing behavior)
- [x] NOT adding UI features desktop doesn't have
- [x] Verified field-by-field value type parity (10 field types analyzed)

### After Writing Code (Phase 5)
- [ ] Traced data through every intermediate layer
- [ ] Every parameter needed by consuming code is forwarded
- [ ] Components in hidden containers (non-active tab panes) defer initialization until visible — N/A (static HTML, no charts/canvas)
- [ ] Did NOT bypass any existing wrapper/helper
- [ ] Tested at least one complete interaction path end-to-end
