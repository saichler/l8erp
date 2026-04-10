/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Lending Payments Module - Form Configurations
 * Desktop Equivalent: lending/payments/payments-forms.js
 */
(function() {
    'use strict';
    window.MobileLendPayments = window.MobileLendPayments || {};
    var f = window.Layer8FormFactory;
    var enums = MobileLendPayments.enums;

    MobileLendPayments.forms = {
        LendPayment: f.form('Payment', [
            f.section('Payment Information', [
                ...f.text('paymentNumber', 'Payment Number'),
                ...f.reference('loanId', 'Loan', 'Loan'),
                ...f.reference('creditLineId', 'Credit Line', 'CreditLine'),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('status', 'Status', enums.PAYMENT_STATUS),
                ...f.money('amount', 'Amount'),
            ]),
            f.section('Payment Details', [
                ...f.date('paymentDate', 'Payment Date'),
                ...f.date('dueDate', 'Due Date'),
                ...f.select('paymentMethod', 'Payment Method', enums.PAYMENT_METHOD),
                ...f.text('referenceNumber', 'Reference Number'),
                ...f.reference('bankAccountId', 'Bank Account', 'BankAccount'),
                ...f.checkbox('isExtraPayment', 'Extra Payment'),
                ...f.checkbox('isLate', 'Late'),
                ...f.money('lateFee', 'Late Fee'),
                ...f.textarea('notes', 'Notes'),
            ]),
            f.section('Allocations', [
                ...f.inlineTable('allocations', 'Payment Allocations', [
                    { key: 'allocationId', label: 'ID', hidden: true },
                    { key: 'allocationType', label: 'Type', type: 'text' },
                    { key: 'amount', label: 'Amount', type: 'money' },
                    { key: 'description', label: 'Description', type: 'text' }
                ])
            ]),
            f.section('Audit', [...f.audit()])
        ]),

        LendCollateral: f.form('Collateral', [
            f.section('Collateral Information', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('collateralType', 'Collateral Type', enums.COLLATERAL_TYPE, true),
                ...f.select('status', 'Status', enums.COLLATERAL_STATUS),
                ...f.reference('loanId', 'Loan', 'Loan'),
                ...f.reference('creditLineId', 'Credit Line', 'CreditLine'),
                ...f.reference('customerId', 'Customer', 'Customer', true),
            ]),
            f.section('Valuation', [
                ...f.money('pledgedValue', 'Pledged Value'),
                ...f.money('currentValue', 'Current Value'),
                ...f.text('serialNumber', 'Serial Number'),
                ...f.text('location', 'Location'),
                ...f.text('insurancePolicy', 'Insurance Policy'),
            ]),
            f.section('Dates', [
                ...f.date('pledgeDate', 'Pledge Date'),
                ...f.date('releaseDate', 'Release Date'),
                ...f.date('lastValuationDate', 'Last Valuation Date'),
                ...f.textarea('notes', 'Notes'),
            ]),
            f.section('Valuation History', [
                ...f.inlineTable('valuations', 'Valuations', [
                    { key: 'valuationId', label: 'ID', hidden: true },
                    { key: 'valuationDate', label: 'Date', type: 'date' },
                    { key: 'valuedAmount', label: 'Value', type: 'money' },
                    { key: 'appraiser', label: 'Appraiser', type: 'text' },
                    { key: 'method', label: 'Method', type: 'text' },
                    { key: 'notes', label: 'Notes', type: 'text' }
                ])
            ]),
            f.section('Audit', [...f.audit()])
        ]),
    };
})();
