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
// BI Reporting Module - Column Configurations

(function() {
    'use strict';

    window.BiReporting = window.BiReporting || {};

    const { renderDate } = Layer8DRenderers;
    const render = BiReporting.render;

    BiReporting.columns = {
        BiReport: [
            { key: 'reportId', label: 'ID', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'reportType',
                label: 'Type',
                sortKey: 'reportType',
                render: (item) => render.reportType(item.reportType)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.reportStatus(item.status)
            },
            { key: 'category', label: 'Category', sortKey: 'category' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            {
                key: 'defaultFormat',
                label: 'Format',
                sortKey: 'defaultFormat',
                render: (item) => render.exportFormat(item.defaultFormat)
            },
            {
                key: 'isPublic',
                label: 'Public',
                sortKey: 'isPublic',
                render: (item) => item.isPublic ? 'Yes' : 'No'
            },
            {
                key: 'lastExecuted',
                label: 'Last Executed',
                sortKey: 'lastExecuted',
                render: (item) => renderDate(item.lastExecuted)
            },
            { key: 'executionCount', label: 'Executions', sortKey: 'executionCount' }
        ],

        BiReportTemplate: [
            { key: 'templateId', label: 'ID', sortKey: 'templateId', filterKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            {
                key: 'reportType',
                label: 'Type',
                sortKey: 'reportType',
                render: (item) => render.reportType(item.reportType)
            },
            { key: 'category', label: 'Category', sortKey: 'category' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        BiReportSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'reportId', label: 'Report', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'frequency',
                label: 'Frequency',
                sortKey: 'frequency',
                render: (item) => render.scheduleFrequency(item.frequency)
            },
            { key: 'runTime', label: 'Run Time', sortKey: 'runTime' },
            {
                key: 'nextRun',
                label: 'Next Run',
                sortKey: 'nextRun',
                render: (item) => renderDate(item.nextRun)
            },
            {
                key: 'lastRun',
                label: 'Last Run',
                sortKey: 'lastRun',
                render: (item) => renderDate(item.lastRun)
            },
            {
                key: 'outputFormat',
                label: 'Format',
                sortKey: 'outputFormat',
                render: (item) => render.exportFormat(item.outputFormat)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        BiReportExecution: [
            { key: 'executionId', label: 'ID', sortKey: 'executionId', filterKey: 'executionId' },
            { key: 'reportId', label: 'Report', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'scheduleId', label: 'Schedule', sortKey: 'scheduleId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.executionStatus(item.status)
            },
            {
                key: 'startTime',
                label: 'Start Time',
                sortKey: 'startTime',
                render: (item) => renderDate(item.startTime)
            },
            {
                key: 'endTime',
                label: 'End Time',
                sortKey: 'endTime',
                render: (item) => renderDate(item.endTime)
            },
            { key: 'executedBy', label: 'Executed By', sortKey: 'executedBy' },
            { key: 'rowCount', label: 'Rows', sortKey: 'rowCount' },
            {
                key: 'outputFormat',
                label: 'Format',
                sortKey: 'outputFormat',
                render: (item) => render.exportFormat(item.outputFormat)
            }
        ],

        BiReportAccess: [
            { key: 'accessId', label: 'ID', sortKey: 'accessId', filterKey: 'accessId' },
            { key: 'reportId', label: 'Report', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'principalId', label: 'Principal', sortKey: 'principalId' },
            { key: 'principalType', label: 'Type', sortKey: 'principalType' },
            {
                key: 'accessLevel',
                label: 'Access Level',
                sortKey: 'accessLevel',
                render: (item) => render.accessLevel(item.accessLevel)
            },
            {
                key: 'grantedDate',
                label: 'Granted',
                sortKey: 'grantedDate',
                render: (item) => renderDate(item.grantedDate)
            },
            { key: 'grantedBy', label: 'Granted By', sortKey: 'grantedBy' },
            {
                key: 'expiryDate',
                label: 'Expires',
                sortKey: 'expiryDate',
                render: (item) => renderDate(item.expiryDate)
            }
        ],

        BiReportSubscription: [
            { key: 'subscriptionId', label: 'ID', sortKey: 'subscriptionId', filterKey: 'subscriptionId' },
            { key: 'reportId', label: 'Report', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'scheduleId', label: 'Schedule', sortKey: 'scheduleId' },
            { key: 'subscriberId', label: 'Subscriber', sortKey: 'subscriberId' },
            {
                key: 'format',
                label: 'Format',
                sortKey: 'format',
                render: (item) => render.exportFormat(item.format)
            },
            { key: 'deliveryEmail', label: 'Email', sortKey: 'deliveryEmail' },
            {
                key: 'includeEmpty',
                label: 'Include Empty',
                sortKey: 'includeEmpty',
                render: (item) => item.includeEmpty ? 'Yes' : 'No'
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
