# Compliance and Risk Management Module - Implementation Plan

## Progress Tracking

| Step | Description | Status | Notes |
|------|-------------|--------|-------|
| **Step 0** | Prerequisites | ✅ COMPLETE | erp-common.proto exists, cross-module refs verified |
| **Step 1** | Create Proto Files | ✅ COMPLETE | 5 proto files created in proto/ |
| **Step 2** | Generate Go Types | ✅ COMPLETE | make-bindings.sh run, types in go/types/comp/ |
| **Step 3** | Create Go Services | ✅ COMPLETE | 20 packages x 2 files = 40 files in go/erp/comp/ |
| **Step 4** | Integrate into erp_main.go | ✅ COMPLETE | activateCompServices() added with all 20 services |
| **Step 5** | Register COMP Types in UI | ✅ COMPLETE | registerCompTypes() in go/erp/ui/main.go |
| **Step 6** | Create Desktop UI | ✅ COMPLETE | All files created, wired in app.html and sections.js |
| **Step 7** | Create Mobile UI | ✅ COMPLETE | 13 files in m/js/comp/, mobile app.html updated |
| **Step 8** | Reference Registry | ✅ COMPLETE | Desktop reference-registry-comp.js created |
| **Step 9** | Mock Data Generation | ✅ COMPLETE | 6 generator files + store.go + data.go + main.go |
| **Step 10** | Verify Build | ✅ COMPLETE | `go build` and `go vet` pass for all COMP code |

### Implementation Complete

All 10 steps have been completed. The COMP module is fully implemented with:
- 20 Go services (40 files)
- Desktop UI (19 files including sections/compliance.html)
- Mobile UI (13 files)
- Mock data generators (6 generator files + phase orchestration)
- Reference registries for desktop

---

## Overview

Implement the Compliance and Risk Management (COMP) module following the exact patterns established by HCM, FIN, SCM, Sales, Manufacturing, CRM, Projects, BI, Documents, and E-Commerce. This covers 20 Prime Objects across 4 submodules: Regulatory Compliance, Internal Controls, Risk Management, and Audit Management.

Reference documents:
- `plans/ERP_MODULES.md` (Section 12)
- `plans/PLAN-DOCUMENTS-IMPLEMENTATION.md` (pattern reference)
- Global rules in `~/.claude/rules/`
- `l8ui/GUIDE.md` (Layer8 UI component usage)

### Global Rules Compliance

| Rule | How This Plan Complies |
|------|----------------------|
| **File Size < 500 lines** | Service files ~80 lines, callbacks ~240 lines. UI split per submodule (columns, forms, enums). All files stay well under 500 lines. |
| **No Duplicate Code** | Reuses `erp-common.proto` shared types (AuditInfo, DateRange). References HCM Employee for owners/reviewers. Uses all Layer8 shared UI components. |
| **Future-Proof Design** | Compliance designed as cross-cutting module - all other modules can be audited. Links to Document module for evidence attachments. |
| **Read Before Implementing** | Plan requires reading ALL existing module code (services, callbacks, protos, UI) before writing any COMP code. |
| **Component Integration Analysis** | All ServiceArea assignments, endpoint construction, L8Query support, and initialization arguments are documented below. |
| **Demo Directory** | All UI work targets `go/erp/ui/web/`, never `go/demo/`. |
| **Single Responsibility** | One service per package (2 files each). UI split into columns/forms/enums per submodule. |
| **ServiceName <= 10 chars** | All 20 ServiceName constants are 10 characters or fewer. See Prime Objects Summary. |
| **ServiceArea same per Module** | All COMP services use `ServiceArea = byte(110)`. |
| **ServiceCallback Auto-Generate ID** | All callbacks include `common.GenerateID()` in `Before()` for POST actions. See Section 3b. |
| **Vendor Dependencies** | Step 7 includes `go mod vendor` after proto generation. |
| **Mobile Parity** | Desktop and mobile UI are implemented together per mobile-parity.md. |
| **Mock Completeness** | All 20 services will have mock data generators per mock-completeness.md. |
| **Mock Endpoint Construction** | All endpoints use exact ServiceName constants per mock-endpoint-construction.md. |
| **JS Model Names** | All JS model names use `Comp` prefix matching protobuf types per js-protobuf-model-names.md. |
| **JS Field Names** | All JS field names match protobuf JSON tags per js-protobuf-field-names.md. |
| **Proto List Convention** | All List message types use `list` field name with `l8api.L8MetaData metadata` per proto-list-convention.md. |

---

## Step 0: Prerequisites

### 0a. Verify `erp-common.proto` exists

Shared `erp-common.proto` contains: Money, AuditInfo, Address, AddressType, ContactInfo, ContactType, DateRange. Already created during FIN implementation.

### 0b. Verify cross-module references

Compliance is a cross-cutting module referenced BY all other modules:

| Referencing Module | How It Uses Compliance |
|-------------------|----------------------|
| **HCM** | Employee compliance tracking, training requirements |
| **FIN** | SOX controls, financial audit requirements |
| **SCM** | Vendor compliance, export controls |
| **Sales** | Contract compliance, trade compliance |
| **MFG** | Quality compliance, safety regulations |
| **CRM** | Customer data privacy (GDPR) |
| **PRJ** | Project risk tracking |
| **DOC** | Document retention, legal holds |
| **ECOM** | PCI-DSS compliance, privacy regulations |

Compliance references:
| Referenced Entity | Source Module | How COMP Uses It |
|-------------------|--------------|----------------------|
| **Employee** | HCM (Core HR) | Control owners, auditors, risk managers |
| **Department** | HCM (Core HR) | Control assignments, risk ownership |
| **Document** | DOC (Storage) | Audit evidence, policy documents |

### 0c. Future-Proof Note

