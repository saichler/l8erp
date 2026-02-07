/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Compliance Regulatory Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.CompRegulatory = window.CompRegulatory || {};

    const f = window.Layer8FormFactory;
    const enums = CompRegulatory.enums;

    CompRegulatory.forms = {
        CompRegulation: f.form('Regulation', [
            f.section('Regulation Information', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.select('regulationType', 'Type', enums.regulationType, true),
                ...f.select('jurisdiction', 'Jurisdiction', enums.jurisdictionLevel),
                ...f.text('issuingBody', 'Issuing Body'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('sunsetDate', 'Sunset Date'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description'),
                ...f.text('sourceUrl', 'Source URL')
            ])
        ]),

        CompRequirement: f.form('Requirement', [
            f.section('Requirement Information', [
                ...f.reference('regulationId', 'Regulation', 'CompRegulation', true),
                ...f.text('code', 'Code', true),
                ...f.text('title', 'Title', true),
                ...f.select('priority', 'Priority', enums.requirementPriority),
                ...f.checkbox('isMandatory', 'Mandatory'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description'),
                ...f.textarea('controlObjective', 'Control Objective')
            ])
        ]),

        CompComplianceStatus: f.form('Compliance Status', [
            f.section('Compliance Status', [
                ...f.reference('requirementId', 'Requirement', 'CompRequirement', true),
                ...f.text('entityType', 'Entity Type'),
                ...f.text('entityId', 'Entity ID'),
                ...f.select('status', 'Status', enums.complianceStatus, true),
                ...f.date('assessmentDate', 'Assessment Date'),
                ...f.date('nextReviewDate', 'Next Review Date')
            ]),
            f.section('Assessment Details', [
                ...f.reference('assessorId', 'Assessor', 'Employee'),
                ...f.number('complianceScore', 'Compliance Score'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CompCertification: f.form('Certification', [
            f.section('Certification Information', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('issuingBody', 'Issuing Body'),
                ...f.text('certificateNumber', 'Certificate Number'),
                ...f.select('status', 'Status', enums.certificationStatus)
            ]),
            f.section('Dates', [
                ...f.date('issueDate', 'Issue Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.number('renewalLeadDays', 'Renewal Lead Days')
            ]),
            f.section('Scope', [
                ...f.textarea('scope', 'Scope Description')
            ])
        ]),

        CompViolationRecord: f.form('Violation Record', [
            f.section('Violation Information', [
                ...f.text('violationNumber', 'Violation Number', true),
                ...f.reference('requirementId', 'Requirement', 'CompRequirement', true),
                ...f.text('title', 'Title'),
                ...f.select('severity', 'Severity', enums.violationSeverity, true),
                ...f.select('status', 'Status', enums.violationStatus)
            ]),
            f.section('Dates', [
                ...f.date('discoveryDate', 'Discovery Date'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('closedDate', 'Closed Date')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description'),
                ...f.textarea('rootCause', 'Root Cause'),
                ...f.textarea('correctiveAction', 'Corrective Action')
            ])
        ])
    };

    CompRegulatory.primaryKeys = {
        CompRegulation: 'regulationId',
        CompRequirement: 'requirementId',
        CompComplianceStatus: 'statusId',
        CompCertification: 'certificationId',
        CompViolationRecord: 'violationId'
    };

})();
