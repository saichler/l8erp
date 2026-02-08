# Plan: System Module Settings — Dependency-Aware Enable/Disable

## Overview

Add a **Modules** sub-module to the existing System section that lets administrators:
1. View the system dependency map visually
2. Enable/disable modules, sub-modules, and services (3 levels)
3. Enforce dependency rules: cannot disable an element if an enabled element depends on it; enabling an element auto-enables all its dependencies

---

## Terminology

| Term | Example | Maps To |
|------|---------|---------|
| **Module** | FIN, HCM, SCM, Sales | Top-level ERP section |
| **Sub-module** | Core HR, Payroll, Benefits | Tab within a section |
| **Service** | Employees, Positions, Jobs | Nav item within a tab |

---

## Architecture

### Data Flow

```
                    ┌──────────────────────────┐
                    │   SysModuleConfig (DB)    │
                    │   persisted via service   │
                    └────────────┬─────────────┘
                                 │ GET on app startup
                    ┌────────────▼─────────────┐
                    │  layer8d-module-filter.js │
                    │  (shared runtime filter)  │
                    └────────────┬─────────────┘
                                 │ applies to
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                   ▼
     Sidebar navigation   Section tabs/navs    Mobile navigation
     (hides modules)      (hides sub/services)  (hides modules)
```

### Dependency Graph Encoding

The dependency map from `./plans/system-dependency-map.md` will be encoded as a static JavaScript data structure. The graph has two tiers:

**Tier 1: Cross-module dependencies** (derived from mock phase ordering):
```
FIN → [] (no dependencies — always enabled, cannot be disabled)
HCM → [FIN]
SCM → [FIN, HCM]
Sales → [FIN, HCM, SCM]
MFG → [FIN, HCM, SCM, Sales]
CRM → [FIN, HCM]
PRJ → [FIN, HCM, CRM]
BI → [HCM]
DOC → [HCM]
ECOM → [FIN, HCM, SCM]
COMP → [FIN, HCM]
```

**Tier 2: Intra-module dependencies** (within each module, sub-module → sub-module):
Each module's first sub-module (the "foundation") is required by all other sub-modules in that module. For example in HCM: Core HR is required by Payroll, Benefits, Time, Talent, Learning, Compensation.

**Tier 3: Intra-sub-module dependencies** (service → service):
Minimal — most services within a sub-module are independent. Exceptions will be documented in the dependency data (e.g., Payslips depends on Payroll Runs).

---

## Implementation Steps

### Step 1: Protobuf Type — `SysModuleConfig`

**File**: `proto/sys.proto` (new)

```protobuf
syntax = "proto3";
package sys;
option go_package = "github.com/saichler/l8erp/go/types/sys";

import "l8api.proto";

// Stores which modules/sub-modules/services are disabled.
// By default everything is enabled. Only disabled paths are stored.
message SysModuleConfig {
    string configId = 1;
    // Dot-notation paths of disabled elements:
    //   "bi"                    → entire BI module disabled
    //   "hcm.learning"          → HCM Learning sub-module disabled
    //   "hcm.core-hr.documents" → just the Documents service disabled
    repeated string disabledPaths = 2;
    AuditInfo auditInfo = 3;
}

message SysModuleConfigList {
    repeated SysModuleConfig list = 1;
    l8api.L8MetaData metadata = 2;
}

message AuditInfo {
    string createdBy = 1;
    int64 createdDate = 2;
    string modifiedBy = 3;
    int64 modifiedDate = 4;
}
```

> Uses the "disabled paths" pattern — everything is enabled by default. Only explicitly disabled items are stored. This makes the initial state trivial (empty list = everything enabled) and keeps the data model simple.

### Step 2: Server-Side Service — `SysModuleConfigService`

**Files**:
- `go/erp/sys/modulesconfig/SysModuleConfigService.go`
- `go/erp/sys/modulesconfig/SysModuleConfigServiceCallback.go`

