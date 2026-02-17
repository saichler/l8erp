/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Integration Module - Column Configurations

(function() {
    'use strict';

    window.DocIntegration = window.DocIntegration || {};

    const { renderDate } = Layer8DRenderers;
    const render = DocIntegration.render;

    DocIntegration.columns = {
        DocTemplate: [
            { key: 'templateId', label: 'ID', sortKey: 'templateId', filterKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'templateType', label: 'Type', sortKey: 'templateType', render: (item) => render.templateType(item.templateType) },
            { key: 'version', label: 'Version', sortKey: 'version' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        DocEmailCapture: [
            { key: 'captureId', label: 'ID', sortKey: 'captureId', filterKey: 'captureId' },
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
            { key: 'fromAddress', label: 'From', sortKey: 'fromAddress' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.emailCaptureStatus(item.status) },
            { key: 'receivedDate', label: 'Received', sortKey: 'receivedDate', render: (item) => renderDate(item.receivedDate) },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'folderId', label: 'Folder', sortKey: 'folderId' }
        ],

        DocScanJob: [
            { key: 'scanJobId', label: 'ID', sortKey: 'scanJobId', filterKey: 'scanJobId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.scanStatus(item.status) },
            { key: 'pageCount', label: 'Pages', sortKey: 'pageCount' },
            { key: 'documentCount', label: 'Documents', sortKey: 'documentCount' },
            { key: 'initiatedBy', label: 'Initiated By', sortKey: 'initiatedBy' },
            { key: 'initiatedDate', label: 'Initiated', sortKey: 'initiatedDate', render: (item) => renderDate(item.initiatedDate) },
            { key: 'ocrEnabled', label: 'OCR', sortKey: 'ocrEnabled', render: (item) => item.ocrEnabled ? 'Yes' : 'No' }
        ]
    };

})();
