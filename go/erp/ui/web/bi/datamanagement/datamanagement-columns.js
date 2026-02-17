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
// BI Data Management Module - Column Configurations

(function() {
    'use strict';

    window.BiDataManagement = window.BiDataManagement || {};

    const { renderDate } = Layer8DRenderers;
    const render = BiDataManagement.render;

    BiDataManagement.columns = {
        BiDataSource: [
            { key: 'sourceId', label: 'ID', sortKey: 'sourceId', filterKey: 'sourceId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'sourceType',
                label: 'Type',
                sortKey: 'sourceType',
                render: (item) => render.dataSourceType(item.sourceType)
            },
            { key: 'host', label: 'Host', sortKey: 'host', filterKey: 'host' },
            { key: 'database', label: 'Database', sortKey: 'database', filterKey: 'database' },
            {
                key: 'connectionStatus',
                label: 'Status',
                sortKey: 'connectionStatus',
                render: (item) => render.connectionStatus(item.connectionStatus)
            },
            {
                key: 'lastConnected',
                label: 'Last Connected',
                sortKey: 'lastConnected',
                render: (item) => renderDate(item.lastConnected)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        BiETLJob: [
            { key: 'jobId', label: 'ID', sortKey: 'jobId', filterKey: 'jobId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'sourceId', label: 'Source', sortKey: 'sourceId', filterKey: 'sourceId' },
            { key: 'targetId', label: 'Target', sortKey: 'targetId', filterKey: 'targetId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.etlStatus(item.status)
            },
            { key: 'loadMode', label: 'Load Mode', sortKey: 'loadMode' },
            {
                key: 'lastRun',
                label: 'Last Run',
                sortKey: 'lastRun',
                render: (item) => renderDate(item.lastRun)
            },
            { key: 'rowsProcessed', label: 'Rows Processed', sortKey: 'rowsProcessed' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        BiDataQualityRule: [
            { key: 'ruleId', label: 'ID', sortKey: 'ruleId', filterKey: 'ruleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'dataSourceId', label: 'Data Source', sortKey: 'dataSourceId' },
            { key: 'tableName', label: 'Table', sortKey: 'tableName', filterKey: 'tableName' },
            { key: 'columnName', label: 'Column', sortKey: 'columnName' },
            { key: 'ruleType', label: 'Rule Type', sortKey: 'ruleType' },
            {
                key: 'lastStatus',
                label: 'Status',
                sortKey: 'lastStatus',
                render: (item) => render.dataQualityStatus(item.lastStatus)
            },
            { key: 'lastScore', label: 'Score', sortKey: 'lastScore' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        BiMasterDataConfig: [
            { key: 'configId', label: 'ID', sortKey: 'configId', filterKey: 'configId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'entityType', label: 'Entity Type', sortKey: 'entityType', filterKey: 'entityType' },
            { key: 'sourceSystemId', label: 'Source System', sortKey: 'sourceSystemId' },
            { key: 'totalRecords', label: 'Total Records', sortKey: 'totalRecords' },
            { key: 'matchedRecords', label: 'Matched', sortKey: 'matchedRecords' },
            { key: 'duplicateRecords', label: 'Duplicates', sortKey: 'duplicateRecords' },
            {
                key: 'lastSync',
                label: 'Last Sync',
                sortKey: 'lastSync',
                render: (item) => renderDate(item.lastSync)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        BiDataGovernance: [
            { key: 'governanceId', label: 'ID', sortKey: 'governanceId', filterKey: 'governanceId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'dataDomain', label: 'Data Domain', sortKey: 'dataDomain', filterKey: 'dataDomain' },
            {
                key: 'classification',
                label: 'Classification',
                sortKey: 'classification',
                render: (item) => render.governanceLevel(item.classification)
            },
            { key: 'dataOwnerId', label: 'Owner', sortKey: 'dataOwnerId' },
            { key: 'dataStewardId', label: 'Steward', sortKey: 'dataStewardId' },
            { key: 'retentionDays', label: 'Retention Days', sortKey: 'retentionDays' },
            {
                key: 'nextReview',
                label: 'Next Review',
                sortKey: 'nextReview',
                render: (item) => renderDate(item.nextReview)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ]
    };

})();
