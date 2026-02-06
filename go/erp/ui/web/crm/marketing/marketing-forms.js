/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// CRM Marketing Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.CrmMarketing = window.CrmMarketing || {};

    const f = window.Layer8FormFactory;
    const enums = CrmMarketing.enums;

    CrmMarketing.forms = {
        CrmCampaign: f.form('Campaign', [
            f.section('Campaign Details', [
                ...f.text('name', 'Name', true),
                ...f.select('campaignType', 'Type', enums.CAMPAIGN_TYPE),
                ...f.select('status', 'Status', enums.CAMPAIGN_STATUS),
                ...f.textarea('description', 'Description'),
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.reference('parentCampaignId', 'Parent Campaign', 'CrmCampaign'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Budget & Metrics', [
                ...f.money('budgetedCost', 'Budgeted Cost'),
                ...f.money('actualCost', 'Actual Cost'),
                ...f.money('expectedRevenue', 'Expected Revenue'),
                ...f.number('expectedResponseRate', 'Expected Response Rate (%)'),
                ...f.number('numSent', 'Number Sent'),
                ...f.number('numResponses', 'Number of Responses')
            ])
        ]),

        CrmCampaignMember: f.form('Campaign Member', [
            f.section('Member Details', [
                ...f.reference('campaignId', 'Campaign', 'CrmCampaign', true),
                ...f.reference('leadId', 'Lead', 'CrmLead'),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.select('status', 'Status', enums.CAMPAIGN_MEMBER_STATUS),
                ...f.reference('sourceListId', 'Source List', 'CrmMarketingList'),
                ...f.date('firstRespondedDate', 'First Responded'),
                ...f.checkbox('hasResponded', 'Has Responded')
            ])
        ]),

        CrmEmailTemplate: f.form('Email Template', [
            f.section('Template Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('subject', 'Subject', true),
                ...f.text('templateType', 'Template Type'),
                ...f.text('folder', 'Folder'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Content', [
                ...f.textarea('bodyHtml', 'HTML Body'),
                ...f.textarea('bodyText', 'Text Body')
            ])
        ]),

        CrmMarketingList: f.form('Marketing List', [
            f.section('List Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('listType', 'List Type'),
                ...f.number('memberCount', 'Member Count'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isDynamic', 'Dynamic List'),
                ...f.textarea('criteria', 'Criteria'),
                ...f.date('lastUsedDate', 'Last Used'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmCampaignResponse: f.form('Campaign Response', [
            f.section('Response Details', [
                ...f.reference('campaignId', 'Campaign', 'CrmCampaign', true),
                ...f.reference('campaignMemberId', 'Campaign Member', 'CrmCampaignMember'),
                ...f.select('responseType', 'Response Type', enums.RESPONSE_TYPE),
                ...f.date('responseDate', 'Response Date'),
                ...f.textarea('details', 'Details')
            ]),
            f.section('Conversion Details', [
                ...f.reference('leadId', 'Lead Created', 'CrmLead'),
                ...f.reference('opportunityId', 'Opportunity Created', 'CrmOpportunity'),
                ...f.money('revenueValue', 'Revenue Value')
            ])
        ]),

        CrmCampaignROI: f.form('Campaign ROI', [
            f.section('ROI Details', [
                ...f.reference('campaignId', 'Campaign', 'CrmCampaign', true),
                ...f.date('calculationDate', 'Calculation Date'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Financial Metrics', [
                ...f.money('totalCost', 'Total Cost'),
                ...f.money('totalRevenue', 'Total Revenue'),
                ...f.number('roiPercentage', 'ROI Percentage'),
                ...f.money('costPerLead', 'Cost per Lead'),
                ...f.money('costPerOpportunity', 'Cost per Opportunity')
            ]),
            f.section('Conversion Metrics', [
                ...f.number('leadsGenerated', 'Leads Generated'),
                ...f.number('opportunitiesCreated', 'Opportunities Created'),
                ...f.number('dealsWon', 'Deals Won'),
                ...f.number('conversionRate', 'Conversion Rate (%)')
            ])
        ])
    };

    CrmMarketing.primaryKeys = {
        CrmCampaign: 'campaignId',
        CrmCampaignMember: 'memberId',
        CrmEmailTemplate: 'templateId',
        CrmMarketingList: 'listId',
        CrmCampaignResponse: 'responseId',
        CrmCampaignROI: 'roiId'
    };

})();
