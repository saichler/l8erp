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
 * Mobile COMP Regulatory Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: comp/regulatory/regulatory-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileCompRegulatory = window.MobileCompRegulatory || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const REGULATION_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['SOX', 'sox', 'status-active'],
        ['GDPR', 'gdpr', 'status-active'],
        ['HIPAA', 'hipaa', 'status-active'],
        ['PCI-DSS', 'pci-dss', 'status-active'],
        ['FDA', 'fda', 'status-active'],
        ['Environmental', 'environmental', 'status-pending'],
        ['Export Control', 'exportcontrol', 'status-pending'],
        ['Industry Specific', 'industryspecific', 'status-pending'],
        ['Internal Policy', 'internalpolicy', 'status-inactive'],
        ['Other', 'other', 'status-inactive']
    ]);

    const COMPLIANCE_STATUS_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Compliant', 'compliant', 'status-active'],
        ['Partially Compliant', 'partiallycompliant', 'status-pending'],
        ['Non-Compliant', 'noncompliant', 'status-terminated'],
        ['Under Review', 'underreview', 'status-pending'],
        ['Exempt', 'exempt', 'status-inactive'],
        ['Not Applicable', 'notapplicable', 'status-inactive']
    ]);

    const SEVERITY_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['Critical', 'critical', 'status-terminated'],
        ['High', 'high', 'status-terminated'],
        ['Medium', 'medium', 'status-pending'],
        ['Low', 'low', 'status-active'],
        ['Informational', 'informational', 'status-inactive']
    ]);

    const CERTIFICATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'status-active'],
        ['Pending', 'pending', 'status-pending'],
        ['Expired', 'expired', 'status-inactive'],
        ['Revoked', 'revoked', 'status-terminated'],
        ['Under Renewal', 'underrenewal', 'status-pending']
    ]);

    const FINDING_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'status-terminated'],
        ['In Remediation', 'inremediation', 'status-pending'],
        ['Pending Verification', 'pendingverification', 'status-pending'],
        ['Closed', 'closed', 'status-active'],
        ['Risk Accepted', 'riskaccepted', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCompRegulatory.enums = {
        REGULATION_TYPE: REGULATION_TYPE.enum,
        REGULATION_TYPE_VALUES: REGULATION_TYPE.values,
        REGULATION_TYPE_CLASSES: REGULATION_TYPE.classes,
        COMPLIANCE_STATUS_TYPE: COMPLIANCE_STATUS_TYPE.enum,
        COMPLIANCE_STATUS_TYPE_VALUES: COMPLIANCE_STATUS_TYPE.values,
        COMPLIANCE_STATUS_TYPE_CLASSES: COMPLIANCE_STATUS_TYPE.classes,
        SEVERITY_LEVEL: SEVERITY_LEVEL.enum,
        SEVERITY_LEVEL_VALUES: SEVERITY_LEVEL.values,
        SEVERITY_LEVEL_CLASSES: SEVERITY_LEVEL.classes,
        CERTIFICATION_STATUS: CERTIFICATION_STATUS.enum,
        CERTIFICATION_STATUS_VALUES: CERTIFICATION_STATUS.values,
        CERTIFICATION_STATUS_CLASSES: CERTIFICATION_STATUS.classes,
        FINDING_STATUS: FINDING_STATUS.enum,
        FINDING_STATUS_VALUES: FINDING_STATUS.values,
        FINDING_STATUS_CLASSES: FINDING_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCompRegulatory.render = {
        regulationType: createStatusRenderer(REGULATION_TYPE.enum, REGULATION_TYPE.classes),
        complianceStatusType: createStatusRenderer(COMPLIANCE_STATUS_TYPE.enum, COMPLIANCE_STATUS_TYPE.classes),
        severityLevel: createStatusRenderer(SEVERITY_LEVEL.enum, SEVERITY_LEVEL.classes),
        certificationStatus: createStatusRenderer(CERTIFICATION_STATUS.enum, CERTIFICATION_STATUS.classes),
        findingStatus: createStatusRenderer(FINDING_STATUS.enum, FINDING_STATUS.classes),
        date: renderDate
    };

})();
