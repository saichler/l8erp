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
            { key: 'controlType', label: 'Type', width: '100px' },
            { key: 'processArea', label: 'Process Area', width: '100px' },
            { key: 'isKeyControl', label: 'Key Control', width: '120px' },
            { key: 'ownerId', label: 'Owner', width: '150px', type: 'reference', referenceType: 'Employee' },
            { key: 'isActive', label: 'Active', width: '100px' }
        ],
        CompControlAssessment: [
            { key: 'controlId', label: 'Control', width: '150px', type: 'reference', referenceType: 'CompControl' },
            { key: 'assessmentDate', label: 'Assessment Date', width: '120px', type: 'date' },
            { key: 'assessorId', label: 'Assessor', width: '150px', type: 'reference', referenceType: 'Employee' },
            { key: 'effectiveness', label: 'Effectiveness', width: '120px' },
            { key: 'nextAssessmentDate', label: 'Next Assessment', width: '120px', type: 'date' }
        ],
        CompPolicyDocument: [
            { key: 'code', label: 'Code', width: '100px' },
            { key: 'title', label: 'Title', width: '200px' },
            { key: 'policyType', label: 'Type', width: '120px' },
            { key: 'version', label: 'Version', width: '80px' },
            { key: 'effectiveDate', label: 'Effective Date', width: '120px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompApprovalMatrix: [
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'transactionType', label: 'Transaction Type', width: '120px' },
            { key: 'thresholdMin', label: 'Min Amount', width: '100px', type: 'money' },
            { key: 'thresholdMax', label: 'Max Amount', width: '100px', type: 'money' },
            { key: 'isActive', label: 'Active', width: '100px' }
        ],
        CompSegregationRule: [
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'conflictingFunctionA', label: 'Function A', width: '150px' },
            { key: 'conflictingFunctionB', label: 'Function B', width: '150px' },
            { key: 'riskLevel', label: 'Risk Level', width: '100px' },
            { key: 'isActive', label: 'Active', width: '100px' }
        ]
    };

    CompControls.primaryKeys = {
        CompControl: 'controlId',
        CompControlAssessment: 'assessmentId',
        CompPolicyDocument: 'policyId',
        CompApprovalMatrix: 'matrixId',
        CompSegregationRule: 'ruleId'
    };
})();
