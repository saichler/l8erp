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
            ]),
            f.section('Balances', [
                ...f.inlineTable('balances', 'Account Balances', [
                    { key: 'balanceId', label: 'Balance ID', hidden: true },
                    { key: 'fiscalPeriodId', label: 'Fiscal Period', type: 'text' },
                    { key: 'periodDebit', label: 'Period Debit', type: 'money' },
                    { key: 'periodCredit', label: 'Period Credit', type: 'money' }
                ])
            ])
        ]),

        JournalEntry: f.form('Journal Entry', [
            f.section('Entry Details', [
                ...f.text('entryNumber', 'Entry Number', true),
                ...f.date('entryDate', 'Entry Date', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.JOURNAL_ENTRY_STATUS),
                ...f.reference('fiscalPeriodId', 'Fiscal Period', 'FiscalYear'),
                ...f.text('reference', 'Reference')
            ]),
            f.section('Lines', [
                ...f.inlineTable('lines', 'Journal Entry Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'accountId', label: 'Account', type: 'text' },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'debitAmount', label: 'Debit', type: 'money' },
                    { key: 'creditAmount', label: 'Credit', type: 'money' }
                ])
            ])
        ]),

        FiscalYear: f.form('Fiscal Year', [
            f.section('Year Details', [
                ...f.text('yearName', 'Year Name', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.checkbox('isClosed', 'Closed')
            ]),
            f.section('Periods', [
                ...f.inlineTable('periods', 'Fiscal Periods', [
                    { key: 'fiscalPeriodId', label: 'Period ID', hidden: true },
                    { key: 'periodName', label: 'Period Name', type: 'text' },
                    { key: 'periodNumber', label: 'Period #', type: 'number' },
                    { key: 'startDate', label: 'Start Date', type: 'date' },
                    { key: 'endDate', label: 'End Date', type: 'date' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.FISCAL_PERIOD_STATUS }
                ])
            ]),
            f.section('Tax Returns', [
                ...f.inlineTable('returns', 'Tax Returns', [
                    { key: 'returnId', label: 'Return ID', hidden: true },
                    { key: 'taxType', label: 'Tax Type', type: 'text' },
                    { key: 'dueDate', label: 'Due Date', type: 'date' },
                    { key: 'taxAmount', label: 'Tax Amount', type: 'money' },
                    { key: 'status', label: 'Status', type: 'text' }
                ])
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
        ])
    };

})();
