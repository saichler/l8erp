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

    const col = window.Layer8ColumnFactory;
    window.MobileDocStorage = window.MobileDocStorage || {};
    const render = MobileDocStorage.render;

    MobileDocStorage.columns = {
        DocDocument: [
            ...col.id('documentId'),
            ...col.col('name', 'Name'),
            ...col.enum('documentType', 'Type', null, render.documentType),
            ...col.enum('status', 'Status', null, render.documentStatus),
            ...col.enum('fileFormat', 'Format', null, render.fileFormat),
            ...col.enum('accessLevel', 'Access', null, render.accessLevel)
        ],
        DocFolder: [
            ...col.id('folderId'),
            ...col.col('name', 'Name'),
            ...col.col('path', 'Path'),
            ...col.enum('accessLevel', 'Access', null, render.accessLevel),
            ...col.boolean('isSystem', 'System')
        ],
        DocCategory: [
            ...col.id('categoryId'),
            ...col.col('name', 'Name'),
            ...col.col('code', 'Code'),
            ...col.boolean('isActive', 'Active')
        ],
        DocTag: [
            ...col.id('tagId'),
            ...col.col('name', 'Name'),
            ...col.col('color', 'Color'),
            ...col.boolean('isActive', 'Active')
        ]
    };

})();
