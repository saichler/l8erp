# CRM Module - Implementation Plan

## Overview

Implement the Customer Relationship Management (CRM) module following the exact patterns established by HCM, FIN, SCM, Sales, and Manufacturing. This covers 36 Prime Objects across 6 submodules: Lead Management, Opportunity Management, Account Management, Marketing, Customer Service, and Field Service.

Reference documents:
- `plans/ERP_MODULES.md` (Section 6)
- `plans/PLAN-MANUFACTURING-IMPLEMENTATION.md` (pattern reference)
- Global rules in `~/.claude/rules/`
- `l8ui/GUIDE.md` (Layer8 UI component usage)

### Global Rules Compliance

| Rule | How This Plan Complies |
|------|----------------------|
| **File Size < 500 lines** | Service files ~80 lines, callbacks ~240 lines. UI split per submodule (columns, forms, enums). All files stay well under 500 lines. |
| **No Duplicate Code** | Reuses `erp-common.proto` shared types (Money, AuditInfo, Address, DateRange). References Sales Customer/SalesOrder, HCM Employee, FIN Customer via cross-module service calls. Uses all Layer8 shared UI components. |
| **Future-Proof Design** | CRM entities will be referenced by Projects (project-based services), BI (sales analytics), and E-Commerce (customer portal). CrmAccount and CrmOpportunity are designed as shared entities. |
| **Read Before Implementing** | Plan requires reading ALL HCM, FIN, SCM, Sales, and Manufacturing code (services, callbacks, protos, UI) before writing any CRM code. |
| **Component Integration Analysis** | All ServiceArea assignments, endpoint construction, L8Query support, and initialization arguments are documented below. |
| **Demo Directory** | All UI work targets `go/erp/ui/web/`, never `go/demo/`. |
| **Single Responsibility** | One service per package (2 files each). UI split into columns/forms/enums per submodule. |
| **ServiceName <= 10 chars** | All 36 ServiceName constants are 10 characters or fewer. See Prime Objects Summary. |
| **ServiceArea same per Module** | All CRM services use `ServiceArea = byte(80)`. |
| **ServiceCallback Auto-Generate ID** | All callbacks include `common.GenerateID()` in `Before()` for POST actions. See Section 3b. |
| **Vendor Dependencies** | Step 7 includes `go mod vendor` after proto generation. |
| **Mobile Parity** | Desktop and mobile UI are implemented together per mobile-parity.md. |
| **Mock Completeness** | All 36 services will have mock data generators per mock-completeness.md. |
| **Mock Endpoint Construction** | All endpoints use exact ServiceName constants per mock-endpoint-construction.md. |
| **JS Model Names** | All JS model names use `Crm` prefix matching protobuf types per js-protobuf-model-names.md. |
| **JS Field Names** | All JS field names match protobuf JSON tags per js-protobuf-field-names.md. |

---

## Step 0: Prerequisites

### 0a. Verify `erp-common.proto` exists

Shared `erp-common.proto` contains: Money, AuditInfo, Address, AddressType, ContactInfo, ContactType, DateRange. Already created during FIN implementation.

### 0b. Verify cross-module references

CRM references entities from other modules:

| Referenced Entity | Source Module | How CRM Uses It |
|-------------------|--------------|-------------------|
| **Employee** | HCM (Core HR) | Sales reps, service technicians, account managers |
| **Customer** | FIN (AR) / Sales | Account records, billing information |
| **SalesOrder** | Sales (Orders) | Order history, opportunity conversion |
| **SalesQuotation** | Sales (Pricing) | Quotes linked to opportunities |
| **Item** | SCM (Inventory) | Products on opportunities, service parts |

These are accessed via cross-module service calls. No duplication of these entities in CRM protos.

### 0c. Future-Proof Note

CrmAccount (Account) and CrmOpportunity will also be referenced by future modules:
- **Projects** will reference CrmAccount for project-based consulting engagements
- **BI** will reference CrmOpportunity and CrmCampaign for sales/marketing analytics
- **E-Commerce** will reference CrmAccount for customer portal integration

---

## Step 1: Create Proto Files (prefix: `crm-`)

Create 7 proto files under `proto/`:

| File | Contents |
|------|----------|
| `crm-common.proto` | CRM-specific shared types and enums. Imports `erp-common.proto`. |
| `crm-leads.proto` | 6 Prime Objects: Lead, LeadSource, LeadScore, LeadActivity, LeadAssign, LeadConversion |
| `crm-opportunities.proto` | 6 Prime Objects: Opportunity, OppStage, OppCompetitor, OppProduct, OppTeam, OppActivity |
| `crm-accounts.proto` | 6 Prime Objects: Account, Contact, Interaction, Relationship, HealthScore, AccountPlan |
| `crm-marketing.proto` | 6 Prime Objects: Campaign, CampaignMember, EmailTemplate, MarketingList, CampaignResponse, CampaignROI |
| `crm-service.proto` | 6 Prime Objects: Case, CaseComment, KBArticle, SLA, Escalation, Survey |
| `crm-fieldservice.proto` | 6 Prime Objects: ServiceOrder, Technician, ServiceContract, ServiceSchedule, ServicePart, ServiceVisit |

### Key Rules

- Every Prime Object gets `// @PrimeObject` comment annotation
- **Every Prime Object MUST have a companion `<Name>List` message** (36 Prime Objects = 72 messages total)
- All use `package crm` and `option go_package = "./types/crm"`
- Import `crm-common.proto` and `api.proto`
- Enums start with `_UNSPECIFIED = 0`
- Include `erp.AuditInfo audit_info` as the last field on every Prime Object
- Use `map<string, string> custom_fields` for extensibility
- License header on every file
- **All type names use `Crm` prefix** (e.g., `CrmOpportunity`, not `Opportunity`)

