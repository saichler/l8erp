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
 * Mobile COMP Regulatory Module - Enum Definitions
 * Desktop Equivalent: comp/regulatory/regulatory-enums.js
 */
(function() {
    'use strict';

    window.MobileCompRegulatory = window.MobileCompRegulatory || {};
    MobileCompRegulatory.enums = {};

    // ============================================================================
    // REGULATION TYPE
    // ============================================================================

    MobileCompRegulatory.enums.REGULATION_TYPE = {
        0: 'Unspecified', 1: 'SOX', 2: 'GDPR', 3: 'HIPAA', 4: 'PCI-DSS',
        5: 'FDA', 6: 'Environmental', 7: 'Export Control', 8: 'Industry Specific',
        9: 'Internal Policy', 10: 'Other'
    };
    MobileCompRegulatory.enums.REGULATION_TYPE_VALUES = {
        'sox': 1, 'gdpr': 2, 'hipaa': 3, 'pci-dss': 4, 'fda': 5,
        'environmental': 6, 'exportcontrol': 7, 'industryspecific': 8,
        'internalpolicy': 9, 'other': 10
    };
    MobileCompRegulatory.enums.REGULATION_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active',
        5: 'status-active', 6: 'status-pending', 7: 'status-pending', 8: 'status-pending',
        9: 'status-inactive', 10: 'status-inactive'
    };

    // ============================================================================
    // COMPLIANCE STATUS TYPE
    // ============================================================================

    MobileCompRegulatory.enums.COMPLIANCE_STATUS_TYPE = {
        0: 'Unspecified', 1: 'Compliant', 2: 'Partially Compliant', 3: 'Non-Compliant',
        4: 'Under Review', 5: 'Exempt', 6: 'Not Applicable'
    };
    MobileCompRegulatory.enums.COMPLIANCE_STATUS_TYPE_VALUES = {
        'compliant': 1, 'partiallycompliant': 2, 'noncompliant': 3,
        'underreview': 4, 'exempt': 5, 'notapplicable': 6
    };
    MobileCompRegulatory.enums.COMPLIANCE_STATUS_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-terminated',
        4: 'status-pending', 5: 'status-inactive', 6: 'status-inactive'
    };

    // ============================================================================
    // SEVERITY LEVEL
    // ============================================================================

    MobileCompRegulatory.enums.SEVERITY_LEVEL = {
        0: 'Unspecified', 1: 'Critical', 2: 'High', 3: 'Medium', 4: 'Low', 5: 'Informational'
    };
    MobileCompRegulatory.enums.SEVERITY_LEVEL_VALUES = {
        'critical': 1, 'high': 2, 'medium': 3, 'low': 4, 'informational': 5
    };
    MobileCompRegulatory.enums.SEVERITY_LEVEL_CLASSES = {
        1: 'status-terminated', 2: 'status-terminated', 3: 'status-pending',
        4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // CERTIFICATION STATUS
    // ============================================================================

    MobileCompRegulatory.enums.CERTIFICATION_STATUS = {
        0: 'Unspecified', 1: 'Active', 2: 'Pending', 3: 'Expired', 4: 'Revoked', 5: 'Under Renewal'
    };
    MobileCompRegulatory.enums.CERTIFICATION_STATUS_VALUES = {
        'active': 1, 'pending': 2, 'expired': 3, 'revoked': 4, 'underrenewal': 5
    };
    MobileCompRegulatory.enums.CERTIFICATION_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-inactive',
        4: 'status-terminated', 5: 'status-pending'
    };

    // ============================================================================
    // FINDING STATUS (used by violations)
    // ============================================================================

    MobileCompRegulatory.enums.FINDING_STATUS = {
        0: 'Unspecified', 1: 'Open', 2: 'In Remediation', 3: 'Pending Verification',
        4: 'Closed', 5: 'Risk Accepted'
    };
    MobileCompRegulatory.enums.FINDING_STATUS_VALUES = {
        'open': 1, 'inremediation': 2, 'pendingverification': 3, 'closed': 4, 'riskaccepted': 5
    };
    MobileCompRegulatory.enums.FINDING_STATUS_CLASSES = {
        1: 'status-terminated', 2: 'status-pending', 3: 'status-pending',
        4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCompRegulatory.render = {
        regulationType: Layer8MRenderers.createStatusRenderer(
            MobileCompRegulatory.enums.REGULATION_TYPE,
            MobileCompRegulatory.enums.REGULATION_TYPE_CLASSES
        ),
        complianceStatusType: Layer8MRenderers.createStatusRenderer(
            MobileCompRegulatory.enums.COMPLIANCE_STATUS_TYPE,
            MobileCompRegulatory.enums.COMPLIANCE_STATUS_TYPE_CLASSES
        ),
        severityLevel: Layer8MRenderers.createStatusRenderer(
            MobileCompRegulatory.enums.SEVERITY_LEVEL,
            MobileCompRegulatory.enums.SEVERITY_LEVEL_CLASSES
        ),
        certificationStatus: Layer8MRenderers.createStatusRenderer(
            MobileCompRegulatory.enums.CERTIFICATION_STATUS,
            MobileCompRegulatory.enums.CERTIFICATION_STATUS_CLASSES
        ),
        findingStatus: Layer8MRenderers.createStatusRenderer(
            MobileCompRegulatory.enums.FINDING_STATUS,
            MobileCompRegulatory.enums.FINDING_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate
    };

})();
