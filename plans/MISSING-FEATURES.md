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

### 1.3 Missing Calculated Fields

No services compute derived values:

- **Financial**: Running balances, period totals, aging buckets, depreciation schedules
- **SCM**: Available-to-promise, safety stock, reorder quantities
- **Sales**: Line totals, order totals, tax calculations, discount applications
- **MFG**: BOM cost rollup, production cost variance, yield calculations
- **PRJ**: Percent complete, earned value metrics, budget burn rate
- **HCM**: Leave balances, payroll calculations, benefit costs

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

### 2.1 Missing Form Field Types

| Field Type | Status | Needed By |
|------------|--------|-----------|
| File/Attachment Upload | Missing | DOC, HCM (employee docs), COMP (evidence) |
| Rich Text Editor | Missing | DOC, CRM (case notes), PRJ (descriptions) |
| Tags/Chips Input | Missing | CRM (tags), DOC (keywords), ECOM (product tags) |
| Multi-Select Dropdown | Missing | HCM (skills), PRJ (team members) |
| Time-of-Day Picker | Missing | HCM (schedules), MFG (shifts) |
| Autocomplete/Typeahead | Missing | All reference fields (currently manual picker) |
| Slider/Range | Missing | BI (thresholds), COMP (risk scores) |
| Toggle Switch | Missing | All boolean fields (currently checkbox) |
| Address Autocomplete | Missing | FIN, Sales, ECOM (shipping addresses) |

### 2.2 Missing View Types

| View Type | Status | Needed By |
|-----------|--------|-----------|
| Charts (Bar, Line, Pie) | Missing | BI, Dashboard, FIN (trends), Sales (forecasts) |
| Gantt Chart | Missing | PRJ (schedules), MFG (production planning) |
| Kanban Board | Missing | CRM (pipeline), PRJ (task board), MFG (shop floor) |
| Calendar View | Missing | HCM (leave, schedules), PRJ (milestones) |
| Timeline/History | Missing | All modules (audit trail view) |
| Tree/Hierarchy Grid | Missing | FIN (chart of accounts), HCM (org chart), SCM (BOM) |
| Master-Detail Split | **Done** (inline table) | Sales (order + lines), SCM (PO + lines), MFG (BOM + components) — implemented via `f.inlineTable()` in parent forms |
| Wizard/Stepper | Missing | ECOM (checkout), HCM (onboarding), FIN (period close) |
| Dashboard Widgets | Partial | Dashboard has KPI counts only - no charts, no trends |

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
| Export (CSV/Excel/PDF) | Missing |

---

## 3. Data Export & Reporting

### 3.1 Export Capabilities

| Capability | Status |
|------------|--------|
| CSV Export | Missing |
| Excel Export | Missing |
| PDF Export | Missing |
| Print-Friendly Views | Missing |
| Report Builder | Missing |
| Scheduled Reports | Missing |
| Email Report Distribution | Missing |

### 3.2 Financial Reports (FIN)

None of the standard financial reports are implemented:

- Balance Sheet
- Income Statement / P&L
- Cash Flow Statement
- Trial Balance
- Aged Receivables / Payables
- General Ledger Detail
- Budget vs Actual

### 3.3 Module-Specific Reports

- **HCM**: Headcount, turnover, compensation summary, leave balances
- **SCM**: Inventory valuation, stock aging, purchase analysis
- **Sales**: Sales by region/product/customer, pipeline, quota attainment
- **MFG**: Production efficiency, scrap rates, capacity utilization
- **CRM**: Lead conversion, case resolution time, customer satisfaction
- **PRJ**: Resource utilization, budget burn, milestone tracking

---

## 4. Authentication & Authorization

### 4.1 Current State

- Login/authentication flow exists (login forms, TFA support)
- Users, Roles, Credentials services exist in SYS module
- Users can be assigned to Roles

### 4.2 Missing

| Feature | Status |
|---------|--------|
| Permission Definitions | Missing - Roles exist but no permissions mapped to them |
| Field-Level Security | Missing - All fields visible to all users |
| Row-Level Security | Missing - All data visible to all users |
| Role-Based Menu Filtering | Missing - All modules visible regardless of role |
| API Endpoint Authorization | Missing - No middleware checking permissions |
| Password Policy | Missing - No complexity, expiry, or history rules |
| Session Management | Missing - No timeout, concurrent session limits |
| Audit Log of User Actions | Missing - AuditInfo tracks create/modify but not reads or failed attempts |
| SSO/SAML/OAuth Integration | Missing |
| API Key Management | Missing - Credentials service exists but no clear purpose |

