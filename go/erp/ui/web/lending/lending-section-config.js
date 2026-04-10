/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Lending Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('lending', {
        title: 'Lending',
        subtitle: 'Loan Products, Applications, Credit Lines & Payment Management',
        icon: '🏦',
        svgContent: Layer8SvgFactory.generate('lending'),
        initFn: 'initializeLending',
        modules: [
            {
                key: 'products', label: 'Products', icon: '📦', isDefault: true,
                services: [
                    { key: 'products', label: 'Products', icon: '📦', isDefault: true },
                    { key: 'applications', label: 'Applications', icon: '📝' }
                ]
            },
            {
                key: 'loans', label: 'Loans', icon: '💰',
                services: [
                    { key: 'loans', label: 'Loans', icon: '💰', isDefault: true },
                    { key: 'credit-lines', label: 'Credit Lines', icon: '💳' }
                ]
            },
            {
                key: 'payments', label: 'Payments', icon: '💵',
                services: [
                    { key: 'payments', label: 'Payments', icon: '💵', isDefault: true },
                    { key: 'collateral', label: 'Collateral', icon: '🔒' }
                ]
            }
        ]
    });
})();
