/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Projects Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'Prj',
    modules: {
        'planning': {
            label: 'Planning', icon: '📋',
            services: [
                { key: 'projects', label: 'Projects', icon: '📁', endpoint: '/90/PrjProj', model: 'PrjProject', supportedViews: ['table', 'kanban', 'gantt', 'timeline'] },
                { key: 'templates', label: 'Templates', icon: '📄', endpoint: '/90/PrjProjTpl', model: 'PrjProjectTemplate' }
            ]
        },
        'resources': {
            label: 'Resources', icon: '👥',
            services: [
                { key: 'resource-pools', label: 'Resource Pools', icon: '🏊', endpoint: '/90/PrjResPool', model: 'PrjResourcePool' },
                { key: 'resources', label: 'Resources', icon: '👤', endpoint: '/90/PrjRes', model: 'PrjResource' },
                { key: 'allocations', label: 'Allocations', icon: '📊', endpoint: '/90/PrjAlloc', model: 'PrjAllocation' },
                { key: 'bookings', label: 'Bookings', icon: '📅', endpoint: '/90/PrjBooking', model: 'PrjBooking', supportedViews: ['table', 'calendar'] },
                { key: 'capacity-plans', label: 'Capacity Plans', icon: '📈', endpoint: '/90/PrjCapPlan', model: 'PrjCapacityPlan' },
                { key: 'utilizations', label: 'Utilizations', icon: '⚡', endpoint: '/90/PrjUtil', model: 'PrjUtilization' }
            ]
        },
        'timeexpense': {
            label: 'Time & Expense', icon: '⏱️',
            services: [
                { key: 'timesheets', label: 'Timesheets', icon: '📝', endpoint: '/90/PrjTmSheet', model: 'PrjTimesheet' },
                { key: 'expense-reports', label: 'Expense Reports', icon: '💰', endpoint: '/90/PrjExpRpt', model: 'PrjExpenseReport' },
                { key: 'approval-rules', label: 'Approval Rules', icon: '✔️', endpoint: '/90/PrjApprRl', model: 'PrjApprovalRule' },
                { key: 'expense-categories', label: 'Categories', icon: '🏷️', endpoint: '/90/PrjExpCat', model: 'PrjExpenseCategory' },
                { key: 'expense-policies', label: 'Policies', icon: '📜', endpoint: '/90/PrjExpPol', model: 'PrjExpensePolicy' }
            ]
        },
        'billing': {
            label: 'Billing', icon: '💵',
            services: [
                { key: 'billing-rates', label: 'Billing Rates', icon: '💲', endpoint: '/90/PrjBillRt', model: 'PrjBillingRate' },
                { key: 'billing-schedules', label: 'Schedules', icon: '📅', endpoint: '/90/PrjBillSch', model: 'PrjBillingSchedule' },
                { key: 'invoices', label: 'Invoices', icon: '📃', endpoint: '/90/PrjInvoice', model: 'PrjProjectInvoice' },
                { key: 'revenue-recognition', label: 'Revenue', icon: '📈', endpoint: '/90/PrjRevRec', model: 'PrjRevenueRecognition' },
                { key: 'budgets', label: 'Budgets', icon: '💼', endpoint: '/90/PrjBudget', model: 'PrjProjectBudget' }
            ]
        },
        'analytics': {
            label: 'Analytics', icon: '📊',
            services: [
                { key: 'status-reports', label: 'Status Reports', icon: '📋', endpoint: '/90/PrjStatus', model: 'PrjStatusReport', supportedViews: ['table', 'chart'] },
                { key: 'portfolio-views', label: 'Portfolio', icon: '🗂️', endpoint: '/90/PrjPortflo', model: 'PrjPortfolioView', supportedViews: ['table', 'chart'] },
                { key: 'kpis', label: 'KPIs', icon: '🎯', endpoint: '/90/PrjKPI', model: 'PrjProjectKPI', supportedViews: ['table', 'chart'] }
            ]
        },
        'reports': {
            label: 'Reports', icon: '📊',
            services: [
                { key: 'module-reports', label: 'Reports', endpoint: '/90/PrjReport', model: 'FinReport' }
            ]
        }
    },
    submodules: ['PrjPlanning', 'PrjResources', 'PrjTimeExpense', 'PrjBilling', 'PrjAnalytics', 'Reports']
});
