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
 * Mobile Cash Management Module - Column Configurations
 * Desktop Equivalent: fin/cash/cash-columns.js
 */
(function() {
    'use strict';

    const render = MobileCashManagement.render;

    MobileCashManagement.columns = {
        BankAccount: [
            { key: 'bankAccountId', label: 'ID', sortKey: 'bankAccountId', filterKey: 'bankAccountId' },
            { key: 'accountName', label: 'Account Name', sortKey: 'accountName', filterKey: 'accountName' },
            { key: 'bankName', label: 'Bank Name', sortKey: 'bankName', filterKey: 'bankName' },
            { key: 'accountType', label: 'Type', sortKey: 'accountType', render: (item) => render.bankAccountType(item.accountType) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.bankAccountStatus(item.status) },
            { key: 'currentBalance', label: 'Current Balance', sortKey: 'currentBalance', render: (item) => Layer8MRenderers.renderMoney(item.currentBalance) }
        ],

        BankTransaction: [
            { key: 'transactionId', label: 'ID', sortKey: 'transactionId', filterKey: 'transactionId' },
            { key: 'bankAccountId', label: 'Account', sortKey: 'bankAccountId', filterKey: 'bankAccountId' },
            { key: 'transactionDate', label: 'Date', sortKey: 'transactionDate', render: (item) => Layer8MRenderers.renderDate(item.transactionDate) },
            { key: 'transactionType', label: 'Type', sortKey: 'transactionType', render: (item) => render.transactionType(item.transactionType) },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => Layer8MRenderers.renderMoney(item.amount) },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' }
        ],

        BankReconciliation: [
            { key: 'reconciliationId', label: 'ID', sortKey: 'reconciliationId', filterKey: 'reconciliationId' },
            { key: 'bankAccountId', label: 'Account', sortKey: 'bankAccountId', filterKey: 'bankAccountId' },
            { key: 'statementDate', label: 'Statement Date', sortKey: 'statementDate', render: (item) => Layer8MRenderers.renderDate(item.statementDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.reconciliationStatus(item.status) },
            { key: 'statementBalance', label: 'Statement Balance', sortKey: 'statementBalance', render: (item) => Layer8MRenderers.renderMoney(item.statementBalance) },
            { key: 'bookBalance', label: 'Book Balance', sortKey: 'bookBalance', render: (item) => Layer8MRenderers.renderMoney(item.bookBalance) }
        ],

        CashForecast: [
            { key: 'forecastId', label: 'ID', sortKey: 'forecastId', filterKey: 'forecastId' },
            { key: 'forecastDate', label: 'Forecast Date', sortKey: 'forecastDate', render: (item) => Layer8MRenderers.renderDate(item.forecastDate) },
            { key: 'projectedInflows', label: 'Projected Inflow', sortKey: 'projectedInflows', render: (item) => Layer8MRenderers.renderMoney(item.projectedInflows) },
            { key: 'projectedOutflows', label: 'Projected Outflow', sortKey: 'projectedOutflows', render: (item) => Layer8MRenderers.renderMoney(item.projectedOutflows) },
            { key: 'netCashFlow', label: 'Net Cash Flow', sortKey: 'netCashFlow', render: (item) => Layer8MRenderers.renderMoney(item.netCashFlow) }
        ],

        FundTransfer: [
            { key: 'transferId', label: 'ID', sortKey: 'transferId', filterKey: 'transferId' },
            { key: 'fromBankAccountId', label: 'From Account', sortKey: 'fromBankAccountId', filterKey: 'fromBankAccountId' },
            { key: 'toBankAccountId', label: 'To Account', sortKey: 'toBankAccountId', filterKey: 'toBankAccountId' },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => Layer8MRenderers.renderMoney(item.amount) },
            { key: 'transferDate', label: 'Transfer Date', sortKey: 'transferDate', render: (item) => Layer8MRenderers.renderDate(item.transferDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.transferStatus(item.status) }
        ],

        PettyCash: [
            { key: 'pettyCashId', label: 'ID', sortKey: 'pettyCashId', filterKey: 'pettyCashId' },
            { key: 'fundName', label: 'Fund Name', sortKey: 'fundName', filterKey: 'fundName' },
            { key: 'fundLimit', label: 'Fund Limit', sortKey: 'fundLimit', render: (item) => Layer8MRenderers.renderMoney(item.fundLimit) },
            { key: 'currentBalance', label: 'Current Balance', sortKey: 'currentBalance', render: (item) => Layer8MRenderers.renderMoney(item.currentBalance) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ]
    };

    MobileCashManagement.primaryKeys = {
        BankAccount: 'bankAccountId', BankTransaction: 'transactionId',
        BankReconciliation: 'reconciliationId', CashForecast: 'forecastId',
        FundTransfer: 'transferId', PettyCash: 'pettyCashId'
    };

})();
