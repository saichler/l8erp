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
        ]
    };

})();
