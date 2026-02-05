/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompRisk = window.CompRisk || {};

    CompRisk.forms = {
        CompRiskRegister: {
            sections: [
                {
                    title: 'Risk Information',
                    fields: [
                        { key: 'riskNumber', label: 'Risk Number', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'category', label: 'Category', type: 'select', options: 'riskCategory', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: 'riskStatus' }
                    ]
                },
                {
                    title: 'Risk Assessment',
                    fields: [
                        { key: 'inherentRiskLevel', label: 'Inherent Risk Level', type: 'select', options: 'riskLevel' },
                        { key: 'residualRiskLevel', label: 'Residual Risk Level', type: 'select', options: 'riskLevel' },
                        { key: 'riskAppetite', label: 'Risk Appetite', type: 'select', options: 'riskLevel' }
                    ]
                },
                {
                    title: 'Ownership',
                    fields: [
                        { key: 'ownerId', label: 'Risk Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'causes', label: 'Root Causes', type: 'textarea' },
                        { key: 'consequences', label: 'Potential Consequences', type: 'textarea' }
                    ]
                }
            ]
        },
        CompRiskAssessment: {
            sections: [
                {
                    title: 'Assessment Information',
                    fields: [
                        { key: 'riskId', label: 'Risk', type: 'reference', lookupModel: 'CompRiskRegister', required: true },
                        { key: 'assessmentType', label: 'Assessment Type', type: 'select', options: 'assessmentType', required: true },
                        { key: 'assessmentDate', label: 'Assessment Date', type: 'date', required: true },
                        { key: 'assessorId', label: 'Assessor', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Risk Evaluation',
                    fields: [
                        { key: 'likelihood', label: 'Likelihood', type: 'select', options: 'riskLikelihood' },
                        { key: 'impact', label: 'Impact', type: 'select', options: 'riskImpact' },
                        { key: 'riskScore', label: 'Risk Score', type: 'number' },
                        { key: 'riskLevel', label: 'Risk Level', type: 'select', options: 'riskLevel' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'methodology', label: 'Methodology', type: 'textarea' },
                        { key: 'findings', label: 'Findings', type: 'textarea' },
                        { key: 'recommendations', label: 'Recommendations', type: 'textarea' }
                    ]
                }
            ]
        },
        CompIncident: {
            sections: [
                {
                    title: 'Incident Information',
                    fields: [
                        { key: 'incidentNumber', label: 'Incident Number', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'severity', label: 'Severity', type: 'select', options: 'incidentSeverity', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: 'incidentStatus' },
                        { key: 'riskId', label: 'Related Risk', type: 'reference', lookupModel: 'CompRiskRegister' }
                    ]
                },
                {
                    title: 'Timeline',
                    fields: [
                        { key: 'occurredDate', label: 'Occurred Date', type: 'date' },
                        { key: 'reportedDate', label: 'Reported Date', type: 'date' },
                        { key: 'resolvedDate', label: 'Resolved Date', type: 'date' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'rootCause', label: 'Root Cause', type: 'textarea' },
                        { key: 'impact', label: 'Impact Assessment', type: 'textarea' },
                        { key: 'lessonsLearned', label: 'Lessons Learned', type: 'textarea' }
                    ]
                }
            ]
        },
        CompMitigationPlan: {
            sections: [
                {
                    title: 'Plan Information',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'riskId', label: 'Risk', type: 'reference', lookupModel: 'CompRiskRegister', required: true },
                        { key: 'strategy', label: 'Strategy', type: 'select', options: 'mitigationStrategy', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: 'mitigationStatus' }
                    ]
                },
                {
                    title: 'Timeline',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'targetDate', label: 'Target Date', type: 'date' },
                        { key: 'completionDate', label: 'Completion Date', type: 'date' }
                    ]
                },
                {
                    title: 'Ownership',
                    fields: [
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'expectedOutcome', label: 'Expected Outcome', type: 'textarea' }
                    ]
                }
            ]
        },
        CompInsurancePolicy: {
            sections: [
                {
                    title: 'Policy Information',
                    fields: [
                        { key: 'policyNumber', label: 'Policy Number', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'policyType', label: 'Policy Type', type: 'select', options: 'insuranceType', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: 'insuranceStatus' }
                    ]
                },
                {
                    title: 'Provider Information',
                    fields: [
                        { key: 'provider', label: 'Provider', type: 'text' },
                        { key: 'broker', label: 'Broker', type: 'text' },
                        { key: 'contactName', label: 'Contact Name', type: 'text' },
                        { key: 'contactPhone', label: 'Contact Phone', type: 'text' },
                        { key: 'contactEmail', label: 'Contact Email', type: 'text' }
                    ]
                },
                {
                    title: 'Coverage',
                    fields: [
                        { key: 'coverageAmount', label: 'Coverage Amount', type: 'money' },
                        { key: 'deductible', label: 'Deductible', type: 'money' },
                        { key: 'premium', label: 'Premium', type: 'money' },
                        { key: 'premiumFrequency', label: 'Premium Frequency', type: 'select', options: 'premiumFrequency' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'renewalLeadDays', label: 'Renewal Lead Days', type: 'number' }
                    ]
                }
            ]
        }
    };
})();
