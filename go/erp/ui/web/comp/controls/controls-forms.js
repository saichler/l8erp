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
                ...f.select('type', 'Type', enums.controlType, true),
                ...f.select('category', 'Category', enums.controlCategory),
                ...f.select('nature', 'Nature', enums.controlNature),
                ...f.select('frequency', 'Frequency', enums.controlFrequency),
                ...f.select('status', 'Status', enums.controlStatus)
            ]),
            f.section('Ownership', [
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.reference('departmentId', 'Department', 'Department')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description'),
                ...f.textarea('objective', 'Control Objective'),
                ...f.textarea('testingProcedure', 'Testing Procedure')
            ])
        ]),

        CompControlAssessment: f.form('Control Assessment', [
            f.section('Assessment Information', [
                ...f.reference('controlId', 'Control', 'CompControl', true),
                ...f.date('assessmentDate', 'Assessment Date', true),
                ...f.reference('assessorId', 'Assessor', 'Employee'),
                ...f.select('result', 'Result', enums.assessmentResult, true),
                ...f.date('nextAssessmentDate', 'Next Assessment Date')
            ]),
            f.section('Assessment Details', [
                ...f.textarea('testingPerformed', 'Testing Performed'),
                ...f.textarea('findings', 'Findings'),
                ...f.textarea('recommendations', 'Recommendations')
            ])
        ]),

        CompPolicyDocument: f.form('Policy Document', [
            f.section('Policy Information', [
                ...f.text('code', 'Code', true),
                ...f.text('title', 'Title', true),
                ...f.select('category', 'Category', enums.policyCategory),
                ...f.text('version', 'Version'),
                ...f.select('status', 'Status', enums.policyStatus)
            ]),
            f.section('Dates', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('reviewDate', 'Review Date'),
                ...f.date('expiryDate', 'Expiry Date')
            ]),
            f.section('Ownership', [
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.reference('approverId', 'Approver', 'Employee')
            ]),
            f.section('Content', [
                ...f.textarea('summary', 'Summary')
            ])
        ]),

        CompApprovalMatrix: f.form('Approval Matrix', [
            f.section('Matrix Information', [
                ...f.text('name', 'Name', true),
                ...f.text('documentType', 'Document Type'),
                ...f.select('status', 'Status', enums.approvalStatus)
            ]),
            f.section('Amount Thresholds', [
                ...f.money('minAmount', 'Min Amount'),
                ...f.money('maxAmount', 'Max Amount')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description')
            ])
        ]),

        CompSegregationRule: f.form('Segregation Rule', [
            f.section('Rule Information', [
                ...f.text('name', 'Name', true),
                ...f.text('conflictingRole1', 'Conflicting Role 1', true),
                ...f.text('conflictingRole2', 'Conflicting Role 2', true),
                ...f.select('riskLevel', 'Risk Level', ['Critical', 'High', 'Medium', 'Low']),
                ...f.select('status', 'Status', enums.ruleStatus)
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description'),
                ...f.textarea('mitigatingControl', 'Mitigating Control')
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
