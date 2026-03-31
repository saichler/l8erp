/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Workflow Module - Column Configurations

(function() {
    'use strict';

    window.DocWorkflow = window.DocWorkflow || {};

    const col = window.Layer8ColumnFactory;
    const render = DocWorkflow.render;

    DocWorkflow.columns = {
        DocApprovalWorkflow: [
            ...col.id('workflowId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.enum('status', 'Status', null, render.workflowStatus),
            ...col.col('documentId', 'Document'),
            ...col.col('initiatedBy', 'Initiated By'),
            ...col.col('currentStep', 'Current Step'),
            ...col.col('totalSteps', 'Total Steps'),
        ]
    };

})();
