/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Projects Time & Expense Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.PrjTimeExpense = window.PrjTimeExpense || {};

    const f = window.Layer8FormFactory;
    const enums = PrjTimeExpense.enums;

    PrjTimeExpense.forms = {
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
            ]),
            f.section('Time Entries', [
                ...f.inlineTable('entries', 'Time Entries', [
                    { key: 'entryId', label: 'Entry ID', hidden: true },
                    { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                    { key: 'taskId', label: 'Task', type: 'text' },
                    { key: 'workDate', label: 'Work Date', type: 'date', required: true },
                    { key: 'hours', label: 'Hours', type: 'number', required: true },
                    { key: 'isBillable', label: 'Billable', type: 'checkbox' },
                    { key: 'description', label: 'Description', type: 'text' }
                ])
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
            ]),
            f.section('Expense Entries', [
                ...f.inlineTable('entries', 'Expense Entries', [
                    { key: 'entryId', label: 'Entry ID', hidden: true },
                    { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject' },
                    { key: 'expenseType', label: 'Type', type: 'select', options: enums.EXPENSE_TYPE, required: true },
                    { key: 'expenseDate', label: 'Date', type: 'date', required: true },
                    { key: 'amount', label: 'Amount', type: 'money', required: true },
                    { key: 'isBillable', label: 'Billable', type: 'checkbox' },
                    { key: 'description', label: 'Description', type: 'text' }
                ])
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

    PrjTimeExpense.primaryKeys = {
        PrjTimesheet: 'timesheetId',
        PrjExpenseReport: 'reportId',
        PrjApprovalRule: 'ruleId',
        PrjExpenseCategory: 'categoryId',
        PrjExpensePolicy: 'policyId'
    };

})();
