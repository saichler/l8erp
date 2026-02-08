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
/**
 * Mobile Inventory Module - Column Configurations
 * Desktop Equivalent: scm/inventory/inventory-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileInventory.enums;
    const render = MobileInventory.render;

    MobileInventory.columns = {
        ScmItem: [
            ...col.id('itemId'),
            ...col.col('itemNumber', 'Item #'),
            ...col.col('name', 'Name'),
            ...col.status('itemType', 'Type', enums.ITEM_TYPE_VALUES, render.itemType),
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
            ...col.status('movementType', 'Type', enums.MOVEMENT_TYPE_VALUES, render.movementType),
            ...col.col('quantity', 'Qty'),
            ...col.date('movementDate', 'Date'),
            ...col.col('warehouseId', 'Warehouse')
        ],

        ScmLotNumber: [
            ...col.id('lotId'),
            ...col.col('lotNumber', 'Lot #'),
            ...col.col('itemId', 'Item'),
            ...col.date('manufactureDate', 'Mfg Date'),
            ...col.date('expiryDate', 'Expiry'),
            ...col.col('quantity', 'Qty')
        ],

        ScmSerialNumber: [
            ...col.id('serialId'),
            ...col.col('serialNumber', 'Serial #'),
            ...col.col('itemId', 'Item'),
            ...col.col('lotId', 'Lot'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmCycleCount: [
            ...col.id('cycleCountId'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.date('countDate', 'Count Date'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus),
            ...col.col('itemsCounted', 'Items Counted'),
            ...col.col('discrepancies', 'Discrepancies')
        ],

        ScmReorderPoint: [
            ...col.id('reorderPointId'),
            ...col.col('itemId', 'Item'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.col('minimumQuantity', 'Min Qty'),
            ...col.col('reorderQuantity', 'Reorder Qty'),
            ...col.boolean('isActive', 'Active')
        ],

        ScmInventoryValuation: [
            ...col.id('valuationId'),
            ...col.col('itemId', 'Item'),
            ...col.status('valuationMethod', 'Method', enums.VALUATION_METHOD_VALUES, render.valuationMethod),
            ...col.date('valuationDate', 'Date'),
            ...col.money('totalValue', 'Total Value')
        ]
    };

    MobileInventory.primaryKeys = {
        ScmItem: 'itemId', ScmItemCategory: 'categoryId', ScmStockMovement: 'movementId',
        ScmLotNumber: 'lotId', ScmSerialNumber: 'serialId', ScmCycleCount: 'cycleCountId',
        ScmReorderPoint: 'reorderPointId', ScmInventoryValuation: 'valuationId'
    };

})();
