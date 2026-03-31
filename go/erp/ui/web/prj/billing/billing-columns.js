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

    const col = window.Layer8ColumnFactory;
    const render = PrjBilling.render;

    PrjBilling.columns = {
        PrjBillingRate: [
            ...col.id('rateId'),
            ...col.col('name', 'Name'),
            ...col.col('role', 'Role'),
            ...col.col('skillCategory', 'Skill Category'),
            ...col.money('rate', 'Rate'),
            ...col.col('rateUnit', 'Rate Unit'),
            ...col.date('effectiveFrom', 'Effective From'),
            ...col.date('effectiveUntil', 'Effective Until'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjBillingSchedule: [
            ...col.id('scheduleId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.enum('billingType', 'Billing Type', null, render.billingType),
            ...col.col('billingFrequency', 'Frequency'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjProjectInvoice: [
            ...col.id('invoiceId'),
            ...col.col('projectId', 'Project'),
            ...col.col('invoiceNumber', 'Invoice Number'),
            ...col.enum('status', 'Status', null, render.invoiceStatus),
            ...col.date('invoiceDate', 'Invoice Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.money('totalAmount', 'Total Amount'),
            ...col.money('paidAmount', 'Paid Amount')
        ],

        PrjRevenueRecognition: [
            ...col.id('recognitionId'),
            ...col.col('projectId', 'Project'),
            ...col.enum('method', 'Method', null, render.revenueRecognitionMethod),
            ...col.money('recognizedAmount', 'Recognized'),
            ...col.money('deferredAmount', 'Deferred'),
            ...col.col('percentComplete', '% Complete'),
            ...col.date('periodEnd', 'Period End'),
            ...col.boolean('isPosted', 'Posted')
        ],

        PrjProjectBudget: [
            ...col.id('budgetId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.col('budgetType', 'Budget Type'),
            ...col.money('budgetedAmount', 'Budgeted'),
            ...col.money('actualAmount', 'Actual'),
            ...col.money('remainingAmount', 'Remaining'),
            ...col.date('approvedDate', 'Approved Date'),
            ...col.boolean('isApproved', 'Approved')
        ]
    };

})();
