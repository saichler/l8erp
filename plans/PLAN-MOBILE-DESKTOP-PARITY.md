# PLAN: Mobile UI Framework Parity with Desktop

## Goal

Close the structural gap between `l8ui/m/` (mobile, ~9,100 LOC) and the desktop stack (`l8ui/shared/` + view dirs + `sys/` + `input_formatters/`, ~27,200 LOC). The remaining gap is real: mobile lacks the factory-based module bootstrap, the input-formatter framework, and the SYS/admin module set. End-user CRUD parity already exists; this plan addresses the framework and admin gaps.

This plan lives in `l8erp` because that is the canonical reference project, but **all source changes happen in `../l8ui/`** (the shared submodule). l8erp is only the harness for verification.

## Non-Goals

- Adding **new** features that don't exist on desktop
- Mobile-specific UX redesigns
- Replacing desktop components with mobile-aware versions
- Touching any consumer project (l8erp, l8bugs, l8id, etc.) beyond the verification phase

## Background: Confirmed Gaps (post-spike)

Verified against the actual `../l8ui/` filesystem during plan authoring:

| Area | Desktop file(s) | Mobile equivalent | Status |
|---|---|---|---|
| Module bootstrap factory | `shared/layer8d-module-factory.js` (102 LOC) | **none** | Real gap |
| Permission filter | `shared/layer8d-permission-filter.js` (221 LOC) | **already integrated** — mobile helpers `canViewService/SubModule/Module/filterServices` exist on the desktop file (lines 168-219) and `layer8m-nav.js` already calls them at lines 168, 218, 289, 374 | **Verification only** |
| Portal switcher | `shared/layer8d-portal-switcher.js` (190 LOC) | **none** | Deferred (low value, mobile portal model differs) |
| Input formatter framework | `input_formatters/` (6 files, 1,947 LOC) | **none** | Real gap |
| SYS — security | `sys/security/` (9 files) | **none** | Real gap |
| SYS — health | `sys/health/` (2 files) | **none** | Real gap |
| SYS — logs | `sys/logs/` (2 files) | **none** | Real gap |
| SYS — modules | `sys/modules/` (4 files) | **none** | Real gap |
| SYS — dataimport | `sys/dataimport/` (5 files) | **none** | Real gap |
| Forms modal | `shared/layer8d-forms-modal.js` | folded into `Layer8MPopup` | Won't fix (intentional) |

What is **already shared** (loaded by mobile per `mobile-script-loading-order.md` — do **not** re-port):
- `layer8-markdown.js`, `layer8-file-upload.js`, `layer8-csv-export.js`
- `layer8-enum-factory.js`, `layer8-ref-factory.js`, `layer8-column-factory.js`, `layer8-form-factory.js`
- `layer8d-config.js`, `layer8d-utils.js`, `layer8d-renderers.js`, `layer8d-reference-registry.js`
- `layer8d-permission-filter.js` (with built-in mobile API surface)
- `layer8d-toggle-tree.js`, `layer8d-module-filter.js`, `layer8d-popup.js` data-only consumers

What mobile **already has** that gives end-user parity:
- All view types: `layer8m-{table,chart,kanban,calendar,timeline,gantt,tree-grid,wizard}.js`
- Forms (5 files): `layer8m-forms{,-fields,-fields-ext,-fields-reference,-inline}.js`
- Reference picker, datepicker, popup, confirm
- Nav (`layer8m-nav.js` 392 LOC + `-nav-data.js` 220 LOC + `-nav-crud.js` 191 LOC) — manually wired, no factory
- `Layer8MModuleRegistry` (102 LOC), `Layer8MViewFactory`, `Layer8MDataSource`

## Spike Findings (Files Read Before Writing the Plan)

Per `report-infra-bugs.md` and `platform-conversion-data-flow.md`, no extraction is proposed without first reading the source. The following files were read end-to-end during planning:

1. **`layer8d-permission-filter.js`** (221 LOC, full read) — Already has `canView()`, `canViewAny()`, plus mobile-facing helpers `canViewService(serviceConfig)`, `filterServices(services)`, `canViewSubModule(moduleKey, subModuleKey)`, `canViewModule(moduleKey)`. Marked in the file header as a *"Generic l8ui component — project-specific model resolution is provided via `registerResolver()`."* Implements the `cascading-hide-zero-children.md` rule correctly.
2. **`layer8m-nav.js`** (392 LOC, grep-verified) — Already calls `Layer8DPermissionFilter.canViewModule/SubModule/Service` at lines 168, 218, 289, 374. The mobile permission filtering pipeline is **already wired**.
3. **`layer8d-module-factory.js`** (102 LOC, full read) — Confirmed simple 6-step orchestrator: register submodules → forms facade → attach navigation → attach CRUD → service-lookup convenience methods → validate namespaces. Mobile equivalent feasible at ~80-120 LOC.
4. **`layer8d-input-formatter.js`** (130 LOC, full read) — Entry point. `attachAll(container)` reads `data-format-*` attributes and calls into core.
5. **`layer8d-input-formatter-core.js`** (457 LOC, full read) — **Heavily DOM-coupled**. `attach(input, type, options)` takes `HTMLInputElement`, calls `addEventListener`, manages `input.dataset.rawValue`, applies CSS classes. Cannot be extracted to shared — it IS the DOM glue. Mobile needs its own equivalent.
6. **`layer8d-input-formatter-utils.js`** (357 LOC, partial read 60 lines) — **Mixed**. Has `WeakMap` of attached `HTMLInputElement` instances and cursor position management (DOM-coupled). Has pure helpers too. Requires surgical split.
7. **`layer8d-input-formatter-masks.js`** (406 LOC, partial read 60 lines) — `applyMask(value, mask, options)` is **pure logic**, no DOM access. Cleanly extractable.
8. **`layer8d-input-formatter-types-validators.js`** (307 LOC, partial read 40 lines) — `Layer8DInputFormatterValidators` with per-type `{ mask, placeholder, format(raw), parse(formatted), validate(raw) }` definitions. All pure functions. Cleanly extractable.

**Net effect on plan scope:**
- Phase 0.1 (permission filter core extraction) was **dropped**. Only a verification step remains.
- Phase 2 (mobile permission filter wrapper) was **dropped**. Only a verification step remains.
- Phase 0.2 (input formatter core extraction) was **scoped down** to the cleanly extractable files (`masks.js`, `types-validators.js`, `types.js` to be verified) plus a surgical split of `utils.js`. `core.js` and the entry point `*.js` stay desktop-only.
- Phase 3 (mobile input formatter) is unchanged in spirit but now consumes the smaller shared core.

## Duplication Audit (per `plan-duplication-audit.md`)

