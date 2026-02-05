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
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.checkoutStatus(item.status) },
            { key: 'checkedOutAt', label: 'Checked Out', sortKey: 'checkedOutAt', render: (item) => renderDate(item.checkedOutAt) }
        ],
        DocApprovalWorkflow: [
            { key: 'workflowId', label: 'ID', sortKey: 'workflowId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.workflowStatus(item.status) },
            { key: 'currentStep', label: 'Current Step', sortKey: 'currentStep' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],
        DocWorkflowStep: [
            { key: 'stepId', label: 'ID', sortKey: 'stepId' },
            { key: 'workflowId', label: 'Workflow', sortKey: 'workflowId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'stepOrder', label: 'Order', sortKey: 'stepOrder' },
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
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'comment', label: 'Comment', sortKey: 'comment' },
            { key: 'isResolved', label: 'Resolved', sortKey: 'isResolved', render: (item) => item.isResolved ? 'Yes' : 'No' }
        ]
    };

})();
