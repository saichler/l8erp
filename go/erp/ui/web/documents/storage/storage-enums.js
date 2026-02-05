/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Storage Module - Enum Definitions

(function() {
    'use strict';

    window.DocStorage = window.DocStorage || {};
    DocStorage.enums = {};

    // DOCUMENT STATUS
    DocStorage.enums.DOCUMENT_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Under Review',
        3: 'Approved',
        4: 'Published',
        5: 'Archived',
        6: 'Deleted'
    };

    DocStorage.enums.DOCUMENT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-inactive',
        6: 'layer8d-status-terminated'
    };

    // DOCUMENT TYPE
    DocStorage.enums.DOCUMENT_TYPE = {
        0: 'Unspecified',
        1: 'Contract',
        2: 'Invoice',
        3: 'Report',
        4: 'Policy',
        5: 'Procedure',
        6: 'Form',
        7: 'Image',
        8: 'Spreadsheet',
        9: 'Presentation',
        10: 'Other'
    };

    DocStorage.enums.DOCUMENT_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-pending',
        6: 'layer8d-status-active',
        7: 'layer8d-status-active',
        8: 'layer8d-status-active',
        9: 'layer8d-status-active',
        10: 'layer8d-status-inactive'
    };

    // FILE FORMAT
    DocStorage.enums.FILE_FORMAT = {
        0: 'Unspecified',
        1: 'PDF',
        2: 'Word',
        3: 'Excel',
        4: 'PowerPoint',
        5: 'Image',
        6: 'Text',
        7: 'HTML',
        8: 'XML',
        9: 'JSON',
        10: 'Other'
    };

    DocStorage.enums.FILE_FORMAT_CLASSES = {
        1: 'layer8d-status-terminated',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-active',
        6: 'layer8d-status-inactive',
        7: 'layer8d-status-active',
        8: 'layer8d-status-active',
        9: 'layer8d-status-active',
        10: 'layer8d-status-inactive'
    };

    // ACCESS LEVEL
    DocStorage.enums.ACCESS_LEVEL = {
        0: 'Unspecified',
        1: 'Public',
        2: 'Internal',
        3: 'Confidential',
        4: 'Restricted'
    };

    DocStorage.enums.ACCESS_LEVEL_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-terminated'
    };

    // RENDERERS
    DocStorage.render = {};

    DocStorage.render.documentStatus = Layer8DRenderers.createStatusRenderer(
        DocStorage.enums.DOCUMENT_STATUS,
        DocStorage.enums.DOCUMENT_STATUS_CLASSES
    );

    DocStorage.render.documentType = Layer8DRenderers.createStatusRenderer(
        DocStorage.enums.DOCUMENT_TYPE,
        DocStorage.enums.DOCUMENT_TYPE_CLASSES
    );

    DocStorage.render.fileFormat = Layer8DRenderers.createStatusRenderer(
        DocStorage.enums.FILE_FORMAT,
        DocStorage.enums.FILE_FORMAT_CLASSES
    );

    DocStorage.render.accessLevel = Layer8DRenderers.createStatusRenderer(
        DocStorage.enums.ACCESS_LEVEL,
        DocStorage.enums.ACCESS_LEVEL_CLASSES
    );

    DocStorage.render.date = Layer8DRenderers.renderDate;
    DocStorage.render.fileSize = Layer8DRenderers.renderFileSize;

})();
