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
                ...f.textarea('notes', 'Notes'),
                ...f.text('couponCode', 'Coupon Code'),
                ...f.text('shippingMethodId', 'Shipping Method'),
                ...f.text('paymentMethodId', 'Payment Method'),
                ...f.address('billingAddress'),
                ...f.address('shippingAddress'),
                ...f.text('customerNotes', 'Customer Notes'),
                ...f.text('ipAddress', 'Ip Address'),
                ...f.text('userAgent', 'User Agent'),
                ...f.text('salesOrderId', 'Sales Order'),
                ...f.text('warehouseId', 'Warehouse'),
                ...f.date('shippedDate', 'Shipped Date'),
                ...f.date('deliveredDate', 'Delivered Date'),
                ...f.text('trackingNumber', 'Tracking Number'),
            ]),
            f.section('Order Lines', [
                ...f.inlineTable('lines', 'Order Lines', [
                    { key: 'lineId', label: 'ID', hidden: true },
                    { key: 'productId', label: 'Product', type: 'text' },
                    { key: 'sku', label: 'SKU', type: 'text' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'quantity', label: 'Qty', type: 'number' },
                    { key: 'weight', label: 'Weight', type: 'number' },
                    { key: 'isGift', label: 'Gift', type: 'checkbox' }
                ])
            ]),
            f.section('Status History', [
                ...f.inlineTable('statusHistory', 'Status History', [
                    { key: 'statusId', label: 'ID', hidden: true },
                    { key: 'previousStatus', label: 'Previous Status', type: 'text' },
                    { key: 'newStatus', label: 'New Status', type: 'text' },
                    { key: 'changedBy', label: 'Changed By', type: 'text' },
                    { key: 'notes', label: 'Notes', type: 'text' },
                    { key: 'notifyCustomer', label: 'Notify', type: 'checkbox' }
                ])
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
                ...f.textarea('notes', 'Notes'),
                ...f.date('refundedDate', 'Refunded Date'),
                ...f.text('refundMethod', 'Refund Method'),
                ...f.text('approvedBy', 'Approved By'),
                ...f.text('trackingNumber', 'Tracking Number'),
                ...f.text('shippingCarrier', 'Shipping Carrier'),
            ]),
            f.section('Return Lines', [
                ...f.inlineTable('lines', 'Return Lines', [
                    { key: 'lineId', label: 'ID', hidden: true },
                    { key: 'productId', label: 'Product', type: 'text' },
                    { key: 'sku', label: 'SKU', type: 'text' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'quantity', label: 'Qty', type: 'number' },
                    { key: 'reason', label: 'Reason', type: 'text' },
                    { key: 'condition', label: 'Condition', type: 'text' },
                    { key: 'restock', label: 'Restock', type: 'checkbox' }
                ])
            ])
        ])
    };

    EcomOrders.primaryKeys = {
        EcomOrder: 'orderId',
        EcomReturn: 'returnId'
    };

})();
