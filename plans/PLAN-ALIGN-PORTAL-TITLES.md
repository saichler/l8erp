# Plan: Align Portal Look & Feel with Main App

## Goal
Make portal section titles and sidebar visually match the main app's styling — same header frame for titles, same sidebar appearance for navigation.

---

## Part 1: Section Title Headers

### Current State

**Main App** — rich header frame using `l8-*` classes:
```html
<div class="l8-header-frame">
    <div class="l8-header-content">
        <div class="l8-header-title">
            <span class="l8-icon">📊</span>
            <div>
                <h1 class="l8-title">Dashboard</h1>
                <p class="l8-subtitle">Enterprise Overview</p>
            </div>
        </div>
    </div>
</div>
```
Visual: 120px tall, warm gradient background, 48px animated icon, 36px uppercase bold title, 12px uppercase subtitle, box shadow, rounded top corners.

**Portals** — plain `<h2>`:
```html
<h2 class="l8-portal-section-title">Orders</h2>
```
Visual: No background, no gradient, no icon, 20-24px normal case text.

### Title Differences

| Aspect | Main App | Portal (current) |
|--------|----------|-------------------|
| Header height | 120px frame | None (bare h2) |
| Background | Warm gradient | Flat white |
| Title size | 36px uppercase bold (700) | 20-24px normal case semibold (600) |
| Subtitle | 12px uppercase gray | Only on dashboard welcome |
| Icon | 48px animated emoji | None |
| Box shadow | `0 8px 24px rgba(123,95,63,0.10)` | None |
| Border radius | 16px top corners | None |

### Title Approach

Reuse the existing `l8-header-frame` / `l8-title` / `l8-subtitle` / `l8-icon` CSS classes from `layer8-section-layout.css`. No new CSS needed.

Add a shared `renderHeader()` function to `Layer8DPortalDashboard` to avoid duplicating the header HTML across 12 dashboard files.

---

## Part 2: Sidebar

### Current State

**Main App** sidebar (`app.html`, styled by `css/base-core.css`):
```html
<nav class="sidebar">
    <ul class="nav-menu">
        <li><a href="#" class="nav-link active">
            <span class="nav-icon">📊</span>
            <span>Dashboard</span>
        </a></li>
    </ul>
</nav>
```

**Portal** sidebar (`ess.html` etc., styled by `layer8d-portal.css`):
```html
<nav class="l8-portal-sidebar">
    <ul class="l8-portal-nav-menu">
        <li><a href="#" class="l8-portal-nav-link active">
            <span class="l8-portal-nav-icon">📊</span>
            <span>Dashboard</span>
        </a></li>
    </ul>
</nav>
```

### Sidebar Differences

| Aspect | Main App | Portal (current) |
|--------|----------|-------------------|
| Width | 260px | 220px |
| Link padding | 11px 18px | 10px 16px |
| Link margin | 2px 10px | 2px 8px |
| Link gap | 12px | 10px |
| Border radius | 10px | 8px |
| Link border | 1px solid transparent | None |
| Default text color | `#475569` | `#4a5568` |
| Icon width | 20px | 24px |
| Hover background | `#f1eee8` | `#f4f1ea` |
| Hover text color | `#0f172a` | `#2d3748` |
| Hover border | Shows `#ddd7ce` | No border change |
| **Active background** | **`#f0ede6` (tan/beige)** | **`#0ea5e9` (sky blue)** |
| **Active text color** | **`#0f172a` (dark)** | **white** |
| Active border | `#c8c0b4` | None |

The biggest visual difference is the active state — main app uses a subtle tan/beige that blends with the warm theme, while portals use a bright blue with white text.

### Sidebar Approach

Update the portal sidebar CSS in `layer8d-portal.css` to match the main app's sidebar styling values. This is a single CSS file change — no HTML or JS changes needed since the structure is already the same (nav container → ul → li → a with icon span + label span).

---

## Traceability Matrix

| # | Gap | File(s) | Phase |
|---|-----|---------|-------|
| 1 | Verify portal HTML pages include `layer8-section-layout.css` | 6 desktop + 6 mobile HTML files | Phase 1 |
| 2 | No shared header renderer exists | l8ui/portal/layer8d-portal-dashboard.js | Phase 2 |
| 3 | Portal `loadSection` renders plain h2 | l8ui/portal/layer8d-portal.js (lines 94-107) | Phase 3 |
| 4 | Portal mobile `loadSection` renders plain h2 | l8ui/m/js/layer8m-portal.js | Phase 3 |
| 5 | Dashboard renderers use plain h2 welcome div | 12 dashboard files (6 desktop + 6 mobile) | Phase 4 |
| 6 | Portal sidebar width differs (220px vs 260px) | l8ui/portal/layer8d-portal.css | Phase 5 |
| 7 | Portal sidebar link padding/margin/gap/radius differ | l8ui/portal/layer8d-portal.css | Phase 5 |
| 8 | Portal sidebar link border missing | l8ui/portal/layer8d-portal.css | Phase 5 |
| 9 | Portal sidebar active state (blue+white vs tan+dark) | l8ui/portal/layer8d-portal.css | Phase 5 |
| 10 | Portal sidebar hover border missing | l8ui/portal/layer8d-portal.css | Phase 5 |
| 11 | Portal sidebar icon width differs (24px vs 20px) | l8ui/portal/layer8d-portal.css | Phase 5 |

---

## Phase 1: Verify CSS Prerequisites

