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
 * Mobile Accounts Receivable Module - Column Configurations
 * Desktop Equivalent: fin/accounts-receivable/accounts-receivable-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileAccountsReceivable.enums;
    const render = MobileAccountsReceivable.render;

    MobileAccountsReceivable.columns = {
        Customer: [
            ...col.id('customerId'),
            ...col.col('customerNumber', 'Customer #'),
            ...col.col('name', 'Name'),
            ...col.status('status', 'Status', enums.CUSTOMER_STATUS_VALUES, render.customerStatus),
            ...col.money('creditLimit', 'Credit Limit')
        ],

        CustomerContact: [
            ...col.id('contactId'),
            ...col.col('customerId', 'Customer'),
            ...col.col('firstName', 'First Name'),
            ...col.col('lastName', 'Last Name'),
            ...col.col('email', 'Email'),
            ...col.col('phone', 'Phone'),
            ...col.boolean('isPrimary', 'Primary')
        ],

        SalesInvoice: [
            ...col.id('invoiceId'),
            ...col.col('invoiceNumber', 'Invoice #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('invoiceDate', 'Invoice Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.money('totalAmount', 'Total Amount'),
            ...col.status('status', 'Status', enums.INVOICE_STATUS_VALUES, render.invoiceStatus)
        ],

        SalesInvoiceLine: [
            ...col.id('lineId'),
            ...col.col('invoiceId', 'Invoice'),
            ...col.col('description', 'Description'),
            ...col.col('quantity', 'Quantity'),
            ...col.money('unitPrice', 'Unit Price'),
            ...col.money('lineAmount', 'Line Amount')
        ],

        CustomerPayment: [
            ...col.id('paymentId'),
            ...col.col('customerId', 'Customer'),
            ...col.date('paymentDate', 'Payment Date'),
            ...col.money('amount', 'Amount'),
            ...col.enum('paymentMethod', 'Method', null, render.paymentMethod),
            ...col.status('status', 'Status', enums.PAYMENT_STATUS_VALUES, render.paymentStatus)
        ],

        PaymentApplication: [
            ...col.id('applicationId'),
            ...col.col('paymentId', 'Payment'),
            ...col.col('invoiceId', 'Invoice'),
            ...col.money('appliedAmount', 'Applied Amount')
        ],

        CreditMemo: [
            ...col.id('creditMemoId'),
            ...col.col('memoNumber', 'Memo #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('memoDate', 'Memo Date'),
            ...col.money('amount', 'Amount'),
            ...col.status('status', 'Status', enums.CREDIT_MEMO_STATUS_VALUES, render.creditMemoStatus)
        ],

        DunningLetter: [
            ...col.id('letterId'),
            ...col.col('customerId', 'Customer'),
            ...col.date('letterDate', 'Letter Date'),
            ...col.enum('dunningLevel', 'Dunning Level', null, render.dunningLevel),
            ...col.money('totalOverdue', 'Total Overdue')
        ]
    };

    MobileAccountsReceivable.primaryKeys = {
        Customer: 'customerId', CustomerContact: 'contactId', SalesInvoice: 'invoiceId',
        SalesInvoiceLine: 'lineId', CustomerPayment: 'paymentId', PaymentApplication: 'applicationId',
        CreditMemo: 'creditMemoId', DunningLetter: 'letterId'
    };

})();
