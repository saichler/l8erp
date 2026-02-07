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
            ...col.custom('setupTimePlanned', 'Setup (hrs)', (item) => item.setupTimePlanned, { sortKey: 'setupTimePlanned' }),
            ...col.custom('runTimePlanned', 'Run (hrs)', (item) => item.runTimePlanned, { sortKey: 'runTimePlanned' }),
            ...col.enum('status', 'Status', null, render.operationStatus)
        ],

        MfgProductionOrder: [
            ...col.id('prodOrderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('orderDate', 'Order Date'),
            ...col.date('requiredDate', 'Required Date'),
            ...col.enum('status', 'Status', null, render.workOrderStatus)
        ],

        MfgProdOrderLine: [
            ...col.id('lineId'),
            ...col.col('prodOrderId', 'Prod Order'),
            ...col.col('itemId', 'Item'),
            ...col.custom('quantityOrdered', 'Qty Ordered', (item) => item.quantityOrdered, { sortKey: 'quantityOrdered' }),
            ...col.custom('quantityCompleted', 'Qty Completed', (item) => item.quantityCompleted, { sortKey: 'quantityCompleted' })
        ],

        MfgProdBatch: [
            ...col.id('batchId'),
            ...col.col('batchNumber', 'Batch #'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.custom('quantity', 'Quantity', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.date('productionDate', 'Production Date'),
            ...col.custom('qualityStatus', 'Quality Status', (item) => render.batchStatus(item.qualityStatus))
        ],

        MfgProdConsumption: [
            ...col.id('consumptionId'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.col('itemId', 'Item'),
            ...col.custom('quantityConsumed', 'Qty Consumed', (item) => item.quantityConsumed, { sortKey: 'quantityConsumed' }),
            ...col.date('consumptionDate', 'Date')
        ]
    };

})();
