# Plan: L8UI ERP Decontamination

## Problem Statement

The `l8ui/` directory is the generic, project-agnostic UI component library shared across all Layer 8 projects. An audit identified **19 violations** where ERP-specific content leaked into the generic library. This causes problems when other projects (l8bugs, l8id, l8physio, etc.) consume l8ui — they inherit ERP branding, ERP-specific primary key fallbacks, and misleading comments referencing ERP internals.

## Guiding Principle

- **Generic stays in l8ui**: animation definitions, login page structure, table logic, CSV export, portals
- **ERP-specific content is extracted to the ERP project**: hardcoded primary keys, "ERP by Layer 8" branding defaults, ERP module names in code comments
- **Rename, don't remove**: CSS animation keyframes with `erp-` prefix are renamed to `l8-` prefix (all consumers are inside l8ui itself, so no external breakage)

## Violation Inventory

| # | File | Violation | Type | Severity |
|---|------|-----------|------|----------|
| 1 | `edit_table/layer8d-table-data.js` | Hardcoded HCM/FIN/SCM primary key fallback chain (lines 226-275) | Code logic | HIGH |
| 2 | `login/layer8d-login-config.js` | Hardcoded `appTitle: 'ERP by Layer 8'` fallback (line 34) | Code logic | HIGH |
| 3 | `login/index.html` | `<title>Login - ERP by Layer 8</title>` and `<h1>ERP by Layer 8</h1>` | Markup | HIGH |
| 4 | `register/index.html` | `<title>Register - ERP by Layer 8</title>` | Markup | HIGH |
| 5 | `shared/layer8d-animations.css` | 13 keyframe names with `erp-` prefix, 6 utility classes referencing them | CSS naming | MEDIUM |
| 6 | `notification/layer8d-notification.css` | 2 keyframe names with `erp-` prefix + 2 animation rules referencing them | CSS naming | MEDIUM |
| 7 | `portal/layer8d-portal.js` | Comment example shows `moduleNamespace: 'HCM'` (code is generic) | Comment | LOW |
| 8 | `portal/layer8m-portal.js` | Comment example shows `moduleNamespace: 'HCM'` (code is generic) | Comment | LOW |
| 9 | `shared/layer8-csv-export.js` | Comment: `"/erp/30/Employee"` example | Comment | LOW |
| 10 | `shared/layer8-export-helper.js` | Comment: `"/erp/30/Employee"` example | Comment | LOW |
| 11 | `context_bar/layer8d-context-bar.js` | Comment: "L8erp HCM dept" | Comment | LOW |
| 12 | `shared/layer8d-favorites.js` | Comment: "l8erp" as example consumer | Comment | LOW |
| 13 | `m/js/layer8m-renderers.js` | Comment: "Desktop Equivalent: shared/erp-renderers.js" + "mobile HCM" | Comment | LOW |
| 14 | `m/js/layer8m-utils.js` | Comment: "Desktop Equivalent: erp-utils.js patterns" | Comment | LOW |
| 15 | `m/js/layer8m-forms.js` | Comment: "Desktop Equivalent: shared/erp-forms.js" | Comment | LOW |
| 16 | `m/js/layer8m-forms-fields.js` | Comments: "erp-forms.js" (lines 17, 27) | Comment | LOW |
| 17 | `m/js/layer8m-forms-fields-reference.js` | Comment: "MATCHES DESKTOP erp-forms.js EXACTLY" | Comment | LOW |
| 18 | `m/js/layer8m-nav-crud.js` | Comments: "erp-forms.js" (lines 68, 82, 155) | Comment | LOW |
| 19 | `shared/layer8-section-layout.css` | Comment: "Used by all ERP modules (FIN, HCM, SCM, etc.)" | Comment | LOW |
| 20 | `sys/l8sys.css` | Comment: "ERP tag for roles display" | Comment | LOW |
| 21 | `popup/layer8d-popup-forms.css` | Comment: "Uses shared CSS variables from erp-theme.css" | Comment | LOW |
| 22 | `login/*.css` and `login/*.js` (10 files) | File header comments: "L8ERP - Login Page..." | Comment | LOW |

