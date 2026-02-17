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
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('documentType', 'Type', enums.DOCUMENT_TYPE),
                ...f.select('status', 'Status', enums.DOCUMENT_STATUS),
                ...f.select('accessLevel', 'Access Level', enums.ACCESS_LEVEL)
            ]),
            f.section('Versions', [
                ...f.inlineTable('versions', 'Document Versions', [
                    { key: 'versionId', label: 'ID', hidden: true },
                    { key: 'versionNumber', label: 'Version', type: 'number' },
                    { key: 'changeNotes', label: 'Change Notes', type: 'text' },
                    { key: 'fileName', label: 'File Name', type: 'text' },
                    { key: 'isMajorVersion', label: 'Major', type: 'checkbox' },
                    { key: 'createdDate', label: 'Created', type: 'date' }
                ])
            ]),
            f.section('Checkouts', [
                ...f.inlineTable('checkouts', 'Checkouts', [
                    { key: 'checkoutId', label: 'ID', hidden: true },
                    { key: 'status', label: 'Status', type: 'text' },
                    { key: 'checkedOutBy', label: 'Checked Out By', type: 'reference', lookupModel: 'Employee' },
                    { key: 'checkoutDate', label: 'Checkout Date', type: 'date' },
                    { key: 'checkinDate', label: 'Checkin Date', type: 'date' }
                ])
            ]),
            f.section('Review Comments', [
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
                    { key: 'signatureType', label: 'Type', type: 'text' },
                    { key: 'status', label: 'Status', type: 'text' },
                    { key: 'signerId', label: 'Signer', type: 'reference', lookupModel: 'Employee' },
                    { key: 'signedDate', label: 'Signed Date', type: 'date' }
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
                    { key: 'action', label: 'Action', type: 'text' },
                    { key: 'userId', label: 'User', type: 'reference', lookupModel: 'Employee' },
                    { key: 'accessDate', label: 'Date', type: 'date' },
                    { key: 'ipAddress', label: 'IP Address', type: 'text' },
                    { key: 'success', label: 'Success', type: 'checkbox' }
                ])
            ]),
            f.section('Audit Trail', [
                ...f.inlineTable('auditTrails', 'Audit Trail', [
                    { key: 'trailId', label: 'ID', hidden: true },
                    { key: 'action', label: 'Action', type: 'text' },
                    { key: 'userId', label: 'User', type: 'reference', lookupModel: 'Employee' },
                    { key: 'timestamp', label: 'Timestamp', type: 'date' },
                    { key: 'changeSummary', label: 'Change Summary', type: 'text' }
                ])
            ])
        ]),

        DocFolder: f.form('Folder', [
            f.section('Folder Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('accessLevel', 'Access Level', enums.ACCESS_LEVEL),
                ...f.checkbox('isSystem', 'System Folder')
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

    };

    MobileDocStorage.primaryKeys = {
        DocDocument: 'documentId',
        DocFolder: 'folderId',
        DocCategory: 'categoryId',
        DocTag: 'tagId'
    };

})();
