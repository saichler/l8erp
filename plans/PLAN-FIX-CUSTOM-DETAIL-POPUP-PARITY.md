# Plan: Fix Custom Detail Popup Parity (Employee, Health, Security)

## Problem Statement

Three areas use custom detail popups that bypass the standard form rendering path. Changes to the form system (Phase 1-3 of PLAN-FIX-DETAIL-POPUP-PARITY) have ZERO effect on these custom popups. Each has different parity gaps:

1. **Employee**: Both platforms have independent custom popups with different field sets
2. **Health**: Both platforms have independent custom popups with minor differences
3. **Security (mobile)**: No detail popup at all — clicking rows does nothing

---

## Gap 1: Employee Detail Popup

### Desktop (`hcm/core-hr/employee-detail.js`)
- Triggered by: Name column link (`EmployeeDetail.open(employeeId)`)
- Fetches employee + 6 related entities (Documents, Compliance, Org, Dept, Position, Job)
- 4 tabs: Overview, Employment, Documents, Compliance
- Photo/initials avatar header with status badges
- **BROKEN**: Calls `HCMForms.showModal()` on line 27 — `HCMForms` is undefined. Edit button will throw ReferenceError.

### Mobile (`m/js/hcm/employee-detail-m.js`)
- Triggered by: `onRowClick` in nav config (the ONLY custom onRowClick in all configs)
- Fetches employee + 6 related entities (same as desktop)
- 4 tabs: Overview, Employment, Documents, Compliance
- Initials avatar header (no photo support)

### Field Comparison

| Field | Desktop | Mobile | Gap |
|-------|---------|--------|-----|
| employeeId | Yes | Yes | OK |
| employeeNumber | Yes | Yes | OK |
| Full Name | Yes | Yes | OK |
| dateOfBirth | Yes | Yes | OK |
| gender | Yes (enum label) | Yes (enum label) | OK |
| maritalStatus | Yes (enum label) | Yes (enum label) | OK |
| nationality | Yes | Yes | OK |
| suffix | No | No | OK |
| preferredName | No | No | OK |
| citizenship | No | No | OK |
| nationalId (SSN) | No | No | OK |
| nationalIdType | No | No | OK |
| photoUrl | Photo avatar | Initials only | Gap |
| applicationId | No | No | OK |
| Organization | Yes (resolved name) | Yes (resolved name) | OK |
| Department | Yes (resolved name) | Yes (resolved name) | OK |
| Position | Yes (resolved name) | Yes (resolved name) | OK |
| Job | Yes (resolved name) | Yes (resolved name) | OK |
| workLocationId | Yes (raw ID) | Yes (raw ID) | OK |
| costCenterId | Yes (raw ID) | Yes (raw ID) | OK |
| employmentStatus | Yes (enum label + badge) | Yes (enum label) | Minor |
| employmentType | Yes (enum label + badge) | Yes (enum label) | Minor |
| hireDate | Yes | Yes | OK |
| originalHireDate | Yes | Yes | OK |
| terminationDate | Yes (conditional) | Yes (conditional) | OK |
| terminationReason | Yes (conditional) | Yes (conditional) | OK |
| isRehire | Yes | Yes | OK |
| managerId | Yes (raw ID) | Yes (raw ID) | OK |
| Documents tab | Yes (name, type, dates) | Yes (name, type, dates) | OK |
| Compliance tab | Yes (type, status, dates) | Yes (type, status, dates) | OK |
| Edit button | Broken (HCMForms undefined) | None | Both broken |

### Root Cause
Both platforms hand-build HTML for the same data. The field sets are actually very close — the main differences are:
1. Desktop's Edit button is broken (references undefined `HCMForms`)
2. Desktop shows photo if available; mobile only shows initials
3. Desktop shows status/type as badges; mobile shows as plain text

### Fix Approach
**Consolidate into a single shared implementation** called by both platforms. This eliminates the duplication and ensures future changes apply to both.

