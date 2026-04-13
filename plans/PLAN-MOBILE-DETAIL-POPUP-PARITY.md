# PLAN: Mobile Detail Popup Content Parity with Desktop

## Problem Statement

Users report repeatedly that mobile detail popups show different content than desktop detail popups across the system — fields are missing, sections differ, late-added fields are not present on mobile, and date-range groups are incomplete.

## Root Cause

Mobile and desktop maintain **two parallel, hand-edited copies** of every module's form/column/enum data files. Both copies were originally derived from the same source but have drifted over time as fields and sections were added on the desktop side and not backported.

- Desktop forms: `go/erp/ui/web/<module>/<submodule>/<submodule>-forms.js` (~75 files) — namespace e.g. `CoreHR.forms.Employee`
- Mobile forms: `go/erp/ui/web/m/js/<module>/<submodule>-forms.js` (~75 files) — namespace e.g. `MobileCoreHR.forms.Employee`
- Same pattern for `*-enums.js` (mobile: 127, desktop: 70 — fragmentation is also asymmetric) and `*-columns.js`

The two pipelines themselves are functionally equivalent:

- **Desktop**: row click → `Layer8DFormsModal.openViewForm(serviceConfig, formDef, data)` → `Layer8DFormsFields.generateFormHtml(formDef, data)` (in `l8ui/shared/layer8d-forms-modal.js` and `l8ui/shared/layer8d-forms-fields.js`)
- **Mobile**: card click → `Layer8MNavCrud.showRecordDetails(serviceConfig, formDef, item)` → `Layer8MForms.renderForm(formDef, freshRecord, true)` (in `l8ui/m/js/layer8m-nav-crud.js` and `l8ui/m/js/layer8m-forms.js`)

Both pipelines accept the same `formDef` shape and `Layer8MFormFields` supports every field type `Layer8DFormsFields` supports (`text`, `textarea`, `select`, `checkbox`, `date`, `datetime`, `money`, `reference`, `period`, `inlineTable`, `file`, `phone`, `ssn`, `currency`, `percentage`, `url`, `rating`, `hours`, `ein`, `routingNumber`, `colorCode`).

**Therefore the gap is purely at the DEFINITION layer, not the rendering layer.** The fix is to eliminate the duplicate definitions and have mobile consume the desktop module data files directly. This is exactly what the global rule "Reuse Existing Module Forms — Never Redefine" prescribes.

## Confirmed Drift Examples (HCM Core HR)

Spot-checked by comparing `web/hcm/core-hr/core-hr-forms.js` against `web/m/js/hcm/core-hr-forms.js`:

| Form | Desktop has | Mobile missing |
|---|---|---|
| `Position` | `...f.dateRange()` after `filledCount` | dateRange dropped, `filledCount` reordered to end |
| `Job` | `f.date('effectiveDate')`, `f.date('endDate')`, `...f.dateRange()` | All three missing |
| `Organization` | `...f.dateRange()` block | Missing |
| `Employee` | 3 sections, ~28 fields | Identical (no drift here — proves the architecture works) |

The Employee form being in sync proves the goal is achievable; the others demonstrate the cost of duplicate maintenance.

## Solution Strategy

**Single source of truth**: delete every mobile `*-forms.js`, `*-columns.js`, and `*-enums.js` data file under `go/erp/ui/web/m/js/<module>/`. Update `m/app.html` to load the desktop data files instead, and update each mobile registry index (`<module>-index.js`) so it registers the desktop namespace (e.g., `CoreHR`) under the mobile registry name (e.g., `MobileHCM`) instead of constructing a separate `MobileCoreHR` namespace.

This works because the desktop data files are plain `(function(){...})()` IIFEs that attach a namespace to `window` (e.g., `window.CoreHR = { enums, columns, forms, primaryKeys, render }`). Loading them from the mobile page registers the same namespace; the mobile registry just points at it.

### Why this is safe

