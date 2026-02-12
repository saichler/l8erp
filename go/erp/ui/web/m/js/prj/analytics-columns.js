/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobilePrjAnalytics.enums;
    const render = MobilePrjAnalytics.render;

    MobilePrjAnalytics.columns = {
        PrjStatusReport: [
            ...col.id('statusId'),
            ...col.col('projectId', 'Project'),
            ...col.date('reportDate', 'Report Date'),
            ...col.status('overallHealth', 'Overall Health', enums.HEALTH_INDICATOR_VALUES, render.healthIndicator),
            ...col.status('scheduleHealth', 'Schedule Health', enums.HEALTH_INDICATOR_VALUES, render.healthIndicator),
            ...col.status('budgetHealth', 'Budget Health', enums.HEALTH_INDICATOR_VALUES, render.healthIndicator),
            ...col.status('resourceHealth', 'Resource Health', enums.HEALTH_INDICATOR_VALUES, render.healthIndicator),
            ...col.col('percentComplete', '% Complete')
        ],

        PrjPortfolioView: [
            ...col.id('viewId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('ownerId', 'Owner'),
            ...col.col('totalProjects', 'Total Projects'),
            ...col.col('onTrackCount', 'On Track'),
            ...col.col('atRiskCount', 'At Risk'),
            ...col.col('offTrackCount', 'Off Track')
        ],

        PrjProjectKPI: [
            ...col.id('kpiId'),
            ...col.col('projectId', 'Project'),
            ...col.col('kpiName', 'KPI Name'),
            ...col.col('targetValue', 'Target'),
            ...col.col('actualValue', 'Actual'),
            ...col.col('unitOfMeasure', 'Unit'),
            ...col.date('measurementDate', 'Measurement Date'),
            ...col.col('trend', 'Trend')
        ],

    };

    MobilePrjAnalytics.primaryKeys = {
        PrjStatusReport: 'statusId',
        PrjPortfolioView: 'viewId', PrjProjectKPI: 'kpiId'
    };

})();
