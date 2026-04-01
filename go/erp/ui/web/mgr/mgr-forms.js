/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Manager Portal Form Definitions — writable types for manager workflows.
// Read-only detail views use the HCM module forms via Layer8DFormsModal.openViewForm().
(function() {
    'use strict';

    var MGR = window.MGR = window.MGR || {};
    var f = Layer8FormFactory;
    var enums = MGR.enums;

    MGR.forms = {
        // Approve/reject leave request
        LeaveRequest: f.form('Leave Request', [
            f.section('Request Details', [
                ...f.text('employeeId', 'Employee', false),
                ...f.select('leaveType', 'Leave Type', enums.LEAVE_TYPE),
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.number('totalDays', 'Total Days'),
                ...f.select('status', 'Status', enums.LEAVE_REQUEST_STATUS, true)
            ]),
            f.section('Details', [
                ...f.textarea('reason', 'Reason'),
                ...f.textarea('managerComments', 'Manager Comments')
            ])
        ]),

        // Approve/reject timesheet
        Timesheet: f.form('Timesheet', [
            f.section('Timesheet Details', [
                ...f.text('employeeId', 'Employee', false),
                ...f.select('status', 'Status', enums.TIMESHEET_STATUS, true),
                ...f.number('totalRegularHours', 'Regular Hours'),
                ...f.number('totalOvertimeHours', 'Overtime Hours'),
                ...f.number('totalHours', 'Total Hours'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        // Edit performance reviews
        PerformanceReview: f.form('Performance Review', [
            f.section('Review Details', [
                ...f.text('employeeId', 'Employee', false),
                ...f.text('reviewPeriod', 'Review Period'),
                ...f.select('status', 'Status', enums.REVIEW_STATUS, true),
                ...f.number('overallRating', 'Overall Rating'),
                ...f.textarea('managerComments', 'Manager Comments')
            ])
        ]),

        // Edit goals
        Goal: f.form('Goal', [
            f.section('Goal Information', [
                ...f.text('employeeId', 'Employee', false),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.GOAL_STATUS, true),
                ...f.select('priority', 'Priority', enums.GOAL_PRIORITY)
            ]),
            f.section('Progress', [
                ...f.number('completionPercentage', 'Completion %'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('completedDate', 'Completed Date')
            ])
        ])
    };

    MGR.primaryKeys = {
        Employee: 'employeeId',
        Department: 'departmentId',
        LeaveRequest: 'requestId',
        Timesheet: 'timesheetId',
        PerformanceReview: 'reviewId',
        Goal: 'goalId',
        EmployeeSkill: 'employeeSkillId',
        CompensationStatement: 'statementId'
    };
})();
