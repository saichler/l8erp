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

    const col = window.Layer8ColumnFactory;
    const enums = MobileTime.enums;
    const render = MobileTime.render;

    MobileTime.columns = {
        Timesheet: [
            ...col.id('timesheetId'),
            ...col.col('employeeId', 'Employee'),
            ...col.custom('period', 'Period', (item) => render.period(item.period)),
            ...col.status('status', 'Status', enums.TIMESHEET_STATUS_VALUES, render.timesheetStatus),
            ...col.custom('totalRegularHours', 'Regular', (item) => render.hours(item.totalRegularHours)),
            ...col.custom('totalOvertimeHours', 'Overtime', (item) => render.hours(item.totalOvertimeHours)),
            ...col.custom('totalHours', 'Total Hours', (item) => render.hours(item.totalHours))
        ],

        LeaveRequest: [
            ...col.id('requestId'),
            ...col.col('employeeId', 'Employee'),
            ...col.status('leaveType', 'Leave Type', enums.LEAVE_TYPE_VALUES, render.leaveType),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.custom('totalHours', 'Hours', (item) => render.hours(item.totalHours)),
            ...col.status('status', 'Status', enums.LEAVE_REQUEST_STATUS_VALUES, render.leaveRequestStatus)
        ],

        LeaveBalance: [
            ...col.id('balanceId'),
            ...col.col('employeeId', 'Employee'),
            ...col.status('leaveType', 'Leave Type', enums.LEAVE_TYPE_VALUES, render.leaveType),
            ...col.col('year', 'Year'),
            ...col.custom('accrued', 'Accrued', (item) => render.hours(item.accrued)),
            ...col.custom('used', 'Used', (item) => render.hours(item.used)),
            ...col.custom('available', 'Available', (item) => render.hours(item.available))
        ],

        LeavePolicy: [
            ...col.id('policyId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('leaveType', 'Leave Type', enums.LEAVE_TYPE_VALUES, render.leaveType),
            ...col.status('accrualMethod', 'Accrual Method', enums.ACCRUAL_METHOD_VALUES, render.accrualMethod),
            ...col.custom('accrualRate', 'Accrual Rate', (item) => render.hours(item.accrualRate)),
            ...col.boolean('isActive', 'Active')
        ],

        Shift: [
            ...col.id('shiftId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('shiftType', 'Type', enums.SHIFT_TYPE_VALUES, render.shiftType),
            ...col.custom('durationHours', 'Duration', (item) => render.hours(item.durationHours)),
            ...col.custom('breakDurationMinutes', 'Break', (item) => item.breakDurationMinutes ? `${item.breakDurationMinutes} min` : '-'),
            ...col.boolean('isActive', 'Active')
        ],

        Schedule: [
            ...col.id('scheduleId'),
            ...col.col('employeeId', 'Employee'),
            ...col.custom('period', 'Period', (item) => render.period(item.period)),
            ...col.status('status', 'Status', enums.SCHEDULE_STATUS_VALUES, render.scheduleStatus),
            ...col.custom('totalScheduledHours', 'Scheduled Hours', (item) => render.hours(item.totalScheduledHours)),
            ...col.date('publishedDate', 'Published')
        ],

        Holiday: [
            ...col.id('holidayId'),
            ...col.col('name', 'Name'),
            ...col.date('date', 'Date'),
            ...col.col('year', 'Year'),
            ...col.status('holidayType', 'Type', enums.HOLIDAY_TYPE_VALUES, render.holidayType),
            ...col.boolean('isPaid', 'Paid'),
            ...col.custom('hoursCredited', 'Hours', (item) => render.hours(item.hoursCredited)),
            ...col.boolean('isActive', 'Active')
        ],

        Absence: [
            ...col.id('absenceId'),
            ...col.col('employeeId', 'Employee'),
            ...col.date('date', 'Date'),
            ...col.status('absenceType', 'Type', enums.LEAVE_TYPE_VALUES, render.leaveType),
            ...col.custom('hours', 'Hours', (item) => render.hours(item.hours)),
            ...col.status('status', 'Status', enums.ABSENCE_STATUS_VALUES, render.absenceStatus),
            ...col.boolean('isPaid', 'Paid')
        ]
    };

    MobileTime.primaryKeys = {
        Timesheet: 'timesheetId', LeaveRequest: 'requestId', LeaveBalance: 'balanceId',
        LeavePolicy: 'policyId', Shift: 'shiftId', Schedule: 'scheduleId', Holiday: 'holidayId', Absence: 'absenceId'
    };

})();
