/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - E-Commerce Module
 * Reference configurations for E-Commerce models
 */
(function() {
    'use strict';

    window.Layer8MReferenceRegistryECOM = {
        // ========================================
        // E-Commerce - Catalog
        // ========================================
        EcomProduct: {
            idColumn: 'productId',
            displayColumn: 'name',
            selectColumns: ['productId', 'sku', 'name'],
            displayFormat: function(item) {
                return item.sku + ' - ' + item.name;
            },
            displayLabel: 'Product'
        },
        EcomCategory: {
            idColumn: 'categoryId',
            displayColumn: 'name'
        },
        EcomAttribute: {
            idColumn: 'attributeId',
            displayColumn: 'name'
        },
        EcomImage: {
            idColumn: 'imageId',
            displayColumn: 'fileName'
        },
        EcomVariant: {
            idColumn: 'variantId',
            displayColumn: 'name',
            selectColumns: ['variantId', 'sku', 'name'],
            displayFormat: function(item) {
                return item.sku + ' - ' + item.name;
            },
            displayLabel: 'Variant'
        },

        // ========================================
        // E-Commerce - Orders
        // ========================================
        EcomOrder: {
            idColumn: 'orderId',
            displayColumn: 'orderNumber',
            selectColumns: ['orderId', 'orderNumber'],
            displayLabel: 'Order'
        },
        EcomOrderLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        EcomOrderStatusHistory: {
            idColumn: 'statusId',
            displayColumn: 'statusId'
        },
        EcomReturn: {
            idColumn: 'returnId',
            displayColumn: 'returnNumber',
            selectColumns: ['returnId', 'returnNumber'],
            displayLabel: 'Return'
        },
        EcomReturnLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },

        // ========================================
        // E-Commerce - Customers
        // ========================================
        EcomCustomer: {
            idColumn: 'customerId',
            displayColumn: 'lastName',
            selectColumns: ['customerId', 'firstName', 'lastName', 'email'],
            displayFormat: function(item) {
                return item.firstName + ' ' + item.lastName + (item.email ? ' (' + item.email + ')' : '');
            },
            displayLabel: 'Customer'
        },
        EcomCustomerAddress: {
            idColumn: 'addressId',
            displayColumn: 'label'
        },
        EcomWishlist: {
            idColumn: 'wishlistId',
            displayColumn: 'name'
        },
        EcomWishlistItem: {
            idColumn: 'itemId',
            displayColumn: 'itemId'
        },
        EcomCart: {
            idColumn: 'cartId',
            displayColumn: 'cartId'
        },

        // ========================================
        // E-Commerce - Promotions
        // ========================================
        EcomPromotion: {
            idColumn: 'promotionId',
            displayColumn: 'name',
            selectColumns: ['promotionId', 'name'],
            displayLabel: 'Promotion'
        },
        EcomCoupon: {
            idColumn: 'couponId',
            displayColumn: 'code',
            selectColumns: ['couponId', 'code', 'description'],
            displayFormat: function(item) {
                return item.code + (item.description ? ' - ' + item.description : '');
            },
            displayLabel: 'Coupon'
        },
        EcomPriceRule: {
            idColumn: 'ruleId',
            displayColumn: 'name'
        },
        EcomShippingMethod: {
            idColumn: 'methodId',
            displayColumn: 'name',
            selectColumns: ['methodId', 'name', 'carrier'],
            displayFormat: function(item) {
                return item.name + (item.carrier ? ' (' + item.carrier + ')' : '');
            },
            displayLabel: 'Shipping'
        },
        EcomPaymentMethod: {
            idColumn: 'methodId',
            displayColumn: 'name',
            selectColumns: ['methodId', 'name', 'provider'],
            displayFormat: function(item) {
                return item.name + (item.provider ? ' (' + item.provider + ')' : '');
            },
            displayLabel: 'Payment'
        }
    };
})();
