// Talent Management Module - Column Configurations and Form Definitions
// Handles: PerformanceReview, Goal, Feedback, CareerPath, SuccessionPlan, JobRequisition, Applicant, Application, OnboardingTask

(function() {
    'use strict';

    // Import shared utilities
    const { escapeHtml, formatDate } = ERPUtils;
    const { renderEnum, createStatusRenderer, renderBoolean, renderDate, renderMoney } = ERPRenderers;

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const REQUISITION_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Pending Approval',
        3: 'Approved',
        4: 'Open',
        5: 'On Hold',
        6: 'Filled',
        7: 'Cancelled',
        8: 'Closed'
    };

    const REQUISITION_STATUS_VALUES = {
        'draft': 1,
        'pending': 2,
        'approval': 2,
        'approved': 3,
        'open': 4,
        'hold': 5,
        'filled': 6,
        'cancelled': 7,
        'closed': 8
    };

    const REQUISITION_STATUS_CLASSES = {
        1: 'erp-status-inactive',
        2: 'erp-status-pending',
        3: 'erp-status-active',
        4: 'erp-status-active',
        5: 'erp-status-pending',
        6: 'erp-status-active',
        7: 'erp-status-terminated',
        8: 'erp-status-inactive'
    };

    const REQUISITION_TYPE = {
        0: 'Unspecified',
        1: 'New Position',
        2: 'Replacement',
        3: 'Expansion',
        4: 'Temporary',
        5: 'Intern'
    };

    const REQUISITION_TYPE_VALUES = {
        'new': 1,
        'position': 1,
        'replacement': 2,
        'expansion': 3,
        'temporary': 4,
        'temp': 4,
        'intern': 5
    };

    const APPLICANT_SOURCE = {
        0: 'Unspecified',
        1: 'Career Site',
        2: 'LinkedIn',
        3: 'Indeed',
        4: 'Glassdoor',
        5: 'Referral',
        6: 'Agency',
        7: 'University',
        8: 'Job Fair',
        9: 'Internal',
        10: 'Other'
    };

    const APPLICANT_SOURCE_VALUES = {
        'career': 1,
        'site': 1,
        'linkedin': 2,
        'indeed': 3,
        'glassdoor': 4,
        'referral': 5,
        'agency': 6,
        'university': 7,
        'fair': 8,
        'internal': 9,
        'other': 10
    };

    const APPLICATION_STATUS = {
        0: 'Unspecified',
        1: 'New',
        2: 'In Review',
        3: 'Interviewing',
        4: 'Offer Pending',
        5: 'Offer Extended',
        6: 'Hired',
        7: 'Rejected',
        8: 'Withdrawn'
    };

    const APPLICATION_STATUS_VALUES = {
        'new': 1,
        'review': 2,
        'interviewing': 3,
        'offer': 4,
        'pending': 4,
        'extended': 5,
        'hired': 6,
        'rejected': 7,
        'withdrawn': 8
    };

    const APPLICATION_STATUS_CLASSES = {
        1: 'erp-status-pending',
        2: 'erp-status-pending',
        3: 'erp-status-active',
        4: 'erp-status-pending',
        5: 'erp-status-active',
        6: 'erp-status-active',
        7: 'erp-status-terminated',
        8: 'erp-status-inactive'
    };

    const APPLICATION_STAGE = {
        0: 'Unspecified',
        1: 'Screening',
        2: 'Phone Screen',
        3: 'Interview 1',
        4: 'Interview 2',
        5: 'Final Interview',
        6: 'Reference Check',
        7: 'Background Check',
        8: 'Offer',
        9: 'Closed'
    };

    const APPLICATION_STAGE_VALUES = {
        'screening': 1,
        'phone': 2,
        'interview1': 3,
        'interview2': 4,
        'final': 5,
        'reference': 6,
        'background': 7,
        'offer': 8,
        'closed': 9
    };

    const DISPOSITION_REASON = {
        0: 'Unspecified',
        1: 'Under Qualified',
        2: 'Over Qualified',
        3: 'Better Candidate',
        4: 'Compensation Mismatch',
        5: 'Failed Interview',
        6: 'Failed Background',
        7: 'Withdrew',
        8: 'Declined Offer',
        9: 'Position Filled',
        10: 'Position Cancelled',
        11: 'No Show'
    };

    const DISPOSITION_REASON_VALUES = {
        'under': 1,
        'qualified': 1,
        'over': 2,
        'better': 3,
        'compensation': 4,
        'failed': 5,
        'interview': 5,
        'background': 6,
        'withdrew': 7,
        'declined': 8,
        'filled': 9,
        'cancelled': 10,
        'noshow': 11
    };

    const ONBOARDING_TASK_CATEGORY = {
        0: 'Unspecified',
        1: 'Paperwork',
        2: 'IT Setup',
        3: 'Equipment',
        4: 'Training',
        5: 'Benefits',
        6: 'Compliance',
        7: 'Introduction',
        8: 'Orientation'
    };

    const ONBOARDING_TASK_CATEGORY_VALUES = {
        'paperwork': 1,
        'it': 2,
        'setup': 2,
        'equipment': 3,
        'training': 4,
        'benefits': 5,
        'compliance': 6,
        'introduction': 7,
        'orientation': 8
    };

    const TASK_OWNER = {
        0: 'Unspecified',
        1: 'Employee',
        2: 'Manager',
        3: 'HR',
        4: 'IT',
        5: 'Payroll',
        6: 'Facilities'
    };

    const TASK_OWNER_VALUES = {
        'employee': 1,
        'manager': 2,
        'hr': 3,
        'it': 4,
        'payroll': 5,
        'facilities': 6
    };

    const ONBOARDING_TASK_STATUS = {
        0: 'Unspecified',
        1: 'Not Started',
        2: 'In Progress',
        3: 'Completed',
        4: 'Skipped',
        5: 'Blocked'
    };

    const ONBOARDING_TASK_STATUS_VALUES = {
        'not': 1,
        'started': 1,
        'progress': 2,
        'completed': 3,
        'skipped': 4,
        'blocked': 5
    };

    const ONBOARDING_TASK_STATUS_CLASSES = {
        1: 'erp-status-inactive',
        2: 'erp-status-pending',
        3: 'erp-status-active',
        4: 'erp-status-inactive',
        5: 'erp-status-terminated'
    };

    const PERFORMANCE_REVIEW_STATUS = {
        0: 'Unspecified',
        1: 'Not Started',
        2: 'Self Review',
        3: 'Manager Review',
        4: 'Calibration',
        5: 'HR Review',
        6: 'Acknowledgment',
        7: 'Completed'
    };

    const PERFORMANCE_REVIEW_STATUS_VALUES = {
        'not': 1,
        'started': 1,
        'self': 2,
        'manager': 3,
        'calibration': 4,
        'hr': 5,
        'acknowledgment': 6,
        'completed': 7
    };

    const PERFORMANCE_REVIEW_STATUS_CLASSES = {
        1: 'erp-status-inactive',
        2: 'erp-status-pending',
        3: 'erp-status-pending',
        4: 'erp-status-pending',
        5: 'erp-status-pending',
        6: 'erp-status-pending',
        7: 'erp-status-active'
    };

    const REVIEW_TYPE = {
        0: 'Unspecified',
        1: 'Annual',
        2: 'Semi-Annual',
        3: 'Quarterly',
        4: 'Probationary',
        5: 'Project',
        6: 'Ad Hoc'
    };

    const REVIEW_TYPE_VALUES = {
        'annual': 1,
        'semi': 2,
        'quarterly': 3,
        'probationary': 4,
        'probation': 4,
        'project': 5,
        'adhoc': 6
    };

    const GOAL_TYPE = {
        0: 'Unspecified',
        1: 'Individual',
        2: 'Team',
        3: 'Department',
        4: 'Company'
    };

    const GOAL_TYPE_VALUES = {
        'individual': 1,
        'team': 2,
        'department': 3,
        'dept': 3,
        'company': 4
    };

    const GOAL_CATEGORY = {
        0: 'Unspecified',
        1: 'Performance',
        2: 'Development',
        3: 'Career',
        4: 'Project'
    };

    const GOAL_CATEGORY_VALUES = {
        'performance': 1,
        'development': 2,
        'career': 3,
        'project': 4
    };

    const GOAL_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Active',
        3: 'On Track',
        4: 'At Risk',
        5: 'Behind',
        6: 'Completed',
        7: 'Cancelled'
    };

    const GOAL_STATUS_VALUES = {
        'draft': 1,
        'active': 2,
        'track': 3,
        'risk': 4,
        'behind': 5,
        'completed': 6,
        'cancelled': 7
    };

    const GOAL_STATUS_CLASSES = {
        1: 'erp-status-inactive',
        2: 'erp-status-active',
        3: 'erp-status-active',
        4: 'erp-status-pending',
        5: 'erp-status-terminated',
        6: 'erp-status-active',
        7: 'erp-status-inactive'
    };

    const GOAL_PRIORITY = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };

    const GOAL_PRIORITY_VALUES = {
        'low': 1,
        'medium': 2,
        'med': 2,
        'high': 3,
        'critical': 4
    };

    const SUCCESSION_PLAN_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Active',
        3: 'On Hold',
        4: 'Closed'
    };

    const SUCCESSION_PLAN_STATUS_VALUES = {
        'draft': 1,
        'active': 2,
        'hold': 3,
        'closed': 4
    };

    const SUCCESSION_PLAN_STATUS_CLASSES = {
        1: 'erp-status-inactive',
        2: 'erp-status-active',
        3: 'erp-status-pending',
        4: 'erp-status-inactive'
    };

    const RISK_LEVEL = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };

    const RISK_LEVEL_VALUES = {
        'low': 1,
        'medium': 2,
        'med': 2,
        'high': 3,
        'critical': 4
    };

    const READINESS_LEVEL = {
        0: 'Unspecified',
        1: 'Ready Now',
        2: 'Ready in 1 Year',
        3: 'Ready in 2 Years',
        4: 'Ready in 3+ Years'
    };

    const READINESS_LEVEL_VALUES = {
        'now': 1,
        'ready': 1,
        '1': 2,
        '2': 3,
        '3': 4
    };

    const FEEDBACK_TYPE = {
        0: 'Unspecified',
        1: '360 Review',
        2: 'Peer',
        3: 'Upward',
        4: 'Continuous',
        5: 'Recognition'
    };

    const FEEDBACK_TYPE_VALUES = {
        '360': 1,
        'review': 1,
        'peer': 2,
        'upward': 3,
        'continuous': 4,
        'recognition': 5
    };

    const FEEDBACK_RELATIONSHIP = {
        0: 'Unspecified',
        1: 'Manager',
        2: 'Peer',
        3: 'Direct Report',
        4: 'Skip Level',
        5: 'Cross Functional',
        6: 'External'
    };

    const FEEDBACK_RELATIONSHIP_VALUES = {
        'manager': 1,
        'peer': 2,
        'direct': 3,
        'report': 3,
        'skip': 4,
        'cross': 5,
        'functional': 5,
        'external': 6
    };

    const FEEDBACK_STATUS = {
        0: 'Unspecified',
        1: 'Requested',
        2: 'In Progress',
        3: 'Submitted',
        4: 'Declined'
    };

    const FEEDBACK_STATUS_VALUES = {
        'requested': 1,
        'progress': 2,
        'submitted': 3,
        'declined': 4
    };

    const FEEDBACK_STATUS_CLASSES = {
        1: 'erp-status-pending',
        2: 'erp-status-pending',
        3: 'erp-status-active',
        4: 'erp-status-terminated'
    };

    // ============================================================================
    // STATUS RENDERERS (using shared factory)
    // ============================================================================

    const renderRequisitionStatus = createStatusRenderer(REQUISITION_STATUS, REQUISITION_STATUS_CLASSES);
    const renderApplicationStatus = createStatusRenderer(APPLICATION_STATUS, APPLICATION_STATUS_CLASSES);
    const renderOnboardingTaskStatus = createStatusRenderer(ONBOARDING_TASK_STATUS, ONBOARDING_TASK_STATUS_CLASSES);
    const renderPerformanceReviewStatus = createStatusRenderer(PERFORMANCE_REVIEW_STATUS, PERFORMANCE_REVIEW_STATUS_CLASSES);
    const renderGoalStatus = createStatusRenderer(GOAL_STATUS, GOAL_STATUS_CLASSES);
    const renderSuccessionPlanStatus = createStatusRenderer(SUCCESSION_PLAN_STATUS, SUCCESSION_PLAN_STATUS_CLASSES);
    const renderFeedbackStatus = createStatusRenderer(FEEDBACK_STATUS, FEEDBACK_STATUS_CLASSES);

    // ============================================================================
    // MODULE-SPECIFIC RENDER HELPERS
    // ============================================================================

    function renderGoalPriority(priority) {
        const priorityColors = {
            1: '#10b981',  // Low - green
            2: '#f59e0b',  // Medium - amber
            3: '#ef4444',  // High - red
            4: '#7c3aed'   // Critical - purple
        };
        const label = GOAL_PRIORITY[priority] || 'Unknown';
        const color = priorityColors[priority] || '#64748b';
        return `<span style="color: ${color}; font-weight: 500;">${escapeHtml(label)}</span>`;
    }

    function renderRiskLevel(risk) {
        const riskColors = {
            1: '#10b981',  // Low - green
            2: '#f59e0b',  // Medium - amber
            3: '#ef4444',  // High - red
            4: '#7c3aed'   // Critical - purple
        };
        const label = RISK_LEVEL[risk] || 'Unknown';
        const color = riskColors[risk] || '#64748b';
        return `<span style="color: ${color}; font-weight: 500;">${escapeHtml(label)}</span>`;
    }

    function renderReadinessLevel(readiness) {
        const readinessColors = {
            1: '#10b981',  // Ready Now - green
            2: '#22c55e',  // 1 Year - light green
            3: '#f59e0b',  // 2 Years - amber
            4: '#ef4444'   // 3+ Years - red
        };
        const label = READINESS_LEVEL[readiness] || 'Unknown';
        const color = readinessColors[readiness] || '#64748b';
        return `<span style="color: ${color}; font-weight: 500;">${escapeHtml(label)}</span>`;
    }

    function renderPercentage(value) {
        if (value === null || value === undefined) return '-';
        return `${value.toFixed(0)}%`;
    }

    function renderRating(rating, maxRating = 5) {
        if (rating === null || rating === undefined) return '-';
        return `${rating}/${maxRating}`;
    }

    function renderReviewPeriod(period) {
        if (!period) return '-';
        const start = period.startDate ? formatDate(period.startDate) : '?';
        const end = period.endDate ? formatDate(period.endDate) : '?';
        return `${start} - ${end}`;
    }

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    const TALENT_COLUMNS = {
        PerformanceReview: [
            { key: 'reviewId', label: 'ID', sortKey: 'reviewId', filterKey: 'reviewId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'reviewerId', label: 'Reviewer', sortKey: 'reviewerId', filterKey: 'reviewerId' },
            {
                key: 'reviewType',
                label: 'Type',
                sortKey: 'reviewType',
                filterKey: 'reviewType',
                enumValues: REVIEW_TYPE_VALUES,
                render: (item) => renderEnum(item.reviewType, REVIEW_TYPE)
            },
            {
                key: 'reviewPeriod',
                label: 'Period',
                render: (item) => renderReviewPeriod(item.reviewPeriod)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: PERFORMANCE_REVIEW_STATUS_VALUES,
                render: (item) => renderPerformanceReviewStatus(item.status)
            },
            {
                key: 'overallRating',
                label: 'Rating',
                sortKey: 'overallRating',
                render: (item) => renderRating(item.overallRating)
            }
        ],

        Goal: [
            { key: 'goalId', label: 'ID', sortKey: 'goalId', filterKey: 'goalId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            {
                key: 'goalType',
                label: 'Type',
                sortKey: 'goalType',
                filterKey: 'goalType',
                enumValues: GOAL_TYPE_VALUES,
                render: (item) => renderEnum(item.goalType, GOAL_TYPE)
            },
            {
                key: 'priority',
                label: 'Priority',
                sortKey: 'priority',
                filterKey: 'priority',
                enumValues: GOAL_PRIORITY_VALUES,
                render: (item) => renderGoalPriority(item.priority)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: GOAL_STATUS_VALUES,
                render: (item) => renderGoalStatus(item.status)
            },
            {
                key: 'completionPercentage',
                label: 'Progress',
                sortKey: 'completionPercentage',
                render: (item) => renderPercentage(item.completionPercentage)
            },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            }
        ],

        Feedback: [
            { key: 'feedbackId', label: 'ID', sortKey: 'feedbackId', filterKey: 'feedbackId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'providerId', label: 'Provider', sortKey: 'providerId', filterKey: 'providerId' },
            {
                key: 'feedbackType',
                label: 'Type',
                sortKey: 'feedbackType',
                filterKey: 'feedbackType',
                enumValues: FEEDBACK_TYPE_VALUES,
                render: (item) => renderEnum(item.feedbackType, FEEDBACK_TYPE)
            },
            {
                key: 'relationship',
                label: 'Relationship',
                sortKey: 'relationship',
                filterKey: 'relationship',
                enumValues: FEEDBACK_RELATIONSHIP_VALUES,
                render: (item) => renderEnum(item.relationship, FEEDBACK_RELATIONSHIP)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: FEEDBACK_STATUS_VALUES,
                render: (item) => renderFeedbackStatus(item.status)
            },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            }
        ],

        CareerPath: [
            { key: 'careerPathId', label: 'ID', sortKey: 'careerPathId', filterKey: 'careerPathId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'jobFamilyId', label: 'Job Family', sortKey: 'jobFamilyId', filterKey: 'jobFamilyId' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            {
                key: 'steps',
                label: 'Steps',
                render: (item) => item.steps ? item.steps.length : 0
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        SuccessionPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'positionId', label: 'Position', sortKey: 'positionId', filterKey: 'positionId' },
            { key: 'incumbentId', label: 'Incumbent', sortKey: 'incumbentId', filterKey: 'incumbentId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: SUCCESSION_PLAN_STATUS_VALUES,
                render: (item) => renderSuccessionPlanStatus(item.status)
            },
            {
                key: 'vacancyRisk',
                label: 'Vacancy Risk',
                sortKey: 'vacancyRisk',
                filterKey: 'vacancyRisk',
                enumValues: RISK_LEVEL_VALUES,
                render: (item) => renderRiskLevel(item.vacancyRisk)
            },
            {
                key: 'candidates',
                label: 'Candidates',
                render: (item) => item.candidates ? item.candidates.length : 0
            },
            {
                key: 'nextReviewDate',
                label: 'Next Review',
                sortKey: 'nextReviewDate',
                render: (item) => renderDate(item.nextReviewDate)
            }
        ],

        JobRequisition: [
            { key: 'requisitionId', label: 'ID', sortKey: 'requisitionId', filterKey: 'requisitionId' },
            { key: 'requisitionNumber', label: 'Req #', sortKey: 'requisitionNumber', filterKey: 'requisitionNumber' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            {
                key: 'requisitionType',
                label: 'Type',
                sortKey: 'requisitionType',
                filterKey: 'requisitionType',
                enumValues: REQUISITION_TYPE_VALUES,
                render: (item) => renderEnum(item.requisitionType, REQUISITION_TYPE)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: REQUISITION_STATUS_VALUES,
                render: (item) => renderRequisitionStatus(item.status)
            },
            { key: 'openings', label: 'Openings', sortKey: 'openings' },
            { key: 'applicantCount', label: 'Applicants', sortKey: 'applicantCount' },
            {
                key: 'targetStartDate',
                label: 'Target Start',
                sortKey: 'targetStartDate',
                render: (item) => renderDate(item.targetStartDate)
            }
        ],

        Applicant: [
            { key: 'applicantId', label: 'ID', sortKey: 'applicantId', filterKey: 'applicantId' },
            {
                key: 'name',
                label: 'Name',
                sortKey: 'lastName',
                filterKey: 'lastName',
                render: (item) => `${escapeHtml(item.firstName || '')} ${escapeHtml(item.lastName || '')}`.trim()
            },
            { key: 'email', label: 'Email', sortKey: 'email', filterKey: 'email' },
            { key: 'phone', label: 'Phone', sortKey: 'phone', filterKey: 'phone' },
            {
                key: 'source',
                label: 'Source',
                sortKey: 'source',
                filterKey: 'source',
                enumValues: APPLICANT_SOURCE_VALUES,
                render: (item) => renderEnum(item.source, APPLICANT_SOURCE)
            },
            {
                key: 'createdDate',
                label: 'Applied',
                sortKey: 'createdDate',
                render: (item) => renderDate(item.createdDate)
            }
        ],

        Application: [
            { key: 'applicationId', label: 'ID', sortKey: 'applicationId', filterKey: 'applicationId' },
            { key: 'applicantId', label: 'Applicant', sortKey: 'applicantId', filterKey: 'applicantId' },
            { key: 'requisitionId', label: 'Requisition', sortKey: 'requisitionId', filterKey: 'requisitionId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: APPLICATION_STATUS_VALUES,
                render: (item) => renderApplicationStatus(item.status)
            },
            {
                key: 'stage',
                label: 'Stage',
                sortKey: 'stage',
                filterKey: 'stage',
                enumValues: APPLICATION_STAGE_VALUES,
                render: (item) => renderEnum(item.stage, APPLICATION_STAGE)
            },
            {
                key: 'overallRating',
                label: 'Rating',
                sortKey: 'overallRating',
                render: (item) => renderRating(item.overallRating)
            },
            {
                key: 'appliedDate',
                label: 'Applied',
                sortKey: 'appliedDate',
                render: (item) => renderDate(item.appliedDate)
            }
        ],

        OnboardingTask: [
            { key: 'taskId', label: 'ID', sortKey: 'taskId', filterKey: 'taskId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'name', label: 'Task', sortKey: 'name', filterKey: 'name' },
            {
                key: 'category',
                label: 'Category',
                sortKey: 'category',
                filterKey: 'category',
                enumValues: ONBOARDING_TASK_CATEGORY_VALUES,
                render: (item) => renderEnum(item.category, ONBOARDING_TASK_CATEGORY)
            },
            {
                key: 'ownerType',
                label: 'Owner',
                sortKey: 'ownerType',
                filterKey: 'ownerType',
                enumValues: TASK_OWNER_VALUES,
                render: (item) => renderEnum(item.ownerType, TASK_OWNER)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: ONBOARDING_TASK_STATUS_VALUES,
                render: (item) => renderOnboardingTaskStatus(item.status)
            },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            }
        ]
    };

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const TALENT_FORMS = {
        PerformanceReview: {
            title: 'Performance Review',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'reviewerId', label: 'Reviewer', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'reviewType', label: 'Review Type', type: 'select', options: REVIEW_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: PERFORMANCE_REVIEW_STATUS, required: true }
                    ]
                },
                {
                    title: 'Review Period',
                    fields: [
                        { key: 'reviewPeriod.startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'reviewPeriod.endDate', label: 'End Date', type: 'date', required: true }
                    ]
                },
                {
                    title: 'Rating',
                    fields: [
                        { key: 'overallRating', label: 'Overall Rating (1-5)', type: 'number' },
                        { key: 'overallRatingLabel', label: 'Rating Label', type: 'text' }
                    ]
                },
                {
                    title: 'Comments',
                    fields: [
                        { key: 'employeeComments', label: 'Employee Comments', type: 'textarea' },
                        { key: 'managerComments', label: 'Manager Comments', type: 'textarea' },
                        { key: 'summary', label: 'Summary', type: 'textarea' },
                        { key: 'developmentPlan', label: 'Development Plan', type: 'textarea' }
                    ]
                }
            ]
        },

        Goal: {
            title: 'Goal',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'parentGoalId', label: 'Parent Goal', type: 'lookup', lookupModel: 'Goal' }
                    ]
                },
                {
                    title: 'Classification',
                    fields: [
                        { key: 'goalType', label: 'Goal Type', type: 'select', options: GOAL_TYPE, required: true },
                        { key: 'goalCategory', label: 'Category', type: 'select', options: GOAL_CATEGORY },
                        { key: 'priority', label: 'Priority', type: 'select', options: GOAL_PRIORITY },
                        { key: 'status', label: 'Status', type: 'select', options: GOAL_STATUS, required: true }
                    ]
                },
                {
                    title: 'Dates & Progress',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'completedDate', label: 'Completed Date', type: 'date' },
                        { key: 'completionPercentage', label: 'Completion %', type: 'number' },
                        { key: 'weight', label: 'Weight', type: 'number' }
                    ]
                }
            ]
        },

        Feedback: {
            title: 'Feedback',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee (Receiving)', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'providerId', label: 'Provider (Giving)', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'feedbackType', label: 'Feedback Type', type: 'select', options: FEEDBACK_TYPE, required: true },
                        { key: 'relationship', label: 'Relationship', type: 'select', options: FEEDBACK_RELATIONSHIP },
                        { key: 'status', label: 'Status', type: 'select', options: FEEDBACK_STATUS, required: true }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'requestedDate', label: 'Requested Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'submittedDate', label: 'Submitted Date', type: 'date' }
                    ]
                },
                {
                    title: 'Content',
                    fields: [
                        { key: 'generalComments', label: 'General Comments', type: 'textarea' },
                        { key: 'isAnonymous', label: 'Anonymous', type: 'checkbox' }
                    ]
                }
            ]
        },

        CareerPath: {
            title: 'Career Path',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'jobFamilyId', label: 'Job Family', type: 'lookup', lookupModel: 'JobFamily' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        SuccessionPlan: {
            title: 'Succession Plan',
            sections: [
                {
                    title: 'Position Information',
                    fields: [
                        { key: 'positionId', label: 'Position', type: 'lookup', lookupModel: 'Position', required: true },
                        { key: 'incumbentId', label: 'Current Incumbent', type: 'lookup', lookupModel: 'Employee' },
                        { key: 'status', label: 'Status', type: 'select', options: SUCCESSION_PLAN_STATUS, required: true }
                    ]
                },
                {
                    title: 'Risk Assessment',
                    fields: [
                        { key: 'vacancyRisk', label: 'Vacancy Risk', type: 'select', options: RISK_LEVEL },
                        { key: 'impactAssessment', label: 'Impact Assessment', type: 'textarea' }
                    ]
                },
                {
                    title: 'Review',
                    fields: [
                        { key: 'reviewDate', label: 'Review Date', type: 'date' },
                        { key: 'nextReviewDate', label: 'Next Review Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        JobRequisition: {
            title: 'Job Requisition',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'requisitionNumber', label: 'Requisition Number', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'requisitionType', label: 'Type', type: 'select', options: REQUISITION_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: REQUISITION_STATUS, required: true }
                    ]
                },
                {
                    title: 'Position Details',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'departmentId', label: 'Department', type: 'lookup', lookupModel: 'Department' },
                        { key: 'positionId', label: 'Position', type: 'lookup', lookupModel: 'Position' },
                        { key: 'jobId', label: 'Job', type: 'lookup', lookupModel: 'Job' },
                        { key: 'openings', label: 'Number of Openings', type: 'number', required: true },
                        { key: 'isRemote', label: 'Remote Position', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Hiring Team',
                    fields: [
                        { key: 'hiringManagerId', label: 'Hiring Manager', type: 'lookup', lookupModel: 'Employee' },
                        { key: 'recruiterId', label: 'Recruiter', type: 'lookup', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'targetStartDate', label: 'Target Start Date', type: 'date' },
                        { key: 'postedDate', label: 'Posted Date', type: 'date' },
                        { key: 'closeDate', label: 'Close Date', type: 'date' }
                    ]
                },
                {
                    title: 'Posting',
                    fields: [
                        { key: 'isPostedInternal', label: 'Posted Internal', type: 'checkbox' },
                        { key: 'isPostedExternal', label: 'Posted External', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        Applicant: {
            title: 'Applicant',
            sections: [
                {
                    title: 'Personal Information',
                    fields: [
                        { key: 'firstName', label: 'First Name', type: 'text', required: true },
                        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                        { key: 'email', label: 'Email', type: 'text', required: true },
                        { key: 'phone', label: 'Phone', type: 'text' }
                    ]
                },
                {
                    title: 'Source',
                    fields: [
                        { key: 'source', label: 'Source', type: 'select', options: APPLICANT_SOURCE },
                        { key: 'sourceDetails', label: 'Source Details', type: 'text' },
                        { key: 'referrerEmployeeId', label: 'Referrer', type: 'lookup', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Online Profiles',
                    fields: [
                        { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'text' },
                        { key: 'portfolioUrl', label: 'Portfolio URL', type: 'text' },
                        { key: 'resumeUrl', label: 'Resume URL', type: 'text' },
                        { key: 'coverLetterUrl', label: 'Cover Letter URL', type: 'text' }
                    ]
                }
            ]
        },

        Application: {
            title: 'Application',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'applicantId', label: 'Applicant', type: 'lookup', lookupModel: 'Applicant', required: true },
                        { key: 'requisitionId', label: 'Requisition', type: 'lookup', lookupModel: 'JobRequisition', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: APPLICATION_STATUS, required: true },
                        { key: 'stage', label: 'Stage', type: 'select', options: APPLICATION_STAGE }
                    ]
                },
                {
                    title: 'Screening',
                    fields: [
                        { key: 'screeningScore', label: 'Screening Score', type: 'number' },
                        { key: 'passedScreening', label: 'Passed Screening', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Rating & Disposition',
                    fields: [
                        { key: 'overallRating', label: 'Overall Rating', type: 'number' },
                        { key: 'dispositionReason', label: 'Disposition Reason', type: 'select', options: DISPOSITION_REASON },
                        { key: 'dispositionDate', label: 'Disposition Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        OnboardingTask: {
            title: 'Onboarding Task',
            sections: [
                {
                    title: 'Task Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'name', label: 'Task Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'select', options: ONBOARDING_TASK_CATEGORY, required: true }
                    ]
                },
                {
                    title: 'Assignment',
                    fields: [
                        { key: 'assignedTo', label: 'Assigned To', type: 'lookup', lookupModel: 'Employee' },
                        { key: 'ownerType', label: 'Owner Type', type: 'select', options: TASK_OWNER },
                        { key: 'status', label: 'Status', type: 'select', options: ONBOARDING_TASK_STATUS, required: true },
                        { key: 'sequenceOrder', label: 'Sequence Order', type: 'number' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'completedDate', label: 'Completed Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    const TALENT_PRIMARY_KEYS = {
        PerformanceReview: 'reviewId',
        Goal: 'goalId',
        Feedback: 'feedbackId',
        CareerPath: 'careerPathId',
        SuccessionPlan: 'planId',
        JobRequisition: 'requisitionId',
        Applicant: 'applicantId',
        Application: 'applicationId',
        OnboardingTask: 'taskId'
    };

    // ============================================================================
    // EXPORTS
    // ============================================================================

    window.Talent = {
        columns: TALENT_COLUMNS,
        forms: TALENT_FORMS,
        primaryKeys: TALENT_PRIMARY_KEYS,
        enums: {
            REQUISITION_STATUS,
            REQUISITION_STATUS_VALUES,
            REQUISITION_TYPE,
            REQUISITION_TYPE_VALUES,
            APPLICANT_SOURCE,
            APPLICANT_SOURCE_VALUES,
            APPLICATION_STATUS,
            APPLICATION_STATUS_VALUES,
            APPLICATION_STAGE,
            APPLICATION_STAGE_VALUES,
            DISPOSITION_REASON,
            DISPOSITION_REASON_VALUES,
            ONBOARDING_TASK_CATEGORY,
            ONBOARDING_TASK_CATEGORY_VALUES,
            TASK_OWNER,
            TASK_OWNER_VALUES,
            ONBOARDING_TASK_STATUS,
            ONBOARDING_TASK_STATUS_VALUES,
            PERFORMANCE_REVIEW_STATUS,
            PERFORMANCE_REVIEW_STATUS_VALUES,
            REVIEW_TYPE,
            REVIEW_TYPE_VALUES,
            GOAL_TYPE,
            GOAL_TYPE_VALUES,
            GOAL_CATEGORY,
            GOAL_CATEGORY_VALUES,
            GOAL_STATUS,
            GOAL_STATUS_VALUES,
            GOAL_PRIORITY,
            GOAL_PRIORITY_VALUES,
            SUCCESSION_PLAN_STATUS,
            SUCCESSION_PLAN_STATUS_VALUES,
            RISK_LEVEL,
            RISK_LEVEL_VALUES,
            READINESS_LEVEL,
            READINESS_LEVEL_VALUES,
            FEEDBACK_TYPE,
            FEEDBACK_TYPE_VALUES,
            FEEDBACK_RELATIONSHIP,
            FEEDBACK_RELATIONSHIP_VALUES,
            FEEDBACK_STATUS,
            FEEDBACK_STATUS_VALUES
        },
        render: {
            requisitionStatus: renderRequisitionStatus,
            requisitionType: (v) => renderEnum(v, REQUISITION_TYPE),
            applicantSource: (v) => renderEnum(v, APPLICANT_SOURCE),
            applicationStatus: renderApplicationStatus,
            applicationStage: (v) => renderEnum(v, APPLICATION_STAGE),
            dispositionReason: (v) => renderEnum(v, DISPOSITION_REASON),
            onboardingTaskCategory: (v) => renderEnum(v, ONBOARDING_TASK_CATEGORY),
            taskOwner: (v) => renderEnum(v, TASK_OWNER),
            onboardingTaskStatus: renderOnboardingTaskStatus,
            performanceReviewStatus: renderPerformanceReviewStatus,
            reviewType: (v) => renderEnum(v, REVIEW_TYPE),
            goalType: (v) => renderEnum(v, GOAL_TYPE),
            goalCategory: (v) => renderEnum(v, GOAL_CATEGORY),
            goalStatus: renderGoalStatus,
            goalPriority: renderGoalPriority,
            successionPlanStatus: renderSuccessionPlanStatus,
            riskLevel: renderRiskLevel,
            readinessLevel: renderReadinessLevel,
            feedbackType: (v) => renderEnum(v, FEEDBACK_TYPE),
            feedbackRelationship: (v) => renderEnum(v, FEEDBACK_RELATIONSHIP),
            feedbackStatus: renderFeedbackStatus,
            money: renderMoney,
            boolean: renderBoolean,
            date: renderDate,
            percentage: renderPercentage,
            rating: renderRating,
            period: renderReviewPeriod
        }
    };

})();
