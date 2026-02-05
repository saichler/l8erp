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
            { key: 'retentionPeriod', label: 'Period (Days)', sortKey: 'retentionPeriod' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.retentionStatus(item.status) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],
        DocLegalHold: [
            { key: 'holdId', label: 'ID', sortKey: 'holdId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.legalHoldStatus(item.status) },
            { key: 'createdAt', label: 'Created', sortKey: 'createdAt', render: (item) => renderDate(item.createdAt) }
        ],
        DocAccessLog: [
            { key: 'logId', label: 'ID', sortKey: 'logId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'accessType', label: 'Type', sortKey: 'accessType', render: (item) => render.accessType(item.accessType) },
            { key: 'accessedAt', label: 'Accessed', sortKey: 'accessedAt', render: (item) => renderDate(item.accessedAt) }
        ],
        DocArchiveJob: [
            { key: 'archiveId', label: 'ID', sortKey: 'archiveId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.archiveStatus(item.status) },
            { key: 'archivedAt', label: 'Archived', sortKey: 'archivedAt', render: (item) => renderDate(item.archivedAt) },
            { key: 'archiveLocation', label: 'Location', sortKey: 'archiveLocation' }
        ],
        DocAuditTrail: [
            { key: 'auditId', label: 'ID', sortKey: 'auditId' },
            { key: 'entityType', label: 'Entity Type', sortKey: 'entityType' },
            { key: 'entityId', label: 'Entity ID', sortKey: 'entityId' },
            { key: 'action', label: 'Action', sortKey: 'action', render: (item) => render.auditAction(item.action) },
            { key: 'timestamp', label: 'Timestamp', sortKey: 'timestamp', render: (item) => renderDate(item.timestamp) }
        ]
    };

})();
