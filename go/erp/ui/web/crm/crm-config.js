/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// CRM Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'Crm',
    modules: {
        'leads': {
            label: 'Leads', icon: '🎯',
            services: [
                { key: 'leads', label: 'Leads', icon: '👤', endpoint: '/80/CrmLead', model: 'CrmLead', supportedViews: ['table', 'kanban'] },
                { key: 'lead-sources', label: 'Lead Sources', icon: '📥', endpoint: '/80/CrmLeadSrc', model: 'CrmLeadSource' },
                { key: 'lead-scores', label: 'Lead Scores', icon: '📊', endpoint: '/80/CrmLdScore', model: 'CrmLeadScore' },
                { key: 'lead-assigns', label: 'Assignments', icon: '👥', endpoint: '/80/CrmLdAssn', model: 'CrmLeadAssign' }
            ]
        },
        'opportunities': {
            label: 'Opportunities', icon: '💼',
            services: [
                { key: 'opportunities', label: 'Opportunities', icon: '💰', endpoint: '/80/CrmOpp', model: 'CrmOpportunity', supportedViews: ['table', 'kanban'] },
                { key: 'opp-stages', label: 'Sales Stages', icon: '📈', endpoint: '/80/CrmOppStg', model: 'CrmOppStage' }
            ]
        },
        'accounts': {
            label: 'Accounts', icon: '🏢',
            services: [
                { key: 'accounts', label: 'Accounts', icon: '🏢', endpoint: '/80/CrmAcct', model: 'CrmAccount' },
                { key: 'contacts', label: 'Contacts', icon: '👤', endpoint: '/80/CrmContact', model: 'CrmContact' },
                { key: 'interactions', label: 'Interactions', icon: '💬', endpoint: '/80/CrmIntrctn', model: 'CrmInteraction' },
                { key: 'relationships', label: 'Relationships', icon: '🔗', endpoint: '/80/CrmRelshp', model: 'CrmRelationship' }
            ]
        },
        'marketing': {
            label: 'Marketing', icon: '📣',
            services: [
                { key: 'campaigns', label: 'Campaigns', icon: '📢', endpoint: '/80/CrmCmpgn', model: 'CrmCampaign', supportedViews: ['table', 'timeline'] },
                { key: 'email-templates', label: 'Email Templates', icon: '✉️', endpoint: '/80/CrmEmailTp', model: 'CrmEmailTemplate' },
                { key: 'marketing-lists', label: 'Lists', icon: '📋', endpoint: '/80/CrmMktList', model: 'CrmMarketingList' }
            ]
        },
        'service': {
            label: 'Service', icon: '🎧',
            services: [
                { key: 'cases', label: 'Cases', icon: '📁', endpoint: '/80/CrmCase', model: 'CrmCase', supportedViews: ['table', 'kanban'] },
                { key: 'kb-articles', label: 'Knowledge Base', icon: '📚', endpoint: '/80/CrmKBart', model: 'CrmKBArticle' },
                { key: 'slas', label: 'SLAs', icon: '⏱️', endpoint: '/80/CrmSLA', model: 'CrmSLA' },
                { key: 'escalations', label: 'Escalations', icon: '⚠️', endpoint: '/80/CrmEscal', model: 'CrmEscalation' },
                { key: 'surveys', label: 'Surveys', icon: '📝', endpoint: '/80/CrmSurvey', model: 'CrmSurvey' }
            ]
        },
        'fieldservice': {
            label: 'Field Service', icon: '🔧',
            services: [
                { key: 'service-orders', label: 'Service Orders', icon: '📋', endpoint: '/80/CrmSvcOrd', model: 'CrmServiceOrder', supportedViews: ['table', 'kanban', 'calendar'] },
                { key: 'technicians', label: 'Technicians', icon: '👷', endpoint: '/80/CrmTech', model: 'CrmTechnician' },
                { key: 'service-contracts', label: 'Contracts', icon: '📄', endpoint: '/80/CrmSvcCntr', model: 'CrmServiceContract' },
                { key: 'service-schedules', label: 'Schedules', icon: '📅', endpoint: '/80/CrmSvcSchd', model: 'CrmServiceSchedule', supportedViews: ['table', 'calendar'] }
            ]
        },
        'reports': {
            label: 'Reports', icon: '📊',
            services: [
                { key: 'module-reports', label: 'Reports', endpoint: '/80/CrmReport', model: 'FinReport' }
            ]
        }
    },
    submodules: ['CrmLeads', 'CrmOpportunities', 'CrmAccounts', 'CrmMarketing', 'CrmService', 'CrmFieldService', 'Reports']
});
