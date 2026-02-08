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
/**
 * Mobile ECOM Customers Module - Column Configurations
 * Desktop Equivalent: ecom/customers/customers-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const render = MobileEcomCustomers.render;

    MobileEcomCustomers.columns = {
        EcomCustomer: [
            ...col.id('customerId'),
            ...col.col('email', 'Email'),
            ...col.col('firstName', 'First Name'),
            ...col.col('lastName', 'Last Name'),
            ...col.col('phone', 'Phone'),
            ...col.enum('customerType', 'Type', null, render.customerType),
            ...col.boolean('isActive', 'Active'),
            ...col.col('totalOrders', 'Total Orders'),
            ...col.money('totalSpent', 'Total Spent')
        ],

        EcomCustomerAddress: [
            ...col.id('addressId'),
            ...col.col('customerId', 'Customer'),
            ...col.col('label', 'Label'),
            ...col.col('firstName', 'First Name'),
            ...col.col('lastName', 'Last Name'),
            ...col.col('city', 'City'),
            ...col.col('country', 'Country'),
            ...col.boolean('isDefaultBilling', 'Default Billing'),
            ...col.boolean('isDefaultShipping', 'Default Shipping')
        ],

        EcomWishlist: [
            ...col.id('wishlistId'),
            ...col.col('customerId', 'Customer'),
            ...col.col('name', 'Name'),
            ...col.boolean('isPublic', 'Public'),
            ...col.col('itemCount', 'Items'),
            ...col.date('createdDate', 'Created')
        ],

        EcomWishlistItem: [
            ...col.id('itemId'),
            ...col.col('wishlistId', 'Wishlist'),
            ...col.col('productId', 'Product'),
            ...col.col('quantity', 'Quantity'),
            ...col.date('addedDate', 'Added'),
            ...col.col('priority', 'Priority')
        ],

        EcomCart: [
            ...col.id('cartId'),
            ...col.col('customerId', 'Customer'),
            ...col.enum('status', 'Status', null, render.cartStatus),
            ...col.col('itemCount', 'Items'),
            ...col.money('subtotal', 'Subtotal'),
            ...col.money('total', 'Total'),
            ...col.date('createdDate', 'Created')
        ]
    };

    MobileEcomCustomers.primaryKeys = {
        EcomCustomer: 'customerId',
        EcomCustomerAddress: 'addressId',
        EcomWishlist: 'wishlistId',
        EcomWishlistItem: 'itemId',
        EcomCart: 'cartId'
    };

})();
