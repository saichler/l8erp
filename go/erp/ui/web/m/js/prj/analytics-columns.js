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

        PrjEarnedValue: [
            ...col.id('earnedValueId'),
            ...col.col('projectId', 'Project'),
            ...col.date('asOfDate', 'As Of Date'),
            ...col.money('plannedValue', 'Planned Value'),
            ...col.money('earnedValue', 'Earned Value'),
            ...col.money('actualCost', 'Actual Cost'),
            ...col.money('scheduleVariance', 'Schedule Variance'),
            ...col.money('costVariance', 'Cost Variance'),
            ...col.col('schedulePerformanceIndex', 'SPI'),
            ...col.col('costPerformanceIndex', 'CPI')
        ],

        PrjBudgetVariance: [
            ...col.id('varianceId'),
            ...col.col('projectId', 'Project'),
            ...col.date('asOfDate', 'As Of Date'),
            ...col.money('budgetedAmount', 'Budgeted Amount'),
            ...col.money('actualAmount', 'Actual Amount'),
            ...col.money('varianceAmount', 'Variance'),
            ...col.col('variancePercent', 'Variance %'),
            ...col.col('category', 'Category')
        ],

        PrjResourceForecast: [
            ...col.id('forecastId'),
            ...col.col('projectId', 'Project'),
            ...col.col('resourceId', 'Resource'),
            ...col.date('periodStart', 'Period Start'),
            ...col.date('periodEnd', 'Period End'),
            ...col.col('forecastedHours', 'Forecasted Hours'),
            ...col.col('confirmedHours', 'Confirmed Hours'),
            ...col.col('gapHours', 'Gap Hours')
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

        PrjProjectIssue: [
            ...col.id('issueId'),
            ...col.col('projectId', 'Project'),
            ...col.col('title', 'Title'),
            ...col.status('status', 'Status', enums.ISSUE_STATUS_VALUES, render.issueStatus),
            ...col.status('priority', 'Priority', enums.ISSUE_PRIORITY_VALUES, render.issuePriority),
            ...col.col('assignedTo', 'Assigned To'),
            ...col.date('reportedDate', 'Reported Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.date('resolvedDate', 'Resolved Date')
        ]
    };

    MobilePrjAnalytics.primaryKeys = {
        PrjStatusReport: 'statusId', PrjEarnedValue: 'earnedValueId',
        PrjBudgetVariance: 'varianceId', PrjResourceForecast: 'forecastId',
        PrjPortfolioView: 'viewId', PrjProjectKPI: 'kpiId',
        PrjProjectIssue: 'issueId'
    };

})();
