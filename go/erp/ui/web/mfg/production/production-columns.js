/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Manufacturing Production Module - Column Configurations
// Uses Layer8ColumnFactory for reduced boilerplate

(function() {
    'use strict';

    window.MfgProduction = window.MfgProduction || {};

    const col = window.Layer8ColumnFactory;
    const render = MfgProduction.render;

    MfgProduction.columns = {
        MfgWorkOrder: [
            ...col.id('workOrderId'),
            ...col.col('workOrderNumber', 'WO #'),
            ...col.col('itemId', 'Item'),
            ...col.custom('quantityOrdered', 'Qty Ordered', (item) => item.quantityOrdered, { sortKey: 'quantityOrdered' }),
            ...col.custom('quantityCompleted', 'Qty Completed', (item) => item.quantityCompleted, { sortKey: 'quantityCompleted' }),
            ...col.date('plannedStartDate', 'Planned Start'),
            ...col.enum('status', 'Status', null, render.workOrderStatus)
        ],

        MfgWorkOrderOp: [
            ...col.id('operationId'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.custom('operationNumber', 'Op #', (item) => item.operationNumber, { sortKey: 'operationNumber' }),
            ...col.col('workCenterId', 'Work Center'),
            ...col.custom('setupTime', 'Setup (hrs)', (item) => item.setupTime, { sortKey: 'setupTime' }),
            ...col.custom('runTime', 'Run (hrs)', (item) => item.runTime, { sortKey: 'runTime' }),
            ...col.enum('status', 'Status', null, render.operationStatus)
        ],

        MfgProductionOrder: [
            ...col.id('prodOrderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('itemId', 'Item'),
            ...col.custom('quantity', 'Quantity', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.date('scheduledDate', 'Scheduled'),
            ...col.enum('status', 'Status', null, render.workOrderStatus)
        ],

        MfgProdOrderLine: [
            ...col.id('lineId'),
            ...col.col('prodOrderId', 'Prod Order'),
            ...col.col('itemId', 'Item'),
            ...col.custom('requiredQty', 'Required Qty', (item) => item.requiredQty, { sortKey: 'requiredQty' }),
            ...col.custom('issuedQty', 'Issued Qty', (item) => item.issuedQty, { sortKey: 'issuedQty' })
        ],

        MfgProdBatch: [
            ...col.id('batchId'),
            ...col.col('batchNumber', 'Batch #'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.custom('quantity', 'Quantity', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.date('startDate', 'Start Date'),
            ...col.enum('status', 'Status', null, render.batchStatus)
        ],

        MfgProdConsumption: [
            ...col.id('consumptionId'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.col('itemId', 'Item'),
            ...col.custom('quantity', 'Quantity', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.date('consumptionDate', 'Date')
        ]
    };

})();
