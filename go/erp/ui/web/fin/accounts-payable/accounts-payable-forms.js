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
// Accounts Payable Module - Form Definitions
// Form field configurations for all Accounts Payable models

(function() {
    'use strict';

    // Ensure AccountsPayable namespace exists
    window.AccountsPayable = window.AccountsPayable || {};

    const enums = AccountsPayable.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    AccountsPayable.forms = {
        Vendor: {
            title: 'Vendor',
            sections: [
                {
                    title: 'Vendor Information',
                    fields: [
                        { key: 'vendorNumber', label: 'Vendor Number', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'legalName', label: 'Legal Name', type: 'text' },
                        { key: 'taxId', label: 'Tax ID', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.VENDOR_STATUS, required: true },
                        { key: 'paymentTermDays', label: 'Payment Term Days', type: 'number' },
                        { key: 'defaultPaymentMethod', label: 'Default Payment Method', type: 'select', options: enums.PAYMENT_METHOD },
                        { key: 'defaultAccountId', label: 'Default GL Account', type: 'reference', lookupModel: 'Account' },
                        { key: 'currencyId', label: 'Currency', type: 'reference', lookupModel: 'Currency' },
                        { key: 'website', label: 'Website', type: 'url' },
                        { key: 'notes', label: 'Notes', type: 'textarea' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        VendorContact: {
            title: 'Vendor Contact',
            sections: [
                {
                    title: 'Contact Information',
                    fields: [
                        { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor', required: true },
                        { key: 'contactName', label: 'Contact Name', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text' },
                        { key: 'email', label: 'Email', type: 'email' },
                        { key: 'phone', label: 'Phone', type: 'phone' },
                        { key: 'isPrimary', label: 'Primary Contact', type: 'checkbox' }
                    ]
                }
            ]
        },

        PurchaseInvoice: {
            title: 'Purchase Invoice',
            sections: [
                {
                    title: 'Invoice Details',
                    fields: [
                        { key: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true },
                        { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor', required: true },
                        { key: 'invoiceDate', label: 'Invoice Date', type: 'date', required: true },
                        { key: 'dueDate', label: 'Due Date', type: 'date', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'totalAmount', label: 'Total Amount', type: 'currency' },
                        { key: 'taxAmount', label: 'Tax Amount', type: 'currency' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.INVOICE_STATUS },
                        { key: 'currencyId', label: 'Currency', type: 'reference', lookupModel: 'Currency' },
                        { key: 'reference', label: 'Reference', type: 'text' }
                    ]
                }
            ]
        },

        PurchaseInvoiceLine: {
            title: 'Purchase Invoice Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'PurchaseInvoice', required: true },
                        { key: 'accountId', label: 'GL Account', type: 'reference', lookupModel: 'Account', required: true },
                        { key: 'description', label: 'Description', type: 'textarea', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitPrice', label: 'Unit Price', type: 'currency', required: true },
                        { key: 'lineTotal', label: 'Line Total', type: 'currency' },
                        { key: 'taxAmount', label: 'Tax Amount', type: 'currency' }
                    ]
                }
            ]
        },

        PaymentSchedule: {
            title: 'Payment Schedule',
            sections: [
                {
                    title: 'Schedule Details',
                    fields: [
                        { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'PurchaseInvoice', required: true },
                        { key: 'dueDate', label: 'Due Date', type: 'date', required: true },
                        { key: 'amount', label: 'Amount', type: 'currency', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PAYMENT_STATUS },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        VendorPayment: {
            title: 'Vendor Payment',
            sections: [
                {
                    title: 'Payment Details',
                    fields: [
                        { key: 'paymentNumber', label: 'Payment Number', type: 'text', required: true },
                        { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor', required: true },
                        { key: 'paymentDate', label: 'Payment Date', type: 'date', required: true },
                        { key: 'amount', label: 'Amount', type: 'currency', required: true },
                        { key: 'paymentMethod', label: 'Payment Method', type: 'select', options: enums.PAYMENT_METHOD, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PAYMENT_STATUS },
                        { key: 'bankAccountId', label: 'Bank Account', type: 'reference', lookupModel: 'Account' },
                        { key: 'reference', label: 'Reference', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        PaymentAllocation: {
            title: 'Payment Allocation',
            sections: [
                {
                    title: 'Allocation Details',
                    fields: [
                        { key: 'paymentId', label: 'Payment', type: 'reference', lookupModel: 'VendorPayment', required: true },
                        { key: 'invoiceId', label: 'Invoice', type: 'reference', lookupModel: 'PurchaseInvoice', required: true },
                        { key: 'allocatedAmount', label: 'Allocated Amount', type: 'currency', required: true }
                    ]
                }
            ]
        },

        VendorStatement: {
            title: 'Vendor Statement',
            sections: [
                {
                    title: 'Statement Details',
                    fields: [
                        { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor', required: true },
                        { key: 'statementDate', label: 'Statement Date', type: 'date', required: true },
                        { key: 'startDate', label: 'Period Start', type: 'date' },
                        { key: 'endDate', label: 'Period End', type: 'date' },
                        { key: 'openingBalance', label: 'Opening Balance', type: 'currency' },
                        { key: 'totalBalance', label: 'Total Balance', type: 'currency' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    AccountsPayable.primaryKeys = {
        Vendor: 'vendorId',
        VendorContact: 'contactId',
        PurchaseInvoice: 'invoiceId',
        PurchaseInvoiceLine: 'lineId',
        PaymentSchedule: 'scheduleId',
        VendorPayment: 'paymentId',
        PaymentAllocation: 'allocationId',
        VendorStatement: 'statementId'
    };

})();
