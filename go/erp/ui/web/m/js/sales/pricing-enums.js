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
 * Mobile Sales Pricing Module - Enum Definitions
 * Desktop Equivalent: sales/pricing/pricing-enums.js
 */
(function() {
    'use strict';

    window.MobileSalesPricing = window.MobileSalesPricing || {};
    MobileSalesPricing.enums = {};

    // ============================================================================
    // PRICING METHOD
    // ============================================================================

    MobileSalesPricing.enums.PRICING_METHOD = {
        0: 'Unspecified', 1: 'Fixed', 2: 'Cost Plus', 3: 'Volume', 4: 'Contract'
    };
    MobileSalesPricing.enums.PRICING_METHOD_VALUES = {
        'fixed': 1, 'cost plus': 2, 'volume': 3, 'contract': 4
    };
    MobileSalesPricing.enums.PRICING_METHOD_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending', 4: 'status-active'
    };

    // ============================================================================
    // DISCOUNT TYPE
    // ============================================================================

    MobileSalesPricing.enums.DISCOUNT_TYPE = {
        0: 'Unspecified', 1: 'Percentage', 2: 'Fixed Amount', 3: 'Buy X Get Y', 4: 'Tiered'
    };
    MobileSalesPricing.enums.DISCOUNT_TYPE_VALUES = {
        'percentage': 1, 'fixed': 2, 'bxgy': 3, 'tiered': 4
    };
    MobileSalesPricing.enums.DISCOUNT_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending', 4: 'status-pending'
    };

    // ============================================================================
    // PRICE LIST STATUS
    // ============================================================================

    MobileSalesPricing.enums.PRICE_LIST_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Active', 3: 'Inactive', 4: 'Expired'
    };
    MobileSalesPricing.enums.PRICE_LIST_STATUS_VALUES = {
        'draft': 1, 'active': 2, 'inactive': 3, 'expired': 4
    };
    MobileSalesPricing.enums.PRICE_LIST_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive', 4: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesPricing.render = {
        pricingMethod: Layer8MRenderers.createStatusRenderer(
            MobileSalesPricing.enums.PRICING_METHOD,
            MobileSalesPricing.enums.PRICING_METHOD_CLASSES
        ),
        discountType: Layer8MRenderers.createStatusRenderer(
            MobileSalesPricing.enums.DISCOUNT_TYPE,
            MobileSalesPricing.enums.DISCOUNT_TYPE_CLASSES
        ),
        priceListStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesPricing.enums.PRICE_LIST_STATUS,
            MobileSalesPricing.enums.PRICE_LIST_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
