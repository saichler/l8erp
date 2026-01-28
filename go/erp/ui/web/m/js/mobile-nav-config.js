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
 * Mobile Navigation Configuration
 * Defines the EXACT navigation hierarchy matching desktop
 */
(function() {
    'use strict';

    window.MOBILE_NAV_CONFIG = {
        // ERP Modules (Level 1) - matches desktop sidebar order
        modules: [
            { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', hasSubModules: false },
            { key: 'financial', label: 'Financial', icon: 'financial', hasSubModules: false },
            { key: 'hcm', label: 'Human Capital', icon: 'hcm', hasSubModules: true },
            { key: 'scm', label: 'Supply Chain', icon: 'scm', hasSubModules: false },
            { key: 'manufacturing', label: 'Manufacturing', icon: 'manufacturing', hasSubModules: false },
            { key: 'sales', label: 'Sales', icon: 'sales', hasSubModules: false },
            { key: 'crm', label: 'CRM', icon: 'crm', hasSubModules: false },
            { key: 'projects', label: 'Projects', icon: 'projects', hasSubModules: false },
            { key: 'bi', label: 'Analytics', icon: 'bi', hasSubModules: false },
            { key: 'documents', label: 'Documents', icon: 'documents', hasSubModules: false },
            { key: 'ecommerce', label: 'E-Commerce', icon: 'ecommerce', hasSubModules: false },
            { key: 'compliance', label: 'Compliance', icon: 'compliance', hasSubModules: false },
            { key: 'system', label: 'System', icon: 'system', hasSubModules: false }
        ],

        // HCM Sub-Modules (Level 2)
        hcm: {
            subModules: [
                { key: 'core-hr', label: 'Core HR', icon: 'employees' },
                { key: 'payroll', label: 'Payroll', icon: 'financial' },
                { key: 'benefits', label: 'Benefits', icon: 'benefits' },
                { key: 'time', label: 'Time', icon: 'time' },
                { key: 'talent', label: 'Talent', icon: 'talent' },
                { key: 'learning', label: 'Learning', icon: 'learning' },
                { key: 'compensation', label: 'Compensation', icon: 'compensation' }
            ],

            // Services for each sub-module (Level 3) - EXACT order from desktop hcm-config.js
            services: {
                'core-hr': [
                    { key: 'employees', label: 'Employees', icon: 'employees', endpoint: '/erp/30/Employee', model: 'Employee', idField: 'employeeId' },
                    { key: 'positions', label: 'Positions', icon: 'positions', endpoint: '/erp/30/Position', model: 'Position', idField: 'positionId' },
                    { key: 'jobs', label: 'Jobs', icon: 'jobs', endpoint: '/erp/30/Job', model: 'Job', idField: 'jobId' },
                    { key: 'job-families', label: 'Job Families', icon: 'job-families', endpoint: '/erp/30/JobFamily', model: 'JobFamily', idField: 'jobFamilyId' },
                    { key: 'organizations', label: 'Organizations', icon: 'organizations', endpoint: '/erp/30/Org', model: 'Organization', idField: 'organizationId' },
                    { key: 'departments', label: 'Departments', icon: 'departments', endpoint: '/erp/30/Dept', model: 'Department', idField: 'departmentId' },
                    { key: 'documents', label: 'Documents', icon: 'documents', endpoint: '/erp/30/EmpDoc', model: 'EmployeeDocument', idField: 'documentId' },
                    { key: 'compliance', label: 'Compliance', icon: 'compliance', endpoint: '/erp/30/CompRec', model: 'ComplianceRecord', idField: 'recordId' }
                ],
                'payroll': [
                    { key: 'pay-structures', label: 'Pay Structures', icon: 'pay-structures', endpoint: '/erp/30/PayStruct', model: 'PayStructure', idField: 'payStructureId' },
                    { key: 'pay-components', label: 'Pay Components', icon: 'pay-components', endpoint: '/erp/30/PayComp', model: 'PayComponent', idField: 'payComponentId' },
                    { key: 'payroll-runs', label: 'Payroll Runs', icon: 'payroll-runs', endpoint: '/erp/30/PayRun', model: 'PayrollRun', idField: 'payrollRunId' },
                    { key: 'payslips', label: 'Payslips', icon: 'payslips', endpoint: '/erp/30/Payslip', model: 'Payslip', idField: 'payslipId' },
                    { key: 'tax-withholdings', label: 'Tax Withholdings', icon: 'tax-withholdings', endpoint: '/erp/30/TaxWith', model: 'TaxWithholding', idField: 'taxWithholdingId' },
                    { key: 'direct-deposits', label: 'Direct Deposits', icon: 'direct-deposits', endpoint: '/erp/30/DirDep', model: 'DirectDeposit', idField: 'directDepositId' },
                    { key: 'garnishments', label: 'Garnishments', icon: 'garnishments', endpoint: '/erp/30/Garnish', model: 'Garnishment', idField: 'garnishmentId' },
                    { key: 'year-end-docs', label: 'Year-End Docs', icon: 'year-end-docs', endpoint: '/erp/30/YrEndDoc', model: 'YearEndDocument', idField: 'documentId' }
                ],
                'benefits': [
                    { key: 'benefit-plans', label: 'Benefit Plans', icon: 'benefit-plans', endpoint: '/erp/30/BenPlan', model: 'BenefitPlan', idField: 'benefitPlanId' },
                    { key: 'enrollments', label: 'Enrollments', icon: 'enrollments', endpoint: '/erp/30/BenEnrol', model: 'BenefitEnrollment', idField: 'enrollmentId' },
                    { key: 'carriers', label: 'Carriers', icon: 'carriers', endpoint: '/erp/30/Carrier', model: 'Carrier', idField: 'carrierId' },
                    { key: 'dependents', label: 'Dependents', icon: 'dependents', endpoint: '/erp/30/Dependent', model: 'Dependent', idField: 'dependentId' },
                    { key: 'life-events', label: 'Life Events', icon: 'life-events', endpoint: '/erp/30/LifeEvent', model: 'LifeEvent', idField: 'lifeEventId' },
                    { key: 'cobra-events', label: 'COBRA Events', icon: 'cobra-events', endpoint: '/erp/30/COBRAEvt', model: 'COBRAEvent', idField: 'cobraEventId' }
                ],
                'time': [
                    { key: 'timesheets', label: 'Timesheets', icon: 'timesheets', endpoint: '/erp/30/Timesheet', model: 'Timesheet', idField: 'timesheetId' },
                    { key: 'leave-requests', label: 'Leave Requests', icon: 'leave-requests', endpoint: '/erp/30/LeaveReq', model: 'LeaveRequest', idField: 'leaveRequestId' },
                    { key: 'leave-balances', label: 'Leave Balances', icon: 'leave-balances', endpoint: '/erp/30/LeaveBal', model: 'LeaveBalance', idField: 'leaveBalanceId' },
                    { key: 'leave-policies', label: 'Leave Policies', icon: 'leave-policies', endpoint: '/erp/30/LeavePol', model: 'LeavePolicy', idField: 'leavePolicyId' },
                    { key: 'shifts', label: 'Shifts', icon: 'shifts', endpoint: '/erp/30/Shift', model: 'Shift', idField: 'shiftId' },
                    { key: 'schedules', label: 'Schedules', icon: 'schedules', endpoint: '/erp/30/Schedule', model: 'Schedule', idField: 'scheduleId' },
                    { key: 'holidays', label: 'Holidays', icon: 'holidays', endpoint: '/erp/30/Holiday', model: 'Holiday', idField: 'holidayId' },
                    { key: 'absences', label: 'Absences', icon: 'absences', endpoint: '/erp/30/Absence', model: 'Absence', idField: 'absenceId' }
                ],
                'talent': [
                    { key: 'reviews', label: 'Reviews', icon: 'reviews', endpoint: '/erp/30/PerfRevw', model: 'PerformanceReview', idField: 'reviewId' },
                    { key: 'goals', label: 'Goals', icon: 'goals', endpoint: '/erp/30/Goal', model: 'Goal', idField: 'goalId' },
                    { key: 'feedback', label: 'Feedback', icon: 'feedback', endpoint: '/erp/30/Feedback', model: 'Feedback', idField: 'feedbackId' },
                    { key: 'career-paths', label: 'Career Paths', icon: 'career-paths', endpoint: '/erp/30/CarPath', model: 'CareerPath', idField: 'careerPathId' },
                    { key: 'succession', label: 'Succession Plans', icon: 'succession', endpoint: '/erp/30/SuccPlan', model: 'SuccessionPlan', idField: 'successionPlanId' },
                    { key: 'requisitions', label: 'Requisitions', icon: 'requisitions', endpoint: '/erp/30/JobReq', model: 'JobRequisition', idField: 'requisitionId' },
                    { key: 'applicants', label: 'Applicants', icon: 'applicants', endpoint: '/erp/30/Applicant', model: 'Applicant', idField: 'applicantId' },
                    { key: 'applications', label: 'Applications', icon: 'applications', endpoint: '/erp/30/Applctn', model: 'Application', idField: 'applicationId' },
                    { key: 'onboarding', label: 'Onboarding', icon: 'onboarding', endpoint: '/erp/30/OnbrdTsk', model: 'OnboardingTask', idField: 'taskId' }
                ],
                'learning': [
                    { key: 'courses', label: 'Courses', icon: 'courses', endpoint: '/erp/30/Course', model: 'Course', idField: 'courseId' },
                    { key: 'sessions', label: 'Sessions', icon: 'sessions', endpoint: '/erp/30/CrsSess', model: 'CourseSession', idField: 'sessionId' },
                    { key: 'course-enrollments', label: 'Enrollments', icon: 'enrollments', endpoint: '/erp/30/CrsEnrol', model: 'CourseEnrollment', idField: 'enrollmentId' },
                    { key: 'certifications', label: 'Certifications', icon: 'certifications', endpoint: '/erp/30/Cert', model: 'Certification', idField: 'certificationId' },
                    { key: 'emp-certifications', label: 'Emp. Certs', icon: 'emp-certifications', endpoint: '/erp/30/EmpCert', model: 'EmployeeCertification', idField: 'empCertificationId' },
                    { key: 'skills', label: 'Skills', icon: 'skills', endpoint: '/erp/30/Skill', model: 'Skill', idField: 'skillId' },
                    { key: 'emp-skills', label: 'Emp. Skills', icon: 'emp-skills', endpoint: '/erp/30/EmpSkill', model: 'EmployeeSkill', idField: 'empSkillId' },
                    { key: 'training-records', label: 'Training Records', icon: 'training-records', endpoint: '/erp/30/TrnRec', model: 'TrainingRecord', idField: 'recordId' }
                ],
                'compensation': [
                    { key: 'salary-grades', label: 'Salary Grades', icon: 'salary-grades', endpoint: '/erp/30/SalGrade', model: 'SalaryGrade', idField: 'salaryGradeId' },
                    { key: 'salary-structures', label: 'Salary Structures', icon: 'salary-structures', endpoint: '/erp/30/SalStrct', model: 'SalaryStructure', idField: 'salaryStructureId' },
                    { key: 'emp-compensation', label: 'Emp. Compensation', icon: 'emp-compensation', endpoint: '/erp/30/EmpComp', model: 'EmployeeCompensation', idField: 'empCompensationId' },
                    { key: 'merit-increases', label: 'Merit Increases', icon: 'merit-increases', endpoint: '/erp/30/MeritInc', model: 'MeritIncrease', idField: 'meritIncreaseId' },
                    { key: 'merit-cycles', label: 'Merit Cycles', icon: 'merit-cycles', endpoint: '/erp/30/MrtCycle', model: 'MeritCycle', idField: 'meritCycleId' },
                    { key: 'bonus-plans', label: 'Bonus Plans', icon: 'bonus-plans', endpoint: '/erp/30/BonusPlan', model: 'BonusPlan', idField: 'bonusPlanId' },
                    { key: 'bonus-payments', label: 'Bonus Payments', icon: 'bonus-payments', endpoint: '/erp/30/BonusPay', model: 'BonusPayment', idField: 'bonusPaymentId' },
                    { key: 'equity-grants', label: 'Equity Grants', icon: 'equity-grants', endpoint: '/erp/30/EqGrant', model: 'EquityGrant', idField: 'equityGrantId' },
                    { key: 'comp-statements', label: 'Comp. Statements', icon: 'comp-statements', endpoint: '/erp/30/CompStmt', model: 'CompensationStatement', idField: 'statementId' },
                    { key: 'market-benchmarks', label: 'Market Benchmarks', icon: 'market-benchmarks', endpoint: '/erp/30/MktBench', model: 'MarketBenchmark', idField: 'benchmarkId' }
                ]
            }
        },

        // SVG icons for navigation
        icons: {
            'dashboard': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
            'financial': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
            'hcm': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
            'scm': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
            'manufacturing': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path></svg>',
            'sales': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',
            'crm': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
            'projects': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
            'bi': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>',
            'documents': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
            'ecommerce': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
            'compliance': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
            'system': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
            'employees': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
            'benefits': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
            'time': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
            'talent': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
            'learning': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
            'compensation': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
            'positions': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
            'jobs': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
            'job-families': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
            'organizations': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"></path><path d="M5 21V7l8-4v18"></path><path d="M19 21V11l-6-4"></path></svg>',
            'departments': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"></path><path d="M9 21V8l3-3 3 3v13"></path><path d="M3 21V11h4"></path><path d="M17 21V11h4"></path></svg>',
            'back': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>',
            'default': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>'
        },

        // Get icon SVG by key
        getIcon(key) {
            return this.icons[key] || this.icons['default'];
        }
    };

})();
