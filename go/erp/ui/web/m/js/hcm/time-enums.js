/**
 * Mobile Time & Attendance Module - Enum Definitions
 * Desktop Equivalent: hcm/time/time-enums.js
 */
(function() {
    'use strict';

    window.MobileTime = window.MobileTime || {};
    MobileTime.enums = {};

    // ============================================================================
    // TIMESHEET STATUS
    // ============================================================================

    MobileTime.enums.TIMESHEET_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Submitted', 3: 'Approved', 4: 'Rejected', 5: 'Processed'
    };

    MobileTime.enums.TIMESHEET_STATUS_VALUES = {
        'draft': 1, 'submitted': 2, 'approved': 3, 'rejected': 4, 'processed': 5
    };

    MobileTime.enums.TIMESHEET_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active', 4: 'status-terminated', 5: 'status-active'
    };

    // ============================================================================
    // TIME ENTRY TYPE
    // ============================================================================

    MobileTime.enums.TIME_ENTRY_TYPE = {
        0: 'Unspecified', 1: 'Regular', 2: 'Overtime', 3: 'Double Time', 4: 'PTO',
        5: 'Sick', 6: 'Holiday', 7: 'Bereavement', 8: 'Jury Duty', 9: 'Training',
        10: 'Unpaid', 11: 'On-Call', 12: 'Travel'
    };

    MobileTime.enums.TIME_ENTRY_TYPE_VALUES = {
        'regular': 1, 'overtime': 2, 'double': 3, 'pto': 4, 'sick': 5, 'holiday': 6,
        'bereavement': 7, 'jury': 8, 'training': 9, 'unpaid': 10, 'oncall': 11, 'on-call': 11, 'travel': 12
    };

    // ============================================================================
    // TIME ENTRY SOURCE
    // ============================================================================

    MobileTime.enums.TIME_ENTRY_SOURCE = {
        0: 'Unspecified', 1: 'Manual', 2: 'Time Clock', 3: 'Mobile', 4: 'Badge', 5: 'Biometric', 6: 'Import'
    };

    MobileTime.enums.TIME_ENTRY_SOURCE_VALUES = {
        'manual': 1, 'clock': 2, 'mobile': 3, 'badge': 4, 'biometric': 5, 'import': 6
    };

    // ============================================================================
    // LEAVE TYPE
    // ============================================================================

    MobileTime.enums.LEAVE_TYPE = {
        0: 'Unspecified', 1: 'PTO', 2: 'Vacation', 3: 'Sick', 4: 'Personal', 5: 'Bereavement',
        6: 'Jury Duty', 7: 'Military', 8: 'FMLA', 9: 'Parental', 10: 'Maternity',
        11: 'Paternity', 12: 'Sabbatical', 13: 'Unpaid', 14: 'Administrative', 15: 'Volunteer'
    };

    MobileTime.enums.LEAVE_TYPE_VALUES = {
        'pto': 1, 'vacation': 2, 'sick': 3, 'personal': 4, 'bereavement': 5, 'jury': 6,
        'military': 7, 'fmla': 8, 'parental': 9, 'maternity': 10, 'paternity': 11,
        'sabbatical': 12, 'unpaid': 13, 'administrative': 14, 'volunteer': 15
    };

    // ============================================================================
    // LEAVE REQUEST STATUS
    // ============================================================================

    MobileTime.enums.LEAVE_REQUEST_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Pending', 3: 'Approved', 4: 'Rejected', 5: 'Cancelled', 6: 'Taken'
    };

    MobileTime.enums.LEAVE_REQUEST_STATUS_VALUES = {
        'draft': 1, 'pending': 2, 'approved': 3, 'rejected': 4, 'cancelled': 5, 'taken': 6
    };

    MobileTime.enums.LEAVE_REQUEST_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active',
        4: 'status-terminated', 5: 'status-terminated', 6: 'status-active'
    };

    // ============================================================================
    // ACCRUAL METHOD
    // ============================================================================

    MobileTime.enums.ACCRUAL_METHOD = {
        0: 'Unspecified', 1: 'Fixed', 2: 'Hours Worked', 3: 'Tenure Based', 4: 'Front Loaded'
    };

    MobileTime.enums.ACCRUAL_METHOD_VALUES = {
        'fixed': 1, 'hours': 2, 'worked': 2, 'tenure': 3, 'front': 4, 'loaded': 4
    };

    // ============================================================================
    // ACCRUAL FREQUENCY
    // ============================================================================

    MobileTime.enums.ACCRUAL_FREQUENCY = {
        0: 'Unspecified', 1: 'Per Pay Period', 2: 'Monthly', 3: 'Quarterly', 4: 'Annually', 5: 'Anniversary'
    };

    MobileTime.enums.ACCRUAL_FREQUENCY_VALUES = {
        'pay': 1, 'period': 1, 'monthly': 2, 'quarterly': 3, 'annually': 4, 'annual': 4, 'anniversary': 5
    };

    // ============================================================================
    // SHIFT TYPE
    // ============================================================================

    MobileTime.enums.SHIFT_TYPE = {
        0: 'Unspecified', 1: 'Day', 2: 'Evening', 3: 'Night', 4: 'Overnight', 5: 'Rotating', 6: 'Split', 7: 'On-Call'
    };

    MobileTime.enums.SHIFT_TYPE_VALUES = {
        'day': 1, 'evening': 2, 'night': 3, 'overnight': 4, 'rotating': 5, 'split': 6, 'oncall': 7, 'on-call': 7
    };

    // ============================================================================
    // SCHEDULE STATUS
    // ============================================================================

    MobileTime.enums.SCHEDULE_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Published', 3: 'Archived'
    };

    MobileTime.enums.SCHEDULE_STATUS_VALUES = {
        'draft': 1, 'published': 2, 'archived': 3
    };

    MobileTime.enums.SCHEDULE_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-active', 3: 'status-inactive'
    };

    // ============================================================================
    // HOLIDAY TYPE
    // ============================================================================

    MobileTime.enums.HOLIDAY_TYPE = {
        0: 'Unspecified', 1: 'Fixed', 2: 'Floating', 3: 'Personal', 4: 'Observed'
    };

    MobileTime.enums.HOLIDAY_TYPE_VALUES = {
        'fixed': 1, 'floating': 2, 'personal': 3, 'observed': 4
    };

    // ============================================================================
    // ABSENCE STATUS
    // ============================================================================

    MobileTime.enums.ABSENCE_STATUS = {
        0: 'Unspecified', 1: 'Scheduled', 2: 'Taken', 3: 'Cancelled'
    };

    MobileTime.enums.ABSENCE_STATUS_VALUES = {
        'scheduled': 1, 'taken': 2, 'cancelled': 3
    };

    MobileTime.enums.ABSENCE_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileTime.render = {
        timesheetStatus: MobileRenderers.createStatusRenderer(
            MobileTime.enums.TIMESHEET_STATUS,
            MobileTime.enums.TIMESHEET_STATUS_CLASSES
        ),
        timeEntryType: (v) => MobileRenderers.renderEnum(v, MobileTime.enums.TIME_ENTRY_TYPE),
        timeEntrySource: (v) => MobileRenderers.renderEnum(v, MobileTime.enums.TIME_ENTRY_SOURCE),
        leaveType: (v) => MobileRenderers.renderEnum(v, MobileTime.enums.LEAVE_TYPE),
        leaveRequestStatus: MobileRenderers.createStatusRenderer(
            MobileTime.enums.LEAVE_REQUEST_STATUS,
            MobileTime.enums.LEAVE_REQUEST_STATUS_CLASSES
        ),
        accrualMethod: (v) => MobileRenderers.renderEnum(v, MobileTime.enums.ACCRUAL_METHOD),
        accrualFrequency: (v) => MobileRenderers.renderEnum(v, MobileTime.enums.ACCRUAL_FREQUENCY),
        shiftType: (type) => {
            const shiftColors = {
                1: '#10b981', 2: '#f59e0b', 3: '#6366f1', 4: '#8b5cf6',
                5: '#06b6d4', 6: '#ec4899', 7: '#ef4444'
            };
            const label = MobileTime.enums.SHIFT_TYPE[type] || 'Unknown';
            const color = shiftColors[type] || '#64748b';
            return `<span style="color: ${color}; font-weight: 500;">${MobileUtils.escapeHtml(label)}</span>`;
        },
        scheduleStatus: MobileRenderers.createStatusRenderer(
            MobileTime.enums.SCHEDULE_STATUS,
            MobileTime.enums.SCHEDULE_STATUS_CLASSES
        ),
        holidayType: (v) => MobileRenderers.renderEnum(v, MobileTime.enums.HOLIDAY_TYPE),
        absenceStatus: MobileRenderers.createStatusRenderer(
            MobileTime.enums.ABSENCE_STATUS,
            MobileTime.enums.ABSENCE_STATUS_CLASSES
        ),
        hours: MobileRenderers.renderHours,
        period: MobileRenderers.renderPeriod,
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate
    };

})();
