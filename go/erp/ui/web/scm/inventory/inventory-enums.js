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
// Inventory Module - Enum Definitions
// All enum constants and value mappings for Inventory models

(function() {
    'use strict';

    // Create Inventory namespace
    window.Inventory = window.Inventory || {};
    Inventory.enums = {};

    // ============================================================================
    // ITEM TYPE
    // ============================================================================

    Inventory.enums.ITEM_TYPE = {
        0: 'Unspecified',
        1: 'Raw Material',
        2: 'Finished Good',
        3: 'Semi-Finished',
        4: 'Consumable',
        5: 'Service'
    };

    // ============================================================================
    // VALUATION METHOD
    // ============================================================================

    Inventory.enums.VALUATION_METHOD = {
        0: 'Unspecified',
        1: 'FIFO',
        2: 'LIFO',
        3: 'Weighted Average',
        4: 'Standard Cost'
    };

    // ============================================================================
    // MOVEMENT TYPE
    // ============================================================================

    Inventory.enums.MOVEMENT_TYPE = {
        0: 'Unspecified',
        1: 'Receipt',
        2: 'Issue',
        3: 'Transfer',
        4: 'Adjustment',
        5: 'Return'
    };

    Inventory.enums.MOVEMENT_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-terminated'
    };

    // ============================================================================
    // PLANNING METHOD
    // ============================================================================

    Inventory.enums.PLANNING_METHOD = {
        0: 'Unspecified',
        1: 'Reorder Point',
        2: 'MRP',
        3: 'Kanban',
        4: 'Min-Max'
    };

    // ============================================================================
    // TASK STATUS
    // ============================================================================

    Inventory.enums.TASK_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Cancelled'
    };

    Inventory.enums.TASK_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    Inventory.render = {};

    Inventory.render.itemType = (type) => Layer8DRenderers.renderEnum(type, Inventory.enums.ITEM_TYPE);
    Inventory.render.valuationMethod = (type) => Layer8DRenderers.renderEnum(type, Inventory.enums.VALUATION_METHOD);
    Inventory.render.planningMethod = (type) => Layer8DRenderers.renderEnum(type, Inventory.enums.PLANNING_METHOD);

    Inventory.render.movementType = Layer8DRenderers.createStatusRenderer(
        Inventory.enums.MOVEMENT_TYPE,
        Inventory.enums.MOVEMENT_TYPE_CLASSES
    );

    Inventory.render.taskStatus = Layer8DRenderers.createStatusRenderer(
        Inventory.enums.TASK_STATUS,
        Inventory.enums.TASK_STATUS_CLASSES
    );

    Inventory.render.boolean = Layer8DRenderers.renderBoolean;
    Inventory.render.date = Layer8DRenderers.renderDate;
    Inventory.render.money = Layer8DRenderers.renderMoney;

})();
