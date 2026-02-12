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
            ]),
            f.section('Health Scores', [
                ...f.inlineTable('healthScores', 'Health Scores', [
                    { key: 'scoreId', label: 'ID', hidden: true },
                    { key: 'healthStatus', label: 'Status', type: 'select', options: enums.HEALTH_STATUS },
                    { key: 'overallScore', label: 'Overall', type: 'number' },
                    { key: 'engagementScore', label: 'Engagement', type: 'number' },
                    { key: 'usageScore', label: 'Usage', type: 'number' },
                    { key: 'satisfactionScore', label: 'Satisfaction', type: 'number' },
                    { key: 'financialScore', label: 'Financial', type: 'number' },
                    { key: 'scoreDate', label: 'Date', type: 'date' }
                ])
            ]),
            f.section('Account Plans', [
                ...f.inlineTable('accountPlans', 'Account Plans', [
                    { key: 'planId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'fiscalYear', label: 'Fiscal Year', type: 'text' },
                    { key: 'revenueTarget', label: 'Revenue Target', type: 'money' },
                    { key: 'currentRevenue', label: 'Current Revenue', type: 'money' },
                    { key: 'status', label: 'Status', type: 'text' },
                    { key: 'startDate', label: 'Start', type: 'date' },
                    { key: 'endDate', label: 'End', type: 'date' }
                ])
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

    };

})();
