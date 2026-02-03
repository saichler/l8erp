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
// Sales Pricing Module - Form Definitions
// Form field configurations for all Sales Pricing models

(function() {
    'use strict';

    window.SalesPricing = window.SalesPricing || {};

    const enums = SalesPricing.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    SalesPricing.forms = {
        PriceList: {
            title: 'Price List',
            sections: [
                {
                    title: 'Price List Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'currencyCode', label: 'Currency', type: 'text', required: true },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PRICE_LIST_STATUS },
                        { key: 'isDefault', label: 'Default', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        PriceListEntry: {
            title: 'Price List Entry',
            sections: [
                {
                    title: 'Entry Details',
                    fields: [
                        { key: 'priceListId', label: 'Price List', type: 'reference', lookupModel: 'PriceList', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'unitPrice', label: 'Unit Price', type: 'currency', required: true },
                        { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                        { key: 'minQuantity', label: 'Min Quantity', type: 'number' },
                        { key: 'pricingMethod', label: 'Pricing Method', type: 'select', options: enums.PRICING_METHOD }
                    ]
                }
            ]
        },

        CustomerPrice: {
            title: 'Customer Price',
            sections: [
                {
                    title: 'Price Details',
                    fields: [
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'specialPrice', label: 'Special Price', type: 'currency', required: true },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' },
                        { key: 'contractId', label: 'Contract', type: 'reference', lookupModel: 'CustomerContract' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        DiscountRule: {
            title: 'Discount Rule',
            sections: [
                {
                    title: 'Rule Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'discountType', label: 'Discount Type', type: 'select', options: enums.DISCOUNT_TYPE, required: true },
                        { key: 'discountValue', label: 'Discount Value', type: 'number', required: true },
                        { key: 'minOrderAmount', label: 'Min Order Amount', type: 'currency' },
                        { key: 'minQuantity', label: 'Min Quantity', type: 'number' },
                        { key: 'customerId', label: 'Customer (optional)', type: 'reference', lookupModel: 'Customer' },
                        { key: 'itemId', label: 'Item (optional)', type: 'reference', lookupModel: 'ScmItem' },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        PromotionalPrice: {
            title: 'Promotional Price',
            sections: [
                {
                    title: 'Promotion Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'promoPrice', label: 'Promo Price', type: 'currency', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'maxQuantity', label: 'Max Quantity', type: 'number' },
                        { key: 'promoCode', label: 'Promo Code', type: 'text' }
                    ]
                }
            ]
        },

        QuantityBreak: {
            title: 'Quantity Break',
            sections: [
                {
                    title: 'Break Details',
                    fields: [
                        { key: 'priceListId', label: 'Price List', type: 'reference', lookupModel: 'PriceList', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'minQuantity', label: 'Min Quantity', type: 'number', required: true },
                        { key: 'maxQuantity', label: 'Max Quantity', type: 'number' },
                        { key: 'breakPrice', label: 'Break Price', type: 'currency', required: true },
                        { key: 'discountPercent', label: 'Discount %', type: 'number' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    SalesPricing.primaryKeys = {
        PriceList: 'priceListId',
        PriceListEntry: 'entryId',
        CustomerPrice: 'customerPriceId',
        DiscountRule: 'ruleId',
        PromotionalPrice: 'promoId',
        QuantityBreak: 'breakId'
    };

})();
