/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Lending Products Module - Column Configurations
 * Desktop Equivalent: lending/products/products-columns.js
 */
(function() {
    'use strict';

    var col = window.Layer8ColumnFactory;
    var enums = MobileLendProducts.enums;
    var render = MobileLendProducts.render;

    MobileLendProducts.columns = {
        LendProduct: [
            ...col.id('productId'),
            ...col.col('productCode', 'Code'),
            ...col.col('name', 'Name'),
            ...col.enum('productType', 'Type', null, render.productType),
            ...col.status('status', 'Status', enums.PRODUCT_STATUS_VALUES, render.productStatus),
            ...col.enum('interestType', 'Interest Type', null, render.interestType),
            ...col.money('minAmount', 'Min Amount'),
            ...col.money('maxAmount', 'Max Amount'),
            ...col.boolean('isActive', 'Active'),
        ],
        LendApplication: [
            ...col.id('applicationId'),
            ...col.col('applicationNumber', 'Application #'),
            ...col.col('customerId', 'Customer'),
            ...col.status('status', 'Status', enums.APPLICATION_STATUS_VALUES, render.applicationStatus),
            ...col.money('requestedAmount', 'Requested Amount'),
            ...col.money('approvedAmount', 'Approved Amount'),
            ...col.col('productId', 'Product'),
            ...col.date('applicationDate', 'Application Date'),
            ...col.col('loanOfficerId', 'Loan Officer'),
        ],
    };

    MobileLendProducts.primaryKeys = {
        LendProduct: 'productId',
        LendApplication: 'applicationId'
    };
})();
