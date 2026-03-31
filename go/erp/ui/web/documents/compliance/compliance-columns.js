/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Compliance Module - Column Configurations

(function() {
    'use strict';

    window.DocCompliance = window.DocCompliance || {};

    const col = window.Layer8ColumnFactory;
    const render = DocCompliance.render;

    DocCompliance.columns = {
        DocRetentionPolicy: [
            ...col.id('policyId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('retentionDays', 'Retention (Days)'),
            ...col.enum('actionOnExpiry', 'Action', null, render.retentionAction),
            ...col.col('categoryId', 'Category'),
            ...col.boolean('isActive', 'Active'),
        ],

        DocLegalHold: [
            ...col.id('holdId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.enum('status', 'Status', null, render.legalHoldStatus),
            ...col.col('matterId', 'Matter ID'),
            ...col.col('custodianId', 'Custodian'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.date('releaseDate', 'Release Date'),
        ],

        DocArchiveJob: [
            ...col.id('jobId'),
            ...col.col('name', 'Name'),
            ...col.enum('status', 'Status', null, render.archiveStatus),
            ...col.col('retentionPolicyId', 'Policy'),
            ...col.date('initiatedDate', 'Initiated'),
            ...col.date('completedDate', 'Completed'),
            ...col.col('documentCount', 'Documents'),
            ...col.col('initiatedBy', 'Initiated By'),
            ...col.col('errorMessage', 'Error'),
        ],

    };

})();
