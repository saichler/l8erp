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
// BI Dashboards Module - Column Configurations

(function() {
    'use strict';

    window.BiDashboards = window.BiDashboards || {};

    const col = window.Layer8ColumnFactory;
    const render = BiDashboards.render;

    BiDashboards.columns = {
        BiDashboard: [
            ...col.id('dashboardId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('category', 'Category'),
            ...col.enum('status', 'Status', null, render.dashboardStatus),
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
            ...col.enum('status', 'Status', null, render.kpiStatus),
            ...col.enum('trend', 'Trend', null, render.trendDirection),
            ...col.boolean('isActive', 'Active')
        ],

    };

})();
