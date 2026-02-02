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
 * Mobile Demand Planning Module - Form Configurations
 * Desktop Equivalent: scm/demand-planning/demand-planning-forms.js
 */
(function() {
    'use strict';

    const enums = MobileScmDemandPlanning.enums;

    MobileScmDemandPlanning.forms = {
        ScmDemandForecast: {
            title: 'Demand Forecast',
            sections: [
                {
                    title: 'Forecast Details',
                    fields: [
                        { key: 'forecastMethod', label: 'Forecast Method', type: 'select', options: enums.FORECAST_METHOD, required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'periodStart', label: 'Period Start', type: 'date', required: true },
                        { key: 'periodEnd', label: 'Period End', type: 'date' },
                        { key: 'forecastQuantity', label: 'Forecast Quantity', type: 'number', required: true },
                        { key: 'confidenceLevel', label: 'Confidence Level', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmForecastModel: {
            title: 'Forecast Model',
            sections: [
                {
                    title: 'Model Details',
                    fields: [
                        { key: 'name', label: 'Model Name', type: 'text', required: true },
                        { key: 'forecastMethod', label: 'Forecast Method', type: 'select', options: enums.FORECAST_METHOD, required: true },
                        { key: 'accuracyScore', label: 'Accuracy %', type: 'number' },
                        { key: 'parameters', label: 'Parameters', type: 'textarea' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmDemandPlan: {
            title: 'Demand Plan',
            sections: [
                {
                    title: 'Plan Details',
                    fields: [
                        { key: 'name', label: 'Plan Name', type: 'text', required: true },
                        { key: 'planPeriod.startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'planPeriod.endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmPromotionalPlan: {
            title: 'Promotional Plan',
            sections: [
                {
                    title: 'Promotion Details',
                    fields: [
                        { key: 'name', label: 'Plan Name', type: 'text', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'expectedUplift', label: 'Expected Uplift %', type: 'number' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmNewProductPlan: {
            title: 'New Product Plan',
            sections: [
                {
                    title: 'Product Plan Details',
                    fields: [
                        { key: 'name', label: 'Product Name', type: 'text', required: true },
                        { key: 'launchDate', label: 'Launch Date', type: 'date', required: true },
                        { key: 'initialForecast', label: 'Initial Forecast', type: 'number' },
                        { key: 'rampUpPeriod', label: 'Ramp-Up Period', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmForecastAccuracy: {
            title: 'Forecast Accuracy',
            sections: [
                {
                    title: 'Accuracy Details',
                    fields: [
                        { key: 'forecastId', label: 'Forecast', type: 'reference', lookupModel: 'ScmDemandForecast', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'forecastQuantity', label: 'Forecasted Quantity', type: 'number' },
                        { key: 'actualQuantity', label: 'Actual Quantity', type: 'number' },
                        { key: 'mape', label: 'MAPE %', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

})();
