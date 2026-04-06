# Plan: Dark Mode Support

## Context

The l8ui theme system defines `--layer8d-*` CSS custom properties in `layer8d-theme.css` with a partial `[data-theme="dark"]` block (10 token overrides). However:

- No JS toggle mechanism or UI button exists
- ~963 hardcoded hex color values across 56 CSS files bypass the token system
- Foundational CSS (font-face, resets) is duplicated — font-face defined **6 times**
- A parallel variable system (`--noc-*`, `--bg-*`, `--text-*`, `--border-*`, `--shadow-*`, `--glow-*`) is consumed by **342 CSS refs across 26 files + 79 JS inline refs across 30 files**
- l8ui itself is inconsistent: desktop components use `--layer8d-*`, mobile components use `--bg-*`/`--text-*`

This plan has two parts:
1. **Part A (l8ui — `../l8ui`)** — Consolidate foundations, add bridge aliases for dark mode, theme switcher, migrate l8ui CSS to tokens.
2. **Part B (l8erp)** — Wire toggle into app shell, migrate l8erp CSS/JS to tokens.

**Exclusions:**
- `go/demo/` — auto-generated, never touch (per `demo-directory-sync.md`)
- `layer8-print.css` — print always uses light theme

---

## Risk Assessment

### 1. Cross-Project Breakage (HIGH impact)
Part A modifies l8ui — shared by all Layer 8 projects. We only audited l8erp's consumers.

**Mitigation:** Bridge alias approach (Phase A0c). Old variable names are redefined as aliases pointing to `--layer8d-*` tokens, not removed. No consumer in any project breaks. Dark mode works immediately through the aliases.

### 2. Scope Underestimate (HIGH likelihood)
~70+ files, ~1,300+ references. Each hardcoded color needs case-by-case judgment.

**Mitigation:** Incremental delivery (see below). Phase A0+A1+A2 deliver working dark mode quickly via bridge aliases. Phase A3/B2 CSS migration is lower priority and can proceed file-by-file without blocking dark mode.

### 3. Silent CSS Regressions (HIGH likelihood)
CSS regressions produce no errors — just wrong-looking UI.

**Mitigation:** Per-tier verification after each batch. Grep-based sanity checks. But visual review remains manual and imperfect.

### 4. No Incremental Delivery (MEDIUM impact)
Original plan required all phases to complete before dark mode worked.

**Mitigation:** Restructured plan so **dark mode is functional after Phase A2** (bridge aliases + token overrides + theme switcher). CSS migration (A3/B2) improves quality but dark mode already works without it.

### 5. Dark Mode Quality (MEDIUM impact)
"Works" ≠ "looks good." Contrast, readability, chart legibility need design review.

**Mitigation:** Added design review checkpoint after Phase A2. Adjust token values based on visual review before proceeding with CSS migration.

### 6. Unknown Pages (LOW-MEDIUM likelihood)
Marketing pages were discovered late. Other standalone pages may exist.

**Mitigation:** Added a discovery grep in Phase B0 to find ALL HTML files and their CSS variable usage before migration.

### 7. Variable Removal Timing (LOW likelihood, HIGH impact)
Missing a consumer when removing old variables → invisible/broken elements.

**Mitigation:** Old variables are NOT removed in this plan. They become aliases. Removal is a separate future effort after all consumers are migrated and verified across ALL Layer 8 projects.

---

## Duplication Audit

### Font-Face — 6 copies
Defined in: `layer8d-theme.css` (3 weights), `layer8d-login-base.css` (4), `layer8d-register.css` (4), `layer8d-table.css` (?), `base-core.css` (4), `app-base.css` (3).

**Fix:** Define ONCE in `layer8d-theme.css` with all 4 weights (add Bold 700). Remove from all other files.

### CSS Resets — 3 copies
In: `layer8d-login-base.css`, `base-core.css`, `app-base.css`.

**Fix:** Define ONCE in `layer8d-theme.css`. Remove from others.

### Duplicate Variables — Bridge Alias Approach
Instead of removing old variable definitions, **redefine them as aliases** pointing to canonical `--layer8d-*` tokens:

