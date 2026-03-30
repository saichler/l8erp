# Plan: Role-Based Permission Navigation Filtering

## Goal
Hide navigation entries (sidebar modules, sub-module tabs, service items) when the logged-in user lacks GET (action code 5) access to ALL models within that navigation scope. This is a **generic l8ui component** usable by any Layer 8 project — not ERP-specific.

---

## Current State

### What exists
1. **Backend** `/permissions` endpoint returns `{ "ModelName": [1,2,4,5], ... }` — per-type allowed action codes
2. **`window.Layer8DPermissions`** loaded at app startup (desktop `app.js` + mobile `app-core.js`)
3. **CRUD button filtering** in `layer8d-service-registry.js` lines 89-99 — hides Add/Edit/Delete buttons per-type using action codes 1/2/4
4. **Module enable/disable** in `layer8d-module-filter.js` — path-based filtering from `SysModuleConfig.disabledPaths`

### What's missing
- **No GET (action 5) check on navigation** — users see all sidebar modules, all tabs, and all service items even if they can't read any of the data
- **No cascading hide** — if all services in a sub-module are hidden, the sub-module tab should also be hidden; if all sub-modules hidden, the sidebar module should be hidden

### Permission semantics
- **Empty `Layer8DPermissions` (`{}`)** = permissive mode — show everything (no security configured)
- **Non-empty but model absent** = no permissions for that model — hide it (deny by default)
- **Model present with action 5** = user can GET — show it
- **Model present without action 5** = user cannot GET — hide it

---

## Data Flow Analysis

### Where model names are available

| Layer | Desktop | Mobile |
|-------|---------|--------|
| **Module config** (service definitions) | `moduleNS.modules[key].services[].model` | `LAYER8M_NAV_CONFIG[moduleKey].services[subModuleKey][].model` |
| **Section config** (nav structure) | `Layer8SectionConfigs._configs[key].modules[].services[]` — **NO model** (only key, label, icon) | N/A |
| **DOM elements** | `.l8-subnav-item[data-service]` — has `data-service` key, **NO data-model** | Rendered dynamically, not in DOM at filter time |

### Key observation
Desktop section configs and DOM elements do **not** carry model names. The model lives in the module config (`*-config.js`), which is loaded into `window.Sales.modules`, `window.FIN.modules`, etc. To filter desktop nav items by permission, we need to bridge from the section config's service keys to the module config's service models.

### Bridge strategy
The module config is the single source of truth for `service.key → service.model` mapping. The filter component will accept a function or config that resolves models for a given section/module/service path. Each project provides this resolver because the namespace structure is project-specific.

---

## Design

### New component: `Layer8DPermissionFilter` (in l8ui/shared/)

A **standalone permission filter** that works alongside `Layer8DModuleFilter`. Both are consulted independently — an item must pass BOTH to be visible (module enabled AND user has GET permission).

```javascript
window.Layer8DPermissionFilter = {
    // Check if user has GET access to a specific model
    canView(modelName) → boolean,

    // Check if user has GET access to ANY model in a list
    canViewAny(modelNames) → boolean,

    // Register a model resolver for a section
    // resolver: (sectionKey, moduleKey, serviceKey) → modelName | null
    registerResolver(resolver),

    // Apply permission filter to desktop sidebar
    // moduleModels: { sectionKey: [modelName, ...] } — all models in each sidebar section
    applyToSidebar(moduleModels),

    // Apply permission filter to a desktop section's tabs and sub-nav
    // Uses registered resolver to look up models for each service
    applyToSection(sectionKey),

    // Check if a mobile service config is viewable
    canViewService(serviceConfig) → boolean,

    // Filter a list of mobile service configs, return only viewable ones
    filterServices(services) → services[],

    // Check if ANY service in a mobile sub-module is viewable
    canViewSubModule(moduleKey, subModuleKey) → boolean,

    // Check if ANY service in a mobile module is viewable
    canViewModule(moduleKey) → boolean
};
```

### Integration points

**Desktop:**
1. `sections.js` — after `Layer8DModuleFilter.applyToSection()`, also call `Layer8DPermissionFilter.applyToSection()`
2. `app.js` — after `Layer8DModuleFilter.applyToSidebar()`, also call `Layer8DPermissionFilter.applyToSidebar()`
3. Module init files — register the resolver once per module (or a single generic resolver)

