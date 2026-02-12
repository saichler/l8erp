/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// CRM Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('crm', {
        title: 'Customer Relationship Management',
        subtitle: 'Leads, Opportunities, Accounts, Marketing, Service & Field Service',
        icon: '🤝',
        svgContent: Layer8SvgFactory.generate('crm'),
        initFn: 'initializeCrm',
        modules: [
            {
                key: 'leads', label: 'Leads', icon: '🎯',
                services: [
                    { key: 'leads', label: 'Leads', icon: '🎯', isDefault: true },
                    { key: 'lead-sources', label: 'Lead Sources', icon: '📍' },
                    { key: 'lead-scores', label: 'Lead Scores', icon: '📊' },
                    { key: 'lead-assigns', label: 'Assignments', icon: '👤' }
                ]
            },
            {
                key: 'opportunities', label: 'Opportunities', icon: '💼', isDefault: true,
                services: [
                    { key: 'opportunities', label: 'Opportunities', icon: '💼', isDefault: true },
                    { key: 'opp-stages', label: 'Stages', icon: '📈' }
                ]
            },
            {
                key: 'accounts', label: 'Accounts', icon: '🏢',
                services: [
                    { key: 'accounts', label: 'Accounts', icon: '🏢', isDefault: true },
                    { key: 'contacts', label: 'Contacts', icon: '👤' },
                    { key: 'interactions', label: 'Interactions', icon: '💬' },
                    { key: 'relationships', label: 'Relationships', icon: '🔗' }
                ]
            },
            {
                key: 'marketing', label: 'Marketing', icon: '📣',
                services: [
                    { key: 'campaigns', label: 'Campaigns', icon: '📣', isDefault: true },
                    { key: 'email-templates', label: 'Email Templates', icon: '📧' },
                    { key: 'marketing-lists', label: 'Marketing Lists', icon: '📋' }
                ]
            },
            {
                key: 'service', label: 'Service', icon: '🎧',
                services: [
                    { key: 'cases', label: 'Cases', icon: '🎫', isDefault: true },
                    { key: 'kb-articles', label: 'KB Articles', icon: '📚' },
                    { key: 'slas', label: 'SLAs', icon: '⏱️' },
                    { key: 'escalations', label: 'Escalations', icon: '🚨' },
                    { key: 'surveys', label: 'Surveys', icon: '📝' }
                ]
            },
            {
                key: 'fieldservice', label: 'Field Service', icon: '🔧',
                services: [
                    { key: 'service-orders', label: 'Service Orders', icon: '📋', isDefault: true },
                    { key: 'technicians', label: 'Technicians', icon: '👷' },
                    { key: 'service-contracts', label: 'Contracts', icon: '📄' },
                    { key: 'service-schedules', label: 'Schedules', icon: '📅' }
                ]
            }
        ]
    });
})();
