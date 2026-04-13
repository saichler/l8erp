# Plan: Portal Field Rendering Parity with Main App

## Problem Statement

Fields in all six mobile portals (ESS, Manager, Customer, Vendor, Partner, Project Client) render differently from the same fields in the main mobile app. Specifically, reference fields show raw IDs (e.g., "ID: ORG-001") instead of resolved display names (e.g., "Acme Corp").

The root cause is the same across all portals: they load `layer8m-reference-registry-*.js` files (or don't load them at all) without first loading the corresponding `reference-data-*.js` files that create the `window.ReferenceData*` objects those registries depend on.

## Root Cause

In `m/app.html` (the main app), reference data loads in two steps:
1. `reference-data-hcm.js` creates `window.ReferenceDataHcm` with configs for all HCM models (idColumn, displayColumn, displayFormat, etc.)
2. `layer8m-reference-registry-hcm.js` calls `Layer8MReferenceRegistry.register(window.ReferenceDataHcm)` — succeeds

In the portals, step 1 is missing. The registry file calls `register(undefined)`, which silently does nothing. All reference fields then fail:

| Step | Main App | Portal |
|------|----------|--------|
| `buildReferenceInput:32` | `Layer8MReferenceRegistry.get('Organization')` → `{idColumn: 'organizationId', displayColumn: 'name'}` | Returns `undefined` |
| `buildReferenceInput:46-55` | `serializableConfig` fully populated | `idColumn: undefined`, `displayColumn: undefined` |
| `buildReferenceInput:57-58` | Normal display value | Falls back to `"ID: ORG-001"` |
| `initReferencePickers:383` | Config check passes → fetches display name from server | Check fails (`!config.idColumn`) → skips resolution |
| **Result** | "Acme Corp" | "ID: ORG-001" permanently |

## Current State: What Each Portal Loads vs What It Needs

### Reference-Data Files (create `window.ReferenceData*` objects)

| Portal | Currently Loads | Needs |
|--------|----------------|-------|
| ESS | none | hcm, fin |
| Manager | none | hcm, fin |
| Customer | none | hcm, fin, crm, sales, scm |
| Vendor | none | hcm, fin, scm |
| Partner | none | hcm, fin, crm, sales, scm |
| Project Client | none | hcm, fin, crm, prj |
| Main App | all 11 | all 11 (correct) |

### Reference-Registry Files (call `Layer8MReferenceRegistry.register()`)

| Portal | Currently Loads | Needs |
|--------|----------------|-------|
| ESS | hcm | hcm, fin |
| Manager | hcm | hcm, fin |
| Customer | none | hcm, fin, crm, sales, scm |
| Vendor | none | hcm, fin, scm |
| Partner | none | hcm, fin, crm, sales, scm |
| Project Client | none | hcm, fin, crm, prj |
| Main App | all 12 | all 12 (correct) |

### How "Needs" Was Determined

Each portal's form files were audited for `f.reference('field', 'Label', 'LookupModel')` calls. Every unique `lookupModel` value was mapped to the reference-data file that contains its config. For example:
- Employee form references Organization, Department, Position, Job → all in `reference-data-hcm.js`
- Money fields reference Currency → in `reference-data-fin.js`
- Sales order forms reference Customer, SalesTerritory → in `reference-data-fin.js` and `reference-data-sales.js`

## Files to Modify

| # | File | Change |
|---|------|--------|
| 1 | `m/ess.html` | Add 2 reference-data files + 1 reference-registry file |
| 2 | `m/mgr.html` | Add 2 reference-data files + 1 reference-registry file |
| 3 | `m/customer.html` | Add 5 reference-data files + 5 reference-registry files |
| 4 | `m/vendor.html` | Add 3 reference-data files + 3 reference-registry files |
| 5 | `m/partner.html` | Add 5 reference-data files + 5 reference-registry files |
| 6 | `m/projclient.html` | Add 4 reference-data files + 4 reference-registry files |

## Phase 1: ESS and Manager Portals

### Change 1a: `m/ess.html`

Before the `<!-- Mobile Reference Registry -->` comment (line 155), add the reference-data files. Then add the missing registry file after the existing one.

```html
    <!-- Reference Data (must load BEFORE reference registries) -->
    <script src="../js/reference-data/reference-data-hcm.js"></script>
    <script src="../js/reference-data/reference-data-fin.js"></script>
    <!-- Mobile Reference Registry -->
    <script src="../l8ui/m/js/layer8m-reference-registry.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-hcm.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-fin.js"></script>
```

### Change 1b: `m/mgr.html`

Same pattern — add reference-data-hcm.js and reference-data-fin.js before the reference registry section, add layer8m-reference-registry-fin.js after the existing HCM registry.

## Phase 2: Customer Portal

### Change 2: `m/customer.html`

Add before `layer8m-reference-picker.js` (currently line 30 in script order):

```html
    <!-- Reference Data (must load BEFORE reference registries) -->
    <script src="../js/reference-data/reference-data-hcm.js"></script>
    <script src="../js/reference-data/reference-data-fin.js"></script>
    <script src="../js/reference-data/reference-data-crm.js"></script>
    <script src="../js/reference-data/reference-data-sales.js"></script>
    <script src="../js/reference-data/reference-data-scm.js"></script>
    <!-- Reference Registries -->
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-hcm.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-fin.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-crm.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-sales.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-scm.js"></script>
```

## Phase 3: Vendor Portal

### Change 3: `m/vendor.html`

Same insertion point pattern:

```html
    <!-- Reference Data -->
    <script src="../js/reference-data/reference-data-hcm.js"></script>
    <script src="../js/reference-data/reference-data-fin.js"></script>
    <script src="../js/reference-data/reference-data-scm.js"></script>
    <!-- Reference Registries -->
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-hcm.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-fin.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-scm.js"></script>
```

## Phase 4: Partner Portal

### Change 4: `m/partner.html`

```html
    <!-- Reference Data -->
    <script src="../js/reference-data/reference-data-hcm.js"></script>
    <script src="../js/reference-data/reference-data-fin.js"></script>
    <script src="../js/reference-data/reference-data-crm.js"></script>
    <script src="../js/reference-data/reference-data-sales.js"></script>
    <script src="../js/reference-data/reference-data-scm.js"></script>
    <!-- Reference Registries -->
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-hcm.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-fin.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-crm.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-sales.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-scm.js"></script>
```

## Phase 5: Project Client Portal

### Change 5: `m/projclient.html`

```html
    <!-- Reference Data -->
    <script src="../js/reference-data/reference-data-hcm.js"></script>
    <script src="../js/reference-data/reference-data-fin.js"></script>
    <script src="../js/reference-data/reference-data-crm.js"></script>
    <script src="../js/reference-data/reference-data-prj.js"></script>
    <!-- Reference Registries -->
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-hcm.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-fin.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-crm.js"></script>
    <script src="../erp-ui/m/reference-registries/layer8m-reference-registry-prj.js"></script>
```

## Phase 6: End-to-End Verification

For each portal, verify that reference fields now display the same resolved values as the main app:

### ESS Portal
- [ ] My Profile → Employment Info tab → Organization, Department, Position, Job, Manager show display names
- [ ] My Profile → Personal Info tab → Application field resolves
- [ ] Click a row in any service table → detail popup reference fields resolve

### Manager Portal
- [ ] Same checks as ESS for HCM reference fields
- [ ] Direct reports / team member details show resolved names

### Customer Portal
- [ ] Order details → Customer, Sales Territory, Warehouse fields resolve
- [ ] Invoice details → Account, Currency fields resolve
- [ ] Case details → CRM Account, Contact fields resolve

### Vendor Portal
- [ ] Purchase Order details → Vendor, Item, Warehouse fields resolve
- [ ] AP Invoice details → Account, Currency fields resolve

### Partner Portal
- [ ] Opportunity details → CRM Account, Contact fields resolve
- [ ] Sales Order details → Customer, Territory fields resolve
- [ ] Lead details → Lead Source, Account fields resolve

### Project Client Portal
- [ ] Project details → Employee (PM), Department, Account fields resolve
- [ ] Time/Expense details → Project, Resource fields resolve
- [ ] Invoice details → Currency fields resolve

### Regression Check
- [ ] Main app Employee detail popup → still works identically

## Known Gap: ScmCarrier

`ScmCarrier` is used as a `lookupModel` in `scm/warehouse/warehouse-forms.js` (loaded by Customer and Vendor portals) but has no entry in any `reference-data-*.js` file. This affects both the main app and portals. It should be added to `reference-data-scm.js` as a separate fix.

## Traceability Matrix

| # | Gap | Phase |
|---|-----|-------|
| 1 | ESS missing `reference-data-hcm.js` + `reference-data-fin.js` | Phase 1 |
| 2 | ESS missing `layer8m-reference-registry-fin.js` | Phase 1 |
| 3 | Manager missing `reference-data-hcm.js` + `reference-data-fin.js` | Phase 1 |
| 4 | Manager missing `layer8m-reference-registry-fin.js` | Phase 1 |
| 5 | Customer missing all 5 reference-data + 5 registry files | Phase 2 |
| 6 | Vendor missing all 3 reference-data + 3 registry files | Phase 3 |
| 7 | Partner missing all 5 reference-data + 5 registry files | Phase 4 |
| 8 | Project Client missing all 4 reference-data + 4 registry files | Phase 5 |
| 9 | ScmCarrier missing from reference-data-scm.js | Deferred (separate fix, affects main app too) |
| 10 | End-to-end verification across all portals | Phase 6 |
