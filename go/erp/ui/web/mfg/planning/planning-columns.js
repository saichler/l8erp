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
// Manufacturing Planning Module - Column Configurations

(function() {
    'use strict';

    window.MfgPlanning = window.MfgPlanning || {};

    const { renderDate } = Layer8DRenderers;
    const render = MfgPlanning.render;

    MfgPlanning.columns = {
        MfgMrpRun: [
            { key: 'runId', label: 'ID', sortKey: 'runId', filterKey: 'runId' },
            { key: 'runNumber', label: 'Run #', sortKey: 'runNumber', filterKey: 'runNumber' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            {
                key: 'runDate',
                label: 'Run Date',
                sortKey: 'runDate',
                render: (item) => renderDate(item.runDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.mrpStatus(item.status)
            }
        ],

        MfgMrpRequirement: [
            { key: 'requirementId', label: 'ID', sortKey: 'requirementId', filterKey: 'requirementId' },
            { key: 'runId', label: 'MRP Run', sortKey: 'runId', filterKey: 'runId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            {
                key: 'requirementType',
                label: 'Type',
                sortKey: 'requirementType',
                render: (item) => render.requirementType(item.requirementType)
            },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'requiredDate',
                label: 'Required Date',
                sortKey: 'requiredDate',
                render: (item) => renderDate(item.requiredDate)
            }
        ],

        MfgCapacityPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'planNumber', label: 'Plan #', sortKey: 'planNumber', filterKey: 'planNumber' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            {
                key: 'planningStart',
                label: 'Start Date',
                sortKey: 'planningStart',
                render: (item) => renderDate(item.planningStart)
            },
            {
                key: 'planningEnd',
                label: 'End Date',
                sortKey: 'planningEnd',
                render: (item) => renderDate(item.planningEnd)
            }
        ],

        MfgCapacityLoad: [
            { key: 'loadId', label: 'ID', sortKey: 'loadId', filterKey: 'loadId' },
            { key: 'planId', label: 'Capacity Plan', sortKey: 'planId', filterKey: 'planId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            {
                key: 'periodStart',
                label: 'Period Start',
                sortKey: 'periodStart',
                render: (item) => renderDate(item.periodStart)
            },
            { key: 'requiredHours', label: 'Required Hrs', sortKey: 'requiredHours' },
            { key: 'availableHours', label: 'Available Hrs', sortKey: 'availableHours' },
            { key: 'loadPercent', label: 'Load %', sortKey: 'loadPercent' }
        ],

        MfgProdSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'scheduleNumber', label: 'Schedule #', sortKey: 'scheduleNumber', filterKey: 'scheduleNumber' },
            {
                key: 'scheduleStart',
                label: 'Start Date',
                sortKey: 'scheduleStart',
                render: (item) => renderDate(item.scheduleStart)
            },
            {
                key: 'scheduleEnd',
                label: 'End Date',
                sortKey: 'scheduleEnd',
                render: (item) => renderDate(item.scheduleEnd)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.scheduleStatus(item.status)
            }
        ],

        MfgScheduleBlock: [
            { key: 'blockId', label: 'ID', sortKey: 'blockId', filterKey: 'blockId' },
            { key: 'scheduleId', label: 'Schedule', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            {
                key: 'scheduledStart',
                label: 'Start',
                sortKey: 'scheduledStart',
                render: (item) => renderDate(item.scheduledStart)
            },
            {
                key: 'scheduledEnd',
                label: 'End',
                sortKey: 'scheduledEnd',
                render: (item) => renderDate(item.scheduledEnd)
            }
        ]
    };

})();
