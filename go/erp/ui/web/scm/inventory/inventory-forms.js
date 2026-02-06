/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Inventory Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.Inventory = window.Inventory || {};

    const f = window.Layer8FormFactory;
    const enums = Inventory.enums;

    Inventory.forms = {
        ScmItem: f.form('Item', [
            f.section('Item Information', [
                ...f.text('itemNumber', 'Item Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('itemType', 'Item Type', enums.ITEM_TYPE, true),
                ...f.reference('categoryId', 'Category', 'ScmItemCategory'),
                ...f.text('unitOfMeasure', 'Unit of Measure'),
                ...f.money('unitCost', 'Unit Cost'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        ScmItemCategory: f.form('Item Category', [
            f.section('Category Information', [
                ...f.text('name', 'Category Name', true),
                ...f.reference('parentCategoryId', 'Parent Category', 'ScmItemCategory'),
                ...f.textarea('description', 'Description'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        ScmStockMovement: f.form('Stock Movement', [
            f.section('Movement Details', [
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.select('movementType', 'Movement Type', enums.MOVEMENT_TYPE, true),
                ...f.number('quantity', 'Quantity', true),
                ...f.date('movementDate', 'Movement Date', true),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse'),
                ...f.text('reference', 'Reference'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        ScmLotNumber: f.form('Lot Number', [
            f.section('Lot Details', [
                ...f.text('lotNumber', 'Lot Number', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.date('manufactureDate', 'Manufacture Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.number('quantity', 'Quantity'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        ScmSerialNumber: f.form('Serial Number', [
            f.section('Serial Details', [
                ...f.text('serialNumber', 'Serial Number', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.reference('lotId', 'Lot', 'ScmLotNumber'),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse'),
                ...f.select('status', 'Status', enums.TASK_STATUS)
            ])
        ]),

        ScmCycleCount: f.form('Cycle Count', [
            f.section('Count Details', [
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
                ...f.date('countDate', 'Count Date', true),
                ...f.select('status', 'Status', enums.TASK_STATUS),
                ...f.number('itemsCounted', 'Items Counted'),
                ...f.number('discrepancies', 'Discrepancies'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        ScmReorderPoint: f.form('Reorder Point', [
            f.section('Reorder Details', [
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse'),
                ...f.number('minimumQuantity', 'Minimum Quantity', true),
                ...f.number('reorderQuantity', 'Reorder Quantity', true),
                ...f.number('maximumQuantity', 'Maximum Quantity'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        ScmInventoryValuation: f.form('Inventory Valuation', [
            f.section('Valuation Details', [
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.select('valuationMethod', 'Valuation Method', enums.VALUATION_METHOD, true),
                ...f.date('valuationDate', 'Valuation Date', true),
                ...f.number('quantityOnHand', 'Quantity on Hand'),
                ...f.money('unitCost', 'Unit Cost'),
                ...f.money('totalValue', 'Total Value')
            ])
        ])
    };

    Inventory.primaryKeys = {
        ScmItem: 'itemId',
        ScmItemCategory: 'categoryId',
        ScmStockMovement: 'movementId',
        ScmLotNumber: 'lotId',
        ScmSerialNumber: 'serialId',
        ScmCycleCount: 'cycleCountId',
        ScmReorderPoint: 'reorderPointId',
        ScmInventoryValuation: 'valuationId'
    };

})();