**Mobile:**
1. `layer8m-nav.js` `_renderHomeView()` — add `Layer8DPermissionFilter.canViewModule()` check alongside existing `filter.isEnabled()` check
2. `layer8m-nav.js` `_renderModuleView()` — add `Layer8DPermissionFilter.canViewSubModule()` check alongside existing filter
3. `layer8m-nav.js` `_renderSubModuleView()` — add `Layer8DPermissionFilter.canViewService()` check alongside existing filter
4. `layer8m-nav.js` `_wouldAutoSkip()` — include permission-filtered count

---

## Phase 1: Core Permission Filter Component (l8ui)

**File: `l8ui/shared/layer8d-permission-filter.js`** (~120 lines)

```javascript
window.Layer8DPermissionFilter = {
    _resolvers: [],

    /**
     * Is the permission system active?
     * Empty/null Layer8DPermissions = permissive mode (show everything).
     */
    _isActive() {
        const p = window.Layer8DPermissions;
        return p && Object.keys(p).length > 0;
    },

    /**
     * Check if user has GET (action 5) access to a model.
     * Permissive when no permissions loaded.
     */
    canView(modelName) {
        if (!this._isActive()) return true;
        const perms = window.Layer8DPermissions[modelName];
        // Model not in permissions map at all = no access (deny by default)
        if (!perms) return false;
        return perms.indexOf(5) !== -1;
    },

    /**
     * Check if user has GET access to ANY model in a list.
     */
    canViewAny(modelNames) {
        if (!this._isActive()) return true;
        if (!modelNames || modelNames.length === 0) return true;
        return modelNames.some(m => this.canView(m));
    },

    /**
     * Register a resolver: (sectionKey, moduleKey, serviceKey) → modelName|null
     * Multiple resolvers can be registered (first non-null wins).
     */
    registerResolver(resolver) {
        this._resolvers.push(resolver);
    },

    /**
     * Resolve a model name for a section/module/service path.
     */
    _resolve(sectionKey, moduleKey, serviceKey) {
        for (const r of this._resolvers) {
            const model = r(sectionKey, moduleKey, serviceKey);
            if (model) return model;
        }
        return null;
    },

    /**
     * Desktop: Apply permission filter to sidebar module links.
     * moduleModels: { sectionKey: [modelName, ...] }
     */
    applyToSidebar(moduleModels) {
        if (!this._isActive()) return;
        document.querySelectorAll('.nav-link[data-section]').forEach(link => {
            const section = link.getAttribute('data-section');
            if (section === 'dashboard' || section === 'system') return;
            const models = moduleModels[section];
            if (!models || models.length === 0) return;
            if (!this.canViewAny(models)) {
                const li = link.closest('li');
                if (li) li.style.display = 'none';
            }
        });
    },

    /**
     * Desktop: Apply permission filter to section tabs and sub-nav items.
     * Uses registered resolvers to look up models.
     */
    applyToSection(sectionKey) {
        if (!this._isActive()) return;

        // Filter sub-nav service items
        document.querySelectorAll(
            '.l8-subnav-item[data-service], .hcm-subnav-item[data-service]'
        ).forEach(item => {
            const serviceKey = item.getAttribute('data-service');
            const moduleContent = item.closest('[data-module]');
            if (!moduleContent) return;
            const moduleKey = moduleContent.getAttribute('data-module');
            const model = this._resolve(sectionKey, moduleKey, serviceKey);
            if (model && !this.canView(model)) {
                item.style.display = 'none';
            }
        });

        // Filter module tabs — hide if ALL services in that module are denied
        document.querySelectorAll(
            '.l8-module-tab[data-module], .hcm-module-tab[data-module]'
        ).forEach(tab => {
            const moduleKey = tab.getAttribute('data-module');
            const moduleContent = document.querySelector(
                `.l8-module-content[data-module="${moduleKey}"]`
            );
            if (!moduleContent) return;
            const visibleServices = moduleContent.querySelectorAll(
                '.l8-subnav-item:not([style*="display: none"])'
            );
            if (visibleServices.length === 0) {
                tab.style.display = 'none';
            }
        });
    },

    // --- Mobile helpers ---

    canViewService(serviceConfig) {
        if (!this._isActive()) return true;
        return serviceConfig && serviceConfig.model ? this.canView(serviceConfig.model) : true;
    },

    filterServices(services) {
        if (!this._isActive()) return services;
        return services.filter(svc => this.canViewService(svc));
    },

    canViewSubModule(moduleKey, subModuleKey) {
        if (!this._isActive()) return true;
        const mc = window.LAYER8M_NAV_CONFIG && LAYER8M_NAV_CONFIG[moduleKey];
        if (!mc || !mc.services || !mc.services[subModuleKey]) return true;
        return mc.services[subModuleKey].some(svc => this.canViewService(svc));
    },

    canViewModule(moduleKey) {
        if (!this._isActive()) return true;
        const mc = window.LAYER8M_NAV_CONFIG && LAYER8M_NAV_CONFIG[moduleKey];
        if (!mc) return true;
        if (mc.section) return true; // Section-based modules (dashboard) always visible
        if (!mc.subModules) return true;
        return mc.subModules.some(sm => this.canViewSubModule(moduleKey, sm.key));
    }
};
```

