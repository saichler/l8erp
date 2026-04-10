/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.LendPayments = window.LendPayments || {};
    var col = window.Layer8ColumnFactory;
    var enums = LendPayments.enums;
    var render = LendPayments.render;

    LendPayments.columns = {
        LendPayment: [
            ...col.col('paymentNumber', 'Payment #'),
            ...col.col('customerId', 'Customer'),
            ...col.status('status', 'Status', enums.PAYMENT_STATUS_VALUES, render.paymentStatus),
            ...col.money('amount', 'Amount'),
            ...col.date('paymentDate', 'Payment Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.enum('paymentMethod', 'Method', null, render.paymentMethod),
            ...col.col('referenceNumber', 'Reference #'),
            ...col.boolean('isLate', 'Late'),
        ],
        LendCollateral: [
            ...col.col('name', 'Name'),
            ...col.enum('collateralType', 'Type', null, render.collateralType),
            ...col.status('status', 'Status', enums.COLLATERAL_STATUS_VALUES, render.collateralStatus),
            ...col.money('pledgedValue', 'Pledged Value'),
            ...col.money('currentValue', 'Current Value'),
            ...col.col('customerId', 'Customer'),
            ...col.col('serialNumber', 'Serial #'),
            ...col.date('pledgeDate', 'Pledge Date'),
        ],
    };

    LendPayments.primaryKeys = {
        LendPayment: 'paymentId',
        LendCollateral: 'collateralId'
    };
})();
