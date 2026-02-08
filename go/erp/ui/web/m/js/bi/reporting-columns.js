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
 * Mobile BI Reporting Module - Column Configurations
 * Desktop Equivalent: bi/reporting/reporting-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileBiReporting.enums;
    const render = MobileBiReporting.render;

    MobileBiReporting.columns = {
        BiReport: [
            ...col.id('reportId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('reportType', 'Type', enums.REPORT_TYPE_VALUES, render.reportType),
            ...col.status('status', 'Status', enums.REPORT_STATUS_VALUES, render.reportStatus),
            ...col.col('category', 'Category'),
            ...col.col('ownerId', 'Owner'),
            ...col.enum('defaultFormat', 'Format', null, render.exportFormat),
            ...col.boolean('isPublic', 'Public'),
            ...col.date('lastExecuted', 'Last Executed'),
            ...col.col('executionCount', 'Executions')
        ],

        BiReportTemplate: [
            ...col.id('templateId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.status('reportType', 'Type', enums.REPORT_TYPE_VALUES, render.reportType),
            ...col.col('category', 'Category'),
            ...col.boolean('isActive', 'Active')
        ],

        BiReportSchedule: [
            ...col.id('scheduleId'),
            ...col.col('reportId', 'Report'),
            ...col.col('name', 'Name'),
            ...col.status('frequency', 'Frequency', enums.SCHEDULE_FREQUENCY_VALUES, render.scheduleFrequency),
            ...col.col('runTime', 'Run Time'),
            ...col.date('nextRun', 'Next Run'),
            ...col.date('lastRun', 'Last Run'),
            ...col.enum('outputFormat', 'Format', null, render.exportFormat),
            ...col.boolean('isActive', 'Active')
        ],

        BiReportExecution: [
            ...col.id('executionId'),
            ...col.col('reportId', 'Report'),
            ...col.col('scheduleId', 'Schedule'),
            ...col.status('status', 'Status', enums.EXECUTION_STATUS_VALUES, render.executionStatus),
            ...col.date('startTime', 'Start Time'),
            ...col.date('endTime', 'End Time'),
            ...col.col('executedBy', 'Executed By'),
            ...col.col('rowCount', 'Rows'),
            ...col.enum('outputFormat', 'Format', null, render.exportFormat)
        ],

        BiReportAccess: [
            ...col.id('accessId'),
            ...col.col('reportId', 'Report'),
            ...col.col('principalId', 'Principal'),
            ...col.col('principalType', 'Type'),
            ...col.status('accessLevel', 'Access Level', enums.ACCESS_LEVEL_VALUES, render.accessLevel),
            ...col.date('grantedDate', 'Granted'),
            ...col.col('grantedBy', 'Granted By'),
            ...col.date('expiryDate', 'Expires')
        ],

        BiReportSubscription: [
            ...col.id('subscriptionId'),
            ...col.col('reportId', 'Report'),
            ...col.col('scheduleId', 'Schedule'),
            ...col.col('subscriberId', 'Subscriber'),
            ...col.enum('format', 'Format', null, render.exportFormat),
            ...col.col('deliveryEmail', 'Email'),
            ...col.boolean('includeEmpty', 'Include Empty'),
            ...col.boolean('isActive', 'Active')
        ]
    };

    MobileBiReporting.primaryKeys = {
        BiReport: 'reportId', BiReportTemplate: 'templateId',
        BiReportSchedule: 'scheduleId', BiReportExecution: 'executionId',
        BiReportAccess: 'accessId', BiReportSubscription: 'subscriptionId'
    };

})();