**Key design decisions:**
- Permissive when `Layer8DPermissions` is empty/null (same pattern as service registry)
- Model not in permissions map = deny (user has no access to that type at all)
- `dashboard` and `system` sections are never filtered (same as module filter)
- Resolver pattern keeps the component project-agnostic — l8ui doesn't know about Sales/FIN namespaces
- Works alongside `Layer8DModuleFilter` — both must pass for an item to be visible
- Mobile helpers read from `LAYER8M_NAV_CONFIG` directly since service configs carry `model`

---

## Phase 2: Mobile Nav Integration (l8ui)

**File: `l8ui/m/js/layer8m-nav.js`** — modify 4 methods

### 2.1 `_renderHomeView()` — add permission check (line 168-169)

Current:
```javascript
if (filter && !filter.isEnabled(module.key)) return;
```

Add:
```javascript
if (filter && !filter.isEnabled(module.key)) return;
const permFilter = window.Layer8DPermissionFilter;
if (permFilter && !permFilter.canViewModule(module.key)) return;
```

### 2.2 `_renderModuleView()` — add permission check (line 216-218)

Current:
```javascript
const visibleSubModules = filter
    ? moduleConfig.subModules.filter(sm => filter.isEnabled(moduleKey + '.' + sm.key))
    : moduleConfig.subModules;
```

Change to:
```javascript
const permFilter = window.Layer8DPermissionFilter;
const visibleSubModules = moduleConfig.subModules.filter(sm => {
    if (filter && !filter.isEnabled(moduleKey + '.' + sm.key)) return false;
    if (permFilter && !permFilter.canViewSubModule(moduleKey, sm.key)) return false;
    return true;
});
```

### 2.3 `_renderSubModuleView()` — add permission check (line 283-287)

Current:
```javascript
const visibleServices = filter
    ? services.filter(svc => filter.isEnabled(basePath + '.' + svc.key))
    : services;
```

Change to:
```javascript
const permFilter = window.Layer8DPermissionFilter;
const visibleServices = services.filter(svc => {
    if (filter && !filter.isEnabled(basePath + '.' + svc.key)) return false;
    if (permFilter && !permFilter.canViewService(svc)) return false;
    return true;
});
```

### 2.4 `_wouldAutoSkip()` — include permission-filtered count (line 364-369)

Current:
```javascript
const subs = filter
    ? moduleConfig.subModules.filter(sm => filter.isEnabled(sm.key))
    : moduleConfig.subModules;
```

Change to:
```javascript
const permFilter = window.Layer8DPermissionFilter;
const subs = moduleConfig.subModules.filter(sm => {
    if (filter && !filter.isEnabled(sm.key)) return false;
    if (permFilter && !permFilter.canViewSubModule(currentState.module || '', sm.key)) return false;
    return true;
});
```

---

## Phase 3: Desktop Nav Integration (l8ui)

