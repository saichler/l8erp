/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MobileDocIntegration = window.MobileDocIntegration || {};
    MobileDocIntegration.enums = {};

    MobileDocIntegration.enums.TEMPLATE_TYPE = { 0: 'Unspecified', 1: 'Document', 2: 'Email', 3: 'Form', 4: 'Report', 5: 'Contract' };
    MobileDocIntegration.enums.TEMPLATE_TYPE_CLASSES = { 1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-pending' };

    MobileDocIntegration.enums.FIELD_TYPE = { 0: 'Unspecified', 1: 'Text', 2: 'Number', 3: 'Date', 4: 'Boolean', 5: 'Select', 6: 'Reference' };
    MobileDocIntegration.enums.FIELD_TYPE_CLASSES = { 1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-active', 6: 'status-pending' };

    MobileDocIntegration.enums.SCAN_STATUS = { 0: 'Unspecified', 1: 'Pending', 2: 'Processing', 3: 'Completed', 4: 'Failed' };
    MobileDocIntegration.enums.SCAN_STATUS_CLASSES = { 1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated' };

    MobileDocIntegration.enums.EMAIL_CAPTURE_STATUS = { 0: 'Unspecified', 1: 'Received', 2: 'Processed', 3: 'Filed', 4: 'Failed' };
    MobileDocIntegration.enums.EMAIL_CAPTURE_STATUS_CLASSES = { 1: 'status-active', 2: 'status-pending', 3: 'status-active', 4: 'status-terminated' };

    MobileDocIntegration.render = {
        templateType: Layer8MRenderers.createStatusRenderer(MobileDocIntegration.enums.TEMPLATE_TYPE, MobileDocIntegration.enums.TEMPLATE_TYPE_CLASSES),
        fieldType: Layer8MRenderers.createStatusRenderer(MobileDocIntegration.enums.FIELD_TYPE, MobileDocIntegration.enums.FIELD_TYPE_CLASSES),
        scanStatus: Layer8MRenderers.createStatusRenderer(MobileDocIntegration.enums.SCAN_STATUS, MobileDocIntegration.enums.SCAN_STATUS_CLASSES),
        emailCaptureStatus: Layer8MRenderers.createStatusRenderer(MobileDocIntegration.enums.EMAIL_CAPTURE_STATUS, MobileDocIntegration.enums.EMAIL_CAPTURE_STATUS_CLASSES),
        date: Layer8MRenderers.renderDate,
        fileSize: Layer8MRenderers.renderFileSize
    };

})();
