/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile Budgeting Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobileBudgeting = window.MobileBudgeting || {};

    const f = window.Layer8FormFactory;
    const enums = MobileBudgeting.enums;

    MobileBudgeting.forms = {
        Budget: f.form('Budget', [
            f.section('Budget Information', [
                ...f.text('budgetName', 'Budget Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('budgetType', 'Budget Type', enums.BUDGET_TYPE, true),
                ...f.reference('fiscalYearId', 'Fiscal Year', 'FiscalYear', true),
                ...f.money('totalAmount', 'Total Amount', true),
                ...f.select('status', 'Status', enums.BUDGET_STATUS),
                ...f.text('departmentId', 'Department'),
                ...f.text('approvedBy', 'Approved By'),
                ...f.date('approvedDate', 'Approved Date'),
                ...f.text('notes', 'Notes'),
            ]),
            f.section('Budget Lines', [
                ...f.inlineTable('lines', 'Budget Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'accountId', label: 'Account', type: 'text' },
                    { key: 'budgetedAmount', label: 'Budgeted', type: 'money' },
                    { key: 'actualAmount', label: 'Actual', type: 'money' },
                    { key: 'variance', label: 'Variance', type: 'money' }
                ])
            ]),
            f.section('Scenarios', [
                ...f.inlineTable('scenarios', 'Budget Scenarios', [
                    { key: 'scenarioId', label: 'Scenario ID', hidden: true },
                    { key: 'scenarioName', label: 'Name', type: 'text' },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
            ]),
            f.section('Transfers', [
                ...f.inlineTable('transfers', 'Budget Transfers', [
                    { key: 'transferId', label: 'Transfer ID', hidden: true },
                    { key: 'fromBudgetLineId', label: 'From Line', type: 'text' },
                    { key: 'toBudgetLineId', label: 'To Line', type: 'text' },
                    { key: 'amount', label: 'Amount', type: 'money' },
                    { key: 'transferDate', label: 'Date', type: 'date' }
                ])
            ])
        ]),

        CapitalExpenditure: f.form('Capital Expenditure', [
            f.section('CapEx Details', [
                ...f.text('projectName', 'Project Name', true),
                ...f.textarea('description', 'Description'),
                ...f.money('requestedAmount', 'Requested Amount', true),
                ...f.money('approvedAmount', 'Approved Amount'),
                ...f.select('status', 'Status', enums.CAPEX_STATUS),
                ...f.textarea('justification', 'Justification'),
                ...f.text('departmentId', 'Department'),
                ...f.text('fiscalYearId', 'Fiscal Year'),
                ...f.money('spentAmount', 'Spent Amount'),
                ...f.date('requestedDate', 'Requested Date'),
                ...f.text('requestedBy', 'Requested By'),
                ...f.text('approvedBy', 'Approved By'),
                ...f.date('approvedDate', 'Approved Date'),
                ...f.date('expectedCompletionDate', 'Expected Completion Date'),
                ...f.text('notes', 'Notes'),
            ])
        ]),

        Forecast: f.form('Forecast', [
            f.section('Forecast Details', [
                ...f.select('forecastType', 'Forecast Type', enums.FORECAST_TYPE, true),
                ...f.date('periodStart', 'Period Start', true),
                ...f.date('periodEnd', 'Period End', true),
                ...f.money('projectedAmount', 'Projected Amount', true),
                ...f.money('actualAmount', 'Actual Amount'),
                ...f.textarea('notes', 'Notes'),
                ...f.text('forecastName', 'Forecast Name'),
                ...f.text('description', 'Description'),
                ...f.text('fiscalYearId', 'Fiscal Year'),
                ...f.date('forecastDate', 'Forecast Date'),
                ...f.money('variance', 'Variance'),
            ])
        ])
    };

})();
