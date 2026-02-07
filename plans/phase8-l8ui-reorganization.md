# Phase 8: L8UI Directory Reorganization

## Overview

The `go/erp/ui/web/l8ui/` directory is intended to contain **generic Layer 8 UI components** that are abstracted from the ERP project. However, analysis reveals that ERP-specific content has leaked into this directory.

**Goal:** Separate truly generic Layer 8 components from ERP-specific implementations so that `l8ui` can be reused in other Layer 8 projects.

---

## Current State Analysis

### Directory Structure
```
l8ui/
├── datepicker/          ✅ Generic
├── edit_table/          ✅ Generic
├── font/                ✅ Generic
├── images/              ✅ Generic
├── input_formatters/    ✅ Generic
├── login/               ✅ Generic
├── notification/        ✅ Generic
├── popup/               ✅ Generic
├── reference_picker/    ✅ Generic
├── register/            ✅ Generic
├── shared/              ⚠️  Mixed (some ERP-specific)
├── sys/                 ⚠️  Unclear (L8Sys vs ERP)
├── m/                   ❌ Mostly ERP-specific
└── GUIDE.md             ✅ Generic
```

### Files Requiring Action

#### `shared/` Directory - Mixed Content

| File | Status | Issue |
|------|--------|-------|
| `layer8-svg-factory.js` | ❌ ERP-specific | Contains HCM, FIN, SCM, Sales, CRM, MFG, PRJ, BI, Documents, E-Commerce, Compliance icon templates |
| `layer8-section-generator.js` | ⚠️ Needs refactor | Uses `hcm-*` CSS class names instead of generic `l8-*` names |
| `layer8d-module-config-factory.js` | ⚠️ Minor cleanup | ERP references in comments only |
| `layer8d-service-registry.js` | ⚠️ Minor cleanup | ERP references in comments only |
| All other shared files | ✅ Generic | No changes needed |

#### `m/js/` Directory - Mobile Components

| File | Status | Issue |
|------|--------|-------|
| `layer8m-reference-registry.js` | ✅ Generic | Just a registry container |
| `layer8m-reference-registry-hcm.js` | ❌ ERP-specific | HCM model definitions |
| `layer8m-reference-registry-scm.js` | ❌ ERP-specific | SCM model definitions |
| `layer8m-reference-registry-crm.js` | ❌ ERP-specific | CRM model definitions |
| `layer8m-reference-registry-mfg.js` | ❌ ERP-specific | MFG model definitions |
| `layer8m-reference-registry-prj.js` | ❌ ERP-specific | PRJ model definitions |
| `layer8m-reference-registry-sales.js` | ❌ ERP-specific | Sales model definitions |
| `layer8m-reference-registry-ecom.js` | ❌ ERP-specific | E-Commerce model definitions |
| `layer8m-nav-config.js` | ❌ ERP-specific | ERP module navigation |
| `layer8m-nav-config-base.js` | ❌ ERP-specific | ERP module definitions |
| `layer8m-nav-config-icons.js` | ❌ ERP-specific | ERP module icons |
| `layer8m-nav-config-fin-hcm.js` | ❌ ERP-specific | FIN/HCM navigation |
| `layer8m-nav-config-scm-sales.js` | ❌ ERP-specific | SCM/Sales navigation |
| `layer8m-nav-config-prj-other.js` | ❌ ERP-specific | PRJ and other modules |
| `layer8m-nav-crud.js` | ⚠️ Mixed | Generic CRUD with ERP references |
| `layer8m-nav-data.js` | ⚠️ Mixed | Generic data handling with ERP references |
| `layer8m-nav.js` | ⚠️ Mixed | Generic navigation with ERP references |
| All other m/js files | ✅ Generic | No changes needed |

---

## Target State

### New Directory Structure
```
go/erp/ui/web/
├── l8ui/                           # Generic Layer 8 UI Library
│   ├── datepicker/                 # (unchanged)
│   ├── edit_table/                 # (unchanged)
│   ├── font/                       # (unchanged)
│   ├── images/                     # (unchanged)
│   ├── input_formatters/           # (unchanged)
│   ├── login/                      # (unchanged)
│   ├── notification/               # (unchanged)
│   ├── popup/                      # (unchanged)
│   ├── reference_picker/           # (unchanged)
│   ├── register/                   # (unchanged)
│   ├── shared/                     # Generic shared components only
│   ├── m/                          # Generic mobile components only
│   │   ├── js/                     # Generic mobile JS
│   │   └── css/                    # Generic mobile CSS
│   └── GUIDE.md
│
├── erp-ui/                         # NEW: ERP-specific UI components
│   ├── svg-templates.js            # ERP module SVG icons
│   ├── section-configs/            # ERP section configurations
│   └── m/                          # ERP mobile-specific
│       ├── reference-registries/   # ERP model reference registries
│       └── nav-configs/            # ERP navigation configs
│
├── js/                             # Desktop reference registries (already here)
│   ├── reference-registry-hcm.js
│   ├── reference-registry-fin.js
│   └── ...
```

