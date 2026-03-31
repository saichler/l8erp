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

    const col = window.Layer8ColumnFactory;
    const render = ScmSupplyPlanning.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    ScmSupplyPlanning.columns = {
        ScmMaterialRequirement: [
            ...col.id('requirementId'),
            ...col.col('itemId', 'Item'),
            ...col.col('requiredQuantity', 'Required Qty'),
            ...col.date('requiredDate', 'Required Date'),
            ...col.enum('planningMethod', 'Method', null, render.planningMethod),
            ...col.enum('status', 'Status', null, render.taskStatus),
        ],

        ScmDistributionRequirement: [
            ...col.id('requirementId'),
            ...col.col('itemId', 'Item'),
            ...col.col('sourceWarehouseId', 'Source'),
            ...col.col('destinationWarehouseId', 'Destination'),
            ...col.col('requiredQuantity', 'Required Qty'),
            ...col.date('requiredDate', 'Required Date'),
        ],

        ScmSupplyPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Plan'),
            {
                key: 'planPeriod',
                label: 'Start',
                sortKey: 'planPeriod.startDate',
                render: (item) => Layer8DRenderers.renderDate(item.planPeriod?.startDate)
            },
            {
                key: 'planPeriod',
                label: 'End',
                sortKey: 'planPeriod.endDate',
                render: (item) => Layer8DRenderers.renderDate(item.planPeriod?.endDate)
            },
            ...col.col('createdBy', 'Created By'),
            ...col.enum('status', 'Status', null, render.taskStatus),
        ],

        ScmSupplierCollaboration: [
            ...col.id('collaborationId'),
            ...col.col('vendorId', 'Vendor'),
            ...col.col('itemId', 'Item'),
            ...col.col('minOrderQuantity', 'Min Order Qty'),
            ...col.boolean('leadTimeAgreed', 'Lead Time Agreed'),
            ...col.enum('status', 'Status', null, render.taskStatus),
        ],

        ScmSafetyStock: [
            ...col.id('safetyStockId'),
            ...col.col('itemId', 'Item'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.col('safetyStockQuantity', 'Safety Qty'),
            ...col.col('calculationMethod', 'Method'),
            ...col.col('serviceLevel', 'Service %'),
        ],

        ScmLeadTime: [
            ...col.id('leadTimeId'),
            ...col.col('itemId', 'Item'),
            ...col.col('vendorId', 'Vendor'),
            ...col.col('leadTimeDays', 'Lead Time (days)'),
            ...col.col('transitDays', 'Transit (days)'),
            ...col.col('totalDays', 'Total (days)'),
        ]
    };

})();
