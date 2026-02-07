/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Compliance Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.DocCompliance = window.DocCompliance || {};

    const f = window.Layer8FormFactory;
    const enums = DocCompliance.enums;

    DocCompliance.forms = {
        DocRetentionPolicy: f.form('Retention Policy', [
            f.section('Policy Details', [
                ...f.text('name', 'Name', true),
                ...f.text('code', 'Code'),
                ...f.textarea('description', 'Description'),
                ...f.number('retentionDays', 'Retention Days', true),
                ...f.select('actionOnExpiry', 'Action on Expiry', enums.RETENTION_ACTION),
                ...f.reference('categoryId', 'Category', 'DocCategory'),
                ...f.text('legalBasis', 'Legal Basis'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active'),
                ...f.checkbox('isMandatory', 'Mandatory')
            ])
        ]),

        DocLegalHold: f.form('Legal Hold', [
            f.section('Hold Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.LEGAL_HOLD_STATUS),
                ...f.text('matterId', 'Matter ID'),
                ...f.text('matterName', 'Matter Name'),
                ...f.reference('custodianId', 'Custodian', 'Employee'),
                ...f.text('legalCounsel', 'Legal Counsel'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('releaseDate', 'Release Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        DocAccessLog: f.form('Access Log', [
            f.section('Log Details', [
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.reference('userId', 'User', 'Employee', true),
                ...f.select('action', 'Action', enums.ACCESS_ACTION),
                ...f.text('ipAddress', 'IP Address'),
                ...f.text('userAgent', 'User Agent')
            ])
        ]),

        DocArchiveJob: f.form('Archive Job', [
            f.section('Job Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('retentionPolicyId', 'Policy', 'DocRetentionPolicy'),
                ...f.select('status', 'Status', enums.ARCHIVE_STATUS),
                ...f.reference('initiatedBy', 'Initiated By', 'Employee'),
                ...f.text('archiveLocation', 'Archive Location')
            ])
        ]),

        DocAuditTrail: f.form('Audit Trail', [
            f.section('Audit Details', [
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.reference('userId', 'User', 'Employee', true),
                ...f.text('action', 'Action', true),
                ...f.text('entityType', 'Entity Type'),
                ...f.text('entityId', 'Entity ID'),
                ...f.text('changeSummary', 'Change Summary'),
                ...f.textarea('oldValues', 'Old Values'),
                ...f.textarea('newValues', 'New Values')
            ])
        ])
    };

    DocCompliance.primaryKeys = {
        DocRetentionPolicy: 'policyId',
        DocLegalHold: 'holdId',
        DocAccessLog: 'logId',
        DocArchiveJob: 'jobId',
        DocAuditTrail: 'trailId'
    };

})();
