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
 * Shared Reference Data - E-Commerce Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataEcom = {
        // ========================================
        // E-Commerce - Product Management
        // ========================================
        EcomProduct: {
            idColumn: 'productId',
            displayColumn: 'name',
            selectColumns: ['productId', 'name', 'sku'],
            displayFormat: function(item) {
                return item.sku + ' - ' + item.name;
            },
            displayLabel: 'Product'
        },
        ...ref.simple('EcomCategory', 'categoryId', 'name'),

        // ========================================
        // E-Commerce - Order Management
        // ========================================
        ...ref.simple('EcomOrder', 'orderId', 'orderNumber', 'Order'),
        ...ref.simple('EcomReturn', 'returnId', 'returnNumber', 'Return'),

        // ========================================
        // E-Commerce - Customer Management
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
        ...ref.simple('EcomWishlist', 'wishlistId', 'name'),

        // ========================================
        // E-Commerce - Promotions & Coupons
        // ========================================
        ...ref.simple('EcomPromotion', 'promotionId', 'name', 'Promotion'),
        EcomCoupon: {
            idColumn: 'couponId',
            displayColumn: 'code',
            selectColumns: ['couponId', 'code', 'description'],
            displayFormat: function(item) {
                return item.code + (item.description ? ' - ' + item.description : '');
            },
            displayLabel: 'Coupon'
        },

        // ========================================
        // E-Commerce - Shipping & Payment
        // ========================================
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
