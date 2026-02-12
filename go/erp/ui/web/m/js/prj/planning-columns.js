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

    };

    MobilePrjPlanning.primaryKeys = {
        PrjProject: 'projectId', PrjProjectTemplate: 'templateId'
    };

})();
