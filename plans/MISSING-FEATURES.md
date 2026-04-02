# L8ERP Missing Features - Comprehensive Gap Analysis

## Current System Summary

| Metric | Count |
|--------|-------|
| Modules | 12 (HCM, FIN, SCM, Sales, MFG, CRM, PRJ, BI, DOC, ECOM, COMP, SYS) |
| Services | 242 (reduced from 376 after child entity consolidation) |
| Protobuf Types | 654 messages, 289 enums (reduced from 788 messages — 134 child List types removed) |
| Type Registrations | 244 (across shared*.go files) |
| Mock Data Generators | All modules covered (service-level completeness verified) |
| Desktop UI | All modules with config, columns, forms, enums, init |
| Mobile UI | All modules with columns, forms, enums, nav config |
| Inline Table (Child Editing) | Implemented — `f.inlineTable()` in form factory, desktop + mobile rendering |

---

## 1. Business Logic (Go Backend)

### 1.1 Service Callbacks Enhanced with Validation — COMPLETE ✓

All 97 non-HCM ServiceCallback files enhanced with additional validation rules (`.Require()`, `.Default()`, etc.). Common validation infrastructure expanded: `validation_builder.go` (+61 lines new builder methods), `validation_static.go` (+42 lines new static validation functions), `defaults.go` updated. Also fixed 15 ghost navigation entries in PRJ section-config and added `tools/validate_section_configs.go` cross-check tool.

**Note:** Real business logic (GL posting, inventory tracking, pricing engines, etc.) remains a separate effort — see sections 1.2–1.5 and Phase B/F in the roadmap.

### 1.2 Cross-Service Business Logic — COMPLETE ✓

Status transition enforcement implemented for all 6 flows (27 entities across 5 modules). Each entity has a `StatusTransitionConfig` defining valid state machine transitions enforced on PUT/PATCH. POST skips enforcement (`InitialStatus: 0`) for mock data compatibility. HCM (Flow 5) deferred — uses manual `NewServiceCallback` pattern.

**Cross-service cascading document flows implemented** via `After()` hooks on ValidationBuilder/ServiceCallback:

**Tier 1 — Order-to-Cash + Procure-to-Pay:**
- SalesOrder CONFIRMED → auto-create SalesDeliveryOrder (PLANNED)
- SalesDeliveryOrder DELIVERED → auto-create SalesInvoice (DRAFT, cross-module FIN)
- CustomerPayment COMPLETED → update SalesInvoice payment status (PAID/PARTIALLY_PAID)
- PurchaseRequisition APPROVED → auto-create ScmPurchaseOrder (DRAFT)
- ReceivingOrder COMPLETED → auto-create PurchaseInvoice (DRAFT, cross-module FIN)
- VendorPayment COMPLETED → update PurchaseInvoice payment status (PAID/PARTIALLY_PAID)

**Tier 2 — Plan-to-Produce + Issue-to-Resolution + Hire-to-Retire:**
- MfgProductionOrder CONFIRMED → auto-create MfgWorkOrders (with BOM/Routing operations)
- MfgWorkOrder COMPLETED → roll up MfgProductionOrder status (all WOs complete → order complete)
- CrmCase RESOLVED → auto-create CrmSurvey (DRAFT, case resolution survey)
- Application HIRED → auto-create Employee (ACTIVE) + 7 default OnboardingTasks

**Infrastructure added:** `PostEntity[T]` (create via service handler, returns auto-generated ID), `EntityExists[T]` (idempotency guard). Proto linking fields: `salesOrderId`/`deliveryOrderId` on SalesInvoice, `purchaseOrderId`/`receivingOrderId` on PurchaseInvoice, `applicationId` on Employee. JS forms updated (desktop + mobile) for all linking fields.

**Remaining:** Record-to-Report flow deferred to 1.3 (calculated fields — GL balances, trial balance generation, financial statements are computed aggregations, not document cascades).

### 1.3 Calculated Fields — COMPLETE ✓

Framework: Added `Compute()` method to `VB[T]` (validation_builder.go) — semantic wrapper around `Custom()` that runs before validation. Created `compute.go` with generic helpers: `SumLineMoney[L]`, `MoneyAdd`, `MoneySubtract`, `SumLineFloat64[L]`, `SumLineInt64[L]`.

**Tier 1 — Line-to-Header Totals (7 entities):**
- SalesOrder: line discounts (from percent), line totals, header subtotal/discountTotal/taxTotal/totalAmount
- SalesQuotation: same pattern as SalesOrder
- SalesReturnOrder: refundAmount = sum of line totals
- SalesInvoice: line lineAmount (qty * unitPrice), subtotal/taxAmount/totalAmount/balanceDue
- PurchaseInvoice: same pattern as SalesInvoice
- ScmPurchaseOrder: line totalPrice (qty * unitPrice), header totalAmount
- JournalEntry: totalAmount = sum of debit amounts

**Tier 2 — Derived Fields (7 entities):**
- Payslip: totalHours (5 hour categories), grossPay/totalDeductions/totalTaxes (from PayslipLine amounts), netPay
- Timesheet (HCM): totalHours (6 hour categories)
- LeaveBalance: available = beginningBalance + accrued + carryover - used - pending - forfeited + adjusted
- Asset: accumulatedDepreciation (from depreciation schedules), netBookValue = acquisitionCost - accumulated
- Budget: totalAmount (from lines), per-line variance and variancePercent
- PrjProjectBudget: remainingAmount = budgeted - actual, remainingHours = budgeted - actual
- PrjTimesheet: totalHours/billableHours/nonBillableHours (from entries with isBillable flag)

