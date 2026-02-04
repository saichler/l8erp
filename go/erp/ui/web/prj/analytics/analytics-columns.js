/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// Projects Analytics Module - Column Configurations

(function() {
    'use strict';

    window.PrjAnalytics = window.PrjAnalytics || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = PrjAnalytics.render;

    PrjAnalytics.columns = {
        PrjStatusReport: [
            { key: 'statusId', label: 'ID', sortKey: 'statusId', filterKey: 'statusId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            {
                key: 'reportDate',
                label: 'Report Date',
                sortKey: 'reportDate',
                render: (item) => renderDate(item.reportDate)
            },
            {
                key: 'overallHealth',
                label: 'Overall Health',
                sortKey: 'overallHealth',
                render: (item) => render.healthIndicator(item.overallHealth)
            },
            {
                key: 'scheduleHealth',
                label: 'Schedule Health',
                sortKey: 'scheduleHealth',
                render: (item) => render.healthIndicator(item.scheduleHealth)
            },
            {
                key: 'budgetHealth',
                label: 'Budget Health',
                sortKey: 'budgetHealth',
                render: (item) => render.healthIndicator(item.budgetHealth)
            },
            {
                key: 'resourceHealth',
                label: 'Resource Health',
                sortKey: 'resourceHealth',
                render: (item) => render.healthIndicator(item.resourceHealth)
            },
            { key: 'percentComplete', label: '% Complete', sortKey: 'percentComplete' }
        ],

        PrjEarnedValue: [
            { key: 'earnedValueId', label: 'ID', sortKey: 'earnedValueId', filterKey: 'earnedValueId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            {
                key: 'asOfDate',
                label: 'As Of Date',
                sortKey: 'asOfDate',
                render: (item) => renderDate(item.asOfDate)
            },
            {
                key: 'plannedValue',
                label: 'Planned Value',
                sortKey: 'plannedValue',
                render: (item) => renderMoney(item.plannedValue)
            },
            {
                key: 'earnedValue',
                label: 'Earned Value',
                sortKey: 'earnedValue',
                render: (item) => renderMoney(item.earnedValue)
            },
            {
                key: 'actualCost',
                label: 'Actual Cost',
                sortKey: 'actualCost',
                render: (item) => renderMoney(item.actualCost)
            },
            {
                key: 'scheduleVariance',
                label: 'Schedule Variance',
                sortKey: 'scheduleVariance',
                render: (item) => renderMoney(item.scheduleVariance)
            },
            {
                key: 'costVariance',
                label: 'Cost Variance',
                sortKey: 'costVariance',
                render: (item) => renderMoney(item.costVariance)
            },
            { key: 'schedulePerformanceIndex', label: 'SPI', sortKey: 'schedulePerformanceIndex' },
            { key: 'costPerformanceIndex', label: 'CPI', sortKey: 'costPerformanceIndex' }
        ],

        PrjBudgetVariance: [
            { key: 'varianceId', label: 'ID', sortKey: 'varianceId', filterKey: 'varianceId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            {
                key: 'asOfDate',
                label: 'As Of Date',
                sortKey: 'asOfDate',
                render: (item) => renderDate(item.asOfDate)
            },
            {
                key: 'budgetedAmount',
                label: 'Budgeted Amount',
                sortKey: 'budgetedAmount',
                render: (item) => renderMoney(item.budgetedAmount)
            },
            {
                key: 'actualAmount',
                label: 'Actual Amount',
                sortKey: 'actualAmount',
                render: (item) => renderMoney(item.actualAmount)
            },
            {
                key: 'varianceAmount',
                label: 'Variance',
                sortKey: 'varianceAmount',
                render: (item) => renderMoney(item.varianceAmount)
            },
            { key: 'variancePercent', label: 'Variance %', sortKey: 'variancePercent' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category' }
        ],

        PrjResourceForecast: [
            { key: 'forecastId', label: 'ID', sortKey: 'forecastId', filterKey: 'forecastId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'resourceId', label: 'Resource', sortKey: 'resourceId', filterKey: 'resourceId' },
            {
                key: 'periodStart',
                label: 'Period Start',
                sortKey: 'periodStart',
                render: (item) => renderDate(item.periodStart)
            },
            {
                key: 'periodEnd',
                label: 'Period End',
                sortKey: 'periodEnd',
                render: (item) => renderDate(item.periodEnd)
            },
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
            {
                key: 'measurementDate',
                label: 'Measurement Date',
                sortKey: 'measurementDate',
                render: (item) => renderDate(item.measurementDate)
            },
            { key: 'trend', label: 'Trend', sortKey: 'trend' }
        ],

        PrjProjectIssue: [
            { key: 'issueId', label: 'ID', sortKey: 'issueId', filterKey: 'issueId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.issueStatus(item.status)
            },
            {
                key: 'priority',
                label: 'Priority',
                sortKey: 'priority',
                render: (item) => render.issuePriority(item.priority)
            },
            { key: 'assignedTo', label: 'Assigned To', sortKey: 'assignedTo' },
            {
                key: 'reportedDate',
                label: 'Reported Date',
                sortKey: 'reportedDate',
                render: (item) => renderDate(item.reportedDate)
            },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            {
                key: 'resolvedDate',
                label: 'Resolved Date',
                sortKey: 'resolvedDate',
                render: (item) => renderDate(item.resolvedDate)
            }
        ]
    };

})();
