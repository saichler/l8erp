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
            ...col.enum('valuationMethod', 'Valuation', null, render.valuationMethod),
            ...col.enum('planningMethod', 'Planning', null, render.planningMethod),
            ...col.boolean('isActive', 'Active')
        ],

        ScmItemCategory: [
            ...col.id('categoryId'),
            ...col.col('name', 'Name'),
            ...col.col('parentCategoryId', 'Parent'),
            ...col.col('description', 'Description'),
            ...col.boolean('isActive', 'Active')
        ],

        ScmCycleCount: [
            ...col.id('cycleCountId'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.date('countDate', 'Count Date'),
            ...col.enum('status', 'Status', null, render.taskStatus),
            ...col.custom('itemsCounted', 'Items Counted', (item) => item.itemsCounted, { sortKey: 'itemsCounted' }),
            ...col.custom('discrepancies', 'Discrepancies', (item) => item.discrepancies, { sortKey: 'discrepancies' })
        ],

    };

})();
