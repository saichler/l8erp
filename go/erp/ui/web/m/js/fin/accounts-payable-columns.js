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
 * Mobile Accounts Payable Module - Column Configurations
 * Desktop Equivalent: fin/accounts-payable/accounts-payable-columns.js
 */
(function() {
    'use strict';

    const enums = MobileAccountsPayable.enums;
    const render = MobileAccountsPayable.render;

    MobileAccountsPayable.columns = {
        Vendor: [
            { key: 'vendorId', label: 'ID', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'vendorNumber', label: 'Vendor #', sortKey: 'vendorNumber', filterKey: 'vendorNumber' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.VENDOR_STATUS_VALUES, render: (item) => render.vendorStatus(item.status) },
            { key: 'paymentTerms', label: 'Payment Terms', sortKey: 'paymentTerms', filterKey: 'paymentTerms' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        VendorContact: [
            { key: 'contactId', label: 'ID', sortKey: 'contactId', filterKey: 'contactId' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'contactName', label: 'Contact Name', sortKey: 'contactName', filterKey: 'contactName' },
            { key: 'email', label: 'Email', sortKey: 'email', filterKey: 'email' },
            { key: 'phone', label: 'Phone', sortKey: 'phone', filterKey: 'phone' },
            { key: 'isPrimary', label: 'Primary', sortKey: 'isPrimary', render: (item) => Layer8MRenderers.renderBoolean(item.isPrimary) }
        ],

        PurchaseInvoice: [
            { key: 'invoiceId', label: 'ID', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            { key: 'invoiceNumber', label: 'Invoice #', sortKey: 'invoiceNumber', filterKey: 'invoiceNumber' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'invoiceDate', label: 'Invoice Date', sortKey: 'invoiceDate', render: (item) => Layer8MRenderers.renderDate(item.invoiceDate) },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => Layer8MRenderers.renderDate(item.dueDate) },
            { key: 'totalAmount', label: 'Total', sortKey: 'totalAmount', render: (item) => Layer8MRenderers.renderMoney(item.totalAmount) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.INVOICE_STATUS_VALUES, render: (item) => render.invoiceStatus(item.status) }
        ],

        PurchaseInvoiceLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'invoiceId', label: 'Invoice', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            { key: 'unitPrice', label: 'Unit Price', sortKey: 'unitPrice', render: (item) => Layer8MRenderers.renderMoney(item.unitPrice) },
            { key: 'lineTotal', label: 'Line Total', sortKey: 'lineTotal', render: (item) => Layer8MRenderers.renderMoney(item.lineTotal) }
        ],

        PaymentSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'invoiceId', label: 'Invoice', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => Layer8MRenderers.renderDate(item.dueDate) },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => Layer8MRenderers.renderMoney(item.amount) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.PAYMENT_STATUS_VALUES, render: (item) => render.paymentStatus(item.status) }
        ],

        VendorPayment: [
            { key: 'paymentId', label: 'ID', sortKey: 'paymentId', filterKey: 'paymentId' },
            { key: 'paymentNumber', label: 'Payment #', sortKey: 'paymentNumber', filterKey: 'paymentNumber' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'paymentDate', label: 'Payment Date', sortKey: 'paymentDate', render: (item) => Layer8MRenderers.renderDate(item.paymentDate) },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => Layer8MRenderers.renderMoney(item.amount) },
            { key: 'paymentMethod', label: 'Method', sortKey: 'paymentMethod', render: (item) => render.paymentMethod(item.paymentMethod) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.PAYMENT_STATUS_VALUES, render: (item) => render.paymentStatus(item.status) }
        ],

        PaymentAllocation: [
            { key: 'allocationId', label: 'ID', sortKey: 'allocationId', filterKey: 'allocationId' },
            { key: 'paymentId', label: 'Payment', sortKey: 'paymentId', filterKey: 'paymentId' },
            { key: 'invoiceId', label: 'Invoice', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            { key: 'allocatedAmount', label: 'Allocated', sortKey: 'allocatedAmount', render: (item) => Layer8MRenderers.renderMoney(item.allocatedAmount) }
        ],

        VendorStatement: [
            { key: 'statementId', label: 'ID', sortKey: 'statementId', filterKey: 'statementId' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'statementDate', label: 'Statement Date', sortKey: 'statementDate', render: (item) => Layer8MRenderers.renderDate(item.statementDate) },
            { key: 'totalBalance', label: 'Total Balance', sortKey: 'totalBalance', render: (item) => Layer8MRenderers.renderMoney(item.totalBalance) }
        ]
    };

    MobileAccountsPayable.primaryKeys = {
        Vendor: 'vendorId', VendorContact: 'contactId', PurchaseInvoice: 'invoiceId',
        PurchaseInvoiceLine: 'lineId', PaymentSchedule: 'scheduleId', VendorPayment: 'paymentId',
        PaymentAllocation: 'allocationId', VendorStatement: 'statementId'
    };

})();
