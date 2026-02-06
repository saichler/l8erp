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
/**
 * Mobile Time & Attendance Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: hcm/time/time-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderHours, renderPeriod, renderBoolean, renderDate } = Layer8MRenderers;

    window.MobileTime = window.MobileTime || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const TIMESHEET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-inactive'],
        ['Submitted', 'submitted', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated'],
        ['Processed', 'processed', 'status-active']
    ]);

    const TIME_ENTRY_TYPE = factory.withValues([
        ['Unspecified', null], ['Regular', 'regular'], ['Overtime', 'overtime'],
        ['Double Time', 'double'], ['PTO', 'pto'], ['Sick', 'sick'], ['Holiday', 'holiday'],
        ['Bereavement', 'bereavement'], ['Jury Duty', 'jury'], ['Training', 'training'],
        ['Unpaid', 'unpaid'], ['On-Call', 'oncall'], ['Travel', 'travel']
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
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-inactive'],
        ['Pending', 'pending', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated'],
        ['Cancelled', 'cancelled', 'status-terminated'],
        ['Taken', 'taken', 'status-active']
    ]);

    const ACCRUAL_METHOD = factory.withValues([
        ['Unspecified', null], ['Fixed', 'fixed'], ['Hours Worked', 'hours'],
        ['Tenure Based', 'tenure'], ['Front Loaded', 'front']
    ]);

    const ACCRUAL_FREQUENCY = factory.withValues([
        ['Unspecified', null], ['Per Pay Period', 'pay'], ['Monthly', 'monthly'],
        ['Quarterly', 'quarterly'], ['Annually', 'annually'], ['Anniversary', 'anniversary']
    ]);

    const SHIFT_TYPE = factory.withValues([
        ['Unspecified', null], ['Day', 'day'], ['Evening', 'evening'], ['Night', 'night'],
        ['Overnight', 'overnight'], ['Rotating', 'rotating'], ['Split', 'split'], ['On-Call', 'oncall']
    ]);

    const SCHEDULE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-inactive'],
        ['Published', 'published', 'status-active'],
        ['Archived', 'archived', 'status-inactive']
    ]);

    const HOLIDAY_TYPE = factory.withValues([
        ['Unspecified', null], ['Fixed', 'fixed'], ['Floating', 'floating'],
        ['Personal', 'personal'], ['Observed', 'observed']
    ]);

    const ABSENCE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Scheduled', 'scheduled', 'status-pending'],
        ['Taken', 'taken', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileTime.enums = {
        TIMESHEET_STATUS: TIMESHEET_STATUS.enum,
        TIMESHEET_STATUS_VALUES: TIMESHEET_STATUS.values,
        TIMESHEET_STATUS_CLASSES: TIMESHEET_STATUS.classes,
        TIME_ENTRY_TYPE: TIME_ENTRY_TYPE.enum,
        TIME_ENTRY_TYPE_VALUES: TIME_ENTRY_TYPE.values,
        TIME_ENTRY_SOURCE: TIME_ENTRY_SOURCE.enum,
        TIME_ENTRY_SOURCE_VALUES: TIME_ENTRY_SOURCE.values,
        LEAVE_TYPE: LEAVE_TYPE.enum,
        LEAVE_TYPE_VALUES: LEAVE_TYPE.values,
        LEAVE_REQUEST_STATUS: LEAVE_REQUEST_STATUS.enum,
        LEAVE_REQUEST_STATUS_VALUES: LEAVE_REQUEST_STATUS.values,
        LEAVE_REQUEST_STATUS_CLASSES: LEAVE_REQUEST_STATUS.classes,
        ACCRUAL_METHOD: ACCRUAL_METHOD.enum,
        ACCRUAL_METHOD_VALUES: ACCRUAL_METHOD.values,
        ACCRUAL_FREQUENCY: ACCRUAL_FREQUENCY.enum,
        ACCRUAL_FREQUENCY_VALUES: ACCRUAL_FREQUENCY.values,
        SHIFT_TYPE: SHIFT_TYPE.enum,
        SHIFT_TYPE_VALUES: SHIFT_TYPE.values,
        SCHEDULE_STATUS: SCHEDULE_STATUS.enum,
        SCHEDULE_STATUS_VALUES: SCHEDULE_STATUS.values,
        SCHEDULE_STATUS_CLASSES: SCHEDULE_STATUS.classes,
        HOLIDAY_TYPE: HOLIDAY_TYPE.enum,
        HOLIDAY_TYPE_VALUES: HOLIDAY_TYPE.values,
        ABSENCE_STATUS: ABSENCE_STATUS.enum,
        ABSENCE_STATUS_VALUES: ABSENCE_STATUS.values,
        ABSENCE_STATUS_CLASSES: ABSENCE_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileTime.render = {
        timesheetStatus: createStatusRenderer(TIMESHEET_STATUS.enum, TIMESHEET_STATUS.classes),
        timeEntryType: (v) => renderEnum(v, TIME_ENTRY_TYPE.enum),
        timeEntrySource: (v) => renderEnum(v, TIME_ENTRY_SOURCE.enum),
        leaveType: (v) => renderEnum(v, LEAVE_TYPE.enum),
        leaveRequestStatus: createStatusRenderer(LEAVE_REQUEST_STATUS.enum, LEAVE_REQUEST_STATUS.classes),
        accrualMethod: (v) => renderEnum(v, ACCRUAL_METHOD.enum),
        accrualFrequency: (v) => renderEnum(v, ACCRUAL_FREQUENCY.enum),
        shiftType: (type) => {
            const shiftColors = {
                1: '#10b981', 2: '#f59e0b', 3: '#6366f1', 4: '#8b5cf6',
                5: '#06b6d4', 6: '#ec4899', 7: '#ef4444'
            };
            const label = SHIFT_TYPE.enum[type] || 'Unknown';
            const color = shiftColors[type] || '#64748b';
            return `<span style="color: ${color}; font-weight: 500;">${Layer8MUtils.escapeHtml(label)}</span>`;
        },
        scheduleStatus: createStatusRenderer(SCHEDULE_STATUS.enum, SCHEDULE_STATUS.classes),
        holidayType: (v) => renderEnum(v, HOLIDAY_TYPE.enum),
        absenceStatus: createStatusRenderer(ABSENCE_STATUS.enum, ABSENCE_STATUS.classes),
        hours: renderHours,
        period: renderPeriod,
        boolean: renderBoolean,
        date: renderDate
    };

})();
