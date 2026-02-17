/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Documents Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'Doc',
    modules: {
        'storage': {
            label: 'Storage', icon: '📄',
            services: [
                { key: 'documents', label: 'Documents', icon: '📄', endpoint: '/45/DocDoc', model: 'DocDocument' },
                { key: 'folders', label: 'Folders', icon: '📁', endpoint: '/45/DocFolder', model: 'DocFolder' },
                { key: 'categories', label: 'Categories', icon: '🏷️', endpoint: '/45/DocCategry', model: 'DocCategory' },
                { key: 'tags', label: 'Tags', icon: '🔖', endpoint: '/45/DocTag', model: 'DocTag' }
            ]
        },
        'workflow': {
            label: 'Workflow', icon: '🔄',
            services: [
                { key: 'approval-workflows', label: 'Approvals', icon: '✅', endpoint: '/45/DocAprvWf', model: 'DocApprovalWorkflow' }
            ]
        },
        'integration': {
            label: 'Integration', icon: '🔗',
            services: [
                { key: 'templates', label: 'Templates', icon: '📋', endpoint: '/45/DocTmpl', model: 'DocTemplate' },
                { key: 'email-captures', label: 'Email Capture', icon: '📧', endpoint: '/45/DocEmail', model: 'DocEmailCapture' },
                { key: 'scan-jobs', label: 'Scan Jobs', icon: '🖨️', endpoint: '/45/DocScan', model: 'DocScanJob' }
            ]
        },
        'compliance': {
            label: 'Compliance', icon: '🛡️',
            services: [
                { key: 'retention-policies', label: 'Retention', icon: '📅', endpoint: '/45/DocRetPol', model: 'DocRetentionPolicy' },
                { key: 'legal-holds', label: 'Legal Holds', icon: '⚖️', endpoint: '/45/DocLglHold', model: 'DocLegalHold' },
                { key: 'archive-jobs', label: 'Archives', icon: '🗄️', endpoint: '/45/DocArchive', model: 'DocArchiveJob' }
            ]
        }
    },
    submodules: ['DocStorage', 'DocWorkflow', 'DocIntegration', 'DocCompliance']
});
