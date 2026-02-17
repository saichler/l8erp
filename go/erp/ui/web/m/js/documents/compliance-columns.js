/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    window.MobileDocCompliance = window.MobileDocCompliance || {};
    const render = MobileDocCompliance.render;

    MobileDocCompliance.columns = {
        DocRetentionPolicy: [
            ...col.id('policyId'),
            ...col.col('name', 'Name'),
            ...col.col('retentionDays', 'Period (Days)'),
            ...col.enum('actionOnExpiry', 'Action', null, render.retentionAction),
            ...col.boolean('isActive', 'Active')
        ],
        DocLegalHold: [
            ...col.id('holdId'),
            ...col.col('name', 'Name'),
            ...col.col('matterId', 'Matter ID'),
            ...col.enum('status', 'Status', null, render.legalHoldStatus),
            ...col.date('effectiveDate', 'Effective')
        ],
        DocArchiveJob: [
            ...col.id('jobId'),
            ...col.col('name', 'Name'),
            ...col.enum('status', 'Status', null, render.archiveStatus),
            ...col.date('initiatedDate', 'Initiated'),
            ...col.col('archiveLocation', 'Location')
        ],
    };

})();