### 3.1 `layer8d-module-navigation.js` — filter on loadServiceView

No changes needed here. The service is already loaded on click. If a service sub-nav item is hidden via `display: none`, the user can't click it.

### 3.2 `layer8-section-generator.js` — no changes needed

The generator produces DOM. Filtering happens after generation via `applyToSection()`.

---

## Phase 4: ERP-Specific Wiring (l8erp project, NOT l8ui)

### 4.1 Generic resolver for desktop sections

**File: `go/erp/ui/web/js/app.js`** — register a resolver that bridges section configs to module configs.

The resolver needs to map `(sectionKey, moduleKey, serviceKey) → model`. The module config namespaces (Sales, FIN, HCM, etc.) store this mapping. We need a lookup table from section key to namespace:

```javascript
// After permissions are loaded, register the resolver
Layer8DPermissionFilter.registerResolver(function(sectionKey, moduleKey, serviceKey) {
    // Map section keys to module namespace names
    const nsMap = {
        'hcm': 'HCM', 'financial': 'FIN', 'scm': 'SCM', 'sales': 'Sales',
        'manufacturing': 'MFG', 'crm': 'CRM', 'projects': 'Prj', 'bi': 'BI',
        'documents': 'DOC', 'ecommerce': 'ECOM', 'compliance': 'COMP'
    };
    const ns = window[nsMap[sectionKey]];
    if (!ns || !ns.modules || !ns.modules[moduleKey]) return null;
    const svc = ns.modules[moduleKey].services.find(s => s.key === serviceKey);
    return svc ? svc.model : null;
});
```

### 4.2 Build sidebar model map and apply

**File: `go/erp/ui/web/js/app.js`** — after module configs are loaded, build the sidebar model map.

```javascript
// Collect all models per sidebar section
function buildSidebarModels() {
    const nsMap = {
        'hcm': 'HCM', 'financial': 'FIN', 'scm': 'SCM', 'sales': 'Sales',
        'manufacturing': 'MFG', 'crm': 'CRM', 'projects': 'Prj', 'bi': 'BI',
        'documents': 'DOC', 'ecommerce': 'ECOM', 'compliance': 'COMP'
    };
    const result = {};
    Object.keys(nsMap).forEach(section => {
        const ns = window[nsMap[section]];
        if (!ns || !ns.modules) return;
        const models = [];
        Object.values(ns.modules).forEach(mod => {
            if (mod.services) mod.services.forEach(svc => { if (svc.model) models.push(svc.model); });
        });
        result[section] = models;
    });
    return result;
}
```

Then call:
```javascript
// After Layer8DModuleFilter.applyToSidebar()
if (window.Layer8DPermissionFilter) {
    Layer8DPermissionFilter.applyToSidebar(buildSidebarModels());
}
```

### 4.3 `go/erp/ui/web/js/sections.js` — apply after section load

After the existing `Layer8DModuleFilter.applyToSection(sectionName)` call:
```javascript
if (window.Layer8DPermissionFilter) {
    Layer8DPermissionFilter.applyToSection(sectionName);
}
```

### 4.4 `go/erp/ui/web/m/js/app-core.js` — no changes needed

Mobile nav already reads `window.Layer8DPermissions` (loaded at startup). The `Layer8DPermissionFilter` component uses it via `window.Layer8DPermissions`. As long as the script is included in `m/app.html`, it works.

### 4.5 Script includes

**Desktop `app.html`:** Add `<script src="l8ui/shared/layer8d-permission-filter.js">` after `layer8d-module-filter.js`

**Mobile `m/app.html`:** Add `<script src="../l8ui/shared/layer8d-permission-filter.js">` after `layer8d-module-filter.js`

---

## Phase 5: Edge Cases

### 5.1 First visible tab selection
After permission filtering hides some tabs, the "active" tab may be hidden. `applyToSection()` should activate the first visible tab if the currently active tab is hidden. Add to the end of `applyToSection()`:

