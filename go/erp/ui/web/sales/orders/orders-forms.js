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
                ...f.textarea('notes', 'Notes'),
                ...f.text('shipToAddressId', 'Ship To Address'),
                ...f.text('billToAddressId', 'Bill To Address'),
                ...f.money('subtotal', 'Subtotal'),
                ...f.money('discountTotal', 'Discount Total'),
                ...f.money('taxTotal', 'Tax Total'),
                ...f.money('totalAmount', 'Total Amount'),
            ]),
            f.section('Lines', [
                ...f.inlineTable('lines', 'Quotation Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                    { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                    { key: 'discountPercent', label: 'Discount %', type: 'number' },
                    { key: 'lineTotal', label: 'Total', type: 'money' }
                ])
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
                ...f.textarea('notes', 'Notes'),
                ...f.text('shipToAddressId', 'Ship To Address'),
                ...f.text('billToAddressId', 'Bill To Address'),
                ...f.money('subtotal', 'Subtotal'),
                ...f.money('discountTotal', 'Discount Total'),
                ...f.money('taxTotal', 'Tax Total'),
                ...f.money('totalAmount', 'Total Amount'),
            ]),
            f.section('Order Lines', [
                ...f.inlineTable('lines', 'Order Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                    { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                    { key: 'discountPercent', label: 'Discount %', type: 'number' },
                    { key: 'lineTotal', label: 'Total', type: 'money' }
                ])
            ]),
            f.section('Allocations', [
                ...f.inlineTable('allocations', 'Order Allocations', [
                    { key: 'allocationId', label: 'ID', hidden: true },
                    { key: 'lineId', label: 'Line ID', type: 'text' },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                    { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                    { key: 'allocatedQuantity', label: 'Allocated Qty', type: 'number' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.ALLOCATION_STATUS }
                ])
            ]),
            f.section('Back Orders', [
                ...f.inlineTable('backOrders', 'Back Orders', [
                    { key: 'backOrderId', label: 'ID', hidden: true },
                    { key: 'lineId', label: 'Line ID', type: 'text' },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                    { key: 'backOrderQuantity', label: 'Qty', type: 'number' },
                    { key: 'expectedDate', label: 'Expected', type: 'date' },
                    { key: 'notes', label: 'Notes', type: 'text' }
                ])
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
                ...f.textarea('notes', 'Notes'),
                ...f.text('reasonCode', 'Reason Code'),
                ...f.money('refundAmount', 'Refund Amount'),
            ]),
            f.section('Return Lines', [
                ...f.inlineTable('lines', 'Return Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'condition', label: 'Condition', type: 'text' },
                    { key: 'disposition', label: 'Disposition', type: 'text' }
                ])
            ])
        ])
    };

    SalesOrders.primaryKeys = {
        SalesQuotation: 'quotationId',
        SalesOrder: 'salesOrderId',
        SalesReturnOrder: 'returnOrderId'
    };

})();
