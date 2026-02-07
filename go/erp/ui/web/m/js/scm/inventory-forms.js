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
            ...f.text('referenceId', 'Reference ID'),
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
