// Time & Attendance Module - Enum Definitions and Render Functions
// Part 1 of 4 - Load this file first

(function() {
    'use strict';

    // Initialize Time namespace
    window.Time = window.Time || {};

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
    // EXPORT ENUMS TO NAMESPACE
    // ============================================================================

    window.Time.enums = {
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
    };

    window.Time.render = {
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
    };

    // Export internal functions for use by other time files
    window.Time._internal = {
        renderTimesheetStatus,
        renderLeaveRequestStatus,
        renderScheduleStatus,
        renderAbsenceStatus,
        renderShiftType,
        renderHoursTime,
        renderTimePeriod
    };

})();
