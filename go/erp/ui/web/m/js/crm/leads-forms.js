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
            ]),
            f.section('Activities', [
                ...f.inlineTable('activities', 'Lead Activities', [
                    { key: 'activityId', label: 'ID', hidden: true },
                    { key: 'activityType', label: 'Type', type: 'select', options: enums.ACTIVITY_TYPE },
                    { key: 'subject', label: 'Subject', type: 'text', required: true },
                    { key: 'activityDate', label: 'Date', type: 'date' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.ACTIVITY_STATUS },
                    { key: 'durationMinutes', label: 'Duration (min)', type: 'number' },
                    { key: 'isCompleted', label: 'Completed', type: 'checkbox' }
                ])
            ]),
            f.section('Conversions', [
                ...f.inlineTable('conversions', 'Lead Conversions', [
                    { key: 'conversionId', label: 'ID', hidden: true },
                    { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount' },
                    { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                    { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity' },
                    { key: 'conversionDate', label: 'Date', type: 'date' },
                    { key: 'createOpportunity', label: 'Created Opp', type: 'checkbox' }
                ])
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

    };

})();
