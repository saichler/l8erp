# Plan: Phase F — Module-Specific Business Logic

## Context

Phase F from MISSING-FEATURES.md roadmap. Phases A–C and B are complete, providing:
- Status transition enforcement (27 entities, 5 modules)
- Cross-service cascading document flows (10 flows)
- Computed fields (14 entities — line totals, header aggregates, derived fields)
- Inventory quantity tracking (ReceivingOrder/WavePlan → bin quantities + movements)
- FIN double-entry journal enforcement + period management + account balance updates
- Infrastructure: `VB[T]` with `.Compute()`, `.After()`, `.StatusTransition()`, `.Custom()`; `PostEntity`, `PutEntity`, `GetEntity`, `GetEntities`, `EntityExists`; `SumLineMoney`, `MoneyAdd/Subtract`

This plan adds **domain-specific business logic** to each module — the rules that make an ERP system actually useful beyond CRUD.

---

## Scope & Prioritization

### What's In Scope
- Business rules implementable with **existing infrastructure** (VB hooks, After cascades, Compute)
- Logic that runs **server-side on save** (Before/After hooks)
- Cross-entity calculations and cascading updates
- Validation rules that enforce business invariants

### What's Out of Scope
- External integrations (payment gateways, email/SMTP, shipping APIs, tax APIs)
- Background/scheduled jobs (MRP batch runs, report scheduling, retention policy execution)
- Real-time engines (pricing optimization, real-time ATP)
- UI-only features (org chart visualization, dashboard drag-and-drop, document preview)
- Self-service portals (Phase G or later)

### Prioritization Criteria
- **Tier 1**: Core transactional logic that affects data integrity (pricing, allocation, BOM explosion)
- **Tier 2**: Workflow automation that reduces manual steps (approval flows, lead conversion, milestone billing)
- **Tier 3**: Analytics and derived calculations (EVM, campaign ROI, risk scoring)

---

## Tier 1: Sales — Pricing Engine & Order Flow

### 1.1 Price List Lookup on Order Lines (SalesOrder, SalesQuotation)

**Trigger**: `.Compute()` on SalesOrder / SalesQuotation

**Logic**: When an order line has `itemId` + `quantity` but no `unitPrice`, auto-lookup the price:

1. Find active `SalesPriceList` entries for the item (via `GetEntities`)
2. Check `SalesQuantityBreak` thresholds on the price list entry — select the break where `quantity >= minQuantity`
3. Apply `SalesDiscountRule` if customer segment matches (lookup customer → segment → discount rules)
4. Set `line.UnitPrice` with the resolved price
5. Existing line-total compute then calculates `lineTotal`, `subtotal`, `taxTotal`, `totalAmount`

**Files**:
- `go/erp/sales/salesorders/SalesOrderServiceCallback.go` — add pricing compute before existing totals compute
- `go/erp/sales/salesquotations/SalesQuotationServiceCallback.go` — same pattern
- `go/erp/common/pricing.go` — shared pricing lookup helper (reusable by ECOM)

**Helper** (`common/pricing.go`, ~80 lines):
```go
func ResolvePriceForItem(itemId, customerId string, quantity float64, vnic) (*erp.Money, error)
func FindActivePriceList(itemId string, vnic) (*sales.SalesPriceList, error)
func ApplyQuantityBreak(priceList *sales.SalesPriceList, quantity float64) *erp.Money
func ApplyDiscountRule(basePrice *erp.Money, customerId string, vnic) (*erp.Money, error)
```

### 1.2 Credit Limit Checking (SalesOrder)

**Trigger**: `.Custom()` on SalesOrder (needs vnic for cross-entity lookup)

**Logic**: On POST/PUT, if order status is being CONFIRMED:
1. Lookup customer via `customerId` → get `creditLimit` (Money field on FIN Customer)
2. Sum all open (non-CANCELLED, non-DELIVERED) SalesOrder `totalAmount` for this customer
3. If `openTotal + thisOrder.TotalAmount > creditLimit`, reject with error

**Files**:
- `go/erp/sales/salesorders/SalesOrderServiceCallback.go` — add `.Custom(validateCreditLimit)`
- `go/erp/sales/salesorders/credit_check.go` — credit limit logic (~60 lines)

