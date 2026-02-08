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
 * Mobile PRJ Time & Expense Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: prj/timeexpense/timeexpense-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobilePrjTimeExpense = window.MobilePrjTimeExpense || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const TIMESHEET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Submitted', 'submitted', 'status-active'],
        ['Approved', 'approved', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated']
    ]);

    const EXPENSE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Submitted', 'submitted', 'status-active'],
        ['Approved', 'approved', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated'],
        ['Paid', 'paid', 'status-active']
    ]);

    const EXPENSE_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Travel', 'travel', 'status-active'],
        ['Lodging', 'lodging', 'status-active'],
        ['Meals', 'meals', 'status-active'],
        ['Transportation', 'transport', 'status-active'],
        ['Materials', 'materials', 'status-pending'],
        ['Equipment', 'equipment', 'status-pending'],
        ['Software', 'software', 'status-active'],
        ['Other', 'other', 'status-inactive']
    ]);

    const APPROVAL_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Timesheet', 'timesheet', 'status-active'],
        ['Expense', 'expense', 'status-active'],
        ['Invoice', 'invoice', 'status-pending'],
        ['Budget', 'budget', 'status-pending']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobilePrjTimeExpense.enums = {
        TIMESHEET_STATUS: TIMESHEET_STATUS.enum,
        TIMESHEET_STATUS_VALUES: TIMESHEET_STATUS.values,
        TIMESHEET_STATUS_CLASSES: TIMESHEET_STATUS.classes,
        EXPENSE_STATUS: EXPENSE_STATUS.enum,
        EXPENSE_STATUS_VALUES: EXPENSE_STATUS.values,
        EXPENSE_STATUS_CLASSES: EXPENSE_STATUS.classes,
        EXPENSE_TYPE: EXPENSE_TYPE.enum,
        EXPENSE_TYPE_VALUES: EXPENSE_TYPE.values,
        EXPENSE_TYPE_CLASSES: EXPENSE_TYPE.classes,
        APPROVAL_TYPE: APPROVAL_TYPE.enum,
        APPROVAL_TYPE_VALUES: APPROVAL_TYPE.values,
        APPROVAL_TYPE_CLASSES: APPROVAL_TYPE.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobilePrjTimeExpense.render = {
        timesheetStatus: createStatusRenderer(TIMESHEET_STATUS.enum, TIMESHEET_STATUS.classes),
        expenseStatus: createStatusRenderer(EXPENSE_STATUS.enum, EXPENSE_STATUS.classes),
        expenseType: createStatusRenderer(EXPENSE_TYPE.enum, EXPENSE_TYPE.classes),
        approvalType: createStatusRenderer(APPROVAL_TYPE.enum, APPROVAL_TYPE.classes),
        date: renderDate,
        money: renderMoney
    };

})();
