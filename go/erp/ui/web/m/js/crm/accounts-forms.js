/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmAccounts.enums;

    MobileCrmAccounts.forms = {
        CrmAccount: {
            title: 'Account',
            sections: [
                {
                    title: 'Account Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'accountType', label: 'Account Type', type: 'select', options: enums.ACCOUNT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ACCOUNT_STATUS },
                        { key: 'industry', label: 'Industry', type: 'text' },
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'website', label: 'Website', type: 'text' },
                        { key: 'annualRevenue', label: 'Annual Revenue', type: 'currency' },
                        { key: 'employeeCount', label: 'Employees', type: 'number' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmContact: {
            title: 'Contact',
            sections: [
                {
                    title: 'Contact Details',
                    fields: [
                        { key: 'firstName', label: 'First Name', type: 'text', required: true },
                        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'email', label: 'Email', type: 'email' },
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text' },
                        { key: 'department', label: 'Department', type: 'text' },
                        { key: 'isPrimary', label: 'Primary Contact', type: 'checkbox' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        CrmInteraction: {
            title: 'Interaction',
            sections: [
                {
                    title: 'Interaction Details',
                    fields: [
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'interactionType', label: 'Type', type: 'select', options: enums.INTERACTION_TYPE, required: true },
                        { key: 'direction', label: 'Direction', type: 'select', options: enums.INTERACTION_DIRECTION },
                        { key: 'subject', label: 'Subject', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'interactionDate', label: 'Date', type: 'date' },
                        { key: 'durationMinutes', label: 'Duration (min)', type: 'number' },
                        { key: 'createdBy', label: 'Created By', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        CrmRelationship: {
            title: 'Relationship',
            sections: [
                {
                    title: 'Relationship Details',
                    fields: [
                        { key: 'primaryAccountId', label: 'Primary Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'relatedAccountId', label: 'Related Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'relationshipType', label: 'Type', type: 'select', options: enums.RELATIONSHIP_TYPE, required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmHealthScore: {
            title: 'Health Score',
            sections: [
                {
                    title: 'Health Score Details',
                    fields: [
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'overallScore', label: 'Overall Score', type: 'number' },
                        { key: 'healthStatus', label: 'Status', type: 'select', options: enums.HEALTH_STATUS },
                        { key: 'engagementScore', label: 'Engagement Score', type: 'number' },
                        { key: 'productUsageScore', label: 'Product Usage Score', type: 'number' },
                        { key: 'supportScore', label: 'Support Score', type: 'number' },
                        { key: 'financialScore', label: 'Financial Score', type: 'number' },
                        { key: 'assessmentDate', label: 'Assessment Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmAccountPlan: {
            title: 'Account Plan',
            sections: [
                {
                    title: 'Plan Details',
                    fields: [
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'planYear', label: 'Plan Year', type: 'number', required: true },
                        { key: 'revenueTarget', label: 'Revenue Target', type: 'currency' },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'objectives', label: 'Objectives', type: 'textarea' },
                        { key: 'strategies', label: 'Strategies', type: 'textarea' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        }
    };

})();
