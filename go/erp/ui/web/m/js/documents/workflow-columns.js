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
        DocApprovalWorkflow: [
            ...col.id('workflowId'),
            ...col.col('name', 'Name'),
            ...col.enum('status', 'Status', null, render.workflowStatus),
            ...col.col('currentStep', 'Current Step'),
            ...col.col('totalSteps', 'Total Steps')
        ]
    };

})();
