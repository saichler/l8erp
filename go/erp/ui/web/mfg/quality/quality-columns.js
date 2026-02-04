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
// Manufacturing Quality Module - Column Configurations

(function() {
    'use strict';

    window.MfgQuality = window.MfgQuality || {};

    const { renderDate } = Layer8DRenderers;
    const render = MfgQuality.render;
    const enums = MfgQuality.enums;

    MfgQuality.columns = {
        MfgQualityPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'planNumber', label: 'Plan #', sortKey: 'planNumber', filterKey: 'planNumber' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'revision', label: 'Rev', sortKey: 'revision' },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            }
        ],

        MfgInspectionPoint: [
            { key: 'pointId', label: 'ID', sortKey: 'pointId', filterKey: 'pointId' },
            { key: 'planId', label: 'Plan', sortKey: 'planId', filterKey: 'planId' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            {
                key: 'inspectionType',
                label: 'Type',
                sortKey: 'inspectionType',
                render: (item) => render.inspectionType(item.inspectionType)
            },
            { key: 'sequenceNumber', label: 'Seq #', sortKey: 'sequenceNumber' },
            { key: 'characteristic', label: 'Characteristic', sortKey: 'characteristic' }
        ],

        MfgQualityInspection: [
            { key: 'inspectionId', label: 'ID', sortKey: 'inspectionId', filterKey: 'inspectionId' },
            { key: 'inspectionNumber', label: 'Insp #', sortKey: 'inspectionNumber', filterKey: 'inspectionNumber' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'planId', label: 'Plan', sortKey: 'planId' },
            {
                key: 'inspectionDate',
                label: 'Date',
                sortKey: 'inspectionDate',
                render: (item) => renderDate(item.inspectionDate)
            },
            {
                key: 'result',
                label: 'Result',
                sortKey: 'result',
                render: (item) => render.inspectionResult(item.result)
            }
        ],

        MfgTestResult: [
            { key: 'resultId', label: 'ID', sortKey: 'resultId', filterKey: 'resultId' },
            { key: 'inspectionId', label: 'Inspection', sortKey: 'inspectionId', filterKey: 'inspectionId' },
            { key: 'pointId', label: 'Point', sortKey: 'pointId' },
            { key: 'measuredValue', label: 'Measured', sortKey: 'measuredValue' },
            { key: 'targetValue', label: 'Target', sortKey: 'targetValue' },
            {
                key: 'result',
                label: 'Result',
                sortKey: 'result',
                render: (item) => render.inspectionResult(item.result)
            }
        ],

        MfgNCR: [
            { key: 'ncrId', label: 'ID', sortKey: 'ncrId', filterKey: 'ncrId' },
            { key: 'ncrNumber', label: 'NCR #', sortKey: 'ncrNumber', filterKey: 'ncrNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            {
                key: 'severity',
                label: 'Severity',
                sortKey: 'severity',
                render: (item) => render.ncrSeverity(item.severity)
            },
            {
                key: 'reportDate',
                label: 'Report Date',
                sortKey: 'reportDate',
                render: (item) => renderDate(item.reportDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.ncrStatus(item.status)
            }
        ],

        MfgNCRAction: [
            { key: 'actionId', label: 'ID', sortKey: 'actionId', filterKey: 'actionId' },
            { key: 'ncrId', label: 'NCR', sortKey: 'ncrId', filterKey: 'ncrId' },
            { key: 'actionType', label: 'Type', sortKey: 'actionType' },
            { key: 'assignedTo', label: 'Assigned To', sortKey: 'assignedTo' },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            {
                key: 'completedDate',
                label: 'Completed',
                sortKey: 'completedDate',
                render: (item) => renderDate(item.completedDate)
            }
        ]
    };

})();
