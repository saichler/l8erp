/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Project Client Portal Actions (read-only portal)
(function() {
    'use strict';

    var PRJC = window.PRJC = window.PRJC || {};

    PRJC.mobileActions = {
        viewProjectStatus: function(project) {
            if (!project || !project.projectId) return;
            if (typeof PRJC._openViewForm === 'function') {
                PRJC._openViewForm('PrjProject', project);
            }
        },

        viewInvoice: function(invoice) {
            if (!invoice || !invoice.invoiceId) return;
            if (typeof PRJC._openViewForm === 'function') {
                PRJC._openViewForm('PrjProjectInvoice', invoice);
            }
        }
    };
})();
