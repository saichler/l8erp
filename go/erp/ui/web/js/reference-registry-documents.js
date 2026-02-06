/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * ERP Reference Registry - Documents Models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refDoc = window.Layer8RefFactory;

Layer8DReferenceRegistry.register({
    // ========================================
    // Documents - Storage
    // ========================================
    ...refDoc.simple('DocDocument', 'documentId', 'title', 'Document'),
    ...refDoc.batch([
        ['DocFolder', 'folderId', 'name'],
        ['DocCategory', 'categoryId', 'name'],
        ['DocTag', 'tagId', 'name']
    ]),
    ...refDoc.simple('DocDocumentVersion', 'versionId', 'versionNumber', 'Version'),

    // ========================================
    // Documents - Workflow
    // ========================================
    ...refDoc.idOnly('DocCheckout', 'checkoutId'),
    ...refDoc.batch([
        ['DocApprovalWorkflow', 'workflowId', 'name'],
        ['DocWorkflowStep', 'stepId', 'name']
    ]),
    ...refDoc.batchIdOnly([
        ['DocSignature', 'signatureId'],
        ['DocReviewComment', 'commentId']
    ]),

    // ========================================
    // Documents - Integration
    // ========================================
    ...refDoc.simple('DocAttachment', 'attachmentId', 'fileName', 'Attachment'),
    ...refDoc.batch([
        ['DocTemplate', 'templateId', 'name'],
        ['DocTemplateField', 'fieldId', 'name']
    ]),
    ...refDoc.simple('DocEmailCapture', 'captureId', 'subject', 'Email Capture'),
    ...refDoc.idOnly('DocScanJob', 'scanJobId'),

    // ========================================
    // Documents - Compliance
    // ========================================
    ...refDoc.batch([
        ['DocRetentionPolicy', 'policyId', 'name'],
        ['DocLegalHold', 'holdId', 'name']
    ]),
    ...refDoc.batchIdOnly([
        ['DocAccessLog', 'logId'],
        ['DocArchiveJob', 'jobId'],
        ['DocAuditTrail', 'trailId']
    ])
});
