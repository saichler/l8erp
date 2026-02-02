# How to Add a New ERP Module

This recipe covers adding a new module to both desktop and mobile. The example uses a hypothetical "Projects" module with service area 60.

## Prerequisites

- Module protobuf types exist (`.proto` and `.pb.go` files)
- Service area number assigned (e.g., 60)
- Endpoint names defined (max 10 characters each)

## Desktop Module

### Step 1: Create Module Config

**File:** `l8ui/projects/projects-config.js`

```js
(function() {
    'use strict';
    window.Projects = window.Projects || {};

    Projects.modules = {
        'planning': {
            label: 'Planning',
            icon: 'icon-emoji',
            services: [
                { key: 'projects', label: 'Projects', icon: 'icon', endpoint: '/60/Project', model: 'Project' },
                { key: 'tasks', label: 'Tasks', icon: 'icon', endpoint: '/60/Task', model: 'ProjectTask' }
            ]
        },
        'resources': {
            label: 'Resources',
            icon: 'icon-emoji',
            services: [
                { key: 'assignments', label: 'Assignments', icon: 'icon', endpoint: '/60/Assignment', model: 'Assignment' }
            ]
        }
    };

    Projects.submodules = ['ProjectPlanning', 'ProjectResources'];
})();
```

### Step 2: Create Sub-Module Data Files

For EACH sub-module, create 4 files:

#### Enums: `l8ui/projects/planning/planning-enums.js`

```js
(function() {
    'use strict';
    window.ProjectPlanning = window.ProjectPlanning || {};

    ProjectPlanning.enums = {
        PROJECT_STATUS: { 0: 'Unknown', 1: 'Draft', 2: 'Active', 3: 'Completed', 4: 'Cancelled' },
        PROJECT_STATUS_VALUES: { 'draft': 1, 'active': 2, 'completed': 3, 'cancelled': 4 },
        PROJECT_STATUS_CLASSES: { 1: 'status-pending', 2: 'status-active', 3: 'status-completed', 4: 'status-error' }
    };

    ProjectPlanning.render = {};
    ProjectPlanning.render.projectStatus = Layer8DRenderers.createStatusRenderer(
        ProjectPlanning.enums.PROJECT_STATUS,
        ProjectPlanning.enums.PROJECT_STATUS_CLASSES
    );
})();
```

#### Columns: `l8ui/projects/planning/planning-columns.js`

```js
(function() {
    'use strict';
    var enums = ProjectPlanning.enums;
    var render = ProjectPlanning.render;

    ProjectPlanning.columns = {
        Project: [
            { key: 'projectId', label: 'ID', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status',
              enumValues: enums.PROJECT_STATUS_VALUES,
              render: (item) => render.projectStatus(item.status) },
            { key: 'startDate', label: 'Start', sortKey: 'startDate',
              render: (item) => Layer8DRenderers.renderDate(item.startDate) }
        ],
        ProjectTask: [
            { key: 'taskId', label: 'ID', sortKey: 'taskId', filterKey: 'taskId' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'assigneeId', label: 'Assignee', sortKey: 'assigneeId' }
        ]
    };

    ProjectPlanning.primaryKeys = {
        Project: 'projectId',
        ProjectTask: 'taskId'
    };
})();
```

#### Forms: `l8ui/projects/planning/planning-forms.js`

```js
(function() {
    'use strict';
    var enums = ProjectPlanning.enums;

    ProjectPlanning.forms = {
        Project: {
            title: 'Project',
            sections: [
                {
                    title: 'Project Information',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PROJECT_STATUS },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'budget', label: 'Budget', type: 'currency' },
                        { key: 'managerId', label: 'Manager', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        }
    };
})();
```

#### Entry Point: `l8ui/projects/planning/planning.js`

```js
(function() {
    'use strict';
    var required = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    required.forEach(function(prop) {
        if (!ProjectPlanning[prop]) {
            console.error('ProjectPlanning.' + prop + ' not loaded');
        }
    });
})();
```

### Step 3: Create Module Init

**File:** `l8ui/projects/projects-init.js`

```js
(function() {
    'use strict';
    Layer8DModuleFactory.create({
        namespace: 'Projects',
        defaultModule: 'planning',
        defaultService: 'projects',
        sectionSelector: 'planning',
        initializerName: 'initializeProjects',
        requiredNamespaces: ['ProjectPlanning', 'ProjectResources']
    });
})();
```

### Step 4: Create Section HTML

**File:** `sections/projects.html`

