/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile PRJ Planning Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobilePrjPlanning = window.MobilePrjPlanning || {};

    const f = window.Layer8FormFactory;
    const enums = MobilePrjPlanning.enums;

    MobilePrjPlanning.forms = {
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
        ]),

        PrjPhase: f.form('Phase', [
            f.section('Phase Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.number('sequence', 'Sequence'),
                ...f.select('status', 'Status', enums.PROJECT_STATUS)
            ]),
            f.section('Schedule', [
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.date('actualStartDate', 'Actual Start'),
                ...f.date('actualEndDate', 'Actual End'),
                ...f.number('estimatedHours', 'Estimated Hours'),
                ...f.number('actualHours', 'Actual Hours'),
                ...f.number('percentComplete', '% Complete')
            ])
        ]),

        PrjTask: f.form('Task', [
            f.section('Task Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('phaseId', 'Phase', 'PrjPhase'),
                ...f.reference('parentTaskId', 'Parent Task', 'PrjTask'),
                ...f.text('wbsCode', 'WBS Code'),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.TASK_STATUS),
                ...f.select('priority', 'Priority', enums.TASK_PRIORITY),
                ...f.reference('assigneeId', 'Assigned To', 'Employee')
            ]),
            f.section('Schedule', [
                ...f.date('startDate', 'Start Date'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('actualStartDate', 'Actual Start'),
                ...f.date('actualEndDate', 'Actual End'),
                ...f.number('estimatedHours', 'Estimated Hours'),
                ...f.number('actualHours', 'Actual Hours'),
                ...f.number('remainingHours', 'Remaining Hours'),
                ...f.number('percentComplete', '% Complete')
            ]),
            f.section('Options', [
                ...f.checkbox('isBillable', 'Billable'),
                ...f.checkbox('isMilestone', 'Milestone Task')
            ])
        ]),

        PrjMilestone: f.form('Milestone', [
            f.section('Milestone Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('phaseId', 'Phase', 'PrjPhase'),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.MILESTONE_STATUS),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('Dates', [
                ...f.date('targetDate', 'Target Date', true),
                ...f.date('actualDate', 'Achieved Date')
            ]),
            f.section('Billing', [
                ...f.checkbox('isBillable', 'Billable'),
                ...f.money('billingAmount', 'Billing Amount')
            ])
        ]),

        PrjDeliverable: f.form('Deliverable', [
            f.section('Deliverable Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('milestoneId', 'Milestone', 'PrjMilestone'),
                ...f.reference('taskId', 'Task', 'PrjTask'),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.date('dueDate', 'Due Date'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Delivery Status', [
                ...f.checkbox('isDelivered', 'Delivered'),
                ...f.date('deliveredDate', 'Delivered Date'),
                ...f.text('acceptedBy', 'Accepted By'),
                ...f.date('acceptanceDate', 'Acceptance Date')
            ])
        ]),

        PrjDependency: f.form('Dependency', [
            f.section('Dependency Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('predecessorTaskId', 'Predecessor Task', 'PrjTask', true),
                ...f.reference('successorTaskId', 'Successor Task', 'PrjTask', true),
                ...f.select('dependencyType', 'Dependency Type', enums.DEPENDENCY_TYPE),
                ...f.number('lagDays', 'Lag Days')
            ])
        ]),

        PrjRisk: f.form('Risk', [
            f.section('Risk Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('category', 'Category'),
                ...f.select('severity', 'Severity', enums.RISK_SEVERITY),
                ...f.select('status', 'Status', enums.RISK_STATUS),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('Assessment', [
                ...f.number('probability', 'Probability (%)'),
                ...f.money('potentialImpact', 'Potential Impact'),
                ...f.textarea('impactDescription', 'Impact Description')
            ]),
            f.section('Mitigation', [
                ...f.textarea('mitigationPlan', 'Mitigation Plan'),
                ...f.textarea('contingencyPlan', 'Contingency Plan')
            ]),
            f.section('Dates', [
                ...f.date('identifiedDate', 'Identified Date'),
                ...f.date('dueDate', 'Due Date')
            ])
        ])
    };

})();
