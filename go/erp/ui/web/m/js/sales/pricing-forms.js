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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Sales Pricing Module - Form Configurations
 * Desktop Equivalent: sales/pricing/pricing-forms.js
 */
window.MobileSalesPricing = window.MobileSalesPricing || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileSalesPricing.enums;

    MobileSalesPricing.forms = {
        PriceList: f.form('Price List', [
            f.section('Price List Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('currencyCode', 'Currency', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.select('status', 'Status', enums.PRICE_LIST_STATUS),
                ...f.checkbox('isDefault', 'Default'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        PriceListEntry: f.form('Price List Entry', [
            f.section('Entry Details', [
                ...f.reference('priceListId', 'Price List', 'PriceList', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.money('unitPrice', 'Unit Price', true),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.number('minQuantity', 'Min Quantity'),
                ...f.select('pricingMethod', 'Pricing Method', enums.PRICING_METHOD)
            ])
        ]),

        CustomerPrice: f.form('Customer Price', [
            f.section('Price Details', [
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.money('specialPrice', 'Special Price', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.reference('contractId', 'Contract', 'CustomerContract'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        DiscountRule: f.form('Discount Rule', [
            f.section('Rule Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('discountType', 'Discount Type', enums.DISCOUNT_TYPE, true),
                ...f.number('discountValue', 'Discount Value', true),
                ...f.money('minOrderAmount', 'Min Order Amount'),
                ...f.number('minQuantity', 'Min Quantity'),
                ...f.reference('customerId', 'Customer (optional)', 'Customer'),
                ...f.reference('itemId', 'Item (optional)', 'ScmItem'),
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        PromotionalPrice: f.form('Promotional Price', [
            f.section('Promotion Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.money('promoPrice', 'Promo Price', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.number('maxQuantity', 'Max Quantity'),
                ...f.text('promoCode', 'Promo Code')
            ])
        ]),

        QuantityBreak: f.form('Quantity Break', [
            f.section('Break Details', [
                ...f.reference('priceListId', 'Price List', 'PriceList', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.number('minQuantity', 'Min Quantity', true),
                ...f.number('maxQuantity', 'Max Quantity'),
                ...f.money('breakPrice', 'Break Price', true),
                ...f.number('discountPercent', 'Discount %')
            ])
        ])
    };

})();
