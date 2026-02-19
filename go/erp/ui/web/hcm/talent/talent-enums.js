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
 * Talent Management Module - Enum Definitions and Render Functions
 *
 * Split files:
 * - talent-enums-recruiting.js: Requisition, Applicant, Application enums
 * - talent-enums-performance.js: Reviews, Goals, Feedback, Succession enums
 */
(function() {
    'use strict';

    // Initialize Talent namespace
    window.Talent = window.Talent || {};

    // Import shared utilities
    const { escapeHtml, formatDate } = Layer8DUtils;
    const { renderEnum, createStatusRenderer, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    const factory = window.Layer8EnumFactory;

    // Import from split files
    const recruiting = window.TalentEnumsRecruiting;
    const performance = window.TalentEnumsPerformance;

    // ============================================================================
    // ONBOARDING ENUMS (using factory)
    // ============================================================================

    const ONBOARDING_TASK_CATEGORY = factory.withValues([
        ['Unspecified', null], ['Paperwork', 'paperwork'], ['IT Setup', 'it'],
        ['IT Setup', 'setup'], ['Equipment', 'equipment'], ['Training', 'training'],
        ['Benefits', 'benefits'], ['Compliance', 'compliance'],
        ['Introduction', 'introduction'], ['Orientation', 'orientation']
    ]);

    const TASK_OWNER = factory.withValues([
        ['Unspecified', null], ['Employee', 'employee'], ['Manager', 'manager'],
        ['HR', 'hr'], ['IT', 'it'], ['Payroll', 'payroll'], ['Facilities', 'facilities']
    ]);

    const ONBOARDING_TASK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Not Started', 'not', 'layer8d-status-inactive'],
        ['Not Started', 'started', 'layer8d-status-inactive'],
        ['In Progress', 'progress', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Skipped', 'skipped', 'layer8d-status-inactive'],
        ['Blocked', 'blocked', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // STATUS RENDERERS (using shared factory)
    // ============================================================================

    const renderRequisitionStatus = createStatusRenderer(recruiting.REQUISITION_STATUS, recruiting.REQUISITION_STATUS_CLASSES);
    const renderApplicationStatus = createStatusRenderer(recruiting.APPLICATION_STATUS, recruiting.APPLICATION_STATUS_CLASSES);
    const renderOnboardingTaskStatus = createStatusRenderer(ONBOARDING_TASK_STATUS.enum, ONBOARDING_TASK_STATUS.classes);
    const renderPerformanceReviewStatus = createStatusRenderer(performance.PERFORMANCE_REVIEW_STATUS, performance.PERFORMANCE_REVIEW_STATUS_CLASSES);
    const renderGoalStatus = createStatusRenderer(performance.GOAL_STATUS, performance.GOAL_STATUS_CLASSES);
    const renderSuccessionPlanStatus = createStatusRenderer(performance.SUCCESSION_PLAN_STATUS, performance.SUCCESSION_PLAN_STATUS_CLASSES);
    const renderFeedbackStatus = createStatusRenderer(performance.FEEDBACK_STATUS, performance.FEEDBACK_STATUS_CLASSES);

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
        const label = performance.GOAL_PRIORITY[priority] || 'Unknown';
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
        const label = performance.RISK_LEVEL[risk] || 'Unknown';
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
        const label = performance.READINESS_LEVEL[readiness] || 'Unknown';
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
    // EXPORT MERGED ENUMS TO NAMESPACE
    // ============================================================================

    window.Talent.enums = {
        // Cross-module enum (from core-hr)
        EMPLOYMENT_TYPE: window.CoreHR.enums.EMPLOYMENT_TYPE,
        GENDER: window.CoreHR.enums.GENDER,

        // Recruiting enums (from split file)
        REQUISITION_STATUS: recruiting.REQUISITION_STATUS,
        REQUISITION_STATUS_VALUES: recruiting.REQUISITION_STATUS_VALUES,
        REQUISITION_TYPE: recruiting.REQUISITION_TYPE,
        REQUISITION_TYPE_VALUES: recruiting.REQUISITION_TYPE_VALUES,
        APPLICANT_SOURCE: recruiting.APPLICANT_SOURCE,
        APPLICANT_SOURCE_VALUES: recruiting.APPLICANT_SOURCE_VALUES,
        APPLICATION_STATUS: recruiting.APPLICATION_STATUS,
        APPLICATION_STATUS_VALUES: recruiting.APPLICATION_STATUS_VALUES,
        APPLICATION_STAGE: recruiting.APPLICATION_STAGE,
        APPLICATION_STAGE_VALUES: recruiting.APPLICATION_STAGE_VALUES,
        DISPOSITION_REASON: recruiting.DISPOSITION_REASON,
        DISPOSITION_REASON_VALUES: recruiting.DISPOSITION_REASON_VALUES,

        // Onboarding enums (local)
        ONBOARDING_TASK_CATEGORY: ONBOARDING_TASK_CATEGORY.enum,
        ONBOARDING_TASK_CATEGORY_VALUES: ONBOARDING_TASK_CATEGORY.values,
        TASK_OWNER: TASK_OWNER.enum,
        TASK_OWNER_VALUES: TASK_OWNER.values,
        ONBOARDING_TASK_STATUS: ONBOARDING_TASK_STATUS.enum,
        ONBOARDING_TASK_STATUS_VALUES: ONBOARDING_TASK_STATUS.values,

        // Performance enums (from split file)
        PERFORMANCE_REVIEW_STATUS: performance.PERFORMANCE_REVIEW_STATUS,
        PERFORMANCE_REVIEW_STATUS_VALUES: performance.PERFORMANCE_REVIEW_STATUS_VALUES,
        REVIEW_TYPE: performance.REVIEW_TYPE,
        REVIEW_TYPE_VALUES: performance.REVIEW_TYPE_VALUES,
        GOAL_TYPE: performance.GOAL_TYPE,
        GOAL_TYPE_VALUES: performance.GOAL_TYPE_VALUES,
        GOAL_CATEGORY: performance.GOAL_CATEGORY,
        GOAL_CATEGORY_VALUES: performance.GOAL_CATEGORY_VALUES,
        GOAL_STATUS: performance.GOAL_STATUS,
        GOAL_STATUS_VALUES: performance.GOAL_STATUS_VALUES,
        GOAL_PRIORITY: performance.GOAL_PRIORITY,
        GOAL_PRIORITY_VALUES: performance.GOAL_PRIORITY_VALUES,
        SUCCESSION_PLAN_STATUS: performance.SUCCESSION_PLAN_STATUS,
        SUCCESSION_PLAN_STATUS_VALUES: performance.SUCCESSION_PLAN_STATUS_VALUES,
        RISK_LEVEL: performance.RISK_LEVEL,
        RISK_LEVEL_VALUES: performance.RISK_LEVEL_VALUES,
        READINESS_LEVEL: performance.READINESS_LEVEL,
        READINESS_LEVEL_VALUES: performance.READINESS_LEVEL_VALUES,
        FEEDBACK_TYPE: performance.FEEDBACK_TYPE,
        FEEDBACK_TYPE_VALUES: performance.FEEDBACK_TYPE_VALUES,
        FEEDBACK_RELATIONSHIP: performance.FEEDBACK_RELATIONSHIP,
        FEEDBACK_RELATIONSHIP_VALUES: performance.FEEDBACK_RELATIONSHIP_VALUES,
        FEEDBACK_STATUS: performance.FEEDBACK_STATUS,
        FEEDBACK_STATUS_VALUES: performance.FEEDBACK_STATUS_VALUES
    };

    window.Talent.render = {
        requisitionStatus: renderRequisitionStatus,
        requisitionType: (v) => renderEnum(v, recruiting.REQUISITION_TYPE),
        applicantSource: (v) => renderEnum(v, recruiting.APPLICANT_SOURCE),
        applicationStatus: renderApplicationStatus,
        applicationStage: (v) => renderEnum(v, recruiting.APPLICATION_STAGE),
        dispositionReason: (v) => renderEnum(v, recruiting.DISPOSITION_REASON),
        onboardingTaskCategory: (v) => renderEnum(v, ONBOARDING_TASK_CATEGORY.enum),
        taskOwner: (v) => renderEnum(v, TASK_OWNER.enum),
        onboardingTaskStatus: renderOnboardingTaskStatus,
        performanceReviewStatus: renderPerformanceReviewStatus,
        reviewType: (v) => renderEnum(v, performance.REVIEW_TYPE),
        goalType: (v) => renderEnum(v, performance.GOAL_TYPE),
        goalCategory: (v) => renderEnum(v, performance.GOAL_CATEGORY),
        goalStatus: renderGoalStatus,
        goalPriority: renderGoalPriority,
        successionPlanStatus: renderSuccessionPlanStatus,
        riskLevel: renderRiskLevel,
        readinessLevel: renderReadinessLevel,
        feedbackType: (v) => renderEnum(v, performance.FEEDBACK_TYPE),
        feedbackRelationship: (v) => renderEnum(v, performance.FEEDBACK_RELATIONSHIP),
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