Follow the standard service pattern:
- ServiceName: `ModConfig` (9 chars)
- ServiceArea: `byte(0)` (System area, same as Health)
- PrimaryKey: `ConfigId`
- Auto-generate ID on POST
- Simple validation: ensure `disabledPaths` entries are valid dot-notation strings
- Register in `go/erp/main/erp_main.go` alongside existing system services

### Step 3: Dependency Graph Data — `l8sys-dependency-graph.js`

**File**: `go/erp/ui/web/l8ui/sys/modules/l8sys-dependency-graph.js` (new, ~200 lines)

Encodes the full 3-tier dependency graph as a JavaScript object. This is the **single source of truth** for the UI's enable/disable logic.

```javascript
window.L8SysDependencyGraph = {
    // Module-level dependencies (cross-module)
    modules: {
        financial:     { label: 'Financial Management',  icon: '💰', depends: [] },
        hcm:           { label: 'Human Capital Mgmt',    icon: '👥', depends: ['financial'] },
        scm:           { label: 'Supply Chain Mgmt',     icon: '📦', depends: ['financial', 'hcm'] },
        sales:         { label: 'Sales & Distribution',  icon: '🛒', depends: ['financial', 'hcm', 'scm'] },
        manufacturing: { label: 'Manufacturing',         icon: '🏭', depends: ['financial', 'hcm', 'scm', 'sales'] },
        crm:           { label: 'Customer Relations',    icon: '🤝', depends: ['financial', 'hcm'] },
        projects:      { label: 'Project Management',    icon: '📋', depends: ['financial', 'hcm', 'crm'] },
        bi:            { label: 'Business Intelligence', icon: '📊', depends: ['hcm'] },
        documents:     { label: 'Document Management',   icon: '📄', depends: ['hcm'] },
        ecommerce:     { label: 'E-Commerce',            icon: '🌐', depends: ['financial', 'hcm', 'scm'] },
        compliance:    { label: 'Compliance & Risk',     icon: '⚖️', depends: ['financial', 'hcm'] }
    },

    // Sub-module dependencies (intra-module, first is always foundation)
    subModules: {
        hcm: {
            'core-hr':      { depends: [] },          // Foundation
            'payroll':      { depends: ['core-hr'] },
            'benefits':     { depends: ['core-hr'] },
            'compensation': { depends: ['core-hr'] },
            'time':         { depends: ['core-hr'] },
            'talent':       { depends: ['core-hr'] },
            'learning':     { depends: ['core-hr'] }
        },
        financial: {
            'general-ledger':     { depends: [] },
            'budgeting':          { depends: ['general-ledger'] },
            'accounts-payable':   { depends: ['general-ledger'] },
            'accounts-receivable':{ depends: ['general-ledger'] },
            'cash-management':    { depends: ['general-ledger'] },
            'fixed-assets':       { depends: ['general-ledger'] },
            'tax-management':     { depends: ['general-ledger'] }
        },
        // ... same pattern for all 11 modules
    },

    // Service dependencies (intra-sub-module) — only non-trivial ones
    services: {
        'hcm.core-hr': {
            'employees':    { depends: [] },  // Foundation
            'positions':    { depends: ['departments', 'jobs'] },
            'departments':  { depends: ['organizations'] },
            'jobs':         { depends: ['job-families'] },
            // Independent services have no depends: []
        },
        // ... only sub-modules with non-trivial service deps
    }
};
```

### Step 4: Generic Toggle Tree Component — `layer8d-toggle-tree.js`

**File**: `go/erp/ui/web/l8ui/shared/layer8d-toggle-tree.js` (new, ~250 lines)

A **reusable, generic** tree component with toggle switches and dependency enforcement. This is a shared UI primitive — it knows nothing about ERP modules. Any future feature that needs a hierarchical toggle tree with dependency rules (e.g., permission settings, feature flags) reuses this component.