1. `Layer8MModuleRegistry.create(name, modules)` only reads `module.enums`, `module.columns`, `module.forms`, `module.primaryKeys` — exactly the shape the desktop namespaces already expose.
2. Mobile already loads desktop shared utilities (`Layer8DConfig`, `Layer8DUtils`, `Layer8DRenderers`, all four factories) per `mobile-script-loading-order.md`. Loading desktop data files is a small extension of an existing pattern.
3. Mobile-specific column flags (`primary`, `secondary`, `hidden`) are mobile-only metadata. We must preserve them or recreate them inside the desktop column files in a way that desktop ignores. Plan addresses this in Phase 1.
4. Renderers referenced by columns (`Layer8DRenderers.createStatusRenderer`, etc.) are loaded on mobile already per the existing loading order rules.

### What stays mobile-specific (and why)

- `Layer8MNavCrud`, `Layer8MNavData`, `Layer8MNav`, `LAYER8M_NAV_CONFIG` — navigation hierarchy; orthogonal to form content.
- `Layer8MForms`, `Layer8MFormFields*`, `Layer8MEditTable`, `Layer8MPopup`, etc. — rendering layer; consumes the unified definitions.
- `m/js/<module>/<module>-index.js` — still exists, but becomes a thin registration shim.

## Duplication Audit (per `plan-duplication-audit.md`)

**Behavioral lines being eliminated**: Every mobile `*-forms.js`, `*-enums.js`, `*-columns.js` is purely configuration — the same factory calls (`f.section`, `f.text`, `f.reference`, `col.id`, `col.money`, `factory.create(...)`) as the desktop equivalent. Removing them does not require extracting any new abstraction; the abstraction (`Layer8FormFactory`, `Layer8ColumnFactory`, `Layer8EnumFactory`, `Layer8MModuleRegistry`) already exists and is shared.

**Estimated lines deleted**: ~75 forms files × ~150 lines avg ≈ 11,000 lines + similar for columns/enums. The Phase 0 audit will produce exact numbers.

**No new shared component is needed.** Phase 0 of this plan would normally introduce the abstraction; here the abstraction already exists from the original factory work, so Phase 0 is the drift audit only.

---

## Sub-Module Inventory

Modules that need migration (each is a `Mobile<X>` registry today):

