/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Sales Pricing Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.SalesPricing = window.SalesPricing || {};

    const f = window.Layer8FormFactory;
    const enums = SalesPricing.enums;

    SalesPricing.forms = {
        SalesPriceList: f.form('Price List', [
            f.section('Price List Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('currencyId', 'Currency', 'Currency', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expiryDate', 'Expiration Date'),
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

        SalesDiscountRule: f.form('Discount Rule', [
            f.section('Rule Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('discountType', 'Discount Type', enums.DISCOUNT_TYPE, true),
                ...f.number('discountValue', 'Discount Value', true),
                ...f.number('minimumAmount', 'Min Amount'),
                ...f.number('minimumQuantity', 'Min Quantity'),
                ...f.reference('customerId', 'Customer (optional)', 'Customer'),
                ...f.reference('itemId', 'Item (optional)', 'ScmItem'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.checkbox('isActive', 'Active'),
                ...f.text('appliesTo', 'Applies To'),
                ...f.text('customerIds', 'Customer Ids'),
                ...f.text('itemIds', 'Item Ids'),
                ...f.number('priority', 'Priority'),
                ...f.checkbox('isCombinable', 'Combinable'),
            ])
        ]),

        SalesPromotionalPrice: f.form('Promotional Price', [
            f.section('Promotion Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.money('promotionalPrice', 'Promo Price', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.number('maxQuantity', 'Max Quantity'),
                ...f.text('promoCode', 'Promo Code'),
                ...f.money('originalPrice', 'Original Price'),
                ...f.number('quantitySold', 'Quantity Sold'),
                ...f.checkbox('isActive', 'Active'),
            ])
        ])
    };

    SalesPricing.primaryKeys = {
        SalesPriceList: 'priceListId',
        SalesDiscountRule: 'ruleId',
        SalesPromotionalPrice: 'promoId'
    };

})();
