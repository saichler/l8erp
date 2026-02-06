/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Projects Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    const prjSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="prjGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
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
                <rect x="175" y="40" width="50" height="40" rx="3" fill="url(#prjGradient1)" opacity="0.5"/>
                <rect x="180" y="45" width="15" height="10" fill="#fff" opacity="0.3"/>
                <rect x="180" y="58" width="40" height="3" fill="#fff" opacity="0.3"/>
                <rect x="180" y="64" width="35" height="3" fill="#fff" opacity="0.3"/>
                <rect x="180" y="70" width="38" height="3" fill="#fff" opacity="0.3"/>
                <rect x="375" y="35" width="50" height="50" rx="4" fill="url(#prjGradient1)" opacity="0.6"/>
                <rect x="380" y="40" width="40" height="8" fill="#0ea5e9" opacity="0.4"/>
                <rect x="380" y="52" width="30" height="8" fill="#0ea5e9" opacity="0.3"/>
                <rect x="380" y="64" width="35" height="8" fill="#0ea5e9" opacity="0.5"/>
                <circle cx="600" cy="60" r="20" fill="url(#prjGradient1)" opacity="0.6"/>
                <path d="M 590,60 L 600,70 L 615,50" fill="none" stroke="#fff" stroke-width="2.5" opacity="0.6"/>
                <circle cx="800" cy="50" r="8" fill="url(#prjGradient1)" opacity="0.5"/>
                <circle cx="815" cy="65" r="8" fill="url(#prjGradient1)" opacity="0.6"/>
                <circle cx="785" cy="70" r="8" fill="url(#prjGradient1)" opacity="0.4"/>
                <line x1="800" y1="50" x2="815" y2="65" stroke="#0ea5e9" stroke-width="1" opacity="0.5"/>
                <line x1="815" y1="65" x2="785" y2="70" stroke="#0ea5e9" stroke-width="1" opacity="0.5"/>
                <rect x="975" y="45" width="50" height="30" rx="3" fill="url(#prjGradient1)" opacity="0.5"/>
                <circle cx="990" cy="60" r="8" fill="#fff" opacity="0.3"/>
                <text x="1010" y="63" fill="#fff" font-size="10" opacity="0.5">$</text>
            </g>
            <path d="M 225,60 Q 300,45 375,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 425,60 Q 500,75 580,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 620,60 Q 700,45 780,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 825,60 Q 890,70 975,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="300" cy="52" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="52" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('projects', {
        title: 'Projects',
        subtitle: 'Planning, Resources, Time & Expense, Billing & Analytics',
        icon: '📁',
        svgContent: prjSvg,
        initFn: 'initializePrj',
        modules: [
            {
                key: 'planning', label: 'Planning', icon: '📋', isDefault: true,
                services: [
                    { key: 'projects', label: 'Projects', icon: '📁', isDefault: true },
                    { key: 'templates', label: 'Templates', icon: '📄' },
                    { key: 'phases', label: 'Phases', icon: '🔢' },
                    { key: 'tasks', label: 'Tasks', icon: '✅' },
                    { key: 'milestones', label: 'Milestones', icon: '🎯' },
                    { key: 'deliverables', label: 'Deliverables', icon: '📦' },
                    { key: 'dependencies', label: 'Dependencies', icon: '🔗' },
                    { key: 'risks', label: 'Risks', icon: '⚠️' }
                ]
            },
            {
                key: 'resources', label: 'Resources', icon: '👥',
                services: [
                    { key: 'resource-pools', label: 'Resource Pools', icon: '🏊', isDefault: true },
                    { key: 'resources', label: 'Resources', icon: '👤' },
                    { key: 'resource-skills', label: 'Skills', icon: '🎓' },
                    { key: 'allocations', label: 'Allocations', icon: '📊' },
                    { key: 'bookings', label: 'Bookings', icon: '📅' },
                    { key: 'capacity-plans', label: 'Capacity Plans', icon: '📈' },
                    { key: 'utilizations', label: 'Utilizations', icon: '⚡' }
                ]
            },
            {
                key: 'timeexpense', label: 'Time & Expense', icon: '⏱️',
                services: [
                    { key: 'timesheets', label: 'Timesheets', icon: '📝', isDefault: true },
                    { key: 'timesheet-entries', label: 'Time Entries', icon: '⏰' },
                    { key: 'expense-reports', label: 'Expense Reports', icon: '💰' },
                    { key: 'expense-entries', label: 'Expenses', icon: '💳' },
                    { key: 'approval-rules', label: 'Approval Rules', icon: '✔️' },
                    { key: 'expense-categories', label: 'Categories', icon: '🏷️' },
                    { key: 'expense-policies', label: 'Policies', icon: '📜' }
                ]
            },
            {
                key: 'billing', label: 'Billing', icon: '💵',
                services: [
                    { key: 'billing-rates', label: 'Billing Rates', icon: '💲', isDefault: true },
                    { key: 'billing-schedules', label: 'Schedules', icon: '📅' },
                    { key: 'billing-milestones', label: 'Milestones', icon: '🎯' },
                    { key: 'invoices', label: 'Invoices', icon: '📃' },
                    { key: 'invoice-lines', label: 'Invoice Lines', icon: '📝' },
                    { key: 'revenue-recognition', label: 'Revenue', icon: '📈' },
                    { key: 'budgets', label: 'Budgets', icon: '💼' }
                ]
            },
            {
                key: 'analytics', label: 'Analytics', icon: '📊',
                services: [
                    { key: 'status-reports', label: 'Status Reports', icon: '📋', isDefault: true },
                    { key: 'earned-values', label: 'Earned Value', icon: '📈' },
                    { key: 'budget-variances', label: 'Variances', icon: '📉' },
                    { key: 'resource-forecasts', label: 'Forecasts', icon: '🔮' },
                    { key: 'portfolio-views', label: 'Portfolio', icon: '🗂️' },
                    { key: 'kpis', label: 'KPIs', icon: '🎯' },
                    { key: 'issues', label: 'Issues', icon: '🐛' }
                ]
            }
        ]
    });
})();
