# Phase 15: Codebase-Wide Deduplication Plan

## Executive Summary

A comprehensive scan of the codebase identified **6 major duplication areas** across Go and JavaScript code, totaling an estimated **~12,500 lines** that can be eliminated through abstraction. The plan is organized into tiers by impact and risk.

---

## Tier 1: Mobile Module Index Registry Factory (JS)

### Problem
11 mobile `*-index.js` files (one per module) contain **100% identical logic** with only module names differing. Each file is ~170 lines of copy-pasted registry code: `findModule()`, `getFormDef()`, `getColumns()`, `getEnums()`, `getPrimaryKey()`, `getRender()`, `getAllModels()`, `hasModel()`, `getModuleName()`.

### Files Affected
- `m/js/hcm/hcm-index.js` (178 lines)
- `m/js/fin/fin-index.js` (178 lines)
- `m/js/scm/scm-index.js` (175 lines)
- `m/js/crm/crm-index.js` (175 lines)
- `m/js/mfg/mfg-index.js` (175 lines)
- `m/js/sales/sales-index.js` (175 lines)
- `m/js/prj/prj-index.js` (172 lines)
- `m/js/bi/bi-index.js` (169 lines)
- `m/js/documents/documents-index.js` (169 lines)
- `m/js/comp/comp-index.js` (169 lines)
- `m/js/ecom/ecom-index.js` (~170 lines)

### Solution
Create `layer8m-module-registry-factory.js` - a factory function that generates the entire registry from configuration:

```javascript
// New shared factory (~50 lines)
window.Layer8MModuleRegistry = {
    create: function(moduleName, subModules, moduleNameMap) {
        function findModule(modelName) {
            for (const mod of subModules) {
                if (mod.columns && mod.columns[modelName]) return mod;
            }
            return null;
        }
        return {
            getFormDef: (m) => { const mod = findModule(m); return mod?.forms?.[m] || null; },
            getColumns: (m) => { const mod = findModule(m); return mod?.columns?.[m] || null; },
            getEnums: (m) => { const mod = findModule(m); return mod?.enums || null; },
            getPrimaryKey: (m) => { const mod = findModule(m); return mod?.primaryKeys?.[m] || null; },
            getRender: (m) => { const mod = findModule(m); return mod?.render || null; },
            getAllModels: () => subModules.flatMap(m => m.columns ? Object.keys(m.columns) : []),
            hasModel: (m) => findModule(m) !== null,
            getModuleName: (m) => { const mod = findModule(m); return moduleNameMap.get(mod) || null; },
            modules: Object.fromEntries(moduleNameMap.entries())
        };
    }
};
```

Each index file shrinks to ~15 lines:
```javascript
window.MobileHCM = Layer8MModuleRegistry.create('HCM',
    [MobileCoreHR, MobilePayroll, MobileBenefits, MobileCompensation, MobileLearning, MobileTalent, MobileTime],
    new Map([[MobileCoreHR, 'Core HR'], [MobilePayroll, 'Payroll'], /* ... */])
);
```

### Estimated Savings
- **Before**: 11 files x 170 lines = 1,870 lines
- **After**: 1 factory (50 lines) + 11 config files (15 lines each) = 215 lines
- **Net savings: ~1,655 lines (88% reduction)**

### Risk: Low
- Pure refactoring of identical code
- Easy to verify: all mobile module lookups still work

---

## Tier 2: Mobile Column Factory Adoption (JS)

### Problem
Desktop column files already use `Layer8ColumnFactory` (Phase 3 refactoring), but mobile column files still use verbose manual definitions. The factory is available globally but mobile files don't use it.

### Files Affected
~45 mobile column files across all modules (`m/js/*/`-columns.js)

### Current Mobile Pattern (verbose)
```javascript
MobileProcurement.columns = {
    ScmPurchaseOrder: [
        { key: 'purchaseOrderId', label: 'ID', sortKey: 'purchaseOrderId', filterKey: 'purchaseOrderId' },
        { key: 'orderNumber', label: 'PO #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
        { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status',
          enumValues: enums.PO_STATUS_VALUES, render: (item) => render.poStatus(item.status) },
        { key: 'totalAmount', label: 'Total', sortKey: 'totalAmount',
          render: (item) => Layer8MRenderers.renderMoney(item.totalAmount) },
    ]
};
```

### Target Pattern (using factory)
```javascript
const col = window.Layer8ColumnFactory;
MobileProcurement.columns = {
    ScmPurchaseOrder: [
        ...col.id('purchaseOrderId'),
        ...col.basic(['orderNumber']),
        ...col.enum('status', 'Status', enums.PO_STATUS_VALUES, render.poStatus),
        ...col.money('totalAmount', 'Total'),
    ]
};
```

### Estimated Savings
- **Before**: ~45 files x ~80 lines avg = 3,600 lines
- **After**: ~45 files x ~40 lines avg = 1,800 lines
- **Net savings: ~1,800 lines (50% reduction)**

