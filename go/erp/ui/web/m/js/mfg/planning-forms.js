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
 * Mobile Manufacturing Planning Module - Form Definitions
 * Desktop Equivalent: mfg/planning/planning-forms.js
 */
(function() {
    'use strict';

    window.MobileMfgPlanning = window.MobileMfgPlanning || {};
    const enums = MobileMfgPlanning.enums;

    MobileMfgPlanning.forms = {
        MfgMrpRun: {
            title: 'MRP Run',
            sections: [{ title: 'Run Details', fields: [
                { key: 'runNumber', label: 'Run Number', type: 'text', required: true },
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'runDate', label: 'Run Date', type: 'date' },
                { key: 'planningHorizonDays', label: 'Planning Horizon (days)', type: 'number' },
                { key: 'status', label: 'Status', type: 'select', options: enums.MRP_STATUS },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgMrpRequirement: {
            title: 'MRP Requirement',
            sections: [{ title: 'Requirement Details', fields: [
                { key: 'runId', label: 'MRP Run', type: 'reference', lookupModel: 'MfgMrpRun', required: true },
                { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                { key: 'requirementType', label: 'Type', type: 'select', options: enums.REQUIREMENT_TYPE },
                { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                { key: 'requiredDate', label: 'Required Date', type: 'date' },
                { key: 'sourceOrderId', label: 'Source Order', type: 'text' },
                { key: 'sourceOrderType', label: 'Source Type', type: 'text' },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgCapacityPlan: {
            title: 'Capacity Plan',
            sections: [{ title: 'Plan Details', fields: [
                { key: 'planNumber', label: 'Plan Number', type: 'text', required: true },
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                { key: 'endDate', label: 'End Date', type: 'date', required: true },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgCapacityLoad: {
            title: 'Capacity Load',
            sections: [{ title: 'Load Details', fields: [
                { key: 'planId', label: 'Capacity Plan', type: 'reference', lookupModel: 'MfgCapacityPlan', required: true },
                { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter', required: true },
                { key: 'periodDate', label: 'Period Date', type: 'date', required: true },
                { key: 'requiredHours', label: 'Required Hours', type: 'number' },
                { key: 'availableHours', label: 'Available Hours', type: 'number' },
                { key: 'loadPercent', label: 'Load %', type: 'number' }
            ]}]
        },
        MfgProdSchedule: {
            title: 'Production Schedule',
            sections: [{ title: 'Schedule Details', fields: [
                { key: 'scheduleName', label: 'Schedule Name', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                { key: 'endDate', label: 'End Date', type: 'date', required: true },
                { key: 'status', label: 'Status', type: 'select', options: enums.SCHEDULE_STATUS },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgScheduleBlock: {
            title: 'Schedule Block',
            sections: [{ title: 'Block Details', fields: [
                { key: 'scheduleId', label: 'Schedule', type: 'reference', lookupModel: 'MfgProdSchedule', required: true },
                { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                { key: 'operationId', label: 'Operation', type: 'reference', lookupModel: 'MfgWorkOrderOp' },
                { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter', required: true },
                { key: 'startTime', label: 'Start Time', type: 'datetime', required: true },
                { key: 'endTime', label: 'End Time', type: 'datetime', required: true },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        }
    };

    MobileMfgPlanning.primaryKeys = {
        MfgMrpRun: 'runId', MfgMrpRequirement: 'requirementId', MfgCapacityPlan: 'planId',
        MfgCapacityLoad: 'loadId', MfgProdSchedule: 'scheduleId', MfgScheduleBlock: 'blockId'
    };

})();
