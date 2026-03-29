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
| File/Attachment Upload | **Done** | DOC, HCM (employee docs), COMP (evidence) — `Layer8FileUpload` shared component + `FileStore` backend service + `f.file()` form factory method |
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
| Export (CSV/Excel/PDF) | CSV done (backend + UI); Excel/PDF missing |

---

## 3. Data Export & Reporting

### 3.1 Export Capabilities

| Capability | Status |
|------------|--------|
| CSV Export | **Done** — Backend `CsvExport` service + `Layer8CsvExport` UI component |
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
- Security proto (`proto-sec/secure.proto`): L8User, L8Role, L8Rule, L8Token, L8SecureConfig
- `go/sec/` package: SecurityProvider with AAA (pre-computed permission index), CanDoAction, ScopeView, AllowedTypes, AllowedActions
- SYS Security tab UI: full admin pages for Users (role assignment), Roles (nested rule editing with elem type, allow/deny, actions, attributes), Credentials

### 4.2 SecurityProvider Implementation (`go/sec/`)

**AAA** (`aaa.go`): Pre-computed permission index with O(1) lookup per role. Thread-safe (RWMutex). Structures:
- `RolePermissions.allow/deny`: `elem_type → action → bool` for action-level authorization
- `RolePermissions.denyAttrs`: `elem_type → attribute key → value` for field/row-level security
- Deny-before-allow evaluation: if any role denies, access is denied regardless of other roles

**CanDoAction** (`CanDoAction.go`): Extracts type name from IElements (filter mode via reflection, query mode via parsed query). Checks all user roles with deny-before-allow logic. Internal/system calls (short AAA ID) bypass authorization.

**ScopeView** (`ScopeView.go`): Dual-pass post-response filtering:
- **Row-level**: Attribute keys without `.` = model names, values = L8Query strings. Parsed via `interpreter.NewQuery()`, filtered via `IQuery.Match()` — elements matching a deny query are removed.
- **Field-level**: Attribute keys with `.` = introspector node keys (e.g., `salesorder.customerid`). Matched against struct fields via reflection, denied fields zeroed out.
- Wildcard `"*"` blanks all exported fields on all elements.

**AllowedTypes** (`AllowedTypes.go`): Returns list of type names the user has GET access to. Enumerates all registered root types from the introspector, checks each against the user's roles. Used by UI for role-based menu filtering.

**AllowedActions** (`AllowedActions.go`): Returns `map[string][]int32` — for each registered type, the list of action codes (1=POST, 2=PUT, 3=PATCH, 4=DELETE, 5=GET) the user is allowed to perform. Uses `Introspector().Nodes(false, true)` to enumerate all root types, then evaluates each type × action against the user's roles with deny-before-allow logic. Exposed via `/permissions` HTTP endpoint (l8web). UI fetches on login and stores as `window.Layer8DPermissions`; `Layer8DServiceRegistry.initializeServiceTable()` uses it to show/hide Add/Edit/Delete buttons per type.

### 4.3 L8Rule Attributes Map Convention

The `L8Rule.Attributes` (`map<string, string>`) serves dual purpose based on key format:

| Key Format | Meaning | Value |
|---|---|---|
| `*` | Wildcard — all attributes | `*` (deny entire type from view) |
| Key without `.` (e.g., `SalesOrder`) | Row-level filter | L8Query string (e.g., `select * from SalesOrder where salesRepId='{userId}'`) |
| Key with `.` (e.g., `salesorder.customerid`) | Field-level deny | Unused (presence = denied) |

The allow/deny signal comes from `L8Rule.Allowed`, not from the attributes map values.

### 4.4 Status

| Feature | Status |
|---------|--------|
| Permission Definitions | **Done** — L8Role → L8Rule with elem_type, allowed, actions map, attributes map. Pre-computed in AAA for O(1) lookup |
| API Endpoint Authorization | **Done** — CanDoAction enforces deny-before-allow across user's roles per elem_type + action |
| Field-Level Security | **Done** — ScopeView blanks denied attributes via reflection using introspector node keys |
| Row-Level Security | **Done** — ScopeView filters rows using L8Query Match on deny rules where attribute key is a model name (no `.`) |
| Role-Based Menu Filtering | **Done** — AllowedTypes returns GET-permitted type names; UI wiring to hide nav entries remaining |
| Per-Type Action Permissions | **Done** — AllowedActions returns per-type allowed action codes; `/permissions` endpoint; UI `initializeServiceTable` hides Add/Edit/Delete buttons based on permissions |
| UI Admin Pages | **Done** — SYS Security tab: Users (role checkbox assignment), Roles (nested rule editor with stacked modals), Credentials |
| Audit Log of User Actions | **Done** — SecurityProvider emits EventRecords: LOGIN_FAILED, LOGIN_SUCCESS, ACCESS_DENIED, TFA_FAILED, USER_REGISTERED via l8events (PostSecurityEvent/PostAuditEvent). Events visible in SYS Security tab (EventRecord, read-only). Infrastructure: l8events AuditEventType/SecurityEventType enums, l8alarms event→alarm correlation, l8notify delivery channels (email/webhook/Slack) |
| Password Policy | Missing — No complexity, expiry, or history rules |
| Session Management | Missing — No timeout, concurrent session limits |
| SSO/SAML/OAuth Integration | Missing |
| API Key Management | Missing — Credentials service exists but no clear purpose |

