/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Project Client Portal — service configuration (all read-only)
(function() {
    'use strict';

    var PRJC = window.PRJC = window.PRJC || {};

    PRJC.sections = {
        projects: [
            { key: 'projects', label: 'Projects', model: 'PrjProject', serviceName: 'PrjProj', serviceArea: 90, readOnly: true },
            { key: 'statusreports', label: 'Status Reports', model: 'PrjStatusReport', serviceName: 'PrjStatus', serviceArea: 90, readOnly: true },
            { key: 'kpis', label: 'KPIs', model: 'PrjProjectKPI', serviceName: 'PrjKPI', serviceArea: 90, readOnly: true }
        ],
        budget: [
            { key: 'budgets', label: 'Budgets', model: 'PrjProjectBudget', serviceName: 'PrjBudget', serviceArea: 90, readOnly: true },
            { key: 'invoices', label: 'Invoices', model: 'PrjProjectInvoice', serviceName: 'PrjInvoice', serviceArea: 90, readOnly: true },
            { key: 'billing', label: 'Billing Schedule', model: 'PrjBillingSchedule', serviceName: 'PrjBillSch', serviceArea: 90, readOnly: true }
        ],
        time: [
            { key: 'timesheets', label: 'Timesheets', model: 'PrjTimesheet', serviceName: 'PrjTmSheet', serviceArea: 90, readOnly: true },
            { key: 'expenses', label: 'Expense Reports', model: 'PrjExpenseReport', serviceName: 'PrjExpRpt', serviceArea: 90, readOnly: true }
        ],
        deliverables: [
            { key: 'portfolio', label: 'Portfolio View', model: 'PrjPortfolioView', serviceName: 'PrjPortflo', serviceArea: 90, readOnly: true }
        ]
    };

    // Build flat service map
    PRJC.serviceMap = {};
    Object.keys(PRJC.sections).forEach(function(sec) {
        PRJC.sections[sec].forEach(function(svc) {
            PRJC.serviceMap[svc.key] = svc;
        });
    });
})();
