/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MobileDocCompliance = window.MobileDocCompliance || {};
    const { renderDate } = Layer8MRenderers;
    const render = MobileDocCompliance.render;

    MobileDocCompliance.columns = {
        DocRetentionPolicy: [
            { key: 'policyId', label: 'ID', sortKey: 'policyId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'retentionDays', label: 'Period (Days)', sortKey: 'retentionDays' },
            { key: 'actionOnExpiry', label: 'Action', sortKey: 'actionOnExpiry', render: (item) => render.retentionAction(item.actionOnExpiry) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],
        DocLegalHold: [
            { key: 'holdId', label: 'ID', sortKey: 'holdId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'matterId', label: 'Matter ID', sortKey: 'matterId' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.legalHoldStatus(item.status) },
            { key: 'effectiveDate', label: 'Effective', sortKey: 'effectiveDate', render: (item) => renderDate(item.effectiveDate) }
        ],
        DocAccessLog: [
            { key: 'logId', label: 'ID', sortKey: 'logId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'action', label: 'Action', sortKey: 'action', render: (item) => render.accessAction(item.action) },
            { key: 'accessDate', label: 'Accessed', sortKey: 'accessDate', render: (item) => renderDate(item.accessDate) }
        ],
        DocArchiveJob: [
            { key: 'jobId', label: 'ID', sortKey: 'jobId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.archiveStatus(item.status) },
            { key: 'initiatedDate', label: 'Initiated', sortKey: 'initiatedDate', render: (item) => renderDate(item.initiatedDate) },
            { key: 'archiveLocation', label: 'Location', sortKey: 'archiveLocation' }
        ],
        DocAuditTrail: [
            { key: 'trailId', label: 'ID', sortKey: 'trailId' },
            { key: 'entityType', label: 'Entity Type', sortKey: 'entityType' },
            { key: 'entityId', label: 'Entity ID', sortKey: 'entityId' },
            { key: 'action', label: 'Action', sortKey: 'action' },
            { key: 'timestamp', label: 'Timestamp', sortKey: 'timestamp', render: (item) => renderDate(item.timestamp) }
        ]
    };

})();
