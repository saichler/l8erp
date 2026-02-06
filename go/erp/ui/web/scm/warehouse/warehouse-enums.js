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
// Warehouse Management Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.WarehouseManagement = window.WarehouseManagement || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const WAREHOUSE_TYPE = factory.simple([
        'Unspecified', 'Distribution Center', 'Manufacturing', 'Cold Storage', 'Cross-Dock', 'Bonded'
    ]);

    const BIN_TYPE = factory.simple([
        'Unspecified', 'Storage', 'Picking', 'Receiving', 'Shipping', 'Staging'
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

    window.WarehouseManagement.enums = {
        WAREHOUSE_TYPE: WAREHOUSE_TYPE.enum,
        BIN_TYPE: BIN_TYPE.enum,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_CLASSES: TASK_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderTaskStatus = createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes);

    window.WarehouseManagement.render = {
        warehouseType: (v) => renderEnum(v, WAREHOUSE_TYPE.enum),
        binType: (v) => renderEnum(v, BIN_TYPE.enum),
        taskStatus: renderTaskStatus,
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
