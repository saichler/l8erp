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
                ...f.number('currentBalance', 'Current Balance')
            ])
        ]),

        BankTransaction: f.form('Bank Transaction', [
            f.section('Transaction Details', [
                ...f.reference('bankAccountId', 'Bank Account', 'BankAccount', true),
                ...f.date('transactionDate', 'Transaction Date', true),
                ...f.select('transactionType', 'Transaction Type', enums.TRANSACTION_TYPE, true),
                ...f.number('amount', 'Amount', true),
                ...f.text('description', 'Description')
            ])
        ]),

        BankReconciliation: f.form('Bank Reconciliation', [
            f.section('Reconciliation Details', [
                ...f.reference('bankAccountId', 'Bank Account', 'BankAccount', true),
                ...f.date('reconciliationDate', 'Reconciliation Date', true),
                ...f.select('status', 'Status', enums.RECONCILIATION_STATUS, true)
            ]),
            f.section('Balances', [
                ...f.number('statementBalance', 'Statement Balance', true),
                ...f.number('bookBalance', 'Book Balance', true)
            ])
        ]),

        CashForecast: f.form('Cash Forecast', [
            f.section('Forecast Details', [
                ...f.date('forecastDate', 'Forecast Date', true),
                ...f.number('projectedInflow', 'Projected Inflow', true),
                ...f.number('projectedOutflow', 'Projected Outflow', true),
                ...f.number('netCashFlow', 'Net Cash Flow')
            ])
        ]),

        FundTransfer: f.form('Fund Transfer', [
            f.section('Transfer Details', [
                ...f.reference('fromAccountId', 'From Account', 'BankAccount', true),
                ...f.reference('toAccountId', 'To Account', 'BankAccount', true),
                ...f.number('amount', 'Amount', true),
                ...f.date('transferDate', 'Transfer Date', true),
                ...f.select('status', 'Status', enums.TRANSFER_STATUS, true)
            ])
        ]),

        PettyCash: f.form('Petty Cash', [
            f.section('Fund Details', [
                ...f.text('custodianName', 'Custodian Name', true),
                ...f.number('fundAmount', 'Fund Amount', true),
                ...f.number('currentBalance', 'Current Balance'),
                ...f.checkbox('isActive', 'Active')
            ])
        ])
    };

})();
