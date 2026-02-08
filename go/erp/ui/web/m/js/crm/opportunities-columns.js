/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCrmOpportunities.enums;
    const render = MobileCrmOpportunities.render;

    MobileCrmOpportunities.columns = {
        CrmOpportunity: [
            ...col.id('opportunityId'),
            ...col.col('name', 'Name'),
            ...col.col('accountId', 'Account'),
            ...col.status('status', 'Status', enums.OPPORTUNITY_STATUS_VALUES, render.opportunityStatus),
            ...col.col('stageId', 'Stage'),
            ...col.money('amount', 'Amount'),
            ...col.col('probability', 'Probability %'),
            ...col.date('closeDate', 'Close Date')
        ],

        CrmOppStage: [
            ...col.id('stageId'),
            ...col.col('name', 'Name'),
            ...col.col('sequence', 'Sequence'),
            ...col.col('probability', 'Probability %'),
            ...col.boolean('isClosed', 'Closed'),
            ...col.boolean('isWon', 'Won')
        ],

        CrmOppCompetitor: [
            ...col.id('competitorId'),
            ...col.col('opportunityId', 'Opportunity'),
            ...col.col('competitorName', 'Competitor'),
            ...col.col('strengths', 'Strengths'),
            ...col.status('threatLevel', 'Threat Level', enums.THREAT_LEVEL_VALUES, render.threatLevel)
        ],

        CrmOppProduct: [
            ...col.id('oppProductId'),
            ...col.col('opportunityId', 'Opportunity'),
            ...col.col('productId', 'Product'),
            ...col.col('quantity', 'Quantity'),
            ...col.money('unitPrice', 'Unit Price'),
            ...col.money('totalPrice', 'Total')
        ],

        CrmOppTeam: [
            ...col.id('teamMemberId'),
            ...col.col('opportunityId', 'Opportunity'),
            ...col.col('userId', 'User'),
            ...col.col('role', 'Role'),
            ...col.boolean('isPrimary', 'Primary')
        ],

        CrmOppActivity: [
            ...col.id('activityId'),
            ...col.col('opportunityId', 'Opportunity'),
            ...col.status('activityType', 'Type', enums.ACTIVITY_TYPE_VALUES, render.activityType),
            ...col.col('subject', 'Subject'),
            ...col.status('status', 'Status', enums.ACTIVITY_STATUS_VALUES, render.activityStatus),
            ...col.date('activityDate', 'Date')
        ]
    };

    MobileCrmOpportunities.primaryKeys = {
        CrmOpportunity: 'opportunityId', CrmOppStage: 'stageId', CrmOppCompetitor: 'competitorId',
        CrmOppProduct: 'oppProductId', CrmOppTeam: 'teamMemberId', CrmOppActivity: 'activityId'
    };

})();
