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

    const col = window.Layer8ColumnFactory;
    const render = ScmDemandPlanning.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    ScmDemandPlanning.columns = {
        ScmDemandForecast: [
            ...col.id('forecastId'),
            ...col.enum('forecastMethod', 'Method', null, render.forecastMethod),
            ...col.col('itemId', 'Item'),
            ...col.date('periodStart', 'Start'),
            ...col.col('forecastQuantity', 'Qty'),
            ...col.col('confidenceLevel', 'Confidence'),
        ],

        ScmForecastModel: [
            ...col.id('modelId'),
            ...col.col('name', 'Model'),
            ...col.enum('forecastMethod', 'Method', null, render.forecastMethod),
            ...col.col('accuracyScore', 'Accuracy %'),
            ...col.col('description', 'Description'),
        ],

        ScmDemandPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Plan'),
            {
                key: 'planPeriod',
                label: 'Start',
                sortKey: 'planPeriod.startDate',
                render: (item) => Layer8DRenderers.renderDate(item.planPeriod?.startDate)
            },
            {
                key: 'planPeriod',
                label: 'End',
                sortKey: 'planPeriod.endDate',
                render: (item) => Layer8DRenderers.renderDate(item.planPeriod?.endDate)
            },
            ...col.enum('status', 'Status', null, render.taskStatus),
        ],

        ScmPromotionalPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Plan'),
            ...col.enum('status', 'Status', null, render.taskStatus),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End'),
            ...col.col('expectedUplift', 'Uplift %'),
        ],

        ScmNewProductPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Product'),
            ...col.date('launchDate', 'Launch'),
            ...col.col('initialForecast', 'Initial Forecast'),
            ...col.enum('status', 'Status', null, render.taskStatus),
        ],

    };

})();
