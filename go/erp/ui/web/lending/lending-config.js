/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Lending Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'Lending',
    modules: {
        'products': {
            label: 'Products', icon: '📦',
            services: [
                { key: 'products', label: 'Products', icon: '📦', endpoint: '/130/LendProd', model: 'LendProduct' },
                { key: 'applications', label: 'Applications', icon: '📝', endpoint: '/130/LendApp', model: 'LendApplication' }
            ]
        },
        'loans': {
            label: 'Loans', icon: '💰',
            services: [
                { key: 'loans', label: 'Loans', icon: '💰', endpoint: '/130/LendLoan', model: 'Loan' },
                { key: 'credit-lines', label: 'Credit Lines', icon: '💳', endpoint: '/130/CreditLn', model: 'CreditLine' }
            ]
        },
        'payments': {
            label: 'Payments', icon: '💵',
            services: [
                { key: 'payments', label: 'Payments', icon: '💵', endpoint: '/130/LendPay', model: 'LendPayment' },
                { key: 'collateral', label: 'Collateral', icon: '🔒', endpoint: '/130/LendCltrl', model: 'LendCollateral' }
            ]
        }
    },
    submodules: ['LendProducts', 'LendLoans', 'LendPayments']
});
