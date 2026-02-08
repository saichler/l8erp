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
 * Mobile ECOM Customers Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: ecom/customers/customers-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileEcomCustomers = window.MobileEcomCustomers || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CUSTOMER_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Guest', 'guest', 'status-pending'],
        ['Registered', 'registered', 'status-active'],
        ['VIP', 'vip', 'status-active'],
        ['Wholesale', 'wholesale', 'status-active']
    ]);

    const CART_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'status-active'],
        ['Abandoned', 'abandoned', 'status-pending'],
        ['Converted', 'converted', 'status-active'],
        ['Expired', 'expired', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileEcomCustomers.enums = {
        CUSTOMER_TYPE: CUSTOMER_TYPE.enum,
        CUSTOMER_TYPE_CLASSES: CUSTOMER_TYPE.classes,
        CART_STATUS: CART_STATUS.enum,
        CART_STATUS_CLASSES: CART_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileEcomCustomers.render = {
        customerType: createStatusRenderer(CUSTOMER_TYPE.enum, CUSTOMER_TYPE.classes),
        cartStatus: createStatusRenderer(CART_STATUS.enum, CART_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