```css
/* Bridge aliases in layer8d-theme.css — old names point to canonical tokens */
:root {
    --noc-cyan: var(--layer8d-primary);
    --noc-cyan-dark: var(--layer8d-primary-dark);
    --noc-green: var(--layer8d-success);
    --text-primary: var(--layer8d-text-dark);
    --text-secondary: var(--layer8d-text-medium);
    --text-muted: var(--layer8d-text-muted);
    --text-dim: var(--layer8d-text-light);
    --bg-primary: var(--layer8d-bg-light);
    --bg-secondary: var(--layer8d-bg-light);
    --bg-card: var(--layer8d-bg-white);
    --bg-elevated: var(--layer8d-bg-card);
    --bg-input: var(--layer8d-bg-input);
    --border-subtle: var(--layer8d-border);
    --border-default: var(--layer8d-border-dark);
    --border-emphasis: var(--layer8d-border-dark);
    --shadow-sm: var(--layer8d-shadow);
    --shadow-md: var(--layer8d-shadow);
    --shadow-lg: var(--layer8d-shadow-lg);
    /* etc. */
}
```

**Why this works:**
- All 342 CSS refs + 79 JS refs keep working without changes
- Dark mode works immediately — `[data-theme="dark"]` overrides the canonical tokens, aliases follow automatically
- No consumer in ANY Layer 8 project breaks
- l8ui mobile components, login, register, marketing pages — all work
- Migration of individual consumers from old names to `--layer8d-*` can happen gradually and independently

**What gets removed from `base-core.css` and `app-base.css`:**
- The `:root` variable DEFINITIONS (moved to bridge aliases in `layer8d-theme.css`)
- `@font-face` blocks (consolidated in `layer8d-theme.css`)
- CSS reset (consolidated in `layer8d-theme.css`)

**What does NOT get removed (future work):**
- Individual files' `var(--text-primary)` REFERENCES — these still work via aliases
- Gradual migration from `var(--text-primary)` → `var(--layer8d-text-dark)` happens in A3/B2 but is not blocking

### Modal CSS — DEFERRED
`layer8d-popup.css` (z-index 10000) vs `components-modals.css` (z-index 1000) overlap. Separate effort.

---

# Part A: l8ui (Generic — `../l8ui`)

---

## Phase A0: Consolidate CSS Foundations + Bridge Aliases

### A0a: Font-face → single definition
**File:** `l8ui/shared/layer8d-theme.css`

Add Figtree Bold (700) to existing font-face block. Remove `@font-face` from:
- `l8ui/login/layer8d-login-base.css`
- `l8ui/register/layer8d-register.css`
- `l8ui/edit_table/layer8d-table.css`

Verify login/register HTML loads `layer8d-theme.css` before their own CSS.

### A0b: CSS reset → single definition
Add universal reset to `layer8d-theme.css` if not present. Remove from `layer8d-login-base.css`.

### A0c: Add bridge aliases to `layer8d-theme.css`
Add the alias `:root` block (see above) mapping old variable names → `--layer8d-*` tokens. This makes dark mode work for ALL consumers of old variable names immediately.

### A0d: Remove old login `:root` variable definitions
Remove the 14 variable definitions from `layer8d-login-base.css` (now redundant — aliases in theme.css provide them). Remove duplicate behavioral CSS (form inputs, buttons) where theme already provides.

**Near-match decision log:** For each near-match (e.g., login's `#0f172a` vs theme's `#2d3748`), the alias adopts the `--layer8d-*` token value. If the visual difference is unacceptable, adjust the `--layer8d-*` token value instead. Document each decision.

### A0 Verification
- Login, register pages render correctly
- Fonts load once (network tab)
- Toggle `[data-theme="dark"]` manually in DevTools → all login/register elements respond via aliases

---

## Phase A1: Theme Architecture — Tokens + Dark Theme

### A1a: Separate theme definitions from `layer8d-theme.css`

**Current file:** `l8ui/shared/layer8d-theme.css` — contains `:root` token definitions, `[data-theme="dark"]` overrides, bridge aliases, font-face, reset, button classes, status classes, and utility classes all in one file.

**New structure:** Split theme token definitions into a dedicated file to support future themes:

