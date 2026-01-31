# L8ERP UI Refactoring Plan

## Goals
1. **File Size**: All files under 500 lines
2. **No Duplicate Code**: Consolidate into shared utilities
3. **Future-Proof**: Support all future ERP modules

---

## Phase 1: Eliminate Duplicate Code

### 1.1 Remove `escapeHtml()` duplicates
| Location | Lines | Action |
|----------|-------|--------|
| `shared/erp-utils.js` | 12-17 | KEEP (canonical) |
| `popup/popup.js` | 289-294 | REMOVE, use ERPUtils |
| `edit_table/table.js` | 741-745 | REMOVE, use ERPUtils |

### 1.2 Remove `escapeAttr()` duplicate
| Location | Lines | Action |
|----------|-------|--------|
| `shared/erp-utils.js` | 19-27 | KEEP (canonical) |
| `edit_table/table.js` | 749-757 | REMOVE, use ERPUtils |

### 1.3 Extract `matchEnumValue()` to shared
| Location | Lines | Action |
|----------|-------|--------|
| `edit_table/table.js` | 67-84 | MOVE to ERPUtils |

### 1.4 Remove `collectFormData()` from popup.js
| Location | Lines | Action |
|----------|-------|--------|
| `shared/erp-forms.js` | 133-175 | KEEP (canonical, type-aware) |
| `popup/popup.js` | 240-260 | REMOVE, use ERPForms |

---

## Phase 2: Break Large Files (Over 500 Lines)

### 2.1 `edit_table/table.js` (794 lines)

Split into:
```
edit_table/
  table.js              (~50 lines)  - Entry point, exports L8Table
  table-core.js         (~150 lines) - L8Table class, constructor, init
  table-render.js       (~200 lines) - render, renderPagination, renderHeaders, renderBody, renderRow
  table-filter.js       (~150 lines) - filter logic, debounce, buildQuery
  table-data.js         (~150 lines) - fetchData, setData, setServerData
  table-events.js       (~100 lines) - attachEventListeners, event handlers
```

### 2.2 `hcm/hcm.js` (654 lines)

Split into:
```
hcm/
  hcm.js                (~50 lines)  - Entry point, exports HCM
  hcm-config.js         (~200 lines) - MODULE_CONFIG, service definitions
  hcm-navigation.js     (~150 lines) - initializeHCM, switchModule, loadServiceView
  hcm-table.js          (~150 lines) - initializeServiceTable, getServiceColumns/Forms/PrimaryKey
  hcm-crud.js           (~150 lines) - openAddModal, openEditModal, confirmDeleteItem, showDetailsModal
```

### 2.3 `hcm/core-hr/core-hr.js` (625 lines)

Split into:
```
hcm/core-hr/
  core-hr.js            (~50 lines)  - Entry point, exports CoreHR
  core-hr-enums.js      (~200 lines) - All enum definitions and value maps
  core-hr-columns.js    (~200 lines) - COREHR_COLUMNS configurations
  core-hr-forms.js      (~200 lines) - COREHR_FORMS definitions
```

### 2.4 `datepicker/datepicker.js` (533 lines)

Split into:
```
datepicker/
  datepicker.js         (~50 lines)  - Entry point, exports ERPDatePicker
  datepicker-core.js    (~200 lines) - attach, open, close, setDate, getDate, detach
  datepicker-calendar.js(~200 lines) - createPickerElement, renderCalendar, createDayButton
  datepicker-utils.js   (~80 lines)  - MONTHS, DAYS arrays, isDateDisabled, createOverlay
```

### 2.5 `hcm/hcm.css` (1232 lines)

Split into:
```
hcm/
  hcm.css               (~50 lines)  - Imports all partials
  hcm-layout.css        (~250 lines) - Header, tabs, sidebar, content areas
  hcm-forms.css         (~250 lines) - Form inputs, validation, buttons
  hcm-employee.css      (~300 lines) - Employee detail view
  hcm-tables.css        (~150 lines) - Table overrides for HCM
  hcm-responsive.css    (~250 lines) - All @media queries
```

---

## Phase 3: Consolidate CSS Classes

### 3.1 Button classes → Use `erp-theme.css`
| Current | Replace With |
|---------|--------------|
| `.btn-*` (popup-forms.css) | `.erp-button-*` |
| `.l8-btn-*` (table.css) | `.erp-button-*` |
| `.hcm-btn-*` (hcm.css) | `.erp-button-*` |

### 3.2 Status classes → Use `erp-theme.css`
| Current | Replace With |
|---------|--------------|
| `.l8-tag-*` (table.css) | `.erp-status-*` or `.erp-tag` |
| `.hcm-status-*` (hcm.css) | `.erp-status-*` |

---

## Phase 4: Future Module Template

Create reference structure for new modules:
```
/new-module/
  new-module.js           (<200 lines) - Orchestration, exports
  new-module-config.js    (<200 lines) - Module/service configuration
  new-module-navigation.js(<200 lines) - Tab/sidebar handling
  new-module-crud.js      (<200 lines) - Add/Edit/Delete/View modals
  new-module.css          (<300 lines) - Module-specific styles only

  /submodule/
    submodule.js          (<50 lines)  - Entry point
    submodule-enums.js    (<200 lines) - Enum definitions
    submodule-columns.js  (<200 lines) - Table columns
    submodule-forms.js    (<200 lines) - Form definitions
```

---

## Implementation Order

| Step | Task | Files | Risk |
|------|------|-------|------|
| 1 | Remove escapeHtml from popup.js | popup.js | Low |
| 2 | Remove escapeHtml/escapeAttr from table.js | table.js | Low |
| 3 | Extract matchEnumValue to ERPUtils | erp-utils.js, table.js | Low |
| 4 | Remove collectFormData from popup.js | popup.js | Low |
| 5 | Split table.js | edit_table/*.js | Medium |
| 6 | Split hcm.js | hcm/*.js | Medium |
| 7 | Split core-hr.js | hcm/core-hr/*.js | Medium |
| 8 | Split datepicker.js | datepicker/*.js | Medium |
| 9 | Split hcm.css | hcm/*.css | Medium |
| 10 | Consolidate CSS classes | Multiple CSS files | Medium |

---

## Verification Checklist

- [ ] All JS files under 500 lines
- [ ] All CSS files under 500 lines
- [ ] No duplicate escapeHtml/escapeAttr functions
- [ ] matchEnumValue in ERPUtils
- [ ] All buttons use `.erp-button-*` classes
- [ ] All status badges use `.erp-status-*` classes
- [ ] HCM module still functions correctly
- [ ] Date picker still functions correctly
- [ ] Tables still function correctly
- [ ] Forms still function correctly

---

## File Count Summary

| Before | After |
|--------|-------|
| 5 files over 500 lines | 0 files over 500 lines |
| 3 duplicate escapeHtml | 1 canonical escapeHtml |
| 2 duplicate escapeAttr | 1 canonical escapeAttr |
| 4 button class families | 1 unified button family |
| 3 status class families | 1 unified status family |
