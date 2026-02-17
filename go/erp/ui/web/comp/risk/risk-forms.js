/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Compliance Risk Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.CompRisk = window.CompRisk || {};

    const f = window.Layer8FormFactory;
    const enums = CompRisk.enums;

    CompRisk.forms = {
        CompRiskRegister: f.form('Risk Register', [
            f.section('Risk Information', [
                ...f.text('code', 'Code', true),
                ...f.text('title', 'Title', true),
                ...f.select('category', 'Category', enums.riskCategory, true),
                ...f.select('status', 'Status', enums.riskStatus)
            ]),
            f.section('Risk Assessment', [
                ...f.number('inherentRiskScore', 'Inherent Risk Score'),
                ...f.number('residualRiskScore', 'Residual Risk Score'),
                ...f.select('riskResponse', 'Risk Response', enums.riskLevel)
            ]),
            f.section('Ownership', [
                ...f.reference('ownerId', 'Risk Owner', 'Employee'),
                ...f.reference('departmentId', 'Department', 'Department')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description'),
                ...f.date('identifiedDate', 'Identified Date'),
                ...f.date('nextReviewDate', 'Next Review Date')
            ]),
            f.section('Risk Assessments', [
                ...f.inlineTable('assessments', 'Risk Assessments', [
                    { key: 'assessmentId', label: 'ID', hidden: true },
                    { key: 'assessmentDate', label: 'Date', type: 'date' },
                    { key: 'assessorId', label: 'Assessor', type: 'reference', lookupModel: 'Employee' },
                    { key: 'likelihoodRating', label: 'Likelihood', type: 'number' },
                    { key: 'impactRating', label: 'Impact', type: 'number' },
                    { key: 'riskScore', label: 'Score', type: 'number' },
                    { key: 'requiresEscalation', label: 'Escalation', type: 'checkbox' }
                ])
            ]),
            f.section('Mitigation Plans', [
                ...f.inlineTable('mitigationPlans', 'Mitigation Plans', [
                    { key: 'planId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'strategy', label: 'Strategy', type: 'text' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.mitigationStatus },
                    { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                    { key: 'targetDate', label: 'Target Date', type: 'date' }
                ])
            ])
        ]),

        CompIncident: f.form('Incident', [
            f.section('Incident Information', [
                ...f.text('incidentNumber', 'Incident Number', true),
                ...f.text('title', 'Title', true),
                ...f.select('severity', 'Severity', enums.incidentSeverity, true),
                ...f.select('status', 'Status', enums.incidentStatus),
                ...f.reference('relatedRiskId', 'Related Risk', 'CompRiskRegister')
            ]),
            f.section('Timeline', [
                ...f.date('occurredDate', 'Occurred Date'),
                ...f.date('reportedDate', 'Reported Date'),
                ...f.date('closedDate', 'Closed Date')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description'),
                ...f.textarea('rootCause', 'Root Cause'),
                ...f.textarea('immediateAction', 'Immediate Action'),
                ...f.textarea('lessonsLearned', 'Lessons Learned')
            ])
        ]),

        CompInsurancePolicy: f.form('Insurance Policy', [
            f.section('Policy Information', [
                ...f.text('policyNumber', 'Policy Number', true),
                ...f.text('name', 'Name', true),
                ...f.select('policyType', 'Policy Type', enums.insuranceType, true),
                ...f.select('status', 'Status', enums.insuranceStatus)
            ]),
            f.section('Provider Information', [
                ...f.text('provider', 'Provider'),
                ...f.text('broker', 'Broker'),
                ...f.text('contactName', 'Contact Name'),
                ...f.text('contactPhone', 'Contact Phone'),
                ...f.text('contactEmail', 'Contact Email')
            ]),
            f.section('Coverage', [
                ...f.money('coverageAmount', 'Coverage Amount'),
                ...f.money('deductible', 'Deductible'),
                ...f.money('premium', 'Premium'),
                ...f.select('premiumFrequency', 'Premium Frequency', enums.premiumFrequency)
            ]),
            f.section('Dates', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.number('renewalLeadDays', 'Renewal Lead Days')
            ])
        ])
    };

    CompRisk.primaryKeys = {
        CompRiskRegister: 'riskId',
        CompIncident: 'incidentId',
        CompInsurancePolicy: 'insuranceId'
    };

})();
