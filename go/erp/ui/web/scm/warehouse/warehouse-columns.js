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
// Warehouse Management Module - Column Configurations
// Table column definitions for all Warehouse Management models

(function() {
    'use strict';

    // Ensure WarehouseManagement namespace exists
    window.WarehouseManagement = window.WarehouseManagement || {};

    const { renderBoolean, renderDate, renderMoney } = Layer8DRenderers;
    const render = WarehouseManagement.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    WarehouseManagement.columns = {
        ScmWarehouse: [
            { key: 'warehouseId', label: 'ID', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            { key: 'warehouseCode', label: 'Code', sortKey: 'warehouseCode', filterKey: 'warehouseCode' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'warehouseType',
                label: 'Type',
                sortKey: 'warehouseType',
                render: (item) => render.warehouseType(item.warehouseType)
            },
            { key: 'location', label: 'Location', sortKey: 'location', filterKey: 'location' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        ScmBin: [
            { key: 'binId', label: 'ID', sortKey: 'binId', filterKey: 'binId' },
            { key: 'binCode', label: 'Bin Code', sortKey: 'binCode', filterKey: 'binCode' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            {
                key: 'binType',
                label: 'Type',
                sortKey: 'binType',
                render: (item) => render.binType(item.binType)
            },
            { key: 'zone', label: 'Zone', sortKey: 'zone', filterKey: 'zone' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        ScmReceivingOrder: [
            { key: 'receivingOrderId', label: 'ID', sortKey: 'receivingOrderId', filterKey: 'receivingOrderId' },
            { key: 'orderNumber', label: 'Order #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            {
                key: 'expectedDate',
                label: 'Expected',
                sortKey: 'expectedDate',
                render: (item) => renderDate(item.expectedDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' }
        ],

        ScmPutawayTask: [
            { key: 'taskId', label: 'ID', sortKey: 'taskId', filterKey: 'taskId' },
            { key: 'receivingOrderId', label: 'Receiving Order', sortKey: 'receivingOrderId', filterKey: 'receivingOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'sourceBinId', label: 'Source Bin', sortKey: 'sourceBinId', filterKey: 'sourceBinId' },
            { key: 'targetBinId', label: 'Target Bin', sortKey: 'targetBinId', filterKey: 'targetBinId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmPickTask: [
            { key: 'taskId', label: 'ID', sortKey: 'taskId', filterKey: 'taskId' },
            { key: 'orderReference', label: 'Order Ref', sortKey: 'orderReference', filterKey: 'orderReference' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'binId', label: 'Bin', sortKey: 'binId', filterKey: 'binId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmPackTask: [
            { key: 'taskId', label: 'ID', sortKey: 'taskId', filterKey: 'taskId' },
            { key: 'orderReference', label: 'Order Ref', sortKey: 'orderReference', filterKey: 'orderReference' },
            { key: 'packStation', label: 'Pack Station', sortKey: 'packStation', filterKey: 'packStation' },
            { key: 'itemCount', label: 'Items', sortKey: 'itemCount' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmShipTask: [
            { key: 'taskId', label: 'ID', sortKey: 'taskId', filterKey: 'taskId' },
            { key: 'shipmentId', label: 'Shipment', sortKey: 'shipmentId', filterKey: 'shipmentId' },
            { key: 'carrierId', label: 'Carrier', sortKey: 'carrierId', filterKey: 'carrierId' },
            { key: 'dockId', label: 'Dock', sortKey: 'dockId', filterKey: 'dockId' },
            {
                key: 'scheduledDate',
                label: 'Scheduled',
                sortKey: 'scheduledDate',
                render: (item) => renderDate(item.scheduledDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmWavePlan: [
            { key: 'wavePlanId', label: 'ID', sortKey: 'wavePlanId', filterKey: 'wavePlanId' },
            { key: 'waveName', label: 'Wave', sortKey: 'waveName', filterKey: 'waveName' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            {
                key: 'plannedDate',
                label: 'Planned',
                sortKey: 'plannedDate',
                render: (item) => renderDate(item.plannedDate)
            },
            { key: 'orderCount', label: 'Orders', sortKey: 'orderCount' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmDockSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'dockId', label: 'Dock', sortKey: 'dockId', filterKey: 'dockId' },
            { key: 'carrierId', label: 'Carrier', sortKey: 'carrierId', filterKey: 'carrierId' },
            {
                key: 'scheduledDate',
                label: 'Date',
                sortKey: 'scheduledDate',
                render: (item) => renderDate(item.scheduledDate)
            },
            { key: 'direction', label: 'Direction', sortKey: 'direction', filterKey: 'direction' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ]
    };

})();
