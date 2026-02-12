/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile PRJ Analytics Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobilePrjAnalytics = window.MobilePrjAnalytics || {};

    const f = window.Layer8FormFactory;
    const enums = MobilePrjAnalytics.enums;

    MobilePrjAnalytics.forms = {
        PrjStatusReport: f.form('Status Report', [
            f.section('Report Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.date('reportDate', 'Report Date', true),
                ...f.date('periodStart', 'Period Start'),
                ...f.date('periodEnd', 'Period End'),
                ...f.select('overallHealth', 'Overall Health', enums.HEALTH_INDICATOR),
                ...f.select('scheduleHealth', 'Schedule Health', enums.HEALTH_INDICATOR),
                ...f.select('budgetHealth', 'Budget Health', enums.HEALTH_INDICATOR),
                ...f.select('scopeHealth', 'Scope Health', enums.HEALTH_INDICATOR),
                ...f.select('resourceHealth', 'Resource Health', enums.HEALTH_INDICATOR),
                ...f.number('percentComplete', 'Percent Complete'),
                ...f.textarea('accomplishments', 'Accomplishments'),
                ...f.textarea('plannedActivities', 'Planned Activities'),
                ...f.textarea('issuesSummary', 'Issues Summary'),
                ...f.textarea('risksSummary', 'Risks Summary'),
                ...f.textarea('decisionsNeeded', 'Decisions Needed'),
                ...f.reference('reportedBy', 'Reported By', 'Employee')
            ])
        ]),

        PrjPortfolioView: f.form('Portfolio View', [
            f.section('View Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.reference('departmentId', 'Department', 'Department'),
                ...f.money('totalBudget', 'Total Budget'),
                ...f.money('totalActualCost', 'Total Actual Cost'),
                ...f.money('totalRevenue', 'Total Revenue'),
                ...f.money('totalProfit', 'Total Profit'),
                ...f.number('totalProjects', 'Total Projects'),
                ...f.number('onTrackCount', 'On Track Count'),
                ...f.number('atRiskCount', 'At Risk Count'),
                ...f.number('offTrackCount', 'Off Track Count'),
                ...f.number('avgUtilization', 'Average Utilization (%)'),
                ...f.number('avgMargin', 'Average Margin (%)'),
                ...f.date('asOfDate', 'As Of Date')
            ])
        ]),

        PrjProjectKPI: f.form('Project KPI', [
            f.section('KPI Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.text('kpiName', 'KPI Name', true),
                ...f.text('kpiCategory', 'KPI Category'),
                ...f.textarea('description', 'Description'),
                ...f.number('targetValue', 'Target Value', true),
                ...f.number('actualValue', 'Actual Value'),
                ...f.text('unitOfMeasure', 'Unit of Measure'),
                ...f.select('status', 'Status', enums.HEALTH_INDICATOR),
                ...f.number('variance', 'Variance'),
                ...f.number('variancePercent', 'Variance Percent'),
                ...f.date('measurementDate', 'Measurement Date'),
                ...f.text('measurementPeriod', 'Measurement Period'),
                ...f.text('trend', 'Trend'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