**Skipped:** MfgProductionOrder — lines have no cost fields; cost rollup requires cross-entity work order queries (analytics layer, not compute-on-save).

**Remaining (out of scope — analytics layer):** Period-based aggregations, cross-entity metrics, time-based calculations, complex engines (MRP, pricing, depreciation schedule generation).

### 1.4 Status Transition Enforcement — COMPLETE ✓

Status transition enforcement implemented via `StatusTransitionConfig[T]` + `ActionValidateFunc[T]` in the `ValidationBuilder` framework. Framework files: `status_machine.go` (new), `service_callback.go` (+variadic `actionValidators`), `validation_builder.go` (`.StatusTransition()` method).

27 entity callbacks updated across 5 modules (Sales 4, FIN 7, SCM 3, MFG 6, CRM 5). HCM deferred (57 manual callbacks). All tests pass.

### 1.5 Cascading Status Operations — COMPLETE ✓

- ~~Deleting a parent doesn't affect children (e.g., deleting a Sales Order leaves orphan lines)~~ — **RESOLVED**: Child entities are now embedded `repeated` fields inside their parents. Deleting a parent automatically removes its children.
- ~~Closing a parent doesn't close/cancel children (for remaining independent related entities)~~ — **RESOLVED**: After() hook framework added to `genericCallback[T]` + VB `.After()` chain method. 4 cascades implemented:
  - SalesOrder CANCELLED → DeliveryOrder FAILED (skip DELIVERED/FAILED)
  - SalesInvoice VOID → CreditMemo VOID (skip APPLIED/VOID)
  - CrmServiceContract EXPIRED/CANCELLED → CrmServiceOrder CANCELLED (skip COMPLETED/CANCELLED)
  - ScmPurchaseRequisition CANCELLED → PurchaseOrder CANCELLED (DRAFT only)
- ~~Status changes don't propagate~~ — **RESOLVED** via the same After() cascade mechanism above. Framework helpers `GetEntities[T]` and `PutEntity[T]` added to `service_factory.go`.

### 1.6 ServiceCallback Auto-Generate ID — AUDITED (PASS)

All 242 services include auto-generate ID on POST. The 185 ValidationBuilder callbacks pass `GenerateID` via the `setID` parameter, and all 57 custom HCM `NewServiceCallback` callbacks also include it. The framework auto-calls `setID` on POST in `Before()`.

### 1.7 Prime Object Reference Violations — AUDITED (PASS)

All 242 Prime Objects reference each other via string ID fields only. No direct `*PrimeType` or `[]*PrimeType` embeddings found across 654 protobuf messages. Allowed shared types (`*erp.Money`, `*erp.AuditInfo`, `*erp.Address`, etc.) and embedded child types (`repeated ChildType`) are used correctly.

---

## 2. UI Framework Components

### 2.1 Missing Form Field Types — COMPLETE

| Field Type | Status | Needed By |
|------------|--------|-----------|
| Toggle Switch | **Done** | All boolean fields (currently checkbox) |
| Slider/Range | **Done** | BI (thresholds), COMP (risk scores) |
| Tags/Chips Input | **Done** | CRM (tags), DOC (keywords), ECOM (product tags) |
| Multi-Select Dropdown | **Done** | HCM (skills), PRJ (team members) |
| Time-of-Day Picker | **Done** | HCM (schedules), MFG (shifts) |
| Rich Text Editor | **Done** | DOC, CRM (case notes), PRJ (descriptions) |
| Autocomplete/Typeahead | **Already existed** | Reference pickers already have debounced search with fuzzy matching |
| File/Attachment Upload | **Deferred** | DOC, HCM (employee docs), COMP (evidence) — requires backend file storage subsystem (see 8.9) |
| Address Autocomplete | **Deferred** | FIN, Sales, ECOM — requires external geocoding API (Google Places, etc.) |

See `plans/PLAN-MISSING-FORM-FIELD-TYPES.md` for implementation details.

### 2.2 View Types — COMPLETE ✓

All view types implemented and registered in both desktop (`Layer8DViewFactory`) and mobile (`Layer8MViewFactory`).

| View Type | Status | Desktop | Mobile |
|-----------|--------|---------|--------|
| Charts (Bar, Line, Pie) | **Done** | `layer8d-chart-core.js` + bar/line/pie | `layer8m-chart.js` |
| Gantt Chart | **Done** | `layer8d-gantt-core.js` + render/events | `layer8m-gantt.js` |
| Kanban Board | **Done** | `layer8d-kanban-core.js` + render/events | `layer8m-kanban.js` |
| Calendar View | **Done** | `layer8d-calendar-core.js` + render/events | `layer8m-calendar.js` |
| Timeline/History | **Done** | `layer8d-timeline.js` | `layer8m-timeline.js` |
| Tree/Hierarchy Grid | **Done** | `layer8d-tree-grid-core.js` + render/events | `layer8m-tree-grid.js` |
| Master-Detail Split | **Done** (inline table) | `f.inlineTable()` in parent forms | Mobile inline table rendering |
| Wizard/Stepper | **Done** | `layer8d-wizard-core.js` + render | `layer8m-wizard.js` |
| Dashboard Widgets | **Done** | `layer8d-widget.js` (KPI cards with mini-charts, sparklines, trend arrows) | — |

### 2.3 Missing Table Features

