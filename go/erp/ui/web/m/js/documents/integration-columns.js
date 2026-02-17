/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    window.MobileDocIntegration = window.MobileDocIntegration || {};
    const render = MobileDocIntegration.render;

    MobileDocIntegration.columns = {
        DocTemplate: [
            ...col.id('templateId'),
            ...col.col('name', 'Name'),
            ...col.enum('templateType', 'Type', null, render.templateType),
            ...col.col('version', 'Version'),
            ...col.boolean('isActive', 'Active')
        ],
        DocEmailCapture: [
            ...col.id('captureId'),
            ...col.col('subject', 'Subject'),
            ...col.col('fromAddress', 'From'),
            ...col.enum('status', 'Status', null, render.emailCaptureStatus),
            ...col.date('receivedDate', 'Received')
        ],
        DocScanJob: [
            ...col.id('scanJobId'),
            ...col.col('name', 'Name'),
            ...col.enum('status', 'Status', null, render.scanStatus),
            ...col.col('pageCount', 'Pages'),
            ...col.date('initiatedDate', 'Initiated')
        ]
    };

})();
