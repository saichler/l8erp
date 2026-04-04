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
 * Shared Reference Data - HCM Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataHcm = {
        // ========================================
        // Core HR Models
        // ========================================
        ...ref.person('Employee', 'employeeId'),
        ...ref.simple('Organization', 'organizationId', 'name'),
        ...ref.simple('Department', 'departmentId', 'name'),
        ...ref.simple('HcmDepartment', 'departmentId', 'name'),  // Alias for Department
        ...ref.simple('Position', 'positionId', 'title'),
        ...ref.simple('Job', 'jobId', 'title'),
        ...ref.simple('JobFamily', 'jobFamilyId', 'name'),
        ...ref.simple('EmployeeDocument', 'documentId', 'name'),
        ...ref.idOnly('ComplianceRecord', 'recordId'),

        // ========================================
        // Time & Attendance Models
        // ========================================
        ...ref.idOnly('Timesheet', 'timesheetId'),
        ...ref.idOnly('LeaveRequest', 'requestId'),
        ...ref.idOnly('LeaveBalance', 'balanceId'),
        ...ref.simple('LeavePolicy', 'policyId', 'name'),
        ...ref.simple('Shift', 'shiftId', 'name'),
        ...ref.idOnly('Schedule', 'scheduleId'),
        ...ref.simple('Holiday', 'holidayId', 'name'),
        ...ref.idOnly('Absence', 'absenceId'),

        // ========================================
        // Benefits Models
        // ========================================
        ...ref.simple('BenefitPlan', 'planId', 'name'),
        ...ref.idOnly('BenefitEnrollment', 'enrollmentId'),
        ...ref.simple('Carrier', 'carrierId', 'name'),
        ...ref.person('Dependent', 'dependentId'),
        ...ref.simple('LifeEvent', 'eventId', 'eventType'),
        ...ref.idOnly('COBRAEvent', 'cobraEventId'),

        // ========================================
        // Talent Management Models
        // ========================================
        ...ref.idOnly('PerformanceReview', 'reviewId'),
        ...ref.simple('Goal', 'goalId', 'title'),
        ...ref.idOnly('Feedback', 'feedbackId'),
        ...ref.simple('CareerPath', 'careerPathId', 'name'),
        ...ref.idOnly('SuccessionPlan', 'planId'),
        ...ref.simple('JobRequisition', 'requisitionId', 'title'),
        ...ref.person('Applicant', 'applicantId'),
        ...ref.idOnly('Application', 'applicationId'),
        ...ref.simple('OnboardingTask', 'taskId', 'name'),

        // ========================================
        // Learning Models
        // ========================================
        ...ref.simple('Course', 'courseId', 'title'),
        ...ref.idOnly('CourseSession', 'sessionId'),
        ...ref.idOnly('CourseEnrollment', 'enrollmentId'),
        ...ref.simple('Certification', 'certificationId', 'name'),
        ...ref.idOnly('EmployeeCertification', 'employeeCertificationId'),
        ...ref.simple('Skill', 'skillId', 'name'),
        ...ref.idOnly('EmployeeSkill', 'employeeSkillId'),
        ...ref.simple('TrainingRecord', 'recordId', 'trainingName'),

        // ========================================
        // Compensation Models
        // ========================================
        ...ref.simple('SalaryStructure', 'structureId', 'name'),
        ...ref.simple('SalaryGrade', 'gradeId', 'name'),
        ...ref.idOnly('EmployeeCompensation', 'compensationId'),
        ...ref.idOnly('MeritIncrease', 'increaseId'),
        ...ref.simple('MeritCycle', 'cycleId', 'name'),
        ...ref.simple('BonusPlan', 'planId', 'name'),
        ...ref.idOnly('BonusPayment', 'paymentId'),
        ...ref.simple('EquityGrant', 'grantId', 'grantNumber'),
        ...ref.idOnly('CompensationStatement', 'statementId'),
        ...ref.simple('MarketBenchmark', 'benchmarkId', 'jobTitle'),

        // ========================================
        // Payroll Models
        // ========================================
        ...ref.simple('PayStructure', 'structureId', 'name'),
        ...ref.simple('PayComponent', 'componentId', 'name'),
        ...ref.idOnly('PayrollRun', 'payrollRunId'),
        ...ref.idOnly('Payslip', 'payslipId'),
        ...ref.idOnly('TaxWithholding', 'withholdingId'),
        ...ref.idOnly('DirectDeposit', 'depositId'),
        ...ref.idOnly('Garnishment', 'garnishmentId'),
        ...ref.simple('YearEndDocument', 'documentId', 'documentType')
    };
})();