### 1.3 Sales Tax Calculation (SalesOrder, SalesInvoice)

**Trigger**: `.Compute()` — runs after pricing, before totals

**Logic**:
1. Lookup `SalesTaxRule` matching the order's `taxRegion` / `taxCode`
2. For each line, calculate `line.TaxAmount = line.LineTotal * taxRate / 100`
3. Sum into `order.TaxTotal`
4. Existing totals compute then includes tax in `totalAmount`

**Files**:
- `go/erp/sales/salesorders/tax_calc.go` — tax calculation (~50 lines)
- `go/erp/fin/taxrules/` — already exists as data source

### 1.4 Commission Calculation (SalesOrder → After hook)

**Trigger**: `.After()` on SalesOrder when status → DELIVERED

**Logic**:
1. Lookup `SalesCommissionPlan` for the order's `salespersonId`
2. Calculate commission: `order.TotalAmount * plan.CommissionRate / 100`
3. Update the commission plan's `earnedAmount` (or create a commission entry)

**Files**:
- `go/erp/sales/salesorders/commission.go` — commission logic (~50 lines)

### 1.5 Quotation-to-Order Conversion (SalesQuotation → After hook)

**Trigger**: `.After()` on SalesQuotation when status → ACCEPTED

**Logic**:
1. Auto-create a `SalesOrder` (DRAFT) copying lines, customer, pricing from the quotation
2. Set `salesQuotationId` on the new order for traceability
3. Use `PostEntity` (idempotency via `EntityExists`)

**Files**:
- `go/erp/sales/salesquotations/SalesQuotationServiceCallback.go` — add After hook (~60 lines)

---

## Tier 1: SCM — Procurement & Inventory

### 2.1 Reorder Point Checking (ScmItem → After hook)

**Trigger**: `.After()` on ScmItem when item quantities change (via ReceivingOrder/WavePlan cascades that update items)

**Logic**:
1. After any item update, check if any `ScmSafetyStock` record exists for this item
2. Calculate current on-hand quantity from item movements (sum RECEIPTs - sum ISSUEs)
3. If `onHand <= safetyStock.ReorderPoint`, auto-create a `ScmPurchaseRequisition` (DRAFT)
4. Set quantity = `safetyStock.ReorderQuantity`, link `itemId`, preferred `vendorId`

**Files**:
- `go/erp/scm/items/ScmItemServiceCallback.go` — currently simple VB; convert to include After hook
- `go/erp/scm/items/reorder_check.go` — reorder logic (~70 lines)

### 2.2 Lot/Serial Number Enforcement (ReceivingOrder, WavePlan)

**Trigger**: `.Custom()` on ReceivingOrder and WavePlan

**Logic**:
1. Check if the item has `trackingType = LOT` or `SERIAL` (field on ScmItem)
2. If LOT: require `lotId` on each putaway/pick task line
3. If SERIAL: require `serialId` and validate uniqueness (no duplicate serial in active inventory)
4. On receipt: record lot/serial in item movements
5. On pick: validate lot/serial exists in source bin

**Files**:
- `go/erp/scm/receivingorders/lot_serial.go` — validation (~60 lines)
- `go/erp/scm/waveplans/lot_serial.go` — validation (~60 lines)

### 2.3 Goods Receipt Quality Hold

**Trigger**: `.After()` on ReceivingOrder when COMPLETED

**Logic** (extends existing `updateInventoryOnReceipt`):
1. If the item's category has `requiresInspection = true`, set received stock to `QUARANTINE` status
2. Create a quality inspection task (if quality inspection service exists in the module)
3. Stock only becomes available after inspection passes

**Files**:
- `go/erp/scm/receivingorders/quality_hold.go` — quality hold logic (~50 lines)

---

## Tier 1: MFG — BOM Explosion & Cost Rollup

### 3.1 Single-Level BOM Explosion (MfgProductionOrder → enhanced cascade)

**Trigger**: Enhance existing `cascadeCreateWorkOrders` After hook

