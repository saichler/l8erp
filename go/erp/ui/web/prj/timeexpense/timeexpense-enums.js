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
// Projects Time & Expense Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.PrjTimeExpense = window.PrjTimeExpense || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const TIMESHEET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Submitted', 'submitted', 'layer8d-status-active'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated']
    ]);

    const EXPENSE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Submitted', 'submitted', 'layer8d-status-active'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated'],
        ['Paid', 'paid', 'layer8d-status-active']
    ]);

    const EXPENSE_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Travel', 'travel', 'layer8d-status-active'],
        ['Lodging', 'lodging', 'layer8d-status-active'],
        ['Meals', 'meals', 'layer8d-status-active'],
        ['Transportation', 'transport', 'layer8d-status-active'],
        ['Materials', 'materials', 'layer8d-status-pending'],
        ['Equipment', 'equipment', 'layer8d-status-pending'],
        ['Software', 'software', 'layer8d-status-active'],
        ['Other', 'other', 'layer8d-status-inactive']
    ]);

    const APPROVAL_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Timesheet', 'timesheet', 'layer8d-status-active'],
        ['Expense', 'expense', 'layer8d-status-active'],
        ['Invoice', 'invoice', 'layer8d-status-pending'],
        ['Budget', 'budget', 'layer8d-status-pending']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    PrjTimeExpense.enums = {
        TIMESHEET_STATUS: TIMESHEET_STATUS.enum,
        TIMESHEET_STATUS_CLASSES: TIMESHEET_STATUS.classes,
        EXPENSE_STATUS: EXPENSE_STATUS.enum,
        EXPENSE_STATUS_CLASSES: EXPENSE_STATUS.classes,
        EXPENSE_TYPE: EXPENSE_TYPE.enum,
        EXPENSE_TYPE_CLASSES: EXPENSE_TYPE.classes,
        APPROVAL_TYPE: APPROVAL_TYPE.enum,
        APPROVAL_TYPE_CLASSES: APPROVAL_TYPE.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    PrjTimeExpense.render = {
        timesheetStatus: createStatusRenderer(TIMESHEET_STATUS.enum, TIMESHEET_STATUS.classes),
        expenseStatus: createStatusRenderer(EXPENSE_STATUS.enum, EXPENSE_STATUS.classes),
        expenseType: createStatusRenderer(EXPENSE_TYPE.enum, EXPENSE_TYPE.classes),
        approvalType: createStatusRenderer(APPROVAL_TYPE.enum, APPROVAL_TYPE.classes),
        date: renderDate,
        money: renderMoney
    };

})();
