/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmLeads.enums;

    MobileCrmLeads.forms = {
        CrmLead: {
            title: 'Lead',
            sections: [
                {
                    title: 'Lead Details',
                    fields: [
                        { key: 'firstName', label: 'First Name', type: 'text', required: true },
                        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                        { key: 'email', label: 'Email', type: 'email', required: true },
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'company', label: 'Company', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text' },
                        { key: 'industry', label: 'Industry', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.LEAD_STATUS },
                        { key: 'rating', label: 'Rating', type: 'select', options: enums.LEAD_RATING },
                        { key: 'sourceId', label: 'Lead Source', type: 'reference', lookupModel: 'CrmLeadSource' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmLeadSource: {
            title: 'Lead Source',
            sections: [
                {
                    title: 'Source Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'sourceType', label: 'Source Type', type: 'select', options: enums.LEAD_SOURCE_TYPE },
                        { key: 'defaultCost', label: 'Default Cost', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmLeadScore: {
            title: 'Lead Score Rule',
            sections: [
                {
                    title: 'Score Rule Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'fieldName', label: 'Field Name', type: 'text', required: true },
                        { key: 'fieldValue', label: 'Field Value', type: 'text', required: true },
                        { key: 'scoreValue', label: 'Score Value', type: 'number', required: true },
                        { key: 'priority', label: 'Priority', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmLeadActivity: {
            title: 'Lead Activity',
            sections: [
                {
                    title: 'Activity Details',
                    fields: [
                        { key: 'leadId', label: 'Lead', type: 'reference', lookupModel: 'CrmLead', required: true },
                        { key: 'activityType', label: 'Activity Type', type: 'select', options: enums.ACTIVITY_TYPE, required: true },
                        { key: 'subject', label: 'Subject', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'activityDate', label: 'Activity Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ACTIVITY_STATUS },
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'durationMinutes', label: 'Duration (min)', type: 'number' },
                        { key: 'isCompleted', label: 'Completed', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmLeadAssign: {
            title: 'Lead Assignment Rule',
            sections: [
                {
                    title: 'Rule Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'criteriaField', label: 'Criteria Field', type: 'text', required: true },
                        { key: 'criteriaValue', label: 'Criteria Value', type: 'text', required: true },
                        { key: 'assignToUserId', label: 'Assign to User', type: 'reference', lookupModel: 'Employee' },
                        { key: 'priority', label: 'Priority', type: 'number' },
                        { key: 'roundRobin', label: 'Round Robin', type: 'checkbox' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmLeadConversion: {
            title: 'Lead Conversion',
            sections: [
                {
                    title: 'Conversion Details',
                    fields: [
                        { key: 'leadId', label: 'Lead', type: 'reference', lookupModel: 'CrmLead', required: true },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact', required: true },
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity' },
                        { key: 'conversionDate', label: 'Conversion Date', type: 'date', required: true },
                        { key: 'convertedBy', label: 'Converted By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'createOpportunity', label: 'Create Opportunity', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

})();
