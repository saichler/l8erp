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
// Cash Management Module - Enum Definitions
// Part 1 of 4 - Load this file first

(function() {
    'use strict';

    // Create CashManagement namespace
    window.CashManagement = window.CashManagement || {};
    CashManagement.enums = {};

    // ============================================================================
    // BANK ACCOUNT TYPE
    // ============================================================================

    CashManagement.enums.BANK_ACCOUNT_TYPE = { 0: 'Unspecified', 1: 'Checking', 2: 'Savings', 3: 'Money Market', 4: 'Credit Line' };

    // ============================================================================
    // BANK ACCOUNT STATUS
    // ============================================================================

    CashManagement.enums.BANK_ACCOUNT_STATUS = { 0: 'Unspecified', 1: 'Active', 2: 'Inactive', 3: 'Closed', 4: 'Frozen' };
    CashManagement.enums.BANK_ACCOUNT_STATUS_CLASSES = { 1: 'erp-status-active', 2: 'erp-status-inactive', 3: 'erp-status-terminated', 4: 'erp-status-terminated' };

    // ============================================================================
    // TRANSACTION TYPE
    // ============================================================================

    CashManagement.enums.TRANSACTION_TYPE = { 0: 'Unspecified', 1: 'Deposit', 2: 'Withdrawal', 3: 'Transfer', 4: 'Fee', 5: 'Interest', 6: 'Adjustment' };

    // ============================================================================
    // RECONCILIATION STATUS
    // ============================================================================

    CashManagement.enums.RECONCILIATION_STATUS = { 0: 'Unspecified', 1: 'In Progress', 2: 'Completed', 3: 'Discrepancy' };
    CashManagement.enums.RECONCILIATION_STATUS_CLASSES = { 1: 'erp-status-pending', 2: 'erp-status-active', 3: 'erp-status-terminated' };

    // ============================================================================
    // TRANSFER STATUS
    // ============================================================================

    CashManagement.enums.TRANSFER_STATUS = { 0: 'Unspecified', 1: 'Pending', 2: 'Completed', 3: 'Cancelled', 4: 'Failed' };
    CashManagement.enums.TRANSFER_STATUS_CLASSES = { 1: 'erp-status-pending', 2: 'erp-status-active', 3: 'erp-status-inactive', 4: 'erp-status-terminated' };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    CashManagement.render = {};

    CashManagement.render.bankAccountType = (type) => ERPRenderers.renderEnum(type, CashManagement.enums.BANK_ACCOUNT_TYPE);
    CashManagement.render.bankAccountStatus = ERPRenderers.createStatusRenderer(CashManagement.enums.BANK_ACCOUNT_STATUS, CashManagement.enums.BANK_ACCOUNT_STATUS_CLASSES);
    CashManagement.render.transactionType = (type) => ERPRenderers.renderEnum(type, CashManagement.enums.TRANSACTION_TYPE);
    CashManagement.render.reconciliationStatus = ERPRenderers.createStatusRenderer(CashManagement.enums.RECONCILIATION_STATUS, CashManagement.enums.RECONCILIATION_STATUS_CLASSES);
    CashManagement.render.transferStatus = ERPRenderers.createStatusRenderer(CashManagement.enums.TRANSFER_STATUS, CashManagement.enums.TRANSFER_STATUS_CLASSES);
    CashManagement.render.boolean = ERPRenderers.renderBoolean;
    CashManagement.render.date = ERPRenderers.renderDate;
    CashManagement.render.money = ERPRenderers.renderMoney;

})();
