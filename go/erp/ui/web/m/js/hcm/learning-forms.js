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
 * Mobile Learning Management Module - Form Configurations
 * Desktop Equivalent: hcm/learning/learning-forms.js
 */
window.MobileLearning = window.MobileLearning || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileLearning.enums;

    MobileLearning.forms = {
        Course: f.form('Course', [
            f.section('Basic Information', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.text('code', 'Code', true),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.textarea('learningObjectives', 'Learning Objectives'),
                ...f.text('prerequisiteCourseIds', 'Prerequisite Course Ids'),
                ...f.text('requiredSkills', 'Required Skills'),
                ...f.text('applicableJobIds', 'Applicable Job Ids'),
                ...f.money('costPerPerson', 'Cost Per Person'),
                ...f.number('averageRating', 'Average Rating'),
                ...f.number('totalCompletions', 'Total Completions'),
            ]),
            f.section('Course Details', [
                ...f.select('courseType', 'Course Type', enums.COURSE_TYPE, true),
                ...f.select('deliveryMethod', 'Delivery Method', enums.COURSE_DELIVERY_METHOD),
                ...f.select('category', 'Category', enums.COURSE_CATEGORY),
                ...f.select('level', 'Level', enums.COURSE_LEVEL),
                ...f.text('provider', 'Provider'),
                ...f.reference('instructorId', 'Instructor', 'Employee')
            ]),
            f.section('Duration & Credits', [
                ...f.number('durationMinutes', 'Duration (minutes)'),
                ...f.number('credits', 'Credits'),
                ...f.number('ceuCredits', 'CEU Credits'),
                ...f.number('maxEnrollees', 'Max Enrollees'),
                ...f.checkbox('isSelfPaced', 'Self-Paced')
            ]),
            f.section('Compliance', [
                ...f.checkbox('isMandatory', 'Mandatory'),
                ...f.number('recertificationMonths', 'Recertification (months)'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Resources', [
                ...f.url('syllabusUrl', 'Syllabus URL'),
                ...f.url('contentUrl', 'Content URL')
            ])
        ]),

        CourseSession: f.form('Course Session', [
            f.section('Session Details', [
                ...f.reference('courseId', 'Course', 'Course', true),
                ...f.select('status', 'Status', enums.SESSION_STATUS, true),
                ...f.reference('instructorId', 'Instructor', 'Employee'),
                ...f.text('instructorName', 'Instructor Name'),
                ...f.number('enrolledCount', 'Enrolled Count'),
                ...f.number('waitlistCount', 'Waitlist Count'),
                ...f.number('completedCount', 'Completed Count'),
            ]),
            f.section('Schedule', [
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date')
            ]),
            f.section('Location', [
                ...f.text('location', 'Location'),
                ...f.url('virtualLink', 'Virtual Link')
            ]),
            f.section('Capacity', [
                ...f.number('maxEnrollees', 'Max Enrollees'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CourseEnrollment: f.form('Course Enrollment', [
            f.section('Enrollment Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('courseId', 'Course', 'Course', true),
                ...f.reference('sessionId', 'Session', 'CourseSession'),
                ...f.select('status', 'Status', enums.COURSE_ENROLLMENT_STATUS, true),
                ...f.reference('managerId', 'Manager', 'Employee'),
                ...f.text('completionCertificateUrl', 'Completion Certificate URL'),
                ...f.text('approvedBy', 'Approved By'),
                ...f.date('approvedDate', 'Approved Date'),
            ]),
            f.section('Dates', [
                ...f.date('enrolledDate', 'Enrolled Date'),
                ...f.date('startedDate', 'Started Date'),
                ...f.date('completedDate', 'Completed Date'),
                ...f.date('dueDate', 'Due Date')
            ]),
            f.section('Progress & Results', [
                ...f.percentage('progressPercentage', 'Progress'),
                ...f.number('score', 'Score'),
                ...f.checkbox('passed', 'Passed'),
                ...f.number('attempts', 'Attempts')
            ]),
            f.section('Feedback', [
                ...f.rating('employeeRating', 'Employee Rating'),
                ...f.textarea('employeeFeedback', 'Employee Feedback'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        Certification: f.form('Certification', [
            f.section('Basic Information', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('issuingOrganization', 'Issuing Organization'),
                ...f.select('certificationType', 'Type', enums.CERTIFICATION_TYPE, true),
                ...f.text('requiredCourseIds', 'Required Course Ids'),
                ...f.text('prerequisiteCertificationIds', 'Prerequisite Certification Ids'),
                ...f.text('renewalCourseIds', 'Renewal Course Ids'),
                ...f.money('examCost', 'Exam Cost'),
                ...f.money('renewalCost', 'Renewal Cost'),
            ]),
            f.section('Requirements', [
                ...f.number('requiredExperienceMonths', 'Required Experience (months)'),
                ...f.number('requiredCeuCredits', 'Required CEU Credits')
            ]),
            f.section('Renewal', [
                ...f.number('validityMonths', 'Validity (months)'),
                ...f.checkbox('requiresRenewal', 'Requires Renewal'),
                ...f.url('examUrl', 'Exam URL'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        EmployeeCertification: f.form('Employee Certification', [
            f.section('Certification Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('certificationId', 'Certification', 'Certification', true),
                ...f.text('certificationNumber', 'Certification Number'),
                ...f.select('status', 'Status', enums.CERTIFICATION_STATUS, true)
            ]),
            f.section('Dates', [
                ...f.date('issueDate', 'Issue Date', true),
                ...f.date('expirationDate', 'Expiration Date')
            ]),
            f.section('Verification', [
                ...f.checkbox('isVerified', 'Verified'),
                ...f.text('verifiedBy', 'Verified By'),
                ...f.date('verifiedDate', 'Verified Date'),
                ...f.text('documentId', 'Document ID'),
                ...f.number('ceuCreditsEarned', 'CEU Credits Earned'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        Skill: f.form('Skill', [
            f.section('Skill Information', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('category', 'Category', enums.SKILL_CATEGORY, true),
                ...f.text('skillGroupId', 'Skill Group ID'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        EmployeeSkill: f.form('Employee Skill', [
            f.section('Skill Assignment', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('skillId', 'Skill', 'Skill', true)
            ]),
            f.section('Proficiency', [
                ...f.rating('proficiencyLevel', 'Proficiency Level', true),
                ...f.rating('selfAssessedLevel', 'Self-Assessed Level'),
                ...f.rating('managerAssessedLevel', 'Manager-Assessed Level'),
                ...f.number('yearsOfExperience', 'Years of Experience')
            ]),
            f.section('Assessment', [
                ...f.date('lastUsedDate', 'Last Used Date'),
                ...f.date('assessmentDate', 'Assessment Date'),
                ...f.text('assessedBy', 'Assessed By'),
                ...f.checkbox('isPrimarySkill', 'Primary Skill'),
                ...f.checkbox('wantsToDevelop', 'Wants to Develop'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        TrainingRecord: f.form('Training Record', [
            f.section('Training Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('courseId', 'Course', 'Course'),
                ...f.text('trainingName', 'Training Name', true),
                ...f.select('trainingType', 'Training Type', enums.TRAINING_TYPE, true),
                ...f.text('documentId', 'Document'),
            ]),
            f.section('Completion', [
                ...f.date('completedDate', 'Completed Date', true),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.number('score', 'Score'),
                ...f.checkbox('passed', 'Passed'),
                ...f.hours('hours', 'Hours')
            ]),
            f.section('Compliance', [
                ...f.checkbox('isCompliant', 'Compliant'),
                ...f.text('complianceRequirement', 'Compliance Requirement')
            ]),
            f.section('Details', [
                ...f.text('trainerName', 'Trainer Name'),
                ...f.text('location', 'Location'),
                ...f.text('certificateId', 'Certificate ID'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
