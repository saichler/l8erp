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
/**
 * Mobile BI Data Management Module - Column Configurations
 * Desktop Equivalent: bi/datamanagement/datamanagement-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileBiDataManagement.enums;
    const render = MobileBiDataManagement.render;

    MobileBiDataManagement.columns = {
        BiDataSource: [
            ...col.id('sourceId'),
            ...col.col('name', 'Name'),
            ...col.status('sourceType', 'Type', enums.DATA_SOURCE_TYPE_VALUES, render.dataSourceType),
            ...col.col('host', 'Host'),
            ...col.col('database', 'Database'),
            ...col.status('connectionStatus', 'Status', enums.CONNECTION_STATUS_VALUES, render.connectionStatus),
            ...col.date('lastConnected', 'Last Connected'),
            ...col.boolean('isActive', 'Active')
        ],

        BiETLJob: [
            ...col.id('jobId'),
            ...col.col('name', 'Name'),
            ...col.col('sourceId', 'Source'),
            ...col.col('targetId', 'Target'),
            ...col.status('status', 'Status', enums.ETL_STATUS_VALUES, render.etlStatus),
            ...col.col('loadMode', 'Load Mode'),
            ...col.date('lastRun', 'Last Run'),
            ...col.col('rowsProcessed', 'Rows Processed'),
            ...col.boolean('isActive', 'Active')
        ],

        BiETLSchedule: [
            ...col.id('scheduleId'),
            ...col.col('name', 'Name'),
            ...col.col('jobId', 'Job'),
            ...col.status('frequency', 'Frequency', enums.SCHEDULE_FREQUENCY_VALUES, render.scheduleFrequency),
            ...col.col('runTime', 'Run Time'),
            ...col.date('nextRun', 'Next Run'),
            ...col.date('lastRun', 'Last Run'),
            ...col.boolean('isActive', 'Active')
        ],

        BiDataQualityRule: [
            ...col.id('ruleId'),
            ...col.col('name', 'Name'),
            ...col.col('dataSourceId', 'Data Source'),
            ...col.col('tableName', 'Table'),
            ...col.col('columnName', 'Column'),
            ...col.col('ruleType', 'Rule Type'),
            ...col.status('lastStatus', 'Status', enums.DATA_QUALITY_STATUS_VALUES, render.dataQualityStatus),
            ...col.col('lastScore', 'Score'),
            ...col.boolean('isActive', 'Active')
        ],

        BiMasterDataConfig: [
            ...col.id('configId'),
            ...col.col('name', 'Name'),
            ...col.col('entityType', 'Entity Type'),
            ...col.col('sourceSystemId', 'Source System'),
            ...col.col('totalRecords', 'Total Records'),
            ...col.col('matchedRecords', 'Matched'),
            ...col.col('duplicateRecords', 'Duplicates'),
            ...col.date('lastSync', 'Last Sync'),
            ...col.boolean('isActive', 'Active')
        ],

        BiDataGovernance: [
            ...col.id('governanceId'),
            ...col.col('name', 'Name'),
            ...col.col('dataDomain', 'Data Domain'),
            ...col.status('classification', 'Classification', enums.GOVERNANCE_LEVEL_VALUES, render.governanceLevel),
            ...col.col('dataOwnerId', 'Owner'),
            ...col.col('dataStewardId', 'Steward'),
            ...col.col('retentionDays', 'Retention Days'),
            ...col.date('nextReview', 'Next Review'),
            ...col.boolean('isActive', 'Active')
        ]
    };

    MobileBiDataManagement.primaryKeys = {
        BiDataSource: 'sourceId', BiETLJob: 'jobId',
        BiETLSchedule: 'scheduleId', BiDataQualityRule: 'ruleId',
        BiMasterDataConfig: 'configId', BiDataGovernance: 'governanceId'
    };

})();