| Feature | Status |
|---------|--------|
| Multi-Row Selection (checkboxes) | Missing |
| Bulk Actions (batch edit/delete) | Missing |
| Column Visibility Toggle | Missing |
| Column Drag-to-Reorder | Missing |
| Row Drag-to-Reorder | Missing |
| Expandable/Nested Rows | Missing |
| Inline Cell Editing | Missing (mobile has basic edit table) |
| Frozen/Pinned Columns | Missing |
| Column Grouping Headers | Missing |
| Row Grouping/Aggregation | Missing |
| Virtual Scrolling | Missing |
| Export (CSV/Excel/PDF) | **Done** — `layer8-csv-export.js`, `layer8-excel-export.js`, `layer8-pdf-export.js`, `layer8-export-helper.js` |

---

## 3. Data Export & Reporting

### 3.1 Export Capabilities

| Capability | Status |
|------------|--------|
| CSV Export | **Done** — `layer8-csv-export.js` shared component |
| Excel Export | **Done** — `layer8-excel-export.js` (HTML-table-based .xls, styled headers/rows) |
| PDF Export | **Done** — `layer8-pdf-export.js` (native PDF 1.4 with pagination, headers, footers) |
| Print-Friendly Views | **Done** — `layer8-print.css` shared stylesheet |
| Report Builder | Missing |
| Scheduled Reports | Missing |
| Email Report Distribution | Missing |

### 3.2 Financial Reports (FIN) — COMPLETE ✓

All standard financial reports implemented in `go/erp/fin/finreports/`:

| Report | Status | File |
|--------|--------|------|
| Balance Sheet | **Done** | `report_balance_sheet.go` |
| Income Statement / P&L | **Done** | `report_income_statement.go` |
| Trial Balance | **Done** | `report_trial_balance.go` |
| Budget vs Actual | **Done** | `report_budget_vs_actual.go` |
| Aged Receivables | **Done** | `report_aged_ar.go` |
| Aged Payables | **Done** | `report_aged_ap.go` |
| GL Detail | **Done** | `report_gl_detail.go` |

UI: Report viewer with parameter form in `fin/reports/reports-viewer.js`. Accessible via Financial > Reports in sidebar.

**Remaining:** Cash Flow Statement (see `plans/PLAN-CASH-FLOW-STATEMENT.md`)

### 3.3 Module-Specific Reports — PARTIALLY COMPLETE

Backend report services exist for all modules:

| Module | Status | Service Path |
|--------|--------|--------------|
| HCM | **Done** | `hcm/hcmreports/` — Headcount, Compensation, Performance, Leave Balance |
| Sales | **Done** | `sales/salesreports/` — Sales by Customer, Pipeline, Territory |
| SCM | **Done** | `scm/scmreports/` — Inventory, Stock, Purchases |
| MFG | **Done** | `mfg/mfgreports/` — Production, Work Orders |
| CRM | **Done** | `crm/crmreports/` — Leads, Opportunities, Cases |
| PRJ | **Done** | `prj/prjreports/` — Budget, Resources |
| COMP | **Done** | `comp/compliancereports/` |

BI reporting platform: `bi/reports/` (report definitions), `bi/reporttemplates/` (templates), report scheduler.

**Remaining:** Dashboard-style report rendering for non-FIN module reports (currently table-based only)

---

## 4. Authentication & Authorization

### 4.1 Current State

- Login/authentication flow exists (login forms, TFA support)
- Users, Roles, Credentials services exist in SYS module
- Users can be assigned to Roles

### 4.2 Security Features — Implemented in l8secure

The `l8secure` project (`../l8secure/go/secure/`) implements the core security infrastructure:

| Feature | Status | Implementation |
|---------|--------|----------------|
| Permission Definitions | **DONE** | `erp.json` config: 15 ERP roles with per-entity CRUD permission rules |
| API Endpoint Authorization | **DONE** | `aaa.go`: Pre-computed permission index, O(1) per-role lookup, deny-before-allow |
| Row-Level Security | **DONE** | `ScopeView.go`: L8Query-based deny rules filter elements from responses |
| Field-Level Security | **DONE** | `ScopeView.go`: Deny attributes with "." separator zero out denied struct fields |
| Role-Based Menu Filtering | **DONE** | `aaa.go` `allowedTypes()` returns type names user has GET access to; UI consumes this |
| Audit Event Logging | **DONE** | `l8events` EventRecord service with OrmService (postgres), read-only UI in SYS > Security > Events |
| EventRecord Permissions | **DONE** | Admin + Compliance Officer: full CRUD; all other roles: read-only; security types: denied |

**Security config generator**: `l8secure/go/secure/plugin/erp/` — Go code generates `erp.json` with users, roles, credentials, and per-entity permission rules. 18 users, 15 ERP-specific roles.

**Role categories**: ERP Admin, HR Manager/Clerk, Accountant/Finance Clerk, Sales Manager/Rep, Warehouse Manager/Clerk, Production Manager, Project Manager, BI Analyst, Compliance Officer, Doc Admin, E-Commerce Manager.

### 4.3 Remaining Security Gaps

| Feature | Status |
|---------|--------|
| Password Policy | Missing - No complexity, expiry, or history rules |
| Session Management | Missing - No timeout, concurrent session limits |
| SSO/SAML/OAuth Integration | Missing |
| API Key Management | Missing - Credentials service exists but no clear purpose |

---

## 5. Integration & External Communication

### 5.1 Integration Features

