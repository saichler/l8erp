/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Storage Module - Form Definitions

(function() {
    'use strict';

    window.DocStorage = window.DocStorage || {};

    const enums = DocStorage.enums;

    DocStorage.forms = {
        DocDocument: {
            title: 'Document',
            sections: [
                {
                    title: 'Document Details',
                    fields: [
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'documentType', label: 'Document Type', type: 'select', options: enums.DOCUMENT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.DOCUMENT_STATUS },
                        { key: 'fileFormat', label: 'File Format', type: 'select', options: enums.FILE_FORMAT }
                    ]
                },
                {
                    title: 'Location & Access',
                    fields: [
                        { key: 'folderId', label: 'Folder', type: 'reference', lookupModel: 'DocFolder' },
                        { key: 'categoryId', label: 'Category', type: 'reference', lookupModel: 'DocCategory' },
                        { key: 'accessLevel', label: 'Access Level', type: 'select', options: enums.ACCESS_LEVEL },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Compliance',
                    fields: [
                        { key: 'retentionPolicyId', label: 'Retention Policy', type: 'reference', lookupModel: 'DocRetentionPolicy' },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' }
                    ]
                }
            ]
        },

        DocFolder: {
            title: 'Folder',
            sections: [
                {
                    title: 'Folder Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'parentFolderId', label: 'Parent Folder', type: 'reference', lookupModel: 'DocFolder' },
                        { key: 'accessLevel', label: 'Access Level', type: 'select', options: enums.ACCESS_LEVEL },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        DocCategory: {
            title: 'Category',
            sections: [
                {
                    title: 'Category Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'code', label: 'Code', type: 'text' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'parentCategoryId', label: 'Parent Category', type: 'reference', lookupModel: 'DocCategory' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        DocTag: {
            title: 'Tag',
            sections: [
                {
                    title: 'Tag Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'color', label: 'Color', type: 'text' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        DocDocumentVersion: {
            title: 'Document Version',
            sections: [
                {
                    title: 'Version Details',
                    fields: [
                        { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                        { key: 'versionNumber', label: 'Version Number', type: 'number', required: true },
                        { key: 'changeNotes', label: 'Change Notes', type: 'textarea' },
                        { key: 'createdBy', label: 'Created By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isCurrent', label: 'Current Version', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

    DocStorage.primaryKeys = {
        DocDocument: 'documentId',
        DocFolder: 'folderId',
        DocCategory: 'categoryId',
        DocTag: 'tagId',
        DocDocumentVersion: 'versionId'
    };

})();