### Risk: Low
- Factory already proven on desktop
- Verify `Layer8ColumnFactory` is loaded before mobile scripts in `m/app.html`

---

## Tier 3: CSS Status Color Consolidation (CSS)

### Problem
7 module CSS files (mfg, crm, prj, bi, documents, ecom, comp) contain nearly identical status/type color class definitions. Each follows the same pattern:
```css
.{module}-{entity}-status-{value} {
    background-color: var(--layer8d-{color}-bg);
    color: var(--layer8d-{color}-text);
}
```

1,194 lines of color rules map to ~15 shared CSS color variables. The semantic mappings are consistent across modules (green = approved/active, yellow = pending/draft, red = failed/cancelled, gray = inactive/closed).

### Files Affected
| Module | Lines | Color Rules |
|--------|-------|------------|
| mfg/mfg.css | 69 | Work order status, priority |
| crm/crm.css | 147 | Opportunity stage, lead status |
| projects/projects.css | 242 | Project/task status, priority |
| bi/bi.css | 249 | Report/dashboard status |
| documents/documents.css | 103 | Document status, access level |
| ecom/ecom.css | 163 | Order/product status |
| comp/comp.css | 221 | Compliance/risk/audit status |

### Solution
Create a CSS status class generator (JS-driven) that registers module status classes from configuration:

```javascript
// layer8-status-classes.js (~40 lines)
window.Layer8StatusClasses = {
    register: function(prefix, statusMap) {
        // statusMap: { 'active': 'green', 'pending': 'yellow', ... }
        const style = document.createElement('style');
        let css = '';
        for (const [status, color] of Object.entries(statusMap)) {
            css += `.${prefix}-${status}{background-color:var(--layer8d-${color}-bg);color:var(--layer8d-${color}-text)}\n`;
        }
        style.textContent = css;
        document.head.appendChild(style);
    }
};
```

Each module's CSS file shrinks to a config call:
```javascript
Layer8StatusClasses.register('mfg-wo-status', {
    planned: 'yellow', released: 'blue', 'in-progress': 'green',
    'on-hold': 'orange', completed: 'green-light', closed: 'gray', cancelled: 'red'
});
```

### Estimated Savings
- **Before**: 1,194 lines of color CSS
- **After**: 40 lines (generator) + ~200 lines (config calls in module CSS)
- **Net savings: ~950 lines (80% reduction)**

### Risk: Low
- CSS variable names already standardized
- Existing color palette unchanged

---

## Tier 4: Go ServiceCallback Validation Builder (Go)

### Problem
376 `*ServiceCallback.go` files follow an identical structure. ~300 of them are "simple" callbacks (1-3 required field validations). The remaining ~76 have complex validations (enum checks, date checks, reference lookups) but still follow predictable patterns.

### Current Pattern (34-40 lines per simple callback)
```go
func newBiDashboardServiceCallback() ifs.IServiceCallback {
    return common.NewServiceCallback("BiDashboard",
        func(e *bi.BiDashboard) { common.GenerateID(&e.DashboardId) },
        validate)
}

func validate(item *bi.BiDashboard, vnic ifs.IVNic) error {
    if err := common.ValidateRequired(item.DashboardId, "DashboardId"); err != nil {
        return err
    }
    return nil
}
```

### Solution
Create a validation builder in `go/erp/common/` that handles the common patterns declaratively:

```go
// common/validation_builder.go (~80 lines)
type ValidationBuilder[T any] struct {
    typeName       string
    idSetter       func(*T)
    requiredFields []RequiredField[T]
}

func NewValidation[T any](typeName string, idSetter func(*T)) *ValidationBuilder[T] { ... }
func (b *ValidationBuilder[T]) Required(getter func(*T) string, name string) *ValidationBuilder[T] { ... }
func (b *ValidationBuilder[T]) Build() ifs.IServiceCallback { ... }
```

Simple callbacks become 1-3 lines:
```go
func newBiDashboardServiceCallback() ifs.IServiceCallback {
    return common.NewValidation("BiDashboard",
        func(e *bi.BiDashboard) { common.GenerateID(&e.DashboardId) }).
        Required(func(e *bi.BiDashboard) string { return e.DashboardId }, "DashboardId").
        Build()
}
```

For the ~300 simple callbacks, the savings are ~15 lines per file. Complex callbacks keep their custom validation logic but use the builder for the common patterns.

### Estimated Savings
- **Before**: ~300 simple callbacks x 35 lines = 10,500 lines
- **After**: ~300 simple callbacks x 20 lines = 6,000 lines
- **Net savings: ~4,500 lines (43% reduction)**

### Risk: Medium
- Requires careful testing - validation is business-critical
- Complex callbacks need case-by-case evaluation
- Generics help but add compile-time complexity

---

## Tier 5: Mock Line Item Generator Abstraction (Go)

### Problem
20+ mock data generator functions follow an identical parent-child line item pattern across modules (Sales, MFG, FIN, SCM, ECOM, PRJ):

