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
                ...f.select('status', 'Status', enums.BANK_ACCOUNT_STATUS, true),
                ...f.text('accountNumberMasked', 'Account Number Masked'),
                ...f.text('routingNumber', 'Routing Number'),
                ...f.text('swiftCode', 'Swift Code'),
                ...f.text('iban', 'Iban'),
                ...f.text('currencyId', 'Currency'),
                ...f.text('glAccountId', 'Gl Account'),
                ...f.date('lastReconciledDate', 'Last Reconciled Date'),
                ...f.text('notes', 'Notes'),
            ]),
            f.section('Balance', [
                ...f.money('currentBalance', 'Current Balance')
            ]),
            f.section('Transactions', [
                ...f.inlineTable('transactions', 'Bank Transactions', [
                    { key: 'transactionId', label: 'Transaction ID', hidden: true },
                    { key: 'transactionDate', label: 'Date', type: 'date' },
                    { key: 'transactionType', label: 'Type', type: 'select', options: enums.TRANSACTION_TYPE },
                    { key: 'amount', label: 'Amount', type: 'money' },
                    { key: 'description', label: 'Description', type: 'text' }
                ])
            ]),
            f.section('Reconciliations', [
                ...f.inlineTable('reconciliations', 'Bank Reconciliations', [
                    { key: 'reconciliationId', label: 'Reconciliation ID', hidden: true },
                    { key: 'statementDate', label: 'Statement Date', type: 'date' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.RECONCILIATION_STATUS },
                    { key: 'statementBalance', label: 'Statement Balance', type: 'money' },
                    { key: 'bookBalance', label: 'Book Balance', type: 'money' }
                ])
            ])
        ]),

        CashForecast: f.form('Cash Forecast', [
            f.section('Forecast Details', [
                ...f.date('forecastDate', 'Forecast Date', true),
                ...f.money('projectedInflows', 'Projected Inflow', true),
                ...f.money('projectedOutflows', 'Projected Outflow', true),
                ...f.money('netCashFlow', 'Net Cash Flow'),
                ...f.text('forecastName', 'Forecast Name'),
                ...f.number('periodStart', 'Period Start'),
                ...f.number('periodEnd', 'Period End'),
                ...f.money('openingBalance', 'Opening Balance'),
                ...f.money('closingBalance', 'Closing Balance'),
                ...f.text('notes', 'Notes'),
            ])
        ]),

        FundTransfer: f.form('Fund Transfer', [
            f.section('Transfer Details', [
                ...f.reference('fromBankAccountId', 'From Account', 'BankAccount', true),
                ...f.reference('toBankAccountId', 'To Account', 'BankAccount', true),
                ...f.money('amount', 'Amount', true),
                ...f.date('transferDate', 'Transfer Date', true),
                ...f.select('status', 'Status', enums.TRANSFER_STATUS, true),
                ...f.date('valueDate', 'Value Date'),
                ...f.text('reference', 'Reference'),
                ...f.text('notes', 'Notes'),
            ])
        ]),

        PettyCash: f.form('Petty Cash', [
            f.section('Fund Details', [
                ...f.text('fundName', 'Fund Name', true),
                ...f.money('fundLimit', 'Fund Limit', true),
                ...f.money('currentBalance', 'Current Balance'),
                ...f.checkbox('isActive', 'Active'),
                ...f.text('custodianEmployeeId', 'Custodian Employee'),
                ...f.date('lastReplenishedDate', 'Last Replenished Date'),
                ...f.text('notes', 'Notes'),
            ])
        ])
    };

})();
