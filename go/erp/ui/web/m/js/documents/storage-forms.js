/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Documents Storage Module - Form Definitions
 * Desktop Equivalent: documents/storage/storage-forms.js
 */
(function() {
    'use strict';

    window.MobileDocStorage = window.MobileDocStorage || {};
    const f = window.Layer8FormFactory;
    const enums = MobileDocStorage.enums;

    MobileDocStorage.forms = {
        DocDocument: f.form('Document', [
            f.section('Document Details', [
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.select('documentType', 'Type', enums.DOCUMENT_TYPE),
                ...f.select('status', 'Status', enums.DOCUMENT_STATUS),
                ...f.select('accessLevel', 'Access Level', enums.ACCESS_LEVEL)
            ])
        ]),

        DocFolder: f.form('Folder', [
            f.section('Folder Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('accessLevel', 'Access Level', enums.ACCESS_LEVEL),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        DocCategory: f.form('Category', [
            f.section('Category Details', [
                ...f.text('name', 'Name', true),
                ...f.text('code', 'Code'),
                ...f.textarea('description', 'Description'),
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
                ...f.checkbox('isCurrent', 'Current Version')
            ])
        ])
    };

    MobileDocStorage.primaryKeys = {
        DocDocument: 'documentId',
        DocFolder: 'folderId',
        DocCategory: 'categoryId',
        DocTag: 'tagId',
        DocDocumentVersion: 'versionId'
    };

})();
