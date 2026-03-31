/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// ESS Portal Form Definitions — only writable types need ESS-specific forms.
// Read-only detail views use the HCM module forms via Layer8DFormsModal.openViewForm().
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};
    var f = Layer8FormFactory;
    var enums = ESS.enums;

    ESS.forms = {
        // Submit a new leave request
        LeaveRequest: f.form('Leave Request', [
            f.section('Request Details', [
                ...f.select('leaveType', 'Leave Type', enums.LEAVE_TYPE, true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.number('totalDays', 'Total Days'),
                ...f.checkbox('isPartialDay', 'Partial Day')
            ]),
            f.section('Details', [
                ...f.textarea('reason', 'Reason', true),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        // Update goal progress
        Goal: f.form('Goal', [
            f.section('Goal Information', [
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
        ]),

        // Submit a timesheet
        Timesheet: f.form('Timesheet', [
            f.section('Timesheet Details', [
                ...f.select('status', 'Status', enums.TIMESHEET_STATUS),
                ...f.number('totalRegularHours', 'Regular Hours'),
                ...f.number('totalOvertimeHours', 'Overtime Hours'),
                ...f.number('totalHours', 'Total Hours'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    ESS.primaryKeys = {
        LeaveRequest: 'requestId',
        Goal: 'goalId',
        Timesheet: 'timesheetId',
        Employee: 'employeeId',
        Payslip: 'payslipId',
        YearEndDocument: 'documentId',
        DirectDeposit: 'directDepositId',
        CompensationStatement: 'statementId',
        LeaveBalance: 'balanceId',
        Holiday: 'holidayId',
        BenefitEnrollment: 'enrollmentId',
        BenefitPlan: 'planId',
        Dependent: 'dependentId',
        PerformanceReview: 'reviewId',
        EmployeeSkill: 'employeeSkillId',
        TrainingRecord: 'recordId',
        EmployeeCertification: 'employeeCertificationId',
        CourseEnrollment: 'enrollmentId',
        EmployeeDocument: 'documentId'
    };
})();
