# Document Management Module - Implementation Plan

## Overview

Implement the Document Management (DOC) module following the exact patterns established by HCM, FIN, SCM, Sales, Manufacturing, CRM, Projects, and BI. This covers 20 Prime Objects across 4 submodules: Storage, Workflow, Integration, and Compliance.

Reference documents:
- `plans/ERP_MODULES.md` (Section 9)
- `plans/PLAN-BI-IMPLEMENTATION.md` (pattern reference)
- Global rules in `~/.claude/rules/`
- `l8ui/GUIDE.md` (Layer8 UI component usage)

### Global Rules Compliance

| Rule | How This Plan Complies |
|------|----------------------|
| **File Size < 500 lines** | Service files ~80 lines, callbacks ~240 lines. UI split per submodule (columns, forms, enums). All files stay well under 500 lines. |
| **No Duplicate Code** | Reuses `erp-common.proto` shared types (AuditInfo, DateRange). References HCM Employee for owners/approvers. Uses all Layer8 shared UI components. |
| **Future-Proof Design** | Documents designed as cross-cutting module - all other modules can attach documents. DocAttachment entity supports linking to any entity type. |
| **Read Before Implementing** | Plan requires reading ALL existing module code (services, callbacks, protos, UI) before writing any DOC code. |
| **Component Integration Analysis** | All ServiceArea assignments, endpoint construction, L8Query support, and initialization arguments are documented below. |
| **Demo Directory** | All UI work targets `go/erp/ui/web/`, never `go/demo/`. |
| **Single Responsibility** | One service per package (2 files each). UI split into columns/forms/enums per submodule. |
| **ServiceName <= 10 chars** | All 20 ServiceName constants are 10 characters or fewer. See Prime Objects Summary. |
| **ServiceArea same per Module** | All DOC services use `ServiceArea = byte(45)`. |
| **ServiceCallback Auto-Generate ID** | All callbacks include `common.GenerateID()` in `Before()` for POST actions. See Section 3b. |
| **Vendor Dependencies** | Step 7 includes `go mod vendor` after proto generation. |
| **Mobile Parity** | Desktop and mobile UI are implemented together per mobile-parity.md. |
| **Mock Completeness** | All 20 services will have mock data generators per mock-completeness.md. |
| **Mock Endpoint Construction** | All endpoints use exact ServiceName constants per mock-endpoint-construction.md. |
| **JS Model Names** | All JS model names use `Doc` prefix matching protobuf types per js-protobuf-model-names.md. |
| **JS Field Names** | All JS field names match protobuf JSON tags per js-protobuf-field-names.md. |

---

## Step 0: Prerequisites

### 0a. Verify `erp-common.proto` exists

Shared `erp-common.proto` contains: Money, AuditInfo, Address, AddressType, ContactInfo, ContactType, DateRange. Already created during FIN implementation.

### 0b. Verify cross-module references

Documents is a cross-cutting module referenced BY all other modules:

| Referencing Module | How It Uses Documents |
|-------------------|----------------------|
| **HCM** | Employee documents, contracts, certifications |
| **FIN** | Invoice attachments, receipts, statements |
| **SCM** | Purchase orders, shipping docs, receiving docs |
| **Sales** | Contracts, proposals, quotes |
| **MFG** | Work instructions, quality docs, specs |
| **CRM** | Customer communications, proposals |
| **PRJ** | Project documents, deliverables |
| **BI** | Report outputs, exported dashboards |

Documents references:
| Referenced Entity | Source Module | How DOC Uses It |
|-------------------|--------------|----------------------|
| **Employee** | HCM (Core HR) | Document owners, approvers, reviewers |
| **Department** | HCM (Core HR) | Folder permissions, access control |

### 0c. Future-Proof Note

Documents is designed as a foundational cross-cutting module:
- **E-Commerce** will attach product images, manuals
- **Compliance** will store audit evidence, certifications
- Generic `DocAttachment` links documents to any entity in any module

---

## Step 1: Create Proto Files (prefix: `doc-`)

Create 5 proto files under `proto/`:

| File | Contents |
|------|----------|
| `doc-common.proto` | DOC-specific shared types and enums. Imports `erp-common.proto`. |
| `doc-storage.proto` | 5 Prime Objects: Document, Folder, Category, Tag, DocumentVersion |
| `doc-workflow.proto` | 5 Prime Objects: Checkout, ApprovalWorkflow, WorkflowStep, Signature, ReviewComment |
| `doc-integration.proto` | 5 Prime Objects: Attachment, Template, TemplateField, EmailCapture, ScanJob |
| `doc-compliance.proto` | 5 Prime Objects: RetentionPolicy, LegalHold, AccessLog, ArchiveJob, AuditTrail |

### Key Rules

