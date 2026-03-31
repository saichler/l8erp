/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Integration Module - Column Configurations

(function() {
    'use strict';

    window.DocIntegration = window.DocIntegration || {};

    const col = window.Layer8ColumnFactory;
    const render = DocIntegration.render;

    DocIntegration.columns = {
        DocTemplate: [
            ...col.id('templateId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.enum('templateType', 'Type', null, render.templateType),
            ...col.col('version', 'Version'),
            ...col.col('ownerId', 'Owner'),
            ...col.boolean('isActive', 'Active'),
        ],

        DocEmailCapture: [
            ...col.id('captureId'),
            ...col.col('subject', 'Subject'),
            ...col.col('fromAddress', 'From'),
            ...col.enum('status', 'Status', null, render.emailCaptureStatus),
            ...col.date('receivedDate', 'Received'),
            ...col.col('documentId', 'Document'),
            ...col.col('folderId', 'Folder'),
        ],

        DocScanJob: [
            ...col.id('scanJobId'),
            ...col.col('name', 'Name'),
            ...col.enum('status', 'Status', null, render.scanStatus),
            ...col.col('pageCount', 'Pages'),
            ...col.col('documentCount', 'Documents'),
            ...col.col('initiatedBy', 'Initiated By'),
            ...col.date('initiatedDate', 'Initiated'),
            ...col.boolean('ocrEnabled', 'OCR'),
        ]
    };

})();
