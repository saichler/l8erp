/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Compliance Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8DRenderers;

    window.DocCompliance = window.DocCompliance || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const RETENTION_ACTION = factory.create([
        ['Unspecified', null, ''],
        ['Archive', 'archive', 'layer8d-status-active'],
        ['Delete', 'delete', 'layer8d-status-terminated'],
        ['Review', 'review', 'layer8d-status-pending']
    ]);

    const LEGAL_HOLD_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-terminated'],
        ['Released', 'released', 'layer8d-status-active'],
        ['Expired', 'expired', 'layer8d-status-inactive']
    ]);

    const ACCESS_ACTION = factory.simple([
        'Unspecified', 'View', 'Download', 'Edit', 'Delete', 'Share', 'Print'
    ]);

    const ARCHIVE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    DocCompliance.enums = {
        RETENTION_ACTION: RETENTION_ACTION.enum,
        RETENTION_ACTION_CLASSES: RETENTION_ACTION.classes,
        LEGAL_HOLD_STATUS: LEGAL_HOLD_STATUS.enum,
        LEGAL_HOLD_STATUS_CLASSES: LEGAL_HOLD_STATUS.classes,
        ACCESS_ACTION: ACCESS_ACTION.enum,
        ARCHIVE_STATUS: ARCHIVE_STATUS.enum,
        ARCHIVE_STATUS_CLASSES: ARCHIVE_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    DocCompliance.render = {
        retentionAction: createStatusRenderer(RETENTION_ACTION.enum, RETENTION_ACTION.classes),
        legalHoldStatus: createStatusRenderer(LEGAL_HOLD_STATUS.enum, LEGAL_HOLD_STATUS.classes),
        accessAction: (v) => renderEnum(v, ACCESS_ACTION.enum),
        archiveStatus: createStatusRenderer(ARCHIVE_STATUS.enum, ARCHIVE_STATUS.classes),
        date: renderDate
    };

})();
