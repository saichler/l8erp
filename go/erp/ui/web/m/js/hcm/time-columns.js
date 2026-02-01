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
 * Mobile Time & Attendance Module - Column Configurations
 * Desktop Equivalent: hcm/time/time-columns.js
 */
(function() {
    'use strict';

    const enums = MobileTime.enums;
    const render = MobileTime.render;

    MobileTime.columns = {
        Timesheet: [
            { key: 'timesheetId', label: 'ID', sortKey: 'timesheetId', filterKey: 'timesheetId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'period', label: 'Period', render: (item) => render.period(item.period) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.TIMESHEET_STATUS_VALUES, render: (item) => render.timesheetStatus(item.status) },
            { key: 'totalRegularHours', label: 'Regular', sortKey: 'totalRegularHours', render: (item) => render.hours(item.totalRegularHours) },
            { key: 'totalOvertimeHours', label: 'Overtime', sortKey: 'totalOvertimeHours', render: (item) => render.hours(item.totalOvertimeHours) },
            { key: 'totalHours', label: 'Total Hours', sortKey: 'totalHours', render: (item) => render.hours(item.totalHours) }
        ],

        LeaveRequest: [
            { key: 'requestId', label: 'ID', sortKey: 'requestId', filterKey: 'requestId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'leaveType', label: 'Leave Type', sortKey: 'leaveType', filterKey: 'leaveType', enumValues: enums.LEAVE_TYPE_VALUES, render: (item) => render.leaveType(item.leaveType) },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) },
            { key: 'totalHours', label: 'Hours', sortKey: 'totalHours', render: (item) => render.hours(item.totalHours) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.LEAVE_REQUEST_STATUS_VALUES, render: (item) => render.leaveRequestStatus(item.status) }
        ],

        LeaveBalance: [
            { key: 'balanceId', label: 'ID', sortKey: 'balanceId', filterKey: 'balanceId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'leaveType', label: 'Leave Type', sortKey: 'leaveType', filterKey: 'leaveType', enumValues: enums.LEAVE_TYPE_VALUES, render: (item) => render.leaveType(item.leaveType) },
            { key: 'year', label: 'Year', sortKey: 'year', filterKey: 'year' },
            { key: 'accrued', label: 'Accrued', sortKey: 'accrued', render: (item) => render.hours(item.accrued) },
            { key: 'used', label: 'Used', sortKey: 'used', render: (item) => render.hours(item.used) },
            { key: 'available', label: 'Available', sortKey: 'available', render: (item) => render.hours(item.available) }
        ],

        LeavePolicy: [
            { key: 'policyId', label: 'ID', sortKey: 'policyId', filterKey: 'policyId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'leaveType', label: 'Leave Type', sortKey: 'leaveType', filterKey: 'leaveType', enumValues: enums.LEAVE_TYPE_VALUES, render: (item) => render.leaveType(item.leaveType) },
            { key: 'accrualMethod', label: 'Accrual Method', sortKey: 'accrualMethod', filterKey: 'accrualMethod', enumValues: enums.ACCRUAL_METHOD_VALUES, render: (item) => render.accrualMethod(item.accrualMethod) },
            { key: 'accrualRate', label: 'Accrual Rate', sortKey: 'accrualRate', render: (item) => render.hours(item.accrualRate) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        Shift: [
            { key: 'shiftId', label: 'ID', sortKey: 'shiftId', filterKey: 'shiftId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'shiftType', label: 'Type', sortKey: 'shiftType', filterKey: 'shiftType', enumValues: enums.SHIFT_TYPE_VALUES, render: (item) => render.shiftType(item.shiftType) },
            { key: 'durationHours', label: 'Duration', sortKey: 'durationHours', render: (item) => render.hours(item.durationHours) },
            { key: 'breakDurationMinutes', label: 'Break', sortKey: 'breakDurationMinutes', render: (item) => item.breakDurationMinutes ? `${item.breakDurationMinutes} min` : '-' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        Schedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'period', label: 'Period', render: (item) => render.period(item.period) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.SCHEDULE_STATUS_VALUES, render: (item) => render.scheduleStatus(item.status) },
            { key: 'totalScheduledHours', label: 'Scheduled Hours', sortKey: 'totalScheduledHours', render: (item) => render.hours(item.totalScheduledHours) },
            { key: 'publishedDate', label: 'Published', sortKey: 'publishedDate', render: (item) => Layer8MRenderers.renderDate(item.publishedDate) }
        ],

        Holiday: [
            { key: 'holidayId', label: 'ID', sortKey: 'holidayId', filterKey: 'holidayId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'date', label: 'Date', sortKey: 'date', render: (item) => Layer8MRenderers.renderDate(item.date) },
            { key: 'year', label: 'Year', sortKey: 'year', filterKey: 'year' },
            { key: 'holidayType', label: 'Type', sortKey: 'holidayType', filterKey: 'holidayType', enumValues: enums.HOLIDAY_TYPE_VALUES, render: (item) => render.holidayType(item.holidayType) },
            { key: 'isPaid', label: 'Paid', sortKey: 'isPaid', render: (item) => Layer8MRenderers.renderBoolean(item.isPaid) },
            { key: 'hoursCredited', label: 'Hours', sortKey: 'hoursCredited', render: (item) => render.hours(item.hoursCredited) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        Absence: [
            { key: 'absenceId', label: 'ID', sortKey: 'absenceId', filterKey: 'absenceId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'date', label: 'Date', sortKey: 'date', render: (item) => Layer8MRenderers.renderDate(item.date) },
            { key: 'absenceType', label: 'Type', sortKey: 'absenceType', filterKey: 'absenceType', enumValues: enums.LEAVE_TYPE_VALUES, render: (item) => render.leaveType(item.absenceType) },
            { key: 'hours', label: 'Hours', sortKey: 'hours', render: (item) => render.hours(item.hours) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.ABSENCE_STATUS_VALUES, render: (item) => render.absenceStatus(item.status) },
            { key: 'isPaid', label: 'Paid', sortKey: 'isPaid', render: (item) => Layer8MRenderers.renderBoolean(item.isPaid) }
        ]
    };

    MobileTime.primaryKeys = {
        Timesheet: 'timesheetId', LeaveRequest: 'requestId', LeaveBalance: 'balanceId',
        LeavePolicy: 'policyId', Shift: 'shiftId', Schedule: 'scheduleId', Holiday: 'holidayId', Absence: 'absenceId'
    };

})();
