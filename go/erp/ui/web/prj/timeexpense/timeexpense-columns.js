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

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = PrjTimeExpense.render;

    PrjTimeExpense.columns = {
        PrjTimesheet: [
            { key: 'timesheetId', label: 'ID', sortKey: 'timesheetId', filterKey: 'timesheetId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'weekStartDate',
                label: 'Period Start',
                sortKey: 'weekStartDate',
                render: (item) => renderDate(item.weekStartDate)
            },
            {
                key: 'weekEndDate',
                label: 'Period End',
                sortKey: 'weekEndDate',
                render: (item) => renderDate(item.weekEndDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.timesheetStatus(item.status)
            },
            { key: 'totalHours', label: 'Total Hours', sortKey: 'totalHours' },
            { key: 'billableHours', label: 'Billable Hours', sortKey: 'billableHours' },
            {
                key: 'submittedDate',
                label: 'Submitted Date',
                sortKey: 'submittedDate',
                render: (item) => renderDate(item.submittedDate)
            }
        ],

        PrjExpenseReport: [
            { key: 'reportId', label: 'ID', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.expenseStatus(item.status)
            },
            {
                key: 'totalAmount',
                label: 'Total Amount',
                sortKey: 'totalAmount',
                render: (item) => renderMoney(item.totalAmount)
            },
            {
                key: 'submitDate',
                label: 'Submitted Date',
                sortKey: 'submitDate',
                render: (item) => renderDate(item.submitDate)
            },
            {
                key: 'approvedDate',
                label: 'Approved Date',
                sortKey: 'approvedDate',
                render: (item) => renderDate(item.approvedDate)
            }
        ],

        PrjApprovalRule: [
            { key: 'ruleId', label: 'ID', sortKey: 'ruleId', filterKey: 'ruleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'approvalType',
                label: 'Type',
                sortKey: 'approvalType',
                render: (item) => render.approvalType(item.approvalType)
            },
            {
                key: 'thresholdAmount',
                label: 'Min Amount',
                sortKey: 'thresholdAmount',
                render: (item) => renderMoney(item.thresholdAmount)
            },
            { key: 'thresholdHours', label: 'Max Hours', sortKey: 'thresholdHours' },
            { key: 'approverId', label: 'Approver', sortKey: 'approverId' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        PrjExpenseCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'glAccount', label: 'GL Account', sortKey: 'glAccount' },
            {
                key: 'requiresReceipt',
                label: 'Requires Receipt',
                sortKey: 'requiresReceipt',
                render: (item) => item.requiresReceipt ? 'Yes' : 'No'
            },
            {
                key: 'defaultLimit',
                label: 'Max Amount',
                sortKey: 'defaultLimit',
                render: (item) => renderMoney(item.defaultLimit)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        PrjExpensePolicy: [
            { key: 'policyId', label: 'ID', sortKey: 'policyId', filterKey: 'policyId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            {
                key: 'effectiveDate',
                label: 'Effective Date',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            },
            {
                key: 'expiryDate',
                label: 'Expiry Date',
                sortKey: 'expiryDate',
                render: (item) => renderDate(item.expiryDate)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ]
    };

})();
