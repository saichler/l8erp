/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompRisk = window.CompRisk || {};

    CompRisk.columns = {
        CompRiskRegister: [
            { key: 'code', label: 'Code', width: '100px' },
            { key: 'title', label: 'Title', width: '200px' },
            { key: 'category', label: 'Category', width: '100px' },
            { key: 'inherentRiskScore', label: 'Inherent Risk', width: '100px' },
            { key: 'residualRiskScore', label: 'Residual Risk', width: '100px' },
            { key: 'ownerId', label: 'Owner', width: '150px', type: 'reference', referenceType: 'Employee' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompRiskAssessment: [
            { key: 'riskId', label: 'Risk', width: '150px', type: 'reference', referenceType: 'CompRiskRegister' },
            { key: 'assessmentDate', label: 'Date', width: '100px', type: 'date' },
            { key: 'assessorId', label: 'Assessor', width: '100px', type: 'reference', referenceType: 'Employee' },
            { key: 'likelihoodRating', label: 'Likelihood', width: '100px' },
            { key: 'impactRating', label: 'Impact', width: '100px' },
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
