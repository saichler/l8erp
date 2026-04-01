# Plan: UI Code Deduplication & L8UI Abstraction

## Overview

Scan identified 4 categories of duplication across the ERP UI codebase. This plan addresses them in priority order by ROI (lines saved × reusability).

---

## Phase 1: Shared Renderers — Consolidate Duplicate Renderer Functions

**Problem:** 3 renderer functions are duplicated across 5+ HCM module files, despite `layer8d-renderers.js` already having some of them.

### 1a. renderPercentage — already exists in l8ui but not used

`layer8d-renderers.js` line 134 already has `renderPercentage(value, decimals)`. But these modules redefine it:

| File | Function | Line | Difference |
|------|----------|------|------------|
| `hcm/talent/talent-enums.js` | `renderPercentage` | 116 | `toFixed(0)` |
| `hcm/learning/learning-enums.js` | `renderPercentageLearning` | 155 | `toFixed(0)` |
| `hcm/compensation/compensation-enums.js` | `renderPercentageComp` | 151 | `toFixed(1)` |

**Fix:** Delete all three. Use the shared `renderPercentage(value, decimals)` from `Layer8DRenderers` with the decimals parameter:
- Talent/Learning: `(v) => renderPercentage(v, 0)`
- Compensation: `(v) => renderPercentage(v, 1)`

Update the render exports in each enums file to reference the shared function.

### 1b. renderRating — create in l8ui

Duplicated in talent and learning with near-identical implementations:

| File | Function | Line | Implementation |
|------|----------|------|---------------|
| `hcm/talent/talent-enums.js` | `renderRating` | 121 | `${rating}/${maxRating}` |
| `hcm/learning/learning-enums.js` | `renderRatingLearning` | 166 | `${rating.toFixed(1)}/${maxRating}` |

**Fix:** Add `renderRating(value, maxRating, decimals)` to `layer8d-renderers.js`:
```javascript
function renderRating(value, maxRating, decimals) {
    if (value === null || value === undefined) return '-';
    maxRating = maxRating || 5;
    decimals = decimals || 0;
    return value.toFixed(decimals) + '/' + maxRating;
}
```

Delete both module-local versions. Update render exports:
- Talent: `(v) => renderRating(v, 5, 0)`
- Learning: `(v) => renderRating(v, 5, 1)`

### 1c. renderDateRange — create in l8ui

`renderTimePeriod` (time-enums.js:155) and `renderReviewPeriod` (talent-enums.js:126) are **identical**:
```javascript
function renderTimePeriod(period) {
    if (!period) return '-';
    const start = period.startDate ? formatDate(period.startDate) : '?';
    const end = period.endDate ? formatDate(period.endDate) : '?';
    return start + ' - ' + end;
}
```

Note: `layer8d-renderers.js` already has `renderPeriod` (line 205) but it handles `L8Period` objects (year/quarter), NOT `DateRange` objects (startDate/endDate). These are different types.

**Fix:** Add `renderDateRange(value)` to `layer8d-renderers.js`:
```javascript
function renderDateRange(value) {
    if (!value) return '-';
    var start = value.startDate ? formatDate(value.startDate) : '?';
    var end = value.endDate ? formatDate(value.endDate) : '?';
    return start + ' - ' + end;
}
```

Delete `renderTimePeriod` and `renderReviewPeriod`. Update render exports to use shared `renderDateRange`.

### Files modified (Phase 1):
```
l8ui/shared/layer8d-renderers.js          (add renderRating, renderDateRange; export both)
hcm/talent/talent-enums.js                (delete renderPercentage, renderRating, renderReviewPeriod; use shared)
hcm/learning/learning-enums.js            (delete renderPercentageLearning, renderRatingLearning; use shared)
hcm/compensation/compensation-enums.js    (delete renderPercentageComp; use shared)
hcm/time/time-enums.js                    (delete renderTimePeriod; use shared)
```

