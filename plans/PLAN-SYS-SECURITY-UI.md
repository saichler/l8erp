# Plan: Add Security Components to ERP System Section

Copy Users, Roles & Credentials from problerweb into the ERP System section, adapted to use ERP generic components (L8Table server-side, ERPPopup, ERPForms, ERPNotification).

## Endpoints (confirmed)
- Users: `/erp/73/users` (model: `L8User`, primaryKey: `userId`)
- Roles: `/erp/74/roles` (model: `L8Role`, primaryKey: `roleId`)
- Credentials: `/erp/75/Creds` (model: `L8Credentials`, primaryKey: `id`)

## Key Design Decision: Custom CRUD Overrides

The standard `ERPModuleCRUD` and `ERPForms` handle flat entities. Users/Roles/Credentials have **nested data** (roles map in users, rules map in roles, creds map in credentials). Solution:

1. Use standard `ERPModuleFactory.create()` for navigation, table display, and service registry.
2. After factory creation in `sys-init.js`, override `SYS._openAddModal`, `SYS._openEditModal`, and `SYS._confirmDeleteItem` to route to custom CRUD handlers per model.
3. Custom handlers use `ERPPopup.show()` directly (supports modal stacking for nested modals), `ERPForms.fetchRecord/saveRecord/deleteRecord` for API calls, and `ERPPopup.updateContent()` to refresh parent modal when nested items change.

## Files to Create

### Module Structure (`go/erp/ui/web/sys/`)

| File | Purpose | ~Lines |
|---|---|---|
| `sys/sys-config.js` | `window.SYS` namespace, modules map (security with 3 services), submodules | 40 |
| `sys/security/security-enums.js` | `window.Security` namespace, ACTION_NAMES/ACTION_CODES maps | 40 |
| `sys/security/security-columns.js` | `Security.columns` for L8User, L8Role, L8Credentials tables | 70 |
| `sys/security/security-forms.js` | `Security.forms` (minimal, for details view), `Security.primaryKeys` | 50 |
| `sys/security/security.js` | Submodule entry point verifier | 25 |
| `sys/security/security-users-crud.js` | Custom CRUD: fetch roles, render checkboxes, save user with roles map | 250 |
| `sys/security/security-roles-crud.js` | Custom CRUD: nested rule editor modal (actions/attributes), registry types dropdown | 400 |
| `sys/security/security-credentials-crud.js` | Custom CRUD: nested cred-item editor modal, password show/hide toggle | 350 |
| `sys/sys-init.js` | `ERPModuleFactory.create()` + CRUD method overrides per model | 50 |
| `sys/sys.css` | Nested table, checkbox list, password toggle, rule/kv-row styles | 80 |

### Section HTML

| File | Purpose |
|---|---|
| `sections/system.html` | Replace placeholder with module tabs (Security) + subnav (Users, Roles, Credentials) + table containers |

## Files to Modify

| File | Change |
|---|---|
| `js/sections.js` | Add `system: () => { if (typeof initializeSYS === 'function') initializeSYS(); }` to `sectionInitializers` |
| `shared/erp-forms.js` | Line 559: Add `'SYS'` to namespaces array: `['HCM', 'FIN', 'SCM', 'SYS']` |
| `app.html` | Add `<link>` for `sys/sys.css` + 9 `<script>` tags for all SYS files (after SCM block) |

## Column Definitions

**L8User**: userId (ID, sortable, filterable), fullName (sortable, filterable), roles (custom render: filter active role IDs, render as `erp-tag` spans)

**L8Role**: roleId (ID), roleName, rules count (custom render: `Object.keys(rules).length`)

**L8Credentials**: id (ID), name, items count (custom render: `Object.keys(creds).length`)

## Custom CRUD Handler Design

### Users (`security-users-crud.js`)
- `openAdd(service)`: Fetch all roles from `/erp/74/roles`, render form with userId + fullName + password + role checkboxes. Save via POST with `{ userId, fullName, password: { hash }, roles: { roleId: true } }`.
- `openEdit(service, userId)`: Fetch user via `ERPForms.fetchRecord()`, fetch roles, render form (userId disabled, no password field), pre-check assigned roles. Save via PUT.
- `confirmDelete(service, userId)`: Delegate to `ERPForms.confirmDelete()`.

### Roles (`security-roles-crud.js`)
- Maintains `tempRules[]` array during editing.
- `openAdd/openEdit(service)`: Render role form (roleId, roleName) + rules list with Add Rule / Edit / Remove buttons.
- **Rule Modal (stacked)**: Opens via `ERPPopup.show()` on top of role modal. Fields: ruleId, elemType (dropdown from registry), allowed (Allow/Deny select), actions (add/remove key-value rows), attributes (add/remove key-value rows).
- On rule save: update `tempRules[]`, close rule modal, call `ERPPopup.updateContent()` on parent to refresh rules list (preserving roleId/roleName values).
- On role save: build `rules` map from `tempRules[]`, POST/PUT entire role object.
- **Event delegation**: Buttons use `data-action`/`data-index` attributes; single click listener attached via `onShow`.

