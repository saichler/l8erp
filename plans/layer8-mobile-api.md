# Layer8 Mobile Component API Reference

## 1. Layer8MConfig

**File:** `l8ui/m/js/layer8m-config.js`

```js
await Layer8MConfig.load()                     // Fetches /login.json
Layer8MConfig.getConfig()                      // Returns raw login.json { login: {...}, app: {...} }
Layer8MConfig.resolveEndpoint('/30/Employee')   // Returns '/erp/30/Employee'
Layer8MConfig.getDateFormat()                   // Returns 'mm/dd/yyyy'
Layer8MConfig.registerModules({...})            // Register module configs
Layer8MConfig.registerReferences({...})         // Register reference picker data
Layer8MConfig.getReferenceConfig('Employee')    // Get reference config for model
```

**Note:** `getConfig()` returns the raw login.json structure. Access app config via `config.app.healthPath`, NOT `config.healthPath`.

## 2. Layer8MAuth

**File:** `l8ui/m/js/layer8m-auth.js`

```js
Layer8MAuth.requireAuth()                      // Returns true if authenticated, redirects otherwise
Layer8MAuth.getUsername()                       // Returns username from sessionStorage
Layer8MAuth.getToken()                         // Returns bearer token
Layer8MAuth.logout()                           // Clears session, redirects to login

// HTTP methods (auto-attach bearer token)
await Layer8MAuth.get(url)                     // GET request, returns parsed JSON
await Layer8MAuth.post(url, data)              // POST request
await Layer8MAuth.put(url, data)               // PUT request
await Layer8MAuth.delete(url)                  // DELETE request
```

## 3. Layer8MUtils

**File:** `l8ui/m/js/layer8m-utils.js`

```js
Layer8MUtils.escapeHtml(text)
Layer8MUtils.formatDate(timestamp)             // Unix seconds -> 'MM/DD/YYYY'
Layer8MUtils.formatDateTime(timestamp)
Layer8MUtils.parseDate(dateString)             // 'MM/DD/YYYY' -> Unix seconds
Layer8MUtils.formatMoney(cents, currency?)     // 150000 -> '$1,500.00'
Layer8MUtils.formatPercentage(decimal)         // 0.75 -> '75.00%'
Layer8MUtils.formatPhone(digits)               // '5551234567' -> '(555) 123-4567'
Layer8MUtils.formatSSN(digits, masked?)
Layer8MUtils.getNestedValue(obj, 'a.b.c')
Layer8MUtils.debounce(fn, ms)
Layer8MUtils.showSuccess(message)              // Toast notification
Layer8MUtils.showError(message)                // Toast notification
```

## 4. Layer8MPopup

**File:** `l8ui/m/js/layer8m-popup.js`
**CSS:** `l8ui/m/css/layer8m-popup.css`

```js
Layer8MPopup.show({
    title: 'Edit Employee',
    content: '<div>...</div>',
    size: 'large',                             // 'small'|'medium'|'large'
    showFooter: true,
    saveButtonText: 'Save',
    cancelButtonText: 'Cancel',
    showCancelButton: true,
    onSave: (popup) => {},                     // popup.body for DOM access
    onShow: (popup) => {}                      // Called after render
});

Layer8MPopup.close()
Layer8MPopup.getBody()                         // Returns body element
```

## 5. Layer8MConfirm

**File:** `l8ui/m/js/layer8m-confirm.js`
**CSS:** `l8ui/m/css/layer8m-confirm.css`

```js
const confirmed = await Layer8MConfirm.confirm({
    title: 'Confirm Action',
    message: 'Are you sure?',
    confirmText: 'Yes',
    cancelText: 'No'
});

const confirmed = await Layer8MConfirm.confirmDelete('Employee Name');
```

## 6. Layer8MTable (Base Table)

**File:** `l8ui/m/js/layer8m-table.js`
**CSS:** `l8ui/m/css/layer8m-table.css`

Card-based mobile table. Renders each row as a card with primary/secondary fields in header and remaining fields in body.

```js
const table = new Layer8MTable('container-id', {
    endpoint: '/erp/30/Employee',
    modelName: 'Employee',
    columns: [
        { key: 'name', label: 'Name', primary: true, sortKey: 'lastName', filterKey: 'lastName' },
        { key: 'status', label: 'Status', secondary: true, sortKey: 'status',
          render: (item) => '<span class="status-badge">Active</span>' }
    ],
    rowsPerPage: 15,
    statusField: 'status',
    transformData: (item) => ({...}),          // Transform raw API data
    onCardClick: (item) => {},
    getItemId: (item) => item.employeeId
});
```

