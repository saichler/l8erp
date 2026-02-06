/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Uses Layer8FormFactory for reduced boilerplate
(function() {
    'use strict';

    window.MobileDocIntegration = window.MobileDocIntegration || {};
    const f = window.Layer8FormFactory;
    const enums = MobileDocIntegration.enums;

    MobileDocIntegration.forms = {
        DocAttachment: f.form('Attachment', [
            f.section('Attachment Details', [
                ...f.text('fileName', 'File Name', true),
                ...f.text('entityType', 'Entity Type', true),
                ...f.text('entityId', 'Entity ID', true),
                ...f.textarea('description', 'Description')
            ])
        ]),

        DocTemplate: f.form('Template', [
            f.section('Template Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('templateType', 'Type', enums.TEMPLATE_TYPE),
                ...f.text('version', 'Version'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        DocTemplateField: f.form('Template Field', [
            f.section('Field Details', [
                ...f.reference('templateId', 'Template', 'DocTemplate', true),
                ...f.text('name', 'Name', true),
                ...f.select('fieldType', 'Type', enums.FIELD_TYPE),
                ...f.text('defaultValue', 'Default Value'),
                ...f.checkbox('isRequired', 'Required')
            ])
        ]),

        DocEmailCapture: f.form('Email Capture', [
            f.section('Email Details', [
                ...f.text('subject', 'Subject', true),
                ...f.text('fromAddress', 'From Address', true),
                ...f.select('status', 'Status', enums.EMAIL_CAPTURE_STATUS)
            ])
        ]),

        DocScanJob: f.form('Scan Job', [
            f.section('Scan Details', [
                ...f.text('sourceName', 'Source Name', true),
                ...f.select('status', 'Status', enums.SCAN_STATUS),
                ...f.number('pageCount', 'Page Count')
            ])
        ])
    };

    MobileDocIntegration.primaryKeys = {
        DocAttachment: 'attachmentId',
        DocTemplate: 'templateId',
        DocTemplateField: 'fieldId',
        DocEmailCapture: 'captureId',
        DocScanJob: 'scanJobId'
    };

})();
