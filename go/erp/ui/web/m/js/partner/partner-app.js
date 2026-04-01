/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Partner Portal — config-only initialization using shared Layer8MPortal framework.
(function() {
    'use strict';

    window.PTNR = window.PTNR || {};

    Layer8MPortal.init({
        namespace: 'PTNR',
        mobileObject: 'MobilePTNR',
        scopeField: 'partnerId',
        sharedModels: ['CrmLeadSource', 'SalesCommissionPlan'],
        moduleNamespace: 'CRM',
        contentAreaId: 'content-area',
        sidebarNavId: 'l8-portal-sidebar-nav',
        navMenuTitle: 'Menu'
    });
})();
