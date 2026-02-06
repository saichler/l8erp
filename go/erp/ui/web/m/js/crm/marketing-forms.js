/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
// Uses Layer8FormFactory for reduced boilerplate
(function() {
    'use strict';

    window.MobileCrmMarketing = window.MobileCrmMarketing || {};
    const f = window.Layer8FormFactory;
    const enums = MobileCrmMarketing.enums;

    MobileCrmMarketing.forms = {
        CrmCampaign: f.form('Campaign', [
            f.section('Campaign Details', [
                ...f.text('name', 'Name', true),
                ...f.select('campaignType', 'Type', enums.CAMPAIGN_TYPE, true),
                ...f.select('status', 'Status', enums.CAMPAIGN_STATUS),
                ...f.textarea('description', 'Description'),
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.money('budgetedCost', 'Budgeted Cost'),
                ...f.money('expectedRevenue', 'Expected Revenue'),
                ...f.number('expectedResponse', 'Expected Response %'),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ])
        ]),

        CrmCampaignMember: f.form('Campaign Member', [
            f.section('Member Details', [
                ...f.reference('campaignId', 'Campaign', 'CrmCampaign', true),
                ...f.reference('leadId', 'Lead', 'CrmLead'),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.select('status', 'Status', enums.MEMBER_STATUS),
                ...f.date('firstRespondedDate', 'First Responded'),
                ...f.checkbox('hasResponded', 'Has Responded')
            ])
        ]),

        CrmEmailTemplate: f.form('Email Template', [
            f.section('Template Details', [
                ...f.text('name', 'Name', true),
                ...f.text('subject', 'Subject', true),
                ...f.text('category', 'Category'),
                ...f.textarea('htmlBody', 'HTML Body'),
                ...f.textarea('textBody', 'Text Body'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmMarketingList: f.form('Marketing List', [
            f.section('List Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('listType', 'List Type'),
                ...f.checkbox('isDynamic', 'Dynamic List'),
                ...f.textarea('criteria', 'Criteria'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmCampaignResponse: f.form('Campaign Response', [
            f.section('Response Details', [
                ...f.reference('campaignId', 'Campaign', 'CrmCampaign', true),
                ...f.reference('memberId', 'Member', 'CrmCampaignMember', true),
                ...f.select('responseType', 'Response Type', enums.RESPONSE_TYPE, true),
                ...f.date('responseDate', 'Response Date'),
                ...f.text('responseValue', 'Response Value'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CrmCampaignROI: f.form('Campaign ROI', [
            f.section('ROI Details', [
                ...f.reference('campaignId', 'Campaign', 'CrmCampaign', true),
                ...f.money('totalCost', 'Total Cost'),
                ...f.money('totalRevenue', 'Total Revenue'),
                ...f.number('roi', 'ROI %'),
                ...f.number('leadsGenerated', 'Leads Generated'),
                ...f.number('opportunitiesCreated', 'Opportunities Created'),
                ...f.number('dealsWon', 'Deals Won'),
                ...f.date('calculationDate', 'Calculation Date')
            ])
        ])
    };

})();
