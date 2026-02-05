/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Workflow Module - Column Configurations

(function() {
    'use strict';

    window.DocWorkflow = window.DocWorkflow || {};

    const { renderDate } = Layer8DRenderers;
    const render = DocWorkflow.render;

    DocWorkflow.columns = {
        DocCheckout: [
            { key: 'checkoutId', label: 'ID', sortKey: 'checkoutId', filterKey: 'checkoutId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.checkoutStatus(item.status) },
            { key: 'checkedOutAt', label: 'Checked Out', sortKey: 'checkedOutAt', render: (item) => renderDate(item.checkedOutAt) },
            { key: 'checkedInAt', label: 'Checked In', sortKey: 'checkedInAt', render: (item) => renderDate(item.checkedInAt) },
            { key: 'reason', label: 'Reason', sortKey: 'reason' }
        ],

        DocApprovalWorkflow: [
            { key: 'workflowId', label: 'ID', sortKey: 'workflowId', filterKey: 'workflowId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.workflowStatus(item.status) },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'initiatedBy', label: 'Initiated By', sortKey: 'initiatedBy' },
            { key: 'currentStep', label: 'Current Step', sortKey: 'currentStep' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        DocWorkflowStep: [
            { key: 'stepId', label: 'ID', sortKey: 'stepId', filterKey: 'stepId' },
            { key: 'workflowId', label: 'Workflow', sortKey: 'workflowId', filterKey: 'workflowId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'stepOrder', label: 'Order', sortKey: 'stepOrder' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.stepStatus(item.status) },
            { key: 'assigneeId', label: 'Assignee', sortKey: 'assigneeId' },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => renderDate(item.dueDate) },
            { key: 'completedAt', label: 'Completed', sortKey: 'completedAt', render: (item) => renderDate(item.completedAt) }
        ],

        DocSignature: [
            { key: 'signatureId', label: 'ID', sortKey: 'signatureId', filterKey: 'signatureId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'signerId', label: 'Signer', sortKey: 'signerId' },
            { key: 'signatureType', label: 'Type', sortKey: 'signatureType', render: (item) => render.signatureType(item.signatureType) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.signatureStatus(item.status) },
            { key: 'requestedAt', label: 'Requested', sortKey: 'requestedAt', render: (item) => renderDate(item.requestedAt) },
            { key: 'signedAt', label: 'Signed', sortKey: 'signedAt', render: (item) => renderDate(item.signedAt) },
            { key: 'expiresAt', label: 'Expires', sortKey: 'expiresAt', render: (item) => renderDate(item.expiresAt) }
        ],

        DocReviewComment: [
            { key: 'commentId', label: 'ID', sortKey: 'commentId', filterKey: 'commentId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'comment', label: 'Comment', sortKey: 'comment' },
            { key: 'pageNumber', label: 'Page', sortKey: 'pageNumber' },
            { key: 'isResolved', label: 'Resolved', sortKey: 'isResolved', render: (item) => item.isResolved ? 'Yes' : 'No' },
            { key: 'parentCommentId', label: 'Reply To', sortKey: 'parentCommentId' }
        ]
    };

})();
