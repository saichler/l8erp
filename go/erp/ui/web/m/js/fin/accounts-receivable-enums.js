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
 * Mobile Accounts Receivable Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: fin/accounts-receivable/accounts-receivable-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileAccountsReceivable = window.MobileAccountsReceivable || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CUSTOMER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'status-active'],
        ['Inactive', 'inactive', 'status-inactive'],
        ['On Hold', 'on hold', 'status-pending'],
        ['Blocked', 'blocked', 'status-terminated']
    ]);

    const INVOICE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Submitted', 'submitted', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Partially Paid', 'partially paid', 'status-pending'],
        ['Paid', 'paid', 'status-active'],
        ['Overdue', 'overdue', 'status-terminated'],
        ['Cancelled', 'cancelled', 'status-inactive'],
        ['Void', 'void', 'status-terminated']
    ]);

    const PAYMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Processing', 'processing', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Failed', 'failed', 'status-terminated'],
        ['Cancelled', 'cancelled', 'status-inactive'],
        ['Reversed', 'reversed', 'status-terminated']
    ]);

    const CREDIT_MEMO_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Applied', 'applied', 'status-active'],
        ['Void', 'void', 'status-terminated']
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

    MobileAccountsReceivable.enums = {
        CUSTOMER_STATUS: CUSTOMER_STATUS.enum,
        CUSTOMER_STATUS_VALUES: CUSTOMER_STATUS.values,
        CUSTOMER_STATUS_CLASSES: CUSTOMER_STATUS.classes,
        INVOICE_STATUS: INVOICE_STATUS.enum,
        INVOICE_STATUS_VALUES: INVOICE_STATUS.values,
        INVOICE_STATUS_CLASSES: INVOICE_STATUS.classes,
        PAYMENT_STATUS: PAYMENT_STATUS.enum,
        PAYMENT_STATUS_VALUES: PAYMENT_STATUS.values,
        PAYMENT_STATUS_CLASSES: PAYMENT_STATUS.classes,
        CREDIT_MEMO_STATUS: CREDIT_MEMO_STATUS.enum,
        CREDIT_MEMO_STATUS_VALUES: CREDIT_MEMO_STATUS.values,
        CREDIT_MEMO_STATUS_CLASSES: CREDIT_MEMO_STATUS.classes,
        DUNNING_LEVEL: DUNNING_LEVEL.enum,
        PAYMENT_METHOD: PAYMENT_METHOD.enum
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileAccountsReceivable.render = {
        customerStatus: createStatusRenderer(CUSTOMER_STATUS.enum, CUSTOMER_STATUS.classes),
        invoiceStatus: createStatusRenderer(INVOICE_STATUS.enum, INVOICE_STATUS.classes),
        paymentStatus: createStatusRenderer(PAYMENT_STATUS.enum, PAYMENT_STATUS.classes),
        creditMemoStatus: createStatusRenderer(CREDIT_MEMO_STATUS.enum, CREDIT_MEMO_STATUS.classes),
        dunningLevel: (level) => renderEnum(level, DUNNING_LEVEL.enum),
        paymentMethod: (type) => renderEnum(type, PAYMENT_METHOD.enum),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
