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
// Time & Attendance Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { escapeHtml, formatDate } = Layer8DUtils;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.Time = window.Time || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const TIMESHEET_STATUS = factory.create([
        ['Unspecified', null, ''], ['Draft', 'draft', 'layer8d-status-inactive'],
        ['Submitted', 'submitted', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated'],
        ['Processed', 'processed', 'layer8d-status-active']
    ]);

    const TIME_ENTRY_TYPE = factory.withValues([
        ['Unspecified', null], ['Regular', 'regular'], ['Overtime', 'overtime'],
        ['Double Time', 'double'], ['PTO', 'pto'], ['Sick', 'sick'], ['Holiday', 'holiday'],
        ['Bereavement', 'bereavement'], ['Jury Duty', 'jury'], ['Training', 'training'],
        ['Unpaid', 'unpaid'], ['On-Call', 'oncall'], ['On-Call', 'on-call'], ['Travel', 'travel']
    ]);

    const TIME_ENTRY_SOURCE = factory.withValues([
        ['Unspecified', null], ['Manual', 'manual'], ['Time Clock', 'clock'],
        ['Mobile', 'mobile'], ['Badge', 'badge'], ['Biometric', 'biometric'], ['Import', 'import']
    ]);

    const LEAVE_TYPE = factory.withValues([
        ['Unspecified', null], ['PTO', 'pto'], ['Vacation', 'vacation'], ['Sick', 'sick'],
        ['Personal', 'personal'], ['Bereavement', 'bereavement'], ['Jury Duty', 'jury'],
        ['Military', 'military'], ['FMLA', 'fmla'], ['Parental', 'parental'],
        ['Maternity', 'maternity'], ['Paternity', 'paternity'], ['Sabbatical', 'sabbatical'],
        ['Unpaid', 'unpaid'], ['Administrative', 'administrative'], ['Volunteer', 'volunteer']
    ]);

    const LEAVE_REQUEST_STATUS = factory.create([
        ['Unspecified', null, ''], ['Draft', 'draft', 'layer8d-status-inactive'],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated'],
        ['Taken', 'taken', 'layer8d-status-active']
    ]);

    const ACCRUAL_METHOD = factory.withValues([
        ['Unspecified', null], ['Fixed', 'fixed'], ['Hours Worked', 'hours'],
        ['Hours Worked', 'worked'], ['Tenure Based', 'tenure'],
        ['Front Loaded', 'front'], ['Front Loaded', 'loaded']
    ]);

    const ACCRUAL_FREQUENCY = factory.withValues([
        ['Unspecified', null], ['Per Pay Period', 'pay'], ['Per Pay Period', 'period'],
        ['Monthly', 'monthly'], ['Quarterly', 'quarterly'],
        ['Annually', 'annually'], ['Annually', 'annual'], ['Anniversary', 'anniversary']
    ]);

    const SHIFT_TYPE = factory.withValues([
        ['Unspecified', null], ['Day', 'day'], ['Evening', 'evening'], ['Night', 'night'],
        ['Overnight', 'overnight'], ['Rotating', 'rotating'], ['Split', 'split'],
        ['On-Call', 'oncall'], ['On-Call', 'on-call']
    ]);

    const SCHEDULE_STATUS = factory.create([
        ['Unspecified', null, ''], ['Draft', 'draft', 'layer8d-status-inactive'],
        ['Published', 'published', 'layer8d-status-active'],
        ['Archived', 'archived', 'layer8d-status-inactive']
    ]);

    const HOLIDAY_TYPE = factory.withValues([
        ['Unspecified', null], ['Fixed', 'fixed'], ['Floating', 'floating'],
        ['Personal', 'personal'], ['Observed', 'observed']
    ]);

    const ABSENCE_STATUS = factory.create([
        ['Unspecified', null, ''], ['Scheduled', 'scheduled', 'layer8d-status-pending'],
        ['Taken', 'taken', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.Time.enums = {
        TIMESHEET_STATUS: TIMESHEET_STATUS.enum,
        TIMESHEET_STATUS_VALUES: TIMESHEET_STATUS.values,
        TIME_ENTRY_TYPE: TIME_ENTRY_TYPE.enum,
        TIME_ENTRY_TYPE_VALUES: TIME_ENTRY_TYPE.values,
        TIME_ENTRY_SOURCE: TIME_ENTRY_SOURCE.enum,
        TIME_ENTRY_SOURCE_VALUES: TIME_ENTRY_SOURCE.values,
        LEAVE_TYPE: LEAVE_TYPE.enum,
        LEAVE_TYPE_VALUES: LEAVE_TYPE.values,
        LEAVE_REQUEST_STATUS: LEAVE_REQUEST_STATUS.enum,
        LEAVE_REQUEST_STATUS_VALUES: LEAVE_REQUEST_STATUS.values,
        ACCRUAL_METHOD: ACCRUAL_METHOD.enum,
        ACCRUAL_METHOD_VALUES: ACCRUAL_METHOD.values,
        ACCRUAL_FREQUENCY: ACCRUAL_FREQUENCY.enum,
        ACCRUAL_FREQUENCY_VALUES: ACCRUAL_FREQUENCY.values,
        SHIFT_TYPE: SHIFT_TYPE.enum,
        SHIFT_TYPE_VALUES: SHIFT_TYPE.values,
        SCHEDULE_STATUS: SCHEDULE_STATUS.enum,
        SCHEDULE_STATUS_VALUES: SCHEDULE_STATUS.values,
        HOLIDAY_TYPE: HOLIDAY_TYPE.enum,
        HOLIDAY_TYPE_VALUES: HOLIDAY_TYPE.values,
        ABSENCE_STATUS: ABSENCE_STATUS.enum,
        ABSENCE_STATUS_VALUES: ABSENCE_STATUS.values
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderTimesheetStatus = createStatusRenderer(TIMESHEET_STATUS.enum, TIMESHEET_STATUS.classes);
    const renderLeaveRequestStatus = createStatusRenderer(LEAVE_REQUEST_STATUS.enum, LEAVE_REQUEST_STATUS.classes);
    const renderScheduleStatus = createStatusRenderer(SCHEDULE_STATUS.enum, SCHEDULE_STATUS.classes);
    const renderAbsenceStatus = createStatusRenderer(ABSENCE_STATUS.enum, ABSENCE_STATUS.classes);

    function renderShiftType(type) {
        const shiftColors = {
            1: '#10b981', 2: '#f59e0b', 3: '#6366f1', 4: '#8b5cf6',
            5: '#06b6d4', 6: '#ec4899', 7: '#ef4444'
        };
        const label = SHIFT_TYPE.enum[type] || 'Unknown';
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

    window.Time.render = {
        timesheetStatus: renderTimesheetStatus,
        timeEntryType: (v) => renderEnum(v, TIME_ENTRY_TYPE.enum),
        timeEntrySource: (v) => renderEnum(v, TIME_ENTRY_SOURCE.enum),
        leaveType: (v) => renderEnum(v, LEAVE_TYPE.enum),
        leaveRequestStatus: renderLeaveRequestStatus,
        accrualMethod: (v) => renderEnum(v, ACCRUAL_METHOD.enum),
        accrualFrequency: (v) => renderEnum(v, ACCRUAL_FREQUENCY.enum),
        shiftType: renderShiftType,
        scheduleStatus: renderScheduleStatus,
        holidayType: (v) => renderEnum(v, HOLIDAY_TYPE.enum),
        absenceStatus: renderAbsenceStatus,
        money: renderMoney,
        boolean: renderBoolean,
        date: renderDate,
        hours: renderHoursTime,
        period: renderTimePeriod
    };

    window.Time._internal = {
        renderTimesheetStatus, renderLeaveRequestStatus, renderScheduleStatus, renderAbsenceStatus,
        renderShiftType, renderHoursTime, renderTimePeriod
    };

})();
