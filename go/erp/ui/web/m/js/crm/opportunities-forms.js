/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile CRM Opportunities Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobileCrmOpportunities = window.MobileCrmOpportunities || {};

    const f = window.Layer8FormFactory;
    const enums = MobileCrmOpportunities.enums;

    MobileCrmOpportunities.forms = {
        CrmOpportunity: f.form('Opportunity', [
            f.section('Opportunity Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.select('status', 'Status', enums.OPPORTUNITY_STATUS),
                ...f.reference('stageId', 'Stage', 'CrmOppStage'),
                ...f.money('amount', 'Amount'),
                ...f.number('probability', 'Probability %'),
                ...f.date('closeDate', 'Close Date'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        CrmOppStage: f.form('Sales Stage', [
            f.section('Stage Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.number('sequence', 'Sequence', true),
                ...f.number('probability', 'Probability %'),
                ...f.checkbox('isClosed', 'Is Closed'),
                ...f.checkbox('isWon', 'Is Won'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmOppCompetitor: f.form('Competitor', [
            f.section('Competitor Details', [
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity', true),
                ...f.text('competitorName', 'Competitor Name', true),
                ...f.textarea('strengths', 'Strengths'),
                ...f.textarea('weaknesses', 'Weaknesses'),
                ...f.select('threatLevel', 'Threat Level', enums.THREAT_LEVEL),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CrmOppProduct: f.form('Opportunity Product', [
            f.section('Product Details', [
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity', true),
                ...f.reference('productId', 'Product', 'ScmItem', true),
                ...f.number('quantity', 'Quantity', true),
                ...f.money('unitPrice', 'Unit Price'),
                ...f.number('discount', 'Discount %'),
                ...f.money('totalPrice', 'Total Price'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        CrmOppTeam: f.form('Team Member', [
            f.section('Team Member Details', [
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity', true),
                ...f.reference('userId', 'User', 'Employee', true),
                ...f.text('role', 'Role'),
                ...f.checkbox('isPrimary', 'Primary')
            ])
        ]),

        CrmOppActivity: f.form('Opportunity Activity', [
            f.section('Activity Details', [
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity', true),
                ...f.select('activityType', 'Activity Type', enums.ACTIVITY_TYPE, true),
                ...f.text('subject', 'Subject', true),
                ...f.textarea('description', 'Description'),
                ...f.date('activityDate', 'Activity Date'),
                ...f.select('status', 'Status', enums.ACTIVITY_STATUS),
                ...f.reference('assignedTo', 'Assigned To', 'Employee'),
                ...f.number('durationMinutes', 'Duration (min)'),
                ...f.checkbox('isCompleted', 'Completed')
            ])
        ])
    };

})();
