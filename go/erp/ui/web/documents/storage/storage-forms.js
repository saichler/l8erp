/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Storage Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.DocStorage = window.DocStorage || {};

    const f = window.Layer8FormFactory;
    const enums = DocStorage.enums;

    DocStorage.forms = {
        DocDocument: f.form('Document', [
            f.section('Document Details', [
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.select('documentType', 'Document Type', enums.DOCUMENT_TYPE),
                ...f.select('status', 'Status', enums.DOCUMENT_STATUS),
                ...f.select('fileFormat', 'File Format', enums.FILE_FORMAT)
            ]),
            f.section('Location & Access', [
                ...f.reference('folderId', 'Folder', 'DocFolder'),
                ...f.reference('categoryId', 'Category', 'DocCategory'),
                ...f.select('accessLevel', 'Access Level', enums.ACCESS_LEVEL),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('Compliance', [
                ...f.reference('retentionPolicyId', 'Retention Policy', 'DocRetentionPolicy'),
                ...f.date('expirationDate', 'Expiration Date')
            ])
        ]),

        DocFolder: f.form('Folder', [
            f.section('Folder Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('parentFolderId', 'Parent Folder', 'DocFolder'),
                ...f.select('accessLevel', 'Access Level', enums.ACCESS_LEVEL),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        DocCategory: f.form('Category', [
            f.section('Category Details', [
                ...f.text('name', 'Name', true),
                ...f.text('code', 'Code'),
                ...f.textarea('description', 'Description'),
                ...f.reference('parentCategoryId', 'Parent Category', 'DocCategory'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        DocTag: f.form('Tag', [
            f.section('Tag Details', [
                ...f.text('name', 'Name', true),
                ...f.text('color', 'Color'),
                ...f.textarea('description', 'Description'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        DocDocumentVersion: f.form('Document Version', [
            f.section('Version Details', [
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.number('versionNumber', 'Version Number', true),
                ...f.textarea('changeNotes', 'Change Notes'),
                ...f.reference('createdBy', 'Created By', 'Employee'),
                ...f.checkbox('isCurrent', 'Current Version')
            ])
        ])
    };

    DocStorage.primaryKeys = {
        DocDocument: 'documentId',
        DocFolder: 'folderId',
        DocCategory: 'categoryId',
        DocTag: 'tagId',
        DocDocumentVersion: 'versionId'
    };

})();
