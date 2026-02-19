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
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.money('actualCost', 'Actual Cost'),
                ...f.number('expectedResponseRate', 'Expected Response Rate'),
                ...f.number('numSent', 'Num Sent'),
                ...f.number('numResponses', 'Num Responses'),
                ...f.text('parentCampaignId', 'Parent Campaign'),
                ...f.checkbox('isActive', 'Active'),
            ]),
            f.section('Members', [
                ...f.inlineTable('members', 'Campaign Members', [
                    { key: 'memberId', label: 'ID', hidden: true },
                    { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.CAMPAIGN_MEMBER_STATUS },
                    { key: 'hasResponded', label: 'Responded', type: 'checkbox' },
                    { key: 'firstRespondedDate', label: 'Responded Date', type: 'date' }
                ])
            ]),
            f.section('Responses', [
                ...f.inlineTable('responses', 'Campaign Responses', [
                    { key: 'responseId', label: 'ID', hidden: true },
                    { key: 'campaignMemberId', label: 'Member ID', type: 'text' },
                    { key: 'responseType', label: 'Type', type: 'select', options: enums.RESPONSE_TYPE },
                    { key: 'responseDate', label: 'Date', type: 'date' },
                    { key: 'revenueValue', label: 'Revenue', type: 'money' },
                    { key: 'details', label: 'Details', type: 'text' }
                ])
            ]),
            f.section('ROI', [
                ...f.inlineTable('roiRecords', 'Campaign ROI', [
                    { key: 'roiId', label: 'ID', hidden: true },
                    { key: 'calculationDate', label: 'Date', type: 'date' },
                    { key: 'totalCost', label: 'Total Cost', type: 'money' },
                    { key: 'totalRevenue', label: 'Revenue', type: 'money' },
                    { key: 'roiPercentage', label: 'ROI %', type: 'number' },
                    { key: 'leadsGenerated', label: 'Leads', type: 'number' },
                    { key: 'dealsWon', label: 'Deals Won', type: 'number' }
                ])
            ])
        ]),

        CrmEmailTemplate: f.form('Email Template', [
            f.section('Template Details', [
                ...f.text('name', 'Name', true),
                ...f.text('subject', 'Subject', true),
                ...f.text('category', 'Category'),
                ...f.textarea('htmlBody', 'HTML Body'),
                ...f.textarea('textBody', 'Text Body'),
                ...f.checkbox('isActive', 'Active'),
                ...f.text('description', 'Description'),
                ...f.text('bodyHtml', 'Body Html'),
                ...f.text('bodyText', 'Body Text'),
                ...f.text('folder', 'Folder'),
                ...f.text('ownerId', 'Owner'),
                ...f.text('templateType', 'Template Type'),
                ...f.number('timesUsed', 'Times Used'),
                ...f.date('lastUsedDate', 'Last Used Date'),
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
                ...f.checkbox('isActive', 'Active'),
                ...f.number('memberCount', 'Member Count'),
                ...f.date('lastUsedDate', 'Last Used Date'),
            ])
        ]),

    };

})();
