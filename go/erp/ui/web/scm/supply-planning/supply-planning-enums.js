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
// Supply Planning Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.ScmSupplyPlanning = window.ScmSupplyPlanning || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PLANNING_METHOD = factory.simple([
        'Unspecified', 'MRP', 'DRP', 'Kanban', 'Min-Max', 'Reorder Point'
    ]);

    const TASK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.ScmSupplyPlanning.enums = {
        PLANNING_METHOD: PLANNING_METHOD.enum,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_CLASSES: TASK_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderTaskStatus = createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes);

    window.ScmSupplyPlanning.render = {
        planningMethod: (v) => renderEnum(v, PLANNING_METHOD.enum),
        taskStatus: renderTaskStatus,
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
