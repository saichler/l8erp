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
 * Mobile ECOM Promotions Module - Column Configurations
 * Desktop Equivalent: ecom/promotions/promotions-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const render = MobileEcomPromotions.render;

    MobileEcomPromotions.columns = {
        EcomPromotion: [
            ...col.id('promotionId'),
            ...col.col('name', 'Name'),
            ...col.enum('promotionType', 'Type', null, render.promotionType),
            ...col.col('discountValue', 'Discount Value'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.boolean('isActive', 'Active'),
            ...col.col('usageCount', 'Usage Count'),
            ...col.col('usageLimit', 'Usage Limit')
        ],

        EcomCoupon: [
            ...col.id('couponId'),
            ...col.col('code', 'Code'),
            ...col.enum('discountType', 'Discount Type', null, render.discountType),
            ...col.col('discountValue', 'Discount Value'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.boolean('isActive', 'Active'),
            ...col.col('usageCount', 'Usage Count'),
            ...col.col('usageLimit', 'Usage Limit')
        ],

        EcomPriceRule: [
            ...col.id('ruleId'),
            ...col.col('name', 'Name'),
            ...col.enum('discountType', 'Discount Type', null, render.discountType),
            ...col.col('discountValue', 'Discount Value'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.boolean('isActive', 'Active'),
            ...col.col('priority', 'Priority')
        ],

        EcomShippingMethod: [
            ...col.id('methodId'),
            ...col.col('name', 'Name'),
            ...col.col('carrier', 'Carrier'),
            ...col.money('baseRate', 'Base Rate'),
            ...col.col('minDeliveryDays', 'Min Days'),
            ...col.col('maxDeliveryDays', 'Max Days'),
            ...col.boolean('isActive', 'Active'),
            ...col.boolean('trackingAvailable', 'Tracking')
        ],

        EcomPaymentMethod: [
            ...col.id('methodId'),
            ...col.col('name', 'Name'),
            ...col.col('provider', 'Provider'),
            ...col.boolean('isActive', 'Active'),
            ...col.boolean('isTestMode', 'Test Mode'),
            ...col.col('sortOrder', 'Sort Order')
        ]
    };

    MobileEcomPromotions.primaryKeys = {
        EcomPromotion: 'promotionId',
        EcomCoupon: 'couponId',
        EcomPriceRule: 'ruleId',
        EcomShippingMethod: 'methodId',
        EcomPaymentMethod: 'methodId'
    };

})();
