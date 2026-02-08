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

    const render = MobileEcomPromotions.render;

    MobileEcomPromotions.columns = {
        EcomPromotion: [
            { key: 'promotionId', label: 'ID', sortKey: 'promotionId', filterKey: 'promotionId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'promotionType', label: 'Type', sortKey: 'promotionType', render: (item) => render.promotionType(item.promotionType) },
            { key: 'discountValue', label: 'Discount Value', sortKey: 'discountValue' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' },
            { key: 'usageCount', label: 'Usage Count', sortKey: 'usageCount' },
            { key: 'usageLimit', label: 'Usage Limit', sortKey: 'usageLimit' }
        ],

        EcomCoupon: [
            { key: 'couponId', label: 'ID', sortKey: 'couponId', filterKey: 'couponId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'discountType', label: 'Discount Type', sortKey: 'discountType', render: (item) => render.discountType(item.discountType) },
            { key: 'discountValue', label: 'Discount Value', sortKey: 'discountValue' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' },
            { key: 'usageCount', label: 'Usage Count', sortKey: 'usageCount' },
            { key: 'usageLimit', label: 'Usage Limit', sortKey: 'usageLimit' }
        ],

        EcomPriceRule: [
            { key: 'ruleId', label: 'ID', sortKey: 'ruleId', filterKey: 'ruleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'discountType', label: 'Discount Type', sortKey: 'discountType', render: (item) => render.discountType(item.discountType) },
            { key: 'discountValue', label: 'Discount Value', sortKey: 'discountValue' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' },
            { key: 'priority', label: 'Priority', sortKey: 'priority' }
        ],

        EcomShippingMethod: [
            { key: 'methodId', label: 'ID', sortKey: 'methodId', filterKey: 'methodId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'carrier', label: 'Carrier', sortKey: 'carrier', filterKey: 'carrier' },
            { key: 'baseRate', label: 'Base Rate', sortKey: 'baseRate', render: (item) => Layer8MRenderers.renderMoney(item.baseRate) },
            { key: 'minDeliveryDays', label: 'Min Days', sortKey: 'minDeliveryDays' },
            { key: 'maxDeliveryDays', label: 'Max Days', sortKey: 'maxDeliveryDays' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' },
            { key: 'trackingAvailable', label: 'Tracking', sortKey: 'trackingAvailable', render: (item) => item.trackingAvailable ? 'Yes' : 'No' }
        ],

        EcomPaymentMethod: [
            { key: 'methodId', label: 'ID', sortKey: 'methodId', filterKey: 'methodId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'provider', label: 'Provider', sortKey: 'provider', filterKey: 'provider' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' },
            { key: 'isTestMode', label: 'Test Mode', sortKey: 'isTestMode', render: (item) => item.isTestMode ? 'Yes' : 'No' },
            { key: 'sortOrder', label: 'Sort Order', sortKey: 'sortOrder' }
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
