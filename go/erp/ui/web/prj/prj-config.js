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
                { key: 'projects', label: 'Projects', icon: '📁', endpoint: '/90/PrjProj', model: 'PrjProject' },
                { key: 'templates', label: 'Templates', icon: '📄', endpoint: '/90/PrjProjTpl', model: 'PrjProjectTemplate' },
                { key: 'phases', label: 'Phases', icon: '🔢', endpoint: '/90/PrjPhase', model: 'PrjPhase' },
                { key: 'tasks', label: 'Tasks', icon: '✅', endpoint: '/90/PrjTask', model: 'PrjTask' },
                { key: 'milestones', label: 'Milestones', icon: '🎯', endpoint: '/90/PrjMilstn', model: 'PrjMilestone' },
                { key: 'deliverables', label: 'Deliverables', icon: '📦', endpoint: '/90/PrjDeliv', model: 'PrjDeliverable' },
                { key: 'dependencies', label: 'Dependencies', icon: '🔗', endpoint: '/90/PrjDepend', model: 'PrjDependency' },
                { key: 'risks', label: 'Risks', icon: '⚠️', endpoint: '/90/PrjRisk', model: 'PrjRisk' }
            ]
        },
        'resources': {
            label: 'Resources', icon: '👥',
            services: [
                { key: 'resource-pools', label: 'Resource Pools', icon: '🏊', endpoint: '/90/PrjResPool', model: 'PrjResourcePool' },
                { key: 'resources', label: 'Resources', icon: '👤', endpoint: '/90/PrjRes', model: 'PrjResource' },
                { key: 'resource-skills', label: 'Skills', icon: '🎓', endpoint: '/90/PrjResSkl', model: 'PrjResourceSkill' },
                { key: 'allocations', label: 'Allocations', icon: '📊', endpoint: '/90/PrjAlloc', model: 'PrjAllocation' },
                { key: 'bookings', label: 'Bookings', icon: '📅', endpoint: '/90/PrjBooking', model: 'PrjBooking' },
                { key: 'capacity-plans', label: 'Capacity Plans', icon: '📈', endpoint: '/90/PrjCapPlan', model: 'PrjCapacityPlan' },
                { key: 'utilizations', label: 'Utilizations', icon: '⚡', endpoint: '/90/PrjUtil', model: 'PrjUtilization' }
            ]
        },
        'timeexpense': {
            label: 'Time & Expense', icon: '⏱️',
            services: [
                { key: 'timesheets', label: 'Timesheets', icon: '📝', endpoint: '/90/PrjTmSheet', model: 'PrjTimesheet' },
                { key: 'timesheet-entries', label: 'Time Entries', icon: '⏰', endpoint: '/90/PrjTmEntry', model: 'PrjTimesheetEntry' },
                { key: 'expense-reports', label: 'Expense Reports', icon: '💰', endpoint: '/90/PrjExpRpt', model: 'PrjExpenseReport' },
                { key: 'expense-entries', label: 'Expenses', icon: '💳', endpoint: '/90/PrjExpEnt', model: 'PrjExpenseEntry' },
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
                { key: 'billing-milestones', label: 'Milestones', icon: '🎯', endpoint: '/90/PrjBillMls', model: 'PrjBillingMilestone' },
                { key: 'invoices', label: 'Invoices', icon: '📃', endpoint: '/90/PrjInvoice', model: 'PrjProjectInvoice' },
                { key: 'invoice-lines', label: 'Invoice Lines', icon: '📝', endpoint: '/90/PrjInvLine', model: 'PrjInvoiceLine' },
                { key: 'revenue-recognition', label: 'Revenue', icon: '📈', endpoint: '/90/PrjRevRec', model: 'PrjRevenueRecognition' },
                { key: 'budgets', label: 'Budgets', icon: '💼', endpoint: '/90/PrjBudget', model: 'PrjProjectBudget' }
            ]
        },
        'analytics': {
            label: 'Analytics', icon: '📊',
            services: [
                { key: 'status-reports', label: 'Status Reports', icon: '📋', endpoint: '/90/PrjStatus', model: 'PrjStatusReport' },
                { key: 'earned-values', label: 'Earned Value', icon: '📈', endpoint: '/90/PrjEV', model: 'PrjEarnedValue' },
                { key: 'budget-variances', label: 'Variances', icon: '📉', endpoint: '/90/PrjBudVar', model: 'PrjBudgetVariance' },
                { key: 'resource-forecasts', label: 'Forecasts', icon: '🔮', endpoint: '/90/PrjResFcst', model: 'PrjResourceForecast' },
                { key: 'portfolio-views', label: 'Portfolio', icon: '🗂️', endpoint: '/90/PrjPortflo', model: 'PrjPortfolioView' },
                { key: 'kpis', label: 'KPIs', icon: '🎯', endpoint: '/90/PrjKPI', model: 'PrjProjectKPI' },
                { key: 'issues', label: 'Issues', icon: '🐛', endpoint: '/90/PrjIssue', model: 'PrjProjectIssue' }
            ]
        }
    },
    submodules: ['PrjPlanning', 'PrjResources', 'PrjTimeExpense', 'PrjBilling', 'PrjAnalytics']
});
