/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Compliance Module - Enum Definitions

(function() {
    'use strict';

    window.DocCompliance = window.DocCompliance || {};
    DocCompliance.enums = {};

    // RETENTION ACTION
    DocCompliance.enums.RETENTION_ACTION = {
        0: 'Unspecified',
        1: 'Archive',
        2: 'Delete',
        3: 'Review'
    };

    DocCompliance.enums.RETENTION_ACTION_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-terminated',
        3: 'layer8d-status-pending'
    };

    // LEGAL HOLD STATUS
    DocCompliance.enums.LEGAL_HOLD_STATUS = {
        0: 'Unspecified',
        1: 'Active',
        2: 'Released',
        3: 'Expired'
    };

    DocCompliance.enums.LEGAL_HOLD_STATUS_CLASSES = {
        1: 'layer8d-status-terminated',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive'
    };

    // ACCESS ACTION
    DocCompliance.enums.ACCESS_ACTION = {
        0: 'Unspecified',
        1: 'View',
        2: 'Download',
        3: 'Edit',
        4: 'Delete',
        5: 'Share',
        6: 'Print'
    };

    DocCompliance.enums.ACCESS_ACTION_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-active',
        6: 'layer8d-status-active'
    };

    // ARCHIVE STATUS
    DocCompliance.enums.ARCHIVE_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Failed'
    };

    DocCompliance.enums.ARCHIVE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // RENDERERS
    DocCompliance.render = {};

    DocCompliance.render.retentionAction = Layer8DRenderers.createStatusRenderer(
        DocCompliance.enums.RETENTION_ACTION,
        DocCompliance.enums.RETENTION_ACTION_CLASSES
    );

    DocCompliance.render.legalHoldStatus = Layer8DRenderers.createStatusRenderer(
        DocCompliance.enums.LEGAL_HOLD_STATUS,
        DocCompliance.enums.LEGAL_HOLD_STATUS_CLASSES
    );

    DocCompliance.render.accessAction = Layer8DRenderers.createStatusRenderer(
        DocCompliance.enums.ACCESS_ACTION,
        DocCompliance.enums.ACCESS_ACTION_CLASSES
    );

    DocCompliance.render.archiveStatus = Layer8DRenderers.createStatusRenderer(
        DocCompliance.enums.ARCHIVE_STATUS,
        DocCompliance.enums.ARCHIVE_STATUS_CLASSES
    );

    DocCompliance.render.date = Layer8DRenderers.renderDate;

})();
