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
// Talent Management Module - Enum Definitions and Render Functions
// Part 1 of 4 - Load this file first

(function() {
    'use strict';

    // Initialize Talent namespace
    window.Talent = window.Talent || {};

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
    // EXPORT ENUMS TO NAMESPACE
    // ============================================================================

    window.Talent.enums = {
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
    };

    window.Talent.render = {
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
    };

    // Export internal functions for use by other talent files
    window.Talent._internal = {
        renderRequisitionStatus,
        renderApplicationStatus,
        renderOnboardingTaskStatus,
        renderPerformanceReviewStatus,
        renderGoalStatus,
        renderSuccessionPlanStatus,
        renderFeedbackStatus,
        renderGoalPriority,
        renderRiskLevel,
        renderReadinessLevel,
        renderPercentage,
        renderRating,
        renderReviewPeriod
    };

})();
