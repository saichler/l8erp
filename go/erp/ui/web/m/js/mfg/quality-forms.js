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
            ])
        ]),
        MfgInspectionPoint: f.form('Inspection Point', [
            f.section('Point Details', [
                ...f.reference('planId', 'Quality Plan', 'MfgQualityPlan', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('inspectionType', 'Inspection Type', enums.INSPECTION_TYPE),
                ...f.number('sequence', 'Sequence'),
                ...f.text('characteristic', 'Characteristic'),
                ...f.text('specification', 'Specification'),
                ...f.checkbox('isMandatory', 'Mandatory')
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
            ])
        ]),
        MfgTestResult: f.form('Test Result', [
            f.section('Result Details', [
                ...f.reference('inspectionId', 'Inspection', 'MfgQualityInspection', true),
                ...f.reference('pointId', 'Inspection Point', 'MfgInspectionPoint', true),
                ...f.text('measuredValue', 'Measured Value'),
                ...f.text('textValue', 'Text Value'),
                ...f.select('result', 'Result', enums.INSPECTION_RESULT),
                ...f.textarea('notes', 'Notes')
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
            ])
        ]),
        MfgNCRAction: f.form('NCR Action', [
            f.section('Action Details', [
                ...f.reference('ncrId', 'NCR', 'MfgNCR', true),
                ...f.text('actionType', 'Action Type', true),
                ...f.textarea('description', 'Description'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('completedDate', 'Completed Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    MobileMfgQuality.primaryKeys = {
        MfgQualityPlan: 'planId', MfgInspectionPoint: 'pointId', MfgQualityInspection: 'inspectionId',
        MfgTestResult: 'resultId', MfgNCR: 'ncrId', MfgNCRAction: 'actionId'
    };

})();
