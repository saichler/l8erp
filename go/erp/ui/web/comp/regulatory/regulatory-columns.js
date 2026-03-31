/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompRegulatory = window.CompRegulatory || {};
    const col = window.Layer8ColumnFactory;

    CompRegulatory.columns = {
        CompRegulation: [
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('regulationType', 'Type'),
            ...col.col('jurisdiction', 'Jurisdiction'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.boolean('isActive', 'Active'),
        ],
        CompCertification: [
            ...col.col('name', 'Name'),
            ...col.col('certificateNumber', 'Certificate #'),
            ...col.col('issuingBody', 'Issuing Body'),
            ...col.date('issueDate', 'Issue Date'),
            ...col.date('expiryDate', 'Expiry Date'),
            ...col.col('status', 'Status'),
        ],
    };

    CompRegulatory.primaryKeys = {
        CompRegulation: 'regulationId',
        CompCertification: 'certificationId'
    };
})();
