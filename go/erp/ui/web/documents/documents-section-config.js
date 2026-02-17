/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Documents Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('documents', {
        title: 'Document Management',
        subtitle: 'Storage, Workflow, Integration & Compliance',
        icon: '📁',
        svgContent: Layer8SvgFactory.generate('documents'),
        initFn: 'initializeDoc',
        modules: [
            {
                key: 'storage', label: 'Storage', icon: '📄', isDefault: true,
                services: [
                    { key: 'documents', label: 'Documents', icon: '📄', isDefault: true },
                    { key: 'folders', label: 'Folders', icon: '📁' },
                    { key: 'categories', label: 'Categories', icon: '🏷️' },
                    { key: 'tags', label: 'Tags', icon: '🔖' }
                ]
            },
            {
                key: 'workflow', label: 'Workflow', icon: '🔄',
                services: [
                    { key: 'approval-workflows', label: 'Approvals', icon: '✅', isDefault: true }
                ]
            },
            {
                key: 'integration', label: 'Integration', icon: '🔗',
                services: [
                    { key: 'templates', label: 'Templates', icon: '📋', isDefault: true },
                    { key: 'email-captures', label: 'Email Capture', icon: '📧' },
                    { key: 'scan-jobs', label: 'Scan Jobs', icon: '🖨️' }
                ]
            },
            {
                key: 'compliance', label: 'Compliance', icon: '🛡️',
                services: [
                    { key: 'retention-policies', label: 'Retention', icon: '📅', isDefault: true },
                    { key: 'legal-holds', label: 'Legal Holds', icon: '⚖️' },
                    { key: 'archive-jobs', label: 'Archives', icon: '🗄️' }
                ]
            }
        ]
    });
})();