```go
func generateSalesOrderLines(store *MockDataStore) []*sales.SalesOrderLine {
    count := len(store.SalesOrderIDs) * 3
    lines := make([]*sales.SalesOrderLine, 0, count)
    idx := 1
    for oIdx, orderID := range store.SalesOrderIDs {
        for j := 0; j < 3; j++ {
            itemID := pickRef(store.ItemIDs, (oIdx*3+j))
            // ... generate line fields
            lines = append(lines, &sales.SalesOrderLine{ ... })
            idx++
        }
    }
    return lines
}
```

### Files Affected
- `gen_sales_orders.go` (QuotationLines, OrderLines, ReturnOrderLines, DeliveryLines)
- `gen_fin_gl.go` (JournalEntryLines)
- `gen_fin_budgeting.go` (BudgetLines)
- `gen_mfg_foundation.go` (BomLines, RoutingOps)
- `gen_mfg_production.go` (ProdOrderLines)
- `gen_scm_procurement.go` (PurchaseOrderLines, RequisitionLines)
- `gen_ecom_orders.go` (OrderLines)
- `gen_prj_billing.go` (InvoiceLines)
- ~8 more line-item generators

### Solution
Create a generic line-item generator helper in `phase_helpers.go`:

```go
func GenerateLines[P any, L any](
    parentIDs []string,
    linesPerParent int,
    createLine func(idx, parentIdx, lineIdx int, parentID string) *L,
) []*L {
    lines := make([]*L, 0, len(parentIDs)*linesPerParent)
    idx := 1
    for pIdx, parentID := range parentIDs {
        for j := 0; j < linesPerParent; j++ {
            lines = append(lines, createLine(idx, pIdx, j, parentID))
            idx++
        }
    }
    return lines
}
```

### Estimated Savings
- **Before**: ~20 generators x 30 lines scaffold = 600 lines
- **After**: 1 helper (15 lines) + 20 generators x 15 lines = 315 lines
- **Net savings: ~285 lines (47% reduction)**

### Risk: Low
- Mock data only - no production impact
- Easy to validate by running mock generator

---

## Tier 6: Mobile Enum/Form Setup Boilerplate (JS)

### Problem
48 mobile enum files and 30 mobile form files each have 10-15 lines of identical setup boilerplate (copyright, module initialization, factory imports, export pattern).

### Solution
Reduce to minimal setup where possible. The factory patterns (Layer8EnumFactory, Layer8FormFactory) are already used correctly in mobile - the remaining duplication is just the wrapper IIFE and module initialization pattern.

Since this is largely copyright headers + 5 lines of setup, the effort-to-benefit ratio is lower than other tiers.

### Estimated Savings
- Enum setup: 48 files x 10 lines = 480 lines -> ~240 saved
- Form setup: 30 files x 8 lines = 240 lines -> ~120 saved
- **Net savings: ~360 lines**

### Risk: Low

---

## Implementation Order & Summary

| Tier | Area | Files | Lines Saved | Effort | Risk |
|------|------|-------|-------------|--------|------|
| 1 | Mobile Index Registry Factory | 11 + 1 new | ~1,655 | Low | Low |
| 2 | Mobile Column Factory Adoption | 45 | ~1,800 | Medium | Low |
| 3 | CSS Status Color Consolidation | 7 + 1 new | ~950 | Low | Low |
| 4 | Go ServiceCallback Builder | 300+ | ~4,500 | High | Medium |
| 5 | Mock Line Item Generator | 20 + helper | ~285 | Low | Low |
| 6 | Mobile Enum/Form Boilerplate | 78 | ~360 | Low | Low |
| **Total** | | **~462 files** | **~9,550** | | |

### Dependencies
- Tier 1-3 are independent and can be done in parallel
- Tier 4 is independent but higher risk, recommend after Tier 1-3
- Tier 5 is independent
- Tier 6 can be done anytime

### Not Included (Already Abstracted)
The following were previously refactored and are not re-addressed:
- Desktop column factory (Phase 3 - complete)
- Desktop/mobile form factory (Phase 4 - complete)
- Desktop/mobile enum factory (Phase 5 - complete)
- Section generator (Phase 6 - complete)
- Mock data helpers: `runOp`, `extractIDs`, `runPhase` (Phase 10 - complete)
- JS submodule entry point deduplication (Phase 11 - complete)

### Not Included (Low ROI or Architectural Constraints)
- **Go *Service.go files** (376 files, ~15,000 lines): These are structurally repetitive but each file provides a distinct Go package with exported functions. Go's package system and lack of code generation means these can't be easily abstracted without a build step or fundamentally changing the architecture. The current pattern works correctly and is well-established.
- **Go type registration** (shared_*.go files, ~610 lines): These use Go generics and compile-time type safety. Moving to a config-driven approach would lose type checking. The current pattern is correct.
- **Go phase files** (17 files): Already use `runOp`/`extractIDs` helpers from Phase 10. Further abstraction would require reflection or code generation, adding complexity without proportional benefit.