### Column Definition

```js
{
    key: 'fieldName',
    label: 'Display Label',
    primary: true,                             // Shown as card title
    secondary: true,                           // Shown as card subtitle
    sortKey: 'fieldName',                      // L8Query sort field
    filterKey: 'fieldName',                    // L8Query filter field
    enumValues: { 'active': 1 },               // Filter validation
    render: (item) => '<html>'                 // Custom renderer
}
```

### Instance Methods

```js
table.loadData()                               // Fetch from server
table.refresh()                                // Re-fetch current page
table.render(items)                            // Re-render with items
```

## 7. Layer8MEditTable (CRUD Table, extends Layer8MTable)

**File:** `l8ui/m/js/layer8m-edit-table.js`
**CSS:** `l8ui/m/css/layer8m-edit-table.css`

Extends `Layer8MTable` with Add/Edit/Delete buttons and row-level actions.

```js
const table = new Layer8MEditTable('container-id', {
    // All Layer8MTable options plus:
    onAdd: () => {},                           // Add button handler
    addButtonText: 'Add Employee',
    onEdit: (id, item) => {},                  // Edit button on card
    onDelete: (id, item) => {},                // Delete button on card
    onRowClick: (item, id) => {},              // Card tap handler
    getItemId: (item) => item.employeeId
});
```

**Behavior:** If `onAdd` is null, no add button is shown. If `onEdit`/`onDelete` are null, those action buttons are hidden. This is how `readOnly` mode works - just don't pass CRUD callbacks.

## 8. Layer8MForms

**File:** `l8ui/m/js/layer8m-forms.js`
**CSS:** `l8ui/m/css/layer8m-forms.css`

```js
const html = Layer8MForms.renderForm(formDef, data, readonly)
const data = Layer8MForms.getFormData(container)
const errors = Layer8MForms.validateForm(container)
Layer8MForms.showErrors(container, errors)
Layer8MForms.initFormFields(container)         // Init reference pickers, etc.
```

### Form Definition Schema (same as desktop)

```js
{
    title: 'Employee',
    sections: [
        {
            title: 'Personal Info',
            fields: [
                { key: 'firstName', label: 'First Name', type: 'text', required: true },
                { key: 'gender', label: 'Gender', type: 'select', options: { 1: 'Male', 2: 'Female' } },
                { key: 'hireDate', label: 'Hire Date', type: 'date' },
                { key: 'salary', label: 'Salary', type: 'currency' },
                { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' }
            ]
        }
    ]
}
```

### Supported Field Types

`text`, `email`, `tel`, `number`, `textarea`, `date`, `select`, `checkbox`, `currency`, `percentage`, `phone`, `ssn`, `reference`, `url`, `rating`, `hours`, `ein`, `routingNumber`, `colorCode`

### Data Collection Behaviors

| Type | Input Format | Stored Value |
|------|-------------|-------------|
| currency | Dollar amount | Cents (integer) |
| percentage | Percent value | Decimal (0.75) |
| hours | HH:MM | Total minutes |
| date | Calendar picker | Unix timestamp (0 = Current/N/A) |
| reference | Picker | ID value |
| checkbox | Toggle | 1 or 0 |

## 9. Layer8MDatePicker

**File:** `l8ui/m/js/layer8m-datepicker.js`

```js
const picker = Layer8MDatePicker.show({
    value: 1609459200,                         // Initial Unix timestamp
    minDate: 1577836800,
    maxDate: 1735689600,
    title: 'Select Date',
    onSelect: (timestamp, dateStr) => {}       // null for clear
});
```

## 10. Layer8MReferencePicker

**File:** `l8ui/m/js/layer8m-reference-picker.js`

