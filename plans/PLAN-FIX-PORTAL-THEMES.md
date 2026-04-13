# Fix Portal Theme Support

## Problem
After adding the multi-theme switcher and selector to the main app, all 6 portal pages (ESS, Vendor, Customer on desktop and mobile) have two issues:
1. **No theme selector** — the theme picker button is not present in portal headers
2. **Coloring issues** — portals don't load `layer8d-theme-tokens.css`, so theme CSS variables resolve to their defaults only (light theme). Switching themes in the main app has no effect on portals, and some hardcoded colors in portal CSS break under non-light themes.

## Root Cause Analysis

### Missing Infrastructure (all 6 portals)
| Item | Main App | Desktop Portals | Mobile Portals |
|------|----------|-----------------|----------------|
| `layer8d-theme-tokens.css` | Included | **MISSING** | **MISSING** |
| `layer8d-theme-switcher.js` | Included | **MISSING** | **MISSING** |
| `Layer8DThemeSwitcher.init()` | Called | **MISSING** | **MISSING** |
| Theme picker HTML in header | Present | **MISSING** | **MISSING** |
| Meta theme-color dynamic | Via switcher | N/A | **Hardcoded `#0ea5e9`** |

### Hardcoded Colors in Portal CSS

**layer8d-portal.css (desktop):**
- `box-shadow: 0 2px 8px rgba(0,0,0,0.08)` — header shadow, should use `var(--layer8d-shadow-sm)`
- `background: rgba(0,0,0,0.06)` — logout button bg, should use `var(--layer8d-bg-hover, rgba(0,0,0,0.06))`
- `background: rgba(0,0,0,0.1)` — logout button hover, should use theme token
- `box-shadow: 0 4px 12px rgba(0,0,0,0.08)` — card hover shadow, should use `var(--layer8d-shadow-md)`
- `color: white` — active tab text, should use `var(--layer8d-btn-text, white)`

**layer8m-portal.css (mobile):**
- `background: rgba(0,0,0,0.06)` — button bg, should use `var(--layer8d-bg-hover, rgba(0,0,0,0.06))`

## Affected Files

### Desktop Portals (HTML — add CSS/JS includes + theme picker HTML)
- `go/erp/ui/web/ess.html`
- `go/erp/ui/web/vendor.html`
- `go/erp/ui/web/customer.html`

### Mobile Portals (HTML — add CSS/JS includes + theme picker HTML, fix meta tag)
- `go/erp/ui/web/m/ess.html`
- `go/erp/ui/web/m/vendor.html`
- `go/erp/ui/web/m/customer.html`

### Portal CSS (fix hardcoded colors)
- `go/erp/ui/web/l8ui/portal/layer8d-portal.css`
- `go/erp/ui/web/l8ui/portal/layer8m-portal.css`

### Portal JS (inject theme picker into generated header HTML)
- `go/erp/ui/web/l8ui/portal/layer8d-portal.js` — desktop portal header generation
- `go/erp/ui/web/l8ui/portal/layer8m-portal.js` — mobile portal header generation

## Plan

### Phase 1: Add Theme Infrastructure to Portal HTML Files

**Desktop portals** (ess.html, vendor.html, customer.html):
1. Add `<link rel="stylesheet" href="l8ui/shared/layer8d-theme-tokens.css">` as the FIRST CSS include (before `layer8d-theme.css`)
2. Add `<script src="l8ui/shared/layer8d-theme-switcher.js"></script>` and `<script>Layer8DThemeSwitcher.init();</script>` after the portal framework scripts (after `layer8d-portal.js`)
3. Add theme picker HTML in the header's `.l8-portal-header-right` div, before the username/logout:
```html
<div class="layer8d-theme-picker">
    <button class="layer8d-theme-btn" onclick="Layer8DThemeSwitcher.toggleDropdown()" aria-label="Choose theme">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0 0 20V2z"/>
        </svg>
    </button>
    <div class="layer8d-theme-menu"></div>
</div>
```

