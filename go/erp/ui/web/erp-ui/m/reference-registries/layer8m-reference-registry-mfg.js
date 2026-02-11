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
    ...refMfgM.simple('MfgRouting', 'routingId', 'routingNumber', 'Routing'),
    ...refMfgM.coded('MfgEngChangeOrder', 'changeOrderId', 'ecoNumber', 'description'),

    // ========================================
    // Manufacturing - Production
    // ========================================
    ...refMfgM.simple('MfgWorkOrder', 'workOrderId', 'workOrderNumber', 'Work Order'),
    ...refMfgM.simple('MfgProductionOrder', 'prodOrderId', 'orderNumber', 'Production Order'),

    // ========================================
    // Manufacturing - Shop Floor
    // ========================================
    ...refMfgM.coded('MfgWorkCenter', 'workCenterId', 'code', 'name'),
    ...refMfgM.idOnly('MfgWorkCenterCap', 'capacityId'),
    ...refMfgM.simple('MfgShiftSchedule', 'scheduleId', 'name', 'Shift'),
    ...refMfgM.idOnly('MfgDowntimeEvent', 'eventId'),

    // ========================================
    // Manufacturing - Quality
    // ========================================
    ...refMfgM.simple('MfgQualityPlan', 'planId', 'name', 'Quality Plan'),
    ...refMfgM.simple('MfgQualityInspection', 'inspectionId', 'inspectionNumber', 'Inspection'),
    ...refMfgM.simple('MfgNCR', 'ncrId', 'ncrNumber', 'NCR'),

    // ========================================
    // Manufacturing - Planning
    // ========================================
    ...refMfgM.simple('MfgMrpRun', 'runId', 'runNumber', 'MRP Run'),
    ...refMfgM.simple('MfgCapacityPlan', 'planId', 'planNumber', 'Capacity Plan'),
    ...refMfgM.simple('MfgProdSchedule', 'scheduleId', 'scheduleNumber', 'Schedule'),

    // ========================================
    // Manufacturing - Costing
    // ========================================
    ...refMfgM.idOnly('MfgStandardCost', 'costId'),
    ...refMfgM.idOnly('MfgCostRollup', 'rollupId'),
    ...refMfgM.simple('MfgOverhead', 'overheadId', 'name', 'Overhead')
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryMFG);
