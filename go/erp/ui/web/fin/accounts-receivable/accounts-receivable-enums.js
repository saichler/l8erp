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
// Accounts Receivable Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.AccountsReceivable = window.AccountsReceivable || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CUSTOMER_STATUS = factory.create([
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

    const CREDIT_MEMO_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Applied', 'applied', 'layer8d-status-active'],
        ['Void', 'void', 'layer8d-status-terminated']
    ]);

    const DUNNING_LEVEL = factory.simple([
        'Unspecified', 'Reminder', 'First Notice', 'Second Notice', 'Final Notice', 'Collection'
    ]);

    const PAYMENT_METHOD = factory.simple([
        'Unspecified', 'Check', 'ACH', 'Wire', 'Credit Card', 'Cash', 'Other'
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.AccountsReceivable.enums = {
        CUSTOMER_STATUS: CUSTOMER_STATUS.enum,
        CUSTOMER_STATUS_CLASSES: CUSTOMER_STATUS.classes,
        INVOICE_STATUS: INVOICE_STATUS.enum,
        INVOICE_STATUS_CLASSES: INVOICE_STATUS.classes,
        PAYMENT_STATUS: PAYMENT_STATUS.enum,
        PAYMENT_STATUS_CLASSES: PAYMENT_STATUS.classes,
        CREDIT_MEMO_STATUS: CREDIT_MEMO_STATUS.enum,
        CREDIT_MEMO_STATUS_CLASSES: CREDIT_MEMO_STATUS.classes,
        DUNNING_LEVEL: DUNNING_LEVEL.enum,
        PAYMENT_METHOD: PAYMENT_METHOD.enum
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderCustomerStatus = createStatusRenderer(CUSTOMER_STATUS.enum, CUSTOMER_STATUS.classes);
    const renderInvoiceStatus = createStatusRenderer(INVOICE_STATUS.enum, INVOICE_STATUS.classes);
    const renderPaymentStatus = createStatusRenderer(PAYMENT_STATUS.enum, PAYMENT_STATUS.classes);
    const renderCreditMemoStatus = createStatusRenderer(CREDIT_MEMO_STATUS.enum, CREDIT_MEMO_STATUS.classes);

    window.AccountsReceivable.render = {
        customerStatus: renderCustomerStatus,
        invoiceStatus: renderInvoiceStatus,
        paymentStatus: renderPaymentStatus,
        creditMemoStatus: renderCreditMemoStatus,
        dunningLevel: (v) => renderEnum(v, DUNNING_LEVEL.enum),
        paymentMethod: (v) => renderEnum(v, PAYMENT_METHOD.enum),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
