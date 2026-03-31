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

    const col = window.Layer8ColumnFactory;
    const render = BiReporting.render;

    BiReporting.columns = {
        BiReport: [
            ...col.id('reportId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.enum('reportType', 'Type', null, render.reportType),
            ...col.enum('status', 'Status', null, render.reportStatus),
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
            ...col.enum('reportType', 'Type', null, render.reportType),
            ...col.col('category', 'Category'),
            ...col.boolean('isActive', 'Active')
        ]
    };

})();
