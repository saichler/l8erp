/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Manufacturing Quality Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MfgQuality = window.MfgQuality || {};

    const f = window.Layer8FormFactory;
    const enums = MfgQuality.enums;

    MfgQuality.forms = {
        MfgQualityPlan: f.form('Quality Plan', [
            f.section('Plan Details', [
                ...f.text('planNumber', 'Plan Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('itemId', 'Item', 'ScmItem'),
                ...f.reference('routingId', 'Routing', 'MfgRouting'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
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
                ...f.number('upperLimit', 'Upper Limit'),
                ...f.number('lowerLimit', 'Lower Limit'),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.checkbox('isMandatory', 'Mandatory')
            ])
        ]),

        MfgQualityInspection: f.form('Quality Inspection', [
            f.section('Inspection Details', [
                ...f.text('inspectionNumber', 'Inspection #', true),
                ...f.reference('planId', 'Quality Plan', 'MfgQualityPlan'),
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder'),
                ...f.reference('itemId', 'Item', 'ScmItem'),
                ...f.date('inspectionDate', 'Inspection Date', true),
                ...f.reference('inspectorId', 'Inspector', 'Employee'),
                ...f.text('lotNumber', 'Lot Number'),
                ...f.number('quantityInspected', 'Qty Inspected'),
                ...f.number('quantityAccepted', 'Qty Accepted'),
                ...f.number('quantityRejected', 'Qty Rejected'),
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
                ...f.checkbox('isInSpec', 'In Spec'),
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
                ...f.reference('inspectionId', 'Inspection', 'MfgQualityInspection'),
                ...f.select('severity', 'Severity', enums.NCR_SEVERITY),
                ...f.select('status', 'Status', enums.NCR_STATUS),
                ...f.date('reportedDate', 'Report Date'),
                ...f.reference('reportedBy', 'Reported By', 'Employee'),
                ...f.number('quantityAffected', 'Affected Qty'),
                ...f.select('disposition', 'Disposition', enums.NCR_DISPOSITION),
                ...f.textarea('rootCause', 'Root Cause'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgNCRAction: f.form('NCR Action', [
            f.section('Action Details', [
                ...f.reference('ncrId', 'NCR', 'MfgNCR', true),
                ...f.text('actionType', 'Action Type', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('assignedTo', 'Assigned To', 'Employee'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('completedDate', 'Completed Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    MfgQuality.primaryKeys = {
        MfgQualityPlan: 'planId',
        MfgInspectionPoint: 'pointId',
        MfgQualityInspection: 'inspectionId',
        MfgTestResult: 'resultId',
        MfgNCR: 'ncrId',
        MfgNCRAction: 'actionId'
    };

})();
