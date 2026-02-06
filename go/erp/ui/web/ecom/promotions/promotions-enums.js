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
// E-Commerce Promotions Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8DRenderers;

    window.EcomPromotions = window.EcomPromotions || {};

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

    EcomPromotions.enums = {
        PROMOTION_TYPE: PROMOTION_TYPE.enum,
        DISCOUNT_TYPE: DISCOUNT_TYPE.enum
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    EcomPromotions.render = {
        promotionType: (v) => renderEnum(v, PROMOTION_TYPE.enum),
        discountType: (v) => renderEnum(v, DISCOUNT_TYPE.enum),
        date: renderDate,
        money: renderMoney
    };

})();
