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
// Sales Analytics Module - Column Configurations
// Table column definitions for all Sales Analytics models

(function() {
    'use strict';

    window.SalesAnalytics = window.SalesAnalytics || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = SalesAnalytics.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesAnalytics.columns = {
        SalesTarget: [
            { key: 'targetId', label: 'ID', sortKey: 'targetId', filterKey: 'targetId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'salespersonId', label: 'Salesperson', sortKey: 'salespersonId', filterKey: 'salespersonId' },
            { key: 'territoryId', label: 'Territory', sortKey: 'territoryId', filterKey: 'territoryId' },
            {
                key: 'targetAmount',
                label: 'Target',
                sortKey: 'targetAmount',
                render: (item) => renderMoney(item.targetAmount)
            },
            {
                key: 'achievedAmount',
                label: 'Achieved',
                sortKey: 'achievedAmount',
                render: (item) => renderMoney(item.achievedAmount)
            },
            { key: 'period', label: 'Period', sortKey: 'period' }
        ],

        SalesTerritory: [
            { key: 'territoryId', label: 'ID', sortKey: 'territoryId', filterKey: 'territoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            {
                key: 'territoryType',
                label: 'Type',
                sortKey: 'territoryType',
                render: (item) => render.territoryType(item.territoryType)
            },
            { key: 'parentTerritoryId', label: 'Parent', sortKey: 'parentTerritoryId' },
            { key: 'description', label: 'Description', sortKey: 'description' }
        ],

        SalesCommissionPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'commissionType',
                label: 'Type',
                sortKey: 'commissionType',
                render: (item) => render.commissionType(item.commissionType)
            },
            { key: 'baseRate', label: 'Rate', sortKey: 'baseRate' },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

        SalesForecast: [
            { key: 'forecastId', label: 'ID', sortKey: 'forecastId', filterKey: 'forecastId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'salespersonId', label: 'Salesperson', sortKey: 'salespersonId', filterKey: 'salespersonId' },
            {
                key: 'category',
                label: 'Category',
                sortKey: 'category',
                render: (item) => render.forecastCategory(item.category)
            },
            {
                key: 'forecastAmount',
                label: 'Forecast',
                sortKey: 'forecastAmount',
                render: (item) => renderMoney(item.forecastAmount)
            },
            {
                key: 'expectedCloseDate',
                label: 'Date',
                sortKey: 'expectedCloseDate',
                render: (item) => renderDate(item.expectedCloseDate)
            }
        ]
    };

})();