```javascript
// If the active tab is now hidden, activate the first visible one
const activeTabs = document.querySelectorAll('.l8-module-tab.active');
activeTabs.forEach(tab => {
    if (tab.style.display === 'none') {
        tab.classList.remove('active');
        // Find corresponding content and deactivate
        const mk = tab.dataset.module;
        const mc = document.querySelector(`.l8-module-content[data-module="${mk}"]`);
        if (mc) mc.classList.remove('active');
    }
});
const firstVisibleTab = document.querySelector('.l8-module-tab:not([style*="display: none"])');
if (firstVisibleTab && !document.querySelector('.l8-module-tab.active:not([style*="display: none"])')) {
    firstVisibleTab.classList.add('active');
    const mk = firstVisibleTab.dataset.module;
    const mc = document.querySelector(`.l8-module-content[data-module="${mk}"]`);
    if (mc) mc.classList.add('active');
}
```

### 5.2 First visible service selection
Same issue for sub-nav items — if the default service is hidden, the first visible service within the active tab should be activated.

### 5.3 Mobile auto-skip recalculation
After permission filtering reduces visible services/sub-modules, the auto-skip logic should account for both module filter and permission filter. This is handled in Phase 2.4.

### 5.4 Ordering
Permission filter must run AFTER module filter, since both use `display: none` and the permission filter's cascading tab-hide logic checks for `display: none` on sub-nav items (which may have been set by the module filter).

---

## Traceability Matrix

| # | Gap | Phase |
|---|-----|-------|
| 1 | No GET permission check on desktop sidebar modules | Phase 4.2 |
| 2 | No GET permission check on desktop section tabs | Phase 1 + 3 (applyToSection) |
| 3 | No GET permission check on desktop sub-nav service items | Phase 1 + 4.3 |
| 4 | No GET permission check on mobile home module cards | Phase 2.1 |
| 5 | No GET permission check on mobile sub-module cards | Phase 2.2 |
| 6 | No GET permission check on mobile service cards | Phase 2.3 |
| 7 | No cascading hide (empty sub-module tab still visible) | Phase 1 (applyToSection tab cascade) |
| 8 | No cascading hide (empty module still in sidebar) | Phase 4.2 (applyToSidebar checks all models) |
| 9 | Hidden active tab not replaced by first visible tab | Phase 5.1 |
| 10 | Mobile auto-skip not accounting for permissions | Phase 2.4 |
| 11 | Generic component needed (not ERP-specific) | Phase 1 (in l8ui/shared/, resolver pattern) |
| 12 | Script includes in app.html / m/app.html | Phase 4.5 |

---

## Phase 6: End-to-End Verification

For verification, create a test user with limited permissions (e.g., only Sales GET access) and verify:

### Desktop
- [ ] Sidebar: only Sales module visible (plus dashboard + system)
- [ ] Other module sidebar entries hidden
- [ ] Clicking Sales: only tabs containing accessible services visible
- [ ] Within a tab: only accessible service sub-nav items visible
- [ ] Hidden active tab replaced by first visible tab
- [ ] Hidden default service replaced by first visible service

### Mobile
- [ ] Home: only Sales module card visible (plus dashboard + system)
- [ ] Other module cards hidden
- [ ] Navigating into Sales: only accessible sub-modules visible
- [ ] Navigating into sub-module: only accessible services visible
- [ ] Auto-skip works correctly with reduced visible items
- [ ] Back navigation works correctly through filtered levels

### Permissive mode
- [ ] With empty `Layer8DPermissions`: all nav items visible (no filtering)
- [ ] With no `/permissions` endpoint: all nav items visible (graceful degradation)

---

## Files Changed Summary

### l8ui (generic — shared across all projects)
| File | Action | Lines |
|------|--------|-------|
| `l8ui/shared/layer8d-permission-filter.js` | **NEW** | ~130 |
| `l8ui/m/js/layer8m-nav.js` | Modify 4 methods | ~20 lines changed |

### l8erp (project-specific wiring)
| File | Action | Lines |
|------|--------|-------|
| `go/erp/ui/web/js/app.js` | Add resolver registration + sidebar apply | ~30 |
| `go/erp/ui/web/js/sections.js` | Add 3-line applyToSection call | ~3 |
| `go/erp/ui/web/app.html` | Add 1 script include | 1 |
| `go/erp/ui/web/m/app.html` | Add 1 script include | 1 |

**Total: ~185 lines new/changed**
