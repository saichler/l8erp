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
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.text('entityType', 'Entity Type', true),
                ...f.text('entityId', 'Entity ID', true),
                ...f.text('module', 'Module'),
                ...f.text('relationshipType', 'Relationship Type'),
                ...f.textarea('description', 'Description'),
                ...f.reference('attachedBy', 'Attached By', 'Employee')
            ])
        ]),

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
            ])
        ]),

        DocTemplateField: f.form('Template Field', [
            f.section('Field Details', [
                ...f.reference('templateId', 'Template', 'DocTemplate', true),
                ...f.text('name', 'Name', true),
                ...f.text('label', 'Label'),
                ...f.select('fieldType', 'Field Type', enums.FIELD_TYPE),
                ...f.text('defaultValue', 'Default Value'),
                ...f.text('placeholder', 'Placeholder'),
                ...f.number('sortOrder', 'Sort Order'),
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
        DocAttachment: 'attachmentId',
        DocTemplate: 'templateId',
        DocTemplateField: 'fieldId',
        DocEmailCapture: 'captureId',
        DocScanJob: 'scanJobId'
    };

})();
