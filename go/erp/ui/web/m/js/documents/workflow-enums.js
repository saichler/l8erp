/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MobileDocWorkflow = window.MobileDocWorkflow || {};
    MobileDocWorkflow.enums = {};

    MobileDocWorkflow.enums.CHECKOUT_STATUS = { 0: 'Unspecified', 1: 'Checked Out', 2: 'Checked In', 3: 'Cancelled' };
    MobileDocWorkflow.enums.CHECKOUT_STATUS_CLASSES = { 1: 'status-pending', 2: 'status-active', 3: 'status-inactive' };

    MobileDocWorkflow.enums.WORKFLOW_STATUS = { 0: 'Unspecified', 1: 'Draft', 2: 'Active', 3: 'Completed', 4: 'Cancelled', 5: 'Rejected' };
    MobileDocWorkflow.enums.WORKFLOW_STATUS_CLASSES = { 1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-inactive', 5: 'status-terminated' };

    MobileDocWorkflow.enums.STEP_STATUS = { 0: 'Unspecified', 1: 'Pending', 2: 'In Progress', 3: 'Approved', 4: 'Rejected', 5: 'Skipped' };
    MobileDocWorkflow.enums.STEP_STATUS_CLASSES = { 1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated', 5: 'status-inactive' };

    MobileDocWorkflow.enums.SIGNATURE_TYPE = { 0: 'Unspecified', 1: 'Electronic', 2: 'Digital', 3: 'Handwritten' };
    MobileDocWorkflow.enums.SIGNATURE_TYPE_CLASSES = { 1: 'status-active', 2: 'status-active', 3: 'status-pending' };

    MobileDocWorkflow.enums.SIGNATURE_STATUS = { 0: 'Unspecified', 1: 'Pending', 2: 'Signed', 3: 'Declined', 4: 'Expired' };
    MobileDocWorkflow.enums.SIGNATURE_STATUS_CLASSES = { 1: 'status-pending', 2: 'status-active', 3: 'status-terminated', 4: 'status-inactive' };

    MobileDocWorkflow.render = {
        checkoutStatus: Layer8MRenderers.createStatusRenderer(MobileDocWorkflow.enums.CHECKOUT_STATUS, MobileDocWorkflow.enums.CHECKOUT_STATUS_CLASSES),
        workflowStatus: Layer8MRenderers.createStatusRenderer(MobileDocWorkflow.enums.WORKFLOW_STATUS, MobileDocWorkflow.enums.WORKFLOW_STATUS_CLASSES),
        stepStatus: Layer8MRenderers.createStatusRenderer(MobileDocWorkflow.enums.STEP_STATUS, MobileDocWorkflow.enums.STEP_STATUS_CLASSES),
        signatureType: Layer8MRenderers.createStatusRenderer(MobileDocWorkflow.enums.SIGNATURE_TYPE, MobileDocWorkflow.enums.SIGNATURE_TYPE_CLASSES),
        signatureStatus: Layer8MRenderers.createStatusRenderer(MobileDocWorkflow.enums.SIGNATURE_STATUS, MobileDocWorkflow.enums.SIGNATURE_STATUS_CLASSES),
        date: Layer8MRenderers.renderDate
    };

})();
