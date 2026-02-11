/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Manufacturing Production Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MfgProduction = window.MfgProduction || {};

    const f = window.Layer8FormFactory;
    const enums = MfgProduction.enums;

    MfgProduction.forms = {
        MfgWorkOrder: f.form('Work Order', [
            f.section('Work Order Details', [
                ...f.text('workOrderNumber', 'WO Number', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.reference('bomId', 'BOM', 'MfgBom'),
                ...f.reference('routingId', 'Routing', 'MfgRouting'),
                ...f.number('quantityOrdered', 'Qty Ordered', true),
                ...f.date('plannedStartDate', 'Planned Start'),
                ...f.date('plannedEndDate', 'Planned End'),
                ...f.select('status', 'Status', enums.WORK_ORDER_STATUS),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter'),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse'),
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder'),
                ...f.number('priority', 'Priority'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Operations', [
                ...f.inlineTable('operations', 'Work Order Operations', [
                    { key: 'operationId', label: 'ID', hidden: true },
                    { key: 'operationNumber', label: 'Op #', type: 'number' },
                    { key: 'operationName', label: 'Name', type: 'text' },
                    { key: 'workCenterId', label: 'Work Center', type: 'text' },
                    { key: 'status', label: 'Status', type: 'text' },
                    { key: 'setupTimePlanned', label: 'Setup Planned', type: 'number' },
                    { key: 'runTimePlanned', label: 'Run Planned', type: 'number' }
                ])
            ]),
            f.section('Labor Entries', [
                ...f.inlineTable('laborEntries', 'Labor Entries', [
                    { key: 'entryId', label: 'ID', hidden: true },
                    { key: 'employeeId', label: 'Employee', type: 'text' },
                    { key: 'workCenterId', label: 'Work Center', type: 'text' },
                    { key: 'hoursWorked', label: 'Hours', type: 'number' },
                    { key: 'laborType', label: 'Type', type: 'text' },
                    { key: 'quantityCompleted', label: 'Qty Completed', type: 'number' }
                ])
            ]),
            f.section('Machine Entries', [
                ...f.inlineTable('machineEntries', 'Machine Entries', [
                    { key: 'entryId', label: 'ID', hidden: true },
                    { key: 'workCenterId', label: 'Work Center', type: 'text' },
                    { key: 'machineHours', label: 'Machine Hrs', type: 'number' },
                    { key: 'machineStatus', label: 'Status', type: 'text' },
                    { key: 'quantityCompleted', label: 'Qty Completed', type: 'number' }
                ])
            ]),
            f.section('Consumptions', [
                ...f.inlineTable('consumptions', 'Production Consumptions', [
                    { key: 'consumptionId', label: 'ID', hidden: true },
                    { key: 'itemId', label: 'Item', type: 'text' },
                    { key: 'quantityPlanned', label: 'Qty Planned', type: 'number' },
                    { key: 'quantityConsumed', label: 'Qty Consumed', type: 'number' },
                    { key: 'unitOfMeasure', label: 'UOM', type: 'text' }
                ])
            ]),
            f.section('Batches', [
                ...f.inlineTable('batches', 'Production Batches', [
                    { key: 'batchId', label: 'ID', hidden: true },
                    { key: 'batchNumber', label: 'Batch #', type: 'text' },
                    { key: 'itemId', label: 'Item', type: 'text' },
                    { key: 'quantity', label: 'Quantity', type: 'number' },
                    { key: 'productionDate', label: 'Prod Date', type: 'date' },
                    { key: 'qualityStatus', label: 'Quality', type: 'text' }
                ])
            ]),
            f.section('Actual Costs', [
                ...f.inlineTable('actualCosts', 'Actual Costs', [
                    { key: 'actualCostId', label: 'ID', hidden: true },
                    { key: 'costType', label: 'Cost Type', type: 'text' },
                    { key: 'costElement', label: 'Element', type: 'text' },
                    { key: 'amount', label: 'Amount', type: 'money' },
                    { key: 'quantity', label: 'Quantity', type: 'number' }
                ])
            ]),
            f.section('Cost Variances', [
                ...f.inlineTable('costVariances', 'Cost Variances', [
                    { key: 'varianceId', label: 'ID', hidden: true },
                    { key: 'varianceType', label: 'Variance Type', type: 'text' },
                    { key: 'costType', label: 'Cost Type', type: 'text' },
                    { key: 'standardCost', label: 'Standard', type: 'money' },
                    { key: 'actualCost', label: 'Actual', type: 'money' },
                    { key: 'varianceAmount', label: 'Variance', type: 'money' }
                ])
            ])
        ]),

        MfgProductionOrder: f.form('Production Order', [
            f.section('Order Details', [
                ...f.text('orderNumber', 'Order Number', true),
                ...f.reference('customerId', 'Customer', 'Customer'),
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder'),
                ...f.date('orderDate', 'Order Date'),
                ...f.date('requiredDate', 'Required Date'),
                ...f.select('status', 'Status', enums.WORK_ORDER_STATUS),
                ...f.number('priority', 'Priority'),
                ...f.reference('plannerId', 'Planner', 'Employee'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Order Lines', [
                ...f.inlineTable('lines', 'Production Order Lines', [
                    { key: 'lineId', label: 'ID', hidden: true },
                    { key: 'lineNumber', label: 'Line #', type: 'number' },
                    { key: 'itemId', label: 'Item', type: 'text' },
                    { key: 'quantityOrdered', label: 'Qty Ordered', type: 'number' },
                    { key: 'quantityCompleted', label: 'Qty Completed', type: 'number' }
                ])
            ])
        ])
    };

    MfgProduction.primaryKeys = {
        MfgWorkOrder: 'workOrderId',
        MfgProductionOrder: 'prodOrderId'
    };

})();