For each remaining gap, classify whether the desktop code is **DOM-agnostic** (extract to shared) or **DOM/platform-specific** (mirror per platform).

| Component | Behavioral split | Extraction strategy |
|---|---|---|
| `layer8d-permission-filter.js` (221 LOC) | Already designed as a generic component with mobile helpers built-in. The desktop file is the shared file. | **No extraction.** Verify mobile nav still calls it correctly. |
| `layer8d-module-factory.js` (102 LOC) | Steps 1 (validate `requiredNamespaces`) and 5 (expose global initializer) are pure logic with zero DOM/platform divergence. Steps 2-4 (module registry wiring, nav attach, CRUD attach) are platform-specific. | **Partial extract.** Phase 0.3 creates `shared/layer8-module-factory-core.js` with `validateNamespaces(list)` + `exposeInitializer(name, fn)` + `resolveNamespace(name)`. Phase 0.3 refactors `Layer8DModuleFactory` to consume it. Phase 1.1 builds `Layer8MModuleFactory` as a thin platform-specific wrapper around the same core. |
| `input_formatters/masks.js` (406 LOC) | Pure logic | **Extract** to `shared/layer8-input-formatter-masks.js` |
| `input_formatters/types-validators.js` (307 LOC) | Pure logic — per-type format/parse/validate functions | **Extract** to `shared/layer8-input-formatter-types-validators.js` |
| `input_formatters/types.js` (290 LOC) | Mixed — to be confirmed in Phase 0.2 spike before move | **Conditional extract** — verify pure-logic portions, leave any DOM bits in desktop |
| `input_formatters/utils.js` (357 LOC) | Mixed — pure helpers + WeakMap of HTMLInputElements + cursor position management | **Surgical split** — pure helpers to `shared/layer8-input-formatter-utils.js`, DOM bits stay in `input_formatters/layer8d-input-formatter-utils.js` |
| `input_formatters/core.js` (457 LOC) | Heavy DOM (`addEventListener`, `input.dataset`, `classList`) | **Mirror** — cannot extract; mobile needs its own ~300 LOC equivalent |
| `input_formatters/layer8d-input-formatter.js` (130 LOC) | DOM entry point with `data-format-*` attribute scanning | **Mirror** — mobile equivalent uses native `inputmode`/`pattern` attributes |
| `sys/security/*-{columns,enums,forms}.js` | Already use shared factories — pure data | **Already shared.** Mobile SYS just needs to consume them via `Layer8MModuleRegistry`. Zero duplication. |
| `sys/security/l8security{,-users-crud,-roles-crud,-credentials-crud}.js` | Three per-entity CRUD files (users, roles, credentials) that are likely near-copies differing only in model/columns/form | **Spike first** (Phase 4.4.0). If desktop three share logic via `Layer8DModuleCRUD`, mobile is a single ~100 LOC wrapper around `Layer8MNavCrud` called 3× with different config. If not, Phase 4.4 extracts a shared CRUD base and refactors the desktop three first, then builds mobile. No blind 3-file mobile mirror. |
| `sys/{health,logs,security,modules,dataimport}` controllers | 5 desktop controllers sharing behavioral patterns: fetch pipeline, auto/manual refresh, error display, empty-state handling | **Spike first** (Phase 4.0.5). Read the 5 entry points and classify behavioral vs. rendering. If the behavioral overlap is >20 LOC across ≥3 controllers, extract a shared `Layer8SysControllerBase` (or reuse an existing shared helper) and refactor the desktop controllers to use it **before** building any mobile mirror. |
| `sys/health/l8health.js` | Health card grid + auto-refresh | **Mirror** as mobile card grid using `Layer8MTable` cards. Consumes the shared base from Phase 4.0.5 if one is extracted. |
| `sys/logs/l8logs.js` | Tree browser + paginated viewer | **Mirror** as mobile drill-down (folder cards → file cards → paginated content). Consumes the shared base from Phase 4.0.5 if one is extracted. |
| `sys/modules/l8sys-modules.js` + dependency graph + map | Toggle tree + dependency graph (SVG) | The toggle tree (`layer8d-toggle-tree.js`) is **already shared** and works on touch. Dependency graph SVG works on touch with viewBox. **Mirror** is thin (~150 LOC controller). |
| `sys/dataimport/l8dataimport*.js` (4 files) | Template CRUD + AI mapping + transfer + execute — 3 distinct workflows, not near-copies | **Mirror** controllers, reuse all backend endpoints, reuse shared form factory. ~400 LOC mobile vs ~1,500 desktop. |
| `layer8d-portal-switcher.js` | Portal selector dropdown | **Defer** — mobile portal model differs and this is low value. |

## Traceability Matrix

Per `plan-traceability-and-verification.md`, every gap from the analysis sections above maps to a specific phase before any phase breakdown is written.

| # | Gap (from Background or Spike Findings) | Phase |
|---|---|---|
| 1 | No `Layer8MModuleFactory` — manual nav wiring | Phase 1.1 |
| 2 | `Layer8MNavData` requires manual edits per module | Phase 1.2 |
| 3 | Mobile permission filter integration not regression-tested | Phase 0.1 (verification) + Phase 6 |
| 4 | No mobile input formatter framework | Phases 0.2, 3.1, 3.2 |
| 5 | `input_formatters/masks.js` extractable but not extracted | Phase 0.2 |
| 6 | `input_formatters/types-validators.js` extractable but not extracted | Phase 0.2 |
| 7 | `input_formatters/types.js` extractability unverified | Phase 0.2 (spike then extract) |
| 8 | `input_formatters/utils.js` mixed DOM/logic — needs surgical split | Phase 0.2 |
| 9 | `input_formatters/core.js` cannot be shared — needs mobile mirror | Phase 3.1 |
| 10 | No mobile SYS scaffold | Phase 4.1 |
| 11 | Source-platform feature inventory of SYS not captured | Phase 4.0 |
| 12 | No mobile health monitor | Phase 4.2 |
| 13 | No mobile logs viewer | Phase 4.3 |
| 14 | No mobile security admin | Phase 4.4 |
| 15 | No mobile module manager | Phase 4.5 |
| 16 | No mobile dataimport | Phase 4.6 |
| 17 | Documentation lags new mobile factory | Phase 5 |
| 18 | HCM mobile baseline must be captured before factory refactor | Phase 1.3 (rollback baseline) |
| 19 | Single-display-formatter rule must be preserved when wiring formatter into mobile fields | Phase 3.2 constraint |
| 20 | `layer8d-portal-switcher.js` no mobile equivalent | **Deferred** — low value, mobile portal model differs |
| 21 | `layer8d-forms-modal.js` no mobile equivalent | **Won't fix** — mobile uses `Layer8MPopup` directly, intentional design |
| 22 | `layer8d-theme-switcher.js` mobile parity | **Deferred** — confirm if mobile already inherits theme via shared `layer8d-theme.css` |
| 23 | Module factory steps 1+5 are pure logic mirrored across desktop/mobile — ~20 LOC duplication | Phase 0.3 (extract `Layer8ModuleFactoryCore` + refactor desktop) |
| 24 | `Layer8MNavData` has 3 parallel lookup methods (`_getServiceColumns/FormDef/TransformData`) that each iterate `_modules` with a different getter — ~15 LOC duplication | Phase 1.2 (collapse into one parameterized `_getServiceProperty`) |
| 25 | 5 SYS controller pairs (health/logs/security/modules/dataimport) likely share fetch/refresh/error patterns that are not yet extracted | Phase 4.0.5 (spike + conditional extract) |
| 26 | 3 SYS security CRUD files (users/roles/credentials) likely near-copies that would bake duplication into mobile if mirrored blindly | Phase 4.4.0 (spike + conditional extract or shared CRUD base) |

