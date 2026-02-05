/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * ERP Reference Registry - Documents Models
 * Registers Storage, Workflow, Integration, and Compliance models.
 */
Layer8DReferenceRegistry.register({
    // ========================================
    // Documents - Storage
    // ========================================
    DocDocument: {
        idColumn: 'documentId',
        displayColumn: 'title',
        selectColumns: ['documentId', 'title'],
        displayLabel: 'Document'
    },
    DocFolder: {
        idColumn: 'folderId',
        displayColumn: 'name',
        selectColumns: ['folderId', 'name'],
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
        selectColumns: ['tagId', 'name'],
        displayLabel: 'Tag'
    },
    DocDocumentVersion: {
        idColumn: 'versionId',
        displayColumn: 'versionNumber',
        selectColumns: ['versionId', 'versionNumber'],
        displayLabel: 'Version'
    },

    // ========================================
    // Documents - Workflow
    // ========================================
    DocCheckout: {
        idColumn: 'checkoutId',
        displayColumn: 'checkoutId'
    },
    DocApprovalWorkflow: {
        idColumn: 'workflowId',
        displayColumn: 'name',
        selectColumns: ['workflowId', 'name'],
        displayLabel: 'Approval Workflow'
    },
    DocWorkflowStep: {
        idColumn: 'stepId',
        displayColumn: 'name',
        selectColumns: ['stepId', 'name'],
        displayLabel: 'Workflow Step'
    },
    DocSignature: {
        idColumn: 'signatureId',
        displayColumn: 'signatureId'
    },
    DocReviewComment: {
        idColumn: 'commentId',
        displayColumn: 'commentId'
    },

    // ========================================
    // Documents - Integration
    // ========================================
    DocAttachment: {
        idColumn: 'attachmentId',
        displayColumn: 'fileName',
        selectColumns: ['attachmentId', 'fileName'],
        displayLabel: 'Attachment'
    },
    DocTemplate: {
        idColumn: 'templateId',
        displayColumn: 'name',
        selectColumns: ['templateId', 'name'],
        displayLabel: 'Template'
    },
    DocTemplateField: {
        idColumn: 'fieldId',
        displayColumn: 'name',
        selectColumns: ['fieldId', 'name'],
        displayLabel: 'Template Field'
    },
    DocEmailCapture: {
        idColumn: 'captureId',
        displayColumn: 'subject',
        selectColumns: ['captureId', 'subject'],
        displayLabel: 'Email Capture'
    },
    DocScanJob: {
        idColumn: 'scanJobId',
        displayColumn: 'scanJobId'
    },

    // ========================================
    // Documents - Compliance
    // ========================================
    DocRetentionPolicy: {
        idColumn: 'policyId',
        displayColumn: 'name',
        selectColumns: ['policyId', 'name'],
        displayLabel: 'Retention Policy'
    },
    DocLegalHold: {
        idColumn: 'holdId',
        displayColumn: 'name',
        selectColumns: ['holdId', 'name'],
        displayLabel: 'Legal Hold'
    },
    DocAccessLog: {
        idColumn: 'logId',
        displayColumn: 'logId'
    },
    DocArchiveJob: {
        idColumn: 'jobId',
        displayColumn: 'jobId'
    },
    DocAuditTrail: {
        idColumn: 'trailId',
        displayColumn: 'trailId'
    }
});
