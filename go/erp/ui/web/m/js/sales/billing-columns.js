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

    const col = window.Layer8ColumnFactory;
    const enums = MobileSalesBilling.enums;
    const render = MobileSalesBilling.render;

    MobileSalesBilling.columns = {
        BillingSchedule: [
            ...col.id('scheduleId'),
            ...col.col('name', 'Name'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('customerId', 'Customer'),
            ...col.status('frequency', 'Frequency', enums.BILLING_FREQUENCY_VALUES, render.billingFrequency),
            ...col.date('nextBillingDate', 'Next Billing'),
            ...col.money('totalAmount', 'Total')
        ],

        RevenueSchedule: [
            ...col.id('scheduleId'),
            ...col.col('salesOrderId', 'Order'),
            ...col.money('totalRevenue', 'Total Revenue'),
            ...col.money('recognizedRevenue', 'Recognized'),
            ...col.money('deferredRevenue', 'Deferred'),
            ...col.col('recognitionMethod', 'Method')
        ]
    };

    MobileSalesBilling.primaryKeys = {
        BillingSchedule: 'scheduleId',
        RevenueSchedule: 'scheduleId'
    };

})();
