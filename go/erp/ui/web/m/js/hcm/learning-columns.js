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
 * Mobile Learning Management Module - Column Configurations
 * Desktop Equivalent: hcm/learning/learning-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileLearning.enums;
    const render = MobileLearning.render;

    MobileLearning.columns = {
        Course: [
            ...col.id('courseId'),
            ...col.col('code', 'Code'),
            ...col.col('title', 'Title'),
            ...col.status('courseType', 'Type', enums.COURSE_TYPE_VALUES, render.courseType),
            ...col.status('deliveryMethod', 'Delivery', enums.COURSE_DELIVERY_METHOD_VALUES, render.courseDeliveryMethod),
            ...col.status('level', 'Level', enums.COURSE_LEVEL_VALUES, render.courseLevel),
            ...col.custom('durationMinutes', 'Duration', (item) => render.duration(item.durationMinutes)),
            ...col.boolean('isActive', 'Active')
        ],

        CourseSession: [
            ...col.id('sessionId'),
            ...col.col('courseId', 'Course'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.col('instructorName', 'Instructor'),
            ...col.col('location', 'Location'),
            ...col.custom('enrollment', 'Enrolled', (item) => `${item.enrolledCount || 0}/${item.maxEnrollees || '-'}`),
            ...col.status('status', 'Status', enums.SESSION_STATUS_VALUES, render.sessionStatus)
        ],

        CourseEnrollment: [
            ...col.id('enrollmentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('courseId', 'Course'),
            ...col.status('status', 'Status', enums.COURSE_ENROLLMENT_STATUS_VALUES, render.courseEnrollmentStatus),
            ...col.custom('progressPercentage', 'Progress', (item) => render.percentage(item.progressPercentage)),
            ...col.col('score', 'Score'),
            ...col.boolean('passed', 'Passed', { trueText: 'Pass', falseText: 'Fail' }),
            ...col.date('dueDate', 'Due Date')
        ],

        Certification: [
            ...col.id('certificationId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('issuingOrganization', 'Issuer'),
            ...col.status('certificationType', 'Type', enums.CERTIFICATION_TYPE_VALUES, render.certificationType),
            ...col.col('validityMonths', 'Validity (mo)'),
            ...col.boolean('isActive', 'Active')
        ],

        EmployeeCertification: [
            ...col.id('employeeCertificationId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('certificationId', 'Certification'),
            ...col.col('certificationNumber', 'Cert #'),
            ...col.status('status', 'Status', enums.CERTIFICATION_STATUS_VALUES, render.certificationStatus),
            ...col.date('issueDate', 'Issue Date'),
            ...col.date('expirationDate', 'Expiration'),
            ...col.boolean('isVerified', 'Verified')
        ],

        Skill: [
            ...col.id('skillId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('category', 'Category', enums.SKILL_CATEGORY_VALUES, render.skillCategory),
            ...col.col('description', 'Description'),
            ...col.boolean('isActive', 'Active')
        ],

        EmployeeSkill: [
            ...col.id('employeeSkillId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('skillId', 'Skill'),
            ...col.custom('proficiencyLevel', 'Proficiency', (item) => render.proficiency(item.proficiencyLevel)),
            ...col.col('yearsOfExperience', 'Years Exp.'),
            ...col.boolean('isPrimarySkill', 'Primary'),
            ...col.date('lastUsedDate', 'Last Used')
        ],

        TrainingRecord: [
            ...col.id('recordId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('trainingName', 'Training'),
            ...col.status('trainingType', 'Type', enums.TRAINING_TYPE_VALUES, render.trainingType),
            ...col.date('completedDate', 'Completed'),
            ...col.date('expirationDate', 'Expiration'),
            ...col.boolean('passed', 'Passed', { trueText: 'Pass', falseText: 'Fail' }),
            ...col.boolean('isCompliant', 'Compliant')
        ]
    };

    MobileLearning.primaryKeys = {
        Course: 'courseId', CourseSession: 'sessionId', CourseEnrollment: 'enrollmentId',
        Certification: 'certificationId', EmployeeCertification: 'employeeCertificationId',
        Skill: 'skillId', EmployeeSkill: 'employeeSkillId', TrainingRecord: 'recordId'
    };

})();
