/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile Cash Management Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobileCashManagement = window.MobileCashManagement || {};

    const f = window.Layer8FormFactory;
    const enums = MobileCashManagement.enums;

    MobileCashManagement.forms = {
        BankAccount: f.form('Bank Account', [
            f.section('Account Information', [
                ...f.text('accountName', 'Account Name', true),
                ...f.text('bankName', 'Bank Name', true),
                ...f.select('accountType', 'Account Type', enums.BANK_ACCOUNT_TYPE, true),
                ...f.select('status', 'Status', enums.BANK_ACCOUNT_STATUS, true)
            ]),
            f.section('Balance', [
                ...f.money('currentBalance', 'Current Balance')
            ])
        ]),

        BankTransaction: f.form('Bank Transaction', [
            f.section('Transaction Details', [
                ...f.reference('bankAccountId', 'Bank Account', 'BankAccount', true),
                ...f.date('transactionDate', 'Transaction Date', true),
                ...f.select('transactionType', 'Transaction Type', enums.TRANSACTION_TYPE, true),
                ...f.money('amount', 'Amount', true),
                ...f.text('description', 'Description')
            ])
        ]),

        BankReconciliation: f.form('Bank Reconciliation', [
            f.section('Reconciliation Details', [
                ...f.reference('bankAccountId', 'Bank Account', 'BankAccount', true),
                ...f.date('statementDate', 'Statement Date', true),
                ...f.select('status', 'Status', enums.RECONCILIATION_STATUS, true)
            ]),
            f.section('Balances', [
                ...f.money('statementBalance', 'Statement Balance', true),
                ...f.money('bookBalance', 'Book Balance', true)
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

})();
