/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.LendProducts = window.LendProducts || {};

    var factory = window.Layer8EnumFactory;
    var createStatusRenderer = Layer8DRenderers.createStatusRenderer;

    var PRODUCT_TYPE = factory.simple(['Unspecified', 'Term Loan', 'Revolving Credit', 'Mortgage', 'Auto Loan', 'Personal Loan', 'Business Loan', 'Line of Credit', 'Overdraft']);
    var PRODUCT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Inactive', 'inactive', 'layer8d-status-inactive'],
        ['Discontinued', 'discontinued', 'layer8d-status-cancelled']
    ]);
    var INTEREST_TYPE = factory.simple(['Unspecified', 'Fixed', 'Variable', 'Hybrid']);
    var FREQUENCY = factory.simple(['Unspecified', 'Monthly', 'Bi-Weekly', 'Weekly', 'Quarterly', 'Semi-Annual', 'Annual']);
    var APPLICATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Submitted', 'submitted', 'layer8d-status-info'],
        ['Under Review', 'under-review', 'layer8d-status-warning'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Denied', 'denied', 'layer8d-status-error'],
        ['Withdrawn', 'withdrawn', 'layer8d-status-inactive'],
        ['Funded', 'funded', 'layer8d-status-completed']
    ]);

    LendProducts.enums = {
        PRODUCT_TYPE: PRODUCT_TYPE.enum,
        PRODUCT_STATUS: PRODUCT_STATUS.enum,
        PRODUCT_STATUS_VALUES: PRODUCT_STATUS.values,
        PRODUCT_STATUS_CLASSES: PRODUCT_STATUS.classes,
        INTEREST_TYPE: INTEREST_TYPE.enum,
        FREQUENCY: FREQUENCY.enum,
        APPLICATION_STATUS: APPLICATION_STATUS.enum,
        APPLICATION_STATUS_VALUES: APPLICATION_STATUS.values,
        APPLICATION_STATUS_CLASSES: APPLICATION_STATUS.classes
    };

    LendProducts.render = {
        productType: function(value) { return Layer8DRenderers.renderEnum(value, PRODUCT_TYPE.enum); },
        productStatus: createStatusRenderer(PRODUCT_STATUS.enum, PRODUCT_STATUS.classes),
        interestType: function(value) { return Layer8DRenderers.renderEnum(value, INTEREST_TYPE.enum); },
        frequency: function(value) { return Layer8DRenderers.renderEnum(value, FREQUENCY.enum); },
        applicationStatus: createStatusRenderer(APPLICATION_STATUS.enum, APPLICATION_STATUS.classes)
    };
})();
