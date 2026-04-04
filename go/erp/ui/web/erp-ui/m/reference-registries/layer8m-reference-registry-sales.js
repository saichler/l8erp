/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - Sales Module
 * Extends shared Sales data with mobile-specific entries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    Layer8MReferenceRegistry.register({
        ...window.ReferenceDataSales,

        // Mobile-specific: pricing label variant
        ...ref.simple('SalesPromotionalPrice', 'promoId', 'name', 'Promo Price'),

        // Mobile-specific: billing/analytics as simple (not idOnly)
        ...ref.simple('SalesRevenueSchedule', 'scheduleId', 'recognitionMethod', 'Revenue Schedule'),
        ...ref.simple('SalesTarget', 'targetId', 'name', 'Sales Target'),
        ...ref.simple('SalesForecast', 'forecastId', 'name', 'Forecast'),

        // Mobile-specific: shortened aliases for mobile forms
        ...ref.simple('BillingSchedule', 'scheduleId', 'name', 'Billing Schedule'),
        ...ref.simple('CommissionPlan', 'planId', 'name', 'Commission Plan'),
        ...ref.simple('CustomerContract', 'contractId', 'contractNumber', 'Contract'),
        ...ref.simple('CustomerHierarchy', 'hierarchyId', 'name', 'Hierarchy'),
        ...ref.simple('ReturnOrder', 'returnOrderId', 'returnNumber', 'Return Order'),
        ...ref.simple('DeliveryOrder', 'deliveryOrderId', 'deliveryNumber', 'Delivery Order'),
        ...ref.simple('PriceList', 'priceListId', 'name', 'Price List')
    });
})();