---

## 5. Integration & External Communication

### 5.1 Missing Integration Features

| Feature | Status |
|---------|--------|
| Email Sending (SMTP) | Missing |
| Email Templates | Missing |
| Notification System (in-app) | Missing |
| Webhook Support | Missing |
| REST API Documentation (OpenAPI) | Missing |
| Import from CSV/Excel | Missing |
| External System Connectors | Missing |
| EDI Support | Missing |
| Payment Gateway Integration | Missing (ECOM) |
| Tax Engine Integration | Missing (FIN) |
| Shipping Provider Integration | Missing (Sales/SCM) |
| Bank Feed Integration | Missing (FIN) |

---

## 6. Desktop/Mobile Parity Gaps

### 6.1 CSS Parity

- Desktop has **17 module-specific CSS files** (accent colors, status styling)
- Mobile has **0 module-specific CSS files** (relies entirely on generic app CSS)

### 6.2 Structural Differences

- Mobile HCM has 8 sub-section HTML files; desktop uses a single factory-generated section
- Mobile SCM top-level section is still a placeholder ("Under Development") though sub-sections exist
- Mobile JS files are 2-5 fewer per module than desktop (consolidated enum files)

### 6.3 Behavioral Parity Gaps

The mobile-parity rule requires that the same action produces the same result on both platforms. Key behavioral gaps:

- **Module enable/disable propagation**: If a module is disabled in SYS settings, does mobile navigation hide it? Both platforms need to consume the same module filter state.
- **Configuration change effects**: Currency selection, theme changes, and other settings may only propagate to desktop UI components, leaving mobile unaffected.
- **Cross-view data effects**: CRUD operations that update one view and affect another (e.g., status change on a list refreshing a detail view) need verification on both platforms.
- **Section placeholder status**: Some mobile sections may still show "Under Development" while desktop is fully functional (e.g., mobile SCM top-level section).

### 6.4 Missing Mobile Features

- Employee detail view handler (HCM)
- Module-specific styling/theming
- Pull-to-refresh
- Swipe actions on list items
- Bottom sheet modals
- Offline support / service worker

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

## 8. Module-Specific Feature Gaps

### 8.1 HCM (57 services — most mature, no consolidation needed)

