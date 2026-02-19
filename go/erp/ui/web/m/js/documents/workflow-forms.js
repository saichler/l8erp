/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Uses Layer8FormFactory for reduced boilerplate
(function() {
    'use strict';

    window.MobileDocWorkflow = window.MobileDocWorkflow || {};
    const f = window.Layer8FormFactory;
    const enums = MobileDocWorkflow.enums;

    MobileDocWorkflow.forms = {
        DocApprovalWorkflow: f.form('Approval Workflow', [
            f.section('Workflow Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.WORKFLOW_STATUS),
                ...f.textarea('comments', 'Comments'),
                ...f.text('documentId', 'Document'),
                ...f.text('initiatedBy', 'Initiated By'),
                ...f.date('initiatedDate', 'Initiated Date'),
                ...f.date('completedDate', 'Completed Date'),
                ...f.number('currentStep', 'Current Step'),
                ...f.number('totalSteps', 'Total Steps'),
            ]),
            f.section('Workflow Steps', [
                ...f.inlineTable('steps', 'Workflow Steps', [
                    { key: 'stepId', label: 'ID', hidden: true },
                    { key: 'stepNumber', label: 'Order', type: 'number' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.STEP_STATUS },
                    { key: 'assigneeId', label: 'Assignee', type: 'reference', lookupModel: 'Employee' },
                    { key: 'dueDate', label: 'Due Date', type: 'date' },
                    { key: 'isRequired', label: 'Required', type: 'checkbox' }
                ])
            ])
        ])
    };

    MobileDocWorkflow.primaryKeys = {
        DocApprovalWorkflow: 'workflowId'
    };

})();