---

## Phase 1: Remove Hardcoded Primary Key Fallback Chain (HIGH)

**File:** `l8ui/edit_table/layer8d-table-data.js`

**Problem:** `getItemId()` (lines 220-276) contains a massive fallback chain of ~80 hardcoded primary key field names from HCM, FIN, Payroll, Benefits, Time & Attendance, Talent, Learning, and Compensation modules. This is pure ERP-specific knowledge embedded in a generic table component.

**Fix:** The `primaryKey` config is already the intended mechanism (line 223). The fallback chain exists for cases where `primaryKey` isn't set. Replace the entire module-specific fallback chain with a small generic fallback that covers only truly generic patterns, and add a console warning when the generic fallback is used.

**Before (lines 220-276):**
```javascript
Layer8DTable.prototype.getItemId = function(item) {
    if (this.primaryKey && item[this.primaryKey] !== undefined) {
        return item[this.primaryKey];
    }
    return item.id || item.userId || item.roleId || item.targetId ||
           item.credId || item.employeeId || item.organizationId ||
           // ... 80+ ERP-specific keys ...
           item.key || JSON.stringify(item);
};
```

**Pre-implementation audit (MUST run before changing the code):**
```bash
# Find all table instantiations that do NOT set primaryKey
grep -rn "new Layer8DTable\|new Layer8MTable\|new Layer8MEditTable" \
  --include="*.js" | grep -v "primaryKey"
```
If any results appear, those tables must be fixed to include `primaryKey` BEFORE the fallback chain is removed. Each match must be investigated — add the missing `primaryKey` to the table config. Do NOT proceed with the removal until this audit returns zero results (excluding tables that only display data with an `id` field, e.g., SYS module health/logs).

**After:**
```javascript
Layer8DTable.prototype.getItemId = function(item) {
    if (this.primaryKey && item[this.primaryKey] !== undefined) {
        return item[this.primaryKey];
    }
    if (item.id !== undefined) return item.id;
    console.error('Layer8DTable: No primaryKey configured for model "' +
        (this.modelName || 'unknown') + '" and item has no "id" field. ' +
        'Set primaryKey in table config.');
    return undefined;
};
```

**Rationale:** Every table in the system should already have `primaryKey` set via the service config/column definitions. The fallback chain was a crutch that hid configuration errors. Per `report-infra-bugs.md`, missing configuration must fail visibly — `console.error` + returning `undefined` makes the problem immediately obvious in DevTools, rather than silently returning a wrong ID from `Object.keys(item)[0]` (which has no guaranteed field order in protobuf JSON).

**Verification:**
- The pre-implementation audit confirms all tables have `primaryKey` configured before the fallback chain is removed.
- `grep -rn "primaryKey" l8ui/shared/layer8d-service-registry.js` confirms primary keys are always set from module config.

---

## Phase 2: Genericize Login/Register Branding (HIGH)

### 2a: `login/layer8d-login-config.js` (line 34-35)

**Fix:** Change fallback defaults from ERP-specific to generic:

```javascript
// Before
appTitle: 'ERP by Layer 8',
appDescription: 'Enterprise Resource Planning',

// After
appTitle: 'Layer 8',
appDescription: 'Powered by the Layer 8 Ecosystem',
```

### 2b: `login/index.html` (lines 20, 41, 43)

**Fix:** Change hardcoded defaults to generic (these are overwritten by JS on load):

```html
<!-- Before -->
<title>Login - ERP by Layer 8</title>
<h1 id="app-title" class="app-title">ERP by Layer 8</h1>
<p id="app-description" class="app-description">Enterprise Resource Planning</p>

<!-- After -->
<title>Login - Layer 8</title>
<h1 id="app-title" class="app-title">Layer 8</h1>
<p id="app-description" class="app-description">Powered by the Layer 8 Ecosystem</p>
```

Note: The `login.json` config in each project overrides these at runtime via `layer8d-login-ui.js`. These defaults are only visible if `login.json` fails to load.

### 2c: `register/index.html` (line 20)

**Fix:**
```html
<!-- Before -->
<title>Register - ERP by Layer 8</title>

<!-- After -->
<title>Register - Layer 8</title>
```

