# Layer8 Generic UI Component Libraries - Overview

## Architecture

The Layer8 ERP uses two UI component libraries sharing the same backend API:
- **Desktop** (`l8ui/`) - `Layer8D*` prefix, traditional table-based layout
- **Mobile** (`l8ui/m/`) - `Layer8M*` prefix, card-based responsive layout

Both follow a **configuration-driven module pattern**: all behavioral logic lives in shared library components, and modules supply only data (configs, enums, columns, forms).

## Configuration: `login.json`

```json
{
    "login": {
        "appTitle": "ERP by Layer 8",
        "authEndpoint": "/auth",
        "redirectUrl": "/app.html",
        "sessionTimeout": 30,
        "tfaEnabled": true
    },
    "app": {
        "dateFormat": "mm/dd/yyyy",
        "apiPrefix": "/erp",
        "healthPath": "/0/Health"
    }
}
```

Both `Layer8DConfig` and `Layer8MConfig` load this file. The critical function is `resolveEndpoint(path)` which prepends `apiPrefix`. Example: `/30/Employee` becomes `/erp/30/Employee`.

## L8Query - Server-Side Query Language

All table components use L8Query for server-side operations:

```
select * from Employee where lastName=Smith limit 10 page 0 sort-by lastName
select * from Employee where lastName=Smith limit 10 page 0 sort-by lastName descending
select employeeId,lastName from Employee where departmentId=D001 limit 15 page 2
```

## File Location Reference

| Area | Desktop Path | Mobile Path |
|------|-------------|-------------|
| Generic Components | `l8ui/` | `l8ui/m/` |
| App HTML | `app.html` | `m/app.html` |
| App JS | `js/app.js`, `js/sections.js` | `m/js/app-core.js` |
| Config | `login.json` (shared) | `login.json` (shared) |
| Module Configs | `l8ui/hcm/`, `l8ui/fin/`, `l8ui/scm/`, `l8ui/sys/` | `m/js/hcm/`, `m/js/fin/`, `m/js/scm/`, `m/js/sys/` |
| Section HTML | `sections/*.html` | `m/sections/*.html` |

## Component Dependency Graph (Desktop)

```
Layer8DConfig
    |
Layer8DUtils  <----- Layer8DRenderers
    |
    +--- Layer8DTable (class)
    +--- Layer8DDatePicker
    +--- Layer8DInputFormatter
    +--- Layer8DReferencePicker
    +--- Layer8DNotification (independent)
    +--- Layer8DPopup
    +--- Layer8DForms (uses all above)
    +--- Layer8DReferenceRegistry
    +--- Layer8DServiceRegistry (uses Table, Config)
    +--- Layer8DModuleNavigation (uses ServiceRegistry)
    +--- Layer8DModuleCRUD (uses Utils, ServiceRegistry, Config, Popup, Notification, Forms)
    +--- Layer8DModuleFactory (orchestrates all)
```

## Component Dependency Graph (Mobile)

```
Layer8MConfig
    |
Layer8MAuth
Layer8MUtils
    |
    +--- Layer8MPopup
    +--- Layer8MConfirm (uses Popup)
    +--- Layer8MTable (class)
    +--- Layer8MEditTable (extends Table)
    +--- Layer8MFormFields
    +--- Layer8MForms (uses FormFields, ReferencePicker)
    +--- Layer8MDatePicker (uses Popup)
    +--- Layer8MReferenceRegistry
    +--- Layer8MReferencePicker (uses Popup, Auth, Registry)
    +--- Layer8MRenderers (uses Utils)
    +--- LAYER8M_NAV_CONFIG (data only)
    +--- Layer8MNav (uses all above)
```

## Desktop vs. Mobile Comparison

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| Config loader | `Layer8DConfig` | `Layer8MConfig` |
| Navigation | Sidebar + tabs + sub-nav | Card drill-down with back stack |
| Table | `Layer8DTable` (rows) | `Layer8MEditTable` (cards) |
| Forms | `Layer8DForms` via `Layer8DPopup` | `Layer8MForms` via `Layer8MPopup` |
| CRUD | `Layer8DModuleCRUD.attach()` | `Layer8MNav._openServiceForm()` |
| Module init | `Layer8DModuleFactory.create({...})` | Module registry + nav config |
| Auth token | `sessionStorage.bearerToken` | `sessionStorage.bearerToken` |
