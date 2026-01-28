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
// Talent Management Module - Form Definitions
// Part 3 of 4 - Load after talent-columns.js

(function() {
    'use strict';

    // Get enums from talent-enums.js
    const enums = window.Talent.enums;

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
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'reviewerId', label: 'Reviewer', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'reviewType', label: 'Review Type', type: 'select', options: enums.REVIEW_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PERFORMANCE_REVIEW_STATUS, required: true }
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
                        { key: 'overallRating', label: 'Overall Rating', type: 'rating', min: 1, max: 5 },
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
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'parentGoalId', label: 'Parent Goal', type: 'reference', lookupModel: 'Goal' }
                    ]
                },
                {
                    title: 'Classification',
                    fields: [
                        { key: 'goalType', label: 'Goal Type', type: 'select', options: enums.GOAL_TYPE, required: true },
                        { key: 'goalCategory', label: 'Category', type: 'select', options: enums.GOAL_CATEGORY },
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.GOAL_PRIORITY },
                        { key: 'status', label: 'Status', type: 'select', options: enums.GOAL_STATUS, required: true }
                    ]
                },
                {
                    title: 'Dates & Progress',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'completedDate', label: 'Completed Date', type: 'date' },
                        { key: 'completionPercentage', label: 'Completion', type: 'percentage', min: 0, max: 100 },
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
                        { key: 'employeeId', label: 'Employee (Receiving)', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'providerId', label: 'Provider (Giving)', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'feedbackType', label: 'Feedback Type', type: 'select', options: enums.FEEDBACK_TYPE, required: true },
                        { key: 'relationship', label: 'Relationship', type: 'select', options: enums.FEEDBACK_RELATIONSHIP },
                        { key: 'status', label: 'Status', type: 'select', options: enums.FEEDBACK_STATUS, required: true }
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
                        { key: 'jobFamilyId', label: 'Job Family', type: 'reference', lookupModel: 'JobFamily' },
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
                        { key: 'positionId', label: 'Position', type: 'reference', lookupModel: 'Position', required: true },
                        { key: 'incumbentId', label: 'Current Incumbent', type: 'reference', lookupModel: 'Employee' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.SUCCESSION_PLAN_STATUS, required: true }
                    ]
                },
                {
                    title: 'Risk Assessment',
                    fields: [
                        { key: 'vacancyRisk', label: 'Vacancy Risk', type: 'select', options: enums.RISK_LEVEL },
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
                        { key: 'requisitionType', label: 'Type', type: 'select', options: enums.REQUISITION_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.REQUISITION_STATUS, required: true }
                    ]
                },
                {
                    title: 'Position Details',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' },
                        { key: 'positionId', label: 'Position', type: 'reference', lookupModel: 'Position' },
                        { key: 'jobId', label: 'Job', type: 'reference', lookupModel: 'Job' },
                        { key: 'openings', label: 'Number of Openings', type: 'number', required: true },
                        { key: 'isRemote', label: 'Remote Position', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Hiring Team',
                    fields: [
                        { key: 'hiringManagerId', label: 'Hiring Manager', type: 'reference', lookupModel: 'Employee' },
                        { key: 'recruiterId', label: 'Recruiter', type: 'reference', lookupModel: 'Employee' }
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
                        { key: 'email', label: 'Email', type: 'email', required: true },
                        { key: 'phone', label: 'Phone', type: 'phone' }
                    ]
                },
                {
                    title: 'Source',
                    fields: [
                        { key: 'source', label: 'Source', type: 'select', options: enums.APPLICANT_SOURCE },
                        { key: 'sourceDetails', label: 'Source Details', type: 'text' },
                        { key: 'referrerEmployeeId', label: 'Referrer', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Online Profiles',
                    fields: [
                        { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'url' },
                        { key: 'portfolioUrl', label: 'Portfolio URL', type: 'url' },
                        { key: 'resumeUrl', label: 'Resume URL', type: 'url' },
                        { key: 'coverLetterUrl', label: 'Cover Letter URL', type: 'url' }
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
                        { key: 'applicantId', label: 'Applicant', type: 'reference', lookupModel: 'Applicant', required: true },
                        { key: 'requisitionId', label: 'Requisition', type: 'reference', lookupModel: 'JobRequisition', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.APPLICATION_STATUS, required: true },
                        { key: 'stage', label: 'Stage', type: 'select', options: enums.APPLICATION_STAGE }
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
                        { key: 'overallRating', label: 'Overall Rating', type: 'rating', min: 1, max: 5 },
                        { key: 'dispositionReason', label: 'Disposition Reason', type: 'select', options: enums.DISPOSITION_REASON },
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
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'name', label: 'Task Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'select', options: enums.ONBOARDING_TASK_CATEGORY, required: true }
                    ]
                },
                {
                    title: 'Assignment',
                    fields: [
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'ownerType', label: 'Owner Type', type: 'select', options: enums.TASK_OWNER },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ONBOARDING_TASK_STATUS, required: true },
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
    // EXPORT FORMS TO NAMESPACE
    // ============================================================================

    window.Talent.forms = TALENT_FORMS;
    window.Talent.primaryKeys = TALENT_PRIMARY_KEYS;

})();
