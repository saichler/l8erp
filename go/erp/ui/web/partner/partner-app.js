/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Partner Portal — config-only initialization using shared Layer8DPortal framework.
(function() {
    'use strict';

    window.PTNR = window.PTNR || {};

    Layer8DPortal.init({
        namespace: 'PTNR',
        scopeField: 'partnerId',
        sharedModels: ['CrmLead', 'CrmOpportunity', 'CrmLeadSource', 'CrmCampaign', 'CrmMarketingList', 'SalesQuotation', 'SalesOrder', 'SalesCommissionPlan'],
        moduleNamespace: 'CRM'
    });
})();
