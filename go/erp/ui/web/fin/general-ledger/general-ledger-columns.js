/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// General Ledger Module - Column Configurations
// Table column definitions for all General Ledger models

(function() {
    'use strict';

    // Ensure GeneralLedger namespace exists
    window.GeneralLedger = window.GeneralLedger || {};

    const { renderBoolean, renderDate, renderMoney } = Layer8DRenderers;
    const enums = GeneralLedger.enums;
    const render = GeneralLedger.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    GeneralLedger.columns = {
        Account: [
            { key: 'accountId', label: 'ID', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'accountNumber', label: 'Account #', sortKey: 'accountNumber', filterKey: 'accountNumber' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'accountType',
                label: 'Type',
                sortKey: 'accountType',
                filterKey: 'accountType',
                render: (item) => render.accountType(item.accountType)
            },
            {
                key: 'normalBalance',
                label: 'Normal Balance',
                sortKey: 'normalBalance',
                render: (item) => render.balanceType(item.normalBalance)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        JournalEntry: [
            { key: 'journalEntryId', label: 'ID', sortKey: 'journalEntryId', filterKey: 'journalEntryId' },
            { key: 'entryNumber', label: 'Entry #', sortKey: 'entryNumber', filterKey: 'entryNumber' },
            {
                key: 'entryDate',
                label: 'Date',
                sortKey: 'entryDate',
                render: (item) => renderDate(item.entryDate)
            },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.journalEntryStatus(item.status)
            },
            {
                key: 'totalDebit',
                label: 'Total Debit',
                sortKey: 'totalDebit',
                render: (item) => renderMoney(item.totalDebit)
            }
        ],

        JournalEntryLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'journalEntryId', label: 'Entry ID', sortKey: 'journalEntryId', filterKey: 'journalEntryId' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            {
                key: 'debitAmount',
                label: 'Debit',
                sortKey: 'debitAmount',
                render: (item) => renderMoney(item.debitAmount)
            },
            {
                key: 'creditAmount',
                label: 'Credit',
                sortKey: 'creditAmount',
                render: (item) => renderMoney(item.creditAmount)
            },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' }
        ],

        FiscalYear: [
            { key: 'fiscalYearId', label: 'ID', sortKey: 'fiscalYearId', filterKey: 'fiscalYearId' },
            { key: 'yearName', label: 'Year', sortKey: 'yearName', filterKey: 'yearName' },
            {
                key: 'startDate',
                label: 'Start',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            {
                key: 'isClosed',
                label: 'Closed',
                sortKey: 'isClosed',
                render: (item) => renderBoolean(item.isClosed)
            }
        ],

        FiscalPeriod: [
            { key: 'fiscalPeriodId', label: 'ID', sortKey: 'fiscalPeriodId', filterKey: 'fiscalPeriodId' },
            { key: 'periodName', label: 'Period', sortKey: 'periodName', filterKey: 'periodName' },
            { key: 'fiscalYearId', label: 'Year', sortKey: 'fiscalYearId', filterKey: 'fiscalYearId' },
            {
                key: 'startDate',
                label: 'Start',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.fiscalPeriodStatus(item.status)
            }
        ],

        Currency: [
            { key: 'currencyId', label: 'ID', sortKey: 'currencyId', filterKey: 'currencyId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'symbol', label: 'Symbol', sortKey: 'symbol' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        ExchangeRate: [
            { key: 'exchangeRateId', label: 'ID', sortKey: 'exchangeRateId', filterKey: 'exchangeRateId' },
            { key: 'sourceCurrencyId', label: 'From', sortKey: 'sourceCurrencyId', filterKey: 'sourceCurrencyId' },
            { key: 'targetCurrencyId', label: 'To', sortKey: 'targetCurrencyId', filterKey: 'targetCurrencyId' },
            { key: 'rate', label: 'Rate', sortKey: 'rate' },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            }
        ],

        AccountBalance: [
            { key: 'balanceId', label: 'ID', sortKey: 'balanceId', filterKey: 'balanceId' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'fiscalPeriodId', label: 'Period', sortKey: 'fiscalPeriodId', filterKey: 'fiscalPeriodId' },
            {
                key: 'debitBalance',
                label: 'Debit',
                sortKey: 'debitBalance',
                render: (item) => renderMoney(item.debitBalance)
            },
            {
                key: 'creditBalance',
                label: 'Credit',
                sortKey: 'creditBalance',
                render: (item) => renderMoney(item.creditBalance)
            }
        ]
    };

})();
