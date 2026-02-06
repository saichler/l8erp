/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile Accounts Receivable Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobileAccountsReceivable = window.MobileAccountsReceivable || {};

    const f = window.Layer8FormFactory;
    const enums = MobileAccountsReceivable.enums;

    MobileAccountsReceivable.forms = {
        Customer: f.form('Customer', [
            f.section('Basic Information', [
                ...f.text('customerNumber', 'Customer Number', true),
                ...f.text('name', 'Name', true),
                ...f.select('status', 'Status', enums.CUSTOMER_STATUS, true)
            ]),
            f.section('Credit & Status', [
                ...f.number('creditLimit', 'Credit Limit'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CustomerContact: f.form('Customer Contact', [
            f.section('Contact Information', [
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.text('contactName', 'Contact Name', true),
                ...f.text('email', 'Email'),
                ...f.text('phone', 'Phone'),
                ...f.checkbox('isPrimary', 'Primary Contact')
            ])
        ]),

        SalesInvoice: f.form('Sales Invoice', [
            f.section('Invoice Details', [
                ...f.text('invoiceNumber', 'Invoice Number', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('status', 'Status', enums.INVOICE_STATUS, true)
            ]),
            f.section('Dates & Amount', [
                ...f.date('invoiceDate', 'Invoice Date', true),
                ...f.date('dueDate', 'Due Date', true),
                ...f.number('totalAmount', 'Total Amount')
            ])
        ]),

        SalesInvoiceLine: f.form('Sales Invoice Line', [
            f.section('Line Details', [
                ...f.reference('invoiceId', 'Invoice', 'SalesInvoice', true),
                ...f.text('description', 'Description', true),
                ...f.number('quantity', 'Quantity', true),
                ...f.number('unitPrice', 'Unit Price', true),
                ...f.number('lineTotal', 'Line Total')
            ])
        ]),

        CustomerPayment: f.form('Customer Payment', [
            f.section('Payment Details', [
                ...f.text('paymentNumber', 'Payment Number', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('paymentMethod', 'Payment Method', enums.PAYMENT_METHOD, true),
                ...f.select('status', 'Status', enums.PAYMENT_STATUS, true)
            ]),
            f.section('Amount & Date', [
                ...f.date('paymentDate', 'Payment Date', true),
                ...f.number('amount', 'Amount', true)
            ])
        ]),

        PaymentApplication: f.form('Payment Application', [
            f.section('Application Details', [
                ...f.reference('paymentId', 'Payment', 'CustomerPayment', true),
                ...f.reference('invoiceId', 'Invoice', 'SalesInvoice', true),
                ...f.number('appliedAmount', 'Applied Amount', true)
            ])
        ]),

        CreditMemo: f.form('Credit Memo', [
            f.section('Memo Details', [
                ...f.text('memoNumber', 'Memo Number', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('status', 'Status', enums.CREDIT_MEMO_STATUS, true)
            ]),
            f.section('Amount & Date', [
                ...f.date('issueDate', 'Issue Date', true),
                ...f.number('amount', 'Amount', true)
            ])
        ]),

        DunningLetter: f.form('Dunning Letter', [
            f.section('Letter Details', [
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.date('letterDate', 'Letter Date', true),
                ...f.select('dunningLevel', 'Dunning Level', enums.DUNNING_LEVEL, true),
                ...f.number('totalOverdue', 'Total Overdue')
            ])
        ])
    };

})();
