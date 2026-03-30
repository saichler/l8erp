# Plan: User Portal Routing

## Context

Currently, after login all users are redirected to the same destination: `/app.html` (desktop) or `/m/app.html` (mobile). The redirect URL is hardcoded in `login.json` and the `getRedirectUrl()` function in `layer8d-login-auth.js` only distinguishes desktop vs mobile.

Different user roles should land on different portals/apps. For example:
- **Admin/Operator** → Full ERP admin UI (`app.html`)
- **Employee/Viewer** → Self-Managed Employee Portal (`employee.html`)
- **Customer** → Customer Portal (`customer.html`)

This requires changes across three layers:
1. **l8secure** (upstream) — Add L8Portal Prime Object, add portal suffix to L8User and L8Token
2. **l8web** (upstream) — Include portal suffix in auth response
3. **l8erp** (and all L8 projects) — Login JS reads portal suffix from auth response and redirects accordingly

---

## Design Decisions

### L8Portal as a Prime Object, not an enum

Portals are data, not code. An enum would require a proto change and rebuild every time a new portal is added. A Prime Object with its own service allows admins to define portals at runtime via the SYS UI — add a new portal, assign it to users, no code changes needed.

### L8Portal stores a map of path suffix → description

The L8Portal entity holds a `map<string, string>` of HTTP path suffixes (e.g. `"app.html"` → `"Full ERP Admin"`, `"employee.html"` → `"Employee Self-Service"`). This serves as the system's registry of all available portals. The map acts as both a validation set (only registered suffixes can be assigned to users) and a display catalog (the UI shows descriptions when selecting a portal).

### L8User stores the path suffix directly

`L8User.portal` is a `string` containing the HTTP path suffix (e.g. `"app.html"`, `"employee.html"`). This is the actual routing value — the login flow appends it to the base URL. No enum lookup, no indirection. Simple and direct.

### Mobile detection remains client-side

Each portal has desktop and mobile variants (e.g. `app.html` / `m/app.html`). The client-side mobile detection in `getRedirectUrl()` continues to handle this — the server returns the suffix, the client prepends `/m/` for mobile devices.

---

## Phase 1: Proto Changes (l8secure)

### 1.1 Add L8Portal message to `l8secure/proto/secure.proto`

```protobuf
message L8Portal {
  string portal_id = 1;                   // Primary key (e.g. "default", "employee", "customer")
  map<string, string> portals = 2;        // HTTP path suffix → description (e.g. "app.html" → "Full ERP Admin")
}

message L8PortalList {
  repeated L8Portal list = 1;
  l8api.L8MetaData metadata = 2;
}
```

The `portals` map on L8Portal serves as the registry of all valid portal suffixes. A typical deployment would have a single L8Portal record (e.g. `portal_id = "default"`) containing all available portals:

```json
{
  "portalId": "default",
  "portals": {
    "app.html": "Full ERP Admin",
    "employee.html": "Employee Self-Service",
    "customer.html": "Customer Portal",
    "vendor.html": "Vendor Portal"
  }
}
```

### 1.2 Add `portal` field to L8User

Add after `lockout_until` (field 17):
```protobuf
string portal = 18;    // HTTP path suffix for post-login redirect (e.g. "app.html", "employee.html")
```

### 1.3 Add `portal` field to L8Token

Add after `tfa_verified` (field 7):
```protobuf
string portal = 8;     // HTTP path suffix copied from user on auth
```

### 1.4 Regenerate l8secure protobuf bindings

```bash
cd ../l8secure/proto && ./make-bindings.sh
```

---

## Phase 2: L8Portal Service (l8secure)

### 2.1 New service for L8Portal

Create a service in l8secure for L8Portal CRUD:

- **ServiceName**: `"L8Portal"` (8 chars, under limit)
- **ServiceArea**: Same area as the existing user/role/token services (72-76 range — use the next available, e.g. 77)
- **PrimaryKey**: `"PortalId"`
- **Callback**: Validate that `portal_id` is required. No special business logic needed — this is a configuration entity.

