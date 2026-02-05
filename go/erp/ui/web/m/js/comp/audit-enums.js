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
 * Mobile COMP Audit Module - Enum Definitions
 * Desktop Equivalent: comp/audit/audit-enums.js
 */
(function() {
    'use strict';

    window.MobileCompAudit = window.MobileCompAudit || {};
    MobileCompAudit.enums = {};

    // ============================================================================
    // AUDIT TYPE
    // ============================================================================

    MobileCompAudit.enums.AUDIT_TYPE = {
        0: 'Unspecified', 1: 'Internal', 2: 'External', 3: 'Regulatory',
        4: 'Compliance', 5: 'Financial', 6: 'Operational', 7: 'IT'
    };
    MobileCompAudit.enums.AUDIT_TYPE_VALUES = {
        'internal': 1, 'external': 2, 'regulatory': 3, 'compliance': 4,
        'financial': 5, 'operational': 6, 'it': 7
    };
    MobileCompAudit.enums.AUDIT_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-terminated',
        4: 'status-pending', 5: 'status-active', 6: 'status-active', 7: 'status-active'
    };

    // ============================================================================
    // AUDIT STATUS
    // ============================================================================

    MobileCompAudit.enums.AUDIT_STATUS = {
        0: 'Unspecified', 1: 'Planned', 2: 'In Progress', 3: 'Fieldwork Complete',
        4: 'Draft Report', 5: 'Final Report', 6: 'Closed'
    };
    MobileCompAudit.enums.AUDIT_STATUS_VALUES = {
        'planned': 1, 'inprogress': 2, 'fieldworkcomplete': 3,
        'draftreport': 4, 'finalreport': 5, 'closed': 6
    };
    MobileCompAudit.enums.AUDIT_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-pending',
        4: 'status-pending', 5: 'status-active', 6: 'status-active'
    };

    // ============================================================================
    // FINDING STATUS
    // ============================================================================

    MobileCompAudit.enums.FINDING_STATUS = {
        0: 'Unspecified', 1: 'Open', 2: 'In Remediation', 3: 'Pending Verification',
        4: 'Closed', 5: 'Risk Accepted'
    };
    MobileCompAudit.enums.FINDING_STATUS_VALUES = {
        'open': 1, 'inremediation': 2, 'pendingverification': 3, 'closed': 4, 'riskaccepted': 5
    };
    MobileCompAudit.enums.FINDING_STATUS_CLASSES = {
        1: 'status-terminated', 2: 'status-pending', 3: 'status-pending',
        4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // SEVERITY LEVEL
    // ============================================================================

    MobileCompAudit.enums.SEVERITY_LEVEL = {
        0: 'Unspecified', 1: 'Critical', 2: 'High', 3: 'Medium', 4: 'Low', 5: 'Informational'
    };
    MobileCompAudit.enums.SEVERITY_LEVEL_VALUES = {
        'critical': 1, 'high': 2, 'medium': 3, 'low': 4, 'informational': 5
    };
    MobileCompAudit.enums.SEVERITY_LEVEL_CLASSES = {
        1: 'status-terminated', 2: 'status-terminated', 3: 'status-pending',
        4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // REMEDIATION STATUS
    // ============================================================================

    MobileCompAudit.enums.REMEDIATION_STATUS = {
        0: 'Unspecified', 1: 'Not Started', 2: 'In Progress', 3: 'Completed',
        4: 'Verified', 5: 'Overdue'
    };
    MobileCompAudit.enums.REMEDIATION_STATUS_VALUES = {
        'notstarted': 1, 'inprogress': 2, 'completed': 3, 'verified': 4, 'overdue': 5
    };
    MobileCompAudit.enums.REMEDIATION_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active',
        4: 'status-active', 5: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCompAudit.render = {
        auditType: Layer8MRenderers.createStatusRenderer(
            MobileCompAudit.enums.AUDIT_TYPE,
            MobileCompAudit.enums.AUDIT_TYPE_CLASSES
        ),
        auditStatus: Layer8MRenderers.createStatusRenderer(
            MobileCompAudit.enums.AUDIT_STATUS,
            MobileCompAudit.enums.AUDIT_STATUS_CLASSES
        ),
        findingStatus: Layer8MRenderers.createStatusRenderer(
            MobileCompAudit.enums.FINDING_STATUS,
            MobileCompAudit.enums.FINDING_STATUS_CLASSES
        ),
        severityLevel: Layer8MRenderers.createStatusRenderer(
            MobileCompAudit.enums.SEVERITY_LEVEL,
            MobileCompAudit.enums.SEVERITY_LEVEL_CLASSES
        ),
        remediationStatus: Layer8MRenderers.createStatusRenderer(
            MobileCompAudit.enums.REMEDIATION_STATUS,
            MobileCompAudit.enums.REMEDIATION_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate
    };

})();
