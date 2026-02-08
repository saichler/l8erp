/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

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
 * Mobile BI Dashboards Module - Column Configurations
 * Desktop Equivalent: bi/dashboards/dashboards-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileBiDashboards.enums;
    const render = MobileBiDashboards.render;

    MobileBiDashboards.columns = {
        BiDashboard: [
            ...col.id('dashboardId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('category', 'Category'),
            ...col.status('status', 'Status', enums.DASHBOARD_STATUS_VALUES, render.dashboardStatus),
            ...col.col('ownerId', 'Owner'),
            ...col.boolean('isDefault', 'Default'),
            ...col.boolean('isPublic', 'Public'),
            ...col.col('refreshInterval', 'Refresh (sec)')
        ],

        BiDashboardWidget: [
            ...col.id('widgetId'),
            ...col.col('dashboardId', 'Dashboard'),
            ...col.col('name', 'Name'),
            ...col.status('widgetType', 'Widget Type', enums.WIDGET_TYPE_VALUES, render.widgetType),
            ...col.status('chartType', 'Chart Type', enums.CHART_TYPE_VALUES, render.chartType),
            ...col.col('positionX', 'X'),
            ...col.col('positionY', 'Y'),
            ...col.col('width', 'Width'),
            ...col.col('height', 'Height')
        ],

        BiKPI: [
            ...col.id('kpiId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('category', 'Category'),
            ...col.col('unit', 'Unit'),
            ...col.col('currentValue', 'Current'),
            ...col.col('targetValue', 'Target'),
            ...col.status('status', 'Status', enums.KPI_STATUS_VALUES, render.kpiStatus),
            ...col.status('trend', 'Trend', enums.TREND_DIRECTION_VALUES, render.trendDirection),
            ...col.boolean('isActive', 'Active')
        ],

        BiKPIThreshold: [
            ...col.id('thresholdId'),
            ...col.col('kpiId', 'KPI'),
            ...col.col('name', 'Name'),
            ...col.status('operator', 'Operator', enums.THRESHOLD_OPERATOR_VALUES, render.thresholdOperator),
            ...col.col('value', 'Value'),
            ...col.col('valueUpper', 'Upper Value'),
            ...col.col('severity', 'Severity'),
            ...col.boolean('isActive', 'Active'),
            ...col.date('lastTriggered', 'Last Triggered')
        ],

        BiDrilldown: [
            ...col.id('drilldownId'),
            ...col.col('name', 'Name'),
            ...col.col('sourceReportId', 'Source Report'),
            ...col.col('sourceWidgetId', 'Source Widget'),
            ...col.col('targetReportId', 'Target Report'),
            ...col.col('targetDashboardId', 'Target Dashboard'),
            ...col.col('sourceField', 'Source Field'),
            ...col.col('targetParameter', 'Target Param'),
            ...col.boolean('isActive', 'Active')
        ],

        BiDashboardShare: [
            ...col.id('shareId'),
            ...col.col('dashboardId', 'Dashboard'),
            ...col.col('sharedWithId', 'Shared With'),
            ...col.col('sharedWithType', 'Type'),
            ...col.status('accessLevel', 'Access Level', enums.ACCESS_LEVEL_VALUES, render.accessLevel),
            ...col.date('sharedDate', 'Shared Date'),
            ...col.col('sharedBy', 'Shared By'),
            ...col.date('expiryDate', 'Expiry Date')
        ]
    };

    MobileBiDashboards.primaryKeys = {
        BiDashboard: 'dashboardId', BiDashboardWidget: 'widgetId',
        BiKPI: 'kpiId', BiKPIThreshold: 'thresholdId',
        BiDrilldown: 'drilldownId', BiDashboardShare: 'shareId'
    };

})();
