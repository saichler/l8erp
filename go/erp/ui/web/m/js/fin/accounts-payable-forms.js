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
            ]),
            f.section('Contacts', [
                ...f.inlineTable('vendorContacts', 'Vendor Contacts', [
                    { key: 'contactId', label: 'Contact ID', hidden: true },
                    { key: 'firstName', label: 'First Name', type: 'text' },
                    { key: 'lastName', label: 'Last Name', type: 'text' },
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'email', label: 'Email', type: 'text' },
                    { key: 'phone', label: 'Phone', type: 'text' },
                    { key: 'isPrimary', label: 'Primary', type: 'checkbox' }
                ])
            ]),
            f.section('Withholding Tax', [
                ...f.inlineTable('withholdingTaxConfigs', 'Withholding Tax Configs', [
                    { key: 'configId', label: 'Config ID', hidden: true },
                    { key: 'taxCodeId', label: 'Tax Code', type: 'text' },
                    { key: 'withholdingRate', label: 'Rate (%)', type: 'number' },
                    { key: 'thresholdAmount', label: 'Threshold', type: 'money' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
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
            ]),
            f.section('Lines', [
                ...f.inlineTable('lines', 'Invoice Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'accountId', label: 'GL Account', type: 'text' },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'quantity', label: 'Quantity', type: 'number' },
                    { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                    { key: 'lineAmount', label: 'Line Amount', type: 'money' }
                ])
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
                ...f.reference('bankAccountId', 'Bank Account', 'BankAccount'),
                ...f.text('reference', 'Reference'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Allocations', [
                ...f.inlineTable('allocations', 'Payment Allocations', [
                    { key: 'allocationId', label: 'Allocation ID', hidden: true },
                    { key: 'invoiceId', label: 'Invoice', type: 'text' },
                    { key: 'allocatedAmount', label: 'Allocated Amount', type: 'money' }
                ])
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
