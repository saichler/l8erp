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
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'warehouseType',
                label: 'Type',
                sortKey: 'warehouseType',
                render: (item) => render.warehouseType(item.warehouseType)
            },
            {
                key: 'address',
                label: 'Location',
                sortKey: 'address',
                render: (item) => item.address?.city || ''
            },
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
            { key: 'purchaseOrderId', label: 'PO #', sortKey: 'purchaseOrderId', filterKey: 'purchaseOrderId' },
            { key: 'receivedBy', label: 'Received By', sortKey: 'receivedBy', filterKey: 'receivedBy' },
            {
                key: 'receivingDate',
                label: 'Receiving Date',
                sortKey: 'receivingDate',
                render: (item) => renderDate(item.receivingDate)
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
            { key: 'fromBinId', label: 'From Bin', sortKey: 'fromBinId', filterKey: 'fromBinId' },
            { key: 'toBinId', label: 'To Bin', sortKey: 'toBinId', filterKey: 'toBinId' },
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
            { key: 'fromBinId', label: 'Bin', sortKey: 'fromBinId', filterKey: 'fromBinId' },
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
            { key: 'pickTaskId', label: 'Pick Task', sortKey: 'pickTaskId', filterKey: 'pickTaskId' },
            { key: 'packageId', label: 'Package', sortKey: 'packageId', filterKey: 'packageId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
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
            { key: 'trackingNumber', label: 'Tracking #', sortKey: 'trackingNumber', filterKey: 'trackingNumber' },
            {
                key: 'shippedAt',
                label: 'Shipped',
                sortKey: 'shippedAt',
                render: (item) => renderDate(item.shippedAt)
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
            { key: 'assignedTo', label: 'Assigned To', sortKey: 'assignedTo', filterKey: 'assignedTo' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            {
                key: 'planDate',
                label: 'Planned',
                sortKey: 'planDate',
                render: (item) => renderDate(item.planDate)
            },
            { key: 'totalOrders', label: 'Orders', sortKey: 'totalOrders' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmDockSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'dockNumber', label: 'Dock', sortKey: 'dockNumber', filterKey: 'dockNumber' },
            { key: 'carrierId', label: 'Carrier', sortKey: 'carrierId', filterKey: 'carrierId' },
            {
                key: 'scheduleDate',
                label: 'Date',
                sortKey: 'scheduleDate',
                render: (item) => renderDate(item.scheduleDate)
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
