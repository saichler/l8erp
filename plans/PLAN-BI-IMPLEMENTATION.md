# Business Intelligence Module - Implementation Plan

## Overview

Implement the Business Intelligence (BI) module following the exact patterns established by HCM, FIN, SCM, Sales, Manufacturing, CRM, and Projects. This covers 24 Prime Objects across 4 submodules: Reporting, Dashboards, Analytics, and Data Management.

Reference documents:
- `plans/ERP_MODULES.md` (Section 8)
- `plans/PLAN-PROJECTS-IMPLEMENTATION.md` (pattern reference)
- Global rules in `~/.claude/rules/`
- `l8ui/GUIDE.md` (Layer8 UI component usage)

### Global Rules Compliance

| Rule | How This Plan Complies |
|------|----------------------|
| **File Size < 500 lines** | Service files ~80 lines, callbacks ~240 lines. UI split per submodule (columns, forms, enums). All files stay well under 500 lines. |
| **No Duplicate Code** | Reuses `erp-common.proto` shared types (AuditInfo, DateRange). References HCM Employee, FIN entities, PRJ entities for cross-module analytics. Uses all Layer8 shared UI components. |
| **Future-Proof Design** | BI entities designed to aggregate data from ALL modules (HCM, FIN, SCM, Sales, MFG, CRM, PRJ). BiDataSource supports any module as data origin. |
| **Read Before Implementing** | Plan requires reading ALL existing module code (services, callbacks, protos, UI) before writing any BI code. |
| **Component Integration Analysis** | All ServiceArea assignments, endpoint construction, L8Query support, and initialization arguments are documented below. |
| **Demo Directory** | All UI work targets `go/erp/ui/web/`, never `go/demo/`. |
| **Single Responsibility** | One service per package (2 files each). UI split into columns/forms/enums per submodule. |
| **ServiceName <= 10 chars** | All 24 ServiceName constants are 10 characters or fewer. See Prime Objects Summary. |
| **ServiceArea same per Module** | All BI services use `ServiceArea = byte(35)`. |
| **ServiceCallback Auto-Generate ID** | All callbacks include `common.GenerateID()` in `Before()` for POST actions. See Section 3b. |
| **Vendor Dependencies** | Step 7 includes `go mod vendor` after proto generation. |
| **Mobile Parity** | Desktop and mobile UI are implemented together per mobile-parity.md. |
| **Mock Completeness** | All 24 services will have mock data generators per mock-completeness.md. |
| **Mock Endpoint Construction** | All endpoints use exact ServiceName constants per mock-endpoint-construction.md. |
| **JS Model Names** | All JS model names use `Bi` prefix matching protobuf types per js-protobuf-model-names.md. |
| **JS Field Names** | All JS field names match protobuf JSON tags per js-protobuf-field-names.md. |

---

## Step 0: Prerequisites

### 0a. Verify `erp-common.proto` exists

Shared `erp-common.proto` contains: Money, AuditInfo, Address, AddressType, ContactInfo, ContactType, DateRange. Already created during FIN implementation.

### 0b. Verify cross-module references

BI references entities from all other modules for analytics:

| Referenced Entity | Source Module | How BI Uses It |
|-------------------|--------------|----------------------|
| **Employee** | HCM (Core HR) | Report owners, dashboard creators, subscribers |
| **Department** | HCM (Core HR) | Department-level KPIs and dashboards |
| **Customer** | FIN (AR) | Customer analytics, segmentation |
| **Vendor** | FIN (AP) | Vendor performance analytics |
| **SalesOrder** | Sales | Sales analytics, forecasting |
| **PrjProject** | Projects | Project analytics, portfolio views |
| **MfgWorkOrder** | Manufacturing | Production analytics |
| **ScmPurchaseOrder** | SCM | Procurement analytics |
| **CrmOpportunity** | CRM | Pipeline analytics |

These are accessed via cross-module service calls. No duplication of these entities in BI protos.

### 0c. Future-Proof Note

BI is designed as the central analytics hub. All current and future modules will feed data into BI:
- **E-Commerce** will feed order data for e-commerce analytics
- **Compliance** will feed compliance metrics for risk dashboards
- **Documents** will feed document metrics for content analytics

---

## Step 1: Create Proto Files (prefix: `bi-`)

Create 5 proto files under `proto/`:

| File | Contents |
|------|----------|
| `bi-common.proto` | BI-specific shared types and enums. Imports `erp-common.proto`. |
| `bi-reporting.proto` | 6 Prime Objects: Report, ReportTemplate, ReportSchedule, ReportExecution, ReportAccess, ReportSubscription |
| `bi-dashboards.proto` | 6 Prime Objects: Dashboard, DashboardWidget, KPI, KPIThreshold, Drilldown, DashboardShare |
| `bi-analytics.proto` | 6 Prime Objects: DataCube, AnalysisModel, Prediction, TrendAnalysis, Scenario, Benchmark |
| `bi-datamanagement.proto` | 6 Prime Objects: DataSource, ETLJob, ETLSchedule, DataQualityRule, MasterDataConfig, DataGovernance |

### Key Rules

- Every Prime Object gets `// @PrimeObject` comment annotation
- **Every Prime Object MUST have a companion `<Name>List` message** (24 Prime Objects = 48 messages total)
- All use `package bi` and `option go_package = "./types/bi"`
- Import `bi-common.proto` and `api.proto`
- Enums start with `_UNSPECIFIED = 0`
- Include `erp.AuditInfo audit_info` as the last field on every Prime Object
- Use `map<string, string> custom_fields` for extensibility
- License header on every file
- **All type names use `Bi` prefix** (e.g., `BiReport`, not `Report`)

---

## Step 2: Generate Go Types via `make-bindings.sh`

Add to `proto/make-bindings.sh` after Projects docker runs:

