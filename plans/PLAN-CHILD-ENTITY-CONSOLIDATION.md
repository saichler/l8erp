# Plan: Child Entity Consolidation (Prime Object Restructuring)

## Context

The L8ERP system has **~134 child entities** incorrectly implemented as separate Prime Objects (services). Entities like SalesOrderLine, JournalEntryLine, MfgBomLine, FiscalPeriod, ScmBin should be embedded `repeated` fields inside their parent protobuf messages — not independent services. This matches the existing correct pattern in HCM (BenefitPlan embeds CoverageOption, PlanCost, EligibilityRules as non-Prime types).

This refactoring removes ~134 services (376 -> ~242), deletes ~134 service directories, and updates protos, mock data, and UI across 10 modules. HCM is already correct and needs no changes.

**Note:** The updated Prime Object Rule (Rule 1 — 4-point test) was applied to re-audit all 376 services. The original audit found 78 children; the re-audit found 56 additional children that were missed.

---

## Complete Child -> Parent Mapping (134 services to remove)

### Sales Module (16 children)

| # | Child Service (to remove) | Parent (embeds child) | Relationship |
|---|--------------------------|----------------------|-------------|
| 1 | salesorderlines | salesorders | `repeated SalesOrderLine lines` |
| 2 | quotationlines | salesquotations | `repeated SalesQuotationLine lines` |
| 3 | returnorderlines | returnorders | `repeated SalesReturnOrderLine lines` |
| 4 | deliverylines | deliveryorders | `repeated SalesDeliveryLine lines` |
| 5 | orderallocations | salesorders | `repeated SalesOrderAllocation allocations` |
| 6 | backorders | salesorders | `repeated SalesBackOrder back_orders` |
| 7 | pickreleases | deliveryorders | `repeated SalesPickRelease pick_releases` |
| 8 | packingslips | deliveryorders | `repeated SalesPackingSlip packing_slips` |
| 9 | shippingdocs | deliveryorders | `repeated SalesShippingDoc shipping_docs` |
| 10 | deliveryconfirms | deliveryorders | `repeated SalesDeliveryConfirm confirms` |
| 11 | pricelistentries | pricelists | `repeated SalesPriceListEntry entries` |
| 12 | quantitybreaks | pricelists | `repeated SalesQuantityBreak quantity_breaks` |
| 13 | customerprices | customercontracts | `repeated SalesCustomerPrice prices` |
| 14 | territoryassigns | salesterritories | `repeated SalesTerritoryAssign assignments` |
| 15 | commissioncalcs | commissionplans | `repeated SalesCommissionCalc calculations` |
| 16 | billingmilestones | billingschedules | `repeated SalesBillingMilestone milestones` |

### FIN Module (21 children)

| # | Child Service | Parent | Relationship |
|---|--------------|--------|-------------|
| 1 | journalentrylines | journalentries | `repeated JournalEntryLine lines` |
| 2 | purchaseinvoicelines | purchaseinvoices | `repeated PurchaseInvoiceLine lines` |
| 3 | salesinvoicelines | salesinvoices | `repeated SalesInvoiceLine lines` |
| 4 | budgetlines | budgets | `repeated BudgetLine lines` |
| 5 | paymentallocations | customerpayments/vendorpayments | `repeated PaymentAllocation allocations` |
| 6 | budgetscenarios | budgets | `repeated BudgetScenario scenarios` |
| 7 | budgettransfers | budgets | `repeated BudgetTransfer transfers` |
| 8 | customercontacts | customers | `repeated CustomerContact contacts` |
| 9 | vendorcontacts | vendors | `repeated VendorContact contacts` |
| 10 | paymentapplications | customerpayments | `repeated PaymentApplication applications` |
| 11 | depreciationschedules | assets | `repeated DepreciationSchedule schedules` |
| 12 | assetdisposals | assets | `repeated AssetDisposal disposals` |
| 13 | assettransfers | assets | `repeated AssetTransfer transfers` |
| 14 | assetmaintenance | assets | `repeated AssetMaintenance maintenance` |
| 15 | assetrevaluations | assets | `repeated AssetRevaluation revaluations` |
| 16 | fiscalperiods | fiscalyears | `repeated FiscalPeriod periods` |
| 17 | accountbalances | accounts | `repeated AccountBalance balances` |
| 18 | banktransactions | bankaccounts | `repeated BankTransaction transactions` |
| 19 | bankreconciliations | bankaccounts | `repeated BankReconciliation reconciliations` |
| 20 | taxreturns | fiscalyears | `repeated TaxReturn returns` (via embedded FiscalPeriod) |
| 21 | withholdingtaxconfigs | vendors | `repeated WithholdingTaxConfig configs` |

### SCM Module (15 children)

| # | Child Service | Parent | Relationship |
|---|--------------|--------|-------------|
| 1 | purchaseorderlines | purchaseorders | `repeated ScmPurchaseOrderLine lines` |
| 2 | requisitionlines | requisitions | `repeated ScmRequisitionLine lines` |
| 3 | picktasks | waveplans | `repeated ScmPickTask pick_tasks` (flatten) |
| 4 | packtasks | waveplans | `repeated ScmPackTask pack_tasks` (flatten) |
| 5 | shiptasks | waveplans | `repeated ScmShipTask ship_tasks` (flatten) |
| 6 | putawaytasks | receivingorders | `repeated ScmPutawayTask putaway_tasks` |
| 7 | bins | warehouses | `repeated ScmBin bins` |
| 8 | lotnumbers | items | `repeated ScmLotNumber lots` |
| 9 | serialnumbers | items | `repeated ScmSerialNumber serials` |
| 10 | reorderpoints | items | `repeated ScmReorderPoint reorder_points` |
| 11 | inventoryvaluations | items | `repeated ScmInventoryValuation valuations` |
| 12 | stockmovements | items | `repeated ScmStockMovement movements` |
| 13 | deliveryproofs | shipments | `repeated ScmDeliveryProof proofs` |
| 14 | forecastaccuracies | demandforecasts | `repeated ScmForecastAccuracy accuracies` |
| 15 | freightaudits | shipments | `repeated ScmFreightAudit audits` |

