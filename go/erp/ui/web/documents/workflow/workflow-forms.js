/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Workflow Module - Form Definitions

(function() {
    'use strict';

    window.DocWorkflow = window.DocWorkflow || {};

    const enums = DocWorkflow.enums;

    DocWorkflow.forms = {
        DocCheckout: {
            title: 'Checkout',
            sections: [
                {
                    title: 'Checkout Details',
                    fields: [
                        { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                        { key: 'userId', label: 'User', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CHECKOUT_STATUS },
                        { key: 'reason', label: 'Reason', type: 'textarea' }
                    ]
                }
            ]
        },

        DocApprovalWorkflow: {
            title: 'Approval Workflow',
            sections: [
                {
                    title: 'Workflow Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.WORKFLOW_STATUS },
                        { key: 'initiatedBy', label: 'Initiated By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        DocWorkflowStep: {
            title: 'Workflow Step',
            sections: [
                {
                    title: 'Step Details',
                    fields: [
                        { key: 'workflowId', label: 'Workflow', type: 'reference', lookupModel: 'DocApprovalWorkflow', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'stepOrder', label: 'Step Order', type: 'number', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.STEP_STATUS },
                        { key: 'assigneeId', label: 'Assignee', type: 'reference', lookupModel: 'Employee' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' }
                    ]
                }
            ]
        },

        DocSignature: {
            title: 'Signature',
            sections: [
                {
                    title: 'Signature Details',
                    fields: [
                        { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                        { key: 'signerId', label: 'Signer', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'signatureType', label: 'Signature Type', type: 'select', options: enums.SIGNATURE_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.SIGNATURE_STATUS },
                        { key: 'expiresAt', label: 'Expires At', type: 'date' },
                        { key: 'reason', label: 'Reason', type: 'textarea' }
                    ]
                }
            ]
        },

        DocReviewComment: {
            title: 'Review Comment',
            sections: [
                {
                    title: 'Comment Details',
                    fields: [
                        { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                        { key: 'userId', label: 'User', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'comment', label: 'Comment', type: 'textarea', required: true },
                        { key: 'pageNumber', label: 'Page Number', type: 'number' },
                        { key: 'parentCommentId', label: 'Reply To', type: 'reference', lookupModel: 'DocReviewComment' },
                        { key: 'isResolved', label: 'Resolved', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

    DocWorkflow.primaryKeys = {
        DocCheckout: 'checkoutId',
        DocApprovalWorkflow: 'workflowId',
        DocWorkflowStep: 'stepId',
        DocSignature: 'signatureId',
        DocReviewComment: 'commentId'
    };

})();
