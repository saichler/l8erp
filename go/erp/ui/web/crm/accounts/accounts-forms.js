/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// CRM Accounts Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.CrmAccounts = window.CrmAccounts || {};

    const f = window.Layer8FormFactory;
    const enums = CrmAccounts.enums;

    CrmAccounts.forms = {
        CrmAccount: f.form('Account', [
            f.section('Account Information', [
                ...f.text('name', 'Name', true),
                ...f.select('accountType', 'Type', enums.ACCOUNT_TYPE),
                ...f.select('status', 'Status', enums.ACCOUNT_STATUS),
                ...f.reference('parentAccountId', 'Parent Account', 'CrmAccount'),
                ...f.text('industry', 'Industry'),
                ...f.text('website', 'Website'),
                ...f.text('phone', 'Phone'),
                ...f.text('fax', 'Fax'),
                ...f.number('employeeCount', 'Employee Count'),
                ...f.money('annualRevenue', 'Annual Revenue'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.text('sicCode', 'SIC Code'),
                ...f.text('tickerSymbol', 'Ticker Symbol'),
                ...f.reference('customerId', 'Customer', 'Customer'),
                ...f.textarea('description', 'Description'),
                ...f.address('billingAddress'),
                ...f.address('shippingAddress'),
                ...f.date('lastActivityDate', 'Last Activity Date'),
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
            f.section('Contact Information', [
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.text('firstName', 'First Name', true),
                ...f.text('lastName', 'Last Name', true),
                ...f.text('title', 'Title'),
                ...f.text('department', 'Department'),
                ...f.text('email', 'Email'),
                ...f.text('phone', 'Phone'),
                ...f.text('mobile', 'Mobile'),
                ...f.text('fax', 'Fax'),
                ...f.reference('reportsToId', 'Reports To', 'CrmContact'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isPrimary', 'Primary Contact'),
                ...f.date('birthdate', 'Birthdate'),
                ...f.checkbox('doNotCall', 'Do Not Call'),
                ...f.checkbox('doNotEmail', 'Do Not Email'),
                ...f.reference('leadSourceId', 'Lead Source', 'CrmLeadSource'),
                ...f.textarea('description', 'Description'),
                ...f.address('mailingAddress'),
                ...f.date('lastActivityDate', 'Last Activity Date'),
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
                ...f.reference('performedBy', 'Performed By', 'Employee'),
                ...f.text('outcome', 'Outcome'),
                ...f.reference('caseId', 'Case', 'CrmCase'),
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity')
            ])
        ]),

        CrmRelationship: f.form('Relationship', [
            f.section('Relationship Details', [
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('relatedAccountId', 'Related Account', 'CrmAccount', true),
                ...f.select('relationshipType', 'Type', enums.RELATIONSHIP_TYPE, true),
                ...f.textarea('description', 'Description'),
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

    };

    CrmAccounts.primaryKeys = {
        CrmAccount: 'accountId',
        CrmContact: 'contactId',
        CrmInteraction: 'interactionId',
        CrmRelationship: 'relationshipId'
    };

})();