### MFG Module (18 children)

| # | Child Service | Parent | Relationship |
|---|--------------|--------|-------------|
| 1 | bomlines | boms | `repeated MfgBomLine lines` |
| 2 | routingoperations | routings | `repeated MfgRoutingOperation operations` |
| 3 | workorderops | workorders | `repeated MfgWorkOrderOp operations` |
| 4 | prodorderlines | productionorders | `repeated MfgProdOrderLine lines` |
| 5 | laborentries | workorders | `repeated MfgLaborEntry labor_entries` |
| 6 | machineentries | workorders | `repeated MfgMachineEntry machine_entries` |
| 7 | engchangedetails | engchangeorders | `repeated MfgEngChangeDetail details` |
| 8 | ncractions | ncrs | `repeated MfgNcrAction actions` |
| 9 | inspectionpoints | qualityplans | `repeated MfgInspectionPoint points` |
| 10 | scheduleblocks | prodschedules | `repeated MfgScheduleBlock blocks` |
| 11 | testresults | qualityinspections | `repeated MfgTestResult results` |
| 12 | prodconsumptions | workorders | `repeated MfgProdConsumption consumptions` |
| 13 | prodbatches | workorders | `repeated MfgProdBatch batches` |
| 14 | capacityloads | capacityplans | `repeated MfgCapacityLoad loads` |
| 15 | mrprequirements | mrpruns | `repeated MfgMrpRequirement requirements` |
| 16 | actualcosts | workorders | `repeated MfgActualCost actual_costs` |
| 17 | costvariances | workorders | `repeated MfgCostVariance variances` |
| 18 | overheadallocs | overheads | `repeated MfgOverheadAlloc allocations` |

### CRM Module (14 children)

| # | Child Service | Parent | Relationship |
|---|--------------|--------|-------------|
| 1 | campaignmembers | campaigns | `repeated CrmCampaignMember members` |
| 2 | campaignresponses | campaigns | `repeated CrmCampaignResponse responses` |
| 3 | campaignrois | campaigns | `repeated CrmCampaignRoi roi_records` |
| 4 | oppactivities | opportunities | `repeated CrmOppActivity activities` |
| 5 | oppproducts | opportunities | `repeated CrmOppProduct products` |
| 6 | oppteams | opportunities | `repeated CrmOppTeam team_members` |
| 7 | oppcompetitors | opportunities | `repeated CrmOppCompetitor competitors` |
| 8 | casecomments | cases | `repeated CrmCaseComment comments` |
| 9 | leadactivities | leads | `repeated CrmLeadActivity activities` |
| 10 | leadconversions | leads | `repeated CrmLeadConversion conversions` |
| 11 | serviceparts | serviceorders | `repeated CrmServicePart parts` |
| 12 | servicevisits | serviceorders | `repeated CrmServiceVisit visits` |
| 13 | healthscores | accounts | `repeated CrmHealthScore health_scores` |
| 14 | accountplans | accounts | `repeated CrmAccountPlan plans` |

### PRJ Module (15 children)

| # | Child Service | Parent | Relationship |
|---|--------------|--------|-------------|
| 1 | phases | projects | `repeated PrjPhase phases` |
| 2 | timesheetentries | timesheets | `repeated PrjTimesheetEntry entries` |
| 3 | expenseentries | expensereports | `repeated PrjExpenseEntry entries` |
| 4 | invoicelines | projectinvoices | `repeated PrjInvoiceLine lines` |
| 5 | dependencies | projects | `repeated PrjDependency dependencies` |
| 6 | tasks | projects | `repeated PrjTask tasks` |
| 7 | milestones | projects | `repeated PrjMilestone milestones` |
| 8 | deliverables | projects | `repeated PrjDeliverable deliverables` |
| 9 | risks | projects | `repeated PrjRisk risks` |
| 10 | projectissues | projects | `repeated PrjProjectIssue issues` |
| 11 | budgetvariances | projects | `repeated PrjBudgetVariance budget_variances` |
| 12 | earnedvalues | projects | `repeated PrjEarnedValue earned_values` |
| 13 | resourceforecasts | projects | `repeated PrjResourceForecast resource_forecasts` |
| 14 | resourceskills | resources | `repeated PrjResourceSkill skills` |
| 15 | billingmilestones | billingschedules | `repeated PrjBillingMilestone milestones` |

### ECOM Module (7 children)

| # | Child Service | Parent | Relationship |
|---|--------------|--------|-------------|
| 1 | orderlines | orders | `repeated EcomOrderLine lines` |
| 2 | orderstatuses | orders | `repeated EcomOrderStatus status_history` |
| 3 | returnlines | returns | `repeated EcomReturnLine lines` |
| 4 | images | products | `repeated EcomImage images` |
| 5 | variants | products | `repeated EcomVariant variants` |
| 6 | customeraddresses | customers | `repeated EcomCustomerAddress addresses` |
| 7 | wishlistitems | wishlists | `repeated EcomWishlistItem items` |

### BI Module (10 children)

| # | Child Service | Parent | Relationship |
|---|--------------|--------|-------------|
| 1 | kpithresholds | kpis | `repeated BiKpiThreshold thresholds` |
| 2 | dashboardshares | dashboards | `repeated BiDashboardShare shares` |
| 3 | dashboardwidgets | dashboards | `repeated BiDashboardWidget widgets` |
| 4 | drilldowns | dashboards | `repeated BiDrilldown drilldowns` |
| 5 | reportexecutions | reports | `repeated BiReportExecution executions` |
| 6 | reportaccesses | reports | `repeated BiReportAccess accesses` |
| 7 | reportsubscriptions | reports | `repeated BiReportSubscription subscriptions` |
| 8 | predictions | analysismodels | `repeated BiPrediction predictions` |
| 9 | reportschedules | reports | `repeated BiReportSchedule schedules` |
| 10 | etlschedules | etljobs | `repeated BiETLSchedule schedules` |

