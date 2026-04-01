# Plan: Post-Login Portal Switcher

## Summary

Add a portal switcher to the header of every portal, allowing users to switch between available portals without logging out. The bearer token in `sessionStorage` is shared across all portals on the same origin, so switching is just a page navigation — no re-authentication required.

## Current Architecture

### Portal Routing Flow
1. User logs in via `POST /auth`
2. Backend `ISecurityProvider.Authenticate()` returns `(token, hash, needsTFA, setupTFA, portal, error)`
3. `AuthToken.Portal` is set to the user's default portal (e.g., `"ess.html"`, `"app.html"`)
4. Frontend `getRedirectUrl(portalSuffix)` navigates to `/<portal>` (with mobile detection)

### Existing Portals
| Portal | Path | Description |
|--------|------|-------------|
| Desktop ERP | `/app.html` | Full admin/manager portal (14 modules) |
| ESS | `/ess.html` | Employee Self-Service (7 sections) |
| Mobile ERP | `/m/app.html` | Mobile admin portal |

### Existing Data Model
- **`L8User.portal`** — string field storing the user's default portal (e.g., `"ess.html"`)
- **`L8Portal`** — registry at `/77/L8Portal` with `portalId` and `portals` (map of path → display name)
- **`AuthToken.Portal`** — single string returned from auth

### Key Files
| File | Role |
|------|------|
| `l8ui/login/layer8d-login-auth.js` | Auth flow, redirect, stores `userPortal` in sessionStorage |
| `vendor/.../l8web/.../WebService.go` | Backend `/auth` handler, returns `AuthToken` |
| `vendor/.../l8types/.../ifs/Security.go` | `ISecurityProvider.Authenticate()` signature |
| `vendor/.../l8types/.../l8api/api.pb.go` | `AuthToken` protobuf (has `Portal` field) |
| `app.html` | Desktop header: `.header-right > .user-menu` |
| `ess.html` | ESS header: `.ess-header-right` |
| `js/app.js` | Desktop init, sets `.username` text |
| `ess/ess-app.js` | ESS init, sets `.ess-username` text |

## Design

### Approach: Fetch Available Portals Client-Side

After login, each portal's init code fetches `GET /erp/77/L8Portal` to get the portal registry. This registry contains a map of portal paths → display names. The switcher renders all entries from this map, highlighting the current portal.

**Why client-side fetch instead of extending AuthToken:**
- No backend proto changes needed (AuthToken stays unchanged)
- L8Portal data already exists at `/77/L8Portal`
- The portal list rarely changes — fetch once on init
- Avoids modifying the `ISecurityProvider` interface (which lives in the framework, not this project)

### Portal Switcher Component

A small shared component `Layer8DPortalSwitcher` that:
1. Fetches portal registry from `/erp/77/L8Portal`
2. Determines current portal from `window.location.pathname`
3. Renders a dropdown/icon in the header showing available portals
4. On click, navigates via `window.location.href` (bearer token persists in sessionStorage)

### Visual Design

Place the switcher in the header-right area, between the "Powered by" branding and the user menu. It appears as a small grid/portal icon with a dropdown on click:

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] ERP by Layer 8          Powered by L8  [⊞] Admin Logout │
│                                               ↓                │
│                                      ┌────────────────┐        │
│                                      │ ● ERP Dashboard │        │
│                                      │   Employee ESS  │        │
│                                      └────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

The current portal has a bullet indicator. Other portals are clickable links.

## Implementation Phases

### Phase 1: Portal Switcher Component (l8ui shared)

**File:** `erp/ui/web/l8ui/shared/layer8d-portal-switcher.js` (new, ~120 lines)

```javascript
// Layer8DPortalSwitcher
// Fetches L8Portal registry and renders a portal dropdown in the header.
//
// Usage:
//   Layer8DPortalSwitcher.init({
//       container: document.querySelector('.header-right'),  // where to insert
//       insertBefore: document.querySelector('.user-menu'),  // insert before this element
//       apiPrefix: '/erp',                                   // from login.json
//       currentPath: window.location.pathname                // e.g., '/app.html'
//   });
```

**Behavior:**
1. `init(config)` — fetches `GET {apiPrefix}/77/L8Portal?body=...` (L8Query: `select * from L8Portal`)
2. Extracts the `portals` map from the first L8Portal record
3. If only 1 portal (or 0), does not render (no switching needed)
4. Creates a button with a grid icon (SVG, no emoji)
5. On click, toggles a dropdown listing all portals
6. Current portal is highlighted (based on `currentPath`)
7. Clicking another portal: `window.location.href = '/' + portalPath`
8. Mobile detection: if on mobile device, prefix with `/m/` (reuse existing `isMobileDevice` pattern)
9. Click-outside closes the dropdown

