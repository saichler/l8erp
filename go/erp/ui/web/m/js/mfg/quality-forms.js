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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Manufacturing Quality Module - Form Definitions
 * Desktop Equivalent: mfg/quality/quality-forms.js
 */
(function() {
    'use strict';

    window.MobileMfgQuality = window.MobileMfgQuality || {};
    const f = window.Layer8FormFactory;
    const enums = MobileMfgQuality.enums;

    MobileMfgQuality.forms = {
        MfgQualityPlan: f.form('Quality Plan', [
            f.section('Plan Details', [
                ...f.text('planNumber', 'Plan Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('itemId', 'Item', 'ScmItem'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.text('revision', 'Revision'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Inspection Points', [
                ...f.inlineTable('inspectionPoints', 'Inspection Points', [
                    { key: 'pointId', label: 'ID', hidden: true },
                    { key: 'sequence', label: 'Seq #', type: 'number' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'inspectionType', label: 'Type', type: 'text' },
                    { key: 'characteristic', label: 'Characteristic', type: 'text' },
                    { key: 'lowerLimit', label: 'Lower', type: 'number' },
                    { key: 'upperLimit', label: 'Upper', type: 'number' }
                ])
            ])
        ]),
        MfgQualityInspection: f.form('Quality Inspection', [
            f.section('Inspection Details', [
                ...f.text('inspectionNumber', 'Inspection #', true),
                ...f.reference('planId', 'Quality Plan', 'MfgQualityPlan'),
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder'),
                ...f.date('inspectionDate', 'Inspection Date', true),
                ...f.number('quantityInspected', 'Qty Inspected'),
                ...f.select('overallResult', 'Result', enums.INSPECTION_RESULT),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Test Results', [
                ...f.inlineTable('testResults', 'Test Results', [
                    { key: 'resultId', label: 'ID', hidden: true },
                    { key: 'pointId', label: 'Point', type: 'text' },
                    { key: 'sampleNumber', label: 'Sample #', type: 'number' },
                    { key: 'measuredValue', label: 'Measured', type: 'text' },
                    { key: 'result', label: 'Result', type: 'text' },
                    { key: 'isInSpec', label: 'In Spec', type: 'checkbox' }
                ])
            ])
        ]),
        MfgNCR: f.form('Non-Conformance Report', [
            f.section('NCR Details', [
                ...f.text('ncrNumber', 'NCR Number', true),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('itemId', 'Item', 'ScmItem'),
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder'),
                ...f.select('severity', 'Severity', enums.NCR_SEVERITY),
                ...f.select('status', 'Status', enums.NCR_STATUS),
                ...f.date('reportedDate', 'Reported Date'),
                ...f.number('quantityAffected', 'Qty Affected'),
                ...f.select('disposition', 'Disposition', enums.NCR_DISPOSITION),
                ...f.textarea('rootCause', 'Root Cause')
            ]),
            f.section('Actions', [
                ...f.inlineTable('actions', 'NCR Actions', [
                    { key: 'actionId', label: 'ID', hidden: true },
                    { key: 'actionNumber', label: 'Action #', type: 'number' },
                    { key: 'actionType', label: 'Type', type: 'text' },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'assignedTo', label: 'Assigned To', type: 'text' },
                    { key: 'status', label: 'Status', type: 'text' }
                ])
            ])
        ])
    };

    MobileMfgQuality.primaryKeys = {
        MfgQualityPlan: 'planId', MfgQualityInspection: 'inspectionId', MfgNCR: 'ncrId'
    };

})();
