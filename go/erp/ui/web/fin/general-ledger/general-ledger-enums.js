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
// General Ledger Module - Enum Definitions
// All enum constants and value mappings for General Ledger models

(function() {
    'use strict';

    // Create GeneralLedger namespace
    window.GeneralLedger = window.GeneralLedger || {};
    GeneralLedger.enums = {};

    // ============================================================================
    // ACCOUNT TYPE
    // ============================================================================

    GeneralLedger.enums.ACCOUNT_TYPE = {
        0: 'Unspecified',
        1: 'Asset',
        2: 'Liability',
        3: 'Equity',
        4: 'Revenue',
        5: 'Expense'
    };

    // ============================================================================
    // BALANCE TYPE
    // ============================================================================

    GeneralLedger.enums.BALANCE_TYPE = {
        0: 'Unspecified',
        1: 'Debit',
        2: 'Credit'
    };

    // ============================================================================
    // JOURNAL ENTRY STATUS
    // ============================================================================

    GeneralLedger.enums.JOURNAL_ENTRY_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Posted',
        3: 'Reversed',
        4: 'Void'
    };

    GeneralLedger.enums.JOURNAL_ENTRY_STATUS_CLASSES = {
        1: 'erp-status-pending',
        2: 'erp-status-active',
        3: 'erp-status-inactive',
        4: 'erp-status-terminated'
    };

    // ============================================================================
    // FISCAL PERIOD STATUS
    // ============================================================================

    GeneralLedger.enums.FISCAL_PERIOD_STATUS = {
        0: 'Unspecified',
        1: 'Open',
        2: 'Closed',
        3: 'Locked'
    };

    GeneralLedger.enums.FISCAL_PERIOD_STATUS_CLASSES = {
        1: 'erp-status-active',
        2: 'erp-status-inactive',
        3: 'erp-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    GeneralLedger.render = {};

    GeneralLedger.render.accountType = (type) => ERPRenderers.renderEnum(type, GeneralLedger.enums.ACCOUNT_TYPE);
    GeneralLedger.render.balanceType = (type) => ERPRenderers.renderEnum(type, GeneralLedger.enums.BALANCE_TYPE);

    GeneralLedger.render.journalEntryStatus = ERPRenderers.createStatusRenderer(
        GeneralLedger.enums.JOURNAL_ENTRY_STATUS,
        GeneralLedger.enums.JOURNAL_ENTRY_STATUS_CLASSES
    );

    GeneralLedger.render.fiscalPeriodStatus = ERPRenderers.createStatusRenderer(
        GeneralLedger.enums.FISCAL_PERIOD_STATUS,
        GeneralLedger.enums.FISCAL_PERIOD_STATUS_CLASSES
    );

    GeneralLedger.render.boolean = ERPRenderers.renderBoolean;
    GeneralLedger.render.date = ERPRenderers.renderDate;
    GeneralLedger.render.money = ERPRenderers.renderMoney;

})();
