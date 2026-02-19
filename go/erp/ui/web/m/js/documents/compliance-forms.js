/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Uses Layer8FormFactory for reduced boilerplate
(function() {
    'use strict';

    window.MobileDocCompliance = window.MobileDocCompliance || {};
    const f = window.Layer8FormFactory;
    const enums = MobileDocCompliance.enums;

    MobileDocCompliance.forms = {
        DocRetentionPolicy: f.form('Retention Policy', [
            f.section('Policy Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.number('retentionDays', 'Retention Days', true),
                ...f.select('actionOnExpiry', 'Action on Expiry', enums.RETENTION_ACTION),
                ...f.checkbox('isActive', 'Active'),
                ...f.text('code', 'Code'),
                ...f.text('categoryId', 'Category'),
                ...f.select('documentType', 'Document Type', enums.DOCUMENT_TYPE),
                ...f.checkbox('isMandatory', 'Mandatory'),
                ...f.text('legalBasis', 'Legal Basis'),
                ...f.text('ownerId', 'Owner'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
            ])
        ]),

        DocLegalHold: f.form('Legal Hold', [
            f.section('Hold Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('matterId', 'Matter ID'),
                ...f.select('status', 'Status', enums.LEGAL_HOLD_STATUS),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.textarea('notes', 'Notes'),
                ...f.text('matterName', 'Matter Name'),
                ...f.text('custodianId', 'Custodian'),
                ...f.text('legalCounsel', 'Legal Counsel'),
                ...f.date('releaseDate', 'Release Date'),
                ...f.text('releaseReason', 'Release Reason'),
                ...f.text('releasedBy', 'Released By'),
                ...f.text('documentIds', 'Document Ids'),
                ...f.text('folderIds', 'Folder Ids'),
                ...f.text('searchCriteria', 'Search Criteria'),
                ...f.number('documentCount', 'Document Count'),
            ])
        ]),

        DocArchiveJob: f.form('Archive Job', [
            f.section('Archive Details', [
                ...f.text('name', 'Name', true),
                ...f.text('archiveLocation', 'Archive Location'),
                ...f.select('status', 'Status', enums.ARCHIVE_STATUS),
                ...f.textarea('description', 'Description'),
                ...f.text('sourceFolderId', 'Source Folder'),
                ...f.text('retentionPolicyId', 'Retention Policy'),
                ...f.text('searchCriteria', 'Search Criteria'),
                ...f.number('documentCount', 'Document Count'),
                ...f.number('totalSize', 'Total Size'),
                ...f.text('initiatedBy', 'Initiated By'),
                ...f.date('initiatedDate', 'Initiated Date'),
                ...f.date('completedDate', 'Completed Date'),
                ...f.text('errorMessage', 'Error Message'),
                ...f.text('documentIds', 'Document Ids'),
            ])
        ]),

    };

    MobileDocCompliance.primaryKeys = {
        DocRetentionPolicy: 'policyId',
        DocLegalHold: 'holdId',
        DocArchiveJob: 'jobId'
    };

})();
