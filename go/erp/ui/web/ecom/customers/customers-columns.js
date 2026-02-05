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
// E-Commerce Customers Module - Column Configurations

(function() {
    'use strict';

    window.EcomCustomers = window.EcomCustomers || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = EcomCustomers.render;

    EcomCustomers.columns = {
        EcomCustomer: [
            { key: 'customerId', label: 'ID', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'email', label: 'Email', sortKey: 'email', filterKey: 'email' },
            { key: 'firstName', label: 'First Name', sortKey: 'firstName', filterKey: 'firstName' },
            { key: 'lastName', label: 'Last Name', sortKey: 'lastName', filterKey: 'lastName' },
            { key: 'phone', label: 'Phone', sortKey: 'phone' },
            {
                key: 'customerType',
                label: 'Type',
                sortKey: 'customerType',
                render: (item) => render.customerType(item.customerType)
            },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' },
            { key: 'totalOrders', label: 'Total Orders', sortKey: 'totalOrders' },
            {
                key: 'totalSpent',
                label: 'Total Spent',
                sortKey: 'totalSpent',
                render: (item) => renderMoney(item.totalSpent)
            }
        ],

        EcomCustomerAddress: [
            { key: 'addressId', label: 'ID', sortKey: 'addressId', filterKey: 'addressId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'label', label: 'Label', sortKey: 'label', filterKey: 'label' },
            { key: 'firstName', label: 'First Name', sortKey: 'firstName' },
            { key: 'lastName', label: 'Last Name', sortKey: 'lastName' },
            { key: 'city', label: 'City', sortKey: 'city', filterKey: 'city' },
            { key: 'country', label: 'Country', sortKey: 'country', filterKey: 'country' },
            { key: 'isDefaultBilling', label: 'Default Billing', sortKey: 'isDefaultBilling' },
            { key: 'isDefaultShipping', label: 'Default Shipping', sortKey: 'isDefaultShipping' }
        ],

        EcomWishlist: [
            { key: 'wishlistId', label: 'ID', sortKey: 'wishlistId', filterKey: 'wishlistId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'isPublic', label: 'Public', sortKey: 'isPublic' },
            { key: 'itemCount', label: 'Items', sortKey: 'itemCount' },
            {
                key: 'createdDate',
                label: 'Created',
                sortKey: 'createdDate',
                render: (item) => renderDate(item.createdDate)
            }
        ],

        EcomWishlistItem: [
            { key: 'itemId', label: 'ID', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'wishlistId', label: 'Wishlist', sortKey: 'wishlistId', filterKey: 'wishlistId' },
            { key: 'productId', label: 'Product', sortKey: 'productId', filterKey: 'productId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'addedDate',
                label: 'Added',
                sortKey: 'addedDate',
                render: (item) => renderDate(item.addedDate)
            },
            { key: 'priority', label: 'Priority', sortKey: 'priority' }
        ],

        EcomCart: [
            { key: 'cartId', label: 'ID', sortKey: 'cartId', filterKey: 'cartId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.cartStatus(item.status)
            },
            { key: 'itemCount', label: 'Items', sortKey: 'itemCount' },
            {
                key: 'subtotal',
                label: 'Subtotal',
                sortKey: 'subtotal',
                render: (item) => renderMoney(item.subtotal)
            },
            {
                key: 'total',
                label: 'Total',
                sortKey: 'total',
                render: (item) => renderMoney(item.total)
            },
            {
                key: 'createdDate',
                label: 'Created',
                sortKey: 'createdDate',
                render: (item) => renderDate(item.createdDate)
            }
        ]
    };

})();
