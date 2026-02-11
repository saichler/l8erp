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
                ...f.reference('itemId', 'Item', 'ScmItem'),
                ...f.date('inspectionDate', 'Inspection Date', true),
                ...f.reference('inspectorId', 'Inspector', 'Employee'),
                ...f.text('lotNumber', 'Lot Number'),
                ...f.number('quantityInspected', 'Qty Inspected'),
                ...f.number('quantityAccepted', 'Qty Accepted'),
                ...f.number('quantityRejected', 'Qty Rejected'),
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
                ...f.reference('inspectionId', 'Inspection', 'MfgQualityInspection'),
                ...f.select('severity', 'Severity', enums.NCR_SEVERITY),
                ...f.select('status', 'Status', enums.NCR_STATUS),
                ...f.date('reportedDate', 'Report Date'),
                ...f.reference('reportedBy', 'Reported By', 'Employee'),
                ...f.number('quantityAffected', 'Affected Qty'),
                ...f.select('disposition', 'Disposition', enums.NCR_DISPOSITION),
                ...f.textarea('rootCause', 'Root Cause'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('NCR Actions', [
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

    MfgQuality.primaryKeys = {
        MfgQualityPlan: 'planId',
        MfgQualityInspection: 'inspectionId',
        MfgNCR: 'ncrId'
    };

})();
