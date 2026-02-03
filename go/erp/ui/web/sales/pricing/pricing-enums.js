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
// Sales Pricing Module - Enum Definitions
// All enum constants and value mappings for Sales Pricing models

(function() {
    'use strict';

    // Create SalesPricing namespace
    window.SalesPricing = window.SalesPricing || {};
    SalesPricing.enums = {};

    // ============================================================================
    // PRICING METHOD
    // ============================================================================

    SalesPricing.enums.PRICING_METHOD = {
        0: 'Unspecified',
        1: 'Fixed',
        2: 'Cost Plus',
        3: 'Volume',
        4: 'Contract'
    };

    SalesPricing.enums.PRICING_METHOD_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-active'
    };

    // ============================================================================
    // DISCOUNT TYPE
    // ============================================================================

    SalesPricing.enums.DISCOUNT_TYPE = {
        0: 'Unspecified',
        1: 'Percentage',
        2: 'Fixed Amount',
        3: 'Buy X Get Y',
        4: 'Tiered'
    };

    SalesPricing.enums.DISCOUNT_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-pending'
    };

    // ============================================================================
    // PRICE LIST STATUS
    // ============================================================================

    SalesPricing.enums.PRICE_LIST_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Active',
        3: 'Inactive',
        4: 'Expired'
    };

    SalesPricing.enums.PRICE_LIST_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesPricing.render = {};

    SalesPricing.render.pricingMethod = Layer8DRenderers.createStatusRenderer(
        SalesPricing.enums.PRICING_METHOD,
        SalesPricing.enums.PRICING_METHOD_CLASSES
    );

    SalesPricing.render.discountType = Layer8DRenderers.createStatusRenderer(
        SalesPricing.enums.DISCOUNT_TYPE,
        SalesPricing.enums.DISCOUNT_TYPE_CLASSES
    );

    SalesPricing.render.priceListStatus = Layer8DRenderers.createStatusRenderer(
        SalesPricing.enums.PRICE_LIST_STATUS,
        SalesPricing.enums.PRICE_LIST_STATUS_CLASSES
    );

    SalesPricing.render.date = Layer8DRenderers.renderDate;
    SalesPricing.render.money = Layer8DRenderers.renderMoney;

})();
