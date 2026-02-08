/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCrmAccounts.enums;
    const render = MobileCrmAccounts.render;

    MobileCrmAccounts.columns = {
        CrmAccount: [
            ...col.id('accountId'),
            ...col.col('name', 'Name'),
            ...col.status('accountType', 'Type', enums.ACCOUNT_TYPE_VALUES, render.accountType),
            ...col.status('status', 'Status', enums.ACCOUNT_STATUS_VALUES, render.accountStatus),
            ...col.col('industry', 'Industry'),
            ...col.col('phone', 'Phone'),
            ...col.col('website', 'Website')
        ],

        CrmContact: [
            ...col.id('contactId'),
            ...col.col('firstName', 'First Name'),
            ...col.col('lastName', 'Last Name'),
            ...col.col('email', 'Email'),
            ...col.col('accountId', 'Account'),
            ...col.col('title', 'Title'),
            ...col.col('phone', 'Phone')
        ],

        CrmInteraction: [
            ...col.id('interactionId'),
            ...col.col('accountId', 'Account'),
            ...col.col('contactId', 'Contact'),
            ...col.status('interactionType', 'Type', enums.INTERACTION_TYPE_VALUES, render.interactionType),
            ...col.status('direction', 'Direction', enums.INTERACTION_DIRECTION_VALUES, render.interactionDirection),
            ...col.col('subject', 'Subject'),
            ...col.date('interactionDate', 'Date')
        ],

        CrmRelationship: [
            ...col.id('relationshipId'),
            ...col.col('primaryAccountId', 'Primary Account'),
            ...col.col('relatedAccountId', 'Related Account'),
            ...col.status('relationshipType', 'Type', enums.RELATIONSHIP_TYPE_VALUES, render.relationshipType),
            ...col.boolean('isActive', 'Active')
        ],

        CrmHealthScore: [
            ...col.id('healthScoreId'),
            ...col.col('accountId', 'Account'),
            ...col.col('overallScore', 'Score'),
            ...col.status('healthStatus', 'Status', enums.HEALTH_STATUS_VALUES, render.healthStatus),
            ...col.col('engagementScore', 'Engagement'),
            ...col.date('assessmentDate', 'Assessment Date')
        ],

        CrmAccountPlan: [
            ...col.id('planId'),
            ...col.col('accountId', 'Account'),
            ...col.col('name', 'Name'),
            ...col.col('planYear', 'Year'),
            ...col.money('revenueTarget', 'Revenue Target'),
            ...col.date('startDate', 'Start Date')
        ]
    };

    MobileCrmAccounts.primaryKeys = {
        CrmAccount: 'accountId', CrmContact: 'contactId', CrmInteraction: 'interactionId',
        CrmRelationship: 'relationshipId', CrmHealthScore: 'healthScoreId', CrmAccountPlan: 'planId'
    };

})();
