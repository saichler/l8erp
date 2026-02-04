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
// Projects Planning Module - Column Configurations

(function() {
    'use strict';

    window.PrjPlanning = window.PrjPlanning || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = PrjPlanning.render;

    PrjPlanning.columns = {
        PrjProject: [
            { key: 'projectId', label: 'ID', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            {
                key: 'projectType',
                label: 'Type',
                sortKey: 'projectType',
                render: (item) => render.projectType(item.projectType)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.projectStatus(item.status)
            },
            {
                key: 'priority',
                label: 'Priority',
                sortKey: 'priority',
                render: (item) => render.projectPriority(item.priority)
            },
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
            { key: 'percentComplete', label: '% Complete', sortKey: 'percentComplete' }
        ],

        PrjProjectTemplate: [
            { key: 'templateId', label: 'ID', sortKey: 'templateId', filterKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            {
                key: 'projectType',
                label: 'Type',
                sortKey: 'projectType',
                render: (item) => render.projectType(item.projectType)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        PrjPhase: [
            { key: 'phaseId', label: 'ID', sortKey: 'phaseId', filterKey: 'phaseId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'sequence', label: 'Sequence', sortKey: 'sequence' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.projectStatus(item.status)
            },
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
            { key: 'percentComplete', label: '% Complete', sortKey: 'percentComplete' }
        ],

        PrjTask: [
            { key: 'taskId', label: 'ID', sortKey: 'taskId', filterKey: 'taskId' },
            { key: 'phaseId', label: 'Phase', sortKey: 'phaseId', filterKey: 'phaseId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            },
            {
                key: 'priority',
                label: 'Priority',
                sortKey: 'priority',
                render: (item) => render.taskPriority(item.priority)
            },
            { key: 'assigneeId', label: 'Assigned To', sortKey: 'assigneeId' },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            { key: 'percentComplete', label: '% Complete', sortKey: 'percentComplete' }
        ],

        PrjMilestone: [
            { key: 'milestoneId', label: 'ID', sortKey: 'milestoneId', filterKey: 'milestoneId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.milestoneStatus(item.status)
            },
            {
                key: 'targetDate',
                label: 'Target Date',
                sortKey: 'targetDate',
                render: (item) => renderDate(item.targetDate)
            },
            {
                key: 'actualDate',
                label: 'Achieved Date',
                sortKey: 'actualDate',
                render: (item) => renderDate(item.actualDate)
            },
            {
                key: 'isBillable',
                label: 'Billable',
                sortKey: 'isBillable',
                render: (item) => item.isBillable ? 'Yes' : 'No'
            }
        ],

        PrjDeliverable: [
            { key: 'deliverableId', label: 'ID', sortKey: 'deliverableId', filterKey: 'deliverableId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'isDelivered',
                label: 'Status',
                sortKey: 'isDelivered',
                render: (item) => item.isDelivered ? 'Delivered' : 'Pending'
            },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            {
                key: 'acceptedBy',
                label: 'Accepted By',
                sortKey: 'acceptedBy'
            }
        ],

        PrjDependency: [
            { key: 'dependencyId', label: 'ID', sortKey: 'dependencyId', filterKey: 'dependencyId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'predecessorTaskId', label: 'Predecessor', sortKey: 'predecessorTaskId' },
            { key: 'successorTaskId', label: 'Successor', sortKey: 'successorTaskId' },
            {
                key: 'dependencyType',
                label: 'Type',
                sortKey: 'dependencyType',
                render: (item) => render.dependencyType(item.dependencyType)
            },
            { key: 'lagDays', label: 'Lag Days', sortKey: 'lagDays' }
        ],

        PrjRisk: [
            { key: 'riskId', label: 'ID', sortKey: 'riskId', filterKey: 'riskId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'severity',
                label: 'Severity',
                sortKey: 'severity',
                render: (item) => render.riskSeverity(item.severity)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.riskStatus(item.status)
            },
            { key: 'probability', label: 'Probability %', sortKey: 'probability' },
            {
                key: 'potentialImpact',
                label: 'Impact',
                sortKey: 'potentialImpact',
                render: (item) => renderMoney(item.potentialImpact)
            },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' }
        ]
    };

})();
