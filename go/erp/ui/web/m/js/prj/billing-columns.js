/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobilePrjBilling.enums;
    const render = MobilePrjBilling.render;

    MobilePrjBilling.columns = {
        PrjBillingRate: [
            { key: 'rateId', label: 'ID', sortKey: 'rateId', filterKey: 'rateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'role', label: 'Role', sortKey: 'role', filterKey: 'role' },
            { key: 'skillCategory', label: 'Skill Category', sortKey: 'skillCategory' },
            { key: 'rate', label: 'Rate', sortKey: 'rate', render: (item) => Layer8MRenderers.renderMoney(item.rate) },
            { key: 'rateUnit', label: 'Rate Unit', sortKey: 'rateUnit' },
            { key: 'effectiveFrom', label: 'Effective From', sortKey: 'effectiveFrom', render: (item) => Layer8MRenderers.renderDate(item.effectiveFrom) },
            { key: 'effectiveUntil', label: 'Effective Until', sortKey: 'effectiveUntil', render: (item) => Layer8MRenderers.renderDate(item.effectiveUntil) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        PrjBillingSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'billingType', label: 'Billing Type', sortKey: 'billingType', enumValues: enums.BILLING_TYPE_VALUES, render: (item) => render.billingType(item.billingType) },
            { key: 'billingFrequency', label: 'Frequency', sortKey: 'billingFrequency' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        PrjBillingMilestone: [
            { key: 'milestoneId', label: 'ID', sortKey: 'milestoneId', filterKey: 'milestoneId' },
            { key: 'scheduleId', label: 'Schedule', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => Layer8MRenderers.renderMoney(item.amount) },
            { key: 'percentage', label: 'Percentage', sortKey: 'percentage' },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => Layer8MRenderers.renderDate(item.dueDate) },
            { key: 'billedDate', label: 'Billed Date', sortKey: 'billedDate', render: (item) => Layer8MRenderers.renderDate(item.billedDate) },
            { key: 'isBilled', label: 'Billed', sortKey: 'isBilled', render: (item) => item.isBilled ? 'Yes' : 'No' }
        ],

        PrjProjectInvoice: [
            { key: 'invoiceId', label: 'ID', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'invoiceNumber', label: 'Invoice Number', sortKey: 'invoiceNumber', filterKey: 'invoiceNumber' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.INVOICE_STATUS_VALUES, render: (item) => render.invoiceStatus(item.status) },
            { key: 'invoiceDate', label: 'Invoice Date', sortKey: 'invoiceDate', render: (item) => Layer8MRenderers.renderDate(item.invoiceDate) },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => Layer8MRenderers.renderDate(item.dueDate) },
            { key: 'totalAmount', label: 'Total Amount', sortKey: 'totalAmount', render: (item) => Layer8MRenderers.renderMoney(item.totalAmount) },
            { key: 'paidAmount', label: 'Paid Amount', sortKey: 'paidAmount', render: (item) => Layer8MRenderers.renderMoney(item.paidAmount) }
        ],

        PrjInvoiceLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'invoiceId', label: 'Invoice', sortKey: 'invoiceId', filterKey: 'invoiceId' },
            { key: 'lineNumber', label: 'Line #', sortKey: 'lineNumber' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            { key: 'unitPrice', label: 'Unit Price', sortKey: 'unitPrice', render: (item) => Layer8MRenderers.renderMoney(item.unitPrice) },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => Layer8MRenderers.renderMoney(item.amount) },
            { key: 'isTaxable', label: 'Taxable', sortKey: 'isTaxable', render: (item) => item.isTaxable ? 'Yes' : 'No' }
        ],

        PrjRevenueRecognition: [
            { key: 'recognitionId', label: 'ID', sortKey: 'recognitionId', filterKey: 'recognitionId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'method', label: 'Method', sortKey: 'method', enumValues: enums.REVENUE_RECOGNITION_METHOD_VALUES, render: (item) => render.revenueRecognitionMethod(item.method) },
            { key: 'recognizedAmount', label: 'Recognized', sortKey: 'recognizedAmount', render: (item) => Layer8MRenderers.renderMoney(item.recognizedAmount) },
            { key: 'deferredAmount', label: 'Deferred', sortKey: 'deferredAmount', render: (item) => Layer8MRenderers.renderMoney(item.deferredAmount) },
            { key: 'percentComplete', label: '% Complete', sortKey: 'percentComplete' },
            { key: 'periodEnd', label: 'Period End', sortKey: 'periodEnd', render: (item) => Layer8MRenderers.renderDate(item.periodEnd) },
            { key: 'isPosted', label: 'Posted', sortKey: 'isPosted', render: (item) => item.isPosted ? 'Yes' : 'No' }
        ],

        PrjProjectBudget: [
            { key: 'budgetId', label: 'ID', sortKey: 'budgetId', filterKey: 'budgetId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'budgetType', label: 'Budget Type', sortKey: 'budgetType' },
            { key: 'budgetedAmount', label: 'Budgeted', sortKey: 'budgetedAmount', render: (item) => Layer8MRenderers.renderMoney(item.budgetedAmount) },
            { key: 'actualAmount', label: 'Actual', sortKey: 'actualAmount', render: (item) => Layer8MRenderers.renderMoney(item.actualAmount) },
            { key: 'remainingAmount', label: 'Remaining', sortKey: 'remainingAmount', render: (item) => Layer8MRenderers.renderMoney(item.remainingAmount) },
            { key: 'approvedDate', label: 'Approved Date', sortKey: 'approvedDate', render: (item) => Layer8MRenderers.renderDate(item.approvedDate) },
            { key: 'isApproved', label: 'Approved', sortKey: 'isApproved', render: (item) => item.isApproved ? 'Yes' : 'No' }
        ]
    };

    MobilePrjBilling.primaryKeys = {
        PrjBillingRate: 'rateId', PrjBillingSchedule: 'scheduleId',
        PrjBillingMilestone: 'milestoneId', PrjProjectInvoice: 'invoiceId',
        PrjInvoiceLine: 'lineId', PrjRevenueRecognition: 'recognitionId',
        PrjProjectBudget: 'budgetId'
    };

})();
