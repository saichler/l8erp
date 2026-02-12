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

    const f = window.Layer8FormFactory;
    const enums = PrjPlanning.enums;

    PrjPlanning.forms = {
        PrjProject: f.form('Project', [
            f.section('Project Details', [
                ...f.text('name', 'Name', true),
                ...f.text('code', 'Code', true),
                ...f.textarea('description', 'Description'),
                ...f.select('projectType', 'Project Type', enums.PROJECT_TYPE),
                ...f.select('status', 'Status', enums.PROJECT_STATUS),
                ...f.select('priority', 'Priority', enums.PROJECT_PRIORITY),
                ...f.reference('templateId', 'Template', 'PrjProjectTemplate')
            ]),
            f.section('Associations', [
                ...f.reference('customerId', 'Customer', 'Customer'),
                ...f.reference('accountId', 'Account', 'CrmAccount'),
                ...f.reference('managerId', 'Manager', 'Employee'),
                ...f.reference('departmentId', 'Department', 'Department'),
                ...f.reference('opportunityId', 'Opportunity', 'CrmOpportunity')
            ]),
            f.section('Schedule', [
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.date('actualStartDate', 'Actual Start'),
                ...f.date('actualEndDate', 'Actual End'),
                ...f.number('estimatedHours', 'Estimated Hours'),
                ...f.number('actualHours', 'Actual Hours'),
                ...f.number('percentComplete', '% Complete')
            ]),
            f.section('Financials', [
                ...f.money('budget', 'Budget'),
                ...f.money('actualCost', 'Actual Cost'),
                ...f.select('billingType', 'Billing Type', enums.PROJECT_TYPE)
            ]),
            f.section('Phases', [
                ...f.inlineTable('phases', 'Phases', [
                    { key: 'phaseId', label: 'Phase ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'sequence', label: 'Sequence', type: 'number' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.PROJECT_STATUS },
                    { key: 'startDate', label: 'Start', type: 'date' },
                    { key: 'endDate', label: 'End', type: 'date' },
                    { key: 'percentComplete', label: '% Complete', type: 'number' }
                ])
            ]),
            f.section('Tasks', [
                ...f.inlineTable('tasks', 'Tasks', [
                    { key: 'taskId', label: 'Task ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                    { key: 'priority', label: 'Priority', type: 'select', options: enums.TASK_PRIORITY },
                    { key: 'assigneeId', label: 'Assignee', type: 'text' },
                    { key: 'startDate', label: 'Start', type: 'date' },
                    { key: 'dueDate', label: 'Due', type: 'date' },
                    { key: 'percentComplete', label: '% Complete', type: 'number' }
                ])
            ]),
            f.section('Milestones', [
                ...f.inlineTable('milestones', 'Milestones', [
                    { key: 'milestoneId', label: 'Milestone ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'status', label: 'Status', type: 'select', options: enums.MILESTONE_STATUS },
                    { key: 'targetDate', label: 'Target Date', type: 'date', required: true },
                    { key: 'actualDate', label: 'Achieved', type: 'date' },
                    { key: 'isBillable', label: 'Billable', type: 'checkbox' }
                ])
            ]),
            f.section('Deliverables', [
                ...f.inlineTable('deliverables', 'Deliverables', [
                    { key: 'deliverableId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'dueDate', label: 'Due Date', type: 'date' },
                    { key: 'isDelivered', label: 'Delivered', type: 'checkbox' },
                    { key: 'deliveredDate', label: 'Delivered Date', type: 'date' },
                    { key: 'acceptedBy', label: 'Accepted By', type: 'text' }
                ])
            ]),
            f.section('Dependencies', [
                ...f.inlineTable('dependencies', 'Dependencies', [
                    { key: 'dependencyId', label: 'ID', hidden: true },
                    { key: 'predecessorTaskId', label: 'Predecessor', type: 'text', required: true },
                    { key: 'successorTaskId', label: 'Successor', type: 'text', required: true },
                    { key: 'dependencyType', label: 'Type', type: 'select', options: enums.DEPENDENCY_TYPE },
                    { key: 'lagDays', label: 'Lag Days', type: 'number' }
                ])
            ]),
            f.section('Risks', [
                ...f.inlineTable('risks', 'Risks', [
                    { key: 'riskId', label: 'Risk ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'severity', label: 'Severity', type: 'select', options: enums.RISK_SEVERITY },
                    { key: 'status', label: 'Status', type: 'select', options: enums.RISK_STATUS },
                    { key: 'probability', label: 'Probability %', type: 'number' },
                    { key: 'potentialImpact', label: 'Impact', type: 'money' }
                ])
            ]),
            f.section('Issues', [
                ...f.inlineTable('issues', 'Issues', [
                    { key: 'issueId', label: 'Issue ID', hidden: true },
                    { key: 'title', label: 'Title', type: 'text', required: true },
                    { key: 'status', label: 'Status', type: 'select', options: enums.ISSUE_STATUS },
                    { key: 'priority', label: 'Priority', type: 'select', options: enums.ISSUE_PRIORITY },
                    { key: 'assignedTo', label: 'Assigned To', type: 'text' },
                    { key: 'reportedDate', label: 'Reported', type: 'date' },
                    { key: 'dueDate', label: 'Due', type: 'date' }
                ])
            ]),
            f.section('Earned Values', [
                ...f.inlineTable('earnedValues', 'Earned Values', [
                    { key: 'earnedValueId', label: 'ID', hidden: true },
                    { key: 'asOfDate', label: 'As Of Date', type: 'date', required: true },
                    { key: 'plannedValue', label: 'Planned Value', type: 'money' },
                    { key: 'earnedValue', label: 'Earned Value', type: 'money' },
                    { key: 'actualCost', label: 'Actual Cost', type: 'money' },
                    { key: 'schedulePerformanceIndex', label: 'SPI', type: 'number' },
                    { key: 'costPerformanceIndex', label: 'CPI', type: 'number' }
                ])
            ]),
            f.section('Budget Variances', [
                ...f.inlineTable('budgetVariances', 'Budget Variances', [
                    { key: 'varianceId', label: 'ID', hidden: true },
                    { key: 'asOfDate', label: 'As Of Date', type: 'date', required: true },
                    { key: 'category', label: 'Category', type: 'text' },
                    { key: 'budgetedAmount', label: 'Budgeted', type: 'money' },
                    { key: 'actualAmount', label: 'Actual', type: 'money' },
                    { key: 'varianceAmount', label: 'Variance', type: 'money' },
                    { key: 'variancePercent', label: 'Variance %', type: 'number' }
                ])
            ]),
            f.section('Resource Forecasts', [
                ...f.inlineTable('resourceForecasts', 'Resource Forecasts', [
                    { key: 'forecastId', label: 'ID', hidden: true },
                    { key: 'resourceId', label: 'Resource', type: 'text' },
                    { key: 'periodStart', label: 'Period Start', type: 'date', required: true },
                    { key: 'periodEnd', label: 'Period End', type: 'date', required: true },
                    { key: 'forecastedHours', label: 'Forecasted Hours', type: 'number' },
                    { key: 'confirmedHours', label: 'Confirmed Hours', type: 'number' },
                    { key: 'gapHours', label: 'Gap Hours', type: 'number' }
                ])
            ])
        ]),

        PrjProjectTemplate: f.form('Project Template', [
            f.section('Template Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('projectType', 'Project Type', enums.PROJECT_TYPE),
                ...f.number('defaultEstimatedHours', 'Default Hours'),
                ...f.money('defaultBudget', 'Default Budget'),
                ...f.select('defaultBillingType', 'Default Billing Type', enums.PROJECT_TYPE),
                ...f.checkbox('isActive', 'Active')
            ])
        ])
    };

    PrjPlanning.primaryKeys = {
        PrjProject: 'projectId',
        PrjProjectTemplate: 'templateId'
    };

})();
