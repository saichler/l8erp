/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Partner Portal Actions
(function() {
    'use strict';

    var PTNR = window.PTNR = window.PTNR || {};

    PTNR.mobileActions = {
        registerLead: function() {
            if (typeof PTNR._openAddForm === 'function') {
                PTNR._openAddForm('CrmLead');
            }
        },

        createQuotation: function() {
            if (typeof PTNR._openAddForm === 'function') {
                PTNR._openAddForm('SalesQuotation');
            }
        }
    };
})();
