/**
 * Mobile Talent Management Module - Column Configurations
 * Desktop Equivalent: hcm/talent/talent-columns.js
 */
(function() {
    'use strict';

    const enums = MobileTalent.enums;
    const render = MobileTalent.render;

    MobileTalent.columns = {
        PerformanceReview: [
            { key: 'reviewId', label: 'ID', sortKey: 'reviewId', filterKey: 'reviewId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'reviewerId', label: 'Reviewer', sortKey: 'reviewerId', filterKey: 'reviewerId' },
            { key: 'reviewType', label: 'Type', sortKey: 'reviewType', filterKey: 'reviewType', enumValues: enums.REVIEW_TYPE_VALUES, render: (item) => render.reviewType(item.reviewType) },
            { key: 'reviewPeriod', label: 'Period', render: (item) => render.period(item.reviewPeriod) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.PERFORMANCE_REVIEW_STATUS_VALUES, render: (item) => render.performanceReviewStatus(item.status) },
            { key: 'overallRating', label: 'Rating', sortKey: 'overallRating', render: (item) => render.rating(item.overallRating) }
        ],

        Goal: [
            { key: 'goalId', label: 'ID', sortKey: 'goalId', filterKey: 'goalId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'goalType', label: 'Type', sortKey: 'goalType', filterKey: 'goalType', enumValues: enums.GOAL_TYPE_VALUES, render: (item) => render.goalType(item.goalType) },
            { key: 'priority', label: 'Priority', sortKey: 'priority', filterKey: 'priority', enumValues: enums.GOAL_PRIORITY_VALUES, render: (item) => render.goalPriority(item.priority) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.GOAL_STATUS_VALUES, render: (item) => render.goalStatus(item.status) },
            { key: 'completionPercentage', label: 'Progress', sortKey: 'completionPercentage', render: (item) => render.percentage(item.completionPercentage) },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => MobileRenderers.renderDate(item.dueDate) }
        ],

        Feedback: [
            { key: 'feedbackId', label: 'ID', sortKey: 'feedbackId', filterKey: 'feedbackId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'providerId', label: 'Provider', sortKey: 'providerId', filterKey: 'providerId' },
            { key: 'feedbackType', label: 'Type', sortKey: 'feedbackType', filterKey: 'feedbackType', enumValues: enums.FEEDBACK_TYPE_VALUES, render: (item) => render.feedbackType(item.feedbackType) },
            { key: 'relationship', label: 'Relationship', sortKey: 'relationship', filterKey: 'relationship', enumValues: enums.FEEDBACK_RELATIONSHIP_VALUES, render: (item) => render.feedbackRelationship(item.relationship) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.FEEDBACK_STATUS_VALUES, render: (item) => render.feedbackStatus(item.status) },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => MobileRenderers.renderDate(item.dueDate) }
        ],

        CareerPath: [
            { key: 'careerPathId', label: 'ID', sortKey: 'careerPathId', filterKey: 'careerPathId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'jobFamilyId', label: 'Job Family', sortKey: 'jobFamilyId', filterKey: 'jobFamilyId' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'steps', label: 'Steps', render: (item) => item.steps ? item.steps.length : 0 },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => MobileRenderers.renderBoolean(item.isActive) }
        ],

        SuccessionPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'positionId', label: 'Position', sortKey: 'positionId', filterKey: 'positionId' },
            { key: 'incumbentId', label: 'Incumbent', sortKey: 'incumbentId', filterKey: 'incumbentId' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.SUCCESSION_PLAN_STATUS_VALUES, render: (item) => render.successionPlanStatus(item.status) },
            { key: 'vacancyRisk', label: 'Vacancy Risk', sortKey: 'vacancyRisk', filterKey: 'vacancyRisk', enumValues: enums.RISK_LEVEL_VALUES, render: (item) => render.riskLevel(item.vacancyRisk) },
            { key: 'candidates', label: 'Candidates', render: (item) => item.candidates ? item.candidates.length : 0 },
            { key: 'nextReviewDate', label: 'Next Review', sortKey: 'nextReviewDate', render: (item) => MobileRenderers.renderDate(item.nextReviewDate) }
        ],

        JobRequisition: [
            { key: 'requisitionId', label: 'ID', sortKey: 'requisitionId', filterKey: 'requisitionId' },
            { key: 'requisitionNumber', label: 'Req #', sortKey: 'requisitionNumber', filterKey: 'requisitionNumber' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'requisitionType', label: 'Type', sortKey: 'requisitionType', filterKey: 'requisitionType', enumValues: enums.REQUISITION_TYPE_VALUES, render: (item) => render.requisitionType(item.requisitionType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.REQUISITION_STATUS_VALUES, render: (item) => render.requisitionStatus(item.status) },
            { key: 'openings', label: 'Openings', sortKey: 'openings' },
            { key: 'applicantCount', label: 'Applicants', sortKey: 'applicantCount' },
            { key: 'targetStartDate', label: 'Target Start', sortKey: 'targetStartDate', render: (item) => MobileRenderers.renderDate(item.targetStartDate) }
        ],

        Applicant: [
            { key: 'applicantId', label: 'ID', sortKey: 'applicantId', filterKey: 'applicantId' },
            { key: 'name', label: 'Name', sortKey: 'lastName', filterKey: 'lastName', render: (item) => `${MobileUtils.escapeHtml(item.firstName || '')} ${MobileUtils.escapeHtml(item.lastName || '')}`.trim() },
            { key: 'email', label: 'Email', sortKey: 'email', filterKey: 'email' },
            { key: 'phone', label: 'Phone', sortKey: 'phone', filterKey: 'phone' },
            { key: 'source', label: 'Source', sortKey: 'source', filterKey: 'source', enumValues: enums.APPLICANT_SOURCE_VALUES, render: (item) => render.applicantSource(item.source) },
            { key: 'createdDate', label: 'Applied', sortKey: 'createdDate', render: (item) => MobileRenderers.renderDate(item.createdDate) }
        ],

        Application: [
            { key: 'applicationId', label: 'ID', sortKey: 'applicationId', filterKey: 'applicationId' },
            { key: 'applicantId', label: 'Applicant', sortKey: 'applicantId', filterKey: 'applicantId' },
            { key: 'requisitionId', label: 'Requisition', sortKey: 'requisitionId', filterKey: 'requisitionId' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.APPLICATION_STATUS_VALUES, render: (item) => render.applicationStatus(item.status) },
            { key: 'stage', label: 'Stage', sortKey: 'stage', filterKey: 'stage', enumValues: enums.APPLICATION_STAGE_VALUES, render: (item) => render.applicationStage(item.stage) },
            { key: 'overallRating', label: 'Rating', sortKey: 'overallRating', render: (item) => render.rating(item.overallRating) },
            { key: 'appliedDate', label: 'Applied', sortKey: 'appliedDate', render: (item) => MobileRenderers.renderDate(item.appliedDate) }
        ],

        OnboardingTask: [
            { key: 'taskId', label: 'ID', sortKey: 'taskId', filterKey: 'taskId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'name', label: 'Task', sortKey: 'name', filterKey: 'name' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category', enumValues: enums.ONBOARDING_TASK_CATEGORY_VALUES, render: (item) => render.onboardingTaskCategory(item.category) },
            { key: 'ownerType', label: 'Owner', sortKey: 'ownerType', filterKey: 'ownerType', enumValues: enums.TASK_OWNER_VALUES, render: (item) => render.taskOwner(item.ownerType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.ONBOARDING_TASK_STATUS_VALUES, render: (item) => render.onboardingTaskStatus(item.status) },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => MobileRenderers.renderDate(item.dueDate) }
        ]
    };

    MobileTalent.primaryKeys = {
        PerformanceReview: 'reviewId', Goal: 'goalId', Feedback: 'feedbackId',
        CareerPath: 'careerPathId', SuccessionPlan: 'planId', JobRequisition: 'requisitionId',
        Applicant: 'applicantId', Application: 'applicationId', OnboardingTask: 'taskId'
    };

})();