- Payroll calculation engine (only stores payslips, doesn't compute them)
- Benefits enrollment workflow (open enrollment periods, eligibility rules)
- Time-off accrual engine (balance calculations)
- Performance review workflow (review cycles, 360 feedback routing)
- Onboarding/offboarding checklists with task tracking
- Org chart visualization
- Employee self-service portal

### 8.2 FIN (28 services, was 49 — 21 children consolidated)

- Double-entry journal enforcement (debit = credit)
- Period open/close management
- Bank reconciliation
- Multi-currency conversion with exchange rates
- Intercompany transactions
- Fixed asset depreciation calculations
- Tax calculation engine
- Financial statement generation

### 8.3 SCM (29 services, was 44 — 15 children consolidated)

- Inventory quantity tracking (on-hand, committed, available)
- Lot/serial number tracking
- Warehouse location management (bin/zone/aisle)
- Reorder point calculations
- Purchase requisition approval workflow
- Goods receipt/issue processing
- Quality inspection workflow

### 8.4 Sales (17 services, was 33 — 16 children consolidated)

- Pricing engine (price lists, quantity breaks, discounts, promotions)
- Available-to-promise (ATP) checking
- Order allocation logic
- Credit limit checking
- Commission calculations
- Sales tax calculation
- Revenue recognition

### 8.5 MFG (18 services, was 36 — 18 children consolidated)

- BOM explosion (multi-level)
- MRP (Material Requirements Planning) engine
- Production scheduling
- Shop floor data collection
- Work order routing/operation tracking
- Cost rollup
- Quality control integration

### 8.6 CRM (22 services, was 36 — 14 children consolidated)

- Lead scoring engine
- Lead-to-opportunity conversion
- Pipeline stage automation
- SLA timer enforcement
- Email integration for cases
- Customer 360 view
- Campaign ROI tracking

### 8.7 PRJ (21 services, was 36 — 15 children consolidated)

- Critical path calculation
- Resource leveling
- Earned value management (EVM)
- Time & expense approval workflow
- Budget tracking with forecasting
- Milestone billing triggers
- Project template cloning

### 8.8 BI (14 services, was 24 — 10 children consolidated)

- Data aggregation/ETL engine
- Dashboard builder (drag-and-drop)
- Chart/visualization rendering
- Report scheduling
- Data drill-down
- KPI alerting
- Ad-hoc query builder

### 8.9 DOC (11 services, was 20 — 9 children consolidated)

- File storage backend
- Version history
- Check-in/check-out locking
- Full-text search
- Document preview (PDF, images)
- Retention policies
- Digital signatures

### 8.10 ECOM (13 services, was 20 — 7 children consolidated)

- Shopping cart logic
- Checkout flow
- Payment gateway integration
- Inventory reservation
- Shipping rate calculation
- Order tracking
- Product catalog (images, variants, categories)

### 8.11 COMP (11 services, was 20 — 9 children consolidated)

- Risk scoring engine
- Compliance check automation
- Audit scheduling and tracking
- Regulatory mapping
- Policy version management
- Incident escalation workflow
- Compliance reporting/dashboards

---

## 9. Self-Service Portals

No portal functionality exists. The current UI is a single admin/back-office application. ERP systems typically provide role-specific portal experiences for external and internal users who don't need full back-office access.

### 9.1 Employee Self-Service Portal (HCM)

| Feature | Status |
|---------|--------|
| View/update personal profile | Missing |
| Submit leave/time-off requests | Missing |
| View leave balances and history | Missing |
| View and download payslips | Missing |
| Benefits enrollment and changes | Missing |
| Submit expense reports | Missing |
| View org chart and directory | Missing |
| Training/course enrollment | Missing |
| Performance review self-assessment | Missing |
| View company announcements | Missing |

### 9.2 Manager Portal (HCM/PRJ)

| Feature | Status |
|---------|--------|
| Approve leave/time-off requests | Missing |
| Approve expense reports | Missing |
| Approve timesheets | Missing |
| Team dashboard (headcount, absences, utilization) | Missing |
| Performance review management | Missing |
| Compensation planning for team | Missing |
| Project team resource allocation | Missing |

### 9.3 Customer Portal (Sales/CRM/ECOM)

| Feature | Status |
|---------|--------|
| View order history and status | Missing |
| View and download invoices | Missing |
| Make payments | Missing |
| Submit support cases/tickets | Missing |
| Track case resolution status | Missing |
| View/download statements | Missing |
| Request returns/RMAs | Missing |
| Update contact/shipping info | Missing |
| Product catalog browsing (ECOM) | Missing |

### 9.4 Vendor/Supplier Portal (SCM/FIN)

| Feature | Status |
|---------|--------|
| View and acknowledge purchase orders | Missing |
| Submit invoices against POs | Missing |
| Update delivery/shipping status | Missing |
| View payment status and remittance | Missing |
| Maintain product catalog/pricing | Missing |
| Submit compliance certifications | Missing |
| View supplier scorecard | Missing |

### 9.5 Partner/Channel Portal (Sales/CRM)

| Feature | Status |
|---------|--------|
| Deal registration | Missing |
| View commission statements | Missing |
| Access marketing materials and collateral | Missing |
| Joint pipeline visibility | Missing |
| Training and certification tracking | Missing |

### 9.6 Project Client Portal (PRJ)

| Feature | Status |
|---------|--------|
| View project status and milestones | Missing |
| Approve deliverables | Missing |
| Review and approve timesheets/expenses | Missing |
| View budget burn and forecasts | Missing |
| Access project documents | Missing |
| Submit change requests | Missing |

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
3. Calculated fields framework (server-side computed values)
4. FIN double-entry enforcement and period management
5. SCM inventory quantity tracking

### Phase C: Essential UI Components
1. Charts/visualization library integration (for BI and Dashboard)
2. ~~Master-detail view component (for orders + lines pattern)~~ — **DONE**: Implemented as `f.inlineTable()` during child entity consolidation
3. Data export (CSV at minimum)
4. File upload component (for DOC module)
5. Tree/hierarchy view (for FIN chart of accounts, HCM org chart)

### Phase D: Authorization & Security
1. Permission definitions and role-permission mapping
2. API endpoint authorization middleware
3. Row-level and field-level security
4. Audit logging of user actions

### Phase E: Integration
1. Email/notification system
2. Import from CSV/Excel
3. Webhook/event system for cross-module triggers

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