---

## 5. Integration & External Communication

### 5.1 Integration Features

| Feature | Status |
|---------|--------|
| Email Sending (SMTP) | **Done** (infrastructure) — l8notify `email.go` channel with SmtpConfig. Remaining: ERP-specific wiring |
| Email Templates | **Done** (infrastructure) — l8notify `template.go` with `{{key}}` placeholder engine. Remaining: ERP-specific templates |
| Notification System (in-app) | Missing |
| Webhook Support | **Done** (infrastructure) — l8notify `webhook.go` channel with WebhookConfig. Remaining: ERP-specific wiring |
| Event/Alarm Pipeline | **Done** (infrastructure) — l8events EventRecord with categories (Audit, Security, + others), l8alarms event→alarm correlation engine (temporal, topological, pattern matching), alarm lifecycle (state, escalation, suppression, archiving, notification). Remaining: ERP-specific event wiring |
| REST API Documentation (OpenAPI) | Missing |
| Import from CSV/Excel | **Done** — Generic `L8ImportTemplate` system with AI-assisted column mapping (heuristic + pluggable LLM), multi-format parsing (CSV/JSON/XML), value transforms, template transfer between environments. Backend in l8services (`dataimport/` package), UI in l8ui (desktop + mobile), integrated into SYS Data Import tab. |
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

- ~~Double-entry journal enforcement (debit = credit)~~ — **DONE**: `validateLines` in JournalEntryServiceCallback enforces debit/credit exclusivity per line and total debit = total credit on POSTED entries
- ~~Period open/close management~~ — **DONE**: `validatePeriodOpen` blocks posting to closed fiscal periods; `GetEntities` enhanced to support "get all" via L8Query when filter is empty; `updateAccountBalances` After() hook updates Account balances on post
- Bank reconciliation
- Multi-currency conversion with exchange rates — **NOTE**: L8Query aggregate functions (sum, avg, etc.) on Money fields currently use `totalAmount.amount` which sums raw cent values without currency conversion. Records with different `currencyCode` values are summed as-is. A proper implementation must convert all amounts to a common currency using exchange rates before aggregation.
- Intercompany transactions
- Fixed asset depreciation calculations
- Tax calculation engine
- Financial statement generation

### 8.3 SCM (29 services, was 44 — 15 children consolidated)

- Inventory quantity tracking (on-hand, committed, available)
- Lot/serial number tracking
- Warehouse location management (bin/zone/aisle)
- ~~Reorder point calculations~~ — **DONE** (Phase F.2, auto-creates purchase requisition)
- Purchase requisition approval workflow
- Goods receipt/issue processing
- Quality inspection workflow

### 8.4 Sales (17 services, was 33 — 16 children consolidated)

- ~~Pricing engine (price lists, quantity breaks, discounts, promotions)~~ — **DONE** (Phase F.1)
- Available-to-promise (ATP) checking
- Order allocation logic
- ~~Credit limit checking~~ — **DONE** (Phase F.1)
- ~~Commission calculations~~ — **DONE** (Phase F.1)
- ~~Sales tax calculation~~ — **DONE** (Phase F.1)
- Revenue recognition

### 8.5 MFG (18 services, was 36 — 18 children consolidated)

- ~~BOM explosion (multi-level)~~ — **DONE** (Phase F.3, with phantom BOM support)
- MRP (Material Requirements Planning) engine
- Production scheduling
- Shop floor data collection
- Work order routing/operation tracking
- ~~Cost rollup~~ — **DONE** (Phase F.3, labor + material cost rollup)
- Quality control integration

### 8.6 CRM (22 services, was 36 — 14 children consolidated)

- ~~Lead scoring engine~~ — **DONE** (Phase F.4)
- ~~Lead-to-opportunity conversion~~ — **DONE** (Phase F.4)
- Pipeline stage automation
- ~~SLA timer enforcement~~ — **DONE** (Phase F.4, with auto-escalation)
- Email integration for cases
- Customer 360 view
- ~~Campaign ROI tracking~~ — **DONE** (Phase F.4)

### 8.7 PRJ (21 services, was 36 — 15 children consolidated)

