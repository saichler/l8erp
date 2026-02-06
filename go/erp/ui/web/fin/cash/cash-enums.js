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
// Cash Management Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.CashManagement = window.CashManagement || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BANK_ACCOUNT_TYPE = factory.simple([
        'Unspecified', 'Checking', 'Savings', 'Money Market', 'Credit Line'
    ]);

    const BANK_ACCOUNT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Inactive', 'inactive', 'layer8d-status-inactive'],
        ['Closed', 'closed', 'layer8d-status-terminated'],
        ['Frozen', 'frozen', 'layer8d-status-terminated']
    ]);

    const TRANSACTION_TYPE = factory.simple([
        'Unspecified', 'Deposit', 'Withdrawal', 'Transfer', 'Fee', 'Interest', 'Adjustment'
    ]);

    const RECONCILIATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['In Progress', 'progress', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Discrepancy', 'discrepancy', 'layer8d-status-terminated']
    ]);

    const TRANSFER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive'],
        ['Failed', 'failed', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.CashManagement.enums = {
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
    // RENDERERS
    // ============================================================================

    const renderBankAccountStatus = createStatusRenderer(BANK_ACCOUNT_STATUS.enum, BANK_ACCOUNT_STATUS.classes);
    const renderReconciliationStatus = createStatusRenderer(RECONCILIATION_STATUS.enum, RECONCILIATION_STATUS.classes);
    const renderTransferStatus = createStatusRenderer(TRANSFER_STATUS.enum, TRANSFER_STATUS.classes);

    window.CashManagement.render = {
        bankAccountType: (v) => renderEnum(v, BANK_ACCOUNT_TYPE.enum),
        bankAccountStatus: renderBankAccountStatus,
        transactionType: (v) => renderEnum(v, TRANSACTION_TYPE.enum),
        reconciliationStatus: renderReconciliationStatus,
        transferStatus: renderTransferStatus,
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