- **`l8ui/shared/layer8d-theme.css`** — Keeps: font-face, reset, bridge aliases, button/status/utility classes. These are theme-independent.
- **`l8ui/shared/layer8d-theme-tokens.css`** — NEW: Contains ONLY token definitions:
  ```css
  /* Light theme (default) */
  :root {
      --layer8d-primary: #0ea5e9;
      --layer8d-bg-white: #fcfbf8;
      /* ... all ~54 tokens ... */
  }

  /* Dark theme */
  [data-theme="dark"] {
      --layer8d-bg-white: #0f172a;
      --layer8d-text-dark: #f1f5f9;
      /* ... all dark overrides ... */
  }

  /* Future themes go here or in separate files:
     [data-theme="ocean"] { ... }
     [data-theme="sunset"] { ... }
  */
  ```

This separation means a future theme builder only needs to generate `[data-theme="xxx"]` blocks that override the `:root` tokens — it doesn't need to understand button classes, font-face, or any behavioral CSS.

**Loading order:** `layer8d-theme-tokens.css` loads immediately before `layer8d-theme.css`:
```html
<link rel="stylesheet" href="l8ui/shared/layer8d-theme-tokens.css">
<link rel="stylesheet" href="l8ui/shared/layer8d-theme.css">
```

### A1b: Complete dark theme token overrides

**File:** `l8ui/shared/layer8d-theme-tokens.css`

Add dark overrides for:
- `--layer8d-bg-card`, `--layer8d-bg-hover`
- `--layer8d-shadow`, `--layer8d-shadow-lg`
- `--layer8d-focus-ring`, `--layer8d-primary-light`
- Status bg variants: `--layer8d-success-bg`, `--layer8d-warning-bg`, `--layer8d-error-bg`, `--layer8d-info-bg`

**No new tokens** — only dark overrides for existing tokens.

### A1c: Document token contract

Add a comment block at the top of `layer8d-theme-tokens.css` listing every `--layer8d-*` token, its purpose, and expected value type. This is the contract that all themes must fulfill — a future theme builder reads this list to know which tokens to set.

```css
/*
 * Layer8 Theme Token Contract
 * Every theme MUST define values for all tokens listed below.
 * Custom themes can be added as [data-theme="xxx"] blocks in this file
 * or in separate CSS files (e.g., layer8d-theme-ocean.css).
 *
 * Tokens:
 *   --layer8d-primary          Accent color (buttons, links, focus)
 *   --layer8d-primary-dark     Accent hover/active state
 *   --layer8d-primary-light    Accent subtle backgrounds
 *   --layer8d-bg-white         Page/card background
 *   --layer8d-bg-light         Secondary background
 *   --layer8d-bg-input         Input field background
 *   --layer8d-bg-card          Elevated card background
 *   --layer8d-bg-hover         Hover state background
 *   --layer8d-text-dark        Primary text
 *   --layer8d-text-medium      Secondary text
 *   --layer8d-text-muted       Tertiary/disabled text
 *   --layer8d-text-light       Placeholder text
 *   --layer8d-border           Default borders
 *   --layer8d-border-dark      Emphasis borders
 *   --layer8d-shadow           Default box shadow
 *   --layer8d-shadow-lg        Elevated box shadow
 *   --layer8d-focus-ring        Focus indicator
 *   --layer8d-success          Success/positive status
 *   --layer8d-warning          Warning status
 *   --layer8d-error            Error/negative status
 *   --layer8d-info             Info status
 *   --layer8d-success-bg       Success background tint
 *   --layer8d-warning-bg       Warning background tint
 *   --layer8d-error-bg         Error background tint
 *   --layer8d-info-bg          Info background tint
 *   ... (full list in file)
 */
```

**File size check:** `layer8d-theme-tokens.css` will be ~120 lines (`:root` + dark block + contract comment). `layer8d-theme.css` shrinks by ~50 lines (tokens moved out) but gains aliases (~25) + font Bold (~5) + reset (~5) ≈ net similar. Both well under 500.

---

## Phase A2: Theme Switcher JS + Login Toggle

### A2a: Create `l8ui/shared/layer8d-theme-switcher.js` (~70 lines)

Generic theme switcher that supports any number of themes, not just light/dark:

