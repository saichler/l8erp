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

    const { renderBoolean, renderDate, renderMoney } = Layer8DRenderers;
    const render = Inventory.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    Inventory.columns = {
        ScmItem: [
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

        ScmItemCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'parentCategoryId', label: 'Parent', sortKey: 'parentCategoryId', filterKey: 'parentCategoryId' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        ScmStockMovement: [
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

        ScmLotNumber: [
            { key: 'lotId', label: 'ID', sortKey: 'lotId', filterKey: 'lotId' },
            { key: 'lotNumber', label: 'Lot #', sortKey: 'lotNumber', filterKey: 'lotNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            {
                key: 'manufactureDate',
                label: 'Mfg Date',
                sortKey: 'manufactureDate',
                render: (item) => renderDate(item.manufactureDate)
            },
            {
                key: 'expiryDate',
                label: 'Expiry',
                sortKey: 'expiryDate',
                render: (item) => renderDate(item.expiryDate)
            },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' }
        ],

        ScmSerialNumber: [
            { key: 'serialId', label: 'ID', sortKey: 'serialId', filterKey: 'serialId' },
            { key: 'serialNumber', label: 'Serial #', sortKey: 'serialNumber', filterKey: 'serialNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'lotId', label: 'Lot', sortKey: 'lotId', filterKey: 'lotId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmCycleCount: [
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

        ScmReorderPoint: [
            { key: 'reorderPointId', label: 'ID', sortKey: 'reorderPointId', filterKey: 'reorderPointId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            { key: 'minimumQuantity', label: 'Min Qty', sortKey: 'minimumQuantity' },
            { key: 'reorderQuantity', label: 'Reorder Qty', sortKey: 'reorderQuantity' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        ScmInventoryValuation: [
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
