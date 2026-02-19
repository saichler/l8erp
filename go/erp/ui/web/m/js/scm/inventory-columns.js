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
            ...col.enum('planningMethod', 'Planning', null, render.planningMethod),
            ...col.enum('valuationMethod', 'Valuation', null, render.valuationMethod),
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
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus),
            ...col.col('itemsCounted', 'Items Counted'),
            ...col.col('discrepancies', 'Discrepancies')
        ],

    };

    MobileInventory.primaryKeys = {
        ScmItem: 'itemId', ScmItemCategory: 'categoryId', ScmCycleCount: 'cycleCountId'
    };

})();
