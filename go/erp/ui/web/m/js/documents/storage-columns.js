/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Documents Storage Module - Column Configurations
 * Desktop Equivalent: documents/storage/storage-columns.js
 */
(function() {
    'use strict';

    window.MobileDocStorage = window.MobileDocStorage || {};
    const { renderDate, renderFileSize } = Layer8MRenderers;
    const render = MobileDocStorage.render;

    MobileDocStorage.columns = {
        DocDocument: [
            { key: 'documentId', label: 'ID', sortKey: 'documentId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'documentType', label: 'Type', sortKey: 'documentType', render: (item) => render.documentType(item.documentType) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.documentStatus(item.status) },
            { key: 'fileFormat', label: 'Format', sortKey: 'fileFormat', render: (item) => render.fileFormat(item.fileFormat) },
            { key: 'accessLevel', label: 'Access', sortKey: 'accessLevel', render: (item) => render.accessLevel(item.accessLevel) }
        ],
        DocFolder: [
            { key: 'folderId', label: 'ID', sortKey: 'folderId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'path', label: 'Path', sortKey: 'path' },
            { key: 'accessLevel', label: 'Access', sortKey: 'accessLevel', render: (item) => render.accessLevel(item.accessLevel) },
            { key: 'isSystem', label: 'System', sortKey: 'isSystem', render: (item) => item.isSystem ? 'Yes' : 'No' }
        ],
        DocCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'code', label: 'Code', sortKey: 'code' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],
        DocTag: [
            { key: 'tagId', label: 'ID', sortKey: 'tagId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'color', label: 'Color', sortKey: 'color' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],
        DocDocumentVersion: [
            { key: 'versionId', label: 'ID', sortKey: 'versionId' },
            { key: 'documentId', label: 'Document', sortKey: 'documentId' },
            { key: 'versionNumber', label: 'Version', sortKey: 'versionNumber' },
            { key: 'fileSize', label: 'Size', sortKey: 'fileSize', render: (item) => renderFileSize(item.fileSize) },
            { key: 'isMajorVersion', label: 'Major', sortKey: 'isMajorVersion', render: (item) => item.isMajorVersion ? 'Yes' : 'No' }
        ]
    };

})();
