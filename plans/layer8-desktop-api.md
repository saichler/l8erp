# Layer8 Desktop Component API Reference

## 1. Layer8DConfig

**File:** `l8ui/shared/layer8d-config.js`

```js
await Layer8DConfig.load();                    // Fetches login.json, extracts app config
Layer8DConfig.getConfig();                     // Returns full app config object
Layer8DConfig.getDateFormat();                 // Returns date format string (e.g., 'mm/dd/yyyy')
Layer8DConfig.getApiPrefix();                  // Returns API prefix (e.g., '/erp')
Layer8DConfig.resolveEndpoint('/30/Employee'); // Returns '/erp/30/Employee'
```

## 2. Layer8DUtils

**File:** `l8ui/shared/layer8d-utils.js`

```js
Layer8DUtils.escapeHtml(text)                  // XSS-safe HTML escaping
Layer8DUtils.formatDate(timestamp)             // Unix seconds -> 'MM/DD/YYYY'
Layer8DUtils.formatDateTime(timestamp)         // Unix seconds -> 'MM/DD/YYYY HH:MM:SS'
Layer8DUtils.parseDate(dateString)             // 'MM/DD/YYYY' -> Unix seconds (or null)
Layer8DUtils.formatMoney(cents, currency?)     // 150000 -> '$1,500.00'
Layer8DUtils.formatPercentage(decimal)         // 0.75 -> '75.00%'
Layer8DUtils.formatPhone(digits)               // '5551234567' -> '(555) 123-4567'
Layer8DUtils.formatSSN(digits, masked?)        // '123456789' -> '***-**-6789' (masked) or '123-45-6789'
Layer8DUtils.formatHours(minutes)              // 150 -> '2:30'
Layer8DUtils.getNestedValue(obj, 'a.b.c')     // Deep property access
Layer8DUtils.debounce(fn, ms)                  // Returns debounced function
```

## 3. Layer8DTable

**Files:** `l8ui/edit_table/layer8d-table-*.js` (6 files, load in order: core, data, render, events, filter, table)
**CSS:** `l8ui/edit_table/layer8d-table.css`

### Constructor

```js
const table = new Layer8DTable({
    containerId: 'my-table-container',     // REQUIRED: DOM element ID
    endpoint: '/erp/30/Employee',          // API endpoint (server-side mode)
    modelName: 'Employee',                 // Model name for L8Query
    columns: [...],                        // Column definitions (see below)
    pageSize: 10,                          // Rows per page (default: 10)
    serverSide: true,                      // Enable server-side pagination
    sortable: true,                        // Enable column sorting (default: true)
    filterable: true,                      // Enable column filtering (default: true)
    filterDebounceMs: 1000,                // Filter debounce ms (default: 1000)
    primaryKey: 'employeeId',              // Primary key field
    transformData: (item) => ({...}),      // Transform each row before display
    onDataLoaded: (data, items, total) => {},
    onRowClick: (item, id) => {},          // Row click callback
    onAdd: () => {},                       // Add button callback
    onEdit: (id) => {},                    // Edit button callback
    onDelete: (id) => {},                  // Delete button callback
    addButtonText: 'Add Employee',         // Text for add button
    showActions: true,                     // Show action column (default: true)
    emptyMessage: 'No data found.',
    baseWhereClause: 'status=1',           // Base WHERE for all queries
    pageSizeOptions: [5, 10, 25, 50]
});
table.init();  // MUST call init() after construction
```

### Column Definition

```js
{
    key: 'fieldName',                      // Data field (supports dots: 'user.name')
    label: 'Display Label',                // Column header
    sortKey: 'fieldName',                  // Server-side sort field
    filterKey: 'fieldName',                // Server-side filter field
    enumValues: { 'active': 1, 'inactive': 0 }, // Filter validation map
    render: (item, index) => '<html>'      // Custom cell renderer
}
```

### Instance Methods

```js
table.init()                               // Initialize and render
table.setData(array)                       // Client-side: set data
table.setServerData(array, totalCount)     // Server-side: set data with count
table.fetchData(page, pageSize)            // Fetch from server
table.setBaseWhereClause('status=1')       // Update WHERE and re-fetch
table.render()                             // Re-render table
table.sort('columnKey')                    // Sort by column (toggles asc/desc)
table.goToPage(2)                          // Navigate to page (1-indexed)
```

### Static Methods

```js
Layer8DTable.tag('Active', 'status-active')        // <span class="l8-tag status-active">Active</span>
Layer8DTable.tags(['A', 'B'], 'my-class')          // Multiple tags
Layer8DTable.countBadge(5, 'item', 'items')        // <span class="l8-tag">5 items</span>
Layer8DTable.statusTag(true, 'Up', 'Down')         // Status indicator tag
```

