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
        DocTemplate: f.form('Template', [
            f.section('Template Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('templateType', 'Template Type', enums.TEMPLATE_TYPE),
                ...f.text('category', 'Category'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Template Content', [
                ...f.textarea('content', 'Content')
            ]),
            f.section('Template Fields', [
                ...f.inlineTable('fields', 'Template Fields', [
                    { key: 'fieldId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'label', label: 'Label', type: 'text' },
                    { key: 'fieldType', label: 'Type', type: 'select', options: enums.FIELD_TYPE },
                    { key: 'defaultValue', label: 'Default', type: 'text' },
                    { key: 'sortOrder', label: 'Order', type: 'number' },
                    { key: 'isRequired', label: 'Required', type: 'checkbox' }
                ])
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
                ...f.text('name', 'Name', true),
                ...f.select('status', 'Status', enums.SCAN_STATUS),
                ...f.number('pageCount', 'Page Count'),
                ...f.reference('initiatedBy', 'Initiated By', 'Employee'),
                ...f.reference('folderId', 'Destination Folder', 'DocFolder'),
                ...f.reference('categoryId', 'Category', 'DocCategory'),
                ...f.checkbox('ocrEnabled', 'OCR Enabled')
            ])
        ])
    };

    DocIntegration.primaryKeys = {
        DocTemplate: 'templateId',
        DocEmailCapture: 'captureId',
        DocScanJob: 'scanJobId'
    };

})();
