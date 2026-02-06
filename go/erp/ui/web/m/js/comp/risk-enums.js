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
 * Mobile COMP Risk Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: comp/risk/risk-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileCompRisk = window.MobileCompRisk || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const RISK_CATEGORY = factory.create([
        ['Unspecified', null, ''],
        ['Strategic', 'strategic', 'status-active'],
        ['Operational', 'operational', 'status-active'],
        ['Financial', 'financial', 'status-pending'],
        ['Compliance', 'compliance', 'status-pending'],
        ['Reputational', 'reputational', 'status-pending'],
        ['Technology', 'technology', 'status-active'],
        ['Cyber Security', 'cybersecurity', 'status-terminated'],
        ['Legal', 'legal', 'status-inactive']
    ]);

    const RISK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Identified', 'identified', 'status-pending'],
        ['Assessed', 'assessed', 'status-pending'],
        ['Mitigating', 'mitigating', 'status-active'],
        ['Accepted', 'accepted', 'status-inactive'],
        ['Transferred', 'transferred', 'status-inactive'],
        ['Closed', 'closed', 'status-active']
    ]);

    const INCIDENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Reported', 'reported', 'status-terminated'],
        ['Investigating', 'investigating', 'status-pending'],
        ['Contained', 'contained', 'status-pending'],
        ['Resolved', 'resolved', 'status-active'],
        ['Closed', 'closed', 'status-active']
    ]);

    const SEVERITY_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['Critical', 'critical', 'status-terminated'],
        ['High', 'high', 'status-terminated'],
        ['Medium', 'medium', 'status-pending'],
        ['Low', 'low', 'status-active'],
        ['Informational', 'informational', 'status-inactive']
    ]);

    const REMEDIATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Not Started', 'notstarted', 'status-inactive'],
        ['In Progress', 'inprogress', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Verified', 'verified', 'status-active'],
        ['Overdue', 'overdue', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCompRisk.enums = {
        RISK_CATEGORY: RISK_CATEGORY.enum,
        RISK_CATEGORY_VALUES: RISK_CATEGORY.values,
        RISK_CATEGORY_CLASSES: RISK_CATEGORY.classes,
        RISK_STATUS: RISK_STATUS.enum,
        RISK_STATUS_VALUES: RISK_STATUS.values,
        RISK_STATUS_CLASSES: RISK_STATUS.classes,
        INCIDENT_STATUS: INCIDENT_STATUS.enum,
        INCIDENT_STATUS_VALUES: INCIDENT_STATUS.values,
        INCIDENT_STATUS_CLASSES: INCIDENT_STATUS.classes,
        SEVERITY_LEVEL: SEVERITY_LEVEL.enum,
        SEVERITY_LEVEL_VALUES: SEVERITY_LEVEL.values,
        SEVERITY_LEVEL_CLASSES: SEVERITY_LEVEL.classes,
        REMEDIATION_STATUS: REMEDIATION_STATUS.enum,
        REMEDIATION_STATUS_VALUES: REMEDIATION_STATUS.values,
        REMEDIATION_STATUS_CLASSES: REMEDIATION_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCompRisk.render = {
        riskCategory: createStatusRenderer(RISK_CATEGORY.enum, RISK_CATEGORY.classes),
        riskStatus: createStatusRenderer(RISK_STATUS.enum, RISK_STATUS.classes),
        incidentStatus: createStatusRenderer(INCIDENT_STATUS.enum, INCIDENT_STATUS.classes),
        severityLevel: createStatusRenderer(SEVERITY_LEVEL.enum, SEVERITY_LEVEL.classes),
        remediationStatus: createStatusRenderer(REMEDIATION_STATUS.enum, REMEDIATION_STATUS.classes),
        date: renderDate
    };

})();
