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
 * Shared Reference Data - Compliance Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataComp = {
        // ========================================
        // Compliance - Regulatory
        // ========================================
        ...ref.coded('CompRegulation', 'regulationId', 'code', 'name'),
        ...ref.simple('CompCertification', 'certificationId', 'name'),

        // ========================================
        // Compliance - Internal Controls
        // ========================================
        ...ref.coded('CompControl', 'controlId', 'code', 'name'),
        ...ref.coded('CompPolicyDocument', 'documentId', 'code', 'title'),
        ...ref.simple('CompApprovalMatrix', 'matrixId', 'name'),

        // ========================================
        // Compliance - Risk Management
        // ========================================
        ...ref.coded('CompRiskRegister', 'riskId', 'riskNumber', 'name'),
        ...ref.coded('CompIncident', 'incidentId', 'incidentNumber', 'title'),
        ...ref.coded('CompInsurancePolicy', 'insuranceId', 'policyNumber', 'name'),

        // ========================================
        // Compliance - Audit Management
        // ========================================
        ...ref.simple('CompAuditSchedule', 'scheduleId', 'name'),
        ...ref.coded('CompAuditFinding', 'findingId', 'findingNumber', 'title'),
        ...ref.simple('CompComplianceReport', 'reportId', 'title')
    };
})();
