/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Lending Payments Module - Enum Definitions
 * Desktop Equivalent: lending/payments/payments-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileLendPayments = window.MobileLendPayments || {};

    var PAYMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Failed', 'failed', 'status-terminated'],
        ['Reversed', 'reversed', 'status-inactive'],
        ['Partial', 'partial', 'status-pending']
    ]);
    var PAYMENT_METHOD = factory.simple(['Unspecified', 'ACH', 'Wire Transfer', 'Check', 'Cash', 'Auto Debit', 'Online', 'Other']);
    var COLLATERAL_TYPE = factory.simple(['Unspecified', 'Real Estate', 'Vehicle', 'Equipment', 'Inventory', 'Accounts Receivable', 'Securities', 'Cash Deposit', 'Other']);
    var COLLATERAL_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pledged', 'pledged', 'status-active'],
        ['Released', 'released', 'status-active'],
        ['Seized', 'seized', 'status-terminated'],
        ['Under Valuation', 'under-valuation', 'status-pending'],
        ['Pending', 'pending-coll', 'status-pending']
    ]);

    MobileLendPayments.enums = {
        PAYMENT_STATUS: PAYMENT_STATUS.enum,
        PAYMENT_STATUS_VALUES: PAYMENT_STATUS.values,
        PAYMENT_STATUS_CLASSES: PAYMENT_STATUS.classes,
        PAYMENT_METHOD: PAYMENT_METHOD.enum,
        COLLATERAL_TYPE: COLLATERAL_TYPE.enum,
        COLLATERAL_STATUS: COLLATERAL_STATUS.enum,
        COLLATERAL_STATUS_VALUES: COLLATERAL_STATUS.values,
        COLLATERAL_STATUS_CLASSES: COLLATERAL_STATUS.classes
    };

    MobileLendPayments.render = {
        paymentStatus: createStatusRenderer(PAYMENT_STATUS.enum, PAYMENT_STATUS.classes),
        paymentMethod: function(value) { return renderEnum(value, PAYMENT_METHOD.enum); },
        collateralType: function(value) { return renderEnum(value, COLLATERAL_TYPE.enum); },
        collateralStatus: createStatusRenderer(COLLATERAL_STATUS.enum, COLLATERAL_STATUS.classes),
        date: renderDate
    };
})();
