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
            { key: 'name', label: 'Name', sortKey: 'name' },
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
            { key: 'name', label: 'Name', sortKey: 'name' },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End Date',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            }
        ],

        MfgCapacityLoad: [
            { key: 'loadId', label: 'ID', sortKey: 'loadId', filterKey: 'loadId' },
            { key: 'planId', label: 'Capacity Plan', sortKey: 'planId', filterKey: 'planId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            {
                key: 'periodDate',
                label: 'Period',
                sortKey: 'periodDate',
                render: (item) => renderDate(item.periodDate)
            },
            { key: 'requiredHours', label: 'Required Hrs', sortKey: 'requiredHours' },
            { key: 'availableHours', label: 'Available Hrs', sortKey: 'availableHours' },
            { key: 'loadPercent', label: 'Load %', sortKey: 'loadPercent' }
        ],

        MfgProdSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'scheduleName', label: 'Name', sortKey: 'scheduleName', filterKey: 'scheduleName' },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End Date',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
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
                key: 'startTime',
                label: 'Start',
                sortKey: 'startTime',
                render: (item) => renderDate(item.startTime)
            },
            {
                key: 'endTime',
                label: 'End',
                sortKey: 'endTime',
                render: (item) => renderDate(item.endTime)
            }
        ]
    };

})();