```html
<div class="section-container projects-section">
    <div class="page-header">
        <h1>Project Management</h1>
    </div>

    <!-- Module Tabs -->
    <div class="hcm-module-tabs">
        <button class="hcm-module-tab active" data-module="planning">
            <span class="tab-icon">icon</span>
            <span class="tab-label">Planning</span>
        </button>
        <button class="hcm-module-tab" data-module="resources">
            <span class="tab-icon">icon</span>
            <span class="tab-label">Resources</span>
        </button>
    </div>

    <!-- Planning Module -->
    <div class="hcm-module-content active" data-module="planning">
        <div class="hcm-subnav">
            <a class="hcm-subnav-item active" data-service="projects">Projects</a>
            <a class="hcm-subnav-item" data-service="tasks">Tasks</a>
        </div>
        <div class="hcm-service-view active" data-service="projects">
            <div class="hcm-table-container" id="planning-projects-table-container"></div>
        </div>
        <div class="hcm-service-view" data-service="tasks">
            <div class="hcm-table-container" id="planning-tasks-table-container"></div>
        </div>
    </div>

    <!-- Resources Module -->
    <div class="hcm-module-content" data-module="resources">
        <div class="hcm-subnav">
            <a class="hcm-subnav-item active" data-service="assignments">Assignments</a>
        </div>
        <div class="hcm-service-view active" data-service="assignments">
            <div class="hcm-table-container" id="resources-assignments-table-container"></div>
        </div>
    </div>
</div>
```

**IMPORTANT:** Table container ID format is `{moduleKey}-{serviceKey}-table-container`.
**IMPORTANT:** CSS classes use `hcm-` prefix for ALL modules (shared CSS).

### Step 5: Update app.html

Add CSS link (if module has custom CSS):
```html
<link rel="stylesheet" href="l8ui/projects/projects.css">
```

Add script tags (in order: config, then per-submodule: enums, columns, forms, entry point, then init):
```html
<script src="l8ui/projects/projects-config.js"></script>
<script src="l8ui/projects/planning/planning-enums.js"></script>
<script src="l8ui/projects/planning/planning-columns.js"></script>
<script src="l8ui/projects/planning/planning-forms.js"></script>
<script src="l8ui/projects/planning/planning.js"></script>
<!-- repeat for resources sub-module -->
<script src="l8ui/projects/projects-init.js"></script>
```

### Step 6: Update sections.js

Add to the sections map and initializers:
```js
const sections = { ..., projects: 'sections/projects.html' };
const sectionInitializers = { ..., projects: () => { if (typeof initializeProjects === 'function') initializeProjects(); } };
```

### Step 7: Register Reference Models

Add to `reference-registry-*.js`:
```js
Layer8DReferenceRegistry.register({
    Project: { idColumn: 'projectId', displayColumn: 'name', displayLabel: 'Project' },
    ProjectTask: { idColumn: 'taskId', displayColumn: 'title', displayLabel: 'Task' }
});
```

---

## Mobile Module

### Step 1: Create Module Data Files

Structure: `m/js/projects/`

#### Enums: `m/js/projects/planning-enums.js`

```js
(function() {
    'use strict';
    window.MobileProjectPlanning = window.MobileProjectPlanning || {};

    MobileProjectPlanning.enums = {
        PROJECT_STATUS: { 0: 'Unknown', 1: 'Draft', 2: 'Active', 3: 'Completed' },
        PROJECT_STATUS_VALUES: { 'draft': 1, 'active': 2, 'completed': 3 },
        PROJECT_STATUS_CLASSES: { 1: 'pending', 2: 'active', 3: 'completed' }
    };

    MobileProjectPlanning.render = {};
    MobileProjectPlanning.render.projectStatus = Layer8MRenderers.createStatusRenderer(
        MobileProjectPlanning.enums.PROJECT_STATUS,
        MobileProjectPlanning.enums.PROJECT_STATUS_CLASSES
    );
})();
```

#### Columns: `m/js/projects/planning-columns.js`

```js
(function() {
    'use strict';
    var enums = MobileProjectPlanning.enums;
    var render = MobileProjectPlanning.render;

    MobileProjectPlanning.columns = {
        Project: [
            { key: 'projectId', label: 'ID', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', primary: true, sortKey: 'name', filterKey: 'name' },
            { key: 'status', label: 'Status', secondary: true, sortKey: 'status', filterKey: 'status',
              enumValues: enums.PROJECT_STATUS_VALUES,
              render: (item) => render.projectStatus(item.status) },
            { key: 'startDate', label: 'Start', sortKey: 'startDate',
              render: (item) => Layer8MRenderers.renderDate(item.startDate) }
        ]
    };

    MobileProjectPlanning.primaryKeys = { Project: 'projectId' };
})();
```

**Mobile-specific:** Add `primary: true` and `secondary: true` to columns for card header display.

#### Forms: `m/js/projects/planning-forms.js`

Same structure as desktop forms but on the mobile namespace.

