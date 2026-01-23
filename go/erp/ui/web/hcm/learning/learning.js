// Learning Management Module - Column Configurations and Form Definitions
// Handles: Course, CourseSession, CourseEnrollment, Certification, EmployeeCertification, Skill, EmployeeSkill, TrainingRecord

(function() {
    'use strict';

    // Import shared utilities
    const { escapeHtml, formatDate, formatMoney } = ERPUtils;
    const { renderEnum, createStatusRenderer, renderBoolean, renderDate, renderMoney } = ERPRenderers;

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const COURSE_TYPE = {
        0: 'Unspecified',
        1: 'Training',
        2: 'Certification',
        3: 'Compliance',
        4: 'Onboarding',
        5: 'Leadership',
        6: 'Skills',
        7: 'Safety'
    };

    const COURSE_TYPE_VALUES = {
        'training': 1,
        'certification': 2,
        'compliance': 3,
        'onboarding': 4,
        'leadership': 5,
        'skills': 6,
        'safety': 7
    };

    const COURSE_DELIVERY_METHOD = {
        0: 'Unspecified',
        1: 'Instructor Led',
        2: 'Virtual ILT',
        3: 'E-Learning',
        4: 'Blended',
        5: 'On the Job',
        6: 'Self Study',
        7: 'Webinar'
    };

    const COURSE_DELIVERY_METHOD_VALUES = {
        'instructor': 1,
        'ilt': 1,
        'virtual': 2,
        'vilt': 2,
        'elearning': 3,
        'online': 3,
        'blended': 4,
        'otj': 5,
        'job': 5,
        'self': 6,
        'study': 6,
        'webinar': 7
    };

    const COURSE_CATEGORY = {
        0: 'Unspecified',
        1: 'Technical',
        2: 'Soft Skills',
        3: 'Leadership',
        4: 'Compliance',
        5: 'Safety',
        6: 'Product',
        7: 'Process',
        8: 'Tools'
    };

    const COURSE_CATEGORY_VALUES = {
        'technical': 1,
        'soft': 2,
        'skills': 2,
        'leadership': 3,
        'compliance': 4,
        'safety': 5,
        'product': 6,
        'process': 7,
        'tools': 8
    };

    const COURSE_LEVEL = {
        0: 'Unspecified',
        1: 'Beginner',
        2: 'Intermediate',
        3: 'Advanced',
        4: 'Expert'
    };

    const COURSE_LEVEL_VALUES = {
        'beginner': 1,
        'intermediate': 2,
        'advanced': 3,
        'expert': 4
    };

    const SESSION_STATUS = {
        0: 'Unspecified',
        1: 'Scheduled',
        2: 'Open',
        3: 'Full',
        4: 'In Progress',
        5: 'Completed',
        6: 'Cancelled'
    };

    const SESSION_STATUS_VALUES = {
        'scheduled': 1,
        'open': 2,
        'full': 3,
        'progress': 4,
        'completed': 5,
        'cancelled': 6
    };

    const SESSION_STATUS_CLASSES = {
        1: 'erp-status-pending',     // Scheduled
        2: 'erp-status-active',      // Open
        3: 'erp-status-pending',     // Full
        4: 'erp-status-active',      // In Progress
        5: 'erp-status-active',      // Completed
        6: 'erp-status-terminated'   // Cancelled
    };

    const COURSE_ENROLLMENT_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Active',
        3: 'Completed',
        4: 'Failed',
        5: 'Cancelled',
        6: 'Waitlisted'
    };

    const COURSE_ENROLLMENT_STATUS_VALUES = {
        'pending': 1,
        'active': 2,
        'completed': 3,
        'failed': 4,
        'cancelled': 5,
        'waitlisted': 6,
        'waitlist': 6
    };

    const COURSE_ENROLLMENT_STATUS_CLASSES = {
        1: 'erp-status-pending',     // Pending
        2: 'erp-status-active',      // Active
        3: 'erp-status-active',      // Completed
        4: 'erp-status-terminated',  // Failed
        5: 'erp-status-terminated',  // Cancelled
        6: 'erp-status-pending'      // Waitlisted
    };

    const CERTIFICATION_TYPE = {
        0: 'Unspecified',
        1: 'Professional',
        2: 'Technical',
        3: 'Industry',
        4: 'Vendor',
        5: 'Government',
        6: 'Internal'
    };

    const CERTIFICATION_TYPE_VALUES = {
        'professional': 1,
        'technical': 2,
        'industry': 3,
        'vendor': 4,
        'government': 5,
        'internal': 6
    };

    const CERTIFICATION_STATUS = {
        0: 'Unspecified',
        1: 'In Progress',
        2: 'Active',
        3: 'Expired',
        4: 'Revoked',
        5: 'Pending Renewal'
    };

    const CERTIFICATION_STATUS_VALUES = {
        'progress': 1,
        'active': 2,
        'expired': 3,
        'revoked': 4,
        'pending': 5,
        'renewal': 5
    };

    const CERTIFICATION_STATUS_CLASSES = {
        1: 'erp-status-pending',     // In Progress
        2: 'erp-status-active',      // Active
        3: 'erp-status-terminated',  // Expired
        4: 'erp-status-terminated',  // Revoked
        5: 'erp-status-pending'      // Pending Renewal
    };

    const SKILL_CATEGORY = {
        0: 'Unspecified',
        1: 'Technical',
        2: 'Soft Skill',
        3: 'Leadership',
        4: 'Language',
        5: 'Tool',
        6: 'Domain',
        7: 'Certification'
    };

    const SKILL_CATEGORY_VALUES = {
        'technical': 1,
        'soft': 2,
        'leadership': 3,
        'language': 4,
        'tool': 5,
        'domain': 6,
        'certification': 7
    };

    const TRAINING_TYPE = {
        0: 'Unspecified',
        1: 'Compliance',
        2: 'Safety',
        3: 'Security',
        4: 'Harassment',
        5: 'Diversity',
        6: 'Ethics',
        7: 'HIPAA',
        8: 'GDPR',
        9: 'SOX'
    };

    const TRAINING_TYPE_VALUES = {
        'compliance': 1,
        'safety': 2,
        'security': 3,
        'harassment': 4,
        'diversity': 5,
        'ethics': 6,
        'hipaa': 7,
        'gdpr': 8,
        'sox': 9
    };

    // ============================================================================
    // STATUS RENDERERS (using factory)
    // ============================================================================

    const renderSessionStatus = createStatusRenderer(SESSION_STATUS, SESSION_STATUS_CLASSES);
    const renderCourseEnrollmentStatus = createStatusRenderer(COURSE_ENROLLMENT_STATUS, COURSE_ENROLLMENT_STATUS_CLASSES);
    const renderCertificationStatus = createStatusRenderer(CERTIFICATION_STATUS, CERTIFICATION_STATUS_CLASSES);

    // ============================================================================
    // MODULE-SPECIFIC RENDERERS
    // ============================================================================

    function renderCourseType(type) {
        return renderEnum(type, COURSE_TYPE);
    }

    function renderCourseDeliveryMethod(method) {
        const methodIcons = {
            1: '👨‍🏫',  // Instructor Led
            2: '💻',  // Virtual ILT
            3: '🖥️',  // E-Learning
            4: '🔄',  // Blended
            5: '🏢',  // On the Job
            6: '📖',  // Self Study
            7: '🎥'   // Webinar
        };
        const label = COURSE_DELIVERY_METHOD[method] || 'Unknown';
        const icon = methodIcons[method] || '';
        return icon ? `${icon} ${escapeHtml(label)}` : escapeHtml(label);
    }

    function renderCourseCategory(cat) {
        return renderEnum(cat, COURSE_CATEGORY);
    }

    function renderCourseLevel(level) {
        const levelColors = {
            1: '#10b981',  // Beginner - green
            2: '#3b82f6',  // Intermediate - blue
            3: '#f59e0b',  // Advanced - amber
            4: '#7c3aed'   // Expert - purple
        };
        const label = COURSE_LEVEL[level] || 'Unknown';
        const color = levelColors[level] || '#64748b';
        return `<span style="color: ${color}; font-weight: 500;">${escapeHtml(label)}</span>`;
    }

    function renderCertificationType(type) {
        return renderEnum(type, CERTIFICATION_TYPE);
    }

    function renderSkillCategory(cat) {
        return renderEnum(cat, SKILL_CATEGORY);
    }

    function renderTrainingType(type) {
        return renderEnum(type, TRAINING_TYPE);
    }

    function renderDurationMinutes(minutes) {
        if (!minutes) return '-';
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }

    function renderPercentageLearning(value) {
        if (value === null || value === undefined) return '-';
        return `${value.toFixed(0)}%`;
    }

    function renderProficiencyLevel(level) {
        if (!level) return '-';
        const stars = '★'.repeat(level) + '☆'.repeat(5 - level);
        return `<span title="Level ${level}/5">${stars}</span>`;
    }

    function renderRatingLearning(rating, maxRating = 5) {
        if (rating === null || rating === undefined) return '-';
        return `${rating.toFixed(1)}/${maxRating}`;
    }

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    const LEARNING_COLUMNS = {
        Course: [
            { key: 'courseId', label: 'ID', sortKey: 'courseId', filterKey: 'courseId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            {
                key: 'courseType',
                label: 'Type',
                sortKey: 'courseType',
                filterKey: 'courseType',
                enumValues: COURSE_TYPE_VALUES,
                render: (item) => renderCourseType(item.courseType)
            },
            {
                key: 'deliveryMethod',
                label: 'Delivery',
                sortKey: 'deliveryMethod',
                filterKey: 'deliveryMethod',
                enumValues: COURSE_DELIVERY_METHOD_VALUES,
                render: (item) => renderCourseDeliveryMethod(item.deliveryMethod)
            },
            {
                key: 'level',
                label: 'Level',
                sortKey: 'level',
                filterKey: 'level',
                enumValues: COURSE_LEVEL_VALUES,
                render: (item) => renderCourseLevel(item.level)
            },
            {
                key: 'durationMinutes',
                label: 'Duration',
                sortKey: 'durationMinutes',
                render: (item) => renderDurationMinutes(item.durationMinutes)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        CourseSession: [
            { key: 'sessionId', label: 'ID', sortKey: 'sessionId', filterKey: 'sessionId' },
            { key: 'courseId', label: 'Course', sortKey: 'courseId', filterKey: 'courseId' },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End Date',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            { key: 'instructorName', label: 'Instructor', sortKey: 'instructorName', filterKey: 'instructorName' },
            { key: 'location', label: 'Location', sortKey: 'location', filterKey: 'location' },
            {
                key: 'enrollment',
                label: 'Enrolled',
                render: (item) => `${item.enrolledCount || 0}/${item.maxEnrollees || '-'}`
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: SESSION_STATUS_VALUES,
                render: (item) => renderSessionStatus(item.status)
            }
        ],

        CourseEnrollment: [
            { key: 'enrollmentId', label: 'ID', sortKey: 'enrollmentId', filterKey: 'enrollmentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'courseId', label: 'Course', sortKey: 'courseId', filterKey: 'courseId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: COURSE_ENROLLMENT_STATUS_VALUES,
                render: (item) => renderCourseEnrollmentStatus(item.status)
            },
            {
                key: 'progressPercentage',
                label: 'Progress',
                sortKey: 'progressPercentage',
                render: (item) => renderPercentageLearning(item.progressPercentage)
            },
            { key: 'score', label: 'Score', sortKey: 'score' },
            {
                key: 'passed',
                label: 'Passed',
                sortKey: 'passed',
                render: (item) => renderBoolean(item.passed, { trueText: 'Pass', falseText: 'Fail' })
            },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            }
        ],

        Certification: [
            { key: 'certificationId', label: 'ID', sortKey: 'certificationId', filterKey: 'certificationId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'issuingOrganization', label: 'Issuer', sortKey: 'issuingOrganization', filterKey: 'issuingOrganization' },
            {
                key: 'certificationType',
                label: 'Type',
                sortKey: 'certificationType',
                filterKey: 'certificationType',
                enumValues: CERTIFICATION_TYPE_VALUES,
                render: (item) => renderCertificationType(item.certificationType)
            },
            { key: 'validityMonths', label: 'Validity (mo)', sortKey: 'validityMonths' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        EmployeeCertification: [
            { key: 'employeeCertificationId', label: 'ID', sortKey: 'employeeCertificationId', filterKey: 'employeeCertificationId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'certificationId', label: 'Certification', sortKey: 'certificationId', filterKey: 'certificationId' },
            { key: 'certificationNumber', label: 'Cert #', sortKey: 'certificationNumber', filterKey: 'certificationNumber' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: CERTIFICATION_STATUS_VALUES,
                render: (item) => renderCertificationStatus(item.status)
            },
            {
                key: 'issueDate',
                label: 'Issue Date',
                sortKey: 'issueDate',
                render: (item) => renderDate(item.issueDate)
            },
            {
                key: 'expirationDate',
                label: 'Expiration',
                sortKey: 'expirationDate',
                render: (item) => renderDate(item.expirationDate)
            },
            {
                key: 'isVerified',
                label: 'Verified',
                sortKey: 'isVerified',
                render: (item) => renderBoolean(item.isVerified)
            }
        ],

        Skill: [
            { key: 'skillId', label: 'ID', sortKey: 'skillId', filterKey: 'skillId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'category',
                label: 'Category',
                sortKey: 'category',
                filterKey: 'category',
                enumValues: SKILL_CATEGORY_VALUES,
                render: (item) => renderSkillCategory(item.category)
            },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        EmployeeSkill: [
            { key: 'employeeSkillId', label: 'ID', sortKey: 'employeeSkillId', filterKey: 'employeeSkillId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'skillId', label: 'Skill', sortKey: 'skillId', filterKey: 'skillId' },
            {
                key: 'proficiencyLevel',
                label: 'Proficiency',
                sortKey: 'proficiencyLevel',
                render: (item) => renderProficiencyLevel(item.proficiencyLevel)
            },
            { key: 'yearsOfExperience', label: 'Years Exp.', sortKey: 'yearsOfExperience' },
            {
                key: 'isPrimarySkill',
                label: 'Primary',
                sortKey: 'isPrimarySkill',
                render: (item) => renderBoolean(item.isPrimarySkill)
            },
            {
                key: 'lastUsedDate',
                label: 'Last Used',
                sortKey: 'lastUsedDate',
                render: (item) => renderDate(item.lastUsedDate)
            }
        ],

        TrainingRecord: [
            { key: 'recordId', label: 'ID', sortKey: 'recordId', filterKey: 'recordId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'trainingName', label: 'Training', sortKey: 'trainingName', filterKey: 'trainingName' },
            {
                key: 'trainingType',
                label: 'Type',
                sortKey: 'trainingType',
                filterKey: 'trainingType',
                enumValues: TRAINING_TYPE_VALUES,
                render: (item) => renderTrainingType(item.trainingType)
            },
            {
                key: 'completedDate',
                label: 'Completed',
                sortKey: 'completedDate',
                render: (item) => renderDate(item.completedDate)
            },
            {
                key: 'expirationDate',
                label: 'Expiration',
                sortKey: 'expirationDate',
                render: (item) => renderDate(item.expirationDate)
            },
            {
                key: 'passed',
                label: 'Passed',
                sortKey: 'passed',
                render: (item) => renderBoolean(item.passed, { trueText: 'Pass', falseText: 'Fail' })
            },
            {
                key: 'isCompliant',
                label: 'Compliant',
                sortKey: 'isCompliant',
                render: (item) => renderBoolean(item.isCompliant)
            }
        ]
    };

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const LEARNING_FORMS = {
        Course: {
            title: 'Course',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'learningObjectives', label: 'Learning Objectives', type: 'textarea' }
                    ]
                },
                {
                    title: 'Course Details',
                    fields: [
                        { key: 'courseType', label: 'Course Type', type: 'select', options: COURSE_TYPE, required: true },
                        { key: 'deliveryMethod', label: 'Delivery Method', type: 'select', options: COURSE_DELIVERY_METHOD },
                        { key: 'category', label: 'Category', type: 'select', options: COURSE_CATEGORY },
                        { key: 'level', label: 'Level', type: 'select', options: COURSE_LEVEL },
                        { key: 'provider', label: 'Provider', type: 'text' },
                        { key: 'instructorId', label: 'Instructor', type: 'lookup', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Duration & Credits',
                    fields: [
                        { key: 'durationMinutes', label: 'Duration (minutes)', type: 'number' },
                        { key: 'credits', label: 'Credits', type: 'number' },
                        { key: 'ceuCredits', label: 'CEU Credits', type: 'number' },
                        { key: 'maxEnrollees', label: 'Max Enrollees', type: 'number' },
                        { key: 'isSelfPaced', label: 'Self-Paced', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Compliance',
                    fields: [
                        { key: 'isMandatory', label: 'Mandatory', type: 'checkbox' },
                        { key: 'recertificationMonths', label: 'Recertification (months)', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Resources',
                    fields: [
                        { key: 'syllabusUrl', label: 'Syllabus URL', type: 'text' },
                        { key: 'contentUrl', label: 'Content URL', type: 'text' }
                    ]
                }
            ]
        },

        CourseSession: {
            title: 'Course Session',
            sections: [
                {
                    title: 'Session Details',
                    fields: [
                        { key: 'courseId', label: 'Course', type: 'lookup', lookupModel: 'Course', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: SESSION_STATUS, required: true },
                        { key: 'instructorId', label: 'Instructor', type: 'lookup', lookupModel: 'Employee' },
                        { key: 'instructorName', label: 'Instructor Name', type: 'text' }
                    ]
                },
                {
                    title: 'Schedule',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' }
                    ]
                },
                {
                    title: 'Location',
                    fields: [
                        { key: 'location', label: 'Location', type: 'text' },
                        { key: 'virtualLink', label: 'Virtual Link', type: 'text' }
                    ]
                },
                {
                    title: 'Capacity',
                    fields: [
                        { key: 'maxEnrollees', label: 'Max Enrollees', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        CourseEnrollment: {
            title: 'Course Enrollment',
            sections: [
                {
                    title: 'Enrollment Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'courseId', label: 'Course', type: 'lookup', lookupModel: 'Course', required: true },
                        { key: 'sessionId', label: 'Session', type: 'lookup', lookupModel: 'CourseSession' },
                        { key: 'status', label: 'Status', type: 'select', options: COURSE_ENROLLMENT_STATUS, required: true },
                        { key: 'managerId', label: 'Manager', type: 'lookup', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'enrolledDate', label: 'Enrolled Date', type: 'date' },
                        { key: 'startedDate', label: 'Started Date', type: 'date' },
                        { key: 'completedDate', label: 'Completed Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' }
                    ]
                },
                {
                    title: 'Progress & Results',
                    fields: [
                        { key: 'progressPercentage', label: 'Progress %', type: 'number' },
                        { key: 'score', label: 'Score', type: 'number' },
                        { key: 'passed', label: 'Passed', type: 'checkbox' },
                        { key: 'attempts', label: 'Attempts', type: 'number' }
                    ]
                },
                {
                    title: 'Feedback',
                    fields: [
                        { key: 'employeeRating', label: 'Employee Rating (1-5)', type: 'number' },
                        { key: 'employeeFeedback', label: 'Employee Feedback', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        Certification: {
            title: 'Certification',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'issuingOrganization', label: 'Issuing Organization', type: 'text' },
                        { key: 'certificationType', label: 'Type', type: 'select', options: CERTIFICATION_TYPE, required: true }
                    ]
                },
                {
                    title: 'Requirements',
                    fields: [
                        { key: 'requiredExperienceMonths', label: 'Required Experience (months)', type: 'number' },
                        { key: 'requiredCeuCredits', label: 'Required CEU Credits', type: 'number' }
                    ]
                },
                {
                    title: 'Renewal',
                    fields: [
                        { key: 'validityMonths', label: 'Validity (months)', type: 'number' },
                        { key: 'requiresRenewal', label: 'Requires Renewal', type: 'checkbox' },
                        { key: 'examUrl', label: 'Exam URL', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        EmployeeCertification: {
            title: 'Employee Certification',
            sections: [
                {
                    title: 'Certification Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'certificationId', label: 'Certification', type: 'lookup', lookupModel: 'Certification', required: true },
                        { key: 'certificationNumber', label: 'Certification Number', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: CERTIFICATION_STATUS, required: true }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'issueDate', label: 'Issue Date', type: 'date', required: true },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' }
                    ]
                },
                {
                    title: 'Verification',
                    fields: [
                        { key: 'isVerified', label: 'Verified', type: 'checkbox' },
                        { key: 'verifiedBy', label: 'Verified By', type: 'text' },
                        { key: 'verifiedDate', label: 'Verified Date', type: 'date' },
                        { key: 'documentId', label: 'Document ID', type: 'text' },
                        { key: 'ceuCreditsEarned', label: 'CEU Credits Earned', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        Skill: {
            title: 'Skill',
            sections: [
                {
                    title: 'Skill Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'select', options: SKILL_CATEGORY, required: true },
                        { key: 'skillGroupId', label: 'Skill Group ID', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        EmployeeSkill: {
            title: 'Employee Skill',
            sections: [
                {
                    title: 'Skill Assignment',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'skillId', label: 'Skill', type: 'lookup', lookupModel: 'Skill', required: true }
                    ]
                },
                {
                    title: 'Proficiency',
                    fields: [
                        { key: 'proficiencyLevel', label: 'Proficiency Level (1-5)', type: 'number', required: true },
                        { key: 'selfAssessedLevel', label: 'Self-Assessed Level', type: 'number' },
                        { key: 'managerAssessedLevel', label: 'Manager-Assessed Level', type: 'number' },
                        { key: 'yearsOfExperience', label: 'Years of Experience', type: 'number' }
                    ]
                },
                {
                    title: 'Assessment',
                    fields: [
                        { key: 'lastUsedDate', label: 'Last Used Date', type: 'date' },
                        { key: 'assessmentDate', label: 'Assessment Date', type: 'date' },
                        { key: 'assessedBy', label: 'Assessed By', type: 'text' },
                        { key: 'isPrimarySkill', label: 'Primary Skill', type: 'checkbox' },
                        { key: 'wantsToDevelop', label: 'Wants to Develop', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        TrainingRecord: {
            title: 'Training Record',
            sections: [
                {
                    title: 'Training Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'courseId', label: 'Course', type: 'lookup', lookupModel: 'Course' },
                        { key: 'trainingName', label: 'Training Name', type: 'text', required: true },
                        { key: 'trainingType', label: 'Training Type', type: 'select', options: TRAINING_TYPE, required: true }
                    ]
                },
                {
                    title: 'Completion',
                    fields: [
                        { key: 'completedDate', label: 'Completed Date', type: 'date', required: true },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' },
                        { key: 'score', label: 'Score', type: 'number' },
                        { key: 'passed', label: 'Passed', type: 'checkbox' },
                        { key: 'hours', label: 'Hours', type: 'number' }
                    ]
                },
                {
                    title: 'Compliance',
                    fields: [
                        { key: 'isCompliant', label: 'Compliant', type: 'checkbox' },
                        { key: 'complianceRequirement', label: 'Compliance Requirement', type: 'text' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'trainerName', label: 'Trainer Name', type: 'text' },
                        { key: 'location', label: 'Location', type: 'text' },
                        { key: 'certificateId', label: 'Certificate ID', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    const LEARNING_PRIMARY_KEYS = {
        Course: 'courseId',
        CourseSession: 'sessionId',
        CourseEnrollment: 'enrollmentId',
        Certification: 'certificationId',
        EmployeeCertification: 'employeeCertificationId',
        Skill: 'skillId',
        EmployeeSkill: 'employeeSkillId',
        TrainingRecord: 'recordId'
    };

    // ============================================================================
    // EXPORTS
    // ============================================================================

    window.Learning = {
        columns: LEARNING_COLUMNS,
        forms: LEARNING_FORMS,
        primaryKeys: LEARNING_PRIMARY_KEYS,
        enums: {
            COURSE_TYPE,
            COURSE_TYPE_VALUES,
            COURSE_DELIVERY_METHOD,
            COURSE_DELIVERY_METHOD_VALUES,
            COURSE_CATEGORY,
            COURSE_CATEGORY_VALUES,
            COURSE_LEVEL,
            COURSE_LEVEL_VALUES,
            SESSION_STATUS,
            SESSION_STATUS_VALUES,
            COURSE_ENROLLMENT_STATUS,
            COURSE_ENROLLMENT_STATUS_VALUES,
            CERTIFICATION_TYPE,
            CERTIFICATION_TYPE_VALUES,
            CERTIFICATION_STATUS,
            CERTIFICATION_STATUS_VALUES,
            SKILL_CATEGORY,
            SKILL_CATEGORY_VALUES,
            TRAINING_TYPE,
            TRAINING_TYPE_VALUES
        },
        render: {
            courseType: renderCourseType,
            courseDeliveryMethod: renderCourseDeliveryMethod,
            courseCategory: renderCourseCategory,
            courseLevel: renderCourseLevel,
            sessionStatus: renderSessionStatus,
            courseEnrollmentStatus: renderCourseEnrollmentStatus,
            certificationType: renderCertificationType,
            certificationStatus: renderCertificationStatus,
            skillCategory: renderSkillCategory,
            trainingType: renderTrainingType,
            money: renderMoney,
            boolean: renderBoolean,
            date: renderDate,
            duration: renderDurationMinutes,
            percentage: renderPercentageLearning,
            proficiency: renderProficiencyLevel,
            rating: renderRatingLearning
        }
    };

})();
