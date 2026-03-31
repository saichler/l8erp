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

    const col = window.Layer8ColumnFactory;
    const render = SalesBilling.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesBilling.columns = {
        SalesBillingSchedule: [
            ...col.id('scheduleId'),
            ...col.col('name', 'Name'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('customerId', 'Customer'),
            ...col.enum('frequency', 'Frequency', null, render.billingFrequency),
            ...col.date('nextBillingDate', 'Next Billing'),
            ...col.money('totalAmount', 'Total'),
        ],

        SalesRevenueSchedule: [
            ...col.id('scheduleId'),
            ...col.col('salesOrderId', 'Order'),
            ...col.money('totalRevenue', 'Total Revenue'),
            ...col.money('recognizedRevenue', 'Recognized'),
            ...col.money('deferredRevenue', 'Deferred'),
            ...col.col('recognitionMethod', 'Method'),
        ]
    };

})();
