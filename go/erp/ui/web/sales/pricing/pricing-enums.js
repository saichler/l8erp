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
// Sales Pricing Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.SalesPricing = window.SalesPricing || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PRICING_METHOD = factory.create([
        ['Unspecified', null, ''],
        ['Fixed', 'fixed', 'layer8d-status-active'],
        ['Cost Plus', 'costplus', 'layer8d-status-active'],
        ['Volume', 'volume', 'layer8d-status-pending'],
        ['Contract', 'contract', 'layer8d-status-active']
    ]);

    const DISCOUNT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Percentage', 'percentage', 'layer8d-status-active'],
        ['Fixed Amount', 'fixed', 'layer8d-status-active'],
        ['Buy X Get Y', 'bxgy', 'layer8d-status-pending'],
        ['Tiered', 'tiered', 'layer8d-status-pending']
    ]);

    const PRICE_LIST_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Inactive', 'inactive', 'layer8d-status-inactive'],
        ['Expired', 'expired', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    SalesPricing.enums = {
        PRICING_METHOD: PRICING_METHOD.enum,
        PRICING_METHOD_CLASSES: PRICING_METHOD.classes,
        DISCOUNT_TYPE: DISCOUNT_TYPE.enum,
        DISCOUNT_TYPE_CLASSES: DISCOUNT_TYPE.classes,
        PRICE_LIST_STATUS: PRICE_LIST_STATUS.enum,
        PRICE_LIST_STATUS_CLASSES: PRICE_LIST_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesPricing.render = {
        pricingMethod: createStatusRenderer(PRICING_METHOD.enum, PRICING_METHOD.classes),
        discountType: createStatusRenderer(DISCOUNT_TYPE.enum, DISCOUNT_TYPE.classes),
        priceListStatus: createStatusRenderer(PRICE_LIST_STATUS.enum, PRICE_LIST_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
