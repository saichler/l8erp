# Plan: Mobile-Desktop UI Gap Analysis & Fix

## Gap Analysis

### Summary

Mobile has **all view type components implemented and registered** (chart, kanban, calendar, timeline, tree, gantt, wizard) but they are **never used**. Every service on mobile renders as a plain table because `layer8m-nav-data.js:53` hardcodes `new Layer8MEditTable(...)` instead of going through the view factory.

### Root Cause

Two disconnects:

1. **`layer8m-nav-data.js` bypasses the view factory** — It always creates `new Layer8MEditTable()` on line 53, never calling `Layer8MViewFactory.create()`.

2. **Mobile nav configs have no `supportedViews`** — All 160+ services across 13 modules define only `key`, `label`, `icon`, `endpoint`, `model`, `idField`. None declare `supportedViews`.

### Gap Detail: View Types Available on Desktop but Not Mobile

| View Type | Desktop Services Using It | Mobile Status |
|-----------|--------------------------|---------------|
| **kanban** | 20 services (Leads, Opportunities, Cases, Leave Requests, Sales Orders, POs, Work Orders, etc.) | Component exists (`Layer8MKanban`), registered with `Layer8MViewFactory`, **never instantiated** |
| **chart** | 9 explicit + all date+money auto-detected (est. 25+ total) | Component exists (`Layer8MChart`), registered, **never instantiated** |
| **calendar** | 8 services (Leave Requests, Shifts, Schedules, Holidays, Course Sessions, Dock Schedules, Bookings, etc.) | Component exists (`Layer8MCalendar`), registered, **never instantiated** |
| **tree** | 7 services (Accounts, Item Categories, BOMs, Customer Hierarchies, Folders, etc.) | Component exists (`Layer8MTreeGrid`), registered, **never instantiated** |
| **gantt** | 4 services (Work Orders, Production Orders, Prod Schedules, Projects) | Component exists (`Layer8MGantt`), registered, **never instantiated** |
| **timeline** | 2 services (Campaigns, Projects) | Component exists (`Layer8MTimeline`), registered, **never instantiated** |
| **view switcher** | Used whenever `supportedViews.length > 1` via `Layer8DViewFactory.createWithSwitcher()` | CSS loaded (`layer8-view-switcher.css`), **no JS integration** |
| **auto-detect chart** | service-registry.js auto-adds `'chart'` for date+money columns | **Not replicated in mobile** |

### What Already Works (No Gap)

- All 13 modules with navigation (modules → submodules → services)
- Table view for all 160+ services
- Forms (add/edit/view) with inline tables
- Reference pickers, date pickers
- Authentication, popups, confirmations
- Shared factories (enum, column, form, ref)
- Module enable/disable (toggle tree + filter)
- Dashboard

---

## Fix Plan

### Architecture Decision

The mobile view factory + view switcher already exist. The fix is to **wire them in** instead of bypassing them.

### Change 1: Modify `layer8m-nav-data.js` — Use view factory + view switcher

**File**: `go/erp/ui/web/l8ui/m/js/layer8m-nav-data.js`

Replace the hardcoded `new Layer8MEditTable(...)` with view factory delegation:

```javascript
loadServiceData(serviceConfig) {
    const container = document.getElementById('service-table-container');
    if (!container) return;

    const formDef = this.getServiceFormDef(serviceConfig);
    const columns = this.getServiceColumns(serviceConfig);
    const transformData = this.getServiceTransformData(serviceConfig);

    const viewType = serviceConfig.viewType || 'table';
    const primaryKey = serviceConfig.idField || 'id';

    // Build view options (same shape Layer8MViewFactory expects)
    const viewOptions = {
        containerId: 'service-table-container',
        endpoint: Layer8MConfig.resolveEndpoint(serviceConfig.endpoint),
        modelName: serviceConfig.model,
        columns: columns,
        pageSize: 15,
        primaryKey: primaryKey,
        statusField: 'status',
        addButtonText: `Add ${serviceConfig.label.replace(/s$/, '')}`,
        viewConfig: serviceConfig.viewConfig || {},
        transformData: transformData
    };

    // Add CRUD callbacks (unless readOnly)
    if (!serviceConfig.readOnly) {
        viewOptions.onAdd = () => Layer8MNavCrud.openServiceForm(serviceConfig, formDef, null);
        viewOptions.onEdit = (id, item) => Layer8MNavCrud.openServiceForm(serviceConfig, formDef, item);
        viewOptions.onDelete = (id, item) => Layer8MNavCrud.deleteServiceRecord(serviceConfig, id, item);
        viewOptions.onRowClick = (item, id) => Layer8MNavCrud.showRecordDetails(serviceConfig, formDef, item);
    }

    // Auto-detect chart support (mirror desktop service-registry.js logic)
    let allViewTypes = serviceConfig.supportedViews
        ? serviceConfig.supportedViews.slice() : ['table'];
    const hasDate = columns.some(c => c.type === 'date');
    const hasMoney = columns.some(c => c.type === 'money');
    if (hasDate && hasMoney && allViewTypes.indexOf('chart') === -1) {
        allViewTypes.push('chart');
    }

    // If multiple views available, use view switcher
    let view;
    if (allViewTypes.length > 1 && typeof Layer8ViewSwitcher !== 'undefined') {
        const switcherKey = serviceConfig.model || serviceConfig.key;
        view = Layer8ViewSwitcher.createWithSwitcher(
            Layer8MViewFactory, viewType, viewOptions,
            allViewTypes, switcherKey,
            (newView) => { setActiveTable(newView); }
        );
    } else {
        view = Layer8MViewFactory.create(viewType, viewOptions);
    }

    if (view) {
        if (view.init) view.init();
        setActiveTable(view);
    }
}
```

