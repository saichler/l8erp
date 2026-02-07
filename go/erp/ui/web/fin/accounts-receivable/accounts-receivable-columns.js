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
// Accounts Receivable Module - Column Configurations
// Part 2 of 4 - Load after accounts-receivable-enums.js

(function() {
    'use strict';

    // Ensure AccountsReceivable namespace exists
    window.AccountsReceivable = window.AccountsReceivable || {};

    const { renderBoolean, renderDate, renderMoney } = Layer8DRenderers;
    const render = AccountsReceivable.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    AccountsReceivable.columns = {
        Customer: [
            { key: 'customerId', label: 'ID', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'customerNumber', label: 'Customer #', sortKey: 'customerNumber', filterKey: 'customerNumber' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.customerStatus(item.status)
            },
            {
                key: 'creditLimit',
                label: 'Credit Limit',
                sortKey: 'creditLimit',
                render: (item) => renderMoney(item.creditLimit)
            },
        ],

        CustomerContact: [
            { key: 'contactId', label: 'ID', sortKey: 'contactId', filterKey: 'contactId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'firstName', label: 'First Name', sortKey: 'firstName', filterKey: 'firstName' },
            { key: 'lastName', label: 'Last Name', sortKey: 'lastName', filterKey: 'lastName' },
            { key: 'email', label: 'Email', sortKey: 'email', filterKey: 'email' },
            { key: 'phone', label: 'Phone', sortKey: 'phone', filterKey: 'phone' },
            {
                key: 'isPrimary',
                label: 'Primary',
                sortKey: 'isPrimary',
                render: (item) => renderBoolean(item.isPrimary)
            }
        ],

        SalesInvoice: [
            { key: 'invoiceId', label: 'ID', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            { key: 'invoiceNumber', label: 'Invoice #', sortKey: 'invoiceNumber', filterKey: 'invoiceNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
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
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.invoiceStatus(item.status)
            }
        ],

        SalesInvoiceLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'invoiceId', label: 'Invoice', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'unitPrice',
                label: 'Unit Price',
                sortKey: 'unitPrice',
                render: (item) => renderMoney(item.unitPrice)
            },
            {
                key: 'lineAmount',
                label: 'Line Amount',
                sortKey: 'lineAmount',
                render: (item) => renderMoney(item.lineAmount)
            }
        ],

        CustomerPayment: [
            { key: 'paymentId', label: 'ID', sortKey: 'paymentId', filterKey: 'paymentId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'paymentDate',
                label: 'Payment Date',
                sortKey: 'paymentDate',
                render: (item) => renderDate(item.paymentDate)
            },
            {
                key: 'amount',
                label: 'Amount',
                sortKey: 'amount',
                render: (item) => renderMoney(item.amount)
            },
            {
                key: 'paymentMethod',
                label: 'Method',
                sortKey: 'paymentMethod',
                render: (item) => render.paymentMethod(item.paymentMethod)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.paymentStatus(item.status)
            }
        ],

        PaymentApplication: [
            { key: 'applicationId', label: 'ID', sortKey: 'applicationId', filterKey: 'applicationId' },
            { key: 'paymentId', label: 'Payment', sortKey: 'paymentId', filterKey: 'paymentId' },
            { key: 'invoiceId', label: 'Invoice', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            {
                key: 'appliedAmount',
                label: 'Applied Amount',
                sortKey: 'appliedAmount',
                render: (item) => renderMoney(item.appliedAmount)
            }
        ],

        CreditMemo: [
            { key: 'creditMemoId', label: 'ID', sortKey: 'creditMemoId', filterKey: 'creditMemoId' },
            { key: 'memoNumber', label: 'Memo #', sortKey: 'memoNumber', filterKey: 'memoNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'memoDate',
                label: 'Memo Date',
                sortKey: 'memoDate',
                render: (item) => renderDate(item.memoDate)
            },
            {
                key: 'amount',
                label: 'Amount',
                sortKey: 'amount',
                render: (item) => renderMoney(item.amount)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.creditMemoStatus(item.status)
            }
        ],

        DunningLetter: [
            { key: 'letterId', label: 'ID', sortKey: 'letterId', filterKey: 'letterId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'letterDate',
                label: 'Letter Date',
                sortKey: 'letterDate',
                render: (item) => renderDate(item.letterDate)
            },
            {
                key: 'dunningLevel',
                label: 'Dunning Level',
                sortKey: 'dunningLevel',
                render: (item) => render.dunningLevel(item.dunningLevel)
            },
            {
                key: 'totalOverdue',
                label: 'Total Overdue',
                sortKey: 'totalOverdue',
                render: (item) => renderMoney(item.totalOverdue)
            }
        ]
    };

})();
