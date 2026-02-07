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
// Manufacturing Shop Floor Module - Column Configurations

(function() {
    'use strict';

    window.MfgShopFloor = window.MfgShopFloor || {};

    const col = window.Layer8ColumnFactory;
    const render = MfgShopFloor.render;

    MfgShopFloor.columns = {
        MfgWorkCenter: [
            ...col.id('workCenterId'),
            ...col.basic(['code', 'name']),
            ...col.custom('workCenterType', 'Type', (item) => render.workCenterType(item.workCenterType)),
            ...col.basic([['hourlyRate', 'Hourly Rate'], ['efficiencyPercent', 'Efficiency %']]),
            ...col.custom('isActive', 'Active', (item) => render.boolean(item.isActive))
        ],

        MfgWorkCenterCap: [
            ...col.id('capacityId'),
            ...col.col('workCenterId', 'Work Center'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.basic([['availableHours', 'Available Hrs'], ['capacityUnits', 'Capacity Units']])
        ],

        MfgLaborEntry: [
            ...col.id('entryId'),
            ...col.basic([['workOrderId', 'Work Order'], ['employeeId', 'Employee'], ['workCenterId', 'Work Center']]),
            ...col.date('startTime', 'Start Time'),
            ...col.basic([['hoursWorked', 'Hours'], ['quantityCompleted', 'Qty Completed']])
        ],

        MfgMachineEntry: [
            ...col.id('entryId'),
            ...col.basic([['workOrderId', 'Work Order'], ['workCenterId', 'Work Center']]),
            ...col.date('startTime', 'Start Time'),
            ...col.basic([['machineHours', 'Machine Hrs'], ['quantityCompleted', 'Qty Completed']])
        ],

        MfgShiftSchedule: [
            ...col.id('scheduleId'),
            ...col.col('name', 'Name'),
            ...col.custom('shiftType', 'Type', (item) => render.shiftType(item.shiftType)),
            ...col.basic([['startTime', 'Start Time'], ['endTime', 'End Time']]),
            ...col.custom('isActive', 'Active', (item) => render.boolean(item.isActive))
        ],

        MfgDowntimeEvent: [
            ...col.id('eventId'),
            ...col.col('workCenterId', 'Work Center'),
            ...col.date('startTime', 'Start Time'),
            ...col.date('endTime', 'End Time'),
            ...col.col('durationMinutes', 'Duration (min)'),
            ...col.custom('reasonCode', 'Reason', (item) => render.downtimeReason(item.reasonCode))
        ]
    };
})();