- Critical path calculation
- Resource leveling
- ~~Earned value management (EVM)~~ — **DONE** (Phase F.5)
- ~~Time & expense approval workflow~~ — **DONE** (Phase F.5, with status transitions + project rollup)
- Budget tracking with forecasting
- Milestone billing triggers
- Project template cloning

### 8.8 BI (14 services, was 24 — 10 children consolidated)

- Data aggregation/ETL engine
- Dashboard builder (drag-and-drop)
- Chart/visualization rendering
- Report scheduling
- Data drill-down
- ~~KPI alerting~~ — **DONE** (Phase F.7, threshold-based status checking)
- Ad-hoc query builder

### 8.9 DOC (11 services, was 20 — 9 children consolidated)

- ~~File storage backend~~ — **DONE**: `FileStore` service with base64 upload/download, `Layer8FileUpload` shared JS component
- ~~Version history~~ — **DONE** (Phase F.7, auto-increment on checksum change)
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

- ~~Risk scoring engine~~ — **DONE** (Phase F.7, inherent/residual scoring)
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
3. ~~Calculated fields framework (server-side computed values)~~ — **DONE**: `Compute()` method on VB, generic helpers (`SumLineMoney`, `MoneyAdd/Subtract`, `SumLineFloat64/Int64`). 14 entities computed across Sales, FIN, SCM, HCM, PRJ. See §1.3.
4. ~~FIN double-entry enforcement and period management~~ — **DONE**: JournalEntry validates double-entry balance on POST, blocks posting to closed fiscal periods, updates Account balances via After() hook. `GetEntities` enhanced with L8Query fallback for empty filters.
5. ~~SCM inventory quantity tracking~~ — **DONE**: After() hooks on ReceivingOrder (receipt → bin quantity increase + RECEIPT movement) and WavePlan (pick → bin quantity decrease + ISSUE movement). Updates ScmItem.Movements and ScmWarehouse bin quantities.

### Phase C: Essential UI Components
1. ~~Charts/visualization library integration (for BI and Dashboard)~~ — **DONE**: Bar, Line, Pie charts implemented (desktop + mobile). Dashboard widgets with sparklines and trend arrows.
2. ~~Master-detail view component (for orders + lines pattern)~~ — **DONE**: Implemented as `f.inlineTable()` during child entity consolidation
3. ~~Data export (CSV at minimum)~~ — **DONE**: Backend `CsvExport` service (go/erp/common/csvexport/) with paginated server-side CSV generation via introspector. Shared `Layer8CsvExport` JS component auto-adds Export button to desktop (Layer8DTable) and mobile (Layer8MTable) pagination bars.
4. ~~File upload component (for DOC module)~~ — **DONE**: `FileStore` backend service (go/erp/common/filestore/) with base64 upload/download via protobuf. Shared `Layer8FileUpload` JS component (upload, download, formatSize). `f.file()` form factory method with drag-and-drop, upload status, and download button. Desktop + mobile rendering. Download column in DocDocument table.
5. ~~Tree/hierarchy view (for FIN chart of accounts, HCM org chart)~~ — **DONE**: Tree grid implemented (desktop + mobile) with expand/collapse, events, rendering.

### Phase D: Authorization & Security — IN PROGRESS
Security proto (`proto-sec/secure.proto`) and `go/sec/` package implemented. AAA with pre-computed permission index, deny-before-allow enforcement. SYS Security tab UI already existed. Audit event infrastructure exists in l8events/l8alarms/l8notify. ERP-specific security config implemented with 15 granular roles and example users.

