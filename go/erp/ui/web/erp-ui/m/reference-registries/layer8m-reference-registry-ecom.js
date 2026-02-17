/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - E-Commerce Module
 * Reference configurations for E-Commerce models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refEcomM = window.Layer8RefFactory;

window.Layer8MReferenceRegistryECOM = {
    // ========================================
    // E-Commerce - Catalog
    // ========================================
    ...refEcomM.coded('EcomProduct', 'productId', 'sku', 'name'),
    ...refEcomM.simple('EcomCategory', 'categoryId', 'name'),
    ...refEcomM.simple('EcomAttribute', 'attributeId', 'name'),
    // EcomImage, EcomVariant - now embedded children in EcomProduct

    // ========================================
    // E-Commerce - Orders
    // ========================================
    ...refEcomM.simple('EcomOrder', 'orderId', 'orderNumber', 'Order'),
    // EcomOrderLine, EcomOrderStatusHistory, EcomReturnLine - now embedded children
    ...refEcomM.simple('EcomReturn', 'returnId', 'returnNumber', 'Return'),

    // ========================================
    // E-Commerce - Customers
    // ========================================
    // Custom displayFormat for customer (firstName lastName (email))
    EcomCustomer: {
        idColumn: 'customerId',
        displayColumn: 'lastName',
        selectColumns: ['customerId', 'firstName', 'lastName', 'email'],
        displayFormat: function(item) {
            return item.firstName + ' ' + item.lastName + (item.email ? ' (' + item.email + ')' : '');
        },
        displayLabel: 'Customer'
    },
    // EcomCustomerAddress, EcomWishlistItem - now embedded children
    ...refEcomM.simple('EcomWishlist', 'wishlistId', 'name'),
    ...refEcomM.idOnly('EcomCart', 'cartId'),

    // ========================================
    // E-Commerce - Promotions
    // ========================================
    ...refEcomM.simple('EcomPromotion', 'promotionId', 'name', 'Promotion'),
    // Custom displayFormat for coupon (code - description)
    EcomCoupon: {
        idColumn: 'couponId',
        displayColumn: 'code',
        selectColumns: ['couponId', 'code', 'description'],
        displayFormat: function(item) {
            return item.code + (item.description ? ' - ' + item.description : '');
        },
        displayLabel: 'Coupon'
    },
    ...refEcomM.simple('EcomPriceRule', 'ruleId', 'name'),
    // Custom displayFormat for shipping (name (carrier))
    EcomShippingMethod: {
        idColumn: 'methodId',
        displayColumn: 'name',
        selectColumns: ['methodId', 'name', 'carrier'],
        displayFormat: function(item) {
            return item.name + (item.carrier ? ' (' + item.carrier + ')' : '');
        },
        displayLabel: 'Shipping'
    },
    // Custom displayFormat for payment (name (provider))
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

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryECOM);
