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
// Benefits Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.Benefits = window.Benefits || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BENEFIT_PLAN_TYPE = factory.withValues([
        ['Unspecified', null], ['Medical', 'medical'], ['Dental', 'dental'], ['Vision', 'vision'],
        ['Life', 'life'], ['AD&D', 'ad&d'], ['Short-Term Disability', 'std'],
        ['Long-Term Disability', 'ltd'], ['HSA', 'hsa'], ['FSA (Medical)', 'fsa'],
        ['FSA (Dependent Care)', null], ['401(k)', '401k'], ['403(b)', '403b'],
        ['Pension', 'pension'], ['EAP', 'eap'], ['Legal', 'legal'],
        ['Pet Insurance', 'pet'], ['Commuter', 'commuter'], ['Supplemental', 'supplemental']
    ]);

    const BENEFIT_PLAN_CATEGORY = factory.withValues([
        ['Unspecified', null], ['Health', 'health'], ['Insurance', 'insurance'],
        ['Retirement', 'retirement'], ['Spending Account', 'spending'],
        ['Wellness', 'wellness'], ['Other', 'other']
    ]);

    const COVERAGE_LEVEL = factory.withValues([
        ['Unspecified', null], ['Employee Only', 'employee'], ['Employee Only', 'only'],
        ['Employee + Spouse', 'spouse'], ['Employee + Children', 'children'],
        ['Employee + Family', 'family'], ['Employee + One', 'one']
    ]);

    const ENROLLMENT_STATUS = factory.create([
        ['Unspecified', null, ''], ['Pending', 'pending', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'], ['Waived', 'waived', 'layer8d-status-inactive'],
        ['Terminated', 'terminated', 'layer8d-status-terminated'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated'],
        ['COBRA', 'cobra', 'layer8d-status-pending']
    ]);

    const ENROLLMENT_REASON = factory.withValues([
        ['Unspecified', null], ['New Hire', 'new'], ['New Hire', 'hire'],
        ['Open Enrollment', 'open'], ['Qualifying Life Event', 'life'],
        ['Qualifying Life Event', 'event'], ['Rehire', 'rehire'],
        ['Status Change', 'status'], ['Status Change', 'change']
    ]);

    const DEPENDENT_RELATIONSHIP = factory.withValues([
        ['Unspecified', null], ['Spouse', 'spouse'], ['Domestic Partner', 'partner'],
        ['Domestic Partner', 'domestic'], ['Child', 'child'], ['Stepchild', 'stepchild'],
        ['Foster Child', 'foster'], ['Adopted Child', 'adopted'],
        ['Legal Guardian', 'guardian'], ['Other', 'other']
    ]);

    const LIFE_EVENT_TYPE = factory.withValues([
        ['Unspecified', null], ['Marriage', 'marriage'], ['Divorce', 'divorce'],
        ['Birth', 'birth'], ['Adoption', 'adoption'], ['Death of Dependent', 'death'],
        ['Loss of Coverage', 'loss'], ['Gain of Coverage', 'gain'],
        ['Change in Work Status', 'work'], ['Change in Work Status', 'status'],
        ['Move/Relocation', 'move'], ['Move/Relocation', 'relocation'],
        ['Court Order', 'court'], ['Medicare Eligibility', 'medicare']
    ]);

    const LIFE_EVENT_STATUS = factory.status([
        ['Unspecified', null, ''], ['Pending Review', 'pending', 'pending'],
        ['Pending Review', 'review', 'pending'], ['Approved', 'approved', 'active'],
        ['Denied', 'denied', 'terminated'], ['Expired', 'expired', 'inactive']
    ]);

    const CARRIER_TYPE = factory.withValues([
        ['Unspecified', null], ['Medical', 'medical'], ['Dental', 'dental'],
        ['Vision', 'vision'], ['Life', 'life'], ['Disability', 'disability'],
        ['Retirement', 'retirement'], ['Other', 'other']
    ]);

    const COBRA_EVENT_TYPE = factory.withValues([
        ['Unspecified', null], ['Termination', 'termination'], ['Hours Reduction', 'hours'],
        ['Hours Reduction', 'reduction'], ['Employee Death', 'death'],
        ['Divorce', 'divorce'], ['Child Aging Out', 'aging'], ['Child Aging Out', 'child'],
        ['Medicare Entitlement', 'medicare']
    ]);

    const COBRA_STATUS = factory.create([
        ['Unspecified', null, ''], ['Pending Notification', 'pending', 'layer8d-status-pending'],
        ['Notified', 'notified', 'layer8d-status-pending'],
        ['Elected', 'elected', 'layer8d-status-active'], ['Waived', 'waived', 'layer8d-status-inactive'],
        ['Active', 'active', 'layer8d-status-active'], ['Terminated', 'terminated', 'layer8d-status-terminated'],
        ['Expired', 'expired', 'layer8d-status-inactive']
    ]);

    const VERIFICATION_STATUS = factory.status([
        ['Unspecified', null, ''], ['Pending', 'pending', 'pending'],
        ['Verified', 'verified', 'active'], ['Rejected', 'rejected', 'terminated'],
        ['Expired', 'expired', 'inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.Benefits.enums = {
        BENEFIT_PLAN_TYPE: BENEFIT_PLAN_TYPE.enum,
        BENEFIT_PLAN_TYPE_VALUES: BENEFIT_PLAN_TYPE.values,
        BENEFIT_PLAN_CATEGORY: BENEFIT_PLAN_CATEGORY.enum,
        BENEFIT_PLAN_CATEGORY_VALUES: BENEFIT_PLAN_CATEGORY.values,
        COVERAGE_LEVEL: COVERAGE_LEVEL.enum,
        COVERAGE_LEVEL_VALUES: COVERAGE_LEVEL.values,
        ENROLLMENT_STATUS: ENROLLMENT_STATUS.enum,
        ENROLLMENT_STATUS_VALUES: ENROLLMENT_STATUS.values,
        ENROLLMENT_REASON: ENROLLMENT_REASON.enum,
        ENROLLMENT_REASON_VALUES: ENROLLMENT_REASON.values,
        DEPENDENT_RELATIONSHIP: DEPENDENT_RELATIONSHIP.enum,
        DEPENDENT_RELATIONSHIP_VALUES: DEPENDENT_RELATIONSHIP.values,
        LIFE_EVENT_TYPE: LIFE_EVENT_TYPE.enum,
        LIFE_EVENT_TYPE_VALUES: LIFE_EVENT_TYPE.values,
        LIFE_EVENT_STATUS: LIFE_EVENT_STATUS.enum,
        LIFE_EVENT_STATUS_VALUES: LIFE_EVENT_STATUS.values,
        CARRIER_TYPE: CARRIER_TYPE.enum,
        CARRIER_TYPE_VALUES: CARRIER_TYPE.values,
        COBRA_EVENT_TYPE: COBRA_EVENT_TYPE.enum,
        COBRA_EVENT_TYPE_VALUES: COBRA_EVENT_TYPE.values,
        COBRA_STATUS: COBRA_STATUS.enum,
        COBRA_STATUS_VALUES: COBRA_STATUS.values,
        VERIFICATION_STATUS: VERIFICATION_STATUS.enum,
        VERIFICATION_STATUS_VALUES: VERIFICATION_STATUS.values
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderEnrollmentStatus = createStatusRenderer(ENROLLMENT_STATUS.enum, ENROLLMENT_STATUS.classes);
    const renderLifeEventStatus = createStatusRenderer(LIFE_EVENT_STATUS.enum, LIFE_EVENT_STATUS.classes);
    const renderCOBRAStatus = createStatusRenderer(COBRA_STATUS.enum, COBRA_STATUS.classes);
    const renderVerificationStatus = createStatusRenderer(VERIFICATION_STATUS.enum, VERIFICATION_STATUS.classes);

    window.Benefits.render = {
        benefitPlanType: (v) => renderEnum(v, BENEFIT_PLAN_TYPE.enum),
        benefitPlanCategory: (v) => renderEnum(v, BENEFIT_PLAN_CATEGORY.enum),
        coverageLevel: (v) => renderEnum(v, COVERAGE_LEVEL.enum),
        enrollmentStatus: renderEnrollmentStatus,
        enrollmentReason: (v) => renderEnum(v, ENROLLMENT_REASON.enum),
        dependentRelationship: (v) => renderEnum(v, DEPENDENT_RELATIONSHIP.enum),
        lifeEventType: (v) => renderEnum(v, LIFE_EVENT_TYPE.enum),
        lifeEventStatus: renderLifeEventStatus,
        carrierType: (v) => renderEnum(v, CARRIER_TYPE.enum),
        cobraEventType: (v) => renderEnum(v, COBRA_EVENT_TYPE.enum),
        cobraStatus: renderCOBRAStatus,
        verificationStatus: renderVerificationStatus,
        money: renderMoney,
        boolean: renderBoolean,
        date: renderDate
    };

    window.Benefits._internal = {
        renderEnrollmentStatus, renderLifeEventStatus, renderCOBRAStatus, renderVerificationStatus
    };

})();
