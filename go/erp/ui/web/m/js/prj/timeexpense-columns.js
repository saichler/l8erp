/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobilePrjTimeExpense.enums;
    const render = MobilePrjTimeExpense.render;

    MobilePrjTimeExpense.columns = {
        PrjTimesheet: [
            ...col.id('timesheetId'),
            ...col.col('employeeId', 'Employee'),
            ...col.date('weekStartDate', 'Period Start'),
            ...col.date('weekEndDate', 'Period End'),
            ...col.status('status', 'Status', enums.TIMESHEET_STATUS_VALUES, render.timesheetStatus),
            ...col.col('totalHours', 'Total Hours'),
            ...col.col('billableHours', 'Billable Hours'),
            ...col.date('submittedDate', 'Submitted Date')
        ],

        PrjExpenseReport: [
            ...col.id('reportId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('projectId', 'Project'),
            ...col.col('title', 'Title'),
            ...col.status('status', 'Status', enums.EXPENSE_STATUS_VALUES, render.expenseStatus),
            ...col.money('totalAmount', 'Total Amount'),
            ...col.date('submitDate', 'Submitted Date'),
            ...col.date('approvedDate', 'Approved Date')
        ],

        PrjApprovalRule: [
            ...col.id('ruleId'),
            ...col.col('name', 'Name'),
            ...col.status('approvalType', 'Type', enums.APPROVAL_TYPE_VALUES, render.approvalType),
            ...col.money('thresholdAmount', 'Min Amount'),
            ...col.col('thresholdHours', 'Max Hours'),
            ...col.col('approverId', 'Approver'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjExpenseCategory: [
            ...col.id('categoryId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('glAccount', 'GL Account'),
            ...col.boolean('requiresReceipt', 'Requires Receipt'),
            ...col.money('defaultLimit', 'Max Amount'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjExpensePolicy: [
            ...col.id('policyId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.date('expiryDate', 'Expiry Date'),
            ...col.boolean('isActive', 'Active')
        ]
    };

    MobilePrjTimeExpense.primaryKeys = {
        PrjTimesheet: 'timesheetId',
        PrjExpenseReport: 'reportId',
        PrjApprovalRule: 'ruleId', PrjExpenseCategory: 'categoryId',
        PrjExpensePolicy: 'policyId'
    };

})();