## Phase 0: Shared Extraction & Verification (MANDATORY before any mobile work)

Per `plan-duplication-audit.md`, the original pattern source must be refactored to use any new shared abstraction in the same phase, so the abstraction is proven before the second consumer arrives.

### 0.1 Permission filter — verification only
**No code changes.** Spike confirmed `Layer8DPermissionFilter` already exposes `canViewService/SubModule/Module/filterServices` mobile helpers, and `layer8m-nav.js` already calls them at lines 168, 218, 289, 374.

Steps:
1. Run `grep -n "PermissionFilter\|canView" ../l8ui/m/js/layer8m-nav.js` and confirm 4+ call sites are present.
2. Manually click through mobile nav (HCM, FIN, SCM) as a non-admin user to verify modules/sub-modules/services are filtered. If filtering does **not** work, escalate to a separate bug fix outside this plan; do not patch within this plan.
3. Confirm `cascading-hide-zero-children.md` is honored: SYS health/logs/dataimport tabs (which have no sub-nav by design) remain visible.
4. **Output:** a paragraph in the verification phase noting which non-admin user was used and which restricted endpoints were confirmed hidden.

### 0.2 Input formatter — surgical extraction
**Spike first**, then extract. Per `platform-conversion-data-flow.md`, do not propose moves of files that have not been read.

Sub-step 0.2.0 — **Spike** (no code changes):
1. Read the full content of `layer8d-input-formatter-utils.js`, `layer8d-input-formatter-types.js`, and `layer8d-input-formatter-types-validators.js`.
2. For every exported function, classify as **pure logic** (no `document`, no `addEventListener`, no `HTMLElement` parameter, no `dataset`/`classList`/`style` access) or **DOM-coupled**.
3. Document the classification in this plan's spike notes before proceeding.

Sub-step 0.2.1 — **Extract pure logic**:
- Create `../l8ui/shared/layer8-input-formatter-masks.js` (move from `input_formatters/`, re-export under `Layer8InputFormatterMasks` namespace; keep desktop file as a thin re-export shim).
- Create `../l8ui/shared/layer8-input-formatter-types-validators.js` (same pattern).
- Create `../l8ui/shared/layer8-input-formatter-utils.js` containing **only** the pure helpers identified in the spike. The original `input_formatters/layer8d-input-formatter-utils.js` keeps the WeakMap, cursor position helpers, and any other DOM-coupled code.
- Conditionally create `../l8ui/shared/layer8-input-formatter-types.js` if the spike confirms it is pure-logic.

Sub-step 0.2.2 — **Refactor desktop to consume shared**:
- Update `layer8d-input-formatter-core.js` and `layer8d-input-formatter.js` to import from the shared modules.
- Update `desktop-script-loading-order.md` to load the shared files before the desktop-specific files.

Sub-step 0.2.3 — **Desktop regression**:
- Verify currency, SSN, phone, EIN, percentage inputs still mask/validate on the HCM Employee form, FIN AP/AR forms, and SCM forms.
- Run `node -c` on every modified file.

### 0.3 Module factory core — extract pure-logic helpers from `Layer8DModuleFactory`

Per `plan-duplication-audit.md` and the Duplication Audit table above, portions of `layer8d-module-factory.js` are pure logic with zero DOM or platform divergence. Mirroring them verbatim into `Layer8MModuleFactory` would bake in behavioral duplication on the second instance — exactly the anti-pattern the rule exists to prevent. Extract **before** Phase 1 builds the mobile factory, and refactor the desktop factory to consume the shared core in the same sub-phase (so the abstraction is proven by its original consumer before the second arrives).

Sub-step 0.3.0 — **Spike** (no code changes):
1. Read `../l8ui/shared/layer8d-module-factory.js` end-to-end (~102 LOC).
2. For each section, classify as **platform-agnostic pure logic** (candidate for shared core) or **platform-specific** (stays in desktop file and will be mirrored in mobile file).
3. Record the actual classification in a spike note before writing code. If the spike finds fewer than ~15 LOC of extractable behavior, **skip the extraction** and have both factories inline the helpers instead — forcing an abstraction for <15 LOC is worse than duplication.

**Spike note (completed 2026-04-11):** Read the actual file. The plan's original expected classification was wrong and is corrected below. Actual structure:

| Section | Lines | What it does | Classification |
|---|---|---|---|
| Preamble | 23-29 | Resolve `window[ns]`, `console.error` + return if missing | **Pure logic** (~7 LOC) — extract as `resolveNamespace(ns)` |
| Step 1 | 32-34 | `moduleNS.submodules.forEach(sub => Layer8DServiceRegistry.register(ns, sub))` | Platform-specific — stays |
| Step 2 | 37-48 | Build `XxxForms` facade from `Layer8DForms` | Platform-specific — stays |
| Step 3 | 51-56 | `Layer8DModuleNavigation.attach(...)` — `initializerName` passed as option; no separate expose step | Platform-specific — stays |
| Step 4 | 59 | `Layer8DModuleCRUD.attach(...)` | Platform-specific — stays |
| Step 5 | 62-73 | `getServiceColumns/FormDef/DetailsConfig/PrimaryKey` wrappers over `Layer8DServiceRegistry` | Platform-specific — stays |
| Step 6 | 76-93 | Loop `requiredNamespaces`, warn on missing `columns/forms/primaryKeys/enums`, delete `_internal` | **Pure logic** (~18 LOC) — extract as `validateNamespaces(ns, requiredNamespaces, requiredProps)` |

