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
// Time & Attendance Module - Column Configurations
// Part 2 of 4 - Load after time-enums.js

(function() {
    'use strict';

    // Import shared utilities
    const { renderEnum, renderBoolean, renderDate } = Layer8DRenderers;

    // Get enums and render functions from time-enums.js
    const enums = window.Time.enums;
    const internal = window.Time._internal;

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
                render: (item) => internal.renderTimePeriod(item.period)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.TIMESHEET_STATUS_VALUES,
                render: (item) => internal.renderTimesheetStatus(item.status)
            },
            {
                key: 'totalRegularHours',
                label: 'Regular',
                sortKey: 'totalRegularHours',
                render: (item) => internal.renderHoursTime(item.totalRegularHours)
            },
            {
                key: 'totalOvertimeHours',
                label: 'Overtime',
                sortKey: 'totalOvertimeHours',
                render: (item) => internal.renderHoursTime(item.totalOvertimeHours)
            },
            {
                key: 'totalHours',
                label: 'Total Hours',
                sortKey: 'totalHours',
                render: (item) => internal.renderHoursTime(item.totalHours)
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
                enumValues: enums.LEAVE_TYPE_VALUES,
                render: (item) => renderEnum(item.leaveType, enums.LEAVE_TYPE)
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
                render: (item) => internal.renderHoursTime(item.totalHours)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.LEAVE_REQUEST_STATUS_VALUES,
                render: (item) => internal.renderLeaveRequestStatus(item.status)
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
                enumValues: enums.LEAVE_TYPE_VALUES,
                render: (item) => renderEnum(item.leaveType, enums.LEAVE_TYPE)
            },
            { key: 'year', label: 'Year', sortKey: 'year', filterKey: 'year' },
            {
                key: 'accrued',
                label: 'Accrued',
                sortKey: 'accrued',
                render: (item) => internal.renderHoursTime(item.accrued)
            },
            {
                key: 'used',
                label: 'Used',
                sortKey: 'used',
                render: (item) => internal.renderHoursTime(item.used)
            },
            {
                key: 'available',
                label: 'Available',
                sortKey: 'available',
                render: (item) => internal.renderHoursTime(item.available)
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
                enumValues: enums.LEAVE_TYPE_VALUES,
                render: (item) => renderEnum(item.leaveType, enums.LEAVE_TYPE)
            },
            {
                key: 'accrualMethod',
                label: 'Accrual Method',
                sortKey: 'accrualMethod',
                filterKey: 'accrualMethod',
                enumValues: enums.ACCRUAL_METHOD_VALUES,
                render: (item) => renderEnum(item.accrualMethod, enums.ACCRUAL_METHOD)
            },
            {
                key: 'accrualRate',
                label: 'Accrual Rate',
                sortKey: 'accrualRate',
                render: (item) => internal.renderHoursTime(item.accrualRate)
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
                enumValues: enums.SHIFT_TYPE_VALUES,
                render: (item) => internal.renderShiftType(item.shiftType)
            },
            {
                key: 'durationHours',
                label: 'Duration',
                sortKey: 'durationHours',
                render: (item) => internal.renderHoursTime(item.durationHours)
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
                render: (item) => internal.renderTimePeriod(item.period)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.SCHEDULE_STATUS_VALUES,
                render: (item) => internal.renderScheduleStatus(item.status)
            },
            {
                key: 'totalScheduledHours',
                label: 'Scheduled Hours',
                sortKey: 'totalScheduledHours',
                render: (item) => internal.renderHoursTime(item.totalScheduledHours)
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
                enumValues: enums.HOLIDAY_TYPE_VALUES,
                render: (item) => renderEnum(item.holidayType, enums.HOLIDAY_TYPE)
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
                render: (item) => internal.renderHoursTime(item.hoursCredited)
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
                enumValues: enums.LEAVE_TYPE_VALUES,
                render: (item) => renderEnum(item.absenceType, enums.LEAVE_TYPE)
            },
            {
                key: 'hours',
                label: 'Hours',
                sortKey: 'hours',
                render: (item) => internal.renderHoursTime(item.hours)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.ABSENCE_STATUS_VALUES,
                render: (item) => internal.renderAbsenceStatus(item.status)
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
    // EXPORT COLUMNS TO NAMESPACE
    // ============================================================================

    window.Time.columns = TIME_COLUMNS;

})();
