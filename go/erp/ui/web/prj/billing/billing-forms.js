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
// Projects Billing Module - Form Definitions

(function() {
    'use strict';

    window.PrjBilling = window.PrjBilling || {};

    const enums = PrjBilling.enums;

    PrjBilling.forms = {
        PrjBillingRate: {
            title: 'Billing Rate',
            sections: [
                {
                    title: 'Rate Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject' },
                        { key: 'resourceId', label: 'Resource', type: 'reference', lookupModel: 'PrjResource' },
                        { key: 'role', label: 'Role', type: 'text' },
                        { key: 'skillCategory', label: 'Skill Category', type: 'text' },
                        { key: 'rate', label: 'Rate', type: 'money', required: true },
                        { key: 'rateUnit', label: 'Rate Unit', type: 'text' },
                        { key: 'overtimeRate', label: 'Overtime Rate', type: 'money' },
                        { key: 'effectiveFrom', label: 'Effective From', type: 'date' },
                        { key: 'effectiveUntil', label: 'Effective Until', type: 'date' },
                        { key: 'currencyCode', label: 'Currency Code', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjBillingSchedule: {
            title: 'Billing Schedule',
            sections: [
                {
                    title: 'Schedule Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'billingType', label: 'Billing Type', type: 'select', options: enums.BILLING_TYPE },
                        { key: 'billingFrequency', label: 'Billing Frequency', type: 'text' },
                        { key: 'billingDay', label: 'Billing Day', type: 'number' },
                        { key: 'fixedAmount', label: 'Fixed Amount', type: 'money' },
                        { key: 'retainerAmount', label: 'Retainer Amount', type: 'money' },
                        { key: 'includeExpenses', label: 'Include Expenses', type: 'checkbox' },
                        { key: 'expenseMarkupPercent', label: 'Expense Markup %', type: 'number' },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjBillingMilestone: {
            title: 'Billing Milestone',
            sections: [
                {
                    title: 'Milestone Details',
                    fields: [
                        { key: 'scheduleId', label: 'Billing Schedule', type: 'reference', lookupModel: 'PrjBillingSchedule', required: true },
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'projectMilestoneId', label: 'Project Milestone', type: 'reference', lookupModel: 'PrjMilestone' },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'amount', label: 'Amount', type: 'money', required: true },
                        { key: 'percentage', label: 'Percentage', type: 'number' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'billedDate', label: 'Billed Date', type: 'date' },
                        { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'PrjProjectInvoice' },
                        { key: 'deliverables', label: 'Deliverables', type: 'textarea' },
                        { key: 'isBilled', label: 'Billed', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjProjectInvoice: {
            title: 'Project Invoice',
            sections: [
                {
                    title: 'Invoice Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer' },
                        { key: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true },
                        { key: 'poNumber', label: 'PO Number', type: 'text' },
                        { key: 'invoiceDate', label: 'Invoice Date', type: 'date', required: true },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'periodStart', label: 'Period Start', type: 'date' },
                        { key: 'periodEnd', label: 'Period End', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.INVOICE_STATUS },
                        { key: 'paymentTerms', label: 'Payment Terms', type: 'text' },
                        { key: 'currencyCode', label: 'Currency Code', type: 'text' }
                    ]
                },
                {
                    title: 'Amounts',
                    fields: [
                        { key: 'subtotal', label: 'Subtotal', type: 'money' },
                        { key: 'taxAmount', label: 'Tax Amount', type: 'money' },
                        { key: 'totalAmount', label: 'Total Amount', type: 'money' },
                        { key: 'paidAmount', label: 'Paid Amount', type: 'money' },
                        { key: 'balanceDue', label: 'Balance Due', type: 'money' }
                    ]
                },
                {
                    title: 'Additional Information',
                    fields: [
                        { key: 'notes', label: 'Notes', type: 'textarea' },
                        { key: 'sentDate', label: 'Sent Date', type: 'date' },
                        { key: 'paidDate', label: 'Paid Date', type: 'date' }
                    ]
                }
            ]
        },

        PrjInvoiceLine: {
            title: 'Invoice Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'PrjProjectInvoice', required: true },
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject' },
                        { key: 'taskId', label: 'Task', type: 'reference', lookupModel: 'PrjTask' },
                        { key: 'timesheetEntryId', label: 'Timesheet Entry', type: 'reference', lookupModel: 'PrjTimesheetEntry' },
                        { key: 'expenseEntryId', label: 'Expense Entry', type: 'reference', lookupModel: 'PrjExpenseEntry' },
                        { key: 'billingMilestoneId', label: 'Billing Milestone', type: 'reference', lookupModel: 'PrjBillingMilestone' },
                        { key: 'lineNumber', label: 'Line Number', type: 'number' },
                        { key: 'description', label: 'Description', type: 'textarea', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unit', label: 'Unit', type: 'text' },
                        { key: 'unitPrice', label: 'Unit Price', type: 'money', required: true },
                        { key: 'amount', label: 'Amount', type: 'money' },
                        { key: 'taxAmount', label: 'Tax Amount', type: 'money' },
                        { key: 'totalAmount', label: 'Total Amount', type: 'money' },
                        { key: 'lineType', label: 'Line Type', type: 'text' },
                        { key: 'isTaxable', label: 'Taxable', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjRevenueRecognition: {
            title: 'Revenue Recognition',
            sections: [
                {
                    title: 'Recognition Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'PrjProjectInvoice' },
                        { key: 'method', label: 'Recognition Method', type: 'select', options: enums.REVENUE_RECOGNITION_METHOD },
                        { key: 'recognitionDate', label: 'Recognition Date', type: 'date', required: true },
                        { key: 'periodStart', label: 'Period Start', type: 'date' },
                        { key: 'periodEnd', label: 'Period End', type: 'date' },
                        { key: 'percentComplete', label: 'Percent Complete', type: 'number' }
                    ]
                },
                {
                    title: 'Amounts',
                    fields: [
                        { key: 'recognizedAmount', label: 'Recognized Amount', type: 'money' },
                        { key: 'deferredAmount', label: 'Deferred Amount', type: 'money' },
                        { key: 'cumulativeRecognized', label: 'Cumulative Recognized', type: 'money' }
                    ]
                },
                {
                    title: 'GL Information',
                    fields: [
                        { key: 'glAccount', label: 'GL Account', type: 'text' },
                        { key: 'deferredGlAccount', label: 'Deferred GL Account', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' },
                        { key: 'isPosted', label: 'Posted', type: 'checkbox' },
                        { key: 'postedDate', label: 'Posted Date', type: 'date' }
                    ]
                }
            ]
        },

        PrjProjectBudget: {
            title: 'Project Budget',
            sections: [
                {
                    title: 'Budget Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'budgetType', label: 'Budget Type', type: 'text' },
                        { key: 'phaseId', label: 'Phase', type: 'reference', lookupModel: 'PrjPhase' },
                        { key: 'periodStart', label: 'Period Start', type: 'date' },
                        { key: 'periodEnd', label: 'Period End', type: 'date' },
                        { key: 'version', label: 'Version', type: 'number' }
                    ]
                },
                {
                    title: 'Budget Amounts',
                    fields: [
                        { key: 'budgetedAmount', label: 'Budgeted Amount', type: 'money', required: true },
                        { key: 'committedAmount', label: 'Committed Amount', type: 'money' },
                        { key: 'actualAmount', label: 'Actual Amount', type: 'money' },
                        { key: 'remainingAmount', label: 'Remaining Amount', type: 'money' }
                    ]
                },
                {
                    title: 'Hours',
                    fields: [
                        { key: 'budgetedHours', label: 'Budgeted Hours', type: 'number' },
                        { key: 'actualHours', label: 'Actual Hours', type: 'number' },
                        { key: 'remainingHours', label: 'Remaining Hours', type: 'number' }
                    ]
                },
                {
                    title: 'Approval',
                    fields: [
                        { key: 'isApproved', label: 'Approved', type: 'checkbox' },
                        { key: 'approvedBy', label: 'Approved By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'approvedDate', label: 'Approved Date', type: 'date' }
                    ]
                }
            ]
        }
    };

    PrjBilling.primaryKeys = {
        PrjBillingRate: 'rateId',
        PrjBillingSchedule: 'scheduleId',
        PrjBillingMilestone: 'milestoneId',
        PrjProjectInvoice: 'invoiceId',
        PrjInvoiceLine: 'lineId',
        PrjRevenueRecognition: 'recognitionId',
        PrjProjectBudget: 'budgetId'
    };

})();
