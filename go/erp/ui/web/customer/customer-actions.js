/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Customer Portal Actions
(function() {
    'use strict';

    var CUST = window.CUST = window.CUST || {};

    CUST.actions = {
        createReturnRequest: function(order) {
            if (!order || !order.salesOrderId) return;
            // Pre-fill return form with original order reference
            var prefill = { salesOrderId: order.salesOrderId };
            if (typeof CUST._openAddForm === 'function') {
                CUST._openAddForm('SalesReturnOrder', prefill);
            }
        },

        createSupportCase: function() {
            if (typeof CUST._openAddForm === 'function') {
                CUST._openAddForm('CrmCase');
            }
        }
    };
})();
