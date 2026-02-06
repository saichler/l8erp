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
 * Mobile Supply Planning Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: scm/supply-planning/supply-planning-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileScmSupplyPlanning = window.MobileScmSupplyPlanning || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PLANNING_METHOD = factory.withValues([
        ['Unspecified', null], ['MRP', 'mrp'], ['DRP', 'drp'],
        ['Kanban', 'kanban'], ['Min-Max', 'min'], ['Reorder Point', 'reorder']
    ]);

    const TASK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['In Progress', 'progress', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileScmSupplyPlanning.enums = {
        PLANNING_METHOD: PLANNING_METHOD.enum,
        PLANNING_METHOD_VALUES: PLANNING_METHOD.values,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_VALUES: TASK_STATUS.values,
        TASK_STATUS_CLASSES: TASK_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileScmSupplyPlanning.render = {
        planningMethod: (v) => renderEnum(v, PLANNING_METHOD.enum),
        taskStatus: createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