| # | Mobile namespace | Desktop namespaces it must point at | Sub-modules |
|---|---|---|---|
| 1 | `MobileHCM` | `CoreHR`, `Payroll`, `Benefits`, `Talent`, `Compensation`, `Time`, `Learning` | hcm/core-hr, hcm/payroll, hcm/benefits, hcm/talent, hcm/compensation, hcm/time, hcm/learning |
| 2 | `MobileFIN` | `GeneralLedger`, `AccountsPayable`, `AccountsReceivable`, `Budgeting`, `CashMgmt`, `FixedAssets`, `TaxMgmt` | fin/* (7 sub-modules) |
| 3 | `MobileSCM` | `Procurement`, `Inventory`, `Warehouse`, `Logistics`, `DemandPlanning`, `SupplyPlanning` | scm/* (6) |
| 4 | `MobileSales` | `SalesOrders`, `SalesCustomers`, `SalesPricing`, `SalesShipping`, `SalesBilling`, `SalesAnalytics` | sales/* (6) |
| 5 | `MobileMFG` | `Production`, `Engineering`, `Planning`, `Quality`, `ShopFloor`, `Costing` | mfg/* (6) |
| 6 | `MobileCRM` | `Opportunities`, `Leads`, `Accounts`, `Marketing`, `Service`, `FieldService` | crm/* (6) |
| 7 | `MobilePrj` | `Planning`, `Resources`, `TimeExpense`, `Billing`, `Analytics` | prj/* (5) |
| 8 | `MobileBI` | `Reporting`, `Dashboards`, `Analytics`, `DataManagement` | bi/* (4) |
| 9 | `MobileDocs` | `Storage`, `Workflow`, `Compliance`, `Integration` | documents/* (4) |
| 10 | `MobileEcom` | `Catalog`, `Orders`, `Customers`, `Promotions` | ecom/* (4) |
| 11 | `MobileComp` | `Regulatory`, `Audit`, `Risk`, `Controls` | comp/* (4) |
| 12 | `MobileAIA` | `Agent` | aia/agent |
| 13 | `MobileLending` | `Loans`, `Payments`, `Products` | lending/* (3) |
| 14 | `MobileSYS` | (system-only forms in `m/js/sys/sys-forms.js`) | special — see Phase 13 |
| 15 | (portals) | `ESS`, `Manager`, `Customer`, `Vendor`, `Partner`, `ProjClient` | one-page portals — Phase 13 |

Total: ~14 module migrations + portals + sys.

---

## Phase 0: Drift Audit, Feature Inventory, and Compatibility Sweep

**Goal**: Produce a written report listing every difference between mobile and desktop module data files, a feature inventory for every desktop form being adopted, a list of mobile-only column metadata that must be preserved, and a reference-registry completeness report.

**Tasks**:

### 0.1 Drift Diff (per `reuse-existing-module-forms.md`)
1. For every `m/js/<module>/<sub>-forms.js`, diff against the corresponding `<module>/<sub>/<sub>-forms.js`. Categorize each difference as:
   - **Drift** (mobile is missing fields/sections present on desktop) — fix by deletion + reuse.
   - **Intentional simplification** (mobile hides a complex inline table or reorders for small screens) — must be flagged so we don't regress UX. If found, propose either: (a) accept the desktop version on mobile, or (b) add a `mobileHidden` / `mobileOnly` flag on the field that both pipelines respect.
   - **Bug fix only on mobile** (rare — mobile fixed something desktop hasn't) — backport to desktop first.
2. Same diff for `*-enums.js` and `*-columns.js`. For columns, list every `primary`, `secondary`, `hidden` flag mobile uses that desktop columns lack.

### 0.2 Feature Inventory (per `platform-conversion-data-flow.md`)
For each module, produce a checklist enumerating **every interactive element of every desktop form** that mobile must support after migration:
- Sections (count and titles)
- Fields per section (count, types, key names — to verify against `js-protobuf-field-names.md`)
- Inline tables (`f.inlineTable` calls — these are the highest-risk content for the popup parity issue)
- Reference pickers (`type: 'reference'` fields and their `lookupModel` values)
- File upload fields (`f.file`)
- Period selectors (`f.period`)
- Money fields (`f.money`)
- Compound fields (anything that renders multiple sub-elements — see `compound-form-field-data-collection.md`)
- Read-only fields (`readOnly: true`)

Each item is "implement" or "defer (reason)". An item missing from this inventory will not be ported — that is the whole point.

### 0.3 Reference Registry Completeness (per `reference-registry-completeness.md`)
Run the verification command from that rule for every desktop form being adopted:
```bash
# Get all lookupModel values used in DESKTOP forms
grep -rh "lookupModel: '" go/erp/ui/web --include="*-forms.js" \
  | grep -v "/m/js/" \
  | sed "s/.*lookupModel: '\\([^']*\\)'.*/\\1/" | sort -u > /tmp/used.txt

# Get all models registered in MOBILE reference registry
grep -rhoE "(simple|coded|batch|batchIdOnly|idOnly|person)\\(['\"][^'\"]+['\"]" \
  go/erp/ui/web/m/js/**/layer8m-reference-registry-*.js \
  | sed "s/.*(['\"]\\([^'\"]*\\)['\"].*/\\1/" | sort -u > /tmp/mobile_registered.txt