## 4. Layer8DPopup

**File:** `l8ui/popup/layer8d-popup.js`
**CSS:** `layer8d-popup.css`, `layer8d-popup-content.css`, `layer8d-popup-forms.css`

```js
Layer8DPopup.show({
    title: 'Edit Employee',                // Plain text title
    titleHtml: '<b>Custom</b> Title',      // HTML title (overrides title)
    content: '<div>...</div>',             // Body HTML
    size: 'large',                         // 'small'|'medium'|'large'|'xlarge'
    showFooter: true,                      // Show cancel/save buttons
    saveButtonText: 'Save',
    cancelButtonText: 'Cancel',
    noPadding: false,                      // Remove body padding (WARNING: breaks tab CSS)
    onSave: (formData) => {},              // Save callback
    onShow: (body) => {}                   // Called 50ms after popup appears
});

Layer8DPopup.close()                       // Close topmost popup
Layer8DPopup.closeAll()                    // Close all stacked popups
Layer8DPopup.updateContent('<html>')       // Replace body HTML
Layer8DPopup.updateTitle('New Title')      // Update title
Layer8DPopup.getBody()                     // Get body element
```

**Tab Support (built-in event delegation):**
```html
<div class="probler-popup-tabs">
    <div class="probler-popup-tab active" data-tab="overview">Overview</div>
    <div class="probler-popup-tab" data-tab="details">Details</div>
</div>
<div class="probler-popup-tab-content">
    <div class="probler-popup-tab-pane active" data-pane="overview">...</div>
    <div class="probler-popup-tab-pane" data-pane="details">...</div>
</div>
```

## 5. Layer8DNotification

**File:** `l8ui/notification/layer8d-notification.js`

```js
Layer8DNotification.success('Record saved');
Layer8DNotification.error('Failed to save', ['Detail 1', 'Detail 2']);
Layer8DNotification.warning('Check input');
Layer8DNotification.info('Processing...');
Layer8DNotification.close();

// Custom config:
Layer8DNotification.show({
    type: 'error',
    title: 'Custom Title',
    message: 'Message text',
    details: ['bullet 1', 'bullet 2'],
    duration: 5000,          // 0 = manual close only
    showClose: true
});
```

Default durations: error=0 (manual), warning=5000, success=3000, info=4000.

## 6. Layer8DForms

**File:** `l8ui/shared/layer8d-forms.js`

```js
// Open add form in popup
Layer8DForms.openAddForm({
    title: 'Add Employee',
    formDefinition: { sections: [{ title: '...', fields: [...] }] },
    endpoint: '/erp/30/Employee',
    onSuccess: () => { table.fetchData(); }
});

// Open edit form (fetches record first)
Layer8DForms.openEditForm({
    title: 'Edit Employee',
    formDefinition: {...},
    endpoint: '/erp/30/Employee',
    primaryKey: 'employeeId',
    recordId: 'EMP-001',
    onSuccess: () => { table.fetchData(); }
});

// Show read-only details popup
Layer8DForms.showDetailsPopup({
    title: 'Employee Details',
    formDefinition: {...},
    record: item
});

// Render form HTML
Layer8DForms.renderForm(formDef, data, readonly)    // Returns HTML string
Layer8DForms.getFormValues(container)                // Collect form data
Layer8DForms.validateForm(container)                 // Returns { valid, errors[] }
Layer8DForms.initFormFields(container)               // Init datepickers, reference pickers, formatters
```

### Form Definition Schema

```js
{
    title: 'Employee',
    sections: [
        {
            title: 'Personal Information',
            fields: [
                { key: 'firstName', label: 'First Name', type: 'text', required: true },
                { key: 'gender', label: 'Gender', type: 'select', options: { 1: 'Male', 2: 'Female' } },
                { key: 'hireDate', label: 'Hire Date', type: 'date' },
                { key: 'salary', label: 'Salary', type: 'currency' },
                { key: 'isActive', label: 'Active', type: 'checkbox' },
                { key: 'bio', label: 'Biography', type: 'textarea' },
                { key: 'nationalId', label: 'SSN', type: 'ssn' },
                { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' },
                { key: 'percentage', label: 'Rate', type: 'percentage' },
                { key: 'phone', label: 'Phone', type: 'phone' },
                { key: 'hours', label: 'Hours', type: 'hours' }
            ]
        }
    ]
}
```

## 7. Layer8DDatePicker

**Files:** `l8ui/datepicker/layer8d-datepicker-*.js` (4 files)

