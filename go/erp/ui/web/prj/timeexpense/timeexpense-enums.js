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
// Projects Time & Expense Module - Enum Definitions

(function() {
    'use strict';

    window.PrjTimeExpense = window.PrjTimeExpense || {};
    PrjTimeExpense.enums = {};

    // TIMESHEET STATUS
    PrjTimeExpense.enums.TIMESHEET_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Submitted',
        3: 'Approved',
        4: 'Rejected'
    };

    PrjTimeExpense.enums.TIMESHEET_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // EXPENSE STATUS
    PrjTimeExpense.enums.EXPENSE_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Submitted',
        3: 'Approved',
        4: 'Rejected',
        5: 'Paid'
    };

    PrjTimeExpense.enums.EXPENSE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-active'
    };

    // EXPENSE TYPE
    PrjTimeExpense.enums.EXPENSE_TYPE = {
        0: 'Unspecified',
        1: 'Travel',
        2: 'Lodging',
        3: 'Meals',
        4: 'Transportation',
        5: 'Materials',
        6: 'Equipment',
        7: 'Software',
        8: 'Other'
    };

    PrjTimeExpense.enums.EXPENSE_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-pending',
        6: 'layer8d-status-pending',
        7: 'layer8d-status-active',
        8: 'layer8d-status-inactive'
    };

    // APPROVAL TYPE
    PrjTimeExpense.enums.APPROVAL_TYPE = {
        0: 'Unspecified',
        1: 'Timesheet',
        2: 'Expense',
        3: 'Invoice',
        4: 'Budget'
    };

    PrjTimeExpense.enums.APPROVAL_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-pending'
    };

    // RENDERERS
    PrjTimeExpense.render = {};

    PrjTimeExpense.render.timesheetStatus = Layer8DRenderers.createStatusRenderer(
        PrjTimeExpense.enums.TIMESHEET_STATUS,
        PrjTimeExpense.enums.TIMESHEET_STATUS_CLASSES
    );

    PrjTimeExpense.render.expenseStatus = Layer8DRenderers.createStatusRenderer(
        PrjTimeExpense.enums.EXPENSE_STATUS,
        PrjTimeExpense.enums.EXPENSE_STATUS_CLASSES
    );

    PrjTimeExpense.render.expenseType = Layer8DRenderers.createStatusRenderer(
        PrjTimeExpense.enums.EXPENSE_TYPE,
        PrjTimeExpense.enums.EXPENSE_TYPE_CLASSES
    );

    PrjTimeExpense.render.approvalType = Layer8DRenderers.createStatusRenderer(
        PrjTimeExpense.enums.APPROVAL_TYPE,
        PrjTimeExpense.enums.APPROVAL_TYPE_CLASSES
    );

    PrjTimeExpense.render.date = Layer8DRenderers.renderDate;
    PrjTimeExpense.render.money = Layer8DRenderers.renderMoney;

})();
