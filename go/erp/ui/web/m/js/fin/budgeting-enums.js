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
 * Mobile Budgeting Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: fin/budgeting/budgeting-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileBudgeting = window.MobileBudgeting || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BUDGET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Submitted', 'submitted', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Active', 'active', 'status-active'],
        ['Closed', 'closed', 'status-inactive']
    ]);

    const BUDGET_TYPE = factory.simple([
        'Unspecified', 'Operating', 'Capital', 'Project', 'Departmental'
    ]);

    const FORECAST_TYPE = factory.simple([
        'Unspecified', 'Cash Flow', 'Revenue', 'Expense', 'Balance Sheet'
    ]);

    const CAPEX_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Proposed', 'proposed', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['In Progress', 'in progress', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileBudgeting.enums = {
        BUDGET_STATUS: BUDGET_STATUS.enum,
        BUDGET_STATUS_VALUES: BUDGET_STATUS.values,
        BUDGET_STATUS_CLASSES: BUDGET_STATUS.classes,
        BUDGET_TYPE: BUDGET_TYPE.enum,
        FORECAST_TYPE: FORECAST_TYPE.enum,
        CAPEX_STATUS: CAPEX_STATUS.enum,
        CAPEX_STATUS_VALUES: CAPEX_STATUS.values,
        CAPEX_STATUS_CLASSES: CAPEX_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBudgeting.render = {
        budgetStatus: createStatusRenderer(BUDGET_STATUS.enum, BUDGET_STATUS.classes),
        budgetType: (type) => renderEnum(type, BUDGET_TYPE.enum),
        forecastType: (type) => renderEnum(type, FORECAST_TYPE.enum),
        capexStatus: createStatusRenderer(CAPEX_STATUS.enum, CAPEX_STATUS.classes),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