```js
window.Layer8DThemeSwitcher = {
    // List of available themes. Default: ['light', 'dark'].
    // A future theme builder appends to this list.
    themes: ['light', 'dark'],

    init(),             // localStorage → prefers-color-scheme fallback → apply
    setTheme(name),     // Set any theme: 'light', 'dark', 'ocean', etc.
    getTheme(),         // Current theme name
    getThemes(),        // Returns the themes array
    registerTheme(name), // Add a new theme to the list (called by theme builder)

    // Convenience for the common 2-theme case (light ↔ dark toggle button)
    toggle(),           // Cycles to next theme in the list
    // With 2 themes: toggles. With 3+: cycles light → dark → ocean → light...
}
```

- `setTheme(name)`: sets `document.documentElement.setAttribute('data-theme', name)` (or removes attr for 'light'), persists to `localStorage.setItem('layer8d-theme', name)`, updates `<meta name="theme-color">`, updates toggle button icon/label
- `init()`: reads localStorage, falls back to `prefers-color-scheme: dark` → 'dark', otherwise 'light'. Listens for OS preference changes.
- `registerTheme(name)`: pushes to `themes` array if not already present. Called by theme builder or custom theme CSS files.
- `toggle()`: advances to next theme in the `themes` array (wraps around). With 2 themes this is a simple toggle. With 3+ themes it cycles.

**Future theme builder integration:**
```js
// Theme builder generates a CSS file and registers it:
Layer8DThemeSwitcher.registerTheme('ocean');
Layer8DThemeSwitcher.registerTheme('sunset');
// Toggle now cycles: light → dark → ocean → sunset → light
```

### A2b: Add toggle to login page HTML (desktop + mobile parity)
With 2 themes: moon/sun icon button. With 3+ themes (future): dropdown using same pattern as `Layer8ViewSwitcher`.

### A2c: Script loading position
```html
<script src="l8ui/shared/layer8d-config.js"></script>
<script src="l8ui/shared/layer8d-theme-switcher.js"></script>  <!-- NEW -->
<script src="l8ui/shared/layer8d-utils.js"></script>
```

### **--- DESIGN REVIEW CHECKPOINT ---**
At this point, dark mode is functional via bridge aliases + token overrides + theme switcher. Before proceeding with CSS migration:
1. Toggle dark mode on the login page and in the main app (via DevTools or toggle button)
2. Review overall look — are the dark token values producing good contrast and readability?
3. Adjust `[data-theme="dark"]` token values in `layer8d-theme-tokens.css` if needed
4. Only proceed to Phase A3 after the dark palette is satisfactory

---

## Phase A3: Migrate l8ui CSS + JS to Tokens (INCREMENTAL — not blocking dark mode)

This phase improves code quality by replacing hardcoded hex values with `--layer8d-*` tokens. Dark mode already works without this phase (via bridge aliases for old variable names, and token overrides for `--layer8d-*` references). This phase can proceed file-by-file at any pace.

### A3a: CSS — hardcoded hex colors (~590 refs across ~21 files)

**Tier 1 — Core Layout:** `layer8-section-layout.css` (52)
**Tier 2 — High-Use:** `layer8d-table.css` (70), `layer8d-popup-forms.css` (63), `layer8d-popup.css` (23), `layer8d-popup-content.css` (39), `layer8d-reference-picker.css` (54)
**Tier 3 — Secondary:** `layer8d-datepicker.css` (41), `layer8d-notification.css` (21), `layer8d-popup-inline-table.css` (21), `layer8d-form-fields.css` (34), `layer8d-input-formatter.css` (15), `layer8d-scrollbar.css` (14), `layer8d-toggle-tree.css` (12)
**Tier 4 — SYS:** `l8sys.css` (22), `l8sys-modules.css` (25), `l8logs.css` (17), `l8health.css` (7)
**Tier 5 — Remaining:** `layer8d-register.css` (51), `layer8-section-responsive.css` (2), `layer8-view-switcher.css` (1), login CSS remnants

**Migration rules — replace:**
- White/light backgrounds → `var(--layer8d-bg-white)`, `var(--layer8d-bg-light)`
- Dark/medium/muted text → `var(--layer8d-text-dark)`, `var(--layer8d-text-medium)`, `var(--layer8d-text-muted)`
- Borders → `var(--layer8d-border)`, `var(--layer8d-border-dark)`
- Status colors → `var(--layer8d-success)`, `var(--layer8d-error)`, `var(--layer8d-warning)`

