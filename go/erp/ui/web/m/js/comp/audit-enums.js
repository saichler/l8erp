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
 * Mobile COMP Audit Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: comp/audit/audit-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileCompAudit = window.MobileCompAudit || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const AUDIT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Internal', 'internal', 'status-active'],
        ['External', 'external', 'status-pending'],
        ['Regulatory', 'regulatory', 'status-terminated'],
        ['Compliance', 'compliance', 'status-pending'],
        ['Financial', 'financial', 'status-active'],
        ['Operational', 'operational', 'status-active'],
        ['IT', 'it', 'status-active']
    ]);

    const AUDIT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'status-inactive'],
        ['In Progress', 'inprogress', 'status-pending'],
        ['Fieldwork Complete', 'fieldworkcomplete', 'status-pending'],
        ['Draft Report', 'draftreport', 'status-pending'],
        ['Final Report', 'finalreport', 'status-active'],
        ['Closed', 'closed', 'status-active']
    ]);

    const FINDING_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'status-terminated'],
        ['In Remediation', 'inremediation', 'status-pending'],
        ['Pending Verification', 'pendingverification', 'status-pending'],
        ['Closed', 'closed', 'status-active'],
        ['Risk Accepted', 'riskaccepted', 'status-inactive']
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

    MobileCompAudit.enums = {
        AUDIT_TYPE: AUDIT_TYPE.enum,
        AUDIT_TYPE_VALUES: AUDIT_TYPE.values,
        AUDIT_TYPE_CLASSES: AUDIT_TYPE.classes,
        AUDIT_STATUS: AUDIT_STATUS.enum,
        AUDIT_STATUS_VALUES: AUDIT_STATUS.values,
        AUDIT_STATUS_CLASSES: AUDIT_STATUS.classes,
        FINDING_STATUS: FINDING_STATUS.enum,
        FINDING_STATUS_VALUES: FINDING_STATUS.values,
        FINDING_STATUS_CLASSES: FINDING_STATUS.classes,
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

    MobileCompAudit.render = {
        auditType: createStatusRenderer(AUDIT_TYPE.enum, AUDIT_TYPE.classes),
        auditStatus: createStatusRenderer(AUDIT_STATUS.enum, AUDIT_STATUS.classes),
        findingStatus: createStatusRenderer(FINDING_STATUS.enum, FINDING_STATUS.classes),
        severityLevel: createStatusRenderer(SEVERITY_LEVEL.enum, SEVERITY_LEVEL.classes),
        remediationStatus: createStatusRenderer(REMEDIATION_STATUS.enum, REMEDIATION_STATUS.classes),
        date: renderDate
    };

})();
