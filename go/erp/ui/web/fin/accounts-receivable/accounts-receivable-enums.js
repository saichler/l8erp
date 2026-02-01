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
// Accounts Receivable Module - Enum Definitions
// Part 1 of 4 - Load this file first

(function() {
    'use strict';

    // Create AccountsReceivable namespace
    window.AccountsReceivable = window.AccountsReceivable || {};
    AccountsReceivable.enums = {};

    // ============================================================================
    // CUSTOMER STATUS
    // ============================================================================

    AccountsReceivable.enums.CUSTOMER_STATUS = { 0: 'Unspecified', 1: 'Active', 2: 'Inactive', 3: 'On Hold', 4: 'Blocked' };
    AccountsReceivable.enums.CUSTOMER_STATUS_CLASSES = { 1: 'layer8d-status-active', 2: 'layer8d-status-inactive', 3: 'layer8d-status-pending', 4: 'layer8d-status-terminated' };

    // ============================================================================
    // INVOICE STATUS
    // ============================================================================

    AccountsReceivable.enums.INVOICE_STATUS = { 0: 'Unspecified', 1: 'Draft', 2: 'Submitted', 3: 'Approved', 4: 'Partially Paid', 5: 'Paid', 6: 'Overdue', 7: 'Cancelled', 8: 'Void' };
    AccountsReceivable.enums.INVOICE_STATUS_CLASSES = { 1: 'layer8d-status-pending', 2: 'layer8d-status-pending', 3: 'layer8d-status-active', 4: 'layer8d-status-pending', 5: 'layer8d-status-active', 6: 'layer8d-status-terminated', 7: 'layer8d-status-inactive', 8: 'layer8d-status-terminated' };

    // ============================================================================
    // PAYMENT STATUS
    // ============================================================================

    AccountsReceivable.enums.PAYMENT_STATUS = { 0: 'Unspecified', 1: 'Pending', 2: 'Processing', 3: 'Completed', 4: 'Failed', 5: 'Cancelled', 6: 'Reversed' };
    AccountsReceivable.enums.PAYMENT_STATUS_CLASSES = { 1: 'layer8d-status-pending', 2: 'layer8d-status-pending', 3: 'layer8d-status-active', 4: 'layer8d-status-terminated', 5: 'layer8d-status-inactive', 6: 'layer8d-status-terminated' };

    // ============================================================================
    // CREDIT MEMO STATUS
    // ============================================================================

    AccountsReceivable.enums.CREDIT_MEMO_STATUS = { 0: 'Unspecified', 1: 'Draft', 2: 'Approved', 3: 'Applied', 4: 'Void' };
    AccountsReceivable.enums.CREDIT_MEMO_STATUS_CLASSES = { 1: 'layer8d-status-pending', 2: 'layer8d-status-active', 3: 'layer8d-status-active', 4: 'layer8d-status-terminated' };

    // ============================================================================
    // DUNNING LEVEL
    // ============================================================================

    AccountsReceivable.enums.DUNNING_LEVEL = { 0: 'Unspecified', 1: 'Reminder', 2: 'First Notice', 3: 'Second Notice', 4: 'Final Notice', 5: 'Collection' };

    // ============================================================================
    // PAYMENT METHOD
    // ============================================================================

    AccountsReceivable.enums.PAYMENT_METHOD = { 0: 'Unspecified', 1: 'Check', 2: 'ACH', 3: 'Wire', 4: 'Credit Card', 5: 'Cash', 6: 'Other' };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    AccountsReceivable.render = {};

    AccountsReceivable.render.customerStatus = Layer8DRenderers.createStatusRenderer(AccountsReceivable.enums.CUSTOMER_STATUS, AccountsReceivable.enums.CUSTOMER_STATUS_CLASSES);
    AccountsReceivable.render.invoiceStatus = Layer8DRenderers.createStatusRenderer(AccountsReceivable.enums.INVOICE_STATUS, AccountsReceivable.enums.INVOICE_STATUS_CLASSES);
    AccountsReceivable.render.paymentStatus = Layer8DRenderers.createStatusRenderer(AccountsReceivable.enums.PAYMENT_STATUS, AccountsReceivable.enums.PAYMENT_STATUS_CLASSES);
    AccountsReceivable.render.creditMemoStatus = Layer8DRenderers.createStatusRenderer(AccountsReceivable.enums.CREDIT_MEMO_STATUS, AccountsReceivable.enums.CREDIT_MEMO_STATUS_CLASSES);
    AccountsReceivable.render.dunningLevel = (level) => Layer8DRenderers.renderEnum(level, AccountsReceivable.enums.DUNNING_LEVEL);
    AccountsReceivable.render.paymentMethod = (type) => Layer8DRenderers.renderEnum(type, AccountsReceivable.enums.PAYMENT_METHOD);
    AccountsReceivable.render.boolean = Layer8DRenderers.renderBoolean;
    AccountsReceivable.render.date = Layer8DRenderers.renderDate;
    AccountsReceivable.render.money = Layer8DRenderers.renderMoney;

})();
