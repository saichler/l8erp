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
            icon: '📄',
            services: [
                { key: 'documents', label: 'Documents', icon: '📄', endpoint: '/45/DocDoc', model: 'DocDocument' },
                { key: 'folders', label: 'Folders', icon: '📁', endpoint: '/45/DocFolder', model: 'DocFolder' },
                { key: 'categories', label: 'Categories', icon: '🏷️', endpoint: '/45/DocCategry', model: 'DocCategory' },
                { key: 'tags', label: 'Tags', icon: '🔖', endpoint: '/45/DocTag', model: 'DocTag' },
                { key: 'versions', label: 'Versions', icon: '📚', endpoint: '/45/DocVersion', model: 'DocDocumentVersion' }
            ]
        },
        'workflow': {
            label: 'Workflow',
            icon: '🔄',
            services: [
                { key: 'checkouts', label: 'Checkouts', icon: '🔓', endpoint: '/45/DocChkout', model: 'DocCheckout' },
                { key: 'approval-workflows', label: 'Approvals', icon: '✅', endpoint: '/45/DocAprvWf', model: 'DocApprovalWorkflow' },
                { key: 'workflow-steps', label: 'Steps', icon: '🔢', endpoint: '/45/DocWfStep', model: 'DocWorkflowStep' },
                { key: 'signatures', label: 'Signatures', icon: '✍️', endpoint: '/45/DocSign', model: 'DocSignature' },
                { key: 'review-comments', label: 'Comments', icon: '💬', endpoint: '/45/DocReview', model: 'DocReviewComment' }
            ]
        },
        'integration': {
            label: 'Integration',
            icon: '🔗',
            services: [
                { key: 'attachments', label: 'Attachments', icon: '📎', endpoint: '/45/DocAttach', model: 'DocAttachment' },
                { key: 'templates', label: 'Templates', icon: '📋', endpoint: '/45/DocTmpl', model: 'DocTemplate' },
                { key: 'template-fields', label: 'Fields', icon: '🔤', endpoint: '/45/DocTmplFld', model: 'DocTemplateField' },
                { key: 'email-captures', label: 'Email Capture', icon: '📧', endpoint: '/45/DocEmail', model: 'DocEmailCapture' },
                { key: 'scan-jobs', label: 'Scan Jobs', icon: '🖨️', endpoint: '/45/DocScan', model: 'DocScanJob' }
            ]
        },
        'compliance': {
            label: 'Compliance',
            icon: '🛡️',
            services: [
                { key: 'retention-policies', label: 'Retention', icon: '📅', endpoint: '/45/DocRetPol', model: 'DocRetentionPolicy' },
                { key: 'legal-holds', label: 'Legal Holds', icon: '⚖️', endpoint: '/45/DocLglHold', model: 'DocLegalHold' },
                { key: 'access-logs', label: 'Access Logs', icon: '📊', endpoint: '/45/DocAccLog', model: 'DocAccessLog' },
                { key: 'archive-jobs', label: 'Archives', icon: '🗄️', endpoint: '/45/DocArchive', model: 'DocArchiveJob' },
                { key: 'audit-trails', label: 'Audit Trails', icon: '🔍', endpoint: '/45/DocAudit', model: 'DocAuditTrail' }
            ]
        }
    };

    Doc.submodules = ['DocStorage', 'DocWorkflow', 'DocIntegration', 'DocCompliance'];
})();