```bash
# Business Intelligence
docker run --user "$(id -u):$(id -g)" -e PROTO=bi-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=bi-reporting.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=bi-dashboards.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=bi-analytics.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=bi-datamanagement.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
```

Generated files land in `go/types/bi/`.

Run: `cd proto/ && bash make-bindings.sh`

---

## Step 3: Create Go Services (24 services)

Create directory `go/erp/bi/` with 24 service packages. Each package has exactly 2 files.

**All BI services use `ServiceArea = byte(35)`.**

### Service Directory Listing (24 packages)

**Reporting** (`ServiceArea = byte(35)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `reports/` | `BiReport` | BiReport | ReportId |
| `reporttemplates/` | `BiRptTpl` | BiReportTemplate | TemplateId |
| `reportschedules/` | `BiRptSched` | BiReportSchedule | ScheduleId |
| `reportexecutions/` | `BiRptExec` | BiReportExecution | ExecutionId |
| `reportaccesses/` | `BiRptAccs` | BiReportAccess | AccessId |
| `reportsubscriptions/` | `BiRptSub` | BiReportSubscription | SubscriptionId |

**Dashboards** (`ServiceArea = byte(35)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `dashboards/` | `BiDashbrd` | BiDashboard | DashboardId |
| `dashboardwidgets/` | `BiWidget` | BiDashboardWidget | WidgetId |
| `kpis/` | `BiKPI` | BiKPI | KpiId |
| `kpithresholds/` | `BiKPIThrs` | BiKPIThreshold | ThresholdId |
| `drilldowns/` | `BiDrill` | BiDrilldown | DrilldownId |
| `dashboardshares/` | `BiDashShr` | BiDashboardShare | ShareId |

**Analytics** (`ServiceArea = byte(35)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `datacubes/` | `BiCube` | BiDataCube | CubeId |
| `analysismodels/` | `BiAnaModel` | BiAnalysisModel | ModelId |
| `predictions/` | `BiPredict` | BiPrediction | PredictionId |
| `trendanalyses/` | `BiTrend` | BiTrendAnalysis | AnalysisId |
| `scenarios/` | `BiScenario` | BiScenario | ScenarioId |
| `benchmarks/` | `BiBenchmrk` | BiBenchmark | BenchmarkId |

**Data Management** (`ServiceArea = byte(35)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `datasources/` | `BiDataSrc` | BiDataSource | SourceId |
| `etljobs/` | `BiETLJob` | BiETLJob | JobId |
| `etlschedules/` | `BiETLSched` | BiETLSchedule | ScheduleId |
| `dataqualityrules/` | `BiDQRule` | BiDataQualityRule | RuleId |
| `masterdataconfigs/` | `BiMDConfig` | BiMasterDataConfig | ConfigId |
| `datagovernances/` | `BiDataGov` | BiDataGovernance | GovernanceId |

---

## Step 3b: ServiceCallback Pattern

Every `*ServiceCallback.go` MUST include auto-generate ID in the `Before()` method:

```go
func (cb *BiReportServiceCallback) Before(any interface{}, action ifs.Action) error {
    entity, ok := any.(*bi.BiReport)
    if !ok {
        return fmt.Errorf("expected *bi.BiReport but got %T", any)
    }
    if action == ifs.POST {
        common.GenerateID(&entity.ReportId)
    }
    return validate(entity)
}
```

The primary key field name comes from the corresponding `*Service.go` file's `SetPrimaryKeys()` call.

---

## Step 4: Integrate BI into Centralized `erp_main.go`

**Important:** There is NO separate `bi_main.go` file. All modules are activated from the centralized `go/erp/main/erp_main.go`.

### 4a. Add BI Imports

Add BI service imports to `erp_main.go` after the existing Projects imports (all 24 packages).

### 4b. Add Function Call in main()

```go
    activateHCMServices(nic)
    activateFinServices(nic)
    activateSCMServices(nic)
    activateSalesServices(nic)
    activateMfgServices(nic)
    activateCrmServices(nic)
    activatePrjServices(nic)
    activateBiServices(nic)  // Add this line
```

### 4c. Create `activateBiServices()` Function

Add function after `activatePrjServices()` with all 24 service activations.

---

## Step 5: Register BI Types in UI

Add to `go/erp/ui/main.go`:

1. Add import: `"github.com/saichler/l8erp/go/types/bi"`
2. Add call: `registerBiTypes(resources)`
3. Create `registerBiTypes()` function with all 24 types (see pattern from Projects).

---

## Step 6: Create Desktop UI

### 6a. Directory Structure

Create `go/erp/ui/web/bi/` with this structure:

```
bi/
├── bi-config.js           # Module config with all services
├── bi-init.js             # Module initialization
├── bi.css                 # Module-specific styles
├── reporting/
│   ├── reporting-enums.js
│   ├── reporting-columns.js
│   ├── reporting-forms.js
│   └── reporting.js
├── dashboards/
│   ├── dashboards-enums.js
│   ├── dashboards-columns.js
│   ├── dashboards-forms.js
│   └── dashboards.js
├── analytics/
│   ├── analytics-enums.js
│   ├── analytics-columns.js
│   ├── analytics-forms.js
│   └── analytics.js
└── datamanagement/
    ├── datamanagement-enums.js
    ├── datamanagement-columns.js
    ├── datamanagement-forms.js
    └── datamanagement.js
```

### 6b. Module Config File: `bi/bi-config.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.Bi = window.Bi || {};

    Bi.modules = {
        'reporting': {
            label: 'Reporting',
            icon: '📄',
            services: [
                { key: 'reports', label: 'Reports', icon: '📊', endpoint: '/35/BiReport', model: 'BiReport' },
                { key: 'report-templates', label: 'Templates', icon: '📋', endpoint: '/35/BiRptTpl', model: 'BiReportTemplate' },
                { key: 'report-schedules', label: 'Schedules', icon: '🕐', endpoint: '/35/BiRptSched', model: 'BiReportSchedule' },
                { key: 'report-executions', label: 'Executions', icon: '▶️', endpoint: '/35/BiRptExec', model: 'BiReportExecution' },
                { key: 'report-accesses', label: 'Access Control', icon: '🔒', endpoint: '/35/BiRptAccs', model: 'BiReportAccess' },
                { key: 'report-subscriptions', label: 'Subscriptions', icon: '📬', endpoint: '/35/BiRptSub', model: 'BiReportSubscription' }
            ]
        },
        'dashboards': {
            label: 'Dashboards',
            icon: '📈',
            services: [
                { key: 'dashboards', label: 'Dashboards', icon: '📊', endpoint: '/35/BiDashbrd', model: 'BiDashboard' },
                { key: 'dashboard-widgets', label: 'Widgets', icon: '🧩', endpoint: '/35/BiWidget', model: 'BiDashboardWidget' },
                { key: 'kpis', label: 'KPIs', icon: '🎯', endpoint: '/35/BiKPI', model: 'BiKPI' },
                { key: 'kpi-thresholds', label: 'Thresholds', icon: '⚠️', endpoint: '/35/BiKPIThrs', model: 'BiKPIThreshold' },
                { key: 'drilldowns', label: 'Drilldowns', icon: '🔍', endpoint: '/35/BiDrill', model: 'BiDrilldown' },
                { key: 'dashboard-shares', label: 'Sharing', icon: '🔗', endpoint: '/35/BiDashShr', model: 'BiDashboardShare' }
            ]
        },
        'analytics': {
            label: 'Analytics',
            icon: '📉',
            services: [
                { key: 'data-cubes', label: 'Data Cubes', icon: '🧊', endpoint: '/35/BiCube', model: 'BiDataCube' },
                { key: 'analysis-models', label: 'Analysis Models', icon: '🔬', endpoint: '/35/BiAnaModel', model: 'BiAnalysisModel' },
                { key: 'predictions', label: 'Predictions', icon: '🔮', endpoint: '/35/BiPredict', model: 'BiPrediction' },
                { key: 'trend-analyses', label: 'Trend Analysis', icon: '📈', endpoint: '/35/BiTrend', model: 'BiTrendAnalysis' },
                { key: 'scenarios', label: 'Scenarios', icon: '🎭', endpoint: '/35/BiScenario', model: 'BiScenario' },
                { key: 'benchmarks', label: 'Benchmarks', icon: '📏', endpoint: '/35/BiBenchmrk', model: 'BiBenchmark' }
            ]
        },
        'datamanagement': {
            label: 'Data Management',
            icon: '🗄️',
            services: [
                { key: 'data-sources', label: 'Data Sources', icon: '🔌', endpoint: '/35/BiDataSrc', model: 'BiDataSource' },
                { key: 'etl-jobs', label: 'ETL Jobs', icon: '🔄', endpoint: '/35/BiETLJob', model: 'BiETLJob' },
                { key: 'etl-schedules', label: 'ETL Schedules', icon: '📅', endpoint: '/35/BiETLSched', model: 'BiETLSchedule' },
                { key: 'data-quality-rules', label: 'Data Quality', icon: '✅', endpoint: '/35/BiDQRule', model: 'BiDataQualityRule' },
                { key: 'master-data-configs', label: 'Master Data', icon: '📚', endpoint: '/35/BiMDConfig', model: 'BiMasterDataConfig' },
                { key: 'data-governances', label: 'Governance', icon: '🏛️', endpoint: '/35/BiDataGov', model: 'BiDataGovernance' }
            ]
        }
    };

    Bi.submodules = ['BiReporting', 'BiDashboards', 'BiAnalytics', 'BiDataManagement'];
})();
```

### 6c. Reporting Submodule Example Files

#### `reporting/reporting-enums.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.BiReporting = window.BiReporting || {};
    BiReporting.enums = {};

    // REPORT TYPE
    BiReporting.enums.REPORT_TYPE = {
        0: 'Unspecified',
        1: 'Standard',
        2: 'Ad-Hoc',
        3: 'Dashboard',
        4: 'Scheduled',
        5: 'Interactive'
    };

    // REPORT STATUS
    BiReporting.enums.REPORT_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Published',
        3: 'Archived',
        4: 'Deprecated'
    };

    BiReporting.enums.REPORT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated'
    };

    // EXECUTION STATUS
    BiReporting.enums.EXECUTION_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Running',
        3: 'Completed',
        4: 'Failed',
        5: 'Cancelled'
    };

    BiReporting.enums.EXECUTION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive'
    };

    // EXPORT FORMAT
    BiReporting.enums.EXPORT_FORMAT = {
        0: 'Unspecified',
        1: 'PDF',
        2: 'Excel',
        3: 'CSV',
        4: 'HTML',
        5: 'JSON'
    };

    // SCHEDULE FREQUENCY
    BiReporting.enums.SCHEDULE_FREQUENCY = {
        0: 'Unspecified',
        1: 'Once',
        2: 'Daily',
        3: 'Weekly',
        4: 'Monthly',
        5: 'Quarterly',
        6: 'Yearly'
    };

    // ACCESS LEVEL
    BiReporting.enums.ACCESS_LEVEL = {
        0: 'Unspecified',
        1: 'View',
        2: 'Execute',
        3: 'Edit',
        4: 'Admin'
    };

    // RENDERERS
    BiReporting.render = {};

    BiReporting.render.reportStatus = Layer8DRenderers.createStatusRenderer(
        BiReporting.enums.REPORT_STATUS,
        BiReporting.enums.REPORT_STATUS_CLASSES
    );

    BiReporting.render.executionStatus = Layer8DRenderers.createStatusRenderer(
        BiReporting.enums.EXECUTION_STATUS,
        BiReporting.enums.EXECUTION_STATUS_CLASSES
    );

    BiReporting.render.date = Layer8DRenderers.renderDate;
    BiReporting.render.dateTime = Layer8DRenderers.renderDateTime;
})();
```

#### `reporting/reporting-columns.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.BiReporting = window.BiReporting || {};

    const { renderDate, renderDateTime } = Layer8DRenderers;
    const render = BiReporting.render;
    const enums = BiReporting.enums;

    BiReporting.columns = {
        BiReport: [
            { key: 'reportId', label: 'ID', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'reportType',
                label: 'Type',
                sortKey: 'reportType',
                render: (item) => enums.REPORT_TYPE[item.reportType] || 'Unknown'
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.reportStatus(item.status)
            },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'category', label: 'Category', sortKey: 'category' },
            {
                key: 'lastExecuted',
                label: 'Last Run',
                sortKey: 'lastExecuted',
                render: (item) => renderDateTime(item.lastExecuted)
            }
        ],

        BiReportTemplate: [
            { key: 'templateId', label: 'ID', sortKey: 'templateId', filterKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            {
                key: 'reportType',
                label: 'Type',
                sortKey: 'reportType',
                render: (item) => enums.REPORT_TYPE[item.reportType] || 'Unknown'
            },
            { key: 'category', label: 'Category', sortKey: 'category' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

        BiReportSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'reportId', label: 'Report', sortKey: 'reportId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'frequency',
                label: 'Frequency',
                sortKey: 'frequency',
                render: (item) => enums.SCHEDULE_FREQUENCY[item.frequency] || 'Unknown'
            },
            {
                key: 'nextRun',
                label: 'Next Run',
                sortKey: 'nextRun',
                render: (item) => renderDateTime(item.nextRun)
            },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

        BiReportExecution: [
            { key: 'executionId', label: 'ID', sortKey: 'executionId', filterKey: 'executionId' },
            { key: 'reportId', label: 'Report', sortKey: 'reportId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.executionStatus(item.status)
            },
            {
                key: 'startTime',
                label: 'Started',
                sortKey: 'startTime',
                render: (item) => renderDateTime(item.startTime)
            },
            {
                key: 'endTime',
                label: 'Ended',
                sortKey: 'endTime',
                render: (item) => renderDateTime(item.endTime)
            },
            { key: 'executedBy', label: 'Executed By', sortKey: 'executedBy' },
            { key: 'rowCount', label: 'Rows', sortKey: 'rowCount' }
        ],

        BiReportAccess: [
            { key: 'accessId', label: 'ID', sortKey: 'accessId', filterKey: 'accessId' },
            { key: 'reportId', label: 'Report', sortKey: 'reportId' },
            { key: 'principalId', label: 'User/Role', sortKey: 'principalId' },
            { key: 'principalType', label: 'Type', sortKey: 'principalType' },
            {
                key: 'accessLevel',
                label: 'Access Level',
                sortKey: 'accessLevel',
                render: (item) => enums.ACCESS_LEVEL[item.accessLevel] || 'Unknown'
            }
        ],

        BiReportSubscription: [
            { key: 'subscriptionId', label: 'ID', sortKey: 'subscriptionId', filterKey: 'subscriptionId' },
            { key: 'reportId', label: 'Report', sortKey: 'reportId' },
            { key: 'subscriberId', label: 'Subscriber', sortKey: 'subscriberId' },
            {
                key: 'format',
                label: 'Format',
                sortKey: 'format',
                render: (item) => enums.EXPORT_FORMAT[item.format] || 'Unknown'
            },
            { key: 'deliveryEmail', label: 'Email', sortKey: 'deliveryEmail' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ]
    };
})();
```

#### `reporting/reporting-forms.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.BiReporting = window.BiReporting || {};

    const enums = BiReporting.enums;

    BiReporting.forms = {
        BiReport: {
            title: 'Report',
            sections: [
                {
                    title: 'Report Details',
                    fields: [
                        { key: 'code', label: 'Report Code', type: 'text', required: true },
                        { key: 'name', label: 'Report Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'reportType', label: 'Type', type: 'select', options: enums.REPORT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.REPORT_STATUS },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Data Source',
                    fields: [
                        { key: 'dataSourceId', label: 'Data Source', type: 'reference', lookupModel: 'BiDataSource' },
                        { key: 'query', label: 'Query/SQL', type: 'textarea' }
                    ]
                },
                {
                    title: 'Output',
                    fields: [
                        { key: 'defaultFormat', label: 'Default Format', type: 'select', options: enums.EXPORT_FORMAT },
                        { key: 'isPublic', label: 'Public', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiReportTemplate: {
            title: 'Report Template',
            sections: [
                {
                    title: 'Template Details',
                    fields: [
                        { key: 'name', label: 'Template Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'reportType', label: 'Report Type', type: 'select', options: enums.REPORT_TYPE },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'layoutTemplate', label: 'Layout Template', type: 'textarea' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiReportSchedule: {
            title: 'Report Schedule',
            sections: [
                {
                    title: 'Schedule Details',
                    fields: [
                        { key: 'reportId', label: 'Report', type: 'reference', lookupModel: 'BiReport', required: true },
                        { key: 'name', label: 'Schedule Name', type: 'text', required: true },
                        { key: 'frequency', label: 'Frequency', type: 'select', options: enums.SCHEDULE_FREQUENCY },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'runTime', label: 'Run Time', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiReportExecution: {
            title: 'Report Execution',
            sections: [
                {
                    title: 'Execution Details',
                    fields: [
                        { key: 'reportId', label: 'Report', type: 'reference', lookupModel: 'BiReport', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.EXECUTION_STATUS },
                        { key: 'parameters', label: 'Parameters', type: 'textarea' },
                        { key: 'errorMessage', label: 'Error Message', type: 'textarea' }
                    ]
                }
            ]
        },

        BiReportAccess: {
            title: 'Report Access',
            sections: [
                {
                    title: 'Access Details',
                    fields: [
                        { key: 'reportId', label: 'Report', type: 'reference', lookupModel: 'BiReport', required: true },
                        { key: 'principalId', label: 'User/Role ID', type: 'text', required: true },
                        { key: 'principalType', label: 'Principal Type', type: 'text' },
                        { key: 'accessLevel', label: 'Access Level', type: 'select', options: enums.ACCESS_LEVEL }
                    ]
                }
            ]
        },

        BiReportSubscription: {
            title: 'Report Subscription',
            sections: [
                {
                    title: 'Subscription Details',
                    fields: [
                        { key: 'reportId', label: 'Report', type: 'reference', lookupModel: 'BiReport', required: true },
                        { key: 'subscriberId', label: 'Subscriber', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'format', label: 'Format', type: 'select', options: enums.EXPORT_FORMAT },
                        { key: 'deliveryEmail', label: 'Delivery Email', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

    BiReporting.primaryKeys = {
        BiReport: 'reportId',
        BiReportTemplate: 'templateId',
        BiReportSchedule: 'scheduleId',
        BiReportExecution: 'executionId',
        BiReportAccess: 'accessId',
        BiReportSubscription: 'subscriptionId'
    };
})();
```

#### `reporting/reporting.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    // BiReporting namespace initialized by enum, column, and form files
    // This file can contain any additional reporting-specific logic
})();
```

### 6d. Module Init File: `bi/bi-init.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DModuleFactory.create({
        namespace: 'Bi',
        defaultModule: 'reporting',
        defaultService: 'reports',
        sectionSelector: 'reporting',
        initializerName: 'initializeBi',
        requiredNamespaces: ['BiReporting', 'BiDashboards', 'BiAnalytics', 'BiDataManagement']
    });
})();
```

### 6e. Section HTML: `sections/bi.html`

Create section HTML following the CRM/Manufacturing pattern with:
- Header with parallax effect and BI-themed SVG icons (charts, graphs, dashboards)
- Module tabs: Reporting, Dashboards, Analytics, Data Management
- Each module has subnav with all its services
- Table containers with IDs: `{module}-{service}-table-container`

Example structure:
```html
<div class="section-container hcm-section">
    <!-- Header with Parallax Effect (BI themed: charts, graphs, analytics) -->
    <div class="hcm-header-frame parallax-container">
        <!-- SVG with BI icons -->
    </div>

    <!-- Module Tabs -->
    <div class="hcm-module-tabs">
        <button class="hcm-module-tab active" data-module="reporting">📄 Reporting</button>
        <button class="hcm-module-tab" data-module="dashboards">📈 Dashboards</button>
        <button class="hcm-module-tab" data-module="analytics">📉 Analytics</button>
        <button class="hcm-module-tab" data-module="datamanagement">🗄️ Data Management</button>
    </div>

    <div class="section-content">
        <!-- Reporting Module (default active) -->
        <div class="hcm-module-content active" data-module="reporting">
            <nav class="hcm-subnav">
                <a class="hcm-subnav-item active" data-service="reports">📊 Reports</a>
                <a class="hcm-subnav-item" data-service="report-templates">📋 Templates</a>
                <a class="hcm-subnav-item" data-service="report-schedules">🕐 Schedules</a>
                <a class="hcm-subnav-item" data-service="report-executions">▶️ Executions</a>
                <a class="hcm-subnav-item" data-service="report-accesses">🔒 Access Control</a>
                <a class="hcm-subnav-item" data-service="report-subscriptions">📬 Subscriptions</a>
            </nav>
            <div class="hcm-service-content">
                <div class="hcm-service-view active" data-service="reports">
                    <div class="hcm-table-container" id="reporting-reports-table-container"></div>
                </div>
                <!-- ... other service views -->
            </div>
        </div>
        <!-- ... other modules -->
    </div>
</div>
```

### 6f. Wiring in `app.html`

Add after Projects scripts:

```html
<!-- BI CSS -->
<link rel="stylesheet" href="bi/bi.css">

<!-- BI Reference Registry -->
<script src="js/reference-registry-bi.js"></script>

<!-- BI Config -->
<script src="bi/bi-config.js"></script>

<!-- BI Submodules -->
<script src="bi/reporting/reporting-enums.js"></script>
<script src="bi/reporting/reporting-columns.js"></script>
<script src="bi/reporting/reporting-forms.js"></script>
<script src="bi/reporting/reporting.js"></script>

<script src="bi/dashboards/dashboards-enums.js"></script>
<script src="bi/dashboards/dashboards-columns.js"></script>
<script src="bi/dashboards/dashboards-forms.js"></script>
<script src="bi/dashboards/dashboards.js"></script>

<script src="bi/analytics/analytics-enums.js"></script>
<script src="bi/analytics/analytics-columns.js"></script>
<script src="bi/analytics/analytics-forms.js"></script>
<script src="bi/analytics/analytics.js"></script>

<script src="bi/datamanagement/datamanagement-enums.js"></script>
<script src="bi/datamanagement/datamanagement-columns.js"></script>
<script src="bi/datamanagement/datamanagement-forms.js"></script>
<script src="bi/datamanagement/datamanagement.js"></script>

<!-- BI Init (LAST) -->
<script src="bi/bi-init.js"></script>
```

### 6g. Wiring in `sections.js`

Add section mapping:

```javascript
const sections = {
    // ... existing sections
    bi: 'sections/bi.html'
};

const sectionInitializers = {
    // ... existing initializers
    bi: () => { if (typeof initializeBi === 'function') initializeBi(); }
};
```

---

## Step 7: Create Mobile UI (Mobile Parity)

### 7a. Directory Structure

Create `go/erp/ui/web/m/js/bi/` with files for each submodule:

```
m/js/bi/
├── reporting-enums.js
├── reporting-columns.js
├── reporting-forms.js
├── dashboards-enums.js
├── dashboards-columns.js
├── dashboards-forms.js
├── analytics-enums.js
├── analytics-columns.js
├── analytics-forms.js
├── datamanagement-enums.js
├── datamanagement-columns.js
├── datamanagement-forms.js
└── bi-index.js
```

### 7b. Mobile Registry: `m/js/bi/bi-index.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    const modules = [
        MobileBiReporting,
        MobileBiDashboards,
        MobileBiAnalytics,
        MobileBiDataManagement
    ];

    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) {
                return mod;
            }
        }
        return null;
    }

    window.MobileBi = {
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
            Reporting: MobileBiReporting,
            Dashboards: MobileBiDashboards,
            Analytics: MobileBiAnalytics,
            DataManagement: MobileBiDataManagement
        }
    };
})();
```

### 7c. Mobile Nav Config Update

In `l8ui/m/js/layer8m-nav-config.js`:

1. Add bi to modules list:
```javascript
{ key: 'bi', label: 'BI', icon: 'bi', hasSubModules: true }
```

2. Add full config block:
```javascript
bi: {
    subModules: [
        { key: 'reporting', label: 'Reporting', icon: 'bi' },
        { key: 'dashboards', label: 'Dashboards', icon: 'bi' },
        { key: 'analytics', label: 'Analytics', icon: 'bi' },
        { key: 'datamanagement', label: 'Data Management', icon: 'bi' }
    ],
    services: {
        'reporting': [
            { key: 'reports', label: 'Reports', icon: 'bi', endpoint: '/35/BiReport', model: 'BiReport', idField: 'reportId' },
            { key: 'report-templates', label: 'Templates', icon: 'bi', endpoint: '/35/BiRptTpl', model: 'BiReportTemplate', idField: 'templateId' },
            { key: 'report-schedules', label: 'Schedules', icon: 'bi', endpoint: '/35/BiRptSched', model: 'BiReportSchedule', idField: 'scheduleId' },
            { key: 'report-executions', label: 'Executions', icon: 'bi', endpoint: '/35/BiRptExec', model: 'BiReportExecution', idField: 'executionId' },
            { key: 'report-accesses', label: 'Access Control', icon: 'bi', endpoint: '/35/BiRptAccs', model: 'BiReportAccess', idField: 'accessId' },
            { key: 'report-subscriptions', label: 'Subscriptions', icon: 'bi', endpoint: '/35/BiRptSub', model: 'BiReportSubscription', idField: 'subscriptionId' }
        ],
        'dashboards': [
            { key: 'dashboards', label: 'Dashboards', icon: 'bi', endpoint: '/35/BiDashbrd', model: 'BiDashboard', idField: 'dashboardId' },
            { key: 'dashboard-widgets', label: 'Widgets', icon: 'bi', endpoint: '/35/BiWidget', model: 'BiDashboardWidget', idField: 'widgetId' },
            { key: 'kpis', label: 'KPIs', icon: 'bi', endpoint: '/35/BiKPI', model: 'BiKPI', idField: 'kpiId' },
            { key: 'kpi-thresholds', label: 'Thresholds', icon: 'bi', endpoint: '/35/BiKPIThrs', model: 'BiKPIThreshold', idField: 'thresholdId' },
            { key: 'drilldowns', label: 'Drilldowns', icon: 'bi', endpoint: '/35/BiDrill', model: 'BiDrilldown', idField: 'drilldownId' },
            { key: 'dashboard-shares', label: 'Sharing', icon: 'bi', endpoint: '/35/BiDashShr', model: 'BiDashboardShare', idField: 'shareId' }
        ],
        'analytics': [
            { key: 'data-cubes', label: 'Data Cubes', icon: 'bi', endpoint: '/35/BiCube', model: 'BiDataCube', idField: 'cubeId' },
            { key: 'analysis-models', label: 'Analysis Models', icon: 'bi', endpoint: '/35/BiAnaModel', model: 'BiAnalysisModel', idField: 'modelId' },
            { key: 'predictions', label: 'Predictions', icon: 'bi', endpoint: '/35/BiPredict', model: 'BiPrediction', idField: 'predictionId' },
            { key: 'trend-analyses', label: 'Trend Analysis', icon: 'bi', endpoint: '/35/BiTrend', model: 'BiTrendAnalysis', idField: 'analysisId' },
            { key: 'scenarios', label: 'Scenarios', icon: 'bi', endpoint: '/35/BiScenario', model: 'BiScenario', idField: 'scenarioId' },
            { key: 'benchmarks', label: 'Benchmarks', icon: 'bi', endpoint: '/35/BiBenchmrk', model: 'BiBenchmark', idField: 'benchmarkId' }
        ],
        'datamanagement': [
            { key: 'data-sources', label: 'Data Sources', icon: 'bi', endpoint: '/35/BiDataSrc', model: 'BiDataSource', idField: 'sourceId' },
            { key: 'etl-jobs', label: 'ETL Jobs', icon: 'bi', endpoint: '/35/BiETLJob', model: 'BiETLJob', idField: 'jobId' },
            { key: 'etl-schedules', label: 'ETL Schedules', icon: 'bi', endpoint: '/35/BiETLSched', model: 'BiETLSchedule', idField: 'scheduleId' },
            { key: 'data-quality-rules', label: 'Data Quality', icon: 'bi', endpoint: '/35/BiDQRule', model: 'BiDataQualityRule', idField: 'ruleId' },
            { key: 'master-data-configs', label: 'Master Data', icon: 'bi', endpoint: '/35/BiMDConfig', model: 'BiMasterDataConfig', idField: 'configId' },
            { key: 'data-governances', label: 'Governance', icon: 'bi', endpoint: '/35/BiDataGov', model: 'BiDataGovernance', idField: 'governanceId' }
        ]
    }
}
```

### 7d. Mobile Nav.js Update

In `layer8m-nav.js`, add `MobileBi` to registry lookups in `_getServiceColumns`, `_getServiceFormDef`, etc.

### 7e. Mobile app.html Update

Add script tags and sidebar link:

```html
<!-- BI Mobile Scripts -->
<script src="js/bi/reporting-enums.js"></script>
<script src="js/bi/reporting-columns.js"></script>
<script src="js/bi/reporting-forms.js"></script>
<script src="js/bi/dashboards-enums.js"></script>
<script src="js/bi/dashboards-columns.js"></script>
<script src="js/bi/dashboards-forms.js"></script>
<script src="js/bi/analytics-enums.js"></script>
<script src="js/bi/analytics-columns.js"></script>
<script src="js/bi/analytics-forms.js"></script>
<script src="js/bi/datamanagement-enums.js"></script>
<script src="js/bi/datamanagement-columns.js"></script>
<script src="js/bi/datamanagement-forms.js"></script>
<script src="js/bi/bi-index.js"></script>

<!-- Sidebar -->
<a href="#dashboard" class="sidebar-item" data-section="dashboard" data-module="bi">
    <span class="sidebar-item-icon"><!-- BI icon SVG --></span>
    BI
</a>
```

---

## Step 8: Reference Registry Updates

### CRITICAL: Verify Field Names First

Before writing registry entries, grep the .pb.go files:

```bash
grep -A 30 "type BiReport struct" go/types/bi/*.pb.go | grep 'json:"'
```

### Desktop Reference Registry

Create `js/reference-registry-bi.js`:

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DReferenceRegistry.register({
        // Reporting
        BiReport: {
            idColumn: 'reportId',
            displayColumn: 'name',
            selectColumns: ['reportId', 'code', 'name', 'status'],
            displayFormat: function(item) { return item.code + ' - ' + item.name; },
            displayLabel: 'Report'
        },
        BiReportTemplate: {
            idColumn: 'templateId',
            displayColumn: 'name',
            selectColumns: ['templateId', 'name'],
            displayLabel: 'Report Template'
        },
        BiReportSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'name',
            selectColumns: ['scheduleId', 'name', 'reportId'],
            displayLabel: 'Report Schedule'
        },
        BiReportExecution: {
            idColumn: 'executionId',
            displayColumn: 'executionId',
            selectColumns: ['executionId', 'reportId', 'status'],
            displayFormat: function(item) { return 'EXEC-' + item.executionId; },
            displayLabel: 'Report Execution'
        },

        // Dashboards
        BiDashboard: {
            idColumn: 'dashboardId',
            displayColumn: 'name',
            selectColumns: ['dashboardId', 'name', 'ownerId'],
            displayLabel: 'Dashboard'
        },
        BiDashboardWidget: {
            idColumn: 'widgetId',
            displayColumn: 'name',
            selectColumns: ['widgetId', 'name', 'widgetType'],
            displayLabel: 'Widget'
        },
        BiKPI: {
            idColumn: 'kpiId',
            displayColumn: 'name',
            selectColumns: ['kpiId', 'code', 'name'],
            displayFormat: function(item) { return item.code + ' - ' + item.name; },
            displayLabel: 'KPI'
        },

        // Analytics
        BiDataCube: {
            idColumn: 'cubeId',
            displayColumn: 'name',
            selectColumns: ['cubeId', 'name'],
            displayLabel: 'Data Cube'
        },
        BiAnalysisModel: {
            idColumn: 'modelId',
            displayColumn: 'name',
            selectColumns: ['modelId', 'name', 'modelType'],
            displayLabel: 'Analysis Model'
        },
        BiPrediction: {
            idColumn: 'predictionId',
            displayColumn: 'name',
            selectColumns: ['predictionId', 'name'],
            displayLabel: 'Prediction'
        },
        BiScenario: {
            idColumn: 'scenarioId',
            displayColumn: 'name',
            selectColumns: ['scenarioId', 'name'],
            displayLabel: 'Scenario'
        },

        // Data Management
        BiDataSource: {
            idColumn: 'sourceId',
            displayColumn: 'name',
            selectColumns: ['sourceId', 'name', 'sourceType'],
            displayLabel: 'Data Source'
        },
        BiETLJob: {
            idColumn: 'jobId',
            displayColumn: 'name',
            selectColumns: ['jobId', 'name', 'status'],
            displayLabel: 'ETL Job'
        },
        BiDataQualityRule: {
            idColumn: 'ruleId',
            displayColumn: 'name',
            selectColumns: ['ruleId', 'name', 'ruleType'],
            displayLabel: 'Data Quality Rule'
        }
    });
})();
```

### Mobile Reference Registry

Add same entries to `layer8m-reference-registry.js`.

---

## Step 9: Mock Data Generation

### Phase Ordering (24 services, 6 phases)

| Phase | Models | Dependencies |
|-------|--------|-------------|
| 1 | BiReportTemplate, BiDataSource, BiMasterDataConfig, BiDataGovernance | None (configuration) |
| 2 | BiReport, BiDashboard, BiKPI, BiETLJob, BiDataQualityRule | Phase 1 + HCM Employee |
| 3 | BiReportSchedule, BiReportAccess, BiReportSubscription, BiDashboardWidget, BiKPIThreshold, BiDrilldown, BiDashboardShare, BiETLSchedule | Phase 2 |
| 4 | BiDataCube, BiAnalysisModel | Phase 2 |
| 5 | BiPrediction, BiTrendAnalysis, BiScenario, BiBenchmark | Phase 4 |
| 6 | BiReportExecution | Phase 3 (scheduled reports) |

### Files to Create

| File | Contents |
|------|----------|
| `gen_bi_foundation.go` | Phase 1 (templates, data sources, governance) |
| `gen_bi_reporting.go` | Phases 2-3 (reports, schedules, access, subscriptions) |
| `gen_bi_dashboards.go` | Phases 2-3 (dashboards, widgets, KPIs, thresholds) |
| `gen_bi_analytics.go` | Phases 4-5 (cubes, models, predictions, scenarios) |
| `gen_bi_datamanagement.go` | Phases 1-3 (data sources, ETL, quality rules) |
| `bi_phases.go` | Phase orchestration (all phases) |

### Mock Data Store Additions

Add to `store.go`:

```go
// BI - Phase 1 (Configuration)
BiReportTemplateIDs     []string
BiDataSourceIDs         []string
BiMasterDataConfigIDs   []string
BiDataGovernanceIDs     []string

// BI - Phase 2 (Core)
BiReportIDs             []string
BiDashboardIDs          []string
BiKPIIDs                []string
BiETLJobIDs             []string
BiDataQualityRuleIDs    []string

// BI - Phase 3 (Dependent)
BiReportScheduleIDs     []string
BiReportAccessIDs       []string
BiReportSubscriptionIDs []string
BiDashboardWidgetIDs    []string
BiKPIThresholdIDs       []string
BiDrilldownIDs          []string
BiDashboardShareIDs     []string
BiETLScheduleIDs        []string

// BI - Phase 4 (Analytics Core)
BiDataCubeIDs           []string
BiAnalysisModelIDs      []string

// BI - Phase 5 (Analytics Dependent)
BiPredictionIDs         []string
BiTrendAnalysisIDs      []string
BiScenarioIDs           []string
BiBenchmarkIDs          []string

// BI - Phase 6 (Executions)
BiReportExecutionIDs    []string
```

---

## Step 10: Verify Build

1. Run `go build ./erp/bi/...`
2. Run `go vet ./erp/bi/...`
3. Run `go build ./erp/ui/...`
4. Verify UI loads in browser with BI section
5. Verify mobile card navigation shows BI
6. Run mock data generation

---

## Files Summary

### Files to Modify

| File | Change |
|------|--------|
| `proto/make-bindings.sh` | Add BI proto docker runs |
| `go/erp/main/erp_main.go` | Add BI imports and activation |
| `go/erp/ui/main.go` | Add registerBiTypes() |
| `go/erp/ui/web/js/sections.js` | Add `bi` section mapping and initializer |
| `go/erp/ui/web/app.html` | Add BI CSS + script tags |
| `l8ui/m/js/layer8m-nav-config.js` | Add BI module config |
| `l8ui/m/js/layer8m-nav.js` | Add `MobileBi` to registries |
| `m/app.html` | Add BI scripts + sidebar |
| Desktop reference registry | Add BI models |
| Mobile reference registry | Add BI models |
| `go/tests/mocks/store.go` | Add BI ID slices |
| `go/tests/mocks/data.go` | Add BI data arrays |
| `go/tests/mocks/main.go` | Add BI phase calls |

### Files to Create

| Category | Count | Location |
|----------|-------|----------|
| Proto files | 5 | `proto/bi-*.proto` |
| Go services | 48 | `go/erp/bi/<service>/` (24 packages x 2 files) |
| Desktop UI config | 2 | `bi/bi-{config,init}.js` |
| Desktop UI CSS | 1 | `bi/bi.css` |
| Desktop submodule files | 16 | `bi/<sub>/{enums,columns,forms,entry}.js` |
| Desktop section HTML | 1 | `sections/bi.html` |
| Desktop reference registry | 1 | `js/reference-registry-bi.js` |
| Mobile submodule files | 12 | `m/js/bi/*` |
| Mobile registry | 1 | `m/js/bi/bi-index.js` |
| Mock generators | 6 | `go/tests/mocks/gen_bi_*.go, bi_phases.go` |
| **Total** | ~93 files | |

---

## Prime Objects Summary (24 total)

| # | Submodule | Prime Object | ServiceName | Primary Key |
|---|-----------|-------------|-------------|-------------|
| 1 | Reporting | BiReport | BiReport | ReportId |
| 2 | Reporting | BiReportTemplate | BiRptTpl | TemplateId |
| 3 | Reporting | BiReportSchedule | BiRptSched | ScheduleId |
| 4 | Reporting | BiReportExecution | BiRptExec | ExecutionId |
| 5 | Reporting | BiReportAccess | BiRptAccs | AccessId |
| 6 | Reporting | BiReportSubscription | BiRptSub | SubscriptionId |
| 7 | Dashboards | BiDashboard | BiDashbrd | DashboardId |
| 8 | Dashboards | BiDashboardWidget | BiWidget | WidgetId |
| 9 | Dashboards | BiKPI | BiKPI | KpiId |
| 10 | Dashboards | BiKPIThreshold | BiKPIThrs | ThresholdId |
| 11 | Dashboards | BiDrilldown | BiDrill | DrilldownId |
| 12 | Dashboards | BiDashboardShare | BiDashShr | ShareId |
| 13 | Analytics | BiDataCube | BiCube | CubeId |
| 14 | Analytics | BiAnalysisModel | BiAnaModel | ModelId |
| 15 | Analytics | BiPrediction | BiPredict | PredictionId |
| 16 | Analytics | BiTrendAnalysis | BiTrend | AnalysisId |
| 17 | Analytics | BiScenario | BiScenario | ScenarioId |
| 18 | Analytics | BiBenchmark | BiBenchmrk | BenchmarkId |
| 19 | Data Management | BiDataSource | BiDataSrc | SourceId |
| 20 | Data Management | BiETLJob | BiETLJob | JobId |
| 21 | Data Management | BiETLSchedule | BiETLSched | ScheduleId |
| 22 | Data Management | BiDataQualityRule | BiDQRule | RuleId |
| 23 | Data Management | BiMasterDataConfig | BiMDConfig | ConfigId |
| 24 | Data Management | BiDataGovernance | BiDataGov | GovernanceId |

**ServiceArea for ALL services: `byte(35)`**

**All ServiceName values are <= 10 characters.**

**All Proto type names and JS model names use `Bi` prefix.**
