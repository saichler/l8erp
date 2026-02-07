/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Manufacturing Production Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MfgProduction = window.MfgProduction || {};

    const f = window.Layer8FormFactory;
    const enums = MfgProduction.enums;

    MfgProduction.forms = {
        MfgWorkOrder: f.form('Work Order', [
            f.section('Work Order Details', [
                ...f.text('workOrderNumber', 'WO Number', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.reference('bomId', 'BOM', 'MfgBom'),
                ...f.reference('routingId', 'Routing', 'MfgRouting'),
                ...f.number('quantityOrdered', 'Qty Ordered', true),
                ...f.date('plannedStartDate', 'Planned Start'),
                ...f.date('plannedEndDate', 'Planned End'),
                ...f.select('status', 'Status', enums.WORK_ORDER_STATUS),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter'),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse'),
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder'),
                ...f.number('priority', 'Priority'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgWorkOrderOp: f.form('Work Order Operation', [
            f.section('Operation Details', [
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.number('operationNumber', 'Operation #', true),
                ...f.text('operationName', 'Operation Name'),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter', true),
                ...f.number('setupTimePlanned', 'Setup Time Planned (hrs)'),
                ...f.number('runTimePlanned', 'Run Time Planned (hrs)'),
                ...f.select('status', 'Status', enums.OPERATION_STATUS)
            ])
        ]),

        MfgProductionOrder: f.form('Production Order', [
            f.section('Order Details', [
                ...f.text('orderNumber', 'Order Number', true),
                ...f.reference('customerId', 'Customer', 'Customer'),
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder'),
                ...f.date('orderDate', 'Order Date'),
                ...f.date('requiredDate', 'Required Date'),
                ...f.select('status', 'Status', enums.WORK_ORDER_STATUS),
                ...f.number('priority', 'Priority'),
                ...f.reference('plannerId', 'Planner', 'Employee'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgProdOrderLine: f.form('Production Order Line', [
            f.section('Line Details', [
                ...f.reference('prodOrderId', 'Prod Order', 'MfgProductionOrder', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.number('quantityOrdered', 'Qty Ordered', true),
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder'),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse')
            ])
        ]),

        MfgProdBatch: f.form('Production Batch', [
            f.section('Batch Details', [
                ...f.text('batchNumber', 'Batch Number', true),
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.number('quantity', 'Quantity', true),
                ...f.date('productionDate', 'Production Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.select('qualityStatus', 'Quality Status', enums.BATCH_STATUS)
            ])
        ]),

        MfgProdConsumption: f.form('Production Consumption', [
            f.section('Consumption Details', [
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.number('quantityConsumed', 'Qty Consumed', true),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse'),
                ...f.date('consumptionDate', 'Date')
            ])
        ])
    };

    MfgProduction.primaryKeys = {
        MfgWorkOrder: 'workOrderId',
        MfgWorkOrderOp: 'operationId',
        MfgProductionOrder: 'prodOrderId',
        MfgProdOrderLine: 'lineId',
        MfgProdBatch: 'batchId',
        MfgProdConsumption: 'consumptionId'
    };

})();
