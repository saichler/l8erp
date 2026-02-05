/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Integration Module - Form Definitions

(function() {
    'use strict';

    window.DocIntegration = window.DocIntegration || {};

    const enums = DocIntegration.enums;

    DocIntegration.forms = {
        DocAttachment: {
            title: 'Attachment',
            sections: [
                {
                    title: 'Attachment Details',
                    fields: [
                        { key: 'fileName', label: 'File Name', type: 'text', required: true },
                        { key: 'entityType', label: 'Entity Type', type: 'text', required: true },
                        { key: 'entityId', label: 'Entity ID', type: 'text', required: true },
                        { key: 'mimeType', label: 'MIME Type', type: 'text' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'uploadedBy', label: 'Uploaded By', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        DocTemplate: {
            title: 'Template',
            sections: [
                {
                    title: 'Template Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'templateType', label: 'Template Type', type: 'select', options: enums.TEMPLATE_TYPE },
                        { key: 'version', label: 'Version', type: 'text' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Template Content',
                    fields: [
                        { key: 'content', label: 'Content', type: 'textarea' }
                    ]
                }
            ]
        },

        DocTemplateField: {
            title: 'Template Field',
            sections: [
                {
                    title: 'Field Details',
                    fields: [
                        { key: 'templateId', label: 'Template', type: 'reference', lookupModel: 'DocTemplate', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'fieldType', label: 'Field Type', type: 'select', options: enums.FIELD_TYPE },
                        { key: 'defaultValue', label: 'Default Value', type: 'text' },
                        { key: 'placeholder', label: 'Placeholder', type: 'text' },
                        { key: 'displayOrder', label: 'Display Order', type: 'number' },
                        { key: 'isRequired', label: 'Required', type: 'checkbox' }
                    ]
                }
            ]
        },

        DocEmailCapture: {
            title: 'Email Capture',
            sections: [
                {
                    title: 'Email Details',
                    fields: [
                        { key: 'subject', label: 'Subject', type: 'text', required: true },
                        { key: 'fromAddress', label: 'From Address', type: 'text', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.EMAIL_CAPTURE_STATUS },
                        { key: 'folderId', label: 'Destination Folder', type: 'reference', lookupModel: 'DocFolder' },
                        { key: 'documentId', label: 'Created Document', type: 'reference', lookupModel: 'DocDocument' }
                    ]
                }
            ]
        },

        DocScanJob: {
            title: 'Scan Job',
            sections: [
                {
                    title: 'Scan Details',
                    fields: [
                        { key: 'sourceName', label: 'Source Name', type: 'text', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.SCAN_STATUS },
                        { key: 'pageCount', label: 'Page Count', type: 'number' },
                        { key: 'scannedBy', label: 'Scanned By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'folderId', label: 'Destination Folder', type: 'reference', lookupModel: 'DocFolder' },
                        { key: 'documentId', label: 'Created Document', type: 'reference', lookupModel: 'DocDocument' }
                    ]
                }
            ]
        }
    };

    DocIntegration.primaryKeys = {
        DocAttachment: 'attachmentId',
        DocTemplate: 'templateId',
        DocTemplateField: 'fieldId',
        DocEmailCapture: 'captureId',
        DocScanJob: 'scanJobId'
    };

})();
