/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Sales Analytics Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.SalesAnalytics = window.SalesAnalytics || {};

    const f = window.Layer8FormFactory;
    const enums = SalesAnalytics.enums;

    SalesAnalytics.forms = {
        SalesTarget: f.form('Sales Target', [
            f.section('Target Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('salespersonId', 'Salesperson', 'Employee'),
                ...f.reference('territoryId', 'Territory', 'SalesTerritory'),
                ...f.date('periodStart', 'Period Start', true),
                ...f.date('periodEnd', 'Period End', true),
                ...f.money('targetAmount', 'Target Amount', true),
                ...f.money('achievedAmount', 'Achieved Amount'),
                ...f.select('status', 'Status', enums.TARGET_STATUS),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesTerritory: f.form('Sales Territory', [
            f.section('Territory Details', [
                ...f.text('name', 'Name', true),
                ...f.text('code', 'Code', true),
                ...f.select('territoryType', 'Type', enums.TERRITORY_TYPE, true),
                ...f.reference('parentId', 'Parent Territory', 'SalesTerritory'),
                ...f.textarea('description', 'Description'),
                ...f.text('region', 'Region'),
                ...f.text('country', 'Country'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        SalesTerritoryAssign: f.form('Territory Assignment', [
            f.section('Assignment Details', [
                ...f.reference('territoryId', 'Territory', 'SalesTerritory', true),
                ...f.reference('salespersonId', 'Salesperson', 'Employee', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isPrimary', 'Primary Assignment'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesCommissionPlan: f.form('Commission Plan', [
            f.section('Plan Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('commissionType', 'Commission Type', enums.COMMISSION_TYPE, true),
                ...f.number('rate', 'Rate/Percentage', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.money('minSaleAmount', 'Min Sale Amount'),
                ...f.money('maxCommission', 'Max Commission'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        SalesCommissionCalc: f.form('Commission Calculation', [
            f.section('Calculation Details', [
                ...f.reference('salespersonId', 'Salesperson', 'Employee', true),
                ...f.reference('planId', 'Commission Plan', 'SalesCommissionPlan', true),
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder'),
                ...f.money('saleAmount', 'Sale Amount', true),
                ...f.number('commissionRate', 'Commission Rate'),
                ...f.money('commissionAmount', 'Commission Amount'),
                ...f.date('calcDate', 'Calculation Date'),
                ...f.checkbox('isPaid', 'Paid'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesForecast: f.form('Sales Forecast', [
            f.section('Forecast Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('salespersonId', 'Salesperson', 'Employee'),
                ...f.reference('territoryId', 'Territory', 'SalesTerritory'),
                ...f.select('category', 'Category', enums.FORECAST_CATEGORY, true),
                ...f.date('forecastDate', 'Forecast Date', true),
                ...f.date('periodStart', 'Period Start'),
                ...f.date('periodEnd', 'Period End'),
                ...f.money('forecastAmount', 'Forecast Amount', true),
                ...f.number('probability', 'Probability %'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    SalesAnalytics.primaryKeys = {
        SalesTarget: 'targetId',
        SalesTerritory: 'territoryId',
        SalesTerritoryAssign: 'assignmentId',
        SalesCommissionPlan: 'planId',
        SalesCommissionCalc: 'calcId',
        SalesForecast: 'forecastId'
    };

})();
