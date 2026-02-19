/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MobileDocCompliance = window.MobileDocCompliance || {};
    MobileDocCompliance.enums = {};

    MobileDocCompliance.enums.RETENTION_STATUS = { 0: 'Unspecified', 1: 'Active', 2: 'Expired', 3: 'Suspended' };
    MobileDocCompliance.enums.RETENTION_STATUS_CLASSES = { 1: 'status-active', 2: 'status-terminated', 3: 'status-pending' };

    MobileDocCompliance.enums.LEGAL_HOLD_STATUS = { 0: 'Unspecified', 1: 'Active', 2: 'Released', 3: 'Pending' };
    MobileDocCompliance.enums.LEGAL_HOLD_STATUS_CLASSES = { 1: 'status-active', 2: 'status-terminated', 3: 'status-pending' };

    MobileDocCompliance.enums.ACCESS_TYPE = { 0: 'Unspecified', 1: 'View', 2: 'Edit', 3: 'Download', 4: 'Delete', 5: 'Share' };
    MobileDocCompliance.enums.ACCESS_TYPE_CLASSES = { 1: 'status-active', 2: 'status-pending', 3: 'status-active', 4: 'status-terminated', 5: 'status-active' };

    MobileDocCompliance.enums.ARCHIVE_STATUS = { 0: 'Unspecified', 1: 'Pending', 2: 'Processing', 3: 'Completed', 4: 'Failed', 5: 'Restored' };
    MobileDocCompliance.enums.ARCHIVE_STATUS_CLASSES = { 1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated', 5: 'status-active' };

    MobileDocCompliance.enums.AUDIT_ACTION = { 0: 'Unspecified', 1: 'Create', 2: 'Update', 3: 'Delete', 4: 'Access', 5: 'Approve', 6: 'Reject' };
    MobileDocCompliance.enums.AUDIT_ACTION_CLASSES = { 1: 'status-active', 2: 'status-pending', 3: 'status-terminated', 4: 'status-active', 5: 'status-active', 6: 'status-terminated' };

    MobileDocCompliance.enums.RETENTION_ACTION = { 0: 'Unspecified', 1: 'Archive', 2: 'Delete', 3: 'Review' };
    MobileDocCompliance.enums.RETENTION_ACTION_CLASSES = { 1: 'status-active', 2: 'status-terminated', 3: 'status-pending' };

    MobileDocCompliance.render = {
        retentionStatus: Layer8MRenderers.createStatusRenderer(MobileDocCompliance.enums.RETENTION_STATUS, MobileDocCompliance.enums.RETENTION_STATUS_CLASSES),
        legalHoldStatus: Layer8MRenderers.createStatusRenderer(MobileDocCompliance.enums.LEGAL_HOLD_STATUS, MobileDocCompliance.enums.LEGAL_HOLD_STATUS_CLASSES),
        accessType: Layer8MRenderers.createStatusRenderer(MobileDocCompliance.enums.ACCESS_TYPE, MobileDocCompliance.enums.ACCESS_TYPE_CLASSES),
        archiveStatus: Layer8MRenderers.createStatusRenderer(MobileDocCompliance.enums.ARCHIVE_STATUS, MobileDocCompliance.enums.ARCHIVE_STATUS_CLASSES),
        auditAction: Layer8MRenderers.createStatusRenderer(MobileDocCompliance.enums.AUDIT_ACTION, MobileDocCompliance.enums.AUDIT_ACTION_CLASSES),
        retentionAction: Layer8MRenderers.createStatusRenderer(MobileDocCompliance.enums.RETENTION_ACTION, MobileDocCompliance.enums.RETENTION_ACTION_CLASSES),
        date: Layer8MRenderers.renderDate
    };

})();
