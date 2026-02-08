# Mobile-Desktop Parity Plan

## Overview
The mobile UI has fallen out of sync with the desktop. This plan systematically identifies and fixes every gap to achieve full functional parity.

---

## Phase 1: Critical Infrastructure Bugs (Blocks Everything)

These bugs prevent basic functionality across ALL modules on mobile.

### 1.1 Missing `layer8d-utils.js` in mobile `app.html`
- **Bug**: `Layer8DUtils` is referenced by mobile money field code (`layer8m-forms-fields-reference.js:112`) and `app-core.js:95,107` but **never loaded** in `m/app.html`
- **Impact**: Currency dropdowns are EMPTY in all money fields; exchange rate conversion fails; currency cache never stores
- **Fix**: Add `<script src="../l8ui/shared/layer8d-utils.js"></script>` to `m/app.html` before the form factory scripts
- **Also add**: `<script src="../l8ui/shared/layer8d-renderers.js"></script>` and `<script src="../l8ui/shared/layer8d-config.js"></script>` (dependencies of utils)

### 1.2 `layer8m-nav-data.js` — Hardcoded 4-module registry list
- **Bug**: Lines 63, 85, 102 have `const registries = [window.MobileHCM, window.MobileFIN, window.MobileSCM, window.MobileSYS]`
- **Impact**: 8 modules (Sales, MFG, CRM, BI, Documents, Comp, PRJ, ECOM) get NO columns/forms — they fall back to generic 3-field form
- **Fix**: Replace with ALL registries:
  ```javascript
  const registries = [
      window.MobileHCM, window.MobileFIN, window.MobileSCM,
      window.MobileSales, window.MobileMfg, window.MobileCrm,
      window.MobileBi, window.MobileDoc, window.MobileComp,
      window.MobilePrj, window.MobileEcom, window.MobileSYS
  ];
  ```
  Note the exact casing from index files: `MobileSales`, `MobileMfg`, `MobileCrm`, `MobileBi`, `MobileDoc`, `MobileComp`

---

## Phase 2: Missing Reference Registries (4 files)

Desktop has 11+ reference registry files. Mobile is missing 4.

### 2.1 Create missing mobile reference registries
Using the `Layer8RefFactory` pattern (same as existing mobile registries):

| File | Desktop Source | Models |
|------|--------------|--------|
| `erp-ui/m/reference-registries/layer8m-reference-registry-fin.js` | `js/reference-registry-fin.js` | Account, Vendor, Customer, Currency, FiscalYear, etc. |
| `erp-ui/m/reference-registries/layer8m-reference-registry-bi.js` | `js/reference-registry-bi.js` | BiReport, BiDashboard, BiKPI, etc. |
| `erp-ui/m/reference-registries/layer8m-reference-registry-documents.js` | `js/reference-registry-documents.js` | DocDocument, DocFolder, DocTemplate, etc. |
| `erp-ui/m/reference-registries/layer8m-reference-registry-comp.js` | `js/reference-registry-comp.js` | CompControl, CompRiskRegister, CompIncident, etc. |

### 2.2 Add script includes to `m/app.html`
Add after the existing reference registry includes (line 269):
```html
<script src="../erp-ui/m/reference-registries/layer8m-reference-registry-fin.js"></script>
<script src="../erp-ui/m/reference-registries/layer8m-reference-registry-bi.js"></script>
<script src="../erp-ui/m/reference-registries/layer8m-reference-registry-documents.js"></script>
<script src="../erp-ui/m/reference-registries/layer8m-reference-registry-comp.js"></script>
```

---

## Phase 3: Missing Module Data Files (PRJ + ECOM = ~30 files)

Two modules have NO mobile data files at all.

### 3.1 Create PRJ (Projects) mobile module files
Create directory `m/js/prj/` with 16 files:

**Submodules** (5): planning, resources, billing, timeexpense, analytics

For each submodule, create 3 files by adapting the desktop equivalents:
- `{submodule}-enums.js` — Copy desktop enum definitions, wrap in IIFE with `MobilePrjXxx` namespace
- `{submodule}-columns.js` — Copy desktop column definitions, verify field names against protobuf
- `{submodule}-forms.js` — Copy desktop form definitions, verify field names against protobuf

Plus 1 index file:
- `prj-index.js` — Follow the pattern of `hcm-index.js`: create `window.MobilePrj` registry

### 3.2 Create ECOM (E-Commerce) mobile module files
Create directory `m/js/ecom/` with 13 files:

