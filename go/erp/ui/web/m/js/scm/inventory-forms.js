/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Inventory Module - Form Configurations
 * Desktop Equivalent: scm/inventory/inventory-forms.js
 */
(function() {
    'use strict';

    window.MobileInventory = window.MobileInventory || {};
    const f = window.Layer8FormFactory;
    const enums = MobileInventory.enums;

    MobileInventory.forms = {
    ScmItem: f.form('ScmItem', [
        f.section('Item Information', [
            ...f.text('itemNumber', 'Item Number', true),
            ...f.text('name', 'Name', true),
            ...f.textarea('description', 'Description'),
            ...f.select('itemType', 'Item Type', enums.ITEM_TYPE, true),
            ...f.reference('categoryId', 'Category', 'ScmItemCategory'),
            ...f.text('unitOfMeasure', 'Unit of Measure'),
            ...f.money('unitCost', 'Unit Cost'),
            ...f.checkbox('isActive', 'Active'),
            ...f.money('unitPrice', 'Unit Price'),
            ...f.select('valuationMethod', 'Valuation Method', enums.VALUATION_METHOD),
            ...f.select('planningMethod', 'Planning Method', enums.PLANNING_METHOD),
            ...f.checkbox('isLotTracked', 'Lot Tracked'),
            ...f.checkbox('isSerialTracked', 'Serial Tracked'),
            ...f.number('shelfLife', 'Shelf Life'),
            ...f.text('defaultWarehouseId', 'Default Warehouse'),
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
            ...f.textarea('notes', 'Notes'),
            ...f.text('counterId', 'Counter'),
        ])
    ])
};

})();