---

## Step 2: Generate Go Types via `make-bindings.sh`

Add to `proto/make-bindings.sh` after Manufacturing docker runs:

```bash
# CRM
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-leads.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-opportunities.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-accounts.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-marketing.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-service.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-fieldservice.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
```

Generated files land in `go/types/crm/`.

Run: `cd proto/ && bash make-bindings.sh`

---

## Step 3: Create Go Services (36 services)

Create directory `go/erp/crm/` with 36 service packages. Each package has exactly 2 files.

**All CRM services use `ServiceArea = byte(80)`.**

### Service Directory Listing (36 packages)

**Lead Management** (`ServiceArea = byte(80)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `leads/` | `CrmLead` | CrmLead | LeadId |
| `leadsources/` | `CrmLeadSrc` | CrmLeadSource | SourceId |
| `leadscores/` | `CrmLdScore` | CrmLeadScore | ScoreId |
| `leadactivities/` | `CrmLdAct` | CrmLeadActivity | ActivityId |
| `leadassigns/` | `CrmLdAssn` | CrmLeadAssign | AssignmentId |
| `leadconversions/` | `CrmLdConv` | CrmLeadConversion | ConversionId |

**Opportunity Management** (`ServiceArea = byte(80)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `opportunities/` | `CrmOpp` | CrmOpportunity | OpportunityId |
| `oppstages/` | `CrmOppStg` | CrmOppStage | StageId |
| `oppcompetitors/` | `CrmOppComp` | CrmOppCompetitor | CompetitorId |
| `oppproducts/` | `CrmOppProd` | CrmOppProduct | LineId |
| `oppteams/` | `CrmOppTeam` | CrmOppTeam | MemberId |
| `oppactivities/` | `CrmOppAct` | CrmOppActivity | ActivityId |

**Account Management** (`ServiceArea = byte(80)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `accounts/` | `CrmAcct` | CrmAccount | AccountId |
| `contacts/` | `CrmContact` | CrmContact | ContactId |
| `interactions/` | `CrmIntrctn` | CrmInteraction | InteractionId |
| `relationships/` | `CrmRelshp` | CrmRelationship | RelationshipId |
| `healthscores/` | `CrmHealth` | CrmHealthScore | ScoreId |
| `accountplans/` | `CrmAcctPln` | CrmAccountPlan | PlanId |

**Marketing** (`ServiceArea = byte(80)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `campaigns/` | `CrmCmpgn` | CrmCampaign | CampaignId |
| `campaignmembers/` | `CrmCmpgMbr` | CrmCampaignMember | MemberId |
| `emailtemplates/` | `CrmEmailTp` | CrmEmailTemplate | TemplateId |
| `marketinglists/` | `CrmMktList` | CrmMarketingList | ListId |
| `campaignresponses/` | `CrmCmpgRsp` | CrmCampaignResponse | ResponseId |
| `campaignrois/` | `CrmCmpgROI` | CrmCampaignROI | RoiId |

**Customer Service** (`ServiceArea = byte(80)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `cases/` | `CrmCase` | CrmCase | CaseId |
| `casecomments/` | `CrmCaseCmt` | CrmCaseComment | CommentId |
| `kbarticles/` | `CrmKBart` | CrmKBArticle | ArticleId |
| `slas/` | `CrmSLA` | CrmSLA | SlaId |
| `escalations/` | `CrmEscal` | CrmEscalation | EscalationId |
| `surveys/` | `CrmSurvey` | CrmSurvey | SurveyId |

**Field Service** (`ServiceArea = byte(80)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `serviceorders/` | `CrmSvcOrd` | CrmServiceOrder | OrderId |
| `technicians/` | `CrmTech` | CrmTechnician | TechnicianId |
| `servicecontracts/` | `CrmSvcCntr` | CrmServiceContract | ContractId |
| `serviceschedules/` | `CrmSvcSchd` | CrmServiceSchedule | ScheduleId |
| `serviceparts/` | `CrmSvcPart` | CrmServicePart | PartId |
| `servicevisits/` | `CrmSvcVst` | CrmServiceVisit | VisitId |

---

## Step 4: Integrate CRM into Centralized `erp_main.go`

**Important:** There is NO separate `crm_main.go` file. All modules are activated from the centralized `go/erp/main/erp_main.go`.

### 4a. Add CRM Imports

Add CRM service imports to `erp_main.go` after the existing Manufacturing imports (all 36 packages).

### 4b. Add Function Call in main()

```go
    activateHCMServices(nic)
    activateFinServices(nic)
    activateSCMServices(nic)
    activateSalesServices(nic)
    activateMfgServices(nic)
    activateCrmServices(nic)  // Add this line
```

### 4c. Create `activateCrmServices()` Function

Add function after `activateMfgServices()` with all 36 service activations.

---

## Step 5: Register CRM Types in UI

Add to `go/erp/ui/main.go`:

1. Add import: `"github.com/saichler/l8erp/go/types/crm"`
2. Add call: `registerCrmTypes(resources)`
3. Create `registerCrmTypes()` function with all 36 types (see pattern from Manufacturing).

---

## Step 6: Create Desktop UI

### 6a. Directory Structure

Create `go/erp/ui/web/crm/` with this structure:

```
crm/
├── crm-config.js           # Module config with all services
├── crm-init.js             # Module initialization
├── crm.css                 # Module-specific styles
├── leads/
│   ├── leads-enums.js
│   ├── leads-columns.js
│   ├── leads-forms.js
│   └── leads.js
├── opportunities/
│   ├── opportunities-enums.js
│   ├── opportunities-columns.js
│   ├── opportunities-forms.js
│   └── opportunities.js
├── accounts/
│   ├── accounts-enums.js
│   ├── accounts-columns.js
│   ├── accounts-forms.js
│   └── accounts.js
├── marketing/
│   ├── marketing-enums.js
│   ├── marketing-columns.js
│   ├── marketing-forms.js
│   └── marketing.js
├── service/
│   ├── service-enums.js
│   ├── service-columns.js
│   ├── service-forms.js
│   └── service.js
└── fieldservice/
    ├── fieldservice-enums.js
    ├── fieldservice-columns.js
    ├── fieldservice-forms.js
    └── fieldservice.js
```

### 6b. Module Config File: `crm/crm-config.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.Crm = window.Crm || {};

    Crm.modules = {
        'leads': {
            label: 'Leads',
            icon: '🎯',
            services: [
                { key: 'leads', label: 'Leads', icon: '👤', endpoint: '/80/CrmLead', model: 'CrmLead' },
                { key: 'lead-sources', label: 'Lead Sources', icon: '📥', endpoint: '/80/CrmLeadSrc', model: 'CrmLeadSource' },
                { key: 'lead-scores', label: 'Lead Scores', icon: '📊', endpoint: '/80/CrmLdScore', model: 'CrmLeadScore' },
                { key: 'lead-activities', label: 'Activities', icon: '📝', endpoint: '/80/CrmLdAct', model: 'CrmLeadActivity' },
                { key: 'lead-assigns', label: 'Assignments', icon: '👥', endpoint: '/80/CrmLdAssn', model: 'CrmLeadAssign' },
                { key: 'lead-conversions', label: 'Conversions', icon: '✅', endpoint: '/80/CrmLdConv', model: 'CrmLeadConversion' }
            ]
        },
        'opportunities': {
            label: 'Opportunities',
            icon: '💼',
            services: [
                { key: 'opportunities', label: 'Opportunities', icon: '💰', endpoint: '/80/CrmOpp', model: 'CrmOpportunity' },
                { key: 'opp-stages', label: 'Sales Stages', icon: '📈', endpoint: '/80/CrmOppStg', model: 'CrmOppStage' },
                { key: 'opp-competitors', label: 'Competitors', icon: '🏆', endpoint: '/80/CrmOppComp', model: 'CrmOppCompetitor' },
                { key: 'opp-products', label: 'Products', icon: '📦', endpoint: '/80/CrmOppProd', model: 'CrmOppProduct' },
                { key: 'opp-teams', label: 'Teams', icon: '👥', endpoint: '/80/CrmOppTeam', model: 'CrmOppTeam' },
                { key: 'opp-activities', label: 'Activities', icon: '📝', endpoint: '/80/CrmOppAct', model: 'CrmOppActivity' }
            ]
        },
        'accounts': {
            label: 'Accounts',
            icon: '🏢',
            services: [
                { key: 'accounts', label: 'Accounts', icon: '🏢', endpoint: '/80/CrmAcct', model: 'CrmAccount' },
                { key: 'contacts', label: 'Contacts', icon: '👤', endpoint: '/80/CrmContact', model: 'CrmContact' },
                { key: 'interactions', label: 'Interactions', icon: '💬', endpoint: '/80/CrmIntrctn', model: 'CrmInteraction' },
                { key: 'relationships', label: 'Relationships', icon: '🔗', endpoint: '/80/CrmRelshp', model: 'CrmRelationship' },
                { key: 'health-scores', label: 'Health Scores', icon: '❤️', endpoint: '/80/CrmHealth', model: 'CrmHealthScore' },
                { key: 'account-plans', label: 'Account Plans', icon: '📋', endpoint: '/80/CrmAcctPln', model: 'CrmAccountPlan' }
            ]
        },
        'marketing': {
            label: 'Marketing',
            icon: '📣',
            services: [
                { key: 'campaigns', label: 'Campaigns', icon: '📢', endpoint: '/80/CrmCmpgn', model: 'CrmCampaign' },
                { key: 'campaign-members', label: 'Members', icon: '👥', endpoint: '/80/CrmCmpgMbr', model: 'CrmCampaignMember' },
                { key: 'email-templates', label: 'Email Templates', icon: '✉️', endpoint: '/80/CrmEmailTp', model: 'CrmEmailTemplate' },
                { key: 'marketing-lists', label: 'Lists', icon: '📋', endpoint: '/80/CrmMktList', model: 'CrmMarketingList' },
                { key: 'campaign-responses', label: 'Responses', icon: '📩', endpoint: '/80/CrmCmpgRsp', model: 'CrmCampaignResponse' },
                { key: 'campaign-rois', label: 'ROI Tracking', icon: '📊', endpoint: '/80/CrmCmpgROI', model: 'CrmCampaignROI' }
            ]
        },
        'service': {
            label: 'Service',
            icon: '🎧',
            services: [
                { key: 'cases', label: 'Cases', icon: '📁', endpoint: '/80/CrmCase', model: 'CrmCase' },
                { key: 'case-comments', label: 'Comments', icon: '💬', endpoint: '/80/CrmCaseCmt', model: 'CrmCaseComment' },
                { key: 'kb-articles', label: 'Knowledge Base', icon: '📚', endpoint: '/80/CrmKBart', model: 'CrmKBArticle' },
                { key: 'slas', label: 'SLAs', icon: '⏱️', endpoint: '/80/CrmSLA', model: 'CrmSLA' },
                { key: 'escalations', label: 'Escalations', icon: '⚠️', endpoint: '/80/CrmEscal', model: 'CrmEscalation' },
                { key: 'surveys', label: 'Surveys', icon: '📝', endpoint: '/80/CrmSurvey', model: 'CrmSurvey' }
            ]
        },
        'fieldservice': {
            label: 'Field Service',
            icon: '🔧',
            services: [
                { key: 'service-orders', label: 'Service Orders', icon: '📋', endpoint: '/80/CrmSvcOrd', model: 'CrmServiceOrder' },
                { key: 'technicians', label: 'Technicians', icon: '👷', endpoint: '/80/CrmTech', model: 'CrmTechnician' },
                { key: 'service-contracts', label: 'Contracts', icon: '📄', endpoint: '/80/CrmSvcCntr', model: 'CrmServiceContract' },
                { key: 'service-schedules', label: 'Schedules', icon: '📅', endpoint: '/80/CrmSvcSchd', model: 'CrmServiceSchedule' },
                { key: 'service-parts', label: 'Parts', icon: '🔩', endpoint: '/80/CrmSvcPart', model: 'CrmServicePart' },
                { key: 'service-visits', label: 'Visits', icon: '🚗', endpoint: '/80/CrmSvcVst', model: 'CrmServiceVisit' }
            ]
        }
    };

    Crm.submodules = ['CrmLeads', 'CrmOpportunities', 'CrmAccounts', 'CrmMarketing', 'CrmService', 'CrmFieldService'];
})();
```

### 6c. Opportunity Submodule Example Files

#### `opportunities/opportunities-enums.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.CrmOpportunities = window.CrmOpportunities || {};
    CrmOpportunities.enums = {};

    // OPPORTUNITY STATUS
    CrmOpportunities.enums.OPPORTUNITY_STATUS = {
        0: 'Unspecified',
        1: 'Open',
        2: 'Won',
        3: 'Lost',
        4: 'On Hold',
        5: 'Cancelled'
    };

    CrmOpportunities.enums.OPPORTUNITY_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-terminated',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-terminated'
    };

    // SALES STAGE
    CrmOpportunities.enums.SALES_STAGE = {
        0: 'Unspecified',
        1: 'Prospecting',
        2: 'Qualification',
        3: 'Needs Analysis',
        4: 'Value Proposition',
        5: 'Decision Makers',
        6: 'Proposal',
        7: 'Negotiation',
        8: 'Closed Won',
        9: 'Closed Lost'
    };

    CrmOpportunities.enums.SALES_STAGE_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-active',
        7: 'layer8d-status-active',
        8: 'layer8d-status-active',
        9: 'layer8d-status-terminated'
    };

    // ACTIVITY TYPE
    CrmOpportunities.enums.ACTIVITY_TYPE = {
        0: 'Unspecified',
        1: 'Call',
        2: 'Email',
        3: 'Meeting',
        4: 'Demo',
        5: 'Proposal',
        6: 'Follow-up'
    };

    // RENDERERS
    CrmOpportunities.render = {};

    CrmOpportunities.render.opportunityStatus = Layer8DRenderers.createStatusRenderer(
        CrmOpportunities.enums.OPPORTUNITY_STATUS,
        CrmOpportunities.enums.OPPORTUNITY_STATUS_CLASSES
    );

    CrmOpportunities.render.salesStage = Layer8DRenderers.createStatusRenderer(
        CrmOpportunities.enums.SALES_STAGE,
        CrmOpportunities.enums.SALES_STAGE_CLASSES
    );

    CrmOpportunities.render.date = Layer8DRenderers.renderDate;
    CrmOpportunities.render.money = Layer8DRenderers.renderMoney;
})();
```

#### `opportunities/opportunities-columns.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.CrmOpportunities = window.CrmOpportunities || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = CrmOpportunities.render;
    const enums = CrmOpportunities.enums;

    CrmOpportunities.columns = {
        CrmOpportunity: [
            { key: 'opportunityId', label: 'ID', sortKey: 'opportunityId', filterKey: 'opportunityId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            {
                key: 'amount',
                label: 'Amount',
                sortKey: 'amount',
                render: (item) => renderMoney(item.amount)
            },
            {
                key: 'stage',
                label: 'Stage',
                sortKey: 'stage',
                render: (item) => render.salesStage(item.stage)
            },
            { key: 'probability', label: 'Prob %', sortKey: 'probability' },
            {
                key: 'closeDate',
                label: 'Close Date',
                sortKey: 'closeDate',
                render: (item) => renderDate(item.closeDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.opportunityStatus(item.status)
            }
        ],

        CrmOppStage: [
            { key: 'stageId', label: 'ID', sortKey: 'stageId', filterKey: 'stageId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'sequence', label: 'Sequence', sortKey: 'sequence' },
            { key: 'probability', label: 'Default Prob %', sortKey: 'probability' },
            { key: 'isClosed', label: 'Is Closed', sortKey: 'isClosed' },
            { key: 'isWon', label: 'Is Won', sortKey: 'isWon' }
        ],

        CrmOppCompetitor: [
            { key: 'competitorId', label: 'ID', sortKey: 'competitorId', filterKey: 'competitorId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId' },
            { key: 'name', label: 'Competitor', sortKey: 'name', filterKey: 'name' },
            { key: 'strengths', label: 'Strengths', sortKey: 'strengths' },
            { key: 'weaknesses', label: 'Weaknesses', sortKey: 'weaknesses' },
            { key: 'threatLevel', label: 'Threat', sortKey: 'threatLevel' }
        ],

        CrmOppProduct: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId' },
            { key: 'productId', label: 'Product', sortKey: 'productId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            {
                key: 'unitPrice',
                label: 'Unit Price',
                sortKey: 'unitPrice',
                render: (item) => renderMoney(item.unitPrice)
            },
            {
                key: 'totalPrice',
                label: 'Total',
                sortKey: 'totalPrice',
                render: (item) => renderMoney(item.totalPrice)
            }
        ],

        CrmOppTeam: [
            { key: 'memberId', label: 'ID', sortKey: 'memberId', filterKey: 'memberId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId' },
            { key: 'role', label: 'Role', sortKey: 'role' },
            { key: 'isPrimary', label: 'Primary', sortKey: 'isPrimary' }
        ],

        CrmOppActivity: [
            { key: 'activityId', label: 'ID', sortKey: 'activityId', filterKey: 'activityId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId' },
            {
                key: 'activityType',
                label: 'Type',
                sortKey: 'activityType',
                render: (item) => enums.ACTIVITY_TYPE[item.activityType] || 'Unknown'
            },
            { key: 'subject', label: 'Subject', sortKey: 'subject' },
            {
                key: 'activityDate',
                label: 'Date',
                sortKey: 'activityDate',
                render: (item) => renderDate(item.activityDate)
            },
            { key: 'assignedTo', label: 'Assigned To', sortKey: 'assignedTo' }
        ]
    };
})();
```

#### `opportunities/opportunities-forms.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.CrmOpportunities = window.CrmOpportunities || {};

    const enums = CrmOpportunities.enums;

    CrmOpportunities.forms = {
        CrmOpportunity: {
            title: 'Opportunity',
            sections: [
                {
                    title: 'Opportunity Details',
                    fields: [
                        { key: 'name', label: 'Opportunity Name', type: 'text', required: true },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'primaryContactId', label: 'Primary Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'amount', label: 'Amount', type: 'money' },
                        { key: 'stage', label: 'Stage', type: 'select', options: enums.SALES_STAGE },
                        { key: 'probability', label: 'Probability %', type: 'number' },
                        { key: 'closeDate', label: 'Expected Close Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.OPPORTUNITY_STATUS },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'leadSourceId', label: 'Lead Source', type: 'reference', lookupModel: 'CrmLeadSource' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'nextStep', label: 'Next Step', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmOppStage: {
            title: 'Sales Stage',
            sections: [
                {
                    title: 'Stage Details',
                    fields: [
                        { key: 'name', label: 'Stage Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'sequence', label: 'Sequence', type: 'number', required: true },
                        { key: 'probability', label: 'Default Probability %', type: 'number' },
                        { key: 'isClosed', label: 'Is Closed Stage', type: 'checkbox' },
                        { key: 'isWon', label: 'Is Won Stage', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmOppCompetitor: {
            title: 'Competitor',
            sections: [
                {
                    title: 'Competitor Details',
                    fields: [
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity', required: true },
                        { key: 'name', label: 'Competitor Name', type: 'text', required: true },
                        { key: 'website', label: 'Website', type: 'text' },
                        { key: 'strengths', label: 'Strengths', type: 'textarea' },
                        { key: 'weaknesses', label: 'Weaknesses', type: 'textarea' },
                        { key: 'threatLevel', label: 'Threat Level', type: 'text' }
                    ]
                }
            ]
        },

        CrmOppProduct: {
            title: 'Opportunity Product',
            sections: [
                {
                    title: 'Product Line',
                    fields: [
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity', required: true },
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                        { key: 'discount', label: 'Discount %', type: 'number' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmOppTeam: {
            title: 'Opportunity Team Member',
            sections: [
                {
                    title: 'Team Member',
                    fields: [
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity', required: true },
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'role', label: 'Role', type: 'text' },
                        { key: 'isPrimary', label: 'Primary Owner', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmOppActivity: {
            title: 'Opportunity Activity',
            sections: [
                {
                    title: 'Activity Details',
                    fields: [
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity', required: true },
                        { key: 'activityType', label: 'Type', type: 'select', options: enums.ACTIVITY_TYPE, required: true },
                        { key: 'subject', label: 'Subject', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'activityDate', label: 'Date', type: 'date' },
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isCompleted', label: 'Completed', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

    CrmOpportunities.primaryKeys = {
        CrmOpportunity: 'opportunityId',
        CrmOppStage: 'stageId',
        CrmOppCompetitor: 'competitorId',
        CrmOppProduct: 'lineId',
        CrmOppTeam: 'memberId',
        CrmOppActivity: 'activityId'
    };
})();
```

#### `opportunities/opportunities.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    // CrmOpportunities namespace initialized by enum, column, and form files
    // This file can contain any additional opportunity-specific logic
})();
```

### 6d. Module Init File: `crm/crm-init.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DModuleFactory.create({
        namespace: 'Crm',
        defaultModule: 'opportunities',
        defaultService: 'opportunities',
        sectionSelector: 'crm',
        initializerName: 'initializeCrm',
        requiredNamespaces: ['CrmLeads', 'CrmOpportunities', 'CrmAccounts', 'CrmMarketing', 'CrmService', 'CrmFieldService']
    });
})();
```

### 6e. Section HTML: `sections/crm.html`

Create section HTML following the Manufacturing pattern with:
- Header with parallax effect and CRM-themed SVG icons (handshakes, targets, headsets)
- Module tabs: Leads, Opportunities, Accounts, Marketing, Service, Field Service
- Each module has subnav with all its services
- Table containers with IDs: `{module}-{service}-table-container`

Example structure:
```html
<div class="section-container hcm-section">
    <!-- Header with Parallax Effect (CRM themed: handshakes, targets, customer icons) -->
    <div class="hcm-header-frame parallax-container">
        <!-- SVG with CRM icons -->
    </div>

    <!-- Module Tabs -->
    <div class="hcm-module-tabs">
        <button class="hcm-module-tab" data-module="leads">🎯 Leads</button>
        <button class="hcm-module-tab active" data-module="opportunities">💼 Opportunities</button>
        <button class="hcm-module-tab" data-module="accounts">🏢 Accounts</button>
        <button class="hcm-module-tab" data-module="marketing">📣 Marketing</button>
        <button class="hcm-module-tab" data-module="service">🎧 Service</button>
        <button class="hcm-module-tab" data-module="fieldservice">🔧 Field Service</button>
    </div>

    <div class="section-content">
        <!-- Opportunities Module (default active) -->
        <div class="hcm-module-content active" data-module="opportunities">
            <nav class="hcm-subnav">
                <a class="hcm-subnav-item active" data-service="opportunities">💰 Opportunities</a>
                <a class="hcm-subnav-item" data-service="opp-stages">📈 Sales Stages</a>
                <!-- ... other services -->
            </nav>
            <div class="hcm-service-content">
                <div class="hcm-service-view active" data-service="opportunities">
                    <div class="hcm-table-container" id="opportunities-opportunities-table-container"></div>
                </div>
                <!-- ... other service views -->
            </div>
        </div>
        <!-- ... other modules -->
    </div>
</div>
```

### 6f. Wiring in `app.html`

Add after Manufacturing scripts:

```html
<!-- CRM CSS -->
<link rel="stylesheet" href="crm/crm.css">

<!-- CRM Config -->
<script src="crm/crm-config.js"></script>

<!-- CRM Submodules -->
<script src="crm/leads/leads-enums.js"></script>
<script src="crm/leads/leads-columns.js"></script>
<script src="crm/leads/leads-forms.js"></script>
<script src="crm/leads/leads.js"></script>

<script src="crm/opportunities/opportunities-enums.js"></script>
<script src="crm/opportunities/opportunities-columns.js"></script>
<script src="crm/opportunities/opportunities-forms.js"></script>
<script src="crm/opportunities/opportunities.js"></script>

<script src="crm/accounts/accounts-enums.js"></script>
<script src="crm/accounts/accounts-columns.js"></script>
<script src="crm/accounts/accounts-forms.js"></script>
<script src="crm/accounts/accounts.js"></script>

<script src="crm/marketing/marketing-enums.js"></script>
<script src="crm/marketing/marketing-columns.js"></script>
<script src="crm/marketing/marketing-forms.js"></script>
<script src="crm/marketing/marketing.js"></script>

<script src="crm/service/service-enums.js"></script>
<script src="crm/service/service-columns.js"></script>
<script src="crm/service/service-forms.js"></script>
<script src="crm/service/service.js"></script>

<script src="crm/fieldservice/fieldservice-enums.js"></script>
<script src="crm/fieldservice/fieldservice-columns.js"></script>
<script src="crm/fieldservice/fieldservice-forms.js"></script>
<script src="crm/fieldservice/fieldservice.js"></script>

<!-- CRM Init (LAST) -->
<script src="crm/crm-init.js"></script>
```

### 6g. Wiring in `sections.js`

Add section mapping:

```javascript
const sections = {
    // ... existing sections
    crm: 'sections/crm.html'
};

const sectionInitializers = {
    // ... existing initializers
    crm: () => { if (typeof initializeCrm === 'function') initializeCrm(); }
};
```

---

## Step 7: Create Mobile UI (Mobile Parity)

### 7a. Directory Structure

Create `go/erp/ui/web/m/js/crm/` with files for each submodule:

```
m/js/crm/
├── leads-enums.js
├── leads-columns.js
├── leads-forms.js
├── opportunities-enums.js
├── opportunities-columns.js
├── opportunities-forms.js
├── accounts-enums.js
├── accounts-columns.js
├── accounts-forms.js
├── marketing-enums.js
├── marketing-columns.js
├── marketing-forms.js
├── service-enums.js
├── service-columns.js
├── service-forms.js
├── fieldservice-enums.js
├── fieldservice-columns.js
├── fieldservice-forms.js
└── crm-index.js
```

### 7b. Mobile Registry: `m/js/crm/crm-index.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    const modules = [
        MobileCrmLeads,
        MobileCrmOpportunities,
        MobileCrmAccounts,
        MobileCrmMarketing,
        MobileCrmService,
        MobileCrmFieldService
    ];

    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) {
                return mod;
            }
        }
        return null;
    }

    window.MobileCrm = {
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
            Leads: MobileCrmLeads,
            Opportunities: MobileCrmOpportunities,
            Accounts: MobileCrmAccounts,
            Marketing: MobileCrmMarketing,
            Service: MobileCrmService,
            FieldService: MobileCrmFieldService
        }
    };
})();
```

### 7c. Mobile Nav Config Update

In `l8ui/m/js/layer8m-nav-config.js`:

1. Add crm to modules list:
```javascript
{ key: 'crm', label: 'CRM', icon: 'crm', hasSubModules: true }
```

2. Add full config block:
```javascript
crm: {
    subModules: [
        { key: 'leads', label: 'Leads', icon: 'crm' },
        { key: 'opportunities', label: 'Opportunities', icon: 'crm' },
        { key: 'accounts', label: 'Accounts', icon: 'crm' },
        { key: 'marketing', label: 'Marketing', icon: 'crm' },
        { key: 'service', label: 'Service', icon: 'crm' },
        { key: 'fieldservice', label: 'Field Service', icon: 'crm' }
    ],
    services: {
        'leads': [
            { key: 'leads', label: 'Leads', icon: 'crm', endpoint: '/80/CrmLead', model: 'CrmLead', idField: 'leadId' },
            { key: 'lead-sources', label: 'Lead Sources', icon: 'crm', endpoint: '/80/CrmLeadSrc', model: 'CrmLeadSource', idField: 'sourceId' },
            // ... all lead services
        ],
        'opportunities': [
            { key: 'opportunities', label: 'Opportunities', icon: 'crm', endpoint: '/80/CrmOpp', model: 'CrmOpportunity', idField: 'opportunityId' },
            // ... all opportunity services
        ],
        // ... all other submodules
    }
}
```

### 7d. Mobile Nav.js Update

In `layer8m-nav.js`, add `MobileCrm` to registry lookups in `_getServiceColumns`, `_getServiceFormDef`, etc.

### 7e. Mobile app.html Update

Add script tags and sidebar link:

```html
<!-- CRM Mobile Scripts -->
<script src="js/crm/leads-enums.js"></script>
<script src="js/crm/leads-columns.js"></script>
<script src="js/crm/leads-forms.js"></script>
<!-- ... all submodule files -->
<script src="js/crm/crm-index.js"></script>

<!-- Sidebar -->
<a href="#dashboard" class="sidebar-item" data-section="dashboard" data-module="crm">
    <span class="sidebar-item-icon"><!-- CRM icon SVG --></span>
    CRM
</a>
```

---

## Step 8: Reference Registry Updates

### CRITICAL: Verify Field Names First

Before writing registry entries, grep the .pb.go files:

```bash
grep -A 30 "type CrmOpportunity struct" go/types/crm/*.pb.go | grep 'json:"'
```

### Desktop Reference Registry

Add to `reference-registry-*.js`:

```javascript
// CRM models
CrmLead: {
    idColumn: 'leadId',
    displayColumn: 'name',
    selectColumns: ['leadId', 'name', 'email', 'company'],
    displayFormat: function(item) { return item.name + ' (' + item.company + ')'; },
    displayLabel: 'Lead'
},
CrmLeadSource: {
    idColumn: 'sourceId',
    displayColumn: 'name',
    selectColumns: ['sourceId', 'name'],
    displayLabel: 'Lead Source'
},
CrmOpportunity: {
    idColumn: 'opportunityId',
    displayColumn: 'name',
    selectColumns: ['opportunityId', 'name', 'accountId'],
    displayLabel: 'Opportunity'
},
CrmAccount: {
    idColumn: 'accountId',
    displayColumn: 'name',
    selectColumns: ['accountId', 'name', 'industry'],
    displayFormat: function(item) { return item.name; },
    displayLabel: 'Account'
},
CrmContact: {
    idColumn: 'contactId',
    displayColumn: 'name',
    selectColumns: ['contactId', 'firstName', 'lastName', 'email'],
    displayFormat: function(item) { return item.firstName + ' ' + item.lastName; },
    displayLabel: 'Contact'
},
CrmCampaign: {
    idColumn: 'campaignId',
    displayColumn: 'name',
    selectColumns: ['campaignId', 'name'],
    displayLabel: 'Campaign'
},
CrmCase: {
    idColumn: 'caseId',
    displayColumn: 'caseNumber',
    selectColumns: ['caseId', 'caseNumber', 'subject'],
    displayFormat: function(item) { return item.caseNumber + ' - ' + item.subject; },
    displayLabel: 'Case'
},
CrmSLA: {
    idColumn: 'slaId',
    displayColumn: 'name',
    selectColumns: ['slaId', 'name'],
    displayLabel: 'SLA'
},
CrmServiceOrder: {
    idColumn: 'orderId',
    displayColumn: 'orderNumber',
    selectColumns: ['orderId', 'orderNumber'],
    displayLabel: 'Service Order'
},
CrmTechnician: {
    idColumn: 'technicianId',
    displayColumn: 'name',
    selectColumns: ['technicianId', 'name', 'employeeId'],
    displayLabel: 'Technician'
},
CrmServiceContract: {
    idColumn: 'contractId',
    displayColumn: 'contractNumber',
    selectColumns: ['contractId', 'contractNumber', 'accountId'],
    displayLabel: 'Service Contract'
}
```

### Mobile Reference Registry

Add same entries to `layer8m-reference-registry.js`.

---

## Step 9: Mock Data Generation

### Phase Ordering (36 services, 10 phases)

| Phase | Models | Dependencies |
|-------|--------|-------------|
| 1 | CrmLeadSource, CrmOppStage, CrmSLA | None (configuration) |
| 2 | CrmAccount, CrmTechnician | HCM Employee |
| 3 | CrmContact, CrmServiceContract | Phase 2 |
| 4 | CrmLead, CrmLeadScore, CrmLeadAssign | Phase 1 + HCM Employee |
| 5 | CrmOpportunity, CrmCampaign, CrmMarketingList | Phase 2-3 |
| 6 | CrmLeadActivity, CrmLeadConversion, CrmOppProduct, CrmOppTeam | Phase 4-5 |
| 7 | CrmOppCompetitor, CrmOppActivity, CrmCampaignMember | Phase 5 |
| 8 | CrmCase, CrmServiceOrder, CrmServiceSchedule | Phase 2-3 |
| 9 | CrmCaseComment, CrmKBArticle, CrmEscalation, CrmServicePart, CrmServiceVisit | Phase 8 |
| 10 | CrmInteraction, CrmRelationship, CrmHealthScore, CrmAccountPlan, CrmEmailTemplate, CrmCampaignResponse, CrmCampaignROI, CrmSurvey | Various |

### Files to Create

| File | Contents |
|------|----------|
| `gen_crm_foundation.go` | Phases 1-2 (sources, stages, SLAs, accounts, technicians) |
| `gen_crm_leads.go` | Phases 4, 6 (leads, scores, activities, conversions) |
| `gen_crm_opportunities.go` | Phases 5-7 (opportunities, products, teams, competitors) |
| `gen_crm_accounts.go` | Phase 3, 10 (contacts, interactions, relationships, health scores) |
| `gen_crm_marketing.go` | Phases 5, 7, 10 (campaigns, members, lists, templates, responses, ROI) |
| `gen_crm_service.go` | Phases 8-9 (cases, comments, KB articles, escalations) |
| `gen_crm_fieldservice.go` | Phases 8-9 (service orders, schedules, parts, visits) |
| `crm_phases.go` | Phase orchestration (1-5) |
| `crm_phases6_10.go` | Phase orchestration (6-10) |

---

## Step 10: Verify Build

1. Run `go build ./erp/crm/...`
2. Run `go vet ./erp/crm/...`
3. Run `go build ./erp/ui/...`
4. Verify UI loads in browser with CRM section
5. Verify mobile card navigation shows CRM
6. Run mock data generation

---

## Files Summary

### Files to Modify

| File | Change |
|------|--------|
| `go/erp/ui/web/js/sections.js` | Add `crm` section mapping |
| `go/erp/ui/web/app.html` | Add CRM CSS + script tags |
| `l8ui/m/js/layer8m-nav-config.js` | Add CRM module config |
| `l8ui/m/js/layer8m-nav.js` | Add `MobileCrm` to registries |
| `m/app.html` | Add CRM scripts + sidebar |
| Desktop reference registry | Add CRM models |
| Mobile reference registry | Add CRM models |

### Files to Create

| Category | Count | Location |
|----------|-------|----------|
| Desktop UI config | 2 | `crm/crm-{config,init}.js` |
| Desktop UI CSS | 1 | `crm/crm.css` |
| Desktop submodule files | 24 | `crm/<sub>/{enums,columns,forms,entry}.js` |
| Desktop section HTML | 1 | `sections/crm.html` |
| Mobile submodule files | 18 | `m/js/crm/*` |
| Mobile registry | 1 | `m/js/crm/crm-index.js` |
| Mock generators | 9 | `go/tests/mocks/gen_crm_*.go` |
| **Total** | ~56 UI files | |

---

## Prime Objects Summary (36 total)

| # | Submodule | Prime Object | ServiceName | Primary Key |
|---|-----------|-------------|-------------|-------------|
| 1 | Lead Management | CrmLead | CrmLead | LeadId |
| 2 | Lead Management | CrmLeadSource | CrmLeadSrc | SourceId |
| 3 | Lead Management | CrmLeadScore | CrmLdScore | ScoreId |
| 4 | Lead Management | CrmLeadActivity | CrmLdAct | ActivityId |
| 5 | Lead Management | CrmLeadAssign | CrmLdAssn | AssignmentId |
| 6 | Lead Management | CrmLeadConversion | CrmLdConv | ConversionId |
| 7 | Opportunities | CrmOpportunity | CrmOpp | OpportunityId |
| 8 | Opportunities | CrmOppStage | CrmOppStg | StageId |
| 9 | Opportunities | CrmOppCompetitor | CrmOppComp | CompetitorId |
| 10 | Opportunities | CrmOppProduct | CrmOppProd | LineId |
| 11 | Opportunities | CrmOppTeam | CrmOppTeam | MemberId |
| 12 | Opportunities | CrmOppActivity | CrmOppAct | ActivityId |
| 13 | Accounts | CrmAccount | CrmAcct | AccountId |
| 14 | Accounts | CrmContact | CrmContact | ContactId |
| 15 | Accounts | CrmInteraction | CrmIntrctn | InteractionId |
| 16 | Accounts | CrmRelationship | CrmRelshp | RelationshipId |
| 17 | Accounts | CrmHealthScore | CrmHealth | ScoreId |
| 18 | Accounts | CrmAccountPlan | CrmAcctPln | PlanId |
| 19 | Marketing | CrmCampaign | CrmCmpgn | CampaignId |
| 20 | Marketing | CrmCampaignMember | CrmCmpgMbr | MemberId |
| 21 | Marketing | CrmEmailTemplate | CrmEmailTp | TemplateId |
| 22 | Marketing | CrmMarketingList | CrmMktList | ListId |
| 23 | Marketing | CrmCampaignResponse | CrmCmpgRsp | ResponseId |
| 24 | Marketing | CrmCampaignROI | CrmCmpgROI | RoiId |
| 25 | Customer Service | CrmCase | CrmCase | CaseId |
| 26 | Customer Service | CrmCaseComment | CrmCaseCmt | CommentId |
| 27 | Customer Service | CrmKBArticle | CrmKBart | ArticleId |
| 28 | Customer Service | CrmSLA | CrmSLA | SlaId |
| 29 | Customer Service | CrmEscalation | CrmEscal | EscalationId |
| 30 | Customer Service | CrmSurvey | CrmSurvey | SurveyId |
| 31 | Field Service | CrmServiceOrder | CrmSvcOrd | OrderId |
| 32 | Field Service | CrmTechnician | CrmTech | TechnicianId |
| 33 | Field Service | CrmServiceContract | CrmSvcCntr | ContractId |
| 34 | Field Service | CrmServiceSchedule | CrmSvcSchd | ScheduleId |
| 35 | Field Service | CrmServicePart | CrmSvcPart | PartId |
| 36 | Field Service | CrmServiceVisit | CrmSvcVst | VisitId |

**ServiceArea for ALL services: `byte(80)`**

**All ServiceName values are <= 10 characters.**

**All Proto type names and JS model names use `Crm` prefix.**