**Verification:** Load the login page in a browser — title and heading should show generic defaults before login.json loads, then switch to project-specific values.

---

## Phase 3: Rename `erp-` CSS Animation Keyframes to `l8-` (MEDIUM)

**Files:**
- `shared/layer8d-animations.css` — 13 keyframe definitions + 6 utility classes
- `notification/layer8d-notification.css` — 2 keyframe definitions + 2 animation rules

**Scope analysis:** All consumers of `erp-` keyframe names are **inside these 2 CSS files only** (verified by grep — no JS references, no HTML references, no external CSS references). This is a safe rename.

**Rename mapping:**

| Old Name | New Name |
|----------|----------|
| `erp-spin` | `l8-spin` |
| `erp-fade-in` | `l8-fade-in` |
| `erp-fade-in-up` | `l8-fade-in-up` |
| `erp-fade-in-down` | `l8-fade-in-down` |
| `erp-slide-in-right` | `l8-slide-in-right` |
| `erp-slide-out-right` | `l8-slide-out-right` |
| `erp-slide-in-left` | `l8-slide-in-left` |
| `erp-modal-fade-in` | `l8-modal-fade-in` |
| `erp-modal-scale-in` | `l8-modal-scale-in` |
| `erp-shake` | `l8-shake` |
| `erp-pulse` | `l8-pulse` |
| `erp-pulse-scale` | `l8-pulse-scale` |
| `erp-bounce` | `l8-bounce` |
| `erp-notification-slide-in` | `l8-notification-slide-in` |
| `erp-notification-slide-out` | `l8-notification-slide-out` |

**Method:** Global find-and-replace `erp-` with `l8-` in both CSS files, targeting only the keyframe names listed above (not comments or other content).

**Verification:**
```bash
grep -rn 'erp-' l8ui/shared/layer8d-animations.css l8ui/notification/layer8d-notification.css
# Expected: 0 matches
grep -c '@keyframes l8-' l8ui/shared/layer8d-animations.css
# Expected: 13
```

---

## Phase 4: Fix ERP-Specific Comments (LOW)

All changes in this phase are comment-only — no behavioral code changes.

### 4a: Portal comment examples
- `portal/layer8d-portal.js` line 11: `moduleNamespace: 'HCM'` -> `moduleNamespace: 'MyModule'`
- `portal/layer8m-portal.js` line 11: same change

### 4b: Endpoint examples in comments
- `shared/layer8-csv-export.js` line 92: `"/erp/30/Employee"` -> `"/{prefix}/{serviceArea}/{model}"`
- `shared/layer8-export-helper.js` line 29: `"/erp/30/Employee"` -> `"/{prefix}/{serviceArea}/{model}"`

### 4c: Architecture/context comments
- `context_bar/layer8d-context-bar.js` line 19: `"Probler hosts cluster filter, L8erp HCM dept"` -> `"e.g., cluster filter, department filter"`
- `shared/layer8d-favorites.js` line 22: `"(k8s, l8erp, l8logs, ...)"` -> `"(per consuming project)"`

### 4d: Mobile file "Desktop Equivalent" comments
- `m/js/layer8m-renderers.js` line 16: `"Shared rendering utilities for mobile HCM"` -> `"Shared rendering utilities for mobile"`
- `m/js/layer8m-renderers.js` line 17: `"shared/erp-renderers.js"` -> `"shared/layer8d-renderers.js"`
- `m/js/layer8m-utils.js` line 17: `"erp-utils.js patterns"` -> `"shared/layer8d-utils.js"`
- `m/js/layer8m-forms.js` line 17: `"shared/erp-forms.js"` -> `"shared/layer8d-forms.js"`
- `m/js/layer8m-forms-fields.js` line 17: `"shared/erp-forms.js (field generation part)"` -> `"shared/layer8d-forms-fields.js"`
- `m/js/layer8m-forms-fields.js` line 27: `"erp-forms.js getDateZeroLabel()"` -> `"layer8d-forms-fields.js getDateZeroLabel()"`
- `m/js/layer8m-forms-fields-reference.js` line 89: `"MATCHES DESKTOP erp-forms.js EXACTLY"` -> `"MATCHES DESKTOP layer8d-forms-fields-reference.js EXACTLY"` (or just remove "EXACTLY" verbiage)
- `m/js/layer8m-nav-crud.js` lines 68, 82, 155: `"erp-forms.js"` -> `"layer8d-forms.js"`

