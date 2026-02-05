/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompRegulatory = window.CompRegulatory || {};

    CompRegulatory.forms = {
        CompRegulation: {
            sections: [
                {
                    title: 'Regulation Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'type', label: 'Type', type: 'select', options: 'regulationType', required: true },
                        { key: 'jurisdiction', label: 'Jurisdiction', type: 'select', options: 'jurisdictionLevel' },
                        { key: 'issuingAuthority', label: 'Issuing Authority', type: 'text' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: 'regulationStatus' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'penaltyInfo', label: 'Penalty Information', type: 'textarea' }
                    ]
                }
            ]
        },
        CompRequirement: {
            sections: [
                {
                    title: 'Requirement Information',
                    fields: [
                        { key: 'regulationId', label: 'Regulation', type: 'reference', lookupModel: 'CompRegulation', required: true },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'priority', label: 'Priority', type: 'select', options: 'requirementPriority' },
                        { key: 'status', label: 'Status', type: 'select', options: 'requirementStatus' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'controlObjective', label: 'Control Objective', type: 'textarea' }
                    ]
                }
            ]
        },
        CompComplianceStatus: {
            sections: [
                {
                    title: 'Compliance Status',
                    fields: [
                        { key: 'requirementId', label: 'Requirement', type: 'reference', lookupModel: 'CompRequirement', required: true },
                        { key: 'entityType', label: 'Entity Type', type: 'text' },
                        { key: 'entityId', label: 'Entity ID', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: 'complianceStatus', required: true },
                        { key: 'assessmentDate', label: 'Assessment Date', type: 'date' },
                        { key: 'nextReviewDate', label: 'Next Review Date', type: 'date' }
                    ]
                },
                {
                    title: 'Assessment Details',
                    fields: [
                        { key: 'assessorId', label: 'Assessor', type: 'reference', lookupModel: 'Employee' },
                        { key: 'evidence', label: 'Evidence', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },
        CompCertification: {
            sections: [
                {
                    title: 'Certification Information',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'type', label: 'Type', type: 'select', options: 'certificationType', required: true },
                        { key: 'issuingBody', label: 'Issuing Body', type: 'text' },
                        { key: 'certificateNumber', label: 'Certificate Number', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: 'certificationStatus' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'issueDate', label: 'Issue Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'renewalLeadDays', label: 'Renewal Lead Days', type: 'number' }
                    ]
                },
                {
                    title: 'Scope',
                    fields: [
                        { key: 'scope', label: 'Scope Description', type: 'textarea' }
                    ]
                }
            ]
        },
        CompViolationRecord: {
            sections: [
                {
                    title: 'Violation Information',
                    fields: [
                        { key: 'violationNumber', label: 'Violation Number', type: 'text', required: true },
                        { key: 'regulationId', label: 'Regulation', type: 'reference', lookupModel: 'CompRegulation', required: true },
                        { key: 'requirementId', label: 'Requirement', type: 'reference', lookupModel: 'CompRequirement' },
                        { key: 'severity', label: 'Severity', type: 'select', options: 'violationSeverity', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: 'violationStatus' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'discoveryDate', label: 'Discovery Date', type: 'date' },
                        { key: 'reportedDate', label: 'Reported Date', type: 'date' },
                        { key: 'resolutionDate', label: 'Resolution Date', type: 'date' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'rootCause', label: 'Root Cause', type: 'textarea' },
                        { key: 'correctiveAction', label: 'Corrective Action', type: 'textarea' }
                    ]
                }
            ]
        }
    };
})();
