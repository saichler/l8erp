# Plan: Close Desktop/Mobile Parity Gaps (§6) — IMPLEMENTED

## Status: COMPLETE (Phases 1-5 implemented, Phase 6 deferred)

## Problem
The mobile UI has structural, styling, and feature gaps compared to desktop, documented in MISSING-FEATURES.md §6.

## Remaining Gaps

### ~~6.1 CSS Parity~~ ✓ DONE (Phase 1)
- ~~Desktop has 18 module-specific CSS files (accent colors, status styling)~~
- ~~Mobile has 0 module-specific CSS files~~

### ~~6.2 Structural Differences~~ ✓ DONE (Phase 2)
- ~~Mobile HCM has 8 sub-section HTML files; desktop uses factory-generated section~~
- ~~Mobile SCM top-level section still shows "Under Development" placeholder~~
- ~~Mobile has 2-7 fewer JS files per module than desktop~~

### ~~6.3 Behavioral Parity~~ ✓ DONE (Phase 4)
- ~~Currency/theme change propagation to mobile~~
- ~~Cross-view data effects (CRUD in one view refreshing another)~~
- ~~Section placeholder status (SCM and potentially others)~~

### ~~6.4 Missing Mobile Features~~ ✓ DONE (Phases 3, 5) except offline
- ~~Employee detail view handler~~
- ~~Module-specific styling/theming~~
- ~~Pull-to-refresh~~
- ~~Swipe actions on list items~~
- ~~Bottom sheet modals~~
- Offline support / service worker — **Deferred** (Phase 6, needs own plan)

---

## Phase 1: Mobile Module CSS Parity ✓ DONE

**Goal:** Add module accent colors to mobile using a single shared CSS file.

**What was done:**
- Created `m/css/m-module-accents.css` with per-module accent colors for all 12 modules
- Added `data-module="${module.key}"` attribute to nav cards in `l8ui/m/js/layer8m-nav.js`
- Linked CSS in `m/app.html`

**Files changed:**
- `m/css/m-module-accents.css` — created (44 lines)
- `l8ui/m/js/layer8m-nav.js` — added `data-module` attribute to home nav cards
- `m/app.html` — added CSS link

---

## Phase 2: Mobile Section Structure Alignment ✓ DONE

**Goal:** Remove dead placeholder section HTML files; mobile uses nav card flow exclusively.

**What was done:**
- Discovered all 10 module placeholder HTML files + 8 HCM sub-sections + 6 SCM sub-sections were dead code (unreachable via `loadSection()` which routes all nav-config modules through `_loadDashboardForModule()`)
- Deleted 24 dead HTML files
- Cleaned `SECTIONS` map in `app-core.js` to only `dashboard` and `system`
- Cleaned `initSection` function to only `dashboard` and `system`

**Files deleted (24):**
- `m/sections/scm.html`, `m/sections/sales.html`, `m/sections/financial.html`, `m/sections/manufacturing.html`, `m/sections/crm.html`, `m/sections/projects.html`, `m/sections/bi.html`, `m/sections/documents.html`, `m/sections/ecommerce.html`, `m/sections/compliance.html`
- `m/sections/hcm/{benefits,compensation,employees,learning,organization,payroll,talent,time}.html`
- `m/sections/scm/{demand-planning,inventory,logistics,procurement,supply-planning,warehouse}.html`

**Files changed:**
- `m/js/app-core.js` — reduced SECTIONS map and initSection to dashboard + system only

---

## Phase 3: Employee Detail View (Mobile) ✓ DONE

**Goal:** Port the desktop employee detail view to mobile using the 5-step conversion protocol.

**What was done:**
- Created `m/js/hcm/employee-detail-m.js` (279 lines) with `MobileEmployeeDetail.open(item)`
- Fetches employee + 6 related records in parallel (documents, compliance, organization, department, position, job)
- Renders 4-tab popup: Overview, Employment, Documents, Compliance
- Added `onRowClick` to Employee service config in `erp-ui/m/nav-configs/layer8m-nav-config-fin-hcm.js`
- Wired script into `m/app.html`

**Data flow verified:**
1. Nav config `onRowClick` → `MobileEmployeeDetail.open(item)` (item from table)
2. `fetchEmployeeWithRelated(employeeId)` → L8Query via `Layer8MAuth.get()`
3. 6 parallel fetches for related data
4. `Layer8MPopup.show()` with manual tab switching in `onShow`

**Files created:**
- `m/js/hcm/employee-detail-m.js` (279 lines)

**Files changed:**
- `erp-ui/m/nav-configs/layer8m-nav-config-fin-hcm.js` — added `onRowClick` to Employee service
- `m/app.html` — added script include

---

## Phase 4: Behavioral Parity ✓ DONE (No changes needed)

**Goal:** Ensure configuration changes and cross-view effects propagate on both platforms.

