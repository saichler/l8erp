/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Compliance Module - Column Configurations

(function() {
    'use strict';

    window.DocCompliance = window.DocCompliance || {};

    const { renderDate } = Layer8DRenderers;
    const render = DocCompliance.render;

    DocCompliance.columns = {
        DocRetentionPolicy: [
            { key: 'policyId', label: 'ID', sortKey: 'policyId', filterKey: 'policyId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'retentionDays', label: 'Retention (Days)', sortKey: 'retentionDays' },
            { key: 'actionOnExpiry', label: 'Action', sortKey: 'actionOnExpiry', render: (item) => render.retentionAction(item.actionOnExpiry) },
            { key: 'categoryId', label: 'Category', sortKey: 'categoryId' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        DocLegalHold: [
            { key: 'holdId', label: 'ID', sortKey: 'holdId', filterKey: 'holdId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.legalHoldStatus(item.status) },
            { key: 'matterId', label: 'Matter ID', sortKey: 'matterId' },
            { key: 'custodianId', label: 'Custodian', sortKey: 'custodianId' },
            { key: 'effectiveDate', label: 'Effective Date', sortKey: 'effectiveDate', render: (item) => renderDate(item.effectiveDate) },
            { key: 'releaseDate', label: 'Release Date', sortKey: 'releaseDate', render: (item) => renderDate(item.releaseDate) }
        ],

        DocAccessLog: [
            { key: 'logId', label: 'ID', sortKey: 'logId', filterKey: 'logId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'action', label: 'Action', sortKey: 'action', render: (item) => render.accessAction(item.action) },
            { key: 'accessDate', label: 'Accessed', sortKey: 'accessDate', render: (item) => renderDate(item.accessDate) },
            { key: 'ipAddress', label: 'IP Address', sortKey: 'ipAddress' },
            { key: 'userAgent', label: 'User Agent', sortKey: 'userAgent' }
        ],

        DocArchiveJob: [
            { key: 'jobId', label: 'ID', sortKey: 'jobId', filterKey: 'jobId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.archiveStatus(item.status) },
            { key: 'retentionPolicyId', label: 'Policy', sortKey: 'retentionPolicyId' },
            { key: 'initiatedDate', label: 'Initiated', sortKey: 'initiatedDate', render: (item) => renderDate(item.initiatedDate) },
            { key: 'completedDate', label: 'Completed', sortKey: 'completedDate', render: (item) => renderDate(item.completedDate) },
            { key: 'documentCount', label: 'Documents', sortKey: 'documentCount' },
            { key: 'initiatedBy', label: 'Initiated By', sortKey: 'initiatedBy' },
            { key: 'errorMessage', label: 'Error', sortKey: 'errorMessage' }
        ],

        DocAuditTrail: [
            { key: 'trailId', label: 'ID', sortKey: 'trailId', filterKey: 'trailId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'action', label: 'Action', sortKey: 'action' },
            { key: 'timestamp', label: 'Timestamp', sortKey: 'timestamp', render: (item) => renderDate(item.timestamp) },
            { key: 'oldValues', label: 'Old Values', sortKey: 'oldValues' },
            { key: 'newValues', label: 'New Values', sortKey: 'newValues' },
            { key: 'changeSummary', label: 'Summary', sortKey: 'changeSummary' }
        ]
    };

})();
