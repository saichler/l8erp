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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Warehouse Management Module - Form Configurations
 * Desktop Equivalent: scm/warehouse/warehouse-forms.js
 */
window.MobileWarehouse = window.MobileWarehouse || {};
const f = window.Layer8FormFactory;
const enums = MobileWarehouse.enums;

MobileWarehouse.forms = {
    ScmWarehouse: f.form('ScmWarehouse', [
        f.section('Warehouse Information', [
            ...f.text('code', 'Warehouse Code', true),
            ...f.text('name', 'Name', true),
            ...f.select('warehouseType', 'Type', enums.WAREHOUSE_TYPE, true),
            ...f.textarea('address', 'Address'),
            ...f.reference('managerId', 'Manager', 'Employee'),
            ...f.checkbox('isActive', 'Active')
        ])
    ]),

    ScmBin: f.form('ScmBin', [
        f.section('Bin Information', [
            ...f.text('binCode', 'Bin Code', true),
            ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
            ...f.select('binType', 'Bin Type', enums.BIN_TYPE, true),
            ...f.text('zone', 'Zone'),
            ...f.text('aisle', 'Aisle'),
            ...f.text('rack', 'Rack'),
            ...f.text('level', 'Level'),
            ...f.checkbox('isActive', 'Active')
        ])
    ]),

    ScmReceivingOrder: f.form('Receiving Order', [
        f.section('Receiving Details', [
            ...f.reference('purchaseOrderId', 'Purchase Order', 'ScmPurchaseOrder', true),
            ...f.text('receivedBy', 'Received By'),
            ...f.date('receivingDate', 'Receiving Date', true),
            ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.textarea('notes', 'Notes')
        ])
    ]),

    ScmPutawayTask: f.form('Putaway Task', [
        f.section('Task Details', [
            ...f.reference('receivingOrderId', 'Receiving Order', 'ScmReceivingOrder', true),
            ...f.reference('itemId', 'Item', 'ScmItem', true),
            ...f.number('quantity', 'Quantity', true),
            ...f.reference('fromBinId', 'From Bin', 'ScmBin'),
            ...f.reference('toBinId', 'To Bin', 'ScmBin', true),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.reference('assignedTo', 'Assigned To', 'Employee')
        ])
    ]),

    ScmPickTask: f.form('Pick Task', [
        f.section('Task Details', [
            ...f.reference('wavePlanId', 'Wave Plan', 'ScmWavePlan', true),
            ...f.reference('itemId', 'Item', 'ScmItem', true),
            ...f.reference('fromBinId', 'Bin', 'ScmBin', true),
            ...f.number('quantity', 'Quantity', true),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.reference('assignedTo', 'Assigned To', 'Employee')
        ])
    ]),

    ScmPackTask: f.form('Pack Task', [
        f.section('Task Details', [
            ...f.reference('pickTaskId', 'Pick Task', 'ScmPickTask', true),
            ...f.text('packageId', 'Package'),
            ...f.number('quantity', 'Quantity'),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.reference('assignedTo', 'Assigned To', 'Employee')
        ])
    ]),

    ScmShipTask: f.form('Ship Task', [
        f.section('Task Details', [
            ...f.reference('shipmentId', 'Shipment', 'ScmShipment', true),
            ...f.reference('carrierId', 'Carrier', 'ScmCarrier'),
            ...f.text('trackingNumber', 'Tracking Number'),
            ...f.date('shippedAt', 'Shipped At'),
            ...f.select('status', 'Status', enums.TASK_STATUS)
        ])
    ]),

    ScmWavePlan: f.form('Wave Plan', [
        f.section('Wave Details', [
            ...f.reference('assignedTo', 'Assigned To', 'Employee'),
            ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
            ...f.date('planDate', 'Plan Date', true),
            ...f.number('totalOrders', 'Total Orders'),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.textarea('notes', 'Notes')
        ])
    ]),

    ScmDockSchedule: f.form('Dock Schedule', [
        f.section('Schedule Details', [
            ...f.text('dockNumber', 'Dock Number', true),
            ...f.reference('carrierId', 'Carrier', 'ScmCarrier'),
            ...f.date('scheduleDate', 'Schedule Date', true),
            ...f.text('direction', 'Direction'),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.textarea('notes', 'Notes')
        ])
    ])
};
