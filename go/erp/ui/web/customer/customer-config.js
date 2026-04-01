/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Customer Portal Service Configuration
// Maps customer sections to Sales (area 60), FIN (area 40), and CRM (area 80) service endpoints
(function() {
    'use strict';

    var CUST = window.CUST = window.CUST || {};

    CUST.sections = {
        'orders': {
            label: 'Orders', icon: '📦',
            services: [
                { key: 'salesorders', label: 'Sales Orders', icon: '🛒', endpoint: '/60/SalesOrder', model: 'SalesOrder', readOnly: true },
                { key: 'quotations', label: 'Quotations', icon: '📝', endpoint: '/60/SalesQuote', model: 'SalesQuotation', readOnly: true },
                { key: 'deliveries', label: 'Deliveries', icon: '🚚', endpoint: '/60/DlvryOrder', model: 'SalesDeliveryOrder', readOnly: true },
                { key: 'returns', label: 'Returns', icon: '↩️', endpoint: '/60/ReturnOrd', model: 'SalesReturnOrder' }
            ]
        },
        'billing': {
            label: 'Billing', icon: '💳',
            services: [
                { key: 'invoices', label: 'Invoices', icon: '📄', endpoint: '/40/SalesInv', model: 'SalesInvoice', readOnly: true },
                { key: 'payments', label: 'Payments', icon: '💰', endpoint: '/40/CustPmt', model: 'CustomerPayment', readOnly: true }
            ]
        },
        'support': {
            label: 'Support', icon: '🎧',
            services: [
                { key: 'cases', label: 'Support Cases', icon: '📋', endpoint: '/80/CrmCase', model: 'CrmCase' },
                { key: 'kb', label: 'Knowledge Base', icon: '📚', endpoint: '/80/CrmKBart', model: 'CrmKBArticle', readOnly: true }
            ]
        },
        'account': {
            label: 'Account', icon: '🏢',
            services: [
                { key: 'contracts', label: 'Contracts', icon: '📃', endpoint: '/60/CustContr', model: 'SalesCustomerContract', readOnly: true }
            ]
        }
    };

    // Build a flat service lookup: model -> service
    CUST.serviceMap = {};
    Object.values(CUST.sections).forEach(function(section) {
        section.services.forEach(function(svc) {
            CUST.serviceMap[svc.model] = svc;
        });
    });
})();
