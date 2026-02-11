/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - SCM Module
 * Reference configurations for Supply Chain Management models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refScmM = window.Layer8RefFactory;

window.Layer8MReferenceRegistrySCM = {
    // ========================================
    // SCM - Procurement Models
    // ========================================
    ...refScmM.simple('ScmPurchaseRequisition', 'requisitionId', 'requisitionNumber', 'Requisition'),
    ...refScmM.simple('ScmRequestForQuotation', 'rfqId', 'rfqNumber', 'RFQ'),
    ...refScmM.simple('ScmPurchaseOrder', 'purchaseOrderId', 'orderNumber', 'Purchase Order'),
    ...refScmM.simple('ScmBlanketOrder', 'blanketOrderId', 'orderNumber', 'Blanket Order'),
    ...refScmM.idOnly('ScmSupplierScorecard', 'scorecardId'),

    // ========================================
    // SCM - Inventory Models
    // ========================================
    ...refScmM.coded('ScmItem', 'itemId', 'itemNumber', 'name'),
    ...refScmM.simple('ScmItemCategory', 'categoryId', 'categoryName'),
    ...refScmM.idOnly('ScmCycleCount', 'cycleCountId'),

    // ========================================
    // SCM - Warehouse Management Models
    // ========================================
    ...refScmM.coded('ScmWarehouse', 'warehouseId', 'code', 'name'),
    ...refScmM.idOnly('ScmReceivingOrder', 'receivingOrderId'),
    ...refScmM.simple('ScmWavePlan', 'wavePlanId', 'waveName'),
    ...refScmM.idOnly('ScmDockSchedule', 'scheduleId'),

    // ========================================
    // SCM - Logistics Models
    // ========================================
    ...refScmM.coded('ScmCarrier', 'carrierId', 'code', 'name'),
    ...refScmM.idOnly('ScmFreightRate', 'rateId'),
    ...refScmM.simple('ScmShipment', 'shipmentId', 'shipmentNumber', 'Shipment'),
    ...refScmM.simple('ScmRoute', 'routeId', 'name'),
    ...refScmM.idOnly('ScmLoadPlan', 'loadPlanId'),
    ...refScmM.simple('ScmReturnAuthorization', 'rmaId', 'rmaNumber', 'RMA'),

    // ========================================
    // SCM - Demand Planning Models
    // ========================================
    ...refScmM.simple('ScmDemandForecast', 'forecastId', 'forecastId', 'Forecast'),
    ...refScmM.simple('ScmForecastModel', 'modelId', 'name'),
    ...refScmM.simple('ScmDemandPlan', 'planId', 'name'),
    ...refScmM.simple('ScmPromotionalPlan', 'planId', 'planName'),
    ...refScmM.simple('ScmNewProductPlan', 'planId', 'productName'),

    // ========================================
    // SCM - Supply Planning Models
    // ========================================
    ...refScmM.idOnly('ScmMaterialRequirement', 'requirementId'),
    ...refScmM.idOnly('ScmDistributionRequirement', 'requirementId'),
    ...refScmM.simple('ScmSupplyPlan', 'planId', 'name', 'Supply Plan'),
    ...refScmM.idOnly('ScmSupplierCollaboration', 'collaborationId'),
    ...refScmM.idOnly('ScmSafetyStock', 'safetyStockId'),
    ...refScmM.idOnly('ScmLeadTime', 'leadTimeId')
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistrySCM);
