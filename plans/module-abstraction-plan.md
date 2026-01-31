# Plan: Abstract Duplicate Module Code into Shared Components

## Goal
Eliminate ~2,800 lines of near-identical code across HCM, FIN, and SCM modules by creating 4 shared components. Each module will reduce from 6 boilerplate files to 1 config file + 1 init file, while sub-module data files remain untouched.

## Impact Summary
- **15 files deleted** (5 per module: `*-navigation.js`, `*-service.js`, `*-crud.js`, `*-forms.js`, `*.js`)
- **4 new shared files** created (~560 lines total)
- **3 new init files** created (~30 lines each, ~90 total)
- **3 config files** get one line added (`submodules` array)
- **app.html** updated to reflect new script loading
- **Net reduction**: ~2,200 lines

---

## New Shared Components

### 1. `shared/erp-service-registry.js` (~90 lines)

Generalizes SCM's `findInSubmodules` pattern into a central registry.

**API:**
```js
window.ERPServiceRegistry = {
    register(parentModule, submoduleName)     // e.g., register('HCM', 'CoreHR')
    lookup(parentModule, property, modelName) // generic property lookup
    getColumns(parentModule, modelName)       // returns columns or default fallback
    getFormDef(parentModule, modelName)       // returns form definition
    getDetailsConfig(parentModule, modelName) // returns details config
    getPrimaryKey(parentModule, modelName)    // returns primary key or 'id'
    initializeServiceTable(moduleNS, parentModule, moduleKey, service, tableId)
}
```

**Replaces:** `hcm-service.js` (225 lines), `fin-service.js` (225 lines), `scm-service.js` (97 lines)

### 2. `shared/erp-module-crud.js` (~230 lines)

Extracts the identical CRUD operations, parameterized by module namespace.

**API:**
```js
window.ERPModuleCRUD = {
    attach(moduleNS, parentModule, formsNSName)
    // Attaches to moduleNS: _openAddModal, _openEditModal, _confirmDeleteItem,
    // _deleteItem, _showDetailsModal, _getFieldDisplayValue, _formatFieldLabel,
    // _formatFieldValue
}
```

**Replaces:** `hcm-crud.js` (228 lines), `fin-crud.js` (228 lines), `scm-crud.js` (228 lines)

### 3. `shared/erp-module-navigation.js` (~160 lines)

Extracts navigation logic using the FIN/SCM scoped `sectionEl` pattern (upgrading HCM from global queries).

**API:**
```js
window.ERPModuleNavigation = {
    attach(moduleNS, parentModule, config)
    // config: { defaultModule, defaultService, sectionSelector, initializerName }
    // Attaches to moduleNS: _state, initialize, _setupModuleTabs, switchModule,
    // _setupSubNavigation, _updateSubNavActive, loadServiceView, getServiceInfo,
    // refreshCurrentTable
    // Also sets: window[config.initializerName] = moduleNS.initialize
}
```

**Replaces:** `hcm-navigation.js` (151 lines), `fin-navigation.js` (162 lines), `scm-navigation.js` (162 lines)

### 4. `shared/erp-module-factory.js` (~80 lines)

Orchestrates all shared components and creates the module Forms facade.

**API:**
```js
window.ERPModuleFactory = {
    create(options)
    // options: { namespace, defaultModule, defaultService, sectionSelector,
    //            initializerName, requiredNamespaces }
}
```

**`create` does:**
1. Reads `moduleNS.submodules` and registers each with `ERPServiceRegistry`
2. Creates `window[NS + 'Forms']` facade (delegates all calls to `ERPForms`)
3. Calls `ERPModuleNavigation.attach(...)`
4. Calls `ERPModuleCRUD.attach(...)`
5. Validates required sub-module namespaces (warns if missing)

**Replaces:** `hcm-forms.js` (491 lines), `fin-forms.js` (491 lines), `scm-forms.js` (491 lines), `hcm.js` (48 lines), `fin.js` (56 lines), `scm.js` (56 lines)

---

## Per-Module Changes

### Config files (minor edit: add `submodules` array)

**`hcm-config.js`** — add after `HCM.modules = { ... };`:
```js
HCM.submodules = ['CoreHR', 'Payroll', 'Benefits', 'Time', 'Talent', 'Learning', 'Compensation'];
```

**`fin-config.js`** — add:
```js
FIN.submodules = ['GeneralLedger', 'AccountsPayable', 'AccountsReceivable', 'CashManagement', 'FixedAssets', 'Budgeting', 'TaxManagement'];
```

