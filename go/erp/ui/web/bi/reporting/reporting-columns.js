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
        ]
    };

})();
