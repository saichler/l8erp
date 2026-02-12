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
// Projects Analytics Module - Column Configurations

(function() {
    'use strict';

    window.PrjAnalytics = window.PrjAnalytics || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = PrjAnalytics.render;

    PrjAnalytics.columns = {
        PrjStatusReport: [
            { key: 'statusId', label: 'ID', sortKey: 'statusId', filterKey: 'statusId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            {
                key: 'reportDate',
                label: 'Report Date',
                sortKey: 'reportDate',
                render: (item) => renderDate(item.reportDate)
            },
            {
                key: 'overallHealth',
                label: 'Overall Health',
                sortKey: 'overallHealth',
                render: (item) => render.healthIndicator(item.overallHealth)
            },
            {
                key: 'scheduleHealth',
                label: 'Schedule Health',
                sortKey: 'scheduleHealth',
                render: (item) => render.healthIndicator(item.scheduleHealth)
            },
            {
                key: 'budgetHealth',
                label: 'Budget Health',
                sortKey: 'budgetHealth',
                render: (item) => render.healthIndicator(item.budgetHealth)
            },
            {
                key: 'resourceHealth',
                label: 'Resource Health',
                sortKey: 'resourceHealth',
                render: (item) => render.healthIndicator(item.resourceHealth)
            },
            { key: 'percentComplete', label: '% Complete', sortKey: 'percentComplete' }
        ],

        PrjPortfolioView: [
            { key: 'viewId', label: 'ID', sortKey: 'viewId', filterKey: 'viewId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'totalProjects', label: 'Total Projects', sortKey: 'totalProjects' },
            { key: 'onTrackCount', label: 'On Track', sortKey: 'onTrackCount' },
            { key: 'atRiskCount', label: 'At Risk', sortKey: 'atRiskCount' },
            { key: 'offTrackCount', label: 'Off Track', sortKey: 'offTrackCount' }
        ],

        PrjProjectKPI: [
            { key: 'kpiId', label: 'ID', sortKey: 'kpiId', filterKey: 'kpiId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'kpiName', label: 'KPI Name', sortKey: 'kpiName', filterKey: 'kpiName' },
            { key: 'targetValue', label: 'Target', sortKey: 'targetValue' },
            { key: 'actualValue', label: 'Actual', sortKey: 'actualValue' },
            { key: 'unitOfMeasure', label: 'Unit', sortKey: 'unitOfMeasure' },
            {
                key: 'measurementDate',
                label: 'Measurement Date',
                sortKey: 'measurementDate',
                render: (item) => renderDate(item.measurementDate)
            },
            { key: 'trend', label: 'Trend', sortKey: 'trend' }
        ]
    };

})();
