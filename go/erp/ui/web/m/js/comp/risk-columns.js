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
 * Mobile COMP Risk Module - Column Configurations
 * Desktop Equivalent: comp/risk/risk-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCompRisk.enums;
    const render = MobileCompRisk.render;

    MobileCompRisk.columns = {
        CompRiskRegister: [
            ...col.id('riskId'),
            ...col.col('code', 'Code'),
            ...col.col('title', 'Title'),
            ...col.status('category', 'Category', enums.RISK_CATEGORY_VALUES, render.riskCategory),
            ...col.status('status', 'Status', enums.RISK_STATUS_VALUES, render.riskStatus),
            ...col.col('departmentId', 'Department'),
            ...col.col('inherentRiskScore', 'Inherent Score'),
            ...col.col('residualRiskScore', 'Residual Score'),
            ...col.col('riskResponse', 'Response'),
            ...col.col('ownerId', 'Owner'),
            ...col.date('nextReviewDate', 'Next Review')
        ],

        CompRiskAssessment: [
            ...col.id('assessmentId'),
            ...col.col('riskId', 'Risk'),
            ...col.date('assessmentDate', 'Assessment Date'),
            ...col.col('assessorId', 'Assessor'),
            ...col.col('likelihoodRating', 'Likelihood'),
            ...col.col('impactRating', 'Impact'),
            ...col.col('riskScore', 'Risk Score'),
            ...col.col('controlEffectiveness', 'Control Effectiveness'),
            ...col.boolean('requiresEscalation', 'Escalation')
        ],

        CompIncident: [
            ...col.id('incidentId'),
            ...col.col('incidentNumber', 'Number'),
            ...col.col('title', 'Title'),
            ...col.status('severity', 'Severity', enums.SEVERITY_LEVEL_VALUES, render.severityLevel),
            ...col.status('status', 'Status', enums.INCIDENT_STATUS_VALUES, render.incidentStatus),
            ...col.status('category', 'Category', enums.RISK_CATEGORY_VALUES, render.riskCategory),
            ...col.date('occurredDate', 'Occurred'),
            ...col.date('reportedDate', 'Reported'),
            ...col.col('assignedToId', 'Assigned To'),
            ...col.boolean('regulatoryReportable', 'Reportable')
        ],

        CompMitigationPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Name'),
            ...col.col('riskId', 'Risk'),
            ...col.col('strategy', 'Strategy'),
            ...col.status('status', 'Status', enums.REMEDIATION_STATUS_VALUES, render.remediationStatus),
            ...col.col('ownerId', 'Owner'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('targetDate', 'Target Date'),
            ...col.col('targetRiskReduction', 'Target Reduction'),
            ...col.col('actualRiskReduction', 'Actual Reduction')
        ],

        CompInsurancePolicy: [
            ...col.id('insuranceId'),
            ...col.col('policyNumber', 'Policy #'),
            ...col.col('name', 'Name'),
            ...col.col('policyType', 'Type'),
            ...col.col('provider', 'Provider'),
            ...col.col('status', 'Status'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.date('expiryDate', 'Expiry Date'),
            ...col.col('responsibleId', 'Responsible')
        ]
    };

    MobileCompRisk.primaryKeys = {
        CompRiskRegister: 'riskId',
        CompRiskAssessment: 'assessmentId',
        CompIncident: 'incidentId',
        CompMitigationPlan: 'planId',
        CompInsurancePolicy: 'insuranceId'
    };

})();
