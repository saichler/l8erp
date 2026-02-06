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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile BI Dashboards Module - Form Configurations
 * Desktop Equivalent: bi/dashboards/dashboards-forms.js
 */
(function() {
    'use strict';

    window.MobileBiDashboards = window.MobileBiDashboards || {};
    const f = window.Layer8FormFactory;
    const enums = MobileBiDashboards.enums;

    MobileBiDashboards.forms = {
        BiDashboard: f.form('Dashboard', [
            f.section('Dashboard Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('category', 'Category'),
                ...f.select('status', 'Status', enums.DASHBOARD_STATUS),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isDefault', 'Default Dashboard'),
                ...f.checkbox('isPublic', 'Public'),
                ...f.number('refreshInterval', 'Refresh Interval (seconds)'),
                ...f.textarea('layoutConfig', 'Layout Config (JSON)')
            ])
        ]),

        BiDashboardWidget: f.form('Dashboard Widget', [
            f.section('Widget Details', [
                ...f.reference('dashboardId', 'Dashboard', 'BiDashboard', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('widgetType', 'Widget Type', enums.WIDGET_TYPE),
                ...f.select('chartType', 'Chart Type', enums.CHART_TYPE),
                ...f.reference('dataSourceId', 'Data Source', 'BiDataSource'),
                ...f.reference('reportId', 'Report', 'BiReport'),
                ...f.reference('kpiId', 'KPI', 'BiKPI'),
                ...f.textarea('query', 'Query'),
                ...f.number('positionX', 'Position X'),
                ...f.number('positionY', 'Position Y'),
                ...f.number('width', 'Width'),
                ...f.number('height', 'Height'),
                ...f.number('refreshInterval', 'Refresh Interval (seconds)'),
                ...f.textarea('config', 'Config (JSON)')
            ])
        ]),

        BiKPI: f.form('KPI', [
            f.section('KPI Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('category', 'Category'),
                ...f.text('unit', 'Unit'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.reference('dataSourceId', 'Data Source', 'BiDataSource'),
                ...f.textarea('calculationFormula', 'Calculation Formula'),
                ...f.number('currentValue', 'Current Value'),
                ...f.number('targetValue', 'Target Value'),
                ...f.number('previousValue', 'Previous Value'),
                ...f.select('status', 'Status', enums.KPI_STATUS),
                ...f.select('trend', 'Trend', enums.TREND_DIRECTION),
                ...f.checkbox('isActive', 'Active'),
                ...f.number('refreshInterval', 'Refresh Interval (seconds)')
            ])
        ]),

        BiKPIThreshold: f.form('KPI Threshold', [
            f.section('Threshold Details', [
                ...f.reference('kpiId', 'KPI', 'BiKPI', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('operator', 'Operator', enums.THRESHOLD_OPERATOR),
                ...f.number('value', 'Value'),
                ...f.number('valueUpper', 'Upper Value (for Between)'),
                ...f.text('severity', 'Severity'),
                ...f.text('notificationEmail', 'Notification Email'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        BiDrilldown: f.form('Drilldown', [
            f.section('Drilldown Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('sourceReportId', 'Source Report', 'BiReport'),
                ...f.reference('sourceWidgetId', 'Source Widget', 'BiDashboardWidget'),
                ...f.text('sourceField', 'Source Field'),
                ...f.reference('targetReportId', 'Target Report', 'BiReport'),
                ...f.reference('targetDashboardId', 'Target Dashboard', 'BiDashboard'),
                ...f.text('targetParameter', 'Target Parameter'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        BiDashboardShare: f.form('Dashboard Share', [
            f.section('Share Details', [
                ...f.reference('dashboardId', 'Dashboard', 'BiDashboard', true),
                ...f.text('sharedWithId', 'Shared With ID', true),
                ...f.text('sharedWithType', 'Shared With Type'),
                ...f.select('accessLevel', 'Access Level', enums.ACCESS_LEVEL),
                ...f.date('sharedDate', 'Shared Date'),
                ...f.reference('sharedBy', 'Shared By', 'Employee'),
                ...f.date('expiryDate', 'Expiry Date')
            ])
        ])
    };

})();
