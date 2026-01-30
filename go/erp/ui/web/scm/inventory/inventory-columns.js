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
// Inventory Module - Column Configurations
// Table column definitions for all Inventory models

(function() {
    'use strict';

    // Ensure Inventory namespace exists
    window.Inventory = window.Inventory || {};

    const { renderBoolean, renderDate, renderMoney } = ERPRenderers;
    const render = Inventory.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    Inventory.columns = {
        Item: [
            { key: 'itemId', label: 'ID', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'itemNumber', label: 'Item #', sortKey: 'itemNumber', filterKey: 'itemNumber' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'itemType',
                label: 'Type',
                sortKey: 'itemType',
                render: (item) => render.itemType(item.itemType)
            },
            { key: 'categoryId', label: 'Category', sortKey: 'categoryId', filterKey: 'categoryId' },
            {
                key: 'unitCost',
                label: 'Unit Cost',
                sortKey: 'unitCost',
                render: (item) => renderMoney(item.unitCost)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        ItemCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'categoryName', label: 'Name', sortKey: 'categoryName', filterKey: 'categoryName' },
            { key: 'parentCategoryId', label: 'Parent', sortKey: 'parentCategoryId', filterKey: 'parentCategoryId' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        StockMovement: [
            { key: 'movementId', label: 'ID', sortKey: 'movementId', filterKey: 'movementId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            {
                key: 'movementType',
                label: 'Type',
                sortKey: 'movementType',
                render: (item) => render.movementType(item.movementType)
            },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            {
                key: 'movementDate',
                label: 'Date',
                sortKey: 'movementDate',
                render: (item) => renderDate(item.movementDate)
            },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' }
        ],

        LotNumber: [
            { key: 'lotId', label: 'ID', sortKey: 'lotId', filterKey: 'lotId' },
            { key: 'lotNumber', label: 'Lot #', sortKey: 'lotNumber', filterKey: 'lotNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            {
                key: 'manufacturingDate',
                label: 'Mfg Date',
                sortKey: 'manufacturingDate',
                render: (item) => renderDate(item.manufacturingDate)
            },
            {
                key: 'expirationDate',
                label: 'Expiry',
                sortKey: 'expirationDate',
                render: (item) => renderDate(item.expirationDate)
            },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' }
        ],

        SerialNumber: [
            { key: 'serialId', label: 'ID', sortKey: 'serialId', filterKey: 'serialId' },
            { key: 'serialNumber', label: 'Serial #', sortKey: 'serialNumber', filterKey: 'serialNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'lotId', label: 'Lot', sortKey: 'lotId', filterKey: 'lotId' },
            {
                key: 'isAvailable',
                label: 'Available',
                sortKey: 'isAvailable',
                render: (item) => renderBoolean(item.isAvailable)
            }
        ],

        CycleCount: [
            { key: 'cycleCountId', label: 'ID', sortKey: 'cycleCountId', filterKey: 'cycleCountId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            {
                key: 'countDate',
                label: 'Count Date',
                sortKey: 'countDate',
                render: (item) => renderDate(item.countDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            },
            { key: 'itemsCounted', label: 'Items Counted', sortKey: 'itemsCounted' },
            { key: 'discrepancies', label: 'Discrepancies', sortKey: 'discrepancies' }
        ],

        ReorderPoint: [
            { key: 'reorderPointId', label: 'ID', sortKey: 'reorderPointId', filterKey: 'reorderPointId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            { key: 'minimumQuantity', label: 'Min Qty', sortKey: 'minimumQuantity' },
            { key: 'reorderQuantity', label: 'Reorder Qty', sortKey: 'reorderQuantity' },
            {
                key: 'planningMethod',
                label: 'Method',
                sortKey: 'planningMethod',
                render: (item) => render.planningMethod(item.planningMethod)
            }
        ],

        InventoryValuation: [
            { key: 'valuationId', label: 'ID', sortKey: 'valuationId', filterKey: 'valuationId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            {
                key: 'valuationMethod',
                label: 'Method',
                sortKey: 'valuationMethod',
                render: (item) => render.valuationMethod(item.valuationMethod)
            },
            {
                key: 'valuationDate',
                label: 'Date',
                sortKey: 'valuationDate',
                render: (item) => renderDate(item.valuationDate)
            },
            {
                key: 'totalValue',
                label: 'Total Value',
                sortKey: 'totalValue',
                render: (item) => renderMoney(item.totalValue)
            }
        ]
    };

})();
