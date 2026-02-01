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
// Benefits Module - Enum Definitions and Render Functions
// Part 1 of 4 - Load this file first

(function() {
    'use strict';

    // Initialize Benefits namespace
    window.Benefits = window.Benefits || {};

    // Import shared utilities
    const { escapeHtml, formatDate, formatMoney } = Layer8DUtils;
    const { renderEnum, renderStatus, createStatusRenderer, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BENEFIT_PLAN_TYPE = {
        0: 'Unspecified',
        1: 'Medical',
        2: 'Dental',
        3: 'Vision',
        4: 'Life',
        5: 'AD&D',
        6: 'Short-Term Disability',
        7: 'Long-Term Disability',
        8: 'HSA',
        9: 'FSA (Medical)',
        10: 'FSA (Dependent Care)',
        11: '401(k)',
        12: '403(b)',
        13: 'Pension',
        14: 'EAP',
        15: 'Legal',
        16: 'Pet Insurance',
        17: 'Commuter',
        18: 'Supplemental'
    };

    const BENEFIT_PLAN_TYPE_VALUES = {
        'medical': 1,
        'dental': 2,
        'vision': 3,
        'life': 4,
        'ad&d': 5,
        'std': 6,
        'ltd': 7,
        'hsa': 8,
        'fsa': 9,
        '401k': 11,
        '403b': 12,
        'pension': 13,
        'eap': 14,
        'legal': 15,
        'pet': 16,
        'commuter': 17,
        'supplemental': 18
    };

    const BENEFIT_PLAN_CATEGORY = {
        0: 'Unspecified',
        1: 'Health',
        2: 'Insurance',
        3: 'Retirement',
        4: 'Spending Account',
        5: 'Wellness',
        6: 'Other'
    };

    const BENEFIT_PLAN_CATEGORY_VALUES = {
        'health': 1,
        'insurance': 2,
        'retirement': 3,
        'spending': 4,
        'wellness': 5,
        'other': 6
    };

    const COVERAGE_LEVEL = {
        0: 'Unspecified',
        1: 'Employee Only',
        2: 'Employee + Spouse',
        3: 'Employee + Children',
        4: 'Employee + Family',
        5: 'Employee + One'
    };

    const COVERAGE_LEVEL_VALUES = {
        'employee': 1,
        'only': 1,
        'spouse': 2,
        'children': 3,
        'family': 4,
        'one': 5
    };

    const ENROLLMENT_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Active',
        3: 'Waived',
        4: 'Terminated',
        5: 'Cancelled',
        6: 'COBRA'
    };

    const ENROLLMENT_STATUS_VALUES = {
        'pending': 1,
        'active': 2,
        'waived': 3,
        'terminated': 4,
        'cancelled': 5,
        'cobra': 6
    };

    const ENROLLMENT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-terminated',
        6: 'layer8d-status-pending'
    };

    const ENROLLMENT_REASON = {
        0: 'Unspecified',
        1: 'New Hire',
        2: 'Open Enrollment',
        3: 'Qualifying Life Event',
        4: 'Rehire',
        5: 'Status Change'
    };

    const ENROLLMENT_REASON_VALUES = {
        'new': 1,
        'hire': 1,
        'open': 2,
        'life': 3,
        'event': 3,
        'rehire': 4,
        'status': 5,
        'change': 5
    };

    const DEPENDENT_RELATIONSHIP = {
        0: 'Unspecified',
        1: 'Spouse',
        2: 'Domestic Partner',
        3: 'Child',
        4: 'Stepchild',
        5: 'Foster Child',
        6: 'Adopted Child',
        7: 'Legal Guardian',
        8: 'Other'
    };

    const DEPENDENT_RELATIONSHIP_VALUES = {
        'spouse': 1,
        'partner': 2,
        'domestic': 2,
        'child': 3,
        'stepchild': 4,
        'foster': 5,
        'adopted': 6,
        'guardian': 7,
        'other': 8
    };

    const LIFE_EVENT_TYPE = {
        0: 'Unspecified',
        1: 'Marriage',
        2: 'Divorce',
        3: 'Birth',
        4: 'Adoption',
        5: 'Death of Dependent',
        6: 'Loss of Coverage',
        7: 'Gain of Coverage',
        8: 'Change in Work Status',
        9: 'Move/Relocation',
        10: 'Court Order',
        11: 'Medicare Eligibility'
    };

    const LIFE_EVENT_TYPE_VALUES = {
        'marriage': 1,
        'divorce': 2,
        'birth': 3,
        'adoption': 4,
        'death': 5,
        'loss': 6,
        'gain': 7,
        'work': 8,
        'status': 8,
        'move': 9,
        'relocation': 9,
        'court': 10,
        'medicare': 11
    };

    const LIFE_EVENT_STATUS = {
        0: 'Unspecified',
        1: 'Pending Review',
        2: 'Approved',
        3: 'Denied',
        4: 'Expired'
    };

    const LIFE_EVENT_STATUS_VALUES = {
        'pending': 1,
        'review': 1,
        'approved': 2,
        'denied': 3,
        'expired': 4
    };

    const LIFE_EVENT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-terminated',
        4: 'layer8d-status-inactive'
    };

    const CARRIER_TYPE = {
        0: 'Unspecified',
        1: 'Medical',
        2: 'Dental',
        3: 'Vision',
        4: 'Life',
        5: 'Disability',
        6: 'Retirement',
        7: 'Other'
    };

    const CARRIER_TYPE_VALUES = {
        'medical': 1,
        'dental': 2,
        'vision': 3,
        'life': 4,
        'disability': 5,
        'retirement': 6,
        'other': 7
    };

    const COBRA_EVENT_TYPE = {
        0: 'Unspecified',
        1: 'Termination',
        2: 'Hours Reduction',
        3: 'Employee Death',
        4: 'Divorce',
        5: 'Child Aging Out',
        6: 'Medicare Entitlement'
    };

    const COBRA_EVENT_TYPE_VALUES = {
        'termination': 1,
        'hours': 2,
        'reduction': 2,
        'death': 3,
        'divorce': 4,
        'aging': 5,
        'child': 5,
        'medicare': 6
    };

    const COBRA_STATUS = {
        0: 'Unspecified',
        1: 'Pending Notification',
        2: 'Notified',
        3: 'Elected',
        4: 'Waived',
        5: 'Active',
        6: 'Terminated',
        7: 'Expired'
    };

    const COBRA_STATUS_VALUES = {
        'pending': 1,
        'notified': 2,
        'elected': 3,
        'waived': 4,
        'active': 5,
        'terminated': 6,
        'expired': 7
    };

    const COBRA_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-active',
        6: 'layer8d-status-terminated',
        7: 'layer8d-status-inactive'
    };

    const VERIFICATION_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Verified',
        3: 'Rejected',
        4: 'Expired'
    };

    const VERIFICATION_STATUS_VALUES = {
        'pending': 1,
        'verified': 2,
        'rejected': 3,
        'expired': 4
    };

    const VERIFICATION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-terminated',
        4: 'layer8d-status-inactive'
    };

    // ============================================================================
    // STATUS RENDERERS (using shared factory)
    // ============================================================================

    const renderEnrollmentStatus = createStatusRenderer(ENROLLMENT_STATUS, ENROLLMENT_STATUS_CLASSES);
    const renderLifeEventStatus = createStatusRenderer(LIFE_EVENT_STATUS, LIFE_EVENT_STATUS_CLASSES);
    const renderCOBRAStatus = createStatusRenderer(COBRA_STATUS, COBRA_STATUS_CLASSES);
    const renderVerificationStatus = createStatusRenderer(VERIFICATION_STATUS, VERIFICATION_STATUS_CLASSES);

    // ============================================================================
    // EXPORT ENUMS TO NAMESPACE
    // ============================================================================

    window.Benefits.enums = {
        BENEFIT_PLAN_TYPE,
        BENEFIT_PLAN_TYPE_VALUES,
        BENEFIT_PLAN_CATEGORY,
        BENEFIT_PLAN_CATEGORY_VALUES,
        COVERAGE_LEVEL,
        COVERAGE_LEVEL_VALUES,
        ENROLLMENT_STATUS,
        ENROLLMENT_STATUS_VALUES,
        ENROLLMENT_REASON,
        ENROLLMENT_REASON_VALUES,
        DEPENDENT_RELATIONSHIP,
        DEPENDENT_RELATIONSHIP_VALUES,
        LIFE_EVENT_TYPE,
        LIFE_EVENT_TYPE_VALUES,
        LIFE_EVENT_STATUS,
        LIFE_EVENT_STATUS_VALUES,
        CARRIER_TYPE,
        CARRIER_TYPE_VALUES,
        COBRA_EVENT_TYPE,
        COBRA_EVENT_TYPE_VALUES,
        COBRA_STATUS,
        COBRA_STATUS_VALUES,
        VERIFICATION_STATUS,
        VERIFICATION_STATUS_VALUES
    };

    window.Benefits.render = {
        benefitPlanType: (v) => renderEnum(v, BENEFIT_PLAN_TYPE),
        benefitPlanCategory: (v) => renderEnum(v, BENEFIT_PLAN_CATEGORY),
        coverageLevel: (v) => renderEnum(v, COVERAGE_LEVEL),
        enrollmentStatus: renderEnrollmentStatus,
        enrollmentReason: (v) => renderEnum(v, ENROLLMENT_REASON),
        dependentRelationship: (v) => renderEnum(v, DEPENDENT_RELATIONSHIP),
        lifeEventType: (v) => renderEnum(v, LIFE_EVENT_TYPE),
        lifeEventStatus: renderLifeEventStatus,
        carrierType: (v) => renderEnum(v, CARRIER_TYPE),
        cobraEventType: (v) => renderEnum(v, COBRA_EVENT_TYPE),
        cobraStatus: renderCOBRAStatus,
        verificationStatus: renderVerificationStatus,
        money: renderMoney,
        boolean: renderBoolean,
        date: renderDate
    };

    // Export internal functions for use by other benefits files
    window.Benefits._internal = {
        renderEnrollmentStatus,
        renderLifeEventStatus,
        renderCOBRAStatus,
        renderVerificationStatus
    };

})();
