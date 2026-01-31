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

    const { renderDate, renderMoney } = ERPRenderers;
    const render = ScmDemandPlanning.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    ScmDemandPlanning.columns = {
        ScmDemandForecast: [
            { key: 'forecastId', label: 'ID', sortKey: 'forecastId', filterKey: 'forecastId' },
            { key: 'forecastName', label: 'Forecast', sortKey: 'forecastName', filterKey: 'forecastName' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            {
                key: 'forecastDate',
                label: 'Date',
                sortKey: 'forecastDate',
                render: (item) => renderDate(item.forecastDate)
            },
            { key: 'forecastQuantity', label: 'Qty', sortKey: 'forecastQuantity' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmForecastModel: [
            { key: 'modelId', label: 'ID', sortKey: 'modelId', filterKey: 'modelId' },
            { key: 'modelName', label: 'Model', sortKey: 'modelName', filterKey: 'modelName' },
            {
                key: 'forecastMethod',
                label: 'Method',
                sortKey: 'forecastMethod',
                render: (item) => render.forecastMethod(item.forecastMethod)
            },
            { key: 'accuracy', label: 'Accuracy %', sortKey: 'accuracy' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' }
        ],

        ScmDemandPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'planName', label: 'Plan', sortKey: 'planName', filterKey: 'planName' },
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
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmPromotionalPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'planName', label: 'Plan', sortKey: 'planName', filterKey: 'planName' },
            { key: 'promotionType', label: 'Type', sortKey: 'promotionType', filterKey: 'promotionType' },
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
            { key: 'productName', label: 'Product', sortKey: 'productName', filterKey: 'productName' },
            {
                key: 'launchDate',
                label: 'Launch',
                sortKey: 'launchDate',
                render: (item) => renderDate(item.launchDate)
            },
            { key: 'estimatedDemand', label: 'Est. Demand', sortKey: 'estimatedDemand' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmForecastAccuracy: [
            { key: 'accuracyId', label: 'ID', sortKey: 'accuracyId', filterKey: 'accuracyId' },
            { key: 'forecastId', label: 'Forecast', sortKey: 'forecastId', filterKey: 'forecastId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'forecastedQty', label: 'Forecasted', sortKey: 'forecastedQty' },
            { key: 'actualQty', label: 'Actual', sortKey: 'actualQty' },
            { key: 'accuracyPercent', label: 'Accuracy %', sortKey: 'accuracyPercent' }
        ]
    };

})();
