/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Customer Portal Enums — subset of Sales, FIN, CRM enums relevant to customer workflows
(function() {
    'use strict';

    var CUST = window.CUST = window.CUST || {};
    var factory = Layer8EnumFactory;

    // Sales Order status
    var ORDER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-draft'],
        ['Confirmed', 'confirmed', 'layer8d-status-active'],
        ['In Progress', 'inProgress', 'layer8d-status-pending'],
        ['Partially Shipped', 'partiallyShipped', 'layer8d-status-pending'],
        ['Shipped', 'shipped', 'layer8d-status-active'],
        ['Delivered', 'delivered', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // Quotation status
    var QUOTATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-draft'],
        ['Sent', 'sent', 'layer8d-status-pending'],
        ['Accepted', 'accepted', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-inactive'],
        ['Expired', 'expired', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // Delivery status
    var DELIVERY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'layer8d-status-draft'],
        ['Picking', 'picking', 'layer8d-status-pending'],
        ['Packed', 'packed', 'layer8d-status-pending'],
        ['Shipped', 'shipped', 'layer8d-status-active'],
        ['Delivered', 'delivered', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-inactive']
    ]);

    // Return order status
    var RETURN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Requested', 'requested', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Received', 'received', 'layer8d-status-active'],
        ['Inspected', 'inspected', 'layer8d-status-pending'],
        ['Processed', 'processed', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-inactive']
    ]);

    // Invoice status
    var INVOICE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-draft'],
        ['Submitted', 'submitted', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Partially Paid', 'partiallyPaid', 'layer8d-status-pending'],
        ['Paid', 'paid', 'layer8d-status-active'],
        ['Overdue', 'overdue', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive'],
        ['Void', 'void', 'layer8d-status-inactive']
    ]);

    // Payment status
    var PAYMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Processing', 'processing', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive'],
        ['Reversed', 'reversed', 'layer8d-status-inactive']
    ]);

    // Payment method
    var PAYMENT_METHOD = factory.simple([
        'Unspecified', 'Check', 'ACH', 'Wire', 'Credit Card', 'Cash', 'Other'
    ]);

    // CRM Case status
    var CASE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['New', 'new', 'layer8d-status-draft'],
        ['In Progress', 'inProgress', 'layer8d-status-pending'],
        ['Waiting on Customer', 'waitingOnCustomer', 'layer8d-status-pending'],
        ['Escalated', 'escalated', 'layer8d-status-inactive'],
        ['Resolved', 'resolved', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-active']
    ]);

    // CRM Case priority
    var CASE_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'layer8d-status-draft'],
        ['Medium', 'medium', 'layer8d-status-pending'],
        ['High', 'high', 'layer8d-status-active'],
        ['Critical', 'critical', 'layer8d-status-inactive']
    ]);

    // Contract status
    var CONTRACT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-draft'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Expired', 'expired', 'layer8d-status-inactive'],
        ['Terminated', 'terminated', 'layer8d-status-inactive'],
        ['Renewed', 'renewed', 'layer8d-status-active']
    ]);

    // Renderers
    var renderEnum = Layer8DRenderers.renderEnum;
    var createStatusRenderer = Layer8DRenderers.createStatusRenderer;

    CUST.enums = {
        ORDER_STATUS: ORDER_STATUS.enum,
        ORDER_STATUS_CLASSES: ORDER_STATUS.classes,
        QUOTATION_STATUS: QUOTATION_STATUS.enum,
        QUOTATION_STATUS_CLASSES: QUOTATION_STATUS.classes,
        DELIVERY_STATUS: DELIVERY_STATUS.enum,
        DELIVERY_STATUS_CLASSES: DELIVERY_STATUS.classes,
        RETURN_STATUS: RETURN_STATUS.enum,
        RETURN_STATUS_CLASSES: RETURN_STATUS.classes,
        INVOICE_STATUS: INVOICE_STATUS.enum,
        INVOICE_STATUS_CLASSES: INVOICE_STATUS.classes,
        PAYMENT_STATUS: PAYMENT_STATUS.enum,
        PAYMENT_STATUS_CLASSES: PAYMENT_STATUS.classes,
        PAYMENT_METHOD: PAYMENT_METHOD.enum,
        CASE_STATUS: CASE_STATUS.enum,
        CASE_STATUS_CLASSES: CASE_STATUS.classes,
        CASE_PRIORITY: CASE_PRIORITY.enum,
        CASE_PRIORITY_CLASSES: CASE_PRIORITY.classes,
        CONTRACT_STATUS: CONTRACT_STATUS.enum,
        CONTRACT_STATUS_CLASSES: CONTRACT_STATUS.classes
    };

    CUST.render = {
        orderStatus: createStatusRenderer(ORDER_STATUS.enum, ORDER_STATUS.classes),
        quotationStatus: createStatusRenderer(QUOTATION_STATUS.enum, QUOTATION_STATUS.classes),
        deliveryStatus: createStatusRenderer(DELIVERY_STATUS.enum, DELIVERY_STATUS.classes),
        returnStatus: createStatusRenderer(RETURN_STATUS.enum, RETURN_STATUS.classes),
        invoiceStatus: createStatusRenderer(INVOICE_STATUS.enum, INVOICE_STATUS.classes),
        paymentStatus: createStatusRenderer(PAYMENT_STATUS.enum, PAYMENT_STATUS.classes),
        paymentMethod: function(v) { return renderEnum(v, PAYMENT_METHOD.enum); },
        caseStatus: createStatusRenderer(CASE_STATUS.enum, CASE_STATUS.classes),
        casePriority: createStatusRenderer(CASE_PRIORITY.enum, CASE_PRIORITY.classes),
        contractStatus: createStatusRenderer(CONTRACT_STATUS.enum, CONTRACT_STATUS.classes)
    };
})();
