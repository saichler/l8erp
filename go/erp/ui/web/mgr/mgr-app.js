/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Manager Portal — config-only initialization using shared Layer8DPortal framework.
(function() {
    'use strict';

    window.MGR = window.MGR || {};

    Layer8DPortal.init({
        namespace: 'MGR',
        scopeField: 'managerId',
        sharedModels: ['Department', 'LeaveRequest', 'Timesheet', 'PerformanceReview', 'Goal', 'EmployeeSkill', 'CompensationStatement'],
        moduleNamespace: 'HCM',
        contentAreaId: 'l8-portal-content-area',
        navMenuSelector: '.l8-portal-nav-menu',
        headerRightSelector: '.l8-portal-header-right',
        logoutBtnSelector: '.l8-portal-logout-btn',
        usernameSelector: '.l8-portal-username'
    });
})();
