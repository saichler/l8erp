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
 * Mobile COMP Risk Module - Enum Definitions
 * Desktop Equivalent: comp/risk/risk-enums.js
 */
(function() {
    'use strict';

    window.MobileCompRisk = window.MobileCompRisk || {};
    MobileCompRisk.enums = {};

    // ============================================================================
    // RISK CATEGORY
    // ============================================================================

    MobileCompRisk.enums.RISK_CATEGORY = {
        0: 'Unspecified', 1: 'Strategic', 2: 'Operational', 3: 'Financial',
        4: 'Compliance', 5: 'Reputational', 6: 'Technology', 7: 'Cyber Security', 8: 'Legal'
    };
    MobileCompRisk.enums.RISK_CATEGORY_VALUES = {
        'strategic': 1, 'operational': 2, 'financial': 3, 'compliance': 4,
        'reputational': 5, 'technology': 6, 'cybersecurity': 7, 'legal': 8
    };
    MobileCompRisk.enums.RISK_CATEGORY_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending', 4: 'status-pending',
        5: 'status-pending', 6: 'status-active', 7: 'status-terminated', 8: 'status-inactive'
    };

    // ============================================================================
    // RISK STATUS
    // ============================================================================

    MobileCompRisk.enums.RISK_STATUS = {
        0: 'Unspecified', 1: 'Identified', 2: 'Assessed', 3: 'Mitigating',
        4: 'Accepted', 5: 'Transferred', 6: 'Closed'
    };
    MobileCompRisk.enums.RISK_STATUS_VALUES = {
        'identified': 1, 'assessed': 2, 'mitigating': 3, 'accepted': 4, 'transferred': 5, 'closed': 6
    };
    MobileCompRisk.enums.RISK_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active',
        4: 'status-inactive', 5: 'status-inactive', 6: 'status-active'
    };

    // ============================================================================
    // INCIDENT STATUS
    // ============================================================================

    MobileCompRisk.enums.INCIDENT_STATUS = {
        0: 'Unspecified', 1: 'Reported', 2: 'Investigating', 3: 'Contained',
        4: 'Resolved', 5: 'Closed'
    };
    MobileCompRisk.enums.INCIDENT_STATUS_VALUES = {
        'reported': 1, 'investigating': 2, 'contained': 3, 'resolved': 4, 'closed': 5
    };
    MobileCompRisk.enums.INCIDENT_STATUS_CLASSES = {
        1: 'status-terminated', 2: 'status-pending', 3: 'status-pending',
        4: 'status-active', 5: 'status-active'
    };

    // ============================================================================
    // SEVERITY LEVEL
    // ============================================================================

    MobileCompRisk.enums.SEVERITY_LEVEL = {
        0: 'Unspecified', 1: 'Critical', 2: 'High', 3: 'Medium', 4: 'Low', 5: 'Informational'
    };
    MobileCompRisk.enums.SEVERITY_LEVEL_VALUES = {
        'critical': 1, 'high': 2, 'medium': 3, 'low': 4, 'informational': 5
    };
    MobileCompRisk.enums.SEVERITY_LEVEL_CLASSES = {
        1: 'status-terminated', 2: 'status-terminated', 3: 'status-pending',
        4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // REMEDIATION STATUS (for mitigation plans)
    // ============================================================================

    MobileCompRisk.enums.REMEDIATION_STATUS = {
        0: 'Unspecified', 1: 'Not Started', 2: 'In Progress', 3: 'Completed',
        4: 'Verified', 5: 'Overdue'
    };
    MobileCompRisk.enums.REMEDIATION_STATUS_VALUES = {
        'notstarted': 1, 'inprogress': 2, 'completed': 3, 'verified': 4, 'overdue': 5
    };
    MobileCompRisk.enums.REMEDIATION_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active',
        4: 'status-active', 5: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCompRisk.render = {
        riskCategory: Layer8MRenderers.createStatusRenderer(
            MobileCompRisk.enums.RISK_CATEGORY,
            MobileCompRisk.enums.RISK_CATEGORY_CLASSES
        ),
        riskStatus: Layer8MRenderers.createStatusRenderer(
            MobileCompRisk.enums.RISK_STATUS,
            MobileCompRisk.enums.RISK_STATUS_CLASSES
        ),
        incidentStatus: Layer8MRenderers.createStatusRenderer(
            MobileCompRisk.enums.INCIDENT_STATUS,
            MobileCompRisk.enums.INCIDENT_STATUS_CLASSES
        ),
        severityLevel: Layer8MRenderers.createStatusRenderer(
            MobileCompRisk.enums.SEVERITY_LEVEL,
            MobileCompRisk.enums.SEVERITY_LEVEL_CLASSES
        ),
        remediationStatus: Layer8MRenderers.createStatusRenderer(
            MobileCompRisk.enums.REMEDIATION_STATUS,
            MobileCompRisk.enums.REMEDIATION_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate
    };

})();
