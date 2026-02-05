/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompControls = window.CompControls || {};

    CompControls.columns = {
        CompControl: [
            { key: 'code', label: 'Code', width: '100px' },
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'type', label: 'Type', width: '100px' },
            { key: 'category', label: 'Category', width: '100px' },
            { key: 'nature', label: 'Nature', width: '120px' },
            { key: 'ownerId', label: 'Owner', width: '150px', type: 'reference', referenceType: 'Employee' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompControlAssessment: [
            { key: 'controlId', label: 'Control', width: '150px', type: 'reference', referenceType: 'CompControl' },
            { key: 'assessmentDate', label: 'Assessment Date', width: '120px', type: 'date' },
            { key: 'assessorId', label: 'Assessor', width: '150px', type: 'reference', referenceType: 'Employee' },
            { key: 'result', label: 'Result', width: '120px' },
            { key: 'nextAssessmentDate', label: 'Next Assessment', width: '120px', type: 'date' }
        ],
        CompPolicyDocument: [
            { key: 'code', label: 'Code', width: '100px' },
            { key: 'title', label: 'Title', width: '200px' },
            { key: 'category', label: 'Category', width: '120px' },
            { key: 'version', label: 'Version', width: '80px' },
            { key: 'effectiveDate', label: 'Effective Date', width: '120px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompApprovalMatrix: [
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'documentType', label: 'Document Type', width: '120px' },
            { key: 'minAmount', label: 'Min Amount', width: '100px', type: 'money' },
            { key: 'maxAmount', label: 'Max Amount', width: '100px', type: 'money' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompSegregationRule: [
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'conflictingRole1', label: 'Role 1', width: '150px' },
            { key: 'conflictingRole2', label: 'Role 2', width: '150px' },
            { key: 'riskLevel', label: 'Risk Level', width: '100px' },
            { key: 'status', label: 'Status', width: '100px' }
        ]
    };

    CompControls.primaryKeys = {
        CompControl: 'controlId',
        CompControlAssessment: 'assessmentId',
        CompPolicyDocument: 'documentId',
        CompApprovalMatrix: 'matrixId',
        CompSegregationRule: 'ruleId'
    };
})();
