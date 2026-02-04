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
 * Mobile Manufacturing Quality Module - Form Definitions
 * Desktop Equivalent: mfg/quality/quality-forms.js
 */
(function() {
    'use strict';

    window.MobileMfgQuality = window.MobileMfgQuality || {};
    const enums = MobileMfgQuality.enums;

    MobileMfgQuality.forms = {
        MfgQualityPlan: {
            title: 'Quality Plan',
            sections: [{ title: 'Plan Details', fields: [
                { key: 'planNumber', label: 'Plan Number', type: 'text', required: true },
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                { key: 'revision', label: 'Revision', type: 'text' },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgInspectionPoint: {
            title: 'Inspection Point',
            sections: [{ title: 'Point Details', fields: [
                { key: 'planId', label: 'Quality Plan', type: 'reference', lookupModel: 'MfgQualityPlan', required: true },
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'inspectionType', label: 'Inspection Type', type: 'select', options: enums.INSPECTION_TYPE },
                { key: 'sequenceNumber', label: 'Sequence', type: 'number' },
                { key: 'characteristic', label: 'Characteristic', type: 'text' },
                { key: 'targetValue', label: 'Target Value', type: 'text' },
                { key: 'isMandatory', label: 'Mandatory', type: 'checkbox' }
            ]}]
        },
        MfgQualityInspection: {
            title: 'Quality Inspection',
            sections: [{ title: 'Inspection Details', fields: [
                { key: 'inspectionNumber', label: 'Inspection #', type: 'text', required: true },
                { key: 'planId', label: 'Quality Plan', type: 'reference', lookupModel: 'MfgQualityPlan' },
                { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder' },
                { key: 'inspectionDate', label: 'Inspection Date', type: 'date', required: true },
                { key: 'quantityInspected', label: 'Qty Inspected', type: 'number' },
                { key: 'result', label: 'Result', type: 'select', options: enums.INSPECTION_RESULT },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgTestResult: {
            title: 'Test Result',
            sections: [{ title: 'Result Details', fields: [
                { key: 'inspectionId', label: 'Inspection', type: 'reference', lookupModel: 'MfgQualityInspection', required: true },
                { key: 'pointId', label: 'Inspection Point', type: 'reference', lookupModel: 'MfgInspectionPoint', required: true },
                { key: 'measuredValue', label: 'Measured Value', type: 'text' },
                { key: 'targetValue', label: 'Target Value', type: 'text' },
                { key: 'result', label: 'Result', type: 'select', options: enums.INSPECTION_RESULT },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgNCR: {
            title: 'Non-Conformance Report',
            sections: [{ title: 'NCR Details', fields: [
                { key: 'ncrNumber', label: 'NCR Number', type: 'text', required: true },
                { key: 'title', label: 'Title', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder' },
                { key: 'severity', label: 'Severity', type: 'select', options: enums.NCR_SEVERITY },
                { key: 'status', label: 'Status', type: 'select', options: enums.NCR_STATUS },
                { key: 'reportDate', label: 'Report Date', type: 'date' },
                { key: 'affectedQuantity', label: 'Affected Qty', type: 'number' },
                { key: 'disposition', label: 'Disposition', type: 'select', options: enums.NCR_DISPOSITION },
                { key: 'rootCause', label: 'Root Cause', type: 'textarea' }
            ]}]
        },
        MfgNCRAction: {
            title: 'NCR Action',
            sections: [{ title: 'Action Details', fields: [
                { key: 'ncrId', label: 'NCR', type: 'reference', lookupModel: 'MfgNCR', required: true },
                { key: 'actionType', label: 'Action Type', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'dueDate', label: 'Due Date', type: 'date' },
                { key: 'completedDate', label: 'Completed Date', type: 'date' },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        }
    };

    MobileMfgQuality.primaryKeys = {
        MfgQualityPlan: 'planId', MfgInspectionPoint: 'pointId', MfgQualityInspection: 'inspectionId',
        MfgTestResult: 'resultId', MfgNCR: 'ncrId', MfgNCRAction: 'actionId'
    };

})();