**Logic** (extends current behavior):
1. Current: creates work orders from production order lines
2. **New**: For each work order, explode the BOM:
   a. Load `MfgBom` for the item (ACTIVE status, latest effective date)
   b. For each `MfgBomLine`, calculate required quantity: `line.QuantityPer * orderQuantity * (1 + line.ScrapPercent/100)`
   c. Create material consumption records on the work order (`MfgProdConsumption` child entries)
   d. Link `componentItemId` and calculated quantity

**Files**:
- `go/erp/mfg/productionorders/MfgProductionOrderServiceCallback.go` — enhance cascade
- `go/erp/mfg/productionorders/bom_explosion.go` — BOM explosion logic (~100 lines)

### 3.2 Multi-Level BOM Explosion

**Trigger**: Same as 3.1, recursive

**Logic**:
1. After single-level explosion, check if any component item itself has an ACTIVE BOM
2. If yes, recursively explode (create sub-work-orders or flatten into material list)
3. Track depth to prevent infinite recursion (max 10 levels)
4. Phantom BOMs: don't create a work order, just explode components into the parent

**Files**:
- `go/erp/mfg/productionorders/bom_explosion.go` — extend with recursion (~40 additional lines)

### 3.3 Work Order Cost Rollup (MfgWorkOrder → After hook)

**Trigger**: `.After()` on MfgWorkOrder when status → COMPLETED

**Logic**:
1. Sum labor costs from `laborEntries` (hours * labor rate from work center)
2. Sum material costs from `consumptions` (quantity * item standard cost)
3. Add overhead from `MfgOverhead` rules (percentage of labor or material)
4. Set `workOrder.ActualCost`
5. Roll up to parent `MfgProductionOrder.TotalActualCost` (sum of all work order actual costs)

**Files**:
- `go/erp/mfg/workorders/cost_rollup.go` — cost calculation (~80 lines)
- `go/erp/mfg/workorders/MfgWorkOrderServiceCallback.go` — add After hook

### 3.4 Work Order Operation Tracking (MfgWorkOrder → Compute)

**Trigger**: `.Compute()` on MfgWorkOrder

**Logic**:
1. Calculate `quantityCompleted` = sum of operation `quantityCompleted` values (use minimum across all operations — bottleneck)
2. Calculate `quantityScrapped` = sum of operation `quantityScrapped`
3. If all operations have status COMPLETED, suggest work order status = COMPLETED

**Files**:
- `go/erp/mfg/workorders/MfgWorkOrderServiceCallback.go` — add Compute hook (~40 lines)

---

## Tier 2: CRM — Lead Management & SLA

### 4.1 Lead-to-Opportunity Conversion (CrmLead → After hook)

**Trigger**: `.After()` on CrmLead when status → CONVERTED

**Logic**:
1. Auto-create `CrmOpportunity` from the lead data:
   - Copy `accountId`, `contactId` (or create account from lead company info)
   - Set opportunity name from lead `company` + "- Opportunity"
   - Copy `annualRevenue` → opportunity `amount`
   - Set stage = first stage (QUALIFICATION or PROSPECTING)
   - Set `campaignId` if lead had one
2. Update lead's `CrmLeadConversion` embedded child with opportunity ID and conversion date
3. Use `EntityExists` to prevent duplicate conversions

**Files**:
- `go/erp/crm/leads/CrmLeadServiceCallback.go` — add After hook
- `go/erp/crm/leads/lead_conversion.go` — conversion logic (~80 lines)

### 4.2 Lead Scoring (CrmLead → Compute)

**Trigger**: `.Compute()` on CrmLead

**Logic**:
1. Load `CrmLeadScore` rules (scoring criteria)
2. Calculate score based on lead attributes:
   - Company size / annual revenue → points
   - Industry match → points
   - Source quality (referral > web > cold) → points
   - Activity count (more activities = higher score) → points
3. Set `lead.Score` = total points
4. Auto-set `lead.Rating` based on score thresholds: HOT (>80), WARM (40-80), COLD (<40)

**Files**:
- `go/erp/crm/leads/lead_scoring.go` — scoring logic (~60 lines)
- `go/erp/crm/leads/CrmLeadServiceCallback.go` — add Compute hook

### 4.3 SLA Timer Enforcement (CrmCase → Custom validation)

**Trigger**: `.Custom()` on CrmCase