### 4e: CSS comments
- `shared/layer8-section-layout.css` line 18: `"Used by all ERP modules (FIN, HCM, SCM, etc.)"` -> `"Used by all Layer 8 modules"`
- `sys/l8sys.css` line 198: `"ERP tag for roles display"` -> `"Tag for roles display"`
- `popup/layer8d-popup-forms.css` line 16: `"erp-theme.css"` -> `"layer8d-theme.css"`

### 4f: Login file header comments (10 files)
All login CSS and JS files have `"L8ERP - Login Page ..."` in their header comment. Change to `"Layer 8 - Login Page ..."`:

- `login/layer8d-login-components.css`
- `login/layer8d-login-base.css`
- `login/layer8d-login.css`
- `login/layer8d-login-forms.css`
- `login/layer8d-login-tfa.css`
- `login/layer8d-login-auth.js`
- `login/layer8d-login-tfa.js`
- `login/layer8d-login-state.js`
- `login/layer8d-login-ui.js`
- `login/layer8d-login-config.js` (header comment only — fallback defaults handled in Phase 2a)

**Verification:**
```bash
grep -rn 'erp\|ERP\|l8erp\|L8ERP' l8ui/ --include="*.js" --include="*.css" --include="*.html" | grep -vi 'node_modules\|\.git'
# Expected: 0 matches (excluding backward-compat CSS aliases like hcm-* which are a separate concern)
```

---

## Phase 5: Final Verification

### 5a: Static Analysis (automated)

1. **No ERP references remain:**
   ```bash
   grep -rni 'erp' l8ui/ --include="*.js" --include="*.css" --include="*.html" \
     | grep -v 'interpolat\|excerpt\|Layer8DReferenceP' \
     | grep -v '\.git'
   # Should return 0 results
   ```

2. **CSS syntax valid** (no broken keyframe references):
   ```bash
   # All animation references resolve to defined keyframes
   grep 'animation:' l8ui/shared/layer8d-animations.css l8ui/notification/layer8d-notification.css
   # All should reference l8- prefixed names
   ```

3. **JS syntax valid:**
   ```bash
   for f in $(find l8ui/ -name "*.js" -path "*/edit_table/*" -o -name "*.js" -path "*/login/*"); do
     node -c "$f" 2>&1 | grep -v "^$"
   done
   ```

4. **Table primaryKey coverage** — verify no table in the ERP project relies on the removed fallback chain by searching for tables without explicit `primaryKey`:
   ```bash
   grep -rn "new Layer8DTable\|new Layer8MTable\|new Layer8MEditTable" \
     --include="*.js" | grep -v "primaryKey"
   ```

### 5b: Desktop UI Smoke Test

For each affected area, navigate in the desktop app and verify:

- [ ] **Desktop: Login page** — load `login.html`. Verify title bar and heading show generic "Layer 8" defaults before login.json overrides. After login.json loads, verify project-specific title appears.
- [ ] **Desktop: Register page** — load `register/index.html`. Verify title bar shows generic "Register - Layer 8".
- [ ] **Desktop: HCM table** — navigate to HCM > Core HR > Employees. Verify table data loads (not blank). Click a row — verify detail popup opens with correct employee data (tests primaryKey config, not fallback chain).
- [ ] **Desktop: FIN table** — navigate to FIN > General Ledger > Accounts. Verify table data loads. Click a row — verify detail popup opens (FIN PKs were the largest block in the removed fallback chain).
- [ ] **Desktop: SYS Security table** — navigate to System > Security > Users. Verify table data loads. Click a row — verify detail popup opens (tests generic `userId`/`roleId` PKs).
- [ ] **Desktop: Notifications** — trigger a save or error action. Verify toast notification slides in and out (tests renamed `l8-notification-slide-in/out` keyframes).
- [ ] **Desktop: Popup animations** — open any detail popup. Verify modal fade-in animation plays (tests renamed `l8-modal-fade-in`/`l8-modal-scale-in` keyframes).
- [ ] **Desktop: CSV Export** — on any table, click the Export button. Verify export initiates (tests that csv-export.js still resolves endpoints correctly).

