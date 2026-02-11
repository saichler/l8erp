/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// General Ledger Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.GeneralLedger = window.GeneralLedger || {};

    const f = window.Layer8FormFactory;
    const enums = GeneralLedger.enums;

    GeneralLedger.forms = {
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
            f.section('Account Balances', [
                ...f.inlineTable('balances', 'Account Balances', [
                    { key: 'balanceId', label: 'Balance ID', hidden: true },
                    { key: 'accountId', label: 'Account', type: 'text', hidden: true },
                    { key: 'fiscalPeriodId', label: 'Fiscal Period', type: 'text' },
                    { key: 'beginningBalance', label: 'Beginning', type: 'money' },
                    { key: 'periodDebit', label: 'Debit', type: 'money' },
                    { key: 'periodCredit', label: 'Credit', type: 'money' },
                    { key: 'endingBalance', label: 'Ending', type: 'money' }
                ])
            ])
        ]),

        JournalEntry: f.form('Journal Entry', [
            f.section('Entry Details', [
                ...f.text('entryNumber', 'Entry Number', true),
                ...f.date('entryDate', 'Entry Date', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.JOURNAL_ENTRY_STATUS),
                ...f.text('reference', 'Reference')
            ]),
            f.section('Entry Lines', [
                ...f.inlineTable('lines', 'Journal Entry Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'Account', required: true },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'debitAmount', label: 'Debit', type: 'money' },
                    { key: 'creditAmount', label: 'Credit', type: 'money' },
                    { key: 'costCenterId', label: 'Cost Center', type: 'text' },
                    { key: 'departmentId', label: 'Department', type: 'text' }
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
            f.section('Fiscal Periods', [
                ...f.inlineTable('periods', 'Fiscal Periods', [
                    { key: 'fiscalPeriodId', label: 'Period ID', hidden: true },
                    { key: 'periodName', label: 'Period Name', type: 'text', required: true },
                    { key: 'periodNumber', label: 'Period #', type: 'number', required: true },
                    { key: 'startDate', label: 'Start', type: 'date', required: true },
                    { key: 'endDate', label: 'End', type: 'date', required: true },
                    { key: 'status', label: 'Status', type: 'select', options: enums.FISCAL_PERIOD_STATUS }
                ])
            ]),
            f.section('Tax Returns', [
                ...f.inlineTable('returns', 'Tax Returns', [
                    { key: 'returnId', label: 'Return ID', hidden: true },
                    { key: 'jurisdictionId', label: 'Jurisdiction', type: 'reference', lookupModel: 'TaxJurisdiction' },
                    { key: 'taxType', label: 'Tax Type', type: 'text' },
                    { key: 'status', label: 'Status', type: 'text' },
                    { key: 'dueDate', label: 'Due Date', type: 'date' },
                    { key: 'taxAmount', label: 'Tax Amount', type: 'money' }
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
                ...f.reference('fromCurrencyId', 'Source Currency', 'Currency', true),
                ...f.reference('toCurrencyId', 'Target Currency', 'Currency', true),
                ...f.number('rate', 'Rate', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('endDate', 'End Date')
            ])
        ])
    };

    GeneralLedger.primaryKeys = {
        Account: 'accountId',
        JournalEntry: 'journalEntryId',
        FiscalYear: 'fiscalYearId',
        Currency: 'currencyId',
        ExchangeRate: 'exchangeRateId'
    };

})();
