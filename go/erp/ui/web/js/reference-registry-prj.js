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
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refPrj = window.Layer8RefFactory;

Layer8DReferenceRegistry.register({
    // ========================================
    // Projects - Planning
    // ========================================
    ...refPrj.coded('PrjProject', 'projectId', 'code', 'name'),
    ...refPrj.batch([
        ['PrjProjectTemplate', 'templateId', 'name'],
        ['PrjPhase', 'phaseId', 'name']
    ]),
    ...refPrj.simple('PrjTask', 'taskId', 'name', 'Task'),
    ...refPrj.simple('PrjMilestone', 'milestoneId', 'name', 'Milestone'),
    ...refPrj.simple('PrjDeliverable', 'deliverableId', 'name'),
    ...refPrj.idOnly('PrjDependency', 'dependencyId'),
    ...refPrj.simple('PrjRisk', 'riskId', 'name'),

    // ========================================
    // Projects - Resources
    // ========================================
    ...refPrj.batch([
        ['PrjResourcePool', 'poolId', 'name'],
        ['PrjCapacityPlan', 'planId', 'name']
    ]),
    ...refPrj.simple('PrjResource', 'resourceId', 'name', 'Resource'),
    ...refPrj.simple('PrjResourceSkill', 'skillId', 'skillName'),
    ...refPrj.batchIdOnly([
        ['PrjAllocation', 'allocationId'],
        ['PrjBooking', 'bookingId'],
        ['PrjUtilization', 'utilizationId']
    ]),

    // ========================================
    // Projects - Time & Expense
    // ========================================
    ...refPrj.batchIdOnly([
        ['PrjTimesheet', 'timesheetId'],
        ['PrjTimesheetEntry', 'entryId'],
        ['PrjExpenseReport', 'reportId'],
        ['PrjExpenseEntry', 'entryId']
    ]),
    ...refPrj.batch([
        ['PrjApprovalRule', 'ruleId', 'name'],
        ['PrjExpenseCategory', 'categoryId', 'name'],
        ['PrjExpensePolicy', 'policyId', 'name']
    ]),

    // ========================================
    // Projects - Billing
    // ========================================
    ...refPrj.batch([
        ['PrjBillingRate', 'rateId', 'name'],
        ['PrjBillingSchedule', 'scheduleId', 'name'],
        ['PrjBillingMilestone', 'milestoneId', 'name'],
        ['PrjProjectBudget', 'budgetId', 'name']
    ]),
    ...refPrj.simple('PrjProjectInvoice', 'invoiceId', 'invoiceNumber', 'Invoice'),
    ...refPrj.batchIdOnly([
        ['PrjInvoiceLine', 'lineId'],
        ['PrjRevenueRecognition', 'recognitionId']
    ]),

    // ========================================
    // Projects - Analytics
    // ========================================
    ...refPrj.batchIdOnly([
        ['PrjStatusReport', 'statusId'],
        ['PrjEarnedValue', 'earnedValueId'],
        ['PrjBudgetVariance', 'varianceId'],
        ['PrjResourceForecast', 'forecastId']
    ]),
    ...refPrj.simple('PrjPortfolioView', 'viewId', 'name'),
    ...refPrj.simple('PrjProjectKPI', 'kpiId', 'kpiName'),
    ...refPrj.simple('PrjProjectIssue', 'issueId', 'title', 'Issue')
});
