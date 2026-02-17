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
            ]),
            f.section('Assessments', [
                ...f.inlineTable('assessments', 'Control Assessments', [
                    { key: 'assessmentId', label: 'ID', hidden: true },
                    { key: 'assessmentDate', label: 'Date', type: 'date' },
                    { key: 'assessorId', label: 'Assessor', type: 'reference', lookupModel: 'Employee' },
                    { key: 'effectiveness', label: 'Effectiveness', type: 'select', options: enums.assessmentResult },
                    { key: 'testPerformed', label: 'Test', type: 'text' },
                    { key: 'recommendations', label: 'Recommendations', type: 'text' }
                ])
            ]),
            f.section('Segregation Rules', [
                ...f.inlineTable('segregationRules', 'Segregation Rules', [
                    { key: 'ruleId', label: 'ID', hidden: true },
                    { key: 'code', label: 'Code', type: 'text' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'conflictingFunctionA', label: 'Function A', type: 'text' },
                    { key: 'conflictingFunctionB', label: 'Function B', type: 'text' },
                    { key: 'riskLevel', label: 'Risk Level', type: 'text' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
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

    };

    CompControls.primaryKeys = {
        CompControl: 'controlId',
        CompPolicyDocument: 'policyId',
        CompApprovalMatrix: 'matrixId'
    };

})();
