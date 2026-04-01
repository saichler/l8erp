/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Project Client Portal — form definitions (all read-only, no writable forms)
(function() {
    'use strict';

    var PRJC = window.PRJC = window.PRJC || {};

    // No writable forms — this is a read-only portal
    PRJC.forms = {};

    // Primary keys for all models
    PRJC.primaryKeys = {
        PrjProject: 'projectId',
        PrjStatusReport: 'statusId',
        PrjProjectKPI: 'kpiId',
        PrjProjectBudget: 'budgetId',
        PrjProjectInvoice: 'invoiceId',
        PrjBillingSchedule: 'scheduleId',
        PrjTimesheet: 'timesheetId',
        PrjExpenseReport: 'reportId',
        PrjPortfolioView: 'viewId'
    };
})();
