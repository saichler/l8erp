/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MobileDocIntegration = window.MobileDocIntegration || {};
    const { renderDate, renderFileSize } = Layer8MRenderers;
    const render = MobileDocIntegration.render;

    MobileDocIntegration.columns = {
        DocAttachment: [
            { key: 'attachmentId', label: 'ID', sortKey: 'attachmentId' },
            { key: 'fileName', label: 'File Name', sortKey: 'fileName' },
            { key: 'entityType', label: 'Entity Type', sortKey: 'entityType' },
            { key: 'fileSize', label: 'Size', sortKey: 'fileSize', render: (item) => renderFileSize(item.fileSize) },
            { key: 'uploadedAt', label: 'Uploaded', sortKey: 'uploadedAt', render: (item) => renderDate(item.uploadedAt) }
        ],
        DocTemplate: [
            { key: 'templateId', label: 'ID', sortKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'templateType', label: 'Type', sortKey: 'templateType', render: (item) => render.templateType(item.templateType) },
            { key: 'version', label: 'Version', sortKey: 'version' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],
        DocTemplateField: [
            { key: 'fieldId', label: 'ID', sortKey: 'fieldId' },
            { key: 'templateId', label: 'Template', sortKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'fieldType', label: 'Type', sortKey: 'fieldType', render: (item) => render.fieldType(item.fieldType) },
            { key: 'isRequired', label: 'Required', sortKey: 'isRequired', render: (item) => item.isRequired ? 'Yes' : 'No' }
        ],
        DocEmailCapture: [
            { key: 'captureId', label: 'ID', sortKey: 'captureId' },
            { key: 'subject', label: 'Subject', sortKey: 'subject' },
            { key: 'fromAddress', label: 'From', sortKey: 'fromAddress' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.emailCaptureStatus(item.status) },
            { key: 'receivedAt', label: 'Received', sortKey: 'receivedAt', render: (item) => renderDate(item.receivedAt) }
        ],
        DocScanJob: [
            { key: 'scanJobId', label: 'ID', sortKey: 'scanJobId' },
            { key: 'sourceName', label: 'Source', sortKey: 'sourceName' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.scanStatus(item.status) },
            { key: 'pageCount', label: 'Pages', sortKey: 'pageCount' },
            { key: 'scannedAt', label: 'Scanned', sortKey: 'scannedAt', render: (item) => renderDate(item.scannedAt) }
        ]
    };

})();
