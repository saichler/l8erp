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
/**
 * Mobile General Ledger Module - Column Configurations
 * Desktop Equivalent: fin/general-ledger/general-ledger-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileGeneralLedger.enums;
    const render = MobileGeneralLedger.render;

    MobileGeneralLedger.columns = {
        Account: [
            ...col.id('accountId'),
            ...col.col('accountNumber', 'Account #'),
            ...col.col('name', 'Name'),
            ...col.status('accountType', 'Type', enums.ACCOUNT_TYPE_VALUES, render.accountType),
            ...col.enum('normalBalance', 'Normal Balance', null, render.balanceType),
            ...col.boolean('isActive', 'Active')
        ],

        JournalEntry: [
            ...col.id('journalEntryId'),
            ...col.col('entryNumber', 'Entry #'),
            ...col.date('entryDate', 'Date'),
            ...col.col('description', 'Description'),
            ...col.status('status', 'Status', enums.JOURNAL_ENTRY_STATUS_VALUES, render.journalEntryStatus),
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
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('symbol', 'Symbol'),
            ...col.boolean('isActive', 'Active')
        ],

        ExchangeRate: [
            ...col.id('exchangeRateId'),
            ...col.col('fromCurrencyId', 'From'),
            ...col.col('toCurrencyId', 'To'),
            ...col.col('rate', 'Rate'),
            ...col.date('effectiveDate', 'Effective')
        ]
    };

    MobileGeneralLedger.primaryKeys = {
        Account: 'accountId', JournalEntry: 'journalEntryId',
        FiscalYear: 'fiscalYearId', Currency: 'currencyId',
        ExchangeRate: 'exchangeRateId'
    };

})();
