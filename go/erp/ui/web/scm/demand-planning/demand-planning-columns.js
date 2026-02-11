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
// Demand Planning Module - Column Configurations
// Table column definitions for all Demand Planning models

(function() {
    'use strict';

    // Ensure ScmDemandPlanning namespace exists
    window.ScmDemandPlanning = window.ScmDemandPlanning || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = ScmDemandPlanning.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    ScmDemandPlanning.columns = {
        ScmDemandForecast: [
            { key: 'forecastId', label: 'ID', sortKey: 'forecastId', filterKey: 'forecastId' },
            {
                key: 'forecastMethod',
                label: 'Method',
                sortKey: 'forecastMethod',
                render: (item) => render.forecastMethod(item.forecastMethod)
            },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            {
                key: 'periodStart',
                label: 'Start',
                sortKey: 'periodStart',
                render: (item) => renderDate(item.periodStart)
            },
            { key: 'forecastQuantity', label: 'Qty', sortKey: 'forecastQuantity' },
            { key: 'confidenceLevel', label: 'Confidence', sortKey: 'confidenceLevel' }
        ],

        ScmForecastModel: [
            { key: 'modelId', label: 'ID', sortKey: 'modelId', filterKey: 'modelId' },
            { key: 'name', label: 'Model', sortKey: 'name', filterKey: 'name' },
            {
                key: 'forecastMethod',
                label: 'Method',
                sortKey: 'forecastMethod',
                render: (item) => render.forecastMethod(item.forecastMethod)
            },
            { key: 'accuracyScore', label: 'Accuracy %', sortKey: 'accuracyScore' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' }
        ],

        ScmDemandPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'name', label: 'Plan', sortKey: 'name', filterKey: 'name' },
            {
                key: 'planPeriod',
                label: 'Start',
                sortKey: 'planPeriod.startDate',
                render: (item) => renderDate(item.planPeriod?.startDate)
            },
            {
                key: 'planPeriod',
                label: 'End',
                sortKey: 'planPeriod.endDate',
                render: (item) => renderDate(item.planPeriod?.endDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmPromotionalPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'name', label: 'Plan', sortKey: 'name', filterKey: 'name' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            },
            {
                key: 'startDate',
                label: 'Start',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            { key: 'expectedUplift', label: 'Uplift %', sortKey: 'expectedUplift' }
        ],

        ScmNewProductPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'name', label: 'Product', sortKey: 'name', filterKey: 'name' },
            {
                key: 'launchDate',
                label: 'Launch',
                sortKey: 'launchDate',
                render: (item) => renderDate(item.launchDate)
            },
            { key: 'initialForecast', label: 'Initial Forecast', sortKey: 'initialForecast' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

    };

})();
