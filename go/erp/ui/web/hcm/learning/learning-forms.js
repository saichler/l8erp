// Learning Management Module - Form Definitions
// Part 3 of 4 - Load after learning-columns.js

(function() {
    'use strict';

    // Get enums from learning-enums.js
    const enums = window.Learning.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const LEARNING_FORMS = {
        Course: {
            title: 'Course',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'learningObjectives', label: 'Learning Objectives', type: 'textarea' }
                    ]
                },
                {
                    title: 'Course Details',
                    fields: [
                        { key: 'courseType', label: 'Course Type', type: 'select', options: enums.COURSE_TYPE, required: true },
                        { key: 'deliveryMethod', label: 'Delivery Method', type: 'select', options: enums.COURSE_DELIVERY_METHOD },
                        { key: 'category', label: 'Category', type: 'select', options: enums.COURSE_CATEGORY },
                        { key: 'level', label: 'Level', type: 'select', options: enums.COURSE_LEVEL },
                        { key: 'provider', label: 'Provider', type: 'text' },
                        { key: 'instructorId', label: 'Instructor', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Duration & Credits',
                    fields: [
                        { key: 'durationMinutes', label: 'Duration (minutes)', type: 'number' },
                        { key: 'credits', label: 'Credits', type: 'number' },
                        { key: 'ceuCredits', label: 'CEU Credits', type: 'number' },
                        { key: 'maxEnrollees', label: 'Max Enrollees', type: 'number' },
                        { key: 'isSelfPaced', label: 'Self-Paced', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Compliance',
                    fields: [
                        { key: 'isMandatory', label: 'Mandatory', type: 'checkbox' },
                        { key: 'recertificationMonths', label: 'Recertification (months)', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Resources',
                    fields: [
                        { key: 'syllabusUrl', label: 'Syllabus URL', type: 'url' },
                        { key: 'contentUrl', label: 'Content URL', type: 'url' }
                    ]
                }
            ]
        },

        CourseSession: {
            title: 'Course Session',
            sections: [
                {
                    title: 'Session Details',
                    fields: [
                        { key: 'courseId', label: 'Course', type: 'reference', lookupModel: 'Course', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.SESSION_STATUS, required: true },
                        { key: 'instructorId', label: 'Instructor', type: 'reference', lookupModel: 'Employee' },
                        { key: 'instructorName', label: 'Instructor Name', type: 'text' }
                    ]
                },
                {
                    title: 'Schedule',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' }
                    ]
                },
                {
                    title: 'Location',
                    fields: [
                        { key: 'location', label: 'Location', type: 'text' },
                        { key: 'virtualLink', label: 'Virtual Link', type: 'url' }
                    ]
                },
                {
                    title: 'Capacity',
                    fields: [
                        { key: 'maxEnrollees', label: 'Max Enrollees', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        CourseEnrollment: {
            title: 'Course Enrollment',
            sections: [
                {
                    title: 'Enrollment Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'courseId', label: 'Course', type: 'reference', lookupModel: 'Course', required: true },
                        { key: 'sessionId', label: 'Session', type: 'reference', lookupModel: 'CourseSession' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.COURSE_ENROLLMENT_STATUS, required: true },
                        { key: 'managerId', label: 'Manager', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'enrolledDate', label: 'Enrolled Date', type: 'date' },
                        { key: 'startedDate', label: 'Started Date', type: 'date' },
                        { key: 'completedDate', label: 'Completed Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' }
                    ]
                },
                {
                    title: 'Progress & Results',
                    fields: [
                        { key: 'progressPercentage', label: 'Progress', type: 'percentage', min: 0, max: 100 },
                        { key: 'score', label: 'Score', type: 'number' },
                        { key: 'passed', label: 'Passed', type: 'checkbox' },
                        { key: 'attempts', label: 'Attempts', type: 'number' }
                    ]
                },
                {
                    title: 'Feedback',
                    fields: [
                        { key: 'employeeRating', label: 'Employee Rating', type: 'rating', min: 1, max: 5 },
                        { key: 'employeeFeedback', label: 'Employee Feedback', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        Certification: {
            title: 'Certification',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'issuingOrganization', label: 'Issuing Organization', type: 'text' },
                        { key: 'certificationType', label: 'Type', type: 'select', options: enums.CERTIFICATION_TYPE, required: true }
                    ]
                },
                {
                    title: 'Requirements',
                    fields: [
                        { key: 'requiredExperienceMonths', label: 'Required Experience (months)', type: 'number' },
                        { key: 'requiredCeuCredits', label: 'Required CEU Credits', type: 'number' }
                    ]
                },
                {
                    title: 'Renewal',
                    fields: [
                        { key: 'validityMonths', label: 'Validity (months)', type: 'number' },
                        { key: 'requiresRenewal', label: 'Requires Renewal', type: 'checkbox' },
                        { key: 'examUrl', label: 'Exam URL', type: 'url' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        EmployeeCertification: {
            title: 'Employee Certification',
            sections: [
                {
                    title: 'Certification Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'certificationId', label: 'Certification', type: 'reference', lookupModel: 'Certification', required: true },
                        { key: 'certificationNumber', label: 'Certification Number', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CERTIFICATION_STATUS, required: true }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'issueDate', label: 'Issue Date', type: 'date', required: true },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' }
                    ]
                },
                {
                    title: 'Verification',
                    fields: [
                        { key: 'isVerified', label: 'Verified', type: 'checkbox' },
                        { key: 'verifiedBy', label: 'Verified By', type: 'text' },
                        { key: 'verifiedDate', label: 'Verified Date', type: 'date' },
                        { key: 'documentId', label: 'Document ID', type: 'text' },
                        { key: 'ceuCreditsEarned', label: 'CEU Credits Earned', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        Skill: {
            title: 'Skill',
            sections: [
                {
                    title: 'Skill Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'select', options: enums.SKILL_CATEGORY, required: true },
                        { key: 'skillGroupId', label: 'Skill Group ID', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        EmployeeSkill: {
            title: 'Employee Skill',
            sections: [
                {
                    title: 'Skill Assignment',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'skillId', label: 'Skill', type: 'reference', lookupModel: 'Skill', required: true }
                    ]
                },
                {
                    title: 'Proficiency',
                    fields: [
                        { key: 'proficiencyLevel', label: 'Proficiency Level', type: 'rating', min: 1, max: 5, required: true },
                        { key: 'selfAssessedLevel', label: 'Self-Assessed Level', type: 'rating', min: 1, max: 5 },
                        { key: 'managerAssessedLevel', label: 'Manager-Assessed Level', type: 'rating', min: 1, max: 5 },
                        { key: 'yearsOfExperience', label: 'Years of Experience', type: 'number' }
                    ]
                },
                {
                    title: 'Assessment',
                    fields: [
                        { key: 'lastUsedDate', label: 'Last Used Date', type: 'date' },
                        { key: 'assessmentDate', label: 'Assessment Date', type: 'date' },
                        { key: 'assessedBy', label: 'Assessed By', type: 'text' },
                        { key: 'isPrimarySkill', label: 'Primary Skill', type: 'checkbox' },
                        { key: 'wantsToDevelop', label: 'Wants to Develop', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        TrainingRecord: {
            title: 'Training Record',
            sections: [
                {
                    title: 'Training Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'courseId', label: 'Course', type: 'reference', lookupModel: 'Course' },
                        { key: 'trainingName', label: 'Training Name', type: 'text', required: true },
                        { key: 'trainingType', label: 'Training Type', type: 'select', options: enums.TRAINING_TYPE, required: true }
                    ]
                },
                {
                    title: 'Completion',
                    fields: [
                        { key: 'completedDate', label: 'Completed Date', type: 'date', required: true },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' },
                        { key: 'score', label: 'Score', type: 'number' },
                        { key: 'passed', label: 'Passed', type: 'checkbox' },
                        { key: 'hours', label: 'Hours', type: 'hours' }
                    ]
                },
                {
                    title: 'Compliance',
                    fields: [
                        { key: 'isCompliant', label: 'Compliant', type: 'checkbox' },
                        { key: 'complianceRequirement', label: 'Compliance Requirement', type: 'text' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'trainerName', label: 'Trainer Name', type: 'text' },
                        { key: 'location', label: 'Location', type: 'text' },
                        { key: 'certificateId', label: 'Certificate ID', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    const LEARNING_PRIMARY_KEYS = {
        Course: 'courseId',
        CourseSession: 'sessionId',
        CourseEnrollment: 'enrollmentId',
        Certification: 'certificationId',
        EmployeeCertification: 'employeeCertificationId',
        Skill: 'skillId',
        EmployeeSkill: 'employeeSkillId',
        TrainingRecord: 'recordId'
    };

    // ============================================================================
    // EXPORT FORMS TO NAMESPACE
    // ============================================================================

    window.Learning.forms = LEARNING_FORMS;
    window.Learning.primaryKeys = LEARNING_PRIMARY_KEYS;

})();
