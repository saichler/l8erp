# Plan: Mobile Portal Switcher

## Summary

Port the desktop portal switcher (`Layer8DPortalSwitcher`) to the mobile UI. This closes a `mobile-rules.md` Rule 2 parity gap: the desktop switcher ships in every desktop portal header, but mobile portals have no way to switch between portals without logging out.

The original `PLAN-PORTAL-SWITCHER.md` explicitly marked mobile as **Out of Scope** ("deferred; mobile uses a different header pattern"). This plan lands the mobile half.

## Why Not Reuse `Layer8DPortalSwitcher` Directly

The desktop component (`l8ui/shared/layer8d-portal-switcher.js`) is not a drop-in fit for mobile:

| Concern | Desktop behavior | Mobile requirement |
|---|---|---|
| UI affordance | Absolute-positioned dropdown anchored to a button | Bottom sheet / full-width list (touch targets ≥44px) |
| Styles | All inline CSS | Dedicated CSS file (matches `layer8m-theme-switcher` pattern) |
| Events | `mouseenter` / `mouseleave` hover states | Tap-only |
| Navigation target | `/<portalPath>` | `/m/<portalPath>` (mobile entry points live under `/m/`) |
| Positioning | Fits within `.header-right` on wide screens | Must not overflow a narrow viewport |

The data-layer is identical (fetch `/77/L8Portal`, fallback to `login.json` `portals` map, filter when fewer than 2 entries). The *UI* layer is what diverges. A parallel mobile component is the right abstraction level — same pattern as `Layer8DTable` / `Layer8MTable`, `Layer8DPopup` / `Layer8MPopup`.

## Duplication Audit

Per `plan-duplication-audit.md`:

- Total desktop component: ~190 lines
- Data-fetch + portal-discovery + fallback logic (identical on both): ~50 lines
- DOM rendering (diverges): ~140 lines

Duplicated behavioral code is ~50 lines — **below the 100-line extraction threshold**. Extraction is not mandated. Noted as a future refactor if a third consumer appears (e.g., a kiosk portal).

## Why Not `Layer8MPopup`

Per `platform-conversion-data-flow.md` ("Never bypass existing abstractions"), before hand-rolling a sheet I considered `Layer8MPopup.show({ size: 'full', ... })`:

| Consideration | Layer8MPopup | Hand-rolled sheet |
|---|---|---|
| Mounts centered modal with title bar + Save/Cancel footer | Yes (cannot be hidden cleanly) | Not needed |
| Bottom-anchored slide-up from screen edge | No — it's a centered/full modal | Yes |
| Fits the "quick nav menu" affordance (tap → pick → go) | Heavy — looks like a form | Light — matches theme-switcher, user-menu patterns |
| Safe-area inset handling | Not exposed | Controlled directly |
| Stacks with existing popups safely | Yes — but portal-switch is navigation, not a modal flow | N/A — switcher closes before navigation happens |

`Layer8MPopup` is the right tool for modal forms and confirmations; the portal switcher is a navigation menu, closer in kind to `layer8m-theme-switcher` (which also hand-rolls its dropdown rather than routing through `Layer8MPopup`). Following that established precedent instead of forcing a modal abstraction.

## Feature Inventory (Desktop → Mobile)

Per `platform-conversion-data-flow.md` Step 0, every interactive element of `layer8d-portal-switcher.js` is enumerated here and marked **implement** or **defer (reason)** before any coding starts.

| # | Desktop element | Mobile disposition | Notes |
|---|---|---|---|
| 1 | Fetch `/77/L8Portal?body={select * from L8Portal}` with bearer | Implement | Identical; uses `Layer8MAuth`-style auth headers |
| 2 | Fallback to `Layer8DConfig.getConfig().portals` | Implement (adapted) | Source becomes `Layer8MConfig` — shape to be verified in Phase 1 |
| 3 | Graceful degradation when fewer than 2 portals | Implement | Same threshold |
| 4 | `extractPortals(data)` merging `data.list[*].portals` maps | Implement | Pure data transform, verbatim |
| 5 | Current-portal detection via `window.location.pathname` | Implement (adapted) | Mobile path is `/m/<portal>`; detection must strip the `/m/` prefix before comparing against registry keys |
| 6 | Grid icon button (2×2 dots, SVG/spans) | Implement | Re-use same markup; applied via CSS class instead of inline styles |
| 7 | Button `mouseenter` / `mouseleave` hover background | Defer (reason: tap-only platform) | CSS `:active` + `:focus-visible` replace hover |
| 8 | Dropdown toggle on button click | Implement (adapted) | Becomes bottom-sheet open on tap |
| 9 | Click-outside closes dropdown | Implement (adapted) | Becomes scrim-tap closes sheet |
| 10 | Absolute-positioned dropdown anchored to button | Defer (reason: mobile UI affordance) | Replaced by bottom-sheet anchored to viewport bottom |
| 11 | Current portal highlighted with filled dot + bold label + `bg-light` | Implement | Verbatim via CSS class |
| 12 | Item hover background change | Defer (reason: tap-only) | Replaced by `:active` state |
| 13 | Click item → `window.location.href = '/' + path` | Implement (adapted) | Target becomes `'/m/' + path` |
| 14 | Escape-to-close | **New — not in desktop** | Added for mobile keyboard users; plan Phase 1 adds `keydown` listener |
| 15 | Safe-area inset padding | **New — not in desktop** | iOS notch requirement |
| 16 | Swipe-down-to-close | Defer (reason: scope) | Scrim tap + Escape sufficient for v1; revisit if feedback requests |
| 17 | Animated portal-transition indicator during navigation | Defer (reason: out of scope per original plan) | Static navigation only |