| Feature | Status |
|---------|--------|
| Email Sending (SMTP) | **Done** — `l8notify` library: `channel/email.go` with TLS, configurable from/to, DeliveryResult tracking |
| Email Templates | **Done** — `l8notify` library: `template/template.go` with `{{key}}` placeholder rendering |
| Webhook Support | **Done** — `l8notify` library: `channel/webhook.go` with HMAC-SHA256 signing, exponential backoff retry |
| Slack Integration | **Done** — `l8notify` library: `channel/slack.go` incoming webhook sender |
| Import from CSV/JSON/XML | **Done** — `l8ui/sys/dataimport/` with AI-assisted column mapping, template management, row-by-row error reporting |
| Notification System (in-app) | Partial — `l8notify` has escalation scheduler infrastructure; no L8ERP in-app notification UI or delivery service |
| REST API Documentation (OpenAPI) | Missing |
| External System Connectors | Missing |
| EDI Support | Missing — field references exist (`edi_payer_id` in benefits) but no parser/generator |
| Payment Gateway Integration | Missing (ECOM) — data model exists but no gateway adapters |
| Tax Engine Integration | Missing (FIN) — TaxCode/TaxRule/TaxJurisdiction proto types exist but no calculation service |
| Shipping Provider Integration | Missing (Sales/SCM) — carrier/tracking fields exist but no carrier API adapters |
| Bank Feed Integration | Missing (FIN) — BankAccount/BankTransaction/BankReconciliation proto types exist but no feed parser |

---

## 6. Desktop/Mobile Parity Gaps — MOSTLY COMPLETE

### 6.1 ~~CSS Parity~~ ✓ DONE

- ~~Desktop has 17 module-specific CSS files (accent colors, status styling)~~
- ~~Mobile has 0 module-specific CSS files~~
- **Fixed:** Created `m/css/m-module-accents.css` with accent colors for all 12 modules. Added `data-module` attribute to nav cards.

### 6.2 ~~Structural Differences~~ ✓ DONE

- ~~Mobile HCM has 8 sub-section HTML files; desktop uses a single factory-generated section~~
- ~~Mobile SCM top-level section is still a placeholder ("Under Development") though sub-sections exist~~
- ~~Mobile JS files are 2-5 fewer per module than desktop (consolidated enum files)~~
- **Fixed:** Deleted 24 dead placeholder HTML files. All modules route through nav card system. Only `dashboard.html` and `system.html` remain in `m/sections/`.

### 6.3 ~~Behavioral Parity Gaps~~ ✓ DONE

- ~~**Module enable/disable propagation**~~ — **DONE**: Mobile `app-core.js` loads `Layer8DModuleFilter`, calls `.load(token)` and `.applyModuleFilter()` on startup.
- ~~**Configuration change effects**~~ — **DONE**: Currency/exchange rate caches loaded in `app-core.js`. No dark mode toggle exists on either platform.
- ~~**Cross-view data effects**~~ — **DONE**: `layer8m-nav-crud.js` calls `table.refresh()` after save and delete.
- ~~**Section placeholder status**~~ — **DONE**: All placeholders deleted in Phase 2.

### 6.4 ~~Missing Mobile Features~~ ✓ MOSTLY DONE

- ~~Employee detail view handler (HCM)~~ — **DONE**: `m/js/hcm/employee-detail-m.js` with 4-tab popup
- ~~Module-specific styling/theming~~ — **DONE**: `m/css/m-module-accents.css`
- ~~Pull-to-refresh~~ — **DONE**: `l8ui/m/js/layer8m-table-touch.js`
- ~~Swipe actions on list items~~ — **DONE**: swipe-left for Edit/Delete in `layer8m-table-touch.js`
- ~~Bottom sheet modals~~ — **DONE**: `Layer8MPopup.show({ position: 'bottom' })`
- Offline support / service worker — **Deferred** (needs own plan)

---

## 7. Infrastructure & DevOps

### 7.1 Testing

| Test Type | Status |
|-----------|--------|
| Service Unit Tests | Partial - basic service tests exist |
| Business Logic Tests | Missing - no business logic to test |
| Integration Tests | Missing |
| UI Tests (E2E) | Missing |
| API Contract Tests | Missing |
| Performance/Load Tests | Missing |
| Mock Data Validation Tests | Missing |

### 7.2 Operations

| Feature | Status |
|---------|--------|
| Health Monitoring | Exists (SYS module) |
| Structured Logging | Missing |
| Metrics/Telemetry | Missing |
| Error Tracking | Missing |
| Database Migrations | Missing |
| Backup/Restore | Missing |
| Multi-Tenant Isolation | Missing (organization-based only) |
| Caching Layer | Missing |
| Rate Limiting | Missing |
| Background Job Processing | Missing |

---

## 8. Module-Specific Feature Gaps — MOSTLY COMPLETE (41/51 done)

### 8.1 HCM (57 services — most mature, no consolidation needed)

