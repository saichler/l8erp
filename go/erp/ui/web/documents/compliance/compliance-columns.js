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
            { key: 'action', label: 'Action', sortKey: 'action', render: (item) => render.retentionAction(item.action) },
            { key: 'categoryId', label: 'Category', sortKey: 'categoryId' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        DocLegalHold: [
            { key: 'holdId', label: 'ID', sortKey: 'holdId', filterKey: 'holdId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.legalHoldStatus(item.status) },
            { key: 'matterReference', label: 'Matter Ref', sortKey: 'matterReference' },
            { key: 'custodianId', label: 'Custodian', sortKey: 'custodianId' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => renderDate(item.endDate) }
        ],

        DocAccessLog: [
            { key: 'logId', label: 'ID', sortKey: 'logId', filterKey: 'logId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'action', label: 'Action', sortKey: 'action', render: (item) => render.accessAction(item.action) },
            { key: 'accessedAt', label: 'Accessed', sortKey: 'accessedAt', render: (item) => renderDate(item.accessedAt) },
            { key: 'ipAddress', label: 'IP Address', sortKey: 'ipAddress' },
            { key: 'userAgent', label: 'User Agent', sortKey: 'userAgent' }
        ],

        DocArchiveJob: [
            { key: 'jobId', label: 'ID', sortKey: 'jobId', filterKey: 'jobId' },
            { key: 'policyId', label: 'Policy', sortKey: 'policyId', filterKey: 'policyId' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.archiveStatus(item.status) },
            { key: 'startedAt', label: 'Started', sortKey: 'startedAt', render: (item) => renderDate(item.startedAt) },
            { key: 'completedAt', label: 'Completed', sortKey: 'completedAt', render: (item) => renderDate(item.completedAt) },
            { key: 'documentCount', label: 'Documents', sortKey: 'documentCount' },
            { key: 'startedBy', label: 'Started By', sortKey: 'startedBy' },
            { key: 'errorMessage', label: 'Error', sortKey: 'errorMessage' }
        ],

        DocAuditTrail: [
            { key: 'trailId', label: 'ID', sortKey: 'trailId', filterKey: 'trailId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'action', label: 'Action', sortKey: 'action' },
            { key: 'timestamp', label: 'Timestamp', sortKey: 'timestamp', render: (item) => renderDate(item.timestamp) },
            { key: 'oldValue', label: 'Old Value', sortKey: 'oldValue' },
            { key: 'newValue', label: 'New Value', sortKey: 'newValue' },
            { key: 'fieldName', label: 'Field', sortKey: 'fieldName' }
        ]
    };

})();
