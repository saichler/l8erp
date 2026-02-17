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
            ]),
            f.section('Requirements', [
                ...f.inlineTable('requirements', 'Requirements', [
                    { key: 'requirementId', label: 'ID', hidden: true },
                    { key: 'code', label: 'Code', type: 'text' },
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'priority', label: 'Priority', type: 'select', options: enums.requirementPriority },
                    { key: 'isMandatory', label: 'Mandatory', type: 'checkbox' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
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

    };

    CompRegulatory.primaryKeys = {
        CompRegulation: 'regulationId',
        CompCertification: 'certificationId'
    };

})();
