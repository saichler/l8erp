/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmLeads.enums;
    const render = MobileCrmLeads.render;

    MobileCrmLeads.columns = {
        CrmLead: [
            { key: 'leadId', label: 'ID', sortKey: 'leadId', filterKey: 'leadId' },
            { key: 'firstName', label: 'First Name', sortKey: 'firstName', filterKey: 'firstName' },
            { key: 'lastName', label: 'Last Name', sortKey: 'lastName', filterKey: 'lastName' },
            { key: 'email', label: 'Email', sortKey: 'email', filterKey: 'email' },
            { key: 'company', label: 'Company', sortKey: 'company', filterKey: 'company' },
            { key: 'title', label: 'Title', sortKey: 'title' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.LEAD_STATUS_VALUES, render: (item) => render.leadStatus(item.status) },
            { key: 'rating', label: 'Rating', sortKey: 'rating', render: (item) => render.leadRating(item.rating) }
        ],

        CrmLeadSource: [
            { key: 'sourceId', label: 'ID', sortKey: 'sourceId', filterKey: 'sourceId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'sourceType', label: 'Type', sortKey: 'sourceType', enumValues: enums.LEAD_SOURCE_TYPE_VALUES, render: (item) => render.leadSourceType(item.sourceType) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CrmLeadScore: [
            { key: 'scoreId', label: 'ID', sortKey: 'scoreId', filterKey: 'scoreId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'fieldName', label: 'Field', sortKey: 'fieldName' },
            { key: 'scoreValue', label: 'Score', sortKey: 'scoreValue' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CrmLeadActivity: [
            { key: 'activityId', label: 'ID', sortKey: 'activityId', filterKey: 'activityId' },
            { key: 'leadId', label: 'Lead', sortKey: 'leadId', filterKey: 'leadId' },
            { key: 'activityType', label: 'Type', sortKey: 'activityType', enumValues: enums.ACTIVITY_TYPE_VALUES, render: (item) => render.activityType(item.activityType) },
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.ACTIVITY_STATUS_VALUES, render: (item) => render.activityStatus(item.status) },
            { key: 'activityDate', label: 'Date', sortKey: 'activityDate', render: (item) => Layer8MRenderers.renderDate(item.activityDate) }
        ],

        CrmLeadAssign: [
            { key: 'assignmentId', label: 'ID', sortKey: 'assignmentId', filterKey: 'assignmentId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'criteriaField', label: 'Criteria Field', sortKey: 'criteriaField' },
            { key: 'priority', label: 'Priority', sortKey: 'priority' },
            { key: 'roundRobin', label: 'Round Robin', sortKey: 'roundRobin', render: (item) => item.roundRobin ? 'Yes' : 'No' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CrmLeadConversion: [
            { key: 'conversionId', label: 'ID', sortKey: 'conversionId', filterKey: 'conversionId' },
            { key: 'leadId', label: 'Lead', sortKey: 'leadId', filterKey: 'leadId' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId' },
            { key: 'contactId', label: 'Contact', sortKey: 'contactId' },
            { key: 'conversionDate', label: 'Date', sortKey: 'conversionDate', render: (item) => Layer8MRenderers.renderDate(item.conversionDate) },
            { key: 'createOpportunity', label: 'Created Opp', sortKey: 'createOpportunity', render: (item) => item.createOpportunity ? 'Yes' : 'No' }
        ]
    };

    MobileCrmLeads.primaryKeys = {
        CrmLead: 'leadId', CrmLeadSource: 'sourceId', CrmLeadScore: 'scoreId',
        CrmLeadActivity: 'activityId', CrmLeadAssign: 'assignmentId', CrmLeadConversion: 'conversionId'
    };

})();
