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
            { key: 'currentBalance', label: 'Current Balance', sortKey: 'currentBalance', render: (item) => MobileRenderers.renderMoney(item.currentBalance) }
        ],

        BankTransaction: [
            { key: 'transactionId', label: 'ID', sortKey: 'transactionId', filterKey: 'transactionId' },
            { key: 'bankAccountId', label: 'Account', sortKey: 'bankAccountId', filterKey: 'bankAccountId' },
            { key: 'transactionDate', label: 'Date', sortKey: 'transactionDate', render: (item) => MobileRenderers.renderDate(item.transactionDate) },
            { key: 'transactionType', label: 'Type', sortKey: 'transactionType', render: (item) => render.transactionType(item.transactionType) },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => MobileRenderers.renderMoney(item.amount) },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' }
        ],

        BankReconciliation: [
            { key: 'reconciliationId', label: 'ID', sortKey: 'reconciliationId', filterKey: 'reconciliationId' },
            { key: 'bankAccountId', label: 'Account', sortKey: 'bankAccountId', filterKey: 'bankAccountId' },
            { key: 'reconciliationDate', label: 'Date', sortKey: 'reconciliationDate', render: (item) => MobileRenderers.renderDate(item.reconciliationDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.reconciliationStatus(item.status) },
            { key: 'statementBalance', label: 'Statement Balance', sortKey: 'statementBalance', render: (item) => MobileRenderers.renderMoney(item.statementBalance) },
            { key: 'bookBalance', label: 'Book Balance', sortKey: 'bookBalance', render: (item) => MobileRenderers.renderMoney(item.bookBalance) }
        ],

        CashForecast: [
            { key: 'forecastId', label: 'ID', sortKey: 'forecastId', filterKey: 'forecastId' },
            { key: 'forecastDate', label: 'Forecast Date', sortKey: 'forecastDate', render: (item) => MobileRenderers.renderDate(item.forecastDate) },
            { key: 'projectedInflow', label: 'Projected Inflow', sortKey: 'projectedInflow', render: (item) => MobileRenderers.renderMoney(item.projectedInflow) },
            { key: 'projectedOutflow', label: 'Projected Outflow', sortKey: 'projectedOutflow', render: (item) => MobileRenderers.renderMoney(item.projectedOutflow) },
            { key: 'netCashFlow', label: 'Net Cash Flow', sortKey: 'netCashFlow', render: (item) => MobileRenderers.renderMoney(item.netCashFlow) }
        ],

        FundTransfer: [
            { key: 'transferId', label: 'ID', sortKey: 'transferId', filterKey: 'transferId' },
            { key: 'fromAccountId', label: 'From Account', sortKey: 'fromAccountId', filterKey: 'fromAccountId' },
            { key: 'toAccountId', label: 'To Account', sortKey: 'toAccountId', filterKey: 'toAccountId' },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => MobileRenderers.renderMoney(item.amount) },
            { key: 'transferDate', label: 'Transfer Date', sortKey: 'transferDate', render: (item) => MobileRenderers.renderDate(item.transferDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.transferStatus(item.status) }
        ],

        PettyCash: [
            { key: 'pettyCashId', label: 'ID', sortKey: 'pettyCashId', filterKey: 'pettyCashId' },
            { key: 'custodianName', label: 'Custodian', sortKey: 'custodianName', filterKey: 'custodianName' },
            { key: 'fundAmount', label: 'Fund Amount', sortKey: 'fundAmount', render: (item) => MobileRenderers.renderMoney(item.fundAmount) },
            { key: 'currentBalance', label: 'Current Balance', sortKey: 'currentBalance', render: (item) => MobileRenderers.renderMoney(item.currentBalance) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => MobileRenderers.renderBoolean(item.isActive) }
        ]
    };

    MobileCashManagement.primaryKeys = {
        BankAccount: 'bankAccountId', BankTransaction: 'transactionId',
        BankReconciliation: 'reconciliationId', CashForecast: 'forecastId',
        FundTransfer: 'transferId', PettyCash: 'pettyCashId'
    };

})();
