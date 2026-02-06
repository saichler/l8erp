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
                { key: 'leads', label: 'Leads', icon: '👤', endpoint: '/80/CrmLead', model: 'CrmLead' },
                { key: 'lead-sources', label: 'Lead Sources', icon: '📥', endpoint: '/80/CrmLeadSrc', model: 'CrmLeadSource' },
                { key: 'lead-scores', label: 'Lead Scores', icon: '📊', endpoint: '/80/CrmLdScore', model: 'CrmLeadScore' },
                { key: 'lead-activities', label: 'Activities', icon: '📝', endpoint: '/80/CrmLdAct', model: 'CrmLeadActivity' },
                { key: 'lead-assigns', label: 'Assignments', icon: '👥', endpoint: '/80/CrmLdAssn', model: 'CrmLeadAssign' },
                { key: 'lead-conversions', label: 'Conversions', icon: '✅', endpoint: '/80/CrmLdConv', model: 'CrmLeadConversion' }
            ]
        },
        'opportunities': {
            label: 'Opportunities', icon: '💼',
            services: [
                { key: 'opportunities', label: 'Opportunities', icon: '💰', endpoint: '/80/CrmOpp', model: 'CrmOpportunity' },
                { key: 'opp-stages', label: 'Sales Stages', icon: '📈', endpoint: '/80/CrmOppStg', model: 'CrmOppStage' },
                { key: 'opp-competitors', label: 'Competitors', icon: '🏆', endpoint: '/80/CrmOppComp', model: 'CrmOppCompetitor' },
                { key: 'opp-products', label: 'Products', icon: '📦', endpoint: '/80/CrmOppProd', model: 'CrmOppProduct' },
                { key: 'opp-teams', label: 'Teams', icon: '👥', endpoint: '/80/CrmOppTeam', model: 'CrmOppTeam' },
                { key: 'opp-activities', label: 'Activities', icon: '📝', endpoint: '/80/CrmOppAct', model: 'CrmOppActivity' }
            ]
        },
        'accounts': {
            label: 'Accounts', icon: '🏢',
            services: [
                { key: 'accounts', label: 'Accounts', icon: '🏢', endpoint: '/80/CrmAcct', model: 'CrmAccount' },
                { key: 'contacts', label: 'Contacts', icon: '👤', endpoint: '/80/CrmContact', model: 'CrmContact' },
                { key: 'interactions', label: 'Interactions', icon: '💬', endpoint: '/80/CrmIntrctn', model: 'CrmInteraction' },
                { key: 'relationships', label: 'Relationships', icon: '🔗', endpoint: '/80/CrmRelshp', model: 'CrmRelationship' },
                { key: 'health-scores', label: 'Health Scores', icon: '❤️', endpoint: '/80/CrmHealth', model: 'CrmHealthScore' },
                { key: 'account-plans', label: 'Account Plans', icon: '📋', endpoint: '/80/CrmAcctPln', model: 'CrmAccountPlan' }
            ]
        },
        'marketing': {
            label: 'Marketing', icon: '📣',
            services: [
                { key: 'campaigns', label: 'Campaigns', icon: '📢', endpoint: '/80/CrmCmpgn', model: 'CrmCampaign' },
                { key: 'campaign-members', label: 'Members', icon: '👥', endpoint: '/80/CrmCmpgMbr', model: 'CrmCampaignMember' },
                { key: 'email-templates', label: 'Email Templates', icon: '✉️', endpoint: '/80/CrmEmailTp', model: 'CrmEmailTemplate' },
                { key: 'marketing-lists', label: 'Lists', icon: '📋', endpoint: '/80/CrmMktList', model: 'CrmMarketingList' },
                { key: 'campaign-responses', label: 'Responses', icon: '📩', endpoint: '/80/CrmCmpgRsp', model: 'CrmCampaignResponse' },
                { key: 'campaign-rois', label: 'ROI Tracking', icon: '📊', endpoint: '/80/CrmCmpgROI', model: 'CrmCampaignROI' }
            ]
        },
        'service': {
            label: 'Service', icon: '🎧',
            services: [
                { key: 'cases', label: 'Cases', icon: '📁', endpoint: '/80/CrmCase', model: 'CrmCase' },
                { key: 'case-comments', label: 'Comments', icon: '💬', endpoint: '/80/CrmCaseCmt', model: 'CrmCaseComment' },
                { key: 'kb-articles', label: 'Knowledge Base', icon: '📚', endpoint: '/80/CrmKBart', model: 'CrmKBArticle' },
                { key: 'slas', label: 'SLAs', icon: '⏱️', endpoint: '/80/CrmSLA', model: 'CrmSLA' },
                { key: 'escalations', label: 'Escalations', icon: '⚠️', endpoint: '/80/CrmEscal', model: 'CrmEscalation' },
                { key: 'surveys', label: 'Surveys', icon: '📝', endpoint: '/80/CrmSurvey', model: 'CrmSurvey' }
            ]
        },
        'fieldservice': {
            label: 'Field Service', icon: '🔧',
            services: [
                { key: 'service-orders', label: 'Service Orders', icon: '📋', endpoint: '/80/CrmSvcOrd', model: 'CrmServiceOrder' },
                { key: 'technicians', label: 'Technicians', icon: '👷', endpoint: '/80/CrmTech', model: 'CrmTechnician' },
                { key: 'service-contracts', label: 'Contracts', icon: '📄', endpoint: '/80/CrmSvcCntr', model: 'CrmServiceContract' },
                { key: 'service-schedules', label: 'Schedules', icon: '📅', endpoint: '/80/CrmSvcSchd', model: 'CrmServiceSchedule' },
                { key: 'service-parts', label: 'Parts', icon: '🔩', endpoint: '/80/CrmSvcPart', model: 'CrmServicePart' },
                { key: 'service-visits', label: 'Visits', icon: '🚗', endpoint: '/80/CrmSvcVst', model: 'CrmServiceVisit' }
            ]
        }
    },
    submodules: ['CrmLeads', 'CrmOpportunities', 'CrmAccounts', 'CrmMarketing', 'CrmService', 'CrmFieldService']
});
