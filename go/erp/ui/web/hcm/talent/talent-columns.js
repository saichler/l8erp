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

    // Import shared utilities
    const { escapeHtml } = Layer8DUtils;
    const { renderEnum, renderBoolean, renderDate } = Layer8DRenderers;

    // Get enums and render functions from talent-enums.js
    const enums = window.Talent.enums;
    const internal = window.Talent._internal;

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
                enumValues: enums.REVIEW_TYPE_VALUES,
                render: (item) => renderEnum(item.reviewType, enums.REVIEW_TYPE)
            },
            {
                key: 'reviewPeriod',
                label: 'Period',
                render: (item) => internal.renderReviewPeriod(item.reviewPeriod)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.PERFORMANCE_REVIEW_STATUS_VALUES,
                render: (item) => internal.renderPerformanceReviewStatus(item.status)
            },
            {
                key: 'overallRating',
                label: 'Rating',
                sortKey: 'overallRating',
                render: (item) => internal.renderRating(item.overallRating)
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
                enumValues: enums.GOAL_TYPE_VALUES,
                render: (item) => renderEnum(item.goalType, enums.GOAL_TYPE)
            },
            {
                key: 'priority',
                label: 'Priority',
                sortKey: 'priority',
                filterKey: 'priority',
                enumValues: enums.GOAL_PRIORITY_VALUES,
                render: (item) => internal.renderGoalPriority(item.priority)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.GOAL_STATUS_VALUES,
                render: (item) => internal.renderGoalStatus(item.status)
            },
            {
                key: 'completionPercentage',
                label: 'Progress',
                sortKey: 'completionPercentage',
                render: (item) => internal.renderPercentage(item.completionPercentage)
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
                enumValues: enums.FEEDBACK_TYPE_VALUES,
                render: (item) => renderEnum(item.feedbackType, enums.FEEDBACK_TYPE)
            },
            {
                key: 'relationship',
                label: 'Relationship',
                sortKey: 'relationship',
                filterKey: 'relationship',
                enumValues: enums.FEEDBACK_RELATIONSHIP_VALUES,
                render: (item) => renderEnum(item.relationship, enums.FEEDBACK_RELATIONSHIP)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.FEEDBACK_STATUS_VALUES,
                render: (item) => internal.renderFeedbackStatus(item.status)
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
                enumValues: enums.SUCCESSION_PLAN_STATUS_VALUES,
                render: (item) => internal.renderSuccessionPlanStatus(item.status)
            },
            {
                key: 'vacancyRisk',
                label: 'Vacancy Risk',
                sortKey: 'vacancyRisk',
                filterKey: 'vacancyRisk',
                enumValues: enums.RISK_LEVEL_VALUES,
                render: (item) => internal.renderRiskLevel(item.vacancyRisk)
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
                enumValues: enums.REQUISITION_TYPE_VALUES,
                render: (item) => renderEnum(item.requisitionType, enums.REQUISITION_TYPE)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.REQUISITION_STATUS_VALUES,
                render: (item) => internal.renderRequisitionStatus(item.status)
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
                enumValues: enums.APPLICANT_SOURCE_VALUES,
                render: (item) => renderEnum(item.source, enums.APPLICANT_SOURCE)
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
                enumValues: enums.APPLICATION_STATUS_VALUES,
                render: (item) => internal.renderApplicationStatus(item.status)
            },
            {
                key: 'stage',
                label: 'Stage',
                sortKey: 'stage',
                filterKey: 'stage',
                enumValues: enums.APPLICATION_STAGE_VALUES,
                render: (item) => renderEnum(item.stage, enums.APPLICATION_STAGE)
            },
            {
                key: 'overallRating',
                label: 'Rating',
                sortKey: 'overallRating',
                render: (item) => internal.renderRating(item.overallRating)
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
                enumValues: enums.ONBOARDING_TASK_CATEGORY_VALUES,
                render: (item) => renderEnum(item.category, enums.ONBOARDING_TASK_CATEGORY)
            },
            {
                key: 'ownerType',
                label: 'Owner',
                sortKey: 'ownerType',
                filterKey: 'ownerType',
                enumValues: enums.TASK_OWNER_VALUES,
                render: (item) => renderEnum(item.ownerType, enums.TASK_OWNER)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.ONBOARDING_TASK_STATUS_VALUES,
                render: (item) => internal.renderOnboardingTaskStatus(item.status)
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
    // EXPORT COLUMNS TO NAMESPACE
    // ============================================================================

    window.Talent.columns = TALENT_COLUMNS;

})();
