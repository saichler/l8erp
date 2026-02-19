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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Demand Planning Module - Form Configurations
 * Desktop Equivalent: scm/demand-planning/demand-planning-forms.js
 */
(function() {
    'use strict';

    window.MobileScmDemandPlanning = window.MobileScmDemandPlanning || {};
    const f = window.Layer8FormFactory;
    const enums = MobileScmDemandPlanning.enums;

    MobileScmDemandPlanning.forms = {
    ScmDemandForecast: f.form('Demand Forecast', [
        f.section('Forecast Details', [
            ...f.select('forecastMethod', 'Forecast Method', enums.FORECAST_METHOD, true),
            ...f.reference('itemId', 'Item', 'ScmItem', true),
            ...f.date('periodStart', 'Period Start', true),
            ...f.date('periodEnd', 'Period End'),
            ...f.number('forecastQuantity', 'Forecast Quantity', true),
            ...f.number('confidenceLevel', 'Confidence Level'),
            ...f.textarea('notes', 'Notes')
        ]),
        f.section('Accuracy Records', [
            ...f.inlineTable('accuracies', 'Forecast Accuracy', [
                { key: 'accuracyId', label: 'ID', hidden: true },
                { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                { key: 'forecastQuantity', label: 'Forecast Qty', type: 'number' },
                { key: 'actualQuantity', label: 'Actual Qty', type: 'number' },
                { key: 'mape', label: 'MAPE %', type: 'number' },
                { key: 'bias', label: 'Bias', type: 'number' },
                { key: 'notes', label: 'Notes', type: 'text' }
            ])
        ])
    ]),

    ScmForecastModel: f.form('Forecast Model', [
        f.section('Model Details', [
            ...f.text('name', 'Model Name', true),
            ...f.select('forecastMethod', 'Forecast Method', enums.FORECAST_METHOD, true),
            ...f.number('accuracyScore', 'Accuracy %'),
            ...f.textarea('parameters', 'Parameters'),
            ...f.textarea('description', 'Description'),
            ...f.checkbox('isActive', 'Active'),
        ])
    ]),

    ScmDemandPlan: f.form('Demand Plan', [
        f.section('Plan Details', [
            ...f.text('name', 'Plan Name', true),
            ...f.date('planPeriod.startDate', 'Start Date', true),
            ...f.date('planPeriod.endDate', 'End Date', true),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.textarea('description', 'Description'),
            ...f.textarea('notes', 'Notes'),
            ...f.date('planPeriod.startDate', 'Plan Period Start'),
            ...f.date('planPeriod.endDate', 'Plan Period End'),
            ...f.text('createdBy', 'Created By'),
            ...f.text('approvedBy', 'Approved By'),
        ])
    ]),

    ScmPromotionalPlan: f.form('Promotional Plan', [
        f.section('Promotion Details', [
            ...f.text('name', 'Plan Name', true),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.date('startDate', 'Start Date', true),
            ...f.date('endDate', 'End Date', true),
            ...f.number('expectedUplift', 'Expected Uplift %'),
            ...f.textarea('description', 'Description'),
            ...f.text('itemIds', 'Item Ids'),
            ...f.text('notes', 'Notes'),
        ])
    ]),

    ScmNewProductPlan: f.form('New Product Plan', [
        f.section('Product Plan Details', [
            ...f.text('name', 'Product Name', true),
            ...f.date('launchDate', 'Launch Date', true),
            ...f.number('initialForecast', 'Initial Forecast'),
            ...f.text('rampUpPeriod', 'Ramp-Up Period'),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.textarea('notes', 'Notes'),
            ...f.text('itemId', 'Item'),
            ...f.text('comparableItemId', 'Comparable Item'),
        ])
    ]),

};

})();
