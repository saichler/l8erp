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
 * Mobile ECOM Promotions Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: ecom/promotions/promotions-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { renderEnum, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileEcomPromotions = window.MobileEcomPromotions || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PROMOTION_TYPE = factory.simple([
        'Unspecified', 'Percentage', 'Fixed Amount', 'Buy X Get Y', 'Free Shipping', 'Bundle'
    ]);

    const DISCOUNT_TYPE = factory.simple([
        'Unspecified', 'Percentage', 'Fixed Amount', 'Free Shipping'
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileEcomPromotions.enums = {
        PROMOTION_TYPE: PROMOTION_TYPE.enum,
        DISCOUNT_TYPE: DISCOUNT_TYPE.enum
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileEcomPromotions.render = {
        promotionType: (v) => renderEnum(v, PROMOTION_TYPE.enum),
        discountType: (v) => renderEnum(v, DISCOUNT_TYPE.enum),
        date: renderDate,
        money: renderMoney
    };

})();
