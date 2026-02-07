/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// E-Commerce Orders Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.EcomOrders = window.EcomOrders || {};

    const f = window.Layer8FormFactory;
    const enums = EcomOrders.enums;

    EcomOrders.forms = {
        EcomOrder: f.form('Order', [
            f.section('Order Details', [
                ...f.text('orderNumber', 'Order Number', true),
                ...f.reference('customerId', 'Customer', 'EcomCustomer', true),
                ...f.select('status', 'Status', enums.ORDER_STATUS),
                ...f.select('paymentStatus', 'Payment Status', enums.PAYMENT_STATUS),
                ...f.date('orderDate', 'Order Date', true),
                ...f.money('subtotal', 'Subtotal'),
                ...f.money('taxAmount', 'Tax Amount'),
                ...f.money('shippingAmount', 'Shipping Amount'),
                ...f.money('discountAmount', 'Discount Amount'),
                ...f.money('totalAmount', 'Total Amount'),
                ...f.reference('shippingAddress', 'Shipping Address', 'EcomCustomerAddress'),
                ...f.reference('billingAddress', 'Billing Address', 'EcomCustomerAddress'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        EcomOrderLine: f.form('Order Line', [
            f.section('Line Details', [
                ...f.reference('orderId', 'Order', 'EcomOrder', true),
                ...f.reference('productId', 'Product', 'EcomProduct', true),
                ...f.text('sku', 'SKU'),
                ...f.text('name', 'Name', true),
                ...f.number('quantity', 'Quantity', true),
                ...f.money('unitPrice', 'Unit Price'),
                ...f.money('discountAmount', 'Discount Amount'),
                ...f.money('taxAmount', 'Tax Amount'),
                ...f.money('lineTotal', 'Line Total')
            ])
        ]),

        EcomOrderStatusHistory: f.form('Order Status History', [
            f.section('Status Change Details', [
                ...f.reference('orderId', 'Order', 'EcomOrder', true),
                ...f.select('previousStatus', 'Previous Status', enums.ORDER_STATUS),
                ...f.select('newStatus', 'New Status', enums.ORDER_STATUS, true),
                ...f.date('changedAt', 'Changed At', true),
                ...f.text('changedBy', 'Changed By'),
                ...f.textarea('notes', 'Notes'),
                ...f.checkbox('notifyCustomer', 'Notify Customer')
            ])
        ]),

        EcomReturn: f.form('Return', [
            f.section('Return Details', [
                ...f.text('returnNumber', 'Return Number', true),
                ...f.reference('orderId', 'Order', 'EcomOrder', true),
                ...f.reference('customerId', 'Customer', 'EcomCustomer', true),
                ...f.select('status', 'Status', enums.RETURN_STATUS),
                ...f.date('requestedDate', 'Requested Date', true),
                ...f.date('approvedDate', 'Approved Date'),
                ...f.date('receivedDate', 'Received Date'),
                ...f.money('refundAmount', 'Refund Amount'),
                ...f.textarea('reason', 'Reason'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        EcomReturnLine: f.form('Return Line', [
            f.section('Return Line Details', [
                ...f.reference('returnId', 'Return', 'EcomReturn', true),
                ...f.reference('productId', 'Product', 'EcomProduct', true),
                ...f.reference('orderLineId', 'Order Line', 'EcomOrderLine'),
                ...f.text('sku', 'SKU'),
                ...f.text('name', 'Name', true),
                ...f.number('quantity', 'Quantity', true),
                ...f.money('refundAmount', 'Refund Amount'),
                ...f.textarea('reason', 'Reason'),
                ...f.text('condition', 'Condition'),
                ...f.checkbox('restock', 'Restock')
            ])
        ])
    };

    EcomOrders.primaryKeys = {
        EcomOrder: 'orderId',
        EcomOrderLine: 'lineId',
        EcomOrderStatusHistory: 'statusId',
        EcomReturn: 'returnId',
        EcomReturnLine: 'lineId'
    };

})();
