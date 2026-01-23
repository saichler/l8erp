// Time & Attendance Module - Column Configurations and Form Definitions
// Handles: Timesheet, LeaveRequest, LeaveBalance, LeavePolicy, Shift, Schedule, Holiday, Absence

(function() {
    'use strict';

    // Import shared utilities
    const { escapeHtml, formatDate } = ERPUtils;
    const { renderEnum, createStatusRenderer, renderBoolean, renderDate, renderMoney } = ERPRenderers;

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const TIMESHEET_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Submitted',
        3: 'Approved',
        4: 'Rejected',
        5: 'Processed'
    };

    const TIMESHEET_STATUS_VALUES = {
        'draft': 1,
        'submitted': 2,
        'approved': 3,
        'rejected': 4,
        'processed': 5
    };

    const TIMESHEET_STATUS_CLASSES = {
        1: 'erp-status-inactive',
        2: 'erp-status-pending',
        3: 'erp-status-active',
        4: 'erp-status-terminated',
        5: 'erp-status-active'
    };

    const TIME_ENTRY_TYPE = {
        0: 'Unspecified',
        1: 'Regular',
        2: 'Overtime',
        3: 'Double Time',
        4: 'PTO',
        5: 'Sick',
        6: 'Holiday',
        7: 'Bereavement',
        8: 'Jury Duty',
        9: 'Training',
        10: 'Unpaid',
        11: 'On-Call',
        12: 'Travel'
    };

    const TIME_ENTRY_TYPE_VALUES = {
        'regular': 1,
        'overtime': 2,
        'double': 3,
        'pto': 4,
        'sick': 5,
        'holiday': 6,
        'bereavement': 7,
        'jury': 8,
        'training': 9,
        'unpaid': 10,
        'oncall': 11,
        'on-call': 11,
        'travel': 12
    };

    const TIME_ENTRY_SOURCE = {
        0: 'Unspecified',
        1: 'Manual',
        2: 'Time Clock',
        3: 'Mobile',
        4: 'Badge',
        5: 'Biometric',
        6: 'Import'
    };

    const TIME_ENTRY_SOURCE_VALUES = {
        'manual': 1,
        'clock': 2,
        'mobile': 3,
        'badge': 4,
        'biometric': 5,
        'import': 6
    };

    const LEAVE_TYPE = {
        0: 'Unspecified',
        1: 'PTO',
        2: 'Vacation',
        3: 'Sick',
        4: 'Personal',
        5: 'Bereavement',
        6: 'Jury Duty',
        7: 'Military',
        8: 'FMLA',
        9: 'Parental',
        10: 'Maternity',
        11: 'Paternity',
        12: 'Sabbatical',
        13: 'Unpaid',
        14: 'Administrative',
        15: 'Volunteer'
    };

    const LEAVE_TYPE_VALUES = {
        'pto': 1,
        'vacation': 2,
        'sick': 3,
        'personal': 4,
        'bereavement': 5,
        'jury': 6,
        'military': 7,
        'fmla': 8,
        'parental': 9,
        'maternity': 10,
        'paternity': 11,
        'sabbatical': 12,
        'unpaid': 13,
        'administrative': 14,
        'volunteer': 15
    };

    const LEAVE_REQUEST_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Pending',
        3: 'Approved',
        4: 'Rejected',
        5: 'Cancelled',
        6: 'Taken'
    };

    const LEAVE_REQUEST_STATUS_VALUES = {
        'draft': 1,
        'pending': 2,
        'approved': 3,
        'rejected': 4,
        'cancelled': 5,
        'taken': 6
    };

    const LEAVE_REQUEST_STATUS_CLASSES = {
        1: 'erp-status-inactive',
        2: 'erp-status-pending',
        3: 'erp-status-active',
        4: 'erp-status-terminated',
        5: 'erp-status-terminated',
        6: 'erp-status-active'
    };

    const ACCRUAL_METHOD = {
        0: 'Unspecified',
        1: 'Fixed',
        2: 'Hours Worked',
        3: 'Tenure Based',
        4: 'Front Loaded'
    };

    const ACCRUAL_METHOD_VALUES = {
        'fixed': 1,
        'hours': 2,
        'worked': 2,
        'tenure': 3,
        'front': 4,
        'loaded': 4
    };

    const ACCRUAL_FREQUENCY = {
        0: 'Unspecified',
        1: 'Per Pay Period',
        2: 'Monthly',
        3: 'Quarterly',
        4: 'Annually',
        5: 'Anniversary'
    };

    const ACCRUAL_FREQUENCY_VALUES = {
        'pay': 1,
        'period': 1,
        'monthly': 2,
        'quarterly': 3,
        'annually': 4,
        'annual': 4,
        'anniversary': 5
    };

    const SHIFT_TYPE = {
        0: 'Unspecified',
        1: 'Day',
        2: 'Evening',
        3: 'Night',
        4: 'Overnight',
        5: 'Rotating',
        6: 'Split',
        7: 'On-Call'
    };

    const SHIFT_TYPE_VALUES = {
        'day': 1,
        'evening': 2,
        'night': 3,
        'overnight': 4,
        'rotating': 5,
        'split': 6,
        'oncall': 7,
        'on-call': 7
    };

    const SCHEDULE_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Published',
        3: 'Archived'
    };

    const SCHEDULE_STATUS_VALUES = {
        'draft': 1,
        'published': 2,
        'archived': 3
    };

    const SCHEDULE_STATUS_CLASSES = {
        1: 'erp-status-inactive',
        2: 'erp-status-active',
        3: 'erp-status-inactive'
    };

    const HOLIDAY_TYPE = {
        0: 'Unspecified',
        1: 'Fixed',
        2: 'Floating',
        3: 'Personal',
        4: 'Observed'
    };

    const HOLIDAY_TYPE_VALUES = {
        'fixed': 1,
        'floating': 2,
        'personal': 3,
        'observed': 4
    };

    const ABSENCE_STATUS = {
        0: 'Unspecified',
        1: 'Scheduled',
        2: 'Taken',
        3: 'Cancelled'
    };

    const ABSENCE_STATUS_VALUES = {
        'scheduled': 1,
        'taken': 2,
        'cancelled': 3
    };

    const ABSENCE_STATUS_CLASSES = {
        1: 'erp-status-pending',
        2: 'erp-status-active',
        3: 'erp-status-terminated'
    };

    // ============================================================================
    // STATUS RENDERERS (using shared factory)
    // ============================================================================

    const renderTimesheetStatus = createStatusRenderer(TIMESHEET_STATUS, TIMESHEET_STATUS_CLASSES);
    const renderLeaveRequestStatus = createStatusRenderer(LEAVE_REQUEST_STATUS, LEAVE_REQUEST_STATUS_CLASSES);
    const renderScheduleStatus = createStatusRenderer(SCHEDULE_STATUS, SCHEDULE_STATUS_CLASSES);
    const renderAbsenceStatus = createStatusRenderer(ABSENCE_STATUS, ABSENCE_STATUS_CLASSES);

    // ============================================================================
    // MODULE-SPECIFIC RENDER HELPERS
    // ============================================================================

    function renderShiftType(type) {
        const shiftColors = {
            1: '#10b981',  // Day - green
            2: '#f59e0b',  // Evening - amber
            3: '#6366f1',  // Night - indigo
            4: '#8b5cf6',  // Overnight - purple
            5: '#06b6d4',  // Rotating - cyan
            6: '#ec4899',  // Split - pink
            7: '#ef4444'   // On-Call - red
        };
        const label = SHIFT_TYPE[type] || 'Unknown';
        const color = shiftColors[type] || '#64748b';
        return `<span style="color: ${color}; font-weight: 500;">${escapeHtml(label)}</span>`;
    }

    function renderHoursTime(hours) {
        if (hours === null || hours === undefined) return '-';
        return `${hours.toFixed(2)} hrs`;
    }

    function renderTimePeriod(period) {
        if (!period) return '-';
        const start = period.startDate ? formatDate(period.startDate) : '?';
        const end = period.endDate ? formatDate(period.endDate) : '?';
        return `${start} - ${end}`;
    }

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    const TIME_COLUMNS = {
        Timesheet: [
            { key: 'timesheetId', label: 'ID', sortKey: 'timesheetId', filterKey: 'timesheetId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'period',
                label: 'Period',
                render: (item) => renderTimePeriod(item.period)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: TIMESHEET_STATUS_VALUES,
                render: (item) => renderTimesheetStatus(item.status)
            },
            {
                key: 'totalRegularHours',
                label: 'Regular',
                sortKey: 'totalRegularHours',
                render: (item) => renderHoursTime(item.totalRegularHours)
            },
            {
                key: 'totalOvertimeHours',
                label: 'Overtime',
                sortKey: 'totalOvertimeHours',
                render: (item) => renderHoursTime(item.totalOvertimeHours)
            },
            {
                key: 'totalHours',
                label: 'Total Hours',
                sortKey: 'totalHours',
                render: (item) => renderHoursTime(item.totalHours)
            }
        ],

        LeaveRequest: [
            { key: 'requestId', label: 'ID', sortKey: 'requestId', filterKey: 'requestId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'leaveType',
                label: 'Leave Type',
                sortKey: 'leaveType',
                filterKey: 'leaveType',
                enumValues: LEAVE_TYPE_VALUES,
                render: (item) => renderEnum(item.leaveType, LEAVE_TYPE)
            },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End Date',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            {
                key: 'totalHours',
                label: 'Hours',
                sortKey: 'totalHours',
                render: (item) => renderHoursTime(item.totalHours)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: LEAVE_REQUEST_STATUS_VALUES,
                render: (item) => renderLeaveRequestStatus(item.status)
            }
        ],

        LeaveBalance: [
            { key: 'balanceId', label: 'ID', sortKey: 'balanceId', filterKey: 'balanceId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'leaveType',
                label: 'Leave Type',
                sortKey: 'leaveType',
                filterKey: 'leaveType',
                enumValues: LEAVE_TYPE_VALUES,
                render: (item) => renderEnum(item.leaveType, LEAVE_TYPE)
            },
            { key: 'year', label: 'Year', sortKey: 'year', filterKey: 'year' },
            {
                key: 'accrued',
                label: 'Accrued',
                sortKey: 'accrued',
                render: (item) => renderHoursTime(item.accrued)
            },
            {
                key: 'used',
                label: 'Used',
                sortKey: 'used',
                render: (item) => renderHoursTime(item.used)
            },
            {
                key: 'available',
                label: 'Available',
                sortKey: 'available',
                render: (item) => renderHoursTime(item.available)
            }
        ],

        LeavePolicy: [
            { key: 'policyId', label: 'ID', sortKey: 'policyId', filterKey: 'policyId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'leaveType',
                label: 'Leave Type',
                sortKey: 'leaveType',
                filterKey: 'leaveType',
                enumValues: LEAVE_TYPE_VALUES,
                render: (item) => renderEnum(item.leaveType, LEAVE_TYPE)
            },
            {
                key: 'accrualMethod',
                label: 'Accrual Method',
                sortKey: 'accrualMethod',
                filterKey: 'accrualMethod',
                enumValues: ACCRUAL_METHOD_VALUES,
                render: (item) => renderEnum(item.accrualMethod, ACCRUAL_METHOD)
            },
            {
                key: 'accrualRate',
                label: 'Accrual Rate',
                sortKey: 'accrualRate',
                render: (item) => renderHoursTime(item.accrualRate)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        Shift: [
            { key: 'shiftId', label: 'ID', sortKey: 'shiftId', filterKey: 'shiftId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'shiftType',
                label: 'Type',
                sortKey: 'shiftType',
                filterKey: 'shiftType',
                enumValues: SHIFT_TYPE_VALUES,
                render: (item) => renderShiftType(item.shiftType)
            },
            {
                key: 'durationHours',
                label: 'Duration',
                sortKey: 'durationHours',
                render: (item) => renderHoursTime(item.durationHours)
            },
            {
                key: 'breakDurationMinutes',
                label: 'Break',
                sortKey: 'breakDurationMinutes',
                render: (item) => item.breakDurationMinutes ? `${item.breakDurationMinutes} min` : '-'
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        Schedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'period',
                label: 'Period',
                render: (item) => renderTimePeriod(item.period)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: SCHEDULE_STATUS_VALUES,
                render: (item) => renderScheduleStatus(item.status)
            },
            {
                key: 'totalScheduledHours',
                label: 'Scheduled Hours',
                sortKey: 'totalScheduledHours',
                render: (item) => renderHoursTime(item.totalScheduledHours)
            },
            {
                key: 'publishedDate',
                label: 'Published',
                sortKey: 'publishedDate',
                render: (item) => renderDate(item.publishedDate)
            }
        ],

        Holiday: [
            { key: 'holidayId', label: 'ID', sortKey: 'holidayId', filterKey: 'holidayId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'date',
                label: 'Date',
                sortKey: 'date',
                render: (item) => renderDate(item.date)
            },
            { key: 'year', label: 'Year', sortKey: 'year', filterKey: 'year' },
            {
                key: 'holidayType',
                label: 'Type',
                sortKey: 'holidayType',
                filterKey: 'holidayType',
                enumValues: HOLIDAY_TYPE_VALUES,
                render: (item) => renderEnum(item.holidayType, HOLIDAY_TYPE)
            },
            {
                key: 'isPaid',
                label: 'Paid',
                sortKey: 'isPaid',
                render: (item) => renderBoolean(item.isPaid)
            },
            {
                key: 'hoursCredited',
                label: 'Hours',
                sortKey: 'hoursCredited',
                render: (item) => renderHoursTime(item.hoursCredited)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        Absence: [
            { key: 'absenceId', label: 'ID', sortKey: 'absenceId', filterKey: 'absenceId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'date',
                label: 'Date',
                sortKey: 'date',
                render: (item) => renderDate(item.date)
            },
            {
                key: 'absenceType',
                label: 'Type',
                sortKey: 'absenceType',
                filterKey: 'absenceType',
                enumValues: LEAVE_TYPE_VALUES,
                render: (item) => renderEnum(item.absenceType, LEAVE_TYPE)
            },
            {
                key: 'hours',
                label: 'Hours',
                sortKey: 'hours',
                render: (item) => renderHoursTime(item.hours)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: ABSENCE_STATUS_VALUES,
                render: (item) => renderAbsenceStatus(item.status)
            },
            {
                key: 'isPaid',
                label: 'Paid',
                sortKey: 'isPaid',
                render: (item) => renderBoolean(item.isPaid)
            }
        ]
    };

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
                        { key: 'status', label: 'Status', type: 'select', options: TIMESHEET_STATUS, required: true }
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
                        { key: 'leaveType', label: 'Leave Type', type: 'select', options: LEAVE_TYPE, required: true },
                        { key: 'leavePolicyId', label: 'Leave Policy', type: 'lookup', lookupModel: 'LeavePolicy' },
                        { key: 'status', label: 'Status', type: 'select', options: LEAVE_REQUEST_STATUS, required: true }
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
                        { key: 'leaveType', label: 'Leave Type', type: 'select', options: LEAVE_TYPE, required: true },
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
                        { key: 'leaveType', label: 'Leave Type', type: 'select', options: LEAVE_TYPE, required: true }
                    ]
                },
                {
                    title: 'Accrual Settings',
                    fields: [
                        { key: 'accrualMethod', label: 'Accrual Method', type: 'select', options: ACCRUAL_METHOD, required: true },
                        { key: 'accrualRate', label: 'Accrual Rate', type: 'number' },
                        { key: 'accrualFrequency', label: 'Accrual Frequency', type: 'select', options: ACCRUAL_FREQUENCY },
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
                        { key: 'shiftType', label: 'Shift Type', type: 'select', options: SHIFT_TYPE, required: true },
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
                        { key: 'status', label: 'Status', type: 'select', options: SCHEDULE_STATUS, required: true }
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
                        { key: 'holidayType', label: 'Holiday Type', type: 'select', options: HOLIDAY_TYPE, required: true }
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
                        { key: 'absenceType', label: 'Absence Type', type: 'select', options: LEAVE_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: ABSENCE_STATUS, required: true }
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
    // EXPORTS
    // ============================================================================

    window.Time = {
        columns: TIME_COLUMNS,
        forms: TIME_FORMS,
        primaryKeys: TIME_PRIMARY_KEYS,
        enums: {
            TIMESHEET_STATUS,
            TIMESHEET_STATUS_VALUES,
            TIME_ENTRY_TYPE,
            TIME_ENTRY_TYPE_VALUES,
            TIME_ENTRY_SOURCE,
            TIME_ENTRY_SOURCE_VALUES,
            LEAVE_TYPE,
            LEAVE_TYPE_VALUES,
            LEAVE_REQUEST_STATUS,
            LEAVE_REQUEST_STATUS_VALUES,
            ACCRUAL_METHOD,
            ACCRUAL_METHOD_VALUES,
            ACCRUAL_FREQUENCY,
            ACCRUAL_FREQUENCY_VALUES,
            SHIFT_TYPE,
            SHIFT_TYPE_VALUES,
            SCHEDULE_STATUS,
            SCHEDULE_STATUS_VALUES,
            HOLIDAY_TYPE,
            HOLIDAY_TYPE_VALUES,
            ABSENCE_STATUS,
            ABSENCE_STATUS_VALUES
        },
        render: {
            timesheetStatus: renderTimesheetStatus,
            timeEntryType: (v) => renderEnum(v, TIME_ENTRY_TYPE),
            timeEntrySource: (v) => renderEnum(v, TIME_ENTRY_SOURCE),
            leaveType: (v) => renderEnum(v, LEAVE_TYPE),
            leaveRequestStatus: renderLeaveRequestStatus,
            accrualMethod: (v) => renderEnum(v, ACCRUAL_METHOD),
            accrualFrequency: (v) => renderEnum(v, ACCRUAL_FREQUENCY),
            shiftType: renderShiftType,
            scheduleStatus: renderScheduleStatus,
            holidayType: (v) => renderEnum(v, HOLIDAY_TYPE),
            absenceStatus: renderAbsenceStatus,
            money: renderMoney,
            boolean: renderBoolean,
            date: renderDate,
            hours: renderHoursTime,
            period: renderTimePeriod
        }
    };

})();