---

## Implementation Plan

### Tier 1: Refactor Generic Components (Low Risk)

#### Task 1.1: Rename CSS Classes in Section Generator
**File:** `l8ui/shared/layer8-section-generator.js`

**Changes:**
- `hcm-section` → `l8-section`
- `hcm-header-frame` → `l8-section-header-frame`
- `hcm-header-bg` → `l8-section-header-bg`
- `hcm-header-content` → `l8-section-header-content`
- `hcm-header-title` → `l8-section-header-title`
- `hcm-icon` → `l8-section-icon`
- `hcm-title` → `l8-section-title`
- `hcm-subtitle` → `l8-section-subtitle`
- `hcm-illustration` → `l8-section-illustration`
- `hcm-module-tabs` → `l8-module-tabs`
- `hcm-module-tab` → `l8-module-tab`
- `hcm-module-content` → `l8-module-content`
- `hcm-subnav` → `l8-subnav`
- `hcm-subnav-item` → `l8-subnav-item`
- `hcm-service-view` → `l8-service-view`
- `hcm-service-content` → `l8-service-content`
- `hcm-table-container` → `l8-table-container`

**Also update:**
- All section HTML files that use these classes
- All CSS files that define these classes

**Estimated effort:** 2-3 hours

#### Task 1.2: Clean Up Comments in Generic Files
**Files:**
- `l8ui/shared/layer8d-module-config-factory.js`
- `l8ui/shared/layer8d-service-registry.js`

**Changes:**
- Remove ERP-specific module names from comments
- Use generic examples like "Module1", "SubModule1" instead of "HCM", "CoreHR"

**Estimated effort:** 30 minutes

---

### Tier 2: Extract ERP-Specific SVG Templates (Medium Risk)

#### Task 2.1: Split SVG Factory
**Current:** `l8ui/shared/layer8-svg-factory.js` (337 lines)

**Split into:**
1. `l8ui/shared/layer8-svg-factory.js` (~100 lines)
   - Keep: `generateGrid()`, `generatePaths()`, `generateAnimatedDots()`, `generate()`
   - Remove: All `ELEMENT_TEMPLATES`
   - Add: `registerTemplate(key, templateFn)` method

2. `erp-ui/erp-svg-templates.js` (~250 lines) - NEW
   - Move all `ELEMENT_TEMPLATES` here
   - Register templates on load: `Layer8SvgFactory.registerTemplate('people', ...)`

**Estimated effort:** 1-2 hours

---

### Tier 3: Move Mobile ERP-Specific Files (Medium Risk)

#### Task 3.1: Create ERP Mobile Directory Structure
```bash
mkdir -p go/erp/ui/web/erp-ui/m/reference-registries
mkdir -p go/erp/ui/web/erp-ui/m/nav-configs
```

#### Task 3.2: Move Reference Registry Files
**Move from:** `l8ui/m/js/layer8m-reference-registry-*.js`
**Move to:** `erp-ui/m/reference-registries/`

Files to move (7 files):
- `layer8m-reference-registry-hcm.js`
- `layer8m-reference-registry-scm.js`
- `layer8m-reference-registry-crm.js`
- `layer8m-reference-registry-mfg.js`
- `layer8m-reference-registry-prj.js`
- `layer8m-reference-registry-sales.js`
- `layer8m-reference-registry-ecom.js`

#### Task 3.3: Move Navigation Config Files
**Move from:** `l8ui/m/js/layer8m-nav-config-*.js`
**Move to:** `erp-ui/m/nav-configs/`

Files to move (6 files):
- `layer8m-nav-config.js`
- `layer8m-nav-config-base.js`
- `layer8m-nav-config-icons.js`
- `layer8m-nav-config-fin-hcm.js`
- `layer8m-nav-config-scm-sales.js`
- `layer8m-nav-config-prj-other.js`

#### Task 3.4: Refactor Mobile Nav Files
**Files:** `layer8m-nav.js`, `layer8m-nav-crud.js`, `layer8m-nav-data.js`

