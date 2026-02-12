/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - CRM Module
 * Reference configurations for Customer Relationship Management models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refCrmM = window.Layer8RefFactory;

window.Layer8MReferenceRegistryCRM = {
    // ========================================
    // CRM - Leads Management
    // ========================================
    // Custom displayFormat for lead (firstName lastName (company))
    CrmLead: {
        idColumn: 'leadId',
        displayColumn: 'lastName',
        selectColumns: ['leadId', 'firstName', 'lastName', 'company'],
        displayFormat: function(item) {
            return item.firstName + ' ' + item.lastName + (item.company ? ' (' + item.company + ')' : '');
        },
        displayLabel: 'Lead'
    },
    ...refCrmM.simple('CrmLeadSource', 'sourceId', 'name'),
    ...refCrmM.simple('CrmLeadScore', 'scoreId', 'name'),
    ...refCrmM.simple('CrmLeadAssign', 'assignmentId', 'name'),

    // ========================================
    // CRM - Opportunities Management
    // ========================================
    ...refCrmM.simple('CrmOpportunity', 'opportunityId', 'name', 'Opportunity'),
    ...refCrmM.simple('CrmOppStage', 'stageId', 'name'),

    // ========================================
    // CRM - Accounts Management
    // ========================================
    ...refCrmM.simple('CrmAccount', 'accountId', 'name', 'Account'),
    ...refCrmM.person('CrmContact', 'contactId', 'lastName', 'firstName'),
    ...refCrmM.simple('CrmInteraction', 'interactionId', 'subject'),
    ...refCrmM.idOnly('CrmRelationship', 'relationshipId'),

    // ========================================
    // CRM - Marketing Management
    // ========================================
    ...refCrmM.simple('CrmCampaign', 'campaignId', 'name', 'Campaign'),
    ...refCrmM.simple('CrmEmailTemplate', 'templateId', 'name'),
    ...refCrmM.simple('CrmMarketingList', 'listId', 'name'),

    // ========================================
    // CRM - Customer Service
    // ========================================
    // Custom displayFormat for case (caseNumber - subject)
    CrmCase: {
        idColumn: 'caseId',
        displayColumn: 'subject',
        selectColumns: ['caseId', 'caseNumber', 'subject'],
        displayFormat: function(item) {
            return item.caseNumber + ' - ' + item.subject;
        },
        displayLabel: 'Case'
    },
    // Custom displayFormat for KB article (articleNumber - title)
    CrmKBArticle: {
        idColumn: 'articleId',
        displayColumn: 'title',
        selectColumns: ['articleId', 'articleNumber', 'title'],
        displayFormat: function(item) {
            return item.articleNumber + ' - ' + item.title;
        },
        displayLabel: 'KB Article'
    },
    ...refCrmM.simple('CrmSLA', 'slaId', 'name'),
    ...refCrmM.simple('CrmEscalation', 'escalationId', 'name'),
    ...refCrmM.simple('CrmSurvey', 'surveyId', 'name'),

    // ========================================
    // CRM - Field Service
    // ========================================
    ...refCrmM.simple('CrmServiceOrder', 'orderId', 'orderNumber', 'Service Order'),
    ...refCrmM.simple('CrmTechnician', 'technicianId', 'name', 'Technician'),
    ...refCrmM.simple('CrmServiceContract', 'contractId', 'contractNumber', 'Service Contract'),
    ...refCrmM.idOnly('CrmServiceSchedule', 'scheduleId')
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryCRM);
