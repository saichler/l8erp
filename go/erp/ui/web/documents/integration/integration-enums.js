/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Integration Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderFileSize } = Layer8DRenderers;

    window.DocIntegration = window.DocIntegration || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const FILE_FORMAT = factory.simple([
        'Unspecified', 'PDF', 'Word', 'Excel', 'PowerPoint', 'Image',
        'Text', 'HTML', 'XML', 'JSON', 'Other'
    ]);

    const TEMPLATE_TYPE = factory.simple([
        'Unspecified', 'Document', 'Email', 'Form', 'Report', 'Contract'
    ]);

    const FIELD_TYPE = factory.simple([
        'Unspecified', 'Text', 'Number', 'Date', 'Boolean', 'Select', 'Reference'
    ]);

    const SCAN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Processing', 'processing', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated']
    ]);

    const EMAIL_CAPTURE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Received', 'received', 'layer8d-status-active'],
        ['Processed', 'processed', 'layer8d-status-pending'],
        ['Filed', 'filed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    DocIntegration.enums = {
        FILE_FORMAT: FILE_FORMAT.enum,
        TEMPLATE_TYPE: TEMPLATE_TYPE.enum,
        FIELD_TYPE: FIELD_TYPE.enum,
        SCAN_STATUS: SCAN_STATUS.enum,
        SCAN_STATUS_CLASSES: SCAN_STATUS.classes,
        EMAIL_CAPTURE_STATUS: EMAIL_CAPTURE_STATUS.enum,
        EMAIL_CAPTURE_STATUS_CLASSES: EMAIL_CAPTURE_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    DocIntegration.render = {
        fileFormat: (v) => renderEnum(v, FILE_FORMAT.enum),
        templateType: (v) => renderEnum(v, TEMPLATE_TYPE.enum),
        fieldType: (v) => renderEnum(v, FIELD_TYPE.enum),
        scanStatus: createStatusRenderer(SCAN_STATUS.enum, SCAN_STATUS.classes),
        emailCaptureStatus: createStatusRenderer(EMAIL_CAPTURE_STATUS.enum, EMAIL_CAPTURE_STATUS.classes),
        date: renderDate,
        fileSize: renderFileSize
    };

})();