#### Registry: `m/js/projects/projects-index.js`

```js
(function() {
    'use strict';
    const modules = [MobileProjectPlanning, MobileProjectResources];

    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) return mod;
        }
        return null;
    }

    window.MobileProjects = {
        getFormDef(modelName) {
            const mod = findModule(modelName);
            return (mod && mod.forms && mod.forms[modelName]) ? mod.forms[modelName] : null;
        },
        getColumns(modelName) {
            const mod = findModule(modelName);
            return (mod && mod.columns && mod.columns[modelName]) ? mod.columns[modelName] : null;
        },
        getTransformData(modelName) {
            const mod = findModule(modelName);
            return (mod && mod.transformData) ? mod.transformData : null;
        },
        hasModel(modelName) { return findModule(modelName) !== null; }
    };
})();
```

### Step 2: Update Nav Config

In `l8ui/m/js/layer8m-nav-config.js`:

1. Change `hasSubModules: true` for the module in the `modules` array
2. Add the module config block:

```js
projects: {
    subModules: [
        { key: 'planning', label: 'Planning', icon: 'projects' },
        { key: 'resources', label: 'Resources', icon: 'projects' }
    ],
    services: {
        'planning': [
            { key: 'projects', label: 'Projects', icon: 'projects', endpoint: '/60/Project', model: 'Project', idField: 'projectId' },
            { key: 'tasks', label: 'Tasks', icon: 'projects', endpoint: '/60/Task', model: 'ProjectTask', idField: 'taskId' }
        ],
        'resources': [
            { key: 'assignments', label: 'Assignments', icon: 'projects', endpoint: '/60/Assignment', model: 'Assignment', idField: 'assignmentId' }
        ]
    }
}
```

### Step 3: Update Nav.js Registry List

In `l8ui/m/js/layer8m-nav.js`, add `window.MobileProjects` to the registry arrays in `_getServiceColumns`, `_getServiceFormDef`, and `_getServiceTransformData`.

### Step 4: Update app.html

Add script tags before the nav config:
```html
<!-- Scripts - Projects Enums -->
<script src="js/projects/planning-enums.js"></script>
<!-- Scripts - Projects Columns -->
<script src="js/projects/planning-columns.js"></script>
<!-- Scripts - Projects Forms -->
<script src="js/projects/planning-forms.js"></script>
<!-- Scripts - Projects Registry -->
<script src="js/projects/projects-index.js"></script>
```

### Step 5: Update Sidebar Link

In `m/app.html`, update the sidebar link to route through card navigation:
```html
<a href="#dashboard" class="sidebar-item" data-section="dashboard" data-module="projects">
    <span class="sidebar-item-icon"><svg>...</svg></span>
    Projects
</a>
```

### Step 6: Register Reference Models

In `l8ui/m/js/layer8m-reference-registry.js`, add model configs.

---

## Special Cases

### Read-Only Services (e.g., Health Monitor)

Add `readOnly: true` to the service in nav config:
```js
{ key: 'health-monitor', label: 'Health', endpoint: '/0/Health', model: 'L8Health',
  idField: 'service', readOnly: true }
```

When `readOnly: true`, `Layer8MNav._loadServiceData()` skips Add/Edit/Delete callbacks.

### Services with Transform Data

When the API returns data in a different format than what columns expect, add a `transformData` function to the module namespace:

```js
MobileMyModule.transformData = function(item) {
    return {
        displayField: item.rawField || 'Unknown',
        formattedValue: formatSomething(item.rawValue)
    };
};
```

The nav system calls `registry.getTransformData(modelName)` and passes it to the table.

### Custom CRUD Handlers (Desktop Only)

For models needing custom forms (nested data, special fields), override the factory CRUD in the init file:

```js
var origInit = window.initializeMyModule;
window.initializeMyModule = function() {
    if (origInit) origInit();
    // Override CRUD for specific models
    MyModule._openAddModal = function(service) {
        if (service.model === 'SpecialModel') {
            MyCustomCRUD.openAdd(service);
        } else {
            Layer8DModuleCRUD._openAddModal.call(MyModule, service);
        }
    };
};
```

## Checklist

- [ ] Desktop: config, enums, columns, forms, entry point, init (per sub-module)
- [ ] Desktop: section HTML with correct container IDs
- [ ] Desktop: app.html script tags
- [ ] Desktop: sections.js mapping
- [ ] Desktop: reference registry entries
- [ ] Mobile: enums, columns, forms, registry index
- [ ] Mobile: nav config (hasSubModules + config block)
- [ ] Mobile: nav.js registry list updated
- [ ] Mobile: app.html script tags + sidebar link
- [ ] Mobile: reference registry entries
- [ ] Field names match actual API/protobuf field names (verify against .pb.go)
