/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompControls = window.CompControls || {};

    CompControls.enums = {
        controlType: ['Preventive', 'Detective', 'Corrective', 'Directive', 'Compensating'],
        controlCategory: ['Financial', 'Operational', 'IT', 'Compliance', 'Strategic'],
        controlNature: ['Manual', 'Automated', 'IT-Dependent Manual'],
        controlFrequency: ['Continuous', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annual', 'Ad-hoc'],
        controlStatus: ['Active', 'Inactive', 'Under Review', 'Retired'],
        assessmentResult: ['Effective', 'Partially Effective', 'Ineffective', 'Not Tested'],
        policyStatus: ['Draft', 'Under Review', 'Approved', 'Published', 'Retired'],
        policyCategory: ['Corporate', 'Departmental', 'Procedure', 'Standard', 'Guideline'],
        approvalStatus: ['Pending', 'Approved', 'Rejected', 'Escalated'],
        ruleStatus: ['Active', 'Inactive', 'Testing']
    };
})();