**Findings:**
- **4a Theme/Currency**: Already handled — `app-core.js` loads currencies (lines 62-72) and exchange rates (lines 74-84). No dark mode toggle exists on either platform.
- **4b Cross-View Refresh**: Already handled — `layer8m-nav-crud.js` calls `table.refresh()` after save (line 144) and delete (line 170).
- **4c Placeholder Audit**: All placeholders deleted in Phase 2. Only `dashboard.html` and `system.html` remain (both functional).

---

## Phase 5: Mobile UX Enhancements ✓ DONE

**Goal:** Add mobile-native interaction patterns as extensions to existing l8ui mobile components.

**What was done:**

### 5a: Pull-to-Refresh
- Created `l8ui/m/js/layer8m-table-touch.js` (179 lines) — separate file since `layer8m-table.js` was already at 529 lines
- Auto-attaches pull-to-refresh to `Layer8MTable` via prototype extension
- Shows spinner indicator, calls `table.refresh()` on release
- CSS added to `l8ui/m/css/layer8m-table.css` (~30 lines, `--layer8d-*` tokens)

### 5b: Swipe Actions
- Swipe-left on cards reveals Edit/Delete buttons (in same `layer8m-table-touch.js`)
- Uses `layer8d-btn` theme classes for buttons
- Auto-closes previous swipe actions when a new card is swiped

### 5c: Bottom Sheet Modals
- Extended `Layer8MPopup` with `position: 'bottom'` option (1 line change in `layer8m-popup.js`)
- CSS added to `l8ui/m/css/layer8m-popup.css` (~24 lines) — slide-up animation, rounded top corners, visible drag handle
- Drag-to-dismiss already worked via existing `_setupDragToDismiss`

**Files created:**
- `l8ui/m/js/layer8m-table-touch.js` (179 lines)

**Files changed:**
- `l8ui/m/js/layer8m-popup.js` — added `position: 'bottom'` CSS class
- `l8ui/m/css/layer8m-table.css` — pull-to-refresh + swipe action CSS
- `l8ui/m/css/layer8m-popup.css` — bottom sheet CSS
- `m/app.html` — added `layer8m-table-touch.js` script

---

## Phase 6: Offline Support — DEFERRED

Needs its own dedicated plan. Service worker lifecycle, cache invalidation, and offline CRUD queueing each have significant complexity.

---

## Traceability Matrix

| # | Gap (from §6) | Phase | Status |
|---|---------------|-------|--------|
| 1 | Desktop 18 module CSS vs mobile 0 | Phase 1 | ✓ Done |
| 2 | Mobile HCM 8 sub-section HTML files | Phase 2 | ✓ Done (deleted) |
| 3 | Mobile SCM "Under Development" placeholder | Phase 2 | ✓ Done (deleted) |
| 4 | Mobile JS file count difference | Phase 2 | ✓ Done |
| 5 | Employee detail view handler | Phase 3 | ✓ Done |
| 6 | Module-specific styling/theming | Phase 1 | ✓ Done |
| 7 | Currency/theme propagation | Phase 4a | ✓ No gap found |
| 8 | Cross-view data effects | Phase 4b | ✓ No gap found |
| 9 | Section placeholder status | Phase 4c | ✓ Done (Phase 2) |
| 10 | Pull-to-refresh | Phase 5a | ✓ Done |
| 11 | Swipe actions on list items | Phase 5b | ✓ Done |
| 12 | Bottom sheet modals | Phase 5c | ✓ Done |
| 13 | Offline support / service worker | Phase 6 | Deferred |

---

## Phase 7: Verification

All JS files pass `node -c` syntax check. All scripts wired into `m/app.html`. All files under 500 lines.

### Module CSS (Phase 1) — Verified
- [x] Nav cards have `data-module` attribute for CSS targeting
- [x] No hardcoded hex in CSS file — uses gradient backgrounds matching desktop
- [x] Single file, no duplication

### Section Structure (Phase 2) — Verified
- [x] Only `dashboard.html` and `system.html` remain in `m/sections/`
- [x] All modules route through nav card system
- [x] `SECTIONS` map and `initSection` cleaned to 2 entries each

### Employee Detail (Phase 3) — Verified
- [x] `onRowClick` wired in nav config → `MobileEmployeeDetail.open(item)`
- [x] Script loaded after HCM enums/columns/forms, before HCM registry
- [x] Data flow traced through all intermediate layers

### Behavioral Parity (Phase 4) — Verified
- [x] Currency cache loaded in `app-core.js`
- [x] CRUD refresh in `layer8m-nav-crud.js`
- [x] No remaining placeholder sections

### Mobile UX (Phase 5) — Verified
- [x] `layer8m-table-touch.js` loaded after `layer8m-edit-table.js`
- [x] Pull-to-refresh + swipe CSS uses `--layer8d-*` tokens
- [x] Bottom sheet CSS uses `--layer8d-*` tokens
- [x] All new files under 500 lines
