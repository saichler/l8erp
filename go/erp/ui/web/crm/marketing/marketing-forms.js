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
                ...f.textarea('description', 'Description'),
                ...f.text('subject', 'Subject', true),
                ...f.text('templateType', 'Template Type'),
                ...f.text('folder', 'Folder'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active'),
                ...f.number('timesUsed', 'Times Used'),
                ...f.date('lastUsedDate', 'Last Used Date'),
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

    };

    CrmMarketing.primaryKeys = {
        CrmCampaign: 'campaignId',
        CrmEmailTemplate: 'templateId',
        CrmMarketingList: 'listId'
    };

})();
