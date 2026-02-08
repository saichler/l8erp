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
                ...f.reference('defaultBillingAddressId', 'Default Billing Address', 'EcomCustomerAddress'),
                ...f.reference('defaultShippingAddressId', 'Default Shipping Address', 'EcomCustomerAddress')
            ])
        ]),

        EcomCustomerAddress: f.form('Customer Address', [
            f.section('Address Details', [
                ...f.reference('customerId', 'Customer', 'EcomCustomer', true),
                ...f.text('label', 'Label', true),
                ...f.text('firstName', 'First Name', true),
                ...f.text('lastName', 'Last Name', true),
                ...f.text('company', 'Company'),
                ...f.text('addressLine1', 'Address Line 1', true),
                ...f.text('addressLine2', 'Address Line 2'),
                ...f.text('city', 'City', true),
                ...f.text('state', 'State'),
                ...f.text('postalCode', 'Postal Code', true),
                ...f.text('country', 'Country', true),
                ...f.text('phone', 'Phone'),
                ...f.checkbox('isDefaultBilling', 'Default Billing'),
                ...f.checkbox('isDefaultShipping', 'Default Shipping')
            ])
        ]),

        EcomWishlist: f.form('Wishlist', [
            f.section('Wishlist Details', [
                ...f.reference('customerId', 'Customer', 'EcomCustomer', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.checkbox('isPublic', 'Public'),
                ...f.text('shareToken', 'Share Token')
            ])
        ]),

        EcomWishlistItem: f.form('Wishlist Item', [
            f.section('Item Details', [
                ...f.reference('wishlistId', 'Wishlist', 'EcomWishlist', true),
                ...f.reference('productId', 'Product', 'EcomProduct', true),
                ...f.reference('variantId', 'Variant', 'EcomVariant'),
                ...f.number('quantity', 'Quantity', true),
                ...f.number('priority', 'Priority'),
                ...f.textarea('notes', 'Notes')
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

})();
