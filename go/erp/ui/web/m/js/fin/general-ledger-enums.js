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
 * Mobile General Ledger Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: fin/general-ledger/general-ledger-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileGeneralLedger = window.MobileGeneralLedger || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const ACCOUNT_TYPE = factory.simple(['Unspecified', 'Asset', 'Liability', 'Equity', 'Revenue', 'Expense']);

    const BALANCE_TYPE = factory.simple(['Unspecified', 'Debit', 'Credit']);

    const JOURNAL_ENTRY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Posted', 'posted', 'status-active'],
        ['Reversed', 'reversed', 'status-inactive'],
        ['Void', 'void', 'status-terminated']
    ]);

    const FISCAL_PERIOD_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'status-active'],
        ['Closed', 'closed', 'status-inactive'],
        ['Locked', 'locked', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileGeneralLedger.enums = {
        ACCOUNT_TYPE: ACCOUNT_TYPE.enum,
        BALANCE_TYPE: BALANCE_TYPE.enum,
        JOURNAL_ENTRY_STATUS: JOURNAL_ENTRY_STATUS.enum,
        JOURNAL_ENTRY_STATUS_VALUES: JOURNAL_ENTRY_STATUS.values,
        JOURNAL_ENTRY_STATUS_CLASSES: JOURNAL_ENTRY_STATUS.classes,
        FISCAL_PERIOD_STATUS: FISCAL_PERIOD_STATUS.enum,
        FISCAL_PERIOD_STATUS_VALUES: FISCAL_PERIOD_STATUS.values,
        FISCAL_PERIOD_STATUS_CLASSES: FISCAL_PERIOD_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileGeneralLedger.render = {
        accountType: (type) => renderEnum(type, ACCOUNT_TYPE.enum),
        balanceType: (type) => renderEnum(type, BALANCE_TYPE.enum),
        journalEntryStatus: createStatusRenderer(JOURNAL_ENTRY_STATUS.enum, JOURNAL_ENTRY_STATUS.classes),
        fiscalPeriodStatus: createStatusRenderer(FISCAL_PERIOD_STATUS.enum, FISCAL_PERIOD_STATUS.classes),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
