/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Documents Storage Module - Enum Definitions
 * Desktop Equivalent: documents/storage/storage-enums.js
 */
(function() {
    'use strict';

    window.MobileDocStorage = window.MobileDocStorage || {};
    MobileDocStorage.enums = {};

    MobileDocStorage.enums.DOCUMENT_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Under Review', 3: 'Approved', 4: 'Published', 5: 'Archived', 6: 'Deleted'
    };
    MobileDocStorage.enums.DOCUMENT_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-active', 5: 'status-inactive', 6: 'status-terminated'
    };

    MobileDocStorage.enums.DOCUMENT_TYPE = {
        0: 'Unspecified', 1: 'Contract', 2: 'Invoice', 3: 'Report', 4: 'Policy', 5: 'Procedure', 6: 'Form', 7: 'Image', 8: 'Spreadsheet', 9: 'Presentation', 10: 'Other'
    };
    MobileDocStorage.enums.DOCUMENT_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-pending', 5: 'status-pending', 6: 'status-active', 7: 'status-active', 8: 'status-active', 9: 'status-active', 10: 'status-inactive'
    };

    MobileDocStorage.enums.FILE_FORMAT = {
        0: 'Unspecified', 1: 'PDF', 2: 'Word', 3: 'Excel', 4: 'PowerPoint', 5: 'Image', 6: 'Text', 7: 'HTML', 8: 'XML', 9: 'JSON', 10: 'Other'
    };
    MobileDocStorage.enums.FILE_FORMAT_CLASSES = {
        1: 'status-terminated', 2: 'status-active', 3: 'status-active', 4: 'status-pending', 5: 'status-active', 6: 'status-inactive', 7: 'status-active', 8: 'status-active', 9: 'status-active', 10: 'status-inactive'
    };

    MobileDocStorage.enums.ACCESS_LEVEL = {
        0: 'Unspecified', 1: 'Public', 2: 'Internal', 3: 'Confidential', 4: 'Restricted'
    };
    MobileDocStorage.enums.ACCESS_LEVEL_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending', 4: 'status-terminated'
    };

    MobileDocStorage.render = {
        documentStatus: Layer8MRenderers.createStatusRenderer(MobileDocStorage.enums.DOCUMENT_STATUS, MobileDocStorage.enums.DOCUMENT_STATUS_CLASSES),
        documentType: Layer8MRenderers.createStatusRenderer(MobileDocStorage.enums.DOCUMENT_TYPE, MobileDocStorage.enums.DOCUMENT_TYPE_CLASSES),
        fileFormat: Layer8MRenderers.createStatusRenderer(MobileDocStorage.enums.FILE_FORMAT, MobileDocStorage.enums.FILE_FORMAT_CLASSES),
        accessLevel: Layer8MRenderers.createStatusRenderer(MobileDocStorage.enums.ACCESS_LEVEL, MobileDocStorage.enums.ACCESS_LEVEL_CLASSES),
        date: Layer8MRenderers.renderDate,
        fileSize: Layer8MRenderers.renderFileSize
    };

})();
