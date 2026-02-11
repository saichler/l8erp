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
            ]),
            f.section('Lot Numbers', [
                ...f.inlineTable('lots', 'Lot Numbers', [
                    { key: 'lotId', label: 'Lot ID', hidden: true },
                    { key: 'lotNumber', label: 'Lot #', type: 'text', required: true },
                    { key: 'manufactureDate', label: 'Mfg Date', type: 'date' },
                    { key: 'expiryDate', label: 'Expiry', type: 'date' },
                    { key: 'quantity', label: 'Qty', type: 'number' },
                    { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                    { key: 'status', label: 'Status', type: 'text' }
                ])
            ]),
            f.section('Serial Numbers', [
                ...f.inlineTable('serials', 'Serial Numbers', [
                    { key: 'serialId', label: 'Serial ID', hidden: true },
                    { key: 'serialNumber', label: 'Serial #', type: 'text', required: true },
                    { key: 'lotId', label: 'Lot', type: 'text' },
                    { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                    { key: 'status', label: 'Status', type: 'text' }
                ])
            ]),
            f.section('Reorder Points', [
                ...f.inlineTable('reorderPoints', 'Reorder Points', [
                    { key: 'reorderPointId', label: 'ID', hidden: true },
                    { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                    { key: 'minimumQuantity', label: 'Min Qty', type: 'number', required: true },
                    { key: 'reorderQuantity', label: 'Reorder Qty', type: 'number', required: true },
                    { key: 'maximumQuantity', label: 'Max Qty', type: 'number' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
            ]),
            f.section('Valuations', [
                ...f.inlineTable('valuations', 'Inventory Valuations', [
                    { key: 'valuationId', label: 'ID', hidden: true },
                    { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                    { key: 'valuationDate', label: 'Date', type: 'date' },
                    { key: 'quantityOnHand', label: 'Qty on Hand', type: 'number' },
                    { key: 'unitCost', label: 'Unit Cost', type: 'money' },
                    { key: 'totalValue', label: 'Total Value', type: 'money' }
                ])
            ]),
            f.section('Stock Movements', [
                ...f.inlineTable('movements', 'Stock Movements', [
                    { key: 'movementId', label: 'ID', hidden: true },
                    { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                    { key: 'movementType', label: 'Type', type: 'select', options: enums.MOVEMENT_TYPE },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'movementDate', label: 'Date', type: 'date', required: true },
                    { key: 'referenceId', label: 'Reference', type: 'text' }
                ])
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

    };

    Inventory.primaryKeys = {
        ScmItem: 'itemId',
        ScmItemCategory: 'categoryId',
        ScmCycleCount: 'cycleCountId'
    };

})();
