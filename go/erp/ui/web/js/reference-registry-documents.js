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

    // ========================================
    // Documents - Workflow
    // ========================================
    ...refDoc.simple('DocApprovalWorkflow', 'workflowId', 'name', 'Approval Workflow'),

    // ========================================
    // Documents - Integration
    // ========================================
    ...refDoc.simple('DocTemplate', 'templateId', 'name', 'Template'),
    ...refDoc.simple('DocEmailCapture', 'captureId', 'subject', 'Email Capture'),
    ...refDoc.idOnly('DocScanJob', 'scanJobId'),

    // ========================================
    // Documents - Compliance
    // ========================================
    ...refDoc.batch([
        ['DocRetentionPolicy', 'policyId', 'name'],
        ['DocLegalHold', 'holdId', 'name']
    ]),
    ...refDoc.idOnly('DocArchiveJob', 'jobId')
});
