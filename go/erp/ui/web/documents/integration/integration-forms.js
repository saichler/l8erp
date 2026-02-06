/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Integration Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.DocIntegration = window.DocIntegration || {};

    const f = window.Layer8FormFactory;
    const enums = DocIntegration.enums;

    DocIntegration.forms = {
        DocAttachment: f.form('Attachment', [
            f.section('Attachment Details', [
                ...f.text('fileName', 'File Name', true),
                ...f.text('entityType', 'Entity Type', true),
                ...f.text('entityId', 'Entity ID', true),
                ...f.text('mimeType', 'MIME Type'),
                ...f.textarea('description', 'Description'),
                ...f.reference('uploadedBy', 'Uploaded By', 'Employee')
            ])
        ]),

        DocTemplate: f.form('Template', [
            f.section('Template Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('templateType', 'Template Type', enums.TEMPLATE_TYPE),
                ...f.text('version', 'Version'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Template Content', [
                ...f.textarea('content', 'Content')
            ])
        ]),

        DocTemplateField: f.form('Template Field', [
            f.section('Field Details', [
                ...f.reference('templateId', 'Template', 'DocTemplate', true),
                ...f.text('name', 'Name', true),
                ...f.select('fieldType', 'Field Type', enums.FIELD_TYPE),
                ...f.text('defaultValue', 'Default Value'),
                ...f.text('placeholder', 'Placeholder'),
                ...f.number('displayOrder', 'Display Order'),
                ...f.checkbox('isRequired', 'Required')
            ])
        ]),

        DocEmailCapture: f.form('Email Capture', [
            f.section('Email Details', [
                ...f.text('subject', 'Subject', true),
                ...f.text('fromAddress', 'From Address', true),
                ...f.select('status', 'Status', enums.EMAIL_CAPTURE_STATUS),
                ...f.reference('folderId', 'Destination Folder', 'DocFolder'),
                ...f.reference('documentId', 'Created Document', 'DocDocument')
            ])
        ]),

        DocScanJob: f.form('Scan Job', [
            f.section('Scan Details', [
                ...f.text('sourceName', 'Source Name', true),
                ...f.select('status', 'Status', enums.SCAN_STATUS),
                ...f.number('pageCount', 'Page Count'),
                ...f.reference('scannedBy', 'Scanned By', 'Employee'),
                ...f.reference('folderId', 'Destination Folder', 'DocFolder'),
                ...f.reference('documentId', 'Created Document', 'DocDocument')
            ])
        ])
    };

    DocIntegration.primaryKeys = {
        DocAttachment: 'attachmentId',
        DocTemplate: 'templateId',
        DocTemplateField: 'fieldId',
        DocEmailCapture: 'captureId',
        DocScanJob: 'scanJobId'
    };

})();
