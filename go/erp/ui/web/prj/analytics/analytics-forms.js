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
// Projects Analytics Module - Form Definitions

(function() {
    'use strict';

    window.PrjAnalytics = window.PrjAnalytics || {};

    const enums = PrjAnalytics.enums;

    PrjAnalytics.forms = {
        PrjStatusReport: {
            title: 'Status Report',
            sections: [
                {
                    title: 'Report Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'reportDate', label: 'Report Date', type: 'date', required: true },
                        { key: 'periodStart', label: 'Period Start', type: 'date' },
                        { key: 'periodEnd', label: 'Period End', type: 'date' },
                        { key: 'overallHealth', label: 'Overall Health', type: 'select', options: enums.HEALTH_INDICATOR },
                        { key: 'scheduleHealth', label: 'Schedule Health', type: 'select', options: enums.HEALTH_INDICATOR },
                        { key: 'budgetHealth', label: 'Budget Health', type: 'select', options: enums.HEALTH_INDICATOR },
                        { key: 'scopeHealth', label: 'Scope Health', type: 'select', options: enums.HEALTH_INDICATOR },
                        { key: 'resourceHealth', label: 'Resource Health', type: 'select', options: enums.HEALTH_INDICATOR },
                        { key: 'percentComplete', label: 'Percent Complete', type: 'number' },
                        { key: 'accomplishments', label: 'Accomplishments', type: 'textarea' },
                        { key: 'plannedActivities', label: 'Planned Activities', type: 'textarea' },
                        { key: 'issuesSummary', label: 'Issues Summary', type: 'textarea' },
                        { key: 'risksSummary', label: 'Risks Summary', type: 'textarea' },
                        { key: 'decisionsNeeded', label: 'Decisions Needed', type: 'textarea' },
                        { key: 'reportedBy', label: 'Reported By', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        PrjEarnedValue: {
            title: 'Earned Value',
            sections: [
                {
                    title: 'Earned Value Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'asOfDate', label: 'As Of Date', type: 'date', required: true },
                        { key: 'budgetAtCompletion', label: 'Budget at Completion (BAC)', type: 'money' },
                        { key: 'plannedValue', label: 'Planned Value (PV)', type: 'money' },
                        { key: 'earnedValue', label: 'Earned Value (EV)', type: 'money' },
                        { key: 'actualCost', label: 'Actual Cost (AC)', type: 'money' },
                        { key: 'scheduleVariance', label: 'Schedule Variance (SV)', type: 'money' },
                        { key: 'costVariance', label: 'Cost Variance (CV)', type: 'money' },
                        { key: 'schedulePerformanceIndex', label: 'Schedule Performance Index (SPI)', type: 'number' },
                        { key: 'costPerformanceIndex', label: 'Cost Performance Index (CPI)', type: 'number' },
                        { key: 'estimateAtCompletion', label: 'Estimate at Completion (EAC)', type: 'money' },
                        { key: 'estimateToComplete', label: 'Estimate to Complete (ETC)', type: 'money' },
                        { key: 'varianceAtCompletion', label: 'Variance at Completion (VAC)', type: 'money' },
                        { key: 'toCompletePerformanceIndex', label: 'To Complete Performance Index (TCPI)', type: 'number' },
                        { key: 'percentComplete', label: 'Percent Complete', type: 'number' },
                        { key: 'percentSpent', label: 'Percent Spent', type: 'number' }
                    ]
                }
            ]
        },

        PrjBudgetVariance: {
            title: 'Budget Variance',
            sections: [
                {
                    title: 'Variance Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'budgetId', label: 'Budget', type: 'reference', lookupModel: 'PrjProjectBudget' },
                        { key: 'phaseId', label: 'Phase', type: 'reference', lookupModel: 'PrjPhase' },
                        { key: 'asOfDate', label: 'As Of Date', type: 'date', required: true },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'budgetedAmount', label: 'Budgeted Amount', type: 'money' },
                        { key: 'actualAmount', label: 'Actual Amount', type: 'money' },
                        { key: 'varianceAmount', label: 'Variance Amount', type: 'money' },
                        { key: 'variancePercent', label: 'Variance Percent', type: 'number' },
                        { key: 'budgetedHours', label: 'Budgeted Hours', type: 'number' },
                        { key: 'actualHours', label: 'Actual Hours', type: 'number' },
                        { key: 'hoursVariance', label: 'Hours Variance', type: 'number' },
                        { key: 'varianceExplanation', label: 'Variance Explanation', type: 'textarea' },
                        { key: 'correctiveAction', label: 'Corrective Action', type: 'textarea' }
                    ]
                }
            ]
        },

        PrjResourceForecast: {
            title: 'Resource Forecast',
            sections: [
                {
                    title: 'Forecast Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'resourceId', label: 'Resource', type: 'reference', lookupModel: 'PrjResource' },
                        { key: 'poolId', label: 'Resource Pool', type: 'reference', lookupModel: 'PrjResourcePool' },
                        { key: 'skillCategory', label: 'Skill Category', type: 'text' },
                        { key: 'role', label: 'Role', type: 'text' },
                        { key: 'periodStart', label: 'Period Start', type: 'date', required: true },
                        { key: 'periodEnd', label: 'Period End', type: 'date', required: true },
                        { key: 'forecastedHours', label: 'Forecasted Hours', type: 'number' },
                        { key: 'confirmedHours', label: 'Confirmed Hours', type: 'number' },
                        { key: 'gapHours', label: 'Gap Hours', type: 'number' },
                        { key: 'headcountNeeded', label: 'Headcount Needed', type: 'number' },
                        { key: 'headcountAvailable', label: 'Headcount Available', type: 'number' },
                        { key: 'confidenceLevel', label: 'Confidence Level (%)', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        PrjPortfolioView: {
            title: 'Portfolio View',
            sections: [
                {
                    title: 'View Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' },
                        { key: 'totalBudget', label: 'Total Budget', type: 'money' },
                        { key: 'totalActualCost', label: 'Total Actual Cost', type: 'money' },
                        { key: 'totalRevenue', label: 'Total Revenue', type: 'money' },
                        { key: 'totalProfit', label: 'Total Profit', type: 'money' },
                        { key: 'totalProjects', label: 'Total Projects', type: 'number' },
                        { key: 'onTrackCount', label: 'On Track Count', type: 'number' },
                        { key: 'atRiskCount', label: 'At Risk Count', type: 'number' },
                        { key: 'offTrackCount', label: 'Off Track Count', type: 'number' },
                        { key: 'avgUtilization', label: 'Average Utilization (%)', type: 'number' },
                        { key: 'avgMargin', label: 'Average Margin (%)', type: 'number' },
                        { key: 'asOfDate', label: 'As Of Date', type: 'date' }
                    ]
                }
            ]
        },

        PrjProjectKPI: {
            title: 'Project KPI',
            sections: [
                {
                    title: 'KPI Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'kpiName', label: 'KPI Name', type: 'text', required: true },
                        { key: 'kpiCategory', label: 'KPI Category', type: 'text' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'targetValue', label: 'Target Value', type: 'number', required: true },
                        { key: 'actualValue', label: 'Actual Value', type: 'number' },
                        { key: 'unitOfMeasure', label: 'Unit of Measure', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.HEALTH_INDICATOR },
                        { key: 'variance', label: 'Variance', type: 'number' },
                        { key: 'variancePercent', label: 'Variance Percent', type: 'number' },
                        { key: 'measurementDate', label: 'Measurement Date', type: 'date' },
                        { key: 'measurementPeriod', label: 'Measurement Period', type: 'text' },
                        { key: 'trend', label: 'Trend', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        PrjProjectIssue: {
            title: 'Project Issue',
            sections: [
                {
                    title: 'Issue Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'taskId', label: 'Task', type: 'reference', lookupModel: 'PrjTask' },
                        { key: 'issueNumber', label: 'Issue Number', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ISSUE_STATUS },
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.ISSUE_PRIORITY },
                        { key: 'reportedBy', label: 'Reported By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'reportedDate', label: 'Reported Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'resolvedDate', label: 'Resolved Date', type: 'date' },
                        { key: 'resolution', label: 'Resolution', type: 'textarea' },
                        { key: 'rootCause', label: 'Root Cause', type: 'textarea' },
                        { key: 'impactCost', label: 'Impact Cost', type: 'money' },
                        { key: 'impactDays', label: 'Impact Days', type: 'number' },
                        { key: 'relatedRiskId', label: 'Related Risk', type: 'reference', lookupModel: 'PrjRisk' }
                    ]
                }
            ]
        }
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
