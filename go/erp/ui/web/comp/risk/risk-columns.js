/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompRisk = window.CompRisk || {};
    const col = window.Layer8ColumnFactory;

    CompRisk.columns = {
        CompRiskRegister: [
            ...col.col('code', 'Code'),
            ...col.col('title', 'Title'),
            ...col.col('category', 'Category'),
            ...col.col('inherentRiskScore', 'Inherent Risk'),
            ...col.col('residualRiskScore', 'Residual Risk'),
            { key: 'ownerId', label: 'Owner', width: '150px', type: 'reference', referenceType: 'Employee' },
            ...col.col('status', 'Status'),
        ],
        CompIncident: [
            ...col.col('incidentNumber', 'Number'),
            ...col.col('title', 'Title'),
            ...col.col('severity', 'Severity'),
            ...col.date('occurredDate', 'Occurred'),
            ...col.col('status', 'Status'),
        ],
        CompInsurancePolicy: [
            ...col.col('policyNumber', 'Policy Number'),
            ...col.col('name', 'Name'),
            ...col.col('policyType', 'Type'),
            ...col.col('provider', 'Provider'),
            ...col.date('expiryDate', 'Expiry'),
            ...col.col('status', 'Status'),
        ]
    };

    CompRisk.primaryKeys = {
        CompRiskRegister: 'riskId',
        CompIncident: 'incidentId',
        CompInsurancePolicy: 'insuranceId'
    };
})();
