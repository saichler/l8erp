/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Accounts Receivable Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = window.AccountsReceivable.enums;

    window.AccountsReceivable.forms = {
        Customer: f.form('Customer', [
            f.section('Basic Information', [
                ...f.text('customerNumber', 'Customer Number', true),
                ...f.text('name', 'Name', true),
                ...f.select('status', 'Status', enums.CUSTOMER_STATUS, true)
            ]),
            f.section('Credit & Status', [
                ...f.money('creditLimit', 'Credit Limit')
            ]),
            f.section('Customer Contacts', [
                ...f.inlineTable('customerContacts', 'Customer Contacts', [
                    { key: 'contactId', label: 'Contact ID', hidden: true },
                    { key: 'firstName', label: 'First Name', type: 'text', required: true },
                    { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'email', label: 'Email', type: 'text' },
                    { key: 'phone', label: 'Phone', type: 'text' },
                    { key: 'isPrimary', label: 'Primary', type: 'checkbox' }
                ])
            ])
        ]),

        SalesInvoice: f.form('Sales Invoice', [
            f.section('Invoice Details', [
                ...f.text('invoiceNumber', 'Invoice Number', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder'),
                ...f.reference('deliveryOrderId', 'Delivery Order', 'SalesDeliveryOrder'),
                ...f.select('status', 'Status', enums.INVOICE_STATUS, true)
            ]),
            f.section('Dates & Amount', [
                ...f.date('invoiceDate', 'Invoice Date', true),
                ...f.date('dueDate', 'Due Date', true),
                ...f.money('totalAmount', 'Total Amount')
            ]),
            f.section('Invoice Lines', [
                ...f.inlineTable('lines', 'Invoice Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'accountId', label: 'GL Account', type: 'reference', lookupModel: 'Account' },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                    { key: 'lineAmount', label: 'Amount', type: 'money' },
                    { key: 'taxAmount', label: 'Tax', type: 'money' }
                ])
            ])
        ]),

        CustomerPayment: f.form('Customer Payment', [
            f.section('Payment Details', [
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('paymentMethod', 'Payment Method', enums.PAYMENT_METHOD, true),
                ...f.select('status', 'Status', enums.PAYMENT_STATUS, true)
            ]),
            f.section('Amount & Date', [
                ...f.date('paymentDate', 'Payment Date', true),
                ...f.money('amount', 'Amount', true)
            ]),
            f.section('Allocations', [
                ...f.inlineTable('allocations', 'Payment Allocations', [
                    { key: 'allocationId', label: 'Allocation ID', hidden: true },
                    { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'SalesInvoice', required: true },
                    { key: 'allocatedAmount', label: 'Allocated', type: 'money', required: true },
                    { key: 'discountTaken', label: 'Discount', type: 'money' }
                ])
            ]),
            f.section('Applications', [
                ...f.inlineTable('applications', 'Payment Applications', [
                    { key: 'applicationId', label: 'Application ID', hidden: true },
                    { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'SalesInvoice', required: true },
                    { key: 'appliedAmount', label: 'Applied', type: 'money', required: true },
                    { key: 'discountTaken', label: 'Discount', type: 'money' }
                ])
            ])
        ]),

        CreditMemo: f.form('Credit Memo', [
            f.section('Memo Details', [
                ...f.text('memoNumber', 'Memo Number', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('status', 'Status', enums.CREDIT_MEMO_STATUS, true)
            ]),
            f.section('Amount & Date', [
                ...f.date('memoDate', 'Memo Date', true),
                ...f.money('amount', 'Amount', true)
            ])
        ]),

        DunningLetter: f.form('Dunning Letter', [
            f.section('Letter Details', [
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.date('letterDate', 'Letter Date', true),
                ...f.select('dunningLevel', 'Dunning Level', enums.DUNNING_LEVEL, true),
                ...f.money('totalOverdue', 'Total Overdue')
            ])
        ])
    };

    window.AccountsReceivable.primaryKeys = {
        Customer: 'customerId',
        SalesInvoice: 'invoiceId',
        CustomerPayment: 'paymentId',
        CreditMemo: 'creditMemoId',
        DunningLetter: 'letterId'
    };

})();
