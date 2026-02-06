/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Storage Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderFileSize } = Layer8DRenderers;

    window.DocStorage = window.DocStorage || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const DOCUMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Under Review', 'review', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Published', 'published', 'layer8d-status-active'],
        ['Archived', 'archived', 'layer8d-status-inactive'],
        ['Deleted', 'deleted', 'layer8d-status-terminated']
    ]);

    const DOCUMENT_TYPE = factory.simple([
        'Unspecified', 'Contract', 'Invoice', 'Report', 'Policy',
        'Procedure', 'Form', 'Image', 'Spreadsheet', 'Presentation', 'Other'
    ]);

    const FILE_FORMAT = factory.simple([
        'Unspecified', 'PDF', 'Word', 'Excel', 'PowerPoint',
        'Image', 'Text', 'HTML', 'XML', 'JSON', 'Other'
    ]);

    const ACCESS_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['Public', 'public', 'layer8d-status-active'],
        ['Internal', 'internal', 'layer8d-status-active'],
        ['Confidential', 'confidential', 'layer8d-status-pending'],
        ['Restricted', 'restricted', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    DocStorage.enums = {
        DOCUMENT_STATUS: DOCUMENT_STATUS.enum,
        DOCUMENT_STATUS_CLASSES: DOCUMENT_STATUS.classes,
        DOCUMENT_TYPE: DOCUMENT_TYPE.enum,
        FILE_FORMAT: FILE_FORMAT.enum,
        ACCESS_LEVEL: ACCESS_LEVEL.enum,
        ACCESS_LEVEL_CLASSES: ACCESS_LEVEL.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    DocStorage.render = {
        documentStatus: createStatusRenderer(DOCUMENT_STATUS.enum, DOCUMENT_STATUS.classes),
        documentType: (v) => renderEnum(v, DOCUMENT_TYPE.enum),
        fileFormat: (v) => renderEnum(v, FILE_FORMAT.enum),
        accessLevel: createStatusRenderer(ACCESS_LEVEL.enum, ACCESS_LEVEL.classes),
        date: renderDate,
        fileSize: renderFileSize
    };

})();
