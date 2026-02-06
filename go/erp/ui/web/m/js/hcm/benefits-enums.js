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
 * Mobile Benefits Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: hcm/benefits/benefits-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderMoney, renderBoolean, renderDate } = Layer8MRenderers;

    window.MobileBenefits = window.MobileBenefits || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BENEFIT_PLAN_TYPE = factory.withValues([
        ['Unspecified', null], ['Medical', 'medical'], ['Dental', 'dental'], ['Vision', 'vision'],
        ['Life', 'life'], ['AD&D', 'ad&d'], ['Short-Term Disability', 'std'],
        ['Long-Term Disability', 'ltd'], ['HSA', 'hsa'], ['FSA (Medical)', 'fsa'],
        ['FSA (Dependent Care)', 'fsa-dep'], ['401(k)', '401k'], ['403(b)', '403b'],
        ['Pension', 'pension'], ['EAP', 'eap'], ['Legal', 'legal'],
        ['Pet Insurance', 'pet'], ['Commuter', 'commuter'], ['Supplemental', 'supplemental']
    ]);

    const BENEFIT_PLAN_CATEGORY = factory.withValues([
        ['Unspecified', null], ['Health', 'health'], ['Insurance', 'insurance'],
        ['Retirement', 'retirement'], ['Spending Account', 'spending'], ['Wellness', 'wellness'], ['Other', 'other']
    ]);

    const COVERAGE_LEVEL = factory.withValues([
        ['Unspecified', null], ['Employee Only', 'employee'], ['Employee + Spouse', 'spouse'],
        ['Employee + Children', 'children'], ['Employee + Family', 'family'], ['Employee + One', 'one']
    ]);

    const ENROLLMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Waived', 'waived', 'status-inactive'],
        ['Terminated', 'terminated', 'status-terminated'],
        ['Cancelled', 'cancelled', 'status-terminated'],
        ['COBRA', 'cobra', 'status-pending']
    ]);

    const ENROLLMENT_REASON = factory.withValues([
        ['Unspecified', null], ['New Hire', 'new'], ['Open Enrollment', 'open'],
        ['Qualifying Life Event', 'life'], ['Rehire', 'rehire'], ['Status Change', 'status']
    ]);

    const DEPENDENT_RELATIONSHIP = factory.withValues([
        ['Unspecified', null], ['Spouse', 'spouse'], ['Domestic Partner', 'partner'],
        ['Child', 'child'], ['Stepchild', 'stepchild'], ['Foster Child', 'foster'],
        ['Adopted Child', 'adopted'], ['Legal Guardian', 'guardian'], ['Other', 'other']
    ]);

    const LIFE_EVENT_TYPE = factory.withValues([
        ['Unspecified', null], ['Marriage', 'marriage'], ['Divorce', 'divorce'],
        ['Birth', 'birth'], ['Adoption', 'adoption'], ['Death of Dependent', 'death'],
        ['Loss of Coverage', 'loss'], ['Gain of Coverage', 'gain'],
        ['Change in Work Status', 'work'], ['Move/Relocation', 'move'],
        ['Court Order', 'court'], ['Medicare Eligibility', 'medicare']
    ]);

    const LIFE_EVENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending Review', 'pending', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Denied', 'denied', 'status-terminated'],
        ['Expired', 'expired', 'status-inactive']
    ]);

    const CARRIER_TYPE = factory.withValues([
        ['Unspecified', null], ['Medical', 'medical'], ['Dental', 'dental'], ['Vision', 'vision'],
        ['Life', 'life'], ['Disability', 'disability'], ['Retirement', 'retirement'], ['Other', 'other']
    ]);

    const COBRA_EVENT_TYPE = factory.withValues([
        ['Unspecified', null], ['Termination', 'termination'], ['Hours Reduction', 'hours'],
        ['Employee Death', 'death'], ['Divorce', 'divorce'], ['Child Aging Out', 'aging'], ['Medicare Entitlement', 'medicare']
    ]);

    const COBRA_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending Notification', 'pending', 'status-pending'],
        ['Notified', 'notified', 'status-pending'],
        ['Elected', 'elected', 'status-active'],
        ['Waived', 'waived', 'status-inactive'],
        ['Active', 'active', 'status-active'],
        ['Terminated', 'terminated', 'status-terminated'],
        ['Expired', 'expired', 'status-inactive']
    ]);

    const VERIFICATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Verified', 'verified', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated'],
        ['Expired', 'expired', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileBenefits.enums = {
        BENEFIT_PLAN_TYPE: BENEFIT_PLAN_TYPE.enum,
        BENEFIT_PLAN_TYPE_VALUES: BENEFIT_PLAN_TYPE.values,
        BENEFIT_PLAN_CATEGORY: BENEFIT_PLAN_CATEGORY.enum,
        BENEFIT_PLAN_CATEGORY_VALUES: BENEFIT_PLAN_CATEGORY.values,
        COVERAGE_LEVEL: COVERAGE_LEVEL.enum,
        COVERAGE_LEVEL_VALUES: COVERAGE_LEVEL.values,
        ENROLLMENT_STATUS: ENROLLMENT_STATUS.enum,
        ENROLLMENT_STATUS_VALUES: ENROLLMENT_STATUS.values,
        ENROLLMENT_STATUS_CLASSES: ENROLLMENT_STATUS.classes,
        ENROLLMENT_REASON: ENROLLMENT_REASON.enum,
        ENROLLMENT_REASON_VALUES: ENROLLMENT_REASON.values,
        DEPENDENT_RELATIONSHIP: DEPENDENT_RELATIONSHIP.enum,
        DEPENDENT_RELATIONSHIP_VALUES: DEPENDENT_RELATIONSHIP.values,
        LIFE_EVENT_TYPE: LIFE_EVENT_TYPE.enum,
        LIFE_EVENT_TYPE_VALUES: LIFE_EVENT_TYPE.values,
        LIFE_EVENT_STATUS: LIFE_EVENT_STATUS.enum,
        LIFE_EVENT_STATUS_VALUES: LIFE_EVENT_STATUS.values,
        LIFE_EVENT_STATUS_CLASSES: LIFE_EVENT_STATUS.classes,
        CARRIER_TYPE: CARRIER_TYPE.enum,
        CARRIER_TYPE_VALUES: CARRIER_TYPE.values,
        COBRA_EVENT_TYPE: COBRA_EVENT_TYPE.enum,
        COBRA_EVENT_TYPE_VALUES: COBRA_EVENT_TYPE.values,
        COBRA_STATUS: COBRA_STATUS.enum,
        COBRA_STATUS_VALUES: COBRA_STATUS.values,
        COBRA_STATUS_CLASSES: COBRA_STATUS.classes,
        VERIFICATION_STATUS: VERIFICATION_STATUS.enum,
        VERIFICATION_STATUS_VALUES: VERIFICATION_STATUS.values,
        VERIFICATION_STATUS_CLASSES: VERIFICATION_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBenefits.render = {
        benefitPlanType: (v) => renderEnum(v, BENEFIT_PLAN_TYPE.enum),
        benefitPlanCategory: (v) => renderEnum(v, BENEFIT_PLAN_CATEGORY.enum),
        coverageLevel: (v) => renderEnum(v, COVERAGE_LEVEL.enum),
        enrollmentStatus: createStatusRenderer(ENROLLMENT_STATUS.enum, ENROLLMENT_STATUS.classes),
        enrollmentReason: (v) => renderEnum(v, ENROLLMENT_REASON.enum),
        dependentRelationship: (v) => renderEnum(v, DEPENDENT_RELATIONSHIP.enum),
        lifeEventType: (v) => renderEnum(v, LIFE_EVENT_TYPE.enum),
        lifeEventStatus: createStatusRenderer(LIFE_EVENT_STATUS.enum, LIFE_EVENT_STATUS.classes),
        carrierType: (v) => renderEnum(v, CARRIER_TYPE.enum),
        cobraEventType: (v) => renderEnum(v, COBRA_EVENT_TYPE.enum),
        cobraStatus: createStatusRenderer(COBRA_STATUS.enum, COBRA_STATUS.classes),
        verificationStatus: createStatusRenderer(VERIFICATION_STATUS.enum, VERIFICATION_STATUS.classes),
        money: renderMoney,
        boolean: renderBoolean,
        date: renderDate
    };

})();
