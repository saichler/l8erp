/**
 * Mobile Learning Management Module - Column Configurations
 * Desktop Equivalent: hcm/learning/learning-columns.js
 */
(function() {
    'use strict';

    const enums = MobileLearning.enums;
    const render = MobileLearning.render;

    MobileLearning.columns = {
        Course: [
            { key: 'courseId', label: 'ID', sortKey: 'courseId', filterKey: 'courseId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'courseType', label: 'Type', sortKey: 'courseType', filterKey: 'courseType', enumValues: enums.COURSE_TYPE_VALUES, render: (item) => render.courseType(item.courseType) },
            { key: 'deliveryMethod', label: 'Delivery', sortKey: 'deliveryMethod', filterKey: 'deliveryMethod', enumValues: enums.COURSE_DELIVERY_METHOD_VALUES, render: (item) => render.courseDeliveryMethod(item.deliveryMethod) },
            { key: 'level', label: 'Level', sortKey: 'level', filterKey: 'level', enumValues: enums.COURSE_LEVEL_VALUES, render: (item) => render.courseLevel(item.level) },
            { key: 'durationMinutes', label: 'Duration', sortKey: 'durationMinutes', render: (item) => render.duration(item.durationMinutes) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => MobileRenderers.renderBoolean(item.isActive) }
        ],

        CourseSession: [
            { key: 'sessionId', label: 'ID', sortKey: 'sessionId', filterKey: 'sessionId' },
            { key: 'courseId', label: 'Course', sortKey: 'courseId', filterKey: 'courseId' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => MobileRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => MobileRenderers.renderDate(item.endDate) },
            { key: 'instructorName', label: 'Instructor', sortKey: 'instructorName', filterKey: 'instructorName' },
            { key: 'location', label: 'Location', sortKey: 'location', filterKey: 'location' },
            { key: 'enrollment', label: 'Enrolled', render: (item) => `${item.enrolledCount || 0}/${item.maxEnrollees || '-'}` },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.SESSION_STATUS_VALUES, render: (item) => render.sessionStatus(item.status) }
        ],

        CourseEnrollment: [
            { key: 'enrollmentId', label: 'ID', sortKey: 'enrollmentId', filterKey: 'enrollmentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'courseId', label: 'Course', sortKey: 'courseId', filterKey: 'courseId' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.COURSE_ENROLLMENT_STATUS_VALUES, render: (item) => render.courseEnrollmentStatus(item.status) },
            { key: 'progressPercentage', label: 'Progress', sortKey: 'progressPercentage', render: (item) => render.percentage(item.progressPercentage) },
            { key: 'score', label: 'Score', sortKey: 'score' },
            { key: 'passed', label: 'Passed', sortKey: 'passed', render: (item) => MobileRenderers.renderBoolean(item.passed, { trueText: 'Pass', falseText: 'Fail' }) },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => MobileRenderers.renderDate(item.dueDate) }
        ],

        Certification: [
            { key: 'certificationId', label: 'ID', sortKey: 'certificationId', filterKey: 'certificationId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'issuingOrganization', label: 'Issuer', sortKey: 'issuingOrganization', filterKey: 'issuingOrganization' },
            { key: 'certificationType', label: 'Type', sortKey: 'certificationType', filterKey: 'certificationType', enumValues: enums.CERTIFICATION_TYPE_VALUES, render: (item) => render.certificationType(item.certificationType) },
            { key: 'validityMonths', label: 'Validity (mo)', sortKey: 'validityMonths' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => MobileRenderers.renderBoolean(item.isActive) }
        ],

        EmployeeCertification: [
            { key: 'employeeCertificationId', label: 'ID', sortKey: 'employeeCertificationId', filterKey: 'employeeCertificationId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'certificationId', label: 'Certification', sortKey: 'certificationId', filterKey: 'certificationId' },
            { key: 'certificationNumber', label: 'Cert #', sortKey: 'certificationNumber', filterKey: 'certificationNumber' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.CERTIFICATION_STATUS_VALUES, render: (item) => render.certificationStatus(item.status) },
            { key: 'issueDate', label: 'Issue Date', sortKey: 'issueDate', render: (item) => MobileRenderers.renderDate(item.issueDate) },
            { key: 'expirationDate', label: 'Expiration', sortKey: 'expirationDate', render: (item) => MobileRenderers.renderDate(item.expirationDate) },
            { key: 'isVerified', label: 'Verified', sortKey: 'isVerified', render: (item) => MobileRenderers.renderBoolean(item.isVerified) }
        ],

        Skill: [
            { key: 'skillId', label: 'ID', sortKey: 'skillId', filterKey: 'skillId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category', enumValues: enums.SKILL_CATEGORY_VALUES, render: (item) => render.skillCategory(item.category) },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => MobileRenderers.renderBoolean(item.isActive) }
        ],

        EmployeeSkill: [
            { key: 'employeeSkillId', label: 'ID', sortKey: 'employeeSkillId', filterKey: 'employeeSkillId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'skillId', label: 'Skill', sortKey: 'skillId', filterKey: 'skillId' },
            { key: 'proficiencyLevel', label: 'Proficiency', sortKey: 'proficiencyLevel', render: (item) => render.proficiency(item.proficiencyLevel) },
            { key: 'yearsOfExperience', label: 'Years Exp.', sortKey: 'yearsOfExperience' },
            { key: 'isPrimarySkill', label: 'Primary', sortKey: 'isPrimarySkill', render: (item) => MobileRenderers.renderBoolean(item.isPrimarySkill) },
            { key: 'lastUsedDate', label: 'Last Used', sortKey: 'lastUsedDate', render: (item) => MobileRenderers.renderDate(item.lastUsedDate) }
        ],

        TrainingRecord: [
            { key: 'recordId', label: 'ID', sortKey: 'recordId', filterKey: 'recordId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'trainingName', label: 'Training', sortKey: 'trainingName', filterKey: 'trainingName' },
            { key: 'trainingType', label: 'Type', sortKey: 'trainingType', filterKey: 'trainingType', enumValues: enums.TRAINING_TYPE_VALUES, render: (item) => render.trainingType(item.trainingType) },
            { key: 'completedDate', label: 'Completed', sortKey: 'completedDate', render: (item) => MobileRenderers.renderDate(item.completedDate) },
            { key: 'expirationDate', label: 'Expiration', sortKey: 'expirationDate', render: (item) => MobileRenderers.renderDate(item.expirationDate) },
            { key: 'passed', label: 'Passed', sortKey: 'passed', render: (item) => MobileRenderers.renderBoolean(item.passed, { trueText: 'Pass', falseText: 'Fail' }) },
            { key: 'isCompliant', label: 'Compliant', sortKey: 'isCompliant', render: (item) => MobileRenderers.renderBoolean(item.isCompliant) }
        ]
    };

    MobileLearning.primaryKeys = {
        Course: 'courseId', CourseSession: 'sessionId', CourseEnrollment: 'enrollmentId',
        Certification: 'certificationId', EmployeeCertification: 'employeeCertificationId',
        Skill: 'skillId', EmployeeSkill: 'employeeSkillId', TrainingRecord: 'recordId'
    };

})();
