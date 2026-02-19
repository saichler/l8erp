/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// CRM Opportunities Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.CrmOpportunities = window.CrmOpportunities || {};

    const f = window.Layer8FormFactory;
    const enums = CrmOpportunities.enums;

    CrmOpportunities.forms = {
        CrmOpportunity: f.form('Opportunity', [
            f.section('Opportunity Details', [
                ...f.text('name', 'Opportunity Name', true),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('primaryContactId', 'Primary Contact', 'CrmContact'),
                ...f.reference('ownerId', 'Owner', 'Employee', true),
                ...f.money('amount', 'Amount'),
                ...f.select('stage', 'Stage', enums.SALES_STAGE),
                ...f.number('probability', 'Probability %'),
                ...f.date('closeDate', 'Close Date'),
                ...f.select('status', 'Status', enums.OPPORTUNITY_STATUS),
                ...f.reference('leadSourceId', 'Lead Source', 'CrmLeadSource'),
                ...f.reference('campaignId', 'Campaign', 'CrmCampaign'),
                ...f.text('nextStep', 'Next Step'),
                ...f.text('lossReason', 'Loss Reason'),
                ...f.money('expectedRevenue', 'Expected Revenue'),
                ...f.textarea('description', 'Description'),
                ...f.date('lastActivityDate', 'Last Activity Date'),
            ]),
            f.section('Activities', [
                ...f.inlineTable('activities', 'Activities', [
                    { key: 'activityId', label: 'ID', hidden: true },
                    { key: 'activityType', label: 'Type', type: 'select', options: enums.ACTIVITY_TYPE },
                    { key: 'subject', label: 'Subject', type: 'text', required: true },
                    { key: 'activityDate', label: 'Date', type: 'date' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.ACTIVITY_STATUS },
                    { key: 'durationMinutes', label: 'Duration (min)', type: 'number' },
                    { key: 'isCompleted', label: 'Completed', type: 'checkbox' }
                ])
            ]),
            f.section('Products', [
                ...f.inlineTable('products', 'Opportunity Products', [
                    { key: 'lineId', label: 'ID', hidden: true },
                    { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'ScmItem' },
                    { key: 'productName', label: 'Name', type: 'text', required: true },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                    { key: 'discountPercent', label: 'Discount %', type: 'number' },
                    { key: 'totalPrice', label: 'Total', type: 'money' }
                ])
            ]),
            f.section('Team Members', [
                ...f.inlineTable('teamMembers', 'Team Members', [
                    { key: 'memberId', label: 'ID', hidden: true },
                    { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                    { key: 'role', label: 'Role', type: 'text', required: true },
                    { key: 'splitPercent', label: 'Split %', type: 'number' },
                    { key: 'isPrimary', label: 'Primary', type: 'checkbox' }
                ])
            ]),
            f.section('Competitors', [
                ...f.inlineTable('competitors', 'Competitors', [
                    { key: 'competitorId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'website', label: 'Website', type: 'text' },
                    { key: 'threatLevel', label: 'Threat', type: 'select', options: enums.THREAT_LEVEL },
                    { key: 'competitorPrice', label: 'Price', type: 'money' },
                    { key: 'isPrimary', label: 'Primary', type: 'checkbox' }
                ])
            ])
        ]),

        CrmOppStage: f.form('Opportunity Stage', [
            f.section('Stage Details', [
                ...f.text('name', 'Stage Name', true),
                ...f.textarea('description', 'Description'),
                ...f.number('sequence', 'Sequence', true),
                ...f.number('probability', 'Probability %'),
                ...f.text('forecastCategory', 'Forecast Category'),
                ...f.checkbox('isClosed', 'Is Closed'),
                ...f.checkbox('isWon', 'Is Won'),
                ...f.checkbox('isActive', 'Is Active')
            ])
        ]),

    };

    CrmOpportunities.primaryKeys = {
        CrmOpportunity: 'opportunityId',
        CrmOppStage: 'stageId'
    };

})();
