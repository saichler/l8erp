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
 * Mobile BI Reporting Module - Form Configurations
 * Desktop Equivalent: bi/reporting/reporting-forms.js
 */
(function() {
    'use strict';

    const enums = MobileBiReporting.enums;

    MobileBiReporting.forms = {
        BiReport: {
            title: 'Report',
            sections: [
                {
                    title: 'Report Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'reportType', label: 'Report Type', type: 'select', options: enums.REPORT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.REPORT_STATUS },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Data Configuration',
                    fields: [
                        { key: 'dataSourceId', label: 'Data Source', type: 'reference', lookupModel: 'BiDataSource' },
                        { key: 'templateId', label: 'Template', type: 'reference', lookupModel: 'BiReportTemplate' },
                        { key: 'query', label: 'Query', type: 'textarea' }
                    ]
                },
                {
                    title: 'Output Settings',
                    fields: [
                        { key: 'defaultFormat', label: 'Default Format', type: 'select', options: enums.EXPORT_FORMAT },
                        { key: 'isPublic', label: 'Public', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiReportTemplate: {
            title: 'Report Template',
            sections: [
                {
                    title: 'Template Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'reportType', label: 'Report Type', type: 'select', options: enums.REPORT_TYPE },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Template Configuration',
                    fields: [
                        { key: 'layoutTemplate', label: 'Layout Template', type: 'textarea' },
                        { key: 'styleTemplate', label: 'Style Template', type: 'textarea' }
                    ]
                }
            ]
        },

        BiReportSchedule: {
            title: 'Report Schedule',
            sections: [
                {
                    title: 'Schedule Details',
                    fields: [
                        { key: 'reportId', label: 'Report', type: 'reference', lookupModel: 'BiReport', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'frequency', label: 'Frequency', type: 'select', options: enums.SCHEDULE_FREQUENCY },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Timing',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'runTime', label: 'Run Time (HH:MM)', type: 'text' },
                        { key: 'dayOfWeek', label: 'Day of Week (0-6)', type: 'number' },
                        { key: 'dayOfMonth', label: 'Day of Month (1-31)', type: 'number' }
                    ]
                },
                {
                    title: 'Output & Delivery',
                    fields: [
                        { key: 'outputFormat', label: 'Output Format', type: 'select', options: enums.EXPORT_FORMAT },
                        { key: 'deliveryEmail', label: 'Delivery Email', type: 'text' }
                    ]
                }
            ]
        },

        BiReportExecution: {
            title: 'Report Execution',
            sections: [
                {
                    title: 'Execution Details',
                    fields: [
                        { key: 'reportId', label: 'Report', type: 'reference', lookupModel: 'BiReport', required: true },
                        { key: 'scheduleId', label: 'Schedule', type: 'reference', lookupModel: 'BiReportSchedule' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.EXECUTION_STATUS },
                        { key: 'executedBy', label: 'Executed By', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Timing',
                    fields: [
                        { key: 'startTime', label: 'Start Time', type: 'date' },
                        { key: 'endTime', label: 'End Time', type: 'date' }
                    ]
                },
                {
                    title: 'Results',
                    fields: [
                        { key: 'rowCount', label: 'Row Count', type: 'number' },
                        { key: 'fileSize', label: 'File Size (bytes)', type: 'number' },
                        { key: 'outputPath', label: 'Output Path', type: 'text' },
                        { key: 'outputFormat', label: 'Output Format', type: 'select', options: enums.EXPORT_FORMAT },
                        { key: 'errorMessage', label: 'Error Message', type: 'textarea' }
                    ]
                }
            ]
        },

        BiReportAccess: {
            title: 'Report Access',
            sections: [
                {
                    title: 'Access Details',
                    fields: [
                        { key: 'reportId', label: 'Report', type: 'reference', lookupModel: 'BiReport', required: true },
                        { key: 'principalId', label: 'Principal ID', type: 'text', required: true },
                        { key: 'principalType', label: 'Principal Type', type: 'text' },
                        { key: 'accessLevel', label: 'Access Level', type: 'select', options: enums.ACCESS_LEVEL }
                    ]
                },
                {
                    title: 'Grant Information',
                    fields: [
                        { key: 'grantedDate', label: 'Granted Date', type: 'date' },
                        { key: 'grantedBy', label: 'Granted By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' }
                    ]
                }
            ]
        },

        BiReportSubscription: {
            title: 'Report Subscription',
            sections: [
                {
                    title: 'Subscription Details',
                    fields: [
                        { key: 'reportId', label: 'Report', type: 'reference', lookupModel: 'BiReport', required: true },
                        { key: 'scheduleId', label: 'Schedule', type: 'reference', lookupModel: 'BiReportSchedule', required: true },
                        { key: 'subscriberId', label: 'Subscriber', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Delivery Settings',
                    fields: [
                        { key: 'format', label: 'Format', type: 'select', options: enums.EXPORT_FORMAT },
                        { key: 'deliveryEmail', label: 'Delivery Email', type: 'text' },
                        { key: 'includeEmpty', label: 'Include Empty Reports', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

})();
