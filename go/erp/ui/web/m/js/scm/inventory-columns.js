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

    const enums = MobileInventory.enums;
    const render = MobileInventory.render;

    MobileInventory.columns = {
        ScmItem: [
            { key: 'itemId', label: 'ID', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'itemNumber', label: 'Item #', sortKey: 'itemNumber', filterKey: 'itemNumber' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'itemType', label: 'Type', sortKey: 'itemType', filterKey: 'itemType', enumValues: enums.ITEM_TYPE_VALUES, render: (item) => render.itemType(item.itemType) },
            { key: 'categoryId', label: 'Category', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'unitCost', label: 'Unit Cost', sortKey: 'unitCost', render: (item) => Layer8MRenderers.renderMoney(item.unitCost) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        ScmItemCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'categoryName', label: 'Name', sortKey: 'categoryName', filterKey: 'categoryName' },
            { key: 'parentCategoryId', label: 'Parent', sortKey: 'parentCategoryId', filterKey: 'parentCategoryId' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        ScmStockMovement: [
            { key: 'movementId', label: 'ID', sortKey: 'movementId', filterKey: 'movementId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'movementType', label: 'Type', sortKey: 'movementType', filterKey: 'movementType', enumValues: enums.MOVEMENT_TYPE_VALUES, render: (item) => render.movementType(item.movementType) },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            { key: 'movementDate', label: 'Date', sortKey: 'movementDate', render: (item) => Layer8MRenderers.renderDate(item.movementDate) },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' }
        ],

        ScmLotNumber: [
            { key: 'lotId', label: 'ID', sortKey: 'lotId', filterKey: 'lotId' },
            { key: 'lotNumber', label: 'Lot #', sortKey: 'lotNumber', filterKey: 'lotNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'manufacturingDate', label: 'Mfg Date', sortKey: 'manufacturingDate', render: (item) => Layer8MRenderers.renderDate(item.manufacturingDate) },
            { key: 'expirationDate', label: 'Expiry', sortKey: 'expirationDate', render: (item) => Layer8MRenderers.renderDate(item.expirationDate) },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' }
        ],

        ScmSerialNumber: [
            { key: 'serialId', label: 'ID', sortKey: 'serialId', filterKey: 'serialId' },
            { key: 'serialNumber', label: 'Serial #', sortKey: 'serialNumber', filterKey: 'serialNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'lotId', label: 'Lot', sortKey: 'lotId', filterKey: 'lotId' },
            { key: 'isAvailable', label: 'Available', sortKey: 'isAvailable', render: (item) => Layer8MRenderers.renderBoolean(item.isAvailable) }
        ],

        ScmCycleCount: [
            { key: 'cycleCountId', label: 'ID', sortKey: 'cycleCountId', filterKey: 'cycleCountId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            { key: 'countDate', label: 'Count Date', sortKey: 'countDate', render: (item) => Layer8MRenderers.renderDate(item.countDate) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.TASK_STATUS_VALUES, render: (item) => render.taskStatus(item.status) },
            { key: 'itemsCounted', label: 'Items Counted', sortKey: 'itemsCounted' },
            { key: 'discrepancies', label: 'Discrepancies', sortKey: 'discrepancies' }
        ],

        ScmReorderPoint: [
            { key: 'reorderPointId', label: 'ID', sortKey: 'reorderPointId', filterKey: 'reorderPointId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            { key: 'minimumQuantity', label: 'Min Qty', sortKey: 'minimumQuantity' },
            { key: 'reorderQuantity', label: 'Reorder Qty', sortKey: 'reorderQuantity' },
            { key: 'planningMethod', label: 'Method', sortKey: 'planningMethod', filterKey: 'planningMethod', enumValues: enums.PLANNING_METHOD_VALUES, render: (item) => render.planningMethod(item.planningMethod) }
        ],

        ScmInventoryValuation: [
            { key: 'valuationId', label: 'ID', sortKey: 'valuationId', filterKey: 'valuationId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'valuationMethod', label: 'Method', sortKey: 'valuationMethod', filterKey: 'valuationMethod', enumValues: enums.VALUATION_METHOD_VALUES, render: (item) => render.valuationMethod(item.valuationMethod) },
            { key: 'valuationDate', label: 'Date', sortKey: 'valuationDate', render: (item) => Layer8MRenderers.renderDate(item.valuationDate) },
            { key: 'totalValue', label: 'Total Value', sortKey: 'totalValue', render: (item) => Layer8MRenderers.renderMoney(item.totalValue) }
        ]
    };

    MobileInventory.primaryKeys = {
        ScmItem: 'itemId', ScmItemCategory: 'categoryId', ScmStockMovement: 'movementId',
        ScmLotNumber: 'lotId', ScmSerialNumber: 'serialId', ScmCycleCount: 'cycleCountId',
        ScmReorderPoint: 'reorderPointId', ScmInventoryValuation: 'valuationId'
    };

})();
