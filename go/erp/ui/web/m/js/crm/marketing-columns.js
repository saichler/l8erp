/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmMarketing.enums;
    const render = MobileCrmMarketing.render;

    MobileCrmMarketing.columns = {
        CrmCampaign: [
            { key: 'campaignId', label: 'ID', sortKey: 'campaignId', filterKey: 'campaignId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'campaignType', label: 'Type', sortKey: 'campaignType', filterKey: 'campaignType', enumValues: enums.CAMPAIGN_TYPE_VALUES, render: (item) => render.campaignType(item.campaignType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.CAMPAIGN_STATUS_VALUES, render: (item) => render.campaignStatus(item.status) },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) },
            { key: 'budgetedCost', label: 'Budget', sortKey: 'budgetedCost', render: (item) => Layer8MRenderers.renderMoney(item.budgetedCost) }
        ],

        CrmCampaignMember: [
            { key: 'memberId', label: 'ID', sortKey: 'memberId', filterKey: 'memberId' },
            { key: 'campaignId', label: 'Campaign', sortKey: 'campaignId', filterKey: 'campaignId' },
            { key: 'leadId', label: 'Lead', sortKey: 'leadId' },
            { key: 'contactId', label: 'Contact', sortKey: 'contactId' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.MEMBER_STATUS_VALUES, render: (item) => render.memberStatus(item.status) },
            { key: 'respondedDate', label: 'Responded', sortKey: 'respondedDate', render: (item) => Layer8MRenderers.renderDate(item.respondedDate) }
        ],

        CrmEmailTemplate: [
            { key: 'templateId', label: 'ID', sortKey: 'templateId', filterKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
            { key: 'category', label: 'Category', sortKey: 'category' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CrmMarketingList: [
            { key: 'listId', label: 'ID', sortKey: 'listId', filterKey: 'listId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'listType', label: 'Type', sortKey: 'listType' },
            { key: 'memberCount', label: 'Members', sortKey: 'memberCount' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CrmCampaignResponse: [
            { key: 'responseId', label: 'ID', sortKey: 'responseId', filterKey: 'responseId' },
            { key: 'campaignId', label: 'Campaign', sortKey: 'campaignId', filterKey: 'campaignId' },
            { key: 'memberId', label: 'Member', sortKey: 'memberId' },
            { key: 'responseType', label: 'Type', sortKey: 'responseType', enumValues: enums.RESPONSE_TYPE_VALUES, render: (item) => render.responseType(item.responseType) },
            { key: 'responseDate', label: 'Date', sortKey: 'responseDate', render: (item) => Layer8MRenderers.renderDate(item.responseDate) }
        ],

        CrmCampaignROI: [
            { key: 'roiId', label: 'ID', sortKey: 'roiId', filterKey: 'roiId' },
            { key: 'campaignId', label: 'Campaign', sortKey: 'campaignId', filterKey: 'campaignId' },
            { key: 'totalCost', label: 'Total Cost', sortKey: 'totalCost', render: (item) => Layer8MRenderers.renderMoney(item.totalCost) },
            { key: 'totalRevenue', label: 'Revenue', sortKey: 'totalRevenue', render: (item) => Layer8MRenderers.renderMoney(item.totalRevenue) },
            { key: 'roi', label: 'ROI %', sortKey: 'roi' },
            { key: 'leadsGenerated', label: 'Leads', sortKey: 'leadsGenerated' },
            { key: 'opportunitiesCreated', label: 'Opportunities', sortKey: 'opportunitiesCreated' }
        ]
    };

    MobileCrmMarketing.primaryKeys = {
        CrmCampaign: 'campaignId', CrmCampaignMember: 'memberId', CrmEmailTemplate: 'templateId',
        CrmMarketingList: 'listId', CrmCampaignResponse: 'responseId', CrmCampaignROI: 'roiId'
    };

})();
