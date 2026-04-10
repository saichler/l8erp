/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.LendPayments = window.LendPayments || {};

    var factory = window.Layer8EnumFactory;
    var createStatusRenderer = Layer8DRenderers.createStatusRenderer;

    var PAYMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-completed'],
        ['Failed', 'failed', 'layer8d-status-error'],
        ['Reversed', 'reversed', 'layer8d-status-cancelled'],
        ['Partial', 'partial', 'layer8d-status-warning']
    ]);
    var PAYMENT_METHOD = factory.simple(['Unspecified', 'ACH', 'Wire Transfer', 'Check', 'Cash', 'Auto Debit', 'Online', 'Other']);
    var COLLATERAL_TYPE = factory.simple(['Unspecified', 'Real Estate', 'Vehicle', 'Equipment', 'Inventory', 'Accounts Receivable', 'Securities', 'Cash Deposit', 'Other']);
    var COLLATERAL_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pledged', 'pledged', 'layer8d-status-active'],
        ['Released', 'released', 'layer8d-status-completed'],
        ['Seized', 'seized', 'layer8d-status-error'],
        ['Under Valuation', 'under-valuation', 'layer8d-status-warning'],
        ['Pending', 'pending-coll', 'layer8d-status-pending']
    ]);

    LendPayments.enums = {
        PAYMENT_STATUS: PAYMENT_STATUS.enum,
        PAYMENT_STATUS_VALUES: PAYMENT_STATUS.values,
        PAYMENT_STATUS_CLASSES: PAYMENT_STATUS.classes,
        PAYMENT_METHOD: PAYMENT_METHOD.enum,
        COLLATERAL_TYPE: COLLATERAL_TYPE.enum,
        COLLATERAL_STATUS: COLLATERAL_STATUS.enum,
        COLLATERAL_STATUS_VALUES: COLLATERAL_STATUS.values,
        COLLATERAL_STATUS_CLASSES: COLLATERAL_STATUS.classes
    };

    LendPayments.render = {
        paymentStatus: createStatusRenderer(PAYMENT_STATUS.enum, PAYMENT_STATUS.classes),
        paymentMethod: function(value) { return Layer8DRenderers.renderEnum(value, PAYMENT_METHOD.enum); },
        collateralType: function(value) { return Layer8DRenderers.renderEnum(value, COLLATERAL_TYPE.enum); },
        collateralStatus: createStatusRenderer(COLLATERAL_STATUS.enum, COLLATERAL_STATUS.classes)
    };
})();
