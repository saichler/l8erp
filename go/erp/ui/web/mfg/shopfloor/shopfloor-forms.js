/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Manufacturing Shop Floor Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MfgShopFloor = window.MfgShopFloor || {};

    const f = window.Layer8FormFactory;
    const enums = MfgShopFloor.enums;

    MfgShopFloor.forms = {
        MfgWorkCenter: f.form('Work Center', [
            f.section('Work Center Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('workCenterType', 'Type', enums.WORK_CENTER_TYPE),
                ...f.reference('departmentId', 'Department', 'Department'),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse'),
                ...f.number('hourlyRate', 'Hourly Rate'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.number('capacityUnits', 'Capacity Units'),
                ...f.number('efficiencyPercent', 'Efficiency %'),
                ...f.number('utilizationPercent', 'Utilization %'),
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
                ...f.number('capacityUnits', 'Capacity Units'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgLaborEntry: f.form('Labor Entry', [
            f.section('Entry Details', [
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.reference('operationId', 'Operation', 'MfgWorkOrderOp'),
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter'),
                ...f.text('startTime', 'Start Time'),
                ...f.text('endTime', 'End Time'),
                ...f.number('hoursWorked', 'Hours Worked'),
                ...f.number('quantityCompleted', 'Qty Completed'),
                ...f.number('quantityScrapped', 'Qty Scrapped'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgMachineEntry: f.form('Machine Entry', [
            f.section('Entry Details', [
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.reference('operationId', 'Operation', 'MfgWorkOrderOp'),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter', true),
                ...f.text('startTime', 'Start Time'),
                ...f.text('endTime', 'End Time'),
                ...f.number('machineHours', 'Machine Hours'),
                ...f.number('quantityCompleted', 'Qty Completed'),
                ...f.number('quantityScrapped', 'Qty Scrapped'),
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
                ...f.checkbox('isOvernight', 'Overnight'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        MfgDowntimeEvent: f.form('Downtime Event', [
            f.section('Event Details', [
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter', true),
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder'),
                ...f.text('startTime', 'Start Time', true),
                ...f.text('endTime', 'End Time'),
                ...f.number('durationMinutes', 'Duration (minutes)'),
                ...f.select('reasonCode', 'Reason Code', enums.DOWNTIME_REASON),
                ...f.textarea('description', 'Description'),
                ...f.reference('reportedBy', 'Reported By', 'Employee')
            ])
        ])
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
