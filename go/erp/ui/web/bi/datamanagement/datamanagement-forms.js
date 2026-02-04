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
// BI Data Management Module - Form Definitions

(function() {
    'use strict';

    window.BiDataManagement = window.BiDataManagement || {};

    const enums = BiDataManagement.enums;

    BiDataManagement.forms = {
        BiDataSource: {
            title: 'Data Source',
            sections: [
                {
                    title: 'Source Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'sourceType', label: 'Source Type', type: 'select', options: enums.DATA_SOURCE_TYPE },
                        { key: 'connectionStatus', label: 'Connection Status', type: 'select', options: enums.CONNECTION_STATUS }
                    ]
                },
                {
                    title: 'Connection',
                    fields: [
                        { key: 'connectionString', label: 'Connection String', type: 'text' },
                        { key: 'host', label: 'Host', type: 'text' },
                        { key: 'port', label: 'Port', type: 'number' },
                        { key: 'database', label: 'Database', type: 'text' },
                        { key: 'username', label: 'Username', type: 'text' },
                        { key: 'schema', label: 'Schema', type: 'text' }
                    ]
                },
                {
                    title: 'Status',
                    fields: [
                        { key: 'lastConnected', label: 'Last Connected', type: 'date' },
                        { key: 'lastSync', label: 'Last Sync', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiETLJob: {
            title: 'ETL Job',
            sections: [
                {
                    title: 'Job Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'sourceId', label: 'Source', type: 'reference', lookupModel: 'BiDataSource', required: true },
                        { key: 'targetId', label: 'Target', type: 'reference', lookupModel: 'BiDataSource' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ETL_STATUS },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'ETL Configuration',
                    fields: [
                        { key: 'extractQuery', label: 'Extract Query', type: 'textarea' },
                        { key: 'transformConfig', label: 'Transform Config', type: 'textarea' },
                        { key: 'loadTarget', label: 'Load Target', type: 'text' },
                        { key: 'loadMode', label: 'Load Mode', type: 'text' }
                    ]
                },
                {
                    title: 'Execution Stats',
                    fields: [
                        { key: 'lastRun', label: 'Last Run', type: 'date' },
                        { key: 'lastSuccess', label: 'Last Success', type: 'date' },
                        { key: 'rowsProcessed', label: 'Rows Processed', type: 'number' },
                        { key: 'rowsFailed', label: 'Rows Failed', type: 'number' },
                        { key: 'errorMessage', label: 'Error Message', type: 'textarea' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiETLSchedule: {
            title: 'ETL Schedule',
            sections: [
                {
                    title: 'Schedule Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'jobId', label: 'ETL Job', type: 'reference', lookupModel: 'BiETLJob', required: true },
                        { key: 'frequency', label: 'Frequency', type: 'select', options: enums.SCHEDULE_FREQUENCY }
                    ]
                },
                {
                    title: 'Timing',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'runTime', label: 'Run Time (HH:MM)', type: 'text' },
                        { key: 'dayOfWeek', label: 'Day of Week', type: 'number' },
                        { key: 'dayOfMonth', label: 'Day of Month', type: 'number' }
                    ]
                },
                {
                    title: 'Status',
                    fields: [
                        { key: 'nextRun', label: 'Next Run', type: 'date' },
                        { key: 'lastRun', label: 'Last Run', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiDataQualityRule: {
            title: 'Data Quality Rule',
            sections: [
                {
                    title: 'Rule Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'dataSourceId', label: 'Data Source', type: 'reference', lookupModel: 'BiDataSource', required: true },
                        { key: 'tableName', label: 'Table Name', type: 'text', required: true },
                        { key: 'columnName', label: 'Column Name', type: 'text' },
                        { key: 'ruleType', label: 'Rule Type', type: 'text' },
                        { key: 'ruleExpression', label: 'Rule Expression', type: 'textarea' },
                        { key: 'threshold', label: 'Threshold', type: 'number' }
                    ]
                },
                {
                    title: 'Results',
                    fields: [
                        { key: 'lastStatus', label: 'Last Status', type: 'select', options: enums.DATA_QUALITY_STATUS },
                        { key: 'lastScore', label: 'Last Score', type: 'number' },
                        { key: 'lastCheck', label: 'Last Check', type: 'date' },
                        { key: 'recordsChecked', label: 'Records Checked', type: 'number' },
                        { key: 'recordsPassed', label: 'Records Passed', type: 'number' },
                        { key: 'recordsFailed', label: 'Records Failed', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiMasterDataConfig: {
            title: 'Master Data Config',
            sections: [
                {
                    title: 'Configuration Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'entityType', label: 'Entity Type', type: 'text', required: true },
                        { key: 'sourceSystemId', label: 'Source System', type: 'reference', lookupModel: 'BiDataSource' },
                        { key: 'goldenRecordId', label: 'Golden Record ID', type: 'text' }
                    ]
                },
                {
                    title: 'Rules',
                    fields: [
                        { key: 'matchRules', label: 'Match Rules (JSON)', type: 'textarea' },
                        { key: 'mergeRules', label: 'Merge Rules (JSON)', type: 'textarea' }
                    ]
                },
                {
                    title: 'Statistics',
                    fields: [
                        { key: 'lastSync', label: 'Last Sync', type: 'date' },
                        { key: 'totalRecords', label: 'Total Records', type: 'number' },
                        { key: 'matchedRecords', label: 'Matched Records', type: 'number' },
                        { key: 'duplicateRecords', label: 'Duplicate Records', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiDataGovernance: {
            title: 'Data Governance',
            sections: [
                {
                    title: 'Governance Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'dataDomain', label: 'Data Domain', type: 'text', required: true },
                        { key: 'classification', label: 'Classification', type: 'select', options: enums.GOVERNANCE_LEVEL },
                        { key: 'dataOwnerId', label: 'Data Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'dataStewardId', label: 'Data Steward', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Policies',
                    fields: [
                        { key: 'retentionPolicy', label: 'Retention Policy', type: 'text' },
                        { key: 'retentionDays', label: 'Retention Days', type: 'number' },
                        { key: 'accessPolicy', label: 'Access Policy', type: 'textarea' },
                        { key: 'complianceRequirements', label: 'Compliance Requirements (JSON)', type: 'textarea' }
                    ]
                },
                {
                    title: 'Review',
                    fields: [
                        { key: 'lastReview', label: 'Last Review', type: 'date' },
                        { key: 'nextReview', label: 'Next Review', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        }
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