### Credentials (`security-credentials-crud.js`)
- Maintains `tempCredItems[]` array during editing.
- `openAdd/openEdit(service)`: Render credentials form (id, name) + items table with Add/Edit/Delete buttons.
- **Item Modal (stacked)**: Fields: key, aside (password), yside (password), zside (password). Show/Hide toggle buttons change `input.type` between password/text.
- Items table shows masked values (`********`).
- On item save: update `tempCredItems[]`, close item modal, refresh parent via `ERPPopup.updateContent()`.
- On credentials save: convert `tempCredItems[]` to map `{ key: { aside, yside, zside } }`, POST/PUT.
- Conversion helpers: `credsMapToArray()` / `credsArrayToMap()`.

## system.html Structure

```
section-container hcm-section
  hcm-header-frame parallax-container (SVG with lock/shield theme)
  hcm-module-tabs
    button[data-module="security"] "Security"
  section-content
    hcm-module-content[data-module="security"]
      hcm-subnav
        a[data-service="users"] "Users"
        a[data-service="roles"] "Roles"
        a[data-service="credentials"] "Credentials"
      hcm-service-content
        hcm-service-view[data-service="users"]
          div#security-users-table-container
        hcm-service-view[data-service="roles"]
          div#security-roles-table-container
        hcm-service-view[data-service="credentials"]
          div#security-credentials-table-container
  <script>initializeSYS()</script>
```

Note: Reuses `hcm-*` CSS classes for layout consistency (same as FIN and SCM modules).

## Script Load Order in app.html

After SCM block, add:
```
sys/sys-config.js           -> window.SYS
sys/security/security-enums.js     -> window.Security.enums
sys/security/security-columns.js   -> Security.columns
sys/security/security-forms.js     -> Security.forms, Security.primaryKeys
sys/security/security.js           -> validates Security namespace
sys/security/security-users-crud.js       -> window.SYSUsersCRUD
sys/security/security-roles-crud.js       -> window.SYSRolesCRUD
sys/security/security-credentials-crud.js -> window.SYSCredentialsCRUD
sys/sys-init.js             -> ERPModuleFactory.create() + CRUD overrides
```

## Implementation Sequence

1. Create `sys/sys-config.js`
2. Create `sys/security/security-enums.js`
3. Create `sys/security/security-columns.js`
4. Create `sys/security/security-forms.js`
5. Create `sys/security/security.js`
6. Create `sys/sys.css`
7. Create `sys/security/security-users-crud.js`
8. Create `sys/security/security-roles-crud.js`
9. Create `sys/security/security-credentials-crud.js`
10. Create `sys/sys-init.js`
11. Replace `sections/system.html`
12. Modify `js/sections.js`
13. Modify `shared/erp-forms.js` (add 'SYS' to namespaces)
14. Modify `app.html` (add CSS + scripts)

## Verification

1. Open the ERP app in browser, click "System" in sidebar
2. Verify the Security tab appears with Users/Roles/Credentials subnav
3. Verify each subnav loads an L8Table with correct columns
4. Test Add User: form shows userId, fullName, password, role checkboxes
5. Test Add Role: form shows roleId, roleName, Add Rule button; clicking Add Rule opens stacked modal with ruleId, elemType, actions, attributes
6. Test Add Credentials: form shows id, name, Add Item button; clicking Add Item opens stacked modal with key, aside/yside/zside password fields
7. Test Edit/Delete for all three entities
8. Verify the tables refresh after save/delete operations

## Reference Files

| Source (problerweb) | Purpose |
|---|---|
| `problerweb/users/users.js` | User CRUD logic, form generation, role checkboxes |
| `problerweb/roles/roles.js` | Role CRUD logic, nested rules modal chain |
| `problerweb/credentials/credentials.js` | Credentials CRUD logic, nested items modal chain |

| Target Pattern (ERP) | Purpose |
|---|---|
| `go/erp/ui/web/hcm/hcm-config.js` | Module config pattern to follow |
| `go/erp/ui/web/hcm/hcm-init.js` | Module init pattern to follow |
| `go/erp/ui/web/hcm/core-hr/core-hr-columns.js` | Column definition pattern |
| `go/erp/ui/web/hcm/core-hr/core-hr-forms.js` | Form definition pattern |
| `go/erp/ui/web/shared/erp-module-factory.js` | Factory bootstrap (CRUD override hook point) |
| `go/erp/ui/web/popup/popup.js` | ERPPopup API (show, close, updateContent, getBody) |
| `go/erp/ui/web/shared/erp-forms.js` | fetchRecord/saveRecord/deleteRecord + namespaces array |
