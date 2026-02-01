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
 * Registers Core HR, Time, Benefits, Talent, Learning, Compensation, and Payroll models.
 */
Layer8DReferenceRegistry.register({
        // Core HR Models
        // ========================================
        Employee: {
            idColumn: 'employeeId',
            displayColumn: 'lastName',
            selectColumns: ['employeeId', 'lastName', 'firstName'],
            displayFormat: function(item) {
                return item.lastName + ', ' + item.firstName;
            },
            displayLabel: 'Name'
        },
        Organization: {
            idColumn: 'organizationId',
            displayColumn: 'name'
        },
        Department: {
            idColumn: 'departmentId',
            displayColumn: 'name'
        },
        Position: {
            idColumn: 'positionId',
            displayColumn: 'title'
        },
        Job: {
            idColumn: 'jobId',
            displayColumn: 'title'
        },
        JobFamily: {
            idColumn: 'jobFamilyId',
            displayColumn: 'name'
        },
        EmployeeDocument: {
            idColumn: 'documentId',
            displayColumn: 'name'
        },
        ComplianceRecord: {
            idColumn: 'recordId',
            displayColumn: 'recordId'
        },

        // ========================================
        // Time & Attendance Models
        // ========================================
        Timesheet: {
            idColumn: 'timesheetId',
            displayColumn: 'timesheetId'
        },
        LeaveRequest: {
            idColumn: 'requestId',
            displayColumn: 'requestId'
        },
        LeaveBalance: {
            idColumn: 'balanceId',
            displayColumn: 'balanceId'
        },
        LeavePolicy: {
            idColumn: 'policyId',
            displayColumn: 'name'
        },
        Shift: {
            idColumn: 'shiftId',
            displayColumn: 'name'
        },
        Schedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },
        Holiday: {
            idColumn: 'holidayId',
            displayColumn: 'name'
        },
        Absence: {
            idColumn: 'absenceId',
            displayColumn: 'absenceId'
        },

        // ========================================
        // Benefits Models
        // ========================================
        BenefitPlan: {
            idColumn: 'planId',
            displayColumn: 'name'
        },
        BenefitEnrollment: {
            idColumn: 'enrollmentId',
            displayColumn: 'enrollmentId'
        },
        Carrier: {
            idColumn: 'carrierId',
            displayColumn: 'name'
        },
        Dependent: {
            idColumn: 'dependentId',
            displayColumn: 'firstName',
            selectColumns: ['dependentId', 'firstName', 'lastName'],
            displayFormat: function(item) {
                return item.lastName + ', ' + item.firstName;
            },
            displayLabel: 'Name'
        },
        LifeEvent: {
            idColumn: 'eventId',
            displayColumn: 'eventType'
        },
        COBRAEvent: {
            idColumn: 'cobraEventId',
            displayColumn: 'cobraEventId'
        },

        // ========================================
        // Talent Management Models
        // ========================================
        PerformanceReview: {
            idColumn: 'reviewId',
            displayColumn: 'reviewId'
        },
        Goal: {
            idColumn: 'goalId',
            displayColumn: 'title'
        },
        Feedback: {
            idColumn: 'feedbackId',
            displayColumn: 'feedbackId'
        },
        CareerPath: {
            idColumn: 'careerPathId',
            displayColumn: 'name'
        },
        SuccessionPlan: {
            idColumn: 'planId',
            displayColumn: 'planId'
        },
        JobRequisition: {
            idColumn: 'requisitionId',
            displayColumn: 'title'
        },
        Applicant: {
            idColumn: 'applicantId',
            displayColumn: 'lastName',
            selectColumns: ['applicantId', 'lastName', 'firstName'],
            displayFormat: function(item) {
                return item.lastName + ', ' + item.firstName;
            },
            displayLabel: 'Name'
        },
        Application: {
            idColumn: 'applicationId',
            displayColumn: 'applicationId'
        },
        OnboardingTask: {
            idColumn: 'taskId',
            displayColumn: 'name'
        },

        // ========================================
        // Learning Models
        // ========================================
        Course: {
            idColumn: 'courseId',
            displayColumn: 'title'
        },
        CourseSession: {
            idColumn: 'sessionId',
            displayColumn: 'sessionId'
        },
        CourseEnrollment: {
            idColumn: 'enrollmentId',
            displayColumn: 'enrollmentId'
        },
        Certification: {
            idColumn: 'certificationId',
            displayColumn: 'name'
        },
        EmployeeCertification: {
            idColumn: 'employeeCertificationId',
            displayColumn: 'employeeCertificationId'
        },
        Skill: {
            idColumn: 'skillId',
            displayColumn: 'name'
        },
        EmployeeSkill: {
            idColumn: 'employeeSkillId',
            displayColumn: 'employeeSkillId'
        },
        TrainingRecord: {
            idColumn: 'recordId',
            displayColumn: 'trainingName'
        },

        // ========================================
        // Compensation Models
        // ========================================
        SalaryStructure: {
            idColumn: 'structureId',
            displayColumn: 'name'
        },
        SalaryGrade: {
            idColumn: 'gradeId',
            displayColumn: 'name'
        },
        EmployeeCompensation: {
            idColumn: 'compensationId',
            displayColumn: 'compensationId'
        },
        MeritIncrease: {
            idColumn: 'increaseId',
            displayColumn: 'increaseId'
        },
        MeritCycle: {
            idColumn: 'cycleId',
            displayColumn: 'name'
        },
        BonusPlan: {
            idColumn: 'planId',
            displayColumn: 'name'
        },
        BonusPayment: {
            idColumn: 'paymentId',
            displayColumn: 'paymentId'
        },
        EquityGrant: {
            idColumn: 'grantId',
            displayColumn: 'grantNumber'
        },
        CompensationStatement: {
            idColumn: 'statementId',
            displayColumn: 'statementId'
        },
        MarketBenchmark: {
            idColumn: 'benchmarkId',
            displayColumn: 'jobTitle'
        },

        // ========================================
        // Payroll Models
        // ========================================
        PayStructure: {
            idColumn: 'structureId',
            displayColumn: 'name'
        },
        PayComponent: {
            idColumn: 'componentId',
            displayColumn: 'name'
        },
        PayrollRun: {
            idColumn: 'payrollRunId',
            displayColumn: 'payrollRunId'
        },
        Payslip: {
            idColumn: 'payslipId',
            displayColumn: 'payslipId'
        },
        TaxWithholding: {
            idColumn: 'withholdingId',
            displayColumn: 'withholdingId'
        },
        DirectDeposit: {
            idColumn: 'depositId',
            displayColumn: 'depositId'
        },
        Garnishment: {
            idColumn: 'garnishmentId',
            displayColumn: 'garnishmentId'
        },
        YearEndDocument: {
            idColumn: 'documentId',
            displayColumn: 'documentType'
        }
});
