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
        DocCheckout: f.form('Checkout', [
            f.section('Checkout Details', [
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.reference('checkedOutBy', 'Checked Out By', 'Employee', true),
                ...f.select('status', 'Status', enums.CHECKOUT_STATUS),
                ...f.textarea('checkoutNotes', 'Checkout Notes')
            ])
        ]),

        DocApprovalWorkflow: f.form('Approval Workflow', [
            f.section('Workflow Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('documentId', 'Document', 'DocDocument'),
                ...f.select('status', 'Status', enums.WORKFLOW_STATUS),
                ...f.reference('initiatedBy', 'Initiated By', 'Employee'),
                ...f.textarea('comments', 'Comments')
            ])
        ]),

        DocWorkflowStep: f.form('Workflow Step', [
            f.section('Step Details', [
                ...f.reference('workflowId', 'Workflow', 'DocApprovalWorkflow', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.number('stepNumber', 'Step Number', true),
                ...f.select('status', 'Status', enums.STEP_STATUS),
                ...f.reference('assigneeId', 'Assignee', 'Employee'),
                ...f.date('dueDate', 'Due Date')
            ])
        ]),

        DocSignature: f.form('Signature', [
            f.section('Signature Details', [
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.reference('signerId', 'Signer', 'Employee', true),
                ...f.select('signatureType', 'Signature Type', enums.SIGNATURE_TYPE),
                ...f.select('status', 'Status', enums.SIGNATURE_STATUS),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.textarea('reason', 'Reason')
            ])
        ]),

        DocReviewComment: f.form('Review Comment', [
            f.section('Comment Details', [
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.reference('authorId', 'Author', 'Employee', true),
                ...f.textarea('content', 'Content', true),
                ...f.number('pageNumber', 'Page Number'),
                ...f.reference('parentCommentId', 'Reply To', 'DocReviewComment'),
                ...f.checkbox('isResolved', 'Resolved')
            ])
        ])
    };

    DocWorkflow.primaryKeys = {
        DocCheckout: 'checkoutId',
        DocApprovalWorkflow: 'workflowId',
        DocWorkflowStep: 'stepId',
        DocSignature: 'signatureId',
        DocReviewComment: 'commentId'
    };

})();
