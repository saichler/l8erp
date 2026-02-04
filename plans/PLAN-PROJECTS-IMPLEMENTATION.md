# Projects Module - Implementation Plan

## Overview

Implement the Project Management module following the exact patterns established by HCM, FIN, SCM, Sales, Manufacturing, and CRM. This covers 36 Prime Objects across 5 submodules: Project Planning, Resource Management, Time & Expense, Project Billing, and Project Analytics.

Reference documents:
- `plans/ERP_MODULES.md` (Section 7)
- `plans/PLAN-CRM-IMPLEMENTATION.md` (pattern reference)
- Global rules in `~/.claude/rules/`
- `l8ui/GUIDE.md` (Layer8 UI component usage)

### Global Rules Compliance

| Rule | How This Plan Complies |
|------|----------------------|
| **File Size < 500 lines** | Service files ~80 lines, callbacks ~240 lines. UI split per submodule (columns, forms, enums). All files stay well under 500 lines. |
| **No Duplicate Code** | Reuses `erp-common.proto` shared types (Money, AuditInfo, Address, DateRange). References HCM Employee, FIN Customer/Vendor, CRM Account via cross-module service calls. Uses all Layer8 shared UI components. |
| **Future-Proof Design** | Project entities will be referenced by BI (project analytics, resource utilization), E-Commerce (project-based sales), and Compliance (project audits). PrjProject and PrjTask are designed as shared entities. |
| **Read Before Implementing** | Plan requires reading ALL HCM, FIN, SCM, Sales, Manufacturing, and CRM code (services, callbacks, protos, UI) before writing any Projects code. |
| **Component Integration Analysis** | All ServiceArea assignments, endpoint construction, L8Query support, and initialization arguments are documented below. |
| **Demo Directory** | All UI work targets `go/erp/ui/web/`, never `go/demo/`. |
| **Single Responsibility** | One service per package (2 files each). UI split into columns/forms/enums per submodule. |
| **ServiceName <= 10 chars** | All 36 ServiceName constants are 10 characters or fewer. See Prime Objects Summary. |
| **ServiceArea same per Module** | All Projects services use `ServiceArea = byte(90)`. |
| **ServiceCallback Auto-Generate ID** | All callbacks include `common.GenerateID()` in `Before()` for POST actions. See Section 3b. |
| **Vendor Dependencies** | Step 7 includes `go mod vendor` after proto generation. |
| **Mobile Parity** | Desktop and mobile UI are implemented together per mobile-parity.md. |
| **Mock Completeness** | All 36 services will have mock data generators per mock-completeness.md. |
| **Mock Endpoint Construction** | All endpoints use exact ServiceName constants per mock-endpoint-construction.md. |
| **JS Model Names** | All JS model names use `Prj` prefix matching protobuf types per js-protobuf-model-names.md. |
| **JS Field Names** | All JS field names match protobuf JSON tags per js-protobuf-field-names.md. |

---

## Step 0: Prerequisites

### 0a. Verify `erp-common.proto` exists

Shared `erp-common.proto` contains: Money, AuditInfo, Address, AddressType, ContactInfo, ContactType, DateRange. Already created during FIN implementation.

### 0b. Verify cross-module references

Projects references entities from other modules:

| Referenced Entity | Source Module | How Projects Uses It |
|-------------------|--------------|----------------------|
| **Employee** | HCM (Core HR) | Project managers, team members, resources |
| **Department** | HCM (Core HR) | Project ownership, cost allocation |
| **Customer** | FIN (AR) | Client projects, billing |
| **Vendor** | FIN (AP) | Subcontractors, external resources |
| **CrmAccount** | CRM (Accounts) | Client account for consulting projects |
| **CrmOpportunity** | CRM (Opportunities) | Project origination from won deals |
| **ScmItem** | SCM (Inventory) | Project materials, deliverables |

These are accessed via cross-module service calls. No duplication of these entities in Projects protos.

### 0c. Future-Proof Note

PrjProject (Project) and PrjTask will also be referenced by future modules:
- **BI** will reference PrjProject and PrjTimesheet for resource utilization analytics
- **E-Commerce** will reference PrjProject for project-based product/service delivery
- **Compliance** will reference PrjProject and PrjMilestone for audit tracking

---

## Step 1: Create Proto Files (prefix: `prj-`)

Create 6 proto files under `proto/`:

| File | Contents |
|------|----------|
| `prj-common.proto` | Projects-specific shared types and enums. Imports `erp-common.proto`. |
| `prj-planning.proto` | 8 Prime Objects: Project, ProjectTemplate, Phase, Task, Milestone, Deliverable, Dependency, Risk |
| `prj-resources.proto` | 7 Prime Objects: ResourcePool, Resource, ResourceSkill, Allocation, Booking, CapacityPlan, Utilization |
| `prj-timeexpense.proto` | 7 Prime Objects: Timesheet, TimesheetEntry, ExpenseReport, ExpenseEntry, ApprovalRule, ExpenseCategory, ExpensePolicy |
| `prj-billing.proto` | 7 Prime Objects: BillingRate, BillingSchedule, BillingMilestone, ProjectInvoice, InvoiceLine, RevenueRecognition, ProjectBudget |
| `prj-analytics.proto` | 7 Prime Objects: ProjectStatus, EarnedValue, BudgetVariance, ResourceForecast, PortfolioView, ProjectKPI, ProjectIssue |

### Key Rules

- Every Prime Object gets `// @PrimeObject` comment annotation
- **Every Prime Object MUST have a companion `<Name>List` message** (36 Prime Objects = 72 messages total)
- All use `package prj` and `option go_package = "./types/prj"`
- Import `prj-common.proto` and `api.proto`
- Enums start with `_UNSPECIFIED = 0`
- Include `erp.AuditInfo audit_info` as the last field on every Prime Object
- Use `map<string, string> custom_fields` for extensibility
- License header on every file
- **All type names use `Prj` prefix** (e.g., `PrjProject`, not `Project`)

---

## Step 2: Generate Go Types via `make-bindings.sh`

Add to `proto/make-bindings.sh` after CRM docker runs:

```bash
# Projects
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-planning.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-resources.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-timeexpense.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-billing.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-analytics.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
```

Generated files land in `go/types/prj/`.

Run: `cd proto/ && bash make-bindings.sh`

---

## Step 3: Create Go Services (36 services)

Create directory `go/erp/prj/` with 36 service packages. Each package has exactly 2 files.