**Key changes:**
- Uses `Layer8MViewFactory.create()` instead of `new Layer8MEditTable()`
- Reads `supportedViews` from service config
- Auto-detects date+money → chart (same as desktop)
- Uses `Layer8ViewSwitcher.createWithSwitcher()` for multi-view services

### Change 2: Update `Layer8MViewFactory` table registration to accept full options

**File**: `go/erp/ui/web/l8ui/m/js/layer8m-view-factory.js`

The current table factory takes `(containerId, config)` but the new options shape from nav-data passes a flat object with `containerId` at the top level. Need to align:

```javascript
Layer8MViewFactory.register('table', function(options) {
    return new Layer8MEditTable(options.containerId, {
        endpoint: options.endpoint,
        modelName: options.modelName,
        columns: options.columns,
        rowsPerPage: options.pageSize || 15,
        statusField: options.statusField || 'status',
        addButtonText: options.addButtonText,
        onAdd: options.onAdd,
        onEdit: options.onEdit,
        onDelete: options.onDelete,
        onRowClick: options.onRowClick,
        transformData: options.transformData,
        onDataLoaded: options.onDataLoaded,
        getItemId: options.getItemId
    });
});
```

This already matches the current registration (lines 48-63). No change needed unless the options shape changes. We need to verify the CRUD callbacks (`onEdit` signature) match — currently nav-data passes `(id, item)` and the factory passes `options.onEdit` through. Should be compatible.

### Change 3: Verify `Layer8ViewSwitcher` works with mobile view factory

**File**: `go/erp/ui/web/l8ui/shared/layer8-view-switcher.js`

The desktop view switcher currently calls `Layer8DViewFactory.create()`. It needs to accept the view factory as a parameter so mobile can pass `Layer8MViewFactory` instead. Check if it already supports this.

If it's hardcoded to `Layer8DViewFactory`, add a factory parameter:
```javascript
createWithSwitcher(factory, viewType, options, allViewTypes, switcherKey, onSwitch) {
    // Use factory.create(type, options) instead of Layer8DViewFactory.create(type, options)
}
```

### Change 4: Add `supportedViews` to mobile nav configs

**Files** (3 files):
- `go/erp/ui/web/erp-ui/m/nav-configs/layer8m-nav-config-fin-hcm.js`
- `go/erp/ui/web/erp-ui/m/nav-configs/layer8m-nav-config-scm-sales.js`
- `go/erp/ui/web/erp-ui/m/nav-configs/layer8m-nav-config-prj-other.js`

Add `supportedViews` to every service that has it on desktop. Full list (45 services):

**FIN:**
- `accounts` → `supportedViews: ['table', 'tree']`
- `cash-forecasts` → `supportedViews: ['table', 'chart']`
- `budgets` → `supportedViews: ['table', 'chart']`
- `forecasts` → `supportedViews: ['table', 'chart']`

**HCM:**
- `leave-requests` → `supportedViews: ['table', 'kanban', 'calendar']`
- `shifts` → `supportedViews: ['table', 'calendar']`
- `schedules` → `supportedViews: ['table', 'calendar']`
- `holidays` → `supportedViews: ['table', 'calendar']`
- `requisitions` → `supportedViews: ['table', 'kanban']`
- `onboarding` → `supportedViews: ['table', 'kanban']`
- `course-sessions` → `supportedViews: ['table', 'calendar']`

