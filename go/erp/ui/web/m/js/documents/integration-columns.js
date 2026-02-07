/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MobileDocIntegration = window.MobileDocIntegration || {};
    const { renderDate } = Layer8MRenderers;
    const render = MobileDocIntegration.render;

    MobileDocIntegration.columns = {
        DocAttachment: [
            { key: 'attachmentId', label: 'ID', sortKey: 'attachmentId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'entityType', label: 'Entity Type', sortKey: 'entityType' },
            { key: 'module', label: 'Module', sortKey: 'module' },
            { key: 'attachedDate', label: 'Attached', sortKey: 'attachedDate', render: (item) => renderDate(item.attachedDate) }
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
            { key: 'receivedDate', label: 'Received', sortKey: 'receivedDate', render: (item) => renderDate(item.receivedDate) }
        ],
        DocScanJob: [
            { key: 'scanJobId', label: 'ID', sortKey: 'scanJobId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.scanStatus(item.status) },
            { key: 'pageCount', label: 'Pages', sortKey: 'pageCount' },
            { key: 'initiatedDate', label: 'Initiated', sortKey: 'initiatedDate', render: (item) => renderDate(item.initiatedDate) }
        ]
    };

})();
