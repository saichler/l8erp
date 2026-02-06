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
    ...refSalesM.idOnly('SalesPriceListEntry', 'entryId'),
    ...refSalesM.idOnly('SalesCustomerPrice', 'customerPriceId'),
    ...refSalesM.simple('SalesDiscountRule', 'ruleId', 'name', 'Discount Rule'),
    ...refSalesM.idOnly('SalesPromotionalPrice', 'promotionalPriceId'),
    ...refSalesM.idOnly('SalesQuantityBreak', 'breakId'),

    // ========================================
    // Sales - Order Models
    // ========================================
    ...refSalesM.simple('SalesQuotation', 'quotationId', 'quotationNumber', 'Quotation'),
    ...refSalesM.idOnly('SalesQuotationLine', 'lineId'),
    ...refSalesM.simple('SalesOrder', 'salesOrderId', 'orderNumber', 'Sales Order'),
    ...refSalesM.idOnly('SalesOrderLine', 'lineId'),
    ...refSalesM.idOnly('SalesOrderAllocation', 'allocationId'),
    ...refSalesM.idOnly('SalesBackOrder', 'backOrderId'),
    ...refSalesM.simple('SalesReturnOrder', 'returnOrderId', 'returnNumber', 'Return Order'),
    ...refSalesM.idOnly('SalesReturnOrderLine', 'lineId'),

    // ========================================
    // Sales - Shipping Models
    // ========================================
    ...refSalesM.simple('SalesDeliveryOrder', 'deliveryOrderId', 'deliveryNumber', 'Delivery Order'),
    ...refSalesM.idOnly('SalesDeliveryLine', 'lineId'),
    ...refSalesM.idOnly('SalesPickRelease', 'pickReleaseId'),
    ...refSalesM.idOnly('SalesPackingSlip', 'packingSlipId'),
    ...refSalesM.idOnly('SalesShippingDoc', 'shippingDocId'),
    ...refSalesM.idOnly('SalesDeliveryConfirm', 'confirmId'),

    // ========================================
    // Sales - Billing Models
    // ========================================
    ...refSalesM.simple('SalesBillingSchedule', 'scheduleId', 'name', 'Billing Schedule'),
    ...refSalesM.idOnly('SalesBillingMilestone', 'milestoneId'),
    ...refSalesM.idOnly('SalesRevenueSchedule', 'scheduleId'),

    // ========================================
    // Sales - Territory & Commission Models
    // ========================================
    ...refSalesM.simple('SalesTerritory', 'territoryId', 'name', 'Territory'),
    ...refSalesM.idOnly('SalesTerritoryAssign', 'assignmentId'),
    ...refSalesM.simple('SalesCommissionPlan', 'planId', 'name', 'Commission Plan'),
    ...refSalesM.idOnly('SalesCommissionCalc', 'calcId'),

    // ========================================
    // Sales - Analytics Models
    // ========================================
    ...refSalesM.idOnly('SalesTarget', 'targetId'),
    ...refSalesM.idOnly('SalesForecast', 'forecastId'),

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
