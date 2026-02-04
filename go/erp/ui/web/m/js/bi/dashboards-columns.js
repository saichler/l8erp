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

    const enums = MobileBiDashboards.enums;
    const render = MobileBiDashboards.render;

    MobileBiDashboards.columns = {
        BiDashboard: [
            { key: 'dashboardId', label: 'ID', sortKey: 'dashboardId', filterKey: 'dashboardId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.DASHBOARD_STATUS_VALUES, render: (item) => render.dashboardStatus(item.status) },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'isDefault', label: 'Default', sortKey: 'isDefault', render: (item) => item.isDefault ? 'Yes' : 'No' },
            { key: 'isPublic', label: 'Public', sortKey: 'isPublic', render: (item) => item.isPublic ? 'Yes' : 'No' },
            { key: 'refreshInterval', label: 'Refresh (sec)', sortKey: 'refreshInterval' }
        ],

        BiDashboardWidget: [
            { key: 'widgetId', label: 'ID', sortKey: 'widgetId', filterKey: 'widgetId' },
            { key: 'dashboardId', label: 'Dashboard', sortKey: 'dashboardId', filterKey: 'dashboardId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'widgetType', label: 'Widget Type', sortKey: 'widgetType', filterKey: 'widgetType', enumValues: enums.WIDGET_TYPE_VALUES, render: (item) => render.widgetType(item.widgetType) },
            { key: 'chartType', label: 'Chart Type', sortKey: 'chartType', filterKey: 'chartType', enumValues: enums.CHART_TYPE_VALUES, render: (item) => render.chartType(item.chartType) },
            { key: 'positionX', label: 'X', sortKey: 'positionX' },
            { key: 'positionY', label: 'Y', sortKey: 'positionY' },
            { key: 'width', label: 'Width', sortKey: 'width' },
            { key: 'height', label: 'Height', sortKey: 'height' }
        ],

        BiKPI: [
            { key: 'kpiId', label: 'ID', sortKey: 'kpiId', filterKey: 'kpiId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category' },
            { key: 'unit', label: 'Unit', sortKey: 'unit' },
            { key: 'currentValue', label: 'Current', sortKey: 'currentValue' },
            { key: 'targetValue', label: 'Target', sortKey: 'targetValue' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.KPI_STATUS_VALUES, render: (item) => render.kpiStatus(item.status) },
            { key: 'trend', label: 'Trend', sortKey: 'trend', filterKey: 'trend', enumValues: enums.TREND_DIRECTION_VALUES, render: (item) => render.trendDirection(item.trend) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        BiKPIThreshold: [
            { key: 'thresholdId', label: 'ID', sortKey: 'thresholdId', filterKey: 'thresholdId' },
            { key: 'kpiId', label: 'KPI', sortKey: 'kpiId', filterKey: 'kpiId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'operator', label: 'Operator', sortKey: 'operator', filterKey: 'operator', enumValues: enums.THRESHOLD_OPERATOR_VALUES, render: (item) => render.thresholdOperator(item.operator) },
            { key: 'value', label: 'Value', sortKey: 'value' },
            { key: 'valueUpper', label: 'Upper Value', sortKey: 'valueUpper' },
            { key: 'severity', label: 'Severity', sortKey: 'severity', filterKey: 'severity' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' },
            { key: 'lastTriggered', label: 'Last Triggered', sortKey: 'lastTriggered', render: (item) => Layer8MRenderers.renderDate(item.lastTriggered) }
        ],

        BiDrilldown: [
            { key: 'drilldownId', label: 'ID', sortKey: 'drilldownId', filterKey: 'drilldownId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'sourceReportId', label: 'Source Report', sortKey: 'sourceReportId' },
            { key: 'sourceWidgetId', label: 'Source Widget', sortKey: 'sourceWidgetId' },
            { key: 'targetReportId', label: 'Target Report', sortKey: 'targetReportId' },
            { key: 'targetDashboardId', label: 'Target Dashboard', sortKey: 'targetDashboardId' },
            { key: 'sourceField', label: 'Source Field', sortKey: 'sourceField' },
            { key: 'targetParameter', label: 'Target Param', sortKey: 'targetParameter' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        BiDashboardShare: [
            { key: 'shareId', label: 'ID', sortKey: 'shareId', filterKey: 'shareId' },
            { key: 'dashboardId', label: 'Dashboard', sortKey: 'dashboardId', filterKey: 'dashboardId' },
            { key: 'sharedWithId', label: 'Shared With', sortKey: 'sharedWithId' },
            { key: 'sharedWithType', label: 'Type', sortKey: 'sharedWithType', filterKey: 'sharedWithType' },
            { key: 'accessLevel', label: 'Access Level', sortKey: 'accessLevel', filterKey: 'accessLevel', enumValues: enums.ACCESS_LEVEL_VALUES, render: (item) => render.accessLevel(item.accessLevel) },
            { key: 'sharedDate', label: 'Shared Date', sortKey: 'sharedDate', render: (item) => Layer8MRenderers.renderDate(item.sharedDate) },
            { key: 'sharedBy', label: 'Shared By', sortKey: 'sharedBy' },
            { key: 'expiryDate', label: 'Expiry Date', sortKey: 'expiryDate', render: (item) => Layer8MRenderers.renderDate(item.expiryDate) }
        ]
    };

    MobileBiDashboards.primaryKeys = {
        BiDashboard: 'dashboardId', BiDashboardWidget: 'widgetId',
        BiKPI: 'kpiId', BiKPIThreshold: 'thresholdId',
        BiDrilldown: 'drilldownId', BiDashboardShare: 'shareId'
    };

})();
