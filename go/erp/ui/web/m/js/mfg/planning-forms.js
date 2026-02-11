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
 * Mobile Manufacturing Planning Module - Form Definitions
 * Desktop Equivalent: mfg/planning/planning-forms.js
 */
(function() {
    'use strict';

    window.MobileMfgPlanning = window.MobileMfgPlanning || {};
    const f = window.Layer8FormFactory;
    const enums = MobileMfgPlanning.enums;

    MobileMfgPlanning.forms = {
        MfgMrpRun: f.form('MRP Run', [
            f.section('Run Details', [
                ...f.text('runNumber', 'Run Number', true),
                ...f.textarea('description', 'Description'),
                ...f.date('runDate', 'Run Date'),
                ...f.date('planningHorizonStart', 'Horizon Start'),
                ...f.date('planningHorizonEnd', 'Horizon End'),
                ...f.select('status', 'Status', enums.MRP_STATUS),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Requirements', [
                ...f.inlineTable('requirements', 'MRP Requirements', [
                    { key: 'requirementId', label: 'ID', hidden: true },
                    { key: 'itemId', label: 'Item', type: 'text' },
                    { key: 'requirementType', label: 'Type', type: 'text' },
                    { key: 'quantity', label: 'Quantity', type: 'number' },
                    { key: 'requiredDate', label: 'Required Date', type: 'date' }
                ])
            ])
        ]),
        MfgCapacityPlan: f.form('Capacity Plan', [
            f.section('Plan Details', [
                ...f.text('planNumber', 'Plan Number', true),
                ...f.textarea('description', 'Description'),
                ...f.date('planningStart', 'Planning Start', true),
                ...f.date('planningEnd', 'Planning End', true),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Capacity Loads', [
                ...f.inlineTable('loads', 'Capacity Loads', [
                    { key: 'loadId', label: 'ID', hidden: true },
                    { key: 'workCenterId', label: 'Work Center', type: 'text' },
                    { key: 'periodStart', label: 'Period Start', type: 'date' },
                    { key: 'periodEnd', label: 'Period End', type: 'date' },
                    { key: 'availableHours', label: 'Available Hrs', type: 'number' },
                    { key: 'requiredHours', label: 'Required Hrs', type: 'number' },
                    { key: 'loadPercent', label: 'Load %', type: 'number' }
                ])
            ])
        ]),
        MfgProdSchedule: f.form('Production Schedule', [
            f.section('Schedule Details', [
                ...f.text('scheduleNumber', 'Schedule Number', true),
                ...f.textarea('description', 'Description'),
                ...f.date('scheduleStart', 'Schedule Start', true),
                ...f.date('scheduleEnd', 'Schedule End', true),
                ...f.select('status', 'Status', enums.SCHEDULE_STATUS),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Schedule Blocks', [
                ...f.inlineTable('blocks', 'Schedule Blocks', [
                    { key: 'blockId', label: 'ID', hidden: true },
                    { key: 'workOrderId', label: 'Work Order', type: 'text' },
                    { key: 'operationId', label: 'Operation', type: 'text' },
                    { key: 'workCenterId', label: 'Work Center', type: 'text' },
                    { key: 'scheduledStart', label: 'Start', type: 'date' },
                    { key: 'scheduledEnd', label: 'End', type: 'date' }
                ])
            ])
        ])
    };

    MobileMfgPlanning.primaryKeys = {
        MfgMrpRun: 'runId', MfgCapacityPlan: 'planId', MfgProdSchedule: 'scheduleId'
    };

})();
