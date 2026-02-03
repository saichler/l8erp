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
// Sales Billing Module - Column Configurations
// Table column definitions for all Sales Billing models

(function() {
    'use strict';

    window.SalesBilling = window.SalesBilling || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = SalesBilling.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesBilling.columns = {
        BillingSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'frequency',
                label: 'Frequency',
                sortKey: 'frequency',
                render: (item) => render.billingFrequency(item.frequency)
            },
            {
                key: 'nextBillingDate',
                label: 'Next Billing',
                sortKey: 'nextBillingDate',
                render: (item) => renderDate(item.nextBillingDate)
            },
            {
                key: 'totalAmount',
                label: 'Total',
                sortKey: 'totalAmount',
                render: (item) => renderMoney(item.totalAmount)
            }
        ],

        BillingMilestone: [
            { key: 'milestoneId', label: 'ID', sortKey: 'milestoneId', filterKey: 'milestoneId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'scheduleId', label: 'Schedule', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            {
                key: 'targetDate',
                label: 'Target',
                sortKey: 'targetDate',
                render: (item) => renderDate(item.targetDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.milestoneStatus(item.status)
            },
            {
                key: 'amount',
                label: 'Amount',
                sortKey: 'amount',
                render: (item) => renderMoney(item.amount)
            }
        ],

        RevenueSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            {
                key: 'totalRevenue',
                label: 'Total Revenue',
                sortKey: 'totalRevenue',
                render: (item) => renderMoney(item.totalRevenue)
            },
            {
                key: 'recognizedRevenue',
                label: 'Recognized',
                sortKey: 'recognizedRevenue',
                render: (item) => renderMoney(item.recognizedRevenue)
            },
            {
                key: 'deferredRevenue',
                label: 'Deferred',
                sortKey: 'deferredRevenue',
                render: (item) => renderMoney(item.deferredRevenue)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.revenueStatus(item.status)
            }
        ]
    };

})();
