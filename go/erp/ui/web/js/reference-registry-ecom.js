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
 * ERP Reference Registry - E-Commerce Models (Desktop)
 * Extends shared ECOM data with desktop-specific endpoint overrides
 * Desktop ECOM entries need explicit endpoint properties for reference pickers
 */
(function() {
    'use strict';

    Layer8DReferenceRegistry.register({
        ...window.ReferenceDataEcom,

        // Desktop-specific: override entries that need explicit endpoints
        EcomProduct: {
            endpoint: '/100/EcomProd',
            idColumn: 'productId',
            displayColumn: 'name',
            selectColumns: ['productId', 'name', 'sku'],
            displayFormat: function(item) {
                return item.sku + ' - ' + item.name;
            },
            displayLabel: 'Product'
        },
        EcomCategory: {
            endpoint: '/100/EcomCat',
            idColumn: 'categoryId',
            displayColumn: 'name',
            selectColumns: ['categoryId', 'name', 'slug'],
            displayLabel: 'Category'
        },
        EcomCustomer: {
            endpoint: '/100/EcomCust',
            idColumn: 'customerId',
            displayColumn: 'email',
            selectColumns: ['customerId', 'email', 'firstName', 'lastName'],
            displayFormat: function(item) {
                return item.firstName + ' ' + item.lastName + ' (' + item.email + ')';
            },
            displayLabel: 'Customer'
        },
        EcomOrder: {
            endpoint: '/100/EcomOrder',
            idColumn: 'orderId',
            displayColumn: 'orderNumber',
            selectColumns: ['orderId', 'orderNumber', 'customerId'],
            displayFormat: function(item) {
                return 'Order #' + item.orderNumber;
            },
            displayLabel: 'Order'
        },
        EcomReturn: {
            endpoint: '/100/EcomReturn',
            idColumn: 'returnId',
            displayColumn: 'returnNumber',
            selectColumns: ['returnId', 'returnNumber'],
            displayFormat: function(item) {
                return 'Return #' + item.returnNumber;
            },
            displayLabel: 'Return'
        },
        EcomWishlist: {
            endpoint: '/100/EcomWish',
            idColumn: 'wishlistId',
            displayColumn: 'name',
            selectColumns: ['wishlistId', 'name', 'customerId'],
            displayLabel: 'Wishlist'
        },
        EcomPromotion: {
            endpoint: '/100/EcomPromo',
            idColumn: 'promotionId',
            displayColumn: 'name',
            selectColumns: ['promotionId', 'name'],
            displayLabel: 'Promotion'
        },
        EcomCoupon: {
            endpoint: '/100/EcomCoupon',
            idColumn: 'couponId',
            displayColumn: 'code',
            selectColumns: ['couponId', 'code', 'description'],
            displayLabel: 'Coupon'
        },
        EcomShippingMethod: {
            endpoint: '/100/EcomShip',
            idColumn: 'methodId',
            displayColumn: 'name',
            selectColumns: ['methodId', 'name', 'carrier'],
            displayFormat: function(item) {
                return item.carrier + ' - ' + item.name;
            },
            displayLabel: 'Shipping Method'
        },
        EcomPaymentMethod: {
            endpoint: '/100/EcomPay',
            idColumn: 'methodId',
            displayColumn: 'name',
            selectColumns: ['methodId', 'name', 'provider'],
            displayFormat: function(item) {
                return item.provider + ' - ' + item.name;
            },
            displayLabel: 'Payment Method'
        }
    });
})();
