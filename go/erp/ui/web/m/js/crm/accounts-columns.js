/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmAccounts.enums;
    const render = MobileCrmAccounts.render;

    MobileCrmAccounts.columns = {
        CrmAccount: [
            { key: 'accountId', label: 'ID', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'accountType', label: 'Type', sortKey: 'accountType', filterKey: 'accountType', enumValues: enums.ACCOUNT_TYPE_VALUES, render: (item) => render.accountType(item.accountType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.ACCOUNT_STATUS_VALUES, render: (item) => render.accountStatus(item.status) },
            { key: 'industry', label: 'Industry', sortKey: 'industry', filterKey: 'industry' },
            { key: 'phone', label: 'Phone', sortKey: 'phone' },
            { key: 'website', label: 'Website', sortKey: 'website' }
        ],

        CrmContact: [
            { key: 'contactId', label: 'ID', sortKey: 'contactId', filterKey: 'contactId' },
            { key: 'firstName', label: 'First Name', sortKey: 'firstName', filterKey: 'firstName' },
            { key: 'lastName', label: 'Last Name', sortKey: 'lastName', filterKey: 'lastName' },
            { key: 'email', label: 'Email', sortKey: 'email', filterKey: 'email' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'title', label: 'Title', sortKey: 'title' },
            { key: 'phone', label: 'Phone', sortKey: 'phone' }
        ],

        CrmInteraction: [
            { key: 'interactionId', label: 'ID', sortKey: 'interactionId', filterKey: 'interactionId' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'contactId', label: 'Contact', sortKey: 'contactId' },
            { key: 'interactionType', label: 'Type', sortKey: 'interactionType', enumValues: enums.INTERACTION_TYPE_VALUES, render: (item) => render.interactionType(item.interactionType) },
            { key: 'direction', label: 'Direction', sortKey: 'direction', enumValues: enums.INTERACTION_DIRECTION_VALUES, render: (item) => render.interactionDirection(item.direction) },
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
            { key: 'interactionDate', label: 'Date', sortKey: 'interactionDate', render: (item) => Layer8MRenderers.renderDate(item.interactionDate) }
        ],

        CrmRelationship: [
            { key: 'relationshipId', label: 'ID', sortKey: 'relationshipId', filterKey: 'relationshipId' },
            { key: 'primaryAccountId', label: 'Primary Account', sortKey: 'primaryAccountId', filterKey: 'primaryAccountId' },
            { key: 'relatedAccountId', label: 'Related Account', sortKey: 'relatedAccountId' },
            { key: 'relationshipType', label: 'Type', sortKey: 'relationshipType', enumValues: enums.RELATIONSHIP_TYPE_VALUES, render: (item) => render.relationshipType(item.relationshipType) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CrmHealthScore: [
            { key: 'healthScoreId', label: 'ID', sortKey: 'healthScoreId', filterKey: 'healthScoreId' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'overallScore', label: 'Score', sortKey: 'overallScore' },
            { key: 'healthStatus', label: 'Status', sortKey: 'healthStatus', enumValues: enums.HEALTH_STATUS_VALUES, render: (item) => render.healthStatus(item.healthStatus) },
            { key: 'engagementScore', label: 'Engagement', sortKey: 'engagementScore' },
            { key: 'assessmentDate', label: 'Assessment Date', sortKey: 'assessmentDate', render: (item) => Layer8MRenderers.renderDate(item.assessmentDate) }
        ],

        CrmAccountPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'planYear', label: 'Year', sortKey: 'planYear' },
            { key: 'revenueTarget', label: 'Revenue Target', sortKey: 'revenueTarget', render: (item) => Layer8MRenderers.renderMoney(item.revenueTarget) },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) }
        ]
    };

    MobileCrmAccounts.primaryKeys = {
        CrmAccount: 'accountId', CrmContact: 'contactId', CrmInteraction: 'interactionId',
        CrmRelationship: 'relationshipId', CrmHealthScore: 'healthScoreId', CrmAccountPlan: 'planId'
    };

})();