### DOC Module (9 children)

| # | Child Service | Parent | Relationship |
|---|--------------|--------|-------------|
| 1 | versions | documents | `repeated DocDocumentVersion versions` |
| 2 | checkouts | documents | `repeated DocCheckout checkouts` |
| 3 | workflowsteps | approvalworkflows | `repeated DocWorkflowStep steps` |
| 4 | templatefields | templates | `repeated DocTemplateField fields` |
| 5 | reviewcomments | documents | `repeated DocReviewComment comments` |
| 6 | signatures | documents | `repeated DocSignature signatures` |
| 7 | attachments | documents | `repeated DocAttachment attachments` |
| 8 | accesslogs | documents | `repeated DocAccessLog access_logs` |
| 9 | audittrails | documents | `repeated DocAuditTrail audit_trails` |

### COMP Module (9 children)

| # | Child Service | Parent | Relationship |
|---|--------------|--------|-------------|
| 1 | remediationactions | auditfindings | `repeated CompRemediationAction actions` |
| 2 | controlassessments | controls | `repeated CompControlAssessment assessments` |
| 3 | riskassessments | riskregisters | `repeated CompRiskAssessment assessments` |
| 4 | requirements | regulations | `repeated CompRequirement requirements` |
| 5 | segregationrules | controls | `repeated CompSegregationRule rules` |
| 6 | violationrecords | requirements | `repeated CompViolationRecord violations` |
| 7 | mitigationplans | riskregisters | `repeated CompMitigationPlan plans` |
| 8 | auditreports | auditschedules | `repeated CompAuditReport reports` |
| 9 | compliancestatuses | requirements | `repeated CompComplianceStatus statuses` |

---

## Per-Child Checklist (repeat for each child)

For each child entity consolidated into its parent:

### Proto Layer
- [ ] Add `repeated ChildType field_name = N;` to parent message in `.proto` file
- [ ] Remove `parent_id` field from child message (no longer needed — parent contains it)
- [ ] Delete `ChildTypeList` message (no longer a standalone collection)
- [ ] Keep child's own ID field (for addressing individual records within parent)
- [ ] Run `make-bindings.sh` to regenerate `.pb.go` files

### Go Service Layer
- [ ] Delete entire child service directory (`go/erp/<module>/<child>/`)
- [ ] Remove child type registration from `go/erp/ui/main.go`

### Mock Data Layer
- [ ] Remove child ID slices from `go/tests/mocks/store.go`
- [ ] Remove child generator function from `gen_<module>_*.go`
- [ ] Remove child phase calls from `<module>_phases*.go`
- [ ] Update parent generator to populate the new embedded `repeated` field

### UI Layer — Desktop
- [ ] Remove child service entry from `*-config.js`
- [ ] Remove child column definitions from `*-columns.js`
- [ ] Remove child form definition from `*-forms.js`
- [ ] Remove child enums from `*-enums.js` (if module-specific)
- [ ] Add inline table definition to parent form (using new `f.inlineTable()` method)
- [ ] Remove child from reference registry (`reference-registry-*.js`) if registered
- [ ] Remove child script includes from `app.html`

### UI Layer — Mobile
- [ ] Remove child from mobile nav config (`layer8m-nav-config.js`)
- [ ] Remove child column/form/enum definitions from mobile JS files
- [ ] Update parent mobile form with inline table
- [ ] Remove child script includes from `m/app.html`

---

## Implementation Tiers

### Tier 0: UI Inline Table Component (PREREQUISITE)

Before any consolidation, build the form field type for editing embedded `repeated` types within a parent form. This component enables parent forms to display, add, edit, and delete child rows inline.

---

#### 0.1 Form Factory Method (shared — used by both desktop and mobile)

**File:** `go/erp/ui/web/l8ui/shared/layer8-form-factory.js`

Add `f.inlineTable()` to `Layer8FormFactory`:

```javascript
// Usage in form definitions:
SalesOrder: f.form('Sales Order', [
    f.section('Order Details', [
        ...f.text('orderNumber', 'Order #', true),
        ...f.reference('customerId', 'Customer', 'Customer', true),
        ...f.money('totalAmount', 'Total'),
    ]),
    f.section('Order Lines', [
        ...f.inlineTable('lines', 'Order Lines', [
            { key: 'lineId', label: 'Line ID', hidden: true },
            { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
            { key: 'quantity', label: 'Qty', type: 'number', required: true },
            { key: 'unitPrice', label: 'Unit Price', type: 'money' },
            { key: 'status', label: 'Status', type: 'select', options: enums.ORDER_LINE_STATUS },
        ]),
    ]),
])

// Factory method definition:
inlineTable: function(key, label, columns, required) {
    const field = {
        key: key,
        label: label || this._toTitleCase(key),
        type: 'inlineTable',
        columns: columns,   // Array of column definitions (same shape as form fields)
    };
    if (required) field.required = true;
    return [field];
}
```

Each column in the `columns` array follows the same field definition shape as regular form fields (`key`, `label`, `type`, `required`, `options`, `lookupModel`, etc.). This reuses existing field type infrastructure.

---

#### 0.2 Desktop Rendering

**File:** `go/erp/ui/web/l8ui/shared/layer8d-forms-fields.js`

Add `case 'inlineTable':` to the `generateFieldHtml` switch:

**HTML structure generated inside the form:**

