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
 * Mobile Talent Management Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: hcm/talent/talent-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderPriority, renderRisk, renderProgress, renderRating, renderPeriod, renderBoolean, renderDate } = Layer8MRenderers;

    window.MobileTalent = window.MobileTalent || {};

    // ============================================================================
    // REQUISITION
    // ============================================================================

    const REQUISITION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-inactive'],
        ['Pending Approval', 'pending', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Open', 'open', 'status-active'],
        ['On Hold', 'hold', 'status-pending'],
        ['Filled', 'filled', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated'],
        ['Closed', 'closed', 'status-inactive']
    ]);

    const REQUISITION_TYPE = factory.withValues([
        ['Unspecified', null], ['New Position', 'new'], ['Replacement', 'replacement'],
        ['Expansion', 'expansion'], ['Temporary', 'temporary'], ['Intern', 'intern']
    ]);

    // ============================================================================
    // APPLICANT & APPLICATION
    // ============================================================================

    const APPLICANT_SOURCE = factory.withValues([
        ['Unspecified', null], ['Career Site', 'career'], ['LinkedIn', 'linkedin'],
        ['Indeed', 'indeed'], ['Glassdoor', 'glassdoor'], ['Referral', 'referral'],
        ['Agency', 'agency'], ['University', 'university'], ['Job Fair', 'fair'],
        ['Internal', 'internal'], ['Other', 'other']
    ]);

    const APPLICATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['New', 'new', 'status-pending'],
        ['In Review', 'review', 'status-pending'],
        ['Interviewing', 'interviewing', 'status-active'],
        ['Offer Pending', 'offer', 'status-pending'],
        ['Offer Extended', 'extended', 'status-active'],
        ['Hired', 'hired', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated'],
        ['Withdrawn', 'withdrawn', 'status-inactive']
    ]);

    const APPLICATION_STAGE = factory.withValues([
        ['Unspecified', null], ['Screening', 'screening'], ['Phone Screen', 'phone'],
        ['Interview 1', 'interview1'], ['Interview 2', 'interview2'], ['Final Interview', 'final'],
        ['Reference Check', 'reference'], ['Background Check', 'background'], ['Offer', 'offer'], ['Closed', 'closed']
    ]);

    const DISPOSITION_REASON = factory.withValues([
        ['Unspecified', null], ['Under Qualified', 'under'], ['Over Qualified', 'over'],
        ['Better Candidate', 'better'], ['Compensation Mismatch', 'compensation'],
        ['Failed Interview', 'failed'], ['Failed Background', 'background'],
        ['Withdrew', 'withdrew'], ['Declined Offer', 'declined'],
        ['Position Filled', 'filled'], ['Position Cancelled', 'cancelled'], ['No Show', 'noshow']
    ]);

    // ============================================================================
    // ONBOARDING TASK
    // ============================================================================

    const ONBOARDING_TASK_CATEGORY = factory.withValues([
        ['Unspecified', null], ['Paperwork', 'paperwork'], ['IT Setup', 'it'],
        ['Equipment', 'equipment'], ['Training', 'training'], ['Benefits', 'benefits'],
        ['Compliance', 'compliance'], ['Introduction', 'introduction'], ['Orientation', 'orientation']
    ]);

    const TASK_OWNER = factory.withValues([
        ['Unspecified', null], ['Employee', 'employee'], ['Manager', 'manager'],
        ['HR', 'hr'], ['IT', 'it'], ['Payroll', 'payroll'], ['Facilities', 'facilities']
    ]);

    const ONBOARDING_TASK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Not Started', 'not', 'status-inactive'],
        ['In Progress', 'progress', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Skipped', 'skipped', 'status-inactive'],
        ['Blocked', 'blocked', 'status-terminated']
    ]);

    // ============================================================================
    // PERFORMANCE REVIEW
    // ============================================================================

    const PERFORMANCE_REVIEW_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Not Started', 'not', 'status-inactive'],
        ['Self Review', 'self', 'status-pending'],
        ['Manager Review', 'manager', 'status-pending'],
        ['Calibration', 'calibration', 'status-pending'],
        ['HR Review', 'hr', 'status-pending'],
        ['Acknowledgment', 'acknowledgment', 'status-pending'],
        ['Completed', 'completed', 'status-active']
    ]);

    const REVIEW_TYPE = factory.withValues([
        ['Unspecified', null], ['Annual', 'annual'], ['Semi-Annual', 'semi'],
        ['Quarterly', 'quarterly'], ['Probationary', 'probationary'], ['Project', 'project'], ['Ad Hoc', 'adhoc']
    ]);

    // ============================================================================
    // GOAL
    // ============================================================================

    const GOAL_TYPE = factory.withValues([
        ['Unspecified', null], ['Individual', 'individual'], ['Team', 'team'],
        ['Department', 'department'], ['Company', 'company']
    ]);

    const GOAL_CATEGORY = factory.withValues([
        ['Unspecified', null], ['Performance', 'performance'], ['Development', 'development'],
        ['Career', 'career'], ['Project', 'project']
    ]);

    const GOAL_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-inactive'],
        ['Active', 'active', 'status-active'],
        ['On Track', 'track', 'status-active'],
        ['At Risk', 'risk', 'status-pending'],
        ['Behind', 'behind', 'status-terminated'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    const GOAL_PRIORITY = factory.withValues([
        ['Unspecified', null], ['Low', 'low'], ['Medium', 'medium'], ['High', 'high'], ['Critical', 'critical']
    ]);

    // ============================================================================
    // SUCCESSION & CAREER
    // ============================================================================

    const SUCCESSION_PLAN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-inactive'],
        ['Active', 'active', 'status-active'],
        ['On Hold', 'hold', 'status-pending'],
        ['Closed', 'closed', 'status-inactive']
    ]);

    const RISK_LEVEL = factory.withValues([
        ['Unspecified', null], ['Low', 'low'], ['Medium', 'medium'], ['High', 'high'], ['Critical', 'critical']
    ]);

    const READINESS_LEVEL = factory.withValues([
        ['Unspecified', null], ['Ready Now', 'now'], ['Ready in 1 Year', '1'],
        ['Ready in 2 Years', '2'], ['Ready in 3+ Years', '3']
    ]);

    // ============================================================================
    // FEEDBACK
    // ============================================================================

    const FEEDBACK_TYPE = factory.withValues([
        ['Unspecified', null], ['360 Review', '360'], ['Peer', 'peer'],
        ['Upward', 'upward'], ['Continuous', 'continuous'], ['Recognition', 'recognition']
    ]);

    const FEEDBACK_RELATIONSHIP = factory.withValues([
        ['Unspecified', null], ['Manager', 'manager'], ['Peer', 'peer'],
        ['Direct Report', 'direct'], ['Skip Level', 'skip'],
        ['Cross Functional', 'cross'], ['External', 'external']
    ]);

    const FEEDBACK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Requested', 'requested', 'status-pending'],
        ['In Progress', 'progress', 'status-pending'],
        ['Submitted', 'submitted', 'status-active'],
        ['Declined', 'declined', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileTalent.enums = {
        REQUISITION_STATUS: REQUISITION_STATUS.enum,
        REQUISITION_STATUS_VALUES: REQUISITION_STATUS.values,
        REQUISITION_STATUS_CLASSES: REQUISITION_STATUS.classes,
        REQUISITION_TYPE: REQUISITION_TYPE.enum,
        REQUISITION_TYPE_VALUES: REQUISITION_TYPE.values,
        APPLICANT_SOURCE: APPLICANT_SOURCE.enum,
        APPLICANT_SOURCE_VALUES: APPLICANT_SOURCE.values,
        APPLICATION_STATUS: APPLICATION_STATUS.enum,
        APPLICATION_STATUS_VALUES: APPLICATION_STATUS.values,
        APPLICATION_STATUS_CLASSES: APPLICATION_STATUS.classes,
        APPLICATION_STAGE: APPLICATION_STAGE.enum,
        APPLICATION_STAGE_VALUES: APPLICATION_STAGE.values,
        DISPOSITION_REASON: DISPOSITION_REASON.enum,
        DISPOSITION_REASON_VALUES: DISPOSITION_REASON.values,
        ONBOARDING_TASK_CATEGORY: ONBOARDING_TASK_CATEGORY.enum,
        ONBOARDING_TASK_CATEGORY_VALUES: ONBOARDING_TASK_CATEGORY.values,
        TASK_OWNER: TASK_OWNER.enum,
        TASK_OWNER_VALUES: TASK_OWNER.values,
        ONBOARDING_TASK_STATUS: ONBOARDING_TASK_STATUS.enum,
        ONBOARDING_TASK_STATUS_VALUES: ONBOARDING_TASK_STATUS.values,
        ONBOARDING_TASK_STATUS_CLASSES: ONBOARDING_TASK_STATUS.classes,
        PERFORMANCE_REVIEW_STATUS: PERFORMANCE_REVIEW_STATUS.enum,
        PERFORMANCE_REVIEW_STATUS_VALUES: PERFORMANCE_REVIEW_STATUS.values,
        PERFORMANCE_REVIEW_STATUS_CLASSES: PERFORMANCE_REVIEW_STATUS.classes,
        REVIEW_TYPE: REVIEW_TYPE.enum,
        REVIEW_TYPE_VALUES: REVIEW_TYPE.values,
        GOAL_TYPE: GOAL_TYPE.enum,
        GOAL_TYPE_VALUES: GOAL_TYPE.values,
        GOAL_CATEGORY: GOAL_CATEGORY.enum,
        GOAL_CATEGORY_VALUES: GOAL_CATEGORY.values,
        GOAL_STATUS: GOAL_STATUS.enum,
        GOAL_STATUS_VALUES: GOAL_STATUS.values,
        GOAL_STATUS_CLASSES: GOAL_STATUS.classes,
        GOAL_PRIORITY: GOAL_PRIORITY.enum,
        GOAL_PRIORITY_VALUES: GOAL_PRIORITY.values,
        SUCCESSION_PLAN_STATUS: SUCCESSION_PLAN_STATUS.enum,
        SUCCESSION_PLAN_STATUS_VALUES: SUCCESSION_PLAN_STATUS.values,
        SUCCESSION_PLAN_STATUS_CLASSES: SUCCESSION_PLAN_STATUS.classes,
        RISK_LEVEL: RISK_LEVEL.enum,
        RISK_LEVEL_VALUES: RISK_LEVEL.values,
        READINESS_LEVEL: READINESS_LEVEL.enum,
        READINESS_LEVEL_VALUES: READINESS_LEVEL.values,
        FEEDBACK_TYPE: FEEDBACK_TYPE.enum,
        FEEDBACK_TYPE_VALUES: FEEDBACK_TYPE.values,
        FEEDBACK_RELATIONSHIP: FEEDBACK_RELATIONSHIP.enum,
        FEEDBACK_RELATIONSHIP_VALUES: FEEDBACK_RELATIONSHIP.values,
        FEEDBACK_STATUS: FEEDBACK_STATUS.enum,
        FEEDBACK_STATUS_VALUES: FEEDBACK_STATUS.values,
        FEEDBACK_STATUS_CLASSES: FEEDBACK_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileTalent.render = {
        requisitionStatus: createStatusRenderer(REQUISITION_STATUS.enum, REQUISITION_STATUS.classes),
        requisitionType: (v) => renderEnum(v, REQUISITION_TYPE.enum),
        applicantSource: (v) => renderEnum(v, APPLICANT_SOURCE.enum),
        applicationStatus: createStatusRenderer(APPLICATION_STATUS.enum, APPLICATION_STATUS.classes),
        applicationStage: (v) => renderEnum(v, APPLICATION_STAGE.enum),
        dispositionReason: (v) => renderEnum(v, DISPOSITION_REASON.enum),
        onboardingTaskCategory: (v) => renderEnum(v, ONBOARDING_TASK_CATEGORY.enum),
        taskOwner: (v) => renderEnum(v, TASK_OWNER.enum),
        onboardingTaskStatus: createStatusRenderer(ONBOARDING_TASK_STATUS.enum, ONBOARDING_TASK_STATUS.classes),
        performanceReviewStatus: createStatusRenderer(PERFORMANCE_REVIEW_STATUS.enum, PERFORMANCE_REVIEW_STATUS.classes),
        reviewType: (v) => renderEnum(v, REVIEW_TYPE.enum),
        goalType: (v) => renderEnum(v, GOAL_TYPE.enum),
        goalCategory: (v) => renderEnum(v, GOAL_CATEGORY.enum),
        goalStatus: createStatusRenderer(GOAL_STATUS.enum, GOAL_STATUS.classes),
        goalPriority: (v) => renderPriority(v, GOAL_PRIORITY.enum),
        successionPlanStatus: createStatusRenderer(SUCCESSION_PLAN_STATUS.enum, SUCCESSION_PLAN_STATUS.classes),
        riskLevel: (v) => renderRisk(v, RISK_LEVEL.enum),
        readinessLevel: (v) => {
            const colors = { 1: '#10b981', 2: '#22c55e', 3: '#f59e0b', 4: '#ef4444' };
            const label = READINESS_LEVEL.enum[v] || 'Unknown';
            return `<span style="color: ${colors[v] || '#64748b'}; font-weight: 500;">${Layer8MUtils.escapeHtml(label)}</span>`;
        },
        feedbackType: (v) => renderEnum(v, FEEDBACK_TYPE.enum),
        feedbackRelationship: (v) => renderEnum(v, FEEDBACK_RELATIONSHIP.enum),
        feedbackStatus: createStatusRenderer(FEEDBACK_STATUS.enum, FEEDBACK_STATUS.classes),
        percentage: renderProgress,
        rating: renderRating,
        period: renderPeriod,
        boolean: renderBoolean,
        date: renderDate
    };

})();
