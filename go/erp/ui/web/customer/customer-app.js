/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Customer Portal — config-only initialization using shared Layer8DPortal framework.
(function() {
    'use strict';

    window.CUST = window.CUST || {};

    Layer8DPortal.init({
        namespace: 'CUST',
        scopeField: 'customerId',
        sharedModels: ['CrmKBArticle'],
        moduleNamespace: 'Sales',
        contentAreaId: 'l8-portal-content-area',
        navMenuSelector: '.l8-portal-nav-menu',
        headerRightSelector: '.l8-portal-header-right',
        logoutBtnSelector: '.l8-portal-logout-btn',
        usernameSelector: '.l8-portal-username'
    });
})();