# Find missing
comm -23 /tmp/used.txt /tmp/mobile_registered.txt
```
For every model in the diff: register it in the appropriate `erp-ui/m/reference-registries/layer8m-reference-registry-<module>.js` file BEFORE Phase 1 starts. Otherwise, the migrated forms will fail with "Reference input missing required config: <field>".

### 0.4 Pipeline Parity Audit (per `inline-popup-rendering-parity.md`)
One-time read-through of `Layer8MNavCrud.showRecordDetails` and `Layer8MForms.renderForm` to verify the mobile pipeline matches the canonical pipeline checklist from that rule:
- [ ] `generateFormHtml`-equivalent call uses the same `formDef` and `data`
- [ ] Body element has the correct popup-body class for stacked-popup scoping (`stacked-popup-dom-scoping.md`)
- [ ] `setTimeout(50)` (or equivalent) before attaching pickers/formatters
- [ ] Date pickers, input formatters, reference pickers all attach
- [ ] Inline table handlers attach for edit forms
- [ ] Read-only mode disables every input
- [ ] Save handler reads from form context, not stale params
- [ ] Errors surface via `Layer8MUtils.showError` / notification

If the mobile pipeline is missing any step, **fix the pipeline first** (still in Phase 0) before any module migration begins. A missing pipeline step would silently break content even after the data files are unified.

### 0.5 Field Type Coverage (per `date-field-rendering-pipeline.md`, `money-field-type-mapping.md`, `single-display-formatter-rule.md`)
Check `Layer8MFormFields` (in `l8ui/m/js/layer8m-forms-fields*.js`) against `Layer8DFormsFields` for any field type the desktop renders but mobile does not. Specifically verify:
- Mobile read-only path renders `date`, `datetime`, `time`, `money`, `percentage`, `currency`, `phone`, `ssn`, `period`, `reference`, `file`, `inlineTable`, `address`, `contact`, `audit` correctly
- Mobile coerces string-typed protobuf int64 timestamps before formatting (the bug pattern in `date-field-rendering-pipeline.md`)
- Mobile uses a single display formatter for read-only fields (per `single-display-formatter-rule.md`) — if it duplicates display logic across multiple paths, fix that first
- Per the explore agent's audit, mobile already supports all current types — this is a re-confirmation, not new work

### 0.6 Cross-References
List every place a mobile form references a *desktop* renderer or registry by name and verify the desktop file is already loaded by `m/app.html` per `mobile-script-loading-order.md`.

### 0.7 Deliverable
Write findings to `./plans/PLAN-MOBILE-DETAIL-POPUP-PARITY-AUDIT.md` with sections matching 0.1–0.6. Include per-module drift counts, the feature inventory checklists, the reference-registry diff, and the pipeline-parity sign-off.

**Exit criteria**:
- Zero unanswered "is this intentional?" questions in the drift report
- Reference-registry diff is empty (all required `lookupModel`s registered on mobile)
- Pipeline-parity checklist signed off; any missing mobile pipeline step is fixed
- Field type coverage confirmed

---

## Phase 1: Pilot — HCM (Core HR sub-module only)

**Goal**: Prove the pattern on a single sub-module end-to-end before scaling.

**Tasks**:
1. **Preserve mobile column metadata** in the desktop column file:
   - Mobile columns mark which fields go in the card title (`primary`) and subtitle (`secondary`) and which are `hidden` from card body.
   - Add these flags to `web/hcm/core-hr/core-hr-columns.js`. Desktop ignores unknown column properties, so this is non-breaking.
   - If the mobile column file has columns desktop doesn't (rare), add them to the desktop file with appropriate render functions.
   - **After every column file edit, run the `enum-renderer-column-cascade.md` verification**:
     - Every `col.enum(...)` and `col.status(...)` call must have exactly 4 arguments (`key`, `label`, `enumValues`, `renderer`) — a 3-argument call silently drops the renderer.
     - Every `renderer` referenced (e.g., `render.status`, `render.type`) must exist in the corresponding `*-enums.js` file's `Module.render` export.
     - Every `f.select(...)` in the matching forms file must reference an enum that is actually exported from the enums file — otherwise the detail popup crashes with `Cannot convert undefined or null to object` on open (deferred failure).
     - Every column `key` must match a real protobuf JSON field name (per `js-protobuf-field-names.md`) — the cascade bug looks identical to a field-name typo.
   - **Safety note for template literal edits**: Per `template-literal-ternary-edits.md`, when editing any column render function that uses backtick template literals (especially wrapping content in `${cond ? \`...\` : ''}`), the `old_string` must cover both the opening and the closing of the new nesting level so the file parses afterwards. Run `node -c <file>` after any such edit.
   - **Safety note for compound fields**: Per `compound-form-field-data-collection.md`, `money` fields render as two sub-elements (`fieldKey.__currencyId`, `fieldKey.__amount`). Desktop form data collection already handles this; the migration must not accidentally introduce a `form.elements[field.key]` guard that skips them.