Compliance is designed as a foundational cross-cutting module:
- **System Administration** will link user access controls
- Generic `CompControlAssessment` can evaluate controls in any module
- `CompRiskRegister` tracks risks across all business processes

---

## Step 1: Create Proto Files (prefix: `comp-`)

Create 5 proto files under `proto/`:

| File | Contents |
|------|----------|
| `comp-common.proto` | COMP-specific shared types and enums. Imports `erp-common.proto`. |
| `comp-regulatory.proto` | 5 Prime Objects: Regulation, Requirement, ComplianceStatus, Certification, ViolationRecord |
| `comp-controls.proto` | 5 Prime Objects: Control, ControlAssessment, PolicyDocument, ApprovalMatrix, SegregationRule |
| `comp-risk.proto` | 5 Prime Objects: RiskRegister, RiskAssessment, Incident, MitigationPlan, InsurancePolicy |
| `comp-audit.proto` | 5 Prime Objects: AuditSchedule, AuditFinding, RemediationAction, AuditReport, ComplianceReport |

### Key Rules

- Every Prime Object gets `// @PrimeObject` comment annotation
- **Every Prime Object MUST have a companion `<Name>List` message** (20 Prime Objects = 40 messages total)
- **List messages MUST use `list` field name**: `repeated <Type> list = 1;` (NOT `items`)
- **List messages MUST include metadata**: `l8api.L8MetaData metadata = 2;`
- All use `package comp` and `option go_package = "./types/comp"`
- Import `comp-common.proto` and `api.proto`
- Enums start with `_UNSPECIFIED = 0`
- Include `erp.AuditInfo audit_info` as the last field on every Prime Object
- Use `map<string, string> custom_fields` for extensibility
- License header on every file
- **All type names use `Comp` prefix** (e.g., `CompRegulation`, not `Regulation`)

### Proto List Convention (CRITICAL)

```protobuf
// CORRECT - per proto-list-convention.md
message CompRegulationList {
    repeated CompRegulation list = 1;
    l8api.L8MetaData metadata = 2;
}

// WRONG - will cause runtime errors
message CompRegulationList {
    repeated CompRegulation items = 1;  // NEVER use 'items'
}
```

---

## Step 2: Generate Go Types via `make-bindings.sh`

Add to `proto/make-bindings.sh` after ECOM docker runs:

```bash
# Compliance
docker run --user "$(id -u):$(id -g)" -e PROTO=comp-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=comp-regulatory.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=comp-controls.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=comp-risk.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=comp-audit.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
```

Generated files land in `go/types/comp/`.

Run: `cd proto/ && bash make-bindings.sh`

---

## Step 3: Create Go Services (20 services)

Create directory `go/erp/comp/` with 20 service packages. Each package has exactly 2 files.

**All COMP services use `ServiceArea = byte(110)`.**

### Service Directory Listing (20 packages)

