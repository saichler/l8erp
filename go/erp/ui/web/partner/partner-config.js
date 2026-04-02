/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Partner Portal — service configuration
(function() {
    'use strict';

    var PTNR = window.PTNR = window.PTNR || {};

    PTNR.sections = {
        pipeline: {
            label: 'Pipeline', icon: '🔄',
            services: [
                { key: 'leads', label: 'Leads', icon: '🔄', endpoint: '/80/CrmLead', model: 'CrmLead' },
                { key: 'opportunities', label: 'Opportunities', icon: '💼', endpoint: '/80/CrmOpp', model: 'CrmOpportunity' },
                { key: 'leadsources', label: 'Lead Sources', icon: '📋', endpoint: '/80/CrmLeadSrc', model: 'CrmLeadSource', readOnly: true }
            ]
        },
        sales: {
            label: 'Sales', icon: '💼',
            services: [
                { key: 'quotations', label: 'Quotations', icon: '📋', endpoint: '/60/SalesQuote', model: 'SalesQuotation' },
                { key: 'orders', label: 'Orders', icon: '📦', endpoint: '/60/SalesOrder', model: 'SalesOrder', readOnly: true }
            ]
        },
        marketing: {
            label: 'Marketing', icon: '📢',
            services: [
                { key: 'campaigns', label: 'Campaigns', icon: '📢', endpoint: '/80/CrmCmpgn', model: 'CrmCampaign', readOnly: true },
                { key: 'marketinglists', label: 'Marketing Lists', icon: '📋', endpoint: '/80/CrmMktList', model: 'CrmMarketingList', readOnly: true }
            ]
        },
        commissions: {
            label: 'Commissions', icon: '💰',
            services: [
                { key: 'commissionplans', label: 'Commission Plans', icon: '💰', endpoint: '/60/CommPlan', model: 'SalesCommissionPlan', readOnly: true }
            ]
        },
        profile: {
            label: 'Profile', icon: '🏢',
            services: [
                { key: 'partnerchannel', label: 'Partner Channel', icon: '🏢', endpoint: '/60/Partner', model: 'SalesPartnerChannel', readOnly: true }
            ]
        }
    };

    // Build flat service map
    PTNR.serviceMap = {};
    Object.values(PTNR.sections).forEach(function(section) {
        section.services.forEach(function(svc) {
            PTNR.serviceMap[svc.model] = svc;
        });
    });
})();
