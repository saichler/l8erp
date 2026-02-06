/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - HCM Module
 * Reference configurations for Human Capital Management models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refHcmM = window.Layer8RefFactory;

window.Layer8MReferenceRegistryHCM = {
    // ========================================
    // Core HR Models
    // ========================================
    ...refHcmM.person('Employee', 'employeeId', 'lastName', 'firstName'),
    ...refHcmM.simple('Organization', 'organizationId', 'name'),
    ...refHcmM.simple('Department', 'departmentId', 'name'),
    ...refHcmM.simple('HcmDepartment', 'departmentId', 'name'),  // Alias
    ...refHcmM.simple('Position', 'positionId', 'title'),
    ...refHcmM.simple('Job', 'jobId', 'title'),
    ...refHcmM.simple('JobFamily', 'jobFamilyId', 'name'),
    ...refHcmM.simple('EmployeeDocument', 'documentId', 'name'),
    ...refHcmM.idOnly('ComplianceRecord', 'recordId'),

    // ========================================
    // Time & Attendance Models
    // ========================================
    ...refHcmM.idOnly('Timesheet', 'timesheetId'),
    ...refHcmM.idOnly('LeaveRequest', 'requestId'),
    ...refHcmM.idOnly('LeaveBalance', 'balanceId'),
    ...refHcmM.simple('LeavePolicy', 'policyId', 'name'),
    ...refHcmM.simple('Shift', 'shiftId', 'name'),
    ...refHcmM.idOnly('Schedule', 'scheduleId'),
    ...refHcmM.simple('Holiday', 'holidayId', 'name'),
    ...refHcmM.idOnly('Absence', 'absenceId'),

    // ========================================
    // Benefits Models
    // ========================================
    ...refHcmM.simple('BenefitPlan', 'planId', 'name'),
    ...refHcmM.idOnly('BenefitEnrollment', 'enrollmentId'),
    ...refHcmM.simple('Carrier', 'carrierId', 'name'),
    ...refHcmM.person('Dependent', 'dependentId', 'lastName', 'firstName'),
    ...refHcmM.simple('LifeEvent', 'eventId', 'eventType'),
    ...refHcmM.idOnly('COBRAEvent', 'cobraEventId'),

    // ========================================
    // Talent Management Models
    // ========================================
    ...refHcmM.idOnly('PerformanceReview', 'reviewId'),
    ...refHcmM.simple('Goal', 'goalId', 'title'),
    ...refHcmM.idOnly('Feedback', 'feedbackId'),
    ...refHcmM.simple('CareerPath', 'careerPathId', 'name'),
    ...refHcmM.idOnly('SuccessionPlan', 'planId'),
    ...refHcmM.simple('JobRequisition', 'requisitionId', 'title'),
    ...refHcmM.person('Applicant', 'applicantId', 'lastName', 'firstName'),
    ...refHcmM.idOnly('Application', 'applicationId'),
    ...refHcmM.simple('OnboardingTask', 'taskId', 'name'),

    // ========================================
    // Learning Models
    // ========================================
    ...refHcmM.simple('Course', 'courseId', 'title'),
    ...refHcmM.idOnly('CourseSession', 'sessionId'),
    ...refHcmM.idOnly('CourseEnrollment', 'enrollmentId'),
    ...refHcmM.simple('Certification', 'certificationId', 'name'),
    ...refHcmM.idOnly('EmployeeCertification', 'employeeCertificationId'),
    ...refHcmM.simple('Skill', 'skillId', 'name'),
    ...refHcmM.idOnly('EmployeeSkill', 'employeeSkillId'),
    ...refHcmM.simple('TrainingRecord', 'recordId', 'trainingName'),

    // ========================================
    // Compensation Models
    // ========================================
    ...refHcmM.simple('SalaryStructure', 'structureId', 'name'),
    ...refHcmM.simple('SalaryGrade', 'gradeId', 'name'),
    ...refHcmM.idOnly('EmployeeCompensation', 'compensationId'),
    ...refHcmM.idOnly('MeritIncrease', 'increaseId'),
    ...refHcmM.simple('MeritCycle', 'cycleId', 'name'),
    ...refHcmM.simple('BonusPlan', 'planId', 'name'),
    ...refHcmM.idOnly('BonusPayment', 'paymentId'),
    ...refHcmM.simple('EquityGrant', 'grantId', 'grantNumber'),
    ...refHcmM.idOnly('CompensationStatement', 'statementId'),
    ...refHcmM.simple('MarketBenchmark', 'benchmarkId', 'jobTitle'),

    // ========================================
    // Payroll Models
    // ========================================
    ...refHcmM.simple('PayStructure', 'structureId', 'name'),
    ...refHcmM.simple('PayComponent', 'componentId', 'name'),
    ...refHcmM.idOnly('PayrollRun', 'payrollRunId'),
    ...refHcmM.idOnly('Payslip', 'payslipId'),
    ...refHcmM.idOnly('TaxWithholding', 'withholdingId'),
    ...refHcmM.idOnly('DirectDeposit', 'depositId'),
    ...refHcmM.idOnly('Garnishment', 'garnishmentId'),
    ...refHcmM.simple('YearEndDocument', 'documentId', 'documentType')
};
