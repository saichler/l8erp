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
// Manufacturing Shop Floor Module - Form Definitions

(function() {
    'use strict';

    window.MfgShopFloor = window.MfgShopFloor || {};

    const enums = MfgShopFloor.enums;

    MfgShopFloor.forms = {
        MfgWorkCenter: {
            title: 'Work Center',
            sections: [
                {
                    title: 'Work Center Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'workCenterType', label: 'Type', type: 'select', options: enums.WORK_CENTER_TYPE },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'hourlyRate', label: 'Hourly Rate', type: 'number' },
                        { key: 'currencyCode', label: 'Currency', type: 'text' },
                        { key: 'capacityUnits', label: 'Capacity Units', type: 'number' },
                        { key: 'efficiencyPercent', label: 'Efficiency %', type: 'number' },
                        { key: 'utilizationPercent', label: 'Utilization %', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgWorkCenterCap: {
            title: 'Work Center Capacity',
            sections: [
                {
                    title: 'Capacity Details',
                    fields: [
                        { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter', required: true },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'availableHours', label: 'Available Hours', type: 'number' },
                        { key: 'maxCapacity', label: 'Max Capacity', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgLaborEntry: {
            title: 'Labor Entry',
            sections: [
                {
                    title: 'Entry Details',
                    fields: [
                        { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                        { key: 'operationId', label: 'Operation', type: 'reference', lookupModel: 'MfgWorkOrderOp' },
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter' },
                        { key: 'startTime', label: 'Start Time', type: 'datetime' },
                        { key: 'endTime', label: 'End Time', type: 'datetime' },
                        { key: 'hoursWorked', label: 'Hours Worked', type: 'number' },
                        { key: 'quantityProduced', label: 'Qty Produced', type: 'number' },
                        { key: 'quantityScrapped', label: 'Qty Scrapped', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgMachineEntry: {
            title: 'Machine Entry',
            sections: [
                {
                    title: 'Entry Details',
                    fields: [
                        { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                        { key: 'operationId', label: 'Operation', type: 'reference', lookupModel: 'MfgWorkOrderOp' },
                        { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter', required: true },
                        { key: 'startTime', label: 'Start Time', type: 'datetime' },
                        { key: 'endTime', label: 'End Time', type: 'datetime' },
                        { key: 'machineHours', label: 'Machine Hours', type: 'number' },
                        { key: 'quantityProduced', label: 'Qty Produced', type: 'number' },
                        { key: 'quantityScrapped', label: 'Qty Scrapped', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgShiftSchedule: {
            title: 'Shift Schedule',
            sections: [
                {
                    title: 'Schedule Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'shiftType', label: 'Shift Type', type: 'select', options: enums.SHIFT_TYPE },
                        { key: 'startTime', label: 'Start Time', type: 'text', required: true },
                        { key: 'endTime', label: 'End Time', type: 'text', required: true },
                        { key: 'breakDurationMinutes', label: 'Break Duration (min)', type: 'number' },
                        { key: 'workingDays', label: 'Working Days', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        MfgDowntimeEvent: {
            title: 'Downtime Event',
            sections: [
                {
                    title: 'Event Details',
                    fields: [
                        { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter', required: true },
                        { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder' },
                        { key: 'startTime', label: 'Start Time', type: 'datetime', required: true },
                        { key: 'endTime', label: 'End Time', type: 'datetime' },
                        { key: 'durationMinutes', label: 'Duration (minutes)', type: 'number' },
                        { key: 'reason', label: 'Reason', type: 'select', options: enums.DOWNTIME_REASON },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'reportedBy', label: 'Reported By', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        }
    };

    MfgShopFloor.primaryKeys = {
        MfgWorkCenter: 'workCenterId',
        MfgWorkCenterCap: 'capacityId',
        MfgLaborEntry: 'entryId',
        MfgMachineEntry: 'entryId',
        MfgShiftSchedule: 'scheduleId',
        MfgDowntimeEvent: 'eventId'
    };

})();