The service allows admins to manage the portal registry (add/remove portal suffixes and their descriptions) via the SYS UI.

### 2.2 Copy portal to token on authentication

In `l8secure/go/secure/provider/UserService.go`, in the `newToken()` function (or wherever the L8Token is populated after successful authentication), copy the user's portal to the token:

```go
token.Portal = user.Portal
```

If `user.Portal` is empty, it stays empty — the client treats empty as `"app.html"` (backward compatible default).

---

## Phase 3: Web Auth Response (l8web)

### 3.1 Include portal in AuthToken JSON response

In `l8types/proto/api.proto`, add a portal field to the AuthToken message:

```protobuf
message AuthToken {
    string token = 1;
    string error = 2;
    bool setup_tfa = 3;
    bool need_tfa = 4;
    string token_hash = 5;
    string portal = 6;     // HTTP path suffix from authenticated user
}
```

In `l8web/go/web/server/WebService.go`, the `Auth()` handler sets `authToken.Portal` from the resolved L8Token's portal value after successful authentication.

### 3.2 Vendor update in l8erp (and all L8 projects)

After l8secure, l8types, and l8web are updated:

```bash
cd go && rm -rf go.sum go.mod vendor && go mod init && GOPROXY=direct GOPRIVATE=github.com go mod tidy && go mod vendor
```

---

## Phase 4: Login JS Changes (l8ui — shared)

### 4.1 Update `layer8d-login-auth.js`

After successful authentication, read the portal suffix from the auth response and use it as the redirect target:

```javascript
// In the auth success handler, after receiving the token:
const portalSuffix = result.portal || '';
sessionStorage.setItem('userPortal', portalSuffix);

function getPortalRedirectUrl(portalSuffix) {
    // Default to app.html if no portal assigned
    const suffix = portalSuffix || 'app.html';

    // Apply mobile detection — prepend /m/ for mobile devices
    if (isMobileDevice()) {
        return '/m/' + suffix;
    }
    return '/' + suffix;
}
```

