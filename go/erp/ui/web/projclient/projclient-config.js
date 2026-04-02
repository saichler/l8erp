/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Project Client Portal — service configuration (all read-only)
(function() {
    'use strict';

    var PRJC = window.PRJC = window.PRJC || {};

    PRJC.sections = {
        projects: {
            label: 'Projects', icon: '📁',
            services: [
                { key: 'projects', label: 'Projects', icon: '📁', endpoint: '/90/PrjProj', model: 'PrjProject', readOnly: true },
                { key: 'statusreports', label: 'Status Reports', icon: '📊', endpoint: '/90/PrjStatus', model: 'PrjStatusReport', readOnly: true },
                { key: 'kpis', label: 'KPIs', icon: '🎯', endpoint: '/90/PrjKPI', model: 'PrjProjectKPI', readOnly: true }
            ]
        },
        budget: {
            label: 'Budget', icon: '💰',
            services: [
                { key: 'budgets', label: 'Budgets', icon: '💰', endpoint: '/90/PrjBudget', model: 'PrjProjectBudget', readOnly: true },
                { key: 'invoices', label: 'Invoices', icon: '📋', endpoint: '/90/PrjInvoice', model: 'PrjProjectInvoice', readOnly: true },
                { key: 'billing', label: 'Billing Schedule', icon: '📅', endpoint: '/90/PrjBillSch', model: 'PrjBillingSchedule', readOnly: true }
            ]
        },
        time: {
            label: 'Time & Expenses', icon: '⏱',
            services: [
                { key: 'timesheets', label: 'Timesheets', icon: '⏱', endpoint: '/90/PrjTmSheet', model: 'PrjTimesheet', readOnly: true },
                { key: 'expenses', label: 'Expense Reports', icon: '💳', endpoint: '/90/PrjExpRpt', model: 'PrjExpenseReport', readOnly: true }
            ]
        },
        deliverables: {
            label: 'Deliverables', icon: '📦',
            services: [
                { key: 'portfolio', label: 'Portfolio View', icon: '📦', endpoint: '/90/PrjPortflo', model: 'PrjPortfolioView', readOnly: true }
            ]
        }
    };

    // Build flat service map
    PRJC.serviceMap = {};
    Object.values(PRJC.sections).forEach(function(section) {
        section.services.forEach(function(svc) {
            PRJC.serviceMap[svc.model] = svc;
        });
    });
})();
