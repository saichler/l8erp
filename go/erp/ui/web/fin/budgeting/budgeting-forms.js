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
// Budgeting Module - Form Definitions
// Form field configurations for all Budgeting models

(function() {
    'use strict';

    // Ensure Budgeting namespace exists
    window.Budgeting = window.Budgeting || {};

    const enums = Budgeting.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    Budgeting.forms = {
        Budget: {
            title: 'Budget',
            sections: [
                {
                    title: 'Budget Information',
                    fields: [
                        { key: 'budgetName', label: 'Budget Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'budgetType', label: 'Budget Type', type: 'select', options: enums.BUDGET_TYPE, required: true },
                        { key: 'fiscalYearId', label: 'Fiscal Year', type: 'reference', lookupModel: 'FiscalYear', required: true },
                        { key: 'totalAmount', label: 'Total Amount', type: 'currency', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.BUDGET_STATUS }
                    ]
                }
            ]
        },

        BudgetLine: {
            title: 'Budget Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'budgetId', label: 'Budget', type: 'reference', lookupModel: 'Budget', required: true },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'Account', required: true },
                        { key: 'budgetedAmount', label: 'Budgeted Amount', type: 'currency', required: true },
                        { key: 'actualAmount', label: 'Actual Amount', type: 'currency' },
                        { key: 'variance', label: 'Variance', type: 'currency' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        BudgetTransfer: {
            title: 'Budget Transfer',
            sections: [
                {
                    title: 'Transfer Details',
                    fields: [
                        { key: 'fromBudgetLineId', label: 'From Budget Line', type: 'reference', lookupModel: 'BudgetLine', required: true },
                        { key: 'toBudgetLineId', label: 'To Budget Line', type: 'reference', lookupModel: 'BudgetLine', required: true },
                        { key: 'amount', label: 'Amount', type: 'currency', required: true },
                        { key: 'transferDate', label: 'Transfer Date', type: 'date', required: true },
                        { key: 'reason', label: 'Reason', type: 'textarea' }
                    ]
                }
            ]
        },

        BudgetScenario: {
            title: 'Budget Scenario',
            sections: [
                {
                    title: 'Scenario Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'budgetId', label: 'Budget', type: 'reference', lookupModel: 'Budget', required: true },
                        { key: 'isBaseline', label: 'Baseline', type: 'checkbox' }
                    ]
                }
            ]
        },

        CapitalExpenditure: {
            title: 'Capital Expenditure',
            sections: [
                {
                    title: 'CapEx Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'requestedAmount', label: 'Requested Amount', type: 'currency', required: true },
                        { key: 'approvedAmount', label: 'Approved Amount', type: 'currency' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CAPEX_STATUS },
                        { key: 'justification', label: 'Justification', type: 'textarea' }
                    ]
                }
            ]
        },

        Forecast: {
            title: 'Forecast',
            sections: [
                {
                    title: 'Forecast Details',
                    fields: [
                        { key: 'forecastType', label: 'Forecast Type', type: 'select', options: enums.FORECAST_TYPE, required: true },
                        { key: 'periodStart', label: 'Period Start', type: 'date', required: true },
                        { key: 'periodEnd', label: 'Period End', type: 'date', required: true },
                        { key: 'forecastAmount', label: 'Forecast Amount', type: 'currency', required: true },
                        { key: 'actualAmount', label: 'Actual Amount', type: 'currency' },
                        { key: 'assumptions', label: 'Assumptions', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    Budgeting.primaryKeys = {
        Budget: 'budgetId',
        BudgetLine: 'lineId',
        BudgetTransfer: 'transferId',
        BudgetScenario: 'scenarioId',
        CapitalExpenditure: 'capexId',
        Forecast: 'forecastId'
    };

})();
