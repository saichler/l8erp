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

    const col = window.Layer8ColumnFactory;
    const render = MobileCashManagement.render;

    MobileCashManagement.columns = {
        BankAccount: [
            ...col.id('bankAccountId'),
            ...col.col('accountName', 'Account Name'),
            ...col.col('bankName', 'Bank Name'),
            ...col.enum('accountType', 'Type', null, render.bankAccountType),
            ...col.enum('status', 'Status', null, render.bankAccountStatus),
            ...col.money('currentBalance', 'Current Balance')
        ],

        CashForecast: [
            ...col.id('forecastId'),
            ...col.date('forecastDate', 'Forecast Date'),
            ...col.money('projectedInflows', 'Projected Inflow'),
            ...col.money('projectedOutflows', 'Projected Outflow'),
            ...col.money('netCashFlow', 'Net Cash Flow')
        ],

        FundTransfer: [
            ...col.id('transferId'),
            ...col.col('fromBankAccountId', 'From Account'),
            ...col.col('toBankAccountId', 'To Account'),
            ...col.money('amount', 'Amount'),
            ...col.date('transferDate', 'Transfer Date'),
            ...col.enum('status', 'Status', null, render.transferStatus)
        ],

        PettyCash: [
            ...col.id('pettyCashId'),
            ...col.col('fundName', 'Fund Name'),
            ...col.money('fundLimit', 'Fund Limit'),
            ...col.money('currentBalance', 'Current Balance'),
            ...col.boolean('isActive', 'Active')
        ]
    };

    MobileCashManagement.primaryKeys = {
        BankAccount: 'bankAccountId', CashForecast: 'forecastId',
        FundTransfer: 'transferId', PettyCash: 'pettyCashId'
    };

})();