**Corrections to the plan's original assumption:**
- ❌ "Step 1 is `validateNamespaces`" — wrong. Step 1 is service-registry registration (platform-specific). The validate loop is at **Step 6**.
- ❌ "Step 5 is `exposeInitializer`" — wrong. Step 5 is the service-lookup wrappers (platform-specific). There is **no explicit expose-initializer step** — the initializer name is passed as an option into `Layer8DModuleNavigation.attach()` which handles it internally. An `exposeInitializer` helper is **NOT warranted** and is dropped from the extraction.

**Total extractable pure logic: ~25 LOC** (7 preamble + 18 Step 6) — meets the ≥15 LOC threshold, extraction proceeds.

Sub-step 0.3.1 — **Extract** (spike confirmed ≥15 LOC):
- Create `../l8ui/shared/layer8-module-factory-core.js` (generic name, no `d`/`m` prefix — shared by both platforms) exposing exactly two helpers:
  ```js
  Layer8ModuleFactoryCore.resolveNamespace(ns)
    // Returns window[ns]; logs console.error and returns null if missing.
    // Replaces the preamble of layer8d-module-factory.js create().

  Layer8ModuleFactoryCore.validateNamespaces(ns, requiredNamespaces, requiredProps)
    // requiredProps default: ['columns', 'forms', 'primaryKeys', 'enums']
    // For each nsName in requiredNamespaces: warn if window[nsName] missing,
    //   warn if any requiredProps missing, delete subNS._internal.
    // Replaces Step 6 of layer8d-module-factory.js create().
  ```
- File MUST stay under 100 LOC. The whole point is "shared pure helpers."
- **Do NOT** add an `exposeInitializer` helper — the spike confirmed no desktop code uses that pattern.

Sub-step 0.3.2 — **Refactor desktop to consume shared**:
- Update `../l8ui/shared/layer8d-module-factory.js`:
  - Replace preamble (L23-29) with `const moduleNS = Layer8ModuleFactoryCore.resolveNamespace(ns); if (!moduleNS) return;`
  - Replace Step 6 loop (L76-93) with `Layer8ModuleFactoryCore.validateNamespaces(ns, options.requiredNamespaces);`
- Update `desktop-script-loading-order.md` to load `layer8-module-factory-core.js` before `layer8d-module-factory.js`.

Sub-step 0.3.3 — **Desktop regression**:
- Load the l8erp desktop app. Verify every existing module initializes: HCM, FIN, SCM, Sales, MFG, CRM, PRJ, BI, DOC, ECOM, COMP, SYS.
- Click one table in each module to confirm nav/CRUD still work (no initializer regressions).
- Run `node -c` on every modified file.

Sub-step 0.3.4 — **Documented gate for Phase 1.1**:
- Phase 1.1 (`Layer8MModuleFactory`) MUST consume `Layer8ModuleFactoryCore.resolveNamespace()` for its preamble and `Layer8ModuleFactoryCore.validateNamespaces()` for its submodule validation step. It must not re-implement either helper inline. Phase 1.1 is blocked until 0.3 is green (desktop regression clean).

### 0.4 Phase 0 file size check
- All new shared files must be under 500 LOC. Split if needed.

## Phase 1: `Layer8MModuleFactory` (Bootstrap Parity)

Highest leverage — every new mobile module currently requires hand-wiring `Layer8MModuleRegistry.create()`, manual `LAYER8M_NAV_CONFIG.<module>` blocks, and explicit registration in `Layer8MNavData` lookup arrays.

### 1.1 Create `../l8ui/m/js/layer8m-module-factory.js` — consumes `Layer8ModuleFactoryCore`
Mirror `Layer8DModuleFactory.create()` API:
```js
Layer8MModuleFactory.create({
    namespace: 'HCM',
    defaultModule: 'core-hr',
    defaultService: 'employees',
    initializerName: 'initializeMobileHCM',
    requiredNamespaces: ['MobileCoreHR', 'MobilePayroll', 'MobileBenefits']
});
```
Internally (mirror desktop ordering — see `layer8d-module-factory.js` spike note in 0.3.0):
1. **Delegates** to `Layer8ModuleFactoryCore.resolveNamespace(namespace)` for the preamble check — must NOT re-implement the `window[ns]` lookup / error log inline. If null, return.
2. Calls `Layer8MModuleRegistry.create(namespace, submodules)` to produce the mobile registry object. (Platform-specific — stays in this file.)
3. Auto-registers the registry into `Layer8MNavData`'s lookup list via `Layer8MNavData.registerModule(registry)` (new API added in Phase 1.2). This eliminates the manual `_getServiceColumns` / `_getServiceFormDef` / `_getServiceTransformData` patches that `adding-module-mobile.md` Step 3 currently requires.
4. Attaches mobile navigation (`Layer8MNav.attach(...)` or equivalent), passing `initializerName` through. No `exposeInitializer` helper — the initializer is wired via the nav attach path, matching desktop.
5. **Delegates** to `Layer8ModuleFactoryCore.validateNamespaces(namespace, requiredNamespaces)` for the sub-namespace sanity check — must NOT re-implement the `requiredProps` loop inline (Phase 0.3 is the single source of truth).

Keep the file under 150 LOC. The whole point is "thin orchestrator." Any logic that also appears in `Layer8DModuleFactory` must either live in `Layer8ModuleFactoryCore` or be genuinely platform-specific (document which). A code-review check before merging Phase 1.1: `diff` the non-platform-specific sections of the two factory files — any identical blocks are duplication bugs.

### 1.2 Refactor `Layer8MNavData` to read from a registry list — with explicit data-flow trace

Per `platform-conversion-data-flow.md`, document every link in the data flow before writing code:

```
Source (l8erp module init):
  Module data files (MobileCoreHR.columns, .forms, .primaryKeys, .transformData)
        │
        ▼
Layer8MModuleFactory.create({namespace, requiredNamespaces, ...})    [NEW — Phase 1.1]
        │ (validates window[ns] exists for each requiredNamespace)
        ▼
Layer8MModuleRegistry.create(namespace, submodulesObj)                [EXISTING]
        │ (writes window.MobileNS = { getColumns, getFormDef, ... })
        ▼
Layer8MNavData.registerModule(registry)                                [NEW — Phase 1.2]
        │ (appends to Layer8MNavData._modules array)
        ▼
Layer8MNavData._getServiceColumns(modelName)                          [REFACTOR]
Layer8MNavData._getServiceFormDef(modelName)                          [REFACTOR]
Layer8MNavData._getServiceTransformData(modelName)                    [REFACTOR]
        │ (iterate _modules instead of hardcoded [MobileHCM, MobileFIN, ...])
        ▼
Layer8MNav.loadServiceData() / loadServiceCards()                     [EXISTING]
        │
        ▼
Layer8MEditTable / Layer8MForms                                        [EXISTING]
```

