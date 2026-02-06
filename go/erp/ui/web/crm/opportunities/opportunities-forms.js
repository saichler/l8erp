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
                ...f.reference('competitorId', 'Primary Competitor', 'CrmOppCompetitor'),
                ...f.money('expectedRevenue', 'Expected Revenue'),
                ...f.textarea('description', 'Description')
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

        CrmOppCompetitor: f.form('Opportunity Competitor', [
            f.section('Competitor Details', [
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity', true),
                ...f.text('name', 'Competitor Name', true),
                ...f.text('website', 'Website'),
                ...f.select('threatLevel', 'Threat Level', enums.THREAT_LEVEL),
                ...f.money('competitorPrice', 'Competitor Price'),
                ...f.checkbox('isPrimary', 'Is Primary'),
                ...f.textarea('strengths', 'Strengths'),
                ...f.textarea('weaknesses', 'Weaknesses'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CrmOppProduct: f.form('Opportunity Product', [
            f.section('Product Details', [
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity', true),
                ...f.reference('productId', 'Product', 'ScmItem'),
                ...f.text('productName', 'Product Name', true),
                ...f.number('lineNumber', 'Line Number'),
                ...f.number('quantity', 'Quantity', true),
                ...f.money('unitPrice', 'Unit Price'),
                ...f.number('discountPercent', 'Discount %'),
                ...f.money('totalPrice', 'Total Price'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        CrmOppTeam: f.form('Opportunity Team Member', [
            f.section('Team Member Details', [
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity', true),
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.text('role', 'Role', true),
                ...f.number('splitPercent', 'Split %'),
                ...f.checkbox('isPrimary', 'Is Primary'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CrmOppActivity: f.form('Opportunity Activity', [
            f.section('Activity Details', [
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity', true),
                ...f.select('activityType', 'Activity Type', enums.ACTIVITY_TYPE, true),
                ...f.text('subject', 'Subject', true),
                ...f.textarea('description', 'Description'),
                ...f.date('activityDate', 'Activity Date', true),
                ...f.select('status', 'Status', enums.ACTIVITY_STATUS),
                ...f.reference('assignedTo', 'Assigned To', 'Employee'),
                ...f.number('durationMinutes', 'Duration (minutes)'),
                ...f.text('outcome', 'Outcome'),
                ...f.checkbox('isCompleted', 'Completed')
            ])
        ])
    };

    CrmOpportunities.primaryKeys = {
        CrmOpportunity: 'opportunityId',
        CrmOppStage: 'stageId',
        CrmOppCompetitor: 'competitorId',
        CrmOppProduct: 'lineId',
        CrmOppTeam: 'memberId',
        CrmOppActivity: 'activityId'
    };

})();
