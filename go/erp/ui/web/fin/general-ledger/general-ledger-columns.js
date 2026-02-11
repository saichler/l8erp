/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// General Ledger Module - Column Configurations
// Uses Layer8ColumnFactory for reduced boilerplate

(function() {
    'use strict';

    window.GeneralLedger = window.GeneralLedger || {};

    const col = window.Layer8ColumnFactory;
    const render = GeneralLedger.render;

    GeneralLedger.columns = {
        Account: [
            ...col.id('accountId'),
            ...col.col('accountNumber', 'Account #'),
            ...col.col('name', 'Name'),
            ...col.enum('accountType', 'Type', null, render.accountType),
            ...col.enum('normalBalance', 'Normal Balance', null, render.balanceType),
            ...col.boolean('isActive', 'Active')
        ],

        JournalEntry: [
            ...col.id('journalEntryId'),
            ...col.col('entryNumber', 'Entry #'),
            ...col.date('entryDate', 'Date'),
            ...col.col('description', 'Description'),
            ...col.enum('status', 'Status', null, render.journalEntryStatus),
            ...col.money('totalAmount', 'Total Amount')
        ],

        FiscalYear: [
            ...col.id('fiscalYearId'),
            ...col.col('yearName', 'Year'),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End'),
            ...col.boolean('isClosed', 'Closed')
        ],

        Currency: [
            ...col.id('currencyId'),
            ...col.basic(['code', 'name']),
            ...col.col('symbol', 'Symbol'),
            ...col.boolean('isActive', 'Active')
        ],

        ExchangeRate: [
            ...col.id('exchangeRateId'),
            ...col.col('fromCurrencyId', 'From'),
            ...col.col('toCurrencyId', 'To'),
            ...col.custom('rate', 'Rate', (item) => item.rate, { sortKey: 'rate' }),
            ...col.date('effectiveDate', 'Effective')
        ]
    };

})();
