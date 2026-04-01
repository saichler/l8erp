/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Partner Portal — service configuration
(function() {
    'use strict';

    var PTNR = window.PTNR = window.PTNR || {};

    PTNR.sections = {
        pipeline: [
            { key: 'leads', label: 'Leads', model: 'CrmLead', serviceName: 'CrmLead', serviceArea: 80 },
            { key: 'opportunities', label: 'Opportunities', model: 'CrmOpportunity', serviceName: 'CrmOpp', serviceArea: 80 },
            { key: 'leadsources', label: 'Lead Sources', model: 'CrmLeadSource', serviceName: 'CrmLeadSrc', serviceArea: 80, readOnly: true }
        ],
        sales: [
            { key: 'quotations', label: 'Quotations', model: 'SalesQuotation', serviceName: 'SalesQuote', serviceArea: 60 },
            { key: 'orders', label: 'Orders', model: 'SalesOrder', serviceName: 'SalesOrder', serviceArea: 60, readOnly: true }
        ],
        marketing: [
            { key: 'campaigns', label: 'Campaigns', model: 'CrmCampaign', serviceName: 'CrmCmpgn', serviceArea: 80, readOnly: true },
            { key: 'marketinglists', label: 'Marketing Lists', model: 'CrmMarketingList', serviceName: 'CrmMktList', serviceArea: 80, readOnly: true }
        ],
        commissions: [
            { key: 'commissionplans', label: 'Commission Plans', model: 'SalesCommissionPlan', serviceName: 'CommPlan', serviceArea: 60, readOnly: true }
        ],
        profile: [
            { key: 'partnerchannel', label: 'Partner Channel', model: 'SalesPartnerChannel', serviceName: 'Partner', serviceArea: 60, readOnly: true }
        ]
    };

    // Build flat service map
    PTNR.serviceMap = {};
    Object.keys(PTNR.sections).forEach(function(sec) {
        PTNR.sections[sec].forEach(function(svc) {
            PTNR.serviceMap[svc.key] = svc;
        });
    });
})();
