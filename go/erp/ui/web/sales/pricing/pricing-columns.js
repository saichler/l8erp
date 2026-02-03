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

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = SalesPricing.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesPricing.columns = {
        SalesPriceList: [
            { key: 'priceListId', label: 'ID', sortKey: 'priceListId', filterKey: 'priceListId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'currencyCode', label: 'Currency', sortKey: 'currencyCode' },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            },
            {
                key: 'expirationDate',
                label: 'Expires',
                sortKey: 'expirationDate',
                render: (item) => renderDate(item.expirationDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.priceListStatus(item.status)
            }
        ],

        SalesPriceListEntry: [
            { key: 'entryId', label: 'ID', sortKey: 'entryId', filterKey: 'entryId' },
            { key: 'priceListId', label: 'Price List', sortKey: 'priceListId', filterKey: 'priceListId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            {
                key: 'unitPrice',
                label: 'Unit Price',
                sortKey: 'unitPrice',
                render: (item) => renderMoney(item.unitPrice)
            },
            { key: 'unitOfMeasure', label: 'UOM', sortKey: 'unitOfMeasure' },
            { key: 'minQuantity', label: 'Min Qty', sortKey: 'minQuantity' }
        ],

        SalesCustomerPrice: [
            { key: 'customerPriceId', label: 'ID', sortKey: 'customerPriceId', filterKey: 'customerPriceId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            {
                key: 'specialPrice',
                label: 'Price',
                sortKey: 'specialPrice',
                render: (item) => renderMoney(item.specialPrice)
            },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            },
            {
                key: 'expirationDate',
                label: 'Expires',
                sortKey: 'expirationDate',
                render: (item) => renderDate(item.expirationDate)
            }
        ],

        SalesDiscountRule: [
            { key: 'ruleId', label: 'ID', sortKey: 'ruleId', filterKey: 'ruleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'discountType',
                label: 'Type',
                sortKey: 'discountType',
                render: (item) => render.discountType(item.discountType)
            },
            { key: 'discountValue', label: 'Value', sortKey: 'discountValue' },
            { key: 'minOrderAmount', label: 'Min Order', sortKey: 'minOrderAmount' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

        SalesPromotionalPrice: [
            { key: 'promoId', label: 'ID', sortKey: 'promoId', filterKey: 'promoId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            {
                key: 'promoPrice',
                label: 'Promo Price',
                sortKey: 'promoPrice',
                render: (item) => renderMoney(item.promoPrice)
            },
            {
                key: 'startDate',
                label: 'Start',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            }
        ],

        SalesQuantityBreak: [
            { key: 'breakId', label: 'ID', sortKey: 'breakId', filterKey: 'breakId' },
            { key: 'priceListId', label: 'Price List', sortKey: 'priceListId', filterKey: 'priceListId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'minQuantity', label: 'Min Qty', sortKey: 'minQuantity' },
            { key: 'maxQuantity', label: 'Max Qty', sortKey: 'maxQuantity' },
            {
                key: 'breakPrice',
                label: 'Price',
                sortKey: 'breakPrice',
                render: (item) => renderMoney(item.breakPrice)
            }
        ]
    };

})();
