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
// Accounts Payable Module - Column Configurations
// Table column definitions for all Accounts Payable models

(function() {
    'use strict';

    // Ensure AccountsPayable namespace exists
    window.AccountsPayable = window.AccountsPayable || {};

    const col = window.Layer8ColumnFactory;
    const render = AccountsPayable.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    AccountsPayable.columns = {
        Vendor: [
            ...col.id('vendorId'),
            ...col.col('vendorNumber', 'Vendor #'),
            ...col.col('name', 'Name'),
            ...col.enum('status', 'Status', null, render.vendorStatus),
            ...col.col('paymentTermDays', 'Payment Terms'),
        ],

        PurchaseInvoice: [
            ...col.id('invoiceId'),
            ...col.col('invoiceNumber', 'Invoice #'),
            ...col.col('vendorId', 'Vendor'),
            ...col.date('invoiceDate', 'Invoice Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.money('totalAmount', 'Total'),
            ...col.enum('status', 'Status', null, render.invoiceStatus),
        ],

        PaymentSchedule: [
            ...col.id('scheduleId'),
            ...col.col('invoiceId', 'Invoice'),
            ...col.date('scheduledDate', 'Scheduled Date'),
            ...col.money('amount', 'Amount'),
            ...col.boolean('isPaid', 'Paid'),
        ],

        VendorPayment: [
            ...col.id('paymentId'),
            ...col.col('vendorId', 'Vendor'),
            ...col.date('paymentDate', 'Payment Date'),
            ...col.money('amount', 'Amount'),
            ...col.enum('paymentMethod', 'Method', null, render.paymentMethod),
            ...col.enum('status', 'Status', null, render.paymentStatus),
        ],

        VendorStatement: [
            ...col.id('statementId'),
            ...col.col('vendorId', 'Vendor'),
            ...col.date('statementDate', 'Statement Date'),
            ...col.money('closingBalance', 'Closing Balance'),
        ]
    };

})();
