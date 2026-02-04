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
// Manufacturing Production Module - Form Definitions

(function() {
    'use strict';

    window.MfgProduction = window.MfgProduction || {};

    const enums = MfgProduction.enums;

    MfgProduction.forms = {
        MfgWorkOrder: {
            title: 'Work Order',
            sections: [
                {
                    title: 'Work Order Details',
                    fields: [
                        { key: 'workOrderNumber', label: 'WO Number', type: 'text', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'bomId', label: 'BOM', type: 'reference', lookupModel: 'MfgBom' },
                        { key: 'routingId', label: 'Routing', type: 'reference', lookupModel: 'MfgRouting' },
                        { key: 'quantityOrdered', label: 'Qty Ordered', type: 'number', required: true },
                        { key: 'plannedStartDate', label: 'Planned Start', type: 'date' },
                        { key: 'plannedEndDate', label: 'Planned End', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.WORK_ORDER_STATUS },
                        { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter' },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'salesOrderId', label: 'Sales Order', type: 'reference', lookupModel: 'SalesOrder' },
                        { key: 'priority', label: 'Priority', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgWorkOrderOp: {
            title: 'Work Order Operation',
            sections: [
                {
                    title: 'Operation Details',
                    fields: [
                        { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                        { key: 'operationNumber', label: 'Operation #', type: 'number', required: true },
                        { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'setupTime', label: 'Setup Time (hrs)', type: 'number' },
                        { key: 'runTime', label: 'Run Time (hrs)', type: 'number' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.OPERATION_STATUS }
                    ]
                }
            ]
        },

        MfgProductionOrder: {
            title: 'Production Order',
            sections: [
                {
                    title: 'Order Details',
                    fields: [
                        { key: 'orderNumber', label: 'Order Number', type: 'text', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'scheduledDate', label: 'Scheduled Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.WORK_ORDER_STATUS },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgProdOrderLine: {
            title: 'Production Order Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'prodOrderId', label: 'Prod Order', type: 'reference', lookupModel: 'MfgProductionOrder', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'requiredQty', label: 'Required Qty', type: 'number', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' }
                    ]
                }
            ]
        },

        MfgProdBatch: {
            title: 'Production Batch',
            sections: [
                {
                    title: 'Batch Details',
                    fields: [
                        { key: 'batchNumber', label: 'Batch Number', type: 'text', required: true },
                        { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.BATCH_STATUS }
                    ]
                }
            ]
        },

        MfgProdConsumption: {
            title: 'Production Consumption',
            sections: [
                {
                    title: 'Consumption Details',
                    fields: [
                        { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'consumptionDate', label: 'Date', type: 'date' }
                    ]
                }
            ]
        }
    };

    MfgProduction.primaryKeys = {
        MfgWorkOrder: 'workOrderId',
        MfgWorkOrderOp: 'operationId',
        MfgProductionOrder: 'prodOrderId',
        MfgProdOrderLine: 'lineId',
        MfgProdBatch: 'batchId',
        MfgProdConsumption: 'consumptionId'
    };

})();
