/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// E-Commerce Customers Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.EcomCustomers = window.EcomCustomers || {};

    const f = window.Layer8FormFactory;
    const enums = EcomCustomers.enums;

    EcomCustomers.forms = {
        EcomCustomer: f.form('Customer', [
            f.section('Customer Details', [
                ...f.text('email', 'Email', true),
                ...f.text('firstName', 'First Name', true),
                ...f.text('lastName', 'Last Name', true),
                ...f.text('phone', 'Phone'),
                ...f.select('customerType', 'Customer Type', enums.CUSTOMER_TYPE),
                ...f.checkbox('isActive', 'Active'),
                ...f.checkbox('emailVerified', 'Email Verified'),
                ...f.checkbox('acceptsMarketing', 'Accepts Marketing'),
                ...f.text('customerGroup', 'Customer Group'),
                ...f.text('locale', 'Locale'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.reference('salesCustomerId', 'Sales Customer', 'SalesCustomer')
            ]),
            f.section('Addresses', [
                ...f.inlineTable('addresses', 'Customer Addresses', [
                    { key: 'addressId', label: 'ID', hidden: true },
                    { key: 'label', label: 'Label', type: 'text' },
                    { key: 'firstName', label: 'First Name', type: 'text' },
                    { key: 'lastName', label: 'Last Name', type: 'text' },
                    { key: 'addressLine1', label: 'Address', type: 'text' },
                    { key: 'city', label: 'City', type: 'text' },
                    { key: 'state', label: 'State', type: 'text' },
                    { key: 'postalCode', label: 'Postal Code', type: 'text' },
                    { key: 'country', label: 'Country', type: 'text' },
                    { key: 'isDefaultBilling', label: 'Billing', type: 'checkbox' },
                    { key: 'isDefaultShipping', label: 'Shipping', type: 'checkbox' }
                ])
            ])
        ]),

        EcomWishlist: f.form('Wishlist', [
            f.section('Wishlist Details', [
                ...f.reference('customerId', 'Customer', 'EcomCustomer', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.checkbox('isPublic', 'Public'),
                ...f.text('shareToken', 'Share Token')
            ]),
            f.section('Wishlist Items', [
                ...f.inlineTable('items', 'Wishlist Items', [
                    { key: 'itemId', label: 'ID', hidden: true },
                    { key: 'productId', label: 'Product', type: 'text' },
                    { key: 'quantity', label: 'Qty', type: 'number' },
                    { key: 'priority', label: 'Priority', type: 'number' },
                    { key: 'notes', label: 'Notes', type: 'text' }
                ])
            ])
        ]),

        EcomCart: f.form('Shopping Cart', [
            f.section('Cart Details', [
                ...f.reference('customerId', 'Customer', 'EcomCustomer'),
                ...f.text('sessionId', 'Session ID'),
                ...f.select('status', 'Status', enums.CART_STATUS),
                ...f.text('couponCode', 'Coupon Code'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.money('subtotal', 'Subtotal'),
                ...f.money('discountAmount', 'Discount Amount'),
                ...f.money('taxAmount', 'Tax Amount'),
                ...f.money('total', 'Total')
            ])
        ])
    };

    EcomCustomers.primaryKeys = {
        EcomCustomer: 'customerId',
        EcomWishlist: 'wishlistId',
        EcomCart: 'cartId'
    };

})();
