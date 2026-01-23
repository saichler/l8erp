// Time & Attendance Module - Form Definitions
// Part 3 of 4 - Load after time-columns.js

(function() {
    'use strict';

    // Get enums from time-enums.js
    const enums = window.Time.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const TIME_FORMS = {
        Timesheet: {
            title: 'Timesheet',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TIMESHEET_STATUS, required: true }
                    ]
                },
                {
                    title: 'Period',
                    fields: [
                        { key: 'period.startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'period.endDate', label: 'End Date', type: 'date', required: true }
                    ]
                },
                {
                    title: 'Hours Totals',
                    fields: [
                        { key: 'totalRegularHours', label: 'Regular Hours', type: 'number' },
                        { key: 'totalOvertimeHours', label: 'Overtime Hours', type: 'number' },
                        { key: 'totalDoubleTimeHours', label: 'Double Time Hours', type: 'number' },
                        { key: 'totalPtoHours', label: 'PTO Hours', type: 'number' },
                        { key: 'totalSickHours', label: 'Sick Hours', type: 'number' },
                        { key: 'totalHolidayHours', label: 'Holiday Hours', type: 'number' },
                        { key: 'totalHours', label: 'Total Hours', type: 'number' }
                    ]
                },
                {
                    title: 'Notes',
                    fields: [
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        LeaveRequest: {
            title: 'Leave Request',
            sections: [
                {
                    title: 'Request Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'leaveType', label: 'Leave Type', type: 'select', options: enums.LEAVE_TYPE, required: true },
                        { key: 'leavePolicyId', label: 'Leave Policy', type: 'lookup', lookupModel: 'LeavePolicy' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.LEAVE_REQUEST_STATUS, required: true }
                    ]
                },
                {
                    title: 'Dates & Duration',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'totalHours', label: 'Total Hours', type: 'number' },
                        { key: 'totalDays', label: 'Total Days', type: 'number' },
                        { key: 'isPartialDay', label: 'Partial Day', type: 'checkbox' },
                        { key: 'partialDayType', label: 'Partial Day Type', type: 'text' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'reason', label: 'Reason', type: 'textarea', required: true },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        LeaveBalance: {
            title: 'Leave Balance',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'leavePolicyId', label: 'Leave Policy', type: 'lookup', lookupModel: 'LeavePolicy' },
                        { key: 'leaveType', label: 'Leave Type', type: 'select', options: enums.LEAVE_TYPE, required: true },
                        { key: 'year', label: 'Year', type: 'number', required: true }
                    ]
                },
                {
                    title: 'Balances',
                    fields: [
                        { key: 'beginningBalance', label: 'Beginning Balance', type: 'number' },
                        { key: 'accrued', label: 'Accrued', type: 'number' },
                        { key: 'used', label: 'Used', type: 'number' },
                        { key: 'pending', label: 'Pending', type: 'number' },
                        { key: 'adjusted', label: 'Adjusted', type: 'number' },
                        { key: 'forfeited', label: 'Forfeited', type: 'number' },
                        { key: 'available', label: 'Available', type: 'number' },
                        { key: 'carryover', label: 'Carryover', type: 'number' }
                    ]
                },
                {
                    title: 'Limits',
                    fields: [
                        { key: 'annualAllowance', label: 'Annual Allowance', type: 'number' },
                        { key: 'maximumAccrual', label: 'Maximum Accrual', type: 'number' },
                        { key: 'maximumCarryover', label: 'Maximum Carryover', type: 'number' }
                    ]
                }
            ]
        },

        LeavePolicy: {
            title: 'Leave Policy',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'leaveType', label: 'Leave Type', type: 'select', options: enums.LEAVE_TYPE, required: true }
                    ]
                },
                {
                    title: 'Accrual Settings',
                    fields: [
                        { key: 'accrualMethod', label: 'Accrual Method', type: 'select', options: enums.ACCRUAL_METHOD, required: true },
                        { key: 'accrualRate', label: 'Accrual Rate', type: 'number' },
                        { key: 'accrualFrequency', label: 'Accrual Frequency', type: 'select', options: enums.ACCRUAL_FREQUENCY },
                        { key: 'maximumAccrual', label: 'Maximum Accrual', type: 'number' }
                    ]
                },
                {
                    title: 'Carryover',
                    fields: [
                        { key: 'allowCarryover', label: 'Allow Carryover', type: 'checkbox' },
                        { key: 'maximumCarryover', label: 'Maximum Carryover', type: 'number' },
                        { key: 'carryoverExpirationDate', label: 'Carryover Expiration', type: 'date' }
                    ]
                },
                {
                    title: 'Usage Rules',
                    fields: [
                        { key: 'minimumIncrement', label: 'Minimum Increment (hours)', type: 'number' },
                        { key: 'advanceNoticeDays', label: 'Advance Notice (days)', type: 'number' },
                        { key: 'requireApproval', label: 'Require Approval', type: 'checkbox' },
                        { key: 'allowNegativeBalance', label: 'Allow Negative Balance', type: 'checkbox' },
                        { key: 'waitingPeriodDays', label: 'Waiting Period (days)', type: 'number' }
                    ]
                },
                {
                    title: 'Effective Dates',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        Shift: {
            title: 'Shift',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'shiftType', label: 'Shift Type', type: 'select', options: enums.SHIFT_TYPE, required: true },
                        { key: 'colorCode', label: 'Color Code', type: 'text' }
                    ]
                },
                {
                    title: 'Schedule',
                    fields: [
                        { key: 'startTime', label: 'Start Time', type: 'time' },
                        { key: 'endTime', label: 'End Time', type: 'time' },
                        { key: 'durationHours', label: 'Duration (hours)', type: 'number' },
                        { key: 'breakDurationMinutes', label: 'Break Duration (minutes)', type: 'number' },
                        { key: 'isOvernight', label: 'Overnight', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Status',
                    fields: [
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        Schedule: {
            title: 'Schedule',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.SCHEDULE_STATUS, required: true }
                    ]
                },
                {
                    title: 'Period',
                    fields: [
                        { key: 'period.startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'period.endDate', label: 'End Date', type: 'date', required: true }
                    ]
                },
                {
                    title: 'Hours',
                    fields: [
                        { key: 'totalScheduledHours', label: 'Total Scheduled Hours', type: 'number' }
                    ]
                }
            ]
        },

        Holiday: {
            title: 'Holiday',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'date', label: 'Date', type: 'date', required: true },
                        { key: 'year', label: 'Year', type: 'number', required: true },
                        { key: 'holidayType', label: 'Holiday Type', type: 'select', options: enums.HOLIDAY_TYPE, required: true }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'isPaid', label: 'Paid Holiday', type: 'checkbox' },
                        { key: 'hoursCredited', label: 'Hours Credited', type: 'number' },
                        { key: 'isRecurring', label: 'Recurring', type: 'checkbox' },
                        { key: 'recurrenceRule', label: 'Recurrence Rule', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        Absence: {
            title: 'Absence',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'leaveRequestId', label: 'Leave Request', type: 'lookup', lookupModel: 'LeaveRequest' },
                        { key: 'date', label: 'Date', type: 'date', required: true },
                        { key: 'absenceType', label: 'Absence Type', type: 'select', options: enums.LEAVE_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ABSENCE_STATUS, required: true }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'hours', label: 'Hours', type: 'number', required: true },
                        { key: 'isPartialDay', label: 'Partial Day', type: 'checkbox' },
                        { key: 'isPaid', label: 'Paid', type: 'checkbox' },
                        { key: 'payComponentId', label: 'Pay Component', type: 'lookup', lookupModel: 'PayComponent' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    const TIME_PRIMARY_KEYS = {
        Timesheet: 'timesheetId',
        LeaveRequest: 'requestId',
        LeaveBalance: 'balanceId',
        LeavePolicy: 'policyId',
        Shift: 'shiftId',
        Schedule: 'scheduleId',
        Holiday: 'holidayId',
        Absence: 'absenceId'
    };

    // ============================================================================
    // EXPORT FORMS TO NAMESPACE
    // ============================================================================

    window.Time.forms = TIME_FORMS;
    window.Time.primaryKeys = TIME_PRIMARY_KEYS;

})();
