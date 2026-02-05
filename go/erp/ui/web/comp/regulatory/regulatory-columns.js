/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompRegulatory = window.CompRegulatory || {};

    CompRegulatory.columns = {
        CompRegulation: [
            { key: 'code', label: 'Code', width: '100px' },
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'type', label: 'Type', width: '120px' },
            { key: 'jurisdiction', label: 'Jurisdiction', width: '120px' },
            { key: 'effectiveDate', label: 'Effective Date', width: '120px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompRequirement: [
            { key: 'code', label: 'Code', width: '100px' },
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'regulationId', label: 'Regulation', width: '150px', type: 'reference', referenceType: 'CompRegulation' },
            { key: 'priority', label: 'Priority', width: '100px' },
            { key: 'dueDate', label: 'Due Date', width: '120px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompComplianceStatus: [
            { key: 'requirementId', label: 'Requirement', width: '150px', type: 'reference', referenceType: 'CompRequirement' },
            { key: 'entityType', label: 'Entity Type', width: '120px' },
            { key: 'status', label: 'Status', width: '120px' },
            { key: 'assessmentDate', label: 'Assessment Date', width: '120px', type: 'date' },
            { key: 'nextReviewDate', label: 'Next Review', width: '120px', type: 'date' }
        ],
        CompCertification: [
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'type', label: 'Type', width: '120px' },
            { key: 'issuingBody', label: 'Issuing Body', width: '150px' },
            { key: 'issueDate', label: 'Issue Date', width: '120px', type: 'date' },
            { key: 'expiryDate', label: 'Expiry Date', width: '120px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompViolationRecord: [
            { key: 'violationNumber', label: 'Number', width: '120px' },
            { key: 'regulationId', label: 'Regulation', width: '150px', type: 'reference', referenceType: 'CompRegulation' },
            { key: 'severity', label: 'Severity', width: '100px' },
            { key: 'discoveryDate', label: 'Discovery Date', width: '120px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ]
    };

    CompRegulatory.primaryKeys = {
        CompRegulation: 'regulationId',
        CompRequirement: 'requirementId',
        CompComplianceStatus: 'statusId',
        CompCertification: 'certificationId',
        CompViolationRecord: 'violationId'
    };
})();
