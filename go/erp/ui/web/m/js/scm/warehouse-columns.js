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

        ScmReceivingOrder: [
            ...col.id('receivingOrderId'),
            ...col.col('purchaseOrderId', 'PO #'),
            ...col.col('receivedBy', 'Received By'),
            ...col.date('receivingDate', 'Receiving Date'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus),
            ...col.col('warehouseId', 'Warehouse')
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
        ScmWarehouse: 'warehouseId', ScmReceivingOrder: 'receivingOrderId',
        ScmWavePlan: 'wavePlanId', ScmDockSchedule: 'scheduleId'
    };

})();
