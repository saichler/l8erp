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

    const col = window.Layer8ColumnFactory;
    const { renderEnum } = Layer8DRenderers;
    const enums = window.Time.enums;
    const internal = window.Time._internal;

    window.Time.columns = {
        Timesheet: [
            ...col.id('timesheetId'),
            ...col.col('employeeId', 'Employee'),
            ...col.custom('period', 'Period', (item) => internal.renderTimePeriod(item.period), { sortKey: false }),
            ...col.enum('status', 'Status', enums.TIMESHEET_STATUS_VALUES, internal.renderTimesheetStatus),
            ...col.custom('totalRegularHours', 'Regular', (item) => internal.renderHoursTime(item.totalRegularHours)),
            ...col.custom('totalOvertimeHours', 'Overtime', (item) => internal.renderHoursTime(item.totalOvertimeHours)),
            ...col.custom('totalHours', 'Total Hours', (item) => internal.renderHoursTime(item.totalHours))
        ],

        LeaveRequest: [
            ...col.id('requestId'),
            ...col.col('employeeId', 'Employee'),
            ...col.enum('leaveType', 'Leave Type', enums.LEAVE_TYPE_VALUES, (v) => renderEnum(v, enums.LEAVE_TYPE)),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.custom('totalHours', 'Hours', (item) => internal.renderHoursTime(item.totalHours)),
            ...col.enum('status', 'Status', enums.LEAVE_REQUEST_STATUS_VALUES, internal.renderLeaveRequestStatus)
        ],

        LeaveBalance: [
            ...col.id('balanceId'),
            ...col.col('employeeId', 'Employee'),
            ...col.enum('leaveType', 'Leave Type', enums.LEAVE_TYPE_VALUES, (v) => renderEnum(v, enums.LEAVE_TYPE)),
            ...col.col('year', 'Year'),
            ...col.custom('accrued', 'Accrued', (item) => internal.renderHoursTime(item.accrued)),
            ...col.custom('used', 'Used', (item) => internal.renderHoursTime(item.used)),
            ...col.custom('available', 'Available', (item) => internal.renderHoursTime(item.available))
        ],

        LeavePolicy: [
            ...col.id('policyId'),
            ...col.basic(['code', 'name']),
            ...col.enum('leaveType', 'Leave Type', enums.LEAVE_TYPE_VALUES, (v) => renderEnum(v, enums.LEAVE_TYPE)),
            ...col.enum('accrualMethod', 'Accrual Method', enums.ACCRUAL_METHOD_VALUES, (v) => renderEnum(v, enums.ACCRUAL_METHOD)),
            ...col.custom('accrualRate', 'Accrual Rate', (item) => internal.renderHoursTime(item.accrualRate)),
            ...col.boolean('isActive', 'Active')
        ],

        Shift: [
            ...col.id('shiftId'),
            ...col.basic(['code', 'name']),
            ...col.enum('shiftType', 'Type', enums.SHIFT_TYPE_VALUES, internal.renderShiftType),
            ...col.custom('durationHours', 'Duration', (item) => internal.renderHoursTime(item.durationHours)),
            ...col.custom('breakDurationMinutes', 'Break', (item) => item.breakDurationMinutes ? `${item.breakDurationMinutes} min` : '-'),
            ...col.boolean('isActive', 'Active')
        ],

        Schedule: [
            ...col.id('scheduleId'),
            ...col.col('employeeId', 'Employee'),
            ...col.custom('period', 'Period', (item) => internal.renderTimePeriod(item.period), { sortKey: false }),
            ...col.enum('status', 'Status', enums.SCHEDULE_STATUS_VALUES, internal.renderScheduleStatus),
            ...col.custom('totalScheduledHours', 'Scheduled Hours', (item) => internal.renderHoursTime(item.totalScheduledHours)),
            ...col.date('publishedDate', 'Published')
        ],

        Holiday: [
            ...col.id('holidayId'),
            ...col.col('name', 'Name'),
            ...col.date('date', 'Date'),
            ...col.col('year', 'Year'),
            ...col.enum('holidayType', 'Type', enums.HOLIDAY_TYPE_VALUES, (v) => renderEnum(v, enums.HOLIDAY_TYPE)),
            ...col.boolean('isPaid', 'Paid'),
            ...col.custom('hoursCredited', 'Hours', (item) => internal.renderHoursTime(item.hoursCredited)),
            ...col.boolean('isActive', 'Active')
        ],

        Absence: [
            ...col.id('absenceId'),
            ...col.col('employeeId', 'Employee'),
            ...col.date('date', 'Date'),
            ...col.enum('absenceType', 'Type', enums.LEAVE_TYPE_VALUES, (v) => renderEnum(v, enums.LEAVE_TYPE)),
            ...col.custom('hours', 'Hours', (item) => internal.renderHoursTime(item.hours)),
            ...col.enum('status', 'Status', enums.ABSENCE_STATUS_VALUES, internal.renderAbsenceStatus),
            ...col.boolean('isPaid', 'Paid')
        ]
    };
})();
