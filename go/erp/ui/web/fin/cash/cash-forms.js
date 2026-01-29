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
// Cash Management Module - Form Definitions
// Part 3 of 4 - Load after cash-columns.js

(function() {
    'use strict';

    // Get enums from cash-enums.js
    const enums = window.CashManagement.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const CASH_FORMS = {
        BankAccount: {
            title: 'Bank Account',
            sections: [
                {
                    title: 'Account Information',
                    fields: [
                        { key: 'accountName', label: 'Account Name', type: 'text', required: true },
                        { key: 'bankName', label: 'Bank Name', type: 'text', required: true },
                        { key: 'accountType', label: 'Account Type', type: 'select', options: enums.BANK_ACCOUNT_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.BANK_ACCOUNT_STATUS, required: true }
                    ]
                },
                {
                    title: 'Balance',
                    fields: [
                        { key: 'currentBalance', label: 'Current Balance', type: 'number' }
                    ]
                }
            ]
        },

        BankTransaction: {
            title: 'Bank Transaction',
            sections: [
                {
                    title: 'Transaction Details',
                    fields: [
                        { key: 'bankAccountId', label: 'Bank Account', type: 'reference', lookupModel: 'BankAccount', required: true },
                        { key: 'transactionDate', label: 'Transaction Date', type: 'date', required: true },
                        { key: 'transactionType', label: 'Transaction Type', type: 'select', options: enums.TRANSACTION_TYPE, required: true },
                        { key: 'amount', label: 'Amount', type: 'number', required: true },
                        { key: 'description', label: 'Description', type: 'text' }
                    ]
                }
            ]
        },

        BankReconciliation: {
            title: 'Bank Reconciliation',
            sections: [
                {
                    title: 'Reconciliation Details',
                    fields: [
                        { key: 'bankAccountId', label: 'Bank Account', type: 'reference', lookupModel: 'BankAccount', required: true },
                        { key: 'reconciliationDate', label: 'Reconciliation Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.RECONCILIATION_STATUS, required: true }
                    ]
                },
                {
                    title: 'Balances',
                    fields: [
                        { key: 'statementBalance', label: 'Statement Balance', type: 'number', required: true },
                        { key: 'bookBalance', label: 'Book Balance', type: 'number', required: true }
                    ]
                }
            ]
        },

        CashForecast: {
            title: 'Cash Forecast',
            sections: [
                {
                    title: 'Forecast Details',
                    fields: [
                        { key: 'forecastDate', label: 'Forecast Date', type: 'date', required: true },
                        { key: 'projectedInflow', label: 'Projected Inflow', type: 'number', required: true },
                        { key: 'projectedOutflow', label: 'Projected Outflow', type: 'number', required: true },
                        { key: 'netCashFlow', label: 'Net Cash Flow', type: 'number' }
                    ]
                }
            ]
        },

        FundTransfer: {
            title: 'Fund Transfer',
            sections: [
                {
                    title: 'Transfer Details',
                    fields: [
                        { key: 'fromAccountId', label: 'From Account', type: 'reference', lookupModel: 'BankAccount', required: true },
                        { key: 'toAccountId', label: 'To Account', type: 'reference', lookupModel: 'BankAccount', required: true },
                        { key: 'amount', label: 'Amount', type: 'number', required: true },
                        { key: 'transferDate', label: 'Transfer Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TRANSFER_STATUS, required: true }
                    ]
                }
            ]
        },

        PettyCash: {
            title: 'Petty Cash',
            sections: [
                {
                    title: 'Fund Details',
                    fields: [
                        { key: 'custodianName', label: 'Custodian Name', type: 'text', required: true },
                        { key: 'fundAmount', label: 'Fund Amount', type: 'number', required: true },
                        { key: 'currentBalance', label: 'Current Balance', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    const CASH_PRIMARY_KEYS = {
        BankAccount: 'bankAccountId',
        BankTransaction: 'transactionId',
        BankReconciliation: 'reconciliationId',
        CashForecast: 'forecastId',
        FundTransfer: 'transferId',
        PettyCash: 'pettyCashId'
    };

    // ============================================================================
    // EXPORT FORMS TO NAMESPACE
    // ============================================================================

    window.CashManagement.forms = CASH_FORMS;
    window.CashManagement.primaryKeys = CASH_PRIMARY_KEYS;

})();
