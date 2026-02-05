/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DModuleFactory.create({
        namespace: 'Ecom',
        defaultModule: 'catalog',
        defaultService: 'products',
        sectionSelector: 'catalog',
        initializerName: 'initializeEcom',
        requiredNamespaces: ['EcomCatalog', 'EcomOrders', 'EcomCustomers', 'EcomPromotions']
    });
})();
