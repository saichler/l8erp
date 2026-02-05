/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DModuleFactory.create({
        namespace: 'Comp',
        defaultModule: 'regulatory',
        defaultService: 'regulations',
        sectionSelector: 'regulatory',
        initializerName: 'initializeComp',
        requiredNamespaces: ['CompRegulatory', 'CompControls', 'CompRisk', 'CompAudit']
    });
})();
