/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// BI Data Management Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.BiDataManagement = window.BiDataManagement || {};

    const f = window.Layer8FormFactory;
    const enums = BiDataManagement.enums;

    BiDataManagement.forms = {
        BiDataSource: f.form('Data Source', [
            f.section('Source Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('sourceType', 'Source Type', enums.DATA_SOURCE_TYPE),
                ...f.select('connectionStatus', 'Connection Status', enums.CONNECTION_STATUS)
            ]),
            f.section('Connection', [
                ...f.text('connectionString', 'Connection String'),
                ...f.text('host', 'Host'),
                ...f.number('port', 'Port'),
                ...f.text('database', 'Database'),
                ...f.text('username', 'Username'),
                ...f.text('schema', 'Schema')
            ]),
            f.section('Status', [
                ...f.date('lastConnected', 'Last Connected'),
                ...f.date('lastSync', 'Last Sync'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        BiETLJob: f.form('ETL Job', [
            f.section('Job Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('sourceId', 'Source', 'BiDataSource', true),
                ...f.reference('targetId', 'Target', 'BiDataSource'),
                ...f.select('status', 'Status', enums.ETL_STATUS),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('ETL Configuration', [
                ...f.textarea('extractQuery', 'Extract Query'),
                ...f.textarea('transformConfig', 'Transform Config'),
                ...f.text('loadTarget', 'Load Target'),
                ...f.text('loadMode', 'Load Mode')
            ]),
            f.section('Execution Stats', [
                ...f.date('lastRun', 'Last Run'),
                ...f.date('lastSuccess', 'Last Success'),
                ...f.number('rowsProcessed', 'Rows Processed'),
                ...f.number('rowsFailed', 'Rows Failed'),
                ...f.textarea('errorMessage', 'Error Message'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        BiETLSchedule: f.form('ETL Schedule', [
            f.section('Schedule Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('jobId', 'ETL Job', 'BiETLJob', true),
                ...f.select('frequency', 'Frequency', enums.SCHEDULE_FREQUENCY)
            ]),
            f.section('Timing', [
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.text('runTime', 'Run Time (HH:MM)'),
                ...f.number('dayOfWeek', 'Day of Week'),
                ...f.number('dayOfMonth', 'Day of Month')
            ]),
            f.section('Status', [
                ...f.date('nextRun', 'Next Run'),
                ...f.date('lastRun', 'Last Run'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        BiDataQualityRule: f.form('Data Quality Rule', [
            f.section('Rule Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('dataSourceId', 'Data Source', 'BiDataSource', true),
                ...f.text('tableName', 'Table Name', true),
                ...f.text('columnName', 'Column Name'),
                ...f.text('ruleType', 'Rule Type'),
                ...f.textarea('ruleExpression', 'Rule Expression'),
                ...f.number('threshold', 'Threshold')
            ]),
            f.section('Results', [
                ...f.select('lastStatus', 'Last Status', enums.DATA_QUALITY_STATUS),
                ...f.number('lastScore', 'Last Score'),
                ...f.date('lastCheck', 'Last Check'),
                ...f.number('recordsChecked', 'Records Checked'),
                ...f.number('recordsPassed', 'Records Passed'),
                ...f.number('recordsFailed', 'Records Failed'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        BiMasterDataConfig: f.form('Master Data Config', [
            f.section('Configuration Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('entityType', 'Entity Type', true),
                ...f.reference('sourceSystemId', 'Source System', 'BiDataSource'),
                ...f.text('goldenRecordId', 'Golden Record ID')
            ]),
            f.section('Rules', [
                ...f.textarea('matchRules', 'Match Rules (JSON)'),
                ...f.textarea('mergeRules', 'Merge Rules (JSON)')
            ]),
            f.section('Statistics', [
                ...f.date('lastSync', 'Last Sync'),
                ...f.number('totalRecords', 'Total Records'),
                ...f.number('matchedRecords', 'Matched Records'),
                ...f.number('duplicateRecords', 'Duplicate Records'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        BiDataGovernance: f.form('Data Governance', [
            f.section('Governance Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('dataDomain', 'Data Domain', true),
                ...f.select('classification', 'Classification', enums.GOVERNANCE_LEVEL),
                ...f.reference('dataOwnerId', 'Data Owner', 'Employee'),
                ...f.reference('dataStewardId', 'Data Steward', 'Employee')
            ]),
            f.section('Policies', [
                ...f.text('retentionPolicy', 'Retention Policy'),
                ...f.number('retentionDays', 'Retention Days'),
                ...f.textarea('accessPolicy', 'Access Policy'),
                ...f.textarea('complianceRequirements', 'Compliance Requirements (JSON)')
            ]),
            f.section('Review', [
                ...f.date('lastReview', 'Last Review'),
                ...f.date('nextReview', 'Next Review'),
                ...f.checkbox('isActive', 'Active')
            ])
        ])
    };

    BiDataManagement.primaryKeys = {
        BiDataSource: 'sourceId',
        BiETLJob: 'jobId',
        BiETLSchedule: 'scheduleId',
        BiDataQualityRule: 'ruleId',
        BiMasterDataConfig: 'configId',
        BiDataGovernance: 'governanceId'
    };

})();
