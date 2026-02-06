/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// BI Reporting Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.BiReporting = window.BiReporting || {};

    const f = window.Layer8FormFactory;
    const enums = BiReporting.enums;

    BiReporting.forms = {
        BiReport: f.form('Report', [
            f.section('Report Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('reportType', 'Report Type', enums.REPORT_TYPE),
                ...f.select('status', 'Status', enums.REPORT_STATUS),
                ...f.text('category', 'Category'),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('Data Configuration', [
                ...f.reference('dataSourceId', 'Data Source', 'BiDataSource'),
                ...f.reference('templateId', 'Template', 'BiReportTemplate'),
                ...f.textarea('query', 'Query')
            ]),
            f.section('Output Settings', [
                ...f.select('defaultFormat', 'Default Format', enums.EXPORT_FORMAT),
                ...f.checkbox('isPublic', 'Public')
            ])
        ]),

        BiReportTemplate: f.form('Report Template', [
            f.section('Template Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('reportType', 'Report Type', enums.REPORT_TYPE),
                ...f.text('category', 'Category'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Template Configuration', [
                ...f.textarea('layoutTemplate', 'Layout Template'),
                ...f.textarea('styleTemplate', 'Style Template')
            ])
        ]),

        BiReportSchedule: f.form('Report Schedule', [
            f.section('Schedule Details', [
                ...f.reference('reportId', 'Report', 'BiReport', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('frequency', 'Frequency', enums.SCHEDULE_FREQUENCY),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Timing', [
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.text('runTime', 'Run Time (HH:MM)'),
                ...f.number('dayOfWeek', 'Day of Week (0-6)'),
                ...f.number('dayOfMonth', 'Day of Month (1-31)')
            ]),
            f.section('Output & Delivery', [
                ...f.select('outputFormat', 'Output Format', enums.EXPORT_FORMAT),
                ...f.text('deliveryEmail', 'Delivery Email')
            ])
        ]),

        BiReportExecution: f.form('Report Execution', [
            f.section('Execution Details', [
                ...f.reference('reportId', 'Report', 'BiReport', true),
                ...f.reference('scheduleId', 'Schedule', 'BiReportSchedule'),
                ...f.select('status', 'Status', enums.EXECUTION_STATUS),
                ...f.reference('executedBy', 'Executed By', 'Employee')
            ]),
            f.section('Timing', [
                ...f.date('startTime', 'Start Time'),
                ...f.date('endTime', 'End Time')
            ]),
            f.section('Results', [
                ...f.number('rowCount', 'Row Count'),
                ...f.number('fileSize', 'File Size (bytes)'),
                ...f.text('outputPath', 'Output Path'),
                ...f.select('outputFormat', 'Output Format', enums.EXPORT_FORMAT),
                ...f.textarea('errorMessage', 'Error Message')
            ])
        ]),

        BiReportAccess: f.form('Report Access', [
            f.section('Access Details', [
                ...f.reference('reportId', 'Report', 'BiReport', true),
                ...f.text('principalId', 'Principal ID', true),
                ...f.text('principalType', 'Principal Type'),
                ...f.select('accessLevel', 'Access Level', enums.ACCESS_LEVEL)
            ]),
            f.section('Grant Information', [
                ...f.date('grantedDate', 'Granted Date'),
                ...f.reference('grantedBy', 'Granted By', 'Employee'),
                ...f.date('expiryDate', 'Expiry Date')
            ])
        ]),

        BiReportSubscription: f.form('Report Subscription', [
            f.section('Subscription Details', [
                ...f.reference('reportId', 'Report', 'BiReport', true),
                ...f.reference('scheduleId', 'Schedule', 'BiReportSchedule', true),
                ...f.reference('subscriberId', 'Subscriber', 'Employee', true),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Delivery Settings', [
                ...f.select('format', 'Format', enums.EXPORT_FORMAT),
                ...f.text('deliveryEmail', 'Delivery Email'),
                ...f.checkbox('includeEmpty', 'Include Empty Reports')
            ])
        ])
    };

    BiReporting.primaryKeys = {
        BiReport: 'reportId',
        BiReportTemplate: 'templateId',
        BiReportSchedule: 'scheduleId',
        BiReportExecution: 'executionId',
        BiReportAccess: 'accessId',
        BiReportSubscription: 'subscriptionId'
    };

})();
