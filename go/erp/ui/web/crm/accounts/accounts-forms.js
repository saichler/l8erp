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
                ...f.textarea('description', 'Description')
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
                ...f.textarea('description', 'Description')
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

        CrmHealthScore: f.form('Health Score', [
            f.section('Health Score Details', [
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.select('healthStatus', 'Health Status', enums.HEALTH_STATUS),
                ...f.number('overallScore', 'Overall Score'),
                ...f.number('engagementScore', 'Engagement Score'),
                ...f.number('usageScore', 'Usage Score'),
                ...f.number('satisfactionScore', 'Satisfaction Score'),
                ...f.number('financialScore', 'Financial Score'),
                ...f.date('scoreDate', 'Score Date'),
                ...f.text('calculatedBy', 'Calculated By'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CrmAccountPlan: f.form('Account Plan', [
            f.section('Plan Details', [
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.text('name', 'Name', true),
                ...f.text('fiscalYear', 'Fiscal Year'),
                ...f.money('revenueTarget', 'Revenue Target'),
                ...f.money('currentRevenue', 'Current Revenue'),
                ...f.textarea('objectives', 'Objectives'),
                ...f.textarea('strategies', 'Strategies'),
                ...f.textarea('actionItems', 'Action Items'),
                ...f.textarea('risks', 'Risks'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.text('status', 'Status')
            ])
        ])
    };

    CrmAccounts.primaryKeys = {
        CrmAccount: 'accountId',
        CrmContact: 'contactId',
        CrmInteraction: 'interactionId',
        CrmRelationship: 'relationshipId',
        CrmHealthScore: 'scoreId',
        CrmAccountPlan: 'planId'
    };

})();
