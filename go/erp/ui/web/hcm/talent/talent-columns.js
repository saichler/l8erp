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
// Talent Management Module - Column Configurations
// Part 2 of 4 - Load after talent-enums.js

(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const { escapeHtml } = Layer8DUtils;
    const { renderEnum } = Layer8DRenderers;
    const enums = window.Talent.enums;
    const internal = window.Talent._internal;

    window.Talent.columns = {
        PerformanceReview: [
            ...col.id('reviewId'),
            ...col.basic([['employeeId', 'Employee'], ['reviewerId', 'Reviewer']]),
            ...col.enum('reviewType', 'Type', enums.REVIEW_TYPE_VALUES, (v) => renderEnum(v, enums.REVIEW_TYPE)),
            ...col.custom('reviewPeriod', 'Period', (item) => internal.renderReviewPeriod(item.reviewPeriod), { sortKey: false }),
            ...col.enum('status', 'Status', enums.PERFORMANCE_REVIEW_STATUS_VALUES, internal.renderPerformanceReviewStatus),
            ...col.custom('overallRating', 'Rating', (item) => internal.renderRating(item.overallRating))
        ],

        Goal: [
            ...col.id('goalId'),
            ...col.basic([['employeeId', 'Employee'], 'title']),
            ...col.enum('goalType', 'Type', enums.GOAL_TYPE_VALUES, (v) => renderEnum(v, enums.GOAL_TYPE)),
            ...col.enum('priority', 'Priority', enums.GOAL_PRIORITY_VALUES, internal.renderGoalPriority),
            ...col.enum('status', 'Status', enums.GOAL_STATUS_VALUES, internal.renderGoalStatus),
            ...col.custom('completionPercentage', 'Progress', (item) => internal.renderPercentage(item.completionPercentage)),
            ...col.date('dueDate', 'Due Date')
        ],

        Feedback: [
            ...col.id('feedbackId'),
            ...col.basic([['employeeId', 'Employee'], ['providerId', 'Provider']]),
            ...col.enum('feedbackType', 'Type', enums.FEEDBACK_TYPE_VALUES, (v) => renderEnum(v, enums.FEEDBACK_TYPE)),
            ...col.enum('relationship', 'Relationship', enums.FEEDBACK_RELATIONSHIP_VALUES, (v) => renderEnum(v, enums.FEEDBACK_RELATIONSHIP)),
            ...col.enum('status', 'Status', enums.FEEDBACK_STATUS_VALUES, internal.renderFeedbackStatus),
            ...col.date('dueDate', 'Due Date')
        ],

        CareerPath: [
            ...col.id('careerPathId'),
            ...col.basic(['name', ['jobFamilyId', 'Job Family'], 'description']),
            ...col.custom('steps', 'Steps', (item) => item.steps ? item.steps.length : 0, { sortKey: false }),
            ...col.boolean('isActive', 'Active')
        ],

        SuccessionPlan: [
            ...col.id('planId'),
            ...col.basic([['positionId', 'Position'], ['incumbentId', 'Incumbent']]),
            ...col.enum('status', 'Status', enums.SUCCESSION_PLAN_STATUS_VALUES, internal.renderSuccessionPlanStatus),
            ...col.enum('vacancyRisk', 'Vacancy Risk', enums.RISK_LEVEL_VALUES, internal.renderRiskLevel),
            ...col.custom('candidates', 'Candidates', (item) => item.candidates ? item.candidates.length : 0, { sortKey: false }),
            ...col.date('nextReviewDate', 'Next Review')
        ],

        JobRequisition: [
            ...col.id('requisitionId'),
            ...col.basic([['requisitionNumber', 'Req #'], 'title']),
            ...col.enum('requisitionType', 'Type', enums.REQUISITION_TYPE_VALUES, (v) => renderEnum(v, enums.REQUISITION_TYPE)),
            ...col.enum('status', 'Status', enums.REQUISITION_STATUS_VALUES, internal.renderRequisitionStatus),
            ...col.col('openings', 'Openings'),
            ...col.col('applicantCount', 'Applicants'),
            ...col.date('targetStartDate', 'Target Start')
        ],

        Applicant: [
            ...col.id('applicantId'),
            ...col.custom('name', 'Name', (item) => `${escapeHtml(item.firstName || '')} ${escapeHtml(item.lastName || '')}`.trim(), { sortKey: 'lastName', filterKey: 'lastName' }),
            ...col.basic(['email', 'phone']),
            ...col.enum('source', 'Source', enums.APPLICANT_SOURCE_VALUES, (v) => renderEnum(v, enums.APPLICANT_SOURCE)),
            ...col.date('createdDate', 'Applied')
        ],

        Application: [
            ...col.id('applicationId'),
            ...col.basic([['applicantId', 'Applicant'], ['requisitionId', 'Requisition']]),
            ...col.enum('status', 'Status', enums.APPLICATION_STATUS_VALUES, internal.renderApplicationStatus),
            ...col.enum('stage', 'Stage', enums.APPLICATION_STAGE_VALUES, (v) => renderEnum(v, enums.APPLICATION_STAGE)),
            ...col.custom('overallRating', 'Rating', (item) => internal.renderRating(item.overallRating)),
            ...col.date('appliedDate', 'Applied')
        ],

        OnboardingTask: [
            ...col.id('taskId'),
            ...col.basic([['employeeId', 'Employee'], ['name', 'Task']]),
            ...col.enum('category', 'Category', enums.ONBOARDING_TASK_CATEGORY_VALUES, (v) => renderEnum(v, enums.ONBOARDING_TASK_CATEGORY)),
            ...col.enum('ownerType', 'Owner', enums.TASK_OWNER_VALUES, (v) => renderEnum(v, enums.TASK_OWNER)),
            ...col.enum('status', 'Status', enums.ONBOARDING_TASK_STATUS_VALUES, internal.renderOnboardingTaskStatus),
            ...col.date('dueDate', 'Due Date')
        ]
    };
})();
