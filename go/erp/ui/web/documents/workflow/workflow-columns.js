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
            { key: 'checkedOutBy', label: 'Checked Out By', sortKey: 'checkedOutBy' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.checkoutStatus(item.status) },
            { key: 'checkoutDate', label: 'Checked Out', sortKey: 'checkoutDate', render: (item) => renderDate(item.checkoutDate) },
            { key: 'checkinDate', label: 'Checked In', sortKey: 'checkinDate', render: (item) => renderDate(item.checkinDate) },
            { key: 'checkoutNotes', label: 'Notes', sortKey: 'checkoutNotes' }
        ],

        DocApprovalWorkflow: [
            { key: 'workflowId', label: 'ID', sortKey: 'workflowId', filterKey: 'workflowId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.workflowStatus(item.status) },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'initiatedBy', label: 'Initiated By', sortKey: 'initiatedBy' },
            { key: 'currentStep', label: 'Current Step', sortKey: 'currentStep' },
            { key: 'totalSteps', label: 'Total Steps', sortKey: 'totalSteps' }
        ],

        DocWorkflowStep: [
            { key: 'stepId', label: 'ID', sortKey: 'stepId', filterKey: 'stepId' },
            { key: 'workflowId', label: 'Workflow', sortKey: 'workflowId', filterKey: 'workflowId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'stepNumber', label: 'Order', sortKey: 'stepNumber' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.stepStatus(item.status) },
            { key: 'assigneeId', label: 'Assignee', sortKey: 'assigneeId' },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => renderDate(item.dueDate) },
            { key: 'completedDate', label: 'Completed', sortKey: 'completedDate', render: (item) => renderDate(item.completedDate) }
        ],

        DocSignature: [
            { key: 'signatureId', label: 'ID', sortKey: 'signatureId', filterKey: 'signatureId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'signerId', label: 'Signer', sortKey: 'signerId' },
            { key: 'signatureType', label: 'Type', sortKey: 'signatureType', render: (item) => render.signatureType(item.signatureType) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.signatureStatus(item.status) },
            { key: 'requestedDate', label: 'Requested', sortKey: 'requestedDate', render: (item) => renderDate(item.requestedDate) },
            { key: 'signedDate', label: 'Signed', sortKey: 'signedDate', render: (item) => renderDate(item.signedDate) },
            { key: 'expiryDate', label: 'Expires', sortKey: 'expiryDate', render: (item) => renderDate(item.expiryDate) }
        ],

        DocReviewComment: [
            { key: 'commentId', label: 'ID', sortKey: 'commentId', filterKey: 'commentId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'authorId', label: 'Author', sortKey: 'authorId' },
            { key: 'content', label: 'Comment', sortKey: 'content' },
            { key: 'pageNumber', label: 'Page', sortKey: 'pageNumber' },
            { key: 'isResolved', label: 'Resolved', sortKey: 'isResolved', render: (item) => item.isResolved ? 'Yes' : 'No' },
            { key: 'parentCommentId', label: 'Reply To', sortKey: 'parentCommentId' }
        ]
    };

})();
