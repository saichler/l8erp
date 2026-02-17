/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Workflow Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.DocWorkflow = window.DocWorkflow || {};

    const f = window.Layer8FormFactory;
    const enums = DocWorkflow.enums;

    DocWorkflow.forms = {
        DocApprovalWorkflow: f.form('Approval Workflow', [
            f.section('Workflow Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('documentId', 'Document', 'DocDocument'),
                ...f.select('status', 'Status', enums.WORKFLOW_STATUS),
                ...f.reference('initiatedBy', 'Initiated By', 'Employee'),
                ...f.textarea('comments', 'Comments')
            ]),
            f.section('Workflow Steps', [
                ...f.inlineTable('steps', 'Workflow Steps', [
                    { key: 'stepId', label: 'ID', hidden: true },
                    { key: 'stepNumber', label: 'Order', type: 'number' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.STEP_STATUS },
                    { key: 'assigneeId', label: 'Assignee', type: 'reference', lookupModel: 'Employee' },
                    { key: 'isRequired', label: 'Required', type: 'checkbox' }
                ])
            ])
        ])
    };

    DocWorkflow.primaryKeys = {
        DocApprovalWorkflow: 'workflowId'
    };

})();
