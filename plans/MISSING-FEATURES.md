# L8ERP Missing Features - Comprehensive Gap Analysis

## Current System Summary

| Metric | Count |
|--------|-------|
| Modules | 12 (HCM, FIN, SCM, Sales, MFG, CRM, PRJ, BI, DOC, ECOM, COMP, SYS) |
| Services | 376 |
| Protobuf Types | 788 messages, 289 enums |
| Mock Data Generators | All modules covered (service-level completeness verified) |
| Desktop UI | All modules with config, columns, forms, enums, init |
| Mobile UI | All modules with columns, forms, enums, nav config |

---

## 1. Business Logic (Go Backend)

### 1.1 Service Callbacks Are Validation-Only

**319 of 376 services** (85%) use the simple `ValidationBuilder` pattern which only validates required fields and enum ranges. They have **no real business logic**.

Only HCM's 57 services have custom `NewServiceCallback` implementations with actual validation logic (ValidateEnum, ValidateReference, etc.).

**Missing per module:**

| Module | Services | Business Logic Status |
|--------|----------|----------------------|
| FIN (49) | All ValidationBuilder | No GL posting, no journal balancing, no period close, no intercompany |
| SCM (44) | All ValidationBuilder | No inventory tracking, no reorder points, no lot/serial logic |
| Sales (33) | All ValidationBuilder | No pricing engine, no order-to-delivery flow, no credit check |
| MFG (36) | All ValidationBuilder | No BOM explosion, no MRP, no shop floor scheduling |
| CRM (36) | All ValidationBuilder | No lead scoring, no pipeline stages, no SLA enforcement |
| PRJ (36) | All ValidationBuilder | No project scheduling, no earned value, no resource leveling |
| BI (24) | All ValidationBuilder | No data aggregation, no report execution, no scheduling |
| DOC (20) | All ValidationBuilder | No version control, no check-in/check-out, no workflow |
| ECOM (20) | All ValidationBuilder | No cart logic, no checkout, no payment processing |
| COMP (20) | All ValidationBuilder | No compliance checks, no risk scoring, no audit trails |

### 1.2 Missing Cross-Service Business Logic

These are operations that span multiple services and don't exist anywhere:

- **Order-to-Cash**: Sales Order -> Delivery -> Invoice -> Payment
- **Procure-to-Pay**: Purchase Req -> PO -> Receiving -> AP Invoice -> Payment
- **Record-to-Report**: Journal Entry -> Trial Balance -> Financial Statements
- **Plan-to-Produce**: Production Order -> Material Issue -> Shop Floor -> Receipt
- **Hire-to-Retire**: Recruitment -> Onboarding -> Employment -> Termination
- **Issue-to-Resolution**: Support Case -> Assignment -> Resolution -> Feedback

### 1.3 Missing Calculated Fields

No services compute derived values:

- **Financial**: Running balances, period totals, aging buckets, depreciation schedules
- **SCM**: Available-to-promise, safety stock, reorder quantities
- **Sales**: Line totals, order totals, tax calculations, discount applications
- **MFG**: BOM cost rollup, production cost variance, yield calculations
- **PRJ**: Percent complete, earned value metrics, budget burn rate
- **HCM**: Leave balances, payroll calculations, benefit costs

### 1.4 Missing Status Transition Enforcement

No service enforces valid state transitions. For example:

- Sales Order: `Draft -> Confirmed -> In Progress -> Shipped -> Completed -> Closed`
- Purchase Order: `Draft -> Submitted -> Approved -> Ordered -> Received -> Closed`
- Work Order: `Planned -> Released -> In Progress -> Completed -> Closed`

Currently any status value can be set at any time.

### 1.5 Missing Cascading Operations

- Deleting a parent doesn't affect children (e.g., deleting a Sales Order leaves orphan lines)
- Closing a parent doesn't close/cancel children
- Status changes don't propagate (approving a PO doesn't update PO lines)

### 1.6 ServiceCallback Auto-Generate ID — AUDITED (PASS)

All 376 services include auto-generate ID on POST. The 319 ValidationBuilder callbacks pass `GenerateID` via the `setID` parameter, and all 57 custom `NewServiceCallback` callbacks also include it. The framework auto-calls `setID` on POST in `Before()`.

### 1.7 Prime Object Reference Violations — AUDITED (PASS)

All 379 Prime Objects reference each other via string ID fields only. No direct `*PrimeType` or `[]*PrimeType` embeddings found across 788 protobuf messages. Allowed shared types (`*erp.Money`, `*erp.AuditInfo`, `*erp.Address`, etc.) are used correctly.

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
| Master-Detail Split | Missing | Sales (order + lines), SCM (PO + lines), MFG (BOM + components) |
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

### 8.1 HCM (57 services - most mature)

