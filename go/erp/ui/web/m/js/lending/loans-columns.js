/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Lending Loans Module - Column Configurations
 * Desktop Equivalent: lending/loans/loans-columns.js
 */
(function() {
    'use strict';

    var col = window.Layer8ColumnFactory;
    var enums = MobileLendLoans.enums;
    var render = MobileLendLoans.render;

    MobileLendLoans.columns = {
        Loan: [
            ...col.id('loanId'),
            ...col.col('loanNumber', 'Loan #'),
            ...col.col('customerId', 'Customer'),
            ...col.status('status', 'Status', enums.LOAN_STATUS_VALUES, render.loanStatus),
            ...col.money('originalAmount', 'Original Amount'),
            ...col.money('totalBalance', 'Balance'),
            ...col.col('interestRate', 'Rate %'),
            ...col.enum('interestType', 'Interest Type', null, render.interestType),
            ...col.date('originationDate', 'Originated'),
            ...col.date('maturityDate', 'Maturity'),
            ...col.col('daysPastDue', 'Days Past Due'),
        ],
        CreditLine: [
            ...col.id('creditLineId'),
            ...col.col('creditLineNumber', 'Credit Line #'),
            ...col.col('customerId', 'Customer'),
            ...col.status('status', 'Status', enums.CREDIT_LINE_STATUS_VALUES, render.creditLineStatus),
            ...col.money('creditLimit', 'Credit Limit'),
            ...col.money('availableBalance', 'Available'),
            ...col.money('outstandingBalance', 'Outstanding'),
            ...col.col('interestRate', 'Rate %'),
            ...col.date('openingDate', 'Opened'),
            ...col.date('expirationDate', 'Expires'),
            ...col.col('daysPastDue', 'Days Past Due'),
        ],
    };

    MobileLendLoans.primaryKeys = {
        Loan: 'loanId',
        CreditLine: 'creditLineId'
    };
})();