```html
<div class="form-inline-table" data-inline-table="lines">
    <!-- Header row -->
    <div class="form-inline-table-header">
        <span>Item</span>
        <span>Qty</span>
        <span>Unit Price</span>
        <span>Status</span>
        <span></span>  <!-- Actions column -->
    </div>

    <!-- Data rows (one per child record) -->
    <div class="form-inline-table-body">
        <div class="form-inline-table-row" data-row-index="0">
            <span class="form-inline-table-cell">Widget A</span>
            <span class="form-inline-table-cell">10</span>
            <span class="form-inline-table-cell">$25.00 USD</span>
            <span class="form-inline-table-cell">Confirmed</span>
            <span class="form-inline-table-actions">
                <button type="button" class="form-inline-table-btn edit" data-action="edit-row">Edit</button>
                <button type="button" class="form-inline-table-btn delete" data-action="delete-row">Delete</button>
            </span>
        </div>
        <!-- ... more rows ... -->
    </div>

    <!-- Add button -->
    <div class="form-inline-table-footer">
        <button type="button" class="form-inline-table-btn add" data-action="add-row">+ Add Line</button>
    </div>

    <!-- Hidden JSON storage for data collection -->
    <input type="hidden" name="lines" data-inline-table-data="lines" value='[...]'>
</div>
```

**Key design decisions:**
- Rows are **read-only display** in the table — not inline-editable inputs
- **Edit** opens a sub-form popup (reusing `Layer8DPopup`) with the row's column definitions as form fields
- **Add** opens the same sub-form popup with empty fields
- **Delete** removes the row with a confirmation prompt
- A hidden `<input>` holds the JSON-serialized array for data collection
- Hidden columns (like `lineId`) are stored in the data but not displayed

**Row edit sub-form popup:**

When the user clicks "Edit" or "+ Add Line", a popup opens with a mini-form:

```javascript
function openRowEditor(field, rowIndex, rowData) {
    // Build a mini form definition from the inline table's column definitions
    const miniFormDef = {
        title: rowIndex >= 0 ? 'Edit Line' : 'Add Line',
        sections: [{
            title: field.label,
            fields: field.columns.filter(col => !col.hidden)
        }]
    };

    // Render using existing generateFormHtml()
    const html = Layer8DFormsFields.generateFormHtml(miniFormDef, rowData || {});

    Layer8DPopup.show({
        title: miniFormDef.title,
        content: html,
        size: 'small',
        showFooter: true,
        saveButtonText: rowIndex >= 0 ? 'Update' : 'Add',
        onSave: () => {
            // Collect data from the mini-form using existing collectFormData()
            const newRowData = Layer8DFormsData.collectFormData(miniFormDef);
            // Update the hidden JSON input and re-render the table rows
            updateInlineTableRow(field.key, rowIndex, newRowData);
        },
        onShow: () => {
            // Attach pickers (date, reference) to the sub-form
            Layer8DFormsPickers.attachDatePickers(popup);
            Layer8DFormsPickers.attachReferencePickers(popup);
            Layer8DFormsPickers.attachInputFormatters(popup);
        }
    });
}
```

This approach **reuses all existing form infrastructure** — `generateFormHtml`, `collectFormData`, date pickers, reference pickers, input formatters, money fields — without duplication.

---

#### 0.3 Desktop Data Collection

**File:** `go/erp/ui/web/l8ui/shared/layer8d-forms-data.js`

Update the compound field guard and add collection case:

```javascript
// Update guard to include inlineTable
const element = form.elements[field.key];
if (!element && field.type !== 'money' && field.type !== 'inlineTable') return;

// Add case in switch
case 'inlineTable': {
    const hiddenInput = form.querySelector(`input[data-inline-table-data="${field.key}"]`);
    if (hiddenInput && hiddenInput.value) {
        value = JSON.parse(hiddenInput.value);  // Array of row objects
    } else {
        value = [];
    }
    break;
}
```

**Data shape sent to server:**

```json
{
    "salesOrderId": "SO-001",
    "orderNumber": "ORD-2024-001",
    "customerId": "CUST-001",
    "totalAmount": { "amount": 25000, "currencyId": "USD" },
    "lines": [
        {
            "lineId": "SOL-001",
            "itemId": "ITEM-001",
            "quantity": 10,
            "unitPrice": { "amount": 2500, "currencyId": "USD" },
            "status": "CONFIRMED"
        },
        {
            "lineId": "SOL-002",
            "itemId": "ITEM-002",
            "quantity": 5,
            "unitPrice": { "amount": 5000, "currencyId": "USD" },
            "status": "PENDING"
        }
    ]
}
```

---

#### 0.4 Mobile Rendering

**File:** `go/erp/ui/web/l8ui/m/js/layer8m-forms-fields.js`

Add `case 'inlineTable':` to the mobile field dispatcher.

Mobile uses **card-based layout** (not grid table) for touch optimization:

```html
<div class="mobile-form-field">
    <label class="mobile-form-label">Order Lines</label>
    <div class="mobile-form-inline-table" data-inline-table="lines">

        <!-- Card per row -->
        <div class="mobile-form-inline-card" data-row-index="0">
            <div class="mobile-form-inline-card-header">
                <span class="mobile-form-inline-card-title">Widget A</span>
                <div class="mobile-form-inline-card-actions">
                    <button type="button" data-action="edit-row">Edit</button>
                    <button type="button" data-action="delete-row">Delete</button>
                </div>
            </div>
            <div class="mobile-form-inline-card-body">
                <div class="mobile-form-inline-card-row">
                    <span class="mobile-form-inline-card-label">Qty</span>
                    <span class="mobile-form-inline-card-value">10</span>
                </div>
                <div class="mobile-form-inline-card-row">
                    <span class="mobile-form-inline-card-label">Unit Price</span>
                    <span class="mobile-form-inline-card-value">$25.00 USD</span>
                </div>
            </div>
        </div>

        <!-- Add button (44px touch target) -->
        <button type="button" class="mobile-form-inline-add" data-action="add-row">+ Add Line</button>

        <!-- Hidden data storage -->
        <input type="hidden" name="lines" data-inline-table-data="lines" value='[...]'>
    </div>
</div>
```

