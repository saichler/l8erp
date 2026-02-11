/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Sales Orders Module - Column Configurations
// Uses Layer8ColumnFactory for reduced boilerplate

(function() {
    'use strict';

    window.SalesOrders = window.SalesOrders || {};

    const col = window.Layer8ColumnFactory;
    const render = SalesOrders.render;

    SalesOrders.columns = {
        SalesQuotation: [
            ...col.id('quotationId'),
            ...col.col('quotationNumber', 'Quote #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('quotationDate', 'Date'),
            ...col.date('validUntil', 'Valid Until'),
            ...col.enum('status', 'Status', null, render.quotationStatus),
            ...col.money('totalAmount', 'Total')
        ],

        SalesOrder: [
            ...col.id('salesOrderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('orderDate', 'Order Date'),
            ...col.enum('status', 'Status', null, render.orderStatus),
            ...col.money('totalAmount', 'Total')
        ],

        SalesReturnOrder: [
            ...col.id('returnOrderId'),
            ...col.col('returnNumber', 'Return #'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('customerId', 'Customer'),
            ...col.date('returnDate', 'Date'),
            ...col.enum('status', 'Status', null, render.returnStatus)
        ]
    };

})();
