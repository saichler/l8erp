/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
 * ERP Reference Registry - Projects Models
 * Registers Planning, Resources, Time & Expense, Billing, and Analytics models.
 */
Layer8DReferenceRegistry.register({
    // ========================================
    // Projects - Planning
    // ========================================
    PrjProject: {
        idColumn: 'projectId',
        displayColumn: 'name',
        selectColumns: ['projectId', 'code', 'name'],
        displayFormat: function(item) {
            return item.code + ' - ' + item.name;
        },
        displayLabel: 'Project'
    },
    PrjProjectTemplate: {
        idColumn: 'templateId',
        displayColumn: 'name'
    },
    PrjPhase: {
        idColumn: 'phaseId',
        displayColumn: 'name'
    },
    PrjTask: {
        idColumn: 'taskId',
        displayColumn: 'name',
        selectColumns: ['taskId', 'name'],
        displayLabel: 'Task'
    },
    PrjMilestone: {
        idColumn: 'milestoneId',
        displayColumn: 'name',
        selectColumns: ['milestoneId', 'name'],
        displayLabel: 'Milestone'
    },
    PrjDeliverable: {
        idColumn: 'deliverableId',
        displayColumn: 'name'
    },
    PrjDependency: {
        idColumn: 'dependencyId',
        displayColumn: 'dependencyId'
    },
    PrjRisk: {
        idColumn: 'riskId',
        displayColumn: 'name'
    },

    // ========================================
    // Projects - Resources
    // ========================================
    PrjResourcePool: {
        idColumn: 'poolId',
        displayColumn: 'name'
    },
    PrjResource: {
        idColumn: 'resourceId',
        displayColumn: 'name',
        selectColumns: ['resourceId', 'name'],
        displayLabel: 'Resource'
    },
    PrjResourceSkill: {
        idColumn: 'skillId',
        displayColumn: 'skillName'
    },
    PrjAllocation: {
        idColumn: 'allocationId',
        displayColumn: 'allocationId'
    },
    PrjBooking: {
        idColumn: 'bookingId',
        displayColumn: 'bookingId'
    },
    PrjCapacityPlan: {
        idColumn: 'planId',
        displayColumn: 'name'
    },
    PrjUtilization: {
        idColumn: 'utilizationId',
        displayColumn: 'utilizationId'
    },

    // ========================================
    // Projects - Time & Expense
    // ========================================
    PrjTimesheet: {
        idColumn: 'timesheetId',
        displayColumn: 'timesheetId'
    },
    PrjTimesheetEntry: {
        idColumn: 'entryId',
        displayColumn: 'entryId'
    },
    PrjExpenseReport: {
        idColumn: 'reportId',
        displayColumn: 'reportId'
    },
    PrjExpenseEntry: {
        idColumn: 'entryId',
        displayColumn: 'entryId'
    },
    PrjApprovalRule: {
        idColumn: 'ruleId',
        displayColumn: 'name'
    },
    PrjExpenseCategory: {
        idColumn: 'categoryId',
        displayColumn: 'name'
    },
    PrjExpensePolicy: {
        idColumn: 'policyId',
        displayColumn: 'name'
    },

    // ========================================
    // Projects - Billing
    // ========================================
    PrjBillingRate: {
        idColumn: 'rateId',
        displayColumn: 'name'
    },
    PrjBillingSchedule: {
        idColumn: 'scheduleId',
        displayColumn: 'name'
    },
    PrjBillingMilestone: {
        idColumn: 'milestoneId',
        displayColumn: 'name'
    },
    PrjProjectInvoice: {
        idColumn: 'invoiceId',
        displayColumn: 'invoiceNumber',
        selectColumns: ['invoiceId', 'invoiceNumber'],
        displayLabel: 'Invoice'
    },
    PrjInvoiceLine: {
        idColumn: 'lineId',
        displayColumn: 'lineId'
    },
    PrjRevenueRecognition: {
        idColumn: 'recognitionId',
        displayColumn: 'recognitionId'
    },
    PrjProjectBudget: {
        idColumn: 'budgetId',
        displayColumn: 'name'
    },

    // ========================================
    // Projects - Analytics
    // ========================================
    PrjStatusReport: {
        idColumn: 'statusId',
        displayColumn: 'statusId'
    },
    PrjEarnedValue: {
        idColumn: 'earnedValueId',
        displayColumn: 'earnedValueId'
    },
    PrjBudgetVariance: {
        idColumn: 'varianceId',
        displayColumn: 'varianceId'
    },
    PrjResourceForecast: {
        idColumn: 'forecastId',
        displayColumn: 'forecastId'
    },
    PrjPortfolioView: {
        idColumn: 'viewId',
        displayColumn: 'name'
    },
    PrjProjectKPI: {
        idColumn: 'kpiId',
        displayColumn: 'kpiName'
    },
    PrjProjectIssue: {
        idColumn: 'issueId',
        displayColumn: 'title',
        selectColumns: ['issueId', 'title'],
        displayLabel: 'Issue'
    }
});
