/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Manager Portal — config-only initialization using shared Layer8MPortal framework.
(function() {
    'use strict';

    window.MGR = window.MGR || {};

    Layer8MPortal.init({
        namespace: 'MGR',
        mobileObject: 'MobileMGR',
        scopeField: 'managerId',
        sharedModels: ['Department'],
        moduleNamespace: 'HCM',
        contentAreaId: 'content-area',
        sidebarNavId: 'l8-portal-sidebar-nav',
        navMenuTitle: 'Menu'
    });
})();
