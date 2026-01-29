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
// General Ledger Module - Form Definitions
// Form field configurations for all General Ledger models

(function() {
    'use strict';

    // Ensure GeneralLedger namespace exists
    window.GeneralLedger = window.GeneralLedger || {};

    const enums = GeneralLedger.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    GeneralLedger.forms = {
        Account: {
            title: 'Account',
            sections: [
                {
                    title: 'Account Information',
                    fields: [
                        { key: 'accountNumber', label: 'Account Number', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'accountType', label: 'Account Type', type: 'select', options: enums.ACCOUNT_TYPE, required: true },
                        { key: 'normalBalance', label: 'Normal Balance', type: 'select', options: enums.BALANCE_TYPE },
                        { key: 'parentAccountId', label: 'Parent Account', type: 'reference', lookupModel: 'Account' },
                        { key: 'currencyId', label: 'Currency', type: 'reference', lookupModel: 'Currency' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        JournalEntry: {
            title: 'Journal Entry',
            sections: [
                {
                    title: 'Entry Details',
                    fields: [
                        { key: 'entryNumber', label: 'Entry Number', type: 'text', required: true },
                        { key: 'entryDate', label: 'Entry Date', type: 'date', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.JOURNAL_ENTRY_STATUS },
                        { key: 'fiscalPeriodId', label: 'Fiscal Period', type: 'reference', lookupModel: 'FiscalPeriod' },
                        { key: 'reference', label: 'Reference', type: 'text' }
                    ]
                }
            ]
        },

        JournalEntryLine: {
            title: 'Journal Entry Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'journalEntryId', label: 'Journal Entry', type: 'reference', lookupModel: 'JournalEntry', required: true },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'Account', required: true },
                        { key: 'debitAmount', label: 'Debit Amount', type: 'currency' },
                        { key: 'creditAmount', label: 'Credit Amount', type: 'currency' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        FiscalYear: {
            title: 'Fiscal Year',
            sections: [
                {
                    title: 'Year Details',
                    fields: [
                        { key: 'yearName', label: 'Year Name', type: 'text', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'isClosed', label: 'Closed', type: 'checkbox' }
                    ]
                }
            ]
        },

        FiscalPeriod: {
            title: 'Fiscal Period',
            sections: [
                {
                    title: 'Period Details',
                    fields: [
                        { key: 'periodName', label: 'Period Name', type: 'text', required: true },
                        { key: 'fiscalYearId', label: 'Fiscal Year', type: 'reference', lookupModel: 'FiscalYear', required: true },
                        { key: 'periodNumber', label: 'Period Number', type: 'number', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.FISCAL_PERIOD_STATUS }
                    ]
                }
            ]
        },

        Currency: {
            title: 'Currency',
            sections: [
                {
                    title: 'Currency Details',
                    fields: [
                        { key: 'code', label: 'Currency Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'symbol', label: 'Symbol', type: 'text' },
                        { key: 'decimalPlaces', label: 'Decimal Places', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        ExchangeRate: {
            title: 'Exchange Rate',
            sections: [
                {
                    title: 'Rate Details',
                    fields: [
                        { key: 'sourceCurrencyId', label: 'Source Currency', type: 'reference', lookupModel: 'Currency', required: true },
                        { key: 'targetCurrencyId', label: 'Target Currency', type: 'reference', lookupModel: 'Currency', required: true },
                        { key: 'rate', label: 'Rate', type: 'number', required: true },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' }
                    ]
                }
            ]
        },

        AccountBalance: {
            title: 'Account Balance',
            sections: [
                {
                    title: 'Balance Details',
                    fields: [
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'Account', required: true },
                        { key: 'fiscalPeriodId', label: 'Fiscal Period', type: 'reference', lookupModel: 'FiscalPeriod', required: true },
                        { key: 'debitBalance', label: 'Debit Balance', type: 'currency' },
                        { key: 'creditBalance', label: 'Credit Balance', type: 'currency' },
                        { key: 'netBalance', label: 'Net Balance', type: 'currency' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    GeneralLedger.primaryKeys = {
        Account: 'accountId',
        JournalEntry: 'journalEntryId',
        JournalEntryLine: 'lineId',
        FiscalYear: 'fiscalYearId',
        FiscalPeriod: 'fiscalPeriodId',
        Currency: 'currencyId',
        ExchangeRate: 'exchangeRateId',
        AccountBalance: 'balanceId'
    };

})();