Create `l8ui/shared/layer8-employee-detail.js` with a shared rendering function that:
- Accepts the employee object + related data
- Returns tab content HTML (same data, same field order)
- Platform-specific wrappers handle popup chrome (Layer8DPopup on desktop, Layer8MPopup on mobile)

Also fix the broken Edit button: replace `HCMForms.showModal()` with `Layer8DForms.openEditForm()` using `CoreHR.forms.Employee`.

---

## Gap 2: Health Detail Popup

### Desktop (`l8ui/sys/health/l8health.js`, lines 253-435)
- 4 tabs: Overview, Network, Resources, Services
- Uses `probler-popup-tabs` / `probler-popup-tab-pane` for tab system
- Has "Memory & CPU" pprof button
- Resources tab has "Data Object" field in Additional Details section

### Mobile (`m/sections/system.html`, lines 258-337)
- 4 tabs: Overview, Network, Resources, Services
- Uses `Layer8MPopup.show({ tabs: [...] })` pattern

### Field Comparison

| Tab | Field | Desktop | Mobile | Gap |
|-----|-------|---------|--------|-----|
| Overview | Service Name | Yes | Yes | OK |
| Overview | Alias | Yes | Yes | OK |
| Overview | Start Time | Yes | Yes | OK |
| Overview | Up Time | Yes | Yes | OK |
| Overview | Memory Usage | Yes | Yes | OK |
| Overview | CPU Usage | Yes | Yes | OK |
| Overview | Last Pulse | Yes | Yes | OK |
| Network | RX Messages | Yes | Yes | OK |
| Network | RX Data | Yes | Yes | OK |
| Network | RX Data (bytes) | Yes | Yes | OK |
| Network | TX Messages | Yes | Yes | OK |
| Network | TX Data | Yes | Yes | OK |
| Network | TX Data (bytes) | Yes | Yes | OK |
| Network | Last Message | Yes | Yes | OK |
| Network | Time Since Last | Yes | Yes | OK |
| Resources | Memory (formatted) | Yes | Yes | OK |
| Resources | Memory (bytes) | Yes | Yes | OK |
| Resources | CPU (percentage) | Yes | Yes | OK |
| Resources | CPU (raw) | Yes | Yes | OK |
| Resources | Data Object | Yes | **No** | **Gap** |
| Services | Service list | Yes | Yes | OK |
| Footer | pprof button | Yes | No | Desktop-only |

### Root Cause
Two independent implementations with 99% overlap. Only 1 field difference (Data Object) and 1 feature difference (pprof button, which is desktop-appropriate only).

### Fix Approach
Add the missing "Data Object" field to mobile's Resources tab. The pprof button is intentionally desktop-only (requires browser-based profiling, not suited for mobile). This is a 1-field fix.

---

## Gap 3: Security Detail Popup (Mobile)

### Desktop (`l8ui/sys/security/l8security-users-crud.js`, `l8security-roles-crud.js`, `l8security-credentials-crud.js`)
- Full CRUD popups for Users, Roles, Credentials
- Users: View/edit all fields (userId, fullName, email, accountStatus, portal, fa, etc.)
- Roles: View/edit with nested rule editor (stacked modal for permission rules)
- Credentials: View/edit with nested credential item editor (stacked modal)
- All use `Layer8DPopup.show()` with custom form HTML

### Mobile (`m/sections/system.html`, lines 45-113)
- Tables exist for Users, Roles, Credentials, Events
- **No `onRowClick`** — clicking a row does nothing
- **No CRUD callbacks** — no Add/Edit/Delete buttons
- Read-only table display only

### Root Cause
Mobile security was implemented as table-only with no interaction. Desktop has full CRUD with complex nested editors.

### Fix Approach
Add read-only detail popups to mobile for all 4 security services (Users, Roles, Credentials, Events). Use the existing `L8Security.forms` definitions with `Layer8MForms.renderForm(formDef, data, true)` for the standard form path.

For Users and Events, the standard form path is sufficient (flat fields only).

