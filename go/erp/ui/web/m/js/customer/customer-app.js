/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Customer Portal — config-only initialization using shared Layer8MPortal framework.
(function() {
    'use strict';

    window.CUST = window.CUST || {};

    Layer8MPortal.init({
        namespace: 'CUST',
        mobileObject: 'MobileCUST',
        scopeField: 'customerId',
        sharedModels: ['CrmCase', 'CrmKBArticle'],
        moduleNamespace: 'Sales',
        portalSvgKey: 'sales',
        portalIcon: '🛒',
        contentAreaId: 'content-area',
        sidebarNavId: 'l8-portal-sidebar-nav',
        navMenuTitle: 'Menu'
    });
})();
