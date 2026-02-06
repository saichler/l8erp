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

        CrmOppCompetitor: [
            ...col.id('competitorId'),
            ...col.col('opportunityId', 'Opportunity'),
            ...col.col('name', 'Competitor'),
            ...col.col('website', 'Website'),
            ...col.enum('threatLevel', 'Threat Level', null, render.threatLevel),
            ...col.money('competitorPrice', 'Price'),
            ...col.custom('isPrimary', 'Primary', (item) => item.isPrimary, { sortKey: 'isPrimary' })
        ],

        CrmOppProduct: [
            ...col.id('lineId'),
            ...col.col('opportunityId', 'Opportunity'),
            ...col.col('productName', 'Product'),
            ...col.custom('lineNumber', 'Line #', (item) => item.lineNumber, { sortKey: 'lineNumber' }),
            ...col.custom('quantity', 'Quantity', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.money('unitPrice', 'Unit Price'),
            ...col.custom('discountPercent', 'Discount %', (item) => item.discountPercent, { sortKey: 'discountPercent' }),
            ...col.money('totalPrice', 'Total Price')
        ],

        CrmOppTeam: [
            ...col.id('memberId'),
            ...col.col('opportunityId', 'Opportunity'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('role', 'Role'),
            ...col.custom('splitPercent', 'Split %', (item) => item.splitPercent, { sortKey: 'splitPercent' }),
            ...col.custom('isPrimary', 'Primary', (item) => item.isPrimary, { sortKey: 'isPrimary' })
        ],

        CrmOppActivity: [
            ...col.id('activityId'),
            ...col.col('opportunityId', 'Opportunity'),
            ...col.enum('activityType', 'Type', null, render.activityType),
            ...col.col('subject', 'Subject'),
            ...col.date('activityDate', 'Date'),
            ...col.enum('status', 'Status', null, render.activityStatus),
            ...col.custom('durationMinutes', 'Duration (min)', (item) => item.durationMinutes, { sortKey: 'durationMinutes' }),
            ...col.custom('isCompleted', 'Completed', (item) => item.isCompleted, { sortKey: 'isCompleted' })
        ]
    };

})();
