/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MobileDocIntegration = window.MobileDocIntegration || {};
    const enums = MobileDocIntegration.enums;

    MobileDocIntegration.forms = {
        DocAttachment: {
            title: 'Attachment',
            sections: [{ title: 'Attachment Details', fields: [
                { key: 'fileName', label: 'File Name', type: 'text', required: true },
                { key: 'entityType', label: 'Entity Type', type: 'text', required: true },
                { key: 'entityId', label: 'Entity ID', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' }
            ]}]
        },
        DocTemplate: {
            title: 'Template',
            sections: [{ title: 'Template Details', fields: [
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'templateType', label: 'Type', type: 'select', options: enums.TEMPLATE_TYPE },
                { key: 'version', label: 'Version', type: 'text' },
                { key: 'isActive', label: 'Active', type: 'checkbox' }
            ]}]
        },
        DocTemplateField: {
            title: 'Template Field',
            sections: [{ title: 'Field Details', fields: [
                { key: 'templateId', label: 'Template', type: 'reference', lookupModel: 'DocTemplate', required: true },
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'fieldType', label: 'Type', type: 'select', options: enums.FIELD_TYPE },
                { key: 'defaultValue', label: 'Default Value', type: 'text' },
                { key: 'isRequired', label: 'Required', type: 'checkbox' }
            ]}]
        },
        DocEmailCapture: {
            title: 'Email Capture',
            sections: [{ title: 'Email Details', fields: [
                { key: 'subject', label: 'Subject', type: 'text', required: true },
                { key: 'fromAddress', label: 'From Address', type: 'text', required: true },
                { key: 'status', label: 'Status', type: 'select', options: enums.EMAIL_CAPTURE_STATUS }
            ]}]
        },
        DocScanJob: {
            title: 'Scan Job',
            sections: [{ title: 'Scan Details', fields: [
                { key: 'sourceName', label: 'Source Name', type: 'text', required: true },
                { key: 'status', label: 'Status', type: 'select', options: enums.SCAN_STATUS },
                { key: 'pageCount', label: 'Page Count', type: 'number' }
            ]}]
        }
    };

    MobileDocIntegration.primaryKeys = {
        DocAttachment: 'attachmentId',
        DocTemplate: 'templateId',
        DocTemplateField: 'fieldId',
        DocEmailCapture: 'captureId',
        DocScanJob: 'scanJobId'
    };

})();
