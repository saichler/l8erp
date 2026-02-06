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
 * Mobile Inventory Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: scm/inventory/inventory-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileInventory = window.MobileInventory || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const ITEM_TYPE = factory.withValues([
        ['Unspecified', null], ['Raw Material', 'raw'], ['Finished Good', 'finished'],
        ['Semi-Finished', 'semi'], ['Consumable', 'consumable'], ['Service', 'service']
    ]);

    const VALUATION_METHOD = factory.withValues([
        ['Unspecified', null], ['FIFO', 'fifo'], ['LIFO', 'lifo'],
        ['Weighted Average', 'weighted'], ['Standard Cost', 'standard']
    ]);

    const MOVEMENT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Receipt', 'receipt', 'status-active'],
        ['Issue', 'issue', 'status-pending'],
        ['Transfer', 'transfer', 'status-pending'],
        ['Adjustment', 'adjustment', 'status-inactive'],
        ['Return', 'return', 'status-terminated']
    ]);

    const PLANNING_METHOD = factory.withValues([
        ['Unspecified', null], ['Reorder Point', 'reorder'], ['MRP', 'mrp'],
        ['Kanban', 'kanban'], ['Min-Max', 'min']
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

    MobileInventory.enums = {
        ITEM_TYPE: ITEM_TYPE.enum,
        ITEM_TYPE_VALUES: ITEM_TYPE.values,
        VALUATION_METHOD: VALUATION_METHOD.enum,
        VALUATION_METHOD_VALUES: VALUATION_METHOD.values,
        MOVEMENT_TYPE: MOVEMENT_TYPE.enum,
        MOVEMENT_TYPE_VALUES: MOVEMENT_TYPE.values,
        MOVEMENT_TYPE_CLASSES: MOVEMENT_TYPE.classes,
        PLANNING_METHOD: PLANNING_METHOD.enum,
        PLANNING_METHOD_VALUES: PLANNING_METHOD.values,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_VALUES: TASK_STATUS.values,
        TASK_STATUS_CLASSES: TASK_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileInventory.render = {
        itemType: (v) => renderEnum(v, ITEM_TYPE.enum),
        valuationMethod: (v) => renderEnum(v, VALUATION_METHOD.enum),
        planningMethod: (v) => renderEnum(v, PLANNING_METHOD.enum),
        movementType: createStatusRenderer(MOVEMENT_TYPE.enum, MOVEMENT_TYPE.classes),
        taskStatus: createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
