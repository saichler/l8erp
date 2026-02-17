/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompRegulatory = window.CompRegulatory || {};

    CompRegulatory.columns = {
        CompRegulation: [
            { key: 'code', label: 'Code', width: '100px' },
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'regulationType', label: 'Type', width: '120px' },
            { key: 'jurisdiction', label: 'Jurisdiction', width: '120px' },
            { key: 'effectiveDate', label: 'Effective Date', width: '120px', type: 'date' },
            { key: 'isActive', label: 'Active', width: '100px' }
        ],
        CompCertification: [
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'certificateNumber', label: 'Certificate #', width: '120px' },
            { key: 'issuingBody', label: 'Issuing Body', width: '150px' },
            { key: 'issueDate', label: 'Issue Date', width: '120px', type: 'date' },
            { key: 'expiryDate', label: 'Expiry Date', width: '120px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
    };

    CompRegulatory.primaryKeys = {
        CompRegulation: 'regulationId',
        CompCertification: 'certificationId'
    };
})();
