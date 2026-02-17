/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - Documents Module
 * Reference configurations for Document Management models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refDocM = window.Layer8RefFactory;

window.Layer8MReferenceRegistryDocuments = {
    // ========================================
    // Storage
    // ========================================
    ...refDocM.simple('DocDocument', 'documentId', 'title', 'Document'),
    ...refDocM.batch([
        ['DocFolder', 'folderId', 'name'],
        ['DocCategory', 'categoryId', 'name'],
        ['DocTag', 'tagId', 'name']
    ]),

    // ========================================
    // Workflow
    // ========================================
    ...refDocM.simple('DocApprovalWorkflow', 'workflowId', 'name', 'Approval Workflow'),

    // ========================================
    // Integration
    // ========================================
    ...refDocM.simple('DocTemplate', 'templateId', 'name', 'Template'),
    ...refDocM.simple('DocEmailCapture', 'captureId', 'subject', 'Email Capture'),
    ...refDocM.idOnly('DocScanJob', 'scanJobId'),

    // ========================================
    // Compliance
    // ========================================
    ...refDocM.batch([
        ['DocRetentionPolicy', 'policyId', 'name'],
        ['DocLegalHold', 'holdId', 'name']
    ]),
    ...refDocM.idOnly('DocArchiveJob', 'jobId')
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryDocuments);
