/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobilePrjBilling.enums;
    const render = MobilePrjBilling.render;

    MobilePrjBilling.columns = {
        PrjBillingRate: [
            ...col.id('rateId'),
            ...col.col('name', 'Name'),
            ...col.col('role', 'Role'),
            ...col.col('skillCategory', 'Skill Category'),
            ...col.money('rate', 'Rate'),
            ...col.col('rateUnit', 'Rate Unit'),
            ...col.date('effectiveFrom', 'Effective From'),
            ...col.date('effectiveUntil', 'Effective Until'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjBillingSchedule: [
            ...col.id('scheduleId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.status('billingType', 'Billing Type', enums.BILLING_TYPE_VALUES, render.billingType),
            ...col.col('billingFrequency', 'Frequency'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjProjectInvoice: [
            ...col.id('invoiceId'),
            ...col.col('projectId', 'Project'),
            ...col.col('invoiceNumber', 'Invoice Number'),
            ...col.status('status', 'Status', enums.INVOICE_STATUS_VALUES, render.invoiceStatus),
            ...col.date('invoiceDate', 'Invoice Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.money('totalAmount', 'Total Amount'),
            ...col.money('paidAmount', 'Paid Amount')
        ],

        PrjRevenueRecognition: [
            ...col.id('recognitionId'),
            ...col.col('projectId', 'Project'),
            ...col.status('method', 'Method', enums.REVENUE_RECOGNITION_METHOD_VALUES, render.revenueRecognitionMethod),
            ...col.money('recognizedAmount', 'Recognized'),
            ...col.money('deferredAmount', 'Deferred'),
            ...col.col('percentComplete', '% Complete'),
            ...col.date('periodEnd', 'Period End'),
            ...col.boolean('isPosted', 'Posted')
        ],

        PrjProjectBudget: [
            ...col.id('budgetId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.col('budgetType', 'Budget Type'),
            ...col.money('budgetedAmount', 'Budgeted'),
            ...col.money('actualAmount', 'Actual'),
            ...col.money('remainingAmount', 'Remaining'),
            ...col.date('approvedDate', 'Approved Date'),
            ...col.boolean('isApproved', 'Approved')
        ]
    };

    MobilePrjBilling.primaryKeys = {
        PrjBillingRate: 'rateId', PrjBillingSchedule: 'scheduleId',
        PrjProjectInvoice: 'invoiceId',
        PrjRevenueRecognition: 'recognitionId',
        PrjProjectBudget: 'budgetId'
    };

})();
