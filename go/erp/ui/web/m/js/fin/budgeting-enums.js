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
 * Mobile Budgeting Module - Enum Definitions
 * Desktop Equivalent: fin/budgeting/budgeting-enums.js
 */
(function() {
    'use strict';

    window.MobileBudgeting = window.MobileBudgeting || {};
    MobileBudgeting.enums = {};

    // ============================================================================
    // BUDGET STATUS
    // ============================================================================

    MobileBudgeting.enums.BUDGET_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Submitted', 3: 'Approved',
        4: 'Active', 5: 'Closed'
    };
    MobileBudgeting.enums.BUDGET_STATUS_VALUES = {
        'draft': 1, 'submitted': 2, 'approved': 3, 'active': 4, 'closed': 5
    };
    MobileBudgeting.enums.BUDGET_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active',
        4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // BUDGET TYPE
    // ============================================================================

    MobileBudgeting.enums.BUDGET_TYPE = {
        0: 'Unspecified', 1: 'Operating', 2: 'Capital', 3: 'Project', 4: 'Departmental'
    };

    // ============================================================================
    // FORECAST TYPE
    // ============================================================================

    MobileBudgeting.enums.FORECAST_TYPE = {
        0: 'Unspecified', 1: 'Cash Flow', 2: 'Revenue', 3: 'Expense', 4: 'Balance Sheet'
    };

    // ============================================================================
    // CAPEX STATUS
    // ============================================================================

    MobileBudgeting.enums.CAPEX_STATUS = {
        0: 'Unspecified', 1: 'Proposed', 2: 'Approved', 3: 'In Progress',
        4: 'Completed', 5: 'Cancelled'
    };
    MobileBudgeting.enums.CAPEX_STATUS_VALUES = {
        'proposed': 1, 'approved': 2, 'in progress': 3, 'completed': 4, 'cancelled': 5
    };
    MobileBudgeting.enums.CAPEX_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-pending',
        4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBudgeting.render = {
        budgetStatus: MobileRenderers.createStatusRenderer(
            MobileBudgeting.enums.BUDGET_STATUS,
            MobileBudgeting.enums.BUDGET_STATUS_CLASSES
        ),
        budgetType: (type) => MobileRenderers.renderEnum(type, MobileBudgeting.enums.BUDGET_TYPE),
        forecastType: (type) => MobileRenderers.renderEnum(type, MobileBudgeting.enums.FORECAST_TYPE),
        capexStatus: MobileRenderers.createStatusRenderer(
            MobileBudgeting.enums.CAPEX_STATUS,
            MobileBudgeting.enums.CAPEX_STATUS_CLASSES
        ),
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate,
        money: MobileRenderers.renderMoney
    };

})();
