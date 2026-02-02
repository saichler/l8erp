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
 * Mobile Supply Planning Module - Column Configurations
 * Desktop Equivalent: scm/supply-planning/supply-planning-columns.js
 */
(function() {
    'use strict';

    const enums = MobileScmSupplyPlanning.enums;
    const render = MobileScmSupplyPlanning.render;

    MobileScmSupplyPlanning.columns = {
        ScmMaterialRequirement: [
            { key: 'requirementId', label: 'ID', sortKey: 'requirementId', filterKey: 'requirementId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'requiredQuantity', label: 'Required Qty', sortKey: 'requiredQuantity' },
            { key: 'requiredDate', label: 'Required Date', sortKey: 'requiredDate', render: (item) => Layer8MRenderers.renderDate(item.requiredDate) },
            { key: 'planningMethod', label: 'Method', sortKey: 'planningMethod', filterKey: 'planningMethod', enumValues: enums.PLANNING_METHOD_VALUES, render: (item) => render.planningMethod(item.planningMethod) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.TASK_STATUS_VALUES, render: (item) => render.taskStatus(item.status) }
        ],

        ScmDistributionRequirement: [
            { key: 'requirementId', label: 'ID', sortKey: 'requirementId', filterKey: 'requirementId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'sourceWarehouseId', label: 'Source', sortKey: 'sourceWarehouseId', filterKey: 'sourceWarehouseId' },
            { key: 'destinationWarehouseId', label: 'Destination', sortKey: 'destinationWarehouseId', filterKey: 'destinationWarehouseId' },
            { key: 'requiredQuantity', label: 'Required Qty', sortKey: 'requiredQuantity' },
            { key: 'requiredDate', label: 'Required Date', sortKey: 'requiredDate', render: (item) => Layer8MRenderers.renderDate(item.requiredDate) }
        ],

        ScmSupplyPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'name', label: 'Plan', sortKey: 'name', filterKey: 'name' },
            { key: 'planPeriod', label: 'Start', sortKey: 'planPeriod.startDate', render: (item) => Layer8MRenderers.renderDate(item.planPeriod?.startDate) },
            { key: 'planPeriod', label: 'End', sortKey: 'planPeriod.endDate', render: (item) => Layer8MRenderers.renderDate(item.planPeriod?.endDate) },
            { key: 'createdBy', label: 'Created By', sortKey: 'createdBy', filterKey: 'createdBy' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.TASK_STATUS_VALUES, render: (item) => render.taskStatus(item.status) }
        ],

        ScmSupplierCollaboration: [
            { key: 'collaborationId', label: 'ID', sortKey: 'collaborationId', filterKey: 'collaborationId' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'minOrderQuantity', label: 'Min Order Qty', sortKey: 'minOrderQuantity' },
            { key: 'leadTimeAgreed', label: 'Lead Time Agreed', sortKey: 'leadTimeAgreed', render: (item) => Layer8MRenderers.renderBoolean(item.leadTimeAgreed) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.TASK_STATUS_VALUES, render: (item) => render.taskStatus(item.status) }
        ],

        ScmSafetyStock: [
            { key: 'safetyStockId', label: 'ID', sortKey: 'safetyStockId', filterKey: 'safetyStockId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            { key: 'safetyStockQuantity', label: 'Safety Qty', sortKey: 'safetyStockQuantity' },
            { key: 'calculationMethod', label: 'Method', sortKey: 'calculationMethod' },
            { key: 'serviceLevel', label: 'Service %', sortKey: 'serviceLevel' }
        ],

        ScmLeadTime: [
            { key: 'leadTimeId', label: 'ID', sortKey: 'leadTimeId', filterKey: 'leadTimeId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'leadTimeDays', label: 'Lead Time (days)', sortKey: 'leadTimeDays' },
            { key: 'transitDays', label: 'Transit (days)', sortKey: 'transitDays' },
            { key: 'totalDays', label: 'Total (days)', sortKey: 'totalDays' }
        ]
    };

    MobileScmSupplyPlanning.primaryKeys = {
        ScmMaterialRequirement: 'requirementId', ScmDistributionRequirement: 'requirementId',
        ScmSupplyPlan: 'planId', ScmSupplierCollaboration: 'collaborationId',
        ScmSafetyStock: 'safetyStockId', ScmLeadTime: 'leadTimeId'
    };

})();
