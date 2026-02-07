/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MobileDocWorkflow = window.MobileDocWorkflow || {};
    const { renderDate } = Layer8MRenderers;
    const render = MobileDocWorkflow.render;

    MobileDocWorkflow.columns = {
        DocCheckout: [
            { key: 'checkoutId', label: 'ID', sortKey: 'checkoutId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'checkedOutBy', label: 'Checked Out By', sortKey: 'checkedOutBy' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.checkoutStatus(item.status) },
            { key: 'checkoutDate', label: 'Checked Out', sortKey: 'checkoutDate', render: (item) => renderDate(item.checkoutDate) }
        ],
        DocApprovalWorkflow: [
            { key: 'workflowId', label: 'ID', sortKey: 'workflowId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.workflowStatus(item.status) },
            { key: 'currentStep', label: 'Current Step', sortKey: 'currentStep' },
            { key: 'totalSteps', label: 'Total Steps', sortKey: 'totalSteps' }
        ],
        DocWorkflowStep: [
            { key: 'stepId', label: 'ID', sortKey: 'stepId' },
            { key: 'workflowId', label: 'Workflow', sortKey: 'workflowId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'stepNumber', label: 'Order', sortKey: 'stepNumber' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.stepStatus(item.status) }
        ],
        DocSignature: [
            { key: 'signatureId', label: 'ID', sortKey: 'signatureId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'signerId', label: 'Signer', sortKey: 'signerId' },
            { key: 'signatureType', label: 'Type', sortKey: 'signatureType', render: (item) => render.signatureType(item.signatureType) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.signatureStatus(item.status) }
        ],
        DocReviewComment: [
            { key: 'commentId', label: 'ID', sortKey: 'commentId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'authorId', label: 'Author', sortKey: 'authorId' },
            { key: 'content', label: 'Comment', sortKey: 'content' },
            { key: 'isResolved', label: 'Resolved', sortKey: 'isResolved', render: (item) => item.isResolved ? 'Yes' : 'No' }
        ]
    };

})();