1. ~~Permission definitions and role-permission mapping~~ — **DONE**: L8Role/L8Rule proto + AAA pre-computed index (RolePermissions with allow/deny/denyAttrs maps)
2. ~~API endpoint authorization middleware~~ — **DONE**: SecurityProvider.CanDoAction enforces per elem_type + action, called by ServiceManager before handler
3. ~~Field-level security~~ — **DONE**: SecurityProvider.ScopeView blanks denied attributes via reflection, called by ServiceManager after handler
4. ~~Row-level security~~ — **DONE**: ScopeView filters rows using L8Query Match on deny rules where attribute key is a model name (no `.`), value is L8Query string
5. ~~Role-based menu filtering (backend)~~ — **DONE**: SecurityProvider.AllowedTypes returns GET-permitted type names from introspector
6. ~~UI admin pages~~ — **DONE** (pre-existing): SYS Security tab with Users, Roles (nested rule editor), Credentials
7. ~~Audit logging (infrastructure)~~ — **DONE** (pre-existing in l8events/l8alarms/l8notify): AuditEventType + SecurityEventType enums, event→alarm correlation, email/webhook/Slack notification delivery
8. ~~ERP security configuration~~ — **DONE**: `ERPSecureConfig()` in `go/sec/erp_config.go`. 15 ERP roles (erp-admin, hr-manager, hr-clerk, accountant, fin-clerk, sales-manager, sales-rep, warehouse-mgr, warehouse-clerk, production-mgr, project-mgr, bi-analyst, compliance-officer, doc-admin, ecom-manager) with granular per-module permissions. Module type registry (`erp_types.go`) covers all 11 ERP modules. Rule helpers (`erp_rules.go`) for allowModule/readOnlyModule/denyTypes. 15 example users + 3 platform defaults. `Prepare()` integrates ERPSecureConfig for combined JSON generation.
9. ~~Per-type action permissions (AllowedActions + UI wiring)~~ — **DONE**: `AllowedActions` in SecurityProvider returns `map[string][]int32` per type. `/permissions` HTTP endpoint in l8web. UI fetches on login → `window.Layer8DPermissions`. `Layer8DServiceRegistry.initializeServiceTable()` checks permissions to show/hide Add/Edit/Delete buttons. Bug fix: `Introspector().Nodes(true, true)` returned empty (impossible filter — no node is both leaf and root); fixed to `Nodes(false, true)`. Panic guard added to l8reflect.
10. ~~Role-based menu filtering (UI wiring)~~ — **DONE**: Generic `Layer8DPermissionFilter` component in l8ui/shared/ with resolver pattern. Desktop: hides sidebar modules (applyToSidebar), section tabs, and sub-nav service items (applyToSection) when user lacks GET access. Mobile: filters module cards, sub-module cards, and service cards at all 3 nav levels. Cascading hide: empty sub-modules hide their tab, empty modules hide their sidebar entry. First-visible-tab activation when active tab is hidden. ERP wiring in app.js (resolver + sidebar models) and sections.js (applyToSection).
11. ~~Audit logging (wiring)~~ — **DONE**: SecurityProvider emits EventRecords via l8events: LOGIN_FAILED (security/warning), LOGIN_SUCCESS (audit/info), ACCESS_DENIED (security/warning), TFA_FAILED (security/warning), USER_REGISTERED (audit/info). Events visible in SYS Security tab (EventRecord service, read-only, sorted by occurredAt desc)
12. Password policy — remaining: complexity rules, expiry, history enforcement
13. Session management — remaining: timeout, concurrent session limits

### Phase E: Integration
1. ~~Email/notification system (infrastructure)~~ — **DONE** (pre-existing in l8notify): Email (SMTP), webhook, Slack channels. Template engine with `{{key}}` placeholders. Throttling, escalation scheduler with steps. Remaining: ERP-specific integration (connecting l8notify to ERP events)
2. ~~Import from CSV/Excel~~ — **DONE**: Generic data import system with AI-assisted mapping, multi-format parsing (CSV/JSON/XML), value transforms, template transfer. Backend: `l8services/dataimport/` (9 files). UI: l8ui desktop (4 JS + CSS) + mobile (1 JS). Integrated into SYS Data Import tab. See `plans/data-import-system.md`.
3. ~~Webhook/event system (infrastructure)~~ — **DONE** (pre-existing in l8events/l8alarms): EventRecord with categories, severity, attributes. Event→alarm correlation engine (temporal, topological, pattern). Alarm lifecycle (state, escalation, suppression, archiving). Remaining: ERP-specific event wiring

### Phase F: Module-Specific Business Logic — DONE
Implemented across all 12 modules (~30 new files, ~2,000 lines). See `plans/PLAN-PHASE-F-MODULE-BUSINESS-LOGIC.md`.
1. ~~Sales pricing engine and order-to-cash flow~~ — **DONE**: Price list lookup, credit limit validation, tax rule application, commission calculation, quotation-to-order conversion
2. ~~SCM procurement-to-pay and inventory management~~ — **DONE**: Reorder point checking with auto-purchase-req, lot/serial validation on receiving, inventory stock movements on receipt
3. ~~MFG BOM explosion and production scheduling~~ — **DONE**: Multi-level BOM explosion with phantom support, cost rollup from labor+materials, work order progress tracking
4. ~~CRM lead management and SLA enforcement~~ — **DONE**: Lead scoring from rules, lead-to-opportunity conversion, SLA deadline enforcement with auto-escalation, campaign ROI metrics
5. ~~PRJ scheduling and earned value~~ — **DONE**: Task dependency scheduling (forward pass), EVM calculations (PV/EV/AC/SPI/CPI/EAC), timesheet/expense approval flows with project rollup
6. ~~Remaining modules (BI, DOC, ECOM, COMP, FIN)~~ — **DONE**: Fixed asset depreciation schedule generation, multi-currency conversion, ECOM order totals, COMP risk scoring + finding escalation, BI KPI threshold checking, DOC version tracking

### Phase G: Polish & Production Readiness
1. Mobile CSS and behavioral parity
2. Comprehensive test coverage
3. Performance optimization
4. Accessibility compliance
5. Internationalization (i18n)
