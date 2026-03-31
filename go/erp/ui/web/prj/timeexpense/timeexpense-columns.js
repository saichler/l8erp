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
// Projects Time & Expense Module - Column Configurations

(function() {
    'use strict';

    window.PrjTimeExpense = window.PrjTimeExpense || {};

    const col = window.Layer8ColumnFactory;
    const render = PrjTimeExpense.render;

    PrjTimeExpense.columns = {
        PrjTimesheet: [
            ...col.id('timesheetId'),
            ...col.col('employeeId', 'Employee'),
            ...col.date('weekStartDate', 'Period Start'),
            ...col.date('weekEndDate', 'Period End'),
            ...col.enum('status', 'Status', null, render.timesheetStatus),
            ...col.col('totalHours', 'Total Hours'),
            ...col.col('billableHours', 'Billable Hours'),
            ...col.date('submittedDate', 'Submitted Date')
        ],

        PrjExpenseReport: [
            ...col.id('reportId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('projectId', 'Project'),
            ...col.col('title', 'Title'),
            ...col.enum('status', 'Status', null, render.expenseStatus),
            ...col.money('totalAmount', 'Total Amount'),
            ...col.date('submitDate', 'Submitted Date'),
            ...col.date('approvedDate', 'Approved Date')
        ],

        PrjApprovalRule: [
            ...col.id('ruleId'),
            ...col.col('name', 'Name'),
            ...col.enum('approvalType', 'Type', null, render.approvalType),
            ...col.money('thresholdAmount', 'Min Amount'),
            ...col.col('thresholdHours', 'Max Hours'),
            ...col.col('approverId', 'Approver'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjExpenseCategory: [
            ...col.id('categoryId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('glAccount', 'GL Account'),
            ...col.boolean('requiresReceipt', 'Requires Receipt'),
            ...col.money('defaultLimit', 'Max Amount'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjExpensePolicy: [
            ...col.id('policyId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.date('expiryDate', 'Expiry Date'),
            ...col.boolean('isActive', 'Active')
        ]
    };

})();
