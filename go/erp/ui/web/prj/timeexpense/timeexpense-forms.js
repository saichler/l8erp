/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// Projects Time & Expense Module - Form Definitions

(function() {
    'use strict';

    window.PrjTimeExpense = window.PrjTimeExpense || {};

    const enums = PrjTimeExpense.enums;

    PrjTimeExpense.forms = {
        PrjTimesheet: {
            title: 'Timesheet',
            sections: [
                {
                    title: 'Timesheet Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'weekStartDate', label: 'Period Start', type: 'date', required: true },
                        { key: 'weekEndDate', label: 'Period End', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TIMESHEET_STATUS },
                        { key: 'totalHours', label: 'Total Hours', type: 'number' },
                        { key: 'billableHours', label: 'Billable Hours', type: 'number' },
                        { key: 'nonBillableHours', label: 'Non-Billable Hours', type: 'number' },
                        { key: 'submittedDate', label: 'Submitted Date', type: 'date' },
                        { key: 'submittedBy', label: 'Submitted By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'approvedDate', label: 'Approved Date', type: 'date' },
                        { key: 'approvedBy', label: 'Approved By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'rejectionReason', label: 'Rejection Reason', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        PrjTimesheetEntry: {
            title: 'Timesheet Entry',
            sections: [
                {
                    title: 'Entry Details',
                    fields: [
                        { key: 'timesheetId', label: 'Timesheet', type: 'reference', lookupModel: 'PrjTimesheet', required: true },
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'taskId', label: 'Task', type: 'reference', lookupModel: 'PrjTask' },
                        { key: 'phaseId', label: 'Phase', type: 'reference', lookupModel: 'PrjPhase' },
                        { key: 'workDate', label: 'Work Date', type: 'date', required: true },
                        { key: 'hours', label: 'Hours', type: 'number', required: true },
                        { key: 'isBillable', label: 'Billable', type: 'checkbox' },
                        { key: 'billingRate', label: 'Billing Rate', type: 'money' },
                        { key: 'billingAmount', label: 'Billing Amount', type: 'money' },
                        { key: 'activityType', label: 'Activity Type', type: 'text' },
                        { key: 'isOvertime', label: 'Overtime', type: 'checkbox' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        PrjExpenseReport: {
            title: 'Expense Report',
            sections: [
                {
                    title: 'Report Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject' },
                        { key: 'reportNumber', label: 'Report Number', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.EXPENSE_STATUS },
                        { key: 'totalAmount', label: 'Total Amount', type: 'money' },
                        { key: 'approvedAmount', label: 'Approved Amount', type: 'money' },
                        { key: 'reimbursedAmount', label: 'Reimbursed Amount', type: 'money' },
                        { key: 'submitDate', label: 'Submit Date', type: 'date' },
                        { key: 'approvedDate', label: 'Approved Date', type: 'date' },
                        { key: 'approvedBy', label: 'Approved By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'paidDate', label: 'Paid Date', type: 'date' },
                        { key: 'rejectionReason', label: 'Rejection Reason', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        PrjExpenseEntry: {
            title: 'Expense Entry',
            sections: [
                {
                    title: 'Entry Details',
                    fields: [
                        { key: 'reportId', label: 'Expense Report', type: 'reference', lookupModel: 'PrjExpenseReport', required: true },
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject' },
                        { key: 'taskId', label: 'Task', type: 'reference', lookupModel: 'PrjTask' },
                        { key: 'categoryId', label: 'Category', type: 'reference', lookupModel: 'PrjExpenseCategory' },
                        { key: 'expenseType', label: 'Expense Type', type: 'select', options: enums.EXPENSE_TYPE, required: true },
                        { key: 'expenseDate', label: 'Expense Date', type: 'date', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'vendor', label: 'Vendor', type: 'text' },
                        { key: 'amount', label: 'Amount', type: 'money', required: true },
                        { key: 'currencyCode', label: 'Currency Code', type: 'text' },
                        { key: 'convertedAmount', label: 'Converted Amount', type: 'money' },
                        { key: 'exchangeRate', label: 'Exchange Rate', type: 'number' },
                        { key: 'isBillable', label: 'Billable', type: 'checkbox' },
                        { key: 'isReimbursable', label: 'Reimbursable', type: 'checkbox' },
                        { key: 'receiptUrl', label: 'Receipt URL', type: 'text' },
                        { key: 'receiptAttached', label: 'Receipt Attached', type: 'checkbox' },
                        { key: 'paymentMethod', label: 'Payment Method', type: 'text' }
                    ]
                }
            ]
        },

        PrjApprovalRule: {
            title: 'Approval Rule',
            sections: [
                {
                    title: 'Rule Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'approvalType', label: 'Approval Type', type: 'select', options: enums.APPROVAL_TYPE, required: true },
                        { key: 'thresholdAmount', label: 'Threshold Amount', type: 'money' },
                        { key: 'thresholdHours', label: 'Threshold Hours', type: 'number' },
                        { key: 'approverId', label: 'Approver', type: 'reference', lookupModel: 'Employee' },
                        { key: 'approverRole', label: 'Approver Role', type: 'text' },
                        { key: 'requiresManagerApproval', label: 'Requires Manager Approval', type: 'checkbox' },
                        { key: 'requiresProjectManagerApproval', label: 'Requires PM Approval', type: 'checkbox' },
                        { key: 'approvalLevels', label: 'Approval Levels', type: 'number' },
                        { key: 'priority', label: 'Priority', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjExpenseCategory: {
            title: 'Expense Category',
            sections: [
                {
                    title: 'Category Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'parentCategoryId', label: 'Parent Category', type: 'reference', lookupModel: 'PrjExpenseCategory' },
                        { key: 'glAccount', label: 'GL Account', type: 'text' },
                        { key: 'expenseType', label: 'Expense Type', type: 'select', options: enums.EXPENSE_TYPE },
                        { key: 'defaultLimit', label: 'Default Limit', type: 'money' },
                        { key: 'requiresReceipt', label: 'Requires Receipt', type: 'checkbox' },
                        { key: 'isBillableDefault', label: 'Billable by Default', type: 'checkbox' },
                        { key: 'isReimbursableDefault', label: 'Reimbursable by Default', type: 'checkbox' },
                        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjExpensePolicy: {
            title: 'Expense Policy',
            sections: [
                {
                    title: 'Policy Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'dailyMealLimit', label: 'Daily Meal Limit', type: 'money' },
                        { key: 'dailyLodgingLimit', label: 'Daily Lodging Limit', type: 'money' },
                        { key: 'mileageRate', label: 'Mileage Rate', type: 'money' },
                        { key: 'maxSingleExpense', label: 'Max Single Expense', type: 'money' },
                        { key: 'receiptRequiredAbove', label: 'Receipt Required Above', type: 'checkbox' },
                        { key: 'receiptThreshold', label: 'Receipt Threshold', type: 'money' },
                        { key: 'advanceApprovalRequired', label: 'Advance Approval Required', type: 'checkbox' },
                        { key: 'advanceApprovalThreshold', label: 'Advance Approval Threshold', type: 'money' },
                        { key: 'submissionDeadlineDays', label: 'Submission Deadline (Days)', type: 'number' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

    PrjTimeExpense.primaryKeys = {
        PrjTimesheet: 'timesheetId',
        PrjTimesheetEntry: 'entryId',
        PrjExpenseReport: 'reportId',
        PrjExpenseEntry: 'entryId',
        PrjApprovalRule: 'ruleId',
        PrjExpenseCategory: 'categoryId',
        PrjExpensePolicy: 'policyId'
    };

})();
