/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Customer Portal Column Definitions
(function() {
    'use strict';

    var CUST = window.CUST = window.CUST || {};
    var col = Layer8ColumnFactory;
    var render = CUST.render;
    var renderDate = Layer8DRenderers.renderDate;

    CUST.columns = {
        // Orders
        SalesOrder: [
            ...col.id('salesOrderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.date('orderDate', 'Order Date'),
            ...col.status('status', 'Status', null, render.orderStatus),
            ...col.money('totalAmount', 'Total'),
            ...col.date('requestedDeliveryDate', 'Delivery Date'),
            ...col.col('paymentTerms', 'Payment Terms')
        ],

        SalesQuotation: [
            ...col.id('quotationId'),
            ...col.col('quotationNumber', 'Quote #'),
            ...col.date('quotationDate', 'Date'),
            ...col.status('status', 'Status', null, render.quotationStatus),
            ...col.money('totalAmount', 'Total'),
            ...col.date('validUntil', 'Valid Until')
        ],

        SalesDeliveryOrder: [
            ...col.id('deliveryOrderId'),
            ...col.col('deliveryNumber', 'Delivery #'),
            ...col.col('salesOrderId', 'Order'),
            ...col.status('status', 'Status', null, render.deliveryStatus),
            ...col.date('plannedDeliveryDate', 'Est. Delivery'),
            ...col.date('actualDeliveryDate', 'Delivered'),
            ...col.col('trackingNumber', 'Tracking #')
        ],

        SalesReturnOrder: [
            ...col.id('returnOrderId'),
            ...col.col('returnNumber', 'Return #'),
            ...col.col('salesOrderId', 'Order'),
            ...col.date('returnDate', 'Return Date'),
            ...col.status('status', 'Status', null, render.returnStatus),
            ...col.col('reasonCode', 'Reason'),
            ...col.money('refundAmount', 'Refund')
        ],

        // Billing
        SalesInvoice: [
            ...col.id('invoiceId'),
            ...col.col('invoiceNumber', 'Invoice #'),
            ...col.date('invoiceDate', 'Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.status('status', 'Status', null, render.invoiceStatus),
            ...col.money('totalAmount', 'Total'),
            ...col.money('balanceDue', 'Balance Due')
        ],

        CustomerPayment: [
            ...col.id('paymentId'),
            ...col.date('paymentDate', 'Date'),
            ...col.money('amount', 'Amount'),
            ...col.enum('paymentMethod', 'Method', null, render.paymentMethod),
            ...col.status('status', 'Status', null, render.paymentStatus),
            ...col.col('reference', 'Reference')
        ],

        // Support
        CrmCase: [
            ...col.id('caseId'),
            ...col.col('caseNumber', 'Case #'),
            ...col.col('subject', 'Subject'),
            ...col.status('status', 'Status', null, render.caseStatus),
            ...col.status('priority', 'Priority', null, render.casePriority),
            ...col.date('openedDate', 'Opened'),
            ...col.date('closedDate', 'Closed')
        ],

        CrmKBArticle: [
            ...col.id('articleId'),
            ...col.col('articleNumber', 'Article #'),
            ...col.col('title', 'Title'),
            ...col.col('category', 'Category'),
            ...col.col('subcategory', 'Subcategory'),
            ...col.number('viewCount', 'Views')
        ],

        // Account
        SalesCustomerContract: [
            ...col.id('contractId'),
            ...col.col('contractNumber', 'Contract #'),
            ...col.col('name', 'Name'),
            ...col.status('status', 'Status', null, render.contractStatus),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.money('contractValue', 'Value')
        ]
    };
})();
