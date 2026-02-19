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
                ...f.checkbox('isActive', 'Active'),
                ...f.text('category', 'Category'),
                ...f.select('outputFormat', 'Output Format', enums.FILE_FORMAT),
                ...f.text('content', 'Content'),
                ...f.text('storagePath', 'Storage Path'),
                ...f.text('ownerId', 'Owner'),
                ...f.checkbox('isSystem', 'System'),
                ...f.date('lastUsedDate', 'Last Used Date'),
                ...f.number('usageCount', 'Usage Count'),
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
                ...f.select('status', 'Status', enums.EMAIL_CAPTURE_STATUS),
                ...f.text('documentId', 'Document'),
                ...f.text('toAddresses', 'To Addresses'),
                ...f.text('ccAddresses', 'Cc Addresses'),
                ...f.text('bodyPreview', 'Body Preview'),
                ...f.date('receivedDate', 'Received Date'),
                ...f.date('processedDate', 'Processed Date'),
                ...f.text('folderId', 'Folder'),
                ...f.text('processedBy', 'Processed By'),
                ...f.number('attachmentCount', 'Attachment Count'),
                ...f.text('errorMessage', 'Error Message'),
            ])
        ]),

        DocScanJob: f.form('Scan Job', [
            f.section('Scan Details', [
                ...f.text('name', 'Name', true),
                ...f.select('status', 'Status', enums.SCAN_STATUS),
                ...f.number('pageCount', 'Page Count'),
                ...f.text('scannerId', 'Scanner'),
                ...f.text('folderId', 'Folder'),
                ...f.text('categoryId', 'Category'),
                ...f.number('documentCount', 'Document Count'),
                ...f.text('initiatedBy', 'Initiated By'),
                ...f.date('initiatedDate', 'Initiated Date'),
                ...f.date('completedDate', 'Completed Date'),
                ...f.checkbox('ocrEnabled', 'Ocr Enabled'),
                ...f.text('ocrLanguage', 'Ocr Language'),
                ...f.text('errorMessage', 'Error Message'),
                ...f.text('documentIds', 'Document Ids'),
            ])
        ])
    };

    MobileDocIntegration.primaryKeys = {
        DocTemplate: 'templateId',
        DocEmailCapture: 'captureId',
        DocScanJob: 'scanJobId'
    };

})();
