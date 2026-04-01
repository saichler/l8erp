/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Project Client Portal — config-only initialization using shared Layer8DPortal framework.
(function() {
    'use strict';

    window.PRJC = window.PRJC || {};

    Layer8DPortal.init({
        namespace: 'PRJC',
        scopeField: 'customerId',
        sharedModels: [],
        moduleNamespace: 'Prj'
    });
})();
