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
// Budgeting Module - Enum Definitions
// All enum constants and value mappings for Budgeting models

(function() {
    'use strict';

    // Create Budgeting namespace
    window.Budgeting = window.Budgeting || {};
    Budgeting.enums = {};

    // ============================================================================
    // BUDGET STATUS
    // ============================================================================

    Budgeting.enums.BUDGET_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Submitted',
        3: 'Approved',
        4: 'Active',
        5: 'Closed'
    };

    Budgeting.enums.BUDGET_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-inactive'
    };

    // ============================================================================
    // BUDGET TYPE
    // ============================================================================

    Budgeting.enums.BUDGET_TYPE = {
        0: 'Unspecified',
        1: 'Operating',
        2: 'Capital',
        3: 'Project',
        4: 'Departmental'
    };

    // ============================================================================
    // FORECAST TYPE
    // ============================================================================

    Budgeting.enums.FORECAST_TYPE = {
        0: 'Unspecified',
        1: 'Cash Flow',
        2: 'Revenue',
        3: 'Expense',
        4: 'Balance Sheet'
    };

    // ============================================================================
    // CAPEX STATUS
    // ============================================================================

    Budgeting.enums.CAPEX_STATUS = {
        0: 'Unspecified',
        1: 'Proposed',
        2: 'Approved',
        3: 'In Progress',
        4: 'Completed',
        5: 'Cancelled'
    };

    Budgeting.enums.CAPEX_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-active',
        5: 'layer8d-status-inactive'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    Budgeting.render = {};

    Budgeting.render.budgetStatus = Layer8DRenderers.createStatusRenderer(
        Budgeting.enums.BUDGET_STATUS,
        Budgeting.enums.BUDGET_STATUS_CLASSES
    );

    Budgeting.render.budgetType = (type) => Layer8DRenderers.renderEnum(type, Budgeting.enums.BUDGET_TYPE);
    Budgeting.render.forecastType = (type) => Layer8DRenderers.renderEnum(type, Budgeting.enums.FORECAST_TYPE);

    Budgeting.render.capexStatus = Layer8DRenderers.createStatusRenderer(
        Budgeting.enums.CAPEX_STATUS,
        Budgeting.enums.CAPEX_STATUS_CLASSES
    );

    Budgeting.render.boolean = Layer8DRenderers.renderBoolean;
    Budgeting.render.date = Layer8DRenderers.renderDate;
    Budgeting.render.money = Layer8DRenderers.renderMoney;

})();
