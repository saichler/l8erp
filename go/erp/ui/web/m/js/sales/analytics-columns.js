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
 * Mobile Sales Analytics Module - Column Configurations
 * Desktop Equivalent: sales/analytics/analytics-columns.js
 */
(function() {
    'use strict';

    const enums = MobileSalesAnalytics.enums;
    const render = MobileSalesAnalytics.render;

    MobileSalesAnalytics.columns = {
        SalesTarget: [
            { key: 'targetId', label: 'ID', sortKey: 'targetId', filterKey: 'targetId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'salespersonId', label: 'Salesperson', sortKey: 'salespersonId', filterKey: 'salespersonId' },
            { key: 'territoryId', label: 'Territory', sortKey: 'territoryId', filterKey: 'territoryId' },
            { key: 'targetAmount', label: 'Target', sortKey: 'targetAmount', render: (item) => Layer8MRenderers.renderMoney(item.targetAmount) },
            { key: 'achievedAmount', label: 'Achieved', sortKey: 'achievedAmount', render: (item) => Layer8MRenderers.renderMoney(item.achievedAmount) },
            { key: 'period', label: 'Period', sortKey: 'period' }
        ],

        SalesTerritory: [
            { key: 'territoryId', label: 'ID', sortKey: 'territoryId', filterKey: 'territoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'territoryType', label: 'Type', sortKey: 'territoryType', filterKey: 'territoryType', enumValues: enums.TERRITORY_TYPE_VALUES, render: (item) => render.territoryType(item.territoryType) },
            { key: 'parentTerritoryId', label: 'Parent', sortKey: 'parentTerritoryId' },
            { key: 'description', label: 'Description', sortKey: 'description' }
        ],

        TerritoryAssign: [
            { key: 'assignmentId', label: 'ID', sortKey: 'assignmentId', filterKey: 'assignmentId' },
            { key: 'territoryId', label: 'Territory', sortKey: 'territoryId', filterKey: 'territoryId' },
            { key: 'salespersonId', label: 'Salesperson', sortKey: 'salespersonId', filterKey: 'salespersonId' },
            { key: 'startDate', label: 'Start', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) },
            { key: 'isPrimary', label: 'Primary', sortKey: 'isPrimary' }
        ],

        CommissionPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'commissionType', label: 'Type', sortKey: 'commissionType', filterKey: 'commissionType', enumValues: enums.COMMISSION_TYPE_VALUES, render: (item) => render.commissionType(item.commissionType) },
            { key: 'baseRate', label: 'Rate', sortKey: 'baseRate' },
            { key: 'effectiveDate', label: 'Effective', sortKey: 'effectiveDate', render: (item) => Layer8MRenderers.renderDate(item.effectiveDate) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

        SalesCommissionCalc: [
            { key: 'calcId', label: 'ID', sortKey: 'calcId', filterKey: 'calcId' },
            { key: 'salespersonId', label: 'Salesperson', sortKey: 'salespersonId', filterKey: 'salespersonId' },
            { key: 'planId', label: 'Plan', sortKey: 'planId', filterKey: 'planId' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'salesAmount', label: 'Sale Amount', sortKey: 'salesAmount', render: (item) => Layer8MRenderers.renderMoney(item.salesAmount) },
            { key: 'commissionAmount', label: 'Commission', sortKey: 'commissionAmount', render: (item) => Layer8MRenderers.renderMoney(item.commissionAmount) }
        ],

        SalesForecast: [
            { key: 'forecastId', label: 'ID', sortKey: 'forecastId', filterKey: 'forecastId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'salespersonId', label: 'Salesperson', sortKey: 'salespersonId', filterKey: 'salespersonId' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category', enumValues: enums.FORECAST_CATEGORY_VALUES, render: (item) => render.forecastCategory(item.category) },
            { key: 'forecastAmount', label: 'Forecast', sortKey: 'forecastAmount', render: (item) => Layer8MRenderers.renderMoney(item.forecastAmount) },
            { key: 'expectedCloseDate', label: 'Date', sortKey: 'expectedCloseDate', render: (item) => Layer8MRenderers.renderDate(item.expectedCloseDate) }
        ]
    };

    MobileSalesAnalytics.primaryKeys = {
        SalesTarget: 'targetId', SalesTerritory: 'territoryId',
        TerritoryAssign: 'assignmentId', CommissionPlan: 'planId',
        SalesCommissionCalc: 'calcId', SalesForecast: 'forecastId'
    };

})();