Replace the current `getRedirectUrl()` to use `getPortalRedirectUrl(portalSuffix)` when a portal value is present in the auth response. Fall back to the existing `login.json` `redirectUrl` behavior when portal is empty (backward compatibility with projects that haven't added portal support).

### 4.2 No portalMap config needed

Since the portal suffix IS the path, there's no need for a client-side mapping table. The suffix from the server is used directly. This eliminates the need for `portalMap` in `login.json`.

---

## Phase 5: SYS Portal Management UI

### 5.1 L8Portal CRUD in SYS Security tab

Add a "Portals" sub-section to the SYS Security tab (alongside Users, Roles, Credentials):

- **Table**: Lists L8Portal records with `portalId` column
- **Detail/Edit form**: Shows the `portals` map as an editable key-value table:
  - Column 1: "Path Suffix" (e.g. `app.html`)
  - Column 2: "Description" (e.g. `Full ERP Admin`)
  - Add/Remove row buttons

### 5.2 Add portal field to user forms

In the SYS user management forms (both desktop `l8security-users-crud.js` and mobile `sys-forms.js`), add a `portal` field:

- **Type**: Select dropdown (or reference picker)
- **Label**: "Portal"
- **Options**: Populated from the L8Portal record's `portals` map keys — each option shows `suffix (description)` format
- **Value**: The selected path suffix string (e.g. `"app.html"`)
- **Placed after** `accountStatus` in the User Information section
- **Default**: Empty (treated as `"app.html"` by login JS)

### 5.3 Add portal column to user table

In `sys-columns.js`, add a `portal` column displaying the path suffix.

---

## Phase 6: End-to-End Verification

1. Regenerate l8secure proto bindings — verify L8Portal, L8PortalList structs exist
2. Verify L8Portal service activates and handles CRUD
3. Update l8web to include portal in auth response
4. Vendor refresh in l8erp
5. `cd go && go build ./...` — verify compilation
6. Verify L8User struct has `Portal string` field in vendored `.pb.go`
7. Verify L8Token struct has `Portal string` field
8. Verify AuthToken response includes `portal` string field
9. Verify login JS reads portal suffix and redirects to `/<suffix>` (desktop) or `/m/<suffix>` (mobile)
10. Verify SYS Portals sub-section shows portal registry
11. Verify SYS user form shows portal dropdown populated from L8Portal data
12. Verify backward compatibility: user with empty portal still lands on `app.html`

---

## Traceability Matrix

| # | Gap | Phase |
|---|-----|-------|
| 1 | No L8Portal Prime Object | Phase 1.1 |
| 2 | L8User has no portal field | Phase 1.2 |
| 3 | L8Token has no portal field | Phase 1.3 |
| 4 | No L8Portal service | Phase 2.1 |
| 5 | Auth doesn't copy portal to token | Phase 2.2 |
| 6 | AuthToken response has no portal | Phase 3.1 |
| 7 | Login JS doesn't read portal for redirect | Phase 4.1 |
| 8 | No portal management UI | Phase 5.1 |
| 9 | SYS user form has no portal field | Phase 5.2 |
| 10 | SYS user table has no portal column | Phase 5.3 |
| 11 | Vendor refresh needed in l8erp | Phase 3.2 |

---

## Key Files to Modify/Create

### Upstream (l8secure)
| File | Action |
|------|--------|
| `l8secure/proto/secure.proto` | Add L8Portal message, L8PortalList, portal field on L8User + L8Token |
| `l8secure/go/secure/provider/PortalService.go` | **New** — L8Portal service (CRUD) |
| `l8secure/go/secure/provider/PortalServiceCallback.go` | **New** — Validate portalId required |
| `l8secure/go/secure/provider/UserService.go` | Copy user.Portal to token on auth |

### Upstream (l8types)
| File | Action |
|------|--------|
| `l8types/proto/api.proto` | Add `string portal = 6` to AuthToken |

### Upstream (l8web)
| File | Action |
|------|--------|
| `l8web/go/web/server/WebService.go` | Set portal in auth response from L8Token |

### Shared UI (l8ui)
| File | Action |
|------|--------|
| `l8ui/login/layer8d-login-auth.js` | Read portal suffix, build redirect URL |
| `l8ui/sys/security/l8security-users-crud.js` | Add portal dropdown to user form, fetch options from L8Portal |
| `l8ui/sys/l8sys-config.js` | Add L8Portal service config |
| `l8ui/sys/security/l8security-portals-crud.js` | **New** — Portal management UI (map editor) |

### This Repo (l8erp)
| File | Action |
|------|--------|
| `go/vendor/` | Vendor refresh after upstream changes |
| `go/erp/ui/web/m/js/sys/sys-forms.js` | Add portal field to mobile user form |
| `go/erp/ui/web/m/js/sys/sys-columns.js` | Add portal column to mobile user table |

---

## Backward Compatibility

- Empty `portal` string on L8User behaves exactly like today — redirect to `/app.html`
- Projects that haven't created an L8Portal record still work — login JS defaults to `app.html`
- Existing users without a portal field land on admin portal (zero-value empty string → default)
- No changes to L8Rule or authorization — portal routing is independent of access control
- The portal HTML files don't need to exist yet — the routing infrastructure is in place for when they're created

---

## Future: Self-Managed Employee Portal

When the Employee Portal is built, an admin would:
1. Add `"employee.html" → "Employee Self-Service"` to the L8Portal record (if not already there)
2. Create `employee.html` and `m/employee.html` with the employee-specific UI
3. Assign `portal = "employee.html"` to employee users via the SYS user form
4. Those users will be redirected to `employee.html` after login automatically

No code changes needed — just data configuration and the new HTML files.