2. **Update `web/m/app.html`** to load the desktop HCM Core HR data files BEFORE the mobile registry index, and remove the includes for the mobile duplicates. Per `mobile-script-loading-order.md`, place them after the factory loads and before `m/js/hcm/hcm-index.js`:
   ```html
   <script src="../hcm/core-hr/core-hr-enums.js"></script>
   <script src="../hcm/core-hr/core-hr-columns.js"></script>
   <script src="../hcm/core-hr/core-hr-forms.js"></script>
   ```
   (Path is relative to `web/m/`. Verify path resolution works for the dev server and `run-local.sh` web asset copy.)
3. **Update `web/m/js/hcm/hcm-index.js`** to register the desktop `CoreHR` namespace under `MobileHCM` instead of `MobileCoreHR`:
   ```js
   Layer8MModuleRegistry.create('MobileHCM', {
       'Core HR': window.CoreHR,           // was MobileCoreHR
       'Payroll': window.MobilePayroll,    // unchanged for now
       // ...other sub-modules unchanged for now
   });
   ```
4. **Delete** `web/m/js/hcm/core-hr-forms.js`, `web/m/js/hcm/core-hr-columns.js`, `web/m/js/hcm/core-hr-enums.js`.
5. **Smoke test on mobile**:
   - Open Employee detail → confirm all 3 sections, ~28 fields, all reference picker labels resolve.
   - Open Job, Position, Department, Organization detail → confirm date-range groups now render.
   - Open the table view → confirm card titles/subtitles still render (validates the `primary`/`secondary` migration).
   - Compare side-by-side with desktop in a second browser window.
6. **If anything regresses**, roll back step 4 (revert deletions) and diagnose in step 1/2 — do NOT patch around it in mobile-only code.

**Exit criterion**: HCM Core HR mobile detail popups visually match desktop for at least 3 spot-checked records per service.

---

## Phase 2 — 14: Per-Module Migration

Repeat the Phase 1 procedure for one module at a time, in this order (chosen by data-completeness risk: simplest first, most cross-referenced last):

| Phase | Module | Notes |
|---|---|---|
| 2 | HCM (remaining sub-modules) | Payroll, Benefits, Talent, Compensation, Time, Learning |
| 3 | FIN | 7 sub-modules; high reference-picker usage — verify Money/DateRange parity carefully |
| 4 | SCM | 6 sub-modules; many inline tables (warehouse bins, BOM lines analogs) |
| 5 | Sales | 6 sub-modules; sales orders have nested line items inline tables |
| 6 | MFG | 6 sub-modules; engineering routing/BOM are inline-table heavy |
| 7 | CRM | 6 sub-modules |
| 8 | PRJ | 5 sub-modules |
| 9 | BI | 4 sub-modules |
| 10 | Documents | 4 sub-modules |
| 11 | E-Commerce | 4 sub-modules |
| 12 | Compliance | 4 sub-modules |
| 13 | AIA + Lending | 4 sub-modules total |
| 14 | SYS + Portals (ESS, Manager, Customer, Vendor, Partner, ProjClient) | These have a different file layout — see notes below |

**Per-phase task list (template — same as Phase 1)**:
1. Migrate column metadata (`primary`/`secondary`/`hidden`) into desktop column files.
2. Add desktop data file `<script>` includes to `m/app.html`.
3. Update `m/js/<module>/<module>-index.js` to point at desktop namespaces.
4. Delete duplicate `m/js/<module>/*-forms.js`, `*-columns.js`, `*-enums.js`.
5. Smoke test all services in the module on mobile against desktop.
6. Commit checkpoint per phase so a regression is bisectable to a single module.

**Phase 14 special handling**:
- Portals (`ess`, `mgr`, `customer`, `vendor`, `partner`, `projclient`) have flat single-form files at `web/<portal>/<portal>-forms.js`. Mobile portals reuse these via the existing portal framework. Verify each portal's mobile detail popup still renders correctly after the dependent modules (HCM, FIN, etc.) have been migrated. Per the global rule "reuse-existing-module-forms.md", portals should already be including the source modules' form files — verify and fix any portal that re-defines forms.
- `m/js/sys/sys-forms.js`: SYS module is loaded from `l8ui/sys/`, not `web/`. The l8ui version is canonical for both desktop and mobile. Verify mobile sys popups already use the l8ui forms; if not, update mobile to load `l8ui/sys/security/l8security-forms.js` (already loaded per `desktop-script-loading-order.md` — confirm equivalent in mobile loading order).