- Every Prime Object gets `// @PrimeObject` comment annotation
- **Every Prime Object MUST have a companion `<Name>List` message** (20 Prime Objects = 40 messages total)
- All use `package doc` and `option go_package = "./types/doc"`
- Import `doc-common.proto` and `api.proto`
- Enums start with `_UNSPECIFIED = 0`
- Include `erp.AuditInfo audit_info` as the last field on every Prime Object
- Use `map<string, string> custom_fields` for extensibility
- License header on every file
- **All type names use `Doc` prefix** (e.g., `DocDocument`, not `Document`)

---

## Step 2: Generate Go Types via `make-bindings.sh`

Add to `proto/make-bindings.sh` after BI docker runs:

```bash
# Documents
docker run --user "$(id -u):$(id -g)" -e PROTO=doc-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=doc-storage.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=doc-workflow.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=doc-integration.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=doc-compliance.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
```

Generated files land in `go/types/doc/`.

Run: `cd proto/ && bash make-bindings.sh`

---

## Step 3: Create Go Services (20 services)

Create directory `go/erp/doc/` with 20 service packages. Each package has exactly 2 files.

**All DOC services use `ServiceArea = byte(45)`.**

### Service Directory Listing (20 packages)

**Storage** (`ServiceArea = byte(45)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `documents/` | `DocDoc` | DocDocument | DocumentId |
| `folders/` | `DocFolder` | DocFolder | FolderId |
| `categories/` | `DocCategry` | DocCategory | CategoryId |
| `tags/` | `DocTag` | DocTag | TagId |
| `versions/` | `DocVersion` | DocDocumentVersion | VersionId |

**Workflow** (`ServiceArea = byte(45)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `checkouts/` | `DocChkout` | DocCheckout | CheckoutId |
| `approvalworkflows/` | `DocAprvWf` | DocApprovalWorkflow | WorkflowId |
| `workflowsteps/` | `DocWfStep` | DocWorkflowStep | StepId |
| `signatures/` | `DocSign` | DocSignature | SignatureId |
| `reviewcomments/` | `DocReview` | DocReviewComment | CommentId |

**Integration** (`ServiceArea = byte(45)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `attachments/` | `DocAttach` | DocAttachment | AttachmentId |
| `templates/` | `DocTmpl` | DocTemplate | TemplateId |
| `templatefields/` | `DocTmplFld` | DocTemplateField | FieldId |
| `emailcaptures/` | `DocEmail` | DocEmailCapture | CaptureId |
| `scanjobs/` | `DocScan` | DocScanJob | ScanJobId |

**Compliance** (`ServiceArea = byte(45)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `retentionpolicies/` | `DocRetPol` | DocRetentionPolicy | PolicyId |
| `legalholds/` | `DocLglHold` | DocLegalHold | HoldId |
| `accesslogs/` | `DocAccLog` | DocAccessLog | LogId |
| `archivejobs/` | `DocArchive` | DocArchiveJob | JobId |
| `audittrails/` | `DocAudit` | DocAuditTrail | TrailId |

---

## Step 3b: ServiceCallback Pattern

Every `*ServiceCallback.go` MUST include auto-generate ID in the `Before()` method:

```go
func (cb *DocDocumentServiceCallback) Before(any interface{}, action ifs.Action) error {
    entity, ok := any.(*doc.DocDocument)
    if !ok {
        return fmt.Errorf("expected *doc.DocDocument but got %T", any)
    }
    if action == ifs.POST {
        common.GenerateID(&entity.DocumentId)
    }
    return validate(entity)
}
```

The primary key field name comes from the corresponding `*Service.go` file's `SetPrimaryKeys()` call.

---

## Step 4: Integrate DOC into Centralized `erp_main.go`

**Important:** There is NO separate `doc_main.go` file. All modules are activated from the centralized `go/erp/main/erp_main.go`.

### 4a. Add DOC Imports

Add DOC service imports to `erp_main.go` after the existing BI imports (all 20 packages).

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
    activateDocServices(nic)  // Add this line
```

### 4c. Create `activateDocServices()` Function

Add function after `activateBiServices()` with all 20 service activations.

---

## Step 5: Register DOC Types in UI

Add to `go/erp/ui/main.go`:

1. Add import: `"github.com/saichler/l8erp/go/types/doc"`
2. Add call: `registerDocTypes(resources)`
3. Create `registerDocTypes()` function with all 20 types (see pattern from BI).

---

## Step 6: Create Desktop UI

### 6a. Directory Structure

Create `go/erp/ui/web/doc/` with this structure:

```
doc/
├── doc-config.js           # Module config with all services
├── doc-init.js             # Module initialization
├── doc.css                 # Module-specific styles
├── storage/
│   ├── storage-enums.js
│   ├── storage-columns.js
│   ├── storage-forms.js
│   └── storage.js
├── workflow/
│   ├── workflow-enums.js
│   ├── workflow-columns.js
│   ├── workflow-forms.js
│   └── workflow.js
├── integration/
│   ├── integration-enums.js
│   ├── integration-columns.js
│   ├── integration-forms.js
│   └── integration.js
└── compliance/
    ├── compliance-enums.js
    ├── compliance-columns.js
    ├── compliance-forms.js
    └── compliance.js
```

### 6b. Module Config File: `doc/doc-config.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.Doc = window.Doc || {};

    Doc.modules = {
        'storage': {
            label: 'Storage',
            services: [
                { key: 'documents', label: 'Documents', endpoint: '/45/DocDoc', model: 'DocDocument' },
                { key: 'folders', label: 'Folders', endpoint: '/45/DocFolder', model: 'DocFolder' },
                { key: 'categories', label: 'Categories', endpoint: '/45/DocCategry', model: 'DocCategory' },
                { key: 'tags', label: 'Tags', endpoint: '/45/DocTag', model: 'DocTag' },
                { key: 'versions', label: 'Versions', endpoint: '/45/DocVersion', model: 'DocDocumentVersion' }
            ]
        },
        'workflow': {
            label: 'Workflow',
            services: [
                { key: 'checkouts', label: 'Checkouts', endpoint: '/45/DocChkout', model: 'DocCheckout' },
                { key: 'approval-workflows', label: 'Approval Workflows', endpoint: '/45/DocAprvWf', model: 'DocApprovalWorkflow' },
                { key: 'workflow-steps', label: 'Workflow Steps', endpoint: '/45/DocWfStep', model: 'DocWorkflowStep' },
                { key: 'signatures', label: 'Signatures', endpoint: '/45/DocSign', model: 'DocSignature' },
                { key: 'review-comments', label: 'Reviews', endpoint: '/45/DocReview', model: 'DocReviewComment' }
            ]
        },
        'integration': {
            label: 'Integration',
            services: [
                { key: 'attachments', label: 'Attachments', endpoint: '/45/DocAttach', model: 'DocAttachment' },
                { key: 'templates', label: 'Templates', endpoint: '/45/DocTmpl', model: 'DocTemplate' },
                { key: 'template-fields', label: 'Template Fields', endpoint: '/45/DocTmplFld', model: 'DocTemplateField' },
                { key: 'email-captures', label: 'Email Captures', endpoint: '/45/DocEmail', model: 'DocEmailCapture' },
                { key: 'scan-jobs', label: 'Scan Jobs', endpoint: '/45/DocScan', model: 'DocScanJob' }
            ]
        },
        'compliance': {
            label: 'Compliance',
            services: [
                { key: 'retention-policies', label: 'Retention Policies', endpoint: '/45/DocRetPol', model: 'DocRetentionPolicy' },
                { key: 'legal-holds', label: 'Legal Holds', endpoint: '/45/DocLglHold', model: 'DocLegalHold' },
                { key: 'access-logs', label: 'Access Logs', endpoint: '/45/DocAccLog', model: 'DocAccessLog' },
                { key: 'archive-jobs', label: 'Archive Jobs', endpoint: '/45/DocArchive', model: 'DocArchiveJob' },
                { key: 'audit-trails', label: 'Audit Trails', endpoint: '/45/DocAudit', model: 'DocAuditTrail' }
            ]
        }
    };

    Doc.submodules = ['DocStorage', 'DocWorkflow', 'DocIntegration', 'DocCompliance'];
})();
```

### 6c. Storage Submodule Example Files

#### `storage/storage-enums.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.DocStorage = window.DocStorage || {};
    DocStorage.enums = {};

    // DOCUMENT STATUS
    DocStorage.enums.DOCUMENT_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Under Review',
        3: 'Approved',
        4: 'Published',
        5: 'Archived',
        6: 'Deleted'
    };

    DocStorage.enums.DOCUMENT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-inactive',
        6: 'layer8d-status-terminated'
    };

    // DOCUMENT TYPE
    DocStorage.enums.DOCUMENT_TYPE = {
        0: 'Unspecified',
        1: 'Contract',
        2: 'Invoice',
        3: 'Report',
        4: 'Policy',
        5: 'Procedure',
        6: 'Form',
        7: 'Image',
        8: 'Spreadsheet',
        9: 'Presentation',
        10: 'Other'
    };

    // FILE FORMAT
    DocStorage.enums.FILE_FORMAT = {
        0: 'Unspecified',
        1: 'PDF',
        2: 'Word',
        3: 'Excel',
        4: 'PowerPoint',
        5: 'Image',
        6: 'Text',
        7: 'HTML',
        8: 'XML',
        9: 'JSON',
        10: 'Other'
    };

    // ACCESS LEVEL
    DocStorage.enums.ACCESS_LEVEL = {
        0: 'Unspecified',
        1: 'Public',
        2: 'Internal',
        3: 'Confidential',
        4: 'Restricted'
    };

    // RENDERERS
    DocStorage.render = {};

    DocStorage.render.documentStatus = Layer8DRenderers.createStatusRenderer(
        DocStorage.enums.DOCUMENT_STATUS,
        DocStorage.enums.DOCUMENT_STATUS_CLASSES
    );

    DocStorage.render.date = Layer8DRenderers.renderDate;
    DocStorage.render.fileSize = function(bytes) {
        if (!bytes) return '-';
        const units = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }
        return bytes.toFixed(1) + ' ' + units[i];
    };
})();
```

#### `storage/storage-columns.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.DocStorage = window.DocStorage || {};

    const { renderDate } = Layer8DRenderers;
    const render = DocStorage.render;
    const enums = DocStorage.enums;

    DocStorage.columns = {
        DocDocument: [
            { key: 'documentId', label: 'ID', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'documentType',
                label: 'Type',
                sortKey: 'documentType',
                render: (item) => enums.DOCUMENT_TYPE[item.documentType] || 'Unknown'
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.documentStatus(item.status)
            },
            {
                key: 'fileSize',
                label: 'Size',
                sortKey: 'fileSize',
                render: (item) => render.fileSize(item.fileSize)
            },
            { key: 'folderId', label: 'Folder', sortKey: 'folderId' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            {
                key: 'createdDate',
                label: 'Created',
                sortKey: 'createdDate',
                render: (item) => renderDate(item.createdDate)
            },
            {
                key: 'modifiedDate',
                label: 'Modified',
                sortKey: 'modifiedDate',
                render: (item) => renderDate(item.modifiedDate)
            }
        ],

        DocFolder: [
            { key: 'folderId', label: 'ID', sortKey: 'folderId', filterKey: 'folderId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'parentFolderId', label: 'Parent Folder', sortKey: 'parentFolderId' },
            { key: 'path', label: 'Path', sortKey: 'path' },
            {
                key: 'accessLevel',
                label: 'Access',
                sortKey: 'accessLevel',
                render: (item) => enums.ACCESS_LEVEL[item.accessLevel] || 'Unknown'
            },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' }
        ],

        DocCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'parentCategoryId', label: 'Parent', sortKey: 'parentCategoryId' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        DocTag: [
            { key: 'tagId', label: 'ID', sortKey: 'tagId', filterKey: 'tagId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'color', label: 'Color', sortKey: 'color' },
            { key: 'usageCount', label: 'Usage', sortKey: 'usageCount' }
        ],

        DocDocumentVersion: [
            { key: 'versionId', label: 'ID', sortKey: 'versionId', filterKey: 'versionId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'versionNumber', label: 'Version', sortKey: 'versionNumber' },
            { key: 'changeNotes', label: 'Notes', sortKey: 'changeNotes' },
            {
                key: 'fileSize',
                label: 'Size',
                sortKey: 'fileSize',
                render: (item) => render.fileSize(item.fileSize)
            },
            { key: 'createdBy', label: 'Created By', sortKey: 'createdBy' },
            {
                key: 'createdDate',
                label: 'Created',
                sortKey: 'createdDate',
                render: (item) => renderDate(item.createdDate)
            }
        ]
    };
})();
```

#### `storage/storage-forms.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.DocStorage = window.DocStorage || {};

    const enums = DocStorage.enums;

    DocStorage.forms = {
        DocDocument: {
            title: 'Document',
            sections: [
                {
                    title: 'Document Details',
                    fields: [
                        { key: 'name', label: 'Document Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'documentType', label: 'Type', type: 'select', options: enums.DOCUMENT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.DOCUMENT_STATUS },
                        { key: 'folderId', label: 'Folder', type: 'reference', lookupModel: 'DocFolder' },
                        { key: 'categoryId', label: 'Category', type: 'reference', lookupModel: 'DocCategory' }
                    ]
                },
                {
                    title: 'File Information',
                    fields: [
                        { key: 'fileName', label: 'File Name', type: 'text' },
                        { key: 'fileFormat', label: 'Format', type: 'select', options: enums.FILE_FORMAT },
                        { key: 'mimeType', label: 'MIME Type', type: 'text' }
                    ]
                },
                {
                    title: 'Access Control',
                    fields: [
                        { key: 'accessLevel', label: 'Access Level', type: 'select', options: enums.ACCESS_LEVEL },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isPublic', label: 'Public', type: 'checkbox' }
                    ]
                }
            ]
        },

        DocFolder: {
            title: 'Folder',
            sections: [
                {
                    title: 'Folder Details',
                    fields: [
                        { key: 'name', label: 'Folder Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'parentFolderId', label: 'Parent Folder', type: 'reference', lookupModel: 'DocFolder' },
                        { key: 'accessLevel', label: 'Access Level', type: 'select', options: enums.ACCESS_LEVEL },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        DocCategory: {
            title: 'Category',
            sections: [
                {
                    title: 'Category Details',
                    fields: [
                        { key: 'name', label: 'Category Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'parentCategoryId', label: 'Parent Category', type: 'reference', lookupModel: 'DocCategory' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        DocTag: {
            title: 'Tag',
            sections: [
                {
                    title: 'Tag Details',
                    fields: [
                        { key: 'name', label: 'Tag Name', type: 'text', required: true },
                        { key: 'color', label: 'Color', type: 'text' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        DocDocumentVersion: {
            title: 'Document Version',
            sections: [
                {
                    title: 'Version Details',
                    fields: [
                        { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                        { key: 'versionNumber', label: 'Version Number', type: 'number' },
                        { key: 'changeNotes', label: 'Change Notes', type: 'textarea' },
                        { key: 'isMajorVersion', label: 'Major Version', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

    DocStorage.primaryKeys = {
        DocDocument: 'documentId',
        DocFolder: 'folderId',
        DocCategory: 'categoryId',
        DocTag: 'tagId',
        DocDocumentVersion: 'versionId'
    };
})();
```

#### `storage/storage.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    // DocStorage namespace initialized by enum, column, and form files
    // This file can contain any additional storage-specific logic
})();
```

### 6d. Module Init File: `doc/doc-init.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DModuleFactory.create({
        namespace: 'Doc',
        defaultModule: 'storage',
        defaultService: 'documents',
        sectionSelector: 'storage',
        initializerName: 'initializeDoc',
        requiredNamespaces: ['DocStorage', 'DocWorkflow', 'DocIntegration', 'DocCompliance']
    });
})();
```

### 6e. Section HTML: `sections/documents.html`

Create section HTML following the CRM/BI pattern with:
- Header with parallax effect and document-themed SVG icons (files, folders, workflows)
- Module tabs: Storage, Workflow, Integration, Compliance
- Each module has subnav with all its services
- Table containers with IDs: `{module}-{service}-table-container`

Example structure:
```html
<div class="section-container hcm-section">
    <!-- Header with Parallax Effect (Document themed: files, folders, cloud) -->
    <div class="hcm-header-frame parallax-container">
        <!-- SVG with document icons -->
    </div>

    <!-- Module Tabs -->
    <div class="hcm-module-tabs">
        <button class="hcm-module-tab active" data-module="storage">Storage</button>
        <button class="hcm-module-tab" data-module="workflow">Workflow</button>
        <button class="hcm-module-tab" data-module="integration">Integration</button>
        <button class="hcm-module-tab" data-module="compliance">Compliance</button>
    </div>

    <div class="section-content">
        <!-- Storage Module (default active) -->
        <div class="hcm-module-content active" data-module="storage">
            <nav class="hcm-subnav">
                <a class="hcm-subnav-item active" data-service="documents">Documents</a>
                <a class="hcm-subnav-item" data-service="folders">Folders</a>
                <a class="hcm-subnav-item" data-service="categories">Categories</a>
                <a class="hcm-subnav-item" data-service="tags">Tags</a>
                <a class="hcm-subnav-item" data-service="versions">Versions</a>
            </nav>
            <div class="hcm-service-content">
                <div class="hcm-service-view active" data-service="documents">
                    <div class="hcm-table-container" id="storage-documents-table-container"></div>
                </div>
                <!-- ... other service views -->
            </div>
        </div>
        <!-- ... other modules -->
    </div>
</div>
```

### 6f. Wiring in `app.html`

Add after BI scripts:

```html
<!-- DOC CSS -->
<link rel="stylesheet" href="doc/doc.css">

<!-- DOC Reference Registry -->
<script src="js/reference-registry-doc.js"></script>

<!-- DOC Config -->
<script src="doc/doc-config.js"></script>

<!-- DOC Submodules -->
<script src="doc/storage/storage-enums.js"></script>
<script src="doc/storage/storage-columns.js"></script>
<script src="doc/storage/storage-forms.js"></script>
<script src="doc/storage/storage.js"></script>

<script src="doc/workflow/workflow-enums.js"></script>
<script src="doc/workflow/workflow-columns.js"></script>
<script src="doc/workflow/workflow-forms.js"></script>
<script src="doc/workflow/workflow.js"></script>

<script src="doc/integration/integration-enums.js"></script>
<script src="doc/integration/integration-columns.js"></script>
<script src="doc/integration/integration-forms.js"></script>
<script src="doc/integration/integration.js"></script>

<script src="doc/compliance/compliance-enums.js"></script>
<script src="doc/compliance/compliance-columns.js"></script>
<script src="doc/compliance/compliance-forms.js"></script>
<script src="doc/compliance/compliance.js"></script>

<!-- DOC Init (LAST) -->
<script src="doc/doc-init.js"></script>
```

### 6g. Wiring in `sections.js`

Add section mapping:

```javascript
const sections = {
    // ... existing sections
    documents: 'sections/documents.html'
};

const sectionInitializers = {
    // ... existing initializers
    documents: () => { if (typeof initializeDoc === 'function') initializeDoc(); }
};
```

---

## Step 7: Create Mobile UI (Mobile Parity)

### 7a. Directory Structure

Create `go/erp/ui/web/m/js/doc/` with files for each submodule:

```
m/js/doc/
├── storage-enums.js
├── storage-columns.js
├── storage-forms.js
├── workflow-enums.js
├── workflow-columns.js
├── workflow-forms.js
├── integration-enums.js
├── integration-columns.js
├── integration-forms.js
├── compliance-enums.js
├── compliance-columns.js
├── compliance-forms.js
└── doc-index.js
```

### 7b. Mobile Registry: `m/js/doc/doc-index.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    const modules = [
        MobileDocStorage,
        MobileDocWorkflow,
        MobileDocIntegration,
        MobileDocCompliance
    ];

    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) {
                return mod;
            }
        }
        return null;
    }

    window.MobileDoc = {
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
            Storage: MobileDocStorage,
            Workflow: MobileDocWorkflow,
            Integration: MobileDocIntegration,
            Compliance: MobileDocCompliance
        }
    };
})();
```

### 7c. Mobile Nav Config Update

In `l8ui/m/js/layer8m-nav-config.js`:

1. Update documents entry in modules list:
```javascript
{ key: 'documents', label: 'Documents', icon: 'documents', hasSubModules: true }
```

2. Add full config block:
```javascript
documents: {
    subModules: [
        { key: 'storage', label: 'Storage', icon: 'documents' },
        { key: 'workflow', label: 'Workflow', icon: 'documents' },
        { key: 'integration', label: 'Integration', icon: 'documents' },
        { key: 'compliance', label: 'Compliance', icon: 'documents' }
    ],
    services: {
        'storage': [
            { key: 'documents', label: 'Documents', icon: 'documents', endpoint: '/45/DocDoc', model: 'DocDocument', idField: 'documentId' },
            { key: 'folders', label: 'Folders', icon: 'documents', endpoint: '/45/DocFolder', model: 'DocFolder', idField: 'folderId' },
            { key: 'categories', label: 'Categories', icon: 'documents', endpoint: '/45/DocCategry', model: 'DocCategory', idField: 'categoryId' },
            { key: 'tags', label: 'Tags', icon: 'documents', endpoint: '/45/DocTag', model: 'DocTag', idField: 'tagId' },
            { key: 'versions', label: 'Versions', icon: 'documents', endpoint: '/45/DocVersion', model: 'DocDocumentVersion', idField: 'versionId' }
        ],
        'workflow': [
            { key: 'checkouts', label: 'Checkouts', icon: 'documents', endpoint: '/45/DocChkout', model: 'DocCheckout', idField: 'checkoutId' },
            { key: 'approval-workflows', label: 'Workflows', icon: 'documents', endpoint: '/45/DocAprvWf', model: 'DocApprovalWorkflow', idField: 'workflowId' },
            { key: 'workflow-steps', label: 'Steps', icon: 'documents', endpoint: '/45/DocWfStep', model: 'DocWorkflowStep', idField: 'stepId' },
            { key: 'signatures', label: 'Signatures', icon: 'documents', endpoint: '/45/DocSign', model: 'DocSignature', idField: 'signatureId' },
            { key: 'review-comments', label: 'Reviews', icon: 'documents', endpoint: '/45/DocReview', model: 'DocReviewComment', idField: 'commentId' }
        ],
        'integration': [
            { key: 'attachments', label: 'Attachments', icon: 'documents', endpoint: '/45/DocAttach', model: 'DocAttachment', idField: 'attachmentId' },
            { key: 'templates', label: 'Templates', icon: 'documents', endpoint: '/45/DocTmpl', model: 'DocTemplate', idField: 'templateId' },
            { key: 'template-fields', label: 'Fields', icon: 'documents', endpoint: '/45/DocTmplFld', model: 'DocTemplateField', idField: 'fieldId' },
            { key: 'email-captures', label: 'Emails', icon: 'documents', endpoint: '/45/DocEmail', model: 'DocEmailCapture', idField: 'captureId' },
            { key: 'scan-jobs', label: 'Scans', icon: 'documents', endpoint: '/45/DocScan', model: 'DocScanJob', idField: 'scanJobId' }
        ],
        'compliance': [
            { key: 'retention-policies', label: 'Retention', icon: 'documents', endpoint: '/45/DocRetPol', model: 'DocRetentionPolicy', idField: 'policyId' },
            { key: 'legal-holds', label: 'Legal Holds', icon: 'documents', endpoint: '/45/DocLglHold', model: 'DocLegalHold', idField: 'holdId' },
            { key: 'access-logs', label: 'Access Logs', icon: 'documents', endpoint: '/45/DocAccLog', model: 'DocAccessLog', idField: 'logId' },
            { key: 'archive-jobs', label: 'Archives', icon: 'documents', endpoint: '/45/DocArchive', model: 'DocArchiveJob', idField: 'jobId' },
            { key: 'audit-trails', label: 'Audit Trails', icon: 'documents', endpoint: '/45/DocAudit', model: 'DocAuditTrail', idField: 'trailId' }
        ]
    }
}
```

### 7d. Mobile Nav.js Update

In `layer8m-nav.js`, add `MobileDoc` to registry lookups in `_getServiceColumns`, `_getServiceFormDef`, etc.

### 7e. Mobile app.html Update

Add script tags and sidebar link:

```html
<!-- DOC Mobile Scripts -->
<script src="js/doc/storage-enums.js"></script>
<script src="js/doc/storage-columns.js"></script>
<script src="js/doc/storage-forms.js"></script>
<script src="js/doc/workflow-enums.js"></script>
<script src="js/doc/workflow-columns.js"></script>
<script src="js/doc/workflow-forms.js"></script>
<script src="js/doc/integration-enums.js"></script>
<script src="js/doc/integration-columns.js"></script>
<script src="js/doc/integration-forms.js"></script>
<script src="js/doc/compliance-enums.js"></script>
<script src="js/doc/compliance-columns.js"></script>
<script src="js/doc/compliance-forms.js"></script>
<script src="js/doc/doc-index.js"></script>

<!-- Sidebar -->
<a href="#dashboard" class="sidebar-item" data-section="dashboard" data-module="documents">
    <span class="sidebar-item-icon"><!-- Documents icon SVG --></span>
    Documents
</a>
```

---

## Step 8: Reference Registry Updates

### CRITICAL: Verify Field Names First

Before writing registry entries, grep the .pb.go files:

```bash
grep -A 30 "type DocDocument struct" go/types/doc/*.pb.go | grep 'json:"'
```

### Desktop Reference Registry

Create `js/reference-registry-doc.js`:

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DReferenceRegistry.register({
        // Storage
        DocDocument: {
            idColumn: 'documentId',
            displayColumn: 'name',
            selectColumns: ['documentId', 'name', 'documentType', 'status'],
            displayFormat: function(item) { return item.name; },
            displayLabel: 'Document'
        },
        DocFolder: {
            idColumn: 'folderId',
            displayColumn: 'name',
            selectColumns: ['folderId', 'name', 'path'],
            displayFormat: function(item) { return item.path ? item.path + '/' + item.name : item.name; },
            displayLabel: 'Folder'
        },
        DocCategory: {
            idColumn: 'categoryId',
            displayColumn: 'name',
            selectColumns: ['categoryId', 'name'],
            displayLabel: 'Category'
        },
        DocTag: {
            idColumn: 'tagId',
            displayColumn: 'name',
            selectColumns: ['tagId', 'name', 'color'],
            displayLabel: 'Tag'
        },
        DocDocumentVersion: {
            idColumn: 'versionId',
            displayColumn: 'versionNumber',
            selectColumns: ['versionId', 'documentId', 'versionNumber'],
            displayFormat: function(item) { return 'v' + item.versionNumber; },
            displayLabel: 'Version'
        },

        // Workflow
        DocApprovalWorkflow: {
            idColumn: 'workflowId',
            displayColumn: 'name',
            selectColumns: ['workflowId', 'name'],
            displayLabel: 'Approval Workflow'
        },
        DocCheckout: {
            idColumn: 'checkoutId',
            displayColumn: 'checkoutId',
            selectColumns: ['checkoutId', 'documentId'],
            displayLabel: 'Checkout'
        },

        // Integration
        DocTemplate: {
            idColumn: 'templateId',
            displayColumn: 'name',
            selectColumns: ['templateId', 'name', 'category'],
            displayLabel: 'Template'
        },
        DocAttachment: {
            idColumn: 'attachmentId',
            displayColumn: 'attachmentId',
            selectColumns: ['attachmentId', 'documentId', 'entityType', 'entityId'],
            displayFormat: function(item) { return item.entityType + ':' + item.entityId; },
            displayLabel: 'Attachment'
        },

        // Compliance
        DocRetentionPolicy: {
            idColumn: 'policyId',
            displayColumn: 'name',
            selectColumns: ['policyId', 'name', 'retentionDays'],
            displayLabel: 'Retention Policy'
        },
        DocLegalHold: {
            idColumn: 'holdId',
            displayColumn: 'name',
            selectColumns: ['holdId', 'name', 'status'],
            displayLabel: 'Legal Hold'
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
| 1 | DocCategory, DocTag, DocFolder, DocRetentionPolicy, DocTemplate | None (configuration) |
| 2 | DocDocument, DocApprovalWorkflow, DocLegalHold | Phase 1 + HCM Employee |
| 3 | DocDocumentVersion, DocCheckout, DocWorkflowStep, DocSignature, DocReviewComment, DocTemplateField | Phase 2 |
| 4 | DocAttachment, DocEmailCapture, DocScanJob, DocArchiveJob | Phase 2-3 |
| 5 | DocAccessLog, DocAuditTrail | Phase 2-4 (transaction logs) |

### Files to Create

| File | Contents |
|------|----------|
| `gen_doc_foundation.go` | Phase 1 (categories, tags, folders, policies, templates) |
| `gen_doc_storage.go` | Phases 2-3 (documents, versions) |
| `gen_doc_workflow.go` | Phases 2-3 (workflows, steps, checkouts, signatures, reviews) |
| `gen_doc_integration.go` | Phase 4 (attachments, emails, scans) |
| `gen_doc_compliance.go` | Phases 1, 4-5 (retention, legal holds, archives, logs) |
| `doc_phases.go` | Phase orchestration (all phases) |

### Mock Data Store Additions

Add to `store.go`:

```go
// DOC - Phase 1 (Configuration)
DocCategoryIDs          []string
DocTagIDs               []string
DocFolderIDs            []string
DocRetentionPolicyIDs   []string
DocTemplateIDs          []string

// DOC - Phase 2 (Core)
DocDocumentIDs          []string
DocApprovalWorkflowIDs  []string
DocLegalHoldIDs         []string

// DOC - Phase 3 (Dependent)
DocDocumentVersionIDs   []string
DocCheckoutIDs          []string
DocWorkflowStepIDs      []string
DocSignatureIDs         []string
DocReviewCommentIDs     []string
DocTemplateFieldIDs     []string

// DOC - Phase 4 (Integration)
DocAttachmentIDs        []string
DocEmailCaptureIDs      []string
DocScanJobIDs           []string
DocArchiveJobIDs        []string

// DOC - Phase 5 (Logs)
DocAccessLogIDs         []string
DocAuditTrailIDs        []string
```

---

## Step 10: Verify Build

1. Run `go build ./erp/doc/...`
2. Run `go vet ./erp/doc/...`
3. Run `go build ./erp/ui/...`
4. Verify UI loads in browser with Documents section
5. Verify mobile card navigation shows Documents
6. Run mock data generation

---

## Files Summary

### Files to Modify

| File | Change |
|------|--------|
| `proto/make-bindings.sh` | Add DOC proto docker runs |
| `go/erp/main/erp_main.go` | Add DOC imports and activation |
| `go/erp/ui/main.go` | Add registerDocTypes() |
| `go/erp/ui/web/js/sections.js` | Add `documents` section mapping and initializer |
| `go/erp/ui/web/app.html` | Add DOC CSS + script tags |
| `l8ui/m/js/layer8m-nav-config.js` | Update DOC module config (enable subModules) |
| `l8ui/m/js/layer8m-nav.js` | Add `MobileDoc` to registries |
| `m/app.html` | Add DOC scripts |
| Desktop reference registry | Add DOC models |
| Mobile reference registry | Add DOC models |
| `go/tests/mocks/store.go` | Add DOC ID slices |
| `go/tests/mocks/data.go` | Add DOC data arrays |
| `go/tests/mocks/main.go` | Add DOC phase calls |

### Files to Create

| Category | Count | Location |
|----------|-------|----------|
| Proto files | 5 | `proto/doc-*.proto` |
| Go services | 40 | `go/erp/doc/<service>/` (20 packages x 2 files) |
| Desktop UI config | 2 | `doc/doc-{config,init}.js` |
| Desktop UI CSS | 1 | `doc/doc.css` |
| Desktop submodule files | 16 | `doc/<sub>/{enums,columns,forms,entry}.js` |
| Desktop section HTML | 1 | `sections/documents.html` |
| Desktop reference registry | 1 | `js/reference-registry-doc.js` |
| Mobile submodule files | 12 | `m/js/doc/*` |
| Mobile registry | 1 | `m/js/doc/doc-index.js` |
| Mock generators | 6 | `go/tests/mocks/gen_doc_*.go, doc_phases.go` |
| **Total** | ~85 files | |

---

## Prime Objects Summary (20 total)

| # | Submodule | Prime Object | ServiceName | Primary Key |
|---|-----------|-------------|-------------|-------------|
| 1 | Storage | DocDocument | DocDoc | DocumentId |
| 2 | Storage | DocFolder | DocFolder | FolderId |
| 3 | Storage | DocCategory | DocCategry | CategoryId |
| 4 | Storage | DocTag | DocTag | TagId |
| 5 | Storage | DocDocumentVersion | DocVersion | VersionId |
| 6 | Workflow | DocCheckout | DocChkout | CheckoutId |
| 7 | Workflow | DocApprovalWorkflow | DocAprvWf | WorkflowId |
| 8 | Workflow | DocWorkflowStep | DocWfStep | StepId |
| 9 | Workflow | DocSignature | DocSign | SignatureId |
| 10 | Workflow | DocReviewComment | DocReview | CommentId |
| 11 | Integration | DocAttachment | DocAttach | AttachmentId |
| 12 | Integration | DocTemplate | DocTmpl | TemplateId |
| 13 | Integration | DocTemplateField | DocTmplFld | FieldId |
| 14 | Integration | DocEmailCapture | DocEmail | CaptureId |
| 15 | Integration | DocScanJob | DocScan | ScanJobId |
| 16 | Compliance | DocRetentionPolicy | DocRetPol | PolicyId |
| 17 | Compliance | DocLegalHold | DocLglHold | HoldId |
| 18 | Compliance | DocAccessLog | DocAccLog | LogId |
| 19 | Compliance | DocArchiveJob | DocArchive | JobId |
| 20 | Compliance | DocAuditTrail | DocAudit | TrailId |

**ServiceArea for ALL services: `byte(45)`**

**All ServiceName values are <= 10 characters.**

**All Proto type names and JS model names use `Doc` prefix.**
