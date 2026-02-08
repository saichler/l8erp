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
 * Mobile Budgeting Module - Column Configurations
 * Desktop Equivalent: fin/budgeting/budgeting-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileBudgeting.enums;
    const render = MobileBudgeting.render;

    MobileBudgeting.columns = {
        Budget: [
            ...col.id('budgetId'),
            ...col.col('budgetName', 'Budget Name'),
            ...col.enum('budgetType', 'Type', null, render.budgetType),
            ...col.col('fiscalYearId', 'Fiscal Year'),
            ...col.money('totalAmount', 'Total Amount'),
            ...col.status('status', 'Status', enums.BUDGET_STATUS_VALUES, render.budgetStatus)
        ],

        BudgetLine: [
            ...col.id('lineId'),
            ...col.col('budgetId', 'Budget'),
            ...col.col('accountId', 'Account'),
            ...col.money('budgetedAmount', 'Budgeted'),
            ...col.money('actualAmount', 'Actual'),
            ...col.money('variance', 'Variance')
        ],

        BudgetTransfer: [
            ...col.id('transferId'),
            ...col.col('fromBudgetLineId', 'From Line'),
            ...col.col('toBudgetLineId', 'To Line'),
            ...col.money('amount', 'Amount'),
            ...col.date('transferDate', 'Transfer Date')
        ],

        BudgetScenario: [
            ...col.id('scenarioId'),
            ...col.col('scenarioName', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('baseBudgetId', 'Base Budget'),
            ...col.boolean('isActive', 'Active')
        ],

        CapitalExpenditure: [
            ...col.id('capexId'),
            ...col.col('projectName', 'Project Name'),
            ...col.col('description', 'Description'),
            ...col.money('requestedAmount', 'Requested'),
            ...col.money('approvedAmount', 'Approved'),
            ...col.status('status', 'Status', enums.CAPEX_STATUS_VALUES, render.capexStatus)
        ],

        Forecast: [
            ...col.id('forecastId'),
            ...col.enum('forecastType', 'Type', null, render.forecastType),
            ...col.date('periodStart', 'Period Start'),
            ...col.date('periodEnd', 'Period End'),
            ...col.money('projectedAmount', 'Projected'),
            ...col.money('actualAmount', 'Actual')
        ]
    };

    MobileBudgeting.primaryKeys = {
        Budget: 'budgetId', BudgetLine: 'lineId', BudgetTransfer: 'transferId',
        BudgetScenario: 'scenarioId', CapitalExpenditure: 'capexId', Forecast: 'forecastId'
    };

})();
