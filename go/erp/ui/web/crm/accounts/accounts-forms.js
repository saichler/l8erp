/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// CRM Accounts Module - Form Definitions

(function() {
    'use strict';

    window.CrmAccounts = window.CrmAccounts || {};

    const enums = CrmAccounts.enums;

    CrmAccounts.forms = {
        CrmAccount: {
            title: 'Account',
            sections: [
                {
                    title: 'Account Information',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'accountType', label: 'Type', type: 'select', options: enums.ACCOUNT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ACCOUNT_STATUS },
                        { key: 'parentAccountId', label: 'Parent Account', type: 'reference', lookupModel: 'CrmAccount' },
                        { key: 'industry', label: 'Industry', type: 'text' },
                        { key: 'website', label: 'Website', type: 'text' },
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'fax', label: 'Fax', type: 'text' },
                        { key: 'employeeCount', label: 'Employee Count', type: 'number' },
                        { key: 'annualRevenue', label: 'Annual Revenue', type: 'money' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'HcmEmployee' },
                        { key: 'sicCode', label: 'SIC Code', type: 'text' },
                        { key: 'tickerSymbol', label: 'Ticker Symbol', type: 'text' },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'FinCustomer' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmContact: {
            title: 'Contact',
            sections: [
                {
                    title: 'Contact Information',
                    fields: [
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'firstName', label: 'First Name', type: 'text', required: true },
                        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text' },
                        { key: 'department', label: 'Department', type: 'text' },
                        { key: 'email', label: 'Email', type: 'text' },
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'mobile', label: 'Mobile', type: 'text' },
                        { key: 'fax', label: 'Fax', type: 'text' },
                        { key: 'reportsToId', label: 'Reports To', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'HcmEmployee' },
                        { key: 'isPrimary', label: 'Primary Contact', type: 'checkbox' },
                        { key: 'birthdate', label: 'Birthdate', type: 'date' },
                        { key: 'doNotCall', label: 'Do Not Call', type: 'checkbox' },
                        { key: 'doNotEmail', label: 'Do Not Email', type: 'checkbox' },
                        { key: 'leadSourceId', label: 'Lead Source', type: 'reference', lookupModel: 'CrmLeadSource' },
                        { key: 'description', label: 'Description', type: 'textarea' }
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
                        { key: 'performedBy', label: 'Performed By', type: 'reference', lookupModel: 'HcmEmployee' },
                        { key: 'outcome', label: 'Outcome', type: 'text' },
                        { key: 'caseId', label: 'Case', type: 'reference', lookupModel: 'CrmCase' },
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity' }
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
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
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
                        { key: 'healthStatus', label: 'Health Status', type: 'select', options: enums.HEALTH_STATUS },
                        { key: 'overallScore', label: 'Overall Score', type: 'number' },
                        { key: 'engagementScore', label: 'Engagement Score', type: 'number' },
                        { key: 'usageScore', label: 'Usage Score', type: 'number' },
                        { key: 'satisfactionScore', label: 'Satisfaction Score', type: 'number' },
                        { key: 'financialScore', label: 'Financial Score', type: 'number' },
                        { key: 'scoreDate', label: 'Score Date', type: 'date' },
                        { key: 'calculatedBy', label: 'Calculated By', type: 'text' },
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
                        { key: 'fiscalYear', label: 'Fiscal Year', type: 'text' },
                        { key: 'revenueTarget', label: 'Revenue Target', type: 'money' },
                        { key: 'currentRevenue', label: 'Current Revenue', type: 'money' },
                        { key: 'objectives', label: 'Objectives', type: 'textarea' },
                        { key: 'strategies', label: 'Strategies', type: 'textarea' },
                        { key: 'actionItems', label: 'Action Items', type: 'textarea' },
                        { key: 'risks', label: 'Risks', type: 'textarea' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'HcmEmployee' },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'text' }
                    ]
                }
            ]
        }
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
