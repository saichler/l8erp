/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompControls = window.CompControls || {};
    const col = window.Layer8ColumnFactory;

    CompControls.columns = {
        CompControl: [
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('controlType', 'Type'),
            ...col.col('processArea', 'Process Area'),
            ...col.boolean('isKeyControl', 'Key Control'),
            { key: 'ownerId', label: 'Owner', width: '150px', type: 'reference', referenceType: 'Employee' },
            ...col.boolean('isActive', 'Active'),
        ],
        CompPolicyDocument: [
            ...col.col('code', 'Code'),
            ...col.col('title', 'Title'),
            ...col.col('policyType', 'Type'),
            ...col.col('version', 'Version'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.col('status', 'Status'),
        ],
        CompApprovalMatrix: [
            ...col.col('name', 'Name'),
            ...col.col('transactionType', 'Transaction Type'),
            ...col.money('thresholdMin', 'Min Amount'),
            ...col.money('thresholdMax', 'Max Amount'),
            ...col.boolean('isActive', 'Active'),
        ]
    };

    CompControls.primaryKeys = {
        CompControl: 'controlId',
        CompPolicyDocument: 'policyId',
        CompApprovalMatrix: 'matrixId'
    };
})();