**SCM:**
- `purchase-requisitions` → `supportedViews: ['table', 'kanban']`
- `purchase-orders` → `supportedViews: ['table', 'kanban']`
- `item-categories` → `supportedViews: ['table', 'tree']`
- `dock-schedules` → `supportedViews: ['table', 'calendar']`
- `return-authorizations` → `supportedViews: ['table', 'kanban']`

**MFG:**
- `boms` → `supportedViews: ['table', 'tree']`
- `change-orders` → `supportedViews: ['table', 'kanban']`
- `work-orders` → `supportedViews: ['table', 'kanban', 'gantt']`
- `production-orders` → `supportedViews: ['table', 'kanban', 'gantt']`
- `inspections` → `supportedViews: ['table', 'kanban']`
- `prod-schedules` → `supportedViews: ['table', 'gantt']`

**Sales:**
- `hierarchies` → `supportedViews: ['table', 'tree']`
- `quotations` → `supportedViews: ['table', 'kanban']`
- `sales-orders` → `supportedViews: ['table', 'kanban']`
- `returns` → `supportedViews: ['table', 'kanban']`
- `targets` → `supportedViews: ['table', 'chart']`
- `forecasts` → `supportedViews: ['table', 'chart']`

**CRM:**
- `leads` → `supportedViews: ['table', 'kanban']`
- `opportunities` → `supportedViews: ['table', 'kanban']`
- `campaigns` → `supportedViews: ['table', 'timeline']`
- `cases` → `supportedViews: ['table', 'kanban']`
- `service-orders` → `supportedViews: ['table', 'kanban', 'calendar']`
- `service-schedules` → `supportedViews: ['table', 'calendar']`

**PRJ:**
- `projects` → `supportedViews: ['table', 'kanban', 'gantt', 'timeline']`
- `bookings` → `supportedViews: ['table', 'calendar']`
- `status-reports` → `supportedViews: ['table', 'chart']`
- `portfolio-views` → `supportedViews: ['table', 'chart']`
- `kpis` → `supportedViews: ['table', 'chart']`

**BI:**
- `kpis` → `supportedViews: ['table', 'chart']`
- `trend-analyses` → `supportedViews: ['table', 'chart']`
- `benchmarks` → `supportedViews: ['table', 'chart']`

**DOC:**
- `folders` → `supportedViews: ['table', 'tree']`
- `categories` → `supportedViews: ['table', 'tree']`

**ECOM:**
- `categories` → `supportedViews: ['table', 'tree']`
- `orders` → `supportedViews: ['table', 'kanban']`
- `returns` → `supportedViews: ['table', 'kanban']`

**COMP:**
- `incidents` → `supportedViews: ['table', 'kanban']`
- `audit-schedules` → `supportedViews: ['table', 'calendar']`
- `audit-findings` → `supportedViews: ['table', 'kanban']`

### Change 5: Update GUIDE.md

Document the mobile view switching capability and parity with desktop.

---

## Implementation Order

1. **Change 3** first — Verify/fix `Layer8ViewSwitcher` to accept a factory parameter (shared component)
2. **Change 2** — Verify `Layer8MViewFactory` table registration compatibility (may need no change)
3. **Change 1** — Modify `layer8m-nav-data.js` to use view factory + switcher
4. **Change 4** — Add `supportedViews` to all 3 mobile nav config files (45 services)
5. **Change 5** — Update GUIDE.md

## Verification

1. `node -c` all modified JS files
2. Navigate to mobile HCM > Time > Leave Requests — view switcher should appear with Table/Kanban/Calendar
3. Switch to Kanban — cards should render grouped by status
4. Switch to Calendar — calendar should show leave request dates
5. Navigate to mobile MFG > Production > Work Orders — view switcher with Table/Kanban/Gantt
6. Navigate to mobile FIN > General Ledger > Accounts — view switcher with Table/Tree
7. Navigate to mobile Sales > Analytics > Sales Targets — view switcher with Table/Chart
8. Verify auto-detected chart views: mobile FIN > AP > Purchase Invoices should show Chart option (date+money columns)
9. Verify services WITHOUT `supportedViews` still render plain table (no view switcher)

## Line Count Impact

- `layer8m-nav-data.js`: Currently 143 lines → ~170 lines (well under 500)
- `layer8m-view-factory.js`: Currently 65 lines → ~65 lines (no significant change expected)
- `layer8-view-switcher.js`: Minor change if factory param needed
- Nav config files: +1 line per service with views (45 additions across 3 files)
- Net: ~75 lines added across all files
