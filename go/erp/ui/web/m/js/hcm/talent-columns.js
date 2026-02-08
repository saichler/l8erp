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
 * Mobile Talent Management Module - Column Configurations
 * Desktop Equivalent: hcm/talent/talent-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileTalent.enums;
    const render = MobileTalent.render;

    MobileTalent.columns = {
        PerformanceReview: [
            ...col.id('reviewId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('reviewerId', 'Reviewer'),
            ...col.status('reviewType', 'Type', enums.REVIEW_TYPE_VALUES, render.reviewType),
            ...col.custom('reviewPeriod', 'Period', (item) => render.period(item.reviewPeriod)),
            ...col.status('status', 'Status', enums.PERFORMANCE_REVIEW_STATUS_VALUES, render.performanceReviewStatus),
            ...col.custom('overallRating', 'Rating', (item) => render.rating(item.overallRating))
        ],

        Goal: [
            ...col.id('goalId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('title', 'Title'),
            ...col.status('goalType', 'Type', enums.GOAL_TYPE_VALUES, render.goalType),
            ...col.status('priority', 'Priority', enums.GOAL_PRIORITY_VALUES, render.goalPriority),
            ...col.status('status', 'Status', enums.GOAL_STATUS_VALUES, render.goalStatus),
            ...col.custom('completionPercentage', 'Progress', (item) => render.percentage(item.completionPercentage)),
            ...col.date('dueDate', 'Due Date')
        ],

        Feedback: [
            ...col.id('feedbackId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('providerId', 'Provider'),
            ...col.status('feedbackType', 'Type', enums.FEEDBACK_TYPE_VALUES, render.feedbackType),
            ...col.status('relationship', 'Relationship', enums.FEEDBACK_RELATIONSHIP_VALUES, render.feedbackRelationship),
            ...col.status('status', 'Status', enums.FEEDBACK_STATUS_VALUES, render.feedbackStatus),
            ...col.date('dueDate', 'Due Date')
        ],

        CareerPath: [
            ...col.id('careerPathId'),
            ...col.col('name', 'Name'),
            ...col.col('jobFamilyId', 'Job Family'),
            ...col.col('description', 'Description'),
            ...col.custom('steps', 'Steps', (item) => item.steps ? item.steps.length : 0),
            ...col.boolean('isActive', 'Active')
        ],

        SuccessionPlan: [
            ...col.id('planId'),
            ...col.col('positionId', 'Position'),
            ...col.col('incumbentId', 'Incumbent'),
            ...col.status('status', 'Status', enums.SUCCESSION_PLAN_STATUS_VALUES, render.successionPlanStatus),
            ...col.status('vacancyRisk', 'Vacancy Risk', enums.RISK_LEVEL_VALUES, render.riskLevel),
            ...col.custom('candidates', 'Candidates', (item) => item.candidates ? item.candidates.length : 0),
            ...col.date('nextReviewDate', 'Next Review')
        ],

        JobRequisition: [
            ...col.id('requisitionId'),
            ...col.col('requisitionNumber', 'Req #'),
            ...col.col('title', 'Title'),
            ...col.status('requisitionType', 'Type', enums.REQUISITION_TYPE_VALUES, render.requisitionType),
            ...col.status('status', 'Status', enums.REQUISITION_STATUS_VALUES, render.requisitionStatus),
            ...col.col('openings', 'Openings'),
            ...col.col('applicantCount', 'Applicants'),
            ...col.date('targetStartDate', 'Target Start')
        ],

        Applicant: [
            ...col.id('applicantId'),
            ...col.custom('name', 'Name', (item) => `${Layer8MUtils.escapeHtml(item.firstName || '')} ${Layer8MUtils.escapeHtml(item.lastName || '')}`.trim(), { sortKey: 'lastName', filterKey: 'lastName' }),
            ...col.col('email', 'Email'),
            ...col.col('phone', 'Phone'),
            ...col.status('source', 'Source', enums.APPLICANT_SOURCE_VALUES, render.applicantSource),
            ...col.date('createdDate', 'Applied')
        ],

        Application: [
            ...col.id('applicationId'),
            ...col.col('applicantId', 'Applicant'),
            ...col.col('requisitionId', 'Requisition'),
            ...col.status('status', 'Status', enums.APPLICATION_STATUS_VALUES, render.applicationStatus),
            ...col.status('stage', 'Stage', enums.APPLICATION_STAGE_VALUES, render.applicationStage),
            ...col.custom('overallRating', 'Rating', (item) => render.rating(item.overallRating)),
            ...col.date('appliedDate', 'Applied')
        ],

        OnboardingTask: [
            ...col.id('taskId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('name', 'Task'),
            ...col.status('category', 'Category', enums.ONBOARDING_TASK_CATEGORY_VALUES, render.onboardingTaskCategory),
            ...col.status('ownerType', 'Owner', enums.TASK_OWNER_VALUES, render.taskOwner),
            ...col.status('status', 'Status', enums.ONBOARDING_TASK_STATUS_VALUES, render.onboardingTaskStatus),
            ...col.date('dueDate', 'Due Date')
        ]
    };

    MobileTalent.primaryKeys = {
        PerformanceReview: 'reviewId', Goal: 'goalId', Feedback: 'feedbackId',
        CareerPath: 'careerPathId', SuccessionPlan: 'planId', JobRequisition: 'requisitionId',
        Applicant: 'applicantId', Application: 'applicationId', OnboardingTask: 'taskId'
    };

})();
