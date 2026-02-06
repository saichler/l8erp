/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - Manufacturing Module
 * Reference configurations for Manufacturing models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refMfgM = window.Layer8RefFactory;

window.Layer8MReferenceRegistryMFG = {
    // ========================================
    // Manufacturing - Engineering
    // ========================================
    ...refMfgM.simple('MfgBom', 'bomId', 'bomNumber', 'BOM'),
    ...refMfgM.idOnly('MfgBomLine', 'lineId'),
    ...refMfgM.simple('MfgRouting', 'routingId', 'routingNumber', 'Routing'),
    ...refMfgM.simple('MfgRoutingOperation', 'operationId', 'operationName'),
    ...refMfgM.coded('MfgEngChangeOrder', 'changeOrderId', 'ecoNumber', 'description'),
    ...refMfgM.idOnly('MfgEngChangeDetail', 'detailId'),

    // ========================================
    // Manufacturing - Production
    // ========================================
    ...refMfgM.simple('MfgWorkOrder', 'workOrderId', 'workOrderNumber', 'Work Order'),
    ...refMfgM.simple('MfgWorkOrderOp', 'operationId', 'name'),
    ...refMfgM.simple('MfgProductionOrder', 'prodOrderId', 'orderNumber', 'Production Order'),
    ...refMfgM.idOnly('MfgProdOrderLine', 'lineId'),
    ...refMfgM.simple('MfgProdBatch', 'batchId', 'batchNumber', 'Batch'),
    ...refMfgM.idOnly('MfgProdConsumption', 'consumptionId'),

    // ========================================
    // Manufacturing - Shop Floor
    // ========================================
    ...refMfgM.coded('MfgWorkCenter', 'workCenterId', 'code', 'name'),
    ...refMfgM.idOnly('MfgWorkCenterCap', 'capacityId'),
    ...refMfgM.idOnly('MfgLaborEntry', 'entryId'),
    ...refMfgM.idOnly('MfgMachineEntry', 'entryId'),
    ...refMfgM.simple('MfgShiftSchedule', 'scheduleId', 'name', 'Shift'),
    ...refMfgM.idOnly('MfgDowntimeEvent', 'eventId'),

    // ========================================
    // Manufacturing - Quality
    // ========================================
    ...refMfgM.simple('MfgQualityPlan', 'planId', 'name', 'Quality Plan'),
    ...refMfgM.simple('MfgInspectionPoint', 'pointId', 'name'),
    ...refMfgM.simple('MfgQualityInspection', 'inspectionId', 'inspectionNumber', 'Inspection'),
    ...refMfgM.idOnly('MfgTestResult', 'resultId'),
    ...refMfgM.simple('MfgNCR', 'ncrId', 'ncrNumber', 'NCR'),
    ...refMfgM.idOnly('MfgNCRAction', 'actionId'),

    // ========================================
    // Manufacturing - Planning
    // ========================================
    ...refMfgM.simple('MfgMrpRun', 'runId', 'runNumber', 'MRP Run'),
    ...refMfgM.idOnly('MfgMrpRequirement', 'requirementId'),
    ...refMfgM.simple('MfgCapacityPlan', 'planId', 'planNumber', 'Capacity Plan'),
    ...refMfgM.idOnly('MfgCapacityLoad', 'loadId'),
    ...refMfgM.simple('MfgProdSchedule', 'scheduleId', 'scheduleNumber', 'Schedule'),
    ...refMfgM.idOnly('MfgScheduleBlock', 'blockId'),

    // ========================================
    // Manufacturing - Costing
    // ========================================
    ...refMfgM.idOnly('MfgStandardCost', 'costId'),
    ...refMfgM.idOnly('MfgCostRollup', 'rollupId'),
    ...refMfgM.idOnly('MfgActualCost', 'actualCostId'),
    ...refMfgM.idOnly('MfgCostVariance', 'varianceId'),
    ...refMfgM.simple('MfgOverhead', 'overheadId', 'name', 'Overhead'),
    ...refMfgM.idOnly('MfgOverheadAlloc', 'allocationId')
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryMFG);
