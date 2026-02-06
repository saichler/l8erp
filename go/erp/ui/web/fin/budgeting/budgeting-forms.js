/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Budgeting Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.Budgeting = window.Budgeting || {};

    const f = window.Layer8FormFactory;
    const enums = Budgeting.enums;

    Budgeting.forms = {
        Budget: f.form('Budget', [
            f.section('Budget Information', [
                ...f.text('budgetName', 'Budget Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('budgetType', 'Budget Type', enums.BUDGET_TYPE, true),
                ...f.reference('fiscalYearId', 'Fiscal Year', 'FiscalYear', true),
                ...f.money('totalAmount', 'Total Amount', true),
                ...f.select('status', 'Status', enums.BUDGET_STATUS)
            ])
        ]),

        BudgetLine: f.form('Budget Line', [
            f.section('Line Details', [
                ...f.reference('budgetId', 'Budget', 'Budget', true),
                ...f.reference('accountId', 'Account', 'Account', true),
                ...f.money('budgetedAmount', 'Budgeted Amount', true),
                ...f.money('actualAmount', 'Actual Amount'),
                ...f.money('variance', 'Variance'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        BudgetTransfer: f.form('Budget Transfer', [
            f.section('Transfer Details', [
                ...f.reference('fromBudgetLineId', 'From Budget Line', 'BudgetLine', true),
                ...f.reference('toBudgetLineId', 'To Budget Line', 'BudgetLine', true),
                ...f.money('amount', 'Amount', true),
                ...f.date('transferDate', 'Transfer Date', true),
                ...f.textarea('reason', 'Reason')
            ])
        ]),

        BudgetScenario: f.form('Budget Scenario', [
            f.section('Scenario Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('budgetId', 'Budget', 'Budget', true),
                ...f.checkbox('isBaseline', 'Baseline')
            ])
        ]),

        CapitalExpenditure: f.form('Capital Expenditure', [
            f.section('CapEx Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.money('requestedAmount', 'Requested Amount', true),
                ...f.money('approvedAmount', 'Approved Amount'),
                ...f.select('status', 'Status', enums.CAPEX_STATUS),
                ...f.textarea('justification', 'Justification')
            ])
        ]),

        Forecast: f.form('Forecast', [
            f.section('Forecast Details', [
                ...f.select('forecastType', 'Forecast Type', enums.FORECAST_TYPE, true),
                ...f.date('periodStart', 'Period Start', true),
                ...f.date('periodEnd', 'Period End', true),
                ...f.money('forecastAmount', 'Forecast Amount', true),
                ...f.money('actualAmount', 'Actual Amount'),
                ...f.textarea('assumptions', 'Assumptions')
            ])
        ])
    };

    Budgeting.primaryKeys = {
        Budget: 'budgetId',
        BudgetLine: 'lineId',
        BudgetTransfer: 'transferId',
        BudgetScenario: 'scenarioId',
        CapitalExpenditure: 'capexId',
        Forecast: 'forecastId'
    };

})();
