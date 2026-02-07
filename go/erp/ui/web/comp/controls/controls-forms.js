/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Compliance Controls Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.CompControls = window.CompControls || {};

    const f = window.Layer8FormFactory;
    const enums = CompControls.enums;

    CompControls.forms = {
        CompControl: f.form('Control', [
            f.section('Control Information', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.select('controlType', 'Type', enums.controlType, true),
                ...f.text('processArea', 'Process Area'),
                ...f.checkbox('isKeyControl', 'Key Control'),
                ...f.checkbox('isAutomated', 'Automated'),
                ...f.number('testFrequencyDays', 'Test Frequency (Days)'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Ownership', [
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.reference('departmentId', 'Department', 'Department')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description'),
                ...f.textarea('controlObjective', 'Control Objective'),
                ...f.textarea('testProcedure', 'Test Procedure')
            ])
        ]),

        CompControlAssessment: f.form('Control Assessment', [
            f.section('Assessment Information', [
                ...f.reference('controlId', 'Control', 'CompControl', true),
                ...f.date('assessmentDate', 'Assessment Date', true),
                ...f.reference('assessorId', 'Assessor', 'Employee'),
                ...f.select('effectiveness', 'Effectiveness', enums.assessmentResult, true),
                ...f.date('nextAssessmentDate', 'Next Assessment Date')
            ]),
            f.section('Assessment Details', [
                ...f.textarea('testPerformed', 'Testing Performed'),
                ...f.textarea('testResults', 'Test Results'),
                ...f.textarea('recommendations', 'Recommendations')
            ])
        ]),

        CompPolicyDocument: f.form('Policy Document', [
            f.section('Policy Information', [
                ...f.text('code', 'Code', true),
                ...f.text('title', 'Title', true),
                ...f.select('policyType', 'Type', enums.policyCategory),
                ...f.text('version', 'Version'),
                ...f.select('status', 'Status', enums.policyStatus)
            ]),
            f.section('Dates', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('reviewDate', 'Review Date'),
                ...f.date('nextReviewDate', 'Next Review Date')
            ]),
            f.section('Ownership', [
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.reference('approverId', 'Approver', 'Employee')
            ]),
            f.section('Content', [
                ...f.textarea('description', 'Description')
            ])
        ]),

        CompApprovalMatrix: f.form('Approval Matrix', [
            f.section('Matrix Information', [
                ...f.text('name', 'Name', true),
                ...f.text('transactionType', 'Transaction Type'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Amount Thresholds', [
                ...f.money('thresholdMin', 'Min Amount'),
                ...f.money('thresholdMax', 'Max Amount')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description')
            ])
        ]),

        CompSegregationRule: f.form('Segregation Rule', [
            f.section('Rule Information', [
                ...f.text('name', 'Name', true),
                ...f.text('conflictingFunctionA', 'Conflicting Function A', true),
                ...f.text('conflictingFunctionB', 'Conflicting Function B', true),
                ...f.select('riskLevel', 'Risk Level', ['Critical', 'High', 'Medium', 'Low']),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description'),
                ...f.textarea('mitigationControl', 'Mitigation Control')
            ])
        ])
    };

    CompControls.primaryKeys = {
        CompControl: 'controlId',
        CompControlAssessment: 'assessmentId',
        CompPolicyDocument: 'policyId',
        CompApprovalMatrix: 'matrixId',
        CompSegregationRule: 'ruleId'
    };

})();
