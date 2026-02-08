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
 * Mobile Manufacturing Production Module - Column Definitions
 * Desktop Equivalent: mfg/production/production-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    window.MobileMfgProduction = window.MobileMfgProduction || {};
    const render = MobileMfgProduction.render;

    MobileMfgProduction.columns = {
        MfgWorkOrder: [
            ...col.id('workOrderId'),
            ...col.col('workOrderNumber', 'WO #'),
            ...col.col('itemId', 'Item'),
            ...col.col('quantityOrdered', 'Qty Ordered'),
            ...col.col('quantityCompleted', 'Qty Completed'),
            ...col.date('plannedStartDate', 'Planned Start'),
            ...col.enum('status', 'Status', null, render.workOrderStatus)
        ],
        MfgWorkOrderOp: [
            ...col.id('operationId'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.col('operationNumber', 'Op #'),
            ...col.col('workCenterId', 'Work Center'),
            ...col.col('setupTimePlanned', 'Setup (hrs)'),
            ...col.col('runTimePlanned', 'Run (hrs)'),
            ...col.enum('status', 'Status', null, render.operationStatus)
        ],
        MfgProductionOrder: [
            ...col.id('prodOrderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('orderDate', 'Order Date'),
            ...col.date('requiredDate', 'Required'),
            ...col.enum('status', 'Status', null, render.workOrderStatus)
        ],
        MfgProdOrderLine: [
            ...col.id('lineId'),
            ...col.col('prodOrderId', 'Prod Order'),
            ...col.col('itemId', 'Item'),
            ...col.col('quantityOrdered', 'Qty Ordered'),
            ...col.col('quantityCompleted', 'Qty Completed')
        ],
        MfgProdBatch: [
            ...col.id('batchId'),
            ...col.col('batchNumber', 'Batch #'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.col('quantity', 'Quantity'),
            ...col.date('productionDate', 'Production Date'),
            ...col.enum('qualityStatus', 'Quality Status', null, render.batchStatus)
        ],
        MfgProdConsumption: [
            ...col.id('consumptionId'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.col('itemId', 'Item'),
            ...col.col('quantityConsumed', 'Qty Consumed'),
            ...col.date('consumptionDate', 'Date')
        ]
    };

})();