**Backwards compatibility:** Keep the existing hardcoded lookup list as the initial value of `_modules` so that existing mobile modules in **other Layer 8 projects** (l8bugs, l8id, l8topology, l8notify, etc.) continue to work without migration. New modules call `registerModule()` via the factory; old modules need no change.

**Collapse parallel lookup methods (duplication fix):** The current `Layer8MNavData` has three nearly-identical methods:
```js
_getServiceColumns(modelName)       { /* iterate _modules, call m.getColumns(modelName) */ }
_getServiceFormDef(modelName)       { /* iterate _modules, call m.getFormDef(modelName) */ }
_getServiceTransformData(modelName) { /* iterate _modules, call m.getTransformData(modelName) */ }
```
Each method is ~5 LOC doing the same loop with a different getter name. While this file is open for refactor, collapse them into one parameterized helper:
```js
_getServiceProperty(modelName, getterName) {
    for (const m of this._modules) {
        if (typeof m[getterName] !== 'function') continue;
        const result = m[getterName](modelName);
        if (result != null) return result;
    }
    return null;
}
// thin wrappers for readability at call sites:
_getServiceColumns(modelName)       { return this._getServiceProperty(modelName, 'getColumns'); }
_getServiceFormDef(modelName)       { return this._getServiceProperty(modelName, 'getFormDef'); }
_getServiceTransformData(modelName) { return this._getServiceProperty(modelName, 'getTransformData'); }
```
The wrappers are kept for call-site readability (grep-ability), but the loop lives in exactly one place. Net ~10 LOC removed, zero behavioral change.

**Data-flow verification step:** After implementing, add a `console.log('[NavData] registered modules:', this._modules.map(m => m.name))` and confirm it includes both the legacy hardcoded entries and the new factory-registered HCM entry. Also confirm that a lookup for a model registered via `registerModule()` returns columns, form def, AND transform data (proving all three wrappers route through the same `_getServiceProperty`).

### 1.3 Refactor one l8erp mobile module to use the factory — with rollback baseline

Pick **HCM** as the proving ground (largest, most representative).

**Before refactor — capture baseline:**
1. Click through every HCM mobile flow that the original test plan exercises:
   - Core HR → Employees: list loads, click row opens detail, edit and save persists
   - Payroll → Payslips: list loads, detail opens
   - Benefits → Plans: list loads
   - Talent → any submodule: list loads
   - Time → any submodule: list loads
2. Record the click-through results in a one-paragraph baseline note (which sub-modules and services were exercised, what loaded, what saved). This is the rollback target.
3. Capture the current `git rev-parse HEAD` of `../l8ui/` so a clean revert is one command.

**Refactor:**
- Replace HCM mobile's `*-index.js` files with a single `Layer8MModuleFactory.create()` call.
- Verify the factory call validates `requiredNamespaces` and auto-registers with `Layer8MNavData`.

**After refactor — re-run baseline:**
- Walk the same click-through list. Every flow must produce the same result.
- If **any** flow regresses, rollback to the captured commit before proceeding to Phase 2.

### 1.4 Update `adding-module-mobile.md`
Replace Steps 1-4 with the new single-call pattern. Step 3 ("Register Module with Nav.js") goes away entirely.

## Phase 2: Mobile Permission Filter — Verification Only

**Spike finding:** No new code is required. `Layer8DPermissionFilter` is already a generic l8ui component (not a desktop-only component) with built-in mobile helpers, and `layer8m-nav.js` already calls them at four places (modules grid line 168, sub-modules grid line 218, services list line 289, submodule cards line 374).

### 2.1 Verify the existing integration works end-to-end on l8erp mobile
- Log in as a non-admin user with restricted role.
- Confirm restricted modules/services are hidden from each mobile nav level.
- Confirm allowed modules still navigate correctly.
- Confirm `cascading-hide-zero-children.md` rule is preserved: System health/logs/dataimport tabs (which have no sub-nav children by design) remain visible.

### 2.2 If bugs are found
Report them per `report-infra-bugs.md` — do **not** patch within this plan. The integration code already exists; if it's broken, that is a separate bug to file against `layer8m-nav.js` or `layer8d-permission-filter.js`.

## Phase 3: Mobile Input Formatter

### 3.1 Create `../l8ui/m/js/layer8m-input-formatter.js`
Mobile equivalent of the desktop `core.js` + `.js` entry point. Imports the shared `masks`, `types-validators`, `types`, and `utils` modules from Phase 0.2.

Mobile-specific behaviors:
- `attach(input, type, opts)` — uses `inputmode`/`pattern` attributes for native mobile keyboards (numeric, decimal, tel, email).
- Uses `addEventListener('input', ...)` and `addEventListener('blur', ...)` like desktop, but does **not** rely on cursor-position management (mobile cursor handling differs across browsers).
- `getValue(input)`, `setValue(input, raw)`, `validate(input)`, `detach(input)`, `attachAll(container)`, `collectValues(container)`.
- Same `data-format-*` attribute scanning as desktop, for parity with the form factory.

Keep the file under 500 LOC. If it grows past 450, split into `layer8m-input-formatter-core.js` + `layer8m-input-formatter.js` mirroring desktop.

### 3.2 Wire into `Layer8MFormFields` — preserving the single-display-formatter rule

Per `single-display-formatter-rule.md`, every field type has its read-only display logic in **one** place. Mobile must not split display formatting across the editable and read-only branches.

