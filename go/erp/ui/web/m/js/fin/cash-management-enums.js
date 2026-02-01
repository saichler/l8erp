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
 * Mobile Cash Management Module - Enum Definitions
 * Desktop Equivalent: fin/cash/cash-enums.js
 */
(function() {
    'use strict';

    window.MobileCashManagement = window.MobileCashManagement || {};
    MobileCashManagement.enums = {};

    // ============================================================================
    // BANK ACCOUNT TYPE
    // ============================================================================

    MobileCashManagement.enums.BANK_ACCOUNT_TYPE = {
        0: 'Unspecified', 1: 'Checking', 2: 'Savings', 3: 'Money Market', 4: 'Credit Line'
    };

    // ============================================================================
    // BANK ACCOUNT STATUS
    // ============================================================================

    MobileCashManagement.enums.BANK_ACCOUNT_STATUS = {
        0: 'Unspecified', 1: 'Active', 2: 'Inactive', 3: 'Closed', 4: 'Frozen'
    };
    MobileCashManagement.enums.BANK_ACCOUNT_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-inactive', 3: 'status-terminated', 4: 'status-terminated'
    };

    // ============================================================================
    // TRANSACTION TYPE
    // ============================================================================

    MobileCashManagement.enums.TRANSACTION_TYPE = {
        0: 'Unspecified', 1: 'Deposit', 2: 'Withdrawal', 3: 'Transfer',
        4: 'Fee', 5: 'Interest', 6: 'Adjustment'
    };

    // ============================================================================
    // RECONCILIATION STATUS
    // ============================================================================

    MobileCashManagement.enums.RECONCILIATION_STATUS = {
        0: 'Unspecified', 1: 'In Progress', 2: 'Completed', 3: 'Discrepancy'
    };
    MobileCashManagement.enums.RECONCILIATION_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-terminated'
    };

    // ============================================================================
    // TRANSFER STATUS
    // ============================================================================

    MobileCashManagement.enums.TRANSFER_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'Completed', 3: 'Cancelled', 4: 'Failed'
    };
    MobileCashManagement.enums.TRANSFER_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive', 4: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCashManagement.render = {
        bankAccountType: (type) => Layer8MRenderers.renderEnum(type, MobileCashManagement.enums.BANK_ACCOUNT_TYPE),
        bankAccountStatus: Layer8MRenderers.createStatusRenderer(
            MobileCashManagement.enums.BANK_ACCOUNT_STATUS,
            MobileCashManagement.enums.BANK_ACCOUNT_STATUS_CLASSES
        ),
        transactionType: (type) => Layer8MRenderers.renderEnum(type, MobileCashManagement.enums.TRANSACTION_TYPE),
        reconciliationStatus: Layer8MRenderers.createStatusRenderer(
            MobileCashManagement.enums.RECONCILIATION_STATUS,
            MobileCashManagement.enums.RECONCILIATION_STATUS_CLASSES
        ),
        transferStatus: Layer8MRenderers.createStatusRenderer(
            MobileCashManagement.enums.TRANSFER_STATUS,
            MobileCashManagement.enums.TRANSFER_STATUS_CLASSES
        ),
        boolean: Layer8MRenderers.renderBoolean,
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
