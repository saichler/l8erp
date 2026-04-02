/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Project Client Portal — config-only initialization using shared Layer8MPortal framework.
(function() {
    'use strict';

    window.PRJC = window.PRJC || {};

    Layer8MPortal.init({
        namespace: 'PRJC',
        mobileObject: 'MobilePRJC',
        scopeField: 'customerId',
        sharedModels: ['PrjStatusReport', 'PrjProjectKPI', 'PrjProjectBudget', 'PrjBillingSchedule', 'PrjTimesheet', 'PrjExpenseReport', 'PrjPortfolioView'],
        moduleNamespace: 'Prj',
        portalSvgKey: 'projects',
        portalIcon: '📋',
        contentAreaId: 'content-area',
        sidebarNavId: 'l8-portal-sidebar-nav',
        navMenuTitle: 'Menu'
    });
})();