**Keep as-is:**
- SVG illustration fills, gradient color stops for branding
- `rgba()` overlays for modals/backdrops
- Decorative brand hues that work on both light and dark backgrounds

### A3b: JS — inline style color references (~50 refs across ~18 l8ui files)
- Template literals with `var(--text-secondary)` → `var(--layer8d-text-medium)` (already works via aliases, but standardize)
- Template literals with hardcoded hex → `var(--layer8d-*)` token
- `.style.color = '#xxx'` → move to CSS class or use token
- Layout-only inline styles (position, display, padding) — leave as-is

### A3c: Migrate l8ui mobile/login/scrollbar from alias names to canonical names
Update the 132 + 77 + 5 = **214 refs** in l8ui files from `var(--text-primary)` → `var(--layer8d-text-dark)` etc. These already work via aliases — this is code quality cleanup, not functional.

### A3 Verification per tier
After each tier:
- Visual spot-check of affected components in both themes
- Grep to confirm no orphaned non-standard variable refs in migrated files
- `Layer8DChart.readThemeColor()` / `getThemePalette()` auto-adapt (verify once)

**File size check:** Migration only changes values. No file grows.

---

## Phase A4: l8ui Final Verification

### Light Mode Regression
- [ ] Login, register pages render identically (or with documented near-match adjustments)
- [ ] Fonts load once (network tab)
- [ ] All l8ui components render correctly

### Dark Mode
- [ ] Login toggle works + persists
- [ ] Tables, popups, forms, date pickers, reference pickers
- [ ] Charts, kanban, calendar, gantt, timeline, tree grid, wizard
- [ ] Notifications, SYS module, input formatters, scrollbars

### Automated Check
- [ ] Grep for remaining hardcoded colors in migrated files (spot-check)

---

# Part B: l8erp (Project-Specific)

**Prerequisite:** Update l8ui submodule in l8erp:
```bash
cd go/erp/ui/web/l8ui && git pull origin main && cd ../../../.. && git add l8ui
```

After this update, dark mode already partially works in l8erp because:
- Bridge aliases make all `--noc-*`/`--bg-*`/`--text-*` consumers dark-mode-aware
- l8ui components already migrated to tokens
- Theme switcher JS is available

---

## Phase B0: Wire Toggle + Remove Duplicate Foundations

### B0a: Discover all HTML entry points
```bash
find go/erp/ui/web -name "*.html" -not -path "*/l8ui/*" -not -path "*/demo/*"
```
Audit each for CSS variable usage to ensure no pages are missed.

### B0b: Desktop header toggle
**File:** `go/erp/ui/web/app.html` — moon/sun icon in `header-right`. Add theme switcher script in canonical loading position.

### B0c: Mobile header toggle
**File:** `go/erp/ui/web/m/app.html` — same pattern. **Desktop/mobile parity.** Add theme switcher script. Dynamic `<meta name="theme-color">`.

### B0d: Clean `css/base-core.css`
- Remove `@font-face` blocks (now in `layer8d-theme.css`)
- Remove CSS reset (now in `layer8d-theme.css`)
- Remove `:root` variable block (now bridge aliases in `layer8d-theme.css`)
- **Keep:** App shell layout (`.app-container`, `.sidebar`, `.nav-menu`, `.app-header`, `.main-content`)

### B0e: Clean `m/css/app-base.css`
- Remove `@font-face` blocks
- Remove CSS reset
- Remove duplicate `:root` variables
- **Keep:** Mobile app shell, touch targets, mobile component styles

### B0 Verification
- Desktop + mobile app render correctly in both themes
- **--- DESIGN REVIEW CHECKPOINT ---** — Review full app in dark mode. Adjust `[data-theme="dark"]` token values if needed before proceeding.

---

## Phase B1: Migrate l8erp CSS + JS to Tokens (INCREMENTAL)

Same as Phase A3 — improves code quality. Dark mode already works via aliases. Can proceed file-by-file.

### B1a: CSS — hardcoded hex colors (~370 refs across ~11 files)

**Tier 1 — App Chrome:** `base-core.css` (remaining), `components-modals.css` (53)
**Tier 2 — Dashboard:** `dashboard.css` (40)
**Tier 3 — HCM:** `hcm-forms.css` (47), `hcm-employee.css` (27), `hcm-layout.css` (24), `hcm-modals.css` (18)
**Tier 4 — Remaining:** `components-misc.css` (20), `responsive.css` (if any), `app-base.css` (remaining), `m-module-accents.css` (36 — evaluate; brand accents may stay)

