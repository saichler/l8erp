/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Sales Pricing Module - Form Configurations
 * Desktop Equivalent: sales/pricing/pricing-forms.js
 */
window.MobileSalesPricing = window.MobileSalesPricing || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileSalesPricing.enums;

    MobileSalesPricing.forms = {
        PriceList: f.form('Price List', [
            f.section('Price List Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('currencyId', 'Currency', 'Currency', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.select('status', 'Status', enums.PRICE_LIST_STATUS),
                ...f.checkbox('isDefault', 'Default'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Price Entries', [
                ...f.inlineTable('entries', 'Price List Entries', [
                    { key: 'entryId', label: 'Entry ID', hidden: true },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                    { key: 'unitPrice', label: 'Unit Price', type: 'money', required: true },
                    { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                    { key: 'minimumQuantity', label: 'Min Qty', type: 'number' }
                ])
            ]),
            f.section('Quantity Breaks', [
                ...f.inlineTable('quantityBreaks', 'Quantity Breaks', [
                    { key: 'breakId', label: 'Break ID', hidden: true },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                    { key: 'fromQuantity', label: 'From Qty', type: 'number', required: true },
                    { key: 'toQuantity', label: 'To Qty', type: 'number' },
                    { key: 'unitPrice', label: 'Price', type: 'money' },
                    { key: 'discountPercent', label: 'Discount %', type: 'number' }
                ])
            ])
        ]),

        DiscountRule: f.form('Discount Rule', [
            f.section('Rule Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('discountType', 'Discount Type', enums.DISCOUNT_TYPE, true),
                ...f.number('discountValue', 'Discount Value', true),
                ...f.money('minimumAmount', 'Min Order Amount'),
                ...f.number('minimumQuantity', 'Min Quantity'),
                ...f.reference('customerId', 'Customer (optional)', 'Customer'),
                ...f.reference('itemId', 'Item (optional)', 'ScmItem'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        PromotionalPrice: f.form('Promotional Price', [
            f.section('Promotion Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.money('promotionalPrice', 'Promo Price', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.number('maxQuantity', 'Max Quantity'),
                ...f.text('promoCode', 'Promo Code')
            ])
        ])
    };

})();
