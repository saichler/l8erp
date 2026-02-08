/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobilePrjPlanning.enums;
    const render = MobilePrjPlanning.render;

    MobilePrjPlanning.columns = {
        PrjProject: [
            ...col.id('projectId'),
            ...col.col('name', 'Name'),
            ...col.col('code', 'Code'),
            ...col.status('projectType', 'Type', enums.PROJECT_TYPE_VALUES, render.projectType),
            ...col.status('status', 'Status', enums.PROJECT_STATUS_VALUES, render.projectStatus),
            ...col.status('priority', 'Priority', enums.PROJECT_PRIORITY_VALUES, render.projectPriority),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.col('percentComplete', '% Complete')
        ],

        PrjProjectTemplate: [
            ...col.id('templateId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.status('projectType', 'Type', enums.PROJECT_TYPE_VALUES, render.projectType),
            ...col.boolean('isActive', 'Active')
        ],

        PrjPhase: [
            ...col.id('phaseId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.col('sequence', 'Sequence'),
            ...col.status('status', 'Status', enums.PROJECT_STATUS_VALUES, render.projectStatus),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.col('percentComplete', '% Complete')
        ],

        PrjTask: [
            ...col.id('taskId'),
            ...col.col('phaseId', 'Phase'),
            ...col.col('name', 'Name'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus),
            ...col.status('priority', 'Priority', enums.TASK_PRIORITY_VALUES, render.taskPriority),
            ...col.col('assigneeId', 'Assigned To'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.col('percentComplete', '% Complete')
        ],

        PrjMilestone: [
            ...col.id('milestoneId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.status('status', 'Status', enums.MILESTONE_STATUS_VALUES, render.milestoneStatus),
            ...col.date('targetDate', 'Target Date'),
            ...col.date('actualDate', 'Achieved Date'),
            ...col.boolean('isBillable', 'Billable')
        ],

        PrjDeliverable: [
            ...col.id('deliverableId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.custom('isDelivered', 'Status', (item) => item.isDelivered ? 'Delivered' : 'Pending'),
            ...col.date('dueDate', 'Due Date'),
            ...col.col('acceptedBy', 'Accepted By')
        ],

        PrjDependency: [
            ...col.id('dependencyId'),
            ...col.col('projectId', 'Project'),
            ...col.col('predecessorTaskId', 'Predecessor'),
            ...col.col('successorTaskId', 'Successor'),
            ...col.status('dependencyType', 'Type', enums.DEPENDENCY_TYPE_VALUES, render.dependencyType),
            ...col.col('lagDays', 'Lag Days')
        ],

        PrjRisk: [
            ...col.id('riskId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.status('severity', 'Severity', enums.RISK_SEVERITY_VALUES, render.riskSeverity),
            ...col.status('status', 'Status', enums.RISK_STATUS_VALUES, render.riskStatus),
            ...col.col('probability', 'Probability %'),
            ...col.money('potentialImpact', 'Impact'),
            ...col.col('ownerId', 'Owner')
        ]
    };

    MobilePrjPlanning.primaryKeys = {
        PrjProject: 'projectId', PrjProjectTemplate: 'templateId', PrjPhase: 'phaseId',
        PrjTask: 'taskId', PrjMilestone: 'milestoneId', PrjDeliverable: 'deliverableId',
        PrjDependency: 'dependencyId', PrjRisk: 'riskId'
    };

})();
