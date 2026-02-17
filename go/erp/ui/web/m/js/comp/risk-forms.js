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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile COMP Risk Module - Form Configurations
 * Desktop Equivalent: comp/risk/risk-forms.js
 */
(function() {
    'use strict';

    window.MobileCompRisk = window.MobileCompRisk || {};
    const f = window.Layer8FormFactory;
    const enums = MobileCompRisk.enums;

    MobileCompRisk.forms = {
        CompRiskRegister: f.form('Risk Register', [
            f.section('Risk Details', [
                ...f.text('code', 'Code', true),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.select('category', 'Category', enums.RISK_CATEGORY),
                ...f.select('status', 'Status', enums.RISK_STATUS)
            ]),
            f.section('Risk Scores', [
                ...f.number('inherentLikelihood', 'Inherent Likelihood'),
                ...f.number('inherentImpact', 'Inherent Impact'),
                ...f.number('inherentRiskScore', 'Inherent Risk Score'),
                ...f.number('residualLikelihood', 'Residual Likelihood'),
                ...f.number('residualImpact', 'Residual Impact'),
                ...f.number('residualRiskScore', 'Residual Risk Score')
            ]),
            f.section('Response & Ownership', [
                ...f.text('riskResponse', 'Risk Response'),
                ...f.money('potentialFinancialImpact', 'Potential Financial Impact'),
                ...f.reference('departmentId', 'Department', 'HcmDepartment'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.date('identifiedDate', 'Identified Date'),
                ...f.date('lastReviewDate', 'Last Review Date'),
                ...f.date('nextReviewDate', 'Next Review Date'),
                ...f.textarea('triggerEvents', 'Trigger Events')
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
                    { key: 'status', label: 'Status', type: 'select', options: enums.REMEDIATION_STATUS },
                    { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                    { key: 'targetDate', label: 'Target Date', type: 'date' }
                ])
            ])
        ]),

        CompIncident: f.form('Incident', [
            f.section('Incident Details', [
                ...f.text('incidentNumber', 'Incident Number'),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.select('severity', 'Severity', enums.SEVERITY_LEVEL),
                ...f.select('status', 'Status', enums.INCIDENT_STATUS),
                ...f.select('category', 'Category', enums.RISK_CATEGORY)
            ]),
            f.section('Timeline', [
                ...f.date('occurredDate', 'Occurred Date'),
                ...f.date('discoveredDate', 'Discovered Date'),
                ...f.date('reportedDate', 'Reported Date'),
                ...f.date('closedDate', 'Closed Date')
            ]),
            f.section('Impact & Response', [
                ...f.reference('reportedById', 'Reported By', 'Employee'),
                ...f.reference('assignedToId', 'Assigned To', 'Employee'),
                ...f.reference('departmentId', 'Department', 'HcmDepartment'),
                ...f.reference('relatedRiskId', 'Related Risk', 'CompRiskRegister'),
                ...f.money('financialImpact', 'Financial Impact'),
                ...f.number('peopleAffected', 'People Affected'),
                ...f.textarea('rootCause', 'Root Cause'),
                ...f.textarea('immediateAction', 'Immediate Action'),
                ...f.textarea('correctiveAction', 'Corrective Action'),
                ...f.textarea('preventiveAction', 'Preventive Action'),
                ...f.textarea('lessonsLearned', 'Lessons Learned'),
                ...f.checkbox('regulatoryReportable', 'Regulatory Reportable'),
                ...f.date('regulatoryReportDate', 'Regulatory Report Date')
            ])
        ]),

        CompInsurancePolicy: f.form('Insurance Policy', [
            f.section('Policy Details', [
                ...f.text('policyNumber', 'Policy Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('policyType', 'Policy Type'),
                ...f.text('provider', 'Provider'),
                ...f.text('status', 'Status')
            ]),
            f.section('Coverage', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.money('coverageAmount', 'Coverage Amount'),
                ...f.money('deductible', 'Deductible'),
                ...f.textarea('coveredRisks', 'Covered Risks'),
                ...f.textarea('exclusions', 'Exclusions')
            ]),
            f.section('Premiums & Ownership', [
                ...f.money('premium', 'Premium'),
                ...f.text('premiumFrequency', 'Premium Frequency'),
                ...f.text('broker', 'Broker'),
                ...f.text('contactName', 'Contact Name'),
                ...f.text('contactPhone', 'Contact Phone'),
                ...f.text('contactEmail', 'Contact Email'),
                ...f.number('renewalLeadDays', 'Renewal Lead Days'),
                ...f.reference('policyDocumentId', 'Policy Document', 'DocDocument'),
                ...f.reference('responsibleId', 'Responsible', 'Employee')
            ])
        ])
    };

})();
