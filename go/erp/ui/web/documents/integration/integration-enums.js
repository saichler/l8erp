/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Integration Module - Enum Definitions

(function() {
    'use strict';

    window.DocIntegration = window.DocIntegration || {};
    DocIntegration.enums = {};

    // TEMPLATE TYPE
    DocIntegration.enums.TEMPLATE_TYPE = {
        0: 'Unspecified',
        1: 'Document',
        2: 'Email',
        3: 'Form',
        4: 'Report',
        5: 'Contract'
    };

    DocIntegration.enums.TEMPLATE_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-pending'
    };

    // FIELD TYPE
    DocIntegration.enums.FIELD_TYPE = {
        0: 'Unspecified',
        1: 'Text',
        2: 'Number',
        3: 'Date',
        4: 'Boolean',
        5: 'Select',
        6: 'Reference'
    };

    DocIntegration.enums.FIELD_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-pending'
    };

    // SCAN STATUS
    DocIntegration.enums.SCAN_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Processing',
        3: 'Completed',
        4: 'Failed'
    };

    DocIntegration.enums.SCAN_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // EMAIL CAPTURE STATUS
    DocIntegration.enums.EMAIL_CAPTURE_STATUS = {
        0: 'Unspecified',
        1: 'Received',
        2: 'Processed',
        3: 'Filed',
        4: 'Failed'
    };

    DocIntegration.enums.EMAIL_CAPTURE_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // RENDERERS
    DocIntegration.render = {};

    DocIntegration.render.templateType = Layer8DRenderers.createStatusRenderer(
        DocIntegration.enums.TEMPLATE_TYPE,
        DocIntegration.enums.TEMPLATE_TYPE_CLASSES
    );

    DocIntegration.render.fieldType = Layer8DRenderers.createStatusRenderer(
        DocIntegration.enums.FIELD_TYPE,
        DocIntegration.enums.FIELD_TYPE_CLASSES
    );

    DocIntegration.render.scanStatus = Layer8DRenderers.createStatusRenderer(
        DocIntegration.enums.SCAN_STATUS,
        DocIntegration.enums.SCAN_STATUS_CLASSES
    );

    DocIntegration.render.emailCaptureStatus = Layer8DRenderers.createStatusRenderer(
        DocIntegration.enums.EMAIL_CAPTURE_STATUS,
        DocIntegration.enums.EMAIL_CAPTURE_STATUS_CLASSES
    );

    DocIntegration.render.date = Layer8DRenderers.renderDate;
    DocIntegration.render.fileSize = Layer8DRenderers.renderFileSize;

})();
