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
// Sales Billing Module - Form Definitions
// Form field configurations for all Sales Billing models

(function() {
    'use strict';

    window.SalesBilling = window.SalesBilling || {};

    const enums = SalesBilling.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    SalesBilling.forms = {
        SalesBillingSchedule: {
            title: 'Billing Schedule',
            sections: [
                {
                    title: 'Schedule Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'salesOrderId', label: 'Sales Order', type: 'reference', lookupModel: 'SalesOrder', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'frequency', label: 'Frequency', type: 'select', options: enums.BILLING_FREQUENCY, required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'nextBillingDate', label: 'Next Billing Date', type: 'date' },
                        { key: 'totalAmount', label: 'Total Amount', type: 'currency' },
                        { key: 'billedAmount', label: 'Billed Amount', type: 'currency' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesBillingMilestone: {
            title: 'Billing Milestone',
            sections: [
                {
                    title: 'Milestone Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'scheduleId', label: 'Billing Schedule', type: 'reference', lookupModel: 'SalesBillingSchedule', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'targetDate', label: 'Target Date', type: 'date', required: true },
                        { key: 'achievedDate', label: 'Achieved Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.MILESTONE_STATUS },
                        { key: 'amount', label: 'Amount', type: 'currency', required: true },
                        { key: 'percentage', label: 'Percentage', type: 'number' },
                        { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'SalesInvoice' }
                    ]
                }
            ]
        },

        SalesRevenueSchedule: {
            title: 'Revenue Schedule',
            sections: [
                {
                    title: 'Revenue Details',
                    fields: [
                        { key: 'salesOrderId', label: 'Sales Order', type: 'reference', lookupModel: 'SalesOrder', required: true },
                        { key: 'recognitionMethod', label: 'Recognition Method', type: 'text' },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'totalRevenue', label: 'Total Revenue', type: 'currency', required: true },
                        { key: 'recognizedRevenue', label: 'Recognized Revenue', type: 'currency' },
                        { key: 'deferredRevenue', label: 'Deferred Revenue', type: 'currency' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.REVENUE_STATUS },
                        { key: 'accountId', label: 'Revenue Account', type: 'reference', lookupModel: 'Account' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    SalesBilling.primaryKeys = {
        SalesBillingSchedule: 'scheduleId',
        SalesBillingMilestone: 'milestoneId',
        SalesRevenueSchedule: 'scheduleId'
    };

})();
