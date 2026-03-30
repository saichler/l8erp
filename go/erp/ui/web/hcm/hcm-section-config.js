/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// HCM Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('hcm', {
        title: 'Human Capital Management',
        subtitle: 'Manage Your Workforce Across All HR Functions',
        icon: '👥',
        svgContent: Layer8SvgFactory.generate('people'),
        initFn: 'initializeHCM',
        modules: [
            {
                key: 'core-hr',
                label: 'Core HR',
                icon: '👤',
                isDefault: true,
                services: [
                    { key: 'employees', label: 'Employees', icon: '👤', isDefault: true },
                    { key: 'positions', label: 'Positions', icon: '💼' },
                    { key: 'jobs', label: 'Jobs', icon: '📋' },
                    { key: 'job-families', label: 'Job Families', icon: '📁' },
                    { key: 'organizations', label: 'Organizations', icon: '🏛️' },
                    { key: 'departments', label: 'Departments', icon: '🏬' },
                    { key: 'documents', label: 'Documents', icon: '📄' },
                    { key: 'compliance', label: 'Compliance', icon: '✓' }
                ]
            },
            {
                key: 'payroll',
                label: 'Payroll',
                icon: '💰',
                services: [
                    { key: 'pay-structures', label: 'Pay Structures', icon: '💰', isDefault: true },
                    { key: 'pay-components', label: 'Pay Components', icon: '📊' },
                    { key: 'payroll-runs', label: 'Payroll Runs', icon: '▶️' },
                    { key: 'payslips', label: 'Payslips', icon: '📃' },
                    { key: 'tax-withholdings', label: 'Tax Withholdings', icon: '🏛️' },
                    { key: 'direct-deposits', label: 'Direct Deposits', icon: '🏦' },
                    { key: 'garnishments', label: 'Garnishments', icon: '⚖️' },
                    { key: 'year-end-docs', label: 'Year-End Docs', icon: '📋' }
                ]
            },
            {
                key: 'benefits',
                label: 'Benefits',
                icon: '🏥',
                services: [
                    { key: 'benefit-plans', label: 'Benefit Plans', icon: '📦', isDefault: true },
                    { key: 'enrollments', label: 'Enrollments', icon: '✅' },
                    { key: 'carriers', label: 'Carriers', icon: '🏥' },
                    { key: 'dependents', label: 'Dependents', icon: '👨‍👩‍👧' },
                    { key: 'life-events', label: 'Life Events', icon: '🔄' },
                    { key: 'cobra-events', label: 'COBRA Events', icon: '📋' }
                ]
            },
            {
                key: 'time',
                label: 'Time',
                icon: '⏱️',
                services: [
                    { key: 'timesheets', label: 'Timesheets', icon: '⏱️', isDefault: true },
                    { key: 'leave-requests', label: 'Leave Requests', icon: '🏖️' },
                    { key: 'leave-balances', label: 'Leave Balances', icon: '📊' },
                    { key: 'leave-policies', label: 'Leave Policies', icon: '📜' },
                    { key: 'shifts', label: 'Shifts', icon: '🔄' },
                    { key: 'schedules', label: 'Schedules', icon: '📅' },
                    { key: 'holidays', label: 'Holidays', icon: '🎉' },
                    { key: 'absences', label: 'Absences', icon: '🚫' }
                ]
            },
            {
                key: 'talent',
                label: 'Talent',
                icon: '⭐',
                services: [
                    { key: 'reviews', label: 'Reviews', icon: '⭐', isDefault: true },
                    { key: 'goals', label: 'Goals', icon: '🎯' },
                    { key: 'feedback', label: 'Feedback', icon: '💬' },
                    { key: 'career-paths', label: 'Career Paths', icon: '📈' },
                    { key: 'succession', label: 'Succession', icon: '👑' },
                    { key: 'requisitions', label: 'Requisitions', icon: '📝' },
                    { key: 'applicants', label: 'Applicants', icon: '👥' },
                    { key: 'applications', label: 'Applications', icon: '📨' },
                    { key: 'onboarding', label: 'Onboarding', icon: '🚀' }
                ]
            },
            {
                key: 'learning',
                label: 'Learning',
                icon: '📚',
                services: [
                    { key: 'courses', label: 'Courses', icon: '📚', isDefault: true },
                    { key: 'sessions', label: 'Sessions', icon: '📅' },
                    { key: 'course-enrollments', label: 'Enrollments', icon: '✅' },
                    { key: 'certifications', label: 'Certifications', icon: '🏆' },
                    { key: 'emp-certifications', label: 'Emp. Certs', icon: '📜' },
                    { key: 'skills', label: 'Skills', icon: '💡' },
                    { key: 'emp-skills', label: 'Emp. Skills', icon: '🎓' },
                    { key: 'training-records', label: 'Training Records', icon: '📋' }
                ]
            },
            {
                key: 'compensation',
                label: 'Compensation',
                icon: '💵',
                services: [
                    { key: 'salary-grades', label: 'Salary Grades', icon: '📊', isDefault: true },
                    { key: 'salary-structures', label: 'Salary Structures', icon: '💰' },
                    { key: 'emp-compensation', label: 'Emp. Compensation', icon: '💵' },
                    { key: 'merit-increases', label: 'Merit Increases', icon: '📈' },
                    { key: 'merit-cycles', label: 'Merit Cycles', icon: '🔄' },
                    { key: 'bonus-plans', label: 'Bonus Plans', icon: '🎁' },
                    { key: 'bonus-payments', label: 'Bonus Payments', icon: '💸' },
                    { key: 'equity-grants', label: 'Equity Grants', icon: '📈' },
                    { key: 'comp-statements', label: 'Comp. Statements', icon: '📄' },
                    { key: 'market-benchmarks', label: 'Market Benchmarks', icon: '📊' }
                ]
            },
            {
                key: 'reports',
                label: 'Reports',
                icon: '📊',
                services: [
                    { key: 'module-reports', label: 'Module Reports', icon: '📊', isDefault: true }
                ]
            }
        ]
    });
})();
