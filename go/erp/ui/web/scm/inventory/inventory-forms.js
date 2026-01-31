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
// Inventory Module - Form Definitions
// Form field configurations for all Inventory models

(function() {
    'use strict';

    // Ensure Inventory namespace exists
    window.Inventory = window.Inventory || {};

    const enums = Inventory.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    Inventory.forms = {
        ScmItem: {
            title: 'ScmItem',
            sections: [
                {
                    title: 'Item Information',
                    fields: [
                        { key: 'itemNumber', label: 'Item Number', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'itemType', label: 'Item Type', type: 'select', options: enums.ITEM_TYPE, required: true },
                        { key: 'categoryId', label: 'Category', type: 'reference', lookupModel: 'ScmItemCategory' },
                        { key: 'unitOfMeasure', label: 'Unit of Measure', type: 'text' },
                        { key: 'unitCost', label: 'Unit Cost', type: 'currency' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        ScmItemCategory: {
            title: 'Item Category',
            sections: [
                {
                    title: 'Category Information',
                    fields: [
                        { key: 'categoryName', label: 'Category Name', type: 'text', required: true },
                        { key: 'parentCategoryId', label: 'Parent Category', type: 'reference', lookupModel: 'ScmItemCategory' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        ScmStockMovement: {
            title: 'Stock Movement',
            sections: [
                {
                    title: 'Movement Details',
                    fields: [
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'movementType', label: 'Movement Type', type: 'select', options: enums.MOVEMENT_TYPE, required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'movementDate', label: 'Movement Date', type: 'date', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'reference', label: 'Reference', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmLotNumber: {
            title: 'Lot Number',
            sections: [
                {
                    title: 'Lot Details',
                    fields: [
                        { key: 'lotNumber', label: 'Lot Number', type: 'text', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'manufacturingDate', label: 'Manufacturing Date', type: 'date' },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' },
                        { key: 'quantity', label: 'Quantity', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmSerialNumber: {
            title: 'Serial Number',
            sections: [
                {
                    title: 'Serial Details',
                    fields: [
                        { key: 'serialNumber', label: 'Serial Number', type: 'text', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'lotId', label: 'Lot', type: 'reference', lookupModel: 'ScmLotNumber' },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'isAvailable', label: 'Available', type: 'checkbox' }
                    ]
                }
            ]
        },

        ScmCycleCount: {
            title: 'Cycle Count',
            sections: [
                {
                    title: 'Count Details',
                    fields: [
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
                        { key: 'countDate', label: 'Count Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'itemsCounted', label: 'Items Counted', type: 'number' },
                        { key: 'discrepancies', label: 'Discrepancies', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmReorderPoint: {
            title: 'Reorder Point',
            sections: [
                {
                    title: 'Reorder Details',
                    fields: [
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'minimumQuantity', label: 'Minimum Quantity', type: 'number', required: true },
                        { key: 'reorderQuantity', label: 'Reorder Quantity', type: 'number', required: true },
                        { key: 'maximumQuantity', label: 'Maximum Quantity', type: 'number' },
                        { key: 'planningMethod', label: 'Planning Method', type: 'select', options: enums.PLANNING_METHOD }
                    ]
                }
            ]
        },

        ScmInventoryValuation: {
            title: 'Inventory Valuation',
            sections: [
                {
                    title: 'Valuation Details',
                    fields: [
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'valuationMethod', label: 'Valuation Method', type: 'select', options: enums.VALUATION_METHOD, required: true },
                        { key: 'valuationDate', label: 'Valuation Date', type: 'date', required: true },
                        { key: 'quantityOnHand', label: 'Quantity on Hand', type: 'number' },
                        { key: 'unitCost', label: 'Unit Cost', type: 'currency' },
                        { key: 'totalValue', label: 'Total Value', type: 'currency' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

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