Constraint: when wiring `Layer8MInputFormatter.attach()` into `layer8m-forms-fields.js`, the read-only branch must continue to delegate to whatever single mobile display formatter the file already uses (analogous to desktop's `formatFieldDisplayValue`). Do **not** add type-specific `if (field.type === 'currency') displayValue = ...` blocks alongside the editable rendering. If the mobile file does not yet have a single display formatter, this phase **must not** introduce one in two places — instead, add it in one function and have both branches call it.

Replace the inline simplified formatting in `layer8m-forms-fields.js` and `layer8m-forms-fields-ext.js` with delegated calls to `Layer8MInputFormatter.attach()` for: `currency`, `percentage`, `phone`, `ssn`, `ein`, `routingNumber`, `colorCode`, `rating`, `hours`, `email`, `url`. Keep each file under 500 LOC — split if needed.

### 3.3 Verify on l8erp mobile
Open HCM Employee, FIN Vendor, FIN Bank Account forms on mobile. Verify:
- Editable inputs mask correctly while typing
- Validation errors appear on blur for invalid values
- Read-only display values match desktop output exactly
- Form data collected on save matches what desktop produces (currency in cents, percentage as decimal, hours as minutes, etc.)

## Phase 4: Mobile SYS Module

Create `../l8ui/m/sys/` mirroring `../l8ui/sys/`. Each sub-phase is independent and verifiable on its own.

### 4.0 SYS Source-Platform Feature Inventory (per `platform-conversion-data-flow.md` Step 0)

**Before writing any mobile SYS code**, enumerate every interactive element of the desktop SYS controllers. This catches the "table chrome that gets missed" anti-pattern (filters, dropdowns, toggle buttons, bulk actions, refresh, export) that the rule was written to prevent.

For each desktop SYS file, read the file end-to-end and produce a checklist:

**`l8ui/sys/health/l8health.js`:**
- Service status cards (read-only)
- Auto-refresh interval / manual refresh button?
- Drill-down on click? Status detail popup?
- Filter by status / search / module?

**`l8ui/sys/logs/l8logs.js`:**
- Tree browser (folder/file hierarchy)
- File selection → paginated content view (5KB chunks)
- Pagination controls (next/prev/jump)
- Search within file?
- Refresh tree?
- Download/export?

**`l8ui/sys/security/l8security.js` + `-users-crud.js` + `-roles-crud.js` + `-credentials-crud.js`:**
- Sub-tab navigation (users / roles / credentials / events)
- Per-entity table chrome: filters, search, base where clause
- Add / Edit / Delete CRUD flows
- Bulk actions?
- Toggle user state?
- Reset password / reset 2FA?
- Audit log/event view

**`l8ui/sys/modules/l8sys-modules.js` + `-dependency-graph.js` + `-modules-map.js`:**
- Toggle tree (enable/disable modules)
- Save button / dirty state indicator
- Dependency graph (SVG) — pan/zoom/hover/click?
- Module map view — switch between graph and tree?
- Reset to defaults?

**`l8ui/sys/dataimport/l8dataimport.js` + `-templates.js` + `-transfer.js` + `-execute.js`:**
- Inner sub-tabs (templates / transfer / execute)
- Template list with cards: filter, search, sort?
- Template editor: file drop, AI mapping, mapping table, save, delete
- Transfer view: select templates, export to JSON, import from JSON, overwrite checkbox
- Execute view: select template, file picker, run, results display, error list

For each item in each inventory, mark it as **implement** or **defer (reason)**. Any item not in the inventory will not be ported. The inventories live as the first sub-section of each Phase 4.x file plan and must be completed before that sub-phase's code is written.

### 4.0.5 SYS controller duplication spike (blocks Phases 4.2–4.6)

Per `plan-duplication-audit.md`, before mirroring 5 desktop SYS controllers into 5 mobile SYS controllers, audit the 5 desktop entry points for shared behavioral code. If each controller reinvents fetch/refresh/error handling, building 5 mobile counterparts bakes the duplication in on both platforms.

Sub-step 4.0.5.0 — **Spike** (no code changes):
1. Read end-to-end:
   - `../l8ui/sys/health/l8health.js`
   - `../l8ui/sys/logs/l8logs.js`
   - `../l8ui/sys/security/l8security.js`
   - `../l8ui/sys/modules/l8sys-modules.js`
   - `../l8ui/sys/dataimport/l8dataimport.js`
2. For every function in each file, classify as:
   - **Controller-specific** (domain logic, entity-specific rendering) — stays in the controller
   - **Shared behavioral** (fetch from `/0/<endpoint>`, auto/manual refresh, empty state, error display via `Layer8DNotification`, tab switching glue)
3. Tabulate shared functions × controllers. If ≥3 controllers share ≥20 LOC of behavioral code, proceed to 4.0.5.1. Otherwise, record "no extraction warranted" and proceed directly to Phase 4.1.

Sub-step 4.0.5.1 — **Extract shared base** (only if spike warrants):
- Create `../l8ui/sys/l8sys-controller-base.js` exposing a small mixin or helper set (e.g., `fetchAndRender({endpoint, onData, onError})`, `attachRefreshButton(container, fn)`, `renderEmptyState(container, message)`). Keep under 200 LOC.
- Refactor the 3+ desktop controllers that share the behavior to consume the base **in the same sub-phase**, per `plan-duplication-audit.md`'s "refactor original first" rule.
- Run desktop regression: click through SYS → Health, Logs, Security, Modules, Dataimport. Every flow must behave identically.

Sub-step 4.0.5.2 — **Gate for Phases 4.2–4.6**:
- If 4.0.5.1 ran: the mobile SYS controllers in Phases 4.2–4.6 MUST consume the same `l8sys-controller-base.js` (or a mobile thin-wrapper over it if DOM APIs diverge). Phase 4.x sub-phases must not re-invent fetch/refresh/error logic.
- If 4.0.5.1 did NOT run (spike said "no extraction warranted"): document the decision and proceed with per-controller mobile implementations.

### 4.1 SYS scaffold
- `m/sys/l8sys-config-m.js` — module config (registers SYS as a top-level mobile module).
- `m/sys/l8sys-init-m.js` — init via `Layer8MModuleFactory` (depends on Phase 1).
- `m/css/l8sys-m.css` — minimal mobile-specific overrides; reuse `l8sys.css` tokens where possible.

### 4.2 Health (`m/sys/health/l8health-m.js`)
Mobile card list of services with status badges and refresh-on-pull. Backend endpoint `/0/Health` (read-only). ~80 LOC. Implements every item from the Phase 4.0 health inventory.

### 4.3 Logs (`m/sys/logs/l8logs-m.js`)
Drill-down navigation: folder card → file card → paginated text view (5KB chunks). Reuse the same `l8file` L8Query as desktop. ~150 LOC. Implements every item from the Phase 4.0 logs inventory.

### 4.4 Security (`m/sys/security/l8security-m.js` + conditional CRUD files)

#### 4.4.0 Desktop security CRUD duplication spike (blocks 4.4.1)

Per `plan-duplication-audit.md`, before building 3 mobile CRUD files that mirror 3 desktop CRUD files (`l8security-users-crud.js`, `-roles-crud.js`, `-credentials-crud.js`), spike the desktop trio for duplication. If they are near-copies differing only in model/columns/form, the mobile solution is a **single** wrapper called 3× with different config — not 3 copies of the same wrapper.

Sub-step 4.4.0.0 — **Spike** (no code changes):
1. Read `../l8ui/sys/security/l8security-users-crud.js`, `-roles-crud.js`, `-credentials-crud.js` end-to-end.
2. Diff them pairwise. Categorize each line/function as:
   - **Identical logic** (same function, same body except string/model/form references)
   - **Near-identical** (same shape, small divergence)
   - **Genuinely different** (unique to one CRUD)
3. Calculate: `duplicated_LOC = identical_LOC × 2` (since refactoring drops two of the three copies).

Sub-step 4.4.0.1 — **Decision tree**:
- **If `duplicated_LOC > 100`**: extract a shared `l8security-crud-base.js` (desktop) that takes a config `{modelName, serviceEndpoint, columns, formDef, ...}` and implements the CRUD flow once. Refactor the 3 desktop files into ~30-line config-only files calling the base. Then Phase 4.4.1 builds **one** `l8security-crud-m.js` mobile wrapper and Phase 4.4.2 calls it 3× with different configs.
- **If `duplicated_LOC ≤ 100`** but the three files share a consistent shape: skip the desktop extraction, but build Phase 4.4.1 as a single mobile wrapper called 3× anyway (mobile side gets to avoid the duplication even if desktop doesn't).
- **If the three files are genuinely different**: build 3 separate mobile CRUD files as originally planned. Document why in the spike note.

Sub-step 4.4.0.2 — **Desktop regression** (only if 4.4.0.1 refactored desktop):
- Walk SYS → Security → Users: list loads, create, edit, delete work.
- Walk SYS → Security → Roles: same.
- Walk SYS → Security → Credentials: same.

#### 4.4.1 Mobile security controllers (shape determined by 4.4.0)
- Reuse the **already-shared** data files: `l8security-{columns,enums,forms,events-columns,events-enums}.js`. These are pure data (factory output) and load identically on mobile.
- Mobile controllers wrap `Layer8MNavCrud` for users/roles/credentials.
- **File count depends on 4.4.0 outcome**:
  - *Extracted path:* 1 new file `l8security-crud-m.js` (~120 LOC) + 1 controller `l8security-m.js` (~80 LOC) that calls it 3× with user/role/credential configs. Total ~200 LOC.
  - *Non-extracted path:* 3 files `-users-crud-m.js`, `-roles-crud-m.js`, `-credentials-crud-m.js` at ~100 LOC each + 1 controller ~80 LOC. Total ~380 LOC.
- Implements every item from the Phase 4.0 security inventory.
- If the Phase 4.0.5 SYS controller base was extracted, `l8security-m.js` consumes it for tab switching / fetch glue.

### 4.5 Modules (`m/sys/modules/l8sys-modules-m.js`)
- Reuse `Layer8DToggleTree` (already shared, touch-friendly) for the module enable/disable UI.
- Reuse `l8sys-dependency-graph.js` and `l8sys-modules-map.js` — the SVG-based graphs work on touch with viewBox. Verify pinch-zoom is acceptable; if not, add a mobile-specific viewport scaler.
- ~150 LOC mobile controller. Implements every item from the Phase 4.0 modules inventory.

### 4.6 Dataimport (`m/sys/dataimport/l8dataimport-m.js` + `-templates-m.js`, `-transfer-m.js`, `-execute-m.js`)
- Template CRUD: card list + popup form (reuse template form definition).
- AI mapping: same `/erp/0/ImprtAI` endpoint. Mobile UI is simpler — list of suggested mappings with confidence badges.
- Execute: file picker (`<input type="file">`) → run import → results card.
- Transfer (export/import templates): same backend, mobile-friendly file picker.
- ~400 LOC mobile vs ~1,500 LOC desktop. Implements every item from the Phase 4.0 dataimport inventory.

### 4.7 Wire SYS into mobile app shell
Update `m/app.html` script-loading order (Phase 4 additions go after the Phase 1 factory). Add SYS as a top-level entry in `LAYER8M_NAV_CONFIG`.

## Phase 5: Documentation Updates

- `mobile-script-loading-order.md` — add Phase 1, 3, 4 files in correct dependency order.
- `adding-module-mobile.md` — collapse to the new factory pattern (post-Phase 1).
- `architecture-overview.md` — update mobile dependency graph to include `Layer8MModuleFactory`, `Layer8MInputFormatter`, mobile SYS components. (No `Layer8MPermissionFilter` entry — the existing `Layer8DPermissionFilter` is generic and already covers mobile.)
- New rule file: `l8ui-mobile-parity.md` documenting which shared modules exist and the rule that "any new desktop framework component must ship with a mobile equivalent (or be designed as a generic component) in the same PR."

## Phase 6: End-to-End Verification

For each section affected by this plan, on **both** desktop and mobile, in `l8erp`:

### Mobile verification checklist
- [ ] `Layer8MModuleFactory.create()` bootstraps HCM module successfully (Phase 1)
- [ ] All HCM submodules navigable: Core HR, Payroll, Benefits, Talent, Time
- [ ] HCM mobile click-through baseline (Phase 1.3) matches post-refactor behavior
- [ ] Permission filter hides restricted modules for non-admin user (Phase 2 — verification of existing integration)
- [ ] Cascading-hide rule preserved: SYS tabs without children stay visible
- [ ] Currency / SSN / phone / EIN inputs mask correctly on Employee form (Phase 3)
- [ ] Money field on Vendor form rounds-trips correctly through formatter (Phase 3)
- [ ] Read-only display values match desktop exactly (single-display-formatter rule preserved, Phase 3.2)
- [ ] SYS → Health shows live service status (Phase 4.2)
- [ ] SYS → Logs drills folder → file → paginated content (Phase 4.3)
- [ ] SYS → Security: list users, create user, edit role, change credential (Phase 4.4)
- [ ] SYS → Modules: toggle a module, verify it disappears from nav (Phase 4.5)
- [ ] SYS → Dataimport: create template, run AI mapping, execute import (Phase 4.6)
- [ ] Every Phase 4.0 inventory item is either implemented or has a "deferred — {reason}" note

### Desktop regression checklist (Phase 0.2 extractions must not break desktop)
- [ ] HCM Employee, FIN Vendor, SCM Item table pages load and click-through to detail
- [ ] Currency / SSN / phone formatting still works in desktop forms (Phase 0.2 regression)
- [ ] Permission filter still hides restricted sections for non-admin (no Phase 0.1 changes, but verify nothing else broke it)
- [ ] Existing l8erp module init files still work (Phase 1 backwards-compat via `Layer8MNavData` legacy registry list)

### Build verification
- [ ] `cd go && go build ./...` passes
- [ ] All edited JS files pass `node -c <file>`
- [ ] No file exceeds 500 LOC (per `maintainability.md`)

## Risks & Open Questions

1. **Phase 0.2 input formatter extraction** is the highest-risk Phase 0 work — it touches already-shipping desktop code. Mitigated by Phase 6 desktop regression checklist, but the Phase 0.2 PR should be reviewable independently of the mobile PR that consumes it.
2. **`Layer8MNavData.registerModule()` backwards compatibility** — Phase 1.2 must preserve the hardcoded list as a fallback so existing mobile modules in other Layer 8 projects (l8bugs, l8id, l8topology, etc.) keep working until they migrate.
3. **SVG dependency graph on mobile touch** (Phase 4.5) — unverified whether existing pinch-zoom is acceptable. Spike during Phase 4.5; if poor, add a mobile viewport scaler before declaring done.
4. **`l8agent` mobile** — `l8ui/l8agent/m/` exists but is thin per the original gap analysis. Not in scope for this plan; flag as future work if mobile parity becomes a priority.
5. **No test harness exists** for either platform's UI — verification is manual click-through. A future plan could add Playwright/WebDriver coverage for the verification checklist.
6. **Permission filter spike result was a major plan correction** — the original draft proposed a 250 LOC core extraction and 150 LOC mobile wrapper for what is now zero new code. This is documented in the spike findings as a reminder that "files I have not read" propositions should always be spiked first.

## Sequencing & Dependencies

```
Phase 0.1 (perm verification) ─────────────────────────────► Phase 6 (final verification)
Phase 0.2 (formatter extract + desktop refactor) ──────────► Phase 3 (mobile formatter)
Phase 0.3 (module factory core extract + desktop refactor)─► Phase 1.1 (mobile factory consumes core)
Phase 1.1/1.2 (module factory + nav-data refactor) ────────► Phase 1.3 (HCM proving ground)
                                                          └► Phase 4.1 (SYS uses factory)
Phase 4.0 (SYS feature inventory) ─────────────────────────► Phase 4.0.5 (SYS controller spike)
Phase 4.0.5 (optional shared base + desktop refactor) ─────► Phases 4.2-4.6 (mobile consumes base)
Phase 4.4.0 (security CRUD spike + optional desktop refactor)► Phase 4.4.1 (mobile security shape)
Phase 2 (perm verification) ───────────────────────────────► Phase 6
Phase 3, 4 ────────────────────────────────────────────────► Phase 5 (docs)
                                                          └► Phase 6 (verification)
```

**Parallelizable:** Phases 0.1 / 0.2 / 0.3 can run in parallel (they touch disjoint files). Phase 4.0 can run in parallel with Phase 0/1. Phase 4.0.5 starts as soon as Phase 4.0 finishes and can overlap with Phase 1/2/3. Phase 4.4.0 runs after 4.0.5 but before 4.4.1.

**Hard blocks:**
- Phase 1.1 is blocked by Phase 0.3 (mobile factory must consume the shared core, and desktop must already be refactored to consume it first).
- Phase 3 is blocked by Phase 0.2 (mobile formatter consumes shared extracts).
- Phases 4.2–4.6 are blocked by Phase 4.0.5 (mobile controllers must consume any extracted shared base).
- Phase 4.4.1 is blocked by Phase 4.4.0 (mobile security shape depends on spike outcome).
- Phase 5 and Phase 6 are sequential at the end.

## Estimated Scope (for sizing only — not scheduling)

| Phase | Files touched | Net new LOC | Risk |
|---|---|---|---|
| 0.1 | None (verification only) | 0 | None |
| 0.2 | 3-4 new shared, 2 desktop refactor, 1 surgical split | ~1,000 (mostly moved) | Medium (touches shipping desktop) |
| 0.3 | 1 new shared (`layer8-module-factory-core.js`), 1 desktop refactor | ~80 (mostly moved from desktop) | Low (small surface, easy to revert) |
| 0.4 | File size audit only | 0 | None |
| 1 | 1 new mobile factory (consumes 0.3 core), 1 mobile nav-data refactor (lookup methods collapsed), 1 l8erp HCM init refactor | ~220 (10 LOC saved by lookup collapse) | Low |
| 2 | None (verification only) | 0 | None |
| 3 | 1 new mobile file, 2 mobile forms refactors | ~400 | Low |
| 4.0 | 5 inventory checklists added to this plan | 0 (planning work) | None |
| 4.0.5 | Spike; conditionally 1 new shared base + 3-5 desktop refactors | 0-200 (conditional) | Low-Medium (conditional desktop touch) |
| 4.1 | 3 scaffold files | ~150 | Low |
| 4.2-4.3 | 2 mobile controllers (health, logs) | ~230 | Low |
| 4.4 | Spike (4.4.0) + mobile controllers (4.4.1); file count conditional (1 shared wrapper × 3 configs, or 3 separate) | 200-380 (conditional) | Low |
| 4.5-4.6 | 2 mobile controllers (modules, dataimport) | ~550 | Low |
| 4.7 | App shell wiring | ~50 | Low |
| 5 | 4 doc updates, 1 new rule file | ~200 | Low |
| 6 | Verification only | 0 | — |

**Total net new LOC after duplication fixes:** ~3,080–3,460 depending on spike outcomes:
- **Low end (~3,080)** assumes Phase 4.0.5 finds no extractable base and Phase 4.4.0 confirms the three desktop CRUDs are near-duplicates (mobile gets 1 wrapper × 3 configs = ~200 LOC instead of ~380).
- **High end (~3,460)** assumes Phase 4.0.5 extracts a 200-LOC shared base (refactoring desktop adds churn but pays off across 5 mobile controllers) and Phase 4.4.0 finds the three CRUDs are genuinely different (~380 LOC for mobile security).

Net movement vs the previous estimate of ~3,050: the Phase 0.3 core extraction adds ~80 LOC of shared code but removes ~20 LOC of planned mobile duplication; the Phase 1.2 lookup collapse saves ~10 LOC; Phase 4.4 net savings of up to ~180 LOC if the spike warrants it. Overall the total is roughly flat — the point of the duplication fixes is **not** to shrink the plan, but to ensure the resulting codebase has zero behavioral duplication between desktop and mobile.

## Decision Points That Need User Input

1. **Should `m/sys/` live under `l8ui/m/sys/` or under `l8ui/sys/m/`?** Plan currently assumes `l8ui/m/sys/` to keep all mobile code under `m/`. The alternative groups by feature (sys) over platform (m). Confirm before Phase 4.1.
2. **Phase 0.2 extraction as a separate PR from the Phase 3 mobile consumer?** Recommended yes — easier to revert if a regression appears. Confirm.
3. **Defer or include portal-switcher and theme-switcher mobile parity** (matrix items #20, #22)? Plan currently defers both. Confirm.
4. **Are `l8bugs`, `l8id`, `l8topology` etc. expected to migrate to `Layer8MModuleFactory`** after Phase 1, or just l8erp? Plan only refactors l8erp HCM in Phase 1.3 as the proving ground; other consumers continue to work via the backwards-compatible legacy registry list.
