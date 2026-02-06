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
// Learning Management Module - Column Configurations
// Part 2 of 4 - Load after learning-enums.js

(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const { renderBoolean } = Layer8DRenderers;
    const enums = window.Learning.enums;
    const internal = window.Learning._internal;

    window.Learning.columns = {
        Course: [
            ...col.id('courseId'),
            ...col.basic(['code', 'title']),
            ...col.enum('courseType', 'Type', enums.COURSE_TYPE_VALUES, internal.renderCourseType),
            ...col.enum('deliveryMethod', 'Delivery', enums.COURSE_DELIVERY_METHOD_VALUES, internal.renderCourseDeliveryMethod),
            ...col.enum('level', 'Level', enums.COURSE_LEVEL_VALUES, internal.renderCourseLevel),
            ...col.custom('durationMinutes', 'Duration', (item) => internal.renderDurationMinutes(item.durationMinutes)),
            ...col.boolean('isActive', 'Active')
        ],

        CourseSession: [
            ...col.id('sessionId'),
            ...col.col('courseId', 'Course'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.basic([['instructorName', 'Instructor'], 'location']),
            ...col.custom('enrollment', 'Enrolled', (item) => `${item.enrolledCount || 0}/${item.maxEnrollees || '-'}`, { sortKey: false }),
            ...col.enum('status', 'Status', enums.SESSION_STATUS_VALUES, internal.renderSessionStatus)
        ],

        CourseEnrollment: [
            ...col.id('enrollmentId'),
            ...col.basic([['employeeId', 'Employee'], ['courseId', 'Course']]),
            ...col.enum('status', 'Status', enums.COURSE_ENROLLMENT_STATUS_VALUES, internal.renderCourseEnrollmentStatus),
            ...col.custom('progressPercentage', 'Progress', (item) => internal.renderPercentageLearning(item.progressPercentage)),
            ...col.col('score', 'Score'),
            ...col.custom('passed', 'Passed', (item) => renderBoolean(item.passed, { trueText: 'Pass', falseText: 'Fail' })),
            ...col.date('dueDate', 'Due Date')
        ],

        Certification: [
            ...col.id('certificationId'),
            ...col.basic(['code', 'name', ['issuingOrganization', 'Issuer']]),
            ...col.enum('certificationType', 'Type', enums.CERTIFICATION_TYPE_VALUES, internal.renderCertificationType),
            ...col.col('validityMonths', 'Validity (mo)'),
            ...col.boolean('isActive', 'Active')
        ],

        EmployeeCertification: [
            ...col.id('employeeCertificationId'),
            ...col.basic([['employeeId', 'Employee'], ['certificationId', 'Certification'], ['certificationNumber', 'Cert #']]),
            ...col.enum('status', 'Status', enums.CERTIFICATION_STATUS_VALUES, internal.renderCertificationStatus),
            ...col.date('issueDate', 'Issue Date'),
            ...col.date('expirationDate', 'Expiration'),
            ...col.boolean('isVerified', 'Verified')
        ],

        Skill: [
            ...col.id('skillId'),
            ...col.basic(['code', 'name']),
            ...col.enum('category', 'Category', enums.SKILL_CATEGORY_VALUES, internal.renderSkillCategory),
            ...col.col('description', 'Description'),
            ...col.boolean('isActive', 'Active')
        ],

        EmployeeSkill: [
            ...col.id('employeeSkillId'),
            ...col.basic([['employeeId', 'Employee'], ['skillId', 'Skill']]),
            ...col.custom('proficiencyLevel', 'Proficiency', (item) => internal.renderProficiencyLevel(item.proficiencyLevel)),
            ...col.col('yearsOfExperience', 'Years Exp.'),
            ...col.boolean('isPrimarySkill', 'Primary'),
            ...col.date('lastUsedDate', 'Last Used')
        ],

        TrainingRecord: [
            ...col.id('recordId'),
            ...col.basic([['employeeId', 'Employee'], ['trainingName', 'Training']]),
            ...col.enum('trainingType', 'Type', enums.TRAINING_TYPE_VALUES, internal.renderTrainingType),
            ...col.date('completedDate', 'Completed'),
            ...col.date('expirationDate', 'Expiration'),
            ...col.custom('passed', 'Passed', (item) => renderBoolean(item.passed, { trueText: 'Pass', falseText: 'Fail' })),
            ...col.boolean('isCompliant', 'Compliant')
        ]
    };
})();
