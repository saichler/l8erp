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
        DocApprovalWorkflow: [
            { key: 'workflowId', label: 'ID', sortKey: 'workflowId', filterKey: 'workflowId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.workflowStatus(item.status) },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'initiatedBy', label: 'Initiated By', sortKey: 'initiatedBy' },
            { key: 'currentStep', label: 'Current Step', sortKey: 'currentStep' },
            { key: 'totalSteps', label: 'Total Steps', sortKey: 'totalSteps' }
        ]
    };

})();