**Lines saved:** ~30 lines removed, 0 new duplication risk

---

## Phase 2: escapeHtml Duplication in employee-detail.js

**Problem:** `employee-detail.js` (lines 447-462) reimplements `escapeHtml()` and `escapeAttr()` that already exist in `Layer8DUtils`.

**Fix:** Delete both local functions. Replace all calls:
- `escapeHtml(x)` → `Layer8DUtils.escapeHtml(x)`
- `escapeAttr(x)` → `Layer8DUtils.escapeHtml(x)` (or add `escapeAttr` to Layer8DUtils if not present)

Check if `escapeAttr` exists in Layer8DUtils. If not, add it there.

### Files modified (Phase 2):
```
hcm/core-hr/employee-detail.js    (delete escapeHtml/escapeAttr, use Layer8DUtils)
l8ui/shared/layer8d-utils.js       (add escapeAttr if missing)
```

**Lines saved:** ~16 lines

---

## Phase 3: ESS Actions — Use Layer8DFormsModal Instead of Manual Fetch

**Problem:** `ess-actions.js` has two nearly identical 40-line blocks that manually:
1. Generate form HTML
2. Open popup
3. Collect form data
4. Build auth headers
5. Fetch POST/PATCH
6. Handle response
7. Show notification

This is exactly what `Layer8DFormsModal.openAddForm()` and `Layer8DFormsModal.openEditForm()` do.

**Fix:** Rewrite both actions to use `Layer8DFormsModal`:

```javascript
// requestTimeOff — was 42 lines, now ~8
ESS.requestTimeOff = function() {
    var formDef = ESS.forms.LeaveRequest;
    var serviceConfig = ESS._getServiceConfig({ endpoint: '/30/LveReq', model: 'LeaveRequest' });
    Layer8DFormsModal.openAddForm(serviceConfig, formDef, function() {
        Layer8DNotification.success('Leave request submitted');
        ESS.loadSection('myleave');
    });
};
```

The form's `onSuccess` callback refreshes the section. The `performSave` inside `Layer8DFormsModal` handles auth, validation, fetch, and error notification.

### Files modified (Phase 3):
```
ess/ess-actions.js    (rewrite both actions to use Layer8DFormsModal; ~100 → ~25 lines)
```

**Lines saved:** ~75 lines

---

## Phase 4: ESS Dashboard — Use Layer8DDataSource for Fetching

**Problem:** `ess-dashboard.js` has `_fetchCount()` (lines 66-80) that manually builds auth headers, constructs query URLs, and fetches. This duplicates `Layer8DDataSource`.

**Fix:** Replace `_fetchCount()` with `Layer8DDataSource` or a simpler shared fetch utility. Since the dashboard only needs counts (not full table data), the simplest fix is to use `getAuthHeaders()` from `ess-app.js` instead of re-reading sessionStorage:

```javascript
// Before (lines 66-80):
_fetchCount: function(endpoint, query) {
    var bearerToken = sessionStorage.getItem('bearerToken');
    var body = encodeURIComponent(JSON.stringify({ text: query }));
    return fetch(Layer8DConfig.resolveEndpoint(endpoint) + '?body=' + body, {
        headers: { 'Authorization': 'Bearer ' + bearerToken, 'Content-Type': 'application/json' }
    }).then(...)
}

// After:
_fetchCount: function(endpoint, query) {
    var body = encodeURIComponent(JSON.stringify({ text: query }));
    return fetch(Layer8DConfig.resolveEndpoint(endpoint) + '?body=' + body, {
        headers: getAuthHeaders()
    }).then(...)
}
```

### Files modified (Phase 4):
```
ess/ess-dashboard.js    (use getAuthHeaders() instead of manual token retrieval)
```

**Lines saved:** ~5 lines (minor, but eliminates duplication pattern)

---

## Phase 5: Column Factory Migration — Convert 40 Manual Column Files

