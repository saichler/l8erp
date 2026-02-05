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

    const enums = MobileCompRisk.enums;
    const render = MobileCompRisk.render;

    MobileCompRisk.columns = {
        CompRiskRegister: [
            { key: 'riskId', label: 'ID', sortKey: 'riskId', filterKey: 'riskId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category', enumValues: enums.RISK_CATEGORY_VALUES, render: (item) => render.riskCategory(item.category) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.RISK_STATUS_VALUES, render: (item) => render.riskStatus(item.status) },
            { key: 'departmentId', label: 'Department', sortKey: 'departmentId' },
            { key: 'inherentRiskScore', label: 'Inherent Score', sortKey: 'inherentRiskScore' },
            { key: 'residualRiskScore', label: 'Residual Score', sortKey: 'residualRiskScore' },
            { key: 'riskResponse', label: 'Response', sortKey: 'riskResponse' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'nextReviewDate', label: 'Next Review', sortKey: 'nextReviewDate', render: (item) => render.date(item.nextReviewDate) }
        ],

        CompRiskAssessment: [
            { key: 'assessmentId', label: 'ID', sortKey: 'assessmentId', filterKey: 'assessmentId' },
            { key: 'riskId', label: 'Risk', sortKey: 'riskId', filterKey: 'riskId' },
            { key: 'assessmentDate', label: 'Assessment Date', sortKey: 'assessmentDate', render: (item) => render.date(item.assessmentDate) },
            { key: 'assessorId', label: 'Assessor', sortKey: 'assessorId' },
            { key: 'likelihoodRating', label: 'Likelihood', sortKey: 'likelihoodRating' },
            { key: 'impactRating', label: 'Impact', sortKey: 'impactRating' },
            { key: 'riskScore', label: 'Risk Score', sortKey: 'riskScore' },
            { key: 'controlEffectiveness', label: 'Control Effectiveness', sortKey: 'controlEffectiveness' },
            { key: 'requiresEscalation', label: 'Escalation', sortKey: 'requiresEscalation', render: (item) => item.requiresEscalation ? 'Yes' : 'No' }
        ],

        CompIncident: [
            { key: 'incidentId', label: 'ID', sortKey: 'incidentId', filterKey: 'incidentId' },
            { key: 'incidentNumber', label: 'Number', sortKey: 'incidentNumber', filterKey: 'incidentNumber' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'severity', label: 'Severity', sortKey: 'severity', filterKey: 'severity', enumValues: enums.SEVERITY_LEVEL_VALUES, render: (item) => render.severityLevel(item.severity) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.INCIDENT_STATUS_VALUES, render: (item) => render.incidentStatus(item.status) },
            { key: 'category', label: 'Category', sortKey: 'category', enumValues: enums.RISK_CATEGORY_VALUES, render: (item) => render.riskCategory(item.category) },
            { key: 'occurredDate', label: 'Occurred', sortKey: 'occurredDate', render: (item) => render.date(item.occurredDate) },
            { key: 'reportedDate', label: 'Reported', sortKey: 'reportedDate', render: (item) => render.date(item.reportedDate) },
            { key: 'assignedToId', label: 'Assigned To', sortKey: 'assignedToId' },
            { key: 'regulatoryReportable', label: 'Reportable', sortKey: 'regulatoryReportable', render: (item) => item.regulatoryReportable ? 'Yes' : 'No' }
        ],

        CompMitigationPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'riskId', label: 'Risk', sortKey: 'riskId', filterKey: 'riskId' },
            { key: 'strategy', label: 'Strategy', sortKey: 'strategy' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.REMEDIATION_STATUS_VALUES, render: (item) => render.remediationStatus(item.status) },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => render.date(item.startDate) },
            { key: 'targetDate', label: 'Target Date', sortKey: 'targetDate', render: (item) => render.date(item.targetDate) },
            { key: 'targetRiskReduction', label: 'Target Reduction', sortKey: 'targetRiskReduction' },
            { key: 'actualRiskReduction', label: 'Actual Reduction', sortKey: 'actualRiskReduction' }
        ],

        CompInsurancePolicy: [
            { key: 'insuranceId', label: 'ID', sortKey: 'insuranceId', filterKey: 'insuranceId' },
            { key: 'policyNumber', label: 'Policy #', sortKey: 'policyNumber', filterKey: 'policyNumber' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'policyType', label: 'Type', sortKey: 'policyType' },
            { key: 'provider', label: 'Provider', sortKey: 'provider' },
            { key: 'status', label: 'Status', sortKey: 'status' },
            { key: 'effectiveDate', label: 'Effective Date', sortKey: 'effectiveDate', render: (item) => render.date(item.effectiveDate) },
            { key: 'expiryDate', label: 'Expiry Date', sortKey: 'expiryDate', render: (item) => render.date(item.expiryDate) },
            { key: 'responsibleId', label: 'Responsible', sortKey: 'responsibleId' }
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
