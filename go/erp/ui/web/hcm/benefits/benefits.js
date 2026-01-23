// Benefits Module - Column Configurations and Form Definitions
// Handles: BenefitPlan, BenefitEnrollment, Carrier, Dependent, LifeEvent, COBRAEvent

(function() {
    'use strict';

    // Import shared utilities
    const { escapeHtml, formatDate, formatMoney } = ERPUtils;
    const { renderEnum, renderStatus, createStatusRenderer, renderBoolean, renderDate, renderMoney } = ERPRenderers;

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
        1: 'erp-status-pending',
        2: 'erp-status-active',
        3: 'erp-status-inactive',
        4: 'erp-status-terminated',
        5: 'erp-status-terminated',
        6: 'erp-status-pending'
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
        1: 'erp-status-pending',
        2: 'erp-status-active',
        3: 'erp-status-terminated',
        4: 'erp-status-inactive'
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
        1: 'erp-status-pending',
        2: 'erp-status-pending',
        3: 'erp-status-active',
        4: 'erp-status-inactive',
        5: 'erp-status-active',
        6: 'erp-status-terminated',
        7: 'erp-status-inactive'
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
        1: 'erp-status-pending',
        2: 'erp-status-active',
        3: 'erp-status-terminated',
        4: 'erp-status-inactive'
    };

    // ============================================================================
    // STATUS RENDERERS (using shared factory)
    // ============================================================================

    const renderEnrollmentStatus = createStatusRenderer(ENROLLMENT_STATUS, ENROLLMENT_STATUS_CLASSES);
    const renderLifeEventStatus = createStatusRenderer(LIFE_EVENT_STATUS, LIFE_EVENT_STATUS_CLASSES);
    const renderCOBRAStatus = createStatusRenderer(COBRA_STATUS, COBRA_STATUS_CLASSES);
    const renderVerificationStatus = createStatusRenderer(VERIFICATION_STATUS, VERIFICATION_STATUS_CLASSES);

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    const BENEFITS_COLUMNS = {
        BenefitPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'planType',
                label: 'Type',
                sortKey: 'planType',
                filterKey: 'planType',
                enumValues: BENEFIT_PLAN_TYPE_VALUES,
                render: (item) => renderEnum(item.planType, BENEFIT_PLAN_TYPE)
            },
            {
                key: 'category',
                label: 'Category',
                sortKey: 'category',
                filterKey: 'category',
                enumValues: BENEFIT_PLAN_CATEGORY_VALUES,
                render: (item) => renderEnum(item.category, BENEFIT_PLAN_CATEGORY)
            },
            { key: 'planYear', label: 'Year', sortKey: 'planYear', filterKey: 'planYear' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        BenefitEnrollment: [
            { key: 'enrollmentId', label: 'ID', sortKey: 'enrollmentId', filterKey: 'enrollmentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'planId', label: 'Plan', sortKey: 'planId', filterKey: 'planId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: ENROLLMENT_STATUS_VALUES,
                render: (item) => renderEnrollmentStatus(item.status)
            },
            {
                key: 'reason',
                label: 'Reason',
                sortKey: 'reason',
                filterKey: 'reason',
                enumValues: ENROLLMENT_REASON_VALUES,
                render: (item) => renderEnum(item.reason, ENROLLMENT_REASON)
            },
            {
                key: 'coverageStartDate',
                label: 'Coverage Start',
                sortKey: 'coverageStartDate',
                render: (item) => renderDate(item.coverageStartDate)
            },
            {
                key: 'employeeCostPerPeriod',
                label: 'Employee Cost',
                sortKey: 'employeeCostPerPeriod',
                render: (item) => renderMoney(item.employeeCostPerPeriod)
            }
        ],

        Carrier: [
            { key: 'carrierId', label: 'ID', sortKey: 'carrierId', filterKey: 'carrierId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'carrierType',
                label: 'Type',
                sortKey: 'carrierType',
                filterKey: 'carrierType',
                enumValues: CARRIER_TYPE_VALUES,
                render: (item) => renderEnum(item.carrierType, CARRIER_TYPE)
            },
            { key: 'phone', label: 'Phone', sortKey: 'phone', filterKey: 'phone' },
            { key: 'website', label: 'Website', sortKey: 'website', filterKey: 'website' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        Dependent: [
            { key: 'dependentId', label: 'ID', sortKey: 'dependentId', filterKey: 'dependentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'name',
                label: 'Name',
                sortKey: 'lastName',
                filterKey: 'lastName',
                render: (item) => `${escapeHtml(item.firstName || '')} ${escapeHtml(item.lastName || '')}`.trim()
            },
            {
                key: 'relationship',
                label: 'Relationship',
                sortKey: 'relationship',
                filterKey: 'relationship',
                enumValues: DEPENDENT_RELATIONSHIP_VALUES,
                render: (item) => renderEnum(item.relationship, DEPENDENT_RELATIONSHIP)
            },
            {
                key: 'dateOfBirth',
                label: 'Date of Birth',
                sortKey: 'dateOfBirth',
                render: (item) => renderDate(item.dateOfBirth)
            },
            {
                key: 'verificationStatus',
                label: 'Verified',
                sortKey: 'verificationStatus',
                filterKey: 'verificationStatus',
                enumValues: VERIFICATION_STATUS_VALUES,
                render: (item) => renderVerificationStatus(item.verificationStatus)
            }
        ],

        LifeEvent: [
            { key: 'lifeEventId', label: 'ID', sortKey: 'lifeEventId', filterKey: 'lifeEventId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'eventType',
                label: 'Event Type',
                sortKey: 'eventType',
                filterKey: 'eventType',
                enumValues: LIFE_EVENT_TYPE_VALUES,
                render: (item) => renderEnum(item.eventType, LIFE_EVENT_TYPE)
            },
            {
                key: 'eventDate',
                label: 'Event Date',
                sortKey: 'eventDate',
                render: (item) => renderDate(item.eventDate)
            },
            {
                key: 'enrollmentDeadline',
                label: 'Deadline',
                sortKey: 'enrollmentDeadline',
                render: (item) => renderDate(item.enrollmentDeadline)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: LIFE_EVENT_STATUS_VALUES,
                render: (item) => renderLifeEventStatus(item.status)
            }
        ],

        COBRAEvent: [
            { key: 'cobraEventId', label: 'ID', sortKey: 'cobraEventId', filterKey: 'cobraEventId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'eventType',
                label: 'Event Type',
                sortKey: 'eventType',
                filterKey: 'eventType',
                enumValues: COBRA_EVENT_TYPE_VALUES,
                render: (item) => renderEnum(item.eventType, COBRA_EVENT_TYPE)
            },
            {
                key: 'qualifyingEventDate',
                label: 'Event Date',
                sortKey: 'qualifyingEventDate',
                render: (item) => renderDate(item.qualifyingEventDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: COBRA_STATUS_VALUES,
                render: (item) => renderCOBRAStatus(item.status)
            },
            { key: 'coverageMonths', label: 'Months', sortKey: 'coverageMonths' },
            {
                key: 'totalMonthlyCost',
                label: 'Monthly Cost',
                sortKey: 'totalMonthlyCost',
                render: (item) => renderMoney(item.totalMonthlyCost)
            }
        ]
    };

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const BENEFITS_FORMS = {
        BenefitPlan: {
            title: 'Benefit Plan',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'carrierId', label: 'Carrier', type: 'lookup', lookupModel: 'Carrier' },
                        { key: 'planType', label: 'Plan Type', type: 'select', options: BENEFIT_PLAN_TYPE, required: true },
                        { key: 'category', label: 'Category', type: 'select', options: BENEFIT_PLAN_CATEGORY, required: true },
                        { key: 'planYear', label: 'Plan Year', type: 'number', required: true }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'openEnrollmentStart', label: 'Open Enrollment Start', type: 'date' },
                        { key: 'openEnrollmentEnd', label: 'Open Enrollment End', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Documents',
                    fields: [
                        { key: 'planDocumentUrl', label: 'Plan Document URL', type: 'text' },
                        { key: 'summaryDocumentUrl', label: 'Summary Document URL', type: 'text' }
                    ]
                }
            ]
        },

        BenefitEnrollment: {
            title: 'Benefit Enrollment',
            sections: [
                {
                    title: 'Enrollment Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'planId', label: 'Benefit Plan', type: 'lookup', lookupModel: 'BenefitPlan', required: true },
                        { key: 'coverageOptionId', label: 'Coverage Option', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: ENROLLMENT_STATUS, required: true },
                        { key: 'reason', label: 'Reason', type: 'select', options: ENROLLMENT_REASON, required: true },
                        { key: 'lifeEventId', label: 'Life Event', type: 'lookup', lookupModel: 'LifeEvent' }
                    ]
                },
                {
                    title: 'Coverage Dates',
                    fields: [
                        { key: 'coverageStartDate', label: 'Coverage Start', type: 'date', required: true },
                        { key: 'coverageEndDate', label: 'Coverage End', type: 'date' },
                        { key: 'enrollmentDate', label: 'Enrollment Date', type: 'date' }
                    ]
                },
                {
                    title: 'Primary Care (Medical Plans)',
                    fields: [
                        { key: 'primaryCareProvider', label: 'Primary Care Provider', type: 'text' },
                        { key: 'primaryCareProviderId', label: 'Provider ID', type: 'text' }
                    ]
                }
            ]
        },

        Carrier: {
            title: 'Carrier',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'carrierType', label: 'Type', type: 'select', options: CARRIER_TYPE, required: true },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Contact Information',
                    fields: [
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'fax', label: 'Fax', type: 'text' },
                        { key: 'email', label: 'Email', type: 'text' },
                        { key: 'website', label: 'Website', type: 'text' },
                        { key: 'contactName', label: 'Contact Name', type: 'text' }
                    ]
                },
                {
                    title: 'Account Information',
                    fields: [
                        { key: 'employerGroupNumber', label: 'Employer Group Number', type: 'text' },
                        { key: 'billingAccountNumber', label: 'Billing Account Number', type: 'text' },
                        { key: 'ediPayerId', label: 'EDI Payer ID', type: 'text' }
                    ]
                }
            ]
        },

        Dependent: {
            title: 'Dependent',
            sections: [
                {
                    title: 'Personal Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'firstName', label: 'First Name', type: 'text', required: true },
                        { key: 'middleName', label: 'Middle Name', type: 'text' },
                        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                        { key: 'relationship', label: 'Relationship', type: 'select', options: DEPENDENT_RELATIONSHIP, required: true },
                        { key: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
                        { key: 'gender', label: 'Gender', type: 'select', options: { 0: 'Unspecified', 1: 'Male', 2: 'Female', 3: 'Non-Binary', 4: 'Other', 5: 'Prefer Not to Say' } }
                    ]
                },
                {
                    title: 'Additional Information',
                    fields: [
                        { key: 'isStudent', label: 'Student', type: 'checkbox' },
                        { key: 'isDisabled', label: 'Disabled', type: 'checkbox' },
                        { key: 'isTobaccoUser', label: 'Tobacco User', type: 'checkbox' },
                        { key: 'coverageEndDate', label: 'Coverage End Date', type: 'date' },
                        { key: 'verificationStatus', label: 'Verification Status', type: 'select', options: VERIFICATION_STATUS }
                    ]
                }
            ]
        },

        LifeEvent: {
            title: 'Life Event',
            sections: [
                {
                    title: 'Event Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'eventType', label: 'Event Type', type: 'select', options: LIFE_EVENT_TYPE, required: true },
                        { key: 'eventDate', label: 'Event Date', type: 'date', required: true },
                        { key: 'reportedDate', label: 'Reported Date', type: 'date' },
                        { key: 'enrollmentDeadline', label: 'Enrollment Deadline', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: LIFE_EVENT_STATUS, required: true },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                },
                {
                    title: 'Approval',
                    fields: [
                        { key: 'approvedBy', label: 'Approved By', type: 'text' },
                        { key: 'approvedDate', label: 'Approved Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        COBRAEvent: {
            title: 'COBRA Event',
            sections: [
                {
                    title: 'Event Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'eventType', label: 'Event Type', type: 'select', options: COBRA_EVENT_TYPE, required: true },
                        { key: 'qualifyingEventDate', label: 'Qualifying Event Date', type: 'date', required: true },
                        { key: 'notificationDate', label: 'Notification Date', type: 'date' },
                        { key: 'electionDeadline', label: 'Election Deadline', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: COBRA_STATUS, required: true }
                    ]
                },
                {
                    title: 'Coverage Period',
                    fields: [
                        { key: 'coverageStartDate', label: 'Coverage Start', type: 'date' },
                        { key: 'coverageEndDate', label: 'Coverage End', type: 'date' },
                        { key: 'coverageMonths', label: 'Coverage Months', type: 'number' }
                    ]
                },
                {
                    title: 'Premium Information',
                    fields: [
                        { key: 'adminFeePercentage', label: 'Admin Fee %', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    const BENEFITS_PRIMARY_KEYS = {
        BenefitPlan: 'planId',
        BenefitEnrollment: 'enrollmentId',
        Carrier: 'carrierId',
        Dependent: 'dependentId',
        LifeEvent: 'lifeEventId',
        COBRAEvent: 'cobraEventId'
    };

    // ============================================================================
    // EXPORTS
    // ============================================================================

    window.Benefits = {
        columns: BENEFITS_COLUMNS,
        forms: BENEFITS_FORMS,
        primaryKeys: BENEFITS_PRIMARY_KEYS,
        enums: {
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
        },
        render: {
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
        }
    };

})();