Check that portal HTML pages include `layer8-section-layout.css`. If not, add the `<link>` to each portal HTML page:
- Desktop: `partner.html`, `customer.html`, `vendor.html`, `mgr.html`, `projclient.html`, `ess.html`
- Mobile: `m/partner.html`, `m/customer.html`, `m/vendor.html`, `m/mgr.html`, `m/projclient.html`, `m/ess.html`

## Phase 2: Add Shared `renderHeader` to `Layer8DPortalDashboard`

Add a `renderHeader(container, icon, title, subtitle)` function to `layer8d-portal-dashboard.js` that generates the `l8-header-frame` HTML structure:

```javascript
function renderHeader(container, icon, title, subtitle) {
    var html =
        '<div class="l8-header-frame">' +
            '<div class="l8-header-content">' +
                '<div class="l8-header-title">' +
                    '<span class="l8-icon">' + (icon || '') + '</span>' +
                    '<div>' +
                        '<h1 class="l8-title">' + title + '</h1>' +
                        (subtitle ? '<p class="l8-subtitle">' + subtitle + '</p>' : '') +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    container.insertAdjacentHTML('afterbegin', html);
}
```

Export as `Layer8DPortalDashboard.renderHeader`.

## Phase 3: Update Portal Section Rendering

### 3a. Update `layer8d-portal.js` `loadSection` function
Replace the plain `<h2>` section title with the header frame structure. The section object already has `label` and `icon`:

Change (line ~103):
```javascript
'<h2 class="l8-portal-section-title">' + section.label + '</h2>'
```
To:
```javascript
'<div class="l8-header-frame">' +
    '<div class="l8-header-content">' +
        '<div class="l8-header-title">' +
            '<span class="l8-icon">' + (section.icon || '') + '</span>' +
            '<div>' +
                '<h1 class="l8-title">' + section.label + '</h1>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</div>'
```

### 3b. Update `layer8m-portal.js` equivalent
Apply the same change to the mobile portal framework's section rendering.

## Phase 4: Update Dashboard Renderers

Each dashboard `render` function currently builds its own welcome `<h2>`. Replace with a call to `Layer8DPortalDashboard.renderHeader()`:

```javascript
// Before (duplicated in each dashboard):
container.innerHTML =
    '<div class="l8-portal-dashboard-welcome">' +
        '<h2>Customer Portal</h2>' +
        '<p>Your orders, invoices, and support.</p>' +
    '</div>' + ...

// After (calls shared helper):
container.innerHTML = '';
Layer8DPortalDashboard.renderHeader(container, '👥', 'Customer Portal', 'Your orders, invoices, and support.');
container.insertAdjacentHTML('beforeend',
    '<div class="l8-portal-dashboard-cards">' + ... );
```

**Files (12 dashboard files):**
- `ess/ess-dashboard.js` + `m/js/ess/ess-dashboard.js`
- `mgr/mgr-dashboard.js` + `m/js/mgr/mgr-dashboard.js`
- `customer/customer-dashboard.js` + `m/js/customer/customer-dashboard.js`
- `vendor/vendor-dashboard.js` + `m/js/vendor/vendor-dashboard.js`
- `partner/partner-dashboard.js` + `m/js/partner/partner-dashboard.js`
- `projclient/projclient-dashboard.js` + `m/js/projclient/projclient-dashboard.js`

Each dashboard provides its own icon, title, and subtitle — no behavioral duplication.

## Phase 5: Align Portal Sidebar CSS

Update `l8ui/portal/layer8d-portal.css` to match the main app's sidebar values from `css/base-core.css`:

| Property | Current Portal Value | Target (Main App) Value |
|----------|---------------------|------------------------|
| `--l8-portal-sidebar-width` | 220px | 260px |
| `.l8-portal-nav-link` padding | 10px 16px | 11px 18px |
| `.l8-portal-nav-menu li` margin | 2px 8px | 2px 10px |
| `.l8-portal-nav-link` gap | 10px | 12px |
| `.l8-portal-nav-link` border-radius | 8px | 10px |
| `.l8-portal-nav-link` border | (none) | 1px solid transparent |
| `.l8-portal-nav-icon` width | 24px | 20px |
| `.l8-portal-nav-link:hover` background | `var(--layer8d-bg-light)` | `#f1eee8` |
| `.l8-portal-nav-link:hover` color | `var(--layer8d-text-dark)` | `#0f172a` |
| `.l8-portal-nav-link:hover` border-color | (none) | `#ddd7ce` |
| `.l8-portal-nav-link.active` background | `#0ea5e9` (blue) | `#f0ede6` (tan) |
| `.l8-portal-nav-link.active` color | white | `#0f172a` (dark) |
| `.l8-portal-nav-link.active` border-color | (none) | `#c8c0b4` |

This is a single-file CSS change. No HTML or JS changes needed — the sidebar HTML structure is already equivalent.

## Phase 6: Verification

For each portal (desktop + mobile):
1. Navigate to each section — verify header frame renders with gradient, icon, uppercase title
2. Navigate to dashboard — verify header frame renders with portal name and subtitle
3. Verify sidebar width, link spacing, hover, and active state match the main app
4. Compare side-by-side with main app for visual parity
5. Verify dark mode still works

---

## Out of Scope
- SVG illustration layer (parallax background) — portals use icon-only headers, no SVG illustrations
- Parallax animation — not applicable to dynamically rendered content
- Changing the main app's section header classes from `hcm-*` to `l8-*` in HTML — separate cleanup task
