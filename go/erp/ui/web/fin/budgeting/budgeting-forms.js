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
            ]),
            f.section('Budget Lines', [
                ...f.inlineTable('lines', 'Budget Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'Account', required: true },
                    { key: 'fiscalPeriodId', label: 'Period', type: 'text' },
                    { key: 'budgetedAmount', label: 'Budgeted', type: 'money', required: true },
                    { key: 'actualAmount', label: 'Actual', type: 'money' },
                    { key: 'variance', label: 'Variance', type: 'money' },
                    { key: 'description', label: 'Description', type: 'text' }
                ])
            ]),
            f.section('Scenarios', [
                ...f.inlineTable('scenarios', 'Budget Scenarios', [
                    { key: 'scenarioId', label: 'Scenario ID', hidden: true },
                    { key: 'scenarioName', label: 'Name', type: 'text', required: true },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'adjustmentFactor', label: 'Adjustment Factor', type: 'number' },
                    { key: 'projectedTotal', label: 'Projected Total', type: 'money' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
            ]),
            f.section('Transfers', [
                ...f.inlineTable('transfers', 'Budget Transfers', [
                    { key: 'transferId', label: 'Transfer ID', hidden: true },
                    { key: 'fromBudgetLineId', label: 'From Line', type: 'text', required: true },
                    { key: 'toBudgetLineId', label: 'To Line', type: 'text', required: true },
                    { key: 'amount', label: 'Amount', type: 'money', required: true },
                    { key: 'transferDate', label: 'Date', type: 'date', required: true },
                    { key: 'reason', label: 'Reason', type: 'text' }
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
                ...f.textarea('justification', 'Justification')
            ])
        ]),

        Forecast: f.form('Forecast', [
            f.section('Forecast Details', [
                ...f.select('forecastType', 'Forecast Type', enums.FORECAST_TYPE, true),
                ...f.date('periodStart', 'Period Start', true),
                ...f.date('periodEnd', 'Period End', true),
                ...f.money('projectedAmount', 'Projected Amount', true),
                ...f.money('actualAmount', 'Actual Amount'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    Budgeting.primaryKeys = {
        Budget: 'budgetId',
        CapitalExpenditure: 'capexId',
        Forecast: 'forecastId'
    };

})();
