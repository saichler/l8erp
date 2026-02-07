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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Manufacturing Shop Floor Module - Form Definitions
 * Desktop Equivalent: mfg/shopfloor/shopfloor-forms.js
 */
(function() {
    'use strict';

    window.MobileMfgShopFloor = window.MobileMfgShopFloor || {};
    const f = window.Layer8FormFactory;
    const enums = MobileMfgShopFloor.enums;

    MobileMfgShopFloor.forms = {
        MfgWorkCenter: f.form('Work Center', [
            f.section('Work Center Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('workCenterType', 'Type', enums.WORK_CENTER_TYPE),
                ...f.number('hourlyRate', 'Hourly Rate'),
                ...f.number('capacityUnits', 'Capacity Units'),
                ...f.number('efficiencyPercent', 'Efficiency %'),
                ...f.checkbox('isActive', 'Active'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),
        MfgWorkCenterCap: f.form('Work Center Capacity', [
            f.section('Capacity Details', [
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.number('availableHours', 'Available Hours'),
                ...f.number('capacityUnits', 'Capacity Units')
            ])
        ]),
        MfgLaborEntry: f.form('Labor Entry', [
            f.section('Entry Details', [
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter'),
                ...f.datetime('startTime', 'Start Time'),
                ...f.datetime('endTime', 'End Time'),
                ...f.number('hoursWorked', 'Hours Worked'),
                ...f.number('quantityCompleted', 'Qty Completed'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),
        MfgMachineEntry: f.form('Machine Entry', [
            f.section('Entry Details', [
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter', true),
                ...f.datetime('startTime', 'Start Time'),
                ...f.datetime('endTime', 'End Time'),
                ...f.number('machineHours', 'Machine Hours'),
                ...f.number('quantityCompleted', 'Qty Completed'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),
        MfgShiftSchedule: f.form('Shift Schedule', [
            f.section('Schedule Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('shiftType', 'Shift Type', enums.SHIFT_TYPE),
                ...f.text('startTime', 'Start Time', true),
                ...f.text('endTime', 'End Time', true),
                ...f.number('breakDuration', 'Break Duration (min)'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),
        MfgDowntimeEvent: f.form('Downtime Event', [
            f.section('Event Details', [
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter', true),
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder'),
                ...f.datetime('startTime', 'Start Time', true),
                ...f.datetime('endTime', 'End Time'),
                ...f.number('durationMinutes', 'Duration (minutes)'),
                ...f.select('reasonCode', 'Reason Code', enums.DOWNTIME_REASON),
                ...f.textarea('description', 'Description')
            ])
        ])
    };

    MobileMfgShopFloor.primaryKeys = {
        MfgWorkCenter: 'workCenterId', MfgWorkCenterCap: 'capacityId', MfgLaborEntry: 'entryId',
        MfgMachineEntry: 'entryId', MfgShiftSchedule: 'scheduleId', MfgDowntimeEvent: 'eventId'
    };

})();