**Logic**:
1. On POST (new case): lookup `CrmSLA` matching the case's priority + account
2. Set `case.SlaDeadline` = `now + sla.ResponseTimeHours` (as Unix timestamp)
3. On PUT: if status is still OPEN/IN_PROGRESS and `now > slaDeadline`:
   - Auto-set `case.IsEscalated = true`
   - Auto-set `case.Status = ESCALATED` (if not already)
   - Create `CrmEscalation` record

**Files**:
- `go/erp/crm/cases/sla_enforcement.go` — SLA logic (~70 lines)
- `go/erp/crm/cases/CrmCaseServiceCallback.go` — add Custom hook

### 4.4 Campaign ROI Calculation (CrmCampaign → Compute)

**Trigger**: `.Compute()` on CrmCampaign

**Logic**:
1. Count campaign members and responses from embedded children
2. Calculate `responseRate = numResponses / numSent * 100`
3. Calculate ROI = `(actualRevenue - actualCost) / actualCost * 100` (if actualCost > 0)
4. Set computed fields on the campaign

**Files**:
- `go/erp/crm/campaigns/CrmCampaignServiceCallback.go` — add Compute (~30 lines)

---

## Tier 2: PRJ — Scheduling & Earned Value

### 5.1 Task Dependency Scheduling (PrjProject → Compute)

**Trigger**: `.Compute()` on PrjProject

**Logic**:
1. Build a dependency graph from `project.Dependencies` (task → predecessor relationships)
2. For FINISH_TO_START dependencies: `task.StartDate = max(predecessor.DueDate)` for all predecessors
3. Calculate `task.DueDate = task.StartDate + estimatedHours / 8` (working days)
4. Identify critical path: longest chain of dependent tasks from start to end
5. Set `project.EndDate` = latest task dueDate

**Note**: This is a forward-pass schedule calculation. No backward pass or resource leveling (Tier 3).

**Files**:
- `go/erp/prj/projects/scheduling.go` — scheduling logic (~100 lines)
- `go/erp/prj/projects/PrjProjectServiceCallback.go` — add Compute

### 5.2 Earned Value Management (PrjProject → Compute)

**Trigger**: `.Compute()` on PrjProject (runs on embedded EarnedValue children)

**Logic**:
1. For each `PrjEarnedValue` entry (per period):
   - `PlannedValue (PV)` = % of tasks scheduled to complete × total budget
   - `EarnedValue (EV)` = % of tasks actually complete × total budget
   - `ActualCost (AC)` = sum of actual costs from timesheets + expenses for the period
   - `ScheduleVariance (SV)` = EV - PV
   - `CostVariance (CV)` = EV - AC
   - `SPI` = EV / PV (if PV > 0)
   - `CPI` = EV / AC (if AC > 0)
   - `EAC` = BAC / CPI (Estimate at Completion)
   - `ETC` = EAC - AC (Estimate to Complete)
   - `VAC` = BAC - EAC (Variance at Completion)

**Files**:
- `go/erp/prj/projects/earned_value.go` — EVM calculations (~80 lines)

### 5.3 Timesheet/Expense Approval Flow (PrjTimesheet, PrjExpenseReport)

**Trigger**: `.StatusTransition()` + `.After()` on PrjTimesheet and PrjExpenseReport

**Logic**:
1. Add status transitions: DRAFT → SUBMITTED → APPROVED/REJECTED
2. On SUBMITTED: validate all entries have `projectId` + `taskId`
3. On APPROVED:
   - Update project's `actualHours` (sum approved timesheet hours)
   - Update project budget's `actualAmount` (sum approved expenses)
   - Set `approvedDate` and `approvedBy`
4. On REJECTED: clear submission metadata, allow re-edit

**Files**:
- `go/erp/prj/timesheets/PrjTimesheetServiceCallback.go` — add StatusTransition + After
- `go/erp/prj/expensereports/PrjExpenseReportServiceCallback.go` — add StatusTransition + After
- `go/erp/prj/timesheets/approval.go` — approval After hook (~60 lines)
- `go/erp/prj/expensereports/approval.go` — approval After hook (~60 lines)

### 5.4 Milestone Billing (PrjBillingSchedule → After hook)

**Trigger**: Check on PrjProject save when milestone status changes to ACHIEVED

