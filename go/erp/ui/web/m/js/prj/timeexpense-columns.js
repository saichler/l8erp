/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobilePrjTimeExpense.enums;
    const render = MobilePrjTimeExpense.render;

    MobilePrjTimeExpense.columns = {
        PrjTimesheet: [
            { key: 'timesheetId', label: 'ID', sortKey: 'timesheetId', filterKey: 'timesheetId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'weekStartDate', label: 'Period Start', sortKey: 'weekStartDate', render: (item) => Layer8MRenderers.renderDate(item.weekStartDate) },
            { key: 'weekEndDate', label: 'Period End', sortKey: 'weekEndDate', render: (item) => Layer8MRenderers.renderDate(item.weekEndDate) },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.TIMESHEET_STATUS_VALUES, render: (item) => render.timesheetStatus(item.status) },
            { key: 'totalHours', label: 'Total Hours', sortKey: 'totalHours' },
            { key: 'billableHours', label: 'Billable Hours', sortKey: 'billableHours' },
            { key: 'submittedDate', label: 'Submitted Date', sortKey: 'submittedDate', render: (item) => Layer8MRenderers.renderDate(item.submittedDate) }
        ],

        PrjTimesheetEntry: [
            { key: 'entryId', label: 'ID', sortKey: 'entryId', filterKey: 'entryId' },
            { key: 'timesheetId', label: 'Timesheet', sortKey: 'timesheetId', filterKey: 'timesheetId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'taskId', label: 'Task', sortKey: 'taskId', filterKey: 'taskId' },
            { key: 'workDate', label: 'Work Date', sortKey: 'workDate', render: (item) => Layer8MRenderers.renderDate(item.workDate) },
            { key: 'hours', label: 'Hours', sortKey: 'hours' },
            { key: 'isBillable', label: 'Billable', sortKey: 'isBillable', render: (item) => item.isBillable ? 'Yes' : 'No' },
            { key: 'description', label: 'Description', sortKey: 'description' }
        ],

        PrjExpenseReport: [
            { key: 'reportId', label: 'ID', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.EXPENSE_STATUS_VALUES, render: (item) => render.expenseStatus(item.status) },
            { key: 'totalAmount', label: 'Total Amount', sortKey: 'totalAmount', render: (item) => Layer8MRenderers.renderMoney(item.totalAmount) },
            { key: 'submitDate', label: 'Submitted Date', sortKey: 'submitDate', render: (item) => Layer8MRenderers.renderDate(item.submitDate) },
            { key: 'approvedDate', label: 'Approved Date', sortKey: 'approvedDate', render: (item) => Layer8MRenderers.renderDate(item.approvedDate) }
        ],

        PrjExpenseEntry: [
            { key: 'entryId', label: 'ID', sortKey: 'entryId', filterKey: 'entryId' },
            { key: 'reportId', label: 'Report', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'expenseType', label: 'Type', sortKey: 'expenseType', enumValues: enums.EXPENSE_TYPE_VALUES, render: (item) => render.expenseType(item.expenseType) },
            { key: 'expenseDate', label: 'Date', sortKey: 'expenseDate', render: (item) => Layer8MRenderers.renderDate(item.expenseDate) },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => Layer8MRenderers.renderMoney(item.amount) },
            { key: 'categoryId', label: 'Category', sortKey: 'categoryId' },
            { key: 'isBillable', label: 'Billable', sortKey: 'isBillable', render: (item) => item.isBillable ? 'Yes' : 'No' },
            { key: 'description', label: 'Description', sortKey: 'description' }
        ],

        PrjApprovalRule: [
            { key: 'ruleId', label: 'ID', sortKey: 'ruleId', filterKey: 'ruleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'approvalType', label: 'Type', sortKey: 'approvalType', enumValues: enums.APPROVAL_TYPE_VALUES, render: (item) => render.approvalType(item.approvalType) },
            { key: 'thresholdAmount', label: 'Min Amount', sortKey: 'thresholdAmount', render: (item) => Layer8MRenderers.renderMoney(item.thresholdAmount) },
            { key: 'thresholdHours', label: 'Max Hours', sortKey: 'thresholdHours' },
            { key: 'approverId', label: 'Approver', sortKey: 'approverId' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        PrjExpenseCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'glAccount', label: 'GL Account', sortKey: 'glAccount' },
            { key: 'requiresReceipt', label: 'Requires Receipt', sortKey: 'requiresReceipt', render: (item) => item.requiresReceipt ? 'Yes' : 'No' },
            { key: 'defaultLimit', label: 'Max Amount', sortKey: 'defaultLimit', render: (item) => Layer8MRenderers.renderMoney(item.defaultLimit) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        PrjExpensePolicy: [
            { key: 'policyId', label: 'ID', sortKey: 'policyId', filterKey: 'policyId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'effectiveDate', label: 'Effective Date', sortKey: 'effectiveDate', render: (item) => Layer8MRenderers.renderDate(item.effectiveDate) },
            { key: 'expiryDate', label: 'Expiry Date', sortKey: 'expiryDate', render: (item) => Layer8MRenderers.renderDate(item.expiryDate) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ]
    };

    MobilePrjTimeExpense.primaryKeys = {
        PrjTimesheet: 'timesheetId', PrjTimesheetEntry: 'entryId',
        PrjExpenseReport: 'reportId', PrjExpenseEntry: 'entryId',
        PrjApprovalRule: 'ruleId', PrjExpenseCategory: 'categoryId',
        PrjExpensePolicy: 'policyId'
    };

})();
