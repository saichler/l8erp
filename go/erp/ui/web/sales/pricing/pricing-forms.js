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
            ])
        ]),

        SalesPriceListEntry: f.form('Price List Entry', [
            f.section('Entry Details', [
                ...f.reference('priceListId', 'Price List', 'SalesPriceList', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.money('unitPrice', 'Unit Price', true),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.number('minimumQuantity', 'Min Quantity')
            ])
        ]),

        SalesCustomerPrice: f.form('Customer Price', [
            f.section('Price Details', [
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.money('unitPrice', 'Special Price', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expiryDate', 'Expiration Date'),
                ...f.reference('contractId', 'Contract', 'SalesCustomerContract'),
                ...f.textarea('notes', 'Notes')
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
                ...f.checkbox('isActive', 'Active')
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
                ...f.text('promoCode', 'Promo Code')
            ])
        ]),

        SalesQuantityBreak: f.form('Quantity Break', [
            f.section('Break Details', [
                ...f.reference('priceListId', 'Price List', 'SalesPriceList', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.number('fromQuantity', 'From Quantity', true),
                ...f.number('toQuantity', 'To Quantity'),
                ...f.money('unitPrice', 'Unit Price', true),
                ...f.number('discountPercent', 'Discount %')
            ])
        ])
    };

    SalesPricing.primaryKeys = {
        SalesPriceList: 'priceListId',
        SalesPriceListEntry: 'entryId',
        SalesCustomerPrice: 'customerPriceId',
        SalesDiscountRule: 'ruleId',
        SalesPromotionalPrice: 'promoId',
        SalesQuantityBreak: 'breakId'
    };

})();