**CSS:** Inline styles or a small `<style>` block within the component to avoid requiring a separate CSS file. Use `--layer8d-*` theme variables.

### Phase 2: Integrate into Desktop Portal (app.html + app.js)

**File:** `erp/ui/web/app.html`
- Add `<script src="l8ui/shared/layer8d-portal-switcher.js"></script>` to the script includes

**File:** `erp/ui/web/js/app.js`
- After bearer token validation and before/after username display, add:
```javascript
Layer8DPortalSwitcher.init({
    container: document.querySelector('.header-right'),
    insertBefore: document.querySelector('.user-menu'),
    apiPrefix: Layer8DConfig.getApiPrefix(),
    currentPath: window.location.pathname
});
```

### Phase 3: Integrate into ESS Portal (ess.html + ess-app.js)

**File:** `erp/ui/web/ess.html`
- Add `<script src="l8ui/shared/layer8d-portal-switcher.js"></script>` to the script includes

**File:** `erp/ui/web/ess/ess-app.js`
- After bearer token validation, add same `Layer8DPortalSwitcher.init()` call with:
  - `container: document.querySelector('.ess-header-right')`
  - `insertBefore: document.querySelector('.ess-username')` (or `.ess-logout-btn`)

### Phase 4: Seed L8Portal Mock Data

**File:** `go/tests/mocks/` — add portal registry data

The mock data generator needs to POST an L8Portal record to `/erp/77/L8Portal` so the switcher has data to fetch. Create a record with:
```json
{
    "portalId": "erp-portals",
    "portals": {
        "app.html": "ERP Dashboard",
        "ess.html": "Employee Self-Service"
    }
}
```

This can be added to the existing system/security mock phase (or a new small generator function).

### Phase 5: End-to-End Verification

1. Log in as admin → lands on `/app.html`
   - [ ] Portal switcher icon appears in header
   - [ ] Dropdown shows "ERP Dashboard" (current, highlighted) and "Employee Self-Service"
   - [ ] Click "Employee Self-Service" → navigates to `/ess.html`
   - [ ] Bearer token persists — no re-login required
2. On `/ess.html`:
   - [ ] Portal switcher icon appears in ESS header
   - [ ] Dropdown shows "Employee Self-Service" (current) and "ERP Dashboard"
   - [ ] Click "ERP Dashboard" → navigates to `/app.html`
3. Edge cases:
   - [ ] If L8Portal fetch fails or returns empty, no switcher rendered (graceful degradation)
   - [ ] If only 1 portal in registry, no switcher rendered
   - [ ] Click outside dropdown closes it

## Traceability Matrix

| # | Item | Phase |
|---|------|-------|
| 1 | Create Layer8DPortalSwitcher component | Phase 1 |
| 2 | Fetch L8Portal registry on init | Phase 1 |
| 3 | Render dropdown with portal list | Phase 1 |
| 4 | Highlight current portal | Phase 1 |
| 5 | Navigate on portal click (no re-auth) | Phase 1 |
| 6 | Graceful degradation (0-1 portals = no UI) | Phase 1 |
| 7 | Mobile device detection for /m/ prefix | Phase 1 |
| 8 | Click-outside closes dropdown | Phase 1 |
| 9 | Add script include to app.html | Phase 2 |
| 10 | Init switcher in app.js after auth | Phase 2 |
| 11 | Add script include to ess.html | Phase 3 |
| 12 | Init switcher in ess-app.js after auth | Phase 3 |
| 13 | Seed L8Portal mock data | Phase 4 |
| 14 | E2E verification on both portals | Phase 5 |

## Out of Scope

- **Mobile portal switcher** (`m/app.html`) — deferred; mobile uses a different header pattern (hamburger menu). Can be added later.
- **Backend changes** — no proto or `ISecurityProvider` changes. The existing `L8Portal` service and `AuthToken.Portal` are sufficient.
- **Per-user portal visibility filtering** — all authenticated users see all portals in the registry. Role-based filtering (e.g., regular employees can't see admin portal) can be added later by checking `L8User.portal` or role-based permissions.
- **Portal CRUD UI improvements** — the existing L8Portal form in System > Security > Portals already allows managing the registry. No changes needed.
