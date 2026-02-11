/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - Sales Module
 * Reference configurations for Sales models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refSalesM = window.Layer8RefFactory;

window.Layer8MReferenceRegistrySales = {
    // ========================================
    // Sales - Customer Models
    // ========================================
    ...refSalesM.simple('SalesCustomerHierarchy', 'hierarchyId', 'name', 'Hierarchy'),
    ...refSalesM.simple('SalesCustomerSegment', 'segmentId', 'name', 'Segment'),
    ...refSalesM.simple('SalesCustomerContract', 'contractId', 'contractNumber', 'Contract'),
    ...refSalesM.simple('SalesPartnerChannel', 'channelId', 'name', 'Channel'),

    // ========================================
    // Sales - Pricing Models
    // ========================================
    ...refSalesM.simple('SalesPriceList', 'priceListId', 'name', 'Price List'),
    ...refSalesM.simple('SalesDiscountRule', 'ruleId', 'name', 'Discount Rule'),
    ...refSalesM.simple('SalesPromotionalPrice', 'promoId', 'name', 'Promo Price'),

    // ========================================
    // Sales - Order Models
    // ========================================
    ...refSalesM.simple('SalesQuotation', 'quotationId', 'quotationNumber', 'Quotation'),
    ...refSalesM.simple('SalesOrder', 'salesOrderId', 'orderNumber', 'Sales Order'),
    ...refSalesM.simple('SalesReturnOrder', 'returnOrderId', 'returnNumber', 'Return Order'),

    // ========================================
    // Sales - Shipping Models
    // ========================================
    ...refSalesM.simple('SalesDeliveryOrder', 'deliveryOrderId', 'deliveryNumber', 'Delivery Order'),

    // ========================================
    // Sales - Billing Models
    // ========================================
    ...refSalesM.simple('SalesBillingSchedule', 'scheduleId', 'name', 'Billing Schedule'),
    ...refSalesM.simple('SalesRevenueSchedule', 'scheduleId', 'recognitionMethod', 'Revenue Schedule'),

    // ========================================
    // Sales - Territory & Commission Models
    // ========================================
    ...refSalesM.simple('SalesTerritory', 'territoryId', 'name', 'Territory'),
    ...refSalesM.simple('SalesCommissionPlan', 'planId', 'name', 'Commission Plan'),

    // ========================================
    // Sales - Analytics Models
    // ========================================
    ...refSalesM.simple('SalesTarget', 'targetId', 'name', 'Sales Target'),
    ...refSalesM.simple('SalesForecast', 'forecastId', 'name', 'Forecast'),

    // ========================================
    // Aliases for shortened names in mobile forms
    // ========================================
    ...refSalesM.simple('BillingSchedule', 'scheduleId', 'name', 'Billing Schedule'),
    ...refSalesM.simple('CommissionPlan', 'planId', 'name', 'Commission Plan'),
    ...refSalesM.simple('CustomerContract', 'contractId', 'contractNumber', 'Contract'),
    ...refSalesM.simple('CustomerHierarchy', 'hierarchyId', 'name', 'Hierarchy'),
    ...refSalesM.simple('ReturnOrder', 'returnOrderId', 'returnNumber', 'Return Order'),
    ...refSalesM.simple('DeliveryOrder', 'deliveryOrderId', 'deliveryNumber', 'Delivery Order'),
    ...refSalesM.simple('PriceList', 'priceListId', 'name', 'Price List')
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistrySales);
