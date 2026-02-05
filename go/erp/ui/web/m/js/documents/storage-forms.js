/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Documents Storage Module - Form Definitions
 * Desktop Equivalent: documents/storage/storage-forms.js
 */
(function() {
    'use strict';

    window.MobileDocStorage = window.MobileDocStorage || {};
    const enums = MobileDocStorage.enums;

    MobileDocStorage.forms = {
        DocDocument: {
            title: 'Document',
            sections: [
                { title: 'Document Details', fields: [
                    { key: 'title', label: 'Title', type: 'text', required: true },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'documentType', label: 'Type', type: 'select', options: enums.DOCUMENT_TYPE },
                    { key: 'status', label: 'Status', type: 'select', options: enums.DOCUMENT_STATUS },
                    { key: 'accessLevel', label: 'Access Level', type: 'select', options: enums.ACCESS_LEVEL }
                ]}
            ]
        },
        DocFolder: {
            title: 'Folder',
            sections: [
                { title: 'Folder Details', fields: [
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'accessLevel', label: 'Access Level', type: 'select', options: enums.ACCESS_LEVEL },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ]}
            ]
        },
        DocCategory: {
            title: 'Category',
            sections: [
                { title: 'Category Details', fields: [
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'code', label: 'Code', type: 'text' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ]}
            ]
        },
        DocTag: {
            title: 'Tag',
            sections: [
                { title: 'Tag Details', fields: [
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'color', label: 'Color', type: 'text' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ]}
            ]
        },
        DocDocumentVersion: {
            title: 'Document Version',
            sections: [
                { title: 'Version Details', fields: [
                    { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                    { key: 'versionNumber', label: 'Version Number', type: 'number', required: true },
                    { key: 'changeNotes', label: 'Change Notes', type: 'textarea' },
                    { key: 'isCurrent', label: 'Current Version', type: 'checkbox' }
                ]}
            ]
        }
    };

    MobileDocStorage.primaryKeys = {
        DocDocument: 'documentId',
        DocFolder: 'folderId',
        DocCategory: 'categoryId',
        DocTag: 'tagId',
        DocDocumentVersion: 'versionId'
    };

})();
