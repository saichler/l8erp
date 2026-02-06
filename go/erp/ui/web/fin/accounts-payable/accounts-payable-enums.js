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
// Accounts Payable Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.AccountsPayable = window.AccountsPayable || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const VENDOR_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Inactive', 'inactive', 'layer8d-status-inactive'],
        ['On Hold', 'hold', 'layer8d-status-pending'],
        ['Blocked', 'blocked', 'layer8d-status-terminated']
    ]);

    const INVOICE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Submitted', 'submitted', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Partially Paid', 'partial', 'layer8d-status-pending'],
        ['Paid', 'paid', 'layer8d-status-active'],
        ['Overdue', 'overdue', 'layer8d-status-terminated'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive'],
        ['Void', 'void', 'layer8d-status-terminated']
    ]);

    const PAYMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Processing', 'processing', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive'],
        ['Reversed', 'reversed', 'layer8d-status-terminated']
    ]);

    const PAYMENT_METHOD = factory.simple([
        'Unspecified', 'Check', 'ACH', 'Wire', 'Credit Card', 'Cash', 'Other'
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.AccountsPayable.enums = {
        VENDOR_STATUS: VENDOR_STATUS.enum,
        VENDOR_STATUS_CLASSES: VENDOR_STATUS.classes,
        INVOICE_STATUS: INVOICE_STATUS.enum,
        INVOICE_STATUS_CLASSES: INVOICE_STATUS.classes,
        PAYMENT_STATUS: PAYMENT_STATUS.enum,
        PAYMENT_STATUS_CLASSES: PAYMENT_STATUS.classes,
        PAYMENT_METHOD: PAYMENT_METHOD.enum
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderVendorStatus = createStatusRenderer(VENDOR_STATUS.enum, VENDOR_STATUS.classes);
    const renderInvoiceStatus = createStatusRenderer(INVOICE_STATUS.enum, INVOICE_STATUS.classes);
    const renderPaymentStatus = createStatusRenderer(PAYMENT_STATUS.enum, PAYMENT_STATUS.classes);

    window.AccountsPayable.render = {
        vendorStatus: renderVendorStatus,
        invoiceStatus: renderInvoiceStatus,
        paymentStatus: renderPaymentStatus,
        paymentMethod: (v) => renderEnum(v, PAYMENT_METHOD.enum),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