**All Projects services use `ServiceArea = byte(90)`.**

### Service Directory Listing (36 packages)

**Project Planning** (`ServiceArea = byte(90)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `projects/` | `PrjProj` | PrjProject | ProjectId |
| `projecttemplates/` | `PrjProjTpl` | PrjProjectTemplate | TemplateId |
| `phases/` | `PrjPhase` | PrjPhase | PhaseId |
| `tasks/` | `PrjTask` | PrjTask | TaskId |
| `milestones/` | `PrjMilstn` | PrjMilestone | MilestoneId |
| `deliverables/` | `PrjDeliv` | PrjDeliverable | DeliverableId |
| `dependencies/` | `PrjDepend` | PrjDependency | DependencyId |
| `risks/` | `PrjRisk` | PrjRisk | RiskId |

**Resource Management** (`ServiceArea = byte(90)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `resourcepools/` | `PrjResPool` | PrjResourcePool | PoolId |
| `resources/` | `PrjRes` | PrjResource | ResourceId |
| `resourceskills/` | `PrjResSkl` | PrjResourceSkill | SkillId |
| `allocations/` | `PrjAlloc` | PrjAllocation | AllocationId |
| `bookings/` | `PrjBooking` | PrjBooking | BookingId |
| `capacityplans/` | `PrjCapPlan` | PrjCapacityPlan | PlanId |
| `utilizations/` | `PrjUtil` | PrjUtilization | UtilizationId |

**Time & Expense** (`ServiceArea = byte(90)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `timesheets/` | `PrjTmSheet` | PrjTimesheet | TimesheetId |
| `timesheetentries/` | `PrjTmEntry` | PrjTimesheetEntry | EntryId |
| `expensereports/` | `PrjExpRpt` | PrjExpenseReport | ReportId |
| `expenseentries/` | `PrjExpEnt` | PrjExpenseEntry | EntryId |
| `approvalrules/` | `PrjApprRl` | PrjApprovalRule | RuleId |
| `expensecategories/` | `PrjExpCat` | PrjExpenseCategory | CategoryId |
| `expensepolicies/` | `PrjExpPol` | PrjExpensePolicy | PolicyId |

**Project Billing** (`ServiceArea = byte(90)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `billingrates/` | `PrjBillRt` | PrjBillingRate | RateId |
| `billingschedules/` | `PrjBillSch` | PrjBillingSchedule | ScheduleId |
| `billingmilestones/` | `PrjBillMls` | PrjBillingMilestone | MilestoneId |
| `projectinvoices/` | `PrjInvoice` | PrjProjectInvoice | InvoiceId |
| `invoicelines/` | `PrjInvLine` | PrjInvoiceLine | LineId |
| `revenuerecognitions/` | `PrjRevRec` | PrjRevenueRecognition | RecognitionId |
| `projectbudgets/` | `PrjBudget` | PrjProjectBudget | BudgetId |

**Project Analytics** (`ServiceArea = byte(90)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `projectstatuses/` | `PrjStatus` | PrjStatusReport | StatusId |
| `earnedvalues/` | `PrjEV` | PrjEarnedValue | EarnedValueId |
| `budgetvariances/` | `PrjBudVar` | PrjBudgetVariance | VarianceId |
| `resourceforecasts/` | `PrjResFcst` | PrjResourceForecast | ForecastId |
| `portfolioviews/` | `PrjPortflo` | PrjPortfolioView | ViewId |
| `projectkpis/` | `PrjKPI` | PrjProjectKPI | KpiId |
| `projectissues/` | `PrjIssue` | PrjProjectIssue | IssueId |

---

## Step 3b: ServiceCallback Pattern

Every `*ServiceCallback.go` MUST include auto-generate ID in the `Before()` method:

```go
func (cb *PrjProjectServiceCallback) Before(any interface{}, action ifs.Action) error {
    entity, ok := any.(*prj.PrjProject)
    if !ok {
        return fmt.Errorf("expected *prj.PrjProject but got %T", any)
    }
    if action == ifs.POST {
        common.GenerateID(&entity.ProjectId)
    }
    return validate(entity)
}
```

The primary key field name comes from the corresponding `*Service.go` file's `SetPrimaryKeys()` call.

---

## Step 4: Integrate Projects into Centralized `erp_main.go`

**Important:** There is NO separate `prj_main.go` file. All modules are activated from the centralized `go/erp/main/erp_main.go`.

### 4a. Add Projects Imports

Add Projects service imports to `erp_main.go` after the existing CRM imports (all 36 packages).

### 4b. Add Function Call in main()

```go
    activateHCMServices(nic)
    activateFinServices(nic)
    activateSCMServices(nic)
    activateSalesServices(nic)
    activateMfgServices(nic)
    activateCrmServices(nic)
    activatePrjServices(nic)  // Add this line
```

### 4c. Create `activatePrjServices()` Function

Add function after `activateCrmServices()` with all 36 service activations.

---

## Step 5: Register Projects Types in UI

Add to `go/erp/ui/main.go`:

1. Add import: `"github.com/saichler/l8erp/go/types/prj"`
2. Add call: `registerPrjTypes(resources)`
3. Create `registerPrjTypes()` function with all 36 types (see pattern from CRM).

---

## Step 6: Create Desktop UI

### 6a. Directory Structure

Create `go/erp/ui/web/prj/` with this structure:

```
prj/
├── prj-config.js           # Module config with all services
├── prj-init.js             # Module initialization
├── prj.css                 # Module-specific styles
├── planning/
│   ├── planning-enums.js
│   ├── planning-columns.js
│   ├── planning-forms.js
│   └── planning.js
├── resources/
│   ├── resources-enums.js
│   ├── resources-columns.js
│   ├── resources-forms.js
│   └── resources.js
├── timeexpense/
│   ├── timeexpense-enums.js
│   ├── timeexpense-columns.js
│   ├── timeexpense-forms.js
│   └── timeexpense.js
├── billing/
│   ├── billing-enums.js
│   ├── billing-columns.js
│   ├── billing-forms.js
│   └── billing.js
└── analytics/
    ├── analytics-enums.js
    ├── analytics-columns.js
    ├── analytics-forms.js
    └── analytics.js
```

### 6b. Module Config File: `prj/prj-config.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.Prj = window.Prj || {};

    Prj.modules = {
        'planning': {
            label: 'Planning',
            icon: '📋',
            services: [
                { key: 'projects', label: 'Projects', icon: '📁', endpoint: '/90/PrjProj', model: 'PrjProject' },
                { key: 'project-templates', label: 'Templates', icon: '📄', endpoint: '/90/PrjProjTpl', model: 'PrjProjectTemplate' },
                { key: 'phases', label: 'Phases', icon: '🔄', endpoint: '/90/PrjPhase', model: 'PrjPhase' },
                { key: 'tasks', label: 'Tasks', icon: '✅', endpoint: '/90/PrjTask', model: 'PrjTask' },
                { key: 'milestones', label: 'Milestones', icon: '🎯', endpoint: '/90/PrjMilstn', model: 'PrjMilestone' },
                { key: 'deliverables', label: 'Deliverables', icon: '📦', endpoint: '/90/PrjDeliv', model: 'PrjDeliverable' },
                { key: 'dependencies', label: 'Dependencies', icon: '🔗', endpoint: '/90/PrjDepend', model: 'PrjDependency' },
                { key: 'risks', label: 'Risks', icon: '⚠️', endpoint: '/90/PrjRisk', model: 'PrjRisk' }
            ]
        },
        'resources': {
            label: 'Resources',
            icon: '👥',
            services: [
                { key: 'resource-pools', label: 'Resource Pools', icon: '🏊', endpoint: '/90/PrjResPool', model: 'PrjResourcePool' },
                { key: 'resources', label: 'Resources', icon: '👤', endpoint: '/90/PrjRes', model: 'PrjResource' },
                { key: 'resource-skills', label: 'Skills', icon: '🎓', endpoint: '/90/PrjResSkl', model: 'PrjResourceSkill' },
                { key: 'allocations', label: 'Allocations', icon: '📊', endpoint: '/90/PrjAlloc', model: 'PrjAllocation' },
                { key: 'bookings', label: 'Bookings', icon: '📅', endpoint: '/90/PrjBooking', model: 'PrjBooking' },
                { key: 'capacity-plans', label: 'Capacity Plans', icon: '📈', endpoint: '/90/PrjCapPlan', model: 'PrjCapacityPlan' },
                { key: 'utilizations', label: 'Utilization', icon: '⏱️', endpoint: '/90/PrjUtil', model: 'PrjUtilization' }
            ]
        },
        'timeexpense': {
            label: 'Time & Expense',
            icon: '⏰',
            services: [
                { key: 'timesheets', label: 'Timesheets', icon: '📝', endpoint: '/90/PrjTmSheet', model: 'PrjTimesheet' },
                { key: 'timesheet-entries', label: 'Time Entries', icon: '⏱️', endpoint: '/90/PrjTmEntry', model: 'PrjTimesheetEntry' },
                { key: 'expense-reports', label: 'Expense Reports', icon: '💰', endpoint: '/90/PrjExpRpt', model: 'PrjExpenseReport' },
                { key: 'expense-entries', label: 'Expense Entries', icon: '🧾', endpoint: '/90/PrjExpEnt', model: 'PrjExpenseEntry' },
                { key: 'approval-rules', label: 'Approval Rules', icon: '✔️', endpoint: '/90/PrjApprRl', model: 'PrjApprovalRule' },
                { key: 'expense-categories', label: 'Categories', icon: '🏷️', endpoint: '/90/PrjExpCat', model: 'PrjExpenseCategory' },
                { key: 'expense-policies', label: 'Policies', icon: '📋', endpoint: '/90/PrjExpPol', model: 'PrjExpensePolicy' }
            ]
        },
        'billing': {
            label: 'Billing',
            icon: '💵',
            services: [
                { key: 'billing-rates', label: 'Billing Rates', icon: '💲', endpoint: '/90/PrjBillRt', model: 'PrjBillingRate' },
                { key: 'billing-schedules', label: 'Billing Schedules', icon: '📅', endpoint: '/90/PrjBillSch', model: 'PrjBillingSchedule' },
                { key: 'billing-milestones', label: 'Billing Milestones', icon: '🎯', endpoint: '/90/PrjBillMls', model: 'PrjBillingMilestone' },
                { key: 'project-invoices', label: 'Invoices', icon: '🧾', endpoint: '/90/PrjInvoice', model: 'PrjProjectInvoice' },
                { key: 'invoice-lines', label: 'Invoice Lines', icon: '📝', endpoint: '/90/PrjInvLine', model: 'PrjInvoiceLine' },
                { key: 'revenue-recognitions', label: 'Revenue Recognition', icon: '📈', endpoint: '/90/PrjRevRec', model: 'PrjRevenueRecognition' },
                { key: 'project-budgets', label: 'Budgets', icon: '💰', endpoint: '/90/PrjBudget', model: 'PrjProjectBudget' }
            ]
        },
        'analytics': {
            label: 'Analytics',
            icon: '📊',
            services: [
                { key: 'project-statuses', label: 'Status Reports', icon: '📋', endpoint: '/90/PrjStatus', model: 'PrjStatusReport' },
                { key: 'earned-values', label: 'Earned Value', icon: '📈', endpoint: '/90/PrjEV', model: 'PrjEarnedValue' },
                { key: 'budget-variances', label: 'Budget Variance', icon: '📉', endpoint: '/90/PrjBudVar', model: 'PrjBudgetVariance' },
                { key: 'resource-forecasts', label: 'Resource Forecast', icon: '🔮', endpoint: '/90/PrjResFcst', model: 'PrjResourceForecast' },
                { key: 'portfolio-views', label: 'Portfolio', icon: '🗂️', endpoint: '/90/PrjPortflo', model: 'PrjPortfolioView' },
                { key: 'project-kpis', label: 'KPIs', icon: '🎯', endpoint: '/90/PrjKPI', model: 'PrjProjectKPI' },
                { key: 'project-issues', label: 'Issues', icon: '🐛', endpoint: '/90/PrjIssue', model: 'PrjProjectIssue' }
            ]
        }
    };

    Prj.submodules = ['PrjPlanning', 'PrjResources', 'PrjTimeExpense', 'PrjBilling', 'PrjAnalytics'];
})();
```

### 6c. Planning Submodule Example Files

#### `planning/planning-enums.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.PrjPlanning = window.PrjPlanning || {};
    PrjPlanning.enums = {};

    // PROJECT STATUS
    PrjPlanning.enums.PROJECT_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Planned',
        3: 'In Progress',
        4: 'On Hold',
        5: 'Completed',
        6: 'Cancelled'
    };

    PrjPlanning.enums.PROJECT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-active',
        6: 'layer8d-status-terminated'
    };

    // PROJECT TYPE
    PrjPlanning.enums.PROJECT_TYPE = {
        0: 'Unspecified',
        1: 'Internal',
        2: 'Client',
        3: 'Fixed Price',
        4: 'Time & Materials',
        5: 'Retainer',
        6: 'Capital'
    };

    // TASK STATUS
    PrjPlanning.enums.TASK_STATUS = {
        0: 'Unspecified',
        1: 'Not Started',
        2: 'In Progress',
        3: 'On Hold',
        4: 'Completed',
        5: 'Cancelled'
    };

    PrjPlanning.enums.TASK_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-active',
        5: 'layer8d-status-terminated'
    };

    // TASK PRIORITY
    PrjPlanning.enums.TASK_PRIORITY = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };

    // MILESTONE STATUS
    PrjPlanning.enums.MILESTONE_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Achieved',
        3: 'Missed',
        4: 'At Risk'
    };

    // RISK SEVERITY
    PrjPlanning.enums.RISK_SEVERITY = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };

    // RISK STATUS
    PrjPlanning.enums.RISK_STATUS = {
        0: 'Unspecified',
        1: 'Identified',
        2: 'Assessed',
        3: 'Mitigated',
        4: 'Occurred',
        5: 'Closed'
    };

    // DEPENDENCY TYPE
    PrjPlanning.enums.DEPENDENCY_TYPE = {
        0: 'Unspecified',
        1: 'Finish to Start',
        2: 'Start to Start',
        3: 'Finish to Finish',
        4: 'Start to Finish'
    };

    // RENDERERS
    PrjPlanning.render = {};

    PrjPlanning.render.projectStatus = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.PROJECT_STATUS,
        PrjPlanning.enums.PROJECT_STATUS_CLASSES
    );

    PrjPlanning.render.taskStatus = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.TASK_STATUS,
        PrjPlanning.enums.TASK_STATUS_CLASSES
    );

    PrjPlanning.render.date = Layer8DRenderers.renderDate;
    PrjPlanning.render.money = Layer8DRenderers.renderMoney;
})();
```

#### `planning/planning-columns.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.PrjPlanning = window.PrjPlanning || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = PrjPlanning.render;
    const enums = PrjPlanning.enums;

    PrjPlanning.columns = {
        PrjProject: [
            { key: 'projectId', label: 'ID', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'projectType',
                label: 'Type',
                sortKey: 'projectType',
                render: (item) => enums.PROJECT_TYPE[item.projectType] || 'Unknown'
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.projectStatus(item.status)
            },
            { key: 'managerId', label: 'Manager', sortKey: 'managerId' },
            {
                key: 'startDate',
                label: 'Start',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            {
                key: 'budget',
                label: 'Budget',
                sortKey: 'budget',
                render: (item) => renderMoney(item.budget)
            }
        ],

        PrjProjectTemplate: [
            { key: 'templateId', label: 'ID', sortKey: 'templateId', filterKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'projectType', label: 'Type', sortKey: 'projectType',
              render: (item) => enums.PROJECT_TYPE[item.projectType] || 'Unknown' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

        PrjPhase: [
            { key: 'phaseId', label: 'ID', sortKey: 'phaseId', filterKey: 'phaseId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'sequence', label: 'Sequence', sortKey: 'sequence' },
            {
                key: 'startDate',
                label: 'Start',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            { key: 'percentComplete', label: '% Complete', sortKey: 'percentComplete' }
        ],

        PrjTask: [
            { key: 'taskId', label: 'ID', sortKey: 'taskId', filterKey: 'taskId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            },
            {
                key: 'priority',
                label: 'Priority',
                sortKey: 'priority',
                render: (item) => enums.TASK_PRIORITY[item.priority] || 'Unknown'
            },
            { key: 'assigneeId', label: 'Assignee', sortKey: 'assigneeId' },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            { key: 'estimatedHours', label: 'Est. Hours', sortKey: 'estimatedHours' },
            { key: 'actualHours', label: 'Actual Hours', sortKey: 'actualHours' }
        ],

        PrjMilestone: [
            { key: 'milestoneId', label: 'ID', sortKey: 'milestoneId', filterKey: 'milestoneId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'targetDate',
                label: 'Target Date',
                sortKey: 'targetDate',
                render: (item) => renderDate(item.targetDate)
            },
            {
                key: 'actualDate',
                label: 'Actual Date',
                sortKey: 'actualDate',
                render: (item) => renderDate(item.actualDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => enums.MILESTONE_STATUS[item.status] || 'Unknown'
            },
            { key: 'isBillable', label: 'Billable', sortKey: 'isBillable' }
        ],

        PrjDeliverable: [
            { key: 'deliverableId', label: 'ID', sortKey: 'deliverableId', filterKey: 'deliverableId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            { key: 'isDelivered', label: 'Delivered', sortKey: 'isDelivered' }
        ],

        PrjDependency: [
            { key: 'dependencyId', label: 'ID', sortKey: 'dependencyId', filterKey: 'dependencyId' },
            { key: 'predecessorTaskId', label: 'Predecessor', sortKey: 'predecessorTaskId' },
            { key: 'successorTaskId', label: 'Successor', sortKey: 'successorTaskId' },
            {
                key: 'dependencyType',
                label: 'Type',
                sortKey: 'dependencyType',
                render: (item) => enums.DEPENDENCY_TYPE[item.dependencyType] || 'Unknown'
            },
            { key: 'lagDays', label: 'Lag (Days)', sortKey: 'lagDays' }
        ],

        PrjRisk: [
            { key: 'riskId', label: 'ID', sortKey: 'riskId', filterKey: 'riskId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'severity',
                label: 'Severity',
                sortKey: 'severity',
                render: (item) => enums.RISK_SEVERITY[item.severity] || 'Unknown'
            },
            { key: 'probability', label: 'Probability %', sortKey: 'probability' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => enums.RISK_STATUS[item.status] || 'Unknown'
            },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' }
        ]
    };
})();
```

#### `planning/planning-forms.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.PrjPlanning = window.PrjPlanning || {};

    const enums = PrjPlanning.enums;

    PrjPlanning.forms = {
        PrjProject: {
            title: 'Project',
            sections: [
                {
                    title: 'Project Details',
                    fields: [
                        { key: 'code', label: 'Project Code', type: 'text', required: true },
                        { key: 'name', label: 'Project Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'projectType', label: 'Type', type: 'select', options: enums.PROJECT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PROJECT_STATUS },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'FinCustomer' },
                        { key: 'accountId', label: 'CRM Account', type: 'reference', lookupModel: 'CrmAccount' },
                        { key: 'managerId', label: 'Project Manager', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' }
                    ]
                },
                {
                    title: 'Schedule',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'estimatedHours', label: 'Estimated Hours', type: 'number' }
                    ]
                },
                {
                    title: 'Budget',
                    fields: [
                        { key: 'budget', label: 'Budget', type: 'money' },
                        { key: 'billingType', label: 'Billing Type', type: 'select', options: enums.PROJECT_TYPE }
                    ]
                }
            ]
        },

        PrjProjectTemplate: {
            title: 'Project Template',
            sections: [
                {
                    title: 'Template Details',
                    fields: [
                        { key: 'name', label: 'Template Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'projectType', label: 'Project Type', type: 'select', options: enums.PROJECT_TYPE },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjPhase: {
            title: 'Project Phase',
            sections: [
                {
                    title: 'Phase Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'name', label: 'Phase Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'sequence', label: 'Sequence', type: 'number', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'percentComplete', label: '% Complete', type: 'number' }
                    ]
                }
            ]
        },

        PrjTask: {
            title: 'Task',
            sections: [
                {
                    title: 'Task Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'phaseId', label: 'Phase', type: 'reference', lookupModel: 'PrjPhase' },
                        { key: 'parentTaskId', label: 'Parent Task', type: 'reference', lookupModel: 'PrjTask' },
                        { key: 'name', label: 'Task Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.TASK_PRIORITY },
                        { key: 'assigneeId', label: 'Assignee', type: 'reference', lookupModel: 'Employee' },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'estimatedHours', label: 'Estimated Hours', type: 'number' },
                        { key: 'actualHours', label: 'Actual Hours', type: 'number' },
                        { key: 'isBillable', label: 'Billable', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjMilestone: {
            title: 'Milestone',
            sections: [
                {
                    title: 'Milestone Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'phaseId', label: 'Phase', type: 'reference', lookupModel: 'PrjPhase' },
                        { key: 'name', label: 'Milestone Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'targetDate', label: 'Target Date', type: 'date', required: true },
                        { key: 'actualDate', label: 'Actual Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.MILESTONE_STATUS },
                        { key: 'isBillable', label: 'Billable', type: 'checkbox' },
                        { key: 'billingAmount', label: 'Billing Amount', type: 'money' }
                    ]
                }
            ]
        },

        PrjDeliverable: {
            title: 'Deliverable',
            sections: [
                {
                    title: 'Deliverable Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'milestoneId', label: 'Milestone', type: 'reference', lookupModel: 'PrjMilestone' },
                        { key: 'name', label: 'Deliverable Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'isDelivered', label: 'Delivered', type: 'checkbox' },
                        { key: 'deliveredDate', label: 'Delivered Date', type: 'date' },
                        { key: 'acceptedBy', label: 'Accepted By', type: 'text' }
                    ]
                }
            ]
        },

        PrjDependency: {
            title: 'Task Dependency',
            sections: [
                {
                    title: 'Dependency Details',
                    fields: [
                        { key: 'predecessorTaskId', label: 'Predecessor Task', type: 'reference', lookupModel: 'PrjTask', required: true },
                        { key: 'successorTaskId', label: 'Successor Task', type: 'reference', lookupModel: 'PrjTask', required: true },
                        { key: 'dependencyType', label: 'Dependency Type', type: 'select', options: enums.DEPENDENCY_TYPE, required: true },
                        { key: 'lagDays', label: 'Lag (Days)', type: 'number' }
                    ]
                }
            ]
        },

        PrjRisk: {
            title: 'Project Risk',
            sections: [
                {
                    title: 'Risk Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'name', label: 'Risk Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'severity', label: 'Severity', type: 'select', options: enums.RISK_SEVERITY },
                        { key: 'probability', label: 'Probability %', type: 'number' },
                        { key: 'impact', label: 'Impact Description', type: 'textarea' },
                        { key: 'mitigationPlan', label: 'Mitigation Plan', type: 'textarea' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.RISK_STATUS },
                        { key: 'ownerId', label: 'Risk Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        }
    };

    PrjPlanning.primaryKeys = {
        PrjProject: 'projectId',
        PrjProjectTemplate: 'templateId',
        PrjPhase: 'phaseId',
        PrjTask: 'taskId',
        PrjMilestone: 'milestoneId',
        PrjDeliverable: 'deliverableId',
        PrjDependency: 'dependencyId',
        PrjRisk: 'riskId'
    };
})();
```

#### `planning/planning.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    // PrjPlanning namespace initialized by enum, column, and form files
    // This file can contain any additional planning-specific logic
})();
```

### 6d. Module Init File: `prj/prj-init.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DModuleFactory.create({
        namespace: 'Prj',
        defaultModule: 'planning',
        defaultService: 'projects',
        sectionSelector: 'prj',
        initializerName: 'initializePrj',
        requiredNamespaces: ['PrjPlanning', 'PrjResources', 'PrjTimeExpense', 'PrjBilling', 'PrjAnalytics']
    });
})();
```

### 6e. Section HTML: `sections/prj.html`

Create section HTML following the CRM/Manufacturing pattern with:
- Header with parallax effect and Projects-themed SVG icons (Gantt charts, calendars, tasks)
- Module tabs: Planning, Resources, Time & Expense, Billing, Analytics
- Each module has subnav with all its services
- Table containers with IDs: `{module}-{service}-table-container`

Example structure:
```html
<div class="section-container hcm-section">
    <!-- Header with Parallax Effect (Projects themed: Gantt, tasks, calendars) -->
    <div class="hcm-header-frame parallax-container">
        <!-- SVG with Projects icons -->
    </div>

    <!-- Module Tabs -->
    <div class="hcm-module-tabs">
        <button class="hcm-module-tab active" data-module="planning">📋 Planning</button>
        <button class="hcm-module-tab" data-module="resources">👥 Resources</button>
        <button class="hcm-module-tab" data-module="timeexpense">⏰ Time & Expense</button>
        <button class="hcm-module-tab" data-module="billing">💵 Billing</button>
        <button class="hcm-module-tab" data-module="analytics">📊 Analytics</button>
    </div>

    <div class="section-content">
        <!-- Planning Module (default active) -->
        <div class="hcm-module-content active" data-module="planning">
            <nav class="hcm-subnav">
                <a class="hcm-subnav-item active" data-service="projects">📁 Projects</a>
                <a class="hcm-subnav-item" data-service="project-templates">📄 Templates</a>
                <!-- ... other services -->
            </nav>
            <div class="hcm-service-content">
                <div class="hcm-service-view active" data-service="projects">
                    <div class="hcm-table-container" id="planning-projects-table-container"></div>
                </div>
                <!-- ... other service views -->
            </div>
        </div>
        <!-- ... other modules -->
    </div>
</div>
```

### 6f. Wiring in `app.html`

Add after CRM scripts:

```html
<!-- Projects CSS -->
<link rel="stylesheet" href="prj/prj.css">

<!-- Projects Config -->
<script src="prj/prj-config.js"></script>

<!-- Projects Submodules -->
<script src="prj/planning/planning-enums.js"></script>
<script src="prj/planning/planning-columns.js"></script>
<script src="prj/planning/planning-forms.js"></script>
<script src="prj/planning/planning.js"></script>

<script src="prj/resources/resources-enums.js"></script>
<script src="prj/resources/resources-columns.js"></script>
<script src="prj/resources/resources-forms.js"></script>
<script src="prj/resources/resources.js"></script>

<script src="prj/timeexpense/timeexpense-enums.js"></script>
<script src="prj/timeexpense/timeexpense-columns.js"></script>
<script src="prj/timeexpense/timeexpense-forms.js"></script>
<script src="prj/timeexpense/timeexpense.js"></script>

<script src="prj/billing/billing-enums.js"></script>
<script src="prj/billing/billing-columns.js"></script>
<script src="prj/billing/billing-forms.js"></script>
<script src="prj/billing/billing.js"></script>

<script src="prj/analytics/analytics-enums.js"></script>
<script src="prj/analytics/analytics-columns.js"></script>
<script src="prj/analytics/analytics-forms.js"></script>
<script src="prj/analytics/analytics.js"></script>

<!-- Projects Init (LAST) -->
<script src="prj/prj-init.js"></script>
```

### 6g. Wiring in `sections.js`

Add section mapping:

```javascript
const sections = {
    // ... existing sections
    prj: 'sections/prj.html'
};

const sectionInitializers = {
    // ... existing initializers
    prj: () => { if (typeof initializePrj === 'function') initializePrj(); }
};
```

---

## Step 7: Create Mobile UI (Mobile Parity)

### 7a. Directory Structure

Create `go/erp/ui/web/m/js/prj/` with files for each submodule:

```
m/js/prj/
├── planning-enums.js
├── planning-columns.js
├── planning-forms.js
├── resources-enums.js
├── resources-columns.js
├── resources-forms.js
├── timeexpense-enums.js
├── timeexpense-columns.js
├── timeexpense-forms.js
├── billing-enums.js
├── billing-columns.js
├── billing-forms.js
├── analytics-enums.js
├── analytics-columns.js
├── analytics-forms.js
└── prj-index.js
```

### 7b. Mobile Registry: `m/js/prj/prj-index.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    const modules = [
        MobilePrjPlanning,
        MobilePrjResources,
        MobilePrjTimeExpense,
        MobilePrjBilling,
        MobilePrjAnalytics
    ];

    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) {
                return mod;
            }
        }
        return null;
    }

    window.MobilePrj = {
        getFormDef(modelName) {
            const mod = findModule(modelName);
            return mod && mod.forms && mod.forms[modelName] || null;
        },
        getColumns(modelName) {
            const mod = findModule(modelName);
            return mod && mod.columns && mod.columns[modelName] || null;
        },
        getEnums(modelName) {
            const mod = findModule(modelName);
            return mod && mod.enums || null;
        },
        getPrimaryKey(modelName) {
            const mod = findModule(modelName);
            return mod && mod.primaryKeys && mod.primaryKeys[modelName] || null;
        },
        hasModel(modelName) {
            return findModule(modelName) !== null;
        },
        modules: {
            Planning: MobilePrjPlanning,
            Resources: MobilePrjResources,
            TimeExpense: MobilePrjTimeExpense,
            Billing: MobilePrjBilling,
            Analytics: MobilePrjAnalytics
        }
    };
})();
```

### 7c. Mobile Nav Config Update

In `l8ui/m/js/layer8m-nav-config.js`:

1. Add prj to modules list:
```javascript
{ key: 'prj', label: 'Projects', icon: 'prj', hasSubModules: true }
```

2. Add full config block:
```javascript
prj: {
    subModules: [
        { key: 'planning', label: 'Planning', icon: 'prj' },
        { key: 'resources', label: 'Resources', icon: 'prj' },
        { key: 'timeexpense', label: 'Time & Expense', icon: 'prj' },
        { key: 'billing', label: 'Billing', icon: 'prj' },
        { key: 'analytics', label: 'Analytics', icon: 'prj' }
    ],
    services: {
        'planning': [
            { key: 'projects', label: 'Projects', icon: 'prj', endpoint: '/90/PrjProj', model: 'PrjProject', idField: 'projectId' },
            { key: 'project-templates', label: 'Templates', icon: 'prj', endpoint: '/90/PrjProjTpl', model: 'PrjProjectTemplate', idField: 'templateId' },
            // ... all planning services
        ],
        'resources': [
            { key: 'resource-pools', label: 'Resource Pools', icon: 'prj', endpoint: '/90/PrjResPool', model: 'PrjResourcePool', idField: 'poolId' },
            // ... all resource services
        ],
        // ... all other submodules
    }
}
```

### 7d. Mobile Nav.js Update

In `layer8m-nav.js`, add `MobilePrj` to registry lookups in `_getServiceColumns`, `_getServiceFormDef`, etc.

### 7e. Mobile app.html Update

Add script tags and sidebar link:

```html
<!-- Projects Mobile Scripts -->
<script src="js/prj/planning-enums.js"></script>
<script src="js/prj/planning-columns.js"></script>
<script src="js/prj/planning-forms.js"></script>
<!-- ... all submodule files -->
<script src="js/prj/prj-index.js"></script>

<!-- Sidebar -->
<a href="#dashboard" class="sidebar-item" data-section="dashboard" data-module="prj">
    <span class="sidebar-item-icon"><!-- Projects icon SVG --></span>
    Projects
</a>
```

---

## Step 8: Reference Registry Updates

### CRITICAL: Verify Field Names First

Before writing registry entries, grep the .pb.go files:

```bash
grep -A 30 "type PrjProject struct" go/types/prj/*.pb.go | grep 'json:"'
```

### Desktop Reference Registry

Add to `reference-registry-*.js`:

```javascript
// Projects models
PrjProject: {
    idColumn: 'projectId',
    displayColumn: 'name',
    selectColumns: ['projectId', 'code', 'name', 'status'],
    displayFormat: function(item) { return item.code + ' - ' + item.name; },
    displayLabel: 'Project'
},
PrjProjectTemplate: {
    idColumn: 'templateId',
    displayColumn: 'name',
    selectColumns: ['templateId', 'name'],
    displayLabel: 'Project Template'
},
PrjPhase: {
    idColumn: 'phaseId',
    displayColumn: 'name',
    selectColumns: ['phaseId', 'name', 'projectId'],
    displayLabel: 'Phase'
},
PrjTask: {
    idColumn: 'taskId',
    displayColumn: 'name',
    selectColumns: ['taskId', 'name', 'projectId', 'status'],
    displayLabel: 'Task'
},
PrjMilestone: {
    idColumn: 'milestoneId',
    displayColumn: 'name',
    selectColumns: ['milestoneId', 'name', 'targetDate'],
    displayLabel: 'Milestone'
},
PrjResourcePool: {
    idColumn: 'poolId',
    displayColumn: 'name',
    selectColumns: ['poolId', 'name'],
    displayLabel: 'Resource Pool'
},
PrjResource: {
    idColumn: 'resourceId',
    displayColumn: 'name',
    selectColumns: ['resourceId', 'name', 'employeeId'],
    displayLabel: 'Resource'
},
PrjTimesheet: {
    idColumn: 'timesheetId',
    displayColumn: 'timesheetId',
    selectColumns: ['timesheetId', 'employeeId', 'weekStartDate'],
    displayFormat: function(item) { return 'TS-' + item.timesheetId; },
    displayLabel: 'Timesheet'
},
PrjExpenseReport: {
    idColumn: 'reportId',
    displayColumn: 'reportId',
    selectColumns: ['reportId', 'employeeId', 'submitDate'],
    displayFormat: function(item) { return 'EXP-' + item.reportId; },
    displayLabel: 'Expense Report'
},
PrjBillingRate: {
    idColumn: 'rateId',
    displayColumn: 'name',
    selectColumns: ['rateId', 'name', 'rate'],
    displayLabel: 'Billing Rate'
},
PrjBillingSchedule: {
    idColumn: 'scheduleId',
    displayColumn: 'name',
    selectColumns: ['scheduleId', 'name', 'projectId'],
    displayLabel: 'Billing Schedule'
},
PrjProjectInvoice: {
    idColumn: 'invoiceId',
    displayColumn: 'invoiceNumber',
    selectColumns: ['invoiceId', 'invoiceNumber', 'projectId'],
    displayLabel: 'Project Invoice'
},
PrjProjectBudget: {
    idColumn: 'budgetId',
    displayColumn: 'name',
    selectColumns: ['budgetId', 'name', 'projectId'],
    displayLabel: 'Project Budget'
}
```

### Mobile Reference Registry

Add same entries to `layer8m-reference-registry.js`.

---

## Step 9: Mock Data Generation

### Phase Ordering (36 services, 10 phases)

| Phase | Models | Dependencies |
|-------|--------|-------------|
| 1 | PrjProjectTemplate, PrjResourcePool, PrjExpenseCategory, PrjExpensePolicy, PrjApprovalRule | None (configuration) |
| 2 | PrjProject, PrjResource, PrjResourceSkill | Phase 1 + HCM Employee |
| 3 | PrjPhase, PrjBillingRate, PrjProjectBudget | Phase 2 |
| 4 | PrjTask, PrjMilestone, PrjDeliverable | Phase 3 |
| 5 | PrjDependency, PrjRisk, PrjAllocation, PrjBooking | Phase 4 |
| 6 | PrjCapacityPlan, PrjUtilization, PrjBillingSchedule | Phase 5 |
| 7 | PrjTimesheet, PrjTimesheetEntry | Phase 2 + HCM Employee |
| 8 | PrjExpenseReport, PrjExpenseEntry | Phase 2 + HCM Employee |
| 9 | PrjBillingMilestone, PrjProjectInvoice, PrjInvoiceLine, PrjRevenueRecognition | Phase 4, 6 |
| 10 | PrjStatusReport, PrjEarnedValue, PrjBudgetVariance, PrjResourceForecast, PrjPortfolioView, PrjProjectKPI, PrjProjectIssue | Various |

### Files to Create

| File | Contents |
|------|----------|
| `gen_prj_foundation.go` | Phases 1-2 (templates, pools, categories, policies, projects, resources) |
| `gen_prj_planning.go` | Phases 3-5 (phases, tasks, milestones, deliverables, dependencies, risks) |
| `gen_prj_resources.go` | Phases 5-6 (allocations, bookings, capacity plans, utilization) |
| `gen_prj_timeexpense.go` | Phases 7-8 (timesheets, entries, expense reports, entries) |
| `gen_prj_billing.go` | Phases 3, 6, 9 (rates, schedules, milestones, invoices, revenue) |
| `gen_prj_analytics.go` | Phase 10 (status, earned value, variances, forecasts, KPIs) |
| `prj_phases.go` | Phase orchestration (1-5) |
| `prj_phases6_10.go` | Phase orchestration (6-10) |

### Mock Data Store Additions

Add to `store.go`:

```go
// Projects - Phase 1 (Configuration)
PrjProjectTemplateIDs   []string
PrjResourcePoolIDs      []string
PrjExpenseCategoryIDs   []string
PrjExpensePolicyIDs     []string
PrjApprovalRuleIDs      []string

// Projects - Phase 2 (Core)
PrjProjectIDs           []string
PrjResourceIDs          []string
PrjResourceSkillIDs     []string

// Projects - Phase 3
PrjPhaseIDs             []string
PrjBillingRateIDs       []string
PrjProjectBudgetIDs     []string

// Projects - Phase 4
PrjTaskIDs              []string
PrjMilestoneIDs         []string
PrjDeliverableIDs       []string

// Projects - Phase 5
PrjDependencyIDs        []string
PrjRiskIDs              []string
PrjAllocationIDs        []string
PrjBookingIDs           []string

// Projects - Phase 6
PrjCapacityPlanIDs      []string
PrjUtilizationIDs       []string
PrjBillingScheduleIDs   []string

// Projects - Phase 7
PrjTimesheetIDs         []string
PrjTimesheetEntryIDs    []string

// Projects - Phase 8
PrjExpenseReportIDs     []string
PrjExpenseEntryIDs      []string

// Projects - Phase 9
PrjBillingMilestoneIDs  []string
PrjProjectInvoiceIDs    []string
PrjInvoiceLineIDs       []string
PrjRevenueRecognitionIDs []string

// Projects - Phase 10 (Analytics)
PrjStatusReportIDs     []string
PrjEarnedValueIDs       []string
PrjBudgetVarianceIDs    []string
PrjResourceForecastIDs  []string
PrjPortfolioViewIDs     []string
PrjProjectKPIIDs        []string
PrjProjectIssueIDs      []string
```

---

## Step 10: Verify Build

1. Run `go build ./erp/prj/...`
2. Run `go vet ./erp/prj/...`
3. Run `go build ./erp/ui/...`
4. Verify UI loads in browser with Projects section
5. Verify mobile card navigation shows Projects
6. Run mock data generation

---

## Files Summary

### Files to Modify

| File | Change |
|------|--------|
| `proto/make-bindings.sh` | Add Projects proto docker runs |
| `go/erp/main/erp_main.go` | Add Projects imports and activation |
| `go/erp/ui/main.go` | Add registerPrjTypes() |
| `go/erp/ui/web/js/sections.js` | Add `prj` section mapping |
| `go/erp/ui/web/app.html` | Add Projects CSS + script tags |
| `l8ui/m/js/layer8m-nav-config.js` | Add Projects module config |
| `l8ui/m/js/layer8m-nav.js` | Add `MobilePrj` to registries |
| `m/app.html` | Add Projects scripts + sidebar |
| Desktop reference registry | Add Projects models |
| Mobile reference registry | Add Projects models |
| `go/tests/mocks/store.go` | Add Projects ID slices |
| `go/tests/mocks/data.go` | Add Projects data arrays |
| `go/tests/mocks/main.go` | Add Projects phase calls |

### Files to Create

| Category | Count | Location |
|----------|-------|----------|
| Proto files | 6 | `proto/prj-*.proto` |
| Go services | 72 | `go/erp/prj/<service>/` (36 packages x 2 files) |
| Desktop UI config | 2 | `prj/prj-{config,init}.js` |
| Desktop UI CSS | 1 | `prj/prj.css` |
| Desktop submodule files | 20 | `prj/<sub>/{enums,columns,forms,entry}.js` |
| Desktop section HTML | 1 | `sections/prj.html` |
| Mobile submodule files | 15 | `m/js/prj/*` |
| Mobile registry | 1 | `m/js/prj/prj-index.js` |
| Mock generators | 8 | `go/tests/mocks/gen_prj_*.go` |
| **Total** | ~126 files | |

---

## Prime Objects Summary (36 total)

| # | Submodule | Prime Object | ServiceName | Primary Key |
|---|-----------|-------------|-------------|-------------|
| 1 | Planning | PrjProject | PrjProj | ProjectId |
| 2 | Planning | PrjProjectTemplate | PrjProjTpl | TemplateId |
| 3 | Planning | PrjPhase | PrjPhase | PhaseId |
| 4 | Planning | PrjTask | PrjTask | TaskId |
| 5 | Planning | PrjMilestone | PrjMilstn | MilestoneId |
| 6 | Planning | PrjDeliverable | PrjDeliv | DeliverableId |
| 7 | Planning | PrjDependency | PrjDepend | DependencyId |
| 8 | Planning | PrjRisk | PrjRisk | RiskId |
| 9 | Resources | PrjResourcePool | PrjResPool | PoolId |
| 10 | Resources | PrjResource | PrjRes | ResourceId |
| 11 | Resources | PrjResourceSkill | PrjResSkl | SkillId |
| 12 | Resources | PrjAllocation | PrjAlloc | AllocationId |
| 13 | Resources | PrjBooking | PrjBooking | BookingId |
| 14 | Resources | PrjCapacityPlan | PrjCapPlan | PlanId |
| 15 | Resources | PrjUtilization | PrjUtil | UtilizationId |
| 16 | Time & Expense | PrjTimesheet | PrjTmSheet | TimesheetId |
| 17 | Time & Expense | PrjTimesheetEntry | PrjTmEntry | EntryId |
| 18 | Time & Expense | PrjExpenseReport | PrjExpRpt | ReportId |
| 19 | Time & Expense | PrjExpenseEntry | PrjExpEnt | EntryId |
| 20 | Time & Expense | PrjApprovalRule | PrjApprRl | RuleId |
| 21 | Time & Expense | PrjExpenseCategory | PrjExpCat | CategoryId |
| 22 | Time & Expense | PrjExpensePolicy | PrjExpPol | PolicyId |
| 23 | Billing | PrjBillingRate | PrjBillRt | RateId |
| 24 | Billing | PrjBillingSchedule | PrjBillSch | ScheduleId |
| 25 | Billing | PrjBillingMilestone | PrjBillMls | MilestoneId |
| 26 | Billing | PrjProjectInvoice | PrjInvoice | InvoiceId |
| 27 | Billing | PrjInvoiceLine | PrjInvLine | LineId |
| 28 | Billing | PrjRevenueRecognition | PrjRevRec | RecognitionId |
| 29 | Billing | PrjProjectBudget | PrjBudget | BudgetId |
| 30 | Analytics | PrjStatusReport | PrjStatus | StatusId |
| 31 | Analytics | PrjEarnedValue | PrjEV | EarnedValueId |
| 32 | Analytics | PrjBudgetVariance | PrjBudVar | VarianceId |
| 33 | Analytics | PrjResourceForecast | PrjResFcst | ForecastId |
| 34 | Analytics | PrjPortfolioView | PrjPortflo | ViewId |
| 35 | Analytics | PrjProjectKPI | PrjKPI | KpiId |
| 36 | Analytics | PrjProjectIssue | PrjIssue | IssueId |

**ServiceArea for ALL services: `byte(90)`**

**All ServiceName values are <= 10 characters.**

**All Proto type names and JS model names use `Prj` prefix.**
