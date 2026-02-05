/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Workflow Module - Enum Definitions

(function() {
    'use strict';

    window.DocWorkflow = window.DocWorkflow || {};
    DocWorkflow.enums = {};

    // CHECKOUT STATUS
    DocWorkflow.enums.CHECKOUT_STATUS = {
        0: 'Unspecified',
        1: 'Checked Out',
        2: 'Checked In',
        3: 'Cancelled'
    };

    DocWorkflow.enums.CHECKOUT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive'
    };

    // WORKFLOW STATUS
    DocWorkflow.enums.WORKFLOW_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Active',
        3: 'Completed',
        4: 'Cancelled',
        5: 'Rejected'
    };

    DocWorkflow.enums.WORKFLOW_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-terminated'
    };

    // STEP STATUS
    DocWorkflow.enums.STEP_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Approved',
        4: 'Rejected',
        5: 'Skipped'
    };

    DocWorkflow.enums.STEP_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive'
    };

    // SIGNATURE TYPE
    DocWorkflow.enums.SIGNATURE_TYPE = {
        0: 'Unspecified',
        1: 'Electronic',
        2: 'Digital',
        3: 'Handwritten'
    };

    DocWorkflow.enums.SIGNATURE_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending'
    };

    // SIGNATURE STATUS
    DocWorkflow.enums.SIGNATURE_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Signed',
        3: 'Declined',
        4: 'Expired'
    };

    DocWorkflow.enums.SIGNATURE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-terminated',
        4: 'layer8d-status-inactive'
    };

    // RENDERERS
    DocWorkflow.render = {};

    DocWorkflow.render.checkoutStatus = Layer8DRenderers.createStatusRenderer(
        DocWorkflow.enums.CHECKOUT_STATUS,
        DocWorkflow.enums.CHECKOUT_STATUS_CLASSES
    );

    DocWorkflow.render.workflowStatus = Layer8DRenderers.createStatusRenderer(
        DocWorkflow.enums.WORKFLOW_STATUS,
        DocWorkflow.enums.WORKFLOW_STATUS_CLASSES
    );

    DocWorkflow.render.stepStatus = Layer8DRenderers.createStatusRenderer(
        DocWorkflow.enums.STEP_STATUS,
        DocWorkflow.enums.STEP_STATUS_CLASSES
    );

    DocWorkflow.render.signatureType = Layer8DRenderers.createStatusRenderer(
        DocWorkflow.enums.SIGNATURE_TYPE,
        DocWorkflow.enums.SIGNATURE_TYPE_CLASSES
    );

    DocWorkflow.render.signatureStatus = Layer8DRenderers.createStatusRenderer(
        DocWorkflow.enums.SIGNATURE_STATUS,
        DocWorkflow.enums.SIGNATURE_STATUS_CLASSES
    );

    DocWorkflow.render.date = Layer8DRenderers.renderDate;

})();