**Logic**:
1. When a project milestone status → ACHIEVED
2. Check `PrjBillingSchedule` for billing milestones linked to this project milestone
3. If found, auto-create `PrjProjectInvoice` (DRAFT) with the milestone amount
4. Set invoice lines from billing milestone details

**Files**:
- `go/erp/prj/projects/milestone_billing.go` — billing trigger (~70 lines)

---

## Tier 2: FIN — Remaining Business Logic

### 6.1 Fixed Asset Depreciation Schedule Generation (Asset → After hook)

**Trigger**: `.After()` on FIN Asset when status → ACTIVE (asset placed in service)

**Logic**:
1. Based on `depreciationMethod` (STRAIGHT_LINE, DECLINING_BALANCE, UNITS_OF_PRODUCTION):
   - STRAIGHT_LINE: `monthlyDepreciation = (acquisitionCost - salvageValue) / usefulLifeMonths`
   - DECLINING_BALANCE: `monthlyDepreciation = netBookValue * (rate / 12)`
2. Generate depreciation schedule entries (embedded child `DepreciationSchedule`) for each month
3. Existing Compute already calculates `accumulatedDepreciation` and `netBookValue` from schedules

**Files**:
- `go/erp/fin/assets/depreciation.go` — schedule generation (~80 lines)
- `go/erp/fin/assets/FinAssetServiceCallback.go` — add After hook

### 6.2 Multi-Currency Conversion (FIN → common helper)

**Trigger**: Available as a common helper for any module

**Logic**:
1. Lookup `FinExchangeRate` for source→target currency pair
2. Convert: `targetAmount = sourceAmount * exchangeRate`
3. Used by: SalesOrder (multi-currency customers), PurchaseOrder (foreign vendors), etc.

**Files**:
- `go/erp/common/currency.go` — currency conversion helper (~50 lines)

### 6.3 Bank Reconciliation (FIN BankReconciliation service)

**Trigger**: `.Custom()` on FIN bank reconciliation entity

**Logic**:
1. Match bank statement lines to journal entries by amount + date range
2. Auto-match exact amount matches within date tolerance
3. Flag unmatched items for manual review
4. Calculate reconciliation balance: `bankBalance - bookBalance = unreconciled items`

**Note**: This requires a bank statement import mechanism. Implementation limited to the matching algorithm; actual bank feed integration is out of scope.

**Files**:
- Deferred — requires bank statement data model that may not exist yet

---

## Tier 3: Remaining Modules

### 7.1 ECOM — Order Processing

**7.1.1 Cart-to-Order Conversion (EcomCart → After hook)**
- When cart status → CONVERTED, auto-create `EcomOrder` with cart lines
- Copy pricing, apply coupon/promotion discounts
- Set order status = PENDING

**7.1.2 Order Total Calculation (EcomOrder → Compute)**
- Same pattern as Sales: line totals → subtotal → apply discounts → add shipping → add tax → totalAmount
- Reuse `common/pricing.go` where applicable

**7.1.3 Inventory Reservation (EcomOrder → After hook)**
- When order CONFIRMED, decrement available quantity on `ScmItem` (cross-module)
- When order CANCELLED/REFUNDED, release reservation

**Files**: ~4 files, ~200 lines total

### 7.2 COMP — Audit & Risk

**7.2.1 Risk Score Calculation (CompRiskRegister → Compute)**
- `riskScore = likelihood * impact` (both are enum integers)
- Set `residualRisk` based on control effectiveness

**7.2.2 Audit Finding Escalation (CompAuditFinding → After hook)**
- When finding severity = CRITICAL and status = OPEN for > N days
- Auto-create `CompIncident` linked to the finding
- Set incident status = REPORTED

**7.2.3 Control Effectiveness Roll-up (CompControl → Compute)**
- Aggregate test results from related audit findings
- Set `effectiveness` based on pass/fail ratio

**Files**: ~3 files, ~120 lines total

### 7.3 BI — KPI Alerting

**7.3.1 KPI Threshold Check (BiKPI → Compute)**
- Compare `actualValue` against embedded `BiKPIThreshold` entries
- Set KPI `status` (GREEN/YELLOW/RED) based on threshold breaches
- Calculate `variance` and `variancePercent`

