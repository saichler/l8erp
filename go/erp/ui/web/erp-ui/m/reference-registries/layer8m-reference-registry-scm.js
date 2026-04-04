/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - SCM Module
 * Extends shared SCM data with mobile-specific entries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    Layer8MReferenceRegistry.register({
        ...window.ReferenceDataScm,

        // Mobile-specific: additional procurement entries
        ...ref.simple('ScmRequestForQuotation', 'rfqId', 'rfqNumber', 'RFQ'),
        ...ref.simple('ScmBlanketOrder', 'blanketOrderId', 'orderNumber', 'Blanket Order'),
        ...ref.idOnly('ScmSupplierScorecard', 'scorecardId'),

        // Mobile-specific: additional inventory entries
        ...ref.simple('ScmItemCategory', 'categoryId', 'categoryName'),
        ...ref.idOnly('ScmCycleCount', 'cycleCountId'),

        // Mobile-specific: additional warehouse entries
        ...ref.simple('ScmWavePlan', 'wavePlanId', 'waveName'),
        ...ref.idOnly('ScmDockSchedule', 'scheduleId'),

        // Mobile-specific: additional logistics entries
        ...ref.coded('ScmCarrier', 'carrierId', 'code', 'name'),
        ...ref.simple('ScmRoute', 'routeId', 'name'),
        ...ref.idOnly('ScmLoadPlan', 'loadPlanId'),

        // Mobile-specific: additional demand planning entries
        ...ref.simple('ScmForecastModel', 'modelId', 'name'),
        ...ref.simple('ScmDemandPlan', 'planId', 'name'),
        ...ref.simple('ScmPromotionalPlan', 'planId', 'planName'),
        ...ref.simple('ScmNewProductPlan', 'planId', 'productName'),

        // Mobile-specific: additional supply planning entries
        ...ref.idOnly('ScmMaterialRequirement', 'requirementId'),
        ...ref.idOnly('ScmDistributionRequirement', 'requirementId'),
        ...ref.idOnly('ScmSupplierCollaboration', 'collaborationId'),
        ...ref.idOnly('ScmLeadTime', 'leadTimeId')
    });
})();
