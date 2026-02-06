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
 * Mobile Cash Management Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: fin/cash/cash-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileCashManagement = window.MobileCashManagement || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BANK_ACCOUNT_TYPE = factory.simple([
        'Unspecified', 'Checking', 'Savings', 'Money Market', 'Credit Line'
    ]);

    const BANK_ACCOUNT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'status-active'],
        ['Inactive', 'inactive', 'status-inactive'],
        ['Closed', 'closed', 'status-terminated'],
        ['Frozen', 'frozen', 'status-terminated']
    ]);

    const TRANSACTION_TYPE = factory.simple([
        'Unspecified', 'Deposit', 'Withdrawal', 'Transfer', 'Fee', 'Interest', 'Adjustment'
    ]);

    const RECONCILIATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['In Progress', 'in progress', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Discrepancy', 'discrepancy', 'status-terminated']
    ]);

    const TRANSFER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-inactive'],
        ['Failed', 'failed', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCashManagement.enums = {
        BANK_ACCOUNT_TYPE: BANK_ACCOUNT_TYPE.enum,
        BANK_ACCOUNT_STATUS: BANK_ACCOUNT_STATUS.enum,
        BANK_ACCOUNT_STATUS_CLASSES: BANK_ACCOUNT_STATUS.classes,
        TRANSACTION_TYPE: TRANSACTION_TYPE.enum,
        RECONCILIATION_STATUS: RECONCILIATION_STATUS.enum,
        RECONCILIATION_STATUS_CLASSES: RECONCILIATION_STATUS.classes,
        TRANSFER_STATUS: TRANSFER_STATUS.enum,
        TRANSFER_STATUS_CLASSES: TRANSFER_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCashManagement.render = {
        bankAccountType: (type) => renderEnum(type, BANK_ACCOUNT_TYPE.enum),
        bankAccountStatus: createStatusRenderer(BANK_ACCOUNT_STATUS.enum, BANK_ACCOUNT_STATUS.classes),
        transactionType: (type) => renderEnum(type, TRANSACTION_TYPE.enum),
        reconciliationStatus: createStatusRenderer(RECONCILIATION_STATUS.enum, RECONCILIATION_STATUS.classes),
        transferStatus: createStatusRenderer(TRANSFER_STATUS.enum, TRANSFER_STATUS.classes),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
