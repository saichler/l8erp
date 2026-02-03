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
 * Mobile Sales Billing Module - Column Configurations
 * Desktop Equivalent: sales/billing/billing-columns.js
 */
(function() {
    'use strict';

    const enums = MobileSalesBilling.enums;
    const render = MobileSalesBilling.render;

    MobileSalesBilling.columns = {
        BillingSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'frequency', label: 'Frequency', sortKey: 'frequency', filterKey: 'frequency', enumValues: enums.BILLING_FREQUENCY_VALUES, render: (item) => render.billingFrequency(item.frequency) },
            { key: 'nextBillingDate', label: 'Next Billing', sortKey: 'nextBillingDate', render: (item) => Layer8MRenderers.renderDate(item.nextBillingDate) },
            { key: 'totalAmount', label: 'Total', sortKey: 'totalAmount', render: (item) => Layer8MRenderers.renderMoney(item.totalAmount) }
        ],

        BillingMilestone: [
            { key: 'milestoneId', label: 'ID', sortKey: 'milestoneId', filterKey: 'milestoneId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'scheduleId', label: 'Schedule', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'targetDate', label: 'Target', sortKey: 'targetDate', render: (item) => Layer8MRenderers.renderDate(item.targetDate) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.MILESTONE_STATUS_VALUES, render: (item) => render.milestoneStatus(item.status) },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => Layer8MRenderers.renderMoney(item.amount) }
        ],

        RevenueSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'totalRevenue', label: 'Total Revenue', sortKey: 'totalRevenue', render: (item) => Layer8MRenderers.renderMoney(item.totalRevenue) },
            { key: 'recognizedRevenue', label: 'Recognized', sortKey: 'recognizedRevenue', render: (item) => Layer8MRenderers.renderMoney(item.recognizedRevenue) },
            { key: 'deferredRevenue', label: 'Deferred', sortKey: 'deferredRevenue', render: (item) => Layer8MRenderers.renderMoney(item.deferredRevenue) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.REVENUE_STATUS_VALUES, render: (item) => render.revenueStatus(item.status) }
        ]
    };

    MobileSalesBilling.primaryKeys = {
        BillingSchedule: 'scheduleId', BillingMilestone: 'milestoneId',
        RevenueSchedule: 'scheduleId'
    };

})();
