/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompControls = window.CompControls || {};

    CompControls.forms = {
        CompControl: {
            sections: [
                {
                    title: 'Control Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'type', label: 'Type', type: 'select', options: 'controlType', required: true },
                        { key: 'category', label: 'Category', type: 'select', options: 'controlCategory' },
                        { key: 'nature', label: 'Nature', type: 'select', options: 'controlNature' },
                        { key: 'frequency', label: 'Frequency', type: 'select', options: 'controlFrequency' },
                        { key: 'status', label: 'Status', type: 'select', options: 'controlStatus' }
                    ]
                },
                {
                    title: 'Ownership',
                    fields: [
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'objective', label: 'Control Objective', type: 'textarea' },
                        { key: 'testingProcedure', label: 'Testing Procedure', type: 'textarea' }
                    ]
                }
            ]
        },
        CompControlAssessment: {
            sections: [
                {
                    title: 'Assessment Information',
                    fields: [
                        { key: 'controlId', label: 'Control', type: 'reference', lookupModel: 'CompControl', required: true },
                        { key: 'assessmentDate', label: 'Assessment Date', type: 'date', required: true },
                        { key: 'assessorId', label: 'Assessor', type: 'reference', lookupModel: 'Employee' },
                        { key: 'result', label: 'Result', type: 'select', options: 'assessmentResult', required: true },
                        { key: 'nextAssessmentDate', label: 'Next Assessment Date', type: 'date' }
                    ]
                },
                {
                    title: 'Assessment Details',
                    fields: [
                        { key: 'testingPerformed', label: 'Testing Performed', type: 'textarea' },
                        { key: 'findings', label: 'Findings', type: 'textarea' },
                        { key: 'recommendations', label: 'Recommendations', type: 'textarea' }
                    ]
                }
            ]
        },
        CompPolicyDocument: {
            sections: [
                {
                    title: 'Policy Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'category', label: 'Category', type: 'select', options: 'policyCategory' },
                        { key: 'version', label: 'Version', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: 'policyStatus' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'reviewDate', label: 'Review Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' }
                    ]
                },
                {
                    title: 'Ownership',
                    fields: [
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'approverId', label: 'Approver', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Content',
                    fields: [
                        { key: 'summary', label: 'Summary', type: 'textarea' }
                    ]
                }
            ]
        },
        CompApprovalMatrix: {
            sections: [
                {
                    title: 'Matrix Information',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'documentType', label: 'Document Type', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: 'approvalStatus' }
                    ]
                },
                {
                    title: 'Amount Thresholds',
                    fields: [
                        { key: 'minAmount', label: 'Min Amount', type: 'money' },
                        { key: 'maxAmount', label: 'Max Amount', type: 'money' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },
        CompSegregationRule: {
            sections: [
                {
                    title: 'Rule Information',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'conflictingRole1', label: 'Conflicting Role 1', type: 'text', required: true },
                        { key: 'conflictingRole2', label: 'Conflicting Role 2', type: 'text', required: true },
                        { key: 'riskLevel', label: 'Risk Level', type: 'select', options: ['Critical', 'High', 'Medium', 'Low'] },
                        { key: 'status', label: 'Status', type: 'select', options: 'ruleStatus' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'mitigatingControl', label: 'Mitigating Control', type: 'textarea' }
                    ]
                }
            ]
        }
    };
})();
