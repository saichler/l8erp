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

        MfgProductionOrder: [
            ...col.id('prodOrderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('orderDate', 'Order Date'),
            ...col.date('requiredDate', 'Required Date'),
            ...col.enum('status', 'Status', null, render.workOrderStatus)
        ],

    };

})();
