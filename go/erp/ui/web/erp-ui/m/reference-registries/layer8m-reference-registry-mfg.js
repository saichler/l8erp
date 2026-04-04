/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - Manufacturing Module
 * Extends shared MFG data with mobile-specific entries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    Layer8MReferenceRegistry.register({
        ...window.ReferenceDataMfg,

        // Mobile-specific: engineering entries
        ...ref.coded('MfgEngChangeOrder', 'changeOrderId', 'ecoNumber', 'description'),

        // Mobile-specific: shop floor entries
        ...ref.idOnly('MfgWorkCenterCap', 'capacityId'),
        ...ref.simple('MfgShiftSchedule', 'scheduleId', 'name', 'Shift'),
        ...ref.idOnly('MfgDowntimeEvent', 'eventId'),

        // Mobile-specific: quality entries
        ...ref.simple('MfgQualityPlan', 'planId', 'name', 'Quality Plan'),

        // Mobile-specific: planning entries
        ...ref.simple('MfgMrpRun', 'runId', 'runNumber', 'MRP Run'),

        // Mobile-specific: costing entries
        ...ref.idOnly('MfgStandardCost', 'costId'),
        ...ref.simple('MfgOverhead', 'overheadId', 'name', 'Overhead')
    });
})();
