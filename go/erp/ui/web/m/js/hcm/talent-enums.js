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
 * Mobile Talent Management Module - Enum Definitions
 * Desktop Equivalent: hcm/talent/talent-enums.js
 */
(function() {
    'use strict';

    window.MobileTalent = window.MobileTalent || {};
    MobileTalent.enums = {};

    // ============================================================================
    // REQUISITION
    // ============================================================================

    MobileTalent.enums.REQUISITION_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Pending Approval', 3: 'Approved',
        4: 'Open', 5: 'On Hold', 6: 'Filled', 7: 'Cancelled', 8: 'Closed'
    };
    MobileTalent.enums.REQUISITION_STATUS_VALUES = {
        'draft': 1, 'pending': 2, 'approval': 2, 'approved': 3, 'open': 4,
        'hold': 5, 'filled': 6, 'cancelled': 7, 'closed': 8
    };
    MobileTalent.enums.REQUISITION_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active', 4: 'status-active',
        5: 'status-pending', 6: 'status-active', 7: 'status-terminated', 8: 'status-inactive'
    };

    MobileTalent.enums.REQUISITION_TYPE = {
        0: 'Unspecified', 1: 'New Position', 2: 'Replacement', 3: 'Expansion', 4: 'Temporary', 5: 'Intern'
    };
    MobileTalent.enums.REQUISITION_TYPE_VALUES = {
        'new': 1, 'position': 1, 'replacement': 2, 'expansion': 3, 'temporary': 4, 'temp': 4, 'intern': 5
    };

    // ============================================================================
    // APPLICANT & APPLICATION
    // ============================================================================

    MobileTalent.enums.APPLICANT_SOURCE = {
        0: 'Unspecified', 1: 'Career Site', 2: 'LinkedIn', 3: 'Indeed', 4: 'Glassdoor',
        5: 'Referral', 6: 'Agency', 7: 'University', 8: 'Job Fair', 9: 'Internal', 10: 'Other'
    };
    MobileTalent.enums.APPLICANT_SOURCE_VALUES = {
        'career': 1, 'site': 1, 'linkedin': 2, 'indeed': 3, 'glassdoor': 4, 'referral': 5,
        'agency': 6, 'university': 7, 'fair': 8, 'internal': 9, 'other': 10
    };

    MobileTalent.enums.APPLICATION_STATUS = {
        0: 'Unspecified', 1: 'New', 2: 'In Review', 3: 'Interviewing', 4: 'Offer Pending',
        5: 'Offer Extended', 6: 'Hired', 7: 'Rejected', 8: 'Withdrawn'
    };
    MobileTalent.enums.APPLICATION_STATUS_VALUES = {
        'new': 1, 'review': 2, 'interviewing': 3, 'offer': 4, 'pending': 4,
        'extended': 5, 'hired': 6, 'rejected': 7, 'withdrawn': 8
    };
    MobileTalent.enums.APPLICATION_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-pending',
        5: 'status-active', 6: 'status-active', 7: 'status-terminated', 8: 'status-inactive'
    };

    MobileTalent.enums.APPLICATION_STAGE = {
        0: 'Unspecified', 1: 'Screening', 2: 'Phone Screen', 3: 'Interview 1', 4: 'Interview 2',
        5: 'Final Interview', 6: 'Reference Check', 7: 'Background Check', 8: 'Offer', 9: 'Closed'
    };
    MobileTalent.enums.APPLICATION_STAGE_VALUES = {
        'screening': 1, 'phone': 2, 'interview1': 3, 'interview2': 4, 'final': 5,
        'reference': 6, 'background': 7, 'offer': 8, 'closed': 9
    };

    MobileTalent.enums.DISPOSITION_REASON = {
        0: 'Unspecified', 1: 'Under Qualified', 2: 'Over Qualified', 3: 'Better Candidate',
        4: 'Compensation Mismatch', 5: 'Failed Interview', 6: 'Failed Background', 7: 'Withdrew',
        8: 'Declined Offer', 9: 'Position Filled', 10: 'Position Cancelled', 11: 'No Show'
    };
    MobileTalent.enums.DISPOSITION_REASON_VALUES = {
        'under': 1, 'qualified': 1, 'over': 2, 'better': 3, 'compensation': 4, 'failed': 5,
        'interview': 5, 'background': 6, 'withdrew': 7, 'declined': 8, 'filled': 9, 'cancelled': 10, 'noshow': 11
    };

    // ============================================================================
    // ONBOARDING TASK
    // ============================================================================

    MobileTalent.enums.ONBOARDING_TASK_CATEGORY = {
        0: 'Unspecified', 1: 'Paperwork', 2: 'IT Setup', 3: 'Equipment', 4: 'Training',
        5: 'Benefits', 6: 'Compliance', 7: 'Introduction', 8: 'Orientation'
    };
    MobileTalent.enums.ONBOARDING_TASK_CATEGORY_VALUES = {
        'paperwork': 1, 'it': 2, 'setup': 2, 'equipment': 3, 'training': 4,
        'benefits': 5, 'compliance': 6, 'introduction': 7, 'orientation': 8
    };

    MobileTalent.enums.TASK_OWNER = {
        0: 'Unspecified', 1: 'Employee', 2: 'Manager', 3: 'HR', 4: 'IT', 5: 'Payroll', 6: 'Facilities'
    };
    MobileTalent.enums.TASK_OWNER_VALUES = {
        'employee': 1, 'manager': 2, 'hr': 3, 'it': 4, 'payroll': 5, 'facilities': 6
    };

    MobileTalent.enums.ONBOARDING_TASK_STATUS = {
        0: 'Unspecified', 1: 'Not Started', 2: 'In Progress', 3: 'Completed', 4: 'Skipped', 5: 'Blocked'
    };
    MobileTalent.enums.ONBOARDING_TASK_STATUS_VALUES = {
        'not': 1, 'started': 1, 'progress': 2, 'completed': 3, 'skipped': 4, 'blocked': 5
    };
    MobileTalent.enums.ONBOARDING_TASK_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active', 4: 'status-inactive', 5: 'status-terminated'
    };

    // ============================================================================
    // PERFORMANCE REVIEW
    // ============================================================================

    MobileTalent.enums.PERFORMANCE_REVIEW_STATUS = {
        0: 'Unspecified', 1: 'Not Started', 2: 'Self Review', 3: 'Manager Review',
        4: 'Calibration', 5: 'HR Review', 6: 'Acknowledgment', 7: 'Completed'
    };
    MobileTalent.enums.PERFORMANCE_REVIEW_STATUS_VALUES = {
        'not': 1, 'started': 1, 'self': 2, 'manager': 3, 'calibration': 4,
        'hr': 5, 'acknowledgment': 6, 'completed': 7
    };
    MobileTalent.enums.PERFORMANCE_REVIEW_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-pending', 4: 'status-pending',
        5: 'status-pending', 6: 'status-pending', 7: 'status-active'
    };

    MobileTalent.enums.REVIEW_TYPE = {
        0: 'Unspecified', 1: 'Annual', 2: 'Semi-Annual', 3: 'Quarterly', 4: 'Probationary', 5: 'Project', 6: 'Ad Hoc'
    };
    MobileTalent.enums.REVIEW_TYPE_VALUES = {
        'annual': 1, 'semi': 2, 'quarterly': 3, 'probationary': 4, 'probation': 4, 'project': 5, 'adhoc': 6
    };

    // ============================================================================
    // GOAL
    // ============================================================================

    MobileTalent.enums.GOAL_TYPE = { 0: 'Unspecified', 1: 'Individual', 2: 'Team', 3: 'Department', 4: 'Company' };
    MobileTalent.enums.GOAL_TYPE_VALUES = { 'individual': 1, 'team': 2, 'department': 3, 'dept': 3, 'company': 4 };

    MobileTalent.enums.GOAL_CATEGORY = { 0: 'Unspecified', 1: 'Performance', 2: 'Development', 3: 'Career', 4: 'Project' };
    MobileTalent.enums.GOAL_CATEGORY_VALUES = { 'performance': 1, 'development': 2, 'career': 3, 'project': 4 };

    MobileTalent.enums.GOAL_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Active', 3: 'On Track', 4: 'At Risk', 5: 'Behind', 6: 'Completed', 7: 'Cancelled'
    };
    MobileTalent.enums.GOAL_STATUS_VALUES = {
        'draft': 1, 'active': 2, 'track': 3, 'risk': 4, 'behind': 5, 'completed': 6, 'cancelled': 7
    };
    MobileTalent.enums.GOAL_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-active', 3: 'status-active', 4: 'status-pending',
        5: 'status-terminated', 6: 'status-active', 7: 'status-inactive'
    };

    MobileTalent.enums.GOAL_PRIORITY = { 0: 'Unspecified', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };
    MobileTalent.enums.GOAL_PRIORITY_VALUES = { 'low': 1, 'medium': 2, 'med': 2, 'high': 3, 'critical': 4 };

    // ============================================================================
    // SUCCESSION & CAREER
    // ============================================================================

    MobileTalent.enums.SUCCESSION_PLAN_STATUS = { 0: 'Unspecified', 1: 'Draft', 2: 'Active', 3: 'On Hold', 4: 'Closed' };
    MobileTalent.enums.SUCCESSION_PLAN_STATUS_VALUES = { 'draft': 1, 'active': 2, 'hold': 3, 'closed': 4 };
    MobileTalent.enums.SUCCESSION_PLAN_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-active', 3: 'status-pending', 4: 'status-inactive'
    };

    MobileTalent.enums.RISK_LEVEL = { 0: 'Unspecified', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };
    MobileTalent.enums.RISK_LEVEL_VALUES = { 'low': 1, 'medium': 2, 'med': 2, 'high': 3, 'critical': 4 };

    MobileTalent.enums.READINESS_LEVEL = {
        0: 'Unspecified', 1: 'Ready Now', 2: 'Ready in 1 Year', 3: 'Ready in 2 Years', 4: 'Ready in 3+ Years'
    };
    MobileTalent.enums.READINESS_LEVEL_VALUES = { 'now': 1, 'ready': 1, '1': 2, '2': 3, '3': 4 };

    // ============================================================================
    // FEEDBACK
    // ============================================================================

    MobileTalent.enums.FEEDBACK_TYPE = { 0: 'Unspecified', 1: '360 Review', 2: 'Peer', 3: 'Upward', 4: 'Continuous', 5: 'Recognition' };
    MobileTalent.enums.FEEDBACK_TYPE_VALUES = { '360': 1, 'review': 1, 'peer': 2, 'upward': 3, 'continuous': 4, 'recognition': 5 };

    MobileTalent.enums.FEEDBACK_RELATIONSHIP = {
        0: 'Unspecified', 1: 'Manager', 2: 'Peer', 3: 'Direct Report', 4: 'Skip Level', 5: 'Cross Functional', 6: 'External'
    };
    MobileTalent.enums.FEEDBACK_RELATIONSHIP_VALUES = {
        'manager': 1, 'peer': 2, 'direct': 3, 'report': 3, 'skip': 4, 'cross': 5, 'functional': 5, 'external': 6
    };

    MobileTalent.enums.FEEDBACK_STATUS = { 0: 'Unspecified', 1: 'Requested', 2: 'In Progress', 3: 'Submitted', 4: 'Declined' };
    MobileTalent.enums.FEEDBACK_STATUS_VALUES = { 'requested': 1, 'progress': 2, 'submitted': 3, 'declined': 4 };
    MobileTalent.enums.FEEDBACK_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileTalent.render = {
        requisitionStatus: Layer8MRenderers.createStatusRenderer(MobileTalent.enums.REQUISITION_STATUS, MobileTalent.enums.REQUISITION_STATUS_CLASSES),
        requisitionType: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.REQUISITION_TYPE),
        applicantSource: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.APPLICANT_SOURCE),
        applicationStatus: Layer8MRenderers.createStatusRenderer(MobileTalent.enums.APPLICATION_STATUS, MobileTalent.enums.APPLICATION_STATUS_CLASSES),
        applicationStage: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.APPLICATION_STAGE),
        dispositionReason: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.DISPOSITION_REASON),
        onboardingTaskCategory: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.ONBOARDING_TASK_CATEGORY),
        taskOwner: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.TASK_OWNER),
        onboardingTaskStatus: Layer8MRenderers.createStatusRenderer(MobileTalent.enums.ONBOARDING_TASK_STATUS, MobileTalent.enums.ONBOARDING_TASK_STATUS_CLASSES),
        performanceReviewStatus: Layer8MRenderers.createStatusRenderer(MobileTalent.enums.PERFORMANCE_REVIEW_STATUS, MobileTalent.enums.PERFORMANCE_REVIEW_STATUS_CLASSES),
        reviewType: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.REVIEW_TYPE),
        goalType: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.GOAL_TYPE),
        goalCategory: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.GOAL_CATEGORY),
        goalStatus: Layer8MRenderers.createStatusRenderer(MobileTalent.enums.GOAL_STATUS, MobileTalent.enums.GOAL_STATUS_CLASSES),
        goalPriority: (v) => Layer8MRenderers.renderPriority(v, MobileTalent.enums.GOAL_PRIORITY),
        successionPlanStatus: Layer8MRenderers.createStatusRenderer(MobileTalent.enums.SUCCESSION_PLAN_STATUS, MobileTalent.enums.SUCCESSION_PLAN_STATUS_CLASSES),
        riskLevel: (v) => Layer8MRenderers.renderRisk(v, MobileTalent.enums.RISK_LEVEL),
        readinessLevel: (v) => {
            const colors = { 1: '#10b981', 2: '#22c55e', 3: '#f59e0b', 4: '#ef4444' };
            const label = MobileTalent.enums.READINESS_LEVEL[v] || 'Unknown';
            return `<span style="color: ${colors[v] || '#64748b'}; font-weight: 500;">${Layer8MUtils.escapeHtml(label)}</span>`;
        },
        feedbackType: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.FEEDBACK_TYPE),
        feedbackRelationship: (v) => Layer8MRenderers.renderEnum(v, MobileTalent.enums.FEEDBACK_RELATIONSHIP),
        feedbackStatus: Layer8MRenderers.createStatusRenderer(MobileTalent.enums.FEEDBACK_STATUS, MobileTalent.enums.FEEDBACK_STATUS_CLASSES),
        percentage: Layer8MRenderers.renderProgress,
        rating: Layer8MRenderers.renderRating,
        period: Layer8MRenderers.renderPeriod,
        boolean: Layer8MRenderers.renderBoolean,
        date: Layer8MRenderers.renderDate
    };

})();
