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

    const { renderDate } = Layer8DRenderers;
    const render = BiDashboards.render;

    BiDashboards.columns = {
        BiDashboard: [
            { key: 'dashboardId', label: 'ID', sortKey: 'dashboardId', filterKey: 'dashboardId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.dashboardStatus(item.status)
            },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            {
                key: 'isDefault',
                label: 'Default',
                sortKey: 'isDefault',
                render: (item) => item.isDefault ? 'Yes' : 'No'
            },
            {
                key: 'isPublic',
                label: 'Public',
                sortKey: 'isPublic',
                render: (item) => item.isPublic ? 'Yes' : 'No'
            },
            { key: 'refreshInterval', label: 'Refresh (sec)', sortKey: 'refreshInterval' }
        ],

        BiKPI: [
            { key: 'kpiId', label: 'ID', sortKey: 'kpiId', filterKey: 'kpiId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category' },
            { key: 'unit', label: 'Unit', sortKey: 'unit' },
            { key: 'currentValue', label: 'Current', sortKey: 'currentValue' },
            { key: 'targetValue', label: 'Target', sortKey: 'targetValue' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.kpiStatus(item.status)
            },
            {
                key: 'trend',
                label: 'Trend',
                sortKey: 'trend',
                render: (item) => render.trendDirection(item.trend)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

    };

})();
