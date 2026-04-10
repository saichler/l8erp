/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.LendProducts = window.LendProducts || {};
    var col = window.Layer8ColumnFactory;
    var enums = LendProducts.enums;
    var render = LendProducts.render;

    LendProducts.columns = {
        LendProduct: [
            ...col.col('productCode', 'Code'),
            ...col.col('name', 'Name'),
            ...col.enum('productType', 'Type', null, render.productType),
            ...col.status('status', 'Status', enums.PRODUCT_STATUS_VALUES, render.productStatus),
            ...col.enum('interestType', 'Interest Type', null, render.interestType),
            ...col.col('baseInterestRate', 'Base Rate %'),
            ...col.money('minLoanAmount', 'Min Amount'),
            ...col.money('maxLoanAmount', 'Max Amount'),
            ...col.boolean('isActive', 'Active'),
        ],
        LendApplication: [
            ...col.col('applicationNumber', 'Application #'),
            ...col.col('customerId', 'Customer'),
            ...col.status('status', 'Status', enums.APPLICATION_STATUS_VALUES, render.applicationStatus),
            ...col.money('requestedAmount', 'Requested'),
            ...col.col('requestedTermMonths', 'Term (Mo)'),
            ...col.money('approvedAmount', 'Approved'),
            ...col.date('applicationDate', 'Applied'),
            ...col.date('decisionDate', 'Decision'),
            ...col.col('creditScore', 'Credit Score'),
        ],
    };

    LendProducts.primaryKeys = {
        LendProduct: 'productId',
        LendApplication: 'applicationId'
    };
})();
