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
 * Mobile General Ledger Module - Enum Definitions
 * Desktop Equivalent: fin/general-ledger/general-ledger-enums.js
 */
(function() {
    'use strict';

    window.MobileGeneralLedger = window.MobileGeneralLedger || {};
    MobileGeneralLedger.enums = {};

    // ============================================================================
    // ACCOUNT TYPE
    // ============================================================================

    MobileGeneralLedger.enums.ACCOUNT_TYPE = {
        0: 'Unspecified', 1: 'Asset', 2: 'Liability', 3: 'Equity',
        4: 'Revenue', 5: 'Expense'
    };
    MobileGeneralLedger.enums.ACCOUNT_TYPE_VALUES = {
        'asset': 1, 'liability': 2, 'equity': 3, 'revenue': 4, 'expense': 5
    };

    // ============================================================================
    // BALANCE TYPE
    // ============================================================================

    MobileGeneralLedger.enums.BALANCE_TYPE = {
        0: 'Unspecified', 1: 'Debit', 2: 'Credit'
    };

    // ============================================================================
    // JOURNAL ENTRY STATUS
    // ============================================================================

    MobileGeneralLedger.enums.JOURNAL_ENTRY_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Posted', 3: 'Reversed', 4: 'Void'
    };
    MobileGeneralLedger.enums.JOURNAL_ENTRY_STATUS_VALUES = {
        'draft': 1, 'posted': 2, 'reversed': 3, 'void': 4
    };
    MobileGeneralLedger.enums.JOURNAL_ENTRY_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive', 4: 'status-terminated'
    };

    // ============================================================================
    // FISCAL PERIOD STATUS
    // ============================================================================

    MobileGeneralLedger.enums.FISCAL_PERIOD_STATUS = {
        0: 'Unspecified', 1: 'Open', 2: 'Closed', 3: 'Locked'
    };
    MobileGeneralLedger.enums.FISCAL_PERIOD_STATUS_VALUES = {
        'open': 1, 'closed': 2, 'locked': 3
    };
    MobileGeneralLedger.enums.FISCAL_PERIOD_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-inactive', 3: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileGeneralLedger.render = {
        accountType: (type) => MobileRenderers.renderEnum(type, MobileGeneralLedger.enums.ACCOUNT_TYPE),
        balanceType: (type) => MobileRenderers.renderEnum(type, MobileGeneralLedger.enums.BALANCE_TYPE),
        journalEntryStatus: MobileRenderers.createStatusRenderer(
            MobileGeneralLedger.enums.JOURNAL_ENTRY_STATUS,
            MobileGeneralLedger.enums.JOURNAL_ENTRY_STATUS_CLASSES
        ),
        fiscalPeriodStatus: MobileRenderers.createStatusRenderer(
            MobileGeneralLedger.enums.FISCAL_PERIOD_STATUS,
            MobileGeneralLedger.enums.FISCAL_PERIOD_STATUS_CLASSES
        ),
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate,
        money: MobileRenderers.renderMoney
    };

})();
