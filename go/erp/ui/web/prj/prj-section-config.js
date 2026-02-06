/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Projects Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('projects', {
        title: 'Projects',
        subtitle: 'Planning, Resources, Time & Expense, Billing & Analytics',
        icon: '📁',
        svgContent: Layer8SvgFactory.generate('projects'),
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
