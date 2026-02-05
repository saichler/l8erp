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
// E-Commerce Promotions Module - Enum Definitions

(function() {
    'use strict';

    window.EcomPromotions = window.EcomPromotions || {};
    EcomPromotions.enums = {};

    // PROMOTION TYPE
    EcomPromotions.enums.PROMOTION_TYPE = {
        0: 'Unspecified',
        1: 'Percentage',
        2: 'Fixed Amount',
        3: 'Buy X Get Y',
        4: 'Free Shipping',
        5: 'Bundle'
    };

    EcomPromotions.enums.PROMOTION_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active'
    };

    // DISCOUNT TYPE
    EcomPromotions.enums.DISCOUNT_TYPE = {
        0: 'Unspecified',
        1: 'Percentage',
        2: 'Fixed Amount',
        3: 'Free Shipping'
    };

    EcomPromotions.enums.DISCOUNT_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active'
    };

    // RENDERERS
    EcomPromotions.render = {};

    EcomPromotions.render.promotionType = Layer8DRenderers.createStatusRenderer(
        EcomPromotions.enums.PROMOTION_TYPE,
        EcomPromotions.enums.PROMOTION_TYPE_CLASSES
    );

    EcomPromotions.render.discountType = Layer8DRenderers.createStatusRenderer(
        EcomPromotions.enums.DISCOUNT_TYPE,
        EcomPromotions.enums.DISCOUNT_TYPE_CLASSES
    );

    EcomPromotions.render.date = Layer8DRenderers.renderDate;
    EcomPromotions.render.money = Layer8DRenderers.renderMoney;

})();
