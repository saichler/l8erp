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
                ...f.reference('departmentId', 'Department', 'HcmDepartment'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.date('nextReviewDate', 'Next Review Date')
            ])
        ]),

        CompRiskAssessment: f.form('Risk Assessment', [
            f.section('Assessment Details', [
                ...f.reference('riskId', 'Risk', 'CompRiskRegister', true),
                ...f.date('assessmentDate', 'Assessment Date', true),
                ...f.reference('assessorId', 'Assessor', 'Employee', true)
            ]),
            f.section('Ratings', [
                ...f.number('likelihoodRating', 'Likelihood Rating'),
                ...f.number('impactRating', 'Impact Rating'),
                ...f.number('riskScore', 'Risk Score'),
                ...f.number('controlEffectiveness', 'Control Effectiveness')
            ]),
            f.section('Findings', [
                ...f.textarea('findings', 'Findings'),
                ...f.textarea('recommendations', 'Recommendations'),
                ...f.checkbox('requiresEscalation', 'Requires Escalation')
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
                ...f.date('reportedDate', 'Reported Date'),
                ...f.date('containedDate', 'Contained Date'),
                ...f.date('resolvedDate', 'Resolved Date')
            ]),
            f.section('Impact & Response', [
                ...f.reference('reportedById', 'Reported By', 'Employee'),
                ...f.reference('assignedToId', 'Assigned To', 'Employee'),
                ...f.textarea('rootCause', 'Root Cause'),
                ...f.textarea('correctiveActions', 'Corrective Actions'),
                ...f.checkbox('regulatoryReportable', 'Regulatory Reportable')
            ])
        ]),

        CompMitigationPlan: f.form('Mitigation Plan', [
            f.section('Plan Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('riskId', 'Risk', 'CompRiskRegister', true),
                ...f.text('strategy', 'Strategy'),
                ...f.select('status', 'Status', enums.REMEDIATION_STATUS)
            ]),
            f.section('Timeline', [
                ...f.date('startDate', 'Start Date'),
                ...f.date('targetDate', 'Target Date'),
                ...f.date('completedDate', 'Completed Date')
            ]),
            f.section('Risk Reduction', [
                ...f.number('targetRiskReduction', 'Target Risk Reduction'),
                ...f.number('actualRiskReduction', 'Actual Risk Reduction'),
                ...f.reference('ownerId', 'Owner', 'Employee')
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
                ...f.number('coverageAmount', 'Coverage Amount'),
                ...f.number('deductible', 'Deductible')
            ]),
            f.section('Premiums & Ownership', [
                ...f.number('premiumAmount', 'Premium Amount'),
                ...f.text('premiumFrequency', 'Premium Frequency'),
                ...f.reference('responsibleId', 'Responsible', 'Employee')
            ])
        ])
    };

})();
