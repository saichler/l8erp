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
 * Mobile Warehouse Management Module - Column Configurations
 * Desktop Equivalent: scm/warehouse/warehouse-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileWarehouse.enums;
    const render = MobileWarehouse.render;

    MobileWarehouse.columns = {
        ScmWarehouse: [
            ...col.id('warehouseId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('warehouseType', 'Type', enums.WAREHOUSE_TYPE_VALUES, render.warehouseType),
            ...col.custom('address', 'Location', (item) => item.address?.city || ''),
            ...col.boolean('isActive', 'Active')
        ],

        ScmBin: [
            ...col.id('binId'),
            ...col.col('binCode', 'Bin Code'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.status('binType', 'Type', enums.BIN_TYPE_VALUES, render.binType),
            ...col.col('zone', 'Zone'),
            ...col.boolean('isActive', 'Active')
        ],

        ScmReceivingOrder: [
            ...col.id('receivingOrderId'),
            ...col.col('purchaseOrderId', 'PO #'),
            ...col.col('receivedBy', 'Received By'),
            ...col.date('receivingDate', 'Receiving Date'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus),
            ...col.col('warehouseId', 'Warehouse')
        ],

        ScmPutawayTask: [
            ...col.id('taskId'),
            ...col.col('receivingOrderId', 'Receiving Order'),
            ...col.col('itemId', 'Item'),
            ...col.col('fromBinId', 'From Bin'),
            ...col.col('toBinId', 'To Bin'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmPickTask: [
            ...col.id('taskId'),
            ...col.col('wavePlanId', 'Wave Plan'),
            ...col.col('itemId', 'Item'),
            ...col.col('fromBinId', 'Bin'),
            ...col.col('quantity', 'Qty'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmPackTask: [
            ...col.id('taskId'),
            ...col.col('pickTaskId', 'Pick Task'),
            ...col.col('packageId', 'Package'),
            ...col.col('quantity', 'Qty'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmShipTask: [
            ...col.id('taskId'),
            ...col.col('shipmentId', 'Shipment'),
            ...col.col('carrierId', 'Carrier'),
            ...col.col('trackingNumber', 'Tracking #'),
            ...col.date('shippedAt', 'Shipped'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmWavePlan: [
            ...col.id('wavePlanId'),
            ...col.col('assignedTo', 'Assigned To'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.date('planDate', 'Planned'),
            ...col.col('totalOrders', 'Orders'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmDockSchedule: [
            ...col.id('scheduleId'),
            ...col.col('dockNumber', 'Dock'),
            ...col.col('carrierId', 'Carrier'),
            ...col.date('scheduleDate', 'Date'),
            ...col.col('direction', 'Direction'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ]
    };

    MobileWarehouse.primaryKeys = {
        ScmWarehouse: 'warehouseId', ScmBin: 'binId', ScmReceivingOrder: 'receivingOrderId',
        ScmPutawayTask: 'taskId', ScmPickTask: 'taskId', ScmPackTask: 'taskId',
        ScmShipTask: 'taskId', ScmWavePlan: 'wavePlanId', ScmDockSchedule: 'scheduleId'
    };

})();
