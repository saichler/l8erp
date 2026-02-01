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
 * Mobile Accounts Receivable Module - Enum Definitions
 * Desktop Equivalent: fin/accounts-receivable/accounts-receivable-enums.js
 */
(function() {
    'use strict';

    window.MobileAccountsReceivable = window.MobileAccountsReceivable || {};
    MobileAccountsReceivable.enums = {};

    // ============================================================================
    // CUSTOMER STATUS
    // ============================================================================

    MobileAccountsReceivable.enums.CUSTOMER_STATUS = {
        0: 'Unspecified', 1: 'Active', 2: 'Inactive', 3: 'On Hold', 4: 'Blocked'
    };
    MobileAccountsReceivable.enums.CUSTOMER_STATUS_VALUES = {
        'active': 1, 'inactive': 2, 'on hold': 3, 'blocked': 4
    };
    MobileAccountsReceivable.enums.CUSTOMER_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-inactive', 3: 'status-pending', 4: 'status-terminated'
    };

    // ============================================================================
    // INVOICE STATUS
    // ============================================================================

    MobileAccountsReceivable.enums.INVOICE_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Submitted', 3: 'Approved',
        4: 'Partially Paid', 5: 'Paid', 6: 'Overdue', 7: 'Cancelled', 8: 'Void'
    };
    MobileAccountsReceivable.enums.INVOICE_STATUS_VALUES = {
        'draft': 1, 'submitted': 2, 'approved': 3, 'partially paid': 4,
        'paid': 5, 'overdue': 6, 'cancelled': 7, 'void': 8
    };
    MobileAccountsReceivable.enums.INVOICE_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active',
        4: 'status-pending', 5: 'status-active', 6: 'status-terminated',
        7: 'status-inactive', 8: 'status-terminated'
    };

    // ============================================================================
    // PAYMENT STATUS
    // ============================================================================

    MobileAccountsReceivable.enums.PAYMENT_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'Processing', 3: 'Completed',
        4: 'Failed', 5: 'Cancelled', 6: 'Reversed'
    };
    MobileAccountsReceivable.enums.PAYMENT_STATUS_VALUES = {
        'pending': 1, 'processing': 2, 'completed': 3,
        'failed': 4, 'cancelled': 5, 'reversed': 6
    };
    MobileAccountsReceivable.enums.PAYMENT_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active',
        4: 'status-terminated', 5: 'status-inactive', 6: 'status-terminated'
    };

    // ============================================================================
    // CREDIT MEMO STATUS
    // ============================================================================

    MobileAccountsReceivable.enums.CREDIT_MEMO_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Approved', 3: 'Applied', 4: 'Void'
    };
    MobileAccountsReceivable.enums.CREDIT_MEMO_STATUS_VALUES = {
        'draft': 1, 'approved': 2, 'applied': 3, 'void': 4
    };
    MobileAccountsReceivable.enums.CREDIT_MEMO_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated'
    };

    // ============================================================================
    // DUNNING LEVEL
    // ============================================================================

    MobileAccountsReceivable.enums.DUNNING_LEVEL = {
        0: 'Unspecified', 1: 'Reminder', 2: 'First Notice',
        3: 'Second Notice', 4: 'Final Notice', 5: 'Collection'
    };

    // ============================================================================
    // PAYMENT METHOD
    // ============================================================================

    MobileAccountsReceivable.enums.PAYMENT_METHOD = {
        0: 'Unspecified', 1: 'Check', 2: 'ACH', 3: 'Wire',
        4: 'Credit Card', 5: 'Cash', 6: 'Other'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileAccountsReceivable.render = {
        customerStatus: Layer8MRenderers.createStatusRenderer(
            MobileAccountsReceivable.enums.CUSTOMER_STATUS,
            MobileAccountsReceivable.enums.CUSTOMER_STATUS_CLASSES
        ),
        invoiceStatus: Layer8MRenderers.createStatusRenderer(
            MobileAccountsReceivable.enums.INVOICE_STATUS,
            MobileAccountsReceivable.enums.INVOICE_STATUS_CLASSES
        ),
        paymentStatus: Layer8MRenderers.createStatusRenderer(
            MobileAccountsReceivable.enums.PAYMENT_STATUS,
            MobileAccountsReceivable.enums.PAYMENT_STATUS_CLASSES
        ),
        creditMemoStatus: Layer8MRenderers.createStatusRenderer(
            MobileAccountsReceivable.enums.CREDIT_MEMO_STATUS,
            MobileAccountsReceivable.enums.CREDIT_MEMO_STATUS_CLASSES
        ),
        dunningLevel: (level) => Layer8MRenderers.renderEnum(level, MobileAccountsReceivable.enums.DUNNING_LEVEL),
        paymentMethod: (type) => Layer8MRenderers.renderEnum(type, MobileAccountsReceivable.enums.PAYMENT_METHOD),
        boolean: Layer8MRenderers.renderBoolean,
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