- Payroll calculation engine (only stores payslips, doesn't compute them)
- Benefits enrollment workflow (open enrollment periods, eligibility rules)
- Time-off accrual engine (balance calculations)
- Performance review workflow (review cycles, 360 feedback routing)
- Onboarding/offboarding checklists with task tracking
- Org chart visualization
- Employee self-service portal

### 8.2 FIN (49 services)

- Double-entry journal enforcement (debit = credit)
- Period open/close management
- Bank reconciliation
- Multi-currency conversion with exchange rates
- Intercompany transactions
- Fixed asset depreciation calculations
- Tax calculation engine
- Financial statement generation

### 8.3 SCM (44 services)

- Inventory quantity tracking (on-hand, committed, available)
- Lot/serial number tracking
- Warehouse location management (bin/zone/aisle)
- Reorder point calculations
- Purchase requisition approval workflow
- Goods receipt/issue processing
- Quality inspection workflow

### 8.4 Sales (33 services)

- Pricing engine (price lists, quantity breaks, discounts, promotions)
- Available-to-promise (ATP) checking
- Order allocation logic
- Credit limit checking
- Commission calculations
- Sales tax calculation
- Revenue recognition

### 8.5 MFG (36 services)

- BOM explosion (multi-level)
- MRP (Material Requirements Planning) engine
- Production scheduling
- Shop floor data collection
- Work order routing/operation tracking
- Cost rollup
- Quality control integration

### 8.6 CRM (36 services)

- Lead scoring engine
- Lead-to-opportunity conversion
- Pipeline stage automation
- SLA timer enforcement
- Email integration for cases
- Customer 360 view
- Campaign ROI tracking

### 8.7 PRJ (36 services)

- Critical path calculation
- Resource leveling
- Earned value management (EVM)
- Time & expense approval workflow
- Budget tracking with forecasting
- Milestone billing triggers
- Project template cloning

### 8.8 BI (24 services)

- Data aggregation/ETL engine
- Dashboard builder (drag-and-drop)
- Chart/visualization rendering
- Report scheduling
- Data drill-down
- KPI alerting
- Ad-hoc query builder

### 8.9 DOC (20 services)

- File storage backend
- Version history
- Check-in/check-out locking
- Full-text search
- Document preview (PDF, images)
- Retention policies
- Digital signatures

### 8.10 ECOM (20 services)

- Shopping cart logic
- Checkout flow
- Payment gateway integration
- Inventory reservation
- Shipping rate calculation
- Order tracking
- Product catalog (images, variants, categories)

### 8.11 COMP (20 services)

- Risk scoring engine
- Compliance check automation
- Audit scheduling and tracking
- Regulatory mapping
- Policy version management
- Incident escalation workflow
- Compliance reporting/dashboards

---

## 9. Data Integrity & Structural Gaps

### 9.1 Reference Registry Completeness — AUDITED (PASS)

All `lookupModel` values in `*-forms.js` files have matching entries in `reference-registry-*.js`. Department registered in HCM registry, all PRJ models registered in PRJ registry. No missing registrations found.

### 9.2 JS Field Name Accuracy — AUDITED (PASS)

Spot-checked 41 fields across 6 modules (Sales, SCM, CRM, MFG, DOC, FIN). Zero mismatches found. The prior ~450 mismatch fix was thorough.

### 9.3 UI Type Registration — AUDITED (PASS)

All 376 service types registered via `common.RegisterType` in `go/erp/ui/main.go` with primary key decorators. No missing registrations.

### 9.4 Mock Data Service-Level Completeness — AUDITED (PASS)

Generator counts match service counts for all 11 modules: HCM 57/57, FIN 49/49, SCM 44/44, Sales 33/33, MFG 36/36, CRM 36/36, PRJ 36/36, BI 24/24, DOC 20/20, ECOM 20/20, COMP 20/20. Note: HCM files use sub-module names (`gen_employees.go`, `gen_payroll.go`, etc.) rather than the `gen_hcm_` prefix.

---

## 10. Prioritized Roadmap Suggestion

### Phase A: Structural Integrity Audit — COMPLETE ✓
All 6 audit items passed with no issues found:
1. ~~Audit all 376 services for auto-generate ID in ServiceCallback `Before()` methods~~ — **PASS (376/376)**
2. ~~Audit all 788 protobuf messages for Prime Object reference violations~~ — **PASS (0 violations)**
3. ~~Verify all `lookupModel` references have matching reference registry entries~~ — **PASS (all registered)**
4. ~~Re-audit JS column/form field names against protobuf JSON names~~ — **PASS (41/41 spot-checked)**
5. ~~Verify all service types are registered in `go/erp/ui/main.go`~~ — **PASS (376/376)**
6. ~~Verify mock data generator coverage at the service level (not just module level)~~ — **PASS (all 11 modules)**

### Phase B: Core Business Logic Foundation
1. Status transition enforcement framework (reusable across all modules)
2. Cross-service operations framework (parent-child cascading)
3. Calculated fields framework (server-side computed values)
4. FIN double-entry enforcement and period management
5. SCM inventory quantity tracking

### Phase C: Essential UI Components
1. Charts/visualization library integration (for BI and Dashboard)
2. Master-detail view component (for orders + lines pattern)
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
