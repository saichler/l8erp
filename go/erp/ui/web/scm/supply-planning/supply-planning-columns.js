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
// Supply Planning Module - Column Configurations
// Table column definitions for all Supply Planning models

(function() {
    'use strict';

    // Ensure ScmSupplyPlanning namespace exists
    window.ScmSupplyPlanning = window.ScmSupplyPlanning || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = ScmSupplyPlanning.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    ScmSupplyPlanning.columns = {
        ScmMaterialRequirement: [
            { key: 'requirementId', label: 'ID', sortKey: 'requirementId', filterKey: 'requirementId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'requiredQuantity', label: 'Required Qty', sortKey: 'requiredQuantity' },
            {
                key: 'requiredDate',
                label: 'Required Date',
                sortKey: 'requiredDate',
                render: (item) => renderDate(item.requiredDate)
            },
            {
                key: 'planningMethod',
                label: 'Method',
                sortKey: 'planningMethod',
                render: (item) => render.planningMethod(item.planningMethod)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmDistributionRequirement: [
            { key: 'requirementId', label: 'ID', sortKey: 'requirementId', filterKey: 'requirementId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'sourceWarehouseId', label: 'Source', sortKey: 'sourceWarehouseId', filterKey: 'sourceWarehouseId' },
            { key: 'targetWarehouseId', label: 'Target', sortKey: 'targetWarehouseId', filterKey: 'targetWarehouseId' },
            { key: 'requiredQuantity', label: 'Required Qty', sortKey: 'requiredQuantity' },
            {
                key: 'requiredDate',
                label: 'Required Date',
                sortKey: 'requiredDate',
                render: (item) => renderDate(item.requiredDate)
            }
        ],

        ScmSupplyPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'planName', label: 'Plan', sortKey: 'planName', filterKey: 'planName' },
            {
                key: 'startDate',
                label: 'Start',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            {
                key: 'planningMethod',
                label: 'Method',
                sortKey: 'planningMethod',
                render: (item) => render.planningMethod(item.planningMethod)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmSupplierCollaboration: [
            { key: 'collaborationId', label: 'ID', sortKey: 'collaborationId', filterKey: 'collaborationId' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'agreedQuantity', label: 'Agreed Qty', sortKey: 'agreedQuantity' },
            {
                key: 'deliveryDate',
                label: 'Delivery',
                sortKey: 'deliveryDate',
                render: (item) => renderDate(item.deliveryDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmSafetyStock: [
            { key: 'safetyStockId', label: 'ID', sortKey: 'safetyStockId', filterKey: 'safetyStockId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            { key: 'safetyStockLevel', label: 'Safety Level', sortKey: 'safetyStockLevel' },
            { key: 'currentStock', label: 'Current', sortKey: 'currentStock' },
            { key: 'serviceLevel', label: 'Service %', sortKey: 'serviceLevel' }
        ],

        ScmLeadTime: [
            { key: 'leadTimeId', label: 'ID', sortKey: 'leadTimeId', filterKey: 'leadTimeId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'averageLeadTime', label: 'Avg Lead Time', sortKey: 'averageLeadTime' },
            { key: 'minimumLeadTime', label: 'Min', sortKey: 'minimumLeadTime' },
            { key: 'maximumLeadTime', label: 'Max', sortKey: 'maximumLeadTime' }
        ]
    };

})();
