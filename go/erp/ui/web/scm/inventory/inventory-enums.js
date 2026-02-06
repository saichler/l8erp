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
// Inventory Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.Inventory = window.Inventory || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const ITEM_TYPE = factory.simple([
        'Unspecified', 'Raw Material', 'Finished Good', 'Semi-Finished', 'Consumable', 'Service'
    ]);

    const VALUATION_METHOD = factory.simple([
        'Unspecified', 'FIFO', 'LIFO', 'Weighted Average', 'Standard Cost'
    ]);

    const MOVEMENT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Receipt', 'receipt', 'layer8d-status-active'],
        ['Issue', 'issue', 'layer8d-status-pending'],
        ['Transfer', 'transfer', 'layer8d-status-pending'],
        ['Adjustment', 'adjustment', 'layer8d-status-inactive'],
        ['Return', 'return', 'layer8d-status-terminated']
    ]);

    const PLANNING_METHOD = factory.simple([
        'Unspecified', 'Reorder Point', 'MRP', 'Kanban', 'Min-Max'
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

    window.Inventory.enums = {
        ITEM_TYPE: ITEM_TYPE.enum,
        VALUATION_METHOD: VALUATION_METHOD.enum,
        MOVEMENT_TYPE: MOVEMENT_TYPE.enum,
        MOVEMENT_TYPE_CLASSES: MOVEMENT_TYPE.classes,
        PLANNING_METHOD: PLANNING_METHOD.enum,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_CLASSES: TASK_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderMovementType = createStatusRenderer(MOVEMENT_TYPE.enum, MOVEMENT_TYPE.classes);
    const renderTaskStatus = createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes);

    window.Inventory.render = {
        itemType: (v) => renderEnum(v, ITEM_TYPE.enum),
        valuationMethod: (v) => renderEnum(v, VALUATION_METHOD.enum),
        movementType: renderMovementType,
        planningMethod: (v) => renderEnum(v, PLANNING_METHOD.enum),
        taskStatus: renderTaskStatus,
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