---

## Phase 15: Cleanup and Lint

1. Search for any remaining `Mobile<X>` namespace declarations in `m/js/` and confirm they are either deleted or are pure registration shims (no `forms`, `columns`, `enums` declarations).
2. Search `m/app.html` for now-unused `<script>` tags and remove them.
3. Search the codebase for any code that reads `MobileCoreHR.forms.*` (or any other old mobile namespace) directly instead of through the registry — convert to registry lookups.
4. `node -c` syntax check all modified JS files.
5. Verify no file in `web/m/js/<module>/` exceeds 500 lines (per maintainability rule).

---

## Phase 16: End-to-End Verification

For every service in every module, on mobile:

1. Navigate to the section.
2. Verify table loads with cards.
3. Tap a card → detail popup opens.
4. Verify popup content matches desktop popup for the same record (open desktop in a second window for side-by-side comparison).
5. Verify all sections/tabs are present.
6. Verify reference fields resolve to display names (not raw IDs) — covered by `inline-popup-rendering-parity.md`.
7. **Three-path date/datetime rendering check** (per `date-field-rendering-pipeline.md`):
   - Date fields in the popup body show `MM/DD/YYYY`, not raw numbers like `1704067200` and not `NaN`.
   - Date fields inside inline table cells show `MM/DD/YYYY`, not raw numbers.
   - DateTime and time fields render through the same formatter path (no `typeof === 'number'` guard rejecting string-typed protobuf int64 values).
8. **Three-path money rendering check** (per `money-field-type-mapping.md` and `single-display-formatter-rule.md`):
   - Money fields in the popup body show a currency symbol and formatted amount, never `[object Object]`.
   - Money fields inside inline table cells show the same.
   - Read-only money fields delegate to `formatFieldDisplayValue` (single display formatter) — no duplicate inline formatting logic.
9. **Inline table content verification** (per `inline-popup-rendering-parity.md`):
   - Inline tables (`f.inlineTable`) show child rows with all configured columns populated.
   - Column renderers (money, date, enum, reference) produce the same output as in the main table view.
   - No blank cells that were populated on desktop.
10. Verify enum/select fields show labels (not raw integers).
11. **Field-name no-regression sweep** (per `js-protobuf-field-names.md`):
    - Open the browser console during verification and watch for `Reference input missing required config` warnings (missing `lookupModel` registrations) and any `Cannot convert undefined or null to object` errors (missing enum on `f.select`).
    - Confirm no column cell shows `[object Object]`, raw unix timestamps, or unformatted numbers where formatted values are expected.
    - Confirm no card shows data from the wrong item (symptom of an `idField` casing regression — per `js-protobuf-field-names.md`, `idField` must be the JSON name, not the Go field name).
12. **One-time inline-popup pipeline checklist audit** (per `inline-popup-rendering-parity.md`): this is done once in Phase 0.4, but re-confirm at the start of Phase 16 that no later phase accidentally bypassed the canonical pipeline (e.g., replaced `Layer8MNavCrud.showRecordDetails` with a direct `Layer8MPopup.show` call for a module).

**Test matrix**: at least 1 record per service × all services per module × 14 modules + portals. Use the existing mock data so the test set is reproducible.

