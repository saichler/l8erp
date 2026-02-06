/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Manufacturing Planning Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MfgPlanning = window.MfgPlanning || {};

    const f = window.Layer8FormFactory;
    const enums = MfgPlanning.enums;

    MfgPlanning.forms = {
        MfgMrpRun: f.form('MRP Run', [
            f.section('Run Details', [
                ...f.text('runNumber', 'Run Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.date('runDate', 'Run Date'),
                ...f.number('planningHorizonDays', 'Planning Horizon (days)'),
                ...f.select('status', 'Status', enums.MRP_STATUS),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgMrpRequirement: f.form('MRP Requirement', [
            f.section('Requirement Details', [
                ...f.reference('runId', 'MRP Run', 'MfgMrpRun', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.select('requirementType', 'Type', enums.REQUIREMENT_TYPE),
                ...f.number('quantity', 'Quantity', true),
                ...f.date('requiredDate', 'Required Date'),
                ...f.text('sourceOrderId', 'Source Order'),
                ...f.text('sourceOrderType', 'Source Type'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgCapacityPlan: f.form('Capacity Plan', [
            f.section('Plan Details', [
                ...f.text('planNumber', 'Plan Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgCapacityLoad: f.form('Capacity Load', [
            f.section('Load Details', [
                ...f.reference('planId', 'Capacity Plan', 'MfgCapacityPlan', true),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter', true),
                ...f.date('periodDate', 'Period Date', true),
                ...f.number('requiredHours', 'Required Hours'),
                ...f.number('availableHours', 'Available Hours'),
                ...f.number('loadPercent', 'Load %')
            ])
        ]),

        MfgProdSchedule: f.form('Production Schedule', [
            f.section('Schedule Details', [
                ...f.text('scheduleName', 'Schedule Name', true),
                ...f.textarea('description', 'Description'),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.select('status', 'Status', enums.SCHEDULE_STATUS),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgScheduleBlock: f.form('Schedule Block', [
            f.section('Block Details', [
                ...f.reference('scheduleId', 'Schedule', 'MfgProdSchedule', true),
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.reference('operationId', 'Operation', 'MfgWorkOrderOp'),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter', true),
                ...f.text('startTime', 'Start Time', true),
                ...f.text('endTime', 'End Time', true),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    MfgPlanning.primaryKeys = {
        MfgMrpRun: 'runId',
        MfgMrpRequirement: 'requirementId',
        MfgCapacityPlan: 'planId',
        MfgCapacityLoad: 'loadId',
        MfgProdSchedule: 'scheduleId',
        MfgScheduleBlock: 'blockId'
    };

})();