```javascript
window.Layer8DToggleTree = {
    /**
     * Create a toggle tree inside a container.
     * @param {Object} config
     * @param {HTMLElement} config.container  - DOM element to render into
     * @param {Array} config.nodes           - Hierarchical tree data:
     *   [{ key: 'hcm', label: 'Human Capital Mgmt', icon: '👥',
     *      foundation: false,
     *      children: [
     *        { key: 'core-hr', label: 'Core HR', icon: '👤',
     *          foundation: true,
     *          children: [
     *            { key: 'employees', label: 'Employees', icon: '📋' },
     *            { key: 'positions', label: 'Positions', icon: '📋' },
     *          ]},
     *        { key: 'payroll', label: 'Payroll', icon: '💰', children: [...] }
     *      ]}]
     * @param {Object} config.dependencies   - Dependency graph:
     *   { 'hcm': ['financial'],
     *     'hcm.payroll': ['hcm.core-hr'],
     *     'hcm.core-hr.positions': ['hcm.core-hr.departments', 'hcm.core-hr.jobs'] }
     * @param {Set} config.disabledPaths     - Initial set of disabled dot-paths
     * @param {Function} config.onToggle     - Callback: (path, enabled, allChangedPaths) => {}
     * @param {Object} [config.options]      - Optional overrides:
     *   { collapsedByDefault: true,          - Start collapsed
     *     showFoundationBadge: true,         - Show 🔒 on foundation nodes
     *     confirmAutoEnable: true }          - Show confirmation before auto-enabling deps
     */
    create(config) { ... },

    // --- Internal methods ---

    // Build dot-path from node ancestry
    _buildPath(node, ancestors) { ... },

    // Render a single tree node with toggle switch
    _renderNode(node, depth, parentPath) { ... },

    // Check if a path can be disabled (no enabled dependents)
    _canDisable(path) { ... },

    // Get all paths that must be enabled when enabling `path`
    _getAutoEnablePaths(path) { ... },

    // Get human-readable list of what depends on `path`
    _getDependentLabels(path) { ... },

    // Toggle handler — enforces dependency rules
    _onToggle(path, newState) { ... },

    // Refresh all toggle states (enabled/disabled/locked)
    _refreshStates() { ... }
};
```

**Key design principles:**
- **Data-driven**: Receives tree structure and dependency graph as plain data, no domain knowledge
- **Dot-path convention**: Node keys are joined by dots to form paths (`hcm.core-hr.employees`)
- **Dependency enforcement**: Built into the component — `canDisable()` checks dependents, `onToggle()` auto-enables transitive dependencies
- **Foundation nodes**: Nodes marked `foundation: true` show a lock badge and can only be disabled by disabling their parent
- **Callback-based**: Consumer is notified of changes via `onToggle` callback, keeps component stateless about persistence

#### Toggle Tree CSS — `layer8d-toggle-tree.css`

**File**: `go/erp/ui/web/l8ui/shared/layer8d-toggle-tree.css` (new, ~100 lines)

Generic styles for the toggle tree component:
- Tree indentation (20px per level)
- Collapse/expand chevrons
- Toggle switch (ON/OFF slider, green/gray states)
- Disabled state (grayed out toggle, cursor: not-allowed)
- Foundation badge (🔒 icon)
- Tooltip for "cannot disable" message
- Responsive: larger touch targets (44px) on mobile via media query

### Step 5: Module Filter Runtime — `layer8d-module-filter.js`

**File**: `go/erp/ui/web/l8ui/shared/layer8d-module-filter.js` (new, ~150 lines)

A shared runtime that:
1. Loads `SysModuleConfig` from server on app startup
2. Provides `isEnabled(path)` query function
3. Applies filtering to desktop sidebar, section tabs, and service navs

```javascript
window.Layer8DModuleFilter = {
    _disabledPaths: new Set(),

    // Load config from server
    async load(bearerToken) { ... },

    // Query: is this path enabled?
    isEnabled(path) {
        // Check exact match and ancestor matches
        // "hcm.payroll.payslips" is disabled if "hcm", "hcm.payroll",
        // or "hcm.payroll.payslips" is in _disabledPaths
    },

    // Apply to desktop sidebar — hide disabled module <li> items
    applyToSidebar() { ... },

    // Apply to section tabs — hide disabled sub-module tabs
    applyToSection(sectionKey) { ... },

    // Apply to service nav — hide disabled service nav items
    applyToServiceNav(sectionKey, subModuleKey) { ... }
};
```

