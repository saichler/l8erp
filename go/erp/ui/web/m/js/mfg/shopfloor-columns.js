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
 * Mobile Manufacturing Shop Floor Module - Column Definitions
 * Desktop Equivalent: mfg/shopfloor/shopfloor-columns.js
 */
(function() {
    'use strict';

    window.MobileMfgShopFloor = window.MobileMfgShopFloor || {};
    const render = MobileMfgShopFloor.render;

    MobileMfgShopFloor.columns = {
        MfgWorkCenter: [
            { key: 'workCenterId', label: 'ID', sortKey: 'workCenterId' },
            { key: 'code', label: 'Code', sortKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'workCenterType', label: 'Type', sortKey: 'workCenterType', render: (item) => render.workCenterType(item.workCenterType) },
            { key: 'hourlyRate', label: 'Hourly Rate', sortKey: 'hourlyRate' },
            { key: 'efficiencyPercent', label: 'Efficiency %', sortKey: 'efficiencyPercent' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => render.boolean(item.isActive) }
        ],
        MfgWorkCenterCap: [
            { key: 'capacityId', label: 'ID', sortKey: 'capacityId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'effectiveDate', label: 'Effective Date', sortKey: 'effectiveDate', render: (item) => render.date(item.effectiveDate) },
            { key: 'availableHours', label: 'Available Hrs', sortKey: 'availableHours' },
            { key: 'capacityUnits', label: 'Capacity Units', sortKey: 'capacityUnits' }
        ],
        MfgLaborEntry: [
            { key: 'entryId', label: 'ID', sortKey: 'entryId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'startTime', label: 'Start Time', sortKey: 'startTime', render: (item) => render.date(item.startTime) },
            { key: 'hoursWorked', label: 'Hours', sortKey: 'hoursWorked' },
            { key: 'quantityCompleted', label: 'Qty Completed', sortKey: 'quantityCompleted' }
        ],
        MfgMachineEntry: [
            { key: 'entryId', label: 'ID', sortKey: 'entryId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'startTime', label: 'Start Time', sortKey: 'startTime', render: (item) => render.date(item.startTime) },
            { key: 'machineHours', label: 'Machine Hrs', sortKey: 'machineHours' },
            { key: 'quantityCompleted', label: 'Qty Completed', sortKey: 'quantityCompleted' }
        ],
        MfgShiftSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'shiftType', label: 'Type', sortKey: 'shiftType', render: (item) => render.shiftType(item.shiftType) },
            { key: 'startTime', label: 'Start Time', sortKey: 'startTime' },
            { key: 'endTime', label: 'End Time', sortKey: 'endTime' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => render.boolean(item.isActive) }
        ],
        MfgDowntimeEvent: [
            { key: 'eventId', label: 'ID', sortKey: 'eventId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'startTime', label: 'Start Time', sortKey: 'startTime', render: (item) => render.date(item.startTime) },
            { key: 'endTime', label: 'End Time', sortKey: 'endTime', render: (item) => render.date(item.endTime) },
            { key: 'durationMinutes', label: 'Duration (min)', sortKey: 'durationMinutes' },
            { key: 'reasonCode', label: 'Reason Code', sortKey: 'reasonCode', render: (item) => render.downtimeReason(item.reasonCode) }
        ]
    };

})();