For Roles and Credentials, the standard form path shows inline tables for nested items (rules, credential items), which matches the desktop read-only view.

Full CRUD (add/edit/delete with nested editors) is deferred — it requires stacked mobile modals with complex nested editing, which is significant work for a low-traffic admin section.

---

## Traceability Matrix

| # | Gap | Description | Phase |
|---|-----|-------------|-------|
| 1 | Employee desktop Edit broken | `HCMForms.showModal()` is undefined | Phase 1 |
| 2 | Employee field parity | Two independent custom popups, minor differences | Phase 1 |
| 3 | Employee code duplication | ~280 lines duplicated across desktop/mobile | Phase 1 |
| 4 | Health mobile missing Data Object | Resources tab missing 1 field | Phase 2 |
| 5 | Security mobile no detail popup | Clicking rows does nothing | Phase 3 |
| 6 | Security mobile no CRUD | No Add/Edit/Delete on mobile | Deferred |
| 7 | End-to-end verification | All 3 areas on both platforms | Phase 4 |

---

## Phase 1: Consolidate Employee Detail Popup

### Step 1: Create shared Employee detail renderer

**New file**: `l8ui/shared/layer8-employee-detail.js`

Shared rendering functions extracted from both platform implementations:

```js
window.Layer8EmployeeDetail = {
    renderOverview(emp) { /* returns HTML */ },
    renderEmployment(emp) { /* returns HTML */ },
    renderDocuments(docs) { /* returns HTML */ },
    renderCompliance(records) { /* returns HTML */ },
    renderHeader(emp) { /* returns HTML - avatar + name + badges */ },
    fetchEmployeeWithRelated(employeeId) { /* returns Promise<employee> */ }
};
```

Key design decisions:
- `fetchEmployeeWithRelated` uses `Layer8MAuth.get` if available, falls back to desktop `fetch` + `getAuthHeaders`
- Enum rendering uses `CoreHR.enums` and `CoreHR.render` (shared between platforms)
- Photo avatar shows if `photoUrl` exists, otherwise initials
- Employment status/type shown as badges on both platforms

### Step 2: Update desktop Employee detail

**File**: `hcm/core-hr/employee-detail.js`

- Replace all rendering functions with calls to `Layer8EmployeeDetail.*`
- Fix Edit button: replace `HCMForms.showModal()` with `Layer8DForms.openEditForm(serviceConfig, CoreHR.forms.Employee, employeeId, onSuccess)`
- Keep desktop-specific popup chrome (Layer8DPopup)

### Step 3: Update mobile Employee detail

**File**: `m/js/hcm/employee-detail-m.js`

- Replace all rendering functions with calls to `Layer8EmployeeDetail.*`
- Keep mobile-specific popup chrome (Layer8MPopup)

### Step 4: Add script tags

**Files**: `app.html`, `m/app.html`

- Add `<script src="l8ui/shared/layer8-employee-detail.js">` (or appropriate relative path) after `layer8d-forms.js` and before module scripts

### Step 5: Verify both popups render identically

- Click Employee name link on desktop
- Click Employee row on mobile
- Compare all 4 tabs field by field

---

## Phase 2: Fix Health Detail Popup

### Step 1: Add Data Object field to mobile Resources tab

**File**: `m/sections/system.html`

In the `showHealthDetail` function, add the "Data Object" row to the Resources tab content, matching the desktop implementation in `l8health.js`:

```js
// Add to Resources tab after CPU section:
'<div class="health-detail-label">Data Object</div>' +
'<div class="health-detail-value">' + escapeHtml(String(health.dataObject || '-')) + '</div>'
```

### Step 2: Verify

- Click a Health row on desktop — note Resources tab content
- Click a Health row on mobile — verify Resources tab now shows Data Object

---

## Phase 3: Add Security Detail Popups (Mobile)

### Step 1: Add onRowClick handlers to mobile security tables

**File**: `m/sections/system.html`

For each security service table (Users, Roles, Credentials, Events), add an `onRowClick` callback that opens a read-only detail popup using the standard form path:

