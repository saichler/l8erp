/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Storage Module - Column Configurations

(function() {
    'use strict';

    window.DocStorage = window.DocStorage || {};

    const { renderDate, renderFileSize } = Layer8DRenderers;
    const render = DocStorage.render;

    DocStorage.columns = {
        DocDocument: [
            { key: 'documentId', label: 'ID', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'documentType', label: 'Type', sortKey: 'documentType', render: (item) => render.documentType(item.documentType) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.documentStatus(item.status) },
            { key: 'fileFormat', label: 'Format', sortKey: 'fileFormat', render: (item) => render.fileFormat(item.fileFormat) },
            { key: 'fileSize', label: 'Size', sortKey: 'fileSize', render: (item) => renderFileSize(item.fileSize) },
            { key: 'accessLevel', label: 'Access', sortKey: 'accessLevel', render: (item) => render.accessLevel(item.accessLevel) },
            { key: 'folderId', label: 'Folder', sortKey: 'folderId' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'currentVersion', label: 'Version', sortKey: 'currentVersion' }
        ],

        DocFolder: [
            { key: 'folderId', label: 'ID', sortKey: 'folderId', filterKey: 'folderId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'parentFolderId', label: 'Parent', sortKey: 'parentFolderId' },
            { key: 'path', label: 'Path', sortKey: 'path' },
            { key: 'accessLevel', label: 'Access', sortKey: 'accessLevel', render: (item) => render.accessLevel(item.accessLevel) },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'isSystem', label: 'System', sortKey: 'isSystem', render: (item) => item.isSystem ? 'Yes' : 'No' }
        ],

        DocCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'parentCategoryId', label: 'Parent', sortKey: 'parentCategoryId' },
            { key: 'code', label: 'Code', sortKey: 'code' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        DocTag: [
            { key: 'tagId', label: 'ID', sortKey: 'tagId', filterKey: 'tagId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'color', label: 'Color', sortKey: 'color' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        DocDocumentVersion: [
            { key: 'versionId', label: 'ID', sortKey: 'versionId', filterKey: 'versionId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'versionNumber', label: 'Version', sortKey: 'versionNumber' },
            { key: 'fileSize', label: 'Size', sortKey: 'fileSize', render: (item) => renderFileSize(item.fileSize) },
            { key: 'checksum', label: 'Checksum', sortKey: 'checksum' },
            { key: 'createdBy', label: 'Created By', sortKey: 'createdBy' },
            { key: 'changeNotes', label: 'Notes', sortKey: 'changeNotes' },
            { key: 'isMajorVersion', label: 'Major', sortKey: 'isMajorVersion', render: (item) => item.isMajorVersion ? 'Yes' : 'No' }
        ]
    };

})();
