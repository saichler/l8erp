/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// E-Commerce Customers Module - Form Definitions

(function() {
    'use strict';

    window.EcomCustomers = window.EcomCustomers || {};

    const enums = EcomCustomers.enums;

    EcomCustomers.forms = {
        EcomCustomer: {
            title: 'Customer',
            sections: [
                {
                    title: 'Customer Details',
                    fields: [
                        { key: 'email', label: 'Email', type: 'text', required: true },
                        { key: 'firstName', label: 'First Name', type: 'text', required: true },
                        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'customerType', label: 'Customer Type', type: 'select', options: enums.CUSTOMER_TYPE },
                        { key: 'isActive', label: 'Active', type: 'checkbox' },
                        { key: 'emailVerified', label: 'Email Verified', type: 'checkbox' },
                        { key: 'acceptsMarketing', label: 'Accepts Marketing', type: 'checkbox' },
                        { key: 'customerGroup', label: 'Customer Group', type: 'text' },
                        { key: 'locale', label: 'Locale', type: 'text' },
                        { key: 'currencyCode', label: 'Currency Code', type: 'text' },
                        { key: 'salesCustomerId', label: 'Sales Customer', type: 'reference', lookupModel: 'SalesCustomer' },
                        { key: 'defaultBillingAddressId', label: 'Default Billing Address', type: 'reference', lookupModel: 'EcomCustomerAddress' },
                        { key: 'defaultShippingAddressId', label: 'Default Shipping Address', type: 'reference', lookupModel: 'EcomCustomerAddress' }
                    ]
                }
            ]
        },

        EcomCustomerAddress: {
            title: 'Customer Address',
            sections: [
                {
                    title: 'Address Details',
                    fields: [
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'EcomCustomer', required: true },
                        { key: 'label', label: 'Label', type: 'text', required: true },
                        { key: 'firstName', label: 'First Name', type: 'text', required: true },
                        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                        { key: 'company', label: 'Company', type: 'text' },
                        { key: 'addressLine1', label: 'Address Line 1', type: 'text', required: true },
                        { key: 'addressLine2', label: 'Address Line 2', type: 'text' },
                        { key: 'city', label: 'City', type: 'text', required: true },
                        { key: 'state', label: 'State', type: 'text' },
                        { key: 'postalCode', label: 'Postal Code', type: 'text', required: true },
                        { key: 'country', label: 'Country', type: 'text', required: true },
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'isDefaultBilling', label: 'Default Billing', type: 'checkbox' },
                        { key: 'isDefaultShipping', label: 'Default Shipping', type: 'checkbox' }
                    ]
                }
            ]
        },

        EcomWishlist: {
            title: 'Wishlist',
            sections: [
                {
                    title: 'Wishlist Details',
                    fields: [
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'EcomCustomer', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'isPublic', label: 'Public', type: 'checkbox' },
                        { key: 'shareToken', label: 'Share Token', type: 'text' }
                    ]
                }
            ]
        },

        EcomWishlistItem: {
            title: 'Wishlist Item',
            sections: [
                {
                    title: 'Item Details',
                    fields: [
                        { key: 'wishlistId', label: 'Wishlist', type: 'reference', lookupModel: 'EcomWishlist', required: true },
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'EcomProduct', required: true },
                        { key: 'variantId', label: 'Variant', type: 'reference', lookupModel: 'EcomVariant' },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'priority', label: 'Priority', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        EcomCart: {
            title: 'Shopping Cart',
            sections: [
                {
                    title: 'Cart Details',
                    fields: [
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'EcomCustomer' },
                        { key: 'sessionId', label: 'Session ID', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CART_STATUS },
                        { key: 'couponCode', label: 'Coupon Code', type: 'text' },
                        { key: 'currencyCode', label: 'Currency Code', type: 'text' },
                        { key: 'subtotal', label: 'Subtotal', type: 'money' },
                        { key: 'discountAmount', label: 'Discount Amount', type: 'money' },
                        { key: 'taxAmount', label: 'Tax Amount', type: 'money' },
                        { key: 'total', label: 'Total', type: 'money' }
                    ]
                }
            ]
        }
    };

    EcomCustomers.primaryKeys = {
        EcomCustomer: 'customerId',
        EcomCustomerAddress: 'addressId',
        EcomWishlist: 'wishlistId',
        EcomWishlistItem: 'itemId',
        EcomCart: 'cartId'
    };

})();
