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

    window.MobileMfgPlanning = window.MobileMfgPlanning || {};
    const render = MobileMfgPlanning.render;

    MobileMfgPlanning.columns = {
        MfgMrpRun: [
            { key: 'runId', label: 'ID', sortKey: 'runId' },
            { key: 'runNumber', label: 'Run #', sortKey: 'runNumber' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'runDate', label: 'Run Date', sortKey: 'runDate', render: (item) => render.date(item.runDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.mrpStatus(item.status) }
        ],
        MfgMrpRequirement: [
            { key: 'requirementId', label: 'ID', sortKey: 'requirementId' },
            { key: 'runId', label: 'MRP Run', sortKey: 'runId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'requirementType', label: 'Type', sortKey: 'requirementType', render: (item) => render.requirementType(item.requirementType) },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            { key: 'requiredDate', label: 'Required Date', sortKey: 'requiredDate', render: (item) => render.date(item.requiredDate) }
        ],
        MfgCapacityPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId' },
            { key: 'planNumber', label: 'Plan #', sortKey: 'planNumber' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => render.date(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => render.date(item.endDate) }
        ],
        MfgCapacityLoad: [
            { key: 'loadId', label: 'ID', sortKey: 'loadId' },
            { key: 'planId', label: 'Capacity Plan', sortKey: 'planId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'periodDate', label: 'Period', sortKey: 'periodDate', render: (item) => render.date(item.periodDate) },
            { key: 'requiredHours', label: 'Required Hrs', sortKey: 'requiredHours' },
            { key: 'availableHours', label: 'Available Hrs', sortKey: 'availableHours' },
            { key: 'loadPercent', label: 'Load %', sortKey: 'loadPercent' }
        ],
        MfgProdSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId' },
            { key: 'scheduleName', label: 'Name', sortKey: 'scheduleName' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => render.date(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => render.date(item.endDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.scheduleStatus(item.status) }
        ],
        MfgScheduleBlock: [
            { key: 'blockId', label: 'ID', sortKey: 'blockId' },
            { key: 'scheduleId', label: 'Schedule', sortKey: 'scheduleId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'startTime', label: 'Start', sortKey: 'startTime', render: (item) => render.date(item.startTime) },
            { key: 'endTime', label: 'End', sortKey: 'endTime', render: (item) => render.date(item.endTime) }
        ]
    };

})();
