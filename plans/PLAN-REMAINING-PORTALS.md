# Plan: Remaining Portals (Manager, Customer, Vendor, Partner, Project Client)

## Overview

Add 5 remaining portals to the ERP system. Before building any new portal, extract a **shared portal framework** from the existing ESS portal to avoid duplicating ~600 lines of behavioral code per portal.

### The Duplication Problem

ESS has 3 files with behavioral logic that would be copy-pasted identically into every new portal:

| File | Lines | Behavioral (identical) | Config (unique) |
|------|-------|----------------------|-----------------|
| `ess-app.js` | 278 | ~230 (auth, nav, section loading, table rendering, detail popup, single record) | ~48 (namespace, scope field, module name) |
| `m/js/ess/ess-app.js` | 310 | ~260 (same as above, mobile versions) | ~50 (namespace, scope field, module name) |
| `ess-dashboard.js` | 125 | ~30 (`_fetchCount` helper) | ~95 (HTML template, specific queries) |
| `ess.html` CSS | 135 | ~130 (sidebar, tabs, cards, layout) | ~5 (CSS variable names) |
| `m/ess.html` CSS | 155 | ~145 (mobile nav, tabs, cards) | ~10 (CSS variable names) |

**Without extraction**: 5 new portals x ~600 duplicated lines = **~3,000 lines of duplicate behavioral code**.

**With extraction**: 2 shared framework files (~400 lines total) + 5 portals x ~50 lines config = **~650 lines total**.

---

## Phase 0: Extract Shared Portal Framework

Extract all behavioral code from ESS into reusable l8ui components. After this phase, ESS itself is refactored to use the shared framework.

### 0A: Shared Portal CSS (`l8ui/portal/layer8d-portal.css`)

Extract the CSS from `ess.html` `<style>` block into a shared file with generic class names:

| ESS Class | Shared Class |
|-----------|-------------|
| `.ess-container` | `.l8-portal-container` |
| `.ess-header` | `.l8-portal-header` |
| `.ess-sidebar` | `.l8-portal-sidebar` |
| `.ess-nav-link` | `.l8-portal-nav-link` |
| `.ess-content` | `.l8-portal-content` |
| `.ess-service-tabs` | `.l8-portal-service-tabs` |
| `.ess-service-tab` | `.l8-portal-service-tab` |
| `.ess-card` | `.l8-portal-card` |
| `.ess-dashboard-cards` | `.l8-portal-dashboard-cards` |
| `.ess-quick-actions` | `.l8-portal-quick-actions` |

~130 lines. Uses `--layer8d-*` theme variables.

### 0B: Shared Mobile Portal CSS (`l8ui/m/css/layer8m-portal.css`)

Extract mobile-specific CSS from `m/ess.html` into shared file with same naming convention.
~145 lines.

### 0C: Desktop Portal Framework (`l8ui/portal/layer8d-portal.js`)

Extract all behavioral code from `ess-app.js` into a factory:

```javascript
// Usage: each portal's app.js becomes ~30 lines
Layer8DPortal.init({
    namespace: 'ESS',                    // window.ESS
    title: 'Employee Self-Service',
    scopeField: 'employeeId',            // base where clause field
    scopeResolver: function(username) {   // how to resolve scope value
        return username;                  // ESS: employeeId = username
    },
    sharedModels: ['Holiday', 'BenefitPlan'],  // models NOT scoped
    modules: ['HCM'],                    // for getFormDef lookups
    headerRightSelector: '.l8-portal-header-right',
    logoutBtnSelector: '.l8-portal-logout-btn',
    navMenuSelector: '.l8-portal-nav-menu',
    contentAreaId: 'portal-content-area',
    tableContainerId: 'portal-table-container'
});
```

**Functions extracted from ess-app.js** (all become generic):
- `logout()` -- identical across all portals
- `getAuthHeaders()` -- identical
- `loadSection(sectionKey)` -- identical (reads from `NS.sections`, `NS.dashboard`)
- `_getFormDef(model)` -- parameterized by `config.modules`
- `_getServiceConfig(svc)` -- identical (reads from `NS.primaryKeys`)
- `_renderTable(svc)` -- identical (uses `NS.columns`, `NS.primaryKeys`, scope filtering)
- `_renderSingleRecord(svc, container)` -- identical
- `_showDetail(svc, item)` -- identical (checks `NS.forms` for editability)
- DOMContentLoaded init -- identical structure (auth, config, permissions, portal switcher, nav, dashboard)

~200 lines.

### 0D: Mobile Portal Framework (`l8ui/m/js/layer8m-portal.js`)

Same extraction for mobile `ess-app.js`:

