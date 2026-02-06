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
 * Mobile Sales Pricing Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: sales/pricing/pricing-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileSalesPricing = window.MobileSalesPricing || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PRICING_METHOD = factory.create([
        ['Unspecified', null, ''],
        ['Fixed', 'fixed', 'status-active'],
        ['Cost Plus', 'cost plus', 'status-active'],
        ['Volume', 'volume', 'status-pending'],
        ['Contract', 'contract', 'status-active']
    ]);

    const DISCOUNT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Percentage', 'percentage', 'status-active'],
        ['Fixed Amount', 'fixed', 'status-active'],
        ['Buy X Get Y', 'bxgy', 'status-pending'],
        ['Tiered', 'tiered', 'status-pending']
    ]);

    const PRICE_LIST_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Inactive', 'inactive', 'status-inactive'],
        ['Expired', 'expired', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileSalesPricing.enums = {
        PRICING_METHOD: PRICING_METHOD.enum,
        PRICING_METHOD_VALUES: PRICING_METHOD.values,
        PRICING_METHOD_CLASSES: PRICING_METHOD.classes,
        DISCOUNT_TYPE: DISCOUNT_TYPE.enum,
        DISCOUNT_TYPE_VALUES: DISCOUNT_TYPE.values,
        DISCOUNT_TYPE_CLASSES: DISCOUNT_TYPE.classes,
        PRICE_LIST_STATUS: PRICE_LIST_STATUS.enum,
        PRICE_LIST_STATUS_VALUES: PRICE_LIST_STATUS.values,
        PRICE_LIST_STATUS_CLASSES: PRICE_LIST_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesPricing.render = {
        pricingMethod: createStatusRenderer(PRICING_METHOD.enum, PRICING_METHOD.classes),
        discountType: createStatusRenderer(DISCOUNT_TYPE.enum, DISCOUNT_TYPE.classes),
        priceListStatus: createStatusRenderer(PRICE_LIST_STATUS.enum, PRICE_LIST_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