### 5c: Mobile UI Smoke Test

For each affected area, navigate in the mobile app and verify:

- [ ] **Mobile: Login page** — load `m/login.html` (or the mobile login path). Verify generic branding defaults.
- [ ] **Mobile: HCM table** — navigate to HCM > Core HR > Employees. Verify table cards load. Tap a card — verify detail popup opens with correct data.
- [ ] **Mobile: FIN table** — navigate to FIN > General Ledger > Accounts. Verify table cards load. Tap a card — verify detail popup opens.
- [ ] **Mobile: Form rendering** — open any Add or Edit form. Verify reference pickers, date pickers, and all form fields render correctly (tests that mobile form JS files still load after comment changes).
- [ ] **Mobile: Navigation** — verify all module cards appear and navigation drill-down works (tests that layer8m-nav-crud.js still loads after comment changes).
- [ ] **Mobile: CSV Export** — on any table, tap Export. Verify export initiates.

---

## Traceability Matrix

| # | Violation | Platform | Phase |
|---|-----------|----------|-------|
| 1 | table-data.js hardcoded PK fallback chain | Desktop | Phase 1 |
| 2 | login-config.js hardcoded "ERP by Layer 8" | Both | Phase 2a |
| 3 | login/index.html ERP branding | Both | Phase 2b |
| 4 | register/index.html ERP branding | Both | Phase 2c |
| 5 | animations.css `erp-` keyframes | Desktop | Phase 3 |
| 6 | notification.css `erp-` keyframes | Desktop | Phase 3 |
| 7 | portal/layer8d-portal.js HCM comment | Desktop | Phase 4a |
| 8 | portal/layer8m-portal.js HCM comment | Mobile | Phase 4a |
| 9 | csv-export.js ERP endpoint comment | Both | Phase 4b |
| 10 | export-helper.js ERP endpoint comment | Both | Phase 4b |
| 11 | context-bar.js L8erp HCM comment | Desktop | Phase 4c |
| 12 | favorites.js l8erp comment | Desktop | Phase 4c |
| 13 | layer8m-renderers.js "mobile HCM" + erp-renderers comments (lines 16-17) | Mobile | Phase 4d |
| 14 | layer8m-utils.js erp-utils comment | Mobile | Phase 4d |
| 15 | layer8m-forms.js erp-forms comment | Mobile | Phase 4d |
| 16 | layer8m-forms-fields.js erp-forms comments | Mobile | Phase 4d |
| 17 | layer8m-forms-fields-reference.js erp-forms comment | Mobile | Phase 4d |
| 18 | layer8m-nav-crud.js erp-forms comments | Mobile | Phase 4d |
| 19 | layer8-section-layout.css ERP modules comment | Both | Phase 4e |
| 20 | l8sys.css ERP tag comment | Desktop | Phase 4e |
| 21 | popup-forms.css erp-theme comment | Desktop | Phase 4e |
| 22 | 10 login CSS/JS files L8ERP header comments | Both | Phase 4f |

---

## What Is NOT Changed

- **Portal code logic** (layer8d-portal.js, layer8m-portal.js): The `moduleNamespace` fallback is already generic (`config.moduleNamespace || config.namespace`). Only the comment example is updated.
- **Backward-compat CSS aliases** (`hcm-*` -> `l8-*` in layer8-section-layout.css): These are a separate concern tracked elsewhere.
- **No extraction to ERP project needed**: The ERP-specific content in l8ui is either removed (PK fallback chain), genericized (branding defaults, comments), or renamed (CSS animations). Nothing needs to be moved to the ERP project because:
  - The PK fallback chain is unnecessary — `primaryKey` config already exists
  - The branding defaults should be generic, not ERP-specific
  - The animation names are purely cosmetic — renaming `erp-` to `l8-` is the right fix
