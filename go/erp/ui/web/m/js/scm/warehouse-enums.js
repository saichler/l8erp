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
 * Mobile Warehouse Management Module - Enum Definitions
 * Desktop Equivalent: scm/warehouse/warehouse-enums.js
 */
(function() {
    'use strict';

    window.MobileWarehouse = window.MobileWarehouse || {};
    MobileWarehouse.enums = {};

    // ============================================================================
    // WAREHOUSE TYPE
    // ============================================================================

    MobileWarehouse.enums.WAREHOUSE_TYPE = {
        0: 'Unspecified', 1: 'Distribution Center', 2: 'Manufacturing',
        3: 'Cold Storage', 4: 'Cross-Dock', 5: 'Bonded'
    };
    MobileWarehouse.enums.WAREHOUSE_TYPE_VALUES = {
        'distribution': 1, 'center': 1, 'manufacturing': 2,
        'cold': 3, 'storage': 3, 'cross': 4, 'dock': 4, 'bonded': 5
    };

    // ============================================================================
    // BIN TYPE
    // ============================================================================

    MobileWarehouse.enums.BIN_TYPE = {
        0: 'Unspecified', 1: 'Storage', 2: 'Picking', 3: 'Receiving',
        4: 'Shipping', 5: 'Staging'
    };
    MobileWarehouse.enums.BIN_TYPE_VALUES = {
        'storage': 1, 'picking': 2, 'receiving': 3, 'shipping': 4, 'staging': 5
    };

    // ============================================================================
    // TASK STATUS
    // ============================================================================

    MobileWarehouse.enums.TASK_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'In Progress', 3: 'Completed', 4: 'Cancelled'
    };
    MobileWarehouse.enums.TASK_STATUS_VALUES = {
        'pending': 1, 'progress': 2, 'in': 2, 'completed': 3, 'cancelled': 4
    };
    MobileWarehouse.enums.TASK_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileWarehouse.render = {
        warehouseType: (v) => Layer8MRenderers.renderEnum(v, MobileWarehouse.enums.WAREHOUSE_TYPE),
        binType: (v) => Layer8MRenderers.renderEnum(v, MobileWarehouse.enums.BIN_TYPE),
        taskStatus: Layer8MRenderers.createStatusRenderer(
            MobileWarehouse.enums.TASK_STATUS,
            MobileWarehouse.enums.TASK_STATUS_CLASSES
        ),
        boolean: Layer8MRenderers.renderBoolean,
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
