/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Projects Analytics Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.PrjAnalytics = window.PrjAnalytics || {};

    const f = window.Layer8FormFactory;
    const enums = PrjAnalytics.enums;

    PrjAnalytics.forms = {
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

        PrjEarnedValue: f.form('Earned Value', [
            f.section('Earned Value Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.date('asOfDate', 'As Of Date', true),
                ...f.money('budgetAtCompletion', 'Budget at Completion (BAC)'),
                ...f.money('plannedValue', 'Planned Value (PV)'),
                ...f.money('earnedValue', 'Earned Value (EV)'),
                ...f.money('actualCost', 'Actual Cost (AC)'),
                ...f.money('scheduleVariance', 'Schedule Variance (SV)'),
                ...f.money('costVariance', 'Cost Variance (CV)'),
                ...f.number('schedulePerformanceIndex', 'Schedule Performance Index (SPI)'),
                ...f.number('costPerformanceIndex', 'Cost Performance Index (CPI)'),
                ...f.money('estimateAtCompletion', 'Estimate at Completion (EAC)'),
                ...f.money('estimateToComplete', 'Estimate to Complete (ETC)'),
                ...f.money('varianceAtCompletion', 'Variance at Completion (VAC)'),
                ...f.number('toCompletePerformanceIndex', 'To Complete Performance Index (TCPI)'),
                ...f.number('percentComplete', 'Percent Complete'),
                ...f.number('percentSpent', 'Percent Spent')
            ])
        ]),

        PrjBudgetVariance: f.form('Budget Variance', [
            f.section('Variance Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('budgetId', 'Budget', 'PrjProjectBudget'),
                ...f.reference('phaseId', 'Phase', 'PrjPhase'),
                ...f.date('asOfDate', 'As Of Date', true),
                ...f.text('category', 'Category'),
                ...f.money('budgetedAmount', 'Budgeted Amount'),
                ...f.money('actualAmount', 'Actual Amount'),
                ...f.money('varianceAmount', 'Variance Amount'),
                ...f.number('variancePercent', 'Variance Percent'),
                ...f.number('budgetedHours', 'Budgeted Hours'),
                ...f.number('actualHours', 'Actual Hours'),
                ...f.number('hoursVariance', 'Hours Variance'),
                ...f.textarea('varianceExplanation', 'Variance Explanation'),
                ...f.textarea('correctiveAction', 'Corrective Action')
            ])
        ]),

        PrjResourceForecast: f.form('Resource Forecast', [
            f.section('Forecast Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('resourceId', 'Resource', 'PrjResource'),
                ...f.reference('poolId', 'Resource Pool', 'PrjResourcePool'),
                ...f.text('skillCategory', 'Skill Category'),
                ...f.text('role', 'Role'),
                ...f.date('periodStart', 'Period Start', true),
                ...f.date('periodEnd', 'Period End', true),
                ...f.number('forecastedHours', 'Forecasted Hours'),
                ...f.number('confirmedHours', 'Confirmed Hours'),
                ...f.number('gapHours', 'Gap Hours'),
                ...f.number('headcountNeeded', 'Headcount Needed'),
                ...f.number('headcountAvailable', 'Headcount Available'),
                ...f.number('confidenceLevel', 'Confidence Level (%)'),
                ...f.textarea('notes', 'Notes')
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
        ]),

        PrjProjectIssue: f.form('Project Issue', [
            f.section('Issue Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('taskId', 'Task', 'PrjTask'),
                ...f.text('issueNumber', 'Issue Number'),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.text('category', 'Category'),
                ...f.select('status', 'Status', enums.ISSUE_STATUS),
                ...f.select('priority', 'Priority', enums.ISSUE_PRIORITY),
                ...f.reference('reportedBy', 'Reported By', 'Employee'),
                ...f.reference('assignedTo', 'Assigned To', 'Employee'),
                ...f.date('reportedDate', 'Reported Date'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('resolvedDate', 'Resolved Date'),
                ...f.textarea('resolution', 'Resolution'),
                ...f.textarea('rootCause', 'Root Cause'),
                ...f.money('impactCost', 'Impact Cost'),
                ...f.number('impactDays', 'Impact Days'),
                ...f.reference('relatedRiskId', 'Related Risk', 'PrjRisk')
            ])
        ])
    };

    PrjAnalytics.primaryKeys = {
        PrjStatusReport: 'statusId',
        PrjEarnedValue: 'earnedValueId',
        PrjBudgetVariance: 'varianceId',
        PrjResourceForecast: 'forecastId',
        PrjPortfolioView: 'viewId',
        PrjProjectKPI: 'kpiId',
        PrjProjectIssue: 'issueId'
    };

})();
