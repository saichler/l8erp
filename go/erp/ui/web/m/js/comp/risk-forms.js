/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
 * Mobile COMP Risk Module - Form Configurations
 * Desktop Equivalent: comp/risk/risk-forms.js
 */
(function() {
    'use strict';

    const enums = MobileCompRisk.enums;

    MobileCompRisk.forms = {
        CompRiskRegister: {
            title: 'Risk Register',
            sections: [
                {
                    title: 'Risk Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'select', options: enums.RISK_CATEGORY },
                        { key: 'status', label: 'Status', type: 'select', options: enums.RISK_STATUS }
                    ]
                },
                {
                    title: 'Risk Scores',
                    fields: [
                        { key: 'inherentLikelihood', label: 'Inherent Likelihood', type: 'number' },
                        { key: 'inherentImpact', label: 'Inherent Impact', type: 'number' },
                        { key: 'inherentRiskScore', label: 'Inherent Risk Score', type: 'number' },
                        { key: 'residualLikelihood', label: 'Residual Likelihood', type: 'number' },
                        { key: 'residualImpact', label: 'Residual Impact', type: 'number' },
                        { key: 'residualRiskScore', label: 'Residual Risk Score', type: 'number' }
                    ]
                },
                {
                    title: 'Response & Ownership',
                    fields: [
                        { key: 'riskResponse', label: 'Risk Response', type: 'text' },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'HcmDepartment' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'nextReviewDate', label: 'Next Review Date', type: 'date' }
                    ]
                }
            ]
        },

        CompRiskAssessment: {
            title: 'Risk Assessment',
            sections: [
                {
                    title: 'Assessment Details',
                    fields: [
                        { key: 'riskId', label: 'Risk', type: 'reference', lookupModel: 'CompRiskRegister', required: true },
                        { key: 'assessmentDate', label: 'Assessment Date', type: 'date', required: true },
                        { key: 'assessorId', label: 'Assessor', type: 'reference', lookupModel: 'Employee', required: true }
                    ]
                },
                {
                    title: 'Ratings',
                    fields: [
                        { key: 'likelihoodRating', label: 'Likelihood Rating', type: 'number' },
                        { key: 'impactRating', label: 'Impact Rating', type: 'number' },
                        { key: 'riskScore', label: 'Risk Score', type: 'number' },
                        { key: 'controlEffectiveness', label: 'Control Effectiveness', type: 'number' }
                    ]
                },
                {
                    title: 'Findings',
                    fields: [
                        { key: 'findings', label: 'Findings', type: 'textarea' },
                        { key: 'recommendations', label: 'Recommendations', type: 'textarea' },
                        { key: 'requiresEscalation', label: 'Requires Escalation', type: 'checkbox' }
                    ]
                }
            ]
        },

        CompIncident: {
            title: 'Incident',
            sections: [
                {
                    title: 'Incident Details',
                    fields: [
                        { key: 'incidentNumber', label: 'Incident Number', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'severity', label: 'Severity', type: 'select', options: enums.SEVERITY_LEVEL },
                        { key: 'status', label: 'Status', type: 'select', options: enums.INCIDENT_STATUS },
                        { key: 'category', label: 'Category', type: 'select', options: enums.RISK_CATEGORY }
                    ]
                },
                {
                    title: 'Timeline',
                    fields: [
                        { key: 'occurredDate', label: 'Occurred Date', type: 'date' },
                        { key: 'reportedDate', label: 'Reported Date', type: 'date' },
                        { key: 'containedDate', label: 'Contained Date', type: 'date' },
                        { key: 'resolvedDate', label: 'Resolved Date', type: 'date' }
                    ]
                },
                {
                    title: 'Impact & Response',
                    fields: [
                        { key: 'reportedById', label: 'Reported By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'assignedToId', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'rootCause', label: 'Root Cause', type: 'textarea' },
                        { key: 'correctiveActions', label: 'Corrective Actions', type: 'textarea' },
                        { key: 'regulatoryReportable', label: 'Regulatory Reportable', type: 'checkbox' }
                    ]
                }
            ]
        },

        CompMitigationPlan: {
            title: 'Mitigation Plan',
            sections: [
                {
                    title: 'Plan Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'riskId', label: 'Risk', type: 'reference', lookupModel: 'CompRiskRegister', required: true },
                        { key: 'strategy', label: 'Strategy', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.REMEDIATION_STATUS }
                    ]
                },
                {
                    title: 'Timeline',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'targetDate', label: 'Target Date', type: 'date' },
                        { key: 'completedDate', label: 'Completed Date', type: 'date' }
                    ]
                },
                {
                    title: 'Risk Reduction',
                    fields: [
                        { key: 'targetRiskReduction', label: 'Target Risk Reduction', type: 'number' },
                        { key: 'actualRiskReduction', label: 'Actual Risk Reduction', type: 'number' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        CompInsurancePolicy: {
            title: 'Insurance Policy',
            sections: [
                {
                    title: 'Policy Details',
                    fields: [
                        { key: 'policyNumber', label: 'Policy Number', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'policyType', label: 'Policy Type', type: 'text' },
                        { key: 'provider', label: 'Provider', type: 'text' },
                        { key: 'status', label: 'Status', type: 'text' }
                    ]
                },
                {
                    title: 'Coverage',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'coverageAmount', label: 'Coverage Amount', type: 'number' },
                        { key: 'deductible', label: 'Deductible', type: 'number' }
                    ]
                },
                {
                    title: 'Premiums & Ownership',
                    fields: [
                        { key: 'premiumAmount', label: 'Premium Amount', type: 'number' },
                        { key: 'premiumFrequency', label: 'Premium Frequency', type: 'text' },
                        { key: 'responsibleId', label: 'Responsible', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        }
    };

})();
