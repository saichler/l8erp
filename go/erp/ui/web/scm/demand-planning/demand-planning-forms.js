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
// Demand Planning Module - Form Definitions
// Form field configurations for all Demand Planning models

(function() {
    'use strict';

    // Ensure DemandPlanning namespace exists
    window.DemandPlanning = window.DemandPlanning || {};

    const enums = DemandPlanning.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    DemandPlanning.forms = {
        DemandForecast: {
            title: 'Demand Forecast',
            sections: [
                {
                    title: 'Forecast Details',
                    fields: [
                        { key: 'forecastName', label: 'Forecast Name', type: 'text', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'Item', required: true },
                        { key: 'forecastDate', label: 'Forecast Date', type: 'date', required: true },
                        { key: 'forecastQuantity', label: 'Forecast Quantity', type: 'number', required: true },
                        { key: 'modelId', label: 'Forecast Model', type: 'reference', lookupModel: 'ForecastModel' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ForecastModel: {
            title: 'Forecast Model',
            sections: [
                {
                    title: 'Model Details',
                    fields: [
                        { key: 'modelName', label: 'Model Name', type: 'text', required: true },
                        { key: 'forecastMethod', label: 'Forecast Method', type: 'select', options: enums.FORECAST_METHOD, required: true },
                        { key: 'accuracy', label: 'Accuracy %', type: 'number' },
                        { key: 'parameters', label: 'Parameters', type: 'textarea' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        DemandPlan: {
            title: 'Demand Plan',
            sections: [
                {
                    title: 'Plan Details',
                    fields: [
                        { key: 'planName', label: 'Plan Name', type: 'text', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        PromotionalPlan: {
            title: 'Promotional Plan',
            sections: [
                {
                    title: 'Promotion Details',
                    fields: [
                        { key: 'planName', label: 'Plan Name', type: 'text', required: true },
                        { key: 'promotionType', label: 'Promotion Type', type: 'text', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'expectedUplift', label: 'Expected Uplift %', type: 'number' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        NewProductPlan: {
            title: 'New Product Plan',
            sections: [
                {
                    title: 'Product Plan Details',
                    fields: [
                        { key: 'productName', label: 'Product Name', type: 'text', required: true },
                        { key: 'launchDate', label: 'Launch Date', type: 'date', required: true },
                        { key: 'estimatedDemand', label: 'Estimated Demand', type: 'number' },
                        { key: 'rampUpPeriod', label: 'Ramp-Up Period', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        ForecastAccuracy: {
            title: 'Forecast Accuracy',
            sections: [
                {
                    title: 'Accuracy Details',
                    fields: [
                        { key: 'forecastId', label: 'Forecast', type: 'reference', lookupModel: 'DemandForecast', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'Item', required: true },
                        { key: 'forecastedQty', label: 'Forecasted Quantity', type: 'number' },
                        { key: 'actualQty', label: 'Actual Quantity', type: 'number' },
                        { key: 'accuracyPercent', label: 'Accuracy %', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    DemandPlanning.primaryKeys = {
        DemandForecast: 'forecastId',
        ForecastModel: 'modelId',
        DemandPlan: 'planId',
        PromotionalPlan: 'planId',
        NewProductPlan: 'planId',
        ForecastAccuracy: 'accuracyId'
    };

})();
