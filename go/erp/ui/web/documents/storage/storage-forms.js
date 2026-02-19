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
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('documentType', 'Document Type', enums.DOCUMENT_TYPE),
                ...f.select('status', 'Status', enums.DOCUMENT_STATUS),
                ...f.select('fileFormat', 'File Format', enums.FILE_FORMAT),
                ...f.text('mimeType', 'Mime Type'),
                ...f.number('fileSize', 'File Size'),
                ...f.text('storagePath', 'Storage Path'),
                ...f.checkbox('isPublic', 'Public'),
                ...f.number('currentVersion', 'Current Version'),
                ...f.text('checksum', 'Checksum'),
                ...f.date('createdDate', 'Created Date'),
                ...f.date('modifiedDate', 'Modified Date'),
                ...f.text('tagIds', 'Tag Ids'),
            ]),
            f.section('Location & Access', [
                ...f.reference('folderId', 'Folder', 'DocFolder'),
                ...f.reference('categoryId', 'Category', 'DocCategory'),
                ...f.select('accessLevel', 'Access Level', enums.ACCESS_LEVEL),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('Compliance', [
                ...f.date('expiryDate', 'Expiry Date')
            ]),
            f.section('Versions', [
                ...f.inlineTable('versions', 'Document Versions', [
                    { key: 'versionId', label: 'ID', hidden: true },
                    { key: 'versionNumber', label: 'Version', type: 'number' },
                    { key: 'changeNotes', label: 'Change Notes', type: 'text' },
                    { key: 'fileName', label: 'File Name', type: 'text' },
                    { key: 'isMajorVersion', label: 'Major', type: 'checkbox' }
                ])
            ]),
            f.section('Checkouts', [
                ...f.inlineTable('checkouts', 'Checkouts', [
                    { key: 'checkoutId', label: 'ID', hidden: true },
                    { key: 'status', label: 'Status', type: 'select', options: enums.CHECKOUT_STATUS },
                    { key: 'checkedOutBy', label: 'Checked Out By', type: 'reference', lookupModel: 'Employee' },
                    { key: 'checkoutNotes', label: 'Notes', type: 'text' }
                ])
            ]),
            f.section('Comments', [
                ...f.inlineTable('comments', 'Review Comments', [
                    { key: 'commentId', label: 'ID', hidden: true },
                    { key: 'authorId', label: 'Author', type: 'reference', lookupModel: 'Employee' },
                    { key: 'content', label: 'Content', type: 'text' },
                    { key: 'pageNumber', label: 'Page', type: 'number' },
                    { key: 'isResolved', label: 'Resolved', type: 'checkbox' }
                ])
            ]),
            f.section('Signatures', [
                ...f.inlineTable('signatures', 'Signatures', [
                    { key: 'signatureId', label: 'ID', hidden: true },
                    { key: 'signerId', label: 'Signer', type: 'reference', lookupModel: 'Employee' },
                    { key: 'signatureType', label: 'Type', type: 'select', options: enums.SIGNATURE_TYPE },
                    { key: 'status', label: 'Status', type: 'select', options: enums.SIGNATURE_STATUS },
                    { key: 'reason', label: 'Reason', type: 'text' }
                ])
            ]),
            f.section('Attachments', [
                ...f.inlineTable('attachments', 'Attachments', [
                    { key: 'attachmentId', label: 'ID', hidden: true },
                    { key: 'entityType', label: 'Entity Type', type: 'text' },
                    { key: 'entityId', label: 'Entity ID', type: 'text' },
                    { key: 'module', label: 'Module', type: 'text' },
                    { key: 'description', label: 'Description', type: 'text' }
                ])
            ]),
            f.section('Access Logs', [
                ...f.inlineTable('accessLogs', 'Access Logs', [
                    { key: 'logId', label: 'ID', hidden: true },
                    { key: 'userId', label: 'User', type: 'reference', lookupModel: 'Employee' },
                    { key: 'action', label: 'Action', type: 'select', options: enums.ACCESS_ACTION },
                    { key: 'ipAddress', label: 'IP Address', type: 'text' }
                ])
            ]),
            f.section('Audit Trails', [
                ...f.inlineTable('auditTrails', 'Audit Trails', [
                    { key: 'trailId', label: 'ID', hidden: true },
                    { key: 'action', label: 'Action', type: 'text' },
                    { key: 'entityType', label: 'Entity Type', type: 'text' },
                    { key: 'userName', label: 'User', type: 'text' },
                    { key: 'changeSummary', label: 'Summary', type: 'text' }
                ])
            ])
        ]),

        DocFolder: f.form('Folder', [
            f.section('Folder Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('parentFolderId', 'Parent Folder', 'DocFolder'),
                ...f.select('accessLevel', 'Access Level', enums.ACCESS_LEVEL),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isSystem', 'System Folder'),
                ...f.text('path', 'Path'),
                ...f.text('departmentId', 'Department'),
                ...f.number('documentCount', 'Document Count'),
                ...f.number('subfolderCount', 'Subfolder Count'),
            ])
        ]),

        DocCategory: f.form('Category', [
            f.section('Category Details', [
                ...f.text('name', 'Name', true),
                ...f.text('code', 'Code'),
                ...f.textarea('description', 'Description'),
                ...f.reference('parentCategoryId', 'Parent Category', 'DocCategory'),
                ...f.checkbox('isActive', 'Active'),
                ...f.number('sortOrder', 'Sort Order'),
                ...f.text('retentionPolicyId', 'Retention Policy'),
            ])
        ]),

        DocTag: f.form('Tag', [
            f.section('Tag Details', [
                ...f.text('name', 'Name', true),
                ...f.text('color', 'Color'),
                ...f.textarea('description', 'Description'),
                ...f.checkbox('isActive', 'Active'),
                ...f.number('usageCount', 'Usage Count'),
            ])
        ]),

    };

    DocStorage.primaryKeys = {
        DocDocument: 'documentId',
        DocFolder: 'folderId',
        DocCategory: 'categoryId',
        DocTag: 'tagId'
    };

})();