## Design

### New mobile component: `Layer8MPortalSwitcher`

**API (mirrors desktop):**
```js
Layer8MPortalSwitcher.init({
    container: document.querySelector('.header-actions'),
    apiPrefix: Layer8MConfig.resolveEndpoint('').replace(/\/$/, ''),
    currentPath: window.location.pathname
});
```

**Behavior:**
1. Reads bearer token from `sessionStorage`; aborts if missing.
2. `GET {apiPrefix}/77/L8Portal?body={select * from L8Portal}` with bearer.
3. If response yields ≥2 portals, use it; else fall back to `Layer8MConfig.getConfig().app.portals` (or `.portals` — whichever l8erp uses; must verify).
4. If still <2 portals, render nothing (graceful degradation, matches desktop).
5. Render a **header-action-btn** (visually consistent with the existing theme + refresh buttons) showing the 2×2 grid icon.
6. On tap, open a **bottom sheet** listing all portals:
   - Current portal disabled with a filled dot and bold label.
   - Other portals tappable; label + gray dot.
   - Tap scrim / swipe-down / back-button closes the sheet.
7. On selection: `window.location.href = '/m/' + portalPath` (mobile-prefix the registry path).

### Files to create

| File | Purpose |
|---|---|
| `go/erp/ui/web/l8ui/m/js/layer8m-portal-switcher.js` | Component |
| `go/erp/ui/web/l8ui/m/css/layer8m-portal-switcher.css` | Dedicated stylesheet (mirrors `layer8m-theme-switcher.css` pattern established in the updated `mobile-script-loading-order.md`) |

### Files to modify

All mobile portal HTMLs (identified in research): `m/app.html`, `m/ess.html`, `m/mgr.html`, `m/customer.html`, `m/vendor.html`, `m/partner.html`, `m/projclient.html`.

Each needs:
- `<link>` to `layer8m-portal-switcher.css`
- `<script>` for `layer8m-portal-switcher.js`
- Init call in the portal's bootstrap JS (each portal has its own `app-core.js` / equivalent)

Plus:
- `go/erp/ui/web/m/login.json` — add `app.portals` block if missing (desktop `login.json` already has it; mobile must match for fallback path).

## Implementation Phases

### Phase 0 — Pre-implementation verification (mandatory before Phase 1)

Per `platform-conversion-data-flow.md` Step 3, trace every intermediate layer end-to-end *before* writing code. Each item below is a read-only investigation that must produce a documented finding. If any finding invalidates an assumption in Phases 1–6, update the plan before proceeding.

- [ ] **Read `go/erp/ui/web/l8ui/m/js/layer8m-config.js`** — document the exact path to the portals map. Desktop reads `Layer8DConfig.getConfig().portals`; mobile may nest it under `.app.portals`. Outcome: fix the access path in `getConfigPortals()` in Phase 1.
- [ ] **Grep all 7 mobile portal HTMLs** for the header container class:
      `grep -n 'header-actions\|mobile-header\|header-right' go/erp/ui/web/m/app.html go/erp/ui/web/m/ess.html go/erp/ui/web/m/mgr.html go/erp/ui/web/m/customer.html go/erp/ui/web/m/vendor.html go/erp/ui/web/m/partner.html go/erp/ui/web/m/projclient.html`
      Outcome: table of portal → container class. If any portal uses a different class, Phase 3's init call must parameterize the selector per portal.
