/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile ECOM Customers Module - Form Configurations
 * Desktop Equivalent: ecom/customers/customers-forms.js
 */
(function() {
    'use strict';

    window.MobileEcomCustomers = window.MobileEcomCustomers || {};
    const f = window.Layer8FormFactory;
    const enums = MobileEcomCustomers.enums;

    MobileEcomCustomers.forms = {
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
                ...f.reference('salesCustomerId', 'Sales Customer', 'SalesCustomer'),
                ...f.text('passwordHash', 'Password Hash'),
                ...f.date('createdDate', 'Created Date'),
                ...f.date('lastLoginDate', 'Last Login Date'),
                ...f.number('totalOrders', 'Total Orders'),
                ...f.money('totalSpent', 'Total Spent'),
                ...f.text('defaultBillingAddressId', 'Default Billing Address'),
                ...f.text('defaultShippingAddressId', 'Default Shipping Address'),
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
                ...f.text('shareToken', 'Share Token'),
                ...f.date('createdDate', 'Created Date'),
                ...f.date('updatedDate', 'Updated Date'),
                ...f.number('itemCount', 'Item Count'),
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
                ...f.money('total', 'Total'),
                ...f.date('createdDate', 'Created Date'),
                ...f.date('updatedDate', 'Updated Date'),
                ...f.date('expiresAt', 'Expires At'),
                ...f.number('itemCount', 'Item Count'),
                ...f.text('ipAddress', 'Ip Address'),
                ...f.text('userAgent', 'User Agent'),
            ])
        ])
    };

})();
