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
 * Mobile Warehouse Management Module - Form Configurations
 * Desktop Equivalent: scm/warehouse/warehouse-forms.js
 */
(function() {
    'use strict';

    const enums = MobileWarehouse.enums;

    MobileWarehouse.forms = {
        ScmWarehouse: {
            title: 'ScmWarehouse',
            sections: [
                {
                    title: 'Warehouse Information',
                    fields: [
                        { key: 'code', label: 'Warehouse Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'warehouseType', label: 'Type', type: 'select', options: enums.WAREHOUSE_TYPE, required: true },
                        { key: 'address', label: 'Address', type: 'textarea' },
                        { key: 'managerId', label: 'Manager', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        ScmBin: {
            title: 'ScmBin',
            sections: [
                {
                    title: 'Bin Information',
                    fields: [
                        { key: 'binCode', label: 'Bin Code', type: 'text', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
                        { key: 'binType', label: 'Bin Type', type: 'select', options: enums.BIN_TYPE, required: true },
                        { key: 'zone', label: 'Zone', type: 'text' },
                        { key: 'aisle', label: 'Aisle', type: 'text' },
                        { key: 'rack', label: 'Rack', type: 'text' },
                        { key: 'level', label: 'Level', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        ScmReceivingOrder: {
            title: 'Receiving Order',
            sections: [
                {
                    title: 'Receiving Details',
                    fields: [
                        { key: 'purchaseOrderId', label: 'Purchase Order', type: 'reference', lookupModel: 'ScmPurchaseOrder', required: true },
                        { key: 'receivedBy', label: 'Received By', type: 'text' },
                        { key: 'receivingDate', label: 'Receiving Date', type: 'date', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmPutawayTask: {
            title: 'Putaway Task',
            sections: [
                {
                    title: 'Task Details',
                    fields: [
                        { key: 'receivingOrderId', label: 'Receiving Order', type: 'reference', lookupModel: 'ScmReceivingOrder', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'fromBinId', label: 'From Bin', type: 'reference', lookupModel: 'ScmBin' },
                        { key: 'toBinId', label: 'To Bin', type: 'reference', lookupModel: 'ScmBin', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        ScmPickTask: {
            title: 'Pick Task',
            sections: [
                {
                    title: 'Task Details',
                    fields: [
                        { key: 'wavePlanId', label: 'Wave Plan', type: 'reference', lookupModel: 'ScmWavePlan', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'fromBinId', label: 'Bin', type: 'reference', lookupModel: 'ScmBin', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        ScmPackTask: {
            title: 'Pack Task',
            sections: [
                {
                    title: 'Task Details',
                    fields: [
                        { key: 'pickTaskId', label: 'Pick Task', type: 'reference', lookupModel: 'ScmPickTask', required: true },
                        { key: 'packageId', label: 'Package', type: 'text' },
                        { key: 'quantity', label: 'Quantity', type: 'number' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmShipTask: {
            title: 'Ship Task',
            sections: [
                {
                    title: 'Task Details',
                    fields: [
                        { key: 'shipmentId', label: 'Shipment', type: 'reference', lookupModel: 'ScmShipment', required: true },
                        { key: 'carrierId', label: 'Carrier', type: 'reference', lookupModel: 'ScmCarrier' },
                        { key: 'trackingNumber', label: 'Tracking Number', type: 'text' },
                        { key: 'shippedAt', label: 'Shipped At', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS }
                    ]
                }
            ]
        },

        ScmWavePlan: {
            title: 'Wave Plan',
            sections: [
                {
                    title: 'Wave Details',
                    fields: [
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
                        { key: 'planDate', label: 'Plan Date', type: 'date', required: true },
                        { key: 'totalOrders', label: 'Total Orders', type: 'number' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmDockSchedule: {
            title: 'Dock Schedule',
            sections: [
                {
                    title: 'Schedule Details',
                    fields: [
                        { key: 'dockNumber', label: 'Dock Number', type: 'text', required: true },
                        { key: 'carrierId', label: 'Carrier', type: 'reference', lookupModel: 'ScmCarrier' },
                        { key: 'scheduleDate', label: 'Schedule Date', type: 'date', required: true },
                        { key: 'direction', label: 'Direction', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

})();