```js
onRowClick: function(item) {
    var formDef = L8Security.forms.L8User;
    Layer8MPopup.show({
        title: 'User Details',
        content: Layer8MForms.renderForm(formDef, item, true),
        size: 'large',
        showFooter: false,
        onShow: function(popup) {
            Layer8MForms.initFormFields(popup.body, formDef);
        }
    });
}
```

Apply same pattern for Roles (`L8Security.forms.L8Role`), Credentials (`L8Security.forms.L8Credentials`), and Events (`L8Security.forms.EventRecord`).

### Step 2: Verify L8Security.forms is loaded on mobile

**File**: `m/app.html`

Confirm that `l8ui/sys/security/l8security-enums.js`, `l8security-columns.js`, and `l8security-forms.js` are included. They should already be loaded (mobile loads SYS module scripts per the loading order), but verify.

### Step 3: Verify

- Click a User row on mobile — verify detail popup shows all User fields
- Click a Role row on mobile — verify detail popup shows role info + rules inline table
- Click a Credentials row on mobile — verify detail popup shows credential items
- Click an Events row on mobile — verify detail popup shows all event fields

---

## Phase 4: End-to-End Verification

For all 3 areas, on both desktop and mobile:

### Employee
- [ ] Desktop: Click employee name link — popup opens with 4 tabs
- [ ] Desktop: Edit button works (opens edit form, not HCMForms error)
- [ ] Desktop: All 4 tabs show correct data (Overview, Employment, Documents, Compliance)
- [ ] Mobile: Click employee row — popup opens with 4 tabs
- [ ] Mobile: All 4 tabs show correct data matching desktop
- [ ] Both: Photo/initials avatar renders correctly
- [ ] Both: Employment status/type display consistently

### Health
- [ ] Desktop: Click health row — 4-tab popup with Data Object in Resources
- [ ] Mobile: Click health row — 4-tab popup with Data Object in Resources
- [ ] Both: All fields in all 4 tabs match

### Security
- [ ] Desktop: Click user row — detail popup with all fields
- [ ] Desktop: Click role row — detail popup with rules
- [ ] Desktop: Click credentials row — detail popup with items
- [ ] Mobile: Click user row — detail popup with all User fields
- [ ] Mobile: Click role row — detail popup with role info
- [ ] Mobile: Click credentials row — detail popup with credential info
- [ ] Mobile: Click events row — detail popup with event fields

---

## Files Changed

| File | Change | Phase |
|------|--------|-------|
| `l8ui/shared/layer8-employee-detail.js` | **NEW** - Shared Employee detail renderer | 1 |
| `hcm/core-hr/employee-detail.js` | Refactor to use shared renderer, fix Edit button | 1 |
| `m/js/hcm/employee-detail-m.js` | Refactor to use shared renderer | 1 |
| `app.html` | Add script tag for shared Employee detail | 1 |
| `m/app.html` | Add script tag for shared Employee detail | 1 |
| `m/sections/system.html` | Add Data Object to Health; Add onRowClick to Security tables | 2, 3 |

## Risk Assessment

- **Phase 1** (Employee): Medium risk — refactoring two working popups into shared code. Mitigated by keeping popup chrome platform-specific and only sharing data rendering.
- **Phase 2** (Health): Very low risk — adding 1 field to an existing function.
- **Phase 3** (Security): Low risk — adding new read-only popup handlers to existing tables. No changes to existing code.
- **Desktop**: No impact to any module except Employee (Edit button fix) and Health (no change).
- **Standard form path**: Zero impact — Phases 1-3 of PLAN-FIX-DETAIL-POPUP-PARITY are unaffected.

## Deferred Items

| Item | Reason |
|------|--------|
| Security mobile CRUD (Add/Edit/Delete) | Requires stacked mobile modals with nested editing. Low-traffic admin section — read-only detail is sufficient for now. |
| pprof button on mobile Health | Desktop-only debugging tool, not applicable to mobile |
