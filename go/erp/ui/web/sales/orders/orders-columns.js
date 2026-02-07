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

        SalesQuotationLine: [
            ...col.id('lineId'),
            ...col.col('quotationId', 'Quotation'),
            ...col.col('itemId', 'Item'),
            ...col.custom('quantity', 'Qty', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.money('unitPrice', 'Unit Price'),
            ...col.money('lineTotal', 'Total')
        ],

        SalesOrder: [
            ...col.id('salesOrderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('orderDate', 'Order Date'),
            ...col.enum('status', 'Status', null, render.orderStatus),
            ...col.money('totalAmount', 'Total')
        ],

        SalesOrderLine: [
            ...col.id('lineId'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('itemId', 'Item'),
            ...col.custom('quantity', 'Qty', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.money('unitPrice', 'Unit Price'),
            ...col.money('lineTotal', 'Total')
        ],

        SalesOrderAllocation: [
            ...col.id('allocationId'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('itemId', 'Item'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.custom('allocatedQuantity', 'Allocated', (item) => item.allocatedQuantity, { sortKey: 'allocatedQuantity' }),
            ...col.enum('status', 'Status', null, render.allocationStatus)
        ],

        SalesBackOrder: [
            ...col.id('backOrderId'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('itemId', 'Item'),
            ...col.custom('backOrderQuantity', 'Qty', (item) => item.backOrderQuantity, { sortKey: 'backOrderQuantity' }),
            ...col.date('expectedDate', 'Expected')
        ],

        SalesReturnOrder: [
            ...col.id('returnOrderId'),
            ...col.col('returnNumber', 'Return #'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('customerId', 'Customer'),
            ...col.date('returnDate', 'Date'),
            ...col.enum('status', 'Status', null, render.returnStatus)
        ],

        SalesReturnOrderLine: [
            ...col.id('lineId'),
            ...col.col('returnOrderId', 'Return'),
            ...col.col('itemId', 'Item'),
            ...col.custom('quantity', 'Qty', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.col('description', 'Description')
        ]
    };

})();
