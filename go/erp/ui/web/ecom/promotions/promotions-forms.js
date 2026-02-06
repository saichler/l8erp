/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// E-Commerce Promotions Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.EcomPromotions = window.EcomPromotions || {};

    const f = window.Layer8FormFactory;
    const enums = EcomPromotions.enums;

    EcomPromotions.forms = {
        EcomPromotion: f.form('Promotion', [
            f.section('Promotion Details', [
                ...f.text('name', 'Promotion Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('promotionType', 'Promotion Type', enums.PROMOTION_TYPE, true),
                ...f.number('discountValue', 'Discount Value', true),
                ...f.money('maxDiscount', 'Max Discount'),
                ...f.money('minPurchase', 'Min Purchase'),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isActive', 'Is Active'),
                ...f.number('usageLimit', 'Usage Limit'),
                ...f.number('perCustomerLimit', 'Per Customer Limit'),
                ...f.text('customerGroup', 'Customer Group'),
                ...f.checkbox('stackable', 'Stackable'),
                ...f.number('priority', 'Priority')
            ])
        ]),

        EcomCoupon: f.form('Coupon', [
            f.section('Coupon Details', [
                ...f.text('code', 'Coupon Code', true),
                ...f.textarea('description', 'Description'),
                ...f.select('discountType', 'Discount Type', enums.DISCOUNT_TYPE, true),
                ...f.number('discountValue', 'Discount Value', true),
                ...f.money('maxDiscount', 'Max Discount'),
                ...f.money('minPurchase', 'Min Purchase'),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isActive', 'Is Active'),
                ...f.number('usageLimit', 'Usage Limit'),
                ...f.number('perCustomerLimit', 'Per Customer Limit'),
                ...f.checkbox('firstOrderOnly', 'First Order Only'),
                ...f.text('customerGroup', 'Customer Group'),
                ...f.checkbox('freeShipping', 'Free Shipping')
            ])
        ]),

        EcomPriceRule: f.form('Price Rule', [
            f.section('Price Rule Details', [
                ...f.text('name', 'Rule Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('discountType', 'Discount Type', enums.DISCOUNT_TYPE, true),
                ...f.number('discountValue', 'Discount Value', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isActive', 'Is Active'),
                ...f.number('priority', 'Priority'),
                ...f.text('customerGroup', 'Customer Group'),
                ...f.money('minQuantity', 'Min Quantity'),
                ...f.money('maxQuantity', 'Max Quantity'),
                ...f.checkbox('applyToAll', 'Apply to All')
            ])
        ]),

        EcomShippingMethod: f.form('Shipping Method', [
            f.section('Shipping Method Details', [
                ...f.text('name', 'Method Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('carrier', 'Carrier', true),
                ...f.text('carrierService', 'Carrier Service'),
                ...f.money('baseRate', 'Base Rate', true),
                ...f.money('perItemRate', 'Per Item Rate'),
                ...f.money('perWeightRate', 'Per Weight Rate'),
                ...f.money('freeShippingThreshold', 'Free Shipping Threshold'),
                ...f.number('minDeliveryDays', 'Min Delivery Days'),
                ...f.number('maxDeliveryDays', 'Max Delivery Days'),
                ...f.checkbox('isActive', 'Is Active'),
                ...f.money('minOrderAmount', 'Min Order Amount'),
                ...f.money('maxOrderAmount', 'Max Order Amount'),
                ...f.number('maxWeight', 'Max Weight'),
                ...f.number('sortOrder', 'Sort Order'),
                ...f.checkbox('trackingAvailable', 'Tracking Available')
            ])
        ]),

        EcomPaymentMethod: f.form('Payment Method', [
            f.section('Payment Method Details', [
                ...f.text('name', 'Method Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('provider', 'Provider', true),
                ...f.textarea('providerConfig', 'Provider Config'),
                ...f.checkbox('isActive', 'Is Active'),
                ...f.checkbox('isTestMode', 'Is Test Mode'),
                ...f.money('minAmount', 'Min Amount'),
                ...f.money('maxAmount', 'Max Amount'),
                ...f.number('transactionFeePercent', 'Transaction Fee %'),
                ...f.money('transactionFeeFixed', 'Transaction Fee Fixed'),
                ...f.number('sortOrder', 'Sort Order'),
                ...f.text('iconUrl', 'Icon URL'),
                ...f.textarea('instructions', 'Instructions'),
                ...f.checkbox('requiresBillingAddress', 'Requires Billing Address'),
                ...f.checkbox('supportsRefunds', 'Supports Refunds'),
                ...f.checkbox('supportsPartialRefunds', 'Supports Partial Refunds')
            ])
        ])
    };

    EcomPromotions.primaryKeys = {
        EcomPromotion: 'promotionId',
        EcomCoupon: 'couponId',
        EcomPriceRule: 'ruleId',
        EcomShippingMethod: 'methodId',
        EcomPaymentMethod: 'methodId'
    };

})();
