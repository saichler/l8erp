/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Shared Reference Data - Lending Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataLending = {
        // ========================================
        // Lending - Products
        // ========================================
        ...ref.coded('LendProduct', 'productId', 'productCode', 'name'),
        ...ref.simple('LendApplication', 'applicationId', 'applicationNumber'),

        // ========================================
        // Lending - Loans
        // ========================================
        ...ref.simple('Loan', 'loanId', 'loanNumber'),
        ...ref.simple('CreditLine', 'creditLineId', 'creditLineNumber'),

        // ========================================
        // Lending - Payments
        // ========================================
        ...ref.simple('LendPayment', 'paymentId', 'paymentNumber'),
        ...ref.simple('LendCollateral', 'collateralId', 'name')
    };
})();
