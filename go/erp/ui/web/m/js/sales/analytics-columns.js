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

    const col = window.Layer8ColumnFactory;
    const enums = MobileSalesAnalytics.enums;
    const render = MobileSalesAnalytics.render;

    MobileSalesAnalytics.columns = {
        SalesTarget: [
            ...col.id('targetId'),
            ...col.col('name', 'Name'),
            ...col.col('salespersonId', 'Salesperson'),
            ...col.col('territoryId', 'Territory'),
            ...col.money('targetAmount', 'Target'),
            ...col.money('achievedAmount', 'Achieved'),
            ...col.status('period', 'Period', enums.TARGET_PERIOD_VALUES, render.targetPeriod),
            ...col.col('year', 'Year'),
            ...col.col('quarter', 'Quarter'),
            ...col.col('month', 'Month'),
            ...col.col('achievementPercent', '% Achieved')
        ],

        SalesTerritory: [
            ...col.id('territoryId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.status('territoryType', 'Type', enums.TERRITORY_TYPE_VALUES, render.territoryType),
            ...col.col('parentTerritoryId', 'Parent')
        ],

        CommissionPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Name'),
            ...col.status('commissionType', 'Type', enums.COMMISSION_TYPE_VALUES, render.commissionType),
            ...col.col('baseRate', 'Rate'),
            ...col.date('effectiveDate', 'Effective'),
            ...col.col('isActive', 'Active')
        ],

        SalesForecast: [
            ...col.id('forecastId'),
            ...col.col('name', 'Name'),
            ...col.col('salespersonId', 'Salesperson'),
            ...col.status('category', 'Category', enums.FORECAST_CATEGORY_VALUES, render.forecastCategory),
            ...col.money('forecastAmount', 'Forecast'),
            ...col.date('expectedCloseDate', 'Date')
        ]
    };

    MobileSalesAnalytics.primaryKeys = {
        SalesTarget: 'targetId',
        SalesTerritory: 'territoryId',
        CommissionPlan: 'planId',
        SalesForecast: 'forecastId'
    };

})();