**Regulatory Compliance** (`ServiceArea = byte(110)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `regulations/` | `CompReg` | CompRegulation | RegulationId |
| `requirements/` | `CompReq` | CompRequirement | RequirementId |
| `compliancestatuses/` | `CompStatus` | CompComplianceStatus | StatusId |
| `certifications/` | `CompCert` | CompCertification | CertificationId |
| `violationrecords/` | `CompVioltn` | CompViolationRecord | ViolationId |

**Internal Controls** (`ServiceArea = byte(110)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `controls/` | `CompCtrl` | CompControl | ControlId |
| `controlassessments/` | `CompCtrlAs` | CompControlAssessment | AssessmentId |
| `policydocuments/` | `CompPolicy` | CompPolicyDocument | PolicyId |
| `approvalmatrices/` | `CompAprvMx` | CompApprovalMatrix | MatrixId |
| `segregationrules/` | `CompSegrul` | CompSegregationRule | RuleId |

**Risk Management** (`ServiceArea = byte(110)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `riskregisters/` | `CompRisk` | CompRiskRegister | RiskId |
| `riskassessments/` | `CompRiskAs` | CompRiskAssessment | AssessmentId |
| `incidents/` | `CompIncdnt` | CompIncident | IncidentId |
| `mitigationplans/` | `CompMitigtn` | CompMitigationPlan | PlanId |
| `insurancepolicies/` | `CompInsur` | CompInsurancePolicy | InsuranceId |

**Audit Management** (`ServiceArea = byte(110)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `auditschedules/` | `CompAudSch` | CompAuditSchedule | ScheduleId |
| `auditfindings/` | `CompAudFnd` | CompAuditFinding | FindingId |
| `remediationactions/` | `CompRemed` | CompRemediationAction | ActionId |
| `auditreports/` | `CompAudRpt` | CompAuditReport | ReportId |
| `compliancereports/` | `CompCmpRpt` | CompComplianceReport | ReportId |

---

## Step 3b: ServiceCallback Pattern

Every `*ServiceCallback.go` MUST include auto-generate ID in the `Before()` method:

```go
func (cb *CompRegulationServiceCallback) Before(any interface{}, action ifs.Action) error {
    entity, ok := any.(*comp.CompRegulation)
    if !ok {
        return fmt.Errorf("expected *comp.CompRegulation but got %T", any)
    }
    if action == ifs.POST {
        common.GenerateID(&entity.RegulationId)
    }
    return validate(entity)
}
```

The primary key field name comes from the corresponding `*Service.go` file's `SetPrimaryKeys()` call.

---

## Step 4: Integrate COMP into Centralized `erp_main.go`

**Important:** There is NO separate `comp_main.go` file. All modules are activated from the centralized `go/erp/main/erp_main.go`.

### 4a. Add COMP Imports

Add COMP service imports to `erp_main.go` after the existing ECOM imports (all 20 packages).

### 4b. Add Function Call in main()

```go
    activateHCMServices(nic)
    activateFinServices(nic)
    activateSCMServices(nic)
    activateSalesServices(nic)
    activateMfgServices(nic)
    activateCrmServices(nic)
    activatePrjServices(nic)
    activateBiServices(nic)
    activateDocServices(nic)
    activateEcomServices(nic)
    activateCompServices(nic)  // Add this line
```

### 4c. Create `activateCompServices()` Function

Add function after `activateEcomServices()` with all 20 service activations.

---

## Step 5: Register COMP Types in UI

Add to `go/erp/ui/main.go`:

1. Add import: `"github.com/saichler/l8erp/go/types/comp"`
2. Add call: `registerCompTypes(resources)`
3. Create `registerCompTypes()` function with all 20 types (see pattern from ECOM).

---

## Step 6: Create Desktop UI

### 6a. Directory Structure

Create `go/erp/ui/web/comp/` with this structure:

```
comp/
├── comp-config.js           # Module config with all services
├── comp-init.js             # Module initialization
├── comp.css                 # Module-specific styles
├── regulatory/
│   ├── regulatory-enums.js
│   ├── regulatory-columns.js
│   ├── regulatory-forms.js
│   └── regulatory.js
├── controls/
│   ├── controls-enums.js
│   ├── controls-columns.js
│   ├── controls-forms.js
│   └── controls.js
├── risk/
│   ├── risk-enums.js
│   ├── risk-columns.js
│   ├── risk-forms.js
│   └── risk.js
└── audit/
    ├── audit-enums.js
    ├── audit-columns.js
    ├── audit-forms.js
    └── audit.js
```

### 6b. Module Config File: `comp/comp-config.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.Comp = window.Comp || {};

    Comp.modules = {
        'regulatory': {
            label: 'Regulatory',
            services: [
                { key: 'regulations', label: 'Regulations', endpoint: '/110/CompReg', model: 'CompRegulation' },
                { key: 'requirements', label: 'Requirements', endpoint: '/110/CompReq', model: 'CompRequirement' },
                { key: 'compliance-statuses', label: 'Compliance Status', endpoint: '/110/CompStatus', model: 'CompComplianceStatus' },
                { key: 'certifications', label: 'Certifications', endpoint: '/110/CompCert', model: 'CompCertification' },
                { key: 'violations', label: 'Violations', endpoint: '/110/CompVioltn', model: 'CompViolationRecord' }
            ]
        },
        'controls': {
            label: 'Internal Controls',
            services: [
                { key: 'controls', label: 'Controls', endpoint: '/110/CompCtrl', model: 'CompControl' },
                { key: 'assessments', label: 'Assessments', endpoint: '/110/CompCtrlAs', model: 'CompControlAssessment' },
                { key: 'policies', label: 'Policies', endpoint: '/110/CompPolicy', model: 'CompPolicyDocument' },
                { key: 'approval-matrices', label: 'Approval Matrix', endpoint: '/110/CompAprvMx', model: 'CompApprovalMatrix' },
                { key: 'segregation-rules', label: 'Segregation Rules', endpoint: '/110/CompSegrul', model: 'CompSegregationRule' }
            ]
        },
        'risk': {
            label: 'Risk Management',
            services: [
                { key: 'risk-registers', label: 'Risk Register', endpoint: '/110/CompRisk', model: 'CompRiskRegister' },
                { key: 'risk-assessments', label: 'Risk Assessments', endpoint: '/110/CompRiskAs', model: 'CompRiskAssessment' },
                { key: 'incidents', label: 'Incidents', endpoint: '/110/CompIncdnt', model: 'CompIncident' },
                { key: 'mitigation-plans', label: 'Mitigation Plans', endpoint: '/110/CompMitigtn', model: 'CompMitigationPlan' },
                { key: 'insurance', label: 'Insurance', endpoint: '/110/CompInsur', model: 'CompInsurancePolicy' }
            ]
        },
        'audit': {
            label: 'Audit',
            services: [
                { key: 'audit-schedules', label: 'Schedules', endpoint: '/110/CompAudSch', model: 'CompAuditSchedule' },
                { key: 'findings', label: 'Findings', endpoint: '/110/CompAudFnd', model: 'CompAuditFinding' },
                { key: 'remediation', label: 'Remediation', endpoint: '/110/CompRemed', model: 'CompRemediationAction' },
                { key: 'audit-reports', label: 'Audit Reports', endpoint: '/110/CompAudRpt', model: 'CompAuditReport' },
                { key: 'compliance-reports', label: 'Compliance Reports', endpoint: '/110/CompCmpRpt', model: 'CompComplianceReport' }
            ]
        }
    };

    Comp.submodules = ['CompRegulatory', 'CompControls', 'CompRisk', 'CompAudit'];
})();
```

### 6c. Regulatory Submodule Example Files

#### `regulatory/regulatory-enums.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.CompRegulatory = window.CompRegulatory || {};
    CompRegulatory.enums = {};

    // REGULATION TYPE
    CompRegulatory.enums.REGULATION_TYPE = {
        0: 'Unspecified',
        1: 'SOX',
        2: 'GDPR',
        3: 'HIPAA',
        4: 'PCI-DSS',
        5: 'FDA',
        6: 'Environmental',
        7: 'Export Control',
        8: 'Industry Specific',
        9: 'Internal Policy',
        10: 'Other'
    };

    // COMPLIANCE STATUS
    CompRegulatory.enums.COMPLIANCE_STATUS = {
        0: 'Unspecified',
        1: 'Compliant',
        2: 'Partially Compliant',
        3: 'Non-Compliant',
        4: 'Under Review',
        5: 'Exempt',
        6: 'Not Applicable'
    };

    CompRegulatory.enums.COMPLIANCE_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-terminated',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-inactive',
        6: 'layer8d-status-inactive'
    };

    // SEVERITY LEVEL
    CompRegulatory.enums.SEVERITY_LEVEL = {
        0: 'Unspecified',
        1: 'Critical',
        2: 'High',
        3: 'Medium',
        4: 'Low',
        5: 'Informational'
    };

    CompRegulatory.enums.SEVERITY_CLASSES = {
        1: 'layer8d-priority-critical',
        2: 'layer8d-priority-high',
        3: 'layer8d-priority-medium',
        4: 'layer8d-priority-low',
        5: 'layer8d-priority-low'
    };

    // CERTIFICATION STATUS
    CompRegulatory.enums.CERTIFICATION_STATUS = {
        0: 'Unspecified',
        1: 'Active',
        2: 'Pending',
        3: 'Expired',
        4: 'Revoked',
        5: 'Under Renewal'
    };

    // RENDERERS
    CompRegulatory.render = {};

    CompRegulatory.render.complianceStatus = Layer8DRenderers.createStatusRenderer(
        CompRegulatory.enums.COMPLIANCE_STATUS,
        CompRegulatory.enums.COMPLIANCE_STATUS_CLASSES
    );

    CompRegulatory.render.severity = Layer8DRenderers.createStatusRenderer(
        CompRegulatory.enums.SEVERITY_LEVEL,
        CompRegulatory.enums.SEVERITY_CLASSES
    );

    CompRegulatory.render.date = Layer8DRenderers.renderDate;
})();
```

#### `regulatory/regulatory-columns.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.CompRegulatory = window.CompRegulatory || {};

    const { renderDate } = Layer8DRenderers;
    const render = CompRegulatory.render;
    const enums = CompRegulatory.enums;

    CompRegulatory.columns = {
        CompRegulation: [
            { key: 'regulationId', label: 'ID', sortKey: 'regulationId', filterKey: 'regulationId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'regulationType',
                label: 'Type',
                sortKey: 'regulationType',
                render: (item) => enums.REGULATION_TYPE[item.regulationType] || 'Unknown'
            },
            { key: 'jurisdiction', label: 'Jurisdiction', sortKey: 'jurisdiction' },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CompRequirement: [
            { key: 'requirementId', label: 'ID', sortKey: 'requirementId', filterKey: 'requirementId' },
            { key: 'regulationId', label: 'Regulation', sortKey: 'regulationId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            {
                key: 'priority',
                label: 'Priority',
                sortKey: 'priority',
                render: (item) => render.severity(item.priority)
            },
            { key: 'isMandatory', label: 'Mandatory', sortKey: 'isMandatory', render: (item) => item.isMandatory ? 'Yes' : 'No' }
        ],

        CompComplianceStatus: [
            { key: 'statusId', label: 'ID', sortKey: 'statusId', filterKey: 'statusId' },
            { key: 'requirementId', label: 'Requirement', sortKey: 'requirementId' },
            { key: 'entityType', label: 'Entity Type', sortKey: 'entityType' },
            { key: 'entityId', label: 'Entity', sortKey: 'entityId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.complianceStatus(item.status)
            },
            {
                key: 'assessmentDate',
                label: 'Assessed',
                sortKey: 'assessmentDate',
                render: (item) => renderDate(item.assessmentDate)
            },
            {
                key: 'nextReviewDate',
                label: 'Next Review',
                sortKey: 'nextReviewDate',
                render: (item) => renderDate(item.nextReviewDate)
            }
        ],

        CompCertification: [
            { key: 'certificationId', label: 'ID', sortKey: 'certificationId', filterKey: 'certificationId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'issuingBody', label: 'Issuing Body', sortKey: 'issuingBody' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => enums.CERTIFICATION_STATUS[item.status] || 'Unknown'
            },
            {
                key: 'issueDate',
                label: 'Issued',
                sortKey: 'issueDate',
                render: (item) => renderDate(item.issueDate)
            },
            {
                key: 'expiryDate',
                label: 'Expires',
                sortKey: 'expiryDate',
                render: (item) => renderDate(item.expiryDate)
            }
        ],

        CompViolationRecord: [
            { key: 'violationId', label: 'ID', sortKey: 'violationId', filterKey: 'violationId' },
            { key: 'requirementId', label: 'Requirement', sortKey: 'requirementId' },
            {
                key: 'severity',
                label: 'Severity',
                sortKey: 'severity',
                render: (item) => render.severity(item.severity)
            },
            {
                key: 'discoveryDate',
                label: 'Discovered',
                sortKey: 'discoveryDate',
                render: (item) => renderDate(item.discoveryDate)
            },
            { key: 'status', label: 'Status', sortKey: 'status' },
            { key: 'assignedTo', label: 'Assigned To', sortKey: 'assignedTo' }
        ]
    };
})();
```

#### `regulatory/regulatory-forms.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.CompRegulatory = window.CompRegulatory || {};

    const enums = CompRegulatory.enums;

    CompRegulatory.forms = {
        CompRegulation: {
            title: 'Regulation',
            sections: [
                {
                    title: 'Regulation Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'code', label: 'Code', type: 'text' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'regulationType', label: 'Type', type: 'select', options: enums.REGULATION_TYPE },
                        { key: 'jurisdiction', label: 'Jurisdiction', type: 'text' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CompRequirement: {
            title: 'Requirement',
            sections: [
                {
                    title: 'Requirement Details',
                    fields: [
                        { key: 'regulationId', label: 'Regulation', type: 'reference', lookupModel: 'CompRegulation', required: true },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.SEVERITY_LEVEL },
                        { key: 'isMandatory', label: 'Mandatory', type: 'checkbox' }
                    ]
                }
            ]
        },

        CompComplianceStatus: {
            title: 'Compliance Status',
            sections: [
                {
                    title: 'Status Details',
                    fields: [
                        { key: 'requirementId', label: 'Requirement', type: 'reference', lookupModel: 'CompRequirement', required: true },
                        { key: 'entityType', label: 'Entity Type', type: 'text' },
                        { key: 'entityId', label: 'Entity ID', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.COMPLIANCE_STATUS },
                        { key: 'assessmentDate', label: 'Assessment Date', type: 'date' },
                        { key: 'nextReviewDate', label: 'Next Review', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        CompCertification: {
            title: 'Certification',
            sections: [
                {
                    title: 'Certification Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'issuingBody', label: 'Issuing Body', type: 'text', required: true },
                        { key: 'certificateNumber', label: 'Certificate Number', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CERTIFICATION_STATUS },
                        { key: 'issueDate', label: 'Issue Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'scope', label: 'Scope', type: 'textarea' }
                    ]
                }
            ]
        },

        CompViolationRecord: {
            title: 'Violation Record',
            sections: [
                {
                    title: 'Violation Details',
                    fields: [
                        { key: 'requirementId', label: 'Requirement', type: 'reference', lookupModel: 'CompRequirement', required: true },
                        { key: 'severity', label: 'Severity', type: 'select', options: enums.SEVERITY_LEVEL },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'discoveryDate', label: 'Discovery Date', type: 'date' },
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'rootCause', label: 'Root Cause', type: 'textarea' },
                        { key: 'correctiveAction', label: 'Corrective Action', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    CompRegulatory.primaryKeys = {
        CompRegulation: 'regulationId',
        CompRequirement: 'requirementId',
        CompComplianceStatus: 'statusId',
        CompCertification: 'certificationId',
        CompViolationRecord: 'violationId'
    };
})();
```

#### `regulatory/regulatory.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    // CompRegulatory namespace initialized by enum, column, and form files
    // This file can contain any additional regulatory-specific logic
})();
```

### 6d. Module Init File: `comp/comp-init.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DModuleFactory.create({
        namespace: 'Comp',
        defaultModule: 'regulatory',
        defaultService: 'regulations',
        sectionSelector: 'regulatory',
        initializerName: 'initializeComp',
        requiredNamespaces: ['CompRegulatory', 'CompControls', 'CompRisk', 'CompAudit']
    });
})();
```

### 6e. Section HTML: `sections/compliance.html`

Create section HTML following the CRM/BI pattern with:
- Header with parallax effect and compliance-themed SVG icons (shields, checkmarks, scales)
- Module tabs: Regulatory, Internal Controls, Risk Management, Audit
- Each module has subnav with all its services
- Table containers with IDs: `{module}-{service}-table-container`

Example structure:
```html
<div class="section-container hcm-section">
    <!-- Header with Parallax Effect (Compliance themed: shields, scales, checkmarks) -->
    <div class="hcm-header-frame parallax-container">
        <!-- SVG with compliance icons -->
    </div>

    <!-- Module Tabs -->
    <div class="hcm-module-tabs">
        <button class="hcm-module-tab active" data-module="regulatory">Regulatory</button>
        <button class="hcm-module-tab" data-module="controls">Internal Controls</button>
        <button class="hcm-module-tab" data-module="risk">Risk Management</button>
        <button class="hcm-module-tab" data-module="audit">Audit</button>
    </div>

    <div class="section-content">
        <!-- Regulatory Module (default active) -->
        <div class="hcm-module-content active" data-module="regulatory">
            <nav class="hcm-subnav">
                <a class="hcm-subnav-item active" data-service="regulations">Regulations</a>
                <a class="hcm-subnav-item" data-service="requirements">Requirements</a>
                <a class="hcm-subnav-item" data-service="compliance-statuses">Compliance Status</a>
                <a class="hcm-subnav-item" data-service="certifications">Certifications</a>
                <a class="hcm-subnav-item" data-service="violations">Violations</a>
            </nav>
            <div class="hcm-service-content">
                <div class="hcm-service-view active" data-service="regulations">
                    <div class="hcm-table-container" id="regulatory-regulations-table-container"></div>
                </div>
                <!-- ... other service views -->
            </div>
        </div>
        <!-- ... other modules -->
    </div>
</div>
```

### 6f. Wiring in `app.html`

Add after ECOM scripts:

```html
<!-- COMP CSS -->
<link rel="stylesheet" href="comp/comp.css">

<!-- COMP Reference Registry -->
<script src="js/reference-registry-comp.js"></script>

<!-- COMP Config -->
<script src="comp/comp-config.js"></script>

<!-- COMP Submodules -->
<script src="comp/regulatory/regulatory-enums.js"></script>
<script src="comp/regulatory/regulatory-columns.js"></script>
<script src="comp/regulatory/regulatory-forms.js"></script>
<script src="comp/regulatory/regulatory.js"></script>

<script src="comp/controls/controls-enums.js"></script>
<script src="comp/controls/controls-columns.js"></script>
<script src="comp/controls/controls-forms.js"></script>
<script src="comp/controls/controls.js"></script>

<script src="comp/risk/risk-enums.js"></script>
<script src="comp/risk/risk-columns.js"></script>
<script src="comp/risk/risk-forms.js"></script>
<script src="comp/risk/risk.js"></script>

<script src="comp/audit/audit-enums.js"></script>
<script src="comp/audit/audit-columns.js"></script>
<script src="comp/audit/audit-forms.js"></script>
<script src="comp/audit/audit.js"></script>

<!-- COMP Init (LAST) -->
<script src="comp/comp-init.js"></script>
```

### 6g. Wiring in `sections.js`

Add section mapping:

```javascript
const sections = {
    // ... existing sections
    compliance: 'sections/compliance.html'
};

const sectionInitializers = {
    // ... existing initializers
    compliance: () => { if (typeof initializeComp === 'function') initializeComp(); }
};
```

---

## Step 7: Create Mobile UI (Mobile Parity)

### 7a. Directory Structure

Create `go/erp/ui/web/m/js/comp/` with files for each submodule:

```
m/js/comp/
├── regulatory-enums.js
├── regulatory-columns.js
├── regulatory-forms.js
├── controls-enums.js
├── controls-columns.js
├── controls-forms.js
├── risk-enums.js
├── risk-columns.js
├── risk-forms.js
├── audit-enums.js
├── audit-columns.js
├── audit-forms.js
└── comp-index.js
```

### 7b. Mobile Registry: `m/js/comp/comp-index.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    const modules = [
        MobileCompRegulatory,
        MobileCompControls,
        MobileCompRisk,
        MobileCompAudit
    ];

    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) {
                return mod;
            }
        }
        return null;
    }

    window.MobileComp = {
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
            Regulatory: MobileCompRegulatory,
            Controls: MobileCompControls,
            Risk: MobileCompRisk,
            Audit: MobileCompAudit
        }
    };
})();
```

### 7c. Mobile Nav Config Update

In `l8ui/m/js/layer8m-nav-config.js`:

1. Update compliance entry in modules list:
```javascript
{ key: 'compliance', label: 'Compliance', icon: 'compliance', hasSubModules: true }
```

2. Add full config block:
```javascript
compliance: {
    subModules: [
        { key: 'regulatory', label: 'Regulatory', icon: 'compliance' },
        { key: 'controls', label: 'Controls', icon: 'compliance' },
        { key: 'risk', label: 'Risk', icon: 'compliance' },
        { key: 'audit', label: 'Audit', icon: 'compliance' }
    ],
    services: {
        'regulatory': [
            { key: 'regulations', label: 'Regulations', icon: 'compliance', endpoint: '/110/CompReg', model: 'CompRegulation', idField: 'regulationId' },
            { key: 'requirements', label: 'Requirements', icon: 'compliance', endpoint: '/110/CompReq', model: 'CompRequirement', idField: 'requirementId' },
            { key: 'compliance-statuses', label: 'Status', icon: 'compliance', endpoint: '/110/CompStatus', model: 'CompComplianceStatus', idField: 'statusId' },
            { key: 'certifications', label: 'Certifications', icon: 'compliance', endpoint: '/110/CompCert', model: 'CompCertification', idField: 'certificationId' },
            { key: 'violations', label: 'Violations', icon: 'compliance', endpoint: '/110/CompVioltn', model: 'CompViolationRecord', idField: 'violationId' }
        ],
        'controls': [
            { key: 'controls', label: 'Controls', icon: 'compliance', endpoint: '/110/CompCtrl', model: 'CompControl', idField: 'controlId' },
            { key: 'assessments', label: 'Assessments', icon: 'compliance', endpoint: '/110/CompCtrlAs', model: 'CompControlAssessment', idField: 'assessmentId' },
            { key: 'policies', label: 'Policies', icon: 'compliance', endpoint: '/110/CompPolicy', model: 'CompPolicyDocument', idField: 'policyId' },
            { key: 'approval-matrices', label: 'Approval Matrix', icon: 'compliance', endpoint: '/110/CompAprvMx', model: 'CompApprovalMatrix', idField: 'matrixId' },
            { key: 'segregation-rules', label: 'Segregation', icon: 'compliance', endpoint: '/110/CompSegrul', model: 'CompSegregationRule', idField: 'ruleId' }
        ],
        'risk': [
            { key: 'risk-registers', label: 'Risk Register', icon: 'compliance', endpoint: '/110/CompRisk', model: 'CompRiskRegister', idField: 'riskId' },
            { key: 'risk-assessments', label: 'Assessments', icon: 'compliance', endpoint: '/110/CompRiskAs', model: 'CompRiskAssessment', idField: 'assessmentId' },
            { key: 'incidents', label: 'Incidents', icon: 'compliance', endpoint: '/110/CompIncdnt', model: 'CompIncident', idField: 'incidentId' },
            { key: 'mitigation-plans', label: 'Mitigation', icon: 'compliance', endpoint: '/110/CompMitigtn', model: 'CompMitigationPlan', idField: 'planId' },
            { key: 'insurance', label: 'Insurance', icon: 'compliance', endpoint: '/110/CompInsur', model: 'CompInsurancePolicy', idField: 'insuranceId' }
        ],
        'audit': [
            { key: 'audit-schedules', label: 'Schedules', icon: 'compliance', endpoint: '/110/CompAudSch', model: 'CompAuditSchedule', idField: 'scheduleId' },
            { key: 'findings', label: 'Findings', icon: 'compliance', endpoint: '/110/CompAudFnd', model: 'CompAuditFinding', idField: 'findingId' },
            { key: 'remediation', label: 'Remediation', icon: 'compliance', endpoint: '/110/CompRemed', model: 'CompRemediationAction', idField: 'actionId' },
            { key: 'audit-reports', label: 'Audit Reports', icon: 'compliance', endpoint: '/110/CompAudRpt', model: 'CompAuditReport', idField: 'reportId' },
            { key: 'compliance-reports', label: 'Compliance Reports', icon: 'compliance', endpoint: '/110/CompCmpRpt', model: 'CompComplianceReport', idField: 'reportId' }
        ]
    }
}
```

### 7d. Mobile Nav.js Update

In `layer8m-nav.js`, add `MobileComp` to registry lookups in `_getServiceColumns`, `_getServiceFormDef`, etc.

### 7e. Mobile app.html Update

Add script tags and sidebar link:

```html
<!-- COMP Mobile Scripts -->
<script src="js/comp/regulatory-enums.js"></script>
<script src="js/comp/regulatory-columns.js"></script>
<script src="js/comp/regulatory-forms.js"></script>
<script src="js/comp/controls-enums.js"></script>
<script src="js/comp/controls-columns.js"></script>
<script src="js/comp/controls-forms.js"></script>
<script src="js/comp/risk-enums.js"></script>
<script src="js/comp/risk-columns.js"></script>
<script src="js/comp/risk-forms.js"></script>
<script src="js/comp/audit-enums.js"></script>
<script src="js/comp/audit-columns.js"></script>
<script src="js/comp/audit-forms.js"></script>
<script src="js/comp/comp-index.js"></script>

