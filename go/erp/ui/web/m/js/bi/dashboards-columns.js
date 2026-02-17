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

    };

    MobileBiDashboards.primaryKeys = {
        BiDashboard: 'dashboardId', BiKPI: 'kpiId'
    };

})();
