/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Lending Products Module - Enum Definitions
 * Desktop Equivalent: lending/products/products-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileLendProducts = window.MobileLendProducts || {};

    var PRODUCT_TYPE = factory.simple(['Unspecified', 'Term Loan', 'Line of Credit', 'Mortgage', 'Auto Loan', 'Personal Loan', 'Business Loan', 'Student Loan', 'Other']);
    var PRODUCT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Suspended', 'suspended', 'status-pending'],
        ['Discontinued', 'discontinued', 'status-inactive'],
        ['Archived', 'archived', 'status-inactive']
    ]);
    var INTEREST_TYPE = factory.simple(['Unspecified', 'Fixed', 'Variable', 'Hybrid']);
    var FREQUENCY = factory.simple(['Unspecified', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Semi-Annual', 'Annual']);
    var APPLICATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Submitted', 'submitted', 'status-pending'],
        ['Under Review', 'under-review', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Conditionally Approved', 'cond-approved', 'status-pending'],
        ['Denied', 'denied', 'status-terminated'],
        ['Withdrawn', 'withdrawn', 'status-inactive'],
        ['Funded', 'funded', 'status-active']
    ]);

    MobileLendProducts.enums = {
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

    MobileLendProducts.render = {
        productType: function(value) { return renderEnum(value, PRODUCT_TYPE.enum); },
        productStatus: createStatusRenderer(PRODUCT_STATUS.enum, PRODUCT_STATUS.classes),
        interestType: function(value) { return renderEnum(value, INTEREST_TYPE.enum); },
        frequency: function(value) { return renderEnum(value, FREQUENCY.enum); },
        applicationStatus: createStatusRenderer(APPLICATION_STATUS.enum, APPLICATION_STATUS.classes),
        date: renderDate
    };
})();