```javascript
Layer8MPortal.init({
    namespace: 'ESS',
    title: 'Employee Self-Service',
    scopeField: 'employeeId',
    scopeResolver: function(username) { return username; },
    sharedModels: ['Holiday', 'BenefitPlan'],
    modules: ['HCM'],
    sidebarNavId: 'portal-sidebar-nav',
    contentAreaId: 'content-area'
});
```

**Functions extracted from m/js/ess/ess-app.js** (all become generic):
- `init()` -- identical structure
- `_buildNav()` -- reads from `NS.nav`
- `_initSidebar()`, `openSidebar()`, `closeSidebar()` -- identical
- `loadSection(sectionKey)` -- identical
- `_renderTable(svc)` -- identical
- `_renderSingleRecord(svc, container)` -- identical
- `_showDetail(svc, item)` -- identical
- `_getFormDef(model)` -- parameterized
- `_getServiceConfig(svc)` -- identical
- `_getHeaders()` -- identical
- `logout()` -- identical

~250 lines.

### 0E: Dashboard Helper (`l8ui/portal/layer8d-portal-dashboard.js`)

Extract reusable dashboard rendering helpers:

```javascript
Layer8DPortalDashboard = {
    // Shared fetch helper (from ess-dashboard._fetchCount)
    fetchCount: function(endpoint, query, callback) { ... },

    // Render a grid of summary cards from config
    renderCards: function(container, cards) { ... },

    // Render quick action buttons from config
    renderQuickActions: function(container, actions) { ... }
};
```

Each portal's dashboard.js then becomes config-only:
```javascript
ESS.dashboard = {
    render: function(container) {
        Layer8DPortalDashboard.renderCards(container, [
            { icon: '🏖️', title: 'Leave Balances', id: 'leave', loader: ... },
            { icon: '💰', title: 'Latest Pay Stub', id: 'pay', loader: ... },
        ]);
        Layer8DPortalDashboard.renderQuickActions(container, [
            { label: 'Request Time Off', primary: true, onClick: ... },
        ]);
    }
};
```

~80 lines shared.

### 0F: Refactor ESS to Use Shared Framework

After creating the shared files, refactor ESS itself:
- `ess-app.js`: Replace ~230 lines of behavioral code with `Layer8DPortal.init({...})` (~30 lines)
- `m/js/ess/ess-app.js`: Replace ~260 lines with `Layer8MPortal.init({...})` (~30 lines)
- `ess-dashboard.js`: Use `Layer8DPortalDashboard` helpers (stays ~95 lines, removes `_fetchCount`)
- `ess.html`: Replace inline `<style>` with `<link>` to `layer8d-portal.css`, update class names
- `m/ess.html`: Replace inline `<style>` with `<link>` to `layer8m-portal.css`, update class names

**Verify ESS still works after refactoring** before proceeding to new portals.

### Phase 0 File Summary

| File | Location | Lines | Type |
|------|----------|-------|------|
| `layer8d-portal.css` | `l8ui/portal/` | ~130 | Shared CSS |
| `layer8m-portal.css` | `l8ui/m/css/` | ~145 | Shared mobile CSS |
| `layer8d-portal.js` | `l8ui/portal/` | ~200 | Desktop framework |
| `layer8m-portal.js` | `l8ui/m/js/` | ~250 | Mobile framework |
| `layer8d-portal-dashboard.js` | `l8ui/portal/` | ~80 | Dashboard helpers |
| `ess-app.js` (refactored) | `ess/` | ~30 | Config only |
| `m/js/ess/ess-app.js` (refactored) | `m/js/ess/` | ~30 | Config only |
| `ess.html` (refactored) | web root | ~200 | Slimmer, shared CSS |
| `m/ess.html` (refactored) | `m/` | ~220 | Slimmer, shared CSS |

---

## Portal Definitions (Phases 1-5)

After Phase 0, each portal needs only **config files** (no behavioral code):

### Per-Portal File Template

Each portal creates these files (all config/data, no behavioral logic):

| File | Content | Est. Lines |
|------|---------|-----------|
| `<dir>/<portal>-config.js` | Section/service mappings | 40-70 |
| `<dir>/<portal>-enums.js` | Subset of module enums | 50-100 |
| `<dir>/<portal>-columns.js` | Table column definitions | 80-150 |
| `<dir>/<portal>-forms.js` | Editable forms + primary keys | 30-80 |
| `<dir>/<portal>-nav-config.js` | Sidebar nav items | 15-25 |
| `<dir>/<portal>-dashboard.js` | Dashboard card config + loaders | 60-100 |
| `<dir>/<portal>-actions.js` | Portal-specific actions | 20-50 |
| `<dir>/<portal>-app.js` | `Layer8DPortal.init({...})` | ~30 |
| `<portal>.html` | Shell + module script includes | ~200 |
| `m/<portal>.html` | Mobile shell + module includes | ~220 |
| `m/js/<portal>/<portal>-app.js` | `Layer8MPortal.init({...})` | ~30 |
| `m/js/<portal>/<portal>-dashboard.js` | Mobile dashboard config | 50-80 |
| `m/js/<portal>/<portal>-actions.js` | Mobile actions | 20-40 |

