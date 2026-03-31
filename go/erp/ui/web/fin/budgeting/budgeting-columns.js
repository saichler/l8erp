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

    const col = window.Layer8ColumnFactory;
    const render = Budgeting.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    Budgeting.columns = {
        Budget: [
            ...col.id('budgetId'),
            ...col.col('budgetName', 'Budget Name'),
            ...col.enum('budgetType', 'Type', null, render.budgetType),
            ...col.col('fiscalYearId', 'Fiscal Year'),
            ...col.money('totalAmount', 'Total Amount'),
            ...col.enum('status', 'Status', null, render.budgetStatus),
        ],

        CapitalExpenditure: [
            ...col.id('capexId'),
            ...col.col('projectName', 'Project Name'),
            ...col.col('description', 'Description'),
            ...col.money('requestedAmount', 'Requested'),
            ...col.money('approvedAmount', 'Approved'),
            ...col.enum('status', 'Status', null, render.capexStatus),
        ],

        Forecast: [
            ...col.id('forecastId'),
            ...col.enum('forecastType', 'Type', null, render.forecastType),
            ...col.date('periodStart', 'Period Start'),
            ...col.date('periodEnd', 'Period End'),
            ...col.money('projectedAmount', 'Projected'),
            ...col.money('actualAmount', 'Actual'),
        ]
    };

})();