### Step 6: Settings UI — Modules Sub-module

#### 6a. Dependency Map Visualization

**File**: `go/erp/ui/web/l8ui/sys/modules/l8sys-modules-map.js` (~200 lines)

Renders a visual dependency map using HTML/CSS (no external library). Shows:
- Module boxes arranged in dependency order (left to right)
- Arrows showing dependency direction
- Color coding: green = enabled, gray = disabled, red outline = has disabled dependencies
- Clicking a module box scrolls to its toggle in the tree below

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│   FIN   │────▶│   HCM   │────▶│   SCM   │──▶ ...
│  ✅ ON  │     │  ✅ ON  │     │  ✅ ON  │
└─────────┘     └─────────┘     └─────────┘
                     │
                     ▼
              ┌─────────────┐
              │  BI  DOC    │
              │  ✅   ✅    │
              └─────────────┘
```

#### 6b. Modules Settings Page — `l8sys-modules.js`

**File**: `go/erp/ui/web/l8ui/sys/modules/l8sys-modules.js` (~120 lines)

Orchestrates the Modules settings page. This is a **thin consumer** of the generic `Layer8DToggleTree` component:

```javascript
window.L8SysModules = {
    initialize() {
        const container = document.getElementById('modules-settings-container');
        if (!container) return;

        // 1. Render dependency map at the top
        L8SysModulesMap.render(container);

        // 2. Build tree data from dependency graph + section configs
        const treeNodes = this._buildTreeNodes();
        const dependencies = this._buildDependencyMap();

        // 3. Create toggle tree using generic component
        const treeContainer = document.createElement('div');
        container.appendChild(treeContainer);

        Layer8DToggleTree.create({
            container: treeContainer,
            nodes: treeNodes,
            dependencies: dependencies,
            disabledPaths: new Set(Layer8DModuleFilter._disabledPaths),
            onToggle: (path, enabled, allChanged) => {
                this._markDirty();
            },
            options: {
                collapsedByDefault: true,
                showFoundationBadge: true,
                confirmAutoEnable: true
            }
        });

        // 4. Render save/cancel buttons
        this._renderActions(container);
    },

    // Build tree nodes from L8SysDependencyGraph + section configs
    _buildTreeNodes() { ... },

    // Build flat dependency map from L8SysDependencyGraph
    _buildDependencyMap() { ... },

    // Save: collect disabled paths, PUT to server
    _save() { ... },

    // Cancel: revert to last saved state
    _cancel() { ... }
};
```

The key insight: `l8sys-modules.js` contains **zero tree rendering or toggle logic**. It only:
1. Transforms `L8SysDependencyGraph` data into the generic `nodes` + `dependencies` format
2. Passes it to `Layer8DToggleTree.create()`
3. Handles save/cancel persistence

#### 6c. Modules Settings Map Styles

**File**: `go/erp/ui/web/l8ui/sys/modules/l8sys-modules.css` (~80 lines)

Styles **only** for the module-specific parts (not the tree — that's in `layer8d-toggle-tree.css`):
- Dependency map visualization (boxes, arrows, status colors)
- Save/cancel action bar
- Unsaved changes indicator

The toggle tree styles live in the shared `layer8d-toggle-tree.css` and are automatically available.

#### 6d. Modules Settings Entry Point

**File**: `go/erp/ui/web/l8ui/sys/modules/l8sys-modules.js` (same as 6b above — single file)

### Step 7: Integrate into System Section

#### 7a. Update `l8sys-config.js`

Add "modules" to the System config:

```javascript
L8Sys.modules = {
    'health':   { label: 'Health',   icon: '💚', services: [] },
    'security': { label: 'Security', icon: '🔒', services: [...] },
    'modules':  { label: 'Modules',  icon: '🧩', services: [] }  // NEW
};
```

#### 7b. Update `sections/system.html`

Add a third tab for "Modules" and its content container. Since system.html still uses the old hardcoded pattern (not the generator), add the tab and content div directly:

```html
<button class="hcm-module-tab" data-module="modules">
    <span class="tab-icon">🧩</span>
    <span class="tab-label">Modules</span>
