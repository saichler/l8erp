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
 * Shared Reference Data - Projects Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataPrj = {
        // ========================================
        // Projects - Planning
        // ========================================
        ...ref.coded('PrjProject', 'projectId', 'code', 'name'),
        ...ref.simple('PrjProjectTemplate', 'templateId', 'name', 'Template'),

        // ========================================
        // Projects - Resources
        // ========================================
        ...ref.simple('PrjResourcePool', 'poolId', 'name'),
        ...ref.simple('PrjResource', 'resourceId', 'name', 'Resource'),
        ...ref.idOnly('PrjAllocation', 'allocationId'),
        ...ref.idOnly('PrjBooking', 'bookingId'),
        ...ref.simple('PrjCapacityPlan', 'planId', 'name'),
        ...ref.idOnly('PrjUtilization', 'utilizationId'),

        // ========================================
        // Projects - Time & Expense
        // ========================================
        ...ref.idOnly('PrjTimesheet', 'timesheetId'),
        ...ref.idOnly('PrjExpenseReport', 'reportId'),
        ...ref.simple('PrjApprovalRule', 'ruleId', 'name'),
        ...ref.simple('PrjExpenseCategory', 'categoryId', 'name'),
        ...ref.simple('PrjExpensePolicy', 'policyId', 'name'),

        // ========================================
        // Projects - Billing
        // ========================================
        ...ref.simple('PrjBillingRate', 'rateId', 'name'),
        ...ref.simple('PrjBillingSchedule', 'scheduleId', 'name'),
        ...ref.simple('PrjProjectInvoice', 'invoiceId', 'invoiceNumber', 'Invoice'),
        ...ref.idOnly('PrjRevenueRecognition', 'recognitionId'),
        ...ref.simple('PrjProjectBudget', 'budgetId', 'name'),

        // ========================================
        // Projects - Analytics
        // ========================================
        ...ref.idOnly('PrjStatusReport', 'statusId'),
        ...ref.simple('PrjPortfolioView', 'viewId', 'name'),
        ...ref.simple('PrjProjectKPI', 'kpiId', 'kpiName')
    };
})();
