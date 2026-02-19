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
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.number('lastExecuted', 'Last Executed'),
                ...f.number('executionCount', 'Execution Count'),
            ]),
            f.section('Data Configuration', [
                ...f.reference('dataSourceId', 'Data Source', 'BiDataSource'),
                ...f.reference('templateId', 'Template', 'BiReportTemplate'),
                ...f.textarea('query', 'Query')
            ]),
            f.section('Output Settings', [
                ...f.select('defaultFormat', 'Default Format', enums.EXPORT_FORMAT),
                ...f.checkbox('isPublic', 'Public')
            ]),
            f.section('Schedules', [
                ...f.inlineTable('schedules', 'Report Schedules', [
                    { key: 'scheduleId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'frequency', label: 'Frequency', type: 'text' },
                    { key: 'runTime', label: 'Run Time', type: 'text' },
                    { key: 'outputFormat', label: 'Format', type: 'text' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
            ]),
            f.section('Executions', [
                ...f.inlineTable('executions', 'Report Executions', [
                    { key: 'executionId', label: 'ID', hidden: true },
                    { key: 'status', label: 'Status', type: 'text' },
                    { key: 'executedBy', label: 'Executed By', type: 'text' },
                    { key: 'rowCount', label: 'Rows', type: 'number' },
                    { key: 'outputFormat', label: 'Format', type: 'text' },
                    { key: 'errorMessage', label: 'Error', type: 'text' }
                ])
            ]),
            f.section('Access Controls', [
                ...f.inlineTable('accessControls', 'Report Access', [
                    { key: 'accessId', label: 'ID', hidden: true },
                    { key: 'principalId', label: 'Principal ID', type: 'text' },
                    { key: 'principalType', label: 'Type', type: 'text' },
                    { key: 'accessLevel', label: 'Access Level', type: 'text' },
                    { key: 'grantedBy', label: 'Granted By', type: 'text' }
                ])
            ]),
            f.section('Subscriptions', [
                ...f.inlineTable('subscriptions', 'Report Subscriptions', [
                    { key: 'subscriptionId', label: 'ID', hidden: true },
                    { key: 'subscriberId', label: 'Subscriber', type: 'text' },
                    { key: 'format', label: 'Format', type: 'text' },
                    { key: 'deliveryEmail', label: 'Email', type: 'text' },
                    { key: 'includeEmpty', label: 'Include Empty', type: 'checkbox' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
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

    };

    BiReporting.primaryKeys = {
        BiReport: 'reportId',
        BiReportTemplate: 'templateId'
    };

})();
