/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - E-Commerce Module
 * Extends shared ECOM data with mobile-specific entries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    Layer8MReferenceRegistry.register({
        ...window.ReferenceDataEcom,

        // Mobile-specific: additional catalog entries
        ...ref.simple('EcomAttribute', 'attributeId', 'name'),

        // Mobile-specific: additional customer entries
        ...ref.idOnly('EcomCart', 'cartId'),

        // Mobile-specific: additional promotions entries
        ...ref.simple('EcomPriceRule', 'ruleId', 'name')
    });
})();