---

## Phase 1: Manager Portal (mgr.html)

### Purpose
Team leads and department managers view and approve team data: leave requests, timesheets, performance reviews, goals, team roster.

### Directory
- Desktop: `go/erp/ui/web/mgr/`
- Mobile: `go/erp/ui/web/m/js/mgr/`

### Backend Services Used

| Section | Service | Area | ServiceName | Model (Protobuf) | Access |
|---------|---------|------|-------------|-------------------|--------|
| Team | Employee | 30 | Employee | Employee | read-only |
| Team | Department | 30 | Dept | Department | read-only |
| Approvals | Leave Requests | 30 | LeaveReq | LeaveRequest | read/approve |
| Approvals | Timesheets | 30 | Timesheet | Timesheet | read/approve |
| Performance | Reviews | 30 | PerfRevw | PerformanceReview | read/write |
| Performance | Goals | 30 | Goal | Goal | read/write |
| Performance | Skills | 30 | EmpSkill | EmployeeSkill | read-only |
| Compensation | Comp Statements | 30 | CompStmt | CompensationStatement | read-only |

### Scoping
Filter by `managerId` or `departmentId` (manager sees only their direct reports' data).

### Module Includes
Reuse from HCM: `core-hr-enums.js`, `core-hr-forms.js`, `time-enums.js`, `time-forms.js`, `talent-enums*.js`, `talent-forms.js`, `compensation-enums.js`, `compensation-forms.js`.

### Nav Sections
Dashboard, My Team, Approvals, Performance, Compensation

### Security Role
Reuse existing `hr-manager` role. No new role needed.

### Portal-Specific Actions
- `approveLeaveRequest(request)` -- PATCH leave request status to Approved
- `rejectLeaveRequest(request)` -- PATCH leave request status to Rejected
- `approveTimesheet(timesheet)` -- PATCH timesheet status to Approved

### App Init (entire file after Phase 0)
```javascript
(function() {
    'use strict';
    Layer8DPortal.init({
        namespace: 'MGR',
        title: 'Manager Portal',
        scopeField: 'managerId',
        scopeResolver: function(username) { return username; },
        sharedModels: ['Department'],
        modules: ['HCM']
    });
})();
```

---

## Phase 2: Customer Portal (customer.html)

### Purpose
External customers view their orders, invoices, deliveries, returns, support cases, and account information.

### Directory
- Desktop: `go/erp/ui/web/customer/`
- Mobile: `go/erp/ui/web/m/js/customer/`

### Backend Services Used

| Section | Service | Area | ServiceName | Model (Protobuf) | Access |
|---------|---------|------|-------------|-------------------|--------|
| Orders | Sales Orders | 60 | SalesOrder | SalesOrder | read-only |
| Orders | Quotations | 60 | SalesQuote | SalesQuotation | read-only |
| Orders | Delivery Orders | 60 | DlvryOrder | SalesDeliveryOrder | read-only |
| Orders | Return Orders | 60 | ReturnOrd | SalesReturnOrder | read/create |
| Billing | Sales Invoices | 40 | SalesInv | SalesInvoice | read-only |
| Billing | Payments | 40 | CustPmt | CustomerPayment | read-only |
| Support | Cases | 80 | CrmCase | CrmCase | read/create |
| Support | KB Articles | 80 | CrmKBart | CrmKBArticle | read-only |
| Account | Contracts | 60 | CustContr | SalesCustomerContract | read-only |

### Scoping
Filter by `customerId` (customer sees only their own data).

### Module Includes
Reuse from Sales: `orders-enums.js`, `orders-forms.js`, `shipping-enums.js`, `billing-enums.js`.
Reuse from FIN: `accounts-receivable-enums.js`, `accounts-receivable-forms.js`.
Reuse from CRM: `service-enums.js`, `service-forms.js`.

### Nav Sections
Dashboard, Orders, Billing, Support, Account

### Security Role
New role: `customer-portal`

### Portal-Specific Actions
- `createReturnRequest(order)` -- Open return order form pre-filled with order details
- `createSupportCase()` -- Open new CRM case form
- `viewInvoicePDF(invoice)` -- Download/view invoice document

---

## Phase 3: Vendor/Supplier Portal (vendor.html)

### Purpose
External vendors/suppliers view their purchase orders, receiving orders, invoices, payments, RFQs, and collaboration data.

### Directory
- Desktop: `go/erp/ui/web/vendor/`
- Mobile: `go/erp/ui/web/m/js/vendor/`

### Backend Services Used

| Section | Service | Area | ServiceName | Model (Protobuf) | Access |
|---------|---------|------|-------------|-------------------|--------|
| Orders | Purchase Orders | 50 | PurchOrder | ScmPurchaseOrder | read-only |
| Orders | Receiving Orders | 50 | RecvOrder | ScmReceivingOrder | read-only |
| Orders | RFQs | 50 | RFQ | ScmRequestForQuotation | read/respond |
| Orders | Blanket Orders | 50 | BlnktOrder | ScmBlanketOrder | read-only |
| Invoices | Purchase Invoices | 40 | PurchInv | PurchaseInvoice | read-only |
| Invoices | Vendor Payments | 40 | VndrPmt | VendorPayment | read-only |
| Invoices | Vendor Statements | 40 | VndrStmt | VendorStatement | read-only |
| Collaboration | Supplier Collab | 50 | SupCollab | ScmSupplierCollaboration | read/write |
| Collaboration | Supplier Scorecard | 50 | SupplrCard | ScmSupplierScorecard | read-only |
| Returns | Return Auth | 50 | ReturnAuth | ScmReturnAuthorization | read-only |

### Scoping
Filter by `vendorId` or `supplierId` (vendor sees only their own POs, invoices, etc.).

### Module Includes
Reuse from SCM: `procurement-enums.js`, `procurement-forms.js`, `warehouse-enums.js`.
Reuse from FIN: `accounts-payable-enums.js`, `accounts-payable-forms.js`.

### Nav Sections
Dashboard, Orders, Invoices, Collaboration, Returns

### Security Role
New role: `vendor-portal`

### Portal-Specific Actions
- `respondToRFQ(rfq)` -- Open RFQ response form
- `viewPaymentDetails(payment)` -- Show payment breakdown
- `updateCollaboration(collab)` -- Update supplier collaboration record

---

## Phase 4: Partner/Channel Portal (partner.html)

### Purpose
Channel partners view shared opportunities, leads, campaigns, quotations, commissions, and partner profile.

### Directory
- Desktop: `go/erp/ui/web/partner/`
- Mobile: `go/erp/ui/web/m/js/partner/`

### Backend Services Used

| Section | Service | Area | ServiceName | Model (Protobuf) | Access |
|---------|---------|------|-------------|-------------------|--------|
| Pipeline | Leads | 80 | CrmLead | CrmLead | read/create |
| Pipeline | Opportunities | 80 | CrmOpp | CrmOpportunity | read/write |
| Pipeline | Lead Sources | 80 | CrmLeadSrc | CrmLeadSource | read-only |
| Sales | Quotations | 60 | SalesQuote | SalesQuotation | read/create |
| Sales | Orders | 60 | SalesOrder | SalesOrder | read-only |
| Marketing | Campaigns | 80 | CrmCmpgn | CrmCampaign | read-only |
| Marketing | Marketing Lists | 80 | CrmMktList | CrmMarketingList | read-only |
| Commissions | Commission Plans | 60 | CommPlan | SalesCommissionPlan | read-only |
| Profile | Partner Channel | 60 | Partner | SalesPartnerChannel | read-only |

### Scoping
Filter by `partnerId` or `partnerChannelId`.

### Module Includes
Reuse from CRM: `leads-enums.js`, `leads-forms.js`, `opportunities-enums.js`, `opportunities-forms.js`, `marketing-enums.js`.
Reuse from Sales: `orders-enums.js`, `orders-forms.js`, `customers-enums.js`, `analytics-enums.js`.

### Nav Sections
Dashboard, Pipeline, Sales, Marketing, Commissions, Profile

### Security Role
New role: `partner-portal`

### Portal-Specific Actions
- `registerLead()` -- Create new lead for the partner's pipeline
- `createQuotation()` -- Create quotation linked to partner
- `viewCommissionStatement()` -- View commission earnings

---

## Phase 5: Project Client Portal (projclient.html)

### Purpose
External project clients view project status, budgets, timesheets, expenses, invoices, and deliverables.

### Directory
- Desktop: `go/erp/ui/web/projclient/`
- Mobile: `go/erp/ui/web/m/js/projclient/`

### Backend Services Used

| Section | Service | Area | ServiceName | Model (Protobuf) | Access |
|---------|---------|------|-------------|-------------------|--------|
| Projects | Projects | 90 | PrjProj | PrjProject | read-only |
| Projects | Status Reports | 90 | PrjStatus | PrjStatusReport | read-only |
| Projects | KPIs | 90 | PrjKPI | PrjProjectKPI | read-only |
| Budget | Budgets | 90 | PrjBudget | PrjProjectBudget | read-only |
| Budget | Invoices | 90 | PrjInvoice | PrjProjectInvoice | read-only |
| Budget | Billing Schedule | 90 | PrjBillSch | PrjBillingSchedule | read-only |
| Time | Timesheets | 90 | PrjTmSheet | PrjTimesheet | read-only |
| Time | Expense Reports | 90 | PrjExpRpt | PrjExpenseReport | read-only |
| Deliverables | Portfolio View | 90 | PrjPortflo | PrjPortfolioView | read-only |

### Scoping
Filter by `clientId` or project assignment (client sees only projects assigned to them).

### Module Includes
Reuse from PRJ: `planning-enums.js`, `planning-forms.js`, `billing-enums.js`, `billing-forms.js`, `timeexpense-enums.js`, `analytics-enums.js`.

### Nav Sections
Dashboard, Projects, Budget, Time & Expenses, Deliverables

### Security Role
New role: `project-client` (read-only project access).

---

## Phase 6: Security Roles, Demo Users & Mock Data (l8secure + l8erp)

The ESS portal pattern established the approach: user `hcm` has `ess-employee` role, portal `ess.html`, and `employeeId="hcm"` in the mock data generator (`gen_employees.go:64-66`). All HCM mock records reference this employeeId, so the ESS portal shows real data when `hcm` logs in.

Each new portal needs the same treatment:
1. A **security role** in l8secure with appropriate permissions
2. A **demo user** in l8secure with that role and portal assignment
3. A **mock data record** in l8erp mocks with an ID matching the demo user's login

### 6A: New Role Definitions in l8secure

**Location**: `../l8secure/go/secure/plugin/erp/`

#### File: `erp_roles_portals.go` (new file, ~120 lines)

Follow the existing pattern from `erp_roles_ess.go`:

```go
package erp

import "github.com/saichler/l8secure/go/types/secure"

// customerPortalRole: read-only access to own orders, invoices, cases
func customerPortalRole() *secure.L8Role {
    readOnlyTypes := []string{
        "SalesOrder", "SalesOrderLine", "SalesQuotation", "SalesQuotationLine",
        "SalesDeliveryOrder", "SalesDeliveryLine", "SalesDeliveryConfirm",
        "SalesInvoice", "SalesInvoiceLine", "CustomerPayment",
        "SalesCustomerContract", "CrmKBArticle",
    }
    writableTypes := []string{
        "SalesReturnOrder",  // Submit return requests
        "CrmCase",           // Submit support cases
    }
    return &secure.L8Role{
        RoleId:   "customer-portal",
        RoleName: "Customer Portal",
        Rules: mergeRules(
            readOnlyTypes("custport", readOnlyTypes),
            essWritableTypes("custport", writableTypes),
            denyTypes("custport", securityTypes),
        ),
    }
}

// vendorPortalRole: read-only access to own POs, invoices, payments
func vendorPortalRole() *secure.L8Role {
    readOnlyTypes := []string{
        "ScmPurchaseOrder", "ScmPurchaseOrderLine", "ScmReceivingOrder",
        "ScmBlanketOrder", "ScmReturnAuthorization", "ScmSupplierScorecard",
        "PurchaseInvoice", "PurchaseInvoiceLine", "VendorPayment", "VendorStatement",
    }
    writableTypes := []string{
        "ScmRequestForQuotation",    // Respond to RFQs
        "ScmSupplierCollaboration",  // Update collaboration
    }
    return &secure.L8Role{
        RoleId:   "vendor-portal",
        RoleName: "Vendor Portal",
        Rules: mergeRules(
            readOnlyTypes("vndport", readOnlyTypes),
            essWritableTypes("vndport", writableTypes),
            denyTypes("vndport", securityTypes),
        ),
    }
}

// partnerPortalRole: read/write leads+opps, read-only sales+campaigns
func partnerPortalRole() *secure.L8Role {
    readOnlyTypes := []string{
        "SalesOrder", "SalesOrderLine", "SalesQuotation", "SalesQuotationLine",
        "SalesCommissionPlan", "SalesPartnerChannel",
        "CrmCampaign", "CrmMarketingList", "CrmLeadSource",
    }
    writableTypes := []string{
        "CrmLead",        // Register leads
        "CrmOpportunity", // Manage opportunities
    }
    return &secure.L8Role{
        RoleId:   "partner-portal",
        RoleName: "Partner Portal",
        Rules: mergeRules(
            readOnlyTypes("ptnrport", readOnlyTypes),
            essWritableTypes("ptnrport", writableTypes),
            denyTypes("ptnrport", securityTypes),
        ),
    }
}

// projectClientRole: read-only access to project data
func projectClientRole() *secure.L8Role {
    readOnlyTypes := []string{
        "PrjProject", "PrjStatusReport", "PrjProjectKPI",
        "PrjProjectBudget", "PrjProjectInvoice", "PrjBillingSchedule",
        "PrjTimesheet", "PrjExpenseReport", "PrjPortfolioView",
        "PrjPhase", "PrjTask", "PrjMilestone", "PrjDeliverable",
    }
    return &secure.L8Role{
        RoleId:   "project-client",
        RoleName: "Project Client Portal",
        Rules: mergeRules(
            readOnlyTypes("prjcli", readOnlyTypes),
            denyTypes("prjcli", securityTypes),
        ),
    }
}
```

#### Update: `erp_config.go`

Add the 4 new roles to `erpRoles()`:
```go
erpRoleList := []*secure.L8Role{
    // ... existing roles ...
    customerPortalRole(),
    vendorPortalRole(),
    partnerPortalRole(),
    projectClientRole(),
}
```

### 6B: Update `hcm` User to Have All Portal Roles

Instead of creating separate demo users per portal, the existing `hcm` user gets **all 6 roles** so they can switch between portals and see meaningful data in each one.

**Update in `erp_config.go`** -- replace the current `hcm` user line:

```go
// BEFORE (single role):
erpUser("hcm", "HCM Employee", "ess-employee", "Hcm123!", "ess.html"),

// AFTER (all portal roles):
erpPortalUser("hcm", "HCM Employee", "Hcm123!", "ess.html"),
```

Add a new helper function in `erp_config.go`:

```go
// erpPortalUser creates the all-portals demo user with every portal role
func erpPortalUser(userId, fullName, password, portal string) *secure.L8User {
    return &secure.L8User{
        FullName: fullName,
        UserId:   userId,
        Password: &secure.L8Password{Hash: password},
        Roles: map[string]bool{
            "ess-employee":    true,
            "hr-manager":      true,
            "customer-portal": true,
            "vendor-portal":   true,
            "partner-portal":  true,
            "project-client":  true,
        },
        Portal: portal,
    }
}
```

The `hcm` user keeps `ess.html` as their default portal (first redirect after login), but can switch to any portal via the portal switcher and see data in all of them.

### 6C: Update Portal Registry in l8secure

Update `defaultPortals()` in `erp_config.go`:

```go
func defaultPortals() map[string]*secure.L8Portal {
    portals := make(map[string]*secure.L8Portal)
    portals["erp-portals"] = &secure.L8Portal{
        PortalId: "erp-portals",
        Portals: map[string]string{
            "app.html":        "Admin / Operator Portal",
            "ess.html":        "Employee Self-Service",
            "mgr.html":        "Manager Portal",
            "customer.html":   "Customer Portal",
            "vendor.html":     "Vendor Portal",
            "partner.html":    "Partner Portal",
            "projclient.html": "Project Client Portal",
        },
    }
    return portals
}
```

### 6D: Mock Data Linkage in l8erp

All portals use the same `hcm` user. Each portal scopes by a different field, so we need a mock record with ID `"hcm"` in each domain. The ESS pattern is already done (`employeeId="hcm"` in `gen_employees.go:64-66`).

| Portal | Scope Field | Mock Data Change | File |
|--------|-------------|------------------|------|
| ESS | `employeeId` | Already done -- `employeeId="hcm"` (emp-050) | `gen_employees.go` (existing) |
| Manager | `managerId` | Promote `hcm` employee to a manager -- move from emp-050 to emp-002's slot. Set `employeeId="hcm"` on the manager position so employees 11-19 have `managerId="hcm"` | `gen_employees.go` |
| Customer | `customerId` | Set one Customer's `customerId="hcm"`. SalesOrders, Invoices referencing this customer will appear in the portal | `gen_fin_config.go` |
| Vendor | `vendorId` | Set one Vendor's `vendorId="hcm"`. PurchaseOrders, Invoices referencing this vendor will appear | `gen_fin_config.go` |
| Partner | `partnerChannelId` | Set one SalesPartnerChannel's `partnerChannelId="hcm"`. CrmLeads, Opportunities referencing this partner will appear | `gen_sales_customers.go` |
| Project Client | `clientId` | Set one PrjProject's `clientId="hcm"`. Budgets, timesheets, status reports for this project will appear | `gen_prj_planning.go` |

#### Specific Mock Data Changes

**`gen_employees.go`** -- Make `hcm` a manager (replaces emp-002):

Currently emp-050 (`i==49`) has `employeeId="hcm"` as a regular employee. Change so that emp-002 (`i==1`, the first manager) gets `employeeId="hcm"` instead:

```go
// Employee 2 (first manager) is the all-portals demo user (login: hcm / Hcm123!)
// This makes hcm a manager so the Manager Portal shows direct reports
if i == 1 {
    empId = "hcm"
    firstName = "Jordan"
    lastName = "Rivera"
}
```

Remove the old `i==49` special case. Employees 11-19 already have `managerId = fmt.Sprintf("emp-%03d", managerIndex)` where `managerIndex` cycles through 2-10. After this change, employees that would have `managerId="emp-002"` now get `managerId="hcm"`, so the Manager Portal shows them.

The `hcm` employee is also still in `store.EmployeeIDs`, so all ESS data (payslips, leave requests, goals, etc.) is still generated for them.

**`gen_fin_config.go`** (or wherever Customers are generated) -- Link a Customer to `hcm`:
```go
// Last customer is linked to the all-portals demo user for Customer Portal
if i == lastIndex {
    custId = "hcm"
}
```
All mock SalesOrders, SalesInvoices, CustomerPayments that reference `store.CustomerIDs` via modulo indexing will have some records with `customerId="hcm"`.

**`gen_fin_config.go`** (or wherever Vendors are generated) -- Link a Vendor to `hcm`:
```go
// Last vendor is linked to the all-portals demo user for Vendor Portal
if i == lastIndex {
    vendorId = "hcm"
}
```
All mock PurchaseOrders, PurchaseInvoices, VendorPayments that reference `store.VendorIDs` will have some records with `vendorId="hcm"`.

**`gen_sales_customers.go`** (or wherever PartnerChannels are generated) -- Link a PartnerChannel to `hcm`:
```go
// Last partner channel is linked to the all-portals demo user for Partner Portal
if i == lastIndex {
    partnerChannelId = "hcm"
}
```

**`gen_prj_planning.go`** (or wherever Projects are generated) -- Link a Project to `hcm`:
```go
// Last project is assigned to the all-portals demo user for Project Client Portal
if i == lastIndex {
    projects[i].ClientId = "hcm"
}
```

### 6E: Regenerate erp.json

After making the Go code changes in l8secure:
```bash
cd ../l8secure/go/secure/plugin/erp/main
go run main.go
```
This regenerates `erp.json` with the new roles, users, and portal entries.

### 6F: Update login.json in l8erp

```json
"portals": {
    "app.html": "ERP Dashboard",
    "ess.html": "Employee Self-Service",
    "mgr.html": "Manager Portal",
    "customer.html": "Customer Portal",
    "vendor.html": "Vendor Portal",
    "partner.html": "Partner Portal",
    "projclient.html": "Project Client Portal"
}
```

### Phase 6 File Summary

| File | Project | Action |
|------|---------|--------|
| `erp_roles_portals.go` | l8secure | New -- 4 portal roles (~120 lines) |
| `erp_config.go` | l8secure | Edit -- add roles to `erpRoles()`, update `hcm` user to have all 6 roles, update `defaultPortals()` |
| `erp.json` | l8secure | Regenerated by `go run main.go` |
| `gen_employees.go` | l8erp | Edit -- move `hcm` from emp-050 to emp-002 (manager slot) |
| `gen_fin_config.go` | l8erp | Edit -- set one Customer ID to `"hcm"`, one Vendor ID to `"hcm"` |
| `gen_sales_customers.go` | l8erp | Edit -- set one PartnerChannel ID to `"hcm"` |
| `gen_prj_planning.go` | l8erp | Edit -- set one Project's `clientId` to `"hcm"` |
| `login.json` | l8erp | Edit -- add all portal entries |

---

## Phase 7: End-to-End Verification

For every portal:
1. Navigate to login page, log in with the portal's demo user
2. Verify automatic redirect to the correct portal HTML
3. Verify dashboard loads with summary cards (data may be zero -- no errors)
4. Navigate to each sidebar section
5. Verify tables load without errors (columns render, no blank/broken cells)
6. Click a table row -- verify detail popup opens with correct form fields
7. Test portal switcher -- switch to another portal and back
8. Test on mobile (m/<portal>.html) -- repeat steps 3-6

Portals to verify:
- [ ] ESS Portal (ess.html + m/ess.html) -- regression check after Phase 0 refactor
- [ ] Manager Portal (mgr.html + m/mgr.html)
- [ ] Customer Portal (customer.html + m/customer.html)
- [ ] Vendor Portal (vendor.html + m/vendor.html)
- [ ] Partner Portal (partner.html + m/partner.html)
- [ ] Project Client Portal (projclient.html + m/projclient.html)

---

## Traceability Matrix

| # | Source | Gap / Feature | Phase |
|---|--------|---------------|-------|
| 1 | Duplication analysis | Extract shared portal framework from ESS | Phase 0 |
| 2 | Duplication analysis | Refactor ESS to use shared framework | Phase 0 |
| 3 | MISSING-FEATURES 9.2 | Manager Portal | Phase 1 |
| 4 | MISSING-FEATURES 9.3 | Customer Portal | Phase 2 |
| 5 | MISSING-FEATURES 9.4 | Vendor/Supplier Portal | Phase 3 |
| 6 | MISSING-FEATURES 9.5 | Partner/Channel Portal | Phase 4 |
| 7 | MISSING-FEATURES 9.6 | Project Client Portal | Phase 5 |
| 8 | All portals | 4 new security roles in l8secure (`erp_roles_portals.go`) | Phase 6A |
| 9 | All portals | Update `hcm` user to have all 6 portal roles (`erp_config.go`) | Phase 6B |
| 10 | All portals | Portal registry in l8secure (`defaultPortals()`) | Phase 6C |
| 11 | All portals | Mock data: `hcm` ID linked in Customer, Vendor, Partner, Project, and promoted to manager | Phase 6D |
| 12 | All portals | Regenerate `erp.json` via `go run main.go` | Phase 6E |
| 13 | All portals | login.json portal entries | Phase 6F |
| 14 | All portals | Desktop/mobile parity | Phases 1-5 (each phase includes both) |
| 15 | All portals | Portal switcher entries | Phase 6C (defaultPortals) + Phase 6F (login.json) |
| 16 | ESS regression | Verify ESS works after refactor | Phase 7 |
| 17 | All portals | End-to-end verification with demo user login | Phase 7 |

---

## File Count Summary

### Phase 0 (Shared Framework)
| File | Location | Lines | Type |
|------|----------|-------|------|
| `layer8d-portal.css` | `l8ui/portal/` | ~130 | Shared CSS |
| `layer8m-portal.css` | `l8ui/m/css/` | ~145 | Shared mobile CSS |
| `layer8d-portal.js` | `l8ui/portal/` | ~200 | Desktop framework |
| `layer8m-portal.js` | `l8ui/m/js/` | ~250 | Mobile framework |
| `layer8d-portal-dashboard.js` | `l8ui/portal/` | ~80 | Dashboard helpers |
| **Total new shared** | | **~805** | |
| ESS refactored (net reduction) | | **~-500** | Behavioral -> config |

### Phases 1-5 (Per Portal)
| Portal | Config JS | HTML | Mobile JS | Mobile HTML | Total Files |
|--------|----------|------|-----------|-------------|-------------|
| Manager | 8 | 1 | 3 | 1 | 13 |
| Customer | 8 | 1 | 3 | 1 | 13 |
| Vendor | 8 | 1 | 3 | 1 | 13 |
| Partner | 8 | 1 | 3 | 1 | 13 |
| Project Client | 8 | 1 | 3 | 1 | 13 |
| **Total** | **40** | **5** | **15** | **5** | **65** |

### Phase 6 (Security, Users & Mock Data)
| File | Project | Action |
|------|---------|--------|
| `erp_roles_portals.go` | l8secure | New (~120 lines) |
| `erp_config.go` | l8secure | Edit (add roles, users, portals) |
| `erp.json` | l8secure | Regenerated |
| `gen_employees.go` | l8erp mocks | Edit (manager demo user) |
| `gen_fin_config.go` | l8erp mocks | Edit (customer + vendor demo IDs) |
| `gen_sales_customers.go` | l8erp mocks | Edit (partner demo ID) |
| `gen_prj_planning.go` | l8erp mocks | Edit (project client ID) |
| `login.json` | l8erp | Edit (portal entries) |

### Grand Total
- 5 shared framework files (Phase 0)
- 65 portal config files (Phases 1-5)
- 1 new Go file + 6 edited files across l8secure and l8erp (Phase 6)
- `hcm` user gets all 6 roles -- can switch portals and see data in every one (Phase 6)
- login.json update (Phase 6)

---

## Key Reuse Points

1. **Zero new backend services** -- all portals use existing service endpoints
2. **Existing module enums/forms included via `<script>`** -- per `reuse-existing-module-forms` rule
3. **Shared portal framework** -- all behavioral code in 2 shared files (desktop + mobile)
4. **Each portal's app.js is ~30 lines** -- just `Layer8DPortal.init({...})`
5. **Shared portal CSS** -- all layout/styling in 2 shared CSS files
6. **Portal switcher** -- already implemented, just needs login.json portal entries
7. **Portal routing** -- already implemented via L8User.portal field
