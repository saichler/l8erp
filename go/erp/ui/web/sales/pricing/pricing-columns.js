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
// Sales Pricing Module - Column Configurations
// Table column definitions for all Sales Pricing models

(function() {
    'use strict';

    window.SalesPricing = window.SalesPricing || {};

    const col = window.Layer8ColumnFactory;
    const render = SalesPricing.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesPricing.columns = {
        SalesPriceList: [
            ...col.id('priceListId'),
            ...col.col('name', 'Name'),
            ...col.col('currencyId', 'Currency'),
            ...col.date('effectiveDate', 'Effective'),
            ...col.date('expiryDate', 'Expires'),
            ...col.enum('status', 'Status', null, render.priceListStatus),
        ],

        SalesDiscountRule: [
            ...col.id('ruleId'),
            ...col.col('name', 'Name'),
            ...col.enum('discountType', 'Type', null, render.discountType),
            ...col.col('discountValue', 'Value'),
            ...col.col('minimumAmount', 'Min Order'),
            ...col.col('isActive', 'Active'),
        ],

        SalesPromotionalPrice: [
            ...col.id('promoId'),
            ...col.col('name', 'Name'),
            ...col.col('itemId', 'Item'),
            ...col.money('promotionalPrice', 'Promo Price'),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End'),
        ]
    };

})();
