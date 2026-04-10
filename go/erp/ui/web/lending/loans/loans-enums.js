/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.LendLoans = window.LendLoans || {};

    var factory = window.Layer8EnumFactory;
    var createStatusRenderer = Layer8DRenderers.createStatusRenderer;

    var LOAN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Current', 'current', 'layer8d-status-completed'],
        ['Delinquent', 'delinquent', 'layer8d-status-warning'],
        ['Default', 'default', 'layer8d-status-error'],
        ['Paid Off', 'paid-off', 'layer8d-status-completed'],
        ['Charged Off', 'charged-off', 'layer8d-status-cancelled'],
        ['Restructured', 'restructured', 'layer8d-status-info'],
        ['Frozen', 'frozen', 'layer8d-status-inactive']
    ]);
    var CREDIT_LINE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Frozen', 'frozen', 'layer8d-status-warning'],
        ['Closed', 'closed', 'layer8d-status-inactive'],
        ['Expired', 'expired', 'layer8d-status-cancelled'],
        ['Overlimit', 'overlimit', 'layer8d-status-error'],
        ['Suspended', 'suspended', 'layer8d-status-pending']
    ]);
    var INTEREST_TYPE = factory.simple(['Unspecified', 'Fixed', 'Variable', 'Hybrid']);
    var FREQUENCY = factory.simple(['Unspecified', 'Monthly', 'Bi-Weekly', 'Weekly', 'Quarterly', 'Semi-Annual', 'Annual']);
    var DISBURSEMENT_STATUS = factory.simple(['Unspecified', 'Pending', 'Completed', 'Failed', 'Reversed']);
    var FEE_TYPE = factory.simple(['Unspecified', 'Origination', 'Late Payment', 'Prepayment Penalty', 'NSF', 'Annual', 'Service', 'Other']);

    LendLoans.enums = {
        LOAN_STATUS: LOAN_STATUS.enum,
        LOAN_STATUS_VALUES: LOAN_STATUS.values,
        LOAN_STATUS_CLASSES: LOAN_STATUS.classes,
        CREDIT_LINE_STATUS: CREDIT_LINE_STATUS.enum,
        CREDIT_LINE_STATUS_VALUES: CREDIT_LINE_STATUS.values,
        CREDIT_LINE_STATUS_CLASSES: CREDIT_LINE_STATUS.classes,
        INTEREST_TYPE: INTEREST_TYPE.enum,
        FREQUENCY: FREQUENCY.enum,
        DISBURSEMENT_STATUS: DISBURSEMENT_STATUS.enum,
        FEE_TYPE: FEE_TYPE.enum
    };

    LendLoans.render = {
        loanStatus: createStatusRenderer(LOAN_STATUS.enum, LOAN_STATUS.classes),
        creditLineStatus: createStatusRenderer(CREDIT_LINE_STATUS.enum, CREDIT_LINE_STATUS.classes),
        interestType: function(value) { return Layer8DRenderers.renderEnum(value, INTEREST_TYPE.enum); },
        frequency: function(value) { return Layer8DRenderers.renderEnum(value, FREQUENCY.enum); },
        disbursementStatus: function(value) { return Layer8DRenderers.renderEnum(value, DISBURSEMENT_STATUS.enum); },
        feeType: function(value) { return Layer8DRenderers.renderEnum(value, FEE_TYPE.enum); }
    };
})();