```js
Layer8DDatePicker.attach(inputElement, {
    minDate: 1609459200,                   // Min date (Unix seconds)
    maxDate: 1735689600,                   // Max date (Unix seconds)
    onChange: (timestamp, formatted) => {},
    showTodayButton: true,
    firstDayOfWeek: 0                      // 0=Sunday, 1=Monday
});

Layer8DDatePicker.setDate(input, timestamp) // Set date (0 = 'Current'/'N/A')
Layer8DDatePicker.getDate(input)            // Get Unix timestamp (0 for Current, null for empty)
Layer8DDatePicker.detach(input)
```

## 8. Layer8DReferencePicker

**Files:** `l8ui/reference_picker/layer8d-reference-picker-*.js` (6 files)

```js
Layer8DReferencePicker.attach(inputElement, {
    endpoint: '/erp/30/Department',        // REQUIRED
    modelName: 'Department',               // REQUIRED
    idColumn: 'departmentId',              // REQUIRED
    displayColumn: 'name',                 // REQUIRED
    displayFormat: (item) => `${item.code} - ${item.name}`, // Custom display
    selectColumns: ['departmentId', 'name', 'code'],
    baseWhereClause: 'isActive=true',
    pageSize: 10,
    onChange: (id, displayValue, item) => {},
    title: 'Select Department'
});

Layer8DReferencePicker.getValue(input)      // Returns selected ID
Layer8DReferencePicker.getItem(input)       // Returns full selected item
Layer8DReferencePicker.setValue(input, id, displayValue, item)
Layer8DReferencePicker.detach(input)
```

## 9. Layer8DInputFormatter

**Files:** `l8ui/input_formatters/layer8d-input-formatter-*.js` (5 files)

Supported types: `ssn`, `phone`, `currency`, `percentage`, `routingNumber`, `ein`, `email`, `url`, `colorCode`, `rating`, `hours`

```js
Layer8DInputFormatter.attach(input, 'currency', { min: 0, max: 1000000 })
Layer8DInputFormatter.getValue(input)       // Raw value (e.g., cents for currency)
Layer8DInputFormatter.setValue(input, 15000) // Set value (e.g., cents)
Layer8DInputFormatter.validate(input)       // { valid: bool, errors: [] }
Layer8DInputFormatter.detach(input)

// Auto-attach all inputs with data-format attribute
Layer8DInputFormatter.attachAll(container)
Layer8DInputFormatter.collectValues(container) // { fieldName: rawValue, ... }

// Display formatters
Layer8DInputFormatter.format.currency(15000)         // '$150.00'
Layer8DInputFormatter.format.ssn('123456789', true)  // '***-**-6789'
Layer8DInputFormatter.format.phone('5551234567')     // '(555) 123-4567'
```

## 10. Layer8DReferenceRegistry

**File:** `l8ui/shared/layer8d-reference-registry.js`

```js
Layer8DReferenceRegistry.register({
    Employee: {
        idColumn: 'employeeId',
        displayColumn: 'lastName',
        selectColumns: ['employeeId', 'firstName', 'lastName'],
        displayLabel: 'Employee',
        displayFormat: (item) => `${item.lastName}, ${item.firstName}`
    }
});

Layer8DReferenceRegistry.get('Employee')    // Returns config object
```

## 11. Layer8DModuleFactory

**File:** `l8ui/shared/layer8d-module-factory.js`

The factory orchestrates all shared components for a module in a single call:

```js
Layer8DModuleFactory.create({
    namespace: 'HCM',                      // Window namespace (e.g., window.HCM)
    defaultModule: 'core-hr',              // Default sub-module tab
    defaultService: 'employees',           // Default service in sub-module
    sectionSelector: 'core-hr',            // CSS selector for section container
    initializerName: 'initializeHCM',      // Global function name for section init
    requiredNamespaces: ['CoreHR', 'Payroll', 'Benefits', 'Time', 'Talent', 'Learning', 'Compensation']
});
```

This single call:
1. Registers all sub-modules in `Layer8DServiceRegistry`
2. Creates a forms facade (`window.HCMForms`)
3. Attaches tab/subnav navigation (`Layer8DModuleNavigation`)
4. Attaches CRUD operations (`Layer8DModuleCRUD`)
5. Exposes `window.initializeHCM` function
6. Validates all required namespaces exist

## 12. Layer8DRenderers

**File:** `l8ui/shared/layer8d-renderers.js`

```js
Layer8DRenderers.renderEnum(value, enumMap)
Layer8DRenderers.renderBoolean(value)
Layer8DRenderers.renderDate(timestamp)
Layer8DRenderers.renderDateTime(timestamp)
Layer8DRenderers.renderMoney(cents, currency?)
Layer8DRenderers.renderPercentage(decimal)
Layer8DRenderers.renderPhone(digits)
Layer8DRenderers.renderSSN(digits, masked?)
Layer8DRenderers.renderHours(minutes)
Layer8DRenderers.renderRating(value, max?)
Layer8DRenderers.createStatusRenderer(enumMap, classMap) // Returns renderer function
```
