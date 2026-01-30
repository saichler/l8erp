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
 * Mobile Inventory Module - Enum Definitions
 * Desktop Equivalent: scm/inventory/inventory-enums.js
 */
(function() {
    'use strict';

    window.MobileInventory = window.MobileInventory || {};
    MobileInventory.enums = {};

    // ============================================================================
    // ITEM TYPE
    // ============================================================================

    MobileInventory.enums.ITEM_TYPE = {
        0: 'Unspecified', 1: 'Raw Material', 2: 'Finished Good',
        3: 'Semi-Finished', 4: 'Consumable', 5: 'Service'
    };
    MobileInventory.enums.ITEM_TYPE_VALUES = {
        'raw': 1, 'material': 1, 'finished': 2, 'good': 2, 'semi': 3,
        'consumable': 4, 'service': 5
    };

    // ============================================================================
    // VALUATION METHOD
    // ============================================================================

    MobileInventory.enums.VALUATION_METHOD = {
        0: 'Unspecified', 1: 'FIFO', 2: 'LIFO', 3: 'Weighted Average', 4: 'Standard Cost'
    };
    MobileInventory.enums.VALUATION_METHOD_VALUES = {
        'fifo': 1, 'lifo': 2, 'weighted': 3, 'average': 3, 'standard': 4
    };

    // ============================================================================
    // MOVEMENT TYPE
    // ============================================================================

    MobileInventory.enums.MOVEMENT_TYPE = {
        0: 'Unspecified', 1: 'Receipt', 2: 'Issue', 3: 'Transfer',
        4: 'Adjustment', 5: 'Return'
    };
    MobileInventory.enums.MOVEMENT_TYPE_VALUES = {
        'receipt': 1, 'issue': 2, 'transfer': 3, 'adjustment': 4, 'return': 5
    };
    MobileInventory.enums.MOVEMENT_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-pending',
        4: 'status-inactive', 5: 'status-terminated'
    };

    // ============================================================================
    // PLANNING METHOD
    // ============================================================================

    MobileInventory.enums.PLANNING_METHOD = {
        0: 'Unspecified', 1: 'Reorder Point', 2: 'MRP', 3: 'Kanban', 4: 'Min-Max'
    };
    MobileInventory.enums.PLANNING_METHOD_VALUES = {
        'reorder': 1, 'point': 1, 'mrp': 2, 'kanban': 3, 'min': 4, 'max': 4
    };

    // ============================================================================
    // TASK STATUS
    // ============================================================================

    MobileInventory.enums.TASK_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'In Progress', 3: 'Completed', 4: 'Cancelled'
    };
    MobileInventory.enums.TASK_STATUS_VALUES = {
        'pending': 1, 'progress': 2, 'in': 2, 'completed': 3, 'cancelled': 4
    };
    MobileInventory.enums.TASK_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileInventory.render = {
        itemType: (v) => MobileRenderers.renderEnum(v, MobileInventory.enums.ITEM_TYPE),
        valuationMethod: (v) => MobileRenderers.renderEnum(v, MobileInventory.enums.VALUATION_METHOD),
        planningMethod: (v) => MobileRenderers.renderEnum(v, MobileInventory.enums.PLANNING_METHOD),
        movementType: MobileRenderers.createStatusRenderer(
            MobileInventory.enums.MOVEMENT_TYPE,
            MobileInventory.enums.MOVEMENT_TYPE_CLASSES
        ),
        taskStatus: MobileRenderers.createStatusRenderer(
            MobileInventory.enums.TASK_STATUS,
            MobileInventory.enums.TASK_STATUS_CLASSES
        ),
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate,
        money: MobileRenderers.renderMoney
    };

})();
