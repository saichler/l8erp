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
// Budgeting Module - Column Configurations
// Table column definitions for all Budgeting models

(function() {
    'use strict';

    // Ensure Budgeting namespace exists
    window.Budgeting = window.Budgeting || {};

    const { renderBoolean, renderDate, renderMoney } = ERPRenderers;
    const enums = Budgeting.enums;
    const render = Budgeting.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    Budgeting.columns = {
        Budget: [
            { key: 'budgetId', label: 'ID', sortKey: 'budgetId', filterKey: 'budgetId' },
            { key: 'budgetName', label: 'Budget Name', sortKey: 'budgetName', filterKey: 'budgetName' },
            {
                key: 'budgetType',
                label: 'Type',
                sortKey: 'budgetType',
                render: (item) => render.budgetType(item.budgetType)
            },
            { key: 'fiscalYearId', label: 'Fiscal Year', sortKey: 'fiscalYearId', filterKey: 'fiscalYearId' },
            {
                key: 'totalAmount',
                label: 'Total Amount',
                sortKey: 'totalAmount',
                render: (item) => renderMoney(item.totalAmount)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.budgetStatus(item.status)
            }
        ],

        BudgetLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'budgetId', label: 'Budget', sortKey: 'budgetId', filterKey: 'budgetId' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            {
                key: 'budgetedAmount',
                label: 'Budgeted',
                sortKey: 'budgetedAmount',
                render: (item) => renderMoney(item.budgetedAmount)
            },
            {
                key: 'actualAmount',
                label: 'Actual',
                sortKey: 'actualAmount',
                render: (item) => renderMoney(item.actualAmount)
            },
            {
                key: 'variance',
                label: 'Variance',
                sortKey: 'variance',
                render: (item) => renderMoney(item.variance)
            }
        ],

        BudgetTransfer: [
            { key: 'transferId', label: 'ID', sortKey: 'transferId', filterKey: 'transferId' },
            { key: 'fromBudgetLineId', label: 'From Line', sortKey: 'fromBudgetLineId', filterKey: 'fromBudgetLineId' },
            { key: 'toBudgetLineId', label: 'To Line', sortKey: 'toBudgetLineId', filterKey: 'toBudgetLineId' },
            {
                key: 'amount',
                label: 'Amount',
                sortKey: 'amount',
                render: (item) => renderMoney(item.amount)
            },
            {
                key: 'transferDate',
                label: 'Transfer Date',
                sortKey: 'transferDate',
                render: (item) => renderDate(item.transferDate)
            }
        ],

        BudgetScenario: [
            { key: 'scenarioId', label: 'ID', sortKey: 'scenarioId', filterKey: 'scenarioId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'budgetId', label: 'Budget', sortKey: 'budgetId', filterKey: 'budgetId' },
            {
                key: 'isBaseline',
                label: 'Baseline',
                sortKey: 'isBaseline',
                render: (item) => renderBoolean(item.isBaseline)
            }
        ],

        CapitalExpenditure: [
            { key: 'capexId', label: 'ID', sortKey: 'capexId', filterKey: 'capexId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            {
                key: 'requestedAmount',
                label: 'Requested',
                sortKey: 'requestedAmount',
                render: (item) => renderMoney(item.requestedAmount)
            },
            {
                key: 'approvedAmount',
                label: 'Approved',
                sortKey: 'approvedAmount',
                render: (item) => renderMoney(item.approvedAmount)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.capexStatus(item.status)
            }
        ],

        Forecast: [
            { key: 'forecastId', label: 'ID', sortKey: 'forecastId', filterKey: 'forecastId' },
            {
                key: 'forecastType',
                label: 'Type',
                sortKey: 'forecastType',
                render: (item) => render.forecastType(item.forecastType)
            },
            {
                key: 'periodStart',
                label: 'Period Start',
                sortKey: 'periodStart',
                render: (item) => renderDate(item.periodStart)
            },
            {
                key: 'periodEnd',
                label: 'Period End',
                sortKey: 'periodEnd',
                render: (item) => renderDate(item.periodEnd)
            },
            {
                key: 'forecastAmount',
                label: 'Forecast',
                sortKey: 'forecastAmount',
                render: (item) => renderMoney(item.forecastAmount)
            },
            {
                key: 'actualAmount',
                label: 'Actual',
                sortKey: 'actualAmount',
                render: (item) => renderMoney(item.actualAmount)
            }
        ]
    };

})();
