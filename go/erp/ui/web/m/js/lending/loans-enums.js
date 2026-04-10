/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Lending Loans Module - Enum Definitions
 * Desktop Equivalent: lending/loans/loans-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileLendLoans = window.MobileLendLoans || {};

    var LOAN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Delinquent', 'delinquent', 'status-terminated'],
        ['Default', 'default', 'status-terminated'],
        ['Paid Off', 'paid-off', 'status-active'],
        ['Closed', 'closed', 'status-inactive'],
        ['Restructured', 'restructured', 'status-pending'],
        ['Written Off', 'written-off', 'status-inactive']
    ]);
    var CREDIT_LINE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending-cl', 'status-pending'],
        ['Active', 'active-cl', 'status-active'],
        ['Frozen', 'frozen', 'status-pending'],
        ['Closed', 'closed-cl', 'status-inactive'],
        ['Default', 'default-cl', 'status-terminated'],
        ['Expired', 'expired', 'status-inactive']
    ]);
    var INTEREST_TYPE = factory.simple(['Unspecified', 'Fixed', 'Variable', 'Hybrid']);
    var FREQUENCY = factory.simple(['Unspecified', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Semi-Annual', 'Annual']);

    MobileLendLoans.enums = {
        LOAN_STATUS: LOAN_STATUS.enum,
        LOAN_STATUS_VALUES: LOAN_STATUS.values,
        LOAN_STATUS_CLASSES: LOAN_STATUS.classes,
        CREDIT_LINE_STATUS: CREDIT_LINE_STATUS.enum,
        CREDIT_LINE_STATUS_VALUES: CREDIT_LINE_STATUS.values,
        CREDIT_LINE_STATUS_CLASSES: CREDIT_LINE_STATUS.classes,
        INTEREST_TYPE: INTEREST_TYPE.enum,
        FREQUENCY: FREQUENCY.enum
    };

    MobileLendLoans.render = {
        loanStatus: createStatusRenderer(LOAN_STATUS.enum, LOAN_STATUS.classes),
        creditLineStatus: createStatusRenderer(CREDIT_LINE_STATUS.enum, CREDIT_LINE_STATUS.classes),
        interestType: function(value) { return renderEnum(value, INTEREST_TYPE.enum); },
        frequency: function(value) { return renderEnum(value, FREQUENCY.enum); },
        date: renderDate
    };
})();
