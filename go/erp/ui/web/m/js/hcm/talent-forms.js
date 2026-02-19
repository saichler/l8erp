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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Talent Management Module - Form Configurations
 * Desktop Equivalent: hcm/talent/talent-forms.js
 */
window.MobileTalent = window.MobileTalent || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileTalent.enums;

    MobileTalent.forms = {
        PerformanceReview: f.form('Performance Review', [
            f.section('Basic Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('reviewerId', 'Reviewer', 'Employee', true),
                ...f.select('reviewType', 'Review Type', enums.REVIEW_TYPE, true),
                ...f.select('status', 'Status', enums.PERFORMANCE_REVIEW_STATUS, true),
                ...f.date('reviewPeriod.startDate', 'Review Period Start'),
                ...f.date('reviewPeriod.endDate', 'Review Period End'),
                ...f.text('trainingRecommendations', 'Training Recommendations'),
                ...f.date('employeeAcknowledgedDate', 'Employee Acknowledged Date'),
                ...f.date('managerSubmittedDate', 'Manager Submitted Date'),
                ...f.text('hrReviewerId', 'Hr Reviewer'),
                ...f.date('hrApprovedDate', 'Hr Approved Date'),
                ...f.checkbox('isCalibrated', 'Calibrated'),
                ...f.text('calibrationNotes', 'Calibration Notes'),
            ]),
            f.section('Review Period', [
                ...f.date('reviewPeriod.startDate', 'Start Date', true),
                ...f.date('reviewPeriod.endDate', 'End Date', true)
            ]),
            f.section('Rating', [
                ...f.rating('overallRating', 'Overall Rating'),
                ...f.text('overallRatingLabel', 'Rating Label')
            ]),
            f.section('Comments', [
                ...f.textarea('employeeComments', 'Employee Comments'),
                ...f.textarea('managerComments', 'Manager Comments'),
                ...f.textarea('summary', 'Summary'),
                ...f.textarea('developmentPlan', 'Development Plan')
            ])
        ]),

        Goal: f.form('Goal', [
            f.section('Basic Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('parentGoalId', 'Parent Goal', 'Goal'),
                ...f.text('alignedGoalIds', 'Aligned Goal Ids'),
                ...f.text('reviewId', 'Review'),
            ]),
            f.section('Classification', [
                ...f.select('goalType', 'Goal Type', enums.GOAL_TYPE, true),
                ...f.select('goalCategory', 'Category', enums.GOAL_CATEGORY),
                ...f.select('priority', 'Priority', enums.GOAL_PRIORITY),
                ...f.select('status', 'Status', enums.GOAL_STATUS, true)
            ]),
            f.section('Dates & Progress', [
                ...f.date('startDate', 'Start Date'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('completedDate', 'Completed Date'),
                ...f.percentage('completionPercentage', 'Completion'),
                ...f.number('weight', 'Weight')
            ])
        ]),

        Feedback: f.form('Feedback', [
            f.section('Basic Information', [
                ...f.reference('employeeId', 'Employee (Receiving)', 'Employee', true),
                ...f.reference('providerId', 'Provider (Giving)', 'Employee', true),
                ...f.select('feedbackType', 'Feedback Type', enums.FEEDBACK_TYPE, true),
                ...f.select('relationship', 'Relationship', enums.FEEDBACK_RELATIONSHIP),
                ...f.select('status', 'Status', enums.FEEDBACK_STATUS, true),
                ...f.text('reviewCycleId', 'Review Cycle'),
            ]),
            f.section('Dates', [
                ...f.date('requestedDate', 'Requested Date'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('submittedDate', 'Submitted Date')
            ]),
            f.section('Content', [
                ...f.textarea('generalComments', 'General Comments'),
                ...f.checkbox('isAnonymous', 'Anonymous')
            ])
        ]),

        CareerPath: f.form('Career Path', [
            f.section('Basic Information', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('jobFamilyId', 'Job Family', 'JobFamily'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        SuccessionPlan: f.form('Succession Plan', [
            f.section('Position Information', [
                ...f.reference('positionId', 'Position', 'Position', true),
                ...f.reference('incumbentId', 'Current Incumbent', 'Employee'),
                ...f.select('status', 'Status', enums.SUCCESSION_PLAN_STATUS, true)
            ]),
            f.section('Risk Assessment', [
                ...f.select('vacancyRisk', 'Vacancy Risk', enums.RISK_LEVEL),
                ...f.textarea('impactAssessment', 'Impact Assessment')
            ]),
            f.section('Review', [
                ...f.date('reviewDate', 'Review Date'),
                ...f.date('nextReviewDate', 'Next Review Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        JobRequisition: f.form('Job Requisition', [
            f.section('Basic Information', [
                ...f.text('requisitionNumber', 'Requisition Number'),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.select('requisitionType', 'Type', enums.REQUISITION_TYPE, true),
                ...f.select('status', 'Status', enums.REQUISITION_STATUS, true),
                ...f.number('filledCount', 'Filled Count'),
                ...f.select('employmentType', 'Employment Type', enums.EMPLOYMENT_TYPE),
                ...f.text('workLocationId', 'Work Location'),
                ...f.money('salaryMin', 'Salary Min'),
                ...f.money('salaryMax', 'Salary Max'),
                ...f.text('payGradeCode', 'Pay Grade Code'),
                ...f.text('interviewTeamIds', 'Interview Team Ids'),
                ...f.text('jobBoardIds', 'Job Board Ids'),
                ...f.number('applicantCount', 'Applicant Count'),
                ...f.number('interviewCount', 'Interview Count'),
                ...f.number('offerCount', 'Offer Count'),
            ]),
            f.section('Position Details', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.reference('departmentId', 'Department', 'Department'),
                ...f.reference('positionId', 'Position', 'Position'),
                ...f.reference('jobId', 'Job', 'Job'),
                ...f.number('openings', 'Number of Openings', true),
                ...f.checkbox('isRemote', 'Remote Position')
            ]),
            f.section('Hiring Team', [
                ...f.reference('hiringManagerId', 'Hiring Manager', 'Employee'),
                ...f.reference('recruiterId', 'Recruiter', 'Employee')
            ]),
            f.section('Dates', [
                ...f.date('targetStartDate', 'Target Start Date'),
                ...f.date('postedDate', 'Posted Date'),
                ...f.date('closeDate', 'Close Date')
            ]),
            f.section('Posting', [
                ...f.checkbox('isPostedInternal', 'Posted Internal'),
                ...f.checkbox('isPostedExternal', 'Posted External'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        Applicant: f.form('Applicant', [
            f.section('Personal Information', [
                ...f.text('firstName', 'First Name', true),
                ...f.text('lastName', 'Last Name', true),
                ...f.address('address'),
                ...f.text('documentIds', 'Document Ids'),
                ...f.text('skills', 'Skills'),
                ...f.select('gender', 'Gender', enums.GENDER),
                ...f.text('ethnicity', 'Ethnicity'),
                ...f.checkbox('isVeteran', 'Veteran'),
                ...f.checkbox('isDisabled', 'Disabled'),
                ...f.date('createdDate', 'Created Date'),
                ...f.email('email', 'Email', true),
                ...f.phone('phone', 'Phone')
            ]),
            f.section('Source', [
                ...f.select('source', 'Source', enums.APPLICANT_SOURCE),
                ...f.text('sourceDetails', 'Source Details'),
                ...f.reference('referrerEmployeeId', 'Referrer', 'Employee')
            ]),
            f.section('Online Profiles', [
                ...f.url('linkedinUrl', 'LinkedIn URL'),
                ...f.url('portfolioUrl', 'Portfolio URL'),
                ...f.url('resumeUrl', 'Resume URL'),
                ...f.url('coverLetterUrl', 'Cover Letter URL')
            ])
        ]),

        Application: f.form('Application', [
            f.section('Basic Information', [
                ...f.reference('applicantId', 'Applicant', 'Applicant', true),
                ...f.reference('requisitionId', 'Requisition', 'JobRequisition', true),
                ...f.select('status', 'Status', enums.APPLICATION_STATUS, true),
                ...f.select('stage', 'Stage', enums.APPLICATION_STAGE),
                ...f.date('appliedDate', 'Applied Date'),
                ...f.text('offerId', 'Offer'),
            ]),
            f.section('Screening', [
                ...f.number('screeningScore', 'Screening Score'),
                ...f.checkbox('passedScreening', 'Passed Screening')
            ]),
            f.section('Rating & Disposition', [
                ...f.rating('overallRating', 'Overall Rating'),
                ...f.select('dispositionReason', 'Disposition Reason', enums.DISPOSITION_REASON),
                ...f.date('dispositionDate', 'Disposition Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        OnboardingTask: f.form('Onboarding Task', [
            f.section('Task Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.text('name', 'Task Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('category', 'Category', enums.ONBOARDING_TASK_CATEGORY, true),
                ...f.text('templateId', 'Template'),
                ...f.text('prerequisiteTaskIds', 'Prerequisite Task Ids'),
                ...f.text('documentIds', 'Document Ids'),
                ...f.text('formId', 'Form'),
            ]),
            f.section('Assignment', [
                ...f.reference('assignedTo', 'Assigned To', 'Employee'),
                ...f.select('ownerType', 'Owner Type', enums.TASK_OWNER),
                ...f.select('status', 'Status', enums.ONBOARDING_TASK_STATUS, true),
                ...f.number('sequenceOrder', 'Sequence Order')
            ]),
            f.section('Dates', [
                ...f.date('dueDate', 'Due Date'),
                ...f.date('completedDate', 'Completed Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
