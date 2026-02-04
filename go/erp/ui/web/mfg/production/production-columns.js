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
// Manufacturing Production Module - Column Configurations

(function() {
    'use strict';

    window.MfgProduction = window.MfgProduction || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = MfgProduction.render;

    MfgProduction.columns = {
        MfgWorkOrder: [
            { key: 'workOrderId', label: 'ID', sortKey: 'workOrderId', filterKey: 'workOrderId' },
            { key: 'workOrderNumber', label: 'WO #', sortKey: 'workOrderNumber', filterKey: 'workOrderNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantityOrdered', label: 'Qty Ordered', sortKey: 'quantityOrdered' },
            { key: 'quantityCompleted', label: 'Qty Completed', sortKey: 'quantityCompleted' },
            {
                key: 'plannedStartDate',
                label: 'Planned Start',
                sortKey: 'plannedStartDate',
                render: (item) => renderDate(item.plannedStartDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.workOrderStatus(item.status)
            }
        ],

        MfgWorkOrderOp: [
            { key: 'operationId', label: 'ID', sortKey: 'operationId', filterKey: 'operationId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId', filterKey: 'workOrderId' },
            { key: 'operationNumber', label: 'Op #', sortKey: 'operationNumber' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'setupTime', label: 'Setup (hrs)', sortKey: 'setupTime' },
            { key: 'runTime', label: 'Run (hrs)', sortKey: 'runTime' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.operationStatus(item.status)
            }
        ],

        MfgProductionOrder: [
            { key: 'prodOrderId', label: 'ID', sortKey: 'prodOrderId', filterKey: 'prodOrderId' },
            { key: 'orderNumber', label: 'Order #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'scheduledDate',
                label: 'Scheduled',
                sortKey: 'scheduledDate',
                render: (item) => renderDate(item.scheduledDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.workOrderStatus(item.status)
            }
        ],

        MfgProdOrderLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'prodOrderId', label: 'Prod Order', sortKey: 'prodOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'requiredQty', label: 'Required Qty', sortKey: 'requiredQty' },
            { key: 'issuedQty', label: 'Issued Qty', sortKey: 'issuedQty' }
        ],

        MfgProdBatch: [
            { key: 'batchId', label: 'ID', sortKey: 'batchId', filterKey: 'batchId' },
            { key: 'batchNumber', label: 'Batch #', sortKey: 'batchNumber', filterKey: 'batchNumber' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.batchStatus(item.status)
            }
        ],

        MfgProdConsumption: [
            { key: 'consumptionId', label: 'ID', sortKey: 'consumptionId', filterKey: 'consumptionId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'consumptionDate',
                label: 'Date',
                sortKey: 'consumptionDate',
                render: (item) => renderDate(item.consumptionDate)
            }
        ]
    };

})();
