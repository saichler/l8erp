/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCrmLeads.enums;
    const render = MobileCrmLeads.render;

    MobileCrmLeads.columns = {
        CrmLead: [
            ...col.id('leadId'),
            ...col.col('firstName', 'First Name'),
            ...col.col('lastName', 'Last Name'),
            ...col.col('email', 'Email'),
            ...col.col('company', 'Company'),
            ...col.col('title', 'Title'),
            ...col.status('status', 'Status', enums.LEAD_STATUS_VALUES, render.leadStatus),
            ...col.enum('rating', 'Rating', null, render.leadRating)
        ],

        CrmLeadSource: [
            ...col.id('sourceId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.status('sourceType', 'Type', enums.LEAD_SOURCE_TYPE_VALUES, render.leadSourceType),
            ...col.boolean('isActive', 'Active')
        ],

        CrmLeadScore: [
            ...col.id('scoreId'),
            ...col.col('name', 'Name'),
            ...col.col('fieldName', 'Field'),
            ...col.col('scoreValue', 'Score'),
            ...col.boolean('isActive', 'Active')
        ],

        CrmLeadActivity: [
            ...col.id('activityId'),
            ...col.col('leadId', 'Lead'),
            ...col.status('activityType', 'Type', enums.ACTIVITY_TYPE_VALUES, render.activityType),
            ...col.col('subject', 'Subject'),
            ...col.status('status', 'Status', enums.ACTIVITY_STATUS_VALUES, render.activityStatus),
            ...col.date('activityDate', 'Date')
        ],

        CrmLeadAssign: [
            ...col.id('assignmentId'),
            ...col.col('name', 'Name'),
            ...col.col('criteriaField', 'Criteria Field'),
            ...col.col('priority', 'Priority'),
            ...col.boolean('roundRobin', 'Round Robin'),
            ...col.boolean('isActive', 'Active')
        ],

        CrmLeadConversion: [
            ...col.id('conversionId'),
            ...col.col('leadId', 'Lead'),
            ...col.col('accountId', 'Account'),
            ...col.col('contactId', 'Contact'),
            ...col.date('conversionDate', 'Date'),
            ...col.boolean('createOpportunity', 'Created Opp')
        ]
    };

    MobileCrmLeads.primaryKeys = {
        CrmLead: 'leadId', CrmLeadSource: 'sourceId', CrmLeadScore: 'scoreId',
        CrmLeadActivity: 'activityId', CrmLeadAssign: 'assignmentId', CrmLeadConversion: 'conversionId'
    };

})();