**Sections to verify** (checklist generated from `LAYER8M_NAV_CONFIG` services):
- [ ] HCM: Employees, Departments, Organizations, Positions, Jobs, Payroll Runs, Payslips, Benefit Plans, Enrollments, Performance Reviews, Goals, Compensation Plans, Timesheets, Leave Requests, Training Courses, Certifications
- [ ] FIN: Accounts, Journal Entries, Vendors, Customers, AP Invoices, AR Invoices, Payments, Budgets, Bank Accounts, Cash Transactions, Fixed Assets, Tax Codes, Tax Returns, Fiscal Years
- [ ] SCM: Items, Warehouses, Inventory Counts, Purchase Orders, Suppliers, Stock Movements, Shipments, Carriers, Demand Forecasts, Supply Plans
- [ ] Sales: Sales Orders, Customers, Price Lists, Quotations, Shipments, Invoices, Sales Reports
- [ ] MFG: Work Orders, BOMs, Routings, Production Plans, Quality Inspections, Shop Floor Logs, Cost Estimates
- [ ] CRM: Opportunities, Leads, Accounts, Campaigns, Cases, Field Service Tickets
- [ ] PRJ: Projects, Tasks, Resources, Timesheets, Expenses, Project Invoices, Project Reports
- [ ] BI: Reports, Dashboards, KPIs, Datasets
- [ ] Documents: Documents, Workflows, Compliance Records, Integrations
- [ ] E-Commerce: Products, Catalogs, Orders, Customers, Promotions
- [ ] Compliance: Regulations, Audits, Risks, Controls
- [ ] AIA: Agent Sessions
- [ ] Lending: Loans, Payments, Products
- [ ] Portals: ESS, Manager, Customer, Vendor, Partner, ProjClient
- [ ] SYS: Health, Modules, Logs, Data Import, Security (Users/Roles/Credentials)

**Exit criterion**: every checkbox above is verified manually with a screenshot diff or signed-off note.

---

## Traceability Matrix

| # | Source finding / gap | Phase |
|---|---|---|
| 1 | Mobile maintains separate `*-forms.js` files that drift from desktop | Phase 0 (audit) → Phases 1–14 (migration) |
| 2 | Mobile maintains separate `*-enums.js` files | Phase 0 → Phases 1–14 |
| 3 | Mobile maintains separate `*-columns.js` files (with `primary`/`secondary`/`hidden` metadata) | Phase 0 → Phase 1 step 1 (migrate metadata into desktop columns) → Phases 2–14 |
| 4 | HCM Position form: missing dateRange | Phase 1 (Core HR pilot) |
| 5 | HCM Job form: missing effectiveDate, endDate, dateRange | Phase 1 |
| 6 | HCM Organization form: missing dateRange | Phase 1 |
| 7 | Possibility that some mobile simplifications are intentional UX | Phase 0 (decision) → if real, propose `mobileHidden` flag and respect in `Layer8MFormFields` |
| 8 | Mobile registries (`MobileHCM`, etc.) currently hold their own form data | Phases 1–14 (repoint at desktop namespaces via `Layer8MModuleRegistry`) |
| 9 | Portals (ESS, Mgr, Customer, etc.) may re-declare forms instead of reusing | Phase 14 (verify per `reuse-existing-module-forms.md`) |
| 10 | SYS module loaded from `l8ui/sys/` — verify mobile uses canonical l8ui sys forms | Phase 14 |
| 11 | `m/app.html` script-include cleanup | Phase 15 |
| 12 | Direct references to old `Mobile<X>.forms.*` namespaces in mobile JS | Phase 15 (search and replace with registry lookups) |
| 13 | Maintainability rule: file size after migration | Phase 15 |
| 14 | End-to-end mobile detail popup parity verification | Phase 16 |
| 15 | Inline tables (per `inline-popup-rendering-parity.md`) — verify mobile renders child rows | Phase 16 step 9 |
| 16 | Reference picker display name resolution on mobile | Phase 16 step 6 |
| 17 | Reference registry completeness — every desktop `lookupModel` must be registered on mobile before migration (per `reference-registry-completeness.md`) | Phase 0.3 |
| 18 | Feature inventory of every desktop form being adopted (sections, fields, inline tables, pickers, file uploads, period, money, compound, readOnly) per `platform-conversion-data-flow.md` | Phase 0.2 |
| 19 | One-time mobile pipeline parity audit against the canonical checklist (per `inline-popup-rendering-parity.md`) | Phase 0.4; re-confirmed in Phase 16 step 12 |
| 20 | Field type coverage re-confirmation for `Layer8MFormFields` (date/datetime/time, money, period, reference, inlineTable, address, contact, audit) | Phase 0.5 |
| 21 | Enum/renderer/column cascade verification after every column file edit (per `enum-renderer-column-cascade.md`) | Phase 1 step 1; repeats in Phases 2–14 |
| 22 | Template literal edit safety on column render functions (per `template-literal-ternary-edits.md`) | Phase 1 step 1; repeats in Phases 2–14 |
| 23 | Compound-field (`money`) data collection not regressed (per `compound-form-field-data-collection.md`) | Phase 1 step 1; repeats in Phases 2–14 |
| 24 | Date/datetime/time three-path rendering check (popup body + inline table cell + read-only form path) per `date-field-rendering-pipeline.md` | Phase 16 step 7 |
| 25 | Money three-path rendering check + single display formatter (per `money-field-type-mapping.md`, `single-display-formatter-rule.md`) | Phase 16 step 8 |
| 26 | Field-name no-regression sweep (no `[object Object]`, no raw timestamps, no wrong-item card data) per `js-protobuf-field-names.md` | Phase 16 step 11 |

