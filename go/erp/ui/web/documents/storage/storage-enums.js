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

    const CHECKOUT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Checked Out', 'checkedout', 'layer8d-status-pending'],
        ['Checked In', 'checkedin', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
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

    const ACCESS_ACTION = factory.simple([
        'Unspecified', 'View', 'Download', 'Edit', 'Delete', 'Share', 'Print'
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
        ACCESS_LEVEL_CLASSES: ACCESS_LEVEL.classes,
        CHECKOUT_STATUS: CHECKOUT_STATUS.enum,
        CHECKOUT_STATUS_CLASSES: CHECKOUT_STATUS.classes,
        SIGNATURE_TYPE: SIGNATURE_TYPE.enum,
        SIGNATURE_STATUS: SIGNATURE_STATUS.enum,
        SIGNATURE_STATUS_CLASSES: SIGNATURE_STATUS.classes,
        ACCESS_ACTION: ACCESS_ACTION.enum
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    DocStorage.render = {
        documentStatus: createStatusRenderer(DOCUMENT_STATUS.enum, DOCUMENT_STATUS.classes),
        documentType: (v) => renderEnum(v, DOCUMENT_TYPE.enum),
        fileFormat: (v) => renderEnum(v, FILE_FORMAT.enum),
        accessLevel: createStatusRenderer(ACCESS_LEVEL.enum, ACCESS_LEVEL.classes),
        checkoutStatus: createStatusRenderer(CHECKOUT_STATUS.enum, CHECKOUT_STATUS.classes),
        signatureType: (v) => renderEnum(v, SIGNATURE_TYPE.enum),
        signatureStatus: createStatusRenderer(SIGNATURE_STATUS.enum, SIGNATURE_STATUS.classes),
        accessAction: (v) => renderEnum(v, ACCESS_ACTION.enum),
        date: renderDate,
        fileSize: renderFileSize
    };

})();
