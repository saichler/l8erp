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
// Sales Analytics Module - Form Definitions
// Form field configurations for all Sales Analytics models

(function() {
    'use strict';

    window.SalesAnalytics = window.SalesAnalytics || {};

    const enums = SalesAnalytics.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    SalesAnalytics.forms = {
        SalesTarget: {
            title: 'Sales Target',
            sections: [
                {
                    title: 'Target Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'salespersonId', label: 'Salesperson', type: 'reference', lookupModel: 'Employee' },
                        { key: 'territoryId', label: 'Territory', type: 'reference', lookupModel: 'SalesTerritory' },
                        { key: 'periodStart', label: 'Period Start', type: 'date', required: true },
                        { key: 'periodEnd', label: 'Period End', type: 'date', required: true },
                        { key: 'targetAmount', label: 'Target Amount', type: 'currency', required: true },
                        { key: 'achievedAmount', label: 'Achieved Amount', type: 'currency' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TARGET_STATUS },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesTerritory: {
            title: 'Sales Territory',
            sections: [
                {
                    title: 'Territory Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'territoryType', label: 'Type', type: 'select', options: enums.TERRITORY_TYPE, required: true },
                        { key: 'parentId', label: 'Parent Territory', type: 'reference', lookupModel: 'SalesTerritory' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'region', label: 'Region', type: 'text' },
                        { key: 'country', label: 'Country', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        SalesTerritoryAssign: {
            title: 'Territory Assignment',
            sections: [
                {
                    title: 'Assignment Details',
                    fields: [
                        { key: 'territoryId', label: 'Territory', type: 'reference', lookupModel: 'SalesTerritory', required: true },
                        { key: 'salespersonId', label: 'Salesperson', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'isPrimary', label: 'Primary Assignment', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesCommissionPlan: {
            title: 'Commission Plan',
            sections: [
                {
                    title: 'Plan Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'commissionType', label: 'Commission Type', type: 'select', options: enums.COMMISSION_TYPE, required: true },
                        { key: 'rate', label: 'Rate/Percentage', type: 'number', required: true },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' },
                        { key: 'minSaleAmount', label: 'Min Sale Amount', type: 'currency' },
                        { key: 'maxCommission', label: 'Max Commission', type: 'currency' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        SalesCommissionCalc: {
            title: 'Commission Calculation',
            sections: [
                {
                    title: 'Calculation Details',
                    fields: [
                        { key: 'salespersonId', label: 'Salesperson', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'planId', label: 'Commission Plan', type: 'reference', lookupModel: 'SalesCommissionPlan', required: true },
                        { key: 'salesOrderId', label: 'Sales Order', type: 'reference', lookupModel: 'SalesOrder' },
                        { key: 'saleAmount', label: 'Sale Amount', type: 'currency', required: true },
                        { key: 'commissionRate', label: 'Commission Rate', type: 'number' },
                        { key: 'commissionAmount', label: 'Commission Amount', type: 'currency' },
                        { key: 'calcDate', label: 'Calculation Date', type: 'date' },
                        { key: 'isPaid', label: 'Paid', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesForecast: {
            title: 'Sales Forecast',
            sections: [
                {
                    title: 'Forecast Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'salespersonId', label: 'Salesperson', type: 'reference', lookupModel: 'Employee' },
                        { key: 'territoryId', label: 'Territory', type: 'reference', lookupModel: 'SalesTerritory' },
                        { key: 'category', label: 'Category', type: 'select', options: enums.FORECAST_CATEGORY, required: true },
                        { key: 'forecastDate', label: 'Forecast Date', type: 'date', required: true },
                        { key: 'periodStart', label: 'Period Start', type: 'date' },
                        { key: 'periodEnd', label: 'Period End', type: 'date' },
                        { key: 'forecastAmount', label: 'Forecast Amount', type: 'currency', required: true },
                        { key: 'probability', label: 'Probability %', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    SalesAnalytics.primaryKeys = {
        SalesTarget: 'targetId',
        SalesTerritory: 'territoryId',
        SalesTerritoryAssign: 'assignmentId',
        SalesCommissionPlan: 'planId',
        SalesCommissionCalc: 'calcId',
        SalesForecast: 'forecastId'
    };

})();
