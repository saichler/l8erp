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
 * Mobile Manufacturing Planning Module - Column Definitions
 * Desktop Equivalent: mfg/planning/planning-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    window.MobileMfgPlanning = window.MobileMfgPlanning || {};
    const render = MobileMfgPlanning.render;

    MobileMfgPlanning.columns = {
        MfgMrpRun: [
            ...col.id('runId'),
            ...col.col('runNumber', 'Run #'),
            ...col.col('description', 'Description'),
            ...col.date('runDate', 'Run Date'),
            ...col.enum('status', 'Status', null, render.mrpStatus)
        ],
        MfgMrpRequirement: [
            ...col.id('requirementId'),
            ...col.col('runId', 'MRP Run'),
            ...col.col('itemId', 'Item'),
            ...col.enum('requirementType', 'Type', null, render.requirementType),
            ...col.col('quantity', 'Quantity'),
            ...col.date('requiredDate', 'Required Date')
        ],
        MfgCapacityPlan: [
            ...col.id('planId'),
            ...col.col('planNumber', 'Plan #'),
            ...col.col('description', 'Description'),
            ...col.date('planningStart', 'Planning Start'),
            ...col.date('planningEnd', 'Planning End')
        ],
        MfgCapacityLoad: [
            ...col.id('loadId'),
            ...col.col('planId', 'Capacity Plan'),
            ...col.col('workCenterId', 'Work Center'),
            ...col.date('periodStart', 'Period Start'),
            ...col.col('requiredHours', 'Required Hrs'),
            ...col.col('availableHours', 'Available Hrs'),
            ...col.col('loadPercent', 'Load %')
        ],
        MfgProdSchedule: [
            ...col.id('scheduleId'),
            ...col.col('scheduleNumber', 'Schedule #'),
            ...col.date('scheduleStart', 'Start Date'),
            ...col.date('scheduleEnd', 'End Date'),
            ...col.enum('status', 'Status', null, render.scheduleStatus)
        ],
        MfgScheduleBlock: [
            ...col.id('blockId'),
            ...col.col('scheduleId', 'Schedule'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.col('workCenterId', 'Work Center'),
            ...col.date('scheduledStart', 'Start'),
            ...col.date('scheduledEnd', 'End')
        ]
    };

})();
