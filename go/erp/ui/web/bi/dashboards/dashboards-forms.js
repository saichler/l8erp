/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// BI Dashboards Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.BiDashboards = window.BiDashboards || {};

    const f = window.Layer8FormFactory;
    const enums = BiDashboards.enums;

    BiDashboards.forms = {
        BiDashboard: f.form('Dashboard', [
            f.section('Dashboard Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('category', 'Category'),
                ...f.select('status', 'Status', enums.DASHBOARD_STATUS),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('Settings', [
                ...f.checkbox('isDefault', 'Default Dashboard'),
                ...f.checkbox('isPublic', 'Public'),
                ...f.number('refreshInterval', 'Refresh Interval (seconds)'),
                ...f.textarea('layoutConfig', 'Layout Config (JSON)')
            ]),
            f.section('Widgets', [
                ...f.inlineTable('widgets', 'Dashboard Widgets', [
                    { key: 'widgetId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'widgetType', label: 'Widget Type', type: 'text' },
                    { key: 'chartType', label: 'Chart Type', type: 'text' },
                    { key: 'positionX', label: 'X', type: 'number' },
                    { key: 'positionY', label: 'Y', type: 'number' },
                    { key: 'width', label: 'Width', type: 'number' },
                    { key: 'height', label: 'Height', type: 'number' }
                ])
            ]),
            f.section('Shares', [
                ...f.inlineTable('shares', 'Dashboard Shares', [
                    { key: 'shareId', label: 'ID', hidden: true },
                    { key: 'sharedWithId', label: 'Shared With', type: 'text' },
                    { key: 'sharedWithType', label: 'Type', type: 'text' },
                    { key: 'accessLevel', label: 'Access Level', type: 'text' }
                ])
            ]),
            f.section('Drilldowns', [
                ...f.inlineTable('drilldowns', 'Drilldowns', [
                    { key: 'drilldownId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'sourceField', label: 'Source Field', type: 'text' },
                    { key: 'targetParameter', label: 'Target Param', type: 'text' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
            ])
        ]),

        BiKPI: f.form('KPI', [
            f.section('KPI Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('category', 'Category'),
                ...f.text('unit', 'Unit'),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('Data Source', [
                ...f.reference('dataSourceId', 'Data Source', 'BiDataSource'),
                ...f.textarea('calculationFormula', 'Calculation Formula')
            ]),
            f.section('Values', [
                ...f.number('currentValue', 'Current Value'),
                ...f.number('targetValue', 'Target Value'),
                ...f.number('previousValue', 'Previous Value')
            ]),
            f.section('Status', [
                ...f.select('status', 'Status', enums.KPI_STATUS),
                ...f.select('trend', 'Trend', enums.TREND_DIRECTION),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Settings', [
                ...f.number('refreshInterval', 'Refresh Interval (seconds)')
            ]),
            f.section('Thresholds', [
                ...f.inlineTable('thresholds', 'KPI Thresholds', [
                    { key: 'thresholdId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'operator', label: 'Operator', type: 'text' },
                    { key: 'value', label: 'Value', type: 'number' },
                    { key: 'valueUpper', label: 'Upper Value', type: 'number' },
                    { key: 'severity', label: 'Severity', type: 'text' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
            ])
        ])
    };

    BiDashboards.primaryKeys = {
        BiDashboard: 'dashboardId',
        BiKPI: 'kpiId'
    };

})();
