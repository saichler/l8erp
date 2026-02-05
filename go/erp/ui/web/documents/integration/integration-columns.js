/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Integration Module - Column Configurations

(function() {
    'use strict';

    window.DocIntegration = window.DocIntegration || {};

    const { renderDate, renderFileSize } = Layer8DRenderers;
    const render = DocIntegration.render;

    DocIntegration.columns = {
        DocAttachment: [
            { key: 'attachmentId', label: 'ID', sortKey: 'attachmentId', filterKey: 'attachmentId' },
            { key: 'fileName', label: 'File Name', sortKey: 'fileName', filterKey: 'fileName' },
            { key: 'entityType', label: 'Entity Type', sortKey: 'entityType' },
            { key: 'entityId', label: 'Entity ID', sortKey: 'entityId' },
            { key: 'fileSize', label: 'Size', sortKey: 'fileSize', render: (item) => renderFileSize(item.fileSize) },
            { key: 'mimeType', label: 'MIME Type', sortKey: 'mimeType' },
            { key: 'uploadedBy', label: 'Uploaded By', sortKey: 'uploadedBy' },
            { key: 'uploadedAt', label: 'Uploaded', sortKey: 'uploadedAt', render: (item) => renderDate(item.uploadedAt) }
        ],

        DocTemplate: [
            { key: 'templateId', label: 'ID', sortKey: 'templateId', filterKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'templateType', label: 'Type', sortKey: 'templateType', render: (item) => render.templateType(item.templateType) },
            { key: 'version', label: 'Version', sortKey: 'version' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        DocTemplateField: [
            { key: 'fieldId', label: 'ID', sortKey: 'fieldId', filterKey: 'fieldId' },
            { key: 'templateId', label: 'Template', sortKey: 'templateId', filterKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'fieldType', label: 'Type', sortKey: 'fieldType', render: (item) => render.fieldType(item.fieldType) },
            { key: 'defaultValue', label: 'Default', sortKey: 'defaultValue' },
            { key: 'isRequired', label: 'Required', sortKey: 'isRequired', render: (item) => item.isRequired ? 'Yes' : 'No' },
            { key: 'displayOrder', label: 'Order', sortKey: 'displayOrder' }
        ],

        DocEmailCapture: [
            { key: 'captureId', label: 'ID', sortKey: 'captureId', filterKey: 'captureId' },
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
            { key: 'fromAddress', label: 'From', sortKey: 'fromAddress' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.emailCaptureStatus(item.status) },
            { key: 'receivedAt', label: 'Received', sortKey: 'receivedAt', render: (item) => renderDate(item.receivedAt) },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'folderId', label: 'Folder', sortKey: 'folderId' }
        ],

        DocScanJob: [
            { key: 'scanJobId', label: 'ID', sortKey: 'scanJobId', filterKey: 'scanJobId' },
            { key: 'sourceName', label: 'Source', sortKey: 'sourceName', filterKey: 'sourceName' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.scanStatus(item.status) },
            { key: 'pageCount', label: 'Pages', sortKey: 'pageCount' },
            { key: 'fileSize', label: 'Size', sortKey: 'fileSize', render: (item) => renderFileSize(item.fileSize) },
            { key: 'scannedBy', label: 'Scanned By', sortKey: 'scannedBy' },
            { key: 'scannedAt', label: 'Scanned', sortKey: 'scannedAt', render: (item) => renderDate(item.scannedAt) },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' }
        ]
    };

})();
