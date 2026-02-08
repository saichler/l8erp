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

    const col = window.Layer8ColumnFactory;
    const enums = MobileScmSupplyPlanning.enums;
    const render = MobileScmSupplyPlanning.render;

    MobileScmSupplyPlanning.columns = {
        ScmMaterialRequirement: [
            ...col.id('requirementId'),
            ...col.col('itemId', 'Item'),
            ...col.col('requiredQuantity', 'Required Qty'),
            ...col.date('requiredDate', 'Required Date'),
            ...col.status('planningMethod', 'Method', enums.PLANNING_METHOD_VALUES, render.planningMethod),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmDistributionRequirement: [
            ...col.id('requirementId'),
            ...col.col('itemId', 'Item'),
            ...col.col('sourceWarehouseId', 'Source'),
            ...col.col('destinationWarehouseId', 'Destination'),
            ...col.col('requiredQuantity', 'Required Qty'),
            ...col.date('requiredDate', 'Required Date')
        ],

        ScmSupplyPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Plan'),
            ...col.custom('planPeriod', 'Start', (item) => Layer8MRenderers.renderDate(item.planPeriod?.startDate), { sortKey: 'planPeriod.startDate' }),
            ...col.custom('planPeriod', 'End', (item) => Layer8MRenderers.renderDate(item.planPeriod?.endDate), { sortKey: 'planPeriod.endDate' }),
            ...col.col('createdBy', 'Created By'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmSupplierCollaboration: [
            ...col.id('collaborationId'),
            ...col.col('vendorId', 'Vendor'),
            ...col.col('itemId', 'Item'),
            ...col.col('minOrderQuantity', 'Min Order Qty'),
            ...col.boolean('leadTimeAgreed', 'Lead Time Agreed'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmSafetyStock: [
            ...col.id('safetyStockId'),
            ...col.col('itemId', 'Item'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.col('safetyStockQuantity', 'Safety Qty'),
            ...col.col('calculationMethod', 'Method'),
            ...col.col('serviceLevel', 'Service %')
        ],

        ScmLeadTime: [
            ...col.id('leadTimeId'),
            ...col.col('itemId', 'Item'),
            ...col.col('vendorId', 'Vendor'),
            ...col.col('leadTimeDays', 'Lead Time (days)'),
            ...col.col('transitDays', 'Transit (days)'),
            ...col.col('totalDays', 'Total (days)')
        ]
    };

    MobileScmSupplyPlanning.primaryKeys = {
        ScmMaterialRequirement: 'requirementId', ScmDistributionRequirement: 'requirementId',
        ScmSupplyPlan: 'planId', ScmSupplierCollaboration: 'collaborationId',
        ScmSafetyStock: 'safetyStockId', ScmLeadTime: 'leadTimeId'
    };

})();
