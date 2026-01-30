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
// Supply Planning Module - Enum Definitions
// All enum constants and value mappings for Supply Planning models

(function() {
    'use strict';

    // Create SupplyPlanning namespace
    window.SupplyPlanning = window.SupplyPlanning || {};
    SupplyPlanning.enums = {};

    // ============================================================================
    // PLANNING METHOD
    // ============================================================================

    SupplyPlanning.enums.PLANNING_METHOD = {
        0: 'Unspecified',
        1: 'MRP',
        2: 'DRP',
        3: 'Kanban',
        4: 'Min-Max',
        5: 'Reorder Point'
    };

    // ============================================================================
    // TASK STATUS
    // ============================================================================

    SupplyPlanning.enums.TASK_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Cancelled'
    };

    SupplyPlanning.enums.TASK_STATUS_CLASSES = {
        1: 'erp-status-pending',
        2: 'erp-status-active',
        3: 'erp-status-active',
        4: 'erp-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    SupplyPlanning.render = {};

    SupplyPlanning.render.planningMethod = (type) => ERPRenderers.renderEnum(type, SupplyPlanning.enums.PLANNING_METHOD);

    SupplyPlanning.render.taskStatus = ERPRenderers.createStatusRenderer(
        SupplyPlanning.enums.TASK_STATUS,
        SupplyPlanning.enums.TASK_STATUS_CLASSES
    );

    SupplyPlanning.render.boolean = ERPRenderers.renderBoolean;
    SupplyPlanning.render.date = ERPRenderers.renderDate;
    SupplyPlanning.render.money = ERPRenderers.renderMoney;

})();