**Files**: ~1 file, ~40 lines

### 7.4 DOC — Version History

**7.4.1 Document Version Tracking (DocDocument → Custom)**
- On PUT: if file content changed, increment `version` counter
- Store previous version metadata in embedded child (if version history child exists)
- Set `previousVersionId` for chain linking

**7.4.2 Check-In/Check-Out (DocDocument → Custom)**
- On "checkout": set `lockedBy = currentUserId`, `lockedAt = now`
- Reject PUT from other users while locked
- On "checkin": clear lock, increment version

**Files**: ~2 files, ~80 lines total

---

## Implementation Phases

### Phase F.1: Sales Pricing & Order Flow (~400 lines, 6 files)
1. `common/pricing.go` — shared pricing helpers
2. Sales order pricing compute (price list lookup, quantity breaks, discounts)
3. Sales tax calculation
4. Credit limit checking
5. Quotation-to-order conversion (After hook)
6. Commission calculation (After hook)

### Phase F.2: SCM Procurement & Inventory (~190 lines, 4 files)
1. Reorder point checking (After hook on ScmItem)
2. Lot/serial number enforcement (Custom on ReceivingOrder, WavePlan)
3. Quality hold on receipt

### Phase F.3: MFG BOM & Cost (~260 lines, 4 files)
1. Single-level BOM explosion (enhance existing cascade)
2. Multi-level BOM explosion (recursive)
3. Work order cost rollup (After hook)
4. Operation tracking compute

### Phase F.4: CRM Lead & SLA (~240 lines, 5 files)
1. Lead scoring (Compute)
2. Lead-to-opportunity conversion (After hook)
3. SLA timer enforcement (Custom)
4. Campaign ROI calculation (Compute)

### Phase F.5: PRJ Scheduling & EVM (~370 lines, 7 files)
1. Task dependency scheduling (Compute)
2. Earned value management (Compute)
3. Timesheet approval flow (StatusTransition + After)
4. Expense approval flow (StatusTransition + After)
5. Milestone billing trigger

### Phase F.6: FIN Remaining (~130 lines, 2 files)
1. Fixed asset depreciation schedule generation
2. Multi-currency conversion helper

### Phase F.7: ECOM, COMP, BI, DOC (~440 lines, ~10 files)
1. ECOM cart-to-order, order totals, inventory reservation
2. COMP risk scoring, finding escalation, control effectiveness
3. BI KPI threshold checking
4. DOC version tracking, check-in/check-out

---

## Estimated Totals

| Phase | Files | Lines | Module |
|-------|-------|-------|--------|
| F.1 | 6 | ~400 | Sales |
| F.2 | 4 | ~190 | SCM |
| F.3 | 4 | ~260 | MFG |
| F.4 | 5 | ~240 | CRM |
| F.5 | 7 | ~370 | PRJ |
| F.6 | 2 | ~130 | FIN |
| F.7 | 10 | ~440 | ECOM, COMP, BI, DOC |
| **Total** | **38** | **~2,030** | |

All files stay under the 500-line limit. Each module's logic lives in the service directory alongside its existing callback file.

---

## What This Does NOT Cover (Deferred)

- **HCM business logic** (57 manual callbacks — payroll engine, benefits enrollment, accrual engine): Too complex for this phase, separate plan needed
- **MRP engine** (batch MRP run): Requires background job infrastructure
- **Production scheduling** (capacity-constrained scheduling): Requires solver/optimization
- **Bank reconciliation**: Requires bank statement data model
- **Resource leveling** (PRJ): Requires optimization algorithm
- **Financial statement generation**: Requires report framework
- **Payment gateway integration** (ECOM): External dependency
- **Email integration** (CRM cases): External dependency
- **Full-text search** (DOC): Requires search index infrastructure
- **Dashboard drag-and-drop** (BI): UI-only feature

---

## Verification

After each phase:
```bash
# Build
cd go && go build ./erp/...

# Vet
go vet ./erp/...

# Verify no files over 500 lines
find go/erp/ -name "*.go" -exec wc -l {} + | awk '$1 > 500 {print}'
```

After all phases, update `plans/MISSING-FEATURES.md` sections 8.x and Phase F roadmap items.
