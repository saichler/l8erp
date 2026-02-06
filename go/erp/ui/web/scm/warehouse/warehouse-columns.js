/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Warehouse Management Module - Column Configurations
// Uses Layer8ColumnFactory for reduced boilerplate

(function() {
    'use strict';

    window.WarehouseManagement = window.WarehouseManagement || {};

    const col = window.Layer8ColumnFactory;
    const render = WarehouseManagement.render;

    WarehouseManagement.columns = {
        ScmWarehouse: [
            ...col.id('warehouseId'),
            ...col.basic(['code', 'name']),
            ...col.enum('warehouseType', 'Type', null, render.warehouseType),
            ...col.custom('address', 'Location', (item) => item.address?.city || '', { sortKey: 'address' }),
            ...col.boolean('isActive', 'Active')
        ],

        ScmBin: [
            ...col.id('binId'),
            ...col.col('binCode', 'Bin Code'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.enum('binType', 'Type', null, render.binType),
            ...col.col('zone', 'Zone'),
            ...col.boolean('isActive', 'Active')
        ],

        ScmReceivingOrder: [
            ...col.id('receivingOrderId'),
            ...col.col('purchaseOrderId', 'PO #'),
            ...col.col('receivedBy', 'Received By'),
            ...col.date('receivingDate', 'Receiving Date'),
            ...col.enum('status', 'Status', null, render.taskStatus),
            ...col.col('warehouseId', 'Warehouse')
        ],

        ScmPutawayTask: [
            ...col.id('taskId'),
            ...col.col('receivingOrderId', 'Receiving Order'),
            ...col.col('itemId', 'Item'),
            ...col.col('fromBinId', 'From Bin'),
            ...col.col('toBinId', 'To Bin'),
            ...col.enum('status', 'Status', null, render.taskStatus)
        ],

        ScmPickTask: [
            ...col.id('taskId'),
            ...col.col('orderReference', 'Order Ref'),
            ...col.col('itemId', 'Item'),
            ...col.col('fromBinId', 'Bin'),
            ...col.custom('quantity', 'Qty', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.enum('status', 'Status', null, render.taskStatus)
        ],

        ScmPackTask: [
            ...col.id('taskId'),
            ...col.col('pickTaskId', 'Pick Task'),
            ...col.col('packageId', 'Package'),
            ...col.custom('quantity', 'Qty', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.enum('status', 'Status', null, render.taskStatus)
        ],

        ScmShipTask: [
            ...col.id('taskId'),
            ...col.col('shipmentId', 'Shipment'),
            ...col.col('carrierId', 'Carrier'),
            ...col.col('trackingNumber', 'Tracking #'),
            ...col.date('shippedAt', 'Shipped'),
            ...col.enum('status', 'Status', null, render.taskStatus)
        ],

        ScmWavePlan: [
            ...col.id('wavePlanId'),
            ...col.col('assignedTo', 'Assigned To'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.date('planDate', 'Planned'),
            ...col.custom('totalOrders', 'Orders', (item) => item.totalOrders, { sortKey: 'totalOrders' }),
            ...col.enum('status', 'Status', null, render.taskStatus)
        ],

        ScmDockSchedule: [
            ...col.id('scheduleId'),
            ...col.col('dockNumber', 'Dock'),
            ...col.col('carrierId', 'Carrier'),
            ...col.date('scheduleDate', 'Date'),
            ...col.col('direction', 'Direction'),
            ...col.enum('status', 'Status', null, render.taskStatus)
        ]
    };

})();
