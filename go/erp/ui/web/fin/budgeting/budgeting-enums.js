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
// Budgeting Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.Budgeting = window.Budgeting || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BUDGET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Submitted', 'submitted', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-inactive']
    ]);

    const BUDGET_TYPE = factory.simple([
        'Unspecified', 'Operating', 'Capital', 'Project', 'Departmental'
    ]);

    const FORECAST_TYPE = factory.simple([
        'Unspecified', 'Cash Flow', 'Revenue', 'Expense', 'Balance Sheet'
    ]);

    const CAPEX_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Proposed', 'proposed', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['In Progress', 'progress', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.Budgeting.enums = {
        BUDGET_STATUS: BUDGET_STATUS.enum,
        BUDGET_STATUS_CLASSES: BUDGET_STATUS.classes,
        BUDGET_TYPE: BUDGET_TYPE.enum,
        FORECAST_TYPE: FORECAST_TYPE.enum,
        CAPEX_STATUS: CAPEX_STATUS.enum,
        CAPEX_STATUS_CLASSES: CAPEX_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderBudgetStatus = createStatusRenderer(BUDGET_STATUS.enum, BUDGET_STATUS.classes);
    const renderCapexStatus = createStatusRenderer(CAPEX_STATUS.enum, CAPEX_STATUS.classes);

    window.Budgeting.render = {
        budgetStatus: renderBudgetStatus,
        budgetType: (v) => renderEnum(v, BUDGET_TYPE.enum),
        forecastType: (v) => renderEnum(v, FORECAST_TYPE.enum),
        capexStatus: renderCapexStatus,
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
