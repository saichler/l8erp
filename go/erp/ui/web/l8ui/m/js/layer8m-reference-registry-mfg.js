/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - Manufacturing Module
 * Reference configurations for Manufacturing models
 */
(function() {
    'use strict';

    window.Layer8MReferenceRegistryMFG = {
        // ========================================
        // Manufacturing - Engineering
        // ========================================
        MfgBom: {
            idColumn: 'bomId',
            displayColumn: 'name',
            selectColumns: ['bomId', 'name'],
            displayLabel: 'BOM'
        },
        MfgBomLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        MfgRouting: {
            idColumn: 'routingId',
            displayColumn: 'name',
            selectColumns: ['routingId', 'name'],
            displayLabel: 'Routing'
        },
        MfgRoutingOperation: {
            idColumn: 'operationId',
            displayColumn: 'name'
        },
        MfgEngChangeOrder: {
            idColumn: 'changeOrderId',
            displayColumn: 'ecoNumber',
            selectColumns: ['changeOrderId', 'ecoNumber', 'description'],
            displayFormat: function(item) {
                return item.ecoNumber + ' - ' + item.description;
            },
            displayLabel: 'ECO'
        },
        MfgEngChangeDetail: {
            idColumn: 'detailId',
            displayColumn: 'detailId'
        },

        // ========================================
        // Manufacturing - Production
        // ========================================
        MfgWorkOrder: {
            idColumn: 'workOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['workOrderId', 'orderNumber'],
            displayLabel: 'Work Order'
        },
        MfgWorkOrderOp: {
            idColumn: 'operationId',
            displayColumn: 'name'
        },
        MfgProductionOrder: {
            idColumn: 'prodOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['prodOrderId', 'orderNumber'],
            displayLabel: 'Production Order'
        },
        MfgProdOrderLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        MfgProdBatch: {
            idColumn: 'batchId',
            displayColumn: 'batchNumber',
            selectColumns: ['batchId', 'batchNumber'],
            displayLabel: 'Batch'
        },
        MfgProdConsumption: {
            idColumn: 'consumptionId',
            displayColumn: 'consumptionId'
        },

        // ========================================
        // Manufacturing - Shop Floor
        // ========================================
        MfgWorkCenter: {
            idColumn: 'workCenterId',
            displayColumn: 'name',
            selectColumns: ['workCenterId', 'code', 'name'],
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            displayLabel: 'Work Center'
        },
        MfgWorkCenterCap: {
            idColumn: 'capacityId',
            displayColumn: 'capacityId'
        },
        MfgLaborEntry: {
            idColumn: 'entryId',
            displayColumn: 'entryId'
        },
        MfgMachineEntry: {
            idColumn: 'entryId',
            displayColumn: 'entryId'
        },
        MfgShiftSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'name',
            selectColumns: ['scheduleId', 'name'],
            displayLabel: 'Shift'
        },
        MfgDowntimeEvent: {
            idColumn: 'eventId',
            displayColumn: 'eventId'
        },

        // ========================================
        // Manufacturing - Quality
        // ========================================
        MfgQualityPlan: {
            idColumn: 'planId',
            displayColumn: 'name',
            selectColumns: ['planId', 'name'],
            displayLabel: 'Quality Plan'
        },
        MfgInspectionPoint: {
            idColumn: 'pointId',
            displayColumn: 'name'
        },
        MfgQualityInspection: {
            idColumn: 'inspectionId',
            displayColumn: 'inspectionNumber',
            selectColumns: ['inspectionId', 'inspectionNumber'],
            displayLabel: 'Inspection'
        },
        MfgTestResult: {
            idColumn: 'resultId',
            displayColumn: 'resultId'
        },
        MfgNCR: {
            idColumn: 'ncrId',
            displayColumn: 'ncrNumber',
            selectColumns: ['ncrId', 'ncrNumber'],
            displayLabel: 'NCR'
        },
        MfgNCRAction: {
            idColumn: 'actionId',
            displayColumn: 'actionId'
        },

        // ========================================
        // Manufacturing - Planning
        // ========================================
        MfgMrpRun: {
            idColumn: 'runId',
            displayColumn: 'name',
            selectColumns: ['runId', 'name'],
            displayLabel: 'MRP Run'
        },
        MfgMrpRequirement: {
            idColumn: 'requirementId',
            displayColumn: 'requirementId'
        },
        MfgCapacityPlan: {
            idColumn: 'planId',
            displayColumn: 'name',
            selectColumns: ['planId', 'name'],
            displayLabel: 'Capacity Plan'
        },
        MfgCapacityLoad: {
            idColumn: 'loadId',
            displayColumn: 'loadId'
        },
        MfgProdSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'name',
            selectColumns: ['scheduleId', 'name'],
            displayLabel: 'Schedule'
        },
        MfgScheduleBlock: {
            idColumn: 'blockId',
            displayColumn: 'blockId'
        },

        // ========================================
        // Manufacturing - Costing
        // ========================================
        MfgStandardCost: {
            idColumn: 'costId',
            displayColumn: 'costId'
        },
        MfgCostRollup: {
            idColumn: 'rollupId',
            displayColumn: 'rollupId'
        },
        MfgActualCost: {
            idColumn: 'actualCostId',
            displayColumn: 'actualCostId'
        },
        MfgCostVariance: {
            idColumn: 'varianceId',
            displayColumn: 'varianceId'
        },
        MfgOverhead: {
            idColumn: 'overheadId',
            displayColumn: 'name',
            selectColumns: ['overheadId', 'name'],
            displayLabel: 'Overhead'
        },
        MfgOverheadAlloc: {
            idColumn: 'allocationId',
            displayColumn: 'allocationId'
        }
    };
})();