- First visible column becomes **card title** (like mobile table's `primary` column)
- Remaining visible columns become **key-value pairs** in card body
- Edit/Add opens a **bottom sheet** or full-screen sub-form (using mobile form rendering)
- All touch targets are minimum 44px
- Reuses `layer8m-forms.css` design tokens (spacing, colors, borders)

**Mobile data collection** (`layer8m-forms.js` `getFormData()`):

```javascript
// In the compound field post-processing section:
container.querySelectorAll('input[data-inline-table-data]').forEach(hiddenInput => {
    const key = hiddenInput.name;
    if (hiddenInput.value) {
        formData[key] = JSON.parse(hiddenInput.value);
    }
});
```

---

#### 0.5 CSS (Desktop + Mobile)

**Desktop** — Add to `layer8d-forms.css` or new `layer8d-forms-inline-table.css`:

```css
.form-inline-table { border: 1px solid var(--layer8d-border); border-radius: 6px; margin-top: 8px; }
.form-inline-table-header { display: grid; background: var(--layer8d-bg-alt); padding: 8px 12px; font-weight: 600; font-size: 12px; border-bottom: 1px solid var(--layer8d-border); }
.form-inline-table-row { display: grid; padding: 8px 12px; border-bottom: 1px solid var(--layer8d-border-light); align-items: center; }
.form-inline-table-row:hover { background: var(--layer8d-bg-hover); }
.form-inline-table-actions { display: flex; gap: 4px; }
.form-inline-table-btn { padding: 4px 10px; border: 1px solid var(--layer8d-border); border-radius: 4px; background: var(--layer8d-bg); cursor: pointer; font-size: 12px; }
.form-inline-table-btn.add { width: 100%; margin: 8px 0; border-style: dashed; }
.form-inline-table-btn.delete { color: var(--layer8d-error); border-color: var(--layer8d-error); }
```

Grid column widths are set dynamically based on column count (excluding hidden columns).

**Mobile** — Add to `layer8m-forms.css`:

```css
.mobile-form-inline-table { margin-top: var(--spacing-sm); }
.mobile-form-inline-card { border: 1px solid var(--border-light); border-radius: var(--radius-md); margin-bottom: var(--spacing-sm); overflow: hidden; }
.mobile-form-inline-card-header { display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-sm) var(--spacing-md); background: var(--bg-secondary); }
.mobile-form-inline-card-body { padding: var(--spacing-sm) var(--spacing-md); }
.mobile-form-inline-card-row { display: flex; justify-content: space-between; padding: var(--spacing-xs) 0; }
.mobile-form-inline-add { width: 100%; min-height: var(--touch-target); border: 2px dashed var(--border-light); border-radius: var(--radius-md); background: transparent; cursor: pointer; font-size: 14px; color: var(--layer8d-primary); }
```

---

#### 0.6 Detail View — Inline Table Rendering (Desktop + Mobile)

The detail view reuses form definitions but renders all fields as **read-only** (disabled inputs). Currently, unrecognized field types are silently skipped. After consolidation, viewing a parent's details MUST show its children as a read-only sub-table.

**Desktop** (`layer8d-forms-fields.js` — already handles form rendering):

The existing `case 'inlineTable':` in `generateFieldHtml` must detect whether the form is in **detail mode** (read-only) or **edit mode**:

- **Detail mode (read-only)**: Render a grid table of child rows with NO Add/Edit/Delete buttons. Rows are **clickable** (see 0.7 below). No hidden JSON input needed.
- **Edit mode**: Render the full editable table with Add/Edit/Delete buttons and hidden JSON input (as described in 0.2-0.3).

The detail view path is: `_showDetailsModal()` in `layer8d-module-crud.js` → calls `generateFormHtml(formDef, data)` → disables all inputs. The `generateFieldHtml` function receives the current data via the `data` parameter, which includes the child array (e.g., `data.lines`).

```html
<!-- Detail mode: read-only inline table (no action buttons) -->
<div class="form-inline-table form-inline-table-readonly" data-inline-table="lines">
    <div class="form-inline-table-header">
        <span>Item</span>
        <span>Qty</span>
        <span>Unit Price</span>
        <span>Status</span>
    </div>
    <div class="form-inline-table-body">
        <div class="form-inline-table-row l8-clickable-row" data-row-index="0">
            <span class="form-inline-table-cell">Widget A</span>
            <span class="form-inline-table-cell">10</span>
            <span class="form-inline-table-cell">$25.00 USD</span>
            <span class="form-inline-table-cell">Confirmed</span>
        </div>
        <!-- ... more rows ... -->
    </div>
</div>
```

**How to detect detail vs edit mode**: The detail view in `_showDetailsModal()` passes a flag (e.g., `{ readOnly: true }`) through to `generateFormHtml`, or sets a data attribute on the form container. The `inlineTable` case checks this flag to decide which rendering path to use.

**Mobile** (`layer8m-forms-fields.js`):

Same distinction — detail mode renders read-only cards with no Edit/Delete/Add buttons, but cards are still **tappable** to show child details.

```html
<!-- Detail mode: read-only card (no action buttons, but tappable) -->
<div class="mobile-form-inline-card l8-clickable-row" data-row-index="0">
    <div class="mobile-form-inline-card-header">
        <span class="mobile-form-inline-card-title">Widget A</span>
    </div>
    <div class="mobile-form-inline-card-body">
        <div class="mobile-form-inline-card-row">
            <span class="mobile-form-inline-card-label">Qty</span>
            <span class="mobile-form-inline-card-value">10</span>
        </div>
        <!-- ... -->
    </div>
</div>
```

---

#### 0.7 Detail View — Clickable Child Rows (Child Detail Popup)

When viewing a parent's details, child rows in the inline table must be **clickable**. Clicking a child row opens a **child detail popup** showing that child's fields in read-only mode.

**Desktop flow:**

1. User clicks a parent row in the main table → parent detail popup opens (existing behavior)
2. Parent detail popup contains an inline table of children (from 0.6)
3. User clicks a child row → a **nested detail popup** opens on top of the parent popup
4. Child detail popup shows the child's column definitions rendered as read-only fields (reusing `generateFormHtml` with column defs converted to a mini form definition)

```javascript
function onChildRowClick(field, rowIndex, childData) {
    // Build a read-only mini form from the inline table's column definitions
    const miniFormDef = {
        title: field.label,
        sections: [{
            title: 'Details',
            fields: field.columns.filter(col => !col.hidden)
        }]
    };

    // Render as read-only detail using existing form rendering
    const html = Layer8DFormsFields.generateFormHtml(miniFormDef, childData);

    Layer8DPopup.show({
        title: field.columns.find(c => !c.hidden)
            ? childData[field.columns.find(c => !c.hidden).key] || 'Detail'
            : 'Detail',
        content: html,
        size: 'small',
        showFooter: false,  // No save button — read-only
        onShow: () => {
            // Disable all inputs for read-only
            popup.querySelectorAll('input, select, textarea').forEach(el => {
                el.disabled = true;
            });
        }
    });
}
```

**Mobile flow:**

1. User taps a parent row → parent detail view opens (existing behavior)
2. Parent detail view contains inline cards of children (from 0.6)
3. User taps a child card → navigates to a **child detail screen** (or opens a bottom sheet)
4. Child detail screen shows column definitions rendered as read-only fields

**Event attachment:**

Add click/tap handlers on child rows in both detail and edit modes:
- **Detail mode**: clicking a row opens child detail popup (read-only)
- **Edit mode**: clicking a row opens child edit popup (editable, as described in 0.2)

The handlers are attached in `attachInlineTableHandlers()` (desktop) and the mobile equivalent. The handler checks whether the form is in read-only or edit mode to decide which popup to show.

---

#### 0.8 Files Modified/Created (Summary)

| File | Change |
|------|--------|
| `l8ui/shared/layer8-form-factory.js` | Add `inlineTable()` method |
| `l8ui/shared/layer8d-forms-fields.js` | Add `case 'inlineTable':` rendering (edit + detail modes) + `generateInlineTableHtml()` + `openRowEditor()` + `onChildRowClick()` |
| `l8ui/shared/layer8d-forms-data.js` | Update compound guard + add `case 'inlineTable':` collection |
| `l8ui/shared/layer8d-forms-pickers.js` | Add `attachInlineTableHandlers(container)` for add/edit/delete + child row click events |
| `l8ui/shared/layer8d-module-crud.js` | Pass `readOnly` flag to `generateFormHtml` in `_showDetailsModal()` |
| `l8ui/shared/layer8d-forms.css` (or new file) | Desktop inline table styles (edit + readonly) |
| `l8ui/m/js/layer8m-forms-fields.js` | Add `case 'inlineTable':` mobile rendering (edit + detail modes) |
| `l8ui/m/js/layer8m-forms.js` | Update `getFormData()` for inline table data collection |
| `l8ui/m/js/layer8m-nav-crud.js` | Pass `readOnly` flag in `showRecordDetails()` |
| `l8ui/m/css/layer8m-forms.css` | Mobile inline table/card styles (edit + readonly) |

#### 0.9 Verification

1. Create a test form with `f.inlineTable()` for an existing embedded type (BenefitPlan.coverageOptions)
2. Verify: **Detail view** — parent detail popup shows child rows as read-only table
3. Verify: **Detail view** — clicking a child row opens child detail popup with child fields
4. Verify: **Detail view** — child detail popup shows all non-hidden column fields as read-only
5. Verify: **Edit mode** — table renders with Add/Edit/Delete buttons
6. Verify: **Edit mode** — Add row opens sub-form, saves row to table
7. Verify: **Edit mode** — Edit row populates sub-form, updates row
8. Verify: **Edit mode** — Delete row removes from table
9. Verify: Parent form save collects all rows as array in JSON
10. Verify: Reference fields within rows work (picker opens, ID saved)
11. Verify: Money fields within rows work (amount + currency collected)
12. Verify: Mobile detail view renders children as read-only tappable cards
13. Verify: Mobile tapping a child card opens child detail screen
14. Verify: Mobile edit mode renders children with Add/Edit/Delete
15. Run `node -c` on all modified JS files to check syntax

### Tier 1: Sales Module (16 children — highest visibility)

**Proto files:** `proto/sales-orders.proto`, `proto/sales-pricing.proto`, `proto/sales-delivery.proto`, `proto/sales-territory.proto`, `proto/sales-commission.proto`, `proto/sales-billing.proto`

**Parent groupings (children per parent):**
- SalesOrder: +3 (lines, allocations, back_orders)
- SalesQuotation: +1 (lines)
- SalesReturnOrder: +1 (lines)
- SalesDeliveryOrder: +5 (lines, pick_releases, packing_slips, shipping_docs, confirms)
- SalesPriceList: +2 (entries, quantity_breaks)
- SalesCustomerContract: +1 (prices)
- SalesTerritory: +1 (assignments)
- SalesCommissionPlan: +1 (calculations)
- SalesBillingSchedule: +1 (milestones)

**Service dirs to delete:** 16 directories under `go/erp/sales/`
**UI files:** `go/erp/ui/web/sales/` — config, columns, forms, enums for 16 child types

### Tier 2: FIN Module (21 children — critical for business logic)

**Proto files:** `proto/fin-gl.proto`, `proto/fin-ap.proto`, `proto/fin-ar.proto`, `proto/fin-budgets.proto`, `proto/fin-assets.proto`, `proto/fin-banking.proto`, `proto/fin-tax.proto`

**Parent groupings:**
- JournalEntry: +1 (lines)
- PurchaseInvoice: +1 (lines)
- SalesInvoice: +1 (lines)
- Budget: +3 (lines, scenarios, transfers)
- CustomerPayment/VendorPayment: +1 (allocations — verify which parent)
- Customer: +1 (contacts)
- Vendor: +2 (contacts, withholding_tax_configs)
- CustomerPayment: +1 (applications)
- Asset: +5 (depreciation_schedules, disposals, transfers, maintenance, revaluations)
- FiscalYear: +2 (periods, tax_returns)
- Account: +1 (balances)
- BankAccount: +2 (transactions, reconciliations)

### Tier 3: MFG Module (18 children)

**Proto files:** `proto/mfg-bom.proto`, `proto/mfg-routing.proto`, `proto/mfg-workorder.proto`, `proto/mfg-production.proto`, `proto/mfg-engineering.proto`, `proto/mfg-quality.proto`, `proto/mfg-scheduling.proto`, `proto/mfg-costing.proto`

**Parent groupings:**
- MfgBom: +1 (lines)
- MfgRouting: +1 (operations)
- MfgWorkOrder: +8 (operations, labor_entries, machine_entries, consumptions, batches, actual_costs, variances)
- MfgProductionOrder: +1 (lines)
- MfgEngChangeOrder: +1 (details)
- MfgNcr: +1 (actions)
- MfgQualityPlan: +1 (inspection_points)
- MfgProdSchedule: +1 (schedule_blocks)
- MfgQualityInspection: +1 (test_results)
- MfgCapacityPlan: +1 (capacity_loads)
- MfgMrpRun: +1 (requirements)
- MfgOverhead: +1 (allocations)

### Tier 4: SCM Module (15 children)

**Proto files:** `proto/scm-purchasing.proto`, `proto/scm-warehouse.proto`, `proto/scm-receiving.proto`, `proto/scm-inventory.proto`, `proto/scm-shipping.proto`, `proto/scm-planning.proto`

**Parent groupings:**
- ScmPurchaseOrder: +1 (lines)
- ScmRequisition: +1 (lines)
- ScmWavePlan: +3 (pick_tasks, pack_tasks, ship_tasks — flattened chain)
- ScmReceivingOrder: +1 (putaway_tasks)
- ScmWarehouse: +1 (bins)
- ScmItem: +5 (lots, serials, reorder_points, valuations, movements)
- ScmShipment: +2 (delivery_proofs, freight_audits)
- ScmDemandForecast: +1 (accuracies)

**Special:** SCM task chain (Pick -> Pack -> Ship) flattened into WavePlan. PackTask/ShipTask parent references change from task IDs to positional within WavePlan.

### Tier 5: CRM Module (14 children)

**Proto files:** `proto/crm-marketing.proto`, `proto/crm-sales.proto`, `proto/crm-service.proto`, `proto/crm-lead.proto`, `proto/crm-accounts.proto`, `proto/crm-fieldservice.proto`

**Parent groupings:**
- CrmCampaign: +3 (members, responses, roi_records)
- CrmOpportunity: +4 (activities, products, team_members, competitors)
- CrmCase: +1 (comments)
- CrmLead: +2 (activities, conversions)
- CrmServiceOrder: +2 (parts, visits)
- CrmAccount: +2 (health_scores, plans)

### Tier 6: PRJ Module (15 children)

**Proto files:** `proto/prj-project.proto`, `proto/prj-time.proto`, `proto/prj-billing.proto`, `proto/prj-tracking.proto`, `proto/prj-resources.proto`

**Parent groupings:**
- PrjProject: +10 (phases, dependencies, tasks, milestones, deliverables, risks, issues, budget_variances, earned_values, resource_forecasts)
- PrjTimesheet: +1 (entries)
- PrjExpenseReport: +1 (entries)
- PrjProjectInvoice: +1 (lines)
- PrjResource: +1 (skills)
- PrjBillingSchedule: +1 (milestones)

### Tier 7: ECOM Module (7 children)

**Proto files:** `proto/ecom-orders.proto`, `proto/ecom-catalog.proto`, `proto/ecom-customer.proto`, `proto/ecom-social.proto`

**Parent groupings:**
- EcomOrder: +2 (lines, status_history)
- EcomReturn: +1 (lines)
- EcomProduct: +2 (images, variants)
- EcomCustomer: +1 (addresses)
- EcomWishlist: +1 (items)

### Tier 8: BI Module (10 children)

**Proto files:** `proto/bi-dashboards.proto`, `proto/bi-reports.proto`, `proto/bi-analytics.proto`, `proto/bi-etl.proto`

**Parent groupings:**
- BiDashboard: +3 (widgets, shares, drilldowns)
- BiReport: +4 (executions, accesses, subscriptions, schedules)
- BiAnalysisModel: +1 (predictions)
- BiKpi: +1 (thresholds)
- BiETLJob: +1 (schedules)

### Tier 9: DOC Module (9 children)

**Proto files:** `proto/doc-core.proto`, `proto/doc-common.proto`, `proto/doc-compliance.proto`

**Parent groupings:**
- DocDocument: +7 (versions, checkouts, comments, signatures, attachments, access_logs, audit_trails)
- DocApprovalWorkflow: +1 (steps)
- DocTemplate: +1 (fields)

### Tier 10: COMP Module (9 children)

**Proto files:** `proto/comp-audit.proto`, `proto/comp-controls.proto`, `proto/comp-risk.proto`, `proto/comp-regulatory.proto`

**Parent groupings:**
- CompAuditFinding: +1 (actions)
- CompControl: +2 (assessments, segregation_rules)
- CompRiskRegister: +2 (assessments, mitigation_plans)
- CompRegulation: +1 (requirements)
- CompRequirement: +2 (violations, compliance_statuses) — Note: this is itself being embedded in Regulation
- CompAuditSchedule: +1 (reports)

---

## Per-Tier Deliverables (Desktop + Mobile + Dependency Map)

For each module tier (1-10), ALL of the following must be completed:

### Go Backend
- [ ] Update proto files (embed children as `repeated` fields in parents)
- [ ] Regenerate bindings (`make-bindings.sh`)
- [ ] Delete child service directories
- [ ] Update `go/erp/ui/main.go` (remove child type registrations)
- [ ] Update mock data (store.go, generators, phase files)

### Desktop UI (`go/erp/ui/web/`)
- [ ] Update `<module>/<module>-config.js` — remove child service entries
- [ ] Update `<module>/<submodule>/<submodule>-columns.js` — remove child column defs
- [ ] Update `<module>/<submodule>/<submodule>-forms.js` — remove child forms, add `f.inlineTable()` to parent forms
- [ ] Update `<module>/<submodule>/<submodule>-enums.js` — remove child-only enums (if any)
- [ ] Update `js/reference-registry-<module>.js` — remove child entries (if registered)
- [ ] Update `app.html` — remove child script includes

### Mobile UI (`go/erp/ui/web/m/`)
- [ ] Update `js/layer8m-nav-config.js` — remove child nav entries
- [ ] Update `js/<module>/<submodule>-columns.js` — remove child column defs
- [ ] Update `js/<module>/<submodule>-forms.js` — remove child forms, add inline table to parent forms
- [ ] Update `js/<module>/<submodule>-enums.js` — remove child-only enums (if any)
- [ ] Update `m/app.html` — remove child script includes

### Dependency Map (`plans/system-dependency-map.md`)
- [ ] Remove child ID slices from phase dependency trees (e.g., remove `SalesOrderLineIDs` entry from Sales Phase 5)
- [ ] Update parent entries to note embedded children (e.g., `SalesOrderIDs (embeds: lines, allocations, back_orders)`)
- [ ] Remove child ID slices from cross-module export tables where applicable
- [ ] Update cross-module references that pointed to child IDs (e.g., if MFG referenced `SalesOrderLineIDs`, update to note it comes from within `SalesOrder`)
- [ ] Update entity count summary per module
- [ ] Update Section 1 module execution graph if phase counts change

---

## Verification (per tier)

After completing each module tier:

```bash
# 1. Proto bindings regenerated
cd proto && ./make-bindings.sh

# 2. Deleted service directories are gone
ls go/erp/<module>/<deleted-child>/ 2>&1  # Should error "No such file"

# 3. Go build passes
go build ./erp/<module>/...

# 4. Go vet passes
go vet ./erp/<module>/...

# 5. Mock data builds
go build ./tests/mocks/

# 6. Type registrations match remaining services
grep -c "Register.*<Module>" go/erp/ui/main.go

# 7. Desktop UI config has no references to removed children
grep "<RemovedServiceName>" go/erp/ui/web/<module>/**/*.js  # Should return nothing

# 8. Mobile UI config has no references to removed children
grep "<RemovedServiceName>" go/erp/ui/web/m/js/<module>/**/*.js  # Should return nothing

# 9. Parent forms include inline tables for embedded children
grep "inlineTable" go/erp/ui/web/<module>/**/*-forms.js

# 10. Dependency map is updated
grep "<RemovedChildIDSlice>" plans/system-dependency-map.md  # Should return nothing
```

---

## Impact Summary

| Metric | Before | After |
|--------|--------|-------|
| Total services | 376 | ~242 |
| Service directories | 376 | ~242 |
| Proto List types | ~376 | ~242 |
| UI config entries (desktop) | ~376 | ~242 |
| UI nav entries (mobile) | ~376 | ~242 |
| Type registrations | 376 | ~242 |
| Mock generators | ~376 | ~242 (child data generated inline in parent) |
| Parent forms with inline tables | 0 | ~60 (parents that gain children) |
| Dependency map ID slice entries | ~376 | ~242 |

**Children removed per module:** Sales 16, FIN 21, SCM 15, MFG 18, CRM 14, PRJ 15, ECOM 7, BI 10, DOC 9, COMP 9 = **134 total**

---

## Key Risks & Mitigations

1. **COMP CompRequirement is both a child (of Regulation) and a parent (of ViolationRecord)**: After embedding Requirement in Regulation, ViolationRecord embeds inside the already-embedded Requirement. This creates a 3-level nesting. Verify the ORM/introspector handles this correctly.

2. **PaymentAllocation has two potential parents** (CustomerPayment or VendorPayment): Verify which parent to use, or split into two embedded fields.

3. **BiDrilldown references multiple parents** (source report/widget, target report/dashboard): Embed in Dashboard as primary parent; use ID references for the other targets.

4. **SCM task chain flattening**: PackTask/ShipTask currently reference PickTask by ID. After flattening into WavePlan, they reference by position/index within the wave's task arrays. Proto field changes needed.

5. **File size limit (500 lines)**: Parent proto files and generators may grow significantly when absorbing children. Monitor and split as needed.

6. **Cross-module child ID references**: Some child IDs (e.g., `MfgRoutingOpIDs`, `MfgWorkOrderOpIDs`) are referenced by other entities within the same module. After embedding, these IDs still exist within the parent's repeated field and can be referenced — but the `store.*IDs` slice in mocks needs to be populated from the parent's embedded children rather than a separate generator. The dependency map must reflect this change.
