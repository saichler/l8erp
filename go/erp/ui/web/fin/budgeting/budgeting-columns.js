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

    const { renderBoolean, renderDate, renderMoney } = Layer8DRenderers;
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

        CapitalExpenditure: [
            { key: 'capexId', label: 'ID', sortKey: 'capexId', filterKey: 'capexId' },
            { key: 'projectName', label: 'Project Name', sortKey: 'projectName', filterKey: 'projectName' },
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
                key: 'projectedAmount',
                label: 'Projected',
                sortKey: 'projectedAmount',
                render: (item) => renderMoney(item.projectedAmount)
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
