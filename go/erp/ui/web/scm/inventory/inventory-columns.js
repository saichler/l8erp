/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Inventory Module - Column Configurations
// Uses Layer8ColumnFactory for reduced boilerplate

(function() {
    'use strict';

    window.Inventory = window.Inventory || {};

    const col = window.Layer8ColumnFactory;
    const render = Inventory.render;

    Inventory.columns = {
        ScmItem: [
            ...col.id('itemId'),
            ...col.col('itemNumber', 'Item #'),
            ...col.col('name', 'Name'),
            ...col.enum('itemType', 'Type', null, render.itemType),
            ...col.col('categoryId', 'Category'),
            ...col.money('unitCost', 'Unit Cost'),
            ...col.boolean('isActive', 'Active')
        ],

        ScmItemCategory: [
            ...col.id('categoryId'),
            ...col.col('name', 'Name'),
            ...col.col('parentCategoryId', 'Parent'),
            ...col.col('description', 'Description'),
            ...col.boolean('isActive', 'Active')
        ],

        ScmStockMovement: [
            ...col.id('movementId'),
            ...col.col('itemId', 'Item'),
            ...col.enum('movementType', 'Type', null, render.movementType),
            ...col.custom('quantity', 'Qty', (item) => item.quantity, { sortKey: 'quantity' }),
            ...col.date('movementDate', 'Date'),
            ...col.col('warehouseId', 'Warehouse')
        ],

        ScmLotNumber: [
            ...col.id('lotId'),
            ...col.col('lotNumber', 'Lot #'),
            ...col.col('itemId', 'Item'),
            ...col.date('manufactureDate', 'Mfg Date'),
            ...col.date('expiryDate', 'Expiry'),
            ...col.custom('quantity', 'Qty', (item) => item.quantity, { sortKey: 'quantity' })
        ],

        ScmSerialNumber: [
            ...col.id('serialId'),
            ...col.col('serialNumber', 'Serial #'),
            ...col.col('itemId', 'Item'),
            ...col.col('lotId', 'Lot'),
            ...col.enum('status', 'Status', null, render.taskStatus)
        ],

        ScmCycleCount: [
            ...col.id('cycleCountId'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.date('countDate', 'Count Date'),
            ...col.enum('status', 'Status', null, render.taskStatus),
            ...col.custom('itemsCounted', 'Items Counted', (item) => item.itemsCounted, { sortKey: 'itemsCounted' }),
            ...col.custom('discrepancies', 'Discrepancies', (item) => item.discrepancies, { sortKey: 'discrepancies' })
        ],

        ScmReorderPoint: [
            ...col.id('reorderPointId'),
            ...col.col('itemId', 'Item'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.custom('minimumQuantity', 'Min Qty', (item) => item.minimumQuantity, { sortKey: 'minimumQuantity' }),
            ...col.custom('reorderQuantity', 'Reorder Qty', (item) => item.reorderQuantity, { sortKey: 'reorderQuantity' }),
            ...col.boolean('isActive', 'Active')
        ],

        ScmInventoryValuation: [
            ...col.id('valuationId'),
            ...col.col('itemId', 'Item'),
            ...col.enum('valuationMethod', 'Method', null, render.valuationMethod),
            ...col.date('valuationDate', 'Date'),
            ...col.money('totalValue', 'Total Value')
        ]
    };

})();
