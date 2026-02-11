/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Cash Management Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.CashManagement = window.CashManagement || {};

    const f = window.Layer8FormFactory;
    const enums = window.CashManagement.enums;

    CashManagement.forms = {
        BankAccount: f.form('Bank Account', [
            f.section('Account Information', [
                ...f.text('accountName', 'Account Name', true),
                ...f.text('bankName', 'Bank Name', true),
                ...f.select('accountType', 'Account Type', enums.BANK_ACCOUNT_TYPE, true),
                ...f.select('status', 'Status', enums.BANK_ACCOUNT_STATUS, true)
            ]),
            f.section('Balance', [
                ...f.money('currentBalance', 'Current Balance')
            ]),
            f.section('Transactions', [
                ...f.inlineTable('transactions', 'Bank Transactions', [
                    { key: 'transactionId', label: 'Transaction ID', hidden: true },
                    { key: 'transactionDate', label: 'Date', type: 'date', required: true },
                    { key: 'transactionType', label: 'Type', type: 'select', options: enums.TRANSACTION_TYPE },
                    { key: 'amount', label: 'Amount', type: 'money', required: true },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'reference', label: 'Reference', type: 'text' },
                    { key: 'checkNumber', label: 'Check #', type: 'text' },
                    { key: 'isReconciled', label: 'Reconciled', type: 'checkbox' }
                ])
            ]),
            f.section('Reconciliations', [
                ...f.inlineTable('reconciliations', 'Bank Reconciliations', [
                    { key: 'reconciliationId', label: 'Reconciliation ID', hidden: true },
                    { key: 'statementDate', label: 'Statement Date', type: 'date', required: true },
                    { key: 'status', label: 'Status', type: 'select', options: enums.RECONCILIATION_STATUS },
                    { key: 'statementBalance', label: 'Statement Bal', type: 'money' },
                    { key: 'bookBalance', label: 'Book Bal', type: 'money' },
                    { key: 'difference', label: 'Difference', type: 'money' },
                    { key: 'matchedCount', label: 'Matched', type: 'number' },
                    { key: 'unmatchedCount', label: 'Unmatched', type: 'number' }
                ])
            ])
        ]),

        CashForecast: f.form('Cash Forecast', [
            f.section('Forecast Details', [
                ...f.date('forecastDate', 'Forecast Date', true),
                ...f.money('projectedInflows', 'Projected Inflow', true),
                ...f.money('projectedOutflows', 'Projected Outflow', true),
                ...f.money('netCashFlow', 'Net Cash Flow')
            ])
        ]),

        FundTransfer: f.form('Fund Transfer', [
            f.section('Transfer Details', [
                ...f.reference('fromBankAccountId', 'From Account', 'BankAccount', true),
                ...f.reference('toBankAccountId', 'To Account', 'BankAccount', true),
                ...f.money('amount', 'Amount', true),
                ...f.date('transferDate', 'Transfer Date', true),
                ...f.select('status', 'Status', enums.TRANSFER_STATUS, true)
            ])
        ]),

        PettyCash: f.form('Petty Cash', [
            f.section('Fund Details', [
                ...f.text('fundName', 'Fund Name', true),
                ...f.money('fundLimit', 'Fund Limit', true),
                ...f.money('currentBalance', 'Current Balance'),
                ...f.checkbox('isActive', 'Active')
            ])
        ])
    };

    CashManagement.primaryKeys = {
        BankAccount: 'bankAccountId',
        CashForecast: 'forecastId',
        FundTransfer: 'transferId',
        PettyCash: 'pettyCashId'
    };

})();
