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
// Warehouse Management Module - Enum Definitions
// All enum constants and value mappings for Warehouse Management models

(function() {
    'use strict';

    // Create WarehouseManagement namespace
    window.WarehouseManagement = window.WarehouseManagement || {};
    WarehouseManagement.enums = {};

    // ============================================================================
    // WAREHOUSE TYPE
    // ============================================================================

    WarehouseManagement.enums.WAREHOUSE_TYPE = {
        0: 'Unspecified',
        1: 'Distribution Center',
        2: 'Manufacturing',
        3: 'Cold Storage',
        4: 'Cross-Dock',
        5: 'Bonded'
    };

    // ============================================================================
    // BIN TYPE
    // ============================================================================

    WarehouseManagement.enums.BIN_TYPE = {
        0: 'Unspecified',
        1: 'Storage',
        2: 'Picking',
        3: 'Receiving',
        4: 'Shipping',
        5: 'Staging'
    };

    // ============================================================================
    // TASK STATUS
    // ============================================================================

    WarehouseManagement.enums.TASK_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Cancelled'
    };

    WarehouseManagement.enums.TASK_STATUS_CLASSES = {
        1: 'erp-status-pending',
        2: 'erp-status-active',
        3: 'erp-status-active',
        4: 'erp-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    WarehouseManagement.render = {};

    WarehouseManagement.render.warehouseType = (type) => ERPRenderers.renderEnum(type, WarehouseManagement.enums.WAREHOUSE_TYPE);
    WarehouseManagement.render.binType = (type) => ERPRenderers.renderEnum(type, WarehouseManagement.enums.BIN_TYPE);

    WarehouseManagement.render.taskStatus = ERPRenderers.createStatusRenderer(
        WarehouseManagement.enums.TASK_STATUS,
        WarehouseManagement.enums.TASK_STATUS_CLASSES
    );

    WarehouseManagement.render.boolean = ERPRenderers.renderBoolean;
    WarehouseManagement.render.date = ERPRenderers.renderDate;
    WarehouseManagement.render.money = ERPRenderers.renderMoney;

})();
