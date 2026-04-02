/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// ESS Portal — config-only initialization using shared Layer8DPortal framework.
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};

    // Portal-specific state
    ESS.employeeId = '';
    ESS.employeeName = '';

    Layer8DPortal.init({
        namespace: 'ESS',
        scopeField: 'employeeId',
        sharedModels: ['Holiday', 'BenefitPlan'],
        moduleNamespace: 'HCM',
        portalSvgKey: 'people',
        portalIcon: '👤',
        contentAreaId: 'l8-portal-content-area',
        navMenuSelector: '.l8-portal-nav-menu',
        headerRightSelector: '.l8-portal-header-right',
        logoutBtnSelector: '.l8-portal-logout-btn',
        usernameSelector: '.l8-portal-username',
        onUsername: function(username) {
            ESS.employeeName = username;
            ESS.employeeId = username;
        }
    });
})();
