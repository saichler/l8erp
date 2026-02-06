/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
// Uses Layer8FormFactory for reduced boilerplate
(function() {
    'use strict';

    window.MobileCrmLeads = window.MobileCrmLeads || {};
    const f = window.Layer8FormFactory;
    const enums = MobileCrmLeads.enums;

    MobileCrmLeads.forms = {
        CrmLead: f.form('Lead', [
            f.section('Lead Details', [
                ...f.text('firstName', 'First Name', true),
                ...f.text('lastName', 'Last Name', true),
                ...f.email('email', 'Email', true),
                ...f.text('phone', 'Phone'),
                ...f.text('company', 'Company'),
                ...f.text('title', 'Title'),
                ...f.text('industry', 'Industry'),
                ...f.select('status', 'Status', enums.LEAD_STATUS),
                ...f.select('rating', 'Rating', enums.LEAD_RATING),
                ...f.reference('sourceId', 'Lead Source', 'CrmLeadSource'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        CrmLeadSource: f.form('Lead Source', [
            f.section('Source Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('sourceType', 'Source Type', enums.LEAD_SOURCE_TYPE),
                ...f.number('defaultCost', 'Default Cost'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmLeadScore: f.form('Lead Score Rule', [
            f.section('Score Rule Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('fieldName', 'Field Name', true),
                ...f.text('fieldValue', 'Field Value', true),
                ...f.number('scoreValue', 'Score Value', true),
                ...f.number('priority', 'Priority'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmLeadActivity: f.form('Lead Activity', [
            f.section('Activity Details', [
                ...f.reference('leadId', 'Lead', 'CrmLead', true),
                ...f.select('activityType', 'Activity Type', enums.ACTIVITY_TYPE, true),
                ...f.text('subject', 'Subject', true),
                ...f.textarea('description', 'Description'),
                ...f.date('activityDate', 'Activity Date'),
                ...f.select('status', 'Status', enums.ACTIVITY_STATUS),
                ...f.reference('assignedTo', 'Assigned To', 'Employee'),
                ...f.number('durationMinutes', 'Duration (min)'),
                ...f.checkbox('isCompleted', 'Completed')
            ])
        ]),

        CrmLeadAssign: f.form('Lead Assignment Rule', [
            f.section('Rule Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('criteriaField', 'Criteria Field', true),
                ...f.text('criteriaValue', 'Criteria Value', true),
                ...f.reference('assignToUserId', 'Assign to User', 'Employee'),
                ...f.number('priority', 'Priority'),
                ...f.checkbox('roundRobin', 'Round Robin'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmLeadConversion: f.form('Lead Conversion', [
            f.section('Conversion Details', [
                ...f.reference('leadId', 'Lead', 'CrmLead', true),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('contactId', 'Contact', 'CrmContact', true),
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity'),
                ...f.date('conversionDate', 'Conversion Date', true),
                ...f.reference('convertedBy', 'Converted By', 'Employee'),
                ...f.checkbox('createOpportunity', 'Create Opportunity'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
