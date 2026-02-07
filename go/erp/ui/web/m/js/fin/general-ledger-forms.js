/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile General Ledger Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobileGeneralLedger = window.MobileGeneralLedger || {};

    const f = window.Layer8FormFactory;
    const enums = MobileGeneralLedger.enums;

    MobileGeneralLedger.forms = {
        Account: f.form('Account', [
            f.section('Account Information', [
                ...f.text('accountNumber', 'Account Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('accountType', 'Account Type', enums.ACCOUNT_TYPE, true),
                ...f.select('normalBalance', 'Normal Balance', enums.BALANCE_TYPE),
                ...f.reference('parentAccountId', 'Parent Account', 'Account'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        JournalEntry: f.form('Journal Entry', [
            f.section('Entry Details', [
                ...f.text('entryNumber', 'Entry Number', true),
                ...f.date('entryDate', 'Entry Date', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.JOURNAL_ENTRY_STATUS),
                ...f.reference('fiscalPeriodId', 'Fiscal Period', 'FiscalPeriod'),
                ...f.text('reference', 'Reference')
            ])
        ]),

        JournalEntryLine: f.form('Journal Entry Line', [
            f.section('Line Details', [
                ...f.reference('journalEntryId', 'Journal Entry', 'JournalEntry', true),
                ...f.reference('accountId', 'Account', 'Account', true),
                ...f.money('debitAmount', 'Debit Amount'),
                ...f.money('creditAmount', 'Credit Amount'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        FiscalYear: f.form('Fiscal Year', [
            f.section('Year Details', [
                ...f.text('yearName', 'Year Name', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.checkbox('isClosed', 'Closed')
            ])
        ]),

        FiscalPeriod: f.form('Fiscal Period', [
            f.section('Period Details', [
                ...f.text('periodName', 'Period Name', true),
                ...f.reference('fiscalYearId', 'Fiscal Year', 'FiscalYear', true),
                ...f.number('periodNumber', 'Period Number', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.select('status', 'Status', enums.FISCAL_PERIOD_STATUS)
            ])
        ]),

        Currency: f.form('Currency', [
            f.section('Currency Details', [
                ...f.text('code', 'Currency Code', true),
                ...f.text('name', 'Name', true),
                ...f.text('symbol', 'Symbol'),
                ...f.number('decimalPlaces', 'Decimal Places'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        ExchangeRate: f.form('Exchange Rate', [
            f.section('Rate Details', [
                ...f.reference('fromCurrencyId', 'From Currency', 'Currency', true),
                ...f.reference('toCurrencyId', 'To Currency', 'Currency', true),
                ...f.number('rate', 'Rate', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('endDate', 'End Date')
            ])
        ]),

        AccountBalance: f.form('Account Balance', [
            f.section('Balance Details', [
                ...f.reference('accountId', 'Account', 'Account', true),
                ...f.reference('fiscalPeriodId', 'Fiscal Period', 'FiscalPeriod', true),
                ...f.money('periodDebit', 'Period Debit'),
                ...f.money('periodCredit', 'Period Credit')
            ])
        ])
    };

})();
