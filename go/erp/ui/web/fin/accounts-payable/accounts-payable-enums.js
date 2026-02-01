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
// Accounts Payable Module - Enum Definitions
// All enum constants and value mappings for Accounts Payable models

(function() {
    'use strict';

    // Create AccountsPayable namespace
    window.AccountsPayable = window.AccountsPayable || {};
    AccountsPayable.enums = {};

    // ============================================================================
    // VENDOR STATUS
    // ============================================================================

    AccountsPayable.enums.VENDOR_STATUS = {
        0: 'Unspecified',
        1: 'Active',
        2: 'Inactive',
        3: 'On Hold',
        4: 'Blocked'
    };

    AccountsPayable.enums.VENDOR_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-inactive',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-terminated'
    };

    // ============================================================================
    // INVOICE STATUS
    // ============================================================================

    AccountsPayable.enums.INVOICE_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Submitted',
        3: 'Approved',
        4: 'Partially Paid',
        5: 'Paid',
        6: 'Overdue',
        7: 'Cancelled',
        8: 'Void'
    };

    AccountsPayable.enums.INVOICE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-active',
        6: 'layer8d-status-terminated',
        7: 'layer8d-status-inactive',
        8: 'layer8d-status-terminated'
    };

    // ============================================================================
    // PAYMENT STATUS
    // ============================================================================

    AccountsPayable.enums.PAYMENT_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Processing',
        3: 'Completed',
        4: 'Failed',
        5: 'Cancelled',
        6: 'Reversed'
    };

    AccountsPayable.enums.PAYMENT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive',
        6: 'layer8d-status-terminated'
    };

    // ============================================================================
    // PAYMENT METHOD
    // ============================================================================

    AccountsPayable.enums.PAYMENT_METHOD = {
        0: 'Unspecified',
        1: 'Check',
        2: 'ACH',
        3: 'Wire',
        4: 'Credit Card',
        5: 'Cash',
        6: 'Other'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    AccountsPayable.render = {};

    AccountsPayable.render.vendorStatus = Layer8DRenderers.createStatusRenderer(
        AccountsPayable.enums.VENDOR_STATUS,
        AccountsPayable.enums.VENDOR_STATUS_CLASSES
    );

    AccountsPayable.render.invoiceStatus = Layer8DRenderers.createStatusRenderer(
        AccountsPayable.enums.INVOICE_STATUS,
        AccountsPayable.enums.INVOICE_STATUS_CLASSES
    );

    AccountsPayable.render.paymentStatus = Layer8DRenderers.createStatusRenderer(
        AccountsPayable.enums.PAYMENT_STATUS,
        AccountsPayable.enums.PAYMENT_STATUS_CLASSES
    );

    AccountsPayable.render.paymentMethod = (type) => Layer8DRenderers.renderEnum(type, AccountsPayable.enums.PAYMENT_METHOD);
    AccountsPayable.render.boolean = Layer8DRenderers.renderBoolean;
    AccountsPayable.render.date = Layer8DRenderers.renderDate;
    AccountsPayable.render.money = Layer8DRenderers.renderMoney;

})();
