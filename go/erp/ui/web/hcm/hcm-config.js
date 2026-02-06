/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// HCM Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'HCM',
    modules: {
        'core-hr': {
            label: 'Core HR', icon: '👤',
            services: [
                { key: 'employees', label: 'Employees', icon: '👤', endpoint: '/30/Employee', model: 'Employee' },
                { key: 'positions', label: 'Positions', icon: '💼', endpoint: '/30/Position', model: 'Position' },
                { key: 'jobs', label: 'Jobs', icon: '📋', endpoint: '/30/Job', model: 'Job' },
                { key: 'job-families', label: 'Job Families', icon: '📁', endpoint: '/30/JobFamily', model: 'JobFamily' },
                { key: 'organizations', label: 'Organizations', icon: '🏛️', endpoint: '/30/Org', model: 'Organization' },
                { key: 'departments', label: 'Departments', icon: '🏬', endpoint: '/30/Dept', model: 'Department' },
                { key: 'documents', label: 'Documents', icon: '📄', endpoint: '/30/EmpDoc', model: 'EmployeeDocument' },
                { key: 'compliance', label: 'Compliance', icon: '✓', endpoint: '/30/CompRec', model: 'ComplianceRecord' }
            ]
        },
        'payroll': {
            label: 'Payroll', icon: '💰',
            services: [
                { key: 'pay-structures', label: 'Pay Structures', icon: '💰', endpoint: '/30/PayStruct', model: 'PayStructure' },
                { key: 'pay-components', label: 'Pay Components', icon: '📊', endpoint: '/30/PayComp', model: 'PayComponent' },
                { key: 'payroll-runs', label: 'Payroll Runs', icon: '▶️', endpoint: '/30/PayRun', model: 'PayrollRun' },
                { key: 'payslips', label: 'Payslips', icon: '📃', endpoint: '/30/Payslip', model: 'Payslip' },
                { key: 'tax-withholdings', label: 'Tax Withholdings', icon: '🏛️', endpoint: '/30/TaxWith', model: 'TaxWithholding' },
                { key: 'direct-deposits', label: 'Direct Deposits', icon: '🏦', endpoint: '/30/DirDep', model: 'DirectDeposit' },
                { key: 'garnishments', label: 'Garnishments', icon: '⚖️', endpoint: '/30/Garnish', model: 'Garnishment' },
                { key: 'year-end-docs', label: 'Year-End Docs', icon: '📋', endpoint: '/30/YrEndDoc', model: 'YearEndDocument' }
            ]
        },
        'benefits': {
            label: 'Benefits', icon: '🏥',
            services: [
                { key: 'benefit-plans', label: 'Benefit Plans', icon: '📦', endpoint: '/30/BenPlan', model: 'BenefitPlan' },
                { key: 'enrollments', label: 'Enrollments', icon: '✅', endpoint: '/30/BenEnrol', model: 'BenefitEnrollment' },
                { key: 'carriers', label: 'Carriers', icon: '🏥', endpoint: '/30/Carrier', model: 'Carrier' },
                { key: 'dependents', label: 'Dependents', icon: '👨‍👩‍👧', endpoint: '/30/Dependent', model: 'Dependent' },
                { key: 'life-events', label: 'Life Events', icon: '🔄', endpoint: '/30/LifeEvent', model: 'LifeEvent' },
                { key: 'cobra-events', label: 'COBRA Events', icon: '📋', endpoint: '/30/COBRAEvt', model: 'COBRAEvent' }
            ]
        },
        'time': {
            label: 'Time', icon: '⏱️',
            services: [
                { key: 'timesheets', label: 'Timesheets', icon: '⏱️', endpoint: '/30/Timesheet', model: 'Timesheet' },
                { key: 'leave-requests', label: 'Leave Requests', icon: '🏖️', endpoint: '/30/LeaveReq', model: 'LeaveRequest' },
                { key: 'leave-balances', label: 'Leave Balances', icon: '📊', endpoint: '/30/LeaveBal', model: 'LeaveBalance' },
                { key: 'leave-policies', label: 'Leave Policies', icon: '📜', endpoint: '/30/LeavePol', model: 'LeavePolicy' },
                { key: 'shifts', label: 'Shifts', icon: '🔄', endpoint: '/30/Shift', model: 'Shift' },
                { key: 'schedules', label: 'Schedules', icon: '📅', endpoint: '/30/Schedule', model: 'Schedule' },
                { key: 'holidays', label: 'Holidays', icon: '🎉', endpoint: '/30/Holiday', model: 'Holiday' },
                { key: 'absences', label: 'Absences', icon: '🚫', endpoint: '/30/Absence', model: 'Absence' }
            ]
        },
        'talent': {
            label: 'Talent', icon: '⭐',
            services: [
                { key: 'reviews', label: 'Reviews', icon: '⭐', endpoint: '/30/PerfRevw', model: 'PerformanceReview' },
                { key: 'goals', label: 'Goals', icon: '🎯', endpoint: '/30/Goal', model: 'Goal' },
                { key: 'feedback', label: 'Feedback', icon: '💬', endpoint: '/30/Feedback', model: 'Feedback' },
                { key: 'career-paths', label: 'Career Paths', icon: '📈', endpoint: '/30/CarPath', model: 'CareerPath' },
                { key: 'succession', label: 'Succession Plans', icon: '👑', endpoint: '/30/SuccPlan', model: 'SuccessionPlan' },
                { key: 'requisitions', label: 'Requisitions', icon: '📝', endpoint: '/30/JobReq', model: 'JobRequisition' },
                { key: 'applicants', label: 'Applicants', icon: '👥', endpoint: '/30/Applicant', model: 'Applicant' },
                { key: 'applications', label: 'Applications', icon: '📨', endpoint: '/30/Applctn', model: 'Application' },
                { key: 'onboarding', label: 'Onboarding', icon: '🚀', endpoint: '/30/OnbrdTsk', model: 'OnboardingTask' }
            ]
        },
        'learning': {
            label: 'Learning', icon: '📚',
            services: [
                { key: 'courses', label: 'Courses', icon: '📚', endpoint: '/30/Course', model: 'Course' },
                { key: 'sessions', label: 'Sessions', icon: '📅', endpoint: '/30/CrsSess', model: 'CourseSession' },
                { key: 'course-enrollments', label: 'Enrollments', icon: '✅', endpoint: '/30/CrsEnrol', model: 'CourseEnrollment' },
                { key: 'certifications', label: 'Certifications', icon: '🏆', endpoint: '/30/Cert', model: 'Certification' },
                { key: 'emp-certifications', label: 'Emp. Certs', icon: '📜', endpoint: '/30/EmpCert', model: 'EmployeeCertification' },
                { key: 'skills', label: 'Skills', icon: '💡', endpoint: '/30/Skill', model: 'Skill' },
                { key: 'emp-skills', label: 'Emp. Skills', icon: '🎓', endpoint: '/30/EmpSkill', model: 'EmployeeSkill' },
                { key: 'training-records', label: 'Training Records', icon: '📋', endpoint: '/30/TrnRec', model: 'TrainingRecord' }
            ]
        },
        'compensation': {
            label: 'Compensation', icon: '💵',
            services: [
                { key: 'salary-grades', label: 'Salary Grades', icon: '📊', endpoint: '/30/SalGrade', model: 'SalaryGrade' },
                { key: 'salary-structures', label: 'Salary Structures', icon: '💰', endpoint: '/30/SalStrct', model: 'SalaryStructure' },
                { key: 'emp-compensation', label: 'Emp. Compensation', icon: '💵', endpoint: '/30/EmpComp', model: 'EmployeeCompensation' },
                { key: 'merit-increases', label: 'Merit Increases', icon: '📈', endpoint: '/30/MeritInc', model: 'MeritIncrease' },
                { key: 'merit-cycles', label: 'Merit Cycles', icon: '🔄', endpoint: '/30/MrtCycle', model: 'MeritCycle' },
                { key: 'bonus-plans', label: 'Bonus Plans', icon: '🎁', endpoint: '/30/BonusPlan', model: 'BonusPlan' },
                { key: 'bonus-payments', label: 'Bonus Payments', icon: '💸', endpoint: '/30/BonusPay', model: 'BonusPayment' },
                { key: 'equity-grants', label: 'Equity Grants', icon: '📈', endpoint: '/30/EqGrant', model: 'EquityGrant' },
                { key: 'comp-statements', label: 'Comp. Statements', icon: '📄', endpoint: '/30/CompStmt', model: 'CompensationStatement' },
                { key: 'market-benchmarks', label: 'Market Benchmarks', icon: '📊', endpoint: '/30/MktBench', model: 'MarketBenchmark' }
            ]
        }
    },
    submodules: ['CoreHR', 'Payroll', 'Benefits', 'Time', 'Talent', 'Learning', 'Compensation']
});
