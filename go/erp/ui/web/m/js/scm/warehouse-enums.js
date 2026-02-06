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
 * Mobile Warehouse Management Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: scm/warehouse/warehouse-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileWarehouse = window.MobileWarehouse || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const WAREHOUSE_TYPE = factory.withValues([
        ['Unspecified', null], ['Distribution Center', 'distribution'], ['Manufacturing', 'manufacturing'],
        ['Cold Storage', 'cold'], ['Cross-Dock', 'cross'], ['Bonded', 'bonded']
    ]);

    const BIN_TYPE = factory.withValues([
        ['Unspecified', null], ['Storage', 'storage'], ['Picking', 'picking'],
        ['Receiving', 'receiving'], ['Shipping', 'shipping'], ['Staging', 'staging']
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

    MobileWarehouse.enums = {
        WAREHOUSE_TYPE: WAREHOUSE_TYPE.enum,
        WAREHOUSE_TYPE_VALUES: WAREHOUSE_TYPE.values,
        BIN_TYPE: BIN_TYPE.enum,
        BIN_TYPE_VALUES: BIN_TYPE.values,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_VALUES: TASK_STATUS.values,
        TASK_STATUS_CLASSES: TASK_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileWarehouse.render = {
        warehouseType: (v) => renderEnum(v, WAREHOUSE_TYPE.enum),
        binType: (v) => renderEnum(v, BIN_TYPE.enum),
        taskStatus: createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
