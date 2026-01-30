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
 * Mobile Supply Planning Module - Enum Definitions
 * Desktop Equivalent: scm/supply-planning/supply-planning-enums.js
 */
(function() {
    'use strict';

    window.MobileSupplyPlanning = window.MobileSupplyPlanning || {};
    MobileSupplyPlanning.enums = {};

    // ============================================================================
    // PLANNING METHOD
    // ============================================================================

    MobileSupplyPlanning.enums.PLANNING_METHOD = {
        0: 'Unspecified', 1: 'MRP', 2: 'DRP', 3: 'Kanban',
        4: 'Min-Max', 5: 'Reorder Point'
    };
    MobileSupplyPlanning.enums.PLANNING_METHOD_VALUES = {
        'mrp': 1, 'drp': 2, 'kanban': 3, 'min': 4, 'max': 4, 'reorder': 5, 'point': 5
    };

    // ============================================================================
    // TASK STATUS
    // ============================================================================

    MobileSupplyPlanning.enums.TASK_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'In Progress', 3: 'Completed', 4: 'Cancelled'
    };
    MobileSupplyPlanning.enums.TASK_STATUS_VALUES = {
        'pending': 1, 'progress': 2, 'in': 2, 'completed': 3, 'cancelled': 4
    };
    MobileSupplyPlanning.enums.TASK_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSupplyPlanning.render = {
        planningMethod: (v) => MobileRenderers.renderEnum(v, MobileSupplyPlanning.enums.PLANNING_METHOD),
        taskStatus: MobileRenderers.createStatusRenderer(
            MobileSupplyPlanning.enums.TASK_STATUS,
            MobileSupplyPlanning.enums.TASK_STATUS_CLASSES
        ),
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate,
        money: MobileRenderers.renderMoney
    };

})();
