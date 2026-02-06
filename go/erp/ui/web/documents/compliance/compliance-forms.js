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
                ...f.textarea('description', 'Description'),
                ...f.number('retentionDays', 'Retention Days', true),
                ...f.select('action', 'Action', enums.RETENTION_ACTION),
                ...f.reference('categoryId', 'Category', 'DocCategory'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        DocLegalHold: f.form('Legal Hold', [
            f.section('Hold Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.LEGAL_HOLD_STATUS),
                ...f.text('matterReference', 'Matter Reference'),
                ...f.reference('custodianId', 'Custodian', 'Employee'),
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.textarea('reason', 'Reason')
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
                ...f.reference('policyId', 'Policy', 'DocRetentionPolicy', true),
                ...f.select('status', 'Status', enums.ARCHIVE_STATUS),
                ...f.reference('startedBy', 'Started By', 'Employee'),
                ...f.text('archiveLocation', 'Archive Location')
            ])
        ]),

        DocAuditTrail: f.form('Audit Trail', [
            f.section('Audit Details', [
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.reference('userId', 'User', 'Employee', true),
                ...f.text('action', 'Action', true),
                ...f.text('fieldName', 'Field Name'),
                ...f.textarea('oldValue', 'Old Value'),
                ...f.textarea('newValue', 'New Value')
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
