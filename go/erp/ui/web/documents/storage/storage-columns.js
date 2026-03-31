/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Storage Module - Column Configurations

(function() {
    'use strict';

    window.DocStorage = window.DocStorage || {};

    const col = window.Layer8ColumnFactory;
    const { renderFileSize } = Layer8DRenderers;
    const render = DocStorage.render;

    DocStorage.columns = {
        DocDocument: [
            ...col.id('documentId'),
            ...col.col('name', 'Name'),
            ...col.enum('documentType', 'Type', null, render.documentType),
            ...col.enum('status', 'Status', null, render.documentStatus),
            ...col.enum('fileFormat', 'Format', null, render.fileFormat),
            { key: 'fileSize', label: 'Size', sortKey: 'fileSize', render: (item) => renderFileSize(item.fileSize) },
            { key: 'storagePath', label: 'Download', render: (item) => {
                if (!item.storagePath) return '-';
                return `<button type="button" class="l8-file-download-btn" onclick="event.stopPropagation(); Layer8FileUpload.download('${Layer8DUtils.escapeAttr(item.storagePath)}', '${Layer8DUtils.escapeAttr(item.fileName || '')}')">Download</button>`;
            }},
            ...col.enum('accessLevel', 'Access', null, render.accessLevel),
            ...col.col('ownerId', 'Owner'),
            ...col.col('currentVersion', 'Version'),
        ],

        DocFolder: [
            ...col.id('folderId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('parentFolderId', 'Parent'),
            ...col.col('path', 'Path'),
            ...col.enum('accessLevel', 'Access', null, render.accessLevel),
            ...col.col('ownerId', 'Owner'),
            ...col.boolean('isSystem', 'System'),
        ],

        DocCategory: [
            ...col.id('categoryId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('parentCategoryId', 'Parent'),
            ...col.col('code', 'Code'),
            ...col.boolean('isActive', 'Active'),
        ],

        DocTag: [
            ...col.id('tagId'),
            ...col.col('name', 'Name'),
            ...col.col('color', 'Color'),
            ...col.col('description', 'Description'),
            ...col.boolean('isActive', 'Active'),
        ]
    };

})();
