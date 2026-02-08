/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile PRJ Time & Expense Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobilePrjTimeExpense = window.MobilePrjTimeExpense || {};

    const f = window.Layer8FormFactory;
    const enums = MobilePrjTimeExpense.enums;

    MobilePrjTimeExpense.forms = {
        PrjTimesheet: f.form('Timesheet', [
            f.section('Timesheet Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.date('weekStartDate', 'Period Start', true),
                ...f.date('weekEndDate', 'Period End', true),
                ...f.select('status', 'Status', enums.TIMESHEET_STATUS),
                ...f.number('totalHours', 'Total Hours'),
                ...f.number('billableHours', 'Billable Hours'),
                ...f.number('nonBillableHours', 'Non-Billable Hours'),
                ...f.date('submittedDate', 'Submitted Date'),
                ...f.reference('submittedBy', 'Submitted By', 'Employee'),
                ...f.date('approvedDate', 'Approved Date'),
                ...f.reference('approvedBy', 'Approved By', 'Employee'),
                ...f.textarea('rejectionReason', 'Rejection Reason'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        PrjTimesheetEntry: f.form('Timesheet Entry', [
            f.section('Entry Details', [
                ...f.reference('timesheetId', 'Timesheet', 'PrjTimesheet', true),
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('taskId', 'Task', 'PrjTask'),
                ...f.reference('phaseId', 'Phase', 'PrjPhase'),
                ...f.date('workDate', 'Work Date', true),
                ...f.number('hours', 'Hours', true),
                ...f.checkbox('isBillable', 'Billable'),
                ...f.money('billingRate', 'Billing Rate'),
                ...f.money('billingAmount', 'Billing Amount'),
                ...f.text('activityType', 'Activity Type'),
                ...f.checkbox('isOvertime', 'Overtime'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        PrjExpenseReport: f.form('Expense Report', [
            f.section('Report Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('projectId', 'Project', 'PrjProject'),
                ...f.text('reportNumber', 'Report Number'),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.EXPENSE_STATUS),
                ...f.money('totalAmount', 'Total Amount'),
                ...f.money('approvedAmount', 'Approved Amount'),
                ...f.money('reimbursedAmount', 'Reimbursed Amount'),
                ...f.date('submitDate', 'Submit Date'),
                ...f.date('approvedDate', 'Approved Date'),
                ...f.reference('approvedBy', 'Approved By', 'Employee'),
                ...f.date('paidDate', 'Paid Date'),
                ...f.textarea('rejectionReason', 'Rejection Reason'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        PrjExpenseEntry: f.form('Expense Entry', [
            f.section('Entry Details', [
                ...f.reference('reportId', 'Expense Report', 'PrjExpenseReport', true),
                ...f.reference('projectId', 'Project', 'PrjProject'),
                ...f.reference('taskId', 'Task', 'PrjTask'),
                ...f.reference('categoryId', 'Category', 'PrjExpenseCategory'),
                ...f.select('expenseType', 'Expense Type', enums.EXPENSE_TYPE, true),
                ...f.date('expenseDate', 'Expense Date', true),
                ...f.textarea('description', 'Description'),
                ...f.text('vendor', 'Vendor'),
                ...f.money('amount', 'Amount', true),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.money('convertedAmount', 'Converted Amount'),
                ...f.number('exchangeRate', 'Exchange Rate'),
                ...f.checkbox('isBillable', 'Billable'),
                ...f.checkbox('isReimbursable', 'Reimbursable'),
                ...f.text('receiptUrl', 'Receipt URL'),
                ...f.checkbox('receiptAttached', 'Receipt Attached'),
                ...f.text('paymentMethod', 'Payment Method')
            ])
        ]),

        PrjApprovalRule: f.form('Approval Rule', [
            f.section('Rule Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('approvalType', 'Approval Type', enums.APPROVAL_TYPE, true),
                ...f.money('thresholdAmount', 'Threshold Amount'),
                ...f.number('thresholdHours', 'Threshold Hours'),
                ...f.reference('approverId', 'Approver', 'Employee'),
                ...f.text('approverRole', 'Approver Role'),
                ...f.checkbox('requiresManagerApproval', 'Requires Manager Approval'),
                ...f.checkbox('requiresProjectManagerApproval', 'Requires PM Approval'),
                ...f.number('approvalLevels', 'Approval Levels'),
                ...f.number('priority', 'Priority'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        PrjExpenseCategory: f.form('Expense Category', [
            f.section('Category Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('parentCategoryId', 'Parent Category', 'PrjExpenseCategory'),
                ...f.text('glAccount', 'GL Account'),
                ...f.select('expenseType', 'Expense Type', enums.EXPENSE_TYPE),
                ...f.money('defaultLimit', 'Default Limit'),
                ...f.checkbox('requiresReceipt', 'Requires Receipt'),
                ...f.checkbox('isBillableDefault', 'Billable by Default'),
                ...f.checkbox('isReimbursableDefault', 'Reimbursable by Default'),
                ...f.number('sortOrder', 'Sort Order'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        PrjExpensePolicy: f.form('Expense Policy', [
            f.section('Policy Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.money('dailyMealLimit', 'Daily Meal Limit'),
                ...f.money('dailyLodgingLimit', 'Daily Lodging Limit'),
                ...f.money('mileageRate', 'Mileage Rate'),
                ...f.money('maxSingleExpense', 'Max Single Expense'),
                ...f.checkbox('receiptRequiredAbove', 'Receipt Required Above'),
                ...f.money('receiptThreshold', 'Receipt Threshold'),
                ...f.checkbox('advanceApprovalRequired', 'Advance Approval Required'),
                ...f.money('advanceApprovalThreshold', 'Advance Approval Threshold'),
                ...f.number('submissionDeadlineDays', 'Submission Deadline (Days)'),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.checkbox('isActive', 'Active')
            ])
        ])
    };

})();