**Problem:** 40 column files across 12 modules still use manual `{ key: '...', label: '...' }` object literals instead of `Layer8ColumnFactory`. This means:
- No standardized rendering for dates, money, enums
- Inconsistent column definitions
- More verbose code

**Files (40 total, ~3,800 lines):**

| Module | Files | Total Lines |
|--------|-------|-------------|
| FIN | accounts-payable, accounts-receivable, budgeting, cash, fixed-assets, tax | 751 |
| CRM | accounts, fieldservice, leads, marketing, service | 604 |
| PRJ | analytics, billing, resources, timeexpense | 633 |
| Sales | billing, customers, pricing, shipping | 313 |
| SCM | demand-planning, supply-planning | 263 |
| BI | analytics, dashboards, datamanagement, reporting | 476 |
| ECOM | catalog, customers, orders, promotions | 385 |
| COMP | audit, controls, regulatory, risk | 155 |
| DOC | compliance, integration, storage, workflow | 188 |
| MFG | planning | 87 |
| L8UI/SYS | security, security-events | 159 |

**Fix:** Convert each file to use `Layer8ColumnFactory`. This is a mechanical transformation:

```javascript
// Before (manual):
{ key: 'orderNumber', label: 'Order #', sortKey: 'orderNumber' }
{ key: 'totalAmount', label: 'Total', render: (item) => renderMoney(item.totalAmount) }
{ key: 'status', label: 'Status', render: (item) => renderOrderStatus(item.status) }

// After (factory):
...col.col('orderNumber', 'Order #'),
...col.money('totalAmount', 'Total'),
...col.status('status', 'Status', ORDER_STATUS.enum, render.orderStatus),
```

**Approach:** Create a migration tool (`tools/migrate_columns.go` or do it file-by-file). Each file is independent so this can be parallelized.

**Estimated savings:** ~30% reduction per file (factory methods are more concise), roughly ~1,100 lines across 40 files.

---

## Phase 6: HCM_FORM_NS Auto-Discovery

**Problem:** `ess-app.js` lines 97-118 has a 113-entry hardcoded mapping of model names to HCM module namespaces. This drifts when forms are added/changed.

**Fix:** Auto-discover from `Layer8DServiceRegistry` at runtime:

```javascript
ESS._getFormDef = function(modelName) {
    var modules = Layer8DServiceRegistry.getRegisteredModules();
    for (var i = 0; i < modules.length; i++) {
        var ns = window[modules[i]];
        if (ns && ns.forms && ns.forms[modelName]) {
            return ns.forms[modelName];
        }
    }
    return null;
};
```

This replaces 25 lines of hardcoded mapping with 10 lines of dynamic lookup. No maintenance needed when new forms are added.

### Files modified (Phase 6):
```
ess/ess-app.js    (replace HCM_FORM_NS + _getFormDef with dynamic lookup; ~25 → ~10 lines)
```

---

## Desktop/Mobile Parity

Mobile column files already use `Layer8ColumnFactory` — Phase 5 only affects desktop.

Mobile has its own duplicate renderers that must also be consolidated:

| Mobile File | Function | Action |
|-------------|----------|--------|
| `m/js/hcm/talent-enums.js` | `renderRating` (mobile) | Delete, use shared `Layer8MRenderers.renderRating` |
| `m/js/fin/tax-management-columns.js` | `renderPercentage` (mobile) | Verify uses shared `Layer8MRenderers.renderPercentage` |

No mobile ESS portal exists — Phases 3, 4, 6 are desktop-only (no mobile parity gap).

---

## File Size Verification

After all edits, verify these files stay under 500 lines:

| File | Current Lines | Expected After | Safe? |
|------|--------------|----------------|-------|
| `l8ui/shared/layer8d-renderers.js` | 240 | ~260 (+renderRating, +renderDateRange) | Yes |
| `l8ui/shared/layer8d-utils.js` | 471 | ~475 (+escapeAttr if missing) | Yes, but monitor |

