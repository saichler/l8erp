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
// Projects Billing Module - Column Configurations

(function() {
    'use strict';

    window.PrjBilling = window.PrjBilling || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = PrjBilling.render;

    PrjBilling.columns = {
        PrjBillingRate: [
            { key: 'rateId', label: 'ID', sortKey: 'rateId', filterKey: 'rateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'role', label: 'Role', sortKey: 'role', filterKey: 'role' },
            { key: 'skillCategory', label: 'Skill Category', sortKey: 'skillCategory' },
            {
                key: 'rate',
                label: 'Rate',
                sortKey: 'rate',
                render: (item) => renderMoney(item.rate)
            },
            { key: 'rateUnit', label: 'Rate Unit', sortKey: 'rateUnit' },
            {
                key: 'effectiveFrom',
                label: 'Effective From',
                sortKey: 'effectiveFrom',
                render: (item) => renderDate(item.effectiveFrom)
            },
            {
                key: 'effectiveUntil',
                label: 'Effective Until',
                sortKey: 'effectiveUntil',
                render: (item) => renderDate(item.effectiveUntil)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        PrjBillingSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'billingType',
                label: 'Billing Type',
                sortKey: 'billingType',
                render: (item) => render.billingType(item.billingType)
            },
            { key: 'billingFrequency', label: 'Frequency', sortKey: 'billingFrequency' },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End Date',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        PrjBillingMilestone: [
            { key: 'milestoneId', label: 'ID', sortKey: 'milestoneId', filterKey: 'milestoneId' },
            { key: 'scheduleId', label: 'Schedule', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'amount',
                label: 'Amount',
                sortKey: 'amount',
                render: (item) => renderMoney(item.amount)
            },
            { key: 'percentage', label: 'Percentage', sortKey: 'percentage' },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            {
                key: 'billedDate',
                label: 'Billed Date',
                sortKey: 'billedDate',
                render: (item) => renderDate(item.billedDate)
            },
            {
                key: 'isBilled',
                label: 'Billed',
                sortKey: 'isBilled',
                render: (item) => item.isBilled ? 'Yes' : 'No'
            }
        ],

        PrjProjectInvoice: [
            { key: 'invoiceId', label: 'ID', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'invoiceNumber', label: 'Invoice Number', sortKey: 'invoiceNumber', filterKey: 'invoiceNumber' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.invoiceStatus(item.status)
            },
            {
                key: 'invoiceDate',
                label: 'Invoice Date',
                sortKey: 'invoiceDate',
                render: (item) => renderDate(item.invoiceDate)
            },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            {
                key: 'totalAmount',
                label: 'Total Amount',
                sortKey: 'totalAmount',
                render: (item) => renderMoney(item.totalAmount)
            },
            {
                key: 'paidAmount',
                label: 'Paid Amount',
                sortKey: 'paidAmount',
                render: (item) => renderMoney(item.paidAmount)
            }
        ],

        PrjInvoiceLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'invoiceId', label: 'Invoice', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            { key: 'lineNumber', label: 'Line #', sortKey: 'lineNumber' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'unitPrice',
                label: 'Unit Price',
                sortKey: 'unitPrice',
                render: (item) => renderMoney(item.unitPrice)
            },
            {
                key: 'amount',
                label: 'Amount',
                sortKey: 'amount',
                render: (item) => renderMoney(item.amount)
            },
            {
                key: 'isTaxable',
                label: 'Taxable',
                sortKey: 'isTaxable',
                render: (item) => item.isTaxable ? 'Yes' : 'No'
            }
        ],

        PrjRevenueRecognition: [
            { key: 'recognitionId', label: 'ID', sortKey: 'recognitionId', filterKey: 'recognitionId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            {
                key: 'method',
                label: 'Method',
                sortKey: 'method',
                render: (item) => render.revenueRecognitionMethod(item.method)
            },
            {
                key: 'recognizedAmount',
                label: 'Recognized',
                sortKey: 'recognizedAmount',
                render: (item) => renderMoney(item.recognizedAmount)
            },
            {
                key: 'deferredAmount',
                label: 'Deferred',
                sortKey: 'deferredAmount',
                render: (item) => renderMoney(item.deferredAmount)
            },
            { key: 'percentComplete', label: '% Complete', sortKey: 'percentComplete' },
            {
                key: 'periodEnd',
                label: 'Period End',
                sortKey: 'periodEnd',
                render: (item) => renderDate(item.periodEnd)
            },
            {
                key: 'isPosted',
                label: 'Posted',
                sortKey: 'isPosted',
                render: (item) => item.isPosted ? 'Yes' : 'No'
            }
        ],

        PrjProjectBudget: [
            { key: 'budgetId', label: 'ID', sortKey: 'budgetId', filterKey: 'budgetId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'budgetType', label: 'Budget Type', sortKey: 'budgetType' },
            {
                key: 'budgetedAmount',
                label: 'Budgeted',
                sortKey: 'budgetedAmount',
                render: (item) => renderMoney(item.budgetedAmount)
            },
            {
                key: 'actualAmount',
                label: 'Actual',
                sortKey: 'actualAmount',
                render: (item) => renderMoney(item.actualAmount)
            },
            {
                key: 'remainingAmount',
                label: 'Remaining',
                sortKey: 'remainingAmount',
                render: (item) => renderMoney(item.remainingAmount)
            },
            {
                key: 'approvedDate',
                label: 'Approved Date',
                sortKey: 'approvedDate',
                render: (item) => renderDate(item.approvedDate)
            },
            {
                key: 'isApproved',
                label: 'Approved',
                sortKey: 'isApproved',
                render: (item) => item.isApproved ? 'Yes' : 'No'
            }
        ]
    };

})();
