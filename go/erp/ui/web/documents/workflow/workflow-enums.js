/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Workflow Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8DRenderers;

    window.DocWorkflow = window.DocWorkflow || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CHECKOUT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Checked Out', 'out', 'layer8d-status-pending'],
        ['Checked In', 'in', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    const WORKFLOW_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive'],
        ['Rejected', 'rejected', 'layer8d-status-terminated']
    ]);

    const STEP_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated'],
        ['Skipped', 'skipped', 'layer8d-status-inactive']
    ]);

    const SIGNATURE_TYPE = factory.simple([
        'Unspecified', 'Electronic', 'Digital', 'Handwritten'
    ]);

    const SIGNATURE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Signed', 'signed', 'layer8d-status-active'],
        ['Declined', 'declined', 'layer8d-status-terminated'],
        ['Expired', 'expired', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    DocWorkflow.enums = {
        CHECKOUT_STATUS: CHECKOUT_STATUS.enum,
        CHECKOUT_STATUS_CLASSES: CHECKOUT_STATUS.classes,
        WORKFLOW_STATUS: WORKFLOW_STATUS.enum,
        WORKFLOW_STATUS_CLASSES: WORKFLOW_STATUS.classes,
        STEP_STATUS: STEP_STATUS.enum,
        STEP_STATUS_CLASSES: STEP_STATUS.classes,
        SIGNATURE_TYPE: SIGNATURE_TYPE.enum,
        SIGNATURE_STATUS: SIGNATURE_STATUS.enum,
        SIGNATURE_STATUS_CLASSES: SIGNATURE_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    DocWorkflow.render = {
        checkoutStatus: createStatusRenderer(CHECKOUT_STATUS.enum, CHECKOUT_STATUS.classes),
        workflowStatus: createStatusRenderer(WORKFLOW_STATUS.enum, WORKFLOW_STATUS.classes),
        stepStatus: createStatusRenderer(STEP_STATUS.enum, STEP_STATUS.classes),
        signatureType: (v) => renderEnum(v, SIGNATURE_TYPE.enum),
        signatureStatus: createStatusRenderer(SIGNATURE_STATUS.enum, SIGNATURE_STATUS.classes),
        date: renderDate
    };

})();
