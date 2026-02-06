/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Projects Planning Module - Column Configurations
// Uses Layer8ColumnFactory for reduced boilerplate

(function() {
    'use strict';

    window.PrjPlanning = window.PrjPlanning || {};

    const col = window.Layer8ColumnFactory;
    const render = PrjPlanning.render;

    PrjPlanning.columns = {
        PrjProject: [
            ...col.id('projectId'),
            ...col.basic(['name', 'code']),
            ...col.enum('projectType', 'Type', null, render.projectType),
            ...col.enum('status', 'Status', null, render.projectStatus),
            ...col.enum('priority', 'Priority', null, render.projectPriority),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.custom('percentComplete', '% Complete', (item) => item.percentComplete, { sortKey: 'percentComplete' })
        ],

        PrjProjectTemplate: [
            ...col.id('templateId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.enum('projectType', 'Type', null, render.projectType),
            ...col.custom('isActive', 'Active', (item) => item.isActive ? 'Yes' : 'No', { sortKey: 'isActive' })
        ],

        PrjPhase: [
            ...col.id('phaseId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.custom('sequence', 'Sequence', (item) => item.sequence, { sortKey: 'sequence' }),
            ...col.enum('status', 'Status', null, render.projectStatus),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.custom('percentComplete', '% Complete', (item) => item.percentComplete, { sortKey: 'percentComplete' })
        ],

        PrjTask: [
            ...col.id('taskId'),
            ...col.col('phaseId', 'Phase'),
            ...col.col('name', 'Name'),
            ...col.enum('status', 'Status', null, render.taskStatus),
            ...col.enum('priority', 'Priority', null, render.taskPriority),
            ...col.col('assigneeId', 'Assigned To'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.custom('percentComplete', '% Complete', (item) => item.percentComplete, { sortKey: 'percentComplete' })
        ],

        PrjMilestone: [
            ...col.id('milestoneId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.enum('status', 'Status', null, render.milestoneStatus),
            ...col.date('targetDate', 'Target Date'),
            ...col.date('actualDate', 'Achieved Date'),
            ...col.custom('isBillable', 'Billable', (item) => item.isBillable ? 'Yes' : 'No', { sortKey: 'isBillable' })
        ],

        PrjDeliverable: [
            ...col.id('deliverableId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.custom('isDelivered', 'Status', (item) => item.isDelivered ? 'Delivered' : 'Pending', { sortKey: 'isDelivered' }),
            ...col.date('dueDate', 'Due Date'),
            ...col.col('acceptedBy', 'Accepted By')
        ],

        PrjDependency: [
            ...col.id('dependencyId'),
            ...col.col('projectId', 'Project'),
            ...col.col('predecessorTaskId', 'Predecessor'),
            ...col.col('successorTaskId', 'Successor'),
            ...col.enum('dependencyType', 'Type', null, render.dependencyType),
            ...col.custom('lagDays', 'Lag Days', (item) => item.lagDays, { sortKey: 'lagDays' })
        ],

        PrjRisk: [
            ...col.id('riskId'),
            ...col.col('projectId', 'Project'),
            ...col.col('name', 'Name'),
            ...col.enum('severity', 'Severity', null, render.riskSeverity),
            ...col.enum('status', 'Status', null, render.riskStatus),
            ...col.custom('probability', 'Probability %', (item) => item.probability, { sortKey: 'probability' }),
            ...col.money('potentialImpact', 'Impact'),
            ...col.col('ownerId', 'Owner')
        ]
    };

})();