**Changes:**
- Extract ERP-specific logic into callbacks/configuration
- Keep generic navigation logic in l8ui
- Move ERP-specific implementations to erp-ui

**Estimated effort:** 3-4 hours

---

### Tier 4: Update Includes (Required)

#### Task 4.1: Update `m/app.html`
Update script includes to reference new locations:
```html
<!-- Generic Layer 8 Mobile Components -->
<script src="../l8ui/m/js/layer8m-reference-registry.js"></script>
<script src="../l8ui/m/js/layer8m-nav.js"></script>
...

<!-- ERP-Specific Mobile Components -->
<script src="../erp-ui/m/reference-registries/layer8m-reference-registry-hcm.js"></script>
<script src="../erp-ui/m/reference-registries/layer8m-reference-registry-scm.js"></script>
...
<script src="../erp-ui/m/nav-configs/layer8m-nav-config.js"></script>
...
```

#### Task 4.2: Update `app.html`
Update script includes for desktop:
```html
<!-- Generic Layer 8 Components -->
<script src="l8ui/shared/layer8-svg-factory.js"></script>
...

<!-- ERP-Specific Components -->
<script src="erp-ui/erp-svg-templates.js"></script>
...
```

**Estimated effort:** 1 hour

---

## Risk Assessment

| Tier | Risk Level | Mitigation |
|------|------------|------------|
| Tier 1 | Low | CSS class renames are straightforward find/replace |
| Tier 2 | Medium | SVG factory split requires testing all section headers |
| Tier 3 | Medium | Moving files requires careful include path updates |
| Tier 4 | Low | Include updates are mechanical |

**Overall Risk:** MEDIUM

---

## Testing Checklist

### After Tier 1 (CSS Renames)
- [ ] All section headers render correctly
- [ ] Module tabs work on all sections
- [ ] Subnav navigation works
- [ ] No console CSS errors

### After Tier 2 (SVG Split)
- [ ] All 11 section headers show correct icons
- [ ] SVG animations still work
- [ ] No console JS errors

### After Tier 3 (Mobile Moves)
- [ ] Mobile app loads without errors
- [ ] Reference pickers work for all modules
- [ ] Navigation works for all modules
- [ ] CRUD operations work

### After Tier 4 (Include Updates)
- [ ] Desktop app loads without errors
- [ ] Mobile app loads without errors
- [ ] All functionality verified

---

## Success Metrics

1. **`l8ui/` contains only generic components**
   - No references to HCM, FIN, SCM, Sales, CRM, MFG, PRJ, BI, Documents, E-Commerce, Compliance
   - All CSS classes use `l8-*` prefix instead of `hcm-*`

2. **`erp-ui/` contains all ERP-specific components**
   - SVG templates for ERP modules
   - Reference registries for ERP models
   - Navigation configs for ERP modules

3. **Clear separation of concerns**
   - `l8ui/` can be copied to another Layer 8 project without modification
   - `erp-ui/` contains only ERP-specific customizations

---

## Implementation Order

1. **Tier 1.1** - Rename CSS classes (highest impact, lowest risk)
2. **Tier 1.2** - Clean up comments
3. **Tier 2.1** - Split SVG factory
4. **Tier 3.1-3.4** - Move mobile ERP files
5. **Tier 4.1-4.2** - Update includes

---

## Files Summary

### Files to Modify
- `l8ui/shared/layer8-section-generator.js` - Rename CSS classes
- `l8ui/shared/layer8-svg-factory.js` - Remove ERP templates, add registration
- `l8ui/shared/layer8d-module-config-factory.js` - Clean comments
- `l8ui/shared/layer8d-service-registry.js` - Clean comments
- `l8ui/m/js/layer8m-nav.js` - Extract ERP-specific logic
- `l8ui/m/js/layer8m-nav-crud.js` - Extract ERP-specific logic
- `l8ui/m/js/layer8m-nav-data.js` - Extract ERP-specific logic
- `app.html` - Update includes
- `m/app.html` - Update includes
- All section CSS files - Update class names
- All section HTML files - Update class names

### Files to Create
- `erp-ui/erp-svg-templates.js`

### Files to Move
- 7 reference registry files → `erp-ui/m/reference-registries/`
- 6 nav config files → `erp-ui/m/nav-configs/`

---

## Estimated Total Effort

| Tier | Effort |
|------|--------|
| Tier 1 | 2-3 hours |
| Tier 2 | 1-2 hours |
| Tier 3 | 3-4 hours |
| Tier 4 | 1 hour |
| Testing | 2 hours |
| **Total** | **9-12 hours** |
