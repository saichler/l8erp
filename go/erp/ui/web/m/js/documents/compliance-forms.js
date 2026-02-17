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
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        DocLegalHold: f.form('Legal Hold', [
            f.section('Hold Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('matterId', 'Matter ID'),
                ...f.select('status', 'Status', enums.LEGAL_HOLD_STATUS),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        DocArchiveJob: f.form('Archive Job', [
            f.section('Archive Details', [
                ...f.text('name', 'Name', true),
                ...f.text('archiveLocation', 'Archive Location'),
                ...f.select('status', 'Status', enums.ARCHIVE_STATUS),
                ...f.textarea('description', 'Description')
            ])
        ]),

    };

    MobileDocCompliance.primaryKeys = {
        DocRetentionPolicy: 'policyId',
        DocLegalHold: 'holdId',
        DocArchiveJob: 'jobId'
    };

})();