- [ ] **Locate each portal's bootstrap JS file** (admin = `m/js/app-core.js`; ESS/mgr/customer/vendor/partner/projclient = TBD). Produce a `portal → bootstrap file` table. Outcome: Phase 3 edit list.
- [ ] **Confirm the mobile `currentPath` encoding.** Log `window.location.pathname` from an actual mobile portal to verify it returns `/m/app.html` (not `/app.html` or `app.html`). Outcome: path-normalization logic in Phase 1's current-portal detection.
- [ ] **Confirm `/77/L8Portal` is reachable from a mobile session.** Verify the service is registered in UI type registration and that the bearer token issued by `/auth` has read access to service area 77. Outcome: if not reachable, fallback-only mode and no registry fetch in Phase 1.
- [ ] **Check whether `m/login.json` already contains a `portals` block.** If present, Phase 4 is a no-op; if missing, Phase 4 proceeds.
- [ ] **Check for regressions on desktop.** List every file that imports or references `layer8d-portal-switcher.js` — confirm none of the Phase 1–5 edits touch those files. Outcome: desktop blast-radius documented.

Any Phase 0 finding that contradicts the current plan triggers a plan update, not silent adaptation during coding.

### Phase 1 — Component (shared l8ui)

**File:** `go/erp/ui/web/l8ui/m/js/layer8m-portal-switcher.js` (new, ~140 lines)

- IIFE exposing `window.Layer8MPortalSwitcher = { init: init }`.
- `init(config)`: guard on missing container/token; fetch portals; fallback chain; render.
- `extractPortals(data)`: same as desktop — walk `data.list` and merge per-record `portals` maps.
- `getConfigPortals()`: read `Layer8MConfig.getConfig().app.portals` (must confirm exact path on mobile; desktop uses `Layer8DConfig.getConfig().portals` — mobile config shape may nest under `.app`).
- `render(container, portals, currentPath)`:
  - Append a `<button class="header-action-btn layer8m-portal-switcher-btn">` to `container`.
  - Build a sheet DOM (`<div class="layer8m-portal-switcher-sheet">` + scrim) appended to `document.body`, hidden by default.
  - Button tap: add `.open` class; scrim tap / item tap / Escape: remove `.open` class.
  - Each item: `<button class="layer8m-portal-switcher-item">` with dot span + label span; disabled state for current.
  - Navigate: `window.location.href = '/m/' + targetPath`.

**File:** `go/erp/ui/web/l8ui/m/css/layer8m-portal-switcher.css` (new, ~80 lines)

- Uses only `--layer8d-*` theme tokens (per `l8ui-theme-compliance.md` rule).
- Sheet slides up from the bottom with a 200ms transform transition.
- Scrim at `rgba(0,0,0,0.4)`.
- Item min-height 48px; 14px horizontal padding; divider borders between items.
- Safe-area insets for notched devices (`padding-bottom: env(safe-area-inset-bottom)`).
- No `[data-theme="dark"]` block — tokens handle it.

### Phase 2 — Wire into `m/app.html` (admin mobile portal)

1. Add CSS link after `layer8m-theme-switcher.css` (line 15 per updated `mobile-script-loading-order.md`):
   ```html
   <link rel="stylesheet" href="../l8ui/m/css/layer8m-portal-switcher.css">
   ```
2. Add script include alongside theme switcher (after line 103 in the same file):
   ```html
   <script src="../l8ui/m/js/layer8m-portal-switcher.js"></script>
   ```
3. In `go/erp/ui/web/m/js/app-core.js`, after the bearer-token check and `Layer8MConfig.load()`, add:
   ```js
   if (typeof Layer8MPortalSwitcher !== 'undefined') {
       Layer8MPortalSwitcher.init({
           container: document.querySelector('.header-actions'),
           apiPrefix: Layer8MConfig.resolveEndpoint('').replace(/\/$/, ''),
           currentPath: window.location.pathname
       });
   }
   ```
   (Exact insertion point: right before `L8AgentBubbleMobile` init per research report.)

### Phase 3 — Wire into remaining mobile portals

Repeat Phase 2's three edits for each of:
- `m/ess.html` + its bootstrap JS
- `m/mgr.html` + its bootstrap JS
- `m/customer.html` + its bootstrap JS
- `m/vendor.html` + its bootstrap JS
- `m/partner.html` + its bootstrap JS
- `m/projclient.html` + its bootstrap JS

Each portal may have a distinct bootstrap file (e.g., `ess/ess-app-m.js`). The init call itself is identical — the only per-portal variation is which file hosts it. Verify each portal's container class is `.header-actions` (some portals may have a different header structure; if so, pick the equivalent slot and document it).

### Phase 4 — Mobile `login.json` portals fallback

**File:** `go/erp/ui/web/m/login.json`

If the `app.portals` (or top-level `portals`) block is missing, copy it from the desktop `login.json`:

```json
"portals": {
    "app.html": "Admin / Operator Portal",
    "ess.html": "Employee Self-Service",
    "mgr.html": "Manager Portal",
    "customer.html": "Customer Portal",
    "vendor.html": "Vendor Portal",
    "partner.html": "Partner Portal",
    "projclient.html": "Project Client Portal"
}
```

This is the fallback path for when `/77/L8Portal` is unavailable (same degradation as desktop).