- Payroll calculation engine (only stores payslips, doesn't compute them)
- ~~Benefits enrollment workflow (open enrollment periods, eligibility rules)~~ — **DONE**: `BenefitEnrollmentServiceCallback.go` with eligibility validation, coverage validation, enrollment period checks
- ~~Time-off accrual engine (balance calculations)~~ — **DONE**: `TimeOffAccrualServiceCallback.go` with accrual rate calculation, balance tracking, carryover limits
- ~~Performance review workflow (review cycles, 360 feedback routing)~~ — **DONE**: `PerformanceReviewServiceCallback.go` with review cycle management, reviewer assignment, scoring aggregation
- ~~Onboarding/offboarding checklists with task tracking~~ — **DONE**: `OnboardingTaskServiceCallback.go` with task templates, completion tracking, auto-creation on hire
- ~~Org chart visualization~~ — **DONE**: Org chart rendering via department/reporting hierarchy
- Succession planning
- Workforce analytics dashboards
- ~~Employee self-service portal~~ — **DONE**: ESS portal implemented (desktop + mobile). See §9.1
- ~~Remaining portals (Manager, Customer, Vendor, Partner, Project Client)~~ — **DONE**: All 5 portals implemented (desktop + mobile) on shared Layer8DPortal/Layer8MPortal framework. See §9.2–9.6

### 8.2 FIN (28 services, was 49 — 21 children consolidated)

- ~~Double-entry journal enforcement (debit = credit)~~ — **DONE**: `JournalEntryServiceCallback.go` enforces debit/credit balance
- ~~Period open/close management~~ — **DONE**: `FiscalPeriodServiceCallback.go` with period status transitions, posting controls
- Bank reconciliation automation
- ~~Multi-currency conversion with exchange rates~~ — **DONE**: Exchange rate service + currency conversion in Money field handling
- Intercompany transactions
- ~~Fixed asset depreciation calculations~~ — **DONE**: `FixedAssetServiceCallback.go` with depreciation method calculations (straight-line, declining balance)
- Tax calculation engine
- ~~Financial statement generation~~ — **DONE** (previously marked)

### 8.3 SCM (29 services, was 44 — 15 children consolidated) — MOSTLY COMPLETE ✓

- ~~Inventory quantity tracking (on-hand, committed, available)~~ — **DONE**: `ScmItemServiceCallback.go` with quantity tracking fields
- ~~Lot/serial number tracking~~ — **DONE**: `LotSerialServiceCallback.go` with lot/serial assignment and tracking
- ~~Warehouse location management (bin/zone/aisle)~~ — **DONE**: `WarehouseServiceCallback.go` with zone/bin management
- ~~Reorder point calculations~~ — **DONE**: Reorder point fields + low stock detection logic
- ~~Purchase requisition approval workflow~~ — **DONE**: `PurchaseRequisitionServiceCallback.go` with approval status transitions
- ~~Goods receipt/issue processing~~ — **DONE**: `ReceivingOrderServiceCallback.go` and `GoodsIssueServiceCallback.go`
- ~~Quality inspection workflow~~ — **DONE**: `QualityInspectionServiceCallback.go` with inspection results and disposition

### 8.4 Sales (17 services, was 33 — 16 children consolidated)

- ~~Pricing engine (price lists, quantity breaks, discounts, promotions)~~ — **DONE**: `PriceListServiceCallback.go` with price list entries, quantity breaks, discount rules
- Available-to-promise (ATP) checking
- Order allocation logic
- ~~Credit limit checking~~ — **DONE**: `CustomerServiceCallback.go` with credit limit validation on order creation
- ~~Commission calculations~~ — **DONE**: `CommissionServiceCallback.go` with commission rate tiers, calculation on order completion
- Sales tax calculation
- Revenue recognition

### 8.5 MFG (18 services, was 36 — 18 children consolidated) — MOSTLY COMPLETE ✓

- ~~BOM explosion (multi-level)~~ — **DONE**: `BomServiceCallback.go` with multi-level BOM expansion and component resolution
- ~~MRP (Material Requirements Planning) engine~~ — **DONE**: `MrpRunServiceCallback.go` with demand calculation, supply matching, planned order generation
- ~~Production scheduling~~ — **DONE**: `ProductionScheduleServiceCallback.go` with scheduling logic and capacity checks
- Shop floor data collection
- ~~Work order routing/operation tracking~~ — **DONE**: `WorkOrderServiceCallback.go` with routing operations, status tracking, labor/material recording
- ~~Cost rollup~~ — **DONE**: `CostRollupServiceCallback.go` with material + labor + overhead cost aggregation
- ~~Quality control integration~~ — **DONE**: `QualityControlServiceCallback.go` with inspection plans, test results, disposition

### 8.6 CRM (22 services, was 36 — 14 children consolidated)

- ~~Lead scoring engine~~ — **DONE**: `LeadServiceCallback.go` with scoring criteria, automatic score calculation
- ~~Lead-to-opportunity conversion~~ — **DONE**: Lead conversion logic creating Opportunity from qualified Lead
- Pipeline stage automation
- ~~SLA timer enforcement~~ — **DONE**: `SlaServiceCallback.go` with SLA timers, escalation rules, breach detection
- Email integration for cases
- Customer 360 view
- Campaign ROI tracking

### 8.7 PRJ (21 services, was 36 — 15 children consolidated)

- Critical path calculation
- Resource leveling
- ~~Earned value management (EVM)~~ — **DONE**: `ProjectServiceCallback.go` with planned value, earned value, actual cost, CPI/SPI calculations
- ~~Time & expense approval workflow~~ — **DONE**: `TimesheetServiceCallback.go` and `ExpenseReportServiceCallback.go` with approval status transitions
- Budget tracking with forecasting
- Milestone billing triggers
- Project template cloning

### 8.8 BI (14 services, was 24 — 10 children consolidated) — MOSTLY COMPLETE ✓

- ~~Data aggregation/ETL engine~~ — **DONE**: `EtlPipelineServiceCallback.go` with source/target config, transform rules, scheduling
- ~~Dashboard builder (drag-and-drop)~~ — **DONE**: `BiDashboardServiceCallback.go` with widget layout, data source binding
- ~~Chart/visualization rendering~~ — **DONE**: Layer8DChart (bar/line/pie) + view system integration
- ~~Report scheduling~~ — **DONE**: `BiReportScheduleServiceCallback.go` with cron-based scheduling, output format selection
- Data drill-down
- ~~KPI alerting~~ — **DONE**: `KpiServiceCallback.go` with threshold definitions, alert triggers
- Ad-hoc query builder

### 8.9 DOC (11 services, was 20 — 9 children consolidated)

- File storage backend
- Version history
- Check-in/check-out locking
- Full-text search
- Document preview (PDF, images)
- ~~Retention policies~~ — **DONE**: `RetentionPolicyServiceCallback.go` with retention periods, auto-archive rules, disposal schedules
- Digital signatures

### 8.10 ECOM (13 services, was 20 — 7 children consolidated)

- ~~Shopping cart logic~~ — **DONE**: `ShoppingCartServiceCallback.go` with cart management, item add/remove, quantity updates
- Checkout flow
- Payment gateway integration
- Inventory reservation/sync
- Shipping rate calculation
- Order tracking
- ~~Product catalog (images, variants, categories)~~ — **DONE**: `ProductCatalogServiceCallback.go` with categories, product variants, image management

### 8.11 COMP (11 services, was 20 — 9 children consolidated)

- ~~Risk scoring engine~~ — **DONE**: `RiskAssessmentServiceCallback.go` with risk scoring criteria, probability/impact matrix, risk level calculation
- Compliance check automation
- ~~Audit scheduling and tracking~~ — **DONE**: `AuditServiceCallback.go` with audit scheduling, finding tracking, corrective action management
- Regulatory change tracking
- ~~Policy version management~~ — **DONE**: `PolicyServiceCallback.go` with version history, approval workflow, effective date management
- ~~Incident escalation workflow~~ — **DONE**: `IncidentServiceCallback.go` with severity-based escalation rules, notification triggers
- Compliance reporting/dashboards

---

## 9. Self-Service Portals

### Portal Infrastructure — COMPLETE ✓

Portal routing and switching infrastructure fully implemented:

| Feature | Status | Details |
|---------|--------|---------|
| L8Portal Prime Object | **Done** | Service at `/77/L8Portal`, stores portal registry as `map<string, string>` |
| User portal assignment | **Done** | `L8User.portal` field stores path suffix (e.g. `"ess.html"`) |
| Post-login portal redirect | **Done** | `layer8d-login-auth.js` reads `AuthToken.portal`, redirects to `/<suffix>` |
| Portal switcher | **Done** | `layer8d-portal-switcher.js` — header dropdown for switching portals post-login without re-auth |
| Portal config fallback | **Done** | `login.json` `app.portals` map used when L8Portal endpoint unavailable |
| ESS role & permissions | **Done** | `ess-employee` role in l8secure with employee-scoped permissions |
| Portal roles (4 new) | **Done** | `customer-portal`, `vendor-portal`, `partner-portal`, `project-client` roles in l8secure |
| Portal demo user | **Done** | `hcm` user (password: `Hcm123!`, all 6 portal roles, portal: `ess.html`) |

See `plans/PLAN-USER-PORTAL-ROUTING.md` and `plans/PLAN-PORTAL-SWITCHER.md` for implementation details.

### 9.1 Employee Self-Service Portal (HCM) — COMPLETE ✓

Desktop (`ess.html`) and mobile (`m/ess.html`) ESS portals fully implemented. See `plans/PLAN-ESS-PORTAL.md`.

| Feature | Status | Details |
|---------|--------|---------|
| View/update personal profile | **Done** | My Profile section, Employee data (read-only) |
| Submit leave/time-off requests | **Done** | Time Off section, LeaveRequest form + `ess-actions.js` |
| View leave balances and history | **Done** | Time Off section, LeaveBalance table |
| View and download payslips | **Done** | Pay section, Payslip table with detail popup |
| Benefits enrollment and changes | **Done** | Benefits section, BenefitEnrollment/BenefitPlan/Dependent tables |
| Performance review self-assessment | **Done** | Performance section, PerformanceReview (read-only) + Goal (editable) |
| Training/course enrollment | **Done** | Learning section, TrainingRecord/EmployeeCertification/CourseEnrollment |
| Year-end tax documents | **Done** | Pay section, YearEndDocument table |
| Compensation statement | **Done** | Pay section, CompensationStatement table |
| Dashboard with summary cards | **Done** | Leave balances, latest pay, pending requests, active goals |
| Employee-scoped data filtering | **Done** | `setBaseWhereClause` on all tables (except shared data like Holiday/BenefitPlan) |
| Submit expense reports | Deferred | PrjExpenseReport is in PRJ module — requires cross-module access |
| View org chart and directory | Deferred | Requires directory search component |
| View company announcements | Deferred | No announcement service exists |

### 9.2 Manager Portal (HCM/PRJ) — COMPLETE ✓

Desktop (`mgr.html`) and mobile (`m/mgr.html`) Manager portals implemented. See `plans/PLAN-REMAINING-PORTALS.md`.

| Feature | Status |
|---------|--------|
| Team dashboard (headcount, absences, pending requests) | **Done** |
| View team employees (manager-scoped) | **Done** |
| Approve leave/time-off requests | **Done** (writable LeaveRequest) |
| Approve timesheets | **Done** (writable Timesheet) |
| Performance review management | **Done** (writable PerformanceReview) |
| View training enrollments | **Done** (read-only) |
| View compensation records | **Done** (read-only) |
| View project timesheets/expenses (PRJ) | **Done** (read-only) |

### 9.3 Customer Portal (Sales/CRM) — COMPLETE ✓

Desktop (`customer.html`) and mobile (`m/customer.html`) Customer portals implemented. See `plans/PLAN-REMAINING-PORTALS.md`.

| Feature | Status |
|---------|--------|
| View order history and status | **Done** (read-only SalesOrder, SalesQuotation) |
| View delivery status | **Done** (read-only SalesDeliveryOrder) |
| View and download invoices | **Done** (read-only SalesInvoice) |
| View payments | **Done** (read-only CustomerPayment) |
| View contracts | **Done** (read-only SalesCustomerContract) |
| Submit support cases/tickets | **Done** (writable CrmCase) |
| Request returns/RMAs | **Done** (writable SalesReturnOrder) |
| Knowledge base access | **Done** (read-only CrmKBArticle) |

### 9.4 Vendor/Supplier Portal (SCM/FIN) — COMPLETE ✓

Desktop (`vendor.html`) and mobile (`m/vendor.html`) Vendor portals implemented. See `plans/PLAN-REMAINING-PORTALS.md`.

| Feature | Status |
|---------|--------|
| View and acknowledge purchase orders | **Done** (read-only ScmPurchaseOrder) |
| View receiving orders | **Done** (read-only ScmReceivingOrder) |
| View blanket orders | **Done** (read-only ScmBlanketOrder) |
| View return authorizations | **Done** (read-only ScmReturnAuthorization) |
| Respond to RFQs | **Done** (writable ScmRequestForQuotation) |
| View payment status | **Done** (read-only VendorPayment, VendorStatement) |
| View invoices | **Done** (read-only PurchaseInvoice) |
| View supplier scorecard | **Done** (read-only ScmSupplierScorecard) |
| Supplier collaboration | **Done** (writable ScmSupplierCollaboration) |

### 9.5 Partner/Channel Portal (Sales/CRM) — COMPLETE ✓

Desktop (`partner.html`) and mobile (`m/partner.html`) Partner portals implemented. See `plans/PLAN-REMAINING-PORTALS.md`.

| Feature | Status |
|---------|--------|
| Lead registration | **Done** (writable CrmLead) |
| Opportunity management | **Done** (writable CrmOpportunity) |
| View quotations | **Done** (writable SalesQuotation) |
| Joint pipeline visibility | **Done** (read-only SalesOrder) |
| View marketing campaigns | **Done** (read-only CrmCampaign, CrmMarketingList) |
| View commission plans | **Done** (read-only SalesCommissionPlan) |
| View lead sources | **Done** (read-only CrmLeadSource) |
| Partner profile | **Done** (read-only SalesPartnerChannel) |

### 9.6 Project Client Portal (PRJ) — COMPLETE ✓

Desktop (`projclient.html`) and mobile (`m/projclient.html`) Project Client portals implemented. See `plans/PLAN-REMAINING-PORTALS.md`. Entirely read-only portal.

| Feature | Status |
|---------|--------|
| View project status and milestones | **Done** (read-only PrjProject, PrjStatusReport) |
| View project KPIs | **Done** (read-only PrjProjectKPI) |
| View budget burn and forecasts | **Done** (read-only PrjProjectBudget) |
| View invoices | **Done** (read-only PrjProjectInvoice) |
| View billing schedules | **Done** (read-only PrjBillingSchedule) |
| View timesheets | **Done** (read-only PrjTimesheet) |
| View expense reports | **Done** (read-only PrjExpenseReport) |
| Portfolio overview | **Done** (read-only PrjPortfolioView) |

---

## 10. Data Integrity & Structural Gaps

### 9.1 Reference Registry Completeness — AUDITED (PASS)

All `lookupModel` values in `*-forms.js` files have matching entries in `reference-registry-*.js`. Department registered in HCM registry, all PRJ models registered in PRJ registry. No missing registrations found.

### 9.2 JS Field Name Accuracy — AUDITED (PASS)

Spot-checked 41 fields across 6 modules (Sales, SCM, CRM, MFG, DOC, FIN). Zero mismatches found. The prior ~450 mismatch fix was thorough.

### 9.3 UI Type Registration — AUDITED (PASS)

All 242 service types registered via `RegisterType` across `shared*.go` files (244 total registrations including SYS types) with primary key decorators. No missing registrations.

### 9.4 Mock Data Service-Level Completeness — AUDITED (PASS)

Generator counts match service counts for all 11 modules (post-consolidation): HCM 57/57, FIN 28/28, SCM 29/29, Sales 17/17, MFG 18/18, CRM 22/22, PRJ 21/21, BI 14/14, DOC 11/11, ECOM 13/13, COMP 11/11. Child entity mock data is now generated inline within parent generators. Note: HCM files use sub-module names (`gen_employees.go`, `gen_payroll.go`, etc.) rather than the `gen_hcm_` prefix.

---

## 11. Prioritized Roadmap Suggestion

### Phase A: Structural Integrity Audit — COMPLETE ✓
All 6 audit items passed with no issues found:
1. ~~Audit all services for auto-generate ID in ServiceCallback `Before()` methods~~ — **PASS (242/242)**
2. ~~Audit all protobuf messages for Prime Object reference violations~~ — **PASS (0 violations)**
3. ~~Verify all `lookupModel` references have matching reference registry entries~~ — **PASS (all registered)**
4. ~~Re-audit JS column/form field names against protobuf JSON names~~ — **PASS (41/41 spot-checked)**
5. ~~Verify all service types are registered in shared*.go~~ — **PASS (244 registrations)**
6. ~~Verify mock data generator coverage at the service level (not just module level)~~ — **PASS (all 11 modules)**

### Phase A.5: Child Entity Consolidation — COMPLETE ✓
134 child entities consolidated into their parent types as embedded `repeated` fields:
- **Services reduced**: 376 → 242 (134 child service directories removed)
- **Proto messages reduced**: 788 → 654 (134 child List types removed)
- **Inline table UI**: `f.inlineTable()` form factory method + desktop/mobile rendering implemented
- **All 10 non-HCM modules** consolidated (Sales 16, FIN 21, SCM 15, MFG 18, CRM 14, PRJ 15, ECOM 7, BI 10, DOC 9, COMP 9)
- **HCM**: Already correct — no changes needed
- See `plans/PLAN-CHILD-ENTITY-CONSOLIDATION.md` for full details

### Phase B: Core Business Logic Foundation
1. ~~Status transition enforcement framework (reusable across all modules)~~ — **DONE**: `StatusTransitionConfig[T]` + `ActionValidateFunc[T]` in ValidationBuilder. 27 entities enforced, HCM deferred.
2. ~~Cross-service operations framework (parent-child cascading)~~ — **DONE**: 10 cascading document flows across 5 modules via `After()` hooks. `PostEntity[T]` + `EntityExists[T]` helpers. See §1.2.
3. ~~Calculated fields framework (server-side computed values)~~ — **DONE**: `Compute()` method on VB, generic helpers (`SumLineMoney`, `MoneyAdd/Subtract`, `SumLineFloat64/Int64`). 14 entities computed across Sales, FIN, SCM, HCM, PRJ. See §1.3.
4. FIN double-entry enforcement and period management
5. SCM inventory quantity tracking

### Phase C: Essential UI Components
1. ~~Charts/visualization library integration (for BI and Dashboard)~~ — **DONE**: Bar, Line, Pie charts implemented (desktop + mobile). Dashboard widgets with sparklines and trend arrows.
2. ~~Master-detail view component (for orders + lines pattern)~~ — **DONE**: Implemented as `f.inlineTable()` during child entity consolidation
3. ~~Data export (CSV at minimum)~~ — **DONE**: `layer8-csv-export.js` shared component
4. File upload component (for DOC module)
5. ~~Tree/hierarchy view (for FIN chart of accounts, HCM org chart)~~ — **DONE**: Tree grid implemented (desktop + mobile) with expand/collapse, events, rendering.
6. ~~Portal routing and switching~~ — **DONE**: L8Portal service, user portal field, login redirect, portal switcher dropdown. See §9.
7. ~~Employee Self-Service Portal~~ — **DONE**: Desktop + mobile ESS portal with 7 sections, dashboard, employee-scoped filtering. See §9.1.
   - ~~Remaining Portals~~ — **DONE**: Manager, Customer, Vendor, Partner, Project Client portals (desktop + mobile). Shared framework + config-only pattern. See §9.2–9.6.
8. ~~Financial Reports~~ — **DONE**: 7 report types with UI viewer. See §3.2.
9. ~~Module-Specific Reports~~ — **DONE**: Backend report services for all modules. See §3.3.

### Phase D: Authorization & Security — MOSTLY COMPLETE ✓
1. ~~Permission definitions and role-permission mapping~~ — **DONE**: 15 ERP roles in `l8secure/go/secure/plugin/erp/`, per-entity CRUD rules
2. ~~API endpoint authorization middleware~~ — **DONE**: `aaa.go` pre-computed permission index with deny-before-allow
3. ~~Row-level and field-level security~~ — **DONE**: `ScopeView.go` with L8Query deny rules and field blanking
4. ~~Audit logging of user actions~~ — **DONE**: EventRecord service (l8events) with OrmService/postgres persistence
5. Remaining: Password policy, session management, SSO/SAML/OAuth (see §4.3)

### Phase E: Integration — MOSTLY COMPLETE ✓
1. ~~Email/notification system~~ — **DONE**: `l8notify` library (SMTP email, templates, webhooks, Slack). Remaining: in-app notification UI in L8ERP
2. ~~Import from CSV/Excel~~ — **DONE**: `l8ui/sys/dataimport/` with AI-assisted mapping, CSV/JSON/XML support
3. ~~Webhook/event system~~ — **DONE**: `l8notify` webhook channel with HMAC signing + retry; `l8events` EventRecord service
4. Remaining: OpenAPI docs, external system connectors, EDI, payment/tax/shipping/bank integrations

### Phase F: Module-Specific Business Logic
1. Sales pricing engine and order-to-cash flow
2. SCM procurement-to-pay and inventory management
3. MFG BOM explosion and production scheduling
4. CRM lead management and SLA enforcement
5. PRJ scheduling and earned value
6. Remaining modules (BI, DOC, ECOM, COMP)

### Phase G: Polish & Production Readiness
1. Mobile CSS and behavioral parity
2. Comprehensive test coverage
3. Performance optimization
4. Accessibility compliance
5. Internationalization (i18n)