**`scm-config.js`** — add:
```js
SCM.submodules = ['Procurement', 'Inventory', 'WarehouseManagement', 'Logistics', 'DemandPlanning', 'SupplyPlanning'];
```

### Init files (new, ~30 lines each)

Each module gets a single `*-init.js` that replaces the 5 deleted files:

**`hcm/hcm-init.js`:**
```js
(function() {
    'use strict';
    ERPModuleFactory.create({
        namespace: 'HCM',
        defaultModule: 'core-hr',
        defaultService: 'employees',
        sectionSelector: 'core-hr',
        initializerName: 'initializeHCM',
        requiredNamespaces: ['CoreHR', 'Payroll', 'Benefits', 'Time', 'Talent', 'Learning', 'Compensation']
    });
})();
```

**`fin/fin-init.js`:**
```js
(function() {
    'use strict';
    ERPModuleFactory.create({
        namespace: 'FIN',
        defaultModule: 'general-ledger',
        defaultService: 'accounts',
        sectionSelector: 'general-ledger',
        initializerName: 'initializeFIN',
        requiredNamespaces: ['GeneralLedger', 'AccountsPayable', 'AccountsReceivable', 'CashManagement', 'FixedAssets', 'Budgeting', 'TaxManagement']
    });
})();
```

**`scm/scm-init.js`:**
```js
(function() {
    'use strict';
    ERPModuleFactory.create({
        namespace: 'SCM',
        defaultModule: 'procurement',
        defaultService: 'purchase-requisitions',
        sectionSelector: 'procurement',
        initializerName: 'initializeSCM',
        requiredNamespaces: ['Procurement', 'Inventory', 'WarehouseManagement', 'Logistics', 'DemandPlanning', 'SupplyPlanning']
    });
})();
```

### Files deleted per module
- `*-navigation.js`
- `*-service.js`
- `*-crud.js`
- `*-forms.js`
- `*.js` (entry point)

---

## app.html Script Loading Changes

**Add 4 new shared scripts** after `edit_table/table.js`:
```html
<!-- Shared Module Abstractions -->
<script src="shared/erp-service-registry.js"></script>
<script src="shared/erp-module-crud.js"></script>
<script src="shared/erp-module-navigation.js"></script>
<script src="shared/erp-module-factory.js"></script>
```

**Per module, change from:**
```html
<script src="hcm/hcm-config.js"></script>
<script src="hcm/hcm-navigation.js"></script>      <!-- DELETE -->
<script src="hcm/hcm-service.js"></script>          <!-- DELETE -->
<script src="hcm/hcm-crud.js"></script>             <!-- DELETE -->
<script src="hcm/hcm-forms.js"></script>            <!-- DELETE -->
<!-- ... sub-module files (unchanged) ... -->
<script src="hcm/hcm.js"></script>                  <!-- DELETE -->
```

**To:**
```html
<script src="hcm/hcm-config.js"></script>
<!-- ... sub-module files (unchanged) ... -->
<script src="hcm/hcm-init.js"></script>             <!-- NEW (replaces 5 files) -->
```

Same pattern for FIN and SCM.

---

## Implementation Steps (Safe Incremental Order)

Each step can be tested independently before proceeding.

### Step 1: Create `shared/erp-service-registry.js`
- Implement the registry with `register`, `lookup`, convenience getters, and `initializeServiceTable`
- Add `<script>` tag to `app.html` after `table.js`
- No other files change — existing modules continue working

### Step 2: Create `shared/erp-module-crud.js`
- Implement `ERPModuleCRUD.attach()` with all 8 CRUD functions parameterized by namespace
- Uses lazy resolution for forms namespace (`window[formsNSName]`)
- Add `<script>` tag to `app.html`
- No other files change

### Step 3: Create `shared/erp-module-navigation.js`
- Implement `ERPModuleNavigation.attach()` using FIN/SCM's scoped `sectionEl` pattern
- Add `<script>` tag to `app.html`
- No other files change

### Step 4: Create `shared/erp-module-factory.js`
- Implement `ERPModuleFactory.create()` orchestrating all three components
- Creates the Forms facade namespace
- Registers sub-modules from `moduleNS.submodules`
- Add `<script>` tag to `app.html`
- No other files change

