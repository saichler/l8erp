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
        DocTemplate: f.form('Template', [
            f.section('Template Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('templateType', 'Type', enums.TEMPLATE_TYPE),
                ...f.text('version', 'Version'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Template Fields', [
                ...f.inlineTable('fields', 'Template Fields', [
                    { key: 'fieldId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'label', label: 'Label', type: 'text' },
                    { key: 'fieldType', label: 'Type', type: 'select', options: enums.FIELD_TYPE },
                    { key: 'isRequired', label: 'Required', type: 'checkbox' },
                    { key: 'defaultValue', label: 'Default', type: 'text' },
                    { key: 'sortOrder', label: 'Order', type: 'number' }
                ])
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
                ...f.text('name', 'Name', true),
                ...f.select('status', 'Status', enums.SCAN_STATUS),
                ...f.number('pageCount', 'Page Count')
            ])
        ])
    };

    MobileDocIntegration.primaryKeys = {
        DocTemplate: 'templateId',
        DocEmailCapture: 'captureId',
        DocScanJob: 'scanJobId'
    };

})();