</button>

<div class="hcm-module-content" data-module="modules">
    <div id="modules-settings-container"></div>
</div>
```

#### 7c. Update `l8sys-init.js`

Hook the Modules tab initialization:

```javascript
var origInit = window.initializeL8Sys;
window.initializeL8Sys = function() {
    if (origInit) origInit();
    if (window.L8Health) L8Health.initialize();
    if (window.L8SysModules) L8SysModules.initialize();
};
```

#### 7d. Update `app.html`

Add script/css includes for the new files. The generic toggle tree component goes with the other shared components; the module-specific files go after existing SYS files, before `l8sys-init.js`:

```html
<!-- Shared Toggle Tree Component (with other shared components) -->
<link rel="stylesheet" href="l8ui/shared/layer8d-toggle-tree.css">
<script src="l8ui/shared/layer8d-toggle-tree.js"></script>
<script src="l8ui/shared/layer8d-module-filter.js"></script>

<!-- SYS Module - Modules Settings (after other SYS files) -->
<link rel="stylesheet" href="l8ui/sys/modules/l8sys-modules.css">
<script src="l8ui/sys/modules/l8sys-dependency-graph.js"></script>
<script src="l8ui/sys/modules/l8sys-modules-map.js"></script>
<script src="l8ui/sys/modules/l8sys-modules.js"></script>
```

### Step 8: Apply Filter on App Startup

#### 8a. Desktop — `app.js`

After loading currency/exchange rate caches, load module config:

```javascript
// Load module configuration
await Layer8DModuleFilter.load(bearerToken);
Layer8DModuleFilter.applyToSidebar();
```

#### 8b. Desktop — `sections.js`

After a section is loaded and initialized, apply sub-module/service filtering:

```javascript
// In loadSection(), after sectionInitializers[sectionName]() call:
if (window.Layer8DModuleFilter) {
    Layer8DModuleFilter.applyToSection(sectionName);
}
```

#### 8c. Mobile — `app-core.js`

Same pattern: load config on startup, filter sidebar items, filter section content after load.

### Step 9: Mobile Parity

#### 9a. Mobile Modules Settings Page

**File**: `go/erp/ui/web/m/sections/system.html` — update to add Modules tab

The mobile version uses the same dependency graph data (`l8sys-dependency-graph.js` is in shared `l8ui/`). The tree UI is simplified for touch:
- Larger toggle switches (44px height for touch targets)
- Accordion-style collapse (tap to expand, not hover)
- No dependency map visualization (too complex for small screens) — just the toggle tree
- Save button at bottom (sticky)

#### 9b. Mobile Module Filter

**File**: `go/erp/ui/web/l8ui/m/js/layer8m-module-filter.js` (new, ~80 lines)

Lighter version of `layer8d-module-filter.js` for mobile:
- Same `isEnabled(path)` logic
- Applies to mobile sidebar items and section content
- Loaded in `app-core.js` on startup

---

## File Summary

### New Files — Shared Generic Components (3)

| File | Purpose | Est. Lines |
|------|---------|-----------|
| `l8ui/shared/layer8d-toggle-tree.js` | **Generic** collapsible toggle tree with dependency enforcement | ~250 |
| `l8ui/shared/layer8d-toggle-tree.css` | Generic toggle tree styles (responsive) | ~100 |
| `l8ui/shared/layer8d-module-filter.js` | Desktop filter runtime (isEnabled + apply) | ~150 |

These are domain-agnostic shared primitives. `Layer8DToggleTree` can be reused for any future feature needing a hierarchical toggle with dependency rules (e.g., permission trees, feature flags, role-based access).

### New Files — Module-Specific (8)

| File | Purpose | Est. Lines |
|------|---------|-----------|
| `proto/sys.proto` | SysModuleConfig protobuf | ~25 |
| `go/erp/sys/modulesconfig/SysModuleConfigService.go` | Service definition | ~35 |
| `go/erp/sys/modulesconfig/SysModuleConfigServiceCallback.go` | Validation callback | ~40 |
| `l8ui/sys/modules/l8sys-dependency-graph.js` | ERP dependency data (3-tier graph) | ~200 |
| `l8ui/sys/modules/l8sys-modules-map.js` | Visual dependency map component | ~200 |
| `l8ui/sys/modules/l8sys-modules.js` | Modules page orchestrator (thin consumer of toggle tree) | ~120 |
| `l8ui/sys/modules/l8sys-modules.css` | Map + action bar styles (tree styles are shared) | ~80 |
| `l8ui/m/js/layer8m-module-filter.js` | Mobile filter runtime | ~80 |

### Generated Files

| File | Purpose |
|------|---------|
| `go/types/sys/*.pb.go` | Generated protobuf bindings (auto) |

### Modified Files (11)

| File | Change |
|------|--------|
| `proto/make-bindings.sh` | Add sys.proto |
| `go/erp/main/erp_main.go` | Register SysModuleConfig service, register type |
| `go/erp/ui/web/l8ui/sys/l8sys-config.js` | Add "modules" sub-module |
| `go/erp/ui/web/sections/system.html` | Add Modules tab + container |
| `go/erp/ui/web/l8ui/sys/l8sys-init.js` | Hook Modules initialization |
| `go/erp/ui/web/app.html` | Add shared + module script/css includes |
| `go/erp/ui/web/js/app.js` | Load module filter on startup |
| `go/erp/ui/web/js/sections.js` | Apply filter after section load |
| `go/erp/ui/web/m/js/app-core.js` | Load module filter on mobile startup |
| `go/erp/ui/web/m/app.html` | Add mobile script includes |
| `go/erp/ui/web/m/sections/system.html` | Add Modules tab on mobile |

---

## Dependency Rule Engine (Detail)

### `canDisable(path)` Algorithm

```
1. Find all other enabled paths in the system
2. For each enabled path P:
   a. Get P's dependency chain (direct + transitive)
   b. If `path` is in P's dependency chain → return false (cannot disable)
3. Return true (safe to disable)
```

### `getAutoEnablePaths(path)` Algorithm

```
1. Collect direct dependencies of `path`
2. For each dependency D:
   a. If D is already enabled → skip
   b. Add D to result set
   c. Recursively add D's dependencies
3. Also enable all ancestor paths:
   - If enabling "hcm.payroll.payslips", also enable "hcm.payroll" and "hcm"
4. Return deduplicated result set
```

### `disabling a parent` Cascade

When a module is disabled, ALL its sub-modules and services are implicitly disabled (ancestor check in `isEnabled`). No need to store each sub-path — disabling "bi" covers "bi.reporting", "bi.reporting.reports", etc.

### `enabling a child` Cascade

Enabling "hcm.payroll" must:
1. Enable "hcm" (parent module)
2. Enable "hcm.core-hr" (intra-module dependency)
3. Enable "financial" (cross-module dependency of HCM)

---

## UX Details

### Save Workflow

1. User toggles switches in the tree
2. Changes are tracked locally (not saved yet)
3. "Save" button at bottom becomes active when there are unsaved changes
4. On save: PUT to `/erp/0/ModConfig` with the updated disabled paths
5. Show confirmation: "Module settings saved. Changes will take effect on next page reload."
6. Offer "Reload Now" button

### Disabled Toggle Tooltip

When a toggle cannot be disabled (because something depends on it), hovering/tapping shows:
> "Cannot disable: Sales, MFG, CRM, PRJ, BI, DOC, ECOM, COMP depend on this module"

### Auto-Enable Confirmation

When enabling a module that has disabled dependencies:
> "Enabling Manufacturing will also enable: Financial, HCM, SCM, Sales. Continue?"
> [Cancel] [Enable All]

### Foundation Badge

Sub-modules that are the foundation of their parent module show a 🔒 badge. They cannot be individually disabled — only disabling the entire parent module disables them.

---

## Startup Failure Behavior

The module config is a **hard dependency** for the app to function. If it cannot be loaded, the user must not see a partially configured UI.

### Behavior on Config Load Failure

When `Layer8DModuleFilter.load()` fails (server not ready, network error, 503, timeout):

1. **Do NOT show the app UI** — everything stays hidden
2. **Show a blocking modal popup**:
   > "System is still booting, please try again in a few seconds."
   > [OK]
3. **On OK → logout** — redirect to login page via `Layer8DAuth.logout()` (desktop) or `Layer8MAuth.logout()` (mobile)

This applies to all failure scenarios:
- Server still starting up (503 / connection refused)
- `ModConfig` service not yet registered
- Network timeout
- First-ever startup where no config record exists yet

### First Startup (No Config Record)

On first startup, there is no `SysModuleConfig` record in the database. The server should return an empty list (not an error). The filter treats an empty response as "nothing disabled" — everything is enabled. This is the **only** empty response that is valid. Any HTTP error status (4xx, 5xx) or network failure triggers the boot popup + logout flow.

### Implementation in `Layer8DModuleFilter.load()`

```javascript
async load(bearerToken) {
    try {
        const resp = await fetch('/erp/0/ModConfig?body=...', {
            headers: { 'Authorization': 'Bearer ' + bearerToken }
        });
        if (!resp.ok) throw new Error('Server returned ' + resp.status);
        const data = await resp.json();
        // Empty list = first startup, everything enabled
        if (data.list && data.list.length > 0) {
            this._disabledPaths = new Set(data.list[0].disabledPaths || []);
        }
        return true;
    } catch (e) {
        // Show blocking popup, then logout
        alert('System is still booting, please try again in a few seconds.');
        Layer8DAuth.logout();
        return false;
    }
}
```

### Desktop `app.js` Integration

```javascript
// Load module configuration — blocks app if server not ready
const configLoaded = await Layer8DModuleFilter.load(bearerToken);
if (!configLoaded) return;  // logout already triggered, stop init

Layer8DModuleFilter.applyToSidebar();
// ... continue normal app initialization
```

Same pattern in mobile `app-core.js`.

---

## Implementation Order

1. **Proto + Server** (Steps 1-2): Create proto, generate bindings, create service, register
2. **Dependency Graph Data** (Step 3): Encode full 3-tier dependency graph in JS
3. **Generic Toggle Tree** (Step 4): Build shared `Layer8DToggleTree` component + CSS
4. **Filter Runtime** (Step 5): Build `Layer8DModuleFilter` with `isEnabled()` + sidebar/section filtering
5. **Settings UI** (Step 6): Build map visualization + thin consumer wiring tree to dependency data
6. **System Section Integration** (Step 7): Wire into System section (config, HTML, init, app.html)
7. **App Startup Integration** (Step 8): Load and apply on startup (desktop + mobile)
8. **Mobile Parity** (Step 9): Mobile filter + mobile settings UI (reuses shared toggle tree)

---

## Testing Checklist

- [ ] Disabling a leaf module (BI) hides it from sidebar
- [ ] Disabling a module with dependents (HCM) is blocked with tooltip
- [ ] Enabling MFG auto-enables FIN, HCM, SCM, Sales
- [ ] Disabling a sub-module hides its tab but keeps module visible
- [ ] Disabling a service hides its nav item but keeps sub-module visible
- [ ] Foundation sub-modules show lock icon and cannot be individually disabled
- [ ] Settings persist across page reloads (server round-trip)
- [ ] Mobile sidebar reflects disabled modules
- [ ] Empty state: no modules disabled → everything visible (default)
- [ ] Dependency map visualization matches `system-dependency-map.md`
- [ ] `Layer8DToggleTree` is reusable: can render any tree data, not coupled to ERP modules
- [ ] `l8sys-modules.js` contains zero tree rendering logic — only data transformation + persistence
- [ ] Server not ready → popup "System is still booting..." → OK → logout
- [ ] First startup (no config record) → empty response → everything enabled
- [ ] Network error during load → same boot popup → logout
