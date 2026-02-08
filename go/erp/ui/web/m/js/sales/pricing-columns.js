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
 * Mobile Sales Pricing Module - Column Configurations
 * Desktop Equivalent: sales/pricing/pricing-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileSalesPricing.enums;
    const render = MobileSalesPricing.render;

    MobileSalesPricing.columns = {
        PriceList: [
            ...col.id('priceListId'),
            ...col.col('name', 'Name'),
            ...col.col('currencyId', 'Currency'),
            ...col.date('effectiveDate', 'Effective'),
            ...col.date('expiryDate', 'Expires'),
            ...col.status('status', 'Status', enums.PRICE_LIST_STATUS_VALUES, render.priceListStatus)
        ],

        PriceListEntry: [
            ...col.id('entryId'),
            ...col.col('priceListId', 'Price List'),
            ...col.col('itemId', 'Item'),
            ...col.money('unitPrice', 'Unit Price'),
            ...col.col('unitOfMeasure', 'UOM'),
            ...col.col('minimumQuantity', 'Min Qty')
        ],

        CustomerPrice: [
            ...col.id('customerPriceId'),
            ...col.col('customerId', 'Customer'),
            ...col.col('itemId', 'Item'),
            ...col.money('unitPrice', 'Price'),
            ...col.date('effectiveDate', 'Effective'),
            ...col.date('expiryDate', 'Expires')
        ],

        DiscountRule: [
            ...col.id('ruleId'),
            ...col.col('name', 'Name'),
            ...col.status('discountType', 'Type', enums.DISCOUNT_TYPE_VALUES, render.discountType),
            ...col.col('discountValue', 'Value'),
            ...col.col('minimumAmount', 'Min Order'),
            ...col.col('isActive', 'Active')
        ],

        PromotionalPrice: [
            ...col.id('promoId'),
            ...col.col('name', 'Name'),
            ...col.col('itemId', 'Item'),
            ...col.money('promotionalPrice', 'Promo Price'),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End')
        ],

        QuantityBreak: [
            ...col.id('breakId'),
            ...col.col('priceListId', 'Price List'),
            ...col.col('itemId', 'Item'),
            ...col.col('fromQuantity', 'Min Qty'),
            ...col.col('toQuantity', 'Max Qty'),
            ...col.money('unitPrice', 'Price')
        ]
    };

    MobileSalesPricing.primaryKeys = {
        PriceList: 'priceListId', PriceListEntry: 'entryId',
        CustomerPrice: 'customerPriceId', DiscountRule: 'ruleId',
        PromotionalPrice: 'promoId', QuantityBreak: 'breakId'
    };

})();
