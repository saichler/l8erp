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
 * Mobile Supply Planning Module - Form Configurations
 * Desktop Equivalent: scm/supply-planning/supply-planning-forms.js
 */
(function() {
    'use strict';

    const enums = MobileScmSupplyPlanning.enums;

    MobileScmSupplyPlanning.forms = {
        ScmMaterialRequirement: {
            title: 'Material Requirement',
            sections: [
                {
                    title: 'Requirement Details',
                    fields: [
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'requiredQuantity', label: 'Required Quantity', type: 'number', required: true },
                        { key: 'requiredDate', label: 'Required Date', type: 'date', required: true },
                        { key: 'planningMethod', label: 'Planning Method', type: 'select', options: enums.PLANNING_METHOD },
                        { key: 'sourceOrderId', label: 'Source Order', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmDistributionRequirement: {
            title: 'Distribution Requirement',
            sections: [
                {
                    title: 'Distribution Details',
                    fields: [
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'sourceWarehouseId', label: 'Source Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
                        { key: 'targetWarehouseId', label: 'Target Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
                        { key: 'requiredQuantity', label: 'Required Quantity', type: 'number', required: true },
                        { key: 'requiredDate', label: 'Required Date', type: 'date', required: true },
                        { key: 'priority', label: 'Priority', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmSupplyPlan: {
            title: 'Supply Plan',
            sections: [
                {
                    title: 'Plan Details',
                    fields: [
                        { key: 'planName', label: 'Plan Name', type: 'text', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'planningMethod', label: 'Planning Method', type: 'select', options: enums.PLANNING_METHOD },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmSupplierCollaboration: {
            title: 'Supplier Collaboration',
            sections: [
                {
                    title: 'Collaboration Details',
                    fields: [
                        { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'agreedQuantity', label: 'Agreed Quantity', type: 'number', required: true },
                        { key: 'deliveryDate', label: 'Delivery Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmSafetyStock: {
            title: 'Safety Stock',
            sections: [
                {
                    title: 'Safety Stock Details',
                    fields: [
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
                        { key: 'safetyStockLevel', label: 'Safety Stock Level', type: 'number', required: true },
                        { key: 'currentStock', label: 'Current Stock', type: 'number' },
                        { key: 'serviceLevel', label: 'Service Level %', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmLeadTime: {
            title: 'Lead Time',
            sections: [
                {
                    title: 'Lead Time Details',
                    fields: [
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor', required: true },
                        { key: 'averageLeadTime', label: 'Average Lead Time (days)', type: 'number', required: true },
                        { key: 'minimumLeadTime', label: 'Minimum Lead Time (days)', type: 'number' },
                        { key: 'maximumLeadTime', label: 'Maximum Lead Time (days)', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

})();