**Submodules** (4): catalog, orders, customers, promotions

Same pattern as PRJ above, creating `window.MobileEcom` registry.

### 3.3 Add script includes to `m/app.html`
Add PRJ and ECOM sections (enums, columns, forms, index) following the existing module pattern.

---

## Phase 4: Mobile Nav Config — Missing Compliance Module

### 4.1 Add compliance to mobile nav config
- **File**: `erp-ui/m/nav-configs/layer8m-nav-config-prj-other.js`
- **Fix**: Add compliance module services (regulatory, controls, risk, audit) matching the desktop config
- Verify the nav-config-base.js already has `compliance` in its section list

---

## Phase 5: Systematic IIFE Audit

### 5.1 Verify ALL mobile form/enum/column files use IIFEs
Already fixed for 6 SCM form files. Need to verify ALL other mobile JS files:

**Check pattern**: Every `m/js/**/*.js` file must either:
- Be wrapped in `(function() { 'use strict'; ... })();`
- OR not declare any `const`/`let` at the top level

**Files to audit** (by module):
- `m/js/fin/**/*.js` (21 files)
- `m/js/sales/**/*.js` (19 files)
- `m/js/mfg/**/*.js` (19 files)
- `m/js/crm/**/*.js` (19 files)
- `m/js/bi/**/*.js` (13 files)
- `m/js/documents/**/*.js` (13 files)
- `m/js/comp/**/*.js` (13 files)
- `m/js/sys/**/*.js` (3 files)

**Detection command**:
```bash
grep -rl "^const " go/erp/ui/web/m/js/ --include="*.js" | grep -v node_modules
```

Any file found needs IIFE wrapping.

---

## Phase 6: Form Factory Method Completeness Audit

### 6.1 Find all factory method calls across ALL mobile form files
```bash
grep -ohP 'f\.\w+\(' go/erp/ui/web/m/js/**/*-forms.js | sort -u
```

### 6.2 Compare against methods in `layer8-form-factory.js`
Currently defined: `text`, `textarea`, `number`, `checkbox`, `date`, `select`, `reference`, `url`, `email`, `phone`, `ssn`, `ein`, `money`, `percentage`, `rating`, `routingNumber`, `colorCode`, `datetime`, `time`, `hours`, `basicEntity`, `dateRange`, `address`, `contact`, `audit`, `person`, `section`, `form`

Any method used in forms but not in the factory must be added.

---

## Phase 7: Field Name Verification Against Protobuf

### 7.1 Verify mobile form field names match protobuf JSON names
For EVERY mobile form file, cross-reference each field key against the corresponding `.pb.go` struct.

Priority modules (most likely to have mismatches from copy-paste):
1. All HCM submodule forms (payroll, benefits, time, talent, learning, compensation)
2. All FIN submodule forms
3. All SCM submodule forms

**Per the js-column-field-verification rule**: Field names must come from the `json` tag in the protobuf struct, never guessed.

---

## Phase 8: Verify Mobile `app-core.js` Parity with Desktop

### 8.1 Currency initialization
- Desktop `app.js` loads currencies on init and stores in `Layer8DUtils.setCurrencyCache()`
- Mobile `app-core.js` does the same BUT `Layer8DUtils` isn't loaded (fixed in Phase 1)
- After Phase 1 fix, verify currencies actually populate in money field dropdowns

### 8.2 Module filter
- Both load `layer8d-module-filter.js` — verify it works after Phase 1 infrastructure fixes

---

## Execution Order

```
Phase 1 → Phase 2 → Phase 5 → Phase 6 → Phase 3 → Phase 4 → Phase 7 → Phase 8
```

Phase 1 MUST be first (unblocks currency/forms for all modules).
Phase 2 unblocks reference pickers.
Phase 5+6 fix remaining JS errors.
Phase 3+4 add missing modules.
Phase 7+8 are verification/cleanup.

---

## Estimated File Changes

| Phase | New Files | Modified Files |
|-------|-----------|---------------|
| 1 | 0 | 2 (app.html, nav-data.js) |
| 2 | 4 | 1 (app.html) |
| 3 | ~30 | 1 (app.html) |
| 4 | 0 | 1 (nav-config-prj-other.js) |
| 5 | 0 | TBD (any files missing IIFEs) |
| 6 | 0 | 1 (layer8-form-factory.js, if needed) |
| 7 | 0 | TBD (field name fixes) |
| 8 | 0 | 0 (verification only) |

**Total: ~34 new files, ~6+ modified files**