**Mobile portals** (m/ess.html, m/vendor.html, m/customer.html):
1. Add `<link rel="stylesheet" href="../l8ui/shared/layer8d-theme-tokens.css">` as the FIRST CSS include
2. Add `<script src="../l8ui/shared/layer8d-theme-switcher.js"></script>` and `<script>Layer8DThemeSwitcher.init();</script>` after the portal framework scripts
3. The theme picker button for mobile portals should be injected by `layer8m-portal.js` (Phase 2), since the mobile portal header is JS-generated

### Phase 2: Inject Theme Picker into Portal JS Header Generation

**layer8d-portal.js:**
- The desktop portal header is static HTML in the portal .html files, so the theme picker is added directly in Phase 1. No JS change needed for desktop header generation.

**layer8m-portal.js:**
- Update the `controlsHtml` generation (around lines 74-89) to include a theme picker button in the generated header controls, between existing buttons. The button should match the pattern used in m/app.html.

### Phase 3: Fix Hardcoded Colors in Portal CSS

**layer8d-portal.css:**
1. Replace header `box-shadow: 0 2px 8px rgba(0,0,0,0.08)` with `box-shadow: var(--layer8d-shadow-sm)`
2. Replace logout button `background: rgba(0,0,0,0.06)` with `background: var(--layer8d-bg-hover, rgba(0,0,0,0.06))`
3. Replace logout button hover `background: rgba(0,0,0,0.1)` with `background: var(--layer8d-bg-hover-strong, rgba(0,0,0,0.1))`
4. Replace card hover `box-shadow: 0 4px 12px rgba(0,0,0,0.08)` with `box-shadow: var(--layer8d-shadow-md)`
5. Replace active tab `color: white` with `color: var(--layer8d-btn-text, white)`

**layer8m-portal.css:**
1. Replace button `background: rgba(0,0,0,0.06)` with `background: var(--layer8d-bg-hover, rgba(0,0,0,0.06))`

**Note:** If `--layer8d-bg-hover`, `--layer8d-bg-hover-strong`, or `--layer8d-btn-text` don't exist in `layer8d-theme-tokens.css`, keep the current values as fallbacks via `var(--token, fallback)` syntax — the rgba values work acceptably across themes since they are transparent overlays.

### Phase 4: Fix Mobile Meta Theme-Color

**m/ess.html, m/vendor.html, m/customer.html:**
- The hardcoded `<meta name="theme-color" content="#0ea5e9">` should remain as-is in the HTML. `Layer8DThemeSwitcher.init()` (added in Phase 1) already calls `_updateMetaThemeColor()` on init, which dynamically updates the meta tag based on the saved theme. No additional change needed beyond including the switcher.

## Traceability Matrix

| # | Gap | Phase |
|---|-----|-------|
| 1 | Desktop portals missing theme-tokens.css | Phase 1 |
| 2 | Desktop portals missing theme-switcher.js + init | Phase 1 |
| 3 | Desktop portals missing theme picker HTML | Phase 1 |
| 4 | Mobile portals missing theme-tokens.css | Phase 1 |
| 5 | Mobile portals missing theme-switcher.js + init | Phase 1 |
| 6 | Mobile portal header JS doesn't generate theme picker button | Phase 2 |
| 7 | layer8d-portal.css hardcoded shadows | Phase 3 |
| 8 | layer8d-portal.css hardcoded logout bg colors | Phase 3 |
| 9 | layer8d-portal.css hardcoded `color: white` | Phase 3 |
| 10 | layer8m-portal.css hardcoded button bg | Phase 3 |
| 11 | Mobile meta theme-color hardcoded | Phase 4 (auto-fixed by switcher init) |

## Phase 5: Verification

For each of the 6 portal pages:
1. Open the portal in a browser
2. Verify theme picker button is visible in the header
3. Click the theme picker — verify dropdown appears with all 6 themes
4. Switch to each theme — verify:
   - Background colors change appropriately
   - Text remains readable
   - Header, sidebar, cards, and tables adapt to the theme
   - No hardcoded white-on-white or dark-on-dark text
   - Shadows are appropriate for the theme
5. Refresh the page — verify selected theme persists (localStorage)
6. Verify the theme chosen in a portal carries over to the main app and vice versa (shared localStorage key)
