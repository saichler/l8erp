/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Warehouse Management Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.WarehouseManagement = window.WarehouseManagement || {};

    const f = window.Layer8FormFactory;
    const enums = WarehouseManagement.enums;

    WarehouseManagement.forms = {
        ScmWarehouse: f.form('Warehouse', [
            f.section('Warehouse Information', [
                ...f.text('code', 'Warehouse Code', true),
                ...f.text('name', 'Name', true),
                ...f.select('warehouseType', 'Type', enums.WAREHOUSE_TYPE, true),
                ...f.address('address'),
                ...f.reference('managerId', 'Manager', 'Employee'),
                ...f.checkbox('isActive', 'Active'),
                ...f.number('capacity', 'Capacity'),
                ...f.text('notes', 'Notes'),
            ]),
            f.section('Bins', [
                ...f.inlineTable('bins', 'Warehouse Bins', [
                    { key: 'binId', label: 'Bin ID', hidden: true },
                    { key: 'binCode', label: 'Bin Code', type: 'text', required: true },
                    { key: 'binType', label: 'Type', type: 'select', options: enums.BIN_TYPE, required: true },
                    { key: 'zone', label: 'Zone', type: 'text' },
                    { key: 'aisle', label: 'Aisle', type: 'text' },
                    { key: 'rack', label: 'Rack', type: 'text' },
                    { key: 'level', label: 'Level', type: 'text' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
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
            ]),
            f.section('Putaway Tasks', [
                ...f.inlineTable('putawayTasks', 'Putaway Tasks', [
                    { key: 'taskId', label: 'Task ID', hidden: true },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'fromBinId', label: 'From Bin', type: 'text' },
                    { key: 'toBinId', label: 'To Bin', type: 'text', required: true },
                    { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                    { key: 'assignedTo', label: 'Assigned To', type: 'text' }
                ])
            ])
        ]),

        ScmWavePlan: f.form('Wave Plan', [
            f.section('Wave Details', [
                ...f.reference('assignedTo', 'Assigned To', 'Employee'),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
                ...f.date('planDate', 'Plan Date', true),
                ...f.number('totalOrders', 'Total Orders'),
                ...f.select('status', 'Status', enums.TASK_STATUS),
                ...f.textarea('notes', 'Notes'),
                ...f.number('totalItems', 'Total Items'),
            ]),
            f.section('Pick Tasks', [
                ...f.inlineTable('pickTasks', 'Pick Tasks', [
                    { key: 'taskId', label: 'Task ID', hidden: true },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                    { key: 'fromBinId', label: 'Bin', type: 'text', required: true },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                    { key: 'assignedTo', label: 'Assigned To', type: 'text' },
                    { key: 'orderReference', label: 'Order Ref', type: 'text' }
                ])
            ]),
            f.section('Pack Tasks', [
                ...f.inlineTable('packTasks', 'Pack Tasks', [
                    { key: 'taskId', label: 'Task ID', hidden: true },
                    { key: 'pickTaskId', label: 'Pick Task', type: 'text' },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                    { key: 'quantity', label: 'Qty', type: 'number' },
                    { key: 'packageId', label: 'Package', type: 'text' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                    { key: 'assignedTo', label: 'Assigned To', type: 'text' }
                ])
            ]),
            f.section('Ship Tasks', [
                ...f.inlineTable('shipTasks', 'Ship Tasks', [
                    { key: 'taskId', label: 'Task ID', hidden: true },
                    { key: 'shipmentId', label: 'Shipment', type: 'reference', lookupModel: 'ScmShipment' },
                    { key: 'carrierId', label: 'Carrier', type: 'reference', lookupModel: 'ScmCarrier' },
                    { key: 'trackingNumber', label: 'Tracking #', type: 'text' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                    { key: 'shippedAt', label: 'Shipped', type: 'date' }
                ])
            ])
        ]),

        ScmDockSchedule: f.form('Dock Schedule', [
            f.section('Schedule Details', [
                ...f.text('dockNumber', 'Dock Number', true),
                ...f.reference('carrierId', 'Carrier', 'ScmCarrier'),
                ...f.date('scheduleDate', 'Schedule Date', true),
                ...f.text('direction', 'Direction'),
                ...f.select('status', 'Status', enums.TASK_STATUS),
                ...f.textarea('notes', 'Notes'),
                ...f.text('warehouseId', 'Warehouse'),
                ...f.date('startTime', 'Start Time'),
                ...f.date('endTime', 'End Time'),
                ...f.text('shipmentId', 'Shipment'),
            ])
        ])
    };

    WarehouseManagement.primaryKeys = {
        ScmWarehouse: 'warehouseId',
        ScmReceivingOrder: 'receivingOrderId',
        ScmWavePlan: 'wavePlanId',
        ScmDockSchedule: 'scheduleId'
    };

})();
