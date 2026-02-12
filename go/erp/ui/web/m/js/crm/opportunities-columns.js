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

    };

    MobileCrmOpportunities.primaryKeys = {
        CrmOpportunity: 'opportunityId', CrmOppStage: 'stageId'
    };

})();
