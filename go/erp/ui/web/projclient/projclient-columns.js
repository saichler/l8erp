/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Project Client Portal — column definitions
(function() {
    'use strict';

    var PRJC = window.PRJC = window.PRJC || {};
    var col = Layer8ColumnFactory;
    var render = PRJC.render;

    PRJC.columns = {
        // Projects
        PrjProject: [
            ...col.id('projectId', 'Project ID'),
            ...col('code', 'Code'),
            ...col('name', 'Name'),
            ...col.enum('projectType', 'Type', PRJC.enums.PROJECT_TYPE, render.projectType),
            ...col.status('status', 'Status', PRJC.enums.PROJECT_STATUS, render.projectStatus),
            ...col.status('priority', 'Priority', PRJC.enums.PROJECT_PRIORITY, render.projectPriority),
            ...col.number('percentComplete', '% Complete'),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End')
        ],
        PrjStatusReport: [
            ...col.id('statusId', 'Report ID'),
            ...col.date('reportDate', 'Report Date'),
            ...col.status('overallHealth', 'Overall', PRJC.enums.HEALTH_INDICATOR, render.healthIndicator),
            ...col.status('scheduleHealth', 'Schedule', PRJC.enums.HEALTH_INDICATOR, render.healthIndicator),
            ...col.status('budgetHealth', 'Budget', PRJC.enums.HEALTH_INDICATOR, render.healthIndicator),
            ...col.number('percentComplete', '% Complete')
        ],
        PrjProjectKPI: [
            ...col.id('kpiId', 'KPI ID'),
            ...col('kpiName', 'Name'),
            ...col('kpiCategory', 'Category'),
            ...col.number('targetValue', 'Target'),
            ...col.number('actualValue', 'Actual'),
            ...col.number('variancePercent', 'Variance %'),
            ...col.status('status', 'Status', PRJC.enums.HEALTH_INDICATOR, render.healthIndicator)
        ],

        // Budget
        PrjProjectBudget: [
            ...col.id('budgetId', 'Budget ID'),
            ...col('name', 'Name'),
            ...col('budgetType', 'Type'),
            ...col.money('budgetedAmount', 'Budgeted'),
            ...col.money('actualAmount', 'Actual'),
            ...col.money('remainingAmount', 'Remaining'),
            ...col.boolean('isApproved', 'Approved')
        ],
        PrjProjectInvoice: [
            ...col.id('invoiceId', 'Invoice ID'),
            ...col('invoiceNumber', 'Invoice #'),
            ...col.date('invoiceDate', 'Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.money('totalAmount', 'Total'),
            ...col.money('paidAmount', 'Paid'),
            ...col.money('balanceDue', 'Balance'),
            ...col.status('status', 'Status', PRJC.enums.INVOICE_STATUS, render.invoiceStatus)
        ],
        PrjBillingSchedule: [
            ...col.id('scheduleId', 'Schedule ID'),
            ...col('name', 'Name'),
            ...col.enum('billingType', 'Type', PRJC.enums.BILLING_TYPE, render.billingType),
            ...col('billingFrequency', 'Frequency'),
            ...col.money('fixedAmount', 'Fixed Amount'),
            ...col.boolean('isActive', 'Active')
        ],

        // Time
        PrjTimesheet: [
            ...col.id('timesheetId', 'Timesheet ID'),
            ...col.date('weekStartDate', 'Week Start'),
            ...col.date('weekEndDate', 'Week End'),
            ...col.number('totalHours', 'Total Hours'),
            ...col.number('billableHours', 'Billable'),
            ...col.status('status', 'Status', PRJC.enums.TIMESHEET_STATUS, render.timesheetStatus)
        ],
        PrjExpenseReport: [
            ...col.id('reportId', 'Report ID'),
            ...col('reportNumber', 'Report #'),
            ...col('title', 'Title'),
            ...col.money('totalAmount', 'Total'),
            ...col.money('approvedAmount', 'Approved'),
            ...col.status('status', 'Status', PRJC.enums.EXPENSE_STATUS, render.expenseStatus)
        ],

        // Deliverables
        PrjPortfolioView: [
            ...col.id('viewId', 'View ID'),
            ...col('name', 'Name'),
            ...col.number('totalProjects', 'Projects'),
            ...col.number('onTrackCount', 'On Track'),
            ...col.number('atRiskCount', 'At Risk'),
            ...col.number('offTrackCount', 'Off Track'),
            ...col.money('totalBudget', 'Total Budget'),
            ...col.money('totalActualCost', 'Actual Cost')
        ]
    };
})();
