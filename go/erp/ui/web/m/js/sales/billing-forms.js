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
 * Mobile Sales Billing Module - Form Configurations
 * Desktop Equivalent: sales/billing/billing-forms.js
 */
window.MobileSalesBilling = window.MobileSalesBilling || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileSalesBilling.enums;

    MobileSalesBilling.forms = {
        BillingSchedule: f.form('Billing Schedule', [
            f.section('Schedule Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('frequency', 'Frequency', enums.BILLING_FREQUENCY, true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date'),
                ...f.date('nextBillingDate', 'Next Billing Date'),
                ...f.money('totalAmount', 'Total Amount'),
                ...f.money('billedAmount', 'Billed Amount'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        BillingMilestone: f.form('Billing Milestone', [
            f.section('Milestone Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('scheduleId', 'Billing Schedule', 'BillingSchedule', true),
                ...f.textarea('description', 'Description'),
                ...f.date('targetDate', 'Target Date', true),
                ...f.date('actualDate', 'Actual Date'),
                ...f.select('status', 'Status', enums.MILESTONE_STATUS),
                ...f.money('amount', 'Amount', true),
                ...f.number('percentage', 'Percentage'),
                ...f.reference('invoiceId', 'Invoice', 'SalesInvoice')
            ])
        ]),

        RevenueSchedule: f.form('Revenue Schedule', [
            f.section('Revenue Details', [
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder', true),
                ...f.text('recognitionMethod', 'Recognition Method'),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.money('totalRevenue', 'Total Revenue', true),
                ...f.money('recognizedRevenue', 'Recognized Revenue'),
                ...f.money('deferredRevenue', 'Deferred Revenue'),
                ...f.reference('revenueAccountId', 'Revenue Account', 'Account'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
