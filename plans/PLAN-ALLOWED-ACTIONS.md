# Plan: AllowedActions — Per-Type Action Permissions for UI

## Problem

The UI edit table always shows Add/Edit/Delete buttons regardless of the user's role permissions. If a user has GET-only access to a type, they see the buttons but get permission errors when clicking them. The backend has all the permission data; the UI just doesn't consume it.

## Current State

### Backend (l8secure)
- `aaa.go` has a pre-computed permission index: `role_id → elem_type → action → allowed`
- `allowedTypes(aaaid, typeNames) []string` — returns types where user has GET access (boolean only)
- `canDoAction(vnic, action, typeName, alias, aaaid) error` — checks a single type+action
- `ISecurityProvider.AllowedTypes(vnic, aaaid) []string` — exposed on the interface (line 51 of `Security.go`)

### UI
- `Layer8DServiceRegistry.initializeServiceTable()` checks `service.readOnly` to decide whether to pass `onAdd`/`onEdit`/`onDelete` callbacks
- `Layer8DModuleFilter` hides modules by admin-configured disabled paths — no role awareness

## Proposed Solution

### Phase 1: Backend — Add `AllowedActions` to AAA

**File: `l8secure/go/secure/provider/aaa.go`**

Add `allowedActions()` method on `AAA`:

```go
// allowedActions returns a map of type_name → allowed actions for the user.
// Only types with at least one allowed action are included.
// Actions: 1=POST, 2=PUT, 3=PATCH, 4=DELETE, 5=GET
func (aaa *AAA) allowedActions(aaaid string, typeNames []string) map[string][]int32 {
    // Same token/user lookup as allowedTypes
    // For each type, check each action (GET/POST/PUT/PATCH/DELETE)
    // using the same deny-before-allow logic as canDoAction
    // Return map: typeName → []int32 of allowed action codes
}
```

**File: `l8secure/go/secure/provider/AllowedActions.go`** (new)

Expose on `_securityProvider`:

```go
func (this *_securityProvider) AllowedActions(vnic ifs.IVNic, aaaid string) map[string][]int32 {
    // Same pattern as AllowedTypes.go:
    // 1. Validate aaaid
    // 2. Collect all registered type names from introspector
    // 3. Call this.aaa.allowedActions(aaaid, typeNames)
}
```

### Phase 2: Interface — Add to `ISecurityProvider`

**File: `l8types/go/ifs/Security.go`**

Add to the interface:

```go
AllowedActions(IVNic, string) map[string][]int32
```

### Phase 3: Wire — Expose via Web Service Endpoint

The UI needs to fetch the allowed actions on login. Options:

**Option A**: Add a dedicated endpoint (e.g., GET `/0/Permissions`) that returns the map.

**Option B**: Piggyback on the login response — after successful authentication, include the allowed actions in the token response.

**Option C**: Piggyback on `AllowedTypes` — change it to return actions instead of just type names. This would be a breaking change.

**Recommended: Option A** — cleanest separation, no breaking changes. The UI calls it once on login and caches the result.

### Phase 4: UI — Consume Allowed Actions

**On login** (in `app.js` / `app-core.js`):
1. After successful authentication, fetch `/0/Permissions`
2. Store the result in a global (e.g., `window.Layer8DPermissions`)

**In service registry** (`layer8d-service-registry.js`):
1. Before passing `onAdd`/`onEdit`/`onDelete`, check if the user has POST/PUT/DELETE permission for `service.model`
2. If not permitted, pass `null` for that callback (same as `readOnly: true` does today)

```javascript
const perms = window.Layer8DPermissions || {};
const typePerms = perms[service.model] || [];
const canCreate = typePerms.includes(1); // POST
const canUpdate = typePerms.includes(2); // PUT
const canDelete = typePerms.includes(4); // DELETE

const viewOptions = {
    onAdd: (isReadOnly || !canCreate) ? null : () => moduleNS._openAddModal(service),
    onEdit: (isReadOnly || !canUpdate) ? null : (id) => moduleNS._openEditModal(service, id),
    onDelete: (isReadOnly || !canDelete) ? null : (id) => moduleNS._confirmDeleteItem(service, id),
};
```

**Mobile parity**: Same logic in `m/sections/system.html` `loadSecurityService()` and any mobile table initialization.

## Traceability Matrix

| # | Gap | Phase |
|---|-----|-------|
| 1 | No `allowedActions` function in AAA | Phase 1 |
| 2 | `ISecurityProvider` interface lacks `AllowedActions` | Phase 2 |
| 3 | No API endpoint to fetch per-type action permissions | Phase 3 |
| 4 | UI edit tables don't check user permissions for Add/Edit/Delete | Phase 4 |
| 5 | Mobile edit tables don't check user permissions | Phase 4 |

## Phase 5: End-to-End Verification

1. Login as `erp-admin` — all Add/Edit/Delete buttons visible on all modules
2. Login as `hr-clerk` — Add/Edit/Delete visible on allowed HCM types, hidden on sensitive types
3. Login as `bi-analyst` — Add/Edit/Delete visible on BI types, hidden on all other modules (read-only)
4. Login as `compliance-officer` — Add/Edit/Delete visible on COMP + EventRecord, hidden elsewhere
5. Verify on both desktop and mobile

## Dependencies

- Phase 2 requires a change to `l8types` (the `ISecurityProvider` interface) — this is a shared dependency across all Layer 8 projects. After changing the interface, all implementations must be updated.
- Phase 3 requires a web service endpoint — needs to be registered in the UI server or as a system service.

## Estimated Scope

- Phase 1: ~40 lines in aaa.go + ~20 lines new file
- Phase 2: 1 line in interface
- Phase 3: ~30 lines for endpoint registration + handler
- Phase 4: ~15 lines in service registry + ~10 lines mobile
