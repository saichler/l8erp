/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// CRM Opportunities Module - Column Configurations
// Uses Layer8ColumnFactory for reduced boilerplate

(function() {
    'use strict';

    window.CrmOpportunities = window.CrmOpportunities || {};

    const col = window.Layer8ColumnFactory;
    const render = CrmOpportunities.render;

    CrmOpportunities.columns = {
        CrmOpportunity: [
            ...col.id('opportunityId'),
            ...col.col('name', 'Name'),
            ...col.col('accountId', 'Account'),
            ...col.money('amount', 'Amount'),
            ...col.enum('stage', 'Stage', null, render.salesStage),
            ...col.custom('probability', 'Probability %', (item) => item.probability, { sortKey: 'probability' }),
            ...col.date('closeDate', 'Close Date'),
            ...col.enum('status', 'Status', null, render.opportunityStatus)
        ],

        CrmOppStage: [
            ...col.id('stageId'),
            ...col.col('name', 'Name'),
            ...col.custom('sequence', 'Sequence', (item) => item.sequence, { sortKey: 'sequence' }),
            ...col.custom('probability', 'Probability %', (item) => item.probability, { sortKey: 'probability' }),
            ...col.col('forecastCategory', 'Forecast Category'),
            ...col.custom('isClosed', 'Closed', (item) => item.isClosed, { sortKey: 'isClosed' }),
            ...col.custom('isWon', 'Won', (item) => item.isWon, { sortKey: 'isWon' }),
            ...col.custom('isActive', 'Active', (item) => item.isActive, { sortKey: 'isActive' })
        ],

    };

})();
