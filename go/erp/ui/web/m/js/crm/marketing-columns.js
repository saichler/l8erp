/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCrmMarketing.enums;
    const render = MobileCrmMarketing.render;

    MobileCrmMarketing.columns = {
        CrmCampaign: [
            ...col.id('campaignId'),
            ...col.col('name', 'Name'),
            ...col.status('campaignType', 'Type', enums.CAMPAIGN_TYPE_VALUES, render.campaignType),
            ...col.status('status', 'Status', enums.CAMPAIGN_STATUS_VALUES, render.campaignStatus),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.money('budgetedCost', 'Budget')
        ],

        CrmEmailTemplate: [
            ...col.id('templateId'),
            ...col.col('name', 'Name'),
            ...col.col('subject', 'Subject'),
            ...col.col('category', 'Category'),
            ...col.boolean('isActive', 'Active')
        ],

        CrmMarketingList: [
            ...col.id('listId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('listType', 'Type'),
            ...col.col('memberCount', 'Members'),
            ...col.boolean('isActive', 'Active')
        ],

    };

    MobileCrmMarketing.primaryKeys = {
        CrmCampaign: 'campaignId', CrmEmailTemplate: 'templateId',
        CrmMarketingList: 'listId'
    };

})();