### B1b: l8erp mobile chrome + marketing — migrate from alias names to canonical names
- `m/css/app-header.css` (11 refs), `m/css/app-nav.css` (15), `m/css/app-sidebar.css` (8), `m/css/app-base.css` (15)
- `marketing/m/css/` — 6 files, 38 refs

### B1c: JS — inline style color references (~29 refs across ~12 l8erp files)
- `m/js/hcm/employee-detail-m.js` (14 refs — heaviest)
- `fin/reports/reports-viewer.js` (3 refs)
- Others (1-2 refs each)

### B1 Verification per tier
After each tier: visual spot-check in both themes. Grep for orphaned refs in migrated files.

**File size check:** No file grows past 500 lines.

---

## Phase B2: l8erp Final Verification

### Desktop Light Mode (regression)
- [ ] All sections render correctly — no visual changes from current state
- [ ] Tables load data, row clicks open details, forms submit
- [ ] Fonts render in all weights (Regular, Medium, SemiBold, Bold)
- [ ] Marketing pages render correctly

### Desktop Dark Mode
- [ ] Toggle button switches theme, icon updates (moon ↔ sun)
- [ ] Sidebar, header, main content background colors correct
- [ ] Dashboard: KPI cards, sparklines, trend indicators
- [ ] HCM sections: all styled correctly
- [ ] All module sections: FIN, SCM, Sales, MFG, CRM, PRJ, BI, DOC, ECOM, COMP
- [ ] No white/bright flashes on page load

### Mobile Dark Mode
- [ ] Toggle button works
- [ ] Card navigation readable
- [ ] `<meta name="theme-color">` updates
- [ ] Marketing mobile pages correct

### Persistence
- [ ] Refresh — persists via localStorage
- [ ] Clear localStorage — OS preference respected
- [ ] OS preference change — theme updates

### Automated Check
- [ ] Grep for `var(--noc-*)` returns zero (outside bridge aliases in `layer8d-theme.css`)
- [ ] Grep for orphaned variable refs returns zero in migrated files

---

## Traceability Matrix

