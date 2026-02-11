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
/**
 * Mobile Demand Planning Module - Column Configurations
 * Desktop Equivalent: scm/demand-planning/demand-planning-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileScmDemandPlanning.enums;
    const render = MobileScmDemandPlanning.render;

    MobileScmDemandPlanning.columns = {
        ScmDemandForecast: [
            ...col.id('forecastId'),
            ...col.status('forecastMethod', 'Method', enums.FORECAST_METHOD_VALUES, render.forecastMethod),
            ...col.col('itemId', 'Item'),
            ...col.date('periodStart', 'Start'),
            ...col.col('forecastQuantity', 'Qty'),
            ...col.col('confidenceLevel', 'Confidence')
        ],

        ScmForecastModel: [
            ...col.id('modelId'),
            ...col.col('name', 'Model'),
            ...col.status('forecastMethod', 'Method', enums.FORECAST_METHOD_VALUES, render.forecastMethod),
            ...col.col('accuracyScore', 'Accuracy %'),
            ...col.col('description', 'Description')
        ],

        ScmDemandPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Plan'),
            ...col.custom('planPeriod', 'Start', (item) => Layer8MRenderers.renderDate(item.planPeriod?.startDate), { sortKey: 'planPeriod.startDate' }),
            ...col.custom('planPeriod', 'End', (item) => Layer8MRenderers.renderDate(item.planPeriod?.endDate), { sortKey: 'planPeriod.endDate' }),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmPromotionalPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Plan'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End'),
            ...col.col('expectedUplift', 'Uplift %')
        ],

        ScmNewProductPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Product'),
            ...col.date('launchDate', 'Launch'),
            ...col.col('initialForecast', 'Initial Forecast'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

    };

    MobileScmDemandPlanning.primaryKeys = {
        ScmDemandForecast: 'forecastId', ScmForecastModel: 'modelId',
        ScmDemandPlan: 'planId', ScmPromotionalPlan: 'planId',
        ScmNewProductPlan: 'planId'
    };

})();
