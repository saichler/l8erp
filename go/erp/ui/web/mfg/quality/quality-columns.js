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

    const col = window.Layer8ColumnFactory;
    const render = MfgQuality.render;

    MfgQuality.columns = {
        MfgQualityPlan: [
            ...col.id('planId'),
            ...col.basic([['planNumber', 'Plan #'], 'name', ['itemId', 'Item'], 'revision']),
            ...col.date('effectiveDate', 'Effective')
        ],

        MfgInspectionPoint: [
            ...col.id('pointId'),
            ...col.basic([['planId', 'Plan'], 'name']),
            ...col.custom('inspectionType', 'Type', (item) => render.inspectionType(item.inspectionType)),
            ...col.basic([['sequenceNumber', 'Seq #'], 'characteristic'])
        ],

        MfgQualityInspection: [
            ...col.id('inspectionId'),
            ...col.basic([['inspectionNumber', 'Insp #'], ['workOrderId', 'Work Order'], ['planId', 'Plan']]),
            ...col.date('inspectionDate', 'Date'),
            ...col.custom('result', 'Result', (item) => render.inspectionResult(item.result))
        ],

        MfgTestResult: [
            ...col.id('resultId'),
            ...col.basic([['inspectionId', 'Inspection'], ['pointId', 'Point']]),
            ...col.basic([['measuredValue', 'Measured'], ['targetValue', 'Target']]),
            ...col.custom('result', 'Result', (item) => render.inspectionResult(item.result))
        ],

        MfgNCR: [
            ...col.id('ncrId'),
            ...col.basic([['ncrNumber', 'NCR #'], ['itemId', 'Item'], ['workOrderId', 'Work Order']]),
            ...col.custom('severity', 'Severity', (item) => render.ncrSeverity(item.severity)),
            ...col.date('reportDate', 'Report Date'),
            ...col.custom('status', 'Status', (item) => render.ncrStatus(item.status))
        ],

        MfgNCRAction: [
            ...col.id('actionId'),
            ...col.basic([['ncrId', 'NCR'], ['actionType', 'Type'], ['assignedTo', 'Assigned To']]),
            ...col.date('dueDate', 'Due Date'),
            ...col.date('completedDate', 'Completed')
        ]
    };
})();