| # | Gap / Action Item | Phase |
|---|-------------------|-------|
| 1 | Font-face declared 6 times | A0a |
| 2 | Font-weight 700 (Bold) missing from `layer8d-theme.css` | A0a |
| 3 | CSS reset declared 3 times | A0b |
| 4 | Parallel variable system needs dark mode support | A0c (bridge aliases) |
| 5 | Login CSS — 14 duplicate variable definitions | A0d |
| 6 | Near-match color decision log | A0d |
| 7 | Theme tokens mixed with behavioral CSS in one file | A1a |
| 8 | Dark mode token overrides incomplete | A1b |
| 9 | No documented token contract for future themes | A1c |
| 10 | No JS theme switching mechanism | A2a |
| 11 | No login page toggle | A2b |
| 12 | Theme switcher script loading position | A2c |
| 13 | **Design review checkpoint — dark palette quality** | After A2 |
| 14 | `layer8-section-layout.css` — 52 hardcoded colors | A3a |
| 15 | `layer8d-table.css` — 70 hardcoded colors | A3a |
| 16 | `layer8d-popup-forms.css` — 63 hardcoded colors | A3a |
| 17 | `layer8d-popup.css` — 23 hardcoded colors | A3a |
| 18 | `layer8d-popup-content.css` — 39 hardcoded colors | A3a |
| 19 | `layer8d-reference-picker.css` — 54 hardcoded colors | A3a |
| 20 | `layer8d-datepicker.css` — 41 hardcoded colors | A3a |
| 21 | `layer8d-notification.css` — 21 hardcoded colors | A3a |
| 22 | `layer8d-popup-inline-table.css` — 21 hardcoded colors | A3a |
| 23 | `layer8d-form-fields.css` — 34 hardcoded colors | A3a |
| 24 | `layer8d-input-formatter.css` — 15 hardcoded colors | A3a |
| 25 | `layer8d-scrollbar.css` — 14 hardcoded colors | A3a |
| 26 | `layer8d-toggle-tree.css` — 12 hardcoded colors | A3a |
| 27 | `l8sys.css` — 22 hardcoded colors | A3a |
| 28 | `l8sys-modules.css` — 25 hardcoded colors | A3a |
| 29 | `l8logs.css` — 17 hardcoded colors | A3a |
| 30 | `l8health.css` — 7 hardcoded colors | A3a |
| 31 | `layer8d-register.css` — 51 hardcoded colors | A3a |
| 32 | Login CSS remaining hardcoded colors | A3a |
| 33 | l8ui JS inline styles — ~50 refs across ~18 files | A3b |
| 34 | l8ui mobile/login/scrollbar — 214 alias→canonical refs | A3c |
| 35 | Chart theme functions — verify auto-adapt | A4 |
| 36 | Discover all l8erp HTML entry points | B0a |
| 37 | No desktop header toggle | B0b |
| 38 | No mobile header toggle | B0c |
| 39 | `base-core.css` — duplicate fonts, reset, variables | B0d |
| 40 | `app-base.css` — duplicate fonts, reset, variables | B0e |
| 41 | **Design review checkpoint — full app dark mode** | After B0 |
| 42 | `base-core.css` — remaining hardcoded colors | B1a |
| 43 | `components-modals.css` — 53 hardcoded colors | B1a |
| 44 | `dashboard.css` — 40 hardcoded colors | B1a |
| 45 | `hcm-forms.css` — 47 hardcoded colors | B1a |
| 46 | `hcm-employee.css` — 27 hardcoded colors | B1a |
| 47 | `hcm-layout.css` — 24 hardcoded colors | B1a |
| 48 | `hcm-modals.css` — 18 hardcoded colors | B1a |
| 49 | `components-misc.css` — 20 hardcoded colors | B1a |
| 50 | `app-base.css` — remaining hardcoded colors | B1a |
| 51 | `m-module-accents.css` — 36 accent colors (evaluate) | B1a |
| 52 | l8erp mobile chrome — 49 alias→canonical refs (4 files) | B1b |
| 53 | Marketing pages — 38 alias→canonical refs (6 files) | B1b |
| 54 | l8erp JS inline styles — ~29 refs across ~12 files | B1c |
| 55 | Mobile `<meta name="theme-color">` hardcoded | B0c |
| 56 | Desktop/mobile parity for toggles | B0b + B0c |
| 57 | File size check after edits | A3 + B1 |
| 58 | `go/demo/` must not be touched | All phases |
| 59 | Modal z-index conflict (10000 vs 1000) | Deferred |
| 60 | l8ui submodule update before Part B | Between A and B |
| 61 | Cross-project safety via bridge aliases | A0c |
| 62 | Bridge alias removal (all projects migrated) | Future — not in this plan |

---

## Estimated Scope

| Phase | Project | What | Effort | Dark Mode Status |
|-------|---------|------|--------|-----------------|
| A0 | l8ui | Fonts + reset + bridge aliases + login cleanup | Small | Aliases enable dark mode for old variable consumers |
| A1 | l8ui | Token file separation + dark overrides + token contract | Small | Full dark token palette complete, multi-theme ready |
| A2 | l8ui | Theme switcher JS + login toggle | Small | **Dark mode functional** ← usable here |
| — | — | **Design review checkpoint** | — | Adjust dark palette if needed |
| A3 | l8ui | CSS + JS token migration (~21 CSS, ~18 JS) | Large | Code quality improvement (not blocking) |
| A4 | l8ui | Verification | Testing | — |
| — | l8erp | l8ui submodule update | Trivial | — |
| B0 | l8erp | Toggle + remove duplicate foundations | Small | **Dark mode functional in l8erp** |
| — | — | **Design review checkpoint** | — | Adjust if needed |
| B1 | l8erp | CSS + JS token migration (~11 CSS, ~12 JS) | Medium | Code quality improvement (not blocking) |
| B2 | l8erp | Final verification | Testing | — |

**Key insight:** Dark mode is **usable after Phase A2 + B0**. Phases A3 and B1 are code quality improvements that can proceed incrementally without blocking dark mode usage.

## Deferred Items
- Modal system consolidation (z-index conflict) — separate effort
- Bridge alias removal — future effort after all Layer 8 projects migrate consumers to `--layer8d-*`
