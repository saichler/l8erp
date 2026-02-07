/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile Accounts Payable Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobileAccountsPayable = window.MobileAccountsPayable || {};

    const f = window.Layer8FormFactory;
    const enums = MobileAccountsPayable.enums;

    MobileAccountsPayable.forms = {
        Vendor: f.form('Vendor', [
            f.section('Vendor Information', [
                ...f.text('vendorNumber', 'Vendor Number', true),
                ...f.text('name', 'Name', true),
                ...f.text('legalName', 'Legal Name'),
                ...f.text('taxId', 'Tax ID'),
                ...f.select('status', 'Status', enums.VENDOR_STATUS, true),
                ...f.number('paymentTermDays', 'Payment Term Days'),
                ...f.select('preferredPaymentMethod', 'Preferred Payment Method', enums.PAYMENT_METHOD),
                ...f.reference('defaultAccountId', 'Default GL Account', 'Account'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.url('website', 'Website'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        VendorContact: f.form('Vendor Contact', [
            f.section('Contact Information', [
                ...f.reference('vendorId', 'Vendor', 'Vendor', true),
                ...f.text('firstName', 'First Name', true),
                ...f.text('lastName', 'Last Name', true),
                ...f.text('title', 'Title'),
                ...f.text('email', 'Email'),
                ...f.text('phone', 'Phone'),
                ...f.checkbox('isPrimary', 'Primary Contact')
            ])
        ]),

        PurchaseInvoice: f.form('Purchase Invoice', [
            f.section('Invoice Details', [
                ...f.text('invoiceNumber', 'Invoice Number', true),
                ...f.reference('vendorId', 'Vendor', 'Vendor', true),
                ...f.date('invoiceDate', 'Invoice Date', true),
                ...f.date('dueDate', 'Due Date', true),
                ...f.textarea('description', 'Description'),
                ...f.money('totalAmount', 'Total Amount'),
                ...f.money('taxAmount', 'Tax Amount'),
                ...f.select('status', 'Status', enums.INVOICE_STATUS),
                ...f.reference('currencyId', 'Currency', 'Currency')
            ])
        ]),

        PurchaseInvoiceLine: f.form('Purchase Invoice Line', [
            f.section('Line Details', [
                ...f.reference('invoiceId', 'Invoice', 'PurchaseInvoice', true),
                ...f.reference('accountId', 'GL Account', 'Account', true),
                ...f.textarea('description', 'Description', true),
                ...f.number('quantity', 'Quantity', true),
                ...f.money('unitPrice', 'Unit Price', true),
                ...f.money('lineAmount', 'Line Amount'),
                ...f.money('taxAmount', 'Tax Amount')
            ])
        ]),

        PaymentSchedule: f.form('Payment Schedule', [
            f.section('Schedule Details', [
                ...f.reference('invoiceId', 'Invoice', 'PurchaseInvoice', true),
                ...f.date('scheduledDate', 'Scheduled Date', true),
                ...f.money('amount', 'Amount', true),
                ...f.checkbox('isPaid', 'Paid'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        VendorPayment: f.form('Vendor Payment', [
            f.section('Payment Details', [
                ...f.reference('vendorId', 'Vendor', 'Vendor', true),
                ...f.date('paymentDate', 'Payment Date', true),
                ...f.money('amount', 'Amount', true),
                ...f.select('paymentMethod', 'Payment Method', enums.PAYMENT_METHOD, true),
                ...f.select('status', 'Status', enums.PAYMENT_STATUS),
                ...f.reference('bankAccountId', 'Bank Account', 'Account'),
                ...f.text('reference', 'Reference'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        PaymentAllocation: f.form('Payment Allocation', [
            f.section('Allocation Details', [
                ...f.reference('paymentId', 'Payment', 'VendorPayment', true),
                ...f.reference('invoiceId', 'Invoice', 'PurchaseInvoice', true),
                ...f.money('allocatedAmount', 'Allocated Amount', true)
            ])
        ]),

        VendorStatement: f.form('Vendor Statement', [
            f.section('Statement Details', [
                ...f.reference('vendorId', 'Vendor', 'Vendor', true),
                ...f.date('statementDate', 'Statement Date', true),
                ...f.date('periodStart', 'Period Start'),
                ...f.date('periodEnd', 'Period End'),
                ...f.money('openingBalance', 'Opening Balance'),
                ...f.money('closingBalance', 'Closing Balance'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
