/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Sales Analytics Module - Form Configurations
 * Desktop Equivalent: sales/analytics/analytics-forms.js
 */
window.MobileSalesAnalytics = window.MobileSalesAnalytics || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileSalesAnalytics.enums;

    MobileSalesAnalytics.forms = {
        SalesTarget: f.form('Sales Target', [
            f.section('Target Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('salespersonId', 'Salesperson', 'Employee'),
                ...f.reference('territoryId', 'Territory', 'SalesTerritory'),
                ...f.period('period', 'Period', true),
                ...f.money('targetAmount', 'Target Amount', true),
                ...f.money('achievedAmount', 'Achieved Amount'),
                ...f.textarea('notes', 'Notes'),
                ...f.number('achievementPercent', 'Achievement Percent'),
            ])
        ]),

        SalesTerritory: f.form('Sales Territory', [
            f.section('Territory Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('territoryType', 'Type', enums.TERRITORY_TYPE, true),
                ...f.reference('parentTerritoryId', 'Parent Territory', 'SalesTerritory'),
                ...f.text('region', 'Region'),
                ...f.reference('managerId', 'Manager', 'Employee'),
                ...f.checkbox('isActive', 'Active'),
                ...f.text('countryCodes', 'Country Codes'),
                ...f.text('stateCodes', 'State Codes'),
                ...f.text('postalCodes', 'Postal Codes'),
            ]),
            f.section('Assignments', [
                ...f.inlineTable('assignments', 'Territory Assignments', [
                    { key: 'assignmentId', label: 'ID', hidden: true },
                    { key: 'salespersonId', label: 'Salesperson', type: 'reference', lookupModel: 'Employee', required: true },
                    { key: 'startDate', label: 'Start', type: 'date' },
                    { key: 'endDate', label: 'End', type: 'date' },
                    { key: 'isPrimary', label: 'Primary', type: 'checkbox' },
                    { key: 'notes', label: 'Notes', type: 'text' }
                ])
            ])
        ]),

        CommissionPlan: f.form('Commission Plan', [
            f.section('Plan Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('commissionType', 'Commission Type', enums.COMMISSION_TYPE, true),
                ...f.number('baseRate', 'Base Rate', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.checkbox('isActive', 'Active'),
                ...f.money('baseAmount', 'Base Amount'),
                ...f.text('appliesTo', 'Applies To'),
                ...f.text('notes', 'Notes'),
            ]),
            f.section('Calculations', [
                ...f.inlineTable('calculations', 'Commission Calculations', [
                    { key: 'calcId', label: 'ID', hidden: true },
                    { key: 'salespersonId', label: 'Salesperson', type: 'reference', lookupModel: 'Employee' },
                    { key: 'salesOrderId', label: 'Order', type: 'reference', lookupModel: 'SalesOrder' },
                    { key: 'salesAmount', label: 'Sale Amount', type: 'money' },
                    { key: 'commissionRate', label: 'Rate', type: 'number' },
                    { key: 'commissionAmount', label: 'Commission', type: 'money' },
                    { key: 'status', label: 'Status', type: 'text' }
                ])
            ])
        ]),

        SalesForecast: f.form('Sales Forecast', [
            f.section('Forecast Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('salespersonId', 'Salesperson', 'Employee'),
                ...f.reference('territoryId', 'Territory', 'SalesTerritory'),
                ...f.select('category', 'Category', enums.FORECAST_CATEGORY, true),
                ...f.period('period', 'Period'),
                ...f.date('expectedCloseDate', 'Expected Close', true),
                ...f.money('forecastAmount', 'Forecast Amount', true),
                ...f.number('probability', 'Probability %'),
                ...f.textarea('notes', 'Notes'),
                ...f.text('customerId', 'Customer'),
                ...f.money('weightedAmount', 'Weighted Amount'),
            ])
        ])
    };

})();
