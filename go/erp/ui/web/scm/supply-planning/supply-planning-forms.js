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
// Supply Planning Module - Form Definitions
// Form field configurations for all Supply Planning models

(function() {
    'use strict';

    // Ensure ScmSupplyPlanning namespace exists
    window.ScmSupplyPlanning = window.ScmSupplyPlanning || {};

    const enums = ScmSupplyPlanning.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    ScmSupplyPlanning.forms = {
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
                        { key: 'destinationWarehouseId', label: 'Destination Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
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
                        { key: 'name', label: 'Plan Name', type: 'text', required: true },
                        { key: 'planPeriod.startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'planPeriod.endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'createdBy', label: 'Created By', type: 'text' },
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
                        { key: 'minOrderQuantity', label: 'Min Order Quantity', type: 'number', required: true },
                        { key: 'leadTimeAgreed', label: 'Lead Time Agreed', type: 'checkbox' },
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
                        { key: 'safetyStockQuantity', label: 'Safety Stock Quantity', type: 'number', required: true },
                        { key: 'calculationMethod', label: 'Calculation Method', type: 'text' },
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
                        { key: 'leadTimeDays', label: 'Lead Time (days)', type: 'number', required: true },
                        { key: 'transitDays', label: 'Transit (days)', type: 'number' },
                        { key: 'totalDays', label: 'Total (days)', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    ScmSupplyPlanning.primaryKeys = {
        ScmMaterialRequirement: 'requirementId',
        ScmDistributionRequirement: 'requirementId',
        ScmSupplyPlan: 'planId',
        ScmSupplierCollaboration: 'collaborationId',
        ScmSafetyStock: 'safetyStockId',
        ScmLeadTime: 'leadTimeId'
    };

})();
