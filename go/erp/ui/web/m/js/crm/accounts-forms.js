/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
// Uses Layer8FormFactory for reduced boilerplate
(function() {
    'use strict';

    window.MobileCrmAccounts = window.MobileCrmAccounts || {};
    const f = window.Layer8FormFactory;
    const enums = MobileCrmAccounts.enums;

    MobileCrmAccounts.forms = {
        CrmAccount: f.form('Account', [
            f.section('Account Details', [
                ...f.text('name', 'Name', true),
                ...f.select('accountType', 'Account Type', enums.ACCOUNT_TYPE),
                ...f.select('status', 'Status', enums.ACCOUNT_STATUS),
                ...f.text('industry', 'Industry'),
                ...f.text('phone', 'Phone'),
                ...f.text('website', 'Website'),
                ...f.money('annualRevenue', 'Annual Revenue'),
                ...f.number('employeeCount', 'Employees'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        CrmContact: f.form('Contact', [
            f.section('Contact Details', [
                ...f.text('firstName', 'First Name', true),
                ...f.text('lastName', 'Last Name', true),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.email('email', 'Email'),
                ...f.text('phone', 'Phone'),
                ...f.text('title', 'Title'),
                ...f.text('department', 'Department'),
                ...f.checkbox('isPrimary', 'Primary Contact'),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ])
        ]),

        CrmInteraction: f.form('Interaction', [
            f.section('Interaction Details', [
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.select('interactionType', 'Type', enums.INTERACTION_TYPE, true),
                ...f.select('direction', 'Direction', enums.INTERACTION_DIRECTION),
                ...f.text('subject', 'Subject', true),
                ...f.textarea('description', 'Description'),
                ...f.date('interactionDate', 'Date'),
                ...f.number('durationMinutes', 'Duration (min)'),
                ...f.reference('createdBy', 'Created By', 'Employee')
            ])
        ]),

        CrmRelationship: f.form('Relationship', [
            f.section('Relationship Details', [
                ...f.reference('primaryAccountId', 'Primary Account', 'CrmAccount', true),
                ...f.reference('relatedAccountId', 'Related Account', 'CrmAccount', true),
                ...f.select('relationshipType', 'Type', enums.RELATIONSHIP_TYPE, true),
                ...f.textarea('description', 'Description'),
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmHealthScore: f.form('Health Score', [
            f.section('Health Score Details', [
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.number('overallScore', 'Overall Score'),
                ...f.select('healthStatus', 'Status', enums.HEALTH_STATUS),
                ...f.number('engagementScore', 'Engagement Score'),
                ...f.number('productUsageScore', 'Product Usage Score'),
                ...f.number('supportScore', 'Support Score'),
                ...f.number('financialScore', 'Financial Score'),
                ...f.date('assessmentDate', 'Assessment Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CrmAccountPlan: f.form('Account Plan', [
            f.section('Plan Details', [
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.text('name', 'Name', true),
                ...f.number('planYear', 'Plan Year', true),
                ...f.money('revenueTarget', 'Revenue Target'),
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.textarea('objectives', 'Objectives'),
                ...f.textarea('strategies', 'Strategies'),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ])
        ])
    };

})();
