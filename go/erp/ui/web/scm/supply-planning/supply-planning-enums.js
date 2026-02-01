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

    // Create ScmSupplyPlanning namespace
    window.ScmSupplyPlanning = window.ScmSupplyPlanning || {};
    ScmSupplyPlanning.enums = {};

    // ============================================================================
    // PLANNING METHOD
    // ============================================================================

    ScmSupplyPlanning.enums.PLANNING_METHOD = {
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

    ScmSupplyPlanning.enums.TASK_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Cancelled'
    };

    ScmSupplyPlanning.enums.TASK_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    ScmSupplyPlanning.render = {};

    ScmSupplyPlanning.render.planningMethod = (type) => Layer8DRenderers.renderEnum(type, ScmSupplyPlanning.enums.PLANNING_METHOD);

    ScmSupplyPlanning.render.taskStatus = Layer8DRenderers.createStatusRenderer(
        ScmSupplyPlanning.enums.TASK_STATUS,
        ScmSupplyPlanning.enums.TASK_STATUS_CLASSES
    );

    ScmSupplyPlanning.render.boolean = Layer8DRenderers.renderBoolean;
    ScmSupplyPlanning.render.date = Layer8DRenderers.renderDate;
    ScmSupplyPlanning.render.money = Layer8DRenderers.renderMoney;

})();
