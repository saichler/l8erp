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
                ...f.number('retentionPeriod', 'Retention Period (Days)', true),
                ...f.select('status', 'Status', enums.RETENTION_STATUS),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        DocLegalHold: f.form('Legal Hold', [
            f.section('Hold Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.textarea('reason', 'Reason'),
                ...f.select('status', 'Status', enums.LEGAL_HOLD_STATUS)
            ])
        ]),

        DocAccessLog: f.form('Access Log', [
            f.section('Log Details', [
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.reference('userId', 'User', 'Employee', true),
                ...f.select('accessType', 'Access Type', enums.ACCESS_TYPE),
                ...f.text('ipAddress', 'IP Address')
            ])
        ]),

        DocArchiveJob: f.form('Archive Job', [
            f.section('Archive Details', [
                ...f.reference('documentId', 'Document', 'DocDocument', true),
                ...f.text('archiveLocation', 'Archive Location'),
                ...f.select('status', 'Status', enums.ARCHIVE_STATUS),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        DocAuditTrail: f.form('Audit Trail', [
            f.section('Audit Details', [
                ...f.text('entityType', 'Entity Type', true),
                ...f.text('entityId', 'Entity ID', true),
                ...f.select('action', 'Action', enums.AUDIT_ACTION),
                ...f.textarea('details', 'Details')
            ])
        ])
    };

    MobileDocCompliance.primaryKeys = {
        DocRetentionPolicy: 'policyId',
        DocLegalHold: 'holdId',
        DocAccessLog: 'logId',
        DocArchiveJob: 'archiveId',
        DocAuditTrail: 'auditId'
    };

})();