```js
const picker = Layer8MReferencePicker.show({
    endpoint: '/erp/30/Department',
    modelName: 'Department',
    idColumn: 'departmentId',
    displayColumn: 'name',
    displayFormat: (item) => `${item.code} - ${item.name}`,
    selectColumns: ['departmentId', 'name', 'code'],
    pageSize: 15,
    filterDebounceMs: 300,
    currentValue: 'DEPT-001',                  // Pre-select
    onChange: (id, displayValue, item) => {}
});

// Static helpers
Layer8MReferencePicker.getValue(inputElement)   // Get data-ref-id
Layer8MReferencePicker.setValue(input, id, displayValue, item)
Layer8MReferencePicker.getModelConfig('Department') // From Layer8MReferenceRegistry
Layer8MReferencePicker.getEndpointForModel('Department') // From LAYER8M_NAV_CONFIG
```

## 11. Layer8MReferenceRegistry

**File:** `l8ui/m/js/layer8m-reference-registry.js`

Pre-populated with 93 model configs. Each model has:

```js
{
    idColumn: 'employeeId',
    displayColumn: 'lastName',
    selectColumns: ['employeeId', 'firstName', 'lastName'],
    displayFormat: (item) => `${item.lastName}, ${item.firstName}`,
    displayLabel: 'Employee'
}
```

## 12. Layer8MRenderers

**File:** `l8ui/m/js/layer8m-renderers.js`

```js
Layer8MRenderers.renderEnum(value, enumMap)
Layer8MRenderers.renderBoolean(value, { trueText, falseText })
Layer8MRenderers.renderDate(timestamp)
Layer8MRenderers.renderMoney(cents, currency?)
Layer8MRenderers.renderPercentage(decimal)
Layer8MRenderers.renderPhone(digits)
Layer8MRenderers.renderSSN(digits)
Layer8MRenderers.renderHours(hours)
Layer8MRenderers.renderPeriod({ startDate, endDate })
Layer8MRenderers.renderRating(value, max?)
Layer8MRenderers.renderProgress(value)
Layer8MRenderers.renderPriority(value, priorityMap)
Layer8MRenderers.renderEmployeeName({ firstName, lastName })
Layer8MRenderers.renderMinutes(minutes)
Layer8MRenderers.renderCount(filled, total)
Layer8MRenderers.createStatusRenderer(enumMap, classMap)  // Returns renderer function
```

## 13. LAYER8M_NAV_CONFIG

**File:** `l8ui/m/js/layer8m-nav-config.js`

Navigation hierarchy configuration:

```js
window.LAYER8M_NAV_CONFIG = {
    modules: [                                 // Level 1: Module cards on home
        { key: 'hcm', label: 'Human Capital', icon: 'hcm', hasSubModules: true },
        { key: 'system', label: 'System', icon: 'system', hasSubModules: true }
    ],

    hcm: {                                     // Level 2-3: Module config
        subModules: [
            { key: 'core-hr', label: 'Core HR', icon: 'employees' }
        ],
        services: {
            'core-hr': [                       // Level 3: Services
                { key: 'employees', label: 'Employees', icon: 'employees',
                  endpoint: '/30/Employee', model: 'Employee', idField: 'employeeId' },
                { key: 'health-monitor', label: 'Health', icon: 'health',
                  endpoint: '/0/Health', model: 'L8Health', idField: 'service',
                  readOnly: true }             // No CRUD for read-only services
            ]
        }
    },

    icons: { 'hcm': '<svg>...</svg>' },        // SVG icon library
    getIcon(key)                                // Returns SVG string
};
```

## 14. Layer8MNav

**File:** `l8ui/m/js/layer8m-nav.js`

```js
Layer8MNav.showHome()                          // Show module cards grid
Layer8MNav.navigateToModule('hcm')             // Show sub-module cards
Layer8MNav.navigateToSubModule('hcm', 'core-hr')  // Show service cards
Layer8MNav.navigateToService('hcm', 'core-hr', 'employees')  // Show data table
Layer8MNav.navigateBack()                      // Pop nav stack
Layer8MNav.getCurrentState()                   // { level, module, subModule, service }
Layer8MNav.isHome()                            // Boolean
```

### Module Registry Lookup

`Layer8MNav` looks up columns, forms, and transforms from registered module objects:

```js
// Checked in order:
[window.MobileHCM, window.MobileFIN, window.MobileSCM, window.MobileSYS]
```

Each registry must provide:
```js
window.MobileXXX = {
    getColumns(modelName)      // Returns column array or null
    getFormDef(modelName)      // Returns form definition or null
    getTransformData(modelName) // Returns transform function or null (optional)
}
```
