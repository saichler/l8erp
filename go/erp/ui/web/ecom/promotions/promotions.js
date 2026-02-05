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
// E-Commerce Promotions Module - Entry Point
// EcomPromotions namespace initialized by enum, column, and form files

(function() {
    'use strict';

    window.EcomPromotions = window.EcomPromotions || {};

    EcomPromotions.primaryKeys = {
        EcomPromotion: 'promotionId',
        EcomCoupon: 'couponId',
        EcomPriceRule: 'ruleId',
        EcomShippingMethod: 'methodId',
        EcomPaymentMethod: 'methodId'
    };

})();