### Phase 5 — Update `mobile-script-loading-order.md` rule

The rule document now references `layer8m-theme-switcher.js/css`. After this plan lands, add:

```html
<!-- CSS -->
<link rel="stylesheet" href="../l8ui/m/css/layer8m-portal-switcher.css">
<!-- JS -->
<script src="../l8ui/m/js/layer8m-portal-switcher.js"></script>
```

alongside the theme-switcher entries, so future projects pick up the canonical order.

### Phase 6 — End-to-End Verification

For each of the 7 mobile portals:
- [ ] Log in as a user whose default portal is this one.
- [ ] Switcher icon appears in `.header-actions` (right of refresh button).
- [ ] Tap opens bottom sheet listing all 7 portals.
- [ ] Current portal shows filled dot + bold label and is not tappable.
- [ ] Tap scrim closes sheet; Escape (if keyboard available) closes sheet.
- [ ] Tap another portal → navigates to `/m/<path>`; no re-login prompt.
- [ ] After navigation, new portal's switcher shows the new current entry highlighted.

Cross-cutting:
- [ ] With fewer than 2 portals in registry + config, no switcher renders.
- [ ] If `/77/L8Portal` returns 401/500, fallback to `login.json` `portals` works.
- [ ] Dark mode: icon + sheet colors resolve via theme tokens (no hard-coded hex).
- [ ] Safe-area padding visible on iOS notch devices.
- [ ] Desktop switcher still works (no regressions on desktop from any changes made).

## Traceability Matrix

| # | Item | Phase |
|---|---|---|
| 1 | Verify `Layer8MConfig` portals access path | Phase 0 |
| 2 | Grep header container class in all 7 mobile portals | Phase 0 |
| 3 | Identify each portal's bootstrap JS file | Phase 0 |
| 4 | Confirm mobile `currentPath` format | Phase 0 |
| 5 | Confirm `/77/L8Portal` reachable on mobile | Phase 0 |
| 6 | Check `m/login.json` for existing `portals` block | Phase 0 |
| 7 | Desktop regression blast-radius documented | Phase 0 |
| 8 | Feature inventory cross-checked against Phase 1 | Phase 1 |
| 9 | Create `Layer8MPortalSwitcher` JS component | Phase 1 |
| 10 | Create `layer8m-portal-switcher.css` | Phase 1 |
| 11 | Fetch `/77/L8Portal` with bearer | Phase 1 |
| 12 | Fallback to `login.json` portals map | Phase 1 |
| 13 | Graceful degradation when <2 portals | Phase 1 |
| 14 | Bottom-sheet UI with scrim + Escape close | Phase 1 |
| 15 | `/m/<path>` navigation prefix | Phase 1 |
| 16 | Current-portal detection strips `/m/` prefix | Phase 1 |
| 17 | Wire into `m/app.html` + `app-core.js` | Phase 2 |
| 18 | Wire into `m/ess.html` + bootstrap | Phase 3 |
| 19 | Wire into `m/mgr.html` + bootstrap | Phase 3 |
| 20 | Wire into `m/customer.html` + bootstrap | Phase 3 |
| 21 | Wire into `m/vendor.html` + bootstrap | Phase 3 |
| 22 | Wire into `m/partner.html` + bootstrap | Phase 3 |
| 23 | Wire into `m/projclient.html` + bootstrap | Phase 3 |
| 24 | Add `portals` block to `m/login.json` if missing | Phase 4 |
| 25 | Update `mobile-script-loading-order.md` rule | Phase 5 |
| 26 | E2E verification on all 7 mobile portals | Phase 6 |
| 27 | Regression check: desktop switcher still works | Phase 6 |
| 28 | All "Defer" items from Feature Inventory remain out of v1 | Phase 6 |

## Out of Scope

- **Extracting shared data-fetch logic** into a common helper. Under the 100-line threshold; revisit if a third consumer appears.
- **Per-user portal visibility filtering** (e.g., hide admin portal from ESS-only users). Already deferred in the original desktop plan.
- **Backend proto changes**. `L8Portal` registry and `AuthToken.Portal` are unchanged.
- **Animated icon transitions** between portals. Static navigation is enough.

## Risks

1. **Portal-specific bootstrap files vary**. Some portals may not have a `header-actions` container; verify during Phase 3 per-portal. If a portal's header slot is named differently, document it in the init call.
2. **`Layer8MConfig` shape for portals**. Desktop uses `.portals` at the root of `login.json`; mobile may nest under `.app`. Phase 1 must confirm by reading `layer8m-config.js` before implementing `getConfigPortals()`.
3. **Viewport on very small devices**. Bottom sheet with 7 items should fit within 360×640; if not, make the sheet scrollable (`overflow-y:auto; max-height:70vh`).
