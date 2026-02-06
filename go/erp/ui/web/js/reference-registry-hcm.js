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
 * ERP Reference Registry - HCM Models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const ref = window.Layer8RefFactory;

Layer8DReferenceRegistry.register({
    // ========================================
    // Core HR Models
    // ========================================
    ...ref.person('Employee', 'employeeId'),
    ...ref.batch([
        ['Organization', 'organizationId', 'name'],
        ['Department', 'departmentId', 'name'],
        ['HcmDepartment', 'departmentId', 'name'],  // Alias for Department
        ['Position', 'positionId', 'title'],
        ['Job', 'jobId', 'title'],
        ['JobFamily', 'jobFamilyId', 'name'],
        ['EmployeeDocument', 'documentId', 'name']
    ]),
    ...ref.idOnly('ComplianceRecord', 'recordId'),

    // ========================================
    // Time & Attendance Models
    // ========================================
    ...ref.batchIdOnly([
        ['Timesheet', 'timesheetId'],
        ['LeaveRequest', 'requestId'],
        ['LeaveBalance', 'balanceId'],
        ['Schedule', 'scheduleId'],
        ['Absence', 'absenceId']
    ]),
    ...ref.batch([
        ['LeavePolicy', 'policyId', 'name'],
        ['Shift', 'shiftId', 'name'],
        ['Holiday', 'holidayId', 'name']
    ]),

    // ========================================
    // Benefits Models
    // ========================================
    ...ref.batch([
        ['BenefitPlan', 'planId', 'name'],
        ['Carrier', 'carrierId', 'name']
    ]),
    ...ref.batchIdOnly([
        ['BenefitEnrollment', 'enrollmentId'],
        ['COBRAEvent', 'cobraEventId']
    ]),
    ...ref.person('Dependent', 'dependentId'),
    ...ref.simple('LifeEvent', 'eventId', 'eventType'),

    // ========================================
    // Talent Management Models
    // ========================================
    ...ref.batchIdOnly([
        ['PerformanceReview', 'reviewId'],
        ['Feedback', 'feedbackId'],
        ['SuccessionPlan', 'planId'],
        ['Application', 'applicationId']
    ]),
    ...ref.batch([
        ['Goal', 'goalId', 'title'],
        ['CareerPath', 'careerPathId', 'name'],
        ['JobRequisition', 'requisitionId', 'title'],
        ['OnboardingTask', 'taskId', 'name']
    ]),
    ...ref.person('Applicant', 'applicantId'),

    // ========================================
    // Learning Models
    // ========================================
    ...ref.batch([
        ['Course', 'courseId', 'title'],
        ['Certification', 'certificationId', 'name'],
        ['Skill', 'skillId', 'name'],
        ['TrainingRecord', 'recordId', 'trainingName']
    ]),
    ...ref.batchIdOnly([
        ['CourseSession', 'sessionId'],
        ['CourseEnrollment', 'enrollmentId'],
        ['EmployeeCertification', 'employeeCertificationId'],
        ['EmployeeSkill', 'employeeSkillId']
    ]),

    // ========================================
    // Compensation Models
    // ========================================
    ...ref.batch([
        ['SalaryStructure', 'structureId', 'name'],
        ['SalaryGrade', 'gradeId', 'name'],
        ['MeritCycle', 'cycleId', 'name'],
        ['BonusPlan', 'planId', 'name'],
        ['MarketBenchmark', 'benchmarkId', 'jobTitle']
    ]),
    ...ref.batchIdOnly([
        ['EmployeeCompensation', 'compensationId'],
        ['MeritIncrease', 'increaseId'],
        ['BonusPayment', 'paymentId'],
        ['CompensationStatement', 'statementId']
    ]),
    ...ref.simple('EquityGrant', 'grantId', 'grantNumber'),

    // ========================================
    // Payroll Models
    // ========================================
    ...ref.batch([
        ['PayStructure', 'structureId', 'name'],
        ['PayComponent', 'componentId', 'name']
    ]),
    ...ref.batchIdOnly([
        ['PayrollRun', 'payrollRunId'],
        ['Payslip', 'payslipId'],
        ['TaxWithholding', 'withholdingId'],
        ['DirectDeposit', 'depositId'],
        ['Garnishment', 'garnishmentId']
    ]),
    ...ref.simple('YearEndDocument', 'documentId', 'documentType')
});
