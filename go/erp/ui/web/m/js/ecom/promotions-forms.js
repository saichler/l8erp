/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile ECOM Promotions Module - Form Configurations
 * Desktop Equivalent: ecom/promotions/promotions-forms.js
 */
(function() {
    'use strict';

    window.MobileEcomPromotions = window.MobileEcomPromotions || {};
    const f = window.Layer8FormFactory;
    const enums = MobileEcomPromotions.enums;

    MobileEcomPromotions.forms = {
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
                ...f.number('priority', 'Priority'),
                ...f.number('usageCount', 'Usage Count'),
                ...f.text('applicableProductIds', 'Applicable Product Ids'),
                ...f.text('applicableCategoryIds', 'Applicable Category Ids'),
                ...f.text('excludedProductIds', 'Excluded Product Ids'),
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
                ...f.checkbox('freeShipping', 'Free Shipping'),
                ...f.number('usageCount', 'Usage Count'),
                ...f.text('applicableProductIds', 'Applicable Product Ids'),
                ...f.text('applicableCategoryIds', 'Applicable Category Ids'),
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
                ...f.number('minQuantity', 'Min Quantity'),
                ...f.number('maxQuantity', 'Max Quantity'),
                ...f.checkbox('applyToAll', 'Apply to All'),
                ...f.text('applicableProductIds', 'Applicable Product Ids'),
                ...f.text('applicableCategoryIds', 'Applicable Category Ids'),
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
                ...f.number('sortOrder', 'Sort Order'),
                ...f.checkbox('trackingAvailable', 'Tracking Available'),
                ...f.text('applicableZones', 'Applicable Zones'),
                ...f.text('excludedZones', 'Excluded Zones'),
                ...f.money('minOrderAmount', 'Min Order Amount'),
                ...f.money('maxOrderAmount', 'Max Order Amount'),
                ...f.number('maxWeight', 'Max Weight'),
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
                ...f.number('sortOrder', 'Sort Order'),
                ...f.text('iconUrl', 'Icon URL'),
                ...f.textarea('instructions', 'Instructions'),
                ...f.checkbox('requiresBillingAddress', 'Requires Billing Address'),
                ...f.checkbox('supportsRefunds', 'Supports Refunds'),
                ...f.checkbox('supportsPartialRefunds', 'Supports Partial Refunds'),
                ...f.text('supportedCurrencies', 'Supported Currencies'),
                ...f.text('supportedCountries', 'Supported Countries'),
                ...f.money('minAmount', 'Min Amount'),
                ...f.money('maxAmount', 'Max Amount'),
                ...f.number('transactionFeePercent', 'Transaction Fee Percent'),
                ...f.money('transactionFeeFixed', 'Transaction Fee Fixed'),
            ])
        ])
    };

})();
