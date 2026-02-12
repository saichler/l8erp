/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - Projects Module
 * Reference configurations for Project Management models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refPrjM = window.Layer8RefFactory;

window.Layer8MReferenceRegistryPRJ = {
    // ========================================
    // Projects - Planning
    // ========================================
    ...refPrjM.coded('PrjProject', 'projectId', 'code', 'name'),
    ...refPrjM.simple('PrjProjectTemplate', 'templateId', 'name'),

    // ========================================
    // Projects - Resources
    // ========================================
    ...refPrjM.simple('PrjResourcePool', 'poolId', 'name'),
    ...refPrjM.simple('PrjResource', 'resourceId', 'name', 'Resource'),
    ...refPrjM.idOnly('PrjAllocation', 'allocationId'),
    ...refPrjM.idOnly('PrjBooking', 'bookingId'),
    ...refPrjM.simple('PrjCapacityPlan', 'planId', 'name'),
    ...refPrjM.idOnly('PrjUtilization', 'utilizationId'),

    // ========================================
    // Projects - Time & Expense
    // ========================================
    ...refPrjM.idOnly('PrjTimesheet', 'timesheetId'),
    ...refPrjM.idOnly('PrjExpenseReport', 'reportId'),
    ...refPrjM.simple('PrjApprovalRule', 'ruleId', 'name'),
    ...refPrjM.simple('PrjExpenseCategory', 'categoryId', 'name'),
    ...refPrjM.simple('PrjExpensePolicy', 'policyId', 'name'),

    // ========================================
    // Projects - Billing
    // ========================================
    ...refPrjM.simple('PrjBillingRate', 'rateId', 'name'),
    ...refPrjM.simple('PrjBillingSchedule', 'scheduleId', 'name'),
    ...refPrjM.simple('PrjProjectInvoice', 'invoiceId', 'invoiceNumber', 'Invoice'),
    ...refPrjM.idOnly('PrjRevenueRecognition', 'recognitionId'),
    ...refPrjM.simple('PrjProjectBudget', 'budgetId', 'name'),

    // ========================================
    // Projects - Analytics
    // ========================================
    ...refPrjM.idOnly('PrjStatusReport', 'statusId'),
    ...refPrjM.simple('PrjPortfolioView', 'viewId', 'name'),
    ...refPrjM.simple('PrjProjectKPI', 'kpiId', 'kpiName')
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryPRJ);
