/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DModuleFactory.create({
        namespace: 'Doc',
        defaultModule: 'storage',
        defaultService: 'documents',
        sectionSelector: 'storage',
        initializerName: 'initializeDoc',
        requiredNamespaces: ['DocStorage', 'DocWorkflow', 'DocIntegration', 'DocCompliance']
    });
})();
