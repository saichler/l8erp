/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// HCM Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    // Custom SVG with people icons for HCM
    const hcmSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="hcmGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:#0284c7;stop-opacity:0.2" />
                </linearGradient>
            </defs>
            <g opacity="0.1">
                <line x1="0" y1="30" x2="1200" y2="30" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="0" y1="60" x2="1200" y2="60" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="0" y1="90" x2="1200" y2="90" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="200" y1="0" x2="200" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="400" y1="0" x2="400" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="600" y1="0" x2="600" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="800" y1="0" x2="800" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="1000" y1="0" x2="1000" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
            </g>
            <g class="people-animation">
                <circle cx="200" cy="60" r="15" fill="url(#hcmGradient1)" opacity="0.6"/>
                <circle cx="200" cy="52" r="6" fill="#fff" opacity="0.8"/>
                <path d="M 190 72 Q 200 65 210 72" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
                <circle cx="400" cy="50" r="12" fill="url(#hcmGradient1)" opacity="0.5"/>
                <circle cx="400" cy="44" r="5" fill="#fff" opacity="0.7"/>
                <path d="M 392 58 Q 400 52 408 58" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
                <circle cx="600" cy="65" r="18" fill="url(#hcmGradient1)" opacity="0.7"/>
                <circle cx="600" cy="55" r="7" fill="#fff" opacity="0.8"/>
                <path d="M 588 78 Q 600 70 612 78" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
                <circle cx="800" cy="55" r="14" fill="url(#hcmGradient1)" opacity="0.5"/>
                <circle cx="800" cy="48" r="5" fill="#fff" opacity="0.7"/>
                <path d="M 791 65 Q 800 58 809 65" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
                <circle cx="1000" cy="60" r="16" fill="url(#hcmGradient1)" opacity="0.6"/>
                <circle cx="1000" cy="52" r="6" fill="#fff" opacity="0.8"/>
                <path d="M 989 72 Q 1000 64 1011 72" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            </g>
            <path d="M 215,60 Q 300,40 385,50" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 415,50 Q 500,70 582,65" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 618,65 Q 700,45 786,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 814,55 Q 900,75 984,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="300" cy="50" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="55" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('hcm', {
        title: 'Human Capital Management',
        subtitle: 'Manage Your Workforce Across All HR Functions',
        icon: '👥',
        svgContent: hcmSvg,
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
            }
        ]
    });
})();
