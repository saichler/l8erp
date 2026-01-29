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
// Accounts Receivable Module - Form Definitions
// Part 3 of 4 - Load after accounts-receivable-columns.js

(function() {
    'use strict';

    // Get enums from accounts-receivable-enums.js
    const enums = window.AccountsReceivable.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const AR_FORMS = {
        Customer: {
            title: 'Customer',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'customerNumber', label: 'Customer Number', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CUSTOMER_STATUS, required: true }
                    ]
                },
                {
                    title: 'Credit & Status',
                    fields: [
                        { key: 'creditLimit', label: 'Credit Limit', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CustomerContact: {
            title: 'Customer Contact',
            sections: [
                {
                    title: 'Contact Information',
                    fields: [
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'contactName', label: 'Contact Name', type: 'text', required: true },
                        { key: 'email', label: 'Email', type: 'text' },
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'isPrimary', label: 'Primary Contact', type: 'checkbox' }
                    ]
                }
            ]
        },

        SalesInvoice: {
            title: 'Sales Invoice',
            sections: [
                {
                    title: 'Invoice Details',
                    fields: [
                        { key: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.INVOICE_STATUS, required: true }
                    ]
                },
                {
                    title: 'Dates & Amount',
                    fields: [
                        { key: 'invoiceDate', label: 'Invoice Date', type: 'date', required: true },
                        { key: 'dueDate', label: 'Due Date', type: 'date', required: true },
                        { key: 'totalAmount', label: 'Total Amount', type: 'number' }
                    ]
                }
            ]
        },

        SalesInvoiceLine: {
            title: 'Sales Invoice Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'SalesInvoice', required: true },
                        { key: 'description', label: 'Description', type: 'text', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitPrice', label: 'Unit Price', type: 'number', required: true },
                        { key: 'lineTotal', label: 'Line Total', type: 'number' }
                    ]
                }
            ]
        },

        CustomerPayment: {
            title: 'Customer Payment',
            sections: [
                {
                    title: 'Payment Details',
                    fields: [
                        { key: 'paymentNumber', label: 'Payment Number', type: 'text', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'paymentMethod', label: 'Payment Method', type: 'select', options: enums.PAYMENT_METHOD, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PAYMENT_STATUS, required: true }
                    ]
                },
                {
                    title: 'Amount & Date',
                    fields: [
                        { key: 'paymentDate', label: 'Payment Date', type: 'date', required: true },
                        { key: 'amount', label: 'Amount', type: 'number', required: true }
                    ]
                }
            ]
        },

        PaymentApplication: {
            title: 'Payment Application',
            sections: [
                {
                    title: 'Application Details',
                    fields: [
                        { key: 'paymentId', label: 'Payment', type: 'reference', lookupModel: 'CustomerPayment', required: true },
                        { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'SalesInvoice', required: true },
                        { key: 'appliedAmount', label: 'Applied Amount', type: 'number', required: true }
                    ]
                }
            ]
        },

        CreditMemo: {
            title: 'Credit Memo',
            sections: [
                {
                    title: 'Memo Details',
                    fields: [
                        { key: 'memoNumber', label: 'Memo Number', type: 'text', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CREDIT_MEMO_STATUS, required: true }
                    ]
                },
                {
                    title: 'Amount & Date',
                    fields: [
                        { key: 'issueDate', label: 'Issue Date', type: 'date', required: true },
                        { key: 'amount', label: 'Amount', type: 'number', required: true }
                    ]
                }
            ]
        },

        DunningLetter: {
            title: 'Dunning Letter',
            sections: [
                {
                    title: 'Letter Details',
                    fields: [
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'letterDate', label: 'Letter Date', type: 'date', required: true },
                        { key: 'dunningLevel', label: 'Dunning Level', type: 'select', options: enums.DUNNING_LEVEL, required: true },
                        { key: 'totalOverdue', label: 'Total Overdue', type: 'number' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    const AR_PRIMARY_KEYS = {
        Customer: 'customerId',
        CustomerContact: 'contactId',
        SalesInvoice: 'invoiceId',
        SalesInvoiceLine: 'lineId',
        CustomerPayment: 'paymentId',
        PaymentApplication: 'applicationId',
        CreditMemo: 'creditMemoId',
        DunningLetter: 'letterId'
    };

    // ============================================================================
    // EXPORT FORMS TO NAMESPACE
    // ============================================================================

    window.AccountsReceivable.forms = AR_FORMS;
    window.AccountsReceivable.primaryKeys = AR_PRIMARY_KEYS;

})();
