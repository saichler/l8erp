/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile ESS Portal — config-only initialization using shared Layer8MPortal framework.
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};

    Layer8MPortal.init({
        namespace: 'ESS',
        mobileObject: 'MobileESS',
        scopeField: 'employeeId',
        sharedModels: ['Holiday', 'BenefitPlan'],
        moduleNamespace: 'HCM',
        contentAreaId: 'content-area',
        sidebarNavId: 'l8-portal-sidebar-nav',
        navMenuTitle: 'Menu',
        onUsername: function(username) {
            ESS.employeeName = username;
            ESS.employeeId = username;
        }
    });
})();
