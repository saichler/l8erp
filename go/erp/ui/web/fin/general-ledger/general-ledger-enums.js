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
// General Ledger Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.GeneralLedger = window.GeneralLedger || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const ACCOUNT_TYPE = factory.simple(['Unspecified', 'Asset', 'Liability', 'Equity', 'Revenue', 'Expense']);

    const BALANCE_TYPE = factory.simple(['Unspecified', 'Debit', 'Credit']);

    const JOURNAL_ENTRY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Posted', 'posted', 'layer8d-status-active'],
        ['Reversed', 'reversed', 'layer8d-status-inactive'],
        ['Void', 'void', 'layer8d-status-terminated']
    ]);

    const FISCAL_PERIOD_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-inactive'],
        ['Locked', 'locked', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.GeneralLedger.enums = {
        ACCOUNT_TYPE: ACCOUNT_TYPE.enum,
        BALANCE_TYPE: BALANCE_TYPE.enum,
        JOURNAL_ENTRY_STATUS: JOURNAL_ENTRY_STATUS.enum,
        JOURNAL_ENTRY_STATUS_CLASSES: JOURNAL_ENTRY_STATUS.classes,
        FISCAL_PERIOD_STATUS: FISCAL_PERIOD_STATUS.enum,
        FISCAL_PERIOD_STATUS_CLASSES: FISCAL_PERIOD_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderJournalEntryStatus = createStatusRenderer(JOURNAL_ENTRY_STATUS.enum, JOURNAL_ENTRY_STATUS.classes);
    const renderFiscalPeriodStatus = createStatusRenderer(FISCAL_PERIOD_STATUS.enum, FISCAL_PERIOD_STATUS.classes);

    window.GeneralLedger.render = {
        accountType: (v) => renderEnum(v, ACCOUNT_TYPE.enum),
        balanceType: (v) => renderEnum(v, BALANCE_TYPE.enum),
        journalEntryStatus: renderJournalEntryStatus,
        fiscalPeriodStatus: renderFiscalPeriodStatus,
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
