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

    window.MobileMfgProduction = window.MobileMfgProduction || {};
    const render = MobileMfgProduction.render;

    MobileMfgProduction.columns = {
        MfgWorkOrder: [
            { key: 'workOrderId', label: 'ID', sortKey: 'workOrderId' },
            { key: 'workOrderNumber', label: 'WO #', sortKey: 'workOrderNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'quantityOrdered', label: 'Qty Ordered', sortKey: 'quantityOrdered' },
            { key: 'quantityCompleted', label: 'Qty Completed', sortKey: 'quantityCompleted' },
            { key: 'plannedStartDate', label: 'Planned Start', sortKey: 'plannedStartDate', render: (item) => render.date(item.plannedStartDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.workOrderStatus(item.status) }
        ],
        MfgWorkOrderOp: [
            { key: 'operationId', label: 'ID', sortKey: 'operationId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'operationNumber', label: 'Op #', sortKey: 'operationNumber' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'setupTime', label: 'Setup (hrs)', sortKey: 'setupTime' },
            { key: 'runTime', label: 'Run (hrs)', sortKey: 'runTime' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.operationStatus(item.status) }
        ],
        MfgProductionOrder: [
            { key: 'prodOrderId', label: 'ID', sortKey: 'prodOrderId' },
            { key: 'orderNumber', label: 'Order #', sortKey: 'orderNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            { key: 'scheduledDate', label: 'Scheduled', sortKey: 'scheduledDate', render: (item) => render.date(item.scheduledDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.workOrderStatus(item.status) }
        ],
        MfgProdOrderLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId' },
            { key: 'prodOrderId', label: 'Prod Order', sortKey: 'prodOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'requiredQty', label: 'Required Qty', sortKey: 'requiredQty' },
            { key: 'issuedQty', label: 'Issued Qty', sortKey: 'issuedQty' }
        ],
        MfgProdBatch: [
            { key: 'batchId', label: 'ID', sortKey: 'batchId' },
            { key: 'batchNumber', label: 'Batch #', sortKey: 'batchNumber' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => render.date(item.startDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.batchStatus(item.status) }
        ],
        MfgProdConsumption: [
            { key: 'consumptionId', label: 'ID', sortKey: 'consumptionId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            { key: 'consumptionDate', label: 'Date', sortKey: 'consumptionDate', render: (item) => render.date(item.consumptionDate) }
        ]
    };

})();
