/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    window.MobileDocWorkflow = window.MobileDocWorkflow || {};
    const render = MobileDocWorkflow.render;

    MobileDocWorkflow.columns = {
        DocCheckout: [
            ...col.id('checkoutId'),
            ...col.col('documentId', 'Document'),
            ...col.col('checkedOutBy', 'Checked Out By'),
            ...col.enum('status', 'Status', null, render.checkoutStatus),
            ...col.date('checkoutDate', 'Checked Out')
        ],
        DocApprovalWorkflow: [
            ...col.id('workflowId'),
            ...col.col('name', 'Name'),
            ...col.enum('status', 'Status', null, render.workflowStatus),
            ...col.col('currentStep', 'Current Step'),
            ...col.col('totalSteps', 'Total Steps')
        ],
        DocWorkflowStep: [
            ...col.id('stepId'),
            ...col.col('workflowId', 'Workflow'),
            ...col.col('name', 'Name'),
            ...col.col('stepNumber', 'Order'),
            ...col.enum('status', 'Status', null, render.stepStatus)
        ],
        DocSignature: [
            ...col.id('signatureId'),
            ...col.col('documentId', 'Document'),
            ...col.col('signerId', 'Signer'),
            ...col.enum('signatureType', 'Type', null, render.signatureType),
            ...col.enum('status', 'Status', null, render.signatureStatus)
        ],
        DocReviewComment: [
            ...col.id('commentId'),
            ...col.col('documentId', 'Document'),
            ...col.col('authorId', 'Author'),
            ...col.col('content', 'Comment'),
            ...col.boolean('isResolved', 'Resolved')
        ]
    };

})();
