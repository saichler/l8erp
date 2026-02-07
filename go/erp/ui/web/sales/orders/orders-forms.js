/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Sales Orders Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.SalesOrders = window.SalesOrders || {};

    const f = window.Layer8FormFactory;
    const enums = SalesOrders.enums;

    SalesOrders.forms = {
        SalesQuotation: f.form('Sales Quotation', [
            f.section('Quotation Details', [
                ...f.text('quotationNumber', 'Quotation #', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.reference('salespersonId', 'Salesperson', 'Employee'),
                ...f.date('quotationDate', 'Quotation Date', true),
                ...f.date('validUntil', 'Valid Until'),
                ...f.select('status', 'Status', enums.QUOTATION_STATUS),
                ...f.text('paymentTerms', 'Payment Terms'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesQuotationLine: f.form('Quotation Line', [
            f.section('Line Details', [
                ...f.reference('quotationId', 'Quotation', 'SalesQuotation', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.textarea('description', 'Description'),
                ...f.number('quantity', 'Quantity', true),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.money('unitPrice', 'Unit Price', true),
                ...f.number('discountPercent', 'Discount %')
            ])
        ]),

        SalesOrder: f.form('Sales Order', [
            f.section('Order Details', [
                ...f.text('orderNumber', 'Order #', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.reference('salespersonId', 'Salesperson', 'Employee'),
                ...f.date('orderDate', 'Order Date', true),
                ...f.date('requestedDeliveryDate', 'Requested Delivery'),
                ...f.select('status', 'Status', enums.ORDER_STATUS),
                ...f.reference('quotationId', 'Quotation', 'SalesQuotation'),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse'),
                ...f.text('paymentTerms', 'Payment Terms'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.text('priority', 'Priority'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesOrderLine: f.form('Sales Order Line', [
            f.section('Line Details', [
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.textarea('description', 'Description'),
                ...f.number('quantity', 'Quantity', true),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.money('unitPrice', 'Unit Price', true),
                ...f.number('discountPercent', 'Discount %'),
            ])
        ]),

        SalesOrderAllocation: f.form('Order Allocation', [
            f.section('Allocation Details', [
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder', true),
                ...f.reference('lineId', 'Order Line', 'SalesOrderLine'),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
                ...f.reference('binId', 'Bin', 'ScmBin'),
                ...f.number('allocatedQuantity', 'Allocated Qty', true),
                ...f.select('status', 'Status', enums.ALLOCATION_STATUS)
            ])
        ]),

        SalesBackOrder: f.form('Back Order', [
            f.section('Back Order Details', [
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder', true),
                ...f.reference('lineId', 'Order Line', 'SalesOrderLine'),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.number('backOrderQuantity', 'Back Order Qty', true),
                ...f.date('expectedDate', 'Expected Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesReturnOrder: f.form('Return Order', [
            f.section('Return Details', [
                ...f.text('returnNumber', 'Return #', true),
                ...f.reference('salesOrderId', 'Original Order', 'SalesOrder', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.date('returnDate', 'Return Date', true),
                ...f.select('status', 'Status', enums.RETURN_STATUS),
                ...f.textarea('reasonDescription', 'Reason'),
                ...f.reference('warehouseId', 'Return Warehouse', 'ScmWarehouse'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesReturnOrderLine: f.form('Return Order Line', [
            f.section('Line Details', [
                ...f.reference('returnOrderId', 'Return Order', 'SalesReturnOrder', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.number('quantity', 'Return Qty', true),
                ...f.textarea('description', 'Description'),
                ...f.text('condition', 'Condition'),
                ...f.text('disposition', 'Disposition')
            ])
        ])
    };

    SalesOrders.primaryKeys = {
        SalesQuotation: 'quotationId',
        SalesQuotationLine: 'lineId',
        SalesOrder: 'salesOrderId',
        SalesOrderLine: 'lineId',
        SalesOrderAllocation: 'allocationId',
        SalesBackOrder: 'backOrderId',
        SalesReturnOrder: 'returnOrderId',
        SalesReturnOrderLine: 'lineId'
    };

})();