<!-- Sidebar -->
<a href="#dashboard" class="sidebar-item" data-section="dashboard" data-module="compliance">
    <span class="sidebar-item-icon"><!-- Compliance icon SVG --></span>
    Compliance
</a>
```

---

## Step 8: Reference Registry Updates

### CRITICAL: Verify Field Names First

Before writing registry entries, grep the .pb.go files:

```bash
grep -A 30 "type CompRegulation struct" go/types/comp/*.pb.go | grep 'json:"'
```

### Desktop Reference Registry

Create `js/reference-registry-comp.js`:

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DReferenceRegistry.register({
        // Regulatory
        CompRegulation: {
            idColumn: 'regulationId',
            displayColumn: 'name',
            selectColumns: ['regulationId', 'name', 'code', 'regulationType'],
            displayFormat: function(item) { return item.code ? item.code + ' - ' + item.name : item.name; },
            displayLabel: 'Regulation'
        },
        CompRequirement: {
            idColumn: 'requirementId',
            displayColumn: 'title',
            selectColumns: ['requirementId', 'code', 'title'],
            displayFormat: function(item) { return item.code + ' - ' + item.title; },
            displayLabel: 'Requirement'
        },
        CompCertification: {
            idColumn: 'certificationId',
            displayColumn: 'name',
            selectColumns: ['certificationId', 'name', 'issuingBody'],
            displayLabel: 'Certification'
        },

        // Controls
        CompControl: {
            idColumn: 'controlId',
            displayColumn: 'name',
            selectColumns: ['controlId', 'code', 'name'],
            displayFormat: function(item) { return item.code ? item.code + ' - ' + item.name : item.name; },
            displayLabel: 'Control'
        },
        CompPolicyDocument: {
            idColumn: 'policyId',
            displayColumn: 'title',
            selectColumns: ['policyId', 'code', 'title'],
            displayFormat: function(item) { return item.code + ' - ' + item.title; },
            displayLabel: 'Policy'
        },
        CompApprovalMatrix: {
            idColumn: 'matrixId',
            displayColumn: 'name',
            selectColumns: ['matrixId', 'name'],
            displayLabel: 'Approval Matrix'
        },

        // Risk
        CompRiskRegister: {
            idColumn: 'riskId',
            displayColumn: 'title',
            selectColumns: ['riskId', 'code', 'title'],
            displayFormat: function(item) { return item.code ? item.code + ' - ' + item.title : item.title; },
            displayLabel: 'Risk'
        },
        CompIncident: {
            idColumn: 'incidentId',
            displayColumn: 'title',
            selectColumns: ['incidentId', 'title'],
            displayLabel: 'Incident'
        },
        CompMitigationPlan: {
            idColumn: 'planId',
            displayColumn: 'name',
            selectColumns: ['planId', 'name'],
            displayLabel: 'Mitigation Plan'
        },
        CompInsurancePolicy: {
            idColumn: 'insuranceId',
            displayColumn: 'policyNumber',
            selectColumns: ['insuranceId', 'policyNumber', 'provider'],
            displayFormat: function(item) { return item.policyNumber + ' (' + item.provider + ')'; },
            displayLabel: 'Insurance Policy'
        },

        // Audit
        CompAuditSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'name',
            selectColumns: ['scheduleId', 'name', 'auditType'],
            displayLabel: 'Audit Schedule'
        },
        CompAuditFinding: {
            idColumn: 'findingId',
            displayColumn: 'title',
            selectColumns: ['findingId', 'findingNumber', 'title'],
            displayFormat: function(item) { return item.findingNumber + ' - ' + item.title; },
            displayLabel: 'Finding'
        },
        CompRemediationAction: {
            idColumn: 'actionId',
            displayColumn: 'title',
            selectColumns: ['actionId', 'title'],
            displayLabel: 'Remediation Action'
        },
        CompAuditReport: {
            idColumn: 'reportId',
            displayColumn: 'title',
            selectColumns: ['reportId', 'reportNumber', 'title'],
            displayFormat: function(item) { return item.reportNumber + ' - ' + item.title; },
            displayLabel: 'Audit Report'
        }
    });
})();
```

### Mobile Reference Registry

Add same entries to `layer8m-reference-registry.js`.

---

## Step 9: Mock Data Generation

### Phase Ordering (20 services, 5 phases)

| Phase | Models | Dependencies |
|-------|--------|-------------|
| 1 | CompRegulation, CompControl, CompPolicyDocument, CompInsurancePolicy | None (configuration) |
| 2 | CompRequirement, CompApprovalMatrix, CompSegregationRule, CompRiskRegister, CompAuditSchedule | Phase 1 + HCM Employee |
| 3 | CompComplianceStatus, CompControlAssessment, CompCertification, CompRiskAssessment, CompMitigationPlan | Phase 2 |
| 4 | CompViolationRecord, CompIncident, CompAuditFinding | Phase 2-3 |
| 5 | CompRemediationAction, CompAuditReport, CompComplianceReport | Phase 4 (dependent on findings) |

### Files to Create

| File | Contents |
|------|----------|
| `gen_comp_foundation.go` | Phase 1 (regulations, controls, policies, insurance) |
| `gen_comp_regulatory.go` | Phases 2-4 (requirements, statuses, certifications, violations) |
| `gen_comp_controls.go` | Phases 2-3 (assessments, matrices, segregation rules) |
| `gen_comp_risk.go` | Phases 2-4 (risk registers, assessments, incidents, mitigation) |
| `gen_comp_audit.go` | Phases 2-5 (schedules, findings, remediation, reports) |
| `comp_phases.go` | Phase orchestration (all phases) |

### Mock Data Store Additions

Add to `store.go`:

```go
// COMP - Phase 1 (Configuration)
CompRegulationIDs       []string
CompControlIDs          []string
CompPolicyDocumentIDs   []string
CompInsurancePolicyIDs  []string

// COMP - Phase 2 (Core)
CompRequirementIDs      []string
CompApprovalMatrixIDs   []string
CompSegregationRuleIDs  []string
CompRiskRegisterIDs     []string
CompAuditScheduleIDs    []string

// COMP - Phase 3 (Assessments)
CompComplianceStatusIDs    []string
CompControlAssessmentIDs   []string
CompCertificationIDs       []string
CompRiskAssessmentIDs      []string
CompMitigationPlanIDs      []string

// COMP - Phase 4 (Events)
CompViolationRecordIDs  []string
CompIncidentIDs         []string
CompAuditFindingIDs     []string

// COMP - Phase 5 (Reports)
CompRemediationActionIDs   []string
CompAuditReportIDs         []string
CompComplianceReportIDs    []string
```

---

## Step 10: Verify Build

1. Run `go build ./erp/comp/...`
2. Run `go vet ./erp/comp/...`
3. Run `go build ./erp/ui/...`
4. Verify UI loads in browser with Compliance section
5. Verify mobile card navigation shows Compliance
6. Run mock data generation

---

## Files Summary

### Files to Modify

| File | Change |
|------|--------|
| `proto/make-bindings.sh` | Add COMP proto docker runs |
| `go/erp/main/erp_main.go` | Add COMP imports and activation |
| `go/erp/ui/main.go` | Add registerCompTypes() |
| `go/erp/ui/web/js/sections.js` | Add `compliance` section mapping and initializer |
| `go/erp/ui/web/app.html` | Add COMP CSS + script tags |
| `l8ui/m/js/layer8m-nav-config.js` | Update COMP module config (enable subModules) |
| `l8ui/m/js/layer8m-nav.js` | Add `MobileComp` to registries |
| `m/app.html` | Add COMP scripts |
| Desktop reference registry | Add COMP models |
| Mobile reference registry | Add COMP models |
| `go/tests/mocks/store.go` | Add COMP ID slices |
| `go/tests/mocks/data.go` | Add COMP data arrays |
| `go/tests/mocks/main.go` | Add COMP phase calls |

### Files to Create

| Category | Count | Location |
|----------|-------|----------|
| Proto files | 5 | `proto/comp-*.proto` |
| Go services | 40 | `go/erp/comp/<service>/` (20 packages x 2 files) |
| Desktop UI config | 2 | `comp/comp-{config,init}.js` |
| Desktop UI CSS | 1 | `comp/comp.css` |
| Desktop submodule files | 16 | `comp/<sub>/{enums,columns,forms,entry}.js` |
| Desktop section HTML | 1 | `sections/compliance.html` |
| Desktop reference registry | 1 | `js/reference-registry-comp.js` |
| Mobile submodule files | 12 | `m/js/comp/*` |
| Mobile registry | 1 | `m/js/comp/comp-index.js` |
| Mock generators | 6 | `go/tests/mocks/gen_comp_*.go, comp_phases.go` |
| **Total** | ~85 files | |

---

## Prime Objects Summary (20 total)

| # | Submodule | Prime Object | ServiceName | Primary Key |
|---|-----------|-------------|-------------|-------------|
| 1 | Regulatory | CompRegulation | CompReg | RegulationId |
| 2 | Regulatory | CompRequirement | CompReq | RequirementId |
| 3 | Regulatory | CompComplianceStatus | CompStatus | StatusId |
| 4 | Regulatory | CompCertification | CompCert | CertificationId |
| 5 | Regulatory | CompViolationRecord | CompVioltn | ViolationId |
| 6 | Controls | CompControl | CompCtrl | ControlId |
| 7 | Controls | CompControlAssessment | CompCtrlAs | AssessmentId |
| 8 | Controls | CompPolicyDocument | CompPolicy | PolicyId |
| 9 | Controls | CompApprovalMatrix | CompAprvMx | MatrixId |
| 10 | Controls | CompSegregationRule | CompSegrul | RuleId |
| 11 | Risk | CompRiskRegister | CompRisk | RiskId |
| 12 | Risk | CompRiskAssessment | CompRiskAs | AssessmentId |
| 13 | Risk | CompIncident | CompIncdnt | IncidentId |
| 14 | Risk | CompMitigationPlan | CompMitigtn | PlanId |
| 15 | Risk | CompInsurancePolicy | CompInsur | InsuranceId |
| 16 | Audit | CompAuditSchedule | CompAudSch | ScheduleId |
| 17 | Audit | CompAuditFinding | CompAudFnd | FindingId |
| 18 | Audit | CompRemediationAction | CompRemed | ActionId |
| 19 | Audit | CompAuditReport | CompAudRpt | ReportId |
| 20 | Audit | CompComplianceReport | CompCmpRpt | ReportId |

**ServiceArea for ALL services: `byte(110)`**

**All ServiceName values are <= 10 characters.**

**All Proto type names and JS model names use `Comp` prefix.**

**All List messages use `list` field name with `l8api.L8MetaData metadata` per proto-list-convention.md.**
