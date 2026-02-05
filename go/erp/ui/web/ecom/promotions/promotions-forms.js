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
// E-Commerce Promotions Module - Form Definitions

(function() {
    'use strict';

    window.EcomPromotions = window.EcomPromotions || {};

    const enums = EcomPromotions.enums;

    EcomPromotions.forms = {
        EcomPromotion: {
            title: 'Promotion',
            sections: [
                {
                    title: 'Promotion Details',
                    fields: [
                        { key: 'name', label: 'Promotion Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'promotionType', label: 'Promotion Type', type: 'select', options: enums.PROMOTION_TYPE, required: true },
                        { key: 'discountValue', label: 'Discount Value', type: 'number', required: true },
                        { key: 'maxDiscount', label: 'Max Discount', type: 'money' },
                        { key: 'minPurchase', label: 'Min Purchase', type: 'money' },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'isActive', label: 'Is Active', type: 'checkbox' },
                        { key: 'usageLimit', label: 'Usage Limit', type: 'number' },
                        { key: 'perCustomerLimit', label: 'Per Customer Limit', type: 'number' },
                        { key: 'customerGroup', label: 'Customer Group', type: 'text' },
                        { key: 'stackable', label: 'Stackable', type: 'checkbox' },
                        { key: 'priority', label: 'Priority', type: 'number' }
                    ]
                }
            ]
        },

        EcomCoupon: {
            title: 'Coupon',
            sections: [
                {
                    title: 'Coupon Details',
                    fields: [
                        { key: 'code', label: 'Coupon Code', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'discountType', label: 'Discount Type', type: 'select', options: enums.DISCOUNT_TYPE, required: true },
                        { key: 'discountValue', label: 'Discount Value', type: 'number', required: true },
                        { key: 'maxDiscount', label: 'Max Discount', type: 'money' },
                        { key: 'minPurchase', label: 'Min Purchase', type: 'money' },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'isActive', label: 'Is Active', type: 'checkbox' },
                        { key: 'usageLimit', label: 'Usage Limit', type: 'number' },
                        { key: 'perCustomerLimit', label: 'Per Customer Limit', type: 'number' },
                        { key: 'firstOrderOnly', label: 'First Order Only', type: 'checkbox' },
                        { key: 'customerGroup', label: 'Customer Group', type: 'text' },
                        { key: 'freeShipping', label: 'Free Shipping', type: 'checkbox' }
                    ]
                }
            ]
        },

        EcomPriceRule: {
            title: 'Price Rule',
            sections: [
                {
                    title: 'Price Rule Details',
                    fields: [
                        { key: 'name', label: 'Rule Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'discountType', label: 'Discount Type', type: 'select', options: enums.DISCOUNT_TYPE, required: true },
                        { key: 'discountValue', label: 'Discount Value', type: 'number', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'isActive', label: 'Is Active', type: 'checkbox' },
                        { key: 'priority', label: 'Priority', type: 'number' },
                        { key: 'customerGroup', label: 'Customer Group', type: 'text' },
                        { key: 'minQuantity', label: 'Min Quantity', type: 'money' },
                        { key: 'maxQuantity', label: 'Max Quantity', type: 'money' },
                        { key: 'applyToAll', label: 'Apply to All', type: 'checkbox' }
                    ]
                }
            ]
        },

        EcomShippingMethod: {
            title: 'Shipping Method',
            sections: [
                {
                    title: 'Shipping Method Details',
                    fields: [
                        { key: 'name', label: 'Method Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'carrier', label: 'Carrier', type: 'text', required: true },
                        { key: 'carrierService', label: 'Carrier Service', type: 'text' },
                        { key: 'baseRate', label: 'Base Rate', type: 'money', required: true },
                        { key: 'perItemRate', label: 'Per Item Rate', type: 'money' },
                        { key: 'perWeightRate', label: 'Per Weight Rate', type: 'money' },
                        { key: 'freeShippingThreshold', label: 'Free Shipping Threshold', type: 'money' },
                        { key: 'minDeliveryDays', label: 'Min Delivery Days', type: 'number' },
                        { key: 'maxDeliveryDays', label: 'Max Delivery Days', type: 'number' },
                        { key: 'isActive', label: 'Is Active', type: 'checkbox' },
                        { key: 'minOrderAmount', label: 'Min Order Amount', type: 'money' },
                        { key: 'maxOrderAmount', label: 'Max Order Amount', type: 'money' },
                        { key: 'maxWeight', label: 'Max Weight', type: 'number' },
                        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
                        { key: 'trackingAvailable', label: 'Tracking Available', type: 'checkbox' }
                    ]
                }
            ]
        },

        EcomPaymentMethod: {
            title: 'Payment Method',
            sections: [
                {
                    title: 'Payment Method Details',
                    fields: [
                        { key: 'name', label: 'Method Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'provider', label: 'Provider', type: 'text', required: true },
                        { key: 'providerConfig', label: 'Provider Config', type: 'textarea' },
                        { key: 'isActive', label: 'Is Active', type: 'checkbox' },
                        { key: 'isTestMode', label: 'Is Test Mode', type: 'checkbox' },
                        { key: 'minAmount', label: 'Min Amount', type: 'money' },
                        { key: 'maxAmount', label: 'Max Amount', type: 'money' },
                        { key: 'transactionFeePercent', label: 'Transaction Fee %', type: 'number' },
                        { key: 'transactionFeeFixed', label: 'Transaction Fee Fixed', type: 'money' },
                        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
                        { key: 'iconUrl', label: 'Icon URL', type: 'text' },
                        { key: 'instructions', label: 'Instructions', type: 'textarea' },
                        { key: 'requiresBillingAddress', label: 'Requires Billing Address', type: 'checkbox' },
                        { key: 'supportsRefunds', label: 'Supports Refunds', type: 'checkbox' },
                        { key: 'supportsPartialRefunds', label: 'Supports Partial Refunds', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

})();
