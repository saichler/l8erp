/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Customer Portal Form Definitions — writable types for customer workflows.
// Read-only detail views use module forms via Layer8DFormsModal.openViewForm().
(function() {
    'use strict';

    var CUST = window.CUST = window.CUST || {};
    var f = Layer8FormFactory;
    var enums = CUST.enums;

    CUST.forms = {
        // Submit return request
        SalesReturnOrder: f.form('Return Request', [
            f.section('Return Details', [
                ...f.text('salesOrderId', 'Original Order ID', true),
                ...f.date('returnDate', 'Return Date'),
                ...f.text('reasonCode', 'Reason Code', true),
                ...f.textarea('reasonDescription', 'Description'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        // Submit support case
        CrmCase: f.form('Support Case', [
            f.section('Case Details', [
                ...f.text('subject', 'Subject', true),
                ...f.textarea('description', 'Description'),
                ...f.select('priority', 'Priority', enums.CASE_PRIORITY),
                ...f.text('origin', 'Origin')
            ])
        ])
    };

    CUST.primaryKeys = {
        SalesOrder: 'salesOrderId',
        SalesQuotation: 'quotationId',
        SalesDeliveryOrder: 'deliveryOrderId',
        SalesReturnOrder: 'returnOrderId',
        SalesInvoice: 'invoiceId',
        CustomerPayment: 'paymentId',
        CrmCase: 'caseId',
        CrmKBArticle: 'articleId',
        SalesCustomerContract: 'contractId'
    };
})();
