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

    const { renderDate } = Layer8DRenderers;
    const render = MfgShopFloor.render;

    MfgShopFloor.columns = {
        MfgWorkCenter: [
            { key: 'workCenterId', label: 'ID', sortKey: 'workCenterId', filterKey: 'workCenterId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'workCenterType',
                label: 'Type',
                sortKey: 'workCenterType',
                render: (item) => render.workCenterType(item.workCenterType)
            },
            { key: 'hourlyRate', label: 'Hourly Rate', sortKey: 'hourlyRate' },
            { key: 'efficiencyPercent', label: 'Efficiency %', sortKey: 'efficiencyPercent' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => render.boolean(item.isActive)
            }
        ],

        MfgWorkCenterCap: [
            { key: 'capacityId', label: 'ID', sortKey: 'capacityId', filterKey: 'capacityId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId', filterKey: 'workCenterId' },
            {
                key: 'effectiveDate',
                label: 'Effective Date',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            },
            { key: 'availableHours', label: 'Available Hrs', sortKey: 'availableHours' },
            { key: 'maxCapacity', label: 'Max Capacity', sortKey: 'maxCapacity' }
        ],

        MfgLaborEntry: [
            { key: 'entryId', label: 'ID', sortKey: 'entryId', filterKey: 'entryId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId', filterKey: 'workOrderId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            {
                key: 'startTime',
                label: 'Start Time',
                sortKey: 'startTime',
                render: (item) => renderDate(item.startTime)
            },
            { key: 'hoursWorked', label: 'Hours', sortKey: 'hoursWorked' },
            { key: 'quantityProduced', label: 'Qty Produced', sortKey: 'quantityProduced' }
        ],

        MfgMachineEntry: [
            { key: 'entryId', label: 'ID', sortKey: 'entryId', filterKey: 'entryId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId', filterKey: 'workOrderId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            {
                key: 'startTime',
                label: 'Start Time',
                sortKey: 'startTime',
                render: (item) => renderDate(item.startTime)
            },
            { key: 'machineHours', label: 'Machine Hrs', sortKey: 'machineHours' },
            { key: 'quantityProduced', label: 'Qty Produced', sortKey: 'quantityProduced' }
        ],

        MfgShiftSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'shiftType',
                label: 'Type',
                sortKey: 'shiftType',
                render: (item) => render.shiftType(item.shiftType)
            },
            { key: 'startTime', label: 'Start Time', sortKey: 'startTime' },
            { key: 'endTime', label: 'End Time', sortKey: 'endTime' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => render.boolean(item.isActive)
            }
        ],

        MfgDowntimeEvent: [
            { key: 'eventId', label: 'ID', sortKey: 'eventId', filterKey: 'eventId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId', filterKey: 'workCenterId' },
            {
                key: 'startTime',
                label: 'Start Time',
                sortKey: 'startTime',
                render: (item) => renderDate(item.startTime)
            },
            {
                key: 'endTime',
                label: 'End Time',
                sortKey: 'endTime',
                render: (item) => renderDate(item.endTime)
            },
            { key: 'durationMinutes', label: 'Duration (min)', sortKey: 'durationMinutes' },
            {
                key: 'reason',
                label: 'Reason',
                sortKey: 'reason',
                render: (item) => render.downtimeReason(item.reason)
            }
        ]
    };

})();
