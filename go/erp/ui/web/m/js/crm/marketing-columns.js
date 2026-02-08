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

        CrmCampaignMember: [
            ...col.id('memberId'),
            ...col.col('campaignId', 'Campaign'),
            ...col.col('leadId', 'Lead'),
            ...col.col('contactId', 'Contact'),
            ...col.status('status', 'Status', enums.MEMBER_STATUS_VALUES, render.memberStatus),
            ...col.date('respondedDate', 'Responded')
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

        CrmCampaignResponse: [
            ...col.id('responseId'),
            ...col.col('campaignId', 'Campaign'),
            ...col.col('memberId', 'Member'),
            ...col.status('responseType', 'Type', enums.RESPONSE_TYPE_VALUES, render.responseType),
            ...col.date('responseDate', 'Date')
        ],

        CrmCampaignROI: [
            ...col.id('roiId'),
            ...col.col('campaignId', 'Campaign'),
            ...col.money('totalCost', 'Total Cost'),
            ...col.money('totalRevenue', 'Revenue'),
            ...col.col('roi', 'ROI %'),
            ...col.col('leadsGenerated', 'Leads'),
            ...col.col('opportunitiesCreated', 'Opportunities')
        ]
    };

    MobileCrmMarketing.primaryKeys = {
        CrmCampaign: 'campaignId', CrmCampaignMember: 'memberId', CrmEmailTemplate: 'templateId',
        CrmMarketingList: 'listId', CrmCampaignResponse: 'responseId', CrmCampaignROI: 'roiId'
    };

})();