---

## l8ui Source Location

All edits to `l8ui/` files are made in the l8erp project's copy (`go/erp/ui/web/l8ui/`), which is pulled as a submodule. Changes will be pushed to the `l8ui` project repo from there.

---

## Phase 7: End-to-End Verification

### 7a. Syntax Check
```bash
node -c l8ui/shared/layer8d-renderers.js
node -c l8ui/shared/layer8d-utils.js
node -c hcm/talent/talent-enums.js
node -c hcm/learning/learning-enums.js
node -c hcm/compensation/compensation-enums.js
node -c hcm/time/time-enums.js
node -c hcm/core-hr/employee-detail.js
node -c ess/ess-actions.js
node -c ess/ess-dashboard.js
node -c ess/ess-app.js
# + all 40 migrated column files
```

### 7b. File Size Check
```bash
wc -l l8ui/shared/layer8d-renderers.js  # must be < 500
wc -l l8ui/shared/layer8d-utils.js      # must be < 500
```

### 7c. Desktop Smoke Test
For every affected section, verify in browser:
- [ ] HCM > Talent — table loads, percentage/rating columns render correctly, row click opens detail with correct values
- [ ] HCM > Learning — table loads, percentage/rating columns render correctly, row click opens detail
- [ ] HCM > Compensation — table loads, percentage column renders correctly, row click opens detail
- [ ] HCM > Time — table loads, date range columns render correctly, row click opens detail
- [ ] HCM > Core HR — employee detail popup renders correctly (escapeHtml works)
- [ ] ESS > My Leave — leave request form submits via Layer8DFormsModal (Phase 3)
- [ ] ESS > Dashboard — counts load without errors in console (Phase 4)
- [ ] ESS > Any form — forms resolve via auto-discovery, not hardcoded mapping (Phase 6)
- [ ] FIN, CRM, PRJ, Sales, SCM, BI, ECOM, COMP, DOC, MFG, SYS — migrated column tables load correctly (Phase 5)

### 7d. Mobile Smoke Test
- [ ] HCM > Talent (mobile) — table loads, percentage/rating columns render correctly
- [ ] HCM > Learning (mobile) — table loads, columns render correctly

---

## Traceability

| # | Issue | Files | Fix | Phase |
|---|-------|-------|-----|-------|
| 1 | renderPercentage duplicated 3x | talent, learning, comp enums | Use shared Layer8DRenderers.renderPercentage | 1a |
| 2 | renderRating duplicated 2x | talent, learning enums | Add to Layer8DRenderers | 1b |
| 3 | renderTimePeriod/renderReviewPeriod identical | time, talent enums | Add renderDateRange to Layer8DRenderers | 1c |
| 4 | escapeHtml/escapeAttr reimplemented | employee-detail.js | Use Layer8DUtils | 2 |
| 5 | Manual form submit in ESS actions | ess-actions.js | Use Layer8DFormsModal | 3 |
| 6 | Manual auth header construction | ess-dashboard.js | Use getAuthHeaders() | 4 |
| 7 | 40 desktop column files use manual objects | 12 modules (desktop only) | Migrate to Layer8ColumnFactory | 5 |
| 8 | HCM_FORM_NS hardcoded mapping | ess-app.js | Auto-discover from ServiceRegistry | 6 |
| 9 | Mobile renderRating duplicate | m/js/hcm/talent-enums.js | Delete, use shared Layer8MRenderers | 1b |

## Summary

| Phase | Lines Saved | Files Changed | Risk |
|-------|-------------|---------------|------|
| 1 | ~30 | 6 | Low |
| 2 | ~16 | 2 | Low |
| 3 | ~75 | 1 | Low |
| 4 | ~5 | 1 | Low |
| 5 | ~1,100 | 40 | Medium (mechanical) |
| 6 | ~15 | 1 | Low |
| **Total** | **~1,241** | **51** | |