### Step 5: Migrate SCM (lowest risk — already uses the better service lookup pattern)
- Add `SCM.submodules` to `scm-config.js`
- Create `scm/scm-init.js`
- Update `app.html`: remove 5 old SCM scripts, add `scm-init.js` after sub-modules
- Delete: `scm-navigation.js`, `scm-service.js`, `scm-crud.js`, `scm-forms.js`, `scm.js`

### Step 6: Migrate FIN
- Add `FIN.submodules` to `fin-config.js`
- Create `fin/fin-init.js`
- Update `app.html`: remove 5 old FIN scripts, add `fin-init.js` after sub-modules
- Delete: `fin-navigation.js`, `fin-service.js`, `fin-crud.js`, `fin-forms.js`, `fin.js`

### Step 7: Migrate HCM
- Add `HCM.submodules` to `hcm-config.js`
- Create `hcm/hcm-init.js`
- Update `app.html`: remove 5 old HCM scripts, add `hcm-init.js` after sub-modules
- Delete: `hcm-navigation.js`, `hcm-service.js`, `hcm-crud.js`, `hcm-forms.js`, `hcm.js`

---

## Key Files Modified/Created

**New files:**
- `go/erp/ui/web/shared/erp-service-registry.js`
- `go/erp/ui/web/shared/erp-module-crud.js`
- `go/erp/ui/web/shared/erp-module-navigation.js`
- `go/erp/ui/web/shared/erp-module-factory.js`
- `go/erp/ui/web/hcm/hcm-init.js`
- `go/erp/ui/web/fin/fin-init.js`
- `go/erp/ui/web/scm/scm-init.js`

**Modified files:**
- `go/erp/ui/web/hcm/hcm-config.js` (add `submodules` array)
- `go/erp/ui/web/fin/fin-config.js` (add `submodules` array)
- `go/erp/ui/web/scm/scm-config.js` (add `submodules` array)
- `go/erp/ui/web/app.html` (update script tags)

**Deleted files (15 total):**
- `hcm/hcm-navigation.js`, `hcm/hcm-service.js`, `hcm/hcm-crud.js`, `hcm/hcm-forms.js`, `hcm/hcm.js`
- `fin/fin-navigation.js`, `fin/fin-service.js`, `fin/fin-crud.js`, `fin/fin-forms.js`, `fin/fin.js`
- `scm/scm-navigation.js`, `scm/scm-service.js`, `scm/scm-crud.js`, `scm/scm-forms.js`, `scm/scm.js`

**Untouched:** All sub-module files (`*-enums.js`, `*-columns.js`, `*-forms.js`, `*.js`), all shared component files, all CSS files.

---

## Risks and Mitigations

1. **HCM DOM scoping upgrade**: HCM currently uses global `document.querySelectorAll`. After migration, it uses scoped `sectionEl.querySelectorAll` (the FIN/SCM pattern). This is an improvement that prevents cross-module DOM interference. Risk is low since the HTML structure is consistent across modules.

2. **Forms facade timing**: `ERPModuleFactory.create` executes at script load time (after sub-modules are loaded). The `HCMForms`/`FINForms`/`SCMForms` facades are created at this point, which is before any user interaction triggers CRUD operations. No timing issue.

3. **Backward compatibility**: `window.initializeHCM`, `window.initializeFIN`, `window.initializeSCM` continue to exist (set by `ERPModuleNavigation.attach`). `window.HCMForms`, etc. continue to exist (created by `ERPModuleFactory.create`). External references remain valid.

---

## Future Module Onboarding

Adding a new module (e.g., Manufacturing) becomes:

1. Create `mfg/mfg-config.js` with `MFG.modules`, `MFG.submodules`, `MFG.renderStatus`
2. Create sub-module data files (`mfg/production/*-enums.js`, `*-columns.js`, `*-forms.js`, `*.js`)
3. Create `mfg/mfg-init.js` with a single `ERPModuleFactory.create(...)` call (~10 lines)
4. Add `<script>` tags to `app.html`
5. Add entry to `sections.js` initializer map

No need to copy/adapt navigation, service, CRUD, or forms boilerplate code.

---

## Verification

After each module migration:
1. Load the app in browser, navigate to the module section
2. Verify module tabs switch correctly
3. Verify sub-navigation items highlight and load correct service views
4. Verify tables load with correct columns and data
5. Verify Add, Edit, Delete, and Details modals work
6. Verify form validation and save operations
7. Check browser console for any errors or warnings
