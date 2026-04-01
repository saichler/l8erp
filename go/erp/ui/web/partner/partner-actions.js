/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Partner Portal — custom actions
(function() {
    'use strict';

    var PTNR = window.PTNR = window.PTNR || {};

    PTNR.actions = {
        registerLead: function() {
            if (typeof PTNR._openAddForm === 'function') {
                PTNR._openAddForm('CrmLead');
            }
        },

        createQuotation: function() {
            if (typeof PTNR._openAddForm === 'function') {
                PTNR._openAddForm('SalesQuotation');
            }
        },

        viewCommissionStatement: function(plan) {
            if (!plan || !plan.planId) return;
            if (typeof PTNR._openViewForm === 'function') {
                PTNR._openViewForm('SalesCommissionPlan', plan);
            }
        }
    };
})();
