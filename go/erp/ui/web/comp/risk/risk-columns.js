/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompRisk = window.CompRisk || {};

    CompRisk.columns = {
        CompRiskRegister: [
            { key: 'riskNumber', label: 'Number', width: '100px' },
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'category', label: 'Category', width: '100px' },
            { key: 'inherentRiskLevel', label: 'Inherent Risk', width: '100px' },
            { key: 'residualRiskLevel', label: 'Residual Risk', width: '100px' },
            { key: 'ownerId', label: 'Owner', width: '150px', type: 'reference', referenceType: 'Employee' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompRiskAssessment: [
            { key: 'riskId', label: 'Risk', width: '150px', type: 'reference', referenceType: 'CompRiskRegister' },
            { key: 'assessmentType', label: 'Type', width: '100px' },
            { key: 'assessmentDate', label: 'Date', width: '100px', type: 'date' },
            { key: 'likelihood', label: 'Likelihood', width: '100px' },
            { key: 'impact', label: 'Impact', width: '100px' },
            { key: 'riskScore', label: 'Score', width: '80px' }
        ],
        CompIncident: [
            { key: 'incidentNumber', label: 'Number', width: '100px' },
            { key: 'title', label: 'Title', width: '200px' },
            { key: 'severity', label: 'Severity', width: '100px' },
            { key: 'occurredDate', label: 'Occurred', width: '100px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompMitigationPlan: [
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'riskId', label: 'Risk', width: '150px', type: 'reference', referenceType: 'CompRiskRegister' },
            { key: 'strategy', label: 'Strategy', width: '100px' },
            { key: 'targetDate', label: 'Target Date', width: '100px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompInsurancePolicy: [
            { key: 'policyNumber', label: 'Policy Number', width: '120px' },
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'policyType', label: 'Type', width: '120px' },
            { key: 'provider', label: 'Provider', width: '150px' },
            { key: 'expiryDate', label: 'Expiry', width: '100px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ]
    };

    CompRisk.primaryKeys = {
        CompRiskRegister: 'riskId',
        CompRiskAssessment: 'assessmentId',
        CompIncident: 'incidentId',
        CompMitigationPlan: 'planId',
        CompInsurancePolicy: 'insuranceId'
    };
})();