---

## Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Path resolution from `m/app.html` to `../<module>/...` differs between dev server and prod (`run-local.sh` copies `web/` into `demo/`) | Phase 1 explicitly tests both. If broken, the fix is to copy the desktop data files into a flatter location or adjust the dev server's static-serve root. Do NOT touch `go/demo/` directly per `demo-directory-sync.md`. |
| Loading desktop data files on mobile pulls in dependencies the mobile page hasn't loaded (e.g., a renderer constructor that lives only in a desktop-only file) | Phase 0 audits all renderer references. Already-loaded mobile shared scripts include `Layer8DRenderers` and the four factories per `mobile-script-loading-order.md`, so most cases are covered. |
| Mobile column `primary`/`secondary` flags might conflict with desktop column rendering | These are unknown properties to desktop column rendering and are ignored. Verify in Phase 1 step 5. |
| A mobile form intentionally omits a complex inline table for screen-size reasons | Phase 0 surfaces this. If real, add a `mobileHidden: true` field flag and teach `Layer8MFormFields` to skip it. Apply only to confirmed cases — do not let "maybe intentional" become an excuse to keep the duplicate file. |
| Multiple browsers / users edit forms simultaneously while migration is in progress | Migrate one module per commit; each phase is independently revertable. |
| Drift in registries' module key names (e.g., `'Core HR'` vs `'CoreHR'`) | Phase 1 confirms; fix in `hcm-index.js` registry call. |

---

## Out of Scope

- Refactoring the mobile rendering pipeline itself (`Layer8MForms`, `Layer8MFormFields`) — already at parity per the explore agent's audit.
- Refactoring the desktop rendering pipeline.
- Changes to navigation hierarchy (`LAYER8M_NAV_CONFIG`).
- New features. This plan only achieves content parity with desktop as it exists today.
- Add/Edit form parity. This plan focuses on the **detail popup (read-only view)** because that is what users complained about. Add/Edit forms automatically benefit from the same change because they consume the same `formDef`. We'll observe Add/Edit on mobile during Phase 16 verification, but a regression there would be addressed in a follow-up plan if needed.

---

## Local Development Setup

No new infrastructure. Existing `go/run-local.sh` rebuilds the demo and serves both desktop and mobile from the same web root, so testing both side-by-side requires only opening two browser tabs (one at the desktop URL, one at `/m/app.html`).

---

## Definition of Done

1. All ~75 mobile `*-forms.js` files deleted (or, for any intentional-simplification cases identified in Phase 0, migrated to a `mobileHidden`-flag pattern with documentation).
2. All ~127 mobile `*-enums.js` and `*-columns.js` files deleted (same caveat).
3. All mobile registry indexes (`m/js/<module>/<module>-index.js`) register desktop namespaces — no mobile namespace declares its own `forms`/`columns`/`enums`.
4. `m/app.html` loads desktop module data files; no mobile-only data file `<script>` tags remain.
5. Phase 16 verification checklist is fully signed off with side-by-side comparison.
6. The user confirms in a follow-up session that the mobile detail popup complaints are resolved.
