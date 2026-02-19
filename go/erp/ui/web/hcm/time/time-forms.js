/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Time & Attendance Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = window.Time.enums;

    window.Time.forms = {
        Timesheet: f.form('Timesheet', [
            f.section('Basic Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.select('status', 'Status', enums.TIMESHEET_STATUS, true),
                ...f.date('period.startDate', 'Period Start'),
                ...f.date('period.endDate', 'Period End'),
                ...f.date('submittedDate', 'Submitted Date'),
                ...f.text('submittedBy', 'Submitted By'),
                ...f.text('approvedBy', 'Approved By'),
                ...f.date('approvedDate', 'Approved Date'),
                ...f.text('rejectedBy', 'Rejected By'),
                ...f.date('rejectedDate', 'Rejected Date'),
                ...f.text('rejectionReason', 'Rejection Reason'),
            ]),
            f.section('Period', [
                ...f.date('period.startDate', 'Start Date', true),
                ...f.date('period.endDate', 'End Date', true)
            ]),
            f.section('Hours Totals', [
                ...f.number('totalRegularHours', 'Regular Hours'),
                ...f.number('totalOvertimeHours', 'Overtime Hours'),
                ...f.number('totalDoubleTimeHours', 'Double Time Hours'),
                ...f.number('totalPtoHours', 'PTO Hours'),
                ...f.number('totalSickHours', 'Sick Hours'),
                ...f.number('totalHolidayHours', 'Holiday Hours'),
                ...f.number('totalHours', 'Total Hours')
            ]),
            f.section('Notes', [
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        LeaveRequest: f.form('Leave Request', [
            f.section('Request Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.select('leaveType', 'Leave Type', enums.LEAVE_TYPE, true),
                ...f.reference('leavePolicyId', 'Leave Policy', 'LeavePolicy'),
                ...f.select('status', 'Status', enums.LEAVE_REQUEST_STATUS, true),
                ...f.date('submittedDate', 'Submitted Date'),
                ...f.text('approverId', 'Approver'),
                ...f.text('approvedBy', 'Approved By'),
                ...f.date('approvedDate', 'Approved Date'),
                ...f.text('rejectionReason', 'Rejection Reason'),
                ...f.text('documentIds', 'Document Ids'),
            ]),
            f.section('Dates & Duration', [
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.number('totalHours', 'Total Hours'),
                ...f.number('totalDays', 'Total Days'),
                ...f.checkbox('isPartialDay', 'Partial Day'),
                ...f.text('partialDayType', 'Partial Day Type')
            ]),
            f.section('Details', [
                ...f.textarea('reason', 'Reason', true),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        LeaveBalance: f.form('Leave Balance', [
            f.section('Basic Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('leavePolicyId', 'Leave Policy', 'LeavePolicy'),
                ...f.select('leaveType', 'Leave Type', enums.LEAVE_TYPE, true),
                ...f.number('year', 'Year', true),
                ...f.date('lastAccrualDate', 'Last Accrual Date'),
                ...f.date('nextAccrualDate', 'Next Accrual Date'),
            ]),
            f.section('Balances', [
                ...f.number('beginningBalance', 'Beginning Balance'),
                ...f.number('accrued', 'Accrued'),
                ...f.number('used', 'Used'),
                ...f.number('pending', 'Pending'),
                ...f.number('adjusted', 'Adjusted'),
                ...f.number('forfeited', 'Forfeited'),
                ...f.number('available', 'Available'),
                ...f.number('carryover', 'Carryover')
            ]),
            f.section('Limits', [
                ...f.number('annualAllowance', 'Annual Allowance'),
                ...f.number('maximumAccrual', 'Maximum Accrual'),
                ...f.number('maximumCarryover', 'Maximum Carryover')
            ])
        ]),

        LeavePolicy: f.form('Leave Policy', [
            f.section('Basic Information', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('leaveType', 'Leave Type', enums.LEAVE_TYPE, true)
            ]),
            f.section('Accrual Settings', [
                ...f.select('accrualMethod', 'Accrual Method', enums.ACCRUAL_METHOD, true),
                ...f.number('accrualRate', 'Accrual Rate'),
                ...f.select('accrualFrequency', 'Accrual Frequency', enums.ACCRUAL_FREQUENCY),
                ...f.number('maximumAccrual', 'Maximum Accrual')
            ]),
            f.section('Carryover', [
                ...f.checkbox('allowCarryover', 'Allow Carryover'),
                ...f.number('maximumCarryover', 'Maximum Carryover'),
                ...f.date('carryoverExpirationDate', 'Carryover Expiration')
            ]),
            f.section('Usage Rules', [
                ...f.number('minimumIncrement', 'Minimum Increment (hours)'),
                ...f.number('advanceNoticeDays', 'Advance Notice (days)'),
                ...f.checkbox('requireApproval', 'Require Approval'),
                ...f.checkbox('allowNegativeBalance', 'Allow Negative Balance'),
                ...f.number('waitingPeriodDays', 'Waiting Period (days)')
            ]),
            f.section('Effective Dates', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        Shift: f.form('Shift', [
            f.section('Basic Information', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('shiftType', 'Shift Type', enums.SHIFT_TYPE, true),
                ...f.text('colorCode', 'Color Code'),
                ...f.money('shiftDifferential', 'Shift Differential'),
            ]),
            f.section('Schedule', [
                ...f.text('startTime', 'Start Time'),
                ...f.text('endTime', 'End Time'),
                ...f.number('durationHours', 'Duration (hours)'),
                ...f.number('breakDurationMinutes', 'Break Duration (minutes)'),
                ...f.checkbox('isOvernight', 'Overnight')
            ]),
            f.section('Status', [
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        Schedule: f.form('Schedule', [
            f.section('Basic Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.select('status', 'Status', enums.SCHEDULE_STATUS, true),
                ...f.date('period.startDate', 'Period Start'),
                ...f.date('period.endDate', 'Period End'),
                ...f.text('publishedBy', 'Published By'),
                ...f.date('publishedDate', 'Published Date'),
            ]),
            f.section('Period', [
                ...f.date('period.startDate', 'Start Date', true),
                ...f.date('period.endDate', 'End Date', true)
            ]),
            f.section('Hours', [
                ...f.number('totalScheduledHours', 'Total Scheduled Hours')
            ])
        ]),

        Holiday: f.form('Holiday', [
            f.section('Basic Information', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.text('name', 'Name', true),
                ...f.date('date', 'Date', true),
                ...f.number('year', 'Year', true),
                ...f.select('holidayType', 'Holiday Type', enums.HOLIDAY_TYPE, true),
                ...f.text('applicableLocationIds', 'Applicable Location Ids'),
            ]),
            f.section('Details', [
                ...f.checkbox('isPaid', 'Paid Holiday'),
                ...f.number('hoursCredited', 'Hours Credited'),
                ...f.checkbox('isRecurring', 'Recurring'),
                ...f.text('recurrenceRule', 'Recurrence Rule'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        Absence: f.form('Absence', [
            f.section('Basic Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('leaveRequestId', 'Leave Request', 'LeaveRequest'),
                ...f.date('date', 'Date', true),
                ...f.select('absenceType', 'Absence Type', enums.LEAVE_TYPE, true),
                ...f.select('status', 'Status', enums.ABSENCE_STATUS, true)
            ]),
            f.section('Details', [
                ...f.number('hours', 'Hours', true),
                ...f.checkbox('isPartialDay', 'Partial Day'),
                ...f.checkbox('isPaid', 'Paid'),
                ...f.reference('payComponentId', 'Pay Component', 'PayComponent'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    window.Time.primaryKeys = {
        Timesheet: 'timesheetId',
        LeaveRequest: 'requestId',
        LeaveBalance: 'balanceId',
        LeavePolicy: 'policyId',
        Shift: 'shiftId',
        Schedule: 'scheduleId',
        Holiday: 'holidayId',
        Absence: 'absenceId'
    };

})();
