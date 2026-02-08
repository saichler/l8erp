/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobilePrjAnalytics.enums;
    const render = MobilePrjAnalytics.render;

    MobilePrjAnalytics.columns = {
        PrjStatusReport: [
            { key: 'statusId', label: 'ID', sortKey: 'statusId', filterKey: 'statusId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'reportDate', label: 'Report Date', sortKey: 'reportDate', render: (item) => Layer8MRenderers.renderDate(item.reportDate) },
            { key: 'overallHealth', label: 'Overall Health', sortKey: 'overallHealth', enumValues: enums.HEALTH_INDICATOR_VALUES, render: (item) => render.healthIndicator(item.overallHealth) },
            { key: 'scheduleHealth', label: 'Schedule Health', sortKey: 'scheduleHealth', enumValues: enums.HEALTH_INDICATOR_VALUES, render: (item) => render.healthIndicator(item.scheduleHealth) },
            { key: 'budgetHealth', label: 'Budget Health', sortKey: 'budgetHealth', enumValues: enums.HEALTH_INDICATOR_VALUES, render: (item) => render.healthIndicator(item.budgetHealth) },
            { key: 'resourceHealth', label: 'Resource Health', sortKey: 'resourceHealth', enumValues: enums.HEALTH_INDICATOR_VALUES, render: (item) => render.healthIndicator(item.resourceHealth) },
            { key: 'percentComplete', label: '% Complete', sortKey: 'percentComplete' }
        ],

        PrjEarnedValue: [
            { key: 'earnedValueId', label: 'ID', sortKey: 'earnedValueId', filterKey: 'earnedValueId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'asOfDate', label: 'As Of Date', sortKey: 'asOfDate', render: (item) => Layer8MRenderers.renderDate(item.asOfDate) },
            { key: 'plannedValue', label: 'Planned Value', sortKey: 'plannedValue', render: (item) => Layer8MRenderers.renderMoney(item.plannedValue) },
            { key: 'earnedValue', label: 'Earned Value', sortKey: 'earnedValue', render: (item) => Layer8MRenderers.renderMoney(item.earnedValue) },
            { key: 'actualCost', label: 'Actual Cost', sortKey: 'actualCost', render: (item) => Layer8MRenderers.renderMoney(item.actualCost) },
            { key: 'scheduleVariance', label: 'Schedule Variance', sortKey: 'scheduleVariance', render: (item) => Layer8MRenderers.renderMoney(item.scheduleVariance) },
            { key: 'costVariance', label: 'Cost Variance', sortKey: 'costVariance', render: (item) => Layer8MRenderers.renderMoney(item.costVariance) },
            { key: 'schedulePerformanceIndex', label: 'SPI', sortKey: 'schedulePerformanceIndex' },
            { key: 'costPerformanceIndex', label: 'CPI', sortKey: 'costPerformanceIndex' }
        ],

        PrjBudgetVariance: [
            { key: 'varianceId', label: 'ID', sortKey: 'varianceId', filterKey: 'varianceId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'asOfDate', label: 'As Of Date', sortKey: 'asOfDate', render: (item) => Layer8MRenderers.renderDate(item.asOfDate) },
            { key: 'budgetedAmount', label: 'Budgeted Amount', sortKey: 'budgetedAmount', render: (item) => Layer8MRenderers.renderMoney(item.budgetedAmount) },
            { key: 'actualAmount', label: 'Actual Amount', sortKey: 'actualAmount', render: (item) => Layer8MRenderers.renderMoney(item.actualAmount) },
            { key: 'varianceAmount', label: 'Variance', sortKey: 'varianceAmount', render: (item) => Layer8MRenderers.renderMoney(item.varianceAmount) },
            { key: 'variancePercent', label: 'Variance %', sortKey: 'variancePercent' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category' }
        ],

        PrjResourceForecast: [
            { key: 'forecastId', label: 'ID', sortKey: 'forecastId', filterKey: 'forecastId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'resourceId', label: 'Resource', sortKey: 'resourceId', filterKey: 'resourceId' },
            { key: 'periodStart', label: 'Period Start', sortKey: 'periodStart', render: (item) => Layer8MRenderers.renderDate(item.periodStart) },
            { key: 'periodEnd', label: 'Period End', sortKey: 'periodEnd', render: (item) => Layer8MRenderers.renderDate(item.periodEnd) },
            { key: 'forecastedHours', label: 'Forecasted Hours', sortKey: 'forecastedHours' },
            { key: 'confirmedHours', label: 'Confirmed Hours', sortKey: 'confirmedHours' },
            { key: 'gapHours', label: 'Gap Hours', sortKey: 'gapHours' }
        ],

        PrjPortfolioView: [
            { key: 'viewId', label: 'ID', sortKey: 'viewId', filterKey: 'viewId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'totalProjects', label: 'Total Projects', sortKey: 'totalProjects' },
            { key: 'onTrackCount', label: 'On Track', sortKey: 'onTrackCount' },
            { key: 'atRiskCount', label: 'At Risk', sortKey: 'atRiskCount' },
            { key: 'offTrackCount', label: 'Off Track', sortKey: 'offTrackCount' }
        ],

        PrjProjectKPI: [
            { key: 'kpiId', label: 'ID', sortKey: 'kpiId', filterKey: 'kpiId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'kpiName', label: 'KPI Name', sortKey: 'kpiName', filterKey: 'kpiName' },
            { key: 'targetValue', label: 'Target', sortKey: 'targetValue' },
            { key: 'actualValue', label: 'Actual', sortKey: 'actualValue' },
            { key: 'unitOfMeasure', label: 'Unit', sortKey: 'unitOfMeasure' },
            { key: 'measurementDate', label: 'Measurement Date', sortKey: 'measurementDate', render: (item) => Layer8MRenderers.renderDate(item.measurementDate) },
            { key: 'trend', label: 'Trend', sortKey: 'trend' }
        ],

        PrjProjectIssue: [
            { key: 'issueId', label: 'ID', sortKey: 'issueId', filterKey: 'issueId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.ISSUE_STATUS_VALUES, render: (item) => render.issueStatus(item.status) },
            { key: 'priority', label: 'Priority', sortKey: 'priority', enumValues: enums.ISSUE_PRIORITY_VALUES, render: (item) => render.issuePriority(item.priority) },
            { key: 'assignedTo', label: 'Assigned To', sortKey: 'assignedTo' },
            { key: 'reportedDate', label: 'Reported Date', sortKey: 'reportedDate', render: (item) => Layer8MRenderers.renderDate(item.reportedDate) },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => Layer8MRenderers.renderDate(item.dueDate) },
            { key: 'resolvedDate', label: 'Resolved Date', sortKey: 'resolvedDate', render: (item) => Layer8MRenderers.renderDate(item.resolvedDate) }
        ]
    };

    MobilePrjAnalytics.primaryKeys = {
        PrjStatusReport: 'statusId', PrjEarnedValue: 'earnedValueId',
        PrjBudgetVariance: 'varianceId', PrjResourceForecast: 'forecastId',
        PrjPortfolioView: 'viewId', PrjProjectKPI: 'kpiId',
        PrjProjectIssue: 'issueId'
    };

})();
