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
// Projects Planning Module - Form Definitions

(function() {
    'use strict';

    window.PrjPlanning = window.PrjPlanning || {};

    const enums = PrjPlanning.enums;

    PrjPlanning.forms = {
        PrjProject: {
            title: 'Project',
            sections: [
                {
                    title: 'Project Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'projectType', label: 'Project Type', type: 'select', options: enums.PROJECT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PROJECT_STATUS },
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.PROJECT_PRIORITY },
                        { key: 'templateId', label: 'Template', type: 'reference', lookupModel: 'PrjProjectTemplate' }
                    ]
                },
                {
                    title: 'Associations',
                    fields: [
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'FinCustomer' },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount' },
                        { key: 'managerId', label: 'Manager', type: 'reference', lookupModel: 'Employee' },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' },
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity' }
                    ]
                },
                {
                    title: 'Schedule',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'actualStartDate', label: 'Actual Start', type: 'date' },
                        { key: 'actualEndDate', label: 'Actual End', type: 'date' },
                        { key: 'estimatedHours', label: 'Estimated Hours', type: 'number' },
                        { key: 'actualHours', label: 'Actual Hours', type: 'number' },
                        { key: 'percentComplete', label: '% Complete', type: 'number' }
                    ]
                },
                {
                    title: 'Financials',
                    fields: [
                        { key: 'budget', label: 'Budget', type: 'money' },
                        { key: 'actualCost', label: 'Actual Cost', type: 'money' },
                        { key: 'billingType', label: 'Billing Type', type: 'select', options: enums.PROJECT_TYPE }
                    ]
                }
            ]
        },

        PrjProjectTemplate: {
            title: 'Project Template',
            sections: [
                {
                    title: 'Template Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'projectType', label: 'Project Type', type: 'select', options: enums.PROJECT_TYPE },
                        { key: 'defaultEstimatedHours', label: 'Default Hours', type: 'number' },
                        { key: 'defaultBudget', label: 'Default Budget', type: 'money' },
                        { key: 'defaultBillingType', label: 'Default Billing Type', type: 'select', options: enums.PROJECT_TYPE },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjPhase: {
            title: 'Phase',
            sections: [
                {
                    title: 'Phase Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'sequence', label: 'Sequence', type: 'number' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PROJECT_STATUS }
                    ]
                },
                {
                    title: 'Schedule',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'actualStartDate', label: 'Actual Start', type: 'date' },
                        { key: 'actualEndDate', label: 'Actual End', type: 'date' },
                        { key: 'estimatedHours', label: 'Estimated Hours', type: 'number' },
                        { key: 'actualHours', label: 'Actual Hours', type: 'number' },
                        { key: 'percentComplete', label: '% Complete', type: 'number' }
                    ]
                }
            ]
        },

        PrjTask: {
            title: 'Task',
            sections: [
                {
                    title: 'Task Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'phaseId', label: 'Phase', type: 'reference', lookupModel: 'PrjPhase' },
                        { key: 'parentTaskId', label: 'Parent Task', type: 'reference', lookupModel: 'PrjTask' },
                        { key: 'wbsCode', label: 'WBS Code', type: 'text' },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.TASK_PRIORITY },
                        { key: 'assigneeId', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Schedule',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'actualStartDate', label: 'Actual Start', type: 'date' },
                        { key: 'actualEndDate', label: 'Actual End', type: 'date' },
                        { key: 'estimatedHours', label: 'Estimated Hours', type: 'number' },
                        { key: 'actualHours', label: 'Actual Hours', type: 'number' },
                        { key: 'remainingHours', label: 'Remaining Hours', type: 'number' },
                        { key: 'percentComplete', label: '% Complete', type: 'number' }
                    ]
                },
                {
                    title: 'Options',
                    fields: [
                        { key: 'isBillable', label: 'Billable', type: 'checkbox' },
                        { key: 'isMilestone', label: 'Milestone Task', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjMilestone: {
            title: 'Milestone',
            sections: [
                {
                    title: 'Milestone Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'phaseId', label: 'Phase', type: 'reference', lookupModel: 'PrjPhase' },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.MILESTONE_STATUS },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'targetDate', label: 'Target Date', type: 'date', required: true },
                        { key: 'actualDate', label: 'Achieved Date', type: 'date' }
                    ]
                },
                {
                    title: 'Billing',
                    fields: [
                        { key: 'isBillable', label: 'Billable', type: 'checkbox' },
                        { key: 'billingAmount', label: 'Billing Amount', type: 'money' }
                    ]
                }
            ]
        },

        PrjDeliverable: {
            title: 'Deliverable',
            sections: [
                {
                    title: 'Deliverable Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'milestoneId', label: 'Milestone', type: 'reference', lookupModel: 'PrjMilestone' },
                        { key: 'taskId', label: 'Task', type: 'reference', lookupModel: 'PrjTask' },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                },
                {
                    title: 'Delivery Status',
                    fields: [
                        { key: 'isDelivered', label: 'Delivered', type: 'checkbox' },
                        { key: 'deliveredDate', label: 'Delivered Date', type: 'date' },
                        { key: 'acceptedBy', label: 'Accepted By', type: 'text' },
                        { key: 'acceptanceDate', label: 'Acceptance Date', type: 'date' }
                    ]
                }
            ]
        },

        PrjDependency: {
            title: 'Dependency',
            sections: [
                {
                    title: 'Dependency Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'predecessorTaskId', label: 'Predecessor Task', type: 'reference', lookupModel: 'PrjTask', required: true },
                        { key: 'successorTaskId', label: 'Successor Task', type: 'reference', lookupModel: 'PrjTask', required: true },
                        { key: 'dependencyType', label: 'Dependency Type', type: 'select', options: enums.DEPENDENCY_TYPE },
                        { key: 'lagDays', label: 'Lag Days', type: 'number' }
                    ]
                }
            ]
        },

        PrjRisk: {
            title: 'Risk',
            sections: [
                {
                    title: 'Risk Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'severity', label: 'Severity', type: 'select', options: enums.RISK_SEVERITY },
                        { key: 'status', label: 'Status', type: 'select', options: enums.RISK_STATUS },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Assessment',
                    fields: [
                        { key: 'probability', label: 'Probability (%)', type: 'number' },
                        { key: 'potentialImpact', label: 'Potential Impact', type: 'money' },
                        { key: 'impactDescription', label: 'Impact Description', type: 'textarea' }
                    ]
                },
                {
                    title: 'Mitigation',
                    fields: [
                        { key: 'mitigationPlan', label: 'Mitigation Plan', type: 'textarea' },
                        { key: 'contingencyPlan', label: 'Contingency Plan', type: 'textarea' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'identifiedDate', label: 'Identified Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' }
                    ]
                }
            ]
        }
    };

    PrjPlanning.primaryKeys = {
        PrjProject: 'projectId',
        PrjProjectTemplate: 'templateId',
        PrjPhase: 'phaseId',
        PrjTask: 'taskId',
        PrjMilestone: 'milestoneId',
        PrjDeliverable: 'deliverableId',
        PrjDependency: 'dependencyId',
        PrjRisk: 'riskId'
    };

})();
